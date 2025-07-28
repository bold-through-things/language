from contextlib import contextmanager
from dataclasses import replace
import re
from typing import Any, Iterator, Protocol, TextIO, TypeVar, Union, cast
from io import StringIO
from pathlib import Path
from node import Args, Callers, Indexers, Inject_code_start, Macro, Node, Params, Position, Scope, Target
from strutil import IndentedStringIO, Joiner, cut, extract_indent, join_nested
from typing import Callable, Type, Dict, List, Optional
from utils import *

ERASED_NODE = Node(None, None, children=None)
ERASED_NODE.metadata[Macro] = None
ERASED_NODE.metadata[Args] = ""

def unroll_parent_chain(n: Node) -> list[Node]:
    rv = []
    while n:
        rv.append(n)
        n = n.parent
    return rv

def seek_parent_scope(n: Node) -> Scope | None:
    for n in unroll_parent_chain(n):
        scope = n.metadata.maybe(Scope)
        if scope:
            return scope

def seek_child_macro(n: Node, macro: str):
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            return child

def js_field_access(s: str) -> str:
    if re.fullmatch(r'[a-zA-Z_$][a-zA-Z0-9_$]*', s):
        return f'.{s}'
    return f'["{s}"]'

TYPICAL_IGNORED_MACROS = {"type", "noscope", "PIL:auto_type"}
def filter_child_macros(n: Node):
    def get_macro(n: Node): 
        macro, _ = cut(n.content, " ")
        return macro
    return [c for c in n.children if get_macro(c) not in TYPICAL_IGNORED_MACROS]

js_lib = open(Path(__file__).parent.joinpath("stdlib/lib.js")).read()

builtins = {
    "print": "log",
    # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
    #  blocking prompt function. in future should probably write such a function
    #  and remove unnecessary await.
    #  then again, considering this is almost guaranteed to only be used for debugging...
    #  does it matter?
    "prompt": "prompt",
    "stdin": "stdin",
    "is_tty": "is_tty",
    # TODO - these ought to be static code instead of function calls...
    "concat": "concat",
    "either": "either",
    "eq": "eq",
    "asc": "asc",
    "add": "add",
    "mod": "mod",
    "none": "none",
    # Object.values TODO i am not happy about this being a builtin. really it ought to be a method on the maps, 
    # which should explicitly be types. same for keys...
    "values": "values",
    "keys": "keys",
    "zip": "zip",    
}

@dataclass
class PrototypeCall:
    """String.join.call(self, args...) type shit"""
    constructor: str
    fn: str
    demands: list[str]
    returns: str
    def compile(self, args: list[str]):
        return f"{self.constructor}.prototype.{self.fn}.call({", ".join(args)})"
    
@dataclass
class DirectCall:
    """just call it directly fn(args...)"""
    fn: str
    receiver: str | None
    demands: list[str]
    returns: str
    def compile(self, args: list[str]):
        receiver = ""
        if self.receiver:
            receiver = f"{self.receiver}."
        return f"{receiver}{self.fn}({", ".join(args)})"

builtin_calls = {
    "join": PrototypeCall(constructor="Array", fn="join", demands=["list", "str"], returns="str"),
    "sort": PrototypeCall(constructor="Array", fn="sort", demands=["list"], returns="list"),
    "push": PrototypeCall(constructor="Array", fn="push", demands=["list", "*"], returns="list"), # TODO - does it actually return..?
    "reverse": PrototypeCall(constructor="Array", fn="reverse", demands=["list"], returns="list"),
    "split": PrototypeCall(constructor="String", fn="split", demands=["str", "str"], returns="list"),

     # TODO - NUKE ME the moment we get method overloading or union types!
    "splitr": PrototypeCall(constructor="String", fn="split", demands=["str", "regex"], returns="list"),

    "trim": PrototypeCall(constructor="String", fn="trim", demands=["str"], returns="str"),
    "slice": PrototypeCall(constructor="Array", fn="slice", demands=["list"], returns="list"),
}

def replace_chars(s: str, ok: set[str], map: dict[str, str]) -> str:
    return ''.join(
        c if c in ok else map[c] if c in map else f'_{hex(ord(c))}_'
        for c in s
    )

def to_valid_js_ident(s: str) -> str:
    return "_" + replace_chars(s, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", {" ": "_"})

ACCESS_MACRO = {"a", "an", "access"}

from macro_registry import MacroContext, MacroRegistry
macros = MacroRegistry()
typecheck = MacroRegistry()

@macros.add("noop", "substituting", "calling", "inside", "param", "type", "PIL:auto_type")
def does_not_compile(ctx):
    # does not compile into code itself - nothing to do
    pass

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]
@macros.add(*COMMENT_MACROS)
@typecheck.add(*COMMENT_MACROS)
def comments(ctx):
    # comments are ignored. TODO - we could and perhaps should transfer comments to output?
    pass

@macros.add("fn")
def fn(ctx: MacroContext):
    ctx.compiler.assert_(ctx.node.metadata[Args].find(" ") == -1, ctx.node, "must have a single arg - fn name")
    ctx.statement_out.write(f"const {ctx.node.metadata[Args]} = async function (")
    joiner = Joiner(ctx.statement_out, ", \n")
    params = ctx.node.metadata[Params].mapping.items()
    if len(params) > 0:
        ctx.statement_out.write("\n")
    with ctx.statement_out:
        for k, v in params:
            with joiner:
                # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                ctx.statement_out.write(k)
    if len(params) > 0:
        ctx.statement_out.write("\n")
    ctx.statement_out.write(") ")
    next = seek_child_macro(ctx.node, "do")

    inject = Inject_code_start()
    next.metadata[Inject_code_start] = inject
    ctx.statement_out.write("{")
    with ctx.statement_out:
        for k, v in params:
            inject.code.append(f"{k} = {k}\n")
        inner_ctx = replace(ctx, node=next)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("PIL:access_field")
def read_field(ctx: MacroContext):
    args = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args) == 2, ctx.node, "first argument is object, second is field")
    obj = args[0]
    field = args[1] # TODO - convert field to JS valid value
    field_access = js_field_access(field)
    ident = ctx.compiler.get_new_ident("_".join(args))

    args = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child node for assignment")
        ctx.statement_out.write(f"{obj}{field_access} = {args[-1]}\n")
    ctx.statement_out.write(f"const {ident} = await {obj}{field_access}\n")
    ctx.expression_out.write(ident)

@macros.add("PIL:access_index")
def read_field(ctx: MacroContext):
    args = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the object into which we should index")
    
    obj = args[0]
    ident = ctx.compiler.get_new_ident("_".join(args)) # TODO - pass index name too (doable...)

    args = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = [a for a in args if a]

    ctx.compiler.assert_(len(args) >= 1, ctx.node, "first child used as indexing key")
    key = args[0]

    if len(args) > 1:
        ctx.compiler.assert_(len(args) == 2, ctx.node, "second child used for assignment")
        ctx.statement_out.write(f"{obj}[{key}] = {args[1]}\n")

    ctx.statement_out.write(f"const {ident} = await {obj}[{key}]\n")
    ctx.expression_out.write(ident)

T = TypeVar("T")

def singleton(cls: type[T]) -> T:
    instance = cls()
    return cast(Callable[..., Any], lambda *args, **kwargs: instance)

@singleton
class PIL_call:
    @classmethod
    def resolve_convention(cls, ctx: MacroContext):
        args = ctx.node.metadata[Args].split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
        
        fn = args[0]

        convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)
        if fn in builtin_calls:
            convention = builtin_calls[fn]
        if fn in builtins:
            convention = DirectCall(fn=builtins[fn], demands=None, receiver="indentifire", returns=None)

        return convention

    def __init__(self):
        @typecheck.add("PIL:call")
        def _(ctx: MacroContext):
            convention = self.resolve_convention(ctx)

            args = []
            for child in ctx.node.children:
                received = ctx.compiler.typecheck(replace(ctx, node=child))
                args.append(received)
            args = [a for a in args if a]

            if convention.demands:
                for received, demanded in zip(args, convention.demands):
                    if "*" in {demanded, received}:
                        # TODO. generics!
                        continue
                    print(f"{ctx.node.content} demanded {demanded} and was given {received}")
                    # TODO - this should point to the child node that we received from, actually...
                    ctx.compiler.assert_(received == demanded, ctx.node, f"argument demands {demanded} and is given {received}")

            return convention.returns or "*"

        @macros.add("PIL:call")
        def _(ctx: MacroContext):
            args = ctx.node.metadata[Args].split(" ")
            ident = ctx.compiler.get_new_ident("_".join(args))
            convention = self.resolve_convention(ctx)
            args = []
            for child in ctx.node.children:
                e = IndentedStringIO()
                ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
                args.append(e.getvalue())

            call = convention.compile([a for a in args if a])

            ctx.statement_out.write(f"const {ident} = await {call}\n")
            ctx.expression_out.write(ident)

@macros.add("PIL:access_local")
def pil_access_local(ctx: MacroContext):
    args = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the object into which we should index")
    
    local = args[0]
    ident = ctx.compiler.get_new_ident("_".join(args)) # TODO - pass index name too (doable...)

    args = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
        ctx.statement_out.write(f"{local} = {args[-1]}\n")

    ctx.statement_out.write(f"const {ident} = await {local}\n")
    ctx.expression_out.write(ident)

@typecheck.add("PIL:access_local")
def access_local(ctx: MacroContext):
    first, extra = cut(ctx.node.metadata[Args], " ")
    ctx.compiler.assert_(extra == "", ctx.node, "single argument, the name of local")

    types = [ctx.compiler.typecheck(replace(ctx, node=child)) for child in ctx.node.children]
    types = list(filter(None, types))

    scope = seek_parent_scope(ctx.node)
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    name = first
    resolved_field = scope.resolve(name)
    if resolved_field:
        demanded = resolved_field
        if len(types) > 0:
            # TODO - support multiple arguments
            ctx.compiler.assert_(len(types) == 1, ctx.node, f"only support one argument for now (TODO!)")
            received = types[0]
            ctx.compiler.assert_(received in {demanded, "*"}, ctx.node, f"field demands {demanded} but is given {received}")
        print(f"{ctx.node.content} demanded {demanded}")
        return demanded or "*"
    return "*"

@macros.add("local")
def local(ctx: MacroContext):
    name, _ = cut(ctx.node.metadata[Args], " ") # TODO assert one arg
    args = []
    if len(ctx.node.children) > 0:
        # ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "single child, the value") TODO!
        for child in ctx.node.children:
            e = IndentedStringIO()
            ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
            args.append(e.getvalue())
    args = list(filter(None, args))
    ctx.statement_out.write(f"let {name}")
    if len(args) > 0:
        ctx.statement_out.write(f" = {args[-1]}")
    ctx.statement_out.write(f"\n")
    ctx.expression_out.write(name)

@macros.add("int")
def int_macro(ctx: MacroContext):
    ctx.expression_out.write(str(ctx.node.metadata[Args]))

@typecheck.add("int")
def int_typecheck(ctx: MacroContext):
    return "int"

@macros.add("string", "regex")
def str_macro(ctx: MacroContext):
    s = ctx.node.metadata[Args]
    if len(s) == 0:
        for child in ctx.node.children:
            s += ctx.recover_string(child)
    else:
        delim = s[0]
        ctx.compiler.assert_(s.endswith(delim), ctx.node, "must be delimited on both sides with the same character")
        s = s.removeprefix(delim).removesuffix(delim)
    s = s.replace("\n", "\\n")
    # TODO escape quotes as well...
    sep = '"' if ctx.node.metadata[Macro] == "string" else "/"
    ctx.expression_out.write(f'{sep}{s}{sep}')

@typecheck.add("string")
def str_typecheck(ctx: MacroContext):
    return "str"

@typecheck.add("regex")
def regex_typecheck(ctx: MacroContext):
    return "regex"

@typecheck.add("local")
def local_typecheck(ctx: MacroContext):
    name, _ = cut(ctx.node.metadata[Args], " ")
    type_node = seek_child_macro(ctx.node, "type")

    received = None
    for child in ctx.node.children:
        received = ctx.compiler.typecheck(replace(ctx, node=child)) or received

    if not type_node:
        # TODO. this should be mandatory.
        if not seek_child_macro(ctx.node, "PIL:auto_type") or not received:
            return received
        type_node = Node(f"type {received}", ctx.node.pos, [])
    
    _, demanded = cut(type_node.content, " ")
    print(f"{ctx.node.content} demanded {demanded} and was given {received}")
    scope = seek_parent_scope(ctx.node)
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    scope.mapping[name] = demanded
    ctx.compiler.assert_(received == demanded, ctx.node, f"field demands {demanded} but is given {received}")
    return demanded or received or "*"

@typecheck.add("a")
def access_typecheck(ctx: MacroContext):
    first, extra = cut(ctx.node.metadata[Args], " ")
    if extra:
        # TODO. not implemented. quite complex...
        pass

    types = [ctx.compiler.typecheck(replace(ctx, node=child)) for child in ctx.node.children]
    types = list(filter(None, types))

    scope = seek_parent_scope(ctx.node)
    assert scope is not None, f"{[n.content for n in unroll_parent_chain(ctx.node)]}" # internal assert
    name = first
    resolved_field = scope.resolve(name)
    if resolved_field:
        demanded = resolved_field
        if len(types) > 0:
            # TODO - support multiple arguments
            ctx.compiler.assert_(len(types) == 1, ctx.node, f"only support one argument for now (TODO!)")
            received = types[0]
            ctx.compiler.assert_(received == demanded, ctx.node, f"field demands {demanded} but is given {received}")
        return demanded

with scope:
    literally = {
        "true": "true",
        "false": "false",
        "break": "break",
        "continue": "continue",
        "dict": "{}",
        "list": "[]",
        "return": "return"
    }
    @macros.add(*[k for k in literally.keys()])
    def literally_macro(ctx: MacroContext):
        # TODO. this isn't inherently expression_out... indeed most of these should be statement_out...
        ctx.expression_out.write(literally[ctx.node.metadata[Macro]])

@macros.add("exists")
def exists_inside(ctx: MacroContext):
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.exists_inside(", [ctx.node.metadata[Target]] + ctx.node.children)

@macros.add(*[b for b in builtins.keys()])
def builtin(ctx: MacroContext):
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.{builtins[ctx.node.metadata[Macro]]}(", ctx.node.children)

SCOPE_MACRO = ["do", "then", "else", "PIL:file"]
@macros.add(*SCOPE_MACRO)
def block(ctx: MacroContext):
    if ctx.node.metadata[Macro] in ["else"]:
        ctx.statement_out.write(f"{ctx.node.metadata[Macro]} ")

    ctx.statement_out.write("{\n")
    with ctx.statement_out:
        ctx.statement_out.write("const parent_scope = scope\n")
        ctx.statement_out.write("{\n")
        with ctx.statement_out:
            ctx.statement_out.write("const scope = indentifire.scope(parent_scope)\n")
            inject = ctx.node.metadata.maybe(Inject_code_start)
            if inject:
                for code in inject.code:
                    ctx.statement_out.write(code)
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                child_ctx.compiler.compile_ctx(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}\n")
    ctx.statement_out.write("} ")

@macros.add("noscope")
def block(ctx: MacroContext):
    for child in ctx.node.children:
        out = IndentedStringIO()
        ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=out))

@typecheck.add(*SCOPE_MACRO)
def scope_macro(ctx: MacroContext):
    parent = seek_parent_scope(ctx.node)
    ctx.node.metadata[Scope] = Scope(parent=parent)
    for child in ctx.node.children:
        ctx.compiler.typecheck(replace(ctx, node=child))

@macros.add("for")
def for_macro(ctx: MacroContext):
    split = ctx.node.content.split(" ")
    ctx.compiler.assert_(len(split) == 3, ctx.node, "must have a syntax: for $ident in")
    # assert split[0] == "for" # inherent per semantics
    name = split[1]
    ctx.compiler.assert_(split[2] == "in", ctx.node, "must have a syntax: for $ident in")    

    args = []
    for child in ctx.node.children:
        if child.content.startswith("do"):
            continue
        e = IndentedStringIO()
        ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    ctx.compiler.assert_(len(args) == 1, ctx.node, "must have a single argument, the list provider")

    iter_ident = ctx.compiler.get_new_ident("iter")
    ctx.statement_out.write(f"""
const {iter_ident} = {args[0]}[Symbol.iterator]();
while (true) {{
    const {{ value, done }} = {iter_ident}.next();
    if (done) {{ break; }}
    let {name} = value;
""")
    with ctx.statement_out:
        node = seek_child_macro(ctx.node, "do")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("if")
def if_header(ctx: MacroContext):
    args = []
    if len(ctx.node.children) > 0:
        # ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "single child, the value") TODO!
        for child in ctx.node.children:
            if child.content.startswith("then"): # TODO - ugly. bwah!
                continue
            e = IndentedStringIO()
            ctx.compiler.compile_ctx(replace(ctx, node=child, expression_out=e))
            args.append(e.getvalue())

    ctx.statement_out.write(f"if ({args[-1]})")
    ctx.statement_out.write(" {")
    with ctx.statement_out:
        node = seek_child_macro(ctx.node, "then")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `then` block")
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("while")
def while_loop(ctx: MacroContext):
    ctx.statement_out.write("while(true) {")
    with ctx.statement_out:
        ctx.compiler.assert_(len(ctx.node.children) == 2, ctx.node, "must have two children")
        node = ctx.node.children[0]
        out = IndentedStringIO()
        inner_ctx = replace(ctx, node=node, expression_out=out)
        ctx.compiler.compile_ctx(inner_ctx)

        ctx.statement_out.write(f"if (!{out.getvalue()}) ")
        ctx.statement_out.write("{ break; }\n")

        node = seek_child_macro(ctx.node, "do")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

class MacroAssertFailed(Exception):
    """
raised by macros during processing to ensure said processing is possible.
compiler will recover during tree walks as soon as possible, thus making it possible
to catch multiple assert failures.
automatically raised by Compiler.assert_ which you should use probably instead of manually
raising this.
    """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message) # Call the base Exception constructor

class Compiler:
    def __init__(self):
        self.nodes: list[Node] = []
        # TODO. incremental is good enough for now, but we'll have to stabilize it.
        #  the last thing you would want is the entire output changing because you added a statement. that's a lot of
        #  unnecessary diff. best way to solve this that i see is to make this block-scoped,
        #  so that each block gets its own incremental. a bit harder, though.
        self.incremental_id = 0
        self.compile_errors = []

    def get_new_ident(self, name: str | None):
        ident = f"_{hex(self.incremental_id)}"
        if name:
            ident += f"_{to_valid_js_ident(name)}"
        self.incremental_id += 1
        return ident

    def register(self, node: Node):
        self.nodes.append(node)

    def assert_(self, must_be_true: bool, node: Node, message: str):
        if not must_be_true:
            self.compile_error(node, f"failed to assert: {message}")
            raise MacroAssertFailed(message)

    def compile_error(self, node: Node, error: str):
        entry = { # TODO dataclass
            "recoverable": False, # TODO
            "line": node.pos.line,
            "char": node.pos.char,
            "content": node.content,
            "error": error
        }
        self.compile_errors.append(entry)

    def compile(self):
        for node in self.nodes:
            self.__discover_macros(node)
            self.__preprocess_annotations(node)

        out = IndentedStringIO()
        out.write(js_lib + "\n\n")
        # need to wrap this crap in async because NodeJS is GARBAGE
        out.write("void (async () => {\n")
        with out:
            out.write("'use strict';\n")
            out.write("const scope = globalThis;\n")
            for node in self.nodes:
                assert node.content == "PIL:file" # root # internal assert
                ctx=MacroContext(
                    statement_out=StringIO(), # TODO - null writes
                    expression_out=StringIO(),
                    node=node,
                    compiler=self,
                )
                self.typecheck(ctx)

                ctx=MacroContext(
                    statement_out=out,
                    expression_out=out,
                    node=node,
                    compiler=self,
                )
                self.compile_ctx(ctx)
        out.write("\n})();")
        if len(self.compile_errors) != 0:
            return "" # TODO - raise an error instead ?
        return out.getvalue()

    def __discover_macros(self, node: Node):
        # TODO lstring macros should perhaps get special handling here...
        macro, args = cut(node.content, " ")
        node.metadata[Macro] = macro
        node.metadata[Args] = args
        for child in node.children:
            self.__discover_macros(child)

    def typecheck(self, ctx: MacroContext):
        macro = ctx.node.metadata[Macro]
        all_macros = typecheck.all()
        
        if macro in all_macros:
            with self.safely:
                return all_macros[macro](ctx)
        else:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.typecheck(child_ctx)

    def make_node(self, content: str, pos: Position, children: None | list[Node]) -> Node:
        n = Node(content, pos, children)
        self.__discover_macros(n)
        return n

    def __preprocess_annotations(self, node: Node):
        # probably want to process children first, i reckon...
        for child in node.children:
            with self.safely:
                self.__preprocess_annotations(child)

        macro, args = str(node.metadata[Macro]), str(node.metadata[Args])
        parent = node.parent

        Node = self.make_node

        # preprocess indexers, storing them in the metadata
        # indexers are special annotations that must appear at the start (TODO - might remove this restriction in future...)
        if macro == "substituting":
            # and yes, i know how absurd the message sounds
            # self.assert_(len(node.children) <= 1, node, "sub must have at most one child") TODO...
            self.assert_(args.find(" ") == -1, node, "sub must have one argument")
            if len(node.children) >= 1:
                parent.metadata[Indexers].mapping[args] = node.children
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                access = Node(f"a {args}", node.pos, children=None) # fake accessor node
                parent.metadata[Indexers].mapping[args] = [access]
            parent.replace_child(node, None)

        if macro == "calling":
            self.assert_(len(node.children) >= 1, node, "call must have at least one child")
            self.assert_(args.find(" ") == -1, node, "call must have one argument")
            parent.metadata[Callers].mapping[args] = node.children
            parent.replace_child(node, None)

        # exists inside
        if macro == "inside":
            self.assert_(len(node.children) == 1, node, "inside must have one child")
            self.assert_(args.strip() == "", node, "inside must have no arguments")
            self.assert_(parent.metadata[Macro] == "exists", node, "inside must be inside exists") # TODO. wow, easy to understand!
            parent.metadata[Target] = node.children[0]
            parent.replace_child(node, None)
    
        # function param
        if macro == "param":
            self.assert_(len(node.children) == 0, node, "param must have no children") # TODO - default value ? TODO - annotations ?
            self.assert_(args.find(" ") == -1, node, "param must have one argument - the name")
            self.assert_(parent.metadata[Macro] == "fn", node, "params must be inside fn")
            parent.metadata[Params].mapping[args] = True # TODO for now. probably a metadata object in the future

        if macro in ACCESS_MACRO:
            # since children are preprocessed first, we already have Callers and Indexers!
            steps = args.split(" ")
            indexers = getattr(node.metadata.maybe(Indexers), "mapping", {})
            callers = getattr(node.metadata.maybe(Callers), "mapping", {})
            subs = indexers | callers
            last_chain_ident = None
            replace_with = []
            for step in steps:
                ident = self.get_new_ident(step)
                step_is_last = step == steps[-1]
                children = list(filter(lambda n: not n.content.startswith("noscope"), node.children))
                step_needs_call = step in builtin_calls or (step_is_last and len(children) > 1) or step in callers
                args = []
                if step in subs:
                    args = subs[step]
                if step_is_last:
                    args += node.children

                local = []
                if step in indexers:
                    # index
                    local.append(Node(f"PIL:access_index {last_chain_ident}", node.pos, args))
                    for arg in args:                        
                        self.__preprocess_annotations(arg)
                elif step_needs_call:
                    # call or set
                    self_arg = []
                    if last_chain_ident:
                        self_arg = [ Node(f"PIL:access_local {last_chain_ident}", node.pos, []) ]
                    local.append(Node(f"PIL:call {step}", node.pos, self_arg + args))
                    local.append(Node("PIL:auto_type", node.pos, []))
                    for arg in args:
                        self.__preprocess_annotations(arg)
                else:
                    # static field
                    access = f"access_field {last_chain_ident}" if last_chain_ident else "access_local"
                    local.append(Node(f"PIL:{access} {step}", node.pos, args))
                    local.append(Node("PIL:auto_type", node.pos, []))
                    for arg in args:
                        self.__preprocess_annotations(arg)

                local = Node(f"local {ident}", node.pos, children=local)
                last_chain_ident = ident
                replace_with.append(local)
                
            replace_with = list(filter(None, [Node("noscope", node.pos, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
            parent.replace_child(node, replace_with)

        
        # associate code blocks with relevant headers
        CODE_BLOCK_HEADERS = {
            "if": "then",
            "while": "do",
            "for": "do",
            "fn": "do"
        }

        children = node.children
        parent = node
        for i in range(len(children)):
            current = children[i]
            next = children[i+1] if i+1 < len(children) else None

            if not current or not next:
                continue

            macro, args = str(current.metadata[Macro]), str(current.metadata[Args])
            if macro in CODE_BLOCK_HEADERS:
                expected_next = CODE_BLOCK_HEADERS[macro]
                macro, args = str(next.metadata[Macro]), str(next.metadata[Args])
                if macro == expected_next:
                    parent.replace_child(next, None)
                    current.append_child(next)
                else:
                    ValueError(f"for {macro} expected a following {expected_next}")

    def compile_fn_call(self, ctx: MacroContext, call: str, nodes: list[Node], ident=True) -> str:
        args = []
        for child in nodes:
            expression_out = IndentedStringIO()
            child_ctx = replace(ctx, node=child, expression_out=expression_out)
            child_ctx.compiler.compile_ctx(child_ctx)
            expression_out = expression_out.getvalue()
            if expression_out:
                args.append(expression_out)
            
        if ident:
            ident = ctx.compiler.get_new_ident(call)
            ctx.statement_out.write(f"const {ident} = ")
        ctx.statement_out.write(f"{call}")
        joiner = Joiner(ctx.statement_out, ", ")
        for i in args:
            with joiner:
                ctx.statement_out.write(i)
        ctx.statement_out.write(")\n")
        if ident:
            ctx.expression_out.write(ident)

    @property
    def safely(self):
        @contextmanager
        def _safely():
            try:
                yield
            except MacroAssertFailed:
                pass
        return _safely()

    def compile_ctx(self, ctx: MacroContext):
        if ctx.node == ERASED_NODE:
            return

        # ctx.statement_out.write(f"/*from: \n {ctx.node}*/\n")
        macro = ctx.node.metadata[Macro]
        all_macros = macros.all() # cache it
        
        if macro in all_macros:
            with self.safely:
                all_macros[macro](ctx)
        else:
            raise ValueError(f"TODO. unknown macro {macro}")


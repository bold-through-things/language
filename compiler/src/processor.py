from dataclasses import replace
from typing import Iterator, Protocol, TextIO, TypeVar, Union, cast
from io import StringIO
from pathlib import Path
from node import Args, Associated_code_block, Callers, Indexers, Inject_code_start, Macro, Node, Params, Parent, Position, Scope, Target, FieldDemandType
from strutil import IndentedStringIO, Joiner, cut, extract_indent, join_nested
from typing import Callable, Type, Dict, List, Optional
from utils import *

ERASED_NODE = Node(None, None, children=None)
ERASED_NODE.metadata[Macro] = None
ERASED_NODE.metadata[Args] = ""

def seek_parent_scope(n: Node) -> Scope | None:
    while n:
        scope = n.metadata.maybe(Scope)
        if scope:
            return scope
        n = n.parent

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

def replace_chars(s: str, ok: set[str], map: dict[str, str]) -> str:
    return ''.join(
        c if c in ok else map[c] if c in map else f'\\x{ord(c):02x}'
        for c in s
    )

def to_valid_js_ident(s: str) -> str:
    return "_" + replace_chars(s, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", {" ": "_"})

ACCESS_MACRO = {"a", "an", "access"}

from macro_registry import MacroContext, MacroRegistry
macros = MacroRegistry()
typecheck = MacroRegistry()

@macros.add("noop", "substituting", "calling", "inside", "param")
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
    ctx.statement_out.write(f"scope.{ctx.node.metadata[Args]} = async function (")
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
    next = ctx.node.metadata[Associated_code_block]

    inject = Inject_code_start()
    next.metadata[Inject_code_start] = inject
    ctx.statement_out.write("{")
    with ctx.statement_out:
        for k, v in params:
            inject.code.append(f"scope.{k} = {k}\n")
        inner_ctx = replace(ctx, node=next)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add(*[a for a in ACCESS_MACRO])
def access(ctx: MacroContext):
    ctx.compiler.unroll_chain(ctx)

@macros.add("local")
def local(ctx: MacroContext):
    name, _ = cut(ctx.node.metadata[Args], " ")
    ctx.statement_out.write(f"scope.{name} = indentifire.store()")
    if len(ctx.node.children) > 0:
        ctx.statement_out.write("\n")
        ctx.compiler.compile_fn_call(ctx, f"await indentifire.call_or_set(scope, '{name}', ", ctx.node.children)
        

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
    if not ctx.node.metadata.maybe(FieldDemandType):
        # TODO. this should be mandatory.
        return
    children = list(filter(lambda x: x != ERASED_NODE, ctx.node.children))
    ctx.compiler.assert_(len(children) == 1, ctx.node, "must have a single child")
    received = ctx.compiler.typecheck(replace(ctx, node=children[0]))
    demanded = ctx.node.metadata[FieldDemandType]
    ctx.compiler.assert_(received == demanded, ctx.node, f"field demands {demanded} but is given {received}")

    scope = seek_parent_scope(ctx.node)
    assert scope is not None # internal assert
    scope.mapping[name] = demanded

@typecheck.add("a")
def access_typecheck(ctx: MacroContext):
    first, extra = cut(ctx.node.metadata[Args], " ")
    if extra:
        # TODO. not implemented. quite complex...
        pass

    types = [ctx.compiler.typecheck(replace(ctx, node=child)) for child in ctx.node.children]
    types = list(filter(None, types))

    scope = seek_parent_scope(ctx.node)
    assert scope is not None # internal assert
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

SCOPE_MACRO = ["do", "then", "else"]
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

    ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "must have a single child")
    node = ctx.node.children[0]
    out = IndentedStringIO()
    inner_ctx = replace(ctx, node=node, expression_out=out)
    ctx.compiler.compile_ctx(inner_ctx)

    iter_ident = ctx.compiler.get_new_ident()
    ctx.statement_out.write(f"""
const {iter_ident} = {out.getvalue()}[Symbol.iterator]();
while (true) {{
    {{
        const {{ value, done }} = {iter_ident}.next();
        if (done) break;
        scope.{name} = value;
    }}
""")
    with ctx.statement_out:
        node = ctx.node.metadata[Associated_code_block]
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("if")
def block_header(ctx: MacroContext):
    ctx.compiler.compile_fn_call(ctx, f"{ctx.node.metadata[Macro]} (", ctx.node.children, ident=False)

    ctx.statement_out.write("{")
    with ctx.statement_out:
        node = ctx.node.metadata[Associated_code_block]
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("while")
def while_loop(ctx: MacroContext):
    ctx.statement_out.write("while(true) {")
    with ctx.statement_out:
        ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "must have a single child")
        node = ctx.node.children[0]
        out = IndentedStringIO()
        inner_ctx = replace(ctx, node=node, expression_out=out)
        ctx.compiler.compile_ctx(inner_ctx)

        ctx.statement_out.write(f"if (!{out.getvalue()}) ")
        ctx.statement_out.write("{ break; }\n")

        node = ctx.node.metadata[Associated_code_block]
        inner_ctx = replace(ctx, node=node)
        ctx.compiler.compile_ctx(inner_ctx)
    ctx.statement_out.write("}")

class Compiler:
    def __init__(self):
        self.nodes: list[Node] = []
        # TODO. incremental is good enough for now, but we'll have to stabilize it.
        #  the last thing you would want is the entire output changing because you added a statement. that's a lot of
        #  unnecessary diff. best way to solve this that i see is to make this block-scoped,
        #  so that each block gets its own incremental. a bit harder, though.
        self.incremental_id = 0
        self.compile_errors = []

    def get_new_ident(self):
        ident = f"_{hex(self.incremental_id)}"
        self.incremental_id += 1
        return ident

    def register(self, node: Node):
        self.nodes.append(node)

    def assert_(self, must_be_true: bool, node: Node, message: str):
        if not must_be_true:
            self.compile_error(node, f"failed to assert: {message}")

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
            self.__discover_macros(node, None)
            self.__preprocess_annotations(node)

        out = IndentedStringIO()
        out.write(js_lib + "\n\n")
        # need to wrap this crap in async because NodeJS is GARBAGE
        out.write("void (async () => {\n")
        with out:
            out.write("'use strict';\n")
            out.write("const scope = globalThis;\n")
            for node in self.nodes:
                assert node.content == "do" # root # internal assert
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
        print("compiled:")
        print(out.getvalue())
        return out.getvalue()
    
    def unroll_chain(self, ctx: MacroContext):
        node = ctx.node
        access, path = cut(node.content, " ")
        assert access in ACCESS_MACRO # internal assert
        access = []
        steps = path.split(" ")
        indexers = getattr(node.metadata.maybe(Indexers), "mapping", {})
        callers = getattr(node.metadata.maybe(Callers), "mapping", {})
        subs = indexers | callers
        # print(f"{(indexers.mapping if indexers else None)=}")

        def compile_args(args: list[Node]):
            args_rv = []
            for child in args:
                expression_out = IndentedStringIO()
                child_ctx = replace(ctx, node=child, expression_out=expression_out)
                ctx.compiler.compile_ctx(child_ctx)
                args_rv.append(expression_out.getvalue())
            return filter(None, args_rv)

        subs_mapped = {}
        for step, sub in subs.items():
            if isinstance(sub, Node): # TODO - could remove this by always ensuring it's a list on the writing side?
                sub = [sub]
            subs_mapped[step] = compile_args(sub)

        last_ident = "scope"
        for step in steps:
            is_last = step == steps[-1]

            call = step in callers or (is_last and len(ctx.node.children) > 0)

            args = []
            if not step in indexers:
                args.append(f"'{step}'")
            if step in subs:
                args += subs_mapped[step]
            if is_last:
                args += compile_args(node.children)

            index = step in indexers
            mode = "call_or_set" if len(args) > 1 else "get_or_call"
            ctx.statement_out.writeline(f"/*{step} {call=} {index=} {args=}*/")
            ident = ctx.compiler.get_new_ident() + to_valid_js_ident(step)
            args = ", ".join([arg for arg in args if arg])
            # ctx.statement_out.write(f"/*{step} resolved to {params}*/\n")
            ctx.statement_out.write(f"const {ident} = await indentifire.{mode}({last_ident}, {args})\n")
            last_ident = ident
        
        ctx.expression_out.write(last_ident)
        return

    def __discover_macros(self, node: Node, parent: Node):
        # TODO lstring macros should perhaps get special handling here...
        macro, args = cut(node.content, " ")
        node.metadata[Parent] = parent
        node.metadata[Macro] = macro
        node.metadata[Args] = args
        for child in node.children:
            self.__discover_macros(child, node)

    def typecheck(self, ctx: MacroContext):       
        macro = ctx.node.metadata[Macro]
        all_macros = typecheck.all()
        
        if macro in all_macros:
            return all_macros[macro](ctx)
        else:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.typecheck(child_ctx)

    def __preprocess_annotations(self, node: Node):
        # probably want to process children first, i reckon...
        for child in node.children:
            self.__preprocess_annotations(child)

        macro, args = str(node.metadata[Macro]), str(node.metadata[Args])
        parent = node.metadata[Parent]

        # preprocess indexers, storing them in the metadata
        # indexers are special annotations that must appear at the start (TODO - might remove this restriction in future...)
        if macro == "substituting":
            # and yes, i know how absurd the message sounds
            self.assert_(len(node.children) <= 1, node, "sub must have at most one child")
            self.assert_(args.find(" ") == -1, node, "sub must have one argument")
            if len(node.children) == 1:
                parent.metadata[Indexers].mapping[args] = node.children[0]
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                access = Node(f"a {args}", node.pos, children=None) # fake accessor node
                self.__discover_macros(access, None) # populate the metadata... TODO - awkward!
                parent.metadata[Indexers].mapping[args] = access
            parent.replace_child(node, None)

        if macro == "calling":
            self.assert_(len(node.children) == 1, node, "call must have one child")
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
        
        if macro == "type":
            self.assert_(len(node.children) == 0, node, "type must have no children")
            self.assert_(args.find(" ") == -1, node, "param must have one argument - the type identifier")
            self.assert_(parent.metadata[Macro] == "local", node, "type must be inside local") # TODO
            parent.metadata[FieldDemandType] = args
            parent.replace_child(node, None)        
        
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
                    current.metadata[Associated_code_block] = next
                    parent.replace_child(next, None)
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
            ident = ctx.compiler.get_new_ident()
            ctx.statement_out.write(f"const {ident} = ")
        ctx.statement_out.write(f"{call}")
        joiner = Joiner(ctx.statement_out, ", ")
        for i in args:
            with joiner:
                ctx.statement_out.write(i)
        ctx.statement_out.write(")\n")
        if ident:
            ctx.expression_out.write(ident)

    def compile_ctx(self, ctx: MacroContext):
        if ctx.node == ERASED_NODE:
            return

        # ctx.statement_out.write(f"/*from: \n {ctx.node}*/\n")
        macro = ctx.node.metadata[Macro]
        all_macros = macros.all() # cache it
        
        if macro in all_macros:
            all_macros[macro](ctx)
        else:
            raise ValueError(f"TODO. unknown macro {macro}")


from dataclasses import replace
from typing import Iterator, Protocol, TypeVar, Union, cast
from io import StringIO
from pathlib import Path
from node import Args, Associated_code_block, Callers, Indexers, Inject_code_start, Macro, Node, Params, Parent, Target
from strutil import IndentedStringIO, Joiner, cut, extract_indent, join_nested
from typing import Callable, Type, Dict, List, Optional
from utils import *

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

ACCESS_MACRO = {"a", "an", "access"}

from macro_registry import MacroContext, MacroRegistry
macros = MacroRegistry()

@macros.add("noop", "substituting", "calling", "inside", "param")
def does_not_compile(ctx):
    # does not compile into code itself - nothing to do
    pass

@macros.add("#", "//", "/*", "--", "note")
def does_not_compile(ctx):
    # comments are ignored. TODO - we could and perhaps should transfer comments to output?
    pass

@macros.add("fn")
def fn(ctx: MacroContext):
    assert ctx.args.find(" ") == -1 # no space == single param
    ctx.out.write(f"scope.{ctx.args} = async function (")
    joiner = Joiner(ctx.out, ", \n")
    params = ctx.node.metadata[Params].mapping.items()
    if len(params) > 0:
        ctx.out.write("\n")
    with ctx.out:
        for k, v in params:
            with joiner:
                # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                ctx.out.write(k)
    if len(params) > 0:
        ctx.out.write("\n")
    ctx.out.write(") ")
    next = ctx.node.metadata[Associated_code_block].block
    inject = Inject_code_start()
    for k, v in params:
        inject.code.append(f"scope.{k} = {k}\n")
    next.metadata[Inject_code_start] = inject

@macros.add(*[a for a in ACCESS_MACRO])
def access(ctx: MacroContext):
    access = ctx.resolve_JS_access(ctx)
    ctx.compile_fn_call(access, ctx.node, ctx.node.children, ctx.out)

@macros.add("local")
def local(ctx: MacroContext):
    name, _ = cut(ctx.args, " ")
    ctx.out.write(f"scope.{name} = indentifire.store()")
    if len(ctx.node.children) > 0:
        ctx.out.write("\n")
        ctx.compile_fn_call(f"scope, '{name}'", ctx.node, ctx.node.children, ctx.out)

@macros.add("int")
def int_macro(ctx: MacroContext):
    ctx.out.write(str(ctx.args))

@macros.add("string", "regex")
def str_macro(ctx: MacroContext):
    s = ctx.args
    if len(s) == 0:
        for child in ctx.node.children:
            s += ctx.recover_string(child)
    else:
        delim = s[0]
        assert s.startswith(delim)
        assert s.endswith(delim)
        s = s.removeprefix(delim).removesuffix(delim)
    s = s.replace("\n", "\\n")
    # TODO escape quotes as well...
    sep = '"' if ctx.macro == "string" else "/"
    ctx.out.write(f'{sep}{s}{sep}')

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
        ctx.out.write(literally[ctx.macro])

@macros.add("exists")
def exists_inside(ctx: MacroContext):
    name = f"indentifire, 'exists_inside'"
    ctx.compile_fn_call(name, ctx.node, [ctx.node.metadata[Target]] + ctx.node.children, ctx.out)

@macros.add(*[b for b in builtins.keys()])
def builtin(ctx: MacroContext):
    name = f"indentifire, '{builtins[ctx.macro]}'"
    ctx.compile_fn_call(name, ctx.node, ctx.node.children, ctx.out)

@macros.add("do", "then", "else")
def block(ctx: MacroContext):
    if ctx.macro in ["else"]:
        ctx.out.write(f"{ctx.macro} ")

    ctx.out.write("{\n")
    with ctx.out:
        ctx.out.write("const parent_scope = scope\n")
        ctx.out.write("{\n")
        with ctx.out:
            ctx.out.write("const scope = indentifire.scope(parent_scope)\n")
            inject = ctx.node.metadata.maybe(Inject_code_start)
            if inject:
                for code in inject.code:
                    ctx.out.write(code)
            for child in ctx.node.children:
                child_ctx = replace(ctx, macro=child.metadata[Macro], args=child.metadata[Args], node=child)
                child_ctx.compile(child_ctx)
                ctx.out.write("\n")
        ctx.out.write("}\n")
    ctx.out.write("} ")

@macros.add("for")
def for_macro(ctx: MacroContext):
    split = ctx.node.content.split(" ")
    assert len(split) == 3
    # assert split[0] == "for" # inherent per semantics
    name = split[1]
    assert split[2] == "in"
    ctx.out.write("\n")
    ctx.out.write(f"for (const iter of ")
    assert len(ctx.node.children) == 1
    child = ctx.node.children[0]
    child_ctx = replace(ctx, macro=child.metadata[Macro], args=child.metadata[Args], node=child)
    ctx.compile(child_ctx)
    ctx.out.write(")")
    next = ctx.node.metadata[Associated_code_block].block
    inject = Inject_code_start()
    inject.code.append(f"scope.{name} = iter\n")
    next.metadata[Inject_code_start] = inject

@macros.add("if", "while")
def block_header(ctx: MacroContext):
    ctx.out.write("\n")
    ctx.out.write(f"{ctx.macro} (")
    with ctx.out:
        assert len(ctx.node.children) == 1
        child = ctx.node.children[0]
        child_ctx = replace(ctx, macro=child.metadata[Macro], args=child.metadata[Args], node=child)
        child_ctx.compile(child_ctx)
    ctx.out.write(")")

class Compiler:
    def __init__(self):
        self.nodes: list[Node] = []

    def register(self, node: Node):
        self.nodes.append(node)

    def compile_JS(self):
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
                assert node.content == "do" # root
                ctx=MacroContext(
                    macro="do$root", # TODO ROOT_NODE_PSEUDOMACRO = 
                    args="",
                    out=out,
                    node=node,

                    compile=self.__compile_JS,
                    resolve_JS_access=self.__resolve_JS_access,
                    compile_fn_call=self.__compile_JS_function_call
                )
                self.__compile_JS(ctx)
        out.write("\n})();")
        print("compiled:")
        print(out.getvalue())
        return out.getvalue()
    
    def __resolve_JS_access(self, ctx: MacroContext) -> str:
        node = ctx.node
        access, path = cut(node.content, " ")
        assert access in ACCESS_MACRO
        access = ["scope"]
        steps = path.split(" ")
        indexers = getattr(node.metadata.maybe(Indexers), "mapping", {})
        callers = getattr(node.metadata.maybe(Callers), "mapping", {})
        subs = indexers | callers
        # print(f"{(indexers.mapping if indexers else None)=}")
        def resolve_index(step):
            if step in subs:
                out = IndentedStringIO()
                sub = subs[step]
                if isinstance(sub, Node): # TODO - could remove this by always ensuring it's a list on the writing side?
                    sub = [sub]
                
                joiner = Joiner(out, ",\n")
                if step in callers:
                    with joiner:
                        out.write(f"'{step}'")
                for child in sub:
                    with joiner:
                        child_ctx = replace(ctx, macro=child.metadata[Macro], args=child.metadata[Args], node=child, out=out)
                        self.__compile_JS(child_ctx)                 
                return out.getvalue()
            else:
                return f"'{step}'"

        for step in steps[:-1]:
            mode = "call_or_set" if step in callers else "get_or_call"
            access = ["await indentifire.", mode, "(\n", access, ",\n", resolve_index(step), "\n)"]
        
        access.append(",")
        access.append(resolve_index(steps[-1:][0]))
        return join_nested(access)

    def __discover_macros(self, node: Node, parent: Node):
        # TODO lstring macros should perhaps get special handling here...
        macro, args = cut(node.content, " ")
        node.metadata[Parent] = parent
        node.metadata[Macro] = macro
        node.metadata[Args] = args
        for child in node.children:
            self.__discover_macros(child, node)

    def __preprocess_annotations(self, node: Node):
        # probably want to process children first, i reckon...
        for child in node.children:
            self.__preprocess_annotations(child)

        macro, args = str(node.metadata[Macro]), str(node.metadata[Args])
        parent = node.metadata[Parent]

        # preprocess indexers, storing them in the metadata
        # indexers are special annotations that must appear at the start (TODO - might remove this restriction in future...)
        if macro == "substituting":
            assert len(node.children) <= 1
            assert args.find(" ") == -1 # no space == single arg
            if len(node.children) == 1:
                parent.metadata[Indexers].mapping[args] = node.children[0]
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                access = Node(f"a {args}") # fake accessor node
                self.__discover_macros(access, None) # populate the metadata... TODO - awkward!
                parent.metadata[Indexers].mapping[args] = access

        if macro == "calling":
            assert len(node.children) == 1
            assert args.find(" ") == -1 # no space == single arg
            parent.metadata[Callers].mapping[args] = node.children

        # exists inside
        if macro == "inside":
            assert len(node.children) == 1
            assert args.strip() == ""
            assert parent.metadata[Macro] == "exists"
            parent.metadata[Target] = node.children[0]
    
        # function param
        if macro == "param":
            assert len(node.children) == 0 # TODO - default value ? TODO - annotations ?
            assert args.find(" ") == -1 # no space == single arg. name only
            assert parent.metadata[Macro] == "fn" # TODO
            parent.metadata[Params].mapping[args] = True # TODO for now. probably a metadata object in the future
        
        # associate code blocks with relevant headers
        CODE_BLOCK_HEADERS = {
            "if": "then",
            "while": "do",
            "for": "do",
            "fn": "do"
        }
        for i in range(len(node.children)):
            current = node.children[i]
            next = node.children[i+1] if i+1 < len(node.children) else None

            macro, args = str(current.metadata[Macro]), str(current.metadata[Args])
            if macro in CODE_BLOCK_HEADERS:
                expected_next = CODE_BLOCK_HEADERS[macro]
                macro, args = str(next.metadata[Macro]), str(next.metadata[Args])
                if macro == expected_next:
                    current.metadata[Associated_code_block] = Associated_code_block(next)
                else:
                    ValueError(f"for {macro} expected a following {expected_next}")
                

    def __compile_JS_function_call(self, access: str, node: Node, args: list[Node], out:IndentedStringIO):
        args_compiled = []
        for arg in args:
            arg_out = IndentedStringIO()
            ctx = MacroContext(
                macro=arg.metadata[Macro],
                args=arg.metadata[Args],
                out=arg_out,
                node=arg,
                compile=self.__compile_JS,
                resolve_JS_access=self.__resolve_JS_access,
                compile_fn_call=self.__compile_JS_function_call
            )
            self.__compile_JS(ctx)
            arg_out = arg_out.getvalue()
            if arg_out:
                args_compiled.append(arg_out)
        fn = "get_or_call" if len(args_compiled) == 0 else "call_or_set"
        out.write(f"await indentifire.{fn}(\n")
        args_compiled.insert(0, access)
        with out:
            out.write(", ".join(args_compiled))
        out.write("\n)")

    def __compile_JS(self, ctx: MacroContext):
        macro, args = cut(ctx.node.content, " ")

        all_macros = macros.all() # cache it
        macro_ctx = MacroContext(
            macro=macro,
            args=args,
            out=ctx.out,
            node=ctx.node,

            compile=self.__compile_JS,
            resolve_JS_access=self.__resolve_JS_access,
            compile_fn_call=self.__compile_JS_function_call
        )
        
        if macro in all_macros:
            all_macros[macro](macro_ctx)
        else:
            raise ValueError(f"TODO. unknown macro {macro}")


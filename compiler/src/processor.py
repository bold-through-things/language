from typing import Iterator
from io import StringIO
from pathlib import Path
from node import Args, Associated_code_block, Callers, Indexers, Inject_code_start, Macro, Node, Params, Parent, Target
from strutil import Joiner, cut, extract_indent, join_nested
from typing import Callable, Type, Dict, List, Optional

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

from typing import Optional

class IndentedStringIO:
    def __init__(self, indent: str = '    ') -> None:
        self._buf: list[str] = []
        self._indent_str = indent
        self._indent_level = 0
        self._at_line_start = True

    def write(self, s: str) -> None:
        for line in s.splitlines(True):  # keep line endings
            if self._at_line_start and line.strip():
                self._buf.append(self._indent_str * self._indent_level)
            self._buf.append(line)
            self._at_line_start = line.endswith('\n')

    def writeline(self, s: str = '') -> None:
        if self._at_line_start:
            self._buf.append(self._indent_str * self._indent_level)
        self._buf.append(s + '\n')
        self._at_line_start = True

    def indent(self, levels: int = 1) -> None:
        self._indent_level += levels

    def dedent(self, levels: int = 1) -> None:
        self._indent_level = max(0, self._indent_level - levels)

    def getvalue(self) -> str:
        return ''.join(self._buf)

    def reset(self) -> None:
        self._buf.clear()
        self._indent_level = 0
        self._at_line_start = True

    def __str__(self) -> str:
        return self.getvalue()

    def __enter__(self) -> 'IndentedStringIO':
        self.indent()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb) -> None:
        self.dedent()

ACCESS_MACRO = {"a", "an", "access"}

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
                self.__compile_JS(node, out)
        out.write("\n})();")
        print("compiled:")
        print(out.getvalue())
        return out.getvalue()
    
    def __recover_string(self, node: Node) -> str:
        return node.content + "\n" + "\n".join(["\t"+child.content for child in node.children])
    
    def __resolve_JS_access(self, node: Node) -> str:
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
                        self.__compile_JS(child, out)                    
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
                parent.metadata[Indexers].mapping[args] = Node(f"a {args}") # fake accessor node

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
            self.__compile_JS(arg, arg_out)
            arg_out = arg_out.getvalue()
            if arg_out:
                args_compiled.append(arg_out)
        fn = "get_or_call" if len(args_compiled) == 0 else "call_or_set"
        out.write(f"await indentifire.{fn}(\n")
        args_compiled.insert(0, access)
        with out:
            out.write(", ".join(args_compiled))
        out.write("\n)")

    def __compile_JS(self, node: Node, out: IndentedStringIO):
        macro, args = cut(node.content, " ")

        literally = {
            "true": "true",
            "false": "false",
            "break": "break",
            "continue": "continue",
            "dict": "{}",
            "list": "[]",
            "return": "return"
        }
        
        if macro in ["if", "while"]:
            # WTF ? xddxddd
            out.write("\n")
            out.write(f"{macro} (")
            with out:
                assert len(node.children) == 1
                self.__compile_JS(node.children[0], out)
            out.write(")")
        elif macro in ["for"]:
            split = node.content.split(" ")
            assert len(split) == 3
            # assert split[0] == "for" # inherent per semantics
            name = split[1]
            assert split[2] == "in"
            out.write("\n")
            out.write(f"for (const iter of ")
            assert len(node.children) == 1
            self.__compile_JS(node.children[0], out)
            out.write(")")
            next = node.metadata[Associated_code_block].block
            inject = Inject_code_start()
            inject.code.append(f"scope.{name} = iter\n")
            next.metadata[Inject_code_start] = inject

        elif macro in ["do", "then", "else"]:
            if macro in ["else"]:
                out.write(f"{macro} ")

            out.write("{\n")
            with out:
                out.write("const parent_scope = scope\n")
                out.write("{\n")
                with out:
                    out.write("const scope = indentifire.scope(parent_scope)\n")
                    inject = node.metadata.maybe(Inject_code_start)
                    if inject:
                        for code in inject.code:
                            out.write(code)
                    for child in node.children:
                        self.__compile_JS(child, out)
                        out.write("\n")
                out.write("}\n")
            out.write("} ")
        elif macro in builtins:
            name = f"indentifire, '{builtins[macro]}'"
            self.__compile_JS_function_call(name, node, node.children, out)
        elif macro in ["exists"]:
            name = f"indentifire, 'exists_inside'"
            self.__compile_JS_function_call(name, node, [node.metadata[Target]] + node.children, out)
        elif macro in ["string", "regex"]:
            s = args
            if len(s) == 0:
                for child in node.children:
                    s += self.__recover_string(child)
            else:
                delim = s[0]
                assert s.startswith(delim)
                assert s.endswith(delim)
                s = s.removeprefix(delim).removesuffix(delim)
            s = s.replace("\n", "\\n")
            # TODO escape quotes as well...
            sep = '"' if macro == "string" else "/"
            out.write(f'{sep}{s}{sep}')
        elif macro in ["int"]:
            out.write(str(args))
        elif macro in literally:
            out.write(literally[macro])
        elif macro in ["local"]:
            name, _ = cut(args, " ")
            out.write(f"scope.{name} = indentifire.store()")
            if len(node.children) > 0:
                out.write("\n")
                self.__compile_JS_function_call(f"scope, '{name}'", node, node.children, out)
        elif macro in ACCESS_MACRO:
            access = self.__resolve_JS_access(node)
            self.__compile_JS_function_call(access, node, node.children, out)
        elif macro in {"fn"}:
            assert args.find(" ") == -1 # no space == single param
            out.write(f"scope.{args} = async function (")
            joiner = Joiner(out, ", \n")
            params = node.metadata[Params].mapping.items()
            if len(params) > 0:
                out.write("\n")
            with out:
                for k, v in params:
                    with joiner:
                        # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                        out.write(k)
            if len(params) > 0:
                out.write("\n")
            out.write(") ")
            next = node.metadata[Associated_code_block].block
            inject = Inject_code_start()
            for k, v in params:
                inject.code.append(f"scope.{k} = {k}\n")
            next.metadata[Inject_code_start] = inject
        elif macro in {"noop", "substituting", "calling", "inside", "param"}:
            pass # does not compile into code itself
        elif macro in {"#", "//", "/*", "--", "note"}:
            pass # comments are ignored. TODO - we could and perhaps should transfer comments to output?
        else:
            raise ValueError(f"TODO. unknown macro {macro}")


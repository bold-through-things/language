from typing import Iterator
from io import StringIO
from pathlib import Path
from node import Node
from strutil import cut, extract_indent
from typing import Callable, Type, Dict, List, Optional

js_lib = open(Path(__file__).parent.joinpath("stdlib/lib.js")).read()

builtins = {
    "print": "console.log",
    # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
    #  blocking prompt function. in future should probably write such a function
    #  and remove unnecessary await.
    #  then again, considering this is almost guaranteed to only be used for debugging...
    #  does it matter?
    "prompt": "await prompt",
    # TODO - these ought to be static code instead of function calls...
    "concat": "indentifire.concat",
    "either": "indentifire.either",
    "eq": "indentifire.eq",
    "asc": "indentifire.asc",
    "add": "indentifire.add",
    "mod": "indentifire.mod"
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

class Compiler:
    def __init__(self):
        self.nodes: list[Node] = []

    def register(self, node: Node):
        self.nodes.append(node)

    def compile_JS(self):

        out = IndentedStringIO()
        out.write(js_lib + "\n\n")
        # need to wrap this crap in async because NodeJS is GARBAGE
        out.write("void (async () => {\n")
        with out:
            for node in self.nodes:
                assert node.content == "do" # root
                self.__compile_JS(node, out)
        out.write("})();")
        print("compiled:")
        print(out.getvalue())
        return out.getvalue()
    
    def __recover_string(self, node: Node) -> str:
        return node.content + "\n" + "\n".join(["\t"+child.content for child in node.children])
    
    def __compile_JS_function_call(self, name, args: list[Node], out:IndentedStringIO):
        out.write(f"{name}(")
        first = True
        with out:
            for arg in args:
                if not first:
                    out.write(", ")
                first = False
                self.__compile_JS(arg, out)
        out.write(")")

    def __compile_JS(self, node: Node, out: IndentedStringIO):
        macro, args = cut(node.content, " ")
        
        if macro in ["if", "while"]:
            # WTF ? xddxddd
            out.write("\n")
            self.__compile_JS_function_call(macro, node.children, out)
        elif macro in ["do", "then", "else"]:
            if macro in ["else"]:
                out.write(f"{macro} ")
            out.write("{\n")
            
            with out:
                for child in node.children:
                    self.__compile_JS(child, out)
                    out.write("\n")

            out.write("} ")
        elif macro in builtins:
            fn = builtins[macro]
            self.__compile_JS_function_call(fn, node.children, out)
        elif macro in ["string"]:
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
            out.write(f'"{s}"')
        elif macro in ["int"]:
            out.write(str(args))
        elif macro in ["true", "false", "break", "continue"]:
            out.write(macro)
        elif macro in ["local"]:
            name, _ = cut(args, " ")
            assert name.startswith(".")
            name = name.removeprefix(".")
            out.write(f"let {name}")
            out.write(" = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})")
            if len(node.children) > 0:
                out.write("\n")
                self.__compile_JS_function_call(name, node.children, out)
        elif macro.startswith("."):
            fn = macro.removeprefix(".")
            self.__compile_JS_function_call(fn, node.children, out)
        else:
            raise ValueError(f"TODO. unknown macro {macro}")


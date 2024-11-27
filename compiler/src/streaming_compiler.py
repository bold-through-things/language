from typing import Iterator
from io import StringIO
from pathlib import Path

js_lib = open(Path(__file__).parent.joinpath("stdlib/lib.js")).read()

def cut(line:str, sep:str):
    index = line.find(sep)
    if index == -1:
        return line, ""
    return line[:index], line[index+len(sep):]
    
def extract_indent(line: str) -> tuple[str, int]:
    indent = 0
    while line.startswith('\t'):
        indent += 1
        line = line[1:]
    return line, indent

class BuiltinDefinition:
    def __init__(self, name) -> None:
        self.name = name
    def JS(self, s: str):
        self.js = s
        return self
    # more languages here

class Instruction:
    def __init__(self):
        self.children:list["Instruction"]=[]
    def add_child(self, i: "Instruction"):
        self.children.append(i)
    def compile_JS(self, out: StringIO):
        for child in self.children:
            child.compile_JS(out)
            out.write("\n")
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "Instruction {\n"+ "\n".join([c.indented(indent+1) for c in self.children]) + "\n" + indentStr + "}"
    
class CodeBlock(Instruction):
    def __init__(self, name: str):
        super(CodeBlock, self).__init__()
        self.name = name
    def compile_JS(self, out: StringIO):
        out.write(self.name + "{\n")
        for child in self.children:
            child.compile_JS(out)
            out.write("\n")
        out.write("}")
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "CodeBlock "+self.name+" {\n"+ "\n".join([c.indented(indent+1) for c in self.children]) + "\n" + indentStr + "}"

class StringLiteral(Instruction):
    def __init__(self, s: str):
        super(StringLiteral, self).__init__()
        self.s = s
    def compile_JS(self, out: StringIO):
        self.s = self.s.replace("\n", "\\n")
        out.write('"'+self.s+'"')
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "StringLiteral { \n"+self.s +"\n" + indentStr + "}"

class NumberLiteral(Instruction):
    def __init__(self, num: float):
        super(NumberLiteral, self).__init__()
        self.num = num
    def compile_JS(self, out: StringIO):
        out.write(str(self.num))
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "NumberLiteral "+str(self.num)+";"

class FunctionCall(Instruction):
    def __init__(self, fn: BuiltinDefinition):
        super(FunctionCall, self).__init__()
        self.fn = fn
    def compile_JS(self, out: StringIO):
        out.write(self.fn.js+"(")
        first = True
        for child in self.children:
            if not first:
                out.write(", ")
            child.compile_JS(out)
            first = False
        out.write(")")
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "FunctionCall "+self.fn.name+" {\n"+ "\n".join([c.indented(indent+1) for c in self.children]) + "\n" + indentStr + "}"

class LocalVariable(Instruction):
    # TODO - should accept type
    def __init__(self, name):
        super(LocalVariable, self).__init__()
        self.name = name
    def compile_JS(self, out: StringIO):
        # TODO. this is quite stupid but it works.
        #  in future we should define variables directly, without resorting to this function nonsense
        #  but that will require more complex code that will have to inspect identifiers to figure out
        #  if it's a function or a field.
        out.write("let "+self.name+" = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})")
        if len(self.children) > 0:
            out.write("\n")
            fn = FunctionCall(BuiltinDefinition(self.name).JS(self.name))
            fn.children = self.children
            fn.compile_JS(out)
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        rv =  indentStr + "LocalVariable "+self.name
        if len(self.children) > 0:
            rv += " {\n"+ "\n".join([c.indented(indent+1) for c in self.children]) + "\n" + indentStr + "}";
        else:
            rv += ";"
        return rv

class Code(Instruction):
    def __init__(self):
        super(Code, self).__init__()
    def JS(self, code):
        self.js = code
        return self
    def compile_JS(self, out: StringIO):
        out.write(self.js)
    def indented(self, indent) -> str:
        indentStr = "\t"*indent
        return indentStr + "Code "+self.js+";"

class StreamingCompiler:
    def __init__(self):
        self.__pending = [Instruction()]

    def compile(self):
        # we still have a few pending instructions that we need to push
        self.__push_pending(1)

        out = StringIO()
        print(self.__pending[0].indented(0))
        out.write(js_lib + "\n\n")
        # need to wrap this crap in async because NodeJS is GARBAGE
        out.write(";(async () => {\n")
        self.__pending[0].compile_JS(out)
        out.write("})();")
        print("compiled:")
        print(out.getvalue())
        return out.getvalue()

    def consume_all(self, lines: Iterator[str]):
        """
        Consumes the entire iterator and parses the code.
        """
        while True:
            try:
                self.consume_one(lines)
            except StopIteration:
                break

    def __push_pending(self, indent):
        # push all pending instructions on this or higher indent levels into their parents
        for i, instr in reversed(list(enumerate(self.__pending))):
            if i < indent:
                break
            parent = self.__pending[i-1]
            parent.add_child(instr)

        # snip off the pushed instructions so they don't get pushed again
        self.__pending = self.__pending[:indent]
    
    def consume_one(self, lines: Iterator[str]):
        """
        Consumes a single instruction. Note that an instruction can span multiple lines, which is why this
        method accepts an iterator.
        """
        line = next(lines)
        while True:
            line, indent = extract_indent(line)
            # print(self.__pending[0].indented(0))

            if not line.endswith("\n"):
                # likely the last line. parsing further down expects lines to end with \n, so make it so
                line += "\n"

            if line.isspace():
                # skip empty/indentation-only lines
                break

            # simplifies code. all the top-level lines are indent-1, belonging to a fake top-level Instruction
            # which is at indent-0
            indent += 1

            self.__push_pending(indent)

            instr, args = cut(line, " ")
            instr = instr.removesuffix("\n")

            print(instr)

            if instr == "heredoc":
                # TODO - this should probably support escape sequences nevertheless
                #  not as important for newlines, but would be needed for control characters
                #  and other unprintable crap
                eof = args.removesuffix("\n")
                heredoc = self.__consume_heredoc(eof, lines)
                self.__pending.append(StringLiteral(heredoc))
                break

            if instr == "local":
                name, mustBeEmpty = cut(args, " ")
                name = name.removesuffix("\n")
                if len(mustBeEmpty) > 0:
                    raise Exception("invalid local variable definition")
                self.__pending.append(LocalVariable(name))
                break

            if instr == "string":
                # TODO - this should support multiline strings (via \ newline escape)
                #  also should support escapes
                start_char = args[0]
                args = args.removesuffix("\n")
                if start_char == '\\':
                    raise Exception("cannot start a string with \\ (such a string cannot be terminated)")
                if not len(args) >= 2:
                    raise Exception("invalid string (only one delimiter present?)")
                if not args.endswith(start_char):
                    raise Exception("string started with "+start_char+", must end with "+start_char+" (to ensure trailing whitespace is visible)")
                args = args.removeprefix(start_char).removesuffix(start_char)

                self.__pending.append(StringLiteral(args))
                break
            if instr == "int":
                args = args.removesuffix("\n")
                args = int(args)
                self.__pending.append(NumberLiteral(args))
                break

            if instr == "do":
                # TODO - must check previous sibling is "while" and such
                self.__pending.append(CodeBlock(""))
                break

            if instr == "then":
                # TODO - must check previous sibling is "if"
                self.__pending.append(CodeBlock(""))
                break
            if instr == "else":
                # TODO - must check previous sibling is "then"
                self.__pending.append(CodeBlock("else"))
                break

            if instr == "break":
                # TODO - must check we're inside a loop
                self.__pending.append(Code().JS("\nbreak;"))
                break

            if instr == "true":
                self.__pending.append(Code().JS(" true "))
                break
            if instr == "false":
                self.__pending.append(Code().JS(" false "))
                break

            builtins = {
                "print": BuiltinDefinition("print").JS("console.log"),
                # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
                #  blocking prompt function. in future should probably write such a function
                #  and remove unnecessary await.
                #  then again, considering this is almost guaranteed to only be used for debugging...
                #  does it matter?
                "prompt": BuiltinDefinition("prompt").JS("await prompt"),
                # TODO - these ought to be static code instead of function calls...
                "concat": BuiltinDefinition("concat").JS("indentifire.concat"),
                "either": BuiltinDefinition("either").JS("indentifire.either"),
                "eq": BuiltinDefinition("either").JS("indentifire.eq"),
                "asc": BuiltinDefinition("either").JS("indentifire.asc"),
                "add": BuiltinDefinition("either").JS("indentifire.add")
            }
            if instr in builtins:
                self.__pending.append(FunctionCall(builtins[instr]))
                break

            fn = BuiltinDefinition(instr).JS(instr) # TODO this is stupid
            self.__pending.append(FunctionCall(fn))
            break

    def __consume_heredoc(self, eof, lines : Iterator[str]) -> str:
        line = next(lines)
        result = ""
        while True:
            if line.removesuffix("\n").endswith(eof):
                line = line.removesuffix("\n").removesuffix(eof)
                result += line
                return result
            
            result += line
            line = next(lines)
        
def cut(line:str, sep:str) -> tuple[str, str]:
    index = line.find(sep)
    if index == -1:
        return line, ""
    return line[:index], line[index+len(sep):]
    
def extract_indent(line: str) -> tuple[str, int]:
    # check for space-based indentation first and reject it
    if line.startswith(' '):
        # find the position of the first space for error reporting
        from error_types import ErrorType
        raise IndentationError(f"this language only accepts tabs for indentation, not spaces! spaces are like, totally uncool. use tabs instead, they're way more precise and semantic.")
    
    indent = 0
    while line.startswith('\t'):
        indent += 1
        line = line[1:]
    return line, indent

from io import StringIO
from typing import Any, Union, List

A = List[Union[str, 'A']]

def join_nested(data: A, indent: int = 2, level: int = 0) -> str:
    def stringify(x: Union[str, A]) -> str:
        if isinstance(x, str):
            return x
        return join_nested(x, indent=indent, level=level + 1)

    s = " ".join([stringify(item) for item in data])
    lines = [(' ' * indent * level) + line for line in s.split("\n")]
    return '\n'.join(lines)

from typing import TextIO

class Joiner:
    def __init__(self, out: TextIO, sep: str) -> None:
        self.out = out
        self.sep = sep
        self._first = True

    def __enter__(self) -> None:
        if self._first:
            self._first = False
        else:
            self.out.write(self.sep)

    def __exit__(self, *args: Any) -> None:
        pass


class IndentedStringIO(StringIO):
    def __init__(self, indent: str = '    ') -> None:
        self._buf: list[str] = []
        self._indent_str = indent
        self._indent_level = 0
        self._at_line_start = True

    def write(self, s: str) -> int:
        for line in s.splitlines(True):  # keep line endings
            if self._at_line_start and line.strip():
                self._buf.append(self._indent_str * self._indent_level)
            self._buf.append(line)
            self._at_line_start = line.endswith('\n')
        return len(s)

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

    def __exit__(self, *args: Any) -> None:
        self.dedent()

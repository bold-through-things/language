def cut(line:str, sep:str) -> tuple[str, str]:
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

from typing import Union, List

A = List[Union[str, 'A']]

def join_nested(data: A, indent: int = 2, level: int = 0) -> str:
    def stringify(x: Union[str, A]) -> str:
        if isinstance(x, str):
            return x
        if isinstance(x, list):
            return join_nested(x, indent=indent, level=level + 1)
        raise TypeError(f"Unsupported type: {type(x).__name__}")

    s = " ".join([stringify(item) for item in data])
    lines = [(' ' * indent * level) + line for line in s.split("\n")]
    return '\n'.join(lines)

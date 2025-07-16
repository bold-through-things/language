from typing import Iterator
from io import StringIO
from pathlib import Path
from strutil import cut, extract_indent
from node import Node
from typing import Generic, List, TypeVar

T = TypeVar("T")

class TrimStack(Generic[T]):
    def __init__(self) -> None:
        self._data: List[T] = []

    def __setitem__(self, index: int, value: T) -> None:
        if index == len(self._data):
            self._data.append(value)
        elif 0 <= index < len(self._data):
            self._data[index] = value
        else:
            raise IndexError("Index out of bounds (can only set existing index or append)")

    def __getitem__(self, index: int) -> T:
        return self._data[index]

    def trim(self, max_index: int) -> None:
        if max_index < 0:
            self._data.clear()
        else:
            self._data = self._data[:max_index + 1]

    def __len__(self) -> int:
        return len(self._data)

    def __repr__(self) -> str:
        return f"{self.__class__.__name__}({self._data})"

class TreeParser:    
    def parse_tree(self, code: str) -> Node:
        # prepend and append newlines for simpler and cleaner handling
        # TODO - although this will fuck over line numbers, so might actually be a bad idea?
        code = f"\n{code}\n"

        scope: TrimStack[Node] = TrimStack()
        root = Node("do")
        scope[0] = root
        for line in code.split("\n"):
            line, indent = extract_indent(line)

            # simplifies code. all the top-level lines are indent-1, belonging to a fake top-level Node
            # which is at indent-0
            indent += 1

            if line.isspace() or len(line) <= 0:
                # skip empty/indentation-only lines
                continue

            node = Node(line)
            scope[indent - 1].children.append(node)
            scope[indent] = node
            scope.trim(indent)
        
        return root
        
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Iterator
from io import StringIO
from pathlib import Path
from strutil import cut, extract_indent
from node import Node, Position
from typing import Generic, List, TypeVar
from logger import default_logger

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
        
        default_logger.log("parse", f"parsing {len(code)} characters of source code")

        @dataclass
        class ParsingNode:
            content: str
            position: Position
            children: list[ParsingNode] = field(default_factory=list)            
            def toNode(self):
                return Node(content=self.content, pos=self.position, children=[child.toNode() for child in self.children])

        scope: TrimStack[ParsingNode] = TrimStack()
        root = ParsingNode("PIL:file", Position(0))
        scope[0] = root
        line_num = 0
        
        lines = code.split("\n")
        default_logger.log("parse", f"processing {len(lines)} lines")
        
        for line in lines:
            line_num += 1 # at the start - assumes above \n{code}\n
            line, indent = extract_indent(line)

            # simplifies code. all the top-level lines are indent-1, belonging to a fake top-level Node
            # which is at indent-0
            indent += 1

            if line.isspace() or len(line) <= 0:
                # skip empty/indentation-only lines
                continue

            default_logger.log("parse", f"line {line_num}: indent={indent}, content='{line}'")
            node = ParsingNode(line, Position(line_num))
            scope[indent - 1].children.append(node)
            scope[indent] = node
            scope.trim(indent)
        
        result = root.toNode()
        default_logger.log("parse", f"parsing complete, tree has {self._count_nodes(result)} nodes")
        return result
        
    def _count_nodes(self, node: Node) -> int:
        """helper to count total nodes in tree for logging"""
        count = 1
        for child in node.children:
            count += self._count_nodes(child)
        return count
        
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Sequence, Union

# Keep TypeMap import for backwards compatibility with existing registrations
from utils import TypeMap


@dataclass
class Position:
    line: int
    char: int = 0

class Node:
    def __init__(self, content: str | None, pos: Position | None, children: list["Node"] | None) -> None:
        self.content = content or ""
        self._children: list[Node] = children or []
        self.parent: Node | None = None
        for child in self._children:
            child.parent = self
        self.pos = pos

    @property
    def children(self) -> Sequence["Node"]:
        return list(self._children)

    def replace_child(self, target: "Node", new: Union["Node", list["Node"], None]) -> None:
        matches = [i for i, child in enumerate(self._children) if child is target]
        if not matches:
            raise ValueError("target child not found")
        if len(matches) > 1:
            raise ValueError("target child appears multiple times")

        index = matches[0]
        # detach old
        target.parent = None
        self._children.remove(target)
        self.__insert_child(index, new)
        
        # Notify about tree changes for metadata invalidation
        self._notify_tree_change()

    def append_child(self, new: Node | list[Node] | None):
        self.__insert_child(len(self._children), new)
        self._notify_tree_change()

    def __insert_child(self, index: int, new: Node | list[Node] | None):
        # prepare new children
        if new is None:
            replacement = []
        elif isinstance(new, Node):
            replacement = [new]
        else:
            replacement = list(new)

        for child in reversed(replacement):
            assert isinstance(child, Node) # internal assert
            child.parent = self
            self._children.insert(index, child)

    def _notify_tree_change(self):
        """Hook for notifying about tree changes - to be implemented by compiler"""
        # This will be used by the compiler to invalidate metadata
        pass

    def __repr__(self) -> str:
        return self.indented_repr()

    def indented_repr(self, indent: str = "") -> str:
        next_indent = "\t" + indent
        return f"{indent}{self.content}\n" + "\n".join(
            child.indented_repr(next_indent) for child in self._children
        )
    
class Runtime_scope:
    def __init__(self, parent: Union["Runtime_scope", None] = None):
        self.locals = []
        self.parent = parent

@dataclass
class Indexers:
    mapping: dict[str, Any] = field(default_factory=dict)

@TypeMap.register(Indexers)      
def __indexers(): return Indexers()

@dataclass
class Callers:
    mapping: dict[str, Any] = field(default_factory=dict)

@TypeMap.register(Callers)      
def __callers(): return Callers()

@dataclass
class Params:
    mapping: dict[str, Any] = field(default_factory=dict)

@TypeMap.register(Params)      
def __params(): return Params()

@dataclass
class Inject_code_start:
    code: list[str] = field(default_factory=list)

# generic Target for cases where a node needs another node to do its job
# TODO - might remove Associated_code_block in favor of this ?
class Target(Node): pass 
class Macro(str): pass
class Args(str): pass

@dataclass
class FieldDemandType(str): pass

@dataclass 
class ResolvedConvention:
    """Stores the resolved calling convention for a function call"""
    convention: Any = None  # Will hold PrototypeCall or DirectCall

@dataclass
class Scope:
    parent: Scope | None
    mapping: dict[str, FieldDemandType] = field(default_factory=dict)
    def resolve(self, name: str) -> FieldDemandType | None:
        # hahahahahaha what the hell are you doing Python
        return self.mapping[name] if name in self.mapping else self.parent.resolve(name) if self.parent else None

# TODO. i don't know where to stuff this one. it doesn't belong into Node directly as that would polute the pretty
#  and clean parser-specific class with irrelevant macro-specific garbage such as this.
def recover_string(node: Node) -> str:
    return (node.content or "") + "\n" + "\n".join(["\t"+recover_string(child) for child in node.children])
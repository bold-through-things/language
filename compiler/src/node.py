

from dataclasses import dataclass, field
from typing import Union

from utils import TypeMap

@dataclass
class Position:
    line: int
    char: int = 0

class Node:
    def __init__(self, content: str, pos: Position) -> None:
        self.content = content
        self.children: list[Node] = []
        self.metadata = TypeMap()
        self.pos = pos

    def __repr__(self):
        return self.indented_repr()
        
    def indented_repr(self, indent=""):
        next_indent = "\t"+indent
        return f"{indent}`{self.content}`:\n{"\n".join([node.indented_repr(next_indent) for node in self.children])}"
    
class Runtime_scope:
    def __init__(self, parent: Union["Runtime_scope", None] = None):
        self.locals = []
        self.parent = parent

@dataclass
class Indexers:
    mapping: dict[str, any] = field(default_factory=dict)

@TypeMap.register(Indexers)      
def __indexers(): return Indexers()

@dataclass
class Callers:
    mapping: dict[str, any] = field(default_factory=dict)

@TypeMap.register(Callers)      
def __callers(): return Callers()

@dataclass
class Params:
    mapping: dict[str, any] = field(default_factory=dict)

@TypeMap.register(Params)      
def __params(): return Params()

@dataclass
class Inject_code_start:
    code: list[str] = field(default_factory=list)

@dataclass
class Associated_code_block(Node): pass

class Parent(Node): pass
# generic Target for cases where a node needs another node to do its job
# TODO - might remove Associated_code_block in favor of this ?
class Target(Node): pass 
class Macro(str): pass
class Args(str): pass

@dataclass
class FieldDemandType(str): pass

# TODO. i don't know where to stuff this one. it doesn't belong into Node directly as that would polute the pretty
#  and clean parser-specific class with irrelevant macro-specific garbage such as this.
def recover_string(node: Node) -> str:
    return node.content + "\n" + "\n".join(["\t"+recover_string(child) for child in node.children])
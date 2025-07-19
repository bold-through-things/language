

from typing import Type, TypeVar, Dict, Callable, Union, cast

E = TypeVar('E')

class TypeMap:
    _default_factories: Dict[Type, Callable[[], object]] = {}

    def __init__(self) -> None:
        self._store: Dict[Type, object] = {}

    def __getitem__(self, key: Type[E]) -> E:
        if key in self._store:
            return cast(E, self._store[key])
        if key in self._default_factories:
            value = self._default_factories[key]()
            self._store[key] = value
            return cast(E, value)
        raise KeyError(f"No entry or default factory registered for {key}")
    
    def maybe(self, key: Type[E]) -> E | None:
        if key in self._store:
            return cast(E, self._store[key])
        return None

    def __setitem__(self, key: Type[E], value: E) -> None:
        self._store[key] = value

    @classmethod
    def register(cls, key: Type[E]) -> Callable[[Callable[[], E]], Callable[[], E]]:
        def decorator(factory: Callable[[], E]) -> Callable[[], E]:
            cls._default_factories[key] = factory
            return factory
        return decorator

class Node:
    def __init__(self, content: str) -> None:
        self.content = content
        self.children: list[Node] = []
        self.metadata = TypeMap()

    def __repr__(self):
        return self.indented_repr()
        
    def indented_repr(self, indent=""):
        next_indent = "\t"+indent
        return f"{indent}`{self.content}`:\n{"\n".join([node.indented_repr(next_indent) for node in self.children])}"


    
class Runtime_scope:
    def __init__(self, parent: Union["Runtime_scope", None] = None):
        self.locals = []
        self.parent = parent

class Indexers:
    def __init__(self):
        self.mapping = {}

@TypeMap.register(Indexers)      
def __indexers(): return Indexers()

class Callers:
    def __init__(self):
        self.mapping = {}

@TypeMap.register(Callers)      
def __callers(): return Callers()

class Params:
    def __init__(self):
        self.mapping = {}

@TypeMap.register(Params)      
def __params(): return Params()

class Inject_code_start:
    def __init__(self):
        self.code: list[str] = []

class Associated_code_block:
    def __init__(self, block: Node):
        self.block = block

class Parent(Node): pass
# generic Target for cases where a node needs another node to do its job
# TODO - might remove Associated_code_block in favor of this ?
class Target(Node): pass 
class Macro(str): pass
class Args(str): pass
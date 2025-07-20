from dataclasses import dataclass
from typing import Callable, TextIO, Union, TypeVar, Protocol, cast, Any

from node import Node
from strutil import IndentedStringIO

# TODO - this shouldn't be here, probably...
@dataclass
class MacroContext:
    macro: str
    args: str
    out: IndentedStringIO
    node: Node

    resolve_JS_access: Callable[["MacroContext"], None]
    compile: Callable[["MacroContext"], None]
    compile_fn_call: Callable[[str, Node, list[Node], IndentedStringIO], None] # TODO - need a context object here...

class Macro(Protocol):
    def __call__(self, ctx: MacroContext) -> str: ...

F = TypeVar("F", bound=Callable[..., Any])

class MacroRegistry:
    def __init__(self) -> None:
        self._registry: dict[str, Macro] = {}

    def add(self, *names: str) -> Callable[[Union[F, type]], F]:
        def decorator(obj: Union[F, type]) -> F:
            instance: Macro = cast(Macro, obj() if isinstance(obj, type) else obj)
            for name in names:
                if name in self._registry:
                    raise ValueError(f"Macro name '{name}' already registered")
                self._registry[name] = instance
            return obj
        return decorator

    def get(self, name: str) -> Macro:
        try:
            return self._registry[name]
        except KeyError:
            raise ValueError(f"Unknown macro: {name}")

    def all(self) -> dict[str, Macro]:
        return dict(self._registry)  # defensive copy
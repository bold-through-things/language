from dataclasses import dataclass
from io import StringIO
from typing import TYPE_CHECKING, Callable, Union, TypeVar, Protocol, cast, Any

from node import Node
from strutil import IndentedStringIO
from logger import default_logger

if TYPE_CHECKING:
    from processor import MacroProcessingStep
    from macrocosm import Macrocosm

# TODO - this shouldn't be here, probably...
@dataclass(kw_only=True)
class MacroContext:
    statement_out: IndentedStringIO | StringIO
    expression_out: IndentedStringIO | StringIO
    node: Node

    compiler: "Macrocosm"
    current_step: "MacroProcessingStep | None" = None

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
                default_logger.registry(f"registering macro '{name}' -> {obj.__name__ if hasattr(obj, '__name__') else obj}")
                self._registry[name] = instance
            return obj
        return decorator

    def get(self, name: str) -> Macro:
        try:
            return self._registry[name]
        except KeyError:
            default_logger.macro(f"ERROR: unknown macro '{name}'")
            raise ValueError(f"Unknown macro: {name}")

    def all(self) -> dict[str, Macro]:
        return dict(self._registry)  # defensive copy
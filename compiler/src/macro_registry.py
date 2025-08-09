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

class Macro_preprocess_provider(Protocol):
    def preprocess(self, ctx: MacroContext): ...
class Macro_typecheck_provider(Protocol):
    def typecheck(self, ctx: MacroContext) -> str | None: ...
class Macro_emission_provider(Protocol):
    def emission(self, ctx: MacroContext): ...

class Macro_code_linking_provider(Protocol):
    def code_linking(self, ctx: MacroContext): ...

Macro_provider = \
    Macro_preprocess_provider | \
    Macro_typecheck_provider | \
    Macro_emission_provider

class Macro(Protocol):
    def __call__(self, ctx: MacroContext) -> str: ...

F = TypeVar("F", bound=Callable[..., Any])

class MacroRegistry:
    def __init__(self) -> None:
        self._registry: dict[str, Macro] = {}

    def add_fn(self, m: Macro | None, *names: str):
        if m is None:
            return
        for name in names:
            self._registry[name] = m

    def get(self, name: str) -> Macro:
        try:
            return self._registry[name]
        except KeyError:
            default_logger.macro(f"ERROR: unknown macro '{name}'")
            raise ValueError(f"Unknown macro: {name}")

    def all(self) -> dict[str, Macro]:
        return dict(self._registry)  # defensive copy
from __future__ import annotations

"""Built-in function call definitions and call conventions.

This module contains all the built-in function definitions that were previously
embedded in processor_base.py, along with the call convention classes.
"""

import re
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING

# Import proper Type objects for returns
from compiler_types.proper_types import STRING

if TYPE_CHECKING:
    from compiler_types.proper_types import Type


def js_field_access(s: str) -> str:
    """Convert field access to JavaScript syntax"""
    if re.fullmatch(r'[a-zA-Z_$][a-zA-Z0-9_$]*', s):
        return f'.{s}'
    return f'["{s}"]'


# "call conventions" are our sane way to emit JavaScript from arguments
# provided by child nodes

@dataclass
class FieldCall:
    """receiver.field"""
    field: str
    demands: list[str] | None
    returns: str | None
    def compile(self, args: list[str]):
        try:
            maybe_assign = ""
            receiver = args[0]
            args = args[1:]
            if len(args) > 0:
                # TODO - assert one arg (need context for compile errors...)
                #  or just this i guess..? what even happens lmfao
                maybe_assign = f" = ({",".join(args)})"
            return f"({receiver}.{self.field}{maybe_assign})"
        except Exception as e:
            raise Exception(f"{repr(self)} failed to compile") from e

@dataclass
class PrototypeCall:
    """String.join.call(self, args...) type shit"""
    constructor: str
    fn: str
    demands: list[str]
    returns: str
    def compile(self, args: list[str]):
        return f"{self.constructor}.prototype.{self.fn}.call({", ".join(args)})"
    
@dataclass
class DirectCall:
    """just call it directly fn(args...)"""
    fn: str
    receiver: str | None
    demands: list[str] | None
    returns: str | None
    def compile(self, args: list[str]):
        receiver = ""
        if self.receiver:
            receiver = f"{self.receiver}."
        return f"{receiver}{self.fn}({", ".join(args)})"

@dataclass
class LocalAccessCall:
    """just returns the identifier"""
    fn: str
    demands: list['Type'] | None
    returns: 'Type' | None
    def compile(self, args: list[str]):
        if len(args) > 0:
            return f"({self.fn} = {",".join(args)})"
        return self.fn


@dataclass
class NaryOperatorCall:
    """Emits a direct JavaScript operator for n-ary application (e.g., +, &&, ||)
    Optionally wraps the entire expression (e.g., for '!')"""
    operator: str
    demands: list[str] | None
    returns: str | None
    is_async: bool = False
    wrapper: str | None = None # New: Optional wrapper for the entire expression
    def compile(self, args: list[str]):
        expr = f"({f' {self.operator} '.join(args)})"
        if self.wrapper:
            return f"{self.wrapper}{expr}"
        return expr

@dataclass
class ChainedComparisonCall:
    """Emits a chained JavaScript comparison (e.g., a < b && b < c)"""
    operator: str
    demands: list[str] | None
    returns: str | None
    is_async: bool = False
    def compile(self, args: list[str]):
        if len(args) < 2:
            return "true" # A single element trivially satisfies a chained comparison
        comparisons = []
        for i in range(len(args) - 1):
            comparisons.append(f"{args[i]} {self.operator} {args[i+1]}")
        return f"({' && '.join(comparisons)})"

@dataclass
class NewCall:
    """Emits a new expression (e.g., new Thing(a, b))"""
    constructor: str
    demands: list[str] | None
    returns: str | None
    def compile(self, args: list[str]):
        return f"(new {self.constructor}({', '.join(args)}))"

@dataclass
class IndexAccessCall:
    """obj[index] or obj[index] = value"""
    demands: list[str] | None
    returns: str | None

    def compile(self, args: list[str]):
        receiver, index, *value = args
        if value:
            return f'({receiver}[{index}] = {value[0]})'
        return f'{receiver}[{index}]'

@dataclass
class CallableInvokeCall:
    """fn(args...) - invokes a callable/function"""
    demands: list[str] | None
    returns: str | None

    def compile(self, args: list[str]):
        fn, *fn_args = args
        return f"{fn}({', '.join(fn_args)})"


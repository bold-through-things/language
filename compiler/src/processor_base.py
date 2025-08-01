from contextlib import contextmanager
from dataclasses import replace
import re
from typing import Any, Sequence, TypeVar, cast
from io import StringIO
from pathlib import Path
from node import Args, Callers, Indexers, Inject_code_start, Macro, Node, Params, Position, Scope, Target
from strutil import IndentedStringIO, Joiner, cut
from typing import Callable
from utils import *
from abc import ABC, abstractmethod
from dataclasses import dataclass

# ERASED_NODE removed - no longer needed

def unroll_parent_chain(n: Node | None) -> list[Node]:
    rv: list[Node] = []
    while n:
        rv.append(n)
        n = n.parent
    return rv

def seek_parent_scope(n: Node) -> Scope | None:
    # Implement upward walking to find scope information
    # For now, return None to disable scope tracking completely
    # TODO: Implement proper scope walking as mentioned in problem statement
    return None

def _check_node_for_local_definition(node: Node, name: str, compiler):
    """Check if a node is a local definition for the given name"""
    try:
        macro = compiler.get_metadata(node, Macro)
        if macro == "local":
            args = compiler.get_metadata(node, Args)
            local_name, _ = cut(args, " ")
            if local_name == name:
                # Found the local definition
                from node import FieldDemandType
                try:
                    demanded = compiler.get_metadata(node, FieldDemandType)
                    return demanded
                except KeyError:
                    # Fall back to looking for type node
                    type_node = seek_child_macro(node, "type")
                    if type_node:
                        _, demanded = cut(type_node.content, " ")
                        return demanded
                    return "*"  # No explicit type
    except KeyError:
        pass
    return None

def _search_in_noscope(noscope_node: Node, name: str, compiler):
    """Search for local definitions inside a noscope node"""
    for child in noscope_node.children:
        result = _check_node_for_local_definition(child, name, compiler)
        if result is not None:
            return result
    return None

def walk_upwards_for_local_definition(node: Node, name: str, compiler):
    """Walk upwards to find local variable definitions using the new metadata system"""
    current = node
    while current:
        # Check if current node is a local definition
        try:
            macro = compiler.get_metadata(current, Macro)
            if macro == "local":
                args = compiler.get_metadata(current, Args)
                local_name, _ = cut(args, " ")
                if local_name == name:
                    # Found the local definition, try to get its type from metadata
                    from node import FieldDemandType
                    try:
                        demanded = compiler.get_metadata(current, FieldDemandType)
                        return demanded
                    except KeyError:
                        # Fall back to looking for type node
                        type_node = seek_child_macro(current, "type")
                        if type_node:
                            _, demanded = cut(type_node.content, " ")
                            return demanded
                        return "*"  # No explicit type
        except KeyError:
            pass
        
        # Check siblings that come before this node
        if current.parent:
            siblings = current.parent.children
            current_index = None
            try:
                current_index = siblings.index(current)
            except ValueError:
                pass
            
            if current_index is not None:
                # Check preceding siblings for local definitions (nearest to first)
                for i in range(current_index - 1, -1, -1):
                    sibling = siblings[i]
                    # First check if the sibling itself is a local definition
                    result = _check_node_for_local_definition(sibling, name, compiler)
                    if result is not None:
                        return result
                    
                    # Also check inside noscope nodes
                    try:
                        macro = compiler.get_metadata(sibling, Macro)
                        if macro == "noscope":
                            result = _search_in_noscope(sibling, name, compiler)
                            if result is not None:
                                return result
                    except KeyError:
                        pass
        
        # Move up to parent
        current = current.parent
    
    return None  # Not found

def seek_child_macro(n: Node, macro: str):
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            return child

def js_field_access(s: str) -> str:
    if re.fullmatch(r'[a-zA-Z_$][a-zA-Z0-9_$]*', s):
        return f'.{s}'
    return f'["{s}"]'

TYPICAL_IGNORED_MACROS = {"type", "noscope", "PIL:auto_type"}
def filter_child_macros(n: Node):
    def get_macro(n: Node): 
        macro, _ = cut(n.content, " ")
        return macro
    return [c for c in n.children if get_macro(c) not in TYPICAL_IGNORED_MACROS]

js_lib = open(Path(__file__).parent.joinpath("stdlib/lib.js")).read()

builtins = {
    "print": "log",
    # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
    #  blocking prompt function. in future should probably write such a function
    #  and remove unnecessary await.
    #  then again, considering this is almost guaranteed to only be used for debugging...
    #  does it matter?
    "prompt": "prompt",
    "stdin": "stdin",
    "is_tty": "is_tty",
    # TODO - these ought to be static code instead of function calls...
    "concat": "concat",
    "any": "any",
    "all": "all", 
    "eq": "eq",
    "asc": "asc",
    "add": "add",
    "mod": "mod",
    "none": "none",
    # Object.values TODO i am not happy about this being a builtin. really it ought to be a method on the maps, 
    # which should explicitly be types. same for keys...
    "values": "values",
    "keys": "keys",
    "zip": "zip",    
}

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

builtin_calls = {
    "join": [PrototypeCall(constructor="Array", fn="join", demands=["list", "str"], returns="str")],
    "sort": [PrototypeCall(constructor="Array", fn="sort", demands=["list"], returns="list")],
    "push": [PrototypeCall(constructor="Array", fn="push", demands=["list", "*"], returns="list")], # TODO - does it actually return..?
    "reverse": [PrototypeCall(constructor="Array", fn="reverse", demands=["list"], returns="list")],
    "split": [
        PrototypeCall(constructor="String", fn="split", demands=["str", "str"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "regex"], returns="list"),
    ],

    "trim": [PrototypeCall(constructor="String", fn="trim", demands=["str"], returns="str")],
    "slice": [PrototypeCall(constructor="Array", fn="slice", demands=["list"], returns="list")],
}

def replace_chars(s: str, ok: str, map: dict[str, str]) -> str:
    return ''.join(
        c if c in ok else map[c] if c in map else f'_{hex(ord(c))}_'
        for c in s
    )

def to_valid_js_ident(s: str) -> str:
    return "_" + replace_chars(s, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", {" ": "_"})

from macro_registry import MacroContext, MacroRegistry

# Global unified registries for all macros and typechecks
# These will be populated by all macro modules
unified_macros = MacroRegistry()
unified_typecheck = MacroRegistry()

class MacroProcessingStep(ABC):
    """Base class for macro processing steps in the compilation pipeline"""
    
    def __init__(self):
        # Steps should override this if they need specific registries
        self.macros = MacroRegistry()
        
    @abstractmethod
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during this step"""
        pass

T = TypeVar("T")

def singleton(cls: type[T]) -> T:
    """converts the annotated class into a singleton, immediately instantiating it"""
    instance = cls()
    return cast(Callable[..., Any], lambda *args, **kwargs: instance)

class MacroAssertFailed(Exception):
    """
raised by macros during processing to ensure said processing is possible.
compiler will recover during tree walks as soon as possible, thus making it possible
to catch multiple assert failures.
automatically raised by Compiler.assert_ which you should use probably instead of manually
raising this.
    """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message) # Call the base Exception constructor
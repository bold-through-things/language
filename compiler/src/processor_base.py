from dataclasses import replace
import re
from typing import Any, TypeVar, cast
from pathlib import Path
from common_utils import get_single_arg, print_with_callback
from node import Args, Macro, Node, SaneIdentifier, Scope
from strutil import cut
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

# TODO. the code you wrote here is ass. i fixed it somewhat but it absolutely can be simplified further
# @print_with_callback(lambda ctx, name, ret: f"_try_match_local {name} {ctx.node.pos.line} {ctx.node.content} returns {ret.node.content if ret else "None"}")
def _try_match_local(ctx: "MacroContext", name: str):
    # TODO! really should stick to one or the other, not both...

    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    if macro == "local":
        desired_local_name = get_single_arg(ctx)
    elif macro in {"67lang:assume_local_exists", "fn"}: # TODO - i hate this hack. find a better way!
        desired_local_name = get_single_arg(ctx)
    else:
        return None
    sane_local_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_local_name
    # if name == "row":
    #     print("row! ", desired_local_name, sane_local_name)
    if name in {desired_local_name, sane_local_name}:
        # Found the local definition, try to get its type from metadata
        from node import FieldDemandType
        try:
            demanded = ctx.compiler.get_metadata(ctx.node, FieldDemandType)
            return LocalMatchResult(ctx.node, str(demanded))
        except KeyError:
            # Fall back to looking for type node
            type_node = seek_child_macro(ctx.node, "type")
            if type_node:
                _, demanded = cut(type_node.content, " ")
                return LocalMatchResult(ctx.node, demanded)
            return LocalMatchResult(ctx.node, "*")

def _search_in_noscope(ctx: "MacroContext", name: str):
    """Search for local definitions inside a noscope node"""
    for child in ctx.node.children:
        child_ctx = replace(ctx, node=child)
        result = _try_match_local(child_ctx, name)
        if result is not None:
            return result
    return None

@dataclass
class LocalMatchResult:
    node: Node
    type: str

# @print_with_callback(lambda ctx, name, ret: f"walk_upwards_for_local_definition {name} from node {ctx.node.pos.line} {ctx.node.content} finally returns {ret.node.content if ret else "None"}\n")
def walk_upwards_for_local_definition(ctx: "MacroContext", name: str):
    """Walk upwards to find local variable definitions using the new metadata system"""
    current = ctx.node
    compiler = ctx.compiler
    while current:
        ctx = replace(ctx, node=current)
        # print(f"walking {[c.content for c in current.children]}")
        # Check if current node is a local definition
        try:
            maybe_result = _try_match_local(ctx, name)
            if maybe_result:
                return maybe_result
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
                    sibling_ctx = replace(ctx, node=sibling)
                    result = _try_match_local(sibling_ctx, name)
                    if result is not None:
                        return result
                    
                    # Also check inside noscope nodes
                    try:
                        macro = compiler.get_metadata(sibling, Macro)
                        if macro == "noscope":
                            result = _search_in_noscope(sibling_ctx, name)
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
        
def seek_all_child_macros(n: Node, macro: str):
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            yield child

def js_field_access(s: str) -> str:
    if re.fullmatch(r'[a-zA-Z_$][a-zA-Z0-9_$]*', s):
        return f'.{s}'
    return f'["{s}"]'

TYPICAL_IGNORED_MACROS = {"type", "noscope", "67lang:auto_type"}
def filter_child_macros(n: Node):
    def get_macro(n: Node): 
        macro, _ = cut(n.content, " ")
        return macro
    return [c for c in n.children if get_macro(c) not in TYPICAL_IGNORED_MACROS]

js_lib = open(Path(__file__).parent.joinpath("stdlib/lib.js")).read()

builtins = {
}

# "call conventions" are our sane way to emit JavaScript from arguments
# provided by child nodes

@dataclass
class FieldCall:
    """receiver.field"""
    field: str
    demands: list[str] | None
    returns: str | None
    def compile(self, args: list[str]):
        maybe_assign = ""
        receiver = args[0]
        args = args[1:]
        if len(args) > 0:
            # TODO - assert one arg (need context for compile errors...)
            #  or just this i guess..? what even happens lmfao
            maybe_assign = f" = ({",".join(args)})"
        return f"{receiver}.{self.field}{maybe_assign}"

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
        return f"new {self.constructor}({', '.join(args)})"


builtin_calls = {
    "length": [FieldCall(field="length", demands=["list"], returns="str")],
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

    # Explicitly define built-ins that map to operators
    "concat": [NaryOperatorCall(operator="+", demands=None, returns=None)],
    "any": [NaryOperatorCall(operator="||", demands=None, returns=None)],
    "all": [NaryOperatorCall(operator="&&", demands=None, returns=None)],
    "add": [NaryOperatorCall(operator="+", demands=None, returns=None)],
    "sub": [NaryOperatorCall(operator="-", demands=None, returns=None)],
    "mul": [NaryOperatorCall(operator="*", demands=None, returns=None)],
    "mod": [NaryOperatorCall(operator="%", demands=None, returns=None)],
    "div": [NaryOperatorCall(operator="/", demands=None, returns=None)],
    "none": [NaryOperatorCall(operator="||", wrapper="!", demands=None, returns=None)], # Use || and wrap with !
    "asc": [ChainedComparisonCall(operator="<", demands=None, returns=None)], 
    "nondesc": [ChainedComparisonCall(operator="<=", demands=None, returns=None)], 
    "desc": [ChainedComparisonCall(operator=">", demands=None, returns=None)], 
    "nonasc": [ChainedComparisonCall(operator=">=", demands=None, returns=None)], 
    "eq": [ChainedComparisonCall(operator="===", demands=None, returns=None)], 

    "values": [DirectCall(fn="values", receiver="Object", demands=None, returns=None)],
    "keys": [DirectCall(fn="values", receiver="keys", demands=None, returns=None)],
    "print": [DirectCall(fn="log", receiver="console", demands=None, returns=None)],

    # TODO ideally we would eliminate the `_67lang` shim, although i doubt that will be possible
    "zip": [DirectCall(fn="zip", receiver="_67lang", demands=None, returns=None)],
    # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
    #  blocking prompt function. in future should probably write such a function
    #  and remove unnecessary await. 
    #  then again, considering this is almost guaranteed to only be used for debugging...
    #  does it matter?
    "prompt": [DirectCall(fn="prompt", receiver="_67lang", demands=None, returns=None)],
    "stdin": [DirectCall(fn="stdin", receiver="_67lang", demands=None, returns="str")],
    "is_tty": [DirectCall(fn="is_tty", receiver="_67lang", demands=None, returns=None)],
}

try:
    from webidl_builtins import webidl_calls
    for name, calls in webidl_calls.items():
        if name in builtin_calls:
            builtin_calls[name].extend(calls)
        else:
            builtin_calls[name] = calls
except ImportError as e:
    # It's ok if the file doesn't exist
    print(e)
    pass

def replace_chars(s: str, ok: str, map: dict[str, str]) -> str:
    return ''.join(
        c if c in ok else map[c] if c in map else f'_{ord(c):02x}_'
        for c in s
    )

def to_valid_js_ident(s: str) -> str:
    # Enhanced character mapping for better readability
    char_map = {
        " ": "_",
        ".": "_dot_",
        "$": "_dollar_", 
        "%": "_percent_",
        "+": "_plus_",
        "-": "_minus_",
        "*": "_star_",
        "/": "_slash_",
        "=": "_eq_",
        "<": "_lt_",
        ">": "_gt_",
        "!": "_bang_",
        "?": "_q_",
        "@": "_at_",
        "#": "_hash_",
        "&": "_and_",
        "|": "_pipe_",
        "^": "_caret_",
        "~": "_tilde_",
        "`": "_tick_",
        "'": "_apos_",
        '"': "_quot_",
        "(": "_lp_",
        ")": "_rp_",
        "[": "_lb_",
        "]": "_rb_",
        "{": "_lc_",
        "}": "_rc_",
        ":": "_colon_",
        ";": "_semi_",
        ",": "_comma_",
    }
    
    # Ensure we start with a valid identifier character (letter or underscore)
    result = replace_chars(s, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", char_map)
    
    # If the result starts with a digit, prepend an underscore
    if result and result[0].isdigit():
        result = "_" + result
    
    # If the result is empty or starts with invalid character, ensure it's valid
    if not result or not (result[0].isalpha() or result[0] == "_"):
        result = "_" + result
        
    return result

from macro_registry import MacroContext, MacroRegistry



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
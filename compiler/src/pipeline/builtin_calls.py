"""Built-in function call definitions and call conventions.

This module contains all the built-in function definitions that were previously
embedded in processor_base.py, along with the call convention classes.
"""

import re
from dataclasses import dataclass
from pathlib import Path


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
        maybe_assign = ""
        receiver = args[0]
        args = args[1:]
        if len(args) > 0:
            # TODO - assert one arg (need context for compile errors...)
            #  or just this i guess..? what even happens lmfao
            maybe_assign = f" = ({",".join(args)})"
        return f"({receiver}.{self.field}{maybe_assign})"

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
    demands: list[str] | None
    returns: str | None
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


builtin_calls = {
    "#": [IndexAccessCall(demands=None, returns=None)],
    # TODO - in theory 99% of these should come from the WebIDL spec. TODO, investigate if we can clear this.
    "length": [FieldCall(field="length", demands=["list"], returns="int")],
    "join": [
        PrototypeCall(constructor="Array", fn="join", demands=["list"], returns="str"),
        PrototypeCall(constructor="Array", fn="join", demands=["list", "str"], returns="str")
    ],
    "sort": [PrototypeCall(constructor="Array", fn="sort", demands=["list"], returns="list")],
    "push": [PrototypeCall(constructor="Array", fn="push", demands=["list", "*"], returns="list")], # TODO - does it actually return..?
    "reverse": [PrototypeCall(constructor="Array", fn="reverse", demands=["list"], returns="list")],
    "split": [
        # oh gods what the fuck even
        PrototypeCall(constructor="String", fn="split", demands=["str"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "str"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "regex"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "str", "int"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "regex", "int"], returns="list"),
    ],
    "trim": [PrototypeCall(constructor="String", fn="trim", demands=["str"], returns="str")],
    "toString": [DirectCall(fn="String", receiver=None, demands=["*"], returns="str")],
    "slice": [
        PrototypeCall(constructor="Array", fn="slice", demands=["list"], returns="list"),
        PrototypeCall(constructor="Array", fn="slice", demands=["list", "int"], returns="list"),
        PrototypeCall(constructor="Array", fn="slice", demands=["list", "int", "int"], returns="list")
    ],

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
    "keys": [DirectCall(fn="keys", receiver="Object", demands=None, returns=None)],
    "print": [DirectCall(fn="log", receiver="console", demands=None, returns=None)],

    # TODO ideally we would eliminate the `_67lang` shim, although i doubt that will be possible
    "zip": [DirectCall(fn="zip", receiver="_67lang", demands=None, returns=None)],
    "new_set": [DirectCall(fn="new_set", receiver="_67lang", demands=None, returns="set")],
    # TODO. this is awaited because NodeJS fucking sucks and doesn't give us a proper, 
    #  blocking prompt function. in future should probably write such a function
    #  and remove unnecessary await. 
    #  then again, considering this is almost guaranteed to only be used for debugging...
    #  does it matter?
    "prompt": [DirectCall(fn="prompt", receiver="_67lang", demands=None, returns=None)],
    "stdin": [DirectCall(fn="stdin", receiver="_67lang", demands=None, returns="str")],
    "is_tty": [DirectCall(fn="is_tty", receiver="_67lang", demands=None, returns=None)],
    
    # TODO: Deno-specific builtins - won't work on browsers. Need compile targets for validation.
    "read_file": [DirectCall(fn="readTextFile", receiver="Deno", demands=["str"], returns="str")],
    "cwd": [DirectCall(fn="cwd", receiver="Deno", demands=None, returns="str")],
}

# Load WebIDL builtins if available
try:
    from compiler_types.webidl_builtins import webidl_calls
    for name, calls in webidl_calls.items():
        if name in builtin_calls:
            builtin_calls[name].extend(calls)
        else:
            builtin_calls[name] = calls
except ImportError as e:
    # It's ok if the file doesn't exist
    print(e)
    pass
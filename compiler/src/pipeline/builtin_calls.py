from __future__ import annotations

"""Built-in function call definitions and call conventions.

This module contains all the built-in function definitions that were previously
embedded in processor_base.py, along with the call convention classes.
"""

from pathlib import Path
from typing import TYPE_CHECKING

# Import call convention classes
from pipeline.call_conventions import (
    FieldCall, PrototypeCall, DirectCall, LocalAccessCall, NaryOperatorCall,
    ChainedComparisonCall, NewCall, IndexAccessCall, CallableInvokeCall, js_field_access
)

# Import proper Type objects for returns
from compiler_types.proper_types import STRING

if TYPE_CHECKING:
    from compiler_types.proper_types import Type


builtin_calls = {
    "#": [IndexAccessCall(demands=None, returns=None)],
    "~": [CallableInvokeCall(demands=None, returns=None)],
    # TODO - in theory 99% of these should come from the WebIDL spec. TODO, investigate if we can clear this.
    # Note: length, push, reverse, trim, slice, toString are now provided by TypeScript builtins

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
    "prompt": [DirectCall(fn="prompt", receiver="_67lang", demands=None, returns=STRING)],
    "stdin": [DirectCall(fn="stdin", receiver="_67lang", demands=None, returns=STRING)],
    "is_tty": [DirectCall(fn="is_tty", receiver="_67lang", demands=None, returns=None)],
    
    # TODO: Deno-specific builtins - won't work on browsers. Need compile targets for validation.
    "read_file": [DirectCall(fn="readTextFile", receiver="Deno", demands=[STRING], returns=STRING)],
    "cwd": [DirectCall(fn="cwd", receiver="Deno", demands=None, returns=STRING)],

    # JavaScript Built-ins - Core language features
    # JSON
    "JSON.stringify": [
        DirectCall(fn="stringify", receiver="JSON", demands=["*"], returns="str"),
        DirectCall(fn="stringify", receiver="JSON", demands=["*", "*"], returns="str"),
        DirectCall(fn="stringify", receiver="JSON", demands=["*", "*", "*"], returns="str"),
    ],
    "JSON.parse": [
        DirectCall(fn="parse", receiver="JSON", demands=["str"], returns="*"),
        DirectCall(fn="parse", receiver="JSON", demands=["str", "*"], returns="*"),
    ],
}

# Load TypeScript builtins if available
try:
    from compiler_types.typescript_builtins import typescript_calls
    for name, calls in typescript_calls.items():
        if name in builtin_calls:
            builtin_calls[name].extend(calls)
        else:
            builtin_calls[name] = calls
except ImportError as e:
    # It's ok if the file doesn't exist - TypeScript builtins are generated separately
    print(f"TypeScript builtins not found: {e}")
    pass

# Commented out WebIDL builtins - now using TypeScript definitions instead
# try:
#     from compiler_types.webidl_builtins import webidl_calls
#     for name, calls in webidl_calls.items():
#         if name in builtin_calls:
#             builtin_calls[name].extend(calls)
#         else:
#             builtin_calls[name] = calls
# except ImportError:
#     # It's ok if the file doesn't exist
#     pass

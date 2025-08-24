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

    # Object
    "Object.keys": [DirectCall(fn="keys", receiver="Object", demands=["*"], returns="list")],
    "Object.values": [DirectCall(fn="values", receiver="Object", demands=["*"], returns="list")],
    "Object.entries": [DirectCall(fn="entries", receiver="Object", demands=["*"], returns="list")],
    "Object.assign": [
        DirectCall(fn="assign", receiver="Object", demands=["*"], returns="*"),
        DirectCall(fn="assign", receiver="Object", demands=["*", "*"], returns="*"),
        DirectCall(fn="assign", receiver="Object", demands=["*", "*", "*"], returns="*"),
    ],
    "Object.create": [
        DirectCall(fn="create", receiver="Object", demands=["*"], returns="*"),
        DirectCall(fn="create", receiver="Object", demands=["*", "*"], returns="*"),
    ],
    "Object.freeze": [DirectCall(fn="freeze", receiver="Object", demands=["*"], returns="*")],
    "Object.seal": [DirectCall(fn="seal", receiver="Object", demands=["*"], returns="*")],
    "Object.isFrozen": [DirectCall(fn="isFrozen", receiver="Object", demands=["*"], returns="bool")],
    "Object.isSealed": [DirectCall(fn="isSealed", receiver="Object", demands=["*"], returns="bool")],
    "Object.hasOwnProperty": [PrototypeCall(constructor="Object", fn="hasOwnProperty", demands=["*", "str"], returns="bool")],
    "Object.getOwnPropertyNames": [DirectCall(fn="getOwnPropertyNames", receiver="Object", demands=["*"], returns="list")],
    "Object.getOwnPropertyDescriptor": [DirectCall(fn="getOwnPropertyDescriptor", receiver="Object", demands=["*", "str"], returns="*")],
    "Object.defineProperty": [DirectCall(fn="defineProperty", receiver="Object", demands=["*", "str", "*"], returns="*")],

    # Array methods (prototype calls)
    "map": [PrototypeCall(constructor="Array", fn="map", demands=["list", "*"], returns="list")],
    "filter": [PrototypeCall(constructor="Array", fn="filter", demands=["list", "*"], returns="list")],
    "reduce": [
        PrototypeCall(constructor="Array", fn="reduce", demands=["list", "*"], returns="*"),
        PrototypeCall(constructor="Array", fn="reduce", demands=["list", "*", "*"], returns="*"),
    ],
    "reduceRight": [
        PrototypeCall(constructor="Array", fn="reduceRight", demands=["list", "*"], returns="*"),
        PrototypeCall(constructor="Array", fn="reduceRight", demands=["list", "*", "*"], returns="*"),
    ],
    "forEach": [PrototypeCall(constructor="Array", fn="forEach", demands=["list", "*"], returns="None")],
    "find": [PrototypeCall(constructor="Array", fn="find", demands=["list", "*"], returns="*")],
    "findIndex": [PrototypeCall(constructor="Array", fn="findIndex", demands=["list", "*"], returns="int")],
    "some": [PrototypeCall(constructor="Array", fn="some", demands=["list", "*"], returns="bool")],
    "every": [PrototypeCall(constructor="Array", fn="every", demands=["list", "*"], returns="bool")],
    "includes": [
    	PrototypeCall(constructor="Array", fn="includes", demands=["list", "*"], returns="bool"),
    	PrototypeCall(constructor="String", fn="includes", demands=["str", "str"], returns="bool"),
    ],
    "indexOf": [
        PrototypeCall(constructor="Array", fn="indexOf", demands=["list", "*"], returns="int"),
        PrototypeCall(constructor="Array", fn="indexOf", demands=["list", "*", "int"], returns="int"),
    ],
    "lastIndexOf": [
        PrototypeCall(constructor="Array", fn="lastIndexOf", demands=["list", "*"], returns="int"),
        PrototypeCall(constructor="Array", fn="lastIndexOf", demands=["list", "*", "int"], returns="int"),
    ],
    "flat": [
        PrototypeCall(constructor="Array", fn="flat", demands=["list"], returns="list"),
        PrototypeCall(constructor="Array", fn="flat", demands=["list", "int"], returns="list"),
    ],
    "flatMap": [PrototypeCall(constructor="Array", fn="flatMap", demands=["list", "*"], returns="list")],

    # Array static methods
    "Array.from": [
        DirectCall(fn="from", receiver="Array", demands=["*"], returns="list"),
        DirectCall(fn="from", receiver="Array", demands=["*", "*"], returns="list"),
        DirectCall(fn="from", receiver="Array", demands=["*", "*", "*"], returns="list"),
    ],
    "Array.of": [DirectCall(fn="of", receiver="Array", demands=None, returns="list")],
    "Array.isArray": [DirectCall(fn="isArray", receiver="Array", demands=["*"], returns="bool")],

    # String methods
    "charAt": [PrototypeCall(constructor="String", fn="charAt", demands=["str", "int"], returns="str")],
    "charCodeAt": [PrototypeCall(constructor="String", fn="charCodeAt", demands=["str", "int"], returns="int")],
    "codePointAt": [PrototypeCall(constructor="String", fn="codePointAt", demands=["str", "int"], returns="int")],
    "substring": [
        PrototypeCall(constructor="String", fn="substring", demands=["str", "int"], returns="str"),
        PrototypeCall(constructor="String", fn="substring", demands=["str", "int", "int"], returns="str"),
    ],
    "substr": [
        PrototypeCall(constructor="String", fn="substr", demands=["str", "int"], returns="str"),
        PrototypeCall(constructor="String", fn="substr", demands=["str", "int", "int"], returns="str"),
    ],
    "toLowerCase": [PrototypeCall(constructor="String", fn="toLowerCase", demands=["str"], returns="str")],
    "toUpperCase": [PrototypeCall(constructor="String", fn="toUpperCase", demands=["str"], returns="str")],
    "replace": [
        PrototypeCall(constructor="String", fn="replace", demands=["str", "str", "str"], returns="str"),
        PrototypeCall(constructor="String", fn="replace", demands=["str", "regex", "str"], returns="str"),
        PrototypeCall(constructor="String", fn="replace", demands=["str", "str", "*"], returns="str"),
        PrototypeCall(constructor="String", fn="replace", demands=["str", "regex", "*"], returns="str"),
    ],
    "replaceAll": [
        PrototypeCall(constructor="String", fn="replaceAll", demands=["str", "str", "str"], returns="str"),
        PrototypeCall(constructor="String", fn="replaceAll", demands=["str", "regex", "str"], returns="str"),
        PrototypeCall(constructor="String", fn="replaceAll", demands=["str", "str", "*"], returns="str"),
        PrototypeCall(constructor="String", fn="replaceAll", demands=["str", "regex", "*"], returns="str"),
    ],
    "match": [
        PrototypeCall(constructor="String", fn="match", demands=["str", "str"], returns="*"),
        PrototypeCall(constructor="String", fn="match", demands=["str", "regex"], returns="*"),
    ],
    "matchAll": [
        PrototypeCall(constructor="String", fn="matchAll", demands=["str", "regex"], returns="*"),
    ],
    "search": [
        PrototypeCall(constructor="String", fn="search", demands=["str", "str"], returns="int"),
        PrototypeCall(constructor="String", fn="search", demands=["str", "regex"], returns="int"),
    ],
    "startsWith": [
        PrototypeCall(constructor="String", fn="startsWith", demands=["str", "str"], returns="bool"),
        PrototypeCall(constructor="String", fn="startsWith", demands=["str", "str", "int"], returns="bool"),
    ],
    "endsWith": [
        PrototypeCall(constructor="String", fn="endsWith", demands=["str", "str"], returns="bool"),
        PrototypeCall(constructor="String", fn="endsWith", demands=["str", "str", "int"], returns="bool"),
    ],
    "padStart": [
        PrototypeCall(constructor="String", fn="padStart", demands=["str", "int"], returns="str"),
        PrototypeCall(constructor="String", fn="padStart", demands=["str", "int", "str"], returns="str"),
    ],
    "padEnd": [
        PrototypeCall(constructor="String", fn="padEnd", demands=["str", "int"], returns="str"),
        PrototypeCall(constructor="String", fn="padEnd", demands=["str", "int", "str"], returns="str"),
    ],
    "repeat": [PrototypeCall(constructor="String", fn="repeat", demands=["str", "int"], returns="str")],
    "trimStart": [PrototypeCall(constructor="String", fn="trimStart", demands=["str"], returns="str")],
    "trimEnd": [PrototypeCall(constructor="String", fn="trimEnd", demands=["str"], returns="str")],

    # String static methods
    "String.fromCharCode": [DirectCall(fn="fromCharCode", receiver="String", demands=None, returns="str")],
    "String.fromCodePoint": [DirectCall(fn="fromCodePoint", receiver="String", demands=None, returns="str")],

    # Number methods
    "Number.parseInt": [
        DirectCall(fn="parseInt", receiver="Number", demands=["str"], returns="int"),
        DirectCall(fn="parseInt", receiver="Number", demands=["str", "int"], returns="int"),
    ],
    "Number.parseFloat": [DirectCall(fn="parseFloat", receiver="Number", demands=["str"], returns="float")],
    "Number.isNaN": [DirectCall(fn="isNaN", receiver="Number", demands=["*"], returns="bool")],
    "Number.isFinite": [DirectCall(fn="isFinite", receiver="Number", demands=["*"], returns="bool")],
    "Number.isInteger": [DirectCall(fn="isInteger", receiver="Number", demands=["*"], returns="bool")],
    "Number.isSafeInteger": [DirectCall(fn="isSafeInteger", receiver="Number", demands=["*"], returns="bool")],
    "toFixed": [PrototypeCall(constructor="Number", fn="toFixed", demands=["float", "int"], returns="str")],
    "toPrecision": [PrototypeCall(constructor="Number", fn="toPrecision", demands=["float", "int"], returns="str")],
    "toExponential": [
        PrototypeCall(constructor="Number", fn="toExponential", demands=["float"], returns="str"),
        PrototypeCall(constructor="Number", fn="toExponential", demands=["float", "int"], returns="str"),
    ],

    # Math functions
    "Math.abs": [DirectCall(fn="abs", receiver="Math", demands=["float"], returns="float")],
    "Math.ceil": [DirectCall(fn="ceil", receiver="Math", demands=["float"], returns="int")],
    "Math.floor": [DirectCall(fn="floor", receiver="Math", demands=["float"], returns="int")],
    "Math.round": [DirectCall(fn="round", receiver="Math", demands=["float"], returns="int")],
    "Math.trunc": [DirectCall(fn="trunc", receiver="Math", demands=["float"], returns="int")],
    "Math.sign": [DirectCall(fn="sign", receiver="Math", demands=["float"], returns="int")],
    "Math.sqrt": [DirectCall(fn="sqrt", receiver="Math", demands=["float"], returns="float")],
    "Math.cbrt": [DirectCall(fn="cbrt", receiver="Math", demands=["float"], returns="float")],
    "Math.pow": [DirectCall(fn="pow", receiver="Math", demands=["float", "float"], returns="float")],
    "Math.exp": [DirectCall(fn="exp", receiver="Math", demands=["float"], returns="float")],
    "Math.log": [DirectCall(fn="log", receiver="Math", demands=["float"], returns="float")],
    "Math.log10": [DirectCall(fn="log10", receiver="Math", demands=["float"], returns="float")],
    "Math.log2": [DirectCall(fn="log2", receiver="Math", demands=["float"], returns="float")],
    "Math.sin": [DirectCall(fn="sin", receiver="Math", demands=["float"], returns="float")],
    "Math.cos": [DirectCall(fn="cos", receiver="Math", demands=["float"], returns="float")],
    "Math.tan": [DirectCall(fn="tan", receiver="Math", demands=["float"], returns="float")],
    "Math.asin": [DirectCall(fn="asin", receiver="Math", demands=["float"], returns="float")],
    "Math.acos": [DirectCall(fn="acos", receiver="Math", demands=["float"], returns="float")],
    "Math.atan": [DirectCall(fn="atan", receiver="Math", demands=["float"], returns="float")],
    "Math.atan2": [DirectCall(fn="atan2", receiver="Math", demands=["float", "float"], returns="float")],
    "Math.min": [DirectCall(fn="min", receiver="Math", demands=None, returns="float")],
    "Math.max": [DirectCall(fn="max", receiver="Math", demands=None, returns="float")],
    "Math.random": [DirectCall(fn="random", receiver="Math", demands=None, returns="float")],

    # Date
    "Date.now": [DirectCall(fn="now", receiver="Date", demands=None, returns="int")],
    "Date.parse": [DirectCall(fn="parse", receiver="Date", demands=["str"], returns="int")],
    "getTime": [PrototypeCall(constructor="Date", fn="getTime", demands=["Date"], returns="int")],
    "getFullYear": [PrototypeCall(constructor="Date", fn="getFullYear", demands=["Date"], returns="int")],
    "getMonth": [PrototypeCall(constructor="Date", fn="getMonth", demands=["Date"], returns="int")],
    "getDate": [PrototypeCall(constructor="Date", fn="getDate", demands=["Date"], returns="int")],
    "getDay": [PrototypeCall(constructor="Date", fn="getDay", demands=["Date"], returns="int")],
    "getHours": [PrototypeCall(constructor="Date", fn="getHours", demands=["Date"], returns="int")],
    "getMinutes": [PrototypeCall(constructor="Date", fn="getMinutes", demands=["Date"], returns="int")],
    "getSeconds": [PrototypeCall(constructor="Date", fn="getSeconds", demands=["Date"], returns="int")],
    "getMilliseconds": [PrototypeCall(constructor="Date", fn="getMilliseconds", demands=["Date"], returns="int")],
    "toISOString": [PrototypeCall(constructor="Date", fn="toISOString", demands=["Date"], returns="str")],
    "toDateString": [PrototypeCall(constructor="Date", fn="toDateString", demands=["Date"], returns="str")],
    "toTimeString": [PrototypeCall(constructor="Date", fn="toTimeString", demands=["Date"], returns="str")],

    # RegExp
    "test": [PrototypeCall(constructor="RegExp", fn="test", demands=["regex", "str"], returns="bool")],
    "exec": [PrototypeCall(constructor="RegExp", fn="exec", demands=["regex", "str"], returns="*")],

    # Global functions
    "parseInt": [
        DirectCall(fn="parseInt", receiver=None, demands=["str"], returns="int"),
        DirectCall(fn="parseInt", receiver=None, demands=["str", "int"], returns="int"),
    ],
    "parseFloat": [DirectCall(fn="parseFloat", receiver=None, demands=["str"], returns="float")],
    "isNaN": [DirectCall(fn="isNaN", receiver=None, demands=["*"], returns="bool")],
    "isFinite": [DirectCall(fn="isFinite", receiver=None, demands=["*"], returns="bool")],
    "encodeURI": [DirectCall(fn="encodeURI", receiver=None, demands=["str"], returns="str")],
    "decodeURI": [DirectCall(fn="decodeURI", receiver=None, demands=["str"], returns="str")],
    "encodeURIComponent": [DirectCall(fn="encodeURIComponent", receiver=None, demands=["str"], returns="str")],
    "decodeURIComponent": [DirectCall(fn="decodeURIComponent", receiver=None, demands=["str"], returns="str")],

    # Set methods
    "Set.add": [PrototypeCall(constructor="Set", fn="add", demands=["set", "*"], returns="set")],
    "Set.has": [PrototypeCall(constructor="Set", fn="has", demands=["set", "*"], returns="bool")],
    "Set.delete": [PrototypeCall(constructor="Set", fn="delete", demands=["set", "*"], returns="bool")],
    "Set.clear": [PrototypeCall(constructor="Set", fn="clear", demands=["set"], returns="None")],
    "Set.forEach": [PrototypeCall(constructor="Set", fn="forEach", demands=["set", "*"], returns="None")],

    # Map methods
    "Map.set": [PrototypeCall(constructor="Map", fn="set", demands=["Map", "*", "*"], returns="Map")],
    "Map.get": [PrototypeCall(constructor="Map", fn="get", demands=["Map", "*"], returns="*")],
    "Map.has": [PrototypeCall(constructor="Map", fn="has", demands=["Map", "*"], returns="bool")],
    "Map.delete": [PrototypeCall(constructor="Map", fn="delete", demands=["Map", "*"], returns="bool")],
    "Map.clear": [PrototypeCall(constructor="Map", fn="clear", demands=["Map"], returns="None")],
    "Map.forEach": [PrototypeCall(constructor="Map", fn="forEach", demands=["Map", "*"], returns="None")],

    # Promise methods
    "Promise.resolve": [DirectCall(fn="resolve", receiver="Promise", demands=["*"], returns="Promise")],
    "Promise.reject": [DirectCall(fn="reject", receiver="Promise", demands=["*"], returns="Promise")],
    "Promise.all": [DirectCall(fn="all", receiver="Promise", demands=["list"], returns="Promise")],
    "Promise.allSettled": [DirectCall(fn="allSettled", receiver="Promise", demands=["list"], returns="Promise")],
    "Promise.race": [DirectCall(fn="race", receiver="Promise", demands=["list"], returns="Promise")],
    "Promise.any": [DirectCall(fn="any", receiver="Promise", demands=["list"], returns="Promise")],
    "then": [PrototypeCall(constructor="Promise", fn="then", demands=["Promise", "*"], returns="Promise")],
    "catch": [PrototypeCall(constructor="Promise", fn="catch", demands=["Promise", "*"], returns="Promise")],
    "finally": [PrototypeCall(constructor="Promise", fn="finally", demands=["Promise", "*"], returns="Promise")],
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

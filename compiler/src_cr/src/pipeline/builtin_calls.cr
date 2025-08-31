# pipeline/builtin_calls.cr
# Built-in function call definitions and call conventions.

require "./call_conventions"
require "../compiler_types/proper_types"

# Built-ins map
BUILTIN_CALLS = {} of String => Array(Call_convention)

# Operators / fundamentals
BUILTIN_CALLS["#"]      = [IndexAccessCall.new] of Call_convention
BUILTIN_CALLS["~"]      = [CallableInvokeCall.new] of Call_convention
BUILTIN_CALLS["concat"] = [NaryOperatorCall.new(operator: "+")] of Call_convention
BUILTIN_CALLS["any"]    = [NaryOperatorCall.new(operator: "||")] of Call_convention
BUILTIN_CALLS["all"]    = [NaryOperatorCall.new(operator: "&&")] of Call_convention
BUILTIN_CALLS["add"]    = [NaryOperatorCall.new(operator: "+")] of Call_convention
BUILTIN_CALLS["sub"]    = [NaryOperatorCall.new(operator: "-")] of Call_convention
BUILTIN_CALLS["mul"]    = [NaryOperatorCall.new(operator: "*")] of Call_convention
BUILTIN_CALLS["mod"]    = [NaryOperatorCall.new(operator: "%")] of Call_convention
BUILTIN_CALLS["div"]    = [NaryOperatorCall.new(operator: "/")] of Call_convention
BUILTIN_CALLS["none"]   = [NaryOperatorCall.new(operator: "||", wrapper: "!")] of Call_convention
BUILTIN_CALLS["asc"]     = [ChainedComparisonCall.new(operator: "<")] of Call_convention
BUILTIN_CALLS["nondesc"] = [ChainedComparisonCall.new(operator: "<=")] of Call_convention
BUILTIN_CALLS["desc"]    = [ChainedComparisonCall.new(operator: ">")] of Call_convention
BUILTIN_CALLS["nonasc"]  = [ChainedComparisonCall.new(operator: ">=")] of Call_convention
BUILTIN_CALLS["eq"]      = [ChainedComparisonCall.new(operator: "===")] of Call_convention

# Object helpers
BUILTIN_CALLS["values"] = [DirectCall.new(fn: "values", receiver: "Object")] of Call_convention
BUILTIN_CALLS["keys"]   = [DirectCall.new(fn: "keys", receiver: "Object")] of Call_convention
BUILTIN_CALLS["print"]  = [DirectCall.new(fn: "log", receiver: "console")] of Call_convention

# 67lang shims
BUILTIN_CALLS["zip"]      = [DirectCall.new(fn: "zip", receiver: "_67lang")] of Call_convention
BUILTIN_CALLS["new_set"]  = [DirectCall.new(fn: "new_set", receiver: "_67lang", returns: "set")] of Call_convention
BUILTIN_CALLS["prompt"]   = [DirectCall.new(fn: "prompt", receiver: "_67lang", returns: STRING)] of Call_convention
BUILTIN_CALLS["stdin"]    = [DirectCall.new(fn: "stdin", receiver: "_67lang", returns: STRING)] of Call_convention
BUILTIN_CALLS["is_tty"]   = [DirectCall.new(fn: "is_tty", receiver: "_67lang")] of Call_convention

# Deno (target-specific)
BUILTIN_CALLS["read_file"] = [DirectCall.new(fn: "readTextFile", receiver: "Deno", demands: [STRING] of TypeDemand, returns: STRING)] of Call_convention
BUILTIN_CALLS["cwd"]       = [DirectCall.new(fn: "cwd", receiver: "Deno", returns: STRING)] of Call_convention

# JSON
BUILTIN_CALLS["JSON.stringify"] = [
  DirectCall.new(fn: "stringify", receiver: "JSON", demands: ["*"] of TypeDemand, returns: "str"),
  DirectCall.new(fn: "stringify", receiver: "JSON", demands: ["*", "*"] of TypeDemand, returns: "str"),
  DirectCall.new(fn: "stringify", receiver: "JSON", demands: ["*", "*", "*"] of TypeDemand, returns: "str"),
] of Call_convention

BUILTIN_CALLS["JSON.parse"] = [
  DirectCall.new(fn: "parse", receiver: "JSON", demands: ["str"] of TypeDemand, returns: "*"),
  DirectCall.new(fn: "parse", receiver: "JSON", demands: ["str", "*"] of TypeDemand, returns: "*"),
] of Call_convention

# pipeline/builtin_calls.cr
# Built-in function call definitions and call conventions.

require "./call_conventions"
require "../compiler_types/proper_types"

# Built-ins map
BUILTIN_CALLS = {} of String => Array(Call_convention)

N_ARIES = {} of String => Array(Call_convention)

MAX_NARY = 6

def register(name : String, conv : Array(Call_convention))
  BUILTIN_CALLS[name] ||= [] of Call_convention
  BUILTIN_CALLS[name] += conv
end

# Helpers to generate fixed-arity variants by repeating T in the demands
def spread_nary(operator : String, t : TypeVariable, max_arity : Int32 = MAX_NARY, wrapper : String? = nil, name : String? = nil)
  (1..max_arity).map { |n|
    if n == 2 && name == "concat"
      # TODO FUCK that's stupid.
      next
    end
    NaryOperatorCall.new(
      operator: operator,
      wrapper:  wrapper,
      demands:  Array(Type).new(n) { t },
      returns:  t
    ).as(Call_convention)
  }.compact
end

def spread_chain(operator : String, t : TypeVariable, max_arity : Int32 = MAX_NARY)
  (1..max_arity).map { |n|
    ChainedComparisonCall.new(
      operator: operator,
      demands:  Array(Type).new(n) { t },
      returns:  t
    ).as(Call_convention)
  }
end

# Type params
T = TypeVariable.new("T")
K = TypeVariable.new("K")
V = TypeVariable.new("V")

# N-ary logical/arithmetic ops expanded into fixed arities 2..MAX_NARY
N_ARIES["concat"] = spread_nary("+",  T, MAX_NARY, nil, "concat")
N_ARIES["any"]    = spread_nary("||", T)
N_ARIES["all"]    = spread_nary("&&", T)
N_ARIES["add"]    = spread_nary("+",  T)
N_ARIES["sub"]    = spread_nary("-",  T)
N_ARIES["mul"]    = spread_nary("*",  T)
N_ARIES["mod"]    = spread_nary("%",  T)
N_ARIES["div"]    = spread_nary("/",  T)

# none(x1, x2, ..., xn) = ! (x1 || x2 || ... || xn)
N_ARIES["none"]   = spread_nary("||", T, MAX_NARY, "!")

# Chained comparisons expanded into fixed arities 2..MAX_NARY
N_ARIES["asc"]     = spread_chain("<",  T)
N_ARIES["nondesc"] = spread_chain("<=", T)
N_ARIES["desc"]    = spread_chain(">",  T)
N_ARIES["nonasc"]  = spread_chain(">=", T)
N_ARIES["eq"]      = spread_chain("===", T)


N_ARIES.each do |k, v|
  BUILTIN_CALLS[k] ||= [] of Call_convention
  BUILTIN_CALLS[k] += v
end

BUILTIN_CALLS["#"]      = [
  # list get
  IndexAccessCall.new(demands: [ComplexType.new("list", [T]), INT], returns: T),
  # list set
  IndexAccessCall.new(demands: [ComplexType.new("list", [T]), INT, T], returns: T),
  # dict get
  IndexAccessCall.new(demands: [ComplexType.new("dict", [K, V]), K], returns: V),
  # dict set
  IndexAccessCall.new(demands: [ComplexType.new("dict", [K, V]), K, V], returns: V)
] of Call_convention

RV = TypeVariable.new("RV")
(0..MAX_NARY).each { |size|
  args = Array(Type).new(size) { |n| TypeVariable.new("ARG#{n}") }
  callable = ComplexType.new("callable", args + [RV])
  register "~", [CallableInvokeCall.new(demands: [callable] + args, returns: RV)]
}

# this is really fucking stupid but quite clever too...
# the shit we do to save ourselves some work...
(2..MAX_NARY).each { |size|
  tvs = Array(Type).new(size) { |n| TypeVariable.new("V#{n}") }
  (0..size-1).each { |n|
    tv = tvs[n]

    fn = "#{n}"
    BUILTIN_CALLS[fn] ||= [] of Call_convention

    # getter
    BUILTIN_CALLS[fn] << FieldCall.new(
      field: fn,
      demands: [
        ComplexType.new("tuple", tvs),
      ] of Type, 
      returns: tv
    )
    # setter
    BUILTIN_CALLS[fn] << FieldCall.new(
      field: fn,
      demands: [
        ComplexType.new("tuple", tvs),
        tv
      ] of Type, 
      returns: tv
    )
  }
}

# Object helpers
BUILTIN_CALLS["values"] = [DirectCall.new(fn: "values", receiver: "Object", 
  demands: [ComplexType.new("dict", [K, V])] of Type, 
  returns: ComplexType.new("list", [V])
)] of Call_convention
BUILTIN_CALLS["keys"]   = [DirectCall.new(fn: "keys", receiver: "Object")] of Call_convention

(0..MAX_NARY).each { |size|
  demands = Array(Type).new(size) { |n| WILDCARD }
  register "print", [DirectCall.new(fn: "log", receiver: "console", demands: demands, returns: VOID)] of Call_convention
}

# 67lang shims
BUILTIN_CALLS["zip"]      = [DirectCall.new(fn: "zip", receiver: "_67lang", 
  demands: [
    ComplexType.new("list", [TypeVariable.new("A")]), 
    ComplexType.new("list", [TypeVariable.new("B")]), 
  ] of Type, 
  returns: ComplexType.new("list", [ComplexType.new("tuple", [TypeVariable.new("A"), TypeVariable.new("B")])] of Type)
)] of Call_convention
BUILTIN_CALLS["new_set"]  = [DirectCall.new(fn: "new_set", receiver: "_67lang", returns: SET)] of Call_convention
# TODO. we should instead like properly now test the prompting...
BUILTIN_CALLS["stdin"]    = [DirectCall.new(fn: "stdin", receiver: "_67lang", returns: STRING)] of Call_convention
BUILTIN_CALLS["is_tty"]   = [DirectCall.new(fn: "is_tty", receiver: "_67lang", returns: BOOL)] of Call_convention

# Deno (target-specific)
BUILTIN_CALLS["read_file"] = [DirectCall.new(fn: "readTextFile", receiver: "Deno", demands: [STRING] of TypeDemand, returns: STRING)] of Call_convention
BUILTIN_CALLS["cwd"]       = [DirectCall.new(fn: "cwd", receiver: "Deno", returns: STRING)] of Call_convention

# JSON
BUILTIN_CALLS["JSON.stringify"] = [
  DirectCall.new(fn: "stringify", receiver: "JSON", demands: [DICT] of TypeDemand, returns: STRING),
] of Call_convention

BUILTIN_CALLS["JSON.parse"] = [
  DirectCall.new(fn: "parse", receiver: "JSON", demands: [STRING] of TypeDemand, returns: DICT),
] of Call_convention

# TODO. please nuke this shit ASAP. you bring your own!
register "parseInt", [DirectCall.new(fn: "parseInt", demands: [STRING] of TypeDemand, returns: INT)] of Call_convention
register "onopen", [FieldCall.new(field: "onopen", demands: [
  ComplexType.new("WebSocket"),
  ComplexType.new("callable", [T, VOID]),
] of TypeDemand, returns: VOID)] of Call_convention
register "onmessage", [FieldCall.new(field: "onmessage", demands: [
  ComplexType.new("WebSocket"),
  ComplexType.new("callable", [T, VOID]),
] of TypeDemand, returns: VOID)] of Call_convention
register "onclose", [FieldCall.new(field: "onclose", demands: [
  ComplexType.new("WebSocket"),
  ComplexType.new("callable", [T, VOID]),
] of TypeDemand, returns: VOID)] of Call_convention

register "setInterval", [DirectCall.new(fn: "setInterval", demands: [
  ComplexType.new("callable", [VOID]),
  INT
] of TypeDemand, returns: VOID)] of Call_convention

register "setTimeout", [DirectCall.new(fn: "setTimeout", demands: [
  ComplexType.new("callable", [VOID]),
  INT
] of TypeDemand, returns: VOID)] of Call_convention

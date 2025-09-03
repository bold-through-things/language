# pipeline/load_builtins_json.cr
require "../compiler_types/proper_types"
require "./call_conventions"
require "json"

# NOTE: Do NOT declare BUILTIN_CALLS here; it’s defined elsewhere.

# Embed JSON at compile time
BUILTINS_RAW = {{ read_file("#{__DIR__}/../assets/typescript_builtins.json") }}

private def ref_to_type(id : String) : Type
  case id
  when "INT"        then INT
  when "FLOAT"      then FLOAT
  when "STRING"     then STRING
  when "BOOL"       then BOOL
  when "VOID"       then VOID
  when "LIST_TYPE"  then TYPE_REGISTRY.get_type("list").as(ComplexType)
  when "DICT_TYPE"  then TYPE_REGISTRY.get_type("dict").as(ComplexType)
  else
    TYPE_REGISTRY.get_type(id) || ComplexType.new(id)
  end
end

# Decode a single Type
private def decode_type(node : JSON::Any) : TypeDemand
  h = node.as_h
  case h["k"].as_s
  when "wild"
    raise "not supported"
  when "ref"
    ref_to_type(h["id"].as_s)
  when "prim"
    case name = h["n"].as_s
    when "int"   then INT
    when "float" then FLOAT
    when "str"   then STRING
    when "bool"  then BOOL
    when "void"  then VOID
    else
      TYPE_REGISTRY.get_type(name) || PrimitiveType.new(name)
    end
  when "cx"
    name = h["n"].as_s
    ps_any = h["p"]?.try &.as_a || [] of JSON::Any

    params = [] of Type
    ps_any.each do |pe|
      td = decode_type(pe)
      params << td
    end

    if params.empty?
      TYPE_REGISTRY.get_type(name) || ComplexType.new(name)
    else
      ComplexType.new(name, params)
    end
  when "name"
    name = h["n"].as_s
    TYPE_REGISTRY.get_type(name) || ComplexType.new(name)
  when "tv"
    name = h["n"].as_s
    TypeVariable.new(name)
  else
    raise "Unknown type kind: #{h["k"]?}"
  end
end

private def decode_demands(node : JSON::Any?) : Array(TypeDemand)?
  return nil unless node
  node.as_a.map { |e| decode_type(e) }
end

def load_builtins_from_json(raw : String) : Nil
  json = JSON.parse(raw)
  builtins = json["builtins"]?.try &.as_h || {} of String => JSON::Any

  builtins.each do |name, arr_any|
    calls = [] of Call_convention
    arr_any.as_a.each do |call_any|
      h = call_any.as_h
      kind    = h["kind"].as_s
      demands = decode_demands(h["demands"]?)
      returns = h["returns"]?.try { |r| decode_type(r) }

      case kind
      when "DirectCall"
        fn  = h["fn"].as_s
        rec = h["receiver"]?.try &.as_s?
        calls << DirectCall.new(fn: fn, receiver: rec, demands: demands, returns: returns)
      when "PrototypeCall"
        ctor = h["constructor"].as_s
        fn   = h["fn"].as_s
        calls << PrototypeCall.new(constructor: ctor, fn: fn,
          demands: demands.not_nil!, returns: returns.not_nil!)
      when "NewCall"
        ctor = h["constructor"].as_s
        calls << NewCall.new(constructor: ctor, demands: demands, returns: returns)
      when "FieldCall"
        field = h["field"].as_s
        calls << FieldCall.new(field: field, demands: demands, returns: returns)
      when "IndexAccessCall"
        calls << IndexAccessCall.new(demands: demands, returns: returns)
      else
        raise "Unknown call kind #{kind}"
      end
    end
    BUILTIN_CALLS[name] ||= [] of Call_convention 
    BUILTIN_CALLS[name] += calls
  end
end

load_builtins_from_json(BUILTINS_RAW)

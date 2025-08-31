
alias MetaValue = Nil | Bool | Int32 | Int64 | Float64 | String | Array(MetaValue) | Hash(String, MetaValue)

# ---- helpers for JSON-friendly diagnostic payloads ----
def type_to_meta(t : Type) : MetaValue
  case t
  when PrimitiveType
    {"name" => t.name, "type_params" => [] of MetaValue, "fields" => [] of MetaValue} of String => MetaValue
  when ComplexType
    {
      "name"        => t.name,
      "type_params" => t.type_params.map { |p| type_to_meta(p) }.as(MetaValue),
      "fields"      => t.fields.map { |(n, ty)| ({"name" => n, "type" => type_to_meta(ty)} of String => MetaValue).as(MetaValue) }.as(MetaValue),
    } of String => MetaValue
  when FunctionType
    {
      "kind"   => "FunctionType",
      "params" => t.parameter_types.map { |p| type_to_meta(p) }.as(MetaValue),
      "returns"=> type_to_meta(t.return_type),
    } of String => MetaValue
  else
    # last resort: printable string
    t.to_s
  end
end

def demand_to_meta(x : TypeDemand) : MetaValue
  case x
  when String then x.as(MetaValue)
  else             type_to_meta(x.as(Type)).as(MetaValue)
  end
end

def convention_to_meta(c : Call_convention) : Hash(String, MetaValue)
  h = {"convention" => c.class.name} of String => MetaValue
  case c
  when FieldCall
    h["field"] = c.field
  when PrototypeCall
    h["constructor"] = c.constructor
    h["fn"]          = c.fn
  when DirectCall
    h["fn"] = c.fn
    if recv = c.receiver
      h["receiver"] = recv
    end
  when NewCall
    h["constructor"] = c.constructor
  when NaryOperatorCall
    h["operator"] = c.operator
  when ChainedComparisonCall
    h["operator"] = c.operator
  when LocalAccessCall
    h["fn"] = c.fn
  when IndexAccessCall, CallableInvokeCall
    # nothing extra
  end

  if c.responds_to?(:demands)
    if d = c.demands.as(Array(TypeDemand)?)
      h["demands"] = d.map { |v| demand_to_meta(v) }.as(MetaValue)
    end
  end
  if c.responds_to?(:returns)
    if r = c.returns.as(TypeDemand?)
      h["returns"] = demand_to_meta(r)
    end
  end
  h
end
# ---- end helpers ----

def meta_to_json_any(v : MetaValue) : JSON::Any
  case v
  when Int32
    JSON::Any.new v.to_i64
  when Int64
    JSON::Any.new v
  when Float64
    JSON::Any.new v
  when String
    JSON::Any.new v
  when Bool
    JSON::Any.new v
  when Array(MetaValue)
    JSON::Any.new v.map { |x| meta_to_json_any(x) }
  when Hash(String, MetaValue)
    JSON::Any.new v.transform_values { |x| meta_to_json_any(x) }
  else
    raise "not reached"
  end
end

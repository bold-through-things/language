# compiler_types/type_hierarchy.cr
require "./proper_types"
require "json"

HIER_RAW = {{ read_file("#{__DIR__}/../assets/type_hierarchy.json") }}

private def decode_h_value(x : JSON::Any) : (Type | String)
  remap = {
    # TODO generate this shit with macro
    "INT" => INT,
    "FLOAT" => FLOAT,
    "DICT_TYPE" => TYPE_REGISTRY.get_type("dict").not_nil!,
    "LIST_TYPE" => TYPE_REGISTRY.get_type("list").not_nil!,
    "STRING" => STRING,
    "BOOL" => BOOL,
    "VOID" => VOID,
  }
  if (s = x.as_s?)
    remap[s]? || TYPE_REGISTRY.compute_type(s) { ComplexType.new(s) }
  else
    s = x.to_s
    remap[s]? || TYPE_REGISTRY.compute_type(s) { ComplexType.new(s) }
  end
end

private def load_type_hierarchy_json(raw : String) : Nil
  json = JSON.parse(raw)
  if th = json["type_hierarchy"]?
    th.as_h.each do |k, v|
      t = decode_h_value(JSON::Any.new k)
      parents = v.as_a.map { |e| decode_h_value(e) }

      TYPE_HIERARCHY[t] = parents
    end
  end
  if un = json["unions"]?
    un.as_h.each do |k, v|
      UNION_TYPES[k] = v.as_a.map(&.as_s)
    end
  end
end

load_type_hierarchy_json(HIER_RAW)

# p! TYPE_REGISTRY.get_type("dict").not_nil!.is_assignable_to("RequestInit")
# p! ComplexType.new("dict", [STRING, STRING]).is_assignable_to("RequestInit")
# p! ComplexType.new("dict", [STRING, STRING]).is_assignable_to(TYPE_REGISTRY.get_type("dict").not_nil!)
# p! STRING.is_assignable_to("RequestInfo")

# p! TYPE_REGISTRY.get_type("Uint8Array").not_nil!.is_assignable_to(TYPE_REGISTRY.get_type("AllowSharedBufferSource").not_nil!)

# p! TYPE_REGISTRY.get_type("str").not_nil!.is_assignable_to(TYPE_REGISTRY.get_type("RequestInfo").not_nil!)
# p! TYPE_REGISTRY.get_type("dict").not_nil!.is_assignable_to(TYPE_REGISTRY.get_type("RequestInit").not_nil!)
# p! TYPE_REGISTRY.instantiate_generic("dict", [STRING, STRING]).not_nil!.is_assignable_to(TYPE_REGISTRY.get_type("RequestInit").not_nil!)

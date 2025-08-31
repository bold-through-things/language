# compiler_types/proper_types.cr
# Proper type system for 67lang — objects, mandatory generics.

require "./type_hierarchy" # expects `type_hierarchy` to exist
require "json"

abstract class Type
  abstract def to_s(io : IO) : Nil
  abstract def is_assignable_to(other : Type) : Bool
  abstract def is_concrete : Bool

  # Legacy convenience for string “types”
  def is_assignable_to(other : String) : Bool
    false
  end

  def to_s : String
    String.build { |io| to_s(io) }
  end
end

def is_transitive_subtype(current, target : String) : Bool
  case current
  when String
    return true if current == target
    if (parents = TYPE_HIERARCHY[current]?)
      parents.any? { |p| is_transitive_subtype(p, target) }
    else
      false
    end
  when Type
    is_transitive_subtype(current.to_s, target)
  else
    false
  end
end

# -------- Primitive --------

class PrimitiveType < Type
  getter name : String
  def initialize(@name : String); end

  def to_s(io : IO) : Nil
    io << @name
  end

  def is_assignable_to(other : Type) : Bool
    case other
    when PrimitiveType
      return true if @name == other.name
      # subtype via hierarchy
      if (parents = TYPE_HIERARCHY[self]?)
        return parents.includes?(other) ||
               parents.includes?(other.name) ||
               parents.any? { |p| is_transitive_subtype(p, other.name) }
      end
      false
    else
      false
    end
  end

  def is_assignable_to(other : String) : Bool
    return true if @name == other
    if (parents = TYPE_HIERARCHY[self]?)
      parents.includes?(other) || parents.any? { |p| is_transitive_subtype(p, other) }
    else
      false
    end
  end

  def is_concrete : Bool
    true
  end
end

# -------- Type Variable --------

class TypeVariable < Type
  getter name : String
  getter constraints : Array(Type)

  def initialize(@name : String, constraints : Array(Type) = [] of Type)
    @constraints = constraints
  end

  def to_s(io : IO) : Nil
    if @constraints.empty?
      io << @name
    else
      io << @name << " extends " << @constraints.join(" & ")
    end
  end

  def is_assignable_to(other : Type) : Bool
    return true if other.is_a?(TypeVariable) && @name == other.name
    @constraints.any? { |c| c.is_assignable_to(other) }
  end

  def is_concrete : Bool
    false
  end
end

# -------- Complex (generics / user types) --------

class ComplexType < Type
  getter name : String
  getter type_params : Array(Type)
  getter fields : Array(Tuple(String, Type))

  def initialize(@name : String, type_params : Array(Type) | Array(TypeVariable) = [] of Type, fields : Array({String, U}) = [] of {String, Type}) forall U
    @type_params = type_params.map(&.as(Type))
    @fields = fields.map { |(n, t)| {n, t.as(Type)} }
  end

  def to_s(io : IO) : Nil
    if @type_params.empty?
      io << @name
    else
      io << @name << "<" << @type_params.join(", ") << ">"
    end
  end

  def is_assignable_to(other : Type) : Bool
    case other
    when ComplexType
      return false unless @name == other.name
      return false unless @type_params.size == other.type_params.size
      @type_params.zip(other.type_params).all? { |a, b| a.is_assignable_to(b) }
    when PrimitiveType, TypeVariable
      false
    else
      false
    end
  end

  # Legacy: allow comparing to string base-name via hierarchy
  def is_assignable_to(other : String) : Bool
    return true if @name == other
    if (base = type_registry.get_type(@name))
      if (parents = TYPE_HIERARCHY[base]?)
        return parents.includes?(other)
      end
    end
    false
  end

  def is_concrete : Bool
    @type_params.all?(&.is_concrete)
  end

  def get_field_type(field_name : String) : Type?
    @fields.each { |(n, t)| return t if n == field_name }
    nil
  end
end

# -------- Function --------

class FunctionType < Type
  getter parameter_types : Array(Type)
  getter return_type : Type

  def initialize(@parameter_types : Array(Type), @return_type : Type)
  end

  def to_s(io : IO) : Nil
    if @parameter_types.empty?
      io << "()" << " -> " << @return_type
    else
      io << "(" << @parameter_types.join(", ") << ") -> " << @return_type
    end
  end

  def is_assignable_to(other : Type) : Bool
    return false unless other.is_a?(FunctionType)
    return false unless @parameter_types.size == other.parameter_types.size

    params_ok = @parameter_types.zip(other.parameter_types).all? { |a, b| b.is_assignable_to(a) } # contravariant
    ret_ok = @return_type.is_assignable_to(other.return_type) # covariant
    params_ok && ret_ok
  end

  def is_concrete : Bool
    @parameter_types.all?(&.is_concrete) && @return_type.is_concrete
  end
end

# -------- Builtins --------

INT    = PrimitiveType.new("int")
FLOAT  = PrimitiveType.new("float")
STRING = PrimitiveType.new("str")
BOOL   = PrimitiveType.new("bool")
VOID   = PrimitiveType.new("void")

module BuiltinGenericTypes
  extend self

  def list_of(element_type : Type) : ComplexType
    ComplexType.new("list", [element_type], [{"length", INT}])
  end

  def dict_of(key_type : Type, value_type : Type) : ComplexType
    ComplexType.new("dict", [key_type, value_type])
  end

  def function_of(param_types : Array(Type), return_type : Type) : FunctionType
    FunctionType.new(param_types, return_type)
  end
end

# -------- Substitution --------

class TypeSubstitution
  getter substitutions : Hash(String, Type)

  def initialize(@substitutions : Hash(String, Type))
  end

  def apply(type_expr : Type) : Type
    case type_expr
    when TypeVariable
      substitutions[type_expr.name]? || type_expr
    when ComplexType
      new_params = type_expr.type_params.map { |t| apply(t) }
      ComplexType.new(type_expr.name, new_params, type_expr.fields)
    when FunctionType
      new_params = type_expr.parameter_types.map { |t| apply(t) }
      new_ret = apply(type_expr.return_type)
      FunctionType.new(new_params, new_ret)
    else
      type_expr
    end
  end
end

# -------- Registry --------

class TypeRegistry
  getter types : Hash(String, ComplexType)

  def initialize
    @types = {} of String => ComplexType
    register_builtins
  end

  private def register_builtins
    list_t  = ComplexType.new("list", [TypeVariable.new("T")], [{"length", INT}])
    dict_kv = ComplexType.new("dict", [TypeVariable.new("K"), TypeVariable.new("V")])
    @types["list"] = list_t
    @types["dict"] = dict_kv
  end

  def register_type(complex_type : ComplexType) : Nil
    @types[complex_type.name] = complex_type
  end

  def get_type(name : String) : Type?
    case name
    when "int"   then INT
    when "float" then FLOAT
    when "str"   then STRING
    when "bool"  then BOOL
    when "void"  then VOID
    else
      @types[name]?
    end
  end

  def instantiate_generic(name : String, type_args : Array(Type)) : ComplexType?
    tmpl = @types[name]?
    return nil unless tmpl
    return nil unless type_args.size == tmpl.type_params.size
    ComplexType.new(tmpl.name, type_args.dup, tmpl.fields)
  end
end

# Global type registry
TYPE_REGISTRY = TypeRegistry.new

def type_registry : TypeRegistry
  TYPE_REGISTRY
end

# -------- Wrapper to mark type parameters in typecheck results --------

class TypeParameter
  getter type_expr : Type
  getter parameter_name : String?

  def initialize(@type_expr : Type, @parameter_name : String? = nil)
  end

  def to_s(io : IO) : Nil
    if name = @parameter_name
      io << @type_expr << " for " << name
    else
      io << @type_expr
    end
  end
end

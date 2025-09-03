# compiler_types/proper_types.cr
# Proper type system for 67lang — objects, mandatory generics.

require "json"

TYPE_HIERARCHY = {} of Type => Array(Type)
UNION_TYPES    = {} of String => Array(String)

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

def is_transitive_subtype(current : Type, target : Type) : Bool
  return true if current == target
  if (parents = TYPE_HIERARCHY[current]?)
    parents.any? { |p| is_transitive_subtype(p, target) }
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
    return true if other.name == "*" # TODO oblitefuckingrate me
    return true if @name == other.name
    return true if other.is_a?(TypeVariable) # i guess ?!
    # subtype via hierarchy
    if (parents = (empty_Array_unless TYPE_HIERARCHY[self]?)  + (empty_Array_unless TYPE_HIERARCHY[TYPE_REGISTRY.get_type(self.name)]?))
      return parents.includes?(other) ||
              parents.includes?(other.name) ||
              parents.any? { |p| is_transitive_subtype(p, other) }
    end
    false
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
    return true if other.name == "*" # TODO oblitefuckingrate me
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
    return true if other.name == "*" # TODO oblitefuckingrate me
    case other
    when ComplexType
      is_subtype =
        if (parents = (empty_Array_unless TYPE_HIERARCHY[self]?)  + (empty_Array_unless TYPE_HIERARCHY[TYPE_REGISTRY.get_type(self.name)]?))
          parents.includes?(other) ||
          parents.any? { |p| is_transitive_subtype(p, other) }
        else
          false
        end
      return true if is_subtype # TODO this can't be right
      return false unless @name == other.name
      return false unless @type_params.size == other.type_params.size
      @type_params.zip(other.type_params).all? { |a, b| a.is_assignable_to(b) }
    when PrimitiveType, TypeVariable
      false
    else
      false
    end
  end

  def is_concrete : Bool
    @type_params.all?(&.is_concrete)
  end

  def get_field_type(field_name : String) : Type?
    @fields.each { |(n, t)| return t if n == field_name }
    nil
  end
end

# -------- Bottom / Never --------

class NeverType < Type
  getter name : String = "never"

  def to_s(io : IO) : Nil
    io << "never"
  end

  # never is a subtype of all types, so it's assignable-to anything
  def is_assignable_to(other : Type) : Bool
    true
  end

  # Legacy string path: also succeeds
  def is_assignable_to(other : String) : Bool
    true
  end

  # Treat as concrete so it doesn't cause extra "not concrete" noise
  def is_concrete : Bool
    true
  end
end

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
    else
      type_expr
    end
  end
end

# -------- Registry --------

class TypeRegistry
  getter types : Hash(String, Type)

  def initialize
    @types = {} of String => Type
  end

  def register_type(complex_type : Type) : Nil
    @types[complex_type.name] = complex_type
  end

  def compute_type(name : String, &block : Proc(Type)) : Type?
    t = get_type(name)
    if t.nil? 
      t = yield
      # TODO - assert the type created has the name that matches
      @types[t.name] = t
    end
    return t
  end

  def get_type(name : String) : Type?
    case name
    when "int"   then INT
    when "float" then FLOAT
    when "bool"  then BOOL
    when "void"  then VOID
    else
      @types[name]?
    end
  end

  def instantiate_generic(name : String, type_args : Array(Type)) : ComplexType?
    tmpl = @types[name]?
    return nil unless tmpl
    raise "??????" if !tmpl.is_a?(ComplexType)
    return nil unless type_args.size == tmpl.type_params.size
    ComplexType.new(tmpl.name, type_args.dup, tmpl.fields)
  end
end

# Global type registry
TYPE_REGISTRY = TypeRegistry.new

NEVER = NeverType.new
WILDCARD    = TYPE_REGISTRY.compute_type("*") { ComplexType.new("*") } # TODO please i beg you nuke me...
INT    = PrimitiveType.new("int")
FLOAT  = PrimitiveType.new("float")
STRING = TYPE_REGISTRY.compute_type("str") { PrimitiveType.new("str") }
REGEX = PrimitiveType.new("regex")
BOOL   = PrimitiveType.new("bool")
VOID   = PrimitiveType.new("void")
LIST  = ComplexType.new("list", [TypeVariable.new("T")], [{"length", INT}])
DICT = TYPE_REGISTRY.compute_type("dict") { ComplexType.new("dict", [TypeVariable.new("K"), TypeVariable.new("V")]) }
SET = ComplexType.new("set", [TypeVariable.new("T")])
CALLABLE = TYPE_REGISTRY.compute_type("callable") { ComplexType.new("callable", [TypeVariable.new("RV")]) }

if CALLABLE.nil?
  raise "fuck you"
end

# TODO register the others too
TYPE_REGISTRY.register_type(LIST)
TYPE_REGISTRY.register_type(SET)

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

# fuck TypeScript yo! `int` into `float`?!
TYPE_REGISTRY.register_type(ComplexType.new("Error"))

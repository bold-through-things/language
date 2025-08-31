# pipeline/call_conventions.cr
# Built-in function call definitions and call conventions.

require "../compiler_types/proper_types"

# Union of all call-convention classes
alias Call_convention = FieldCall | PrototypeCall | DirectCall | LocalAccessCall | NaryOperatorCall | ChainedComparisonCall | NewCall | IndexAccessCall | CallableInvokeCall

# Types (or string wildcards like "*") used in demands/returns
alias TypeDemand = Type | String

# Convert a field name to JS access syntax
def js_field_access(s : String) : String
  if s =~ /\A[a-zA-Z_$][a-zA-Z0-9_$]*\z/
    ".#{s}"
  else
    %([\"#{s}\"])
  end
end

# --- Call conventions ---------------------------------------------------------

# receiver.field  (optionally assignment when extra args are provided)
class FieldCall
  getter field : String
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@field : String, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    begin
      receiver = args[0]
      rest = args[1..] || [] of String
      maybe_assign = rest.empty? ? "" : " = (#{rest.join(",")})"
      "(#{receiver}.#{@field}#{maybe_assign})"
    rescue e
      raise "FieldCall(#{@field}) failed to compile: #{e}"
    end
  end
end

# String.join.call(self, args...)
class PrototypeCall
  getter constructor : String
  getter fn : String
  getter demands : Array(TypeDemand)
  getter returns : TypeDemand

  def initialize(@constructor : String, @fn : String, @demands : Array(TypeDemand), @returns : TypeDemand)
  end

  def compile(args : Array(String)) : String
    "#{@constructor}.prototype.#{@fn}.call(#{args.join(", ")})"
  end
end

# fn(args...)  (or receiver.fn(args...) if receiver provided)
class DirectCall
  getter fn : String
  getter receiver : String?
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@fn : String, @receiver : String? = nil, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    prefix = @receiver ? "#{@receiver}." : ""
    "#{prefix}#{@fn}(#{args.join(", ")})"
  end
end

# just returns / assigns the identifier
class LocalAccessCall
  getter fn : String
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@fn : String, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    if args.size > 0
      "(#{@fn} = #{args.join(",")})"
    else
      @fn
    end
  end
end

# emits a direct JS operator for n-ary application (e.g., +, &&, ||)
# optionally wraps the whole expression (e.g., "!" prefix)
class NaryOperatorCall
  getter operator : String
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?
  getter is_async : Bool
  getter wrapper : String?

  def initialize(@operator : String, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil, @is_async : Bool = false, @wrapper : String? = nil)
  end

  def compile(args : Array(String)) : String
    expr = "(#{args.join(" #{@operator} ")})"
    @wrapper ? "#{@wrapper}#{expr}" : expr
  end
end

# emits chained comparisons: a < b && b < c
class ChainedComparisonCall
  getter operator : String
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?
  getter is_async : Bool

  def initialize(@operator : String, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil, @is_async : Bool = false)
  end

  def compile(args : Array(String)) : String
    return "true" if args.size < 2
    parts = [] of String
    (0...(args.size - 1)).each do |i|
      parts << "#{args[i]} #{@operator} #{args[i + 1]}"
    end
    "(#{parts.join(" && ")})"
  end
end

# new Constructor(a, b)
class NewCall
  getter constructor : String
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@constructor : String, @demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    "(new #{@constructor}(#{args.join(", ")}))"
  end
end

# obj[index]   or   obj[index] = value
class IndexAccessCall
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    receiver = args[0]
    index    = args[1]
    value    = args[2]?
    if value
      "(#{receiver}[#{index}] = #{value})"
    else
      "#{receiver}[#{index}]"
    end
  end
end

# fn(args...) where the first arg is the callable
class CallableInvokeCall
  getter demands : Array(TypeDemand)?
  getter returns : TypeDemand?

  def initialize(@demands : Array(TypeDemand)? = nil, @returns : TypeDemand? = nil)
  end

  def compile(args : Array(String)) : String
    fn = args[0]
    params = args[1..] || [] of String
    "#{fn}(#{params.join(", ")})"
  end
end

# core/macrocosm.cr

require "../utils/strutil"
require "../utils/logger"
require "./node"
require "../pipeline/js_conversion"
require "../core/exceptions"
require "../core/meta_value"
require "./macro_registry"

# macros
require "../macros/noscope_macro"
require "../macros/collection_macros"
require "../macros/if_macro"
require "../macros/literal_value_macros"
require "../macros/while_macro"
require "../macros/for_macro"
require "../macros/local_macro"
require "../macros/fn_macro"
require "../macros/exists_macro"
require "../macros/then_macro"
require "../macros/multi_provider"
require "../macros/call_macro"
require "../macros/utility_macros"
require "../macros/solution_macro"
require "../macros/error_macros"
require "../macros/comment_macros"
require "../macros/return_macro"
require "../macros/scope_macro"
require "../macros/type_macro"
require "../macros/try_catch_macro"
require "../macros/bind_macro"
require "../macros/obtain_param_value_macro"

# pipeline
require "../pipeline/steps/utils"
require "../pipeline/steps/type_registration"
require "../pipeline/steps/processing"
require "../pipeline/steps/typechecking"
require "../pipeline/steps/emission"
require "../pipeline/steps/must_compile_error_step"

require "../pipeline/call_conventions"

require "../pipeline/load_builtins_json"

def compile_errors_to_json_any(arr : Array(Hash(String, MetaValue))) : JSON::Any
  JSON::Any.new arr.map { |h| JSON::Any.new h.transform_values { |v| meta_to_json_any(v) } }
end

# Generate typed metadata stores + overloads for each type
macro def_metadata(*types)
  {% for t in types %}
    {% name = t.id.stringify.gsub(/::/, "_").downcase %}
    @meta_{{name.id}} = Hash(Node, {{t}}).new
  {% end %}

  {% for t in types %}
    {% name = t.id.stringify.gsub(/::/, "_").downcase %}

    def set_metadata(node : Node, _t : {{t}}.class, value : {{t}}) : Nil
      @meta_{{name.id}}[node] = value
      default_logger.log("metadata",
        "set metadata {{t}} #{value} for #{node.object_id} #{node.content}")
    end

    def maybe_metadata(node : Node, _t : {{t}}.class) : {{t}}?
      @meta_{{name.id}}[node]?
    end

    def get_metadata(node : Node, _t : {{t}}.class) : {{t}}
      {% if t.stringify == "Macro" || t.stringify == "Args" %}
        ensure_macro_args_computed(node)
      {% end %}
      if v = @meta_{{name.id}}[node]?
        return v
      end
      if factory = TypeMap.default_factory_for({{t}}.class)
        v = factory.call.as({{t}})
        @meta_{{name.id}}[node] = v
        return v
      end
      raise KeyError.new("No metadata of type {{t}} for node")
    end
  {% end %}

  # Auto-generate typed invalidation
  def invalidate_metadata(node : Node) : Nil
    {% for t in types %}
      {% name = t.id.stringify.gsub(/::/, "_").downcase %}
      @meta_{{name.id}}.delete(node)
    {% end %}
    node.children.each { |ch| invalidate_metadata(ch) }
  end
end

class Macrocosm
  getter nodes = [] of Node
  getter compile_errors
  @compile_errors : Array(Hash(String, MetaValue)) = [] of Hash(String, MetaValue)
  getter registries = {} of String => MacroRegistry

  @incremental_id = 0
  @js_output = ""
  @dynamic_conventions = {} of String => Array(Call_convention)
  @root_node : Node?

  getter processing_steps : Array(MacroProcessingStep)

  def initialize(
    emission_registry : MacroRegistry,
    typecheck_registry : MacroRegistry,
    code_linking_registry : MacroRegistry,
    preprocess_registry : MacroRegistry,
    type_registration_registry : MacroRegistry,
    type_detail_registration_registry : MacroRegistry,
    function_registration : MacroRegistry
  )
    @processing_steps = [
      PreprocessingStep.new(preprocess_registry),
      TypeRegistrationStep.new(type_registration_registry),
      TypeDetailRegistrationStep.new(type_detail_registration_registry),
      FunctionRegistrationStep.new(function_registration),
      TypeCheckingStep.new(typecheck_registry),
      JavaScriptEmissionStep.new(emission_registry),
      MustCompileErrorVerificationStep.new(MacroRegistry.new),
    ]
  end

  def get_new_ident(name : String?) : String
    ident = "_0x#{@incremental_id.to_s(16)}"
    if name && !name.empty?
      ident += "_#{to_valid_js_ident(name)}"
    end
    @incremental_id += 1
    ident
  end

  def_metadata TypeFieldNames,
             Macro,
             Args,
             SaneIdentifier,
             Inject_code_start,
             ResolvedConvention,
             Params,
             Indexers,
             Callers,
             FieldDemandType

  private def ensure_macro_args_computed(node : Node) : Nil
    # only compute once
    return if maybe_metadata(node, Macro) && maybe_metadata(node, Args)
    macro_name, args = cut(node.content, " ")
    set_metadata(node, Macro, Macro.new(macro_name))
    set_metadata(node, Args, Args.new(args))
  end

  def register(node : Node) : Nil
    @nodes << node
  end

  def assert_(must_be_true : Bool, node : Node, message : String, error_type : String? = nil, extra_fields : Hash(String, MetaValue)? = nil) : Nil
    return if must_be_true
    if error_type.nil?
      error_type = ErrorType::ASSERTION_FAILED
    end
    compile_error(node, "failed to assert: #{message}", error_type, extra_fields)
    raise MacroAssertFailed.new(message)
  end

  def compile_error(node : Node, error : String, error_type : String, extra_fields : Hash(String, MetaValue)? = nil) : Nil
    pos = node.pos || Position.new(0, 0)
    entry = {
      "recoverable" => false,
      "line"        => pos.line,
      "char"        => pos.char,
      "content"     => node.content,
      "error"       => error,
      "error_type"  => error_type,
    } of String => MetaValue
    if extra_fields
      extra_fields.each { |k, v| entry[k] = v }
    end
    @compile_errors << entry
  end

  def compile : String
    default_logger.indent("compile", "discovering macros") do
      @nodes.each { |n| discover_macros(n) }
    end

    solution_node = make_node("67lang:solution", Position.new(0, 0), @nodes.dup)
    @root_node = solution_node

    @processing_steps.each do |step|
      step_name = step.class.name
      default_logger.indent("compile", "processing step: #{step_name}") do
        ctx = MacroContext.new(
          statement_out: IndentedStringIO.new,
          expression_out: IndentedStringIO.new,
          node: solution_node,
          compiler: self,
          current_step: step,
        )
        step.process_node(ctx)
      end
    end

    return "" unless @compile_errors.empty?
    @js_output
  end

  private def discover_macros(node : Node) : Nil
    ensure_macro_args_computed(node)
    node.children.each { |ch| discover_macros(ch) }
  end

  def make_node(content : String, pos : Position | Nil, children : Array(Node)?) : Node
    pos ||= Position.new(0, 0)
    n = Node.new(content, pos, children || [] of Node)
    discover_macros(n)
    n
  end

  def add_dynamic_convention(name : String, convention) : Nil
    arr = (@dynamic_conventions[name]? || begin
      a = [] of Call_convention
      @dynamic_conventions[name] = a
      a
    end)
    arr << convention
  end

  def dynamic_conventions_for(name : String) : Array(Call_convention) | Nil
    @dynamic_conventions[name] if @dynamic_conventions.has_key?(name)
  end

  def compile_fn_call(ctx : MacroContext, call : String, nodes : Array(Node), ident : Bool = true) : Nil
    args = [] of String
    nodes.each do |child|
      child_ctx = ctx.clone_with(node: child, expression_out: IndentedStringIO.new)
      child_ctx.current_step.not_nil!.process_node(child_ctx)
      expr = child_ctx.expression_out.gets_to_end
      args << expr unless expr.empty?
    end

    ident_value = ""
    if ident
      ident_value = get_new_ident(call)
      ctx.statement_out << "const #{ident_value} = "
    end

    ctx.statement_out << "#{call}"
    ctx.statement_out << args.join(", ")
    ctx.statement_out << ")\n"

    ctx.expression_out << ident_value if ident
  end

  def safely(&block : ->) : Nil
    begin
      yield
    rescue MacroAssertFailed
      # swallow
    end
  end

  property js_output
  property root_node
end

class Literal_macro_provider 
  include Macro_emission_provider
  # TODO - ensure that if we don't include we get rejected at compile
  include Macro_typecheck_provider
  def initialize(@value : String, @t : Type?)
  end
  def emission(ctx : MacroContext) : Nil
    ctx.expression_out << @value
  end
  def typecheck(ctx : MacroContext) : TCResult
    @t
  end
end

class Object
  def is_not_a!(type : T.class) forall T
    if self.is_a?(T)
      raise "bad #{T}"
    else
      self
    end
  end
end

def create_macrocosm : Macrocosm
  has_arguments = ->(ctx : MacroContext) do
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s
    !args.strip.empty?
  end

  macro_providers = {} of String => Macro_provider
  macro_providers["while"]     = While_macro_provider.new
  macro_providers["for"]       = For_macro_provider.new
  macro_providers["int"]       = Number_macro_provider.new(Int32)
  macro_providers["float"]     = Number_macro_provider.new(Float64)
  macro_providers["string"]    = String_macro_provider.new("string")
  macro_providers["regex"]     = String_macro_provider.new("regex")
  macro_providers["if"]        = If_macro_provider.new
  macro_providers["list"]      = List_macro_provider.new
  macro_providers["dict"]      = Dict_macro_provider.new
  macro_providers["local"]     = Local_macro_provider.new
  macro_providers["fn"]        = Fn_macro_provider.new
  macro_providers["bind"]      = Bind_macro_provider.new
  macro_providers["67lang:call"] = Call_macro_provider.new
  macro_providers["exists"]    = Exists_macro_provider.new
  macro_providers["noop"]      = Noop_macro_provider.new
  macro_providers["type"]      = Type_macro_provider.new
  macro_providers["67lang:assume_local_exists"] = Noop_macro_provider.new
  macro_providers["67lang:assume_type_valid"] = Noop_macro_provider.new
  macro_providers["67lang:obtain_param_value"]  = Obtain_param_value_macro_provider.new
  macro_providers["67lang:last_then"]           = Noop_macro_provider.new
  macro_providers["67lang:solution"]            = Solution_macro_provider.new
  macro_providers["must_compile_error"]         = Must_compile_error_macro_provider.new
  macro_providers["then"] = Multi_provider.new([
    {has_arguments, Pipeline_macro_provider.new},
    {nil,           Scope_macro_provider.new},
  ])
  macro_providers["do"] = Multi_provider.new([
    {has_arguments, Pipeline_macro_provider.new},
    {nil,           Scope_macro_provider.new},
  ])
  macro_providers["get"]     = Pipeline_macro_provider.new
  macro_providers["noscope"] = Noscope_macro_provider.new
  macro_providers["return"]  = Return_macro_provider.new
  macro_providers["try"]     = Try_macro_provider.new
  macro_providers["catch"]   = Catch_macro_provider.new
  macro_providers["finally"] = Finally_macro_provider.new
  macro_providers["throw"]   = Throw_macro_provider.new

  COMMENT_MACROS.each { |m| macro_providers[m] = Comment_macro_provider.new }
  SCOPE_MACRO.each   { |m| macro_providers[m] = Scope_macro_provider.new }

  { "true" => {"true",  BOOL},
    "false" => {"false", BOOL},
    "break" => {"break", nil},
    "continue" => {"continue", nil}
  }.each do |k, tup|
    value, tname = tup
    macro_providers[k] = Literal_macro_provider.new(value, tname)
  end

  macro_providers.each do |name, provider|
    default_logger.registry(%(registering macro "#{name}" -> #{provider.class.name}))
  end

  registries = {} of String => MacroRegistry
  create_registry = ->(name : String) {
    r = MacroRegistry.new
    registries[name] = r
    r
  }

  preprocess               = create_registry.call("preprocess")
  typecheck                = create_registry.call("typecheck")
  emission                 = create_registry.call("emission")
  type_registration        = create_registry.call("type_registration")
  type_detail_registration = create_registry.call("type_detail_registration")
  function_registration = create_registry.call("function_registration")
  code_linking_registry    = create_registry.call("code_linking")

  macro_providers.each do |macro_name, provider|
    preprocess.add_fn(provider.responds_to?(:preprocess) ? ->(c : MacroContext){ provider.preprocess(c) } : nil, macro_name)
    typecheck.add_fn(provider.is_a?(Macro_typecheck_provider)  ? ->(c : MacroContext) : TCResult { 
      rv = provider.typecheck(c)
      raise "String... #{rv} is_a? String #{rv.is_a? String}" if rv.is_a?(String)
      rv
    }  : nil, macro_name)
    function_registration.add_fn(provider.responds_to?(:register_functions)  ? ->(c : MacroContext) : TCResult { 
      rv = provider.register_functions(c)
      raise "String... #{rv} is_a? String #{rv.is_a? String}" if rv.is_a?(String)
      rv
    }  : nil, macro_name)
    emission.add_fn(provider.responds_to?(:emission)   ? ->(c : MacroContext){ provider.emission(c) }   : nil, macro_name)
    code_linking_registry.add_fn(provider.responds_to?(:code_linking) ? ->(c : MacroContext){ provider.code_linking(c) } : nil, macro_name)
    type_registration.add_fn(provider.responds_to?(:register_type) ? ->(c : MacroContext){ provider.register_type(c) } : nil, macro_name)
    type_detail_registration.add_fn(provider.responds_to?(:register_type_details) ? ->(c : MacroContext){ provider.register_type_details(c) } : nil, macro_name)
  end

  rv = Macrocosm.new(emission, typecheck, code_linking_registry, preprocess, type_registration, type_detail_registration, function_registration)
  rv.registries.merge!(registries)
  rv
end

TypeMap.def_default_factory_for(Inject_code_start, Callers, Indexers, Params)
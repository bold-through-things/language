# core/macro_registry.cr

require "../utils/strutil"
require "../utils/logger"
require "./node"

alias TCResult = Type | String | Nil | TypeParameter

# forward decls to avoid circular requires
class Macrocosm; end
abstract class MacroProcessingStep
  def process_node(ctx : MacroContext) : Nil
    # concrete steps implement this elsewhere
  end
end

alias OutIO = IndentedStringIO | IO::Memory
alias Macro_ctx_proc = Proc(MacroContext, TCResult) | Proc(MacroContext, Nil)

class MacroContext
  property statement_out : IndentedStringIO
  property expression_out : OutIO
  property node : Node
  property compiler : Macrocosm
  property current_step : MacroProcessingStep?

  def initialize(
    @statement_out : OutIO,
    @expression_out : OutIO,
    @node : Node,
    @compiler : Macrocosm,
    @current_step : MacroProcessingStep? = nil
  )
  end

  def clone_with(
    statement_out : OutIO? = nil,
    expression_out : OutIO? = nil,
    node : Node? = nil,
    compiler : Macrocosm? = nil,
    current_step : MacroProcessingStep? = @current_step
  ) : MacroContext
    st  = statement_out  || @statement_out
    ex  = expression_out || @expression_out
    nd  = node           || @node
    cmp = compiler       || @compiler
    MacroContext.new(st, ex, nd, cmp, current_step)
  end

  def sub_compile_expression(node : Node) : MacroContext
    child_ctx = clone_with(
      node: node,
      expression_out: IndentedStringIO.new
    )
    @current_step.try &.process_node(child_ctx)
    child_ctx
  end
end

# --- Provider interfaces (protocols) ---

module Macro_preprocess_provider
  abstract def preprocess(ctx : MacroContext) : Nil
end

module Macro_type_registration_provider
  # return value is whatever your type system uses (e.g., Type or String "*")
  abstract def register_type(ctx : MacroContext)
end


module Macro_type_details_provider
  # return value is whatever your type system uses (e.g., Type or String "*")
  abstract def register_type_details(ctx : MacroContext)
end

module Macro_typecheck_provider
  # return value is whatever your type system uses (e.g., Type or String "*")
  abstract def typecheck(ctx : MacroContext)
end

module Macro_emission_provider
  abstract def emission(ctx : MacroContext) : Nil
end

module Macro_code_linking_provider
  abstract def code_linking(ctx : MacroContext) : Nil
end

alias Macro_provider = Macro_preprocess_provider | Macro_code_linking_provider | Macro_typecheck_provider  | Macro_emission_provider | Macro_type_registration_provider | Macro_type_details_provider

class MacroRegistry
  def initialize
    @registry = {} of String => Macro_ctx_proc
  end

  def add_fn(m : Macro_ctx_proc | Nil, *names : String) : Nil
    return if m.nil?
    names.each { |name| @registry[name] = m.not_nil! }
  end

  def get(name : String) : Macro_ctx_proc
    if proc = @registry[name]?
      proc
    else
      default_logger.macro(%(ERROR: unknown macro "#{name}"))
      raise ArgumentError.new("Unknown macro: #{name}")
    end
  end

  def all : Hash(String, Macro_ctx_proc)
    @registry.dup
  end
end

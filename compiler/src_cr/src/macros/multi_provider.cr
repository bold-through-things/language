# macros/multi_provider.cr
require "../core/macro_registry"
require "../core/node"
require "../compiler_types/proper_types"

class Multi_provider
  include Macro_preprocess_provider
  include Macro_typecheck_provider
  include Macro_emission_provider
  # include Macro_code_linking_provider

  alias Matcher = Proc(MacroContext, Bool)?

  struct Entry
    getter matcher : Matcher
    getter preprocess : (Proc(MacroContext, Nil))?
    getter typecheck : (Proc(MacroContext, TCResult))?
    getter emission : (Proc(MacroContext, Nil))?
    getter code_linking : (Proc(MacroContext, Nil))?
    getter register_type : (Proc(MacroContext, Nil))?
    getter register_type_details : (Proc(MacroContext, Nil))?

    def initialize(@matcher, @preprocess, @typecheck, @emission, @code_linking, @register_type, @register_type_details)
    end
  end

  @entries : Array(Entry)

  def initialize(matchers : Array(Tuple(Matcher, _)))
    @entries = [] of Entry
    matchers.each do |matcher, provider|
      preprocess = provider.responds_to?(:preprocess) ? ->(c : MacroContext){ provider.preprocess(c) } : nil
      typecheck  = provider.responds_to?(:typecheck)  ? ->(c : MacroContext) : TCResult { provider.typecheck(c) }  : nil
      emission   = provider.responds_to?(:emission)   ? ->(c : MacroContext){ provider.emission(c) }   : nil
      code_link  = provider.responds_to?(:code_linking) ? ->(c : MacroContext){ provider.code_linking(c) } : nil
      reg_type   = provider.responds_to?(:register_type) ? ->(c : MacroContext){ provider.register_type(c) } : nil
      reg_type_d = provider.responds_to?(:register_type_details) ? ->(c : MacroContext){ provider.register_type_details(c) } : nil
      @entries << Entry.new(matcher, preprocess, typecheck, emission, code_link, reg_type, reg_type_d)
    end
  end

  def preprocess(ctx : MacroContext) : Nil
    dispatch_void(ctx) { |e| e.preprocess }
  end

  def emission(ctx : MacroContext) : Nil
    dispatch_void(ctx) { |e| e.emission }
  end

  # def code_linking(ctx : MacroContext) : Nil
  #   dispatch_void(ctx) { |e| e.code_linking }
  # end

  def register_type(ctx : MacroContext) : Nil
    dispatch_void(ctx) { |e| e.register_type }
  end

  def register_type_details(ctx : MacroContext) : Nil
    dispatch_void(ctx) { |e| e.register_type_details }
  end

  def typecheck(ctx : MacroContext)
    @entries.each do |e|
      if (m = e.matcher).nil? || m.not_nil!.call(ctx)
        if proc = e.typecheck
          return proc.call(ctx)
        else
          last = nil
          ctx.node.children.each do |ch|
            last = ctx.current_step.not_nil!.process_node(ctx.clone_with(node: ch))
          end
          return last
        end
      end
    end
    raise "No matching provider found"
  end

  private def dispatch_void(ctx : MacroContext)
    @entries.each do |e|
      if (m = e.matcher).nil? || m.not_nil!.call(ctx)
        if proc = yield(e)
          return proc.call(ctx)
        else
          last = nil
          ctx.node.children.each do |ch|
            last = ctx.current_step.not_nil!.process_node(ctx.clone_with(node: ch))
          end
          return last
        end
      end
    end
    raise "no matching provider found"
  end
end

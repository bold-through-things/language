# macros/noscope_macro.cr

require "../core/macro_registry"
require "../utils/strutil"

class Noscope_macro_provider
  include Macro_emission_provider

  # emit children directly, without adding any scope wrappers
  def emission(ctx : MacroContext) : Nil
    ctx.node.children.each do |child|
      obuf = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: child, expression_out: obuf)
      ctx.current_step.try &.process_node(child_ctx)
    end
  end

  # DEFINITELY NOT! if you do this it will prevent children from being inspected. trouble!
  def not_typecheck(ctx : MacroContext) : Nil
    # left intentionally as a no-op stub
    nil
  end
end

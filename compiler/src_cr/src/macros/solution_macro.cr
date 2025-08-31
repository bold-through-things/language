# macros/solution_macro.cr
require "../core/macro_registry"

class Solution_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    ctx.node.children.each do |child|
      ctx.current_step.not_nil!.process_node(ctx.clone_with(node: child))
    end
  end
end

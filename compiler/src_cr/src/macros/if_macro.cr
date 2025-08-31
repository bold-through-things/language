# macros/if_macro.cr

require "../core/macro_registry"
require "../utils/strutil"
require "../pipeline/steps/utils"

class If_macro_provider
  include Macro_emission_provider
  def emission(ctx : MacroContext) : Nil
    args = [] of String

    if ctx.node.children.size > 0
      ctx.node.children.each do |child|
        # TODO: ugly; should use a proper AST check for a following `then`
        next if child.content.starts_with?("then")

        buf = IndentedStringIO.new
        child_ctx = ctx.clone_with(node: child, expression_out: buf)
        ctx.current_step.try &.process_node(child_ctx)
        args << buf.gets_to_end
      end
    end

    cond = args.empty? ? "" : args.last
    ctx.statement_out.write "if (#{cond})"
  end
end

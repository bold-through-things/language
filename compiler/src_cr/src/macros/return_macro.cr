# macros/return_macro.cr
require "../core/macro_registry"
require "../utils/strutil"

class Return_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    if ctx.node.children.empty?
      ctx.statement_out.write("return;")
      return
    end

    if ctx.node.children.size == 1
      expr_out = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: ctx.node.children.first, expression_out: expr_out)
      ctx.current_step.not_nil!.process_node(child_ctx)
      ctx.statement_out.write("return #{expr_out.gets_to_end};")
      return
    end

    ctx.compiler.assert_(false, ctx.node, "return must have 0 or 1 arguments")
  end
end

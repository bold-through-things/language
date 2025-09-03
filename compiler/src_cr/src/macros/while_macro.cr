# macros/while_macro.cr

require "../core/macro_registry"
require "../utils/strutil"
require "../pipeline/steps/utils"

class While_macro_provider
  include Macro_emission_provider
  def emission(ctx : MacroContext) : Nil
    so = ctx.statement_out.as(IndentedStringIO)  # hard cast; crash if not IndentedStringIO

    so.write("while(true) {\n")
    so.with_indent do
      ctx.compiler.assert_(ctx.node.children.size == 2, ctx.node, "must have two children, got #{ctx.node.children.map {|ch| ch.content}}")

      # condition
      cond_node = ctx.node.children[0]
      obuf = IndentedStringIO.new
      inner_ctx = ctx.clone_with(node: cond_node, expression_out: obuf)
      ctx.current_step.not_nil!.process_node(inner_ctx)

      so.write("if (!#{obuf.gets_to_end}) ")
      so.write("{ break; }\n")

      # body: seek `do`
      body_node = seek_child_macro(ctx.node, "do")
      ctx.compiler.assert_(!body_node.nil?, ctx.node, "must have a `do` block")
      body_ctx = ctx.clone_with(node: body_node.not_nil!)
      ctx.current_step.not_nil!.process_node(body_ctx)
    end
    so.write("}")
  end
end

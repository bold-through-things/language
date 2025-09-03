# macros/error_macros.cr
require "../core/macro_registry"
require "../utils/strutil"

class Must_compile_error_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider

  def emission(ctx : MacroContext) : Nil
    dummy_stmt = IndentedStringIO.new
    dummy_expr = IndentedStringIO.new
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child, statement_out: dummy_stmt, expression_out: dummy_expr)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  def typecheck(ctx : MacroContext) : TCResult
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
    nil
  end
end

# macros/scope_macro.cr
require "../core/macro_registry"
require "../core/node"
require "../utils/common_utils"
require "../utils/strutil"

SCOPE_MACRO = ["else", "67lang:file"] of String

class Scope_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider

  def emission(ctx : MacroContext) : Nil
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    if macro_name == "else"
      ctx.statement_out << "#{macro_name} "
    end

    ctx.statement_out << "{\n"
    ctx.statement_out.with_indent do
      ctx.statement_out << "const parent_scope = scope\n"
      ctx.statement_out << "{\n"
      ctx.statement_out.with_indent do
        ctx.statement_out << "const scope = _67lang.scope(parent_scope)\n"

        if inject = ctx.compiler.maybe_metadata(ctx.node, Inject_code_start)
          inject.code.each { |line| ctx.statement_out << line }
        end

        ctx.node.children.each do |child|
          child_ctx = ctx.clone_with(node: child)
          ctx.current_step.not_nil!.process_node(child_ctx)
          ctx.statement_out << "\n"
        end
      end
      ctx.statement_out << "}\n"
    end
    ctx.statement_out << "} "
  end

  def typecheck(ctx : MacroContext) : TCResult
    process_children_with_context(ctx, ctx.current_step.not_nil!)
    nil
  end
end

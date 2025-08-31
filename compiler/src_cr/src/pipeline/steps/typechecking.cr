# pipeline/steps/type_checking.cr

# Handles type checking.
class TypeCheckingStep < MacroProcessingStep
  def initialize(@macros : MacroRegistry)
    # super()
  end

  # Returns whatever the macro's typecheck step returns (TCResult),
  # or nil if there is no type info for this node.
  def process_node(ctx : MacroContext) : TCResult
    # TODO: investigate why here omitting the `to_s` is not an error (does fail at runtime!)
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all_macros = @macros.all

    # Build a readable description (with a short content preview)
    content = ctx.node.content
    preview =
      if content.size > 50
        content[0, 50] + "..."
      else
        content
      end
    node_desc = "node #{macro_name}: #{preview}"

    default_logger.indent("typecheck", node_desc) do
      if fn = all_macros[macro_name]?
        result = nil.as(TCResult)
        ctx.compiler.safely do
          result = fn.call(ctx)
        end
        return result
      else
        # No specific typechecker: walk children and return the last child's result.
        last = nil.as(TCResult)
        ctx.node.children.each do |child|
          child_ctx = ctx.clone_with(node: child)
          last = process_node(child_ctx)
        end
        return last
      end
    end
  end
end

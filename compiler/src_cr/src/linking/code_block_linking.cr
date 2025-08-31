# pipeline/steps/code_block_linking.cr

# Associates trailing code blocks (like `do`) with their headers (`while`, `for`, `fn`)
class CodeBlockAssociator
  def process_code_blocks(node : Node, compiler : Macrocosm) : Nil
    headers = {"while" => "do", "for" => "do", "fn" => "do"} of String => String

    default_logger.codegen("checking node '#{node.content}' for code block associations")

    children = node.children
    i = 0
    while i < children.size
      current    = children[i]
      next_child = i + 1 < children.size ? children[i + 1] : nil

      if current && next_child
        current_macro = compiler.get_metadata(current, Macro).to_s
        if expected_next = headers[current_macro]?
          next_macro = compiler.get_metadata(next_child, Macro).to_s
          default_logger.codegen("found '#{current_macro}' expecting '#{expected_next}', got '#{next_macro}'")

          if next_macro == expected_next
            default_logger.codegen("linking '#{next_macro}' to '#{current_macro}'")
            # detach next_child from parent and reparent under current
            node.replace_child(next_child, [] of Node)
            current.append_child(next_child)

            # children array changed; refresh and continue
            children = node.children
            i += 1
            next
          else
            case expected_next
            when "do"
              compiler.assert_(false, current, "expected 'do' after '#{current_macro}' but found '#{next_macro}'", ErrorType::EXPECTED_DO_AFTER)
            when "then"
              compiler.assert_(false, current, "expected 'then' after '#{current_macro}' but found '#{next_macro}'", ErrorType::EXPECTED_THEN_AFTER)
            else
              compiler.assert_(false, current, "expected '#{expected_next}' after '#{current_macro}' but found '#{next_macro}'", ErrorType::MISSING_BLOCK)
            end
          end
        end
      end

      i += 1
    end
  end
end

# Step that links code blocks to their headers; skips macros handled in the shared registry (e.g. comments)
class CodeBlockLinkingStep < MacroProcessingStep
  def initialize(@macros : MacroRegistry)
    # super()
    @associator = CodeBlockAssociator.new
  end

  def process_node(ctx : MacroContext) : Nil
    default_logger.codegen("processing code block linking for: #{ctx.node.content}")

    # If this node's macro is handled by the registry (e.g., comment), delegate and stop.
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    if fn = @macros.all[macro_name]?
      fn.call(ctx)
      return
    end

    # First, process children
    default_logger.indent("codegen", "processing children of #{ctx.node.content}") do
      ctx.node.children.each_with_index do |child, i|
        default_logger.indent("codegen", "child #{i}: #{child.content}") do
          ctx.compiler.safely do
            child_ctx = ctx.clone_with(node: child)
            process_node(child_ctx)
          end
        end
      end
    end

    # Then, link code blocks for the current node
    default_logger.indent("codegen", "linking code blocks for #{ctx.node.content}") do
      ctx.compiler.safely do
        @associator.process_code_blocks(ctx.node, ctx.compiler)
      end
    end
  end
end

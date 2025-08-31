# pipeline/steps/preprocessing.cr

# Handles preprocessing like access macro unrolling
class PreprocessingStep < MacroProcessingStep
  def initialize(@macros : MacroRegistry)
    # super()
  end

  def process_node(ctx : MacroContext) : Nil
    default_logger.macro("preprocessing node: #{ctx.node.content}")

    # Validate indentation: ensure content doesn't start with whitespace
    if !ctx.node.content.empty? && ctx.node.content[0].whitespace?
      ctx.compiler.compile_error(
        ctx.node,
        "this language only accepts tabs for indentation, not spaces! spaces are like, totally uncool. use tabs instead, they're way more precise and semantic.",
        ErrorType::INVALID_INDENTATION
      )
      # don't early-return; continue pipeline
    end

    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all_preprocessors = @macros.all

    default_logger.macro("  -> Current node macro: #{macro_name}")
    default_logger.macro("  -> Available preprocessors: [#{all_preprocessors.keys.join(", ")}]")

    if fn = all_preprocessors[macro_name]?
      default_logger.macro("applying preprocessor for macro: #{macro_name}")
      ctx.compiler.safely { fn.call(ctx) }
    else
      default_logger.macro("no preprocessor for macro: #{macro_name}")
      default_logger.indent("macro", "preprocessing children of #{ctx.node.content}") do
        ctx.node.children.each_with_index do |child, i|
          default_logger.indent("macro", "child #{i}: #{child.content}") do
            ctx.compiler.safely do
              child_ctx = ctx.clone_with(node: child)
              process_node(child_ctx)
            end
          end
        end
      end
    end
  end
end

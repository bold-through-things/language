# pipeline/steps/javascript_emission.cr

require "../js_conversion"

# Handles JavaScript code emission.
class JavaScriptEmissionStep < MacroProcessingStep
  def initialize(@macros : MacroRegistry)
    # do NOT call super!
  end

  def process_node(ctx : MacroContext) : Nil
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all = @macros.all

    default_logger.codegen("emitting JavaScript for macro: #{macro_name}")

    # Special wrapper for the synthetic root: 67lang:solution
    if ctx.node.content == "67lang:solution"
      default_logger.codegen("wrapping solution in JavaScript runtime setup")

      obuf = IndentedStringIO.new
      obuf << JS_LIB << NEWLINE << NEWLINE

      # Async IIFE so top-level awaits work in browsers.
      default_logger.codegen("adding async wrapper for browser compatibility")
      obuf << "void (async () => {" << NEWLINE
      obuf.with_indent do
        obuf << "'use strict';" << NEWLINE
        obuf << "const scope = globalThis;" << NEWLINE

        inner = ctx.clone_with(statement_out: obuf, expression_out: obuf)

        if fn = all[macro_name]?
          ctx.compiler.safely { fn.call(inner) }
        else
          # Fallback: walk children if there's no explicit macro for solution
          ctx.node.children.each do |child|
            child_ctx = inner.clone_with(node: child)
            process_node(child_ctx)
          end
        end
      end

      obuf << NEWLINE << "})();"
      ctx.compiler.js_output = obuf.gets_to_end
      default_logger.codegen("JavaScript output generated: #{obuf.gets_to_end.size} characters")
      return
    end

    # Normal emission path
    if fn = all[macro_name]?
      default_logger.codegen("applying JavaScript emission macro: #{macro_name}")
      ctx.compiler.safely { fn.call(ctx) }
    else
      default_logger.codegen("ERROR: unknown macro #{macro_name}")
      # If we already have compile errors, don't cascade—just stop here.
      unless ctx.compiler.compile_errors.empty?
        default_logger.codegen("skipping malformed node due to existing compile errors")
        return
      end
      ctx.compiler.compile_error(
        ctx.node,
        "unknown macro '#{macro_name}' - is this supposed to exist? did you maybe typo something?",
        ErrorType::INVALID_MACRO
      )
    end
  end
end

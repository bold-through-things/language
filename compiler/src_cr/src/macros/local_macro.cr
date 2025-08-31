# macros/local_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../utils/logger"
require "../utils/error_types"
require "../utils/strutil"
require "../utils/common_utils"
require "../compiler_types/proper_types"
require "../pipeline/js_conversion"
require "../core/exceptions"

class Local_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider
  include Macro_preprocess_provider

  def preprocess(ctx : MacroContext) : Nil
    default_logger.indent("macro", "preprocessing children of #{ctx.node.content}") do
      ctx.node.children.each_with_index do |child, i|
        default_logger.indent("macro", "child #{i}: #{child.content}") do
          ctx.compiler.safely do
            child_ctx = ctx.clone_with(node: child)
            ctx.current_step.not_nil!.process_node(child_ctx)
          end
        end
      end
    end

    desired_name = get_single_arg(ctx)
    actual_name  = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, SaneIdentifier.new(actual_name))
  end

  def emission(ctx : MacroContext) : Nil
    desired_name = get_single_arg(ctx)
    name = (ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || desired_name).to_s

    args = ctx.node.children.empty? ? [] of String : collect_child_expressions(ctx)

    ctx.statement_out << ("let #{name}")
    ctx.statement_out << (" = #{args.last}") unless args.empty?
    ctx.statement_out << (NEWLINE)
    ctx.expression_out << (name)
  end

  def typecheck(ctx : MacroContext)
    graceful_typecheck do
      demanded_type = nil
      received_type = nil

      step = ctx.current_step.not_nil!
      ctx.node.children.each do |child|
        child_res = step.process_node(ctx.clone_with(node: child))

        case child_res
        when TypeParameter
          demanded_type = child_res.type_expr
        when Type
          received_type = child_res
        else
          unless child_res.nil?
            default_logger.typecheck("Warning: got legacy string type #{child_res}")
            received_type = child_res # may be "*", String, etc.
          end
        end
      end

      if received_type.nil?
        ctx.compiler.assert_(false, ctx.node, "field demands #{demanded_type || "a value"} but is given None", ErrorType::MISSING_TYPE)
      end

      demanded_type ||= received_type

      default_logger.typecheck("#{ctx.node.content} demanded #{demanded_type} and was given #{received_type}")

      ctx.compiler.set_metadata(ctx.node, FieldDemandType, FieldDemandType.new(demanded_type))

      if received_type.is_a?(Type) && demanded_type.is_a?(Type)
        unless received_type.is_assignable_to(demanded_type)
          ctx.compiler.assert_(false, ctx.node, "field demands #{demanded_type} but is given #{received_type}", ErrorType::FIELD_TYPE_MISMATCH)
        end
      else
        r = received_type.to_s
        d = demanded_type.to_s
        if r != d && r != "*"
          ctx.compiler.assert_(false, ctx.node, "field demands #{demanded_type} but is given #{received_type}", ErrorType::FIELD_TYPE_MISMATCH)
        end
      end

      demanded_type
    end
  end
end

# utils/common_utils.cr
# common utility functions to reduce code duplication across the compiler.

require "./strutil"
require "../core/macro_registry"
require "../core/node"
require "./logger"

# collect expressions from all child nodes by processing them.
def collect_child_expressions(ctx : MacroContext) : Array(String)
  expressions = [] of String?

  default_logger.debug("collecting expressions from #{ctx.node.children.size} children")

  ctx.node.children.each_with_index do |child, i|
    default_logger.indent("debug", "processing child #{i}: #{child.content}") do
      expression_out = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: child, expression_out: expression_out)
      ctx.current_step.not_nil!.process_node(child_ctx)
      expr_value = expression_out.gets_to_end
      expressions << (expr_value.empty? ? nil : expr_value)
      default_logger.debug(%(child #{i} produced: '#{expr_value}'))
    end
  end

  result = expressions.compact
  default_logger.debug("filtered #{expressions.size} -> #{result.size} non-empty expressions")
  result
end

# collect type information from all child nodes during type checking.
def collect_child_types(ctx : MacroContext) : Array(String)
  types = [] of String
  default_logger.typecheck("collecting types from #{ctx.node.content}")

  ctx.node.children.each_with_index do |child, i|
    default_logger.indent("typecheck", "type checking child #{i}: #{child.content}") do
      child_ctx = ctx.clone_with(node: child)
      child_type = ctx.current_step.not_nil!.process_node(child_ctx)
      if child_type
        types << child_type.to_s
        default_logger.typecheck(%(child #{i} has type: '#{child_type}'))
      else
        default_logger.typecheck("child #{i} has type: <nil>")
      end
    end
  end

  default_logger.typecheck("filtered #{types.size} non-empty types")
  types
end

# process all children with the given step processor.
def process_children_with_context(ctx : MacroContext, step_processor) : Nil
  default_logger.debug("processing children of #{ctx.node.content} with #{step_processor.class.name}")
  ctx.node.children.each_with_index do |child, i|
    default_logger.indent("debug", "processing child #{i}: #{child.content}") do
      ctx.compiler.safely do
        child_ctx = ctx.clone_with(node: child)
        step_processor.process_node(child_ctx)
      end
    end
  end
end

# get the arguments string from a node's metadata.
def get_args_string(ctx : MacroContext) : String
  args = ctx.compiler.get_metadata(ctx.node, Args).to_s
  default_logger.debug(%(extracted args: '#{args}'))
  args
end

# get a single argument from a node, asserting there's exactly one.
def get_single_arg(ctx : MacroContext, error_msg : String = "must have a single argument") : String
  args = get_args_string(ctx)
  first, extra = cut(args, " ")
  ctx.compiler.assert_(extra == "", ctx.node, error_msg)
  default_logger.debug(%(validated single arg: '#{first}'))
  first
end

# get exactly two arguments from a node.
def get_two_args(ctx : MacroContext, error_msg : String = "must have exactly two arguments") : Tuple(String, String)
  args = get_args_string(ctx)
  parts = args.split(" ")
  ctx.compiler.assert_(parts.size == 2, ctx.node, error_msg)
  default_logger.debug(%(validated two args: '#{parts[0]}', '#{parts[1]}' ))
  {parts[0], parts[1]}
end

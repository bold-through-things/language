# macros/then_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"
require "../utils/common_utils"
require "../pipeline/steps/utils"
require "../pipeline/local_lookup"

# --- Command primitives -------------------------------------------------------

abstract class ThenCommand
  abstract def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
end

class DoCommand < ThenCommand
  def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
    return pos if pos >= tokens.size
    method_name = tokens[pos]
    result.operation_command = "do"
    result.operation_args << method_name
    pos + 1
  end
end

class ChainCommand < ThenCommand
  def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
    result.operation_command = "chain"
    result.operation_args.concat tokens[pos, tokens.size - pos]
    tokens.size
  end
end

class AsCommand < ThenCommand
  def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
    return pos if pos >= tokens.size
    result.bind_name = tokens[pos]
    pos + 1
  end
end

class IntoCommand < ThenCommand
  def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
    return pos if pos >= tokens.size
    result.assign_name = tokens[pos]
    pos + 1
  end
end

class SourceCommand < ThenCommand
  def execute(tokens : Array(String), pos : Int32, result : ParsedThen) : Int32
    return pos if pos >= tokens.size
    result.source_variable = tokens[pos]
    pos + 1
  end
end

# Parsed result carrier
class ParsedThen
  property bind_name : String?
  property assign_name : String?
  property operation_command : String?
  property operation_args : Array(String)
  property source_variable : String?

  def initialize
    @bind_name = nil
    @assign_name = nil
    @operation_command = nil
    @operation_args = [] of String
    @source_variable = nil
  end
end

# Registry (aliases: get/set => do; the/from/in => source)
THEN_COMMANDS = {
  "do"    => DoCommand.new,
  "get"   => DoCommand.new,
  "set"   => DoCommand.new,
  "chain" => ChainCommand.new,
  "as"    => AsCommand.new,
  "into"  => IntoCommand.new,
  "the"   => SourceCommand.new,
  "from"  => SourceCommand.new,
  "in"    => SourceCommand.new,
} of String => ThenCommand

# --- Parser -------------------------------------------------------------------

class ThenCommandParser
  def initialize(args : String)
    @tokens = args.split
  end

  def parse : ParsedThen?
    res = ParsedThen.new
    pos = 0
    while pos < @tokens.size
      tok = @tokens[pos]
      cmd = THEN_COMMANDS[tok]?
      return nil unless cmd
      pos = cmd.execute(@tokens, pos + 1, res)
    end
    res
  end
end

# --- Construction helpers -----------------------------------------------------

private def create_operation_call_node(ctx : MacroContext, op_cmd : String, op_args : Array(String), children : Array(Node), source_value_name : String?) : Node?
  p0 = Position.new(0, 0)

  case op_cmd
  when "do"
    return nil if op_args.size != 1 && (ctx.compiler.assert_(false, ctx.node, "do requires exactly one method name"); true)
    op_children = [] of Node
    if source_value_name
      op_children << ctx.compiler.make_node("67lang:call #{source_value_name}", ctx.node.pos || p0, [] of Node)
    end
    op_children.concat(children)
    return ctx.compiler.make_node("67lang:call #{op_args[0]}", ctx.node.pos || p0, op_children)

  when "chain"
    if op_args.empty?
      ctx.compiler.assert_(false, ctx.node, "chain requires at least one step")
      return nil
    end
    unless source_value_name
      ctx.compiler.assert_(false, ctx.node, "chain requires a source value")
      return nil
    end
    current = ctx.compiler.make_node("67lang:call #{source_value_name}", ctx.node.pos || p0, [] of Node)
    op_args.each_with_index do |step, i|
      step_children = [current] of Node
      step_children.concat(children) if i == op_args.size - 1
      current = ctx.compiler.make_node("67lang:call #{step}", ctx.node.pos || p0, step_children)
    end
    return current
  else
    ctx.compiler.assert_(false, ctx.node, "unknown operation command: #{op_cmd}")
    return nil
  end
end

# --- Provider -----------------------------------------------------------------

class Pipeline_macro_provider
  include Macro_preprocess_provider

  def preprocess(ctx : MacroContext) : Nil
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s
    content = ctx.node.content

    is_continuation = content.starts_with?("then")
    parse_content = is_continuation ? args : content

    parent = ctx.node.parent
    ctx.compiler.assert_(!parent.nil?, ctx.node, "pipeline node must have a parent")
    return if parent.nil?

    parser = ThenCommandParser.new(parse_content)
    parsed = parser.parse
    if parsed.nil?
      ctx.compiler.assert_(false, ctx.node, "pipeline requires a valid command")
      return
    end

    if parsed.operation_command.nil?
      ctx.compiler.assert_(false, ctx.node, "pipeline requires an operation (do, get, set, or chain)")
      return
    end

    source_value_name = nil.as(String?)
    if is_continuation
      up = Upwalker.new(LastThenSearchStrategy.new)
      last_then = up.find(ctx)
      if last_then.nil?
        ctx.compiler.assert_(false, ctx.node, "then used but no previous expression to pipe from")
        return
      end
      source_value_name = get_single_arg(ctx.clone_with(node: last_then.not_nil!.node))
    else
      source_value_name = parsed.source_variable
    end

    call_node = create_operation_call_node(ctx, parsed.operation_command.not_nil!, parsed.operation_args, ctx.node.children, source_value_name)
    return if call_node.nil?

    p0 = Position.new(0, 0)

    new_node =
      if name = parsed.assign_name
        # into <name> : setter call
        ctx.compiler.make_node("67lang:call #{name}", ctx.node.pos || p0, [call_node])
      elsif name = parsed.bind_name
        # as <name> : local with last_then marker
        ctx.compiler.make_node("local #{name}", ctx.node.pos || p0, [
          ctx.compiler.make_node("67lang:last_then", ctx.node.pos || p0, [] of Node),
          call_node,
        ])
      else
        # anonymous : generated name with last_then marker
        result_name = ctx.compiler.get_new_ident("pipeline_result")
        ctx.compiler.make_node("local #{result_name}", ctx.node.pos || p0, [
          ctx.compiler.make_node("67lang:last_then", ctx.node.pos || p0, [] of Node),
          call_node,
        ])
      end

    parent.not_nil!.replace_child(ctx.node, [new_node])

    # Continue preprocessing on the new node within the same step
    ctx.current_step.not_nil!.process_node(ctx.clone_with(node: new_node))
  end
end

# Backcompat name
Then_macro_provider = Pipeline_macro_provider

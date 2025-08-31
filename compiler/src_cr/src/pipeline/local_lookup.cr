# pipeline/local_lookup.cr
# Upwalking utilities for scope resolution.

require "../core/macro_registry"
require "../core/node"
require "../utils/common_utils"
require "../utils/logger"
require "../utils/strutil"
require "../pipeline/steps/utils"
require "../compiler_types/proper_types"

# Result of finding a definition via upwalking
class UpwalkerResult
  getter node : Node
  getter type_value : (Type | String)

  def initialize(@node : Node, @type_value : (Type | String))
  end
end

# Strategy interface
abstract class SearchStrategy
  abstract def try_match(ctx : MacroContext) : UpwalkerResult?
  abstract def search_in_noscope(ctx : MacroContext) : UpwalkerResult?
end

# Search strategy for finding locals by name
class LocalNameSearchStrategy < SearchStrategy
  def initialize(@name : String)
  end

  def try_match(ctx : MacroContext) : UpwalkerResult?
    # match `local` or `67lang:assume_local_exists`
    mname = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    desired_local_name = case mname
    when "local", "67lang:assume_local_exists"
      get_single_arg(ctx)
    else
      return nil
    end

    sane_local_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier).to_s
    if @name == desired_local_name || (sane_local_name && @name == sane_local_name)
      default_logger.typecheck("LocalNameSearchStrategy: found #{@name} at #{ctx.node.content}")
      # try metadata first
      begin
        demanded = ctx.compiler.get_metadata(ctx.node, FieldDemandType)
        default_logger.typecheck("LocalNameSearchStrategy: found type #{demanded} in metadata")
        return UpwalkerResult.new(ctx.node, demanded.tc.as(Type | String))
      rescue ex
        default_logger.typecheck("LocalNameSearchStrategy: no type in metadata (#{ex})")
      end

      # fallback to explicit `type` child
      if type_node = seek_child_macro(ctx.node, "type")
        _, demanded = cut(type_node.content, " ")
        return UpwalkerResult.new(ctx.node, demanded)
      end

      return UpwalkerResult.new(ctx.node, "*")
    end

    nil
  end

  def search_in_noscope(ctx : MacroContext) : UpwalkerResult?
    ctx.node.children.each do |child|
      res = try_match(ctx.clone_with(node: child))
      return res if res
    end
    nil
  end
end

# Search strategy for finding locals with 67lang:last_then marker
class LastThenSearchStrategy < SearchStrategy
  def try_match(ctx : MacroContext) : UpwalkerResult?
    begin
      mname = ctx.compiler.get_metadata(ctx.node, Macro).to_s
      if mname == "local"
        if ctx.node.children.size > 0 && ctx.node.children[0].content == "67lang:last_then"
          return UpwalkerResult.new(ctx.node, "*")
        end
      end
    rescue
      # ignore missing metadata
    end
    nil
  end

  def search_in_noscope(ctx : MacroContext) : UpwalkerResult?
    ctx.node.children.each do |child|
      res = try_match(ctx.clone_with(node: child))
      return res if res
    end
    nil
  end
end

# Generic upwalker for scope resolution with pluggable strategies
class Upwalker
  def initialize(@strategy : SearchStrategy)
  end

  def find(ctx : MacroContext) : UpwalkerResult?
    current = ctx.node
    compiler = ctx.compiler

    while current
      current_ctx = ctx.clone_with(node: current)

      # check preceding siblings
      if parent = current.parent
        siblings = parent.children
        current_index = nil.as(Int32?)
        siblings.each_with_index do |s, i|
          if s.same?(current)
            current_index = i
            break
          end
        end

        if idx = current_index
          (idx - 1).downto(0) do |i|
            sibling = siblings[i]
            sib_ctx = current_ctx.clone_with(node: sibling)

            if res = @strategy.try_match(sib_ctx)
              return res
            end

            begin
              mname = compiler.get_metadata(sibling, Macro).to_s
              if mname == "noscope"
                if res = @strategy.search_in_noscope(sib_ctx)
                  return res
                end
              end
            rescue
              # no metadata; skip
            end
          end
        end
      end

      # move up
      current = current.parent
    end

    nil
  end
end

# Backward-compat helpers
def walk_upwards_for_local_definition(ctx : MacroContext, name : String) : UpwalkerResult?
  Upwalker.new(LocalNameSearchStrategy.new(name)).find(ctx)
end

alias LocalMatchResult = UpwalkerResult

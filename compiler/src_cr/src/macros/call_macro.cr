# macros/call_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../core/exceptions"
require "../utils/strutil"
require "../utils/common_utils"
require "../utils/logger"
require "../utils/error_types"
require "../pipeline/steps/utils"
require "../pipeline/builtin_calls"
require "../pipeline/local_lookup"
require "../compiler_types/proper_types"
require "../compiler_types/type_hierarchy" # provides: type_hierarchy, union_types
require "../pipeline/call_resolver"  # NEW

# -------------------------------------------------------------------
# Type hierarchy adapter (handles Type | String with unions support)
# -------------------------------------------------------------------
class TypeHierarchyChecker
  def initialize(@hierarchy : Hash((Type), Array(Type)),
                 @unions : Hash(String, Array(String)))
  end

  def is_subtype(child : (Type | String), parent : (Type | String)) : Bool
    # Proper types
    if child.is_a?(Type) && parent.is_a?(Type)
      return child.is_assignable_to(parent)
    end

    # Normalize to strings for legacy checks
    c = child.to_s
    p = parent.to_s

    return true if c == p

    # union: parent is a union name, any member matches
    if (members = @unions[p]?)
      return members.any? { |m| is_subtype(c, m) }
    end

    # Navigate upwards through parents
    parents = @hierarchy[c]?
    return false unless parents
    parents.any? { |pp| is_subtype(pp, p) }
  end
end

TYPE_CHECKER = TypeHierarchyChecker.new(TYPE_HIERARCHY, UNION_TYPES)


# -------------------------------------------------------------------
# Call provider
# -------------------------------------------------------------------
class Call_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider
  include CallResolver   # NEW

  # typecheck stays the same except for calling the shared resolver
  def typecheck(ctx : MacroContext) : TCResult
    graceful_typecheck do
      args = [] of (Type | Nil)
      step = ctx.current_step
      raise "missing step" unless step
      ctx.node.children.each do |ch|
        tc = step.process_node(ctx.clone_with(node: ch))
        if tc.is_a? TypeParameter
          ctx.compiler.assert_(false, ch, "nonsense type parameter", ErrorType::ARGUMENT_TYPE_MISMATCH)
        else
          args << tc
        end
      end
      args = args.compact

      # use shared resolver
      fn = ctx.compiler.get_metadata(ctx.node, Args).to_s.split(" ")[0]
      conv = resolve_convention(ctx, fn, args)
      ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention.new(convention: conv))

      # ... the rest exactly as before ...
      if conv.responds_to?(:demands)
        demands = conv.demands.as(Array(Type) | Nil)
        if demands
          ok, subs = unify_types(args, demands)
          if ok && !subs.empty?
            subst = TypeSubstitution.new(subs)
            unified = demands.map { |d| subst.apply(d) }
            unified.each_with_index do |u, i|
              recv = args[i]
              default_logger.typecheck("#{ctx.node.content} demanded #{u} and was given #{recv}")
              compatible = recv.is_assignable_to(u)
              ctx.compiler.assert_(compatible, ctx.node, "argument #{i+1} demands #{u} and is given #{recv}", ErrorType::ARGUMENT_TYPE_MISMATCH)
            end
          elsif demands
            demands.each_with_index do |d, i|
              recv = args[i]?
              next unless recv
              default_logger.typecheck("#{ctx.node.content} demanded #{d} and was given #{recv}")
              compatible = recv.is_assignable_to(d)
              ctx.compiler.assert_(compatible, ctx.node, "argument #{i+1} demands #{d} and is given #{recv}", ErrorType::ARGUMENT_TYPE_MISMATCH)
            end
          end
        end
      end

      if conv.responds_to?(:returns)
        ret = conv.returns.as(Type | Nil)
        if conv.responds_to?(:demands)
          demands = conv.demands.as(Array(Type) | Nil)
          if demands
            ok, subs = unify_types(args, demands)
            if ok && !subs.empty? && ret.is_a?(Type)
              next TypeSubstitution.new(subs).apply(ret)
            end
          end
        end
        next ret.not_nil!
      end

      NEVER
    end
  end

  def emission(ctx : MacroContext) : Nil
    begin
      args_str = ctx.compiler.get_metadata(ctx.node, Args).to_s
      parts = args_str.split(" ")
      ident = ctx.compiler.get_new_ident(parts.join("_"))

      resolved = ctx.compiler.get_metadata(ctx.node, ResolvedConvention)
      conv = resolved.convention

      arg_exprs = collect_child_expressions(ctx)
      call_src = conv.not_nil!.compile(arg_exprs)
      ctx.statement_out << "const #{ident} = await #{call_src}\n"
      ctx.expression_out << ident
    rescue ex
      default_logger.debug("Call emission failed for #{ctx.node.content}: #{ex}, producing error marker")
      args_str = ctx.compiler.get_metadata(ctx.node, Args).to_s
      ident = ctx.compiler.get_new_ident(args_str.split(" ").join("_"))
      ctx.statement_out << "const #{ident} = ??????COMPILE_ERROR;\n"
      ctx.expression_out << ident
    end
  end
end

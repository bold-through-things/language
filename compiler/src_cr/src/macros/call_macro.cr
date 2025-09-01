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

# -------------------------------------------------------------------
# Type hierarchy adapter (handles Type | String with unions support)
# -------------------------------------------------------------------
class TypeHierarchyChecker
  def initialize(@hierarchy : Hash((Type | String), Array(Type | String)),
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
# Unification utilities for polymorphic signatures
# -------------------------------------------------------------------
private def types_equivalent(t1 : (Type | String), t2 : (Type | String)) : Bool
  if t1.is_a?(Type) && t2.is_a?(Type)
    return t1.is_assignable_to(t2) && t2.is_assignable_to(t1)
  end
  t1.to_s == t2.to_s
end

private def unify_single_type(actual : (Type | String),
                              signature : (Type | String),
                              subs : Hash(String, Type)) : Bool
  # Wildcards
  return true if signature == "*" || actual == "*"

  # Type variable?
  if signature.is_a?(TypeVariable)
    name = signature.name
    if (existing = subs[name]?)
      return types_equivalent(actual, existing)
    else
      if actual.is_a?(Type)
        subs[name] = actual
        return true
      else
        # If actual is legacy string, we cannot bind a proper TypeVar sensibly
        # Accept as compatible but don't bind (keeps things permissive during transition)
        return true
      end
    end
  end

  # Actual should never be a TypeVariable at this point
  if actual.is_a?(TypeVariable)
    raise "Compiler bug: actual type is TypeVariable: #{actual}"
  end

  # Structural unify for ComplexType
  if signature.is_a?(ComplexType) && actual.is_a?(ComplexType)
    return false unless signature.name == actual.name
    return false unless signature.type_params.size == actual.type_params.size
    signature.type_params.zip(actual.type_params).all? do |sig_t, act_t|
      unify_single_type(act_t, sig_t, subs)
    end
  elsif actual.is_a?(Type) && signature.is_a?(Type)
    actual.is_assignable_to(signature)
  elsif actual.is_a?(Type) && signature.is_a?(String)
    actual.is_assignable_to(signature)
  elsif actual.is_a?(String) && signature.is_a?(String)
    TYPE_CHECKER.is_subtype(actual, signature)
  else
    false
  end
end

private def unify_types(actuals : Array((Type | String)),
                        sigs : Array((Type | String))) : {Bool, Hash(String, Type)}
  return {false, {} of String => Type} unless actuals.size == sigs.size
  subs = {} of String => Type
  actuals.zip(sigs).all? { |a, s| unify_single_type(a, s, subs) } ?
    {true, subs} : {false, {} of String => Type}
end

# -------------------------------------------------------------------
# Call provider
# -------------------------------------------------------------------
class Call_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider

  # ---- resolution helpers ----

  private def matches_signature(actual : Array((Type | String)), demanded : Array((Type | String)) | Nil) : Bool
    default_logger.typecheck("_matches_signature: actual=#{actual}, demanded=#{demanded}")
    return true if demanded.nil?

    ok, _subs = unify_types(actual, demanded)
    return true if ok

    return false unless actual.size == demanded.size
    actual.zip(demanded).all? do |a, d|
      next true if d == "*" || a == "*"
      if a.is_a?(Type) && d.is_a?(String)
        a.is_assignable_to(d)
      else
        TYPE_CHECKER.is_subtype(a, d)
      end
    end
  end

  private def resolve_local_definition(ctx : MacroContext, fn : String)
    res = walk_upwards_for_local_definition(ctx, fn)
    return [] of Call_convention unless res

    mname = ctx.compiler.get_metadata(res.node, Macro).to_s
    if mname == "local" || mname == "67lang:assume_local_exists"
      name = get_single_arg(ctx.clone_with(node: res.node))
      sane = ctx.compiler.maybe_metadata(res.node, SaneIdentifier)
      resolved = (sane || name).to_s
      return [
        LocalAccessCall.new(fn: resolved, demands: [] of (Type | String), returns: res.type_value),
        LocalAccessCall.new(fn: resolved, demands: [res.type_value], returns: res.type_value),
      ]
    end
    [] of Call_convention
  end

  private def resolve_builtin_call(fn : String)
    if (arr = BUILTIN_CALLS[fn]?)
      return arr
    end
    [] of Call_convention
  end

  private def resolve_dynamic_convention(ctx : MacroContext, fn : String)
    ctx.compiler.dynamic_conventions_for(fn) || [] of Call_convention
  end

  private def resolve_convention(ctx : MacroContext, actual_arg_types : Array((Type | String)) | Nil = nil) : Call_convention
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s.split(" ")
    ctx.compiler.assert_(args.size == 1, ctx.node, "single argument, the function to call")
    fn = args[0]

    candidates = [] of Call_convention
    candidates.concat resolve_local_definition(ctx, fn)
    candidates.concat resolve_builtin_call(fn)
    candidates.concat resolve_dynamic_convention(ctx, fn)

    default_logger.debug("all_possible_conventions: #{candidates}")

    selected = nil.as(Call_convention?)

    if actual_arg_types
      matching = candidates.select { |c|
        demands = c.responds_to?(:demands) ? c.demands.as(Array((Type | String)) | Nil) : nil
        matches_signature(actual_arg_types, demands)
      }

      if matching.size > 1
        # Most specific: count positions where both actual and demanded are not "*"
        score = ->(c : Call_convention) {
          demands = c.responds_to?(:demands) ? c.demands.as(Array((Type | String)) | Nil) : nil
          return {0, 0} unless demands
          specific = 0
          actual_arg_types.zip(demands).each do |a, d|
            specific += 1 unless a == "*" || d == "*"
          end
          {specific, -demands.size}
        }
        best = matching.max_by { |c| score.call(c) } 
        best_score = score.call(best) 
        ties = matching.select { |c| score.call(c) == best_score }
        # tie case
        if ties.size > 1
          extras = {
            "matching_overloads" => ties.map { |c| convention_to_meta(c).as(MetaValue) }.as(MetaValue)
          } of String => MetaValue
          ctx.compiler.assert_(false, ctx.node,
            "multiple equally specific overloads match for #{fn} with arguments #{actual_arg_types}",
            ErrorType::AMBIGUOUS_OVERLOAD,
            extras)
        else
          selected = best
        end
      elsif matching.size == 1
        selected = matching[0]
      end
    else
      # No type info: pick first by arg count if available
      if candidates.size > 0
        arg_count = ctx.node.children.size
        filtered = candidates.select do |c|
          if c.responds_to?(:demands)
            d = c.demands.as(Array((Type | String)) | Nil)
            d.nil? || d.size == arg_count
          else
            true
          end
        end
        selected = (filtered.empty? ? nil : filtered[0])
      end
    end

    # no selection
    unless selected
      extras = {
        "visible_overloads" => candidates.map { |c| convention_to_meta(c).as(MetaValue) }.as(MetaValue)
      } of String => MetaValue
      ctx.compiler.assert_(false, ctx.node,
        "could not find a matching overload for #{fn} with arguments #{actual_arg_types}",
        ErrorType::NO_MATCHING_OVERLOAD,
        extras)
      raise "unreachable"
    end
    selected
  end

  # ---- typecheck ----
  def typecheck(ctx : MacroContext)
    graceful_typecheck do
      # collect child types using current step
      args = [] of (Type | String | Nil)
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

      conv = resolve_convention(ctx, args)
      ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention.new(convention: conv))

      # Validate arguments against demands (with unification)
      if conv.responds_to?(:demands)
        demands = conv.demands.as(Array((Type | String)) | Nil)
        if demands
          ok, subs = unify_types(args, demands)
          if ok && !subs.empty?
            subst = TypeSubstitution.new(subs)
            unified = demands.map { |d|
              d.is_a?(Type) ? subst.apply(d) : d
            }
            unified.each_with_index do |u, i|
              recv = args[i]
              next if u == "*" || recv == "*"
              default_logger.typecheck("#{ctx.node.content} demanded #{u} and was given #{recv}")
              compatible =
                if recv.is_a?(Type) && u.is_a?(String)
                  recv.is_assignable_to(u)
                elsif recv.is_a?(Type) && u.is_a?(Type)
                  recv.is_assignable_to(u)
                else
                  TYPE_CHECKER.is_subtype(recv, u)
                end
              ctx.compiler.assert_(compatible, ctx.node, "argument #{i+1} demands #{u} and is given #{recv}", ErrorType::ARGUMENT_TYPE_MISMATCH)
            end
          elsif demands
            demands.each_with_index do |d, i|
              recv = args[i]?
              next unless recv
              next if d.to_s == "*" || recv.to_s == "*"
              default_logger.typecheck("#{ctx.node.content} demanded #{d} and was given #{recv}")
              compatible =
                if recv.is_a?(Type) && d.is_a?(String)
                  recv.is_assignable_to(d)
                else
                  TYPE_CHECKER.is_subtype(recv, d)
                end
              ctx.compiler.assert_(compatible, ctx.node, "argument #{i+1} demands #{d} and is given #{recv}", ErrorType::ARGUMENT_TYPE_MISMATCH)
            end
          end
        end
      end

      # Return type (apply substitutions if any)
      if conv.responds_to?(:returns)
        ret = conv.returns.as((Type | String) | Nil)
        if conv.responds_to?(:demands)
          demands = conv.demands.as(Array((Type | String)) | Nil)
          if demands
            ok, subs = unify_types(args, demands)
            if ok && !subs.empty? && ret.is_a?(Type)
              return TypeSubstitution.new(subs).apply(ret)
            end
          end
        end
        return ret || "*"
      end
      "*"
    end
  end

  # ---- emission ----
  def emission(ctx : MacroContext) : Nil
    begin
      args_str = ctx.compiler.get_metadata(ctx.node, Args).to_s
      parts = args_str.split(" ")
      ident = ctx.compiler.get_new_ident(parts.join("_"))

      conv =
        begin
          resolved = ctx.compiler.get_metadata(ctx.node, ResolvedConvention)
          resolved.convention
        rescue
          resolve_convention(ctx, nil)
        end

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

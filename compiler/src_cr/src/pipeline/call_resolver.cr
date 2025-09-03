# pipeline/call_resolver.cr
require "../core/node"
require "../utils/logger"
require "../utils/error_types"
require "../pipeline/steps/utils"
require "../pipeline/builtin_calls"
require "../pipeline/local_lookup"
require "../compiler_types/proper_types"
require "../compiler_types/type_hierarchy"

# Reuse helpers already defined in call_macro.cr:
# - TYPE_CHECKER
# - unify_types

module CallResolver
  private def type_to_meta(t : (Type | String | Nil)) : MetaValue
    # Keep it simple; adjust if you have a richer meta encoder
    (t ? t.to_s : "nil").as(MetaValue)
  end

  private def explain_signature_mismatch(actual : Array(Type),
                                        demanded : Array(Type) | Nil) : Array(MetaValue)
    reasons = [] of MetaValue

    # Signature that accepts anything? Nothing to complain about.
    return reasons unless demanded

    # Arity first. Saves time and makes the error obvious.
    if actual.size != demanded.size
      reasons << ({
        "reason_type"     => "ARITY_MISMATCH",
        "demanded_arity"  => demanded.size.as(MetaValue),
        "received_arity"  => actual.size.as(MetaValue),
      } of String => MetaValue).as(MetaValue)
      return reasons
    end

    ok, subs = unify_types(actual, demanded)
    return reasons if ok

    # Point at the exact mismatches. If unify failed for typevars,
    # per-arg assignability flags the painful bits.
    demanded.each_with_index do |d, i|
      a = actual[i]
      unless a.is_assignable_to(d)
        reasons << ({
          "reason_type" => "ARG_MISMATCH",
          "index"       => i.as(MetaValue),
          "demanded"    => type_to_meta(d),
          "received"    => type_to_meta(a),
      } of String => MetaValue).as(MetaValue)
      end
    end

    # If nothing specific surfaced, admit the polymorphic failure.
    if reasons.empty?
      reasons << ({
        "reason_type" => "UNIFICATION_FAILED",
        "details"     => "could not satisfy type variables".as(MetaValue),
        "note"        => "no per-argument assignability clue".as(MetaValue),
      } of String => MetaValue).as(MetaValue)
    end

    reasons
  end


  private def matches_signature(fn : String, actual : Array(Type), demanded : Array(Type) | Nil) : Bool
    default_logger.typecheck("_matches_signature: actual=#{actual}, demanded=#{demanded}")
    return true if demanded.nil?

    ok, _subs = unify_types(actual, demanded)
    return true if ok

    return false unless actual.size == demanded.size
    actual.zip(demanded).all? do |a, d|
      a.is_assignable_to(d)
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
      if type = res.type_value
        return [
          LocalAccessCall.new(fn: resolved, demands: [] of (Type), returns: type),
          LocalAccessCall.new(fn: resolved, demands: [type], returns: type),
        ]
      end
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

  def resolve_candidates(ctx : MacroContext, fn : String) : Array(Call_convention)
    candidates = [] of Call_convention
    candidates.concat resolve_local_definition(ctx, fn)
    candidates.concat resolve_builtin_call(fn)
    candidates.concat resolve_dynamic_convention(ctx, fn)
    candidates
  end

  # Public for includers
  def resolve_convention(ctx : MacroContext, fn : String, actual_arg_types : Array(Type) | Nil = nil) : Call_convention
    candidates = resolve_candidates(ctx, fn)

    default_logger.debug("all_possible_conventions(#{fn}): #{candidates}")

    selected = nil.as(Call_convention?)

    if actual_arg_types
      matching = candidates.select { |c|
        demands = c.responds_to?(:demands) ? c.demands.as(Array(Type) | Nil) : nil
        rv = matches_signature(fn, actual_arg_types, demands)
        rv
      }

      if matching.size > 1
        score = ->(c : Call_convention) {
          demands = c.responds_to?(:demands) ? c.demands : nil
          return {0, 0} unless demands
          specific = 0
          actual_arg_types.zip(demands).each do |a, d|
            specific += 1
          end
          {specific, -demands.size}
        }
        best = matching.max_by { |c| score.call(c) }
        best_score = score.call(best)
        ties = matching.select { |c| score.call(c) == best_score }
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

    unless selected
      visible = candidates.map do |c|
        meta = convention_to_meta(c) # whatever you already emit

        reasons = [] of Hash(String, MetaValue)
        if actual_arg_types
          demands = c.responds_to?(:demands) ? c.demands.as(Array(Type) | Nil) : nil
          reasons = explain_signature_mismatch(actual_arg_types, demands)
        end

        # Attach reasons next to the existing overload meta without guessing its shape.
        {
          "convention" => meta.as(MetaValue),
          "reasons"    => reasons.map(&.as(MetaValue)).as(MetaValue),
        }.as(MetaValue)
      end

      extras = {
        "visible_overloads" => visible.as(MetaValue),
      } of String => MetaValue

      ctx.compiler.assert_(false, ctx.node,
        "could not find a matching overload for #{fn} with arguments #{actual_arg_types}",
        ErrorType::NO_MATCHING_OVERLOAD,
        extras)
      raise "unreachable"
    end
    selected
  end
end


# -------------------------------------------------------------------
# Unification utilities for polymorphic signatures
# -------------------------------------------------------------------
private def types_equivalent(t1 : Type, t2 : Type) : Bool
    return t1.is_assignable_to(t2) && t2.is_assignable_to(t1)
end

private def unify_single_type(actual : Type,
                            signature : Type,
                            subs : Hash(String, Type)) : Bool

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

def unify_types(actuals : Array(Type),
                        sigs : Array(Type)) : {Bool, Hash(String, Type)}
return {false, {} of String => Type} unless actuals.size == sigs.size
subs = {} of String => Type
actuals.zip(sigs).all? { |a, s| unify_single_type(a, s, subs) } ?
    {true, subs} : {false, {} of String => Type}
end
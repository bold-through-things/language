// pipeline/call_resolver.ts
// Call resolution + type unification for 67lang

import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";
import { MacroContext } from "../core/macro_registry.ts";
import { get_single_arg } from "../utils/common_utils.ts";
import { walk_upwards_for_local_definition } from "./local_lookup.ts";
import {
  Type,
  TypeVariable,
  ComplexType,
} from "../compiler_types/proper_types.ts";
import {
Async_mode,
  Call_convention,
  LocalAccessCall,
} from "./call_conventions.ts";
import { BUILTIN_CALLS } from "./builtin_calls.ts";
import { MetaValue, convention_to_meta, type_to_meta as encode_type_to_meta } from "../core/meta_value.ts";
import { SaneIdentifier } from "../core/node.ts";

// -------------------------------------------------------------------
// Signature mismatch explanation helpers
// -------------------------------------------------------------------

function type_to_meta_value(t: Type | null): MetaValue {
  if (!t) {
    return "nil";
  }
  return encode_type_to_meta(t);
}

function explain_signature_mismatch(
  actual: Type[],
  demanded: Type[] | null | undefined,
): MetaValue[] {
  const reasons: MetaValue[] = [];

  if (!demanded) {
    return reasons;
  }

  if (actual.length !== demanded.length) {
    const reason: { [key: string]: MetaValue } = {
      reason_type: "ARITY_MISMATCH",
      demanded_arity: demanded.length,
      received_arity: actual.length,
    };
    reasons.push(reason);
    return reasons;
  }

  const [ok] = unify_types(actual, demanded);
  if (ok) {
    return reasons;
  }

  demanded.forEach((d, i) => {
    const a = actual[i];
    if (!a.is_assignable_to(d)) {
      const reason: { [key: string]: MetaValue } = {
        reason_type: "ARG_MISMATCH",
        index: i,
        demanded: type_to_meta_value(d),
        received: type_to_meta_value(a),
      };
      reasons.push(reason);
    }
  });

  if (reasons.length === 0) {
    const reason: { [key: string]: MetaValue } = {
      reason_type: "UNIFICATION_FAILED",
      details: "could not satisfy type variables",
      note: "no per-argument assignability clue",
    };
    reasons.push(reason);
  }

  return reasons;
}

function matches_signature(
  fn: string,
  actual: Type[],
  demanded: Type[] | null | undefined,
): boolean {
  default_logger.typecheck(`matches_signature(${fn}): actual=${actual}, demanded=${demanded}`);
  if (!demanded) {
    return true;
  }

  const [ok] = unify_types(actual, demanded);
  if (ok) {
    return true;
  }

  if (actual.length !== demanded.length) {
    return false;
  }

  return actual.every((a, i) => a.is_assignable_to(demanded[i]));
}

// -------------------------------------------------------------------
// Candidate resolution
// -------------------------------------------------------------------

function resolve_local_definition(
  ctx: MacroContext,
  fn: string,
): Call_convention[] {
  const res = walk_upwards_for_local_definition(ctx, fn);
  if (!res) {
    return [];
  }

  const name = get_single_arg(ctx.clone_with({ node: res.node }));
  const sane = ctx.compiler.maybe_metadata(res.node, SaneIdentifier);
  const resolved_name = (sane ?? name).toString();

  const type = res.found;
  if (!type) {
    return [];
  }

  return [
    new LocalAccessCall(resolved_name, [], type, Async_mode.SYNC),
    new LocalAccessCall(resolved_name, [type], type, Async_mode.SYNC),
  ];
}

function resolve_builtin_call(fn: string): Call_convention[] {
  const arr = BUILTIN_CALLS[fn];
  if (arr) {
    return arr;
  }
  return [];
}

function resolve_dynamic_convention(
  ctx: MacroContext,
  fn: string,
): Call_convention[] {
  return ctx.compiler.dynamic_conventions_for(fn) ?? [];
}

export function resolve_candidates(
  ctx: MacroContext,
  fn: string,
): Call_convention[] {
  const candidates: Call_convention[] = [];
  candidates.push(...resolve_local_definition(ctx, fn));
  candidates.push(...resolve_builtin_call(fn));
  candidates.push(...resolve_dynamic_convention(ctx, fn));
  return candidates;
}

// -------------------------------------------------------------------
// Public resolver
// -------------------------------------------------------------------

export function resolve_convention(
  ctx: MacroContext,
  fn: string,
  actual_arg_types?: Type[] | null,
): Call_convention {
  const candidates = resolve_candidates(ctx, fn);

  if (actual_arg_types?.some(t => t == null)) {
    console.log("Compiler bug: null type in actual_arg_types", actual_arg_types);
  }

  default_logger.debug(`all_possible_conventions(${fn}): ${candidates}`);

  let selected: Call_convention | null = null;

  if (actual_arg_types && actual_arg_types.length > 0) {
    const matching = candidates.filter((c) => {
      const demands = c.demands;
      return matches_signature(fn, actual_arg_types, demands ?? null);
    });

    if (matching.length > 1) {
      const score = (c: Call_convention): [number, number] => {
        const demands = c.demands;
        if (!demands) {
          return [0, 0];
        }
        let specific = 0;
        actual_arg_types.forEach((_a, _i) => {
          // Crystal code increments for each arg; we keep it simple / same
          specific += 1;
        });
        return [specific, -demands.length];
      };

      const best = matching.reduce((acc, c) => {
        const s1 = score(acc);
        const s2 = score(c);
        if (s2[0] > s1[0]) {
          return c;
        }
        if (s2[0] === s1[0] && s2[1] > s1[1]) {
          return c;
        }
        return acc;
      });

      const best_score = score(best);
      const ties = matching.filter((c) => {
        const s = score(c);
        return s[0] === best_score[0] && s[1] === best_score[1];
      });

      if (ties.length > 1) {
        const extras: { [key: string]: MetaValue } = {
          matching_overloads: ties.map((c) => convention_to_meta(c)) as MetaValue,
        };
        ctx.compiler.assert_(
          false,
          ctx.node,
          `multiple equally specific overloads match for ${fn} with arguments ${actual_arg_types}`,
          ErrorType.AMBIGUOUS_OVERLOAD,
          extras,
        );
      } else {
        selected = best;
      }
    } else if (matching.length === 1) {
      selected = matching[0];
    }
  } else {
    if (candidates.length > 0) {
      const arg_count = ctx.node.children.length;
      const filtered = candidates.filter((c) => {
        const demands = (c as any).demands as (Type[] | null | undefined);
        if (!demands) {
          return true;
        }
        return demands.length === arg_count;
      });
      selected = filtered.length > 0 ? filtered[0] : null;
    }
  }

  if (!selected) {
    const visible: MetaValue[] = candidates.map((c) => {
      const meta = convention_to_meta(c);
      let reasons: MetaValue[] = [];
      if (actual_arg_types) {
        const demands = (c as any).demands as Type[] | null | undefined;
        reasons = explain_signature_mismatch(actual_arg_types, demands ?? null);
      }
      const entry: { [key: string]: MetaValue } = {
        convention: meta,
        reasons: reasons as MetaValue,
      };
      return entry;
    });

    const extras: { [key: string]: MetaValue } = {
      visible_overloads: visible as MetaValue,
    };

    ctx.compiler.assert_(
      false,
      ctx.node,
      `could not find a matching overload for ${fn} with arguments ${actual_arg_types}`,
      ErrorType.NO_MATCHING_OVERLOAD,
      extras,
    );
    throw new Error("unreachable");
  }

  return selected;
}

// -------------------------------------------------------------------
// Unification utilities for polymorphic signatures
// -------------------------------------------------------------------

function types_equivalent(t1: Type, t2: Type): boolean {
  return t1.is_assignable_to(t2) && t2.is_assignable_to(t1);
}

function unify_single_type(
  actual: Type,
  signature: Type,
  subs: Record<string, Type>,
): boolean {
  // Type variable?
  if (signature instanceof TypeVariable) {
    const name = signature.name;
    const existing = subs[name];
    if (existing) {
      return types_equivalent(actual, existing);
    } else {
      subs[name] = actual;
      return true;
    }
  }

  if (actual instanceof TypeVariable) {
    throw new Error(`Compiler bug: actual type is TypeVariable: ${actual.toString()}`);
  }

  if (signature instanceof ComplexType && actual instanceof ComplexType) {
    if (signature.name !== actual.name) {
      return false;
    }
    if (signature.type_params.length !== actual.type_params.length) {
      return false;
    }
    for (let i = 0; i < signature.type_params.length; i += 1) {
      const sig_t = signature.type_params[i];
      const act_t = actual.type_params[i];
      if (!unify_single_type(act_t, sig_t, subs)) {
        return false;
      }
    }
    return true;
  }

  // Fallback: regular assignability
  return actual.is_assignable_to(signature);
}

export function unify_types(
  actuals: Type[],
  sigs: Type[],
): [boolean, Record<string, Type>] {
  if (actuals.length !== sigs.length) {
    return [false, {}];
  }

  const subs: Record<string, Type> = {};
  const ok = actuals.every((a, i) => unify_single_type(a, sigs[i], subs));
  if (!ok) {
    return [false, {}];
  }
  return [true, subs];
}

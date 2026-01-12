// pipeline/call_resolver.ts
// Call resolution + type unification for 67lang

import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Macro_context } from "../core/macro_registry.ts";
import {
  Type,
  TypeVariable,
  Function_67lang,
  ComplexType,
} from "../compiler_types/proper_types.ts";
import { JSON_value, type_to_meta as encode_type_to_meta, function_to_meta } from "../core/meta_value.ts";
import { Type_checking_context } from "./steps/typechecking.ts";
import { Match_request, Upwalker } from "./local_lookup.ts";
import { Upwalker_visibility, Local_spec, Provides_locals__metadata } from "../macros/local_macro.ts";
import { map_each_pair } from "../utils/utils.ts";

// -------------------------------------------------------------------
// Signature mismatch explanation helpers
// -------------------------------------------------------------------

function type_to_meta_value(t: Type | null): JSON_value {
  if (!t) {
    return "nil";
  }
  return encode_type_to_meta(t);
}

function explain_signature_mismatch(
  ctx: Type_checking_context,
  actual: Type[],
  demanded: Type[] | null | undefined,
): JSON_value[] {
  const reasons: JSON_value[] = [];

  if (!demanded) {
    return reasons;
  }

  if (actual.length !== demanded.length) {
    const reason: { [key: string]: JSON_value } = {
      reason_type: "ARITY_MISMATCH",
      demanded_arity: demanded.length,
      received_arity: actual.length,
    };
    reasons.push(reason);
    return reasons;
  }

  const [ok] = unify_types(ctx, actual, demanded);
  if (ok) {
    return reasons;
  }

  map_each_pair(actual, demanded, (a, d, i) => {
    if (!ctx.type_engine.can_assign({value_type: a, field_type: d})) {
      const reason: { [key: string]: JSON_value } = {
        reason_type: "ARG_MISMATCH",
        index: i,
        demanded: type_to_meta_value(d),
        received: type_to_meta_value(a),
      };
      reasons.push(reason);
    }
  });

  if (reasons.length === 0) {
    const reason: { [key: string]: JSON_value } = {
      reason_type: "UNIFICATION_FAILED",
      details: "could not satisfy type variables",
      note: "no per-argument assignability clue",
    };
    reasons.push(reason);
  }

  return reasons;
}

function matches_signature(
  ctx: Type_checking_context,
  fn: string,
  actual: Type[],
  demanded: Type[] | null | undefined,
): [boolean, Record<string, Type>] {
  if (!demanded) {
    return [true, {}];
  }

  const [ok, subs] = unify_types(ctx, actual, demanded);
  if (ok) {
    return [ok, subs];
  }

  if (actual.length !== demanded.length) {
    return [false, {}];
  }

  const ok1 = map_each_pair(actual, demanded, (a, d) => ctx.type_engine.can_assign({value_type: a, field_type: d})).every((v) => v);
  return [ok1, {}]; // TODO might not be needed
}

function resolve_local_definition(
  ctx: Macro_context,
  fn: string,
): Function_67lang[] {
  function get_local(req: Match_request): Local_spec | null {
    const ctx = req.ctx;
    const meta = ctx.compiler.maybe_metadata(ctx.node, Provides_locals__metadata);
    if (meta === null) { return null; }
    const local = meta.locals[fn];
    if (!local) { return null; }
    const expected_is_direct_parent = {
      [Upwalker_visibility.CHILDREN_ONLY]: true, 
      [Upwalker_visibility.NEXT_NODES_ONLY]: false
    }[local.local_lifetime];
    if (expected_is_direct_parent !== req.is_direct_parent) {
      return null;
    }
    return local;
  }
  const res = new Upwalker(get_local).find(ctx);
  if (!res || !res.found) {
    return [];
  }

  return [
    res.found.getter,
    res.found.setter,
  ].filter((f): f is Function_67lang => f !== null);
}

export function resolve_candidates(
  ctx: Type_checking_context,
  fn: string,
): Function_67lang[] {
  const candidates: Function_67lang[] = [];
  candidates.push(...resolve_local_definition(ctx, fn));
  candidates.push(...(ctx.type_engine.get_functions(fn) ?? []));
  return candidates;
}

export const PASSTHROUGH = Symbol("PASSTHROUGH");

export function resolve_function(
  ctx: Type_checking_context,
  fn: string,
  actual_arg_types: (Type | typeof PASSTHROUGH)[],
): { fn_data: Function_67lang, subs: Record<string, Type> } {
  function apply_passthrough(fn: Function_67lang): Type[] {
    if (fn.demands.length !== actual_arg_types.length) {
      return fn.demands;
    }
    return actual_arg_types.map(
      (t, i) => 
        t === PASSTHROUGH ? 
          (
            ctx.compiler.error_tracker.assert(
              fn.demands[i] !== undefined,
              {
                node: ctx.node,
                message: `fn.demands[i] !== undefined`,
                type: ErrorType.INTERNAL_CODE_QUALITY,
              }
            ), 
            fn.demands[i]
          ) : 
          t
    );
  }

  const candidates = resolve_candidates(ctx, fn);

  let selected: { fn_data: Function_67lang, subs: Record<string, Type> } | null = null;

  const matching = candidates.map((fn_data) => {
    const demands = fn_data.demands;
    const [ok, subs] = matches_signature(ctx, fn, apply_passthrough(fn_data), demands ?? null)
    return { ok, subs, fn_data };
  })
  .filter(({ok}) => ok)
  .filter(({fn_data}) => fn_data.demands && fn_data.demands.length === actual_arg_types.length);

  if (matching.length > 1) {
    const score = (c: Function_67lang): [number, number] => {
      const demands = c.demands;
      if (!demands) {
        return [0, 0];
      }
      if (demands.length !== actual_arg_types.length) {
        return [0, 0];
      }
      if (actual_arg_types.length === 0) {
        return [1, 0]; // what the fuck is all this code,,,,,, TODO i beg you!
      }
      let specific = 0;
      actual_arg_types.forEach((_a, _i) => {
        // Crystal code increments for each arg; we keep it simple / same
        specific += 1;
      });
      return [specific, -demands.length];
    };

    const best = matching.reduce((acc, c) => {
      const s1 = score(acc.fn_data);
      const s2 = score(c.fn_data);
      if (s2[0] > s1[0]) {
        return c;
      }
      if (s2[0] === s1[0] && s2[1] > s1[1]) {
        return c;
      }
      return acc;
    });

    const best_score = score(best.fn_data);
    const ties = matching.filter((c) => {
      const s = score(c.fn_data);
      return s[0] === best_score[0] && s[1] === best_score[1];
    });

    if (ties.length > 1) {
      const extras: { [key: string]: JSON_value } = {
        matching_overloads: ties.map((c) => function_to_meta(c.fn_data)),
        actual_arg_types: actual_arg_types.map((t) => t === PASSTHROUGH ? "PASSTHROUGH" : type_to_meta_value(t)),
      };
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: `multiple equally specific overloads match for ${fn} with arguments ${actual_arg_types}`,
        type: ErrorType.AMBIGUOUS_OVERLOAD,
        extras,
      });
    } else {
      selected = best;
    }
  } else if (matching[0] !== undefined) {
    selected = matching[0];
  }

  if (!selected) {
    const visible: JSON_value[] = candidates.map((c) => {
      const meta = function_to_meta(c);
      let reasons: JSON_value[] = [];
      if (actual_arg_types) {
        reasons = explain_signature_mismatch(ctx, apply_passthrough(c), c.demands);
      }
      const entry: { [key: string]: JSON_value } = {
        convention: meta,
        reasons,
      };
      return entry;
    });

    const extras: { [key: string]: JSON_value } = {
      visible_overloads: visible,
      actual_arg_types: actual_arg_types.map((t) => t === PASSTHROUGH ? "PASSTHROUGH" : type_to_meta_value(t)),
    };

    ctx.compiler.error_tracker.fail({
      node: ctx.node,
      message: `could not find a matching overload for ${fn}`,
      type: ErrorType.NO_MATCHING_OVERLOAD,
      extras,
    });
  }

  return selected;
}

function unify_single_type(
  ctx: Type_checking_context,
  actual: Type,
  signature: Type,
  subs: Record<string, Type>,
): boolean {
  if (signature instanceof TypeVariable) {
    const name = signature.name;
    const existing = subs[name];
    if (existing) {
      const rv = ctx.type_engine.can_assign({value_type: actual, field_type: existing}) && ctx.type_engine.can_assign({value_type: existing, field_type: actual});
      return rv;
    } else {
      subs[name] = actual;
      return true;
    }
  }

  if (actual instanceof TypeVariable) {
    throw new Error(`Compiler bug: actual type is TypeVariable: ${actual.to_string()}`);
  }

  if (signature instanceof ComplexType && actual instanceof ComplexType) {
    if (signature.name !== actual.name) {
      return false;
    }
    if (signature.type_params.length !== actual.type_params.length) {
      return false;
    }
    const rv = map_each_pair(actual.type_params, signature.type_params, (at, st) => 
      unify_single_type(ctx, at, st, subs)
    ).every((v) => v);
    return rv;
  }

  // Fallback: regular assignability
  return ctx.type_engine.can_assign({value_type: actual, field_type: signature});
}

export function unify_types(
  ctx: Type_checking_context,
  actuals: Type[],
  sigs: Type[],
): [boolean, Record<string, Type>] {
  if (actuals.length !== sigs.length) {
    return [false, {}];
  }

  const subs: Record<string, Type> = {};
  const ok = map_each_pair(actuals, sigs, (a, s) => unify_single_type(ctx, a, s, subs)).every((v) => v);
  if (!ok) {
    return [false, {}];
  }
  return [true, subs];
}

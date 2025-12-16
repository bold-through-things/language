// macros/bind_macro.ts
import {
  Macro_context,
  Macro_provider,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS,
} from "../core/macro_registry.ts";

import { Node, Resolved_function } from "../core/node.ts";
import { Emission_item } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { PASSTHROUGH, resolve_candidates, resolve_function, unify_types } from "../pipeline/call_resolver.ts";
import { Expression_return_type, Type, Type_check_result, TypeSubstitution } from "../compiler_types/proper_types.ts";
import { Error_caused_by, not_null } from "../utils/utils.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";

export class Bind_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Preprocessing_context, "bind", this.preprocess.bind(this));
    via(Type_checking_context, "bind", this.typecheck.bind(this));
    via(Emission_macro_context, "bind", this.emission.bind(this));
  }

  readonly placeholder = (node: Node): boolean => {
    const c = node.content;
    if (c === "_") { return true; }
    if (c.startsWith("_ ")) { return true; }
    return false;
  };

  readonly placeholder_name = (idx: number, node: Node): string => {
    const c = node.content;
    if (c.startsWith("_ ")) {
      const split = c.split(" ", 2)
      if (split[1] === undefined) {
        return `arg${idx}`;
      }
      const raw = split[1].trim();
      if (raw.length === 0) {
        return `arg${idx}`;
      }
      return raw;
    }
    return `arg${idx}`;
  };

  preprocess(ctx: Macro_context): void {
    const parts = ctx.node.content.split(" ");
    const valid = 
      parts.length === 5 &&
        parts[0] === "bind" &&
        parts[1] === "fn" &&
        parts[3] === "as" &&
        parts[4] === "callable";
    ctx.compiler.error_tracker.assert(
      valid,
      {
        node: ctx.node,
        message: "bind syntax should be: bind fn <function_name> as callable",
        type: ErrorType.INVALID_MACRO,
      }
    );

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      child_ctx.apply();
    }
  }

  pick_convention(ctx: Type_checking_context, name: string, arity: number, bound_pairs: Array<[number, Type_check_result]>) {
    const candidates = resolve_candidates(ctx, name)
      .filter((c) => (c.demands ?? []).length === arity);

    ctx.compiler.error_tracker.assert(
      candidates.length > 0,
      {
        node: ctx.node,
        message: `No candidates for '${name}'`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    for (const cand of candidates) {
      const dmds = cand.demands ?? [];

      const bound_actuals: Type[] = [];
      const bound_sigs: Type[] = [];
      for (const [idx, at] of bound_pairs) {
        ctx.compiler.error_tracker.assert(
          at instanceof Expression_return_type,
          {
            node: ctx.node,
            message: `at instanceof Expression_return_type`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        ctx.compiler.error_tracker.assert(
          dmds[idx] instanceof Type,
          {
            node: ctx.node,
            message: `dmds[idx] instanceof Type`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        bound_actuals.push(at.type);
        bound_sigs.push(dmds[idx]);
      }

      const { 0: ok, 1: computed } = unify_types(ctx, bound_actuals, bound_sigs);
      if (!ok) { continue; }

      const subst = new TypeSubstitution(computed);

      let compatible = true;
      for (const [idx, at] of bound_pairs) {
        ctx.compiler.error_tracker.assert(
          at instanceof Expression_return_type,
          {
            node: ctx.node,
            message: `at instanceof Expression_return_type`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        const dmd = dmds[idx];
        ctx.compiler.error_tracker.assert(
          dmd instanceof Type,
          {
            node: ctx.node,
            message: `dmd instanceof Type`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        const demanded = subst.apply({ ctx, type_expr: dmd, caused_by: Error_caused_by.USER });
        ctx.compiler.error_tracker.assert(
          demanded instanceof Type,
          {
            node: ctx.node,
            message: `demanded instanceof Type`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        
        if (!ctx.type_engine.can_assign({value_type: at.type, field_type: demanded})) {
          compatible = false;
          break;
        }
      }
      if (!compatible) { continue; }

      return { convention: cand, subs: computed };
    }

    ctx.compiler.error_tracker.assert(
      false,
      {
        node: ctx.node,
        message: `No overload of '${name}' matches the bound arguments`,
        type: ErrorType.INVALID_MACRO,
      }
    );
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const parts = ctx.node.content.split(" ");
    const desired_fn_name = parts[2];

    ctx.compiler.error_tracker.assert(
      desired_fn_name !== undefined,
      {
        node: ctx.node,
        message: "function name must be provided",
        type: ErrorType.INVALID_MACRO,
      }
    );

    const provided: (Type | typeof PASSTHROUGH)[] = [];

    let i = -1;
    for (const child of ctx.node.children) {
      i += 1;
      if (this.placeholder(child)) {
        provided.push(PASSTHROUGH);
      } else {
        const t = ctx.clone_with({ node: child }).apply();
        ctx.compiler.error_tracker.assert(
          t instanceof Expression_return_type, 
          { 
            node: child, 
            message: "cannot infer type for bound argument",
            type: ErrorType.INVALID_MACRO,
          }
        );
        provided.push(t.type);
      }
    }

    const chosen = resolve_function(ctx, desired_fn_name, provided);
    const conv = chosen.fn_data;
    const subs = chosen.subs;

    ctx.compiler.error_tracker.assert(
      conv.demands != null && conv.returns != null,
      {
        node: ctx.node,
        message: `Function '${desired_fn_name}' must expose demands/returns to be bindable`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    const subst = new TypeSubstitution(subs);
    const param_types = conv.demands.map((d) => subst.apply({ ctx, type_expr: d, caused_by: Error_caused_by.USER }));
    const result_type = subst.apply({ ctx, type_expr: conv.returns, caused_by: Error_caused_by.USER });

    ctx.compiler.set_metadata(
      ctx.node,
      Resolved_function,
      new Resolved_function(conv),
    );

    ctx.compiler.set_metadata(
      ctx.node,
      Bind_meta,
      new Bind_meta(param_types.map((t, idx) => ({
        name: "",
        type: t,
        bound: provided[idx] !== PASSTHROUGH,
      }))),
    )

    const unbound = param_types.filter((_, idx) => provided[idx] === PASSTHROUGH);
    const l = unbound.length + "";

    const callable_inst = ctx.type_engine.instantiate_generic({
      name: `callable${l}`,
      type_args: [
        ...unbound,
        result_type,
      ],
      ctx,
      caused_by: Error_caused_by.USER,
    });

    return new Expression_return_type(callable_inst);
  }

  emission(ctx: Emission_macro_context): void {
    // const parts = ctx.node.content.split(" ");
    // const desired_fn_name = parts[2];

    const resolved = ctx.compiler.maybe_metadata(ctx.node, Resolved_function);
    ctx.compiler.error_tracker.assert(
      resolved != null,
      {
        node: ctx.node,
        message: "emission: convention must be resolved",
        type: ErrorType.INVALID_MACRO,
      }
    );

    const fn = resolved.fn;
    const conv = fn.convention;

    ctx.compiler.error_tracker.assert(
      conv != null,
      {
        node: ctx.node,
        message: `conv != null`,
        type: ErrorType.INVALID_MACRO,
      }
    )

    const unbound: [string, Type][] = [];
    const args_in_order: Emission_item[] = [];
    let hole_idx = 0;
    let arg_idx = 0;

    const meta = ctx.compiler.get_metadata(ctx.node, Bind_meta);

    ctx.node.children.forEach((child, _idx) => {
      if (this.placeholder(child)) {
        const pname = this.placeholder_name(hole_idx, child);
        const meta_arg = meta.args[arg_idx]
        const ptype = meta_arg?.type;
        ctx.compiler.error_tracker.assert(
          ptype instanceof Type && meta_arg?.bound === false,
          {
            node: child,
            message: `arg should be unbound`,
            type: ErrorType.INTERNAL_CODE_QUALITY,
          }
        );
        unbound.push([pname, ptype]);
        args_in_order.push(() => pname);
        hole_idx++;
        arg_idx++;
      } else {
        const obuf: Emission_item[] = [];
        const child_ctx = ctx.clone_with({ node: child, expression_out: obuf });
        child_ctx.apply();
        const expr = obuf[0];
        if (expr === null || expr === undefined) {
          return; // some comment or some shit yes?
        }
        args_in_order.push(expr);
        arg_idx++;
      }
    });

    const conv_comp = conv.compile(args_in_order, ctx);
    ctx.statement_out.push(conv_comp[0])
    ctx.expression_out.push(() => `((${unbound.map(([name, type]) => `${name}: ${type.to_typescript()}`).join(", ")}) => ${not_null(conv_comp[1])()})`);
  }
}

class Bind_meta {
  constructor(
    public readonly args: {
      name: string, 
      type: Type,
      bound: boolean
    }[]
  ) { 
    // ...
  }
}
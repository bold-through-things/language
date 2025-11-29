// macros/bind_macro.ts
import {
  Macro_emission_provider,
  Macro_preprocess_provider,
  Macro_typecheck_provider,
  MacroContext,
} from "../core/macro_registry.ts";

import { Node, ResolvedConvention } from "../core/node.ts";
import { Emission_item, IndentedStringIO } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { resolve_candidates, unify_types } from "../pipeline/call_resolver.ts";
import { ComplexType, Type, TypeParameter, TypeSubstitution } from "../compiler_types/proper_types.ts";
import { assert_instanceof, assert_not_instanceof, not_null } from "../utils/utils.ts";

export class Bind_macro_provider
  implements Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider
{
  readonly placeholder = (node: Node): boolean => {
    const c = node.content;
    if (c === "_") { return true; }
    if (c.startsWith("_ ")) { return true; }
    return false;
  };

  readonly placeholder_name = (idx: number, node: Node): string => {
    const c = node.content;
    if (c.startsWith("_ ")) {
      const raw = c.split(" ", 2)[1].trim();
      if (raw.length === 0) {
        return `arg${idx}`;
      }
      return raw;
    }
    return `arg${idx}`;
  };

  preprocess(ctx: MacroContext): void {
    const parts = ctx.node.content.split(" ");
    ctx.compiler.assert_(
      parts.length === 5 &&
        parts[0] === "bind" &&
        parts[1] === "fn" &&
        parts[3] === "as" &&
        parts[4] === "callable",
      ctx.node,
      "bind syntax should be: bind fn <function_name> as callable",
    );

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      ctx.current_step!.process_node(child_ctx);
    }
  }

  pick_convention(ctx: MacroContext, name: string, arity: number, bound_pairs: Array<[number, Type | TypeParameter]>) {
    const candidates = resolve_candidates(ctx, name)
      .filter((c) => c.demands != null && c.returns != null)
      .filter((c) => (c.demands ?? []).length === arity);

    ctx.compiler.assert_(
      candidates.length > 0,
      ctx.node,
      `No candidates for '${name}'`,
    );

    for (const cand of candidates) {
      const dmds = cand.demands ?? [];

      const bound_actuals: Type[] = [];
      const bound_sigs: Type[] = [];
      for (const [idx, at1] of bound_pairs) {
        const at = assert_not_instanceof(at1, TypeParameter);
        bound_actuals.push(at);
        bound_sigs.push(dmds[idx]);
      }

      const { 0: ok, 1: computed } = unify_types(bound_actuals, bound_sigs);
      if (!ok) { continue; }

      const subst = new TypeSubstitution(computed);

      let compatible = true;
      for (const [idx, at1] of bound_pairs) {
        const at = assert_not_instanceof(at1, TypeParameter);
        const demanded = subst.apply(dmds[idx]);
        if (!at.is_assignable_to(demanded)) {
          compatible = false;
          break;
        }
      }
      if (!compatible) { continue; }

      return { convention: cand, subs: computed };
    }

    ctx.compiler.assert_(
      false,
      ctx.node,
      `No overload of '${name}' matches the bound arguments`,
    );
  }

  typecheck(ctx: MacroContext): ComplexType {
    const parts = ctx.node.content.split(" ");
    const desired_fn_name = parts[2];

    const bound_pairs: Array<[number, Type | TypeParameter]> = [];
    const unbound_ix: number[] = [];

    let i = -1;
    for (const child of ctx.node.children) {
      i += 1;
      if (this.placeholder(child)) {
        unbound_ix.push(i);
      } else {
        const t = ctx.current_step!.process_node(ctx.clone_with({ node: child }));
        ctx.compiler.assert_(!!t, child, "cannot infer type for bound argument");
        const at = t;
        bound_pairs.push([i, at]);
      }
    }

    const chosen = this.pick_convention(ctx, desired_fn_name, ctx.node.children.length, bound_pairs);
    const conv = chosen.convention;
    const subs = chosen.subs;

    ctx.compiler.assert_(
      conv.demands != null && conv.returns != null,
      ctx.node,
      `Function '${desired_fn_name}' must expose demands/returns to be bindable`,
    );

    const dmds = conv.demands ?? [];
    const ret = conv.returns;

    const subst = new TypeSubstitution(subs);
    const param_types = unbound_ix.map((idx) => subst.apply(dmds[idx]));
    const result_type = subst.apply(ret);

    ctx.compiler.set_metadata(
      ctx.node,
      ResolvedConvention,
      new ResolvedConvention(conv),
    );

    const l = param_types.length == 0 ? "" : param_types.length + "";

    return new ComplexType(`callable${l}`, [...param_types, result_type]);
  }

  emission(ctx: MacroContext): void {
    const parts = ctx.node.content.split(" ");
    const desired_fn_name = parts[2];

    const resolved = ctx.compiler.maybe_metadata(ctx.node, ResolvedConvention);
    ctx.compiler.assert_(
      resolved != null,
      ctx.node,
      "emission: convention must be resolved",
      ErrorType.INVALID_MACRO,
    );

    const conv = resolved.convention;

    const unbound_names: string[] = [];
    const args_in_order: Emission_item[] = [];
    let hole_idx = 0;

    ctx.node.children.forEach((child, idx) => {
      if (this.placeholder(child)) {
        const pname = this.placeholder_name(hole_idx, child);
        unbound_names.push(pname);
        args_in_order.push(() => pname);
        hole_idx += 1;
      } else {
        const obuf: Emission_item[] = [];
        const child_ctx = ctx.clone_with({ node: child, expression_out: obuf });
        ctx.current_step!.process_node(child_ctx);
        const expr = obuf[0];
        ctx.compiler.assert_(
          expr != null,
          child,
          "bound argument must produce an expression",
          ErrorType.INVALID_STRUCTURE,
        );
        args_in_order.push(expr);
      }
    });

    ctx.expression_out.push(() => `((${unbound_names.join(", ")}) => ${not_null(conv.compile(args_in_order, ctx))()})`);
  }
}

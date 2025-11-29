// macros/call_macro.ts

import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";
import { Node, Args, ResolvedConvention, Macro_previously_failed } from "../core/node.ts";
import { cut, statement_expr } from "../utils/strutil.ts";
import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";
import { BUILTIN_CALLS } from "../pipeline/builtin_calls.ts";
import {
  Type,
  TypeParameter,
  TypeSubstitution,
  NEVER,
  TYPE_HIERARCHY,
  UNION_TYPES,
} from "../compiler_types/proper_types.ts";
import { graceful_typecheck } from "../core/exceptions.ts";
import { collect_child_expressions } from "../utils/common_utils.ts";
import { resolve_convention, unify_types } from "../pipeline/call_resolver.ts";
import { Async_mode } from "../pipeline/call_conventions.ts";
import { not_null } from "../utils/utils.ts";
import { unroll_parent_chain } from "../pipeline/steps/utils.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";

// -------------------------------------------------------------------
// TypeHierarchyChecker
// -------------------------------------------------------------------

class TypeHierarchyChecker {
  constructor(
    private hierarchy: Map<Type | string, Array<Type | string>>,
    private unions: Map<string, string[]>,
  ) {}

  is_subtype(child: Type | string, parent: Type | string): boolean {
    if (child instanceof Type && parent instanceof Type) {
      return child.is_assignable_to(parent);
    }

    const c = child.toString();
    const p = parent.toString();

    if (c === p) {
      return true;
    }

    const members = this.unions.get(p);
    if (members) {
      for (const m of members) {
        if (this.is_subtype(c, m)) {
          return true;
        }
      }
      return false;
    }

    const parents = this.hierarchy.get(c);
    if (!parents) {
      return false;
    }

    for (const pp of parents) {
      if (this.is_subtype(pp, p)) {
        return true;
      }
    }

    return false;
  }
}

export const TYPE_CHECKER = new TypeHierarchyChecker(
  TYPE_HIERARCHY,
  UNION_TYPES,
);

// -------------------------------------------------------------------
// Call_macro_provider
// -------------------------------------------------------------------

export class Call_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  typecheck(ctx: MacroContext): TCResult {
    const rv = graceful_typecheck(() => {
      const args: Array<Type> = [];
      const step = ctx.current_step;
      if (!step) {
        throw new Error("missing step");
      }

      for (const ch of ctx.node.children) {
        const tc = step.process_node(ctx.clone_with({ node: ch }));
        if (tc instanceof TypeParameter) {
          ctx.compiler.assert_(
            false,
            ch,
            "nonsense type parameter",
            ErrorType.ARGUMENT_TYPE_MISMATCH,
          );
        } else if (tc instanceof Type) {
          args.push(tc);
        }
      }

      const fn = ctx.compiler.get_metadata(ctx.node, Args).toString().split(" ")[0];
      const conv = resolve_convention(ctx, fn, args);

      ctx.compiler.set_metadata(
        ctx.node,
        ResolvedConvention,
        new ResolvedConvention(conv),
      );

      if (conv.demands) {
        const demands = conv.demands as Type[] | null;
        if (demands) {
          const [ok, subs] = unify_types(args, demands);
          if (ok && Object.keys(subs).length > 0) {
            const subst = new TypeSubstitution(subs);
            const unified = demands.map((d) => subst.apply(d));

            unified.forEach((u, i) => {
              const recv = args[i];
              default_logger.typecheck(
                `${ctx.node.content} demanded ${u} and was given ${recv}`,
              );
              const compatible = recv.is_assignable_to(u);
              ctx.compiler.assert_(
                compatible,
                ctx.node,
                `argument ${i + 1} demands ${u} and is given ${recv}`,
                ErrorType.ARGUMENT_TYPE_MISMATCH,
              );
            });
          } else {
            demands.forEach((d, i) => {
              const recv = args[i];
              if (!recv) {
                return;
              }
              default_logger.typecheck(
                `${ctx.node.content} demanded ${d} and was given ${recv}`,
              );
              const compatible = recv.is_assignable_to(d);
              ctx.compiler.assert_(
                compatible,
                ctx.node,
                `argument ${i + 1} demands ${d} and is given ${recv}`,
                ErrorType.ARGUMENT_TYPE_MISMATCH,
              );
            });
          }
        }
      }

      if (conv.returns) {
        const ret = conv.returns as Type | null;

        if (conv.demands) {
          const demands = conv.demands as Type[] | null;
          if (demands) {
            const [ok, subs] = unify_types(args, demands);
            if (ok && Object.keys(subs).length > 0 && ret instanceof Type) {
              return new TypeSubstitution(subs).apply(ret);
            }
          }
        }

        return ret!;
      }

      return NEVER;
    });

    if (ctx.compiler.maybe_metadata(ctx.node, ResolvedConvention) == null) {
      ctx.compiler.set_metadata(
        ctx.node,
        Macro_previously_failed,
        new Macro_previously_failed("convention not resolved"),
      );
    }

    return rv;
  }

  emission(ctx: MacroContext): void {
    let expr = () => `${FORCE_SYNTAX_ERROR} /* :call had emission error */`;
    try {
      if (ctx.compiler.maybe_metadata(ctx.node, Macro_previously_failed)) {
        default_logger.codegen(
          `skipping emission of call due to prior typecheck failure: ${ctx.node.content}`,
        );
        return;
      }

      const args_str = ctx.compiler.get_metadata(ctx.node, Args).toString();
      const parts = args_str.split(" ");
      const ident = ctx.compiler.get_new_ident(parts.join("_"));

      const resolved = ctx.compiler.maybe_metadata(ctx.node, ResolvedConvention);
      ctx.compiler.assert_(
        resolved != null && resolved.convention != null,
        ctx.node,
        "emission: convention must be resolved",
        ErrorType.INVALID_MACRO,
      )
      const conv = resolved.convention;

      const arg_exprs = collect_child_expressions(ctx);
      const call_src = conv.compile(arg_exprs, ctx);

      if (call_src == null) {
        // compiler bug then
        throw new Error("call_src is null");
      }

      const await_fn = {
        [Async_mode.ASYNC]: (id: string) => `(await (${id}))`, // should NEVER drop the outer brackets here!
        [Async_mode.SYNC]: (id: string) => id,
        /* 
        shout out to Claude for helping me benchmark this. yes, it's not that bad!

        Without unnecessary awaits: 0.30ms
        Smart conditional await: 0.40ms (1.33x slower) <-
        With pointless awaits: 72.40ms (241.33x slower)

        see the code below (at end of file)

        i really fucking love the JIT.
        */
        [Async_mode.MAYBE]: (id: string) => `(await _67lang.maybe_await(${id}))`, // should NEVER drop the outer brackets!
      }

      const [define, use] = statement_expr(() => `${await_fn[conv.async_mode](call_src())}`, ident);

      ctx.statement(define);
      expr = use ?? expr;
    } finally {
      ctx.expression(expr);
    }
  }
}

/*
  async function slowVersion() {
      let sum = await 0;
      for (let i = await 0; i < await 100000; i = await (i + 1)) {
          sum = await (sum + await Math.sqrt(await i));
      }
      return await sum;
  }

  function maybeAwait(val) {
      return val?.then ? val : Promise.resolve(val);
  }

  async function halfSlowVersion() {
      let sum = await maybeAwait(0);
      for (let i = await maybeAwait(0); i < 100000; i++) {
          sum = sum + Math.sqrt(i);
      }
      return sum;
  }

  async function fastVersion() {
      let sum = 0;
      for (let i = 0; i < 100000; i++) {
          sum = sum + Math.sqrt(i);
      }
      return sum;
  }
*/

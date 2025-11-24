// macros/call_macro.ts

import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";
import { Node, Args, ResolvedConvention } from "../core/node.ts";
import { cut } from "../utils/strutil.ts";
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
    return graceful_typecheck(() => {
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

      if ((conv as any).demands) {
        const demands = (conv as any).demands as Type[] | null;
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

      if ((conv as any).returns) {
        const ret = (conv as any).returns as Type | null;

        if ((conv as any).demands) {
          const demands = (conv as any).demands as Type[] | null;
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
  }

  emission(ctx: MacroContext): void {
    try {
      const args_str = ctx.compiler.get_metadata(ctx.node, Args).toString();
      const parts = args_str.split(" ");
      const ident = ctx.compiler.get_new_ident(parts.join("_"));

      const resolved = ctx.compiler.get_metadata(ctx.node, ResolvedConvention);
      const conv = not_null(resolved.convention);

      const arg_exprs = collect_child_expressions(ctx);
      const call_src = conv.compile(arg_exprs);

      const await_fn = {
        [Async_mode.ASYNC]: (id: string) => `await (${id})`,
        [Async_mode.SYNC]: (id: string) => id,
        /* 
        shout out to Claude for helping me benchmark this. yes, it's not that bad!

        Without unnecessary awaits: 0.30ms
        Smart conditional await: 0.40ms (1.33x slower) <-
        With pointless awaits: 72.40ms (241.33x slower)

        see the code below (at end of file)

        i really fucking love the JIT.
        */
        [Async_mode.MAYBE]: (id: string) => `await _67lang.maybe_await(${id})`,
      }
      
      ctx.statement_out.write(`const ${ident} = ${await_fn[conv.async_mode](call_src)}\n`);
      ctx.expression_out.write(ident);
    } catch (ex) {
      default_logger.debug(
        `Call emission failed for ${ctx.node.content}: ${ex}, producing error marker`,
      );
      const args_str = ctx.compiler.get_metadata(ctx.node, Args).toString();
      const ident = ctx.compiler.get_new_ident(args_str.split(" ").join("_"));
      ctx.statement_out.write(`const ${ident} = ??????COMPILE_ERROR;\n`);
      ctx.expression_out.write(ident);
    }
  }

  // The shared resolver is provided by CallResolver (included)
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

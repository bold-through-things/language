// macros/call_macro.ts

import {
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS,
  Macro_provider,
} from "../core/macro_registry.ts";
import { Args, Resolved_function, Macro_previously_failed } from "../core/node.ts";
import { statement_expr } from "../utils/strutil.ts";
import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";
import {
  Type,
  TypeSubstitution,
  Type_reference,
  Type_check_result,
  Expression_return_type,
  TypeVariable,
  UPSTREAM_INVALID,
  ComplexType,
} from "../compiler_types/proper_types.ts";
import { graceful_typecheck } from "../core/exceptions.ts";
import { collect_child_expressions } from "../utils/common_utils.ts";
import { resolve_function } from "../pipeline/call_resolver.ts";
import { Async_mode } from "../pipeline/call_conventions.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Error_caused_by, for_each_pair, not_null } from "../utils/utils.ts";

export class Call_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, "67lang:call", this.typecheck.bind(this));
    via(Emission_macro_context, "67lang:call", this.emission.bind(this));
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const rv = graceful_typecheck(ctx, Expression_return_type, () => {
      const args: Type[] = [];

      for (const ch of ctx.node.children) {
        const tc = ctx.clone_with({ node: ch }).apply();
        if (tc instanceof Type_reference) {
          ctx.compiler.error_tracker.fail({
            node: ch,
            message: "nonsense type parameter",
            type: ErrorType.ARGUMENT_TYPE_MISMATCH,
          });
        } else if(tc instanceof Expression_return_type) {
          args.push(tc.type);
        }
      }

      const fn_name = ctx.compiler.get_metadata(ctx.node, Args).toString().split(" ", 2)[0];

      ctx.compiler.error_tracker.assert(
        fn_name != undefined && fn_name.length > 0,
        {
          node: ctx.node,
          message: "function name cannot be empty",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );

      const resolved = resolve_function(ctx, fn_name, args);

      ctx.compiler.error_tracker.assert(
        resolved.fn_data.returns != null,
        {
          node: ctx.node,
          message: "fn.returns != null",
          type: ErrorType.INVALID_MACRO
        }
      )

      ctx.compiler.set_metadata(
        ctx.node,
        Resolved_function,
        new Resolved_function(resolved.fn_data),
      );
      
      const demands = resolved.fn_data.demands;
      if (Object.keys(resolved.subs).length > 0) {
        const subst = new TypeSubstitution(resolved.subs);
        const unified = demands.map((d) => subst.apply({ ctx, type_expr: d, caused_by: Error_caused_by.USER }));

        for_each_pair(unified, args, (u, recv, i) => {
          default_logger.log(
            ctx, "typecheck",
            `${ctx.node.content} demanded ${u} and was given ${recv}`,
          );
          const compatible = ctx.type_engine.can_assign({value_type: recv, field_type: u});
          ctx.compiler.error_tracker.assert(
            compatible,
            {
              node: ctx.node,
              message: `argument ${i + 1} demands ${u.to_string()} and is given ${recv.to_string()}`,
              type: ErrorType.ARGUMENT_TYPE_MISMATCH,
            }
          );
        });
      } else {
        for_each_pair(demands, args, (d, recv, i) => {
          default_logger.log(
            ctx, "typecheck",
            `${ctx.node.content} demanded ${d} and was given ${recv}`,
          );
          const compatible = ctx.type_engine.can_assign({value_type: recv, field_type: d});
          ctx.compiler.error_tracker.assert(
            compatible,
            {
              node: ctx.node,
              message: `argument ${i + 1} demands ${d} and is given ${recv}`,
              type: ErrorType.ARGUMENT_TYPE_MISMATCH,
            }
          );
        });
      }

      const ret = resolved.fn_data.returns;
      function is_generic(t: Type): boolean {
        if (t instanceof TypeVariable) {
          return true;
        }
        if (!(t instanceof ComplexType)) {
          return false;
        }
        for (const param of t.type_params) {
          if (is_generic(param)) {
            return true;
          }
        }
        return false;
      }
      if (args.some(a => a === UPSTREAM_INVALID) && is_generic(ret)) {
        return new Expression_return_type(UPSTREAM_INVALID);
      }
      if (Object.keys(resolved.subs).length > 0 && ret instanceof Type) {
        const sub = new TypeSubstitution(resolved.subs).apply({ ctx, type_expr: ret, caused_by: Error_caused_by.USER });
        ctx.compiler.error_tracker.assert(
          !(sub instanceof TypeVariable),
          {
            node: ctx.node,
            message: `function must return generic ${sub.to_string()} was not resolved`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        return new Expression_return_type(sub);
      }
      return new Expression_return_type(ret);
    });

    if (ctx.compiler.maybe_metadata(ctx.node, Resolved_function) == null) {
      ctx.compiler.set_metadata(
        ctx.node,
        Macro_previously_failed,
        new Macro_previously_failed("convention not resolved"),
      );
    }

    return rv;
  }

  emission(ctx: Emission_macro_context): void {
    let expr = () => `${FORCE_SYNTAX_ERROR} /* :call had emission error */`;
    try {
      if (ctx.compiler.maybe_metadata(ctx.node, Macro_previously_failed)) {
        return;
      }

      const args_str = ctx.compiler.get_metadata(ctx.node, Args).toString();
      const parts = args_str.split(" ");
      const ident = ctx.compiler.get_new_ident(parts.join("_"));

      const resolved = ctx.compiler.maybe_metadata(ctx.node, Resolved_function);
      ctx.compiler.error_tracker.assert(
        resolved != null && resolved.fn != null,
        {
          node: ctx.node,
          message: "emission: convention must be resolved",
          type: ErrorType.INVALID_MACRO,
        }
      )
      const fn = resolved.fn;

      const arg_exprs = collect_child_expressions(ctx);
      const conv = not_null(fn.convention);
      const call_src = conv.compile(arg_exprs, ctx);

      if (call_src == null) {
        // compiler bug then
        throw new Error("call_src is null");
      }

      const await_fn = {
        [Async_mode.ASYNC]: (id: string) => `(await (${id}))`, // should NEVER drop the outer brackets here!
        [Async_mode.SYNC]: (id: string) => id,
      }

      ctx.statement(call_src[0])
      const [define, use] = statement_expr(() => `${await_fn[conv.async_mode](not_null(call_src[1])())}`, ident);

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

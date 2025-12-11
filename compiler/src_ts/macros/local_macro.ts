// macros/local_macro.ts

import {
  Macro_context,
  Macro_provider,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS
} from "../core/macro_registry.ts";

import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";

import { graceful_typecheck } from "../core/exceptions.ts";
import { collect_child_expressions, get_single_arg } from "../utils/common_utils.ts";
import { Expression_return_type, Function_67lang, Type, Type_check_result, Type_reference } from "../compiler_types/proper_types.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { statement_local } from "../utils/strutil.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Async_mode, LocalAccessCall } from "../pipeline/call_conventions.ts";

export class Local_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "local", this.emission.bind(this));
    via(Type_checking_context, "local", this.typecheck.bind(this));
    via(Preprocessing_context, "local", this.preprocess.bind(this));
  }

  preprocess(ctx: Macro_context): void {
    default_logger.indent("macro", `preprocessing children of ${ctx.node.content}`, () => {
      ctx.node.children.forEach((child, i) => {
        default_logger.indent("macro", `child ${i}: ${child.content}`, () => {
          ctx.compiler.error_tracker.safely(ctx, () => {
            const cctx = ctx.clone_with({ node: child });
            cctx.apply();
          });
        });
      });
    });
  }

  emission(ctx: Emission_macro_context): void {
    let stmt = statement_local(`${FORCE_SYNTAX_ERROR} /* ${ctx.node.content} */`, null)
    let expr = () => `${FORCE_SYNTAX_ERROR} /* ${ctx.node.content} */`;
    try {
      const locals = Object.values(ctx.compiler.get_metadata(ctx.node, Provides_locals__metadata).locals);
      const local0 = locals[0];

      ctx.compiler.error_tracker.assert(
        locals.length === 1 && local0 !== undefined,
        {
          node: ctx.node,
          message: `expected exactly one local to be provided, got ${locals.length}`,
          type: ErrorType.INTERNAL_CODE_QUALITY,
        }
      );

      const args = ctx.node.children.length === 0
        ? []
        : collect_child_expressions(ctx);

      // TODO i mean it wouldn't ever get a null here
      stmt = statement_local(local0.sane_name, args[args.length - 1] ?? null);
      expr = () => local0.sane_name;
    } finally {
      ctx.statement_out.push(stmt);
      ctx.expression_out.push(expr);
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const t = graceful_typecheck(ctx, Expression_return_type, (): Type_check_result => {
      let demanded_type: Type | null = null;
      let received_type: Type | null = null;

      for (const child of ctx.node.children) {
        const res = ctx.clone_with({ node: child }).apply();

        if (res instanceof Type_reference) {
          demanded_type = res.ref;
        } else if (res instanceof Expression_return_type) {
          received_type = res.type;
        }
      }

      if (received_type == null) {
        ctx.compiler.error_tracker.fail({
          node: ctx.node,
          message: `local not initialized`,
          type: ErrorType.MISSING_TYPE,
        });
      }

      if (demanded_type == null) {
        demanded_type = received_type;
      }

      ctx.compiler.error_tracker.assert(
        ctx.type_engine.can_assign({value_type: received_type, field_type: demanded_type}),
        {
          node: ctx.node,
          message: `local typed ${demanded_type.to_string()} cannot accept a ${received_type.to_string()}`,
          type: ErrorType.ARGUMENT_TYPE_MISMATCH,
        }
      );

      default_logger.typecheck(
        `${ctx.node.content} demanded ${demanded_type} and was given ${received_type}`
      );

      return new Expression_return_type(demanded_type);
    });

    if (!(t instanceof Expression_return_type)) {
      return null;
    }
    
    const desired_name = get_single_arg(ctx);
    const sane_name = ctx.compiler.get_new_ident(desired_name);

    ctx.compiler.set_metadata(
      ctx.node,
      Provides_locals__metadata,
      new Provides_locals__metadata({
        [desired_name]: {
          sane_name,
          type: t.type,
          local_lifetime: Upwalker_visibility.NEXT_NODES_ONLY,
          getter: ctx.type_engine.add_function(null, (fn) => {
            fn.demands = [];
            fn.returns = t.type;
            fn.convention = new LocalAccessCall({ fn: sane_name, async_mode: Async_mode.SYNC });
          }),
          setter: ctx.type_engine.add_function(null, (fn) => {
            fn.demands = [t.type];
            fn.returns = t.type;
            fn.convention = new LocalAccessCall({ fn: sane_name, async_mode: Async_mode.SYNC });
          })
        }
      }),
    );

    return t;
  }
}

export enum Upwalker_visibility {
  CHILDREN_ONLY,
  NEXT_NODES_ONLY,
}

export type Local_spec = {
  sane_name: string,
  type: Type,
  getter: Function_67lang,
  setter: Function_67lang | null,
  local_lifetime: Upwalker_visibility,
}

export class Provides_locals__metadata {
  constructor(
    public locals: Record<string, Local_spec>,
  ) {
    // ...
  }
}

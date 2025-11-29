// macros/local_macro.ts

import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  Macro_preprocess_provider,
  MacroContext,
  TCResult
} from "../core/macro_registry.ts";

import { Node, 
  SaneIdentifier,
  FieldDemandType } from "../core/node.ts";
import { default_logger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";

import { graceful_typecheck } from "../core/exceptions.ts";
import { collect_child_expressions, get_single_arg } from "../utils/common_utils.ts";
import { Type, TypeParameter } from "../compiler_types/proper_types.ts";
import { TypeCheckingStep } from "../pipeline/steps/typechecking.ts";
import { assert_instanceof } from "../utils/utils.ts";
import { statement_local } from "../utils/strutil.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";

export class Local_macro_provider
  implements
    Macro_emission_provider,
    Macro_typecheck_provider,
    Macro_preprocess_provider
{
  preprocess(ctx: MacroContext): void {
    default_logger.indent("macro", `preprocessing children of ${ctx.node.content}`, () => {
      ctx.node.children.forEach((child, i) => {
        default_logger.indent("macro", `child ${i}: ${child.content}`, () => {
          ctx.compiler.safely(() => {
            const cctx = ctx.clone_with({ node: child });
            ctx.current_step!.process_node(cctx);
          });
        });
      });
    });

    const desired = get_single_arg(ctx);
    const actual = ctx.compiler.get_new_ident(desired);
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, new SaneIdentifier(actual));
  }

  emission(ctx: MacroContext): void {
    let stmt = statement_local(`${FORCE_SYNTAX_ERROR} /* ${ctx.node.content} */`, null)
    let expr = () => `${FORCE_SYNTAX_ERROR} /* ${ctx.node.content} */`;
    try {
      const desired = get_single_arg(ctx);
      const actual =
        ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier)?.value;

      if (!actual) {
        throw new Error(`Compiler bug: Local_macro_provider.emission: no SaneIdentifier metadata for local '${desired}'`);
      }

      const args = ctx.node.children.length === 0
        ? []
        : collect_child_expressions(ctx);

      // TODO i mean it wouldn't ever get a null here
      stmt = statement_local(actual, args[args.length - 1] ?? null);
      expr = () => actual;
    } finally {
      ctx.statement_out.push(stmt);
      ctx.expression_out.push(expr);
    }
  }

  typecheck(ctx: MacroContext) {
    const t = graceful_typecheck((): Type => {
      let demanded_type: TCResult = null;
      let received_type: TCResult = null;
      let assume_type = false;

      const step = assert_instanceof(ctx.current_step, TypeCheckingStep);

      for (const child of ctx.node.children) {
        if (child.content.startsWith("67lang:assume_type_valid")) {
          assume_type = true;
          continue;
        }

        const res = step.process_node(ctx.clone_with({ node: child }));

        if (res instanceof TypeParameter) {
          demanded_type = res.type_expr;
        } else if (res instanceof Type) {
          received_type = res;
        }
      }

      if (received_type == null) {
        ctx.compiler.assert_(
          false,
          ctx.node,
          `field demands ${demanded_type ?? "a value"} but is given None`,
          ErrorType.MISSING_TYPE
        );
      }

      if (demanded_type == null) {
        demanded_type = received_type;
      }

      default_logger.typecheck(
        `${ctx.node.content} demanded ${demanded_type} and was given ${received_type}`
      );

      if (!assume_type) {
        const ok = received_type.is_assignable_to(demanded_type); // received_type is never ?!

        if (!ok) {
          ctx.compiler.assert_(
            false,
            ctx.node,
            `field demands ${demanded_type} but is given ${received_type}`,
            ErrorType.FIELD_TYPE_MISMATCH
          );
        }
      }

      return demanded_type;
    });

    ctx.compiler.set_metadata(ctx.node, FieldDemandType, new FieldDemandType(t));
    return t;
  }
}

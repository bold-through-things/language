// macros/return_macro.ts
import { REGISTER_MACRO_PROVIDERS, Register_macro_providers, Macro_provider } from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Emission_item } from "../utils/strutil.ts";

export class Return_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "return", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context): void {
    const children = ctx.node.children;

    if (children.length === 0) {
      ctx.statement_out.push(() => "return;");
      return;
    }

    if (children.length === 1) {
      const exprOut: Emission_item[] = [];
      const childCtx = ctx.clone_with({
        node: children[0],
        expression_out: exprOut,
      });
      childCtx.apply();

      const return_value = exprOut[0];
      ctx.compiler.error_tracker.assert(
        return_value != null,
        {
          node: ctx.node,
          message: "return macro must produce a single expression",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );

      ctx.statement_out.push(() => `return ${return_value()};`);
      return;
    }

    ctx.compiler.error_tracker.fail({
      node: ctx.node, 
      message: "return must have 0 or 1 arguments",
      type: ErrorType.INVALID_STRUCTURE,
    });
  }
}

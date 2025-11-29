// macros/return_macro.ts
import { Macro_emission_provider, MacroContext } from "../core/macro_registry.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Emission_item } from "../utils/strutil.ts";
import { not_null } from "../utils/utils.ts";

export class Return_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
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
      not_null(ctx.current_step).process_node(childCtx);

      const return_value = exprOut[0];
      ctx.compiler.assert_(
        return_value != null,
        ctx.node,
        "return macro must produce a single expression",
        ErrorType.INVALID_STRUCTURE,
      );

      ctx.statement_out.push(() => `return ${return_value()};`);
      return;
    }

    ctx.compiler.assert_(false, ctx.node, "return must have 0 or 1 arguments");
  }
}

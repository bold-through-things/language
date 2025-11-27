// macros/return_macro.ts
import { Macro_emission_provider, MacroContext } from "../core/macro_registry.ts";
import { IndentedStringIO, statement_raw } from "../utils/strutil.ts";
import { not_null } from "../utils/utils.ts";

export class Return_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
    const children = ctx.node.children;

    if (children.length === 0) {
      ctx.statement_out.push(statement_raw("return;"));
      return;
    }

    if (children.length === 1) {
      const exprOut = new IndentedStringIO();
      const childCtx = ctx.clone_with({
        node: children[0],
        expression_out: exprOut,
      });
      not_null(ctx.current_step).process_node(childCtx);

      ctx.statement_out.push(statement_raw(`return ${exprOut.gets_to_end()};`));
      return;
    }

    ctx.compiler.assert_(false, ctx.node, "return must have 0 or 1 arguments");
  }
}

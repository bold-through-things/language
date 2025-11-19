// macros/while_macro.ts

import { MacroContext } from "../core/macro_registry.ts";
import { Macro_emission_provider } from "../core/macro_registry.ts";
import { IndentedStringIO } from "../utils/strutil.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { ErrorType } from "../utils/error_types.ts";

export class While_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
    const so = ctx.statement_out as IndentedStringIO;

    so.write("while(true) {\n");
    so.with_indent(() => {
      ctx.compiler.assert_(
        ctx.node.children.length === 2,
        ctx.node,
        `must have two children, got ${ctx.node.children.map((ch) => ch.content)}`,
        ErrorType.INVALID_STRUCTURE
      );

      const cond_node = ctx.node.children[0];

      const obuf = new IndentedStringIO();
      const cond_ctx = ctx.clone_with({
        node: cond_node,
        expression_out: obuf
      });
      ctx.current_step?.process_node(cond_ctx);

      so.write(`if (!${obuf.gets_to_end()}) { break; }\n`);

      const body_node = seek_child_macro(ctx.node, "do");
      ctx.compiler.assert_(
        body_node !== null,
        ctx.node,
        "must have a `do` block",
        ErrorType.MISSING_BLOCK
      );

      const body_ctx = ctx.clone_with({ node: body_node! });
      ctx.current_step?.process_node(body_ctx);
    });

    so.write("}");
  }
}

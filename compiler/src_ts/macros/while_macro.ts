// macros/while_macro.ts

import { MacroContext } from "../core/macro_registry.ts";
import { Macro_emission_provider } from "../core/macro_registry.ts";
import { BRACES, Emission_item, IndentedStringIO, statement_block, statement_blocks } from "../utils/strutil.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { ErrorType } from "../utils/error_types.ts";

export class While_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
    const [body] = ctx.statement(statement_blocks(
      statement_block("while(true)", BRACES),
    ));

    ctx.compiler.assert_(
      ctx.node.children.length === 2,
      ctx.node,
      `must have two children, got ${ctx.node.children.map((ch) => ch.content)}`,
      ErrorType.INVALID_STRUCTURE
    );

    const cond_node = ctx.node.children[0];

    const obuf: Emission_item[] = [];
    const cond_ctx = ctx.clone_with({
      node: cond_node,
      expression_out: obuf,
      statement_out: body,
    });
    ctx.current_step?.process_node(cond_ctx);

    const cond = obuf[0];
    ctx.compiler.assert_(
      cond != null,
      ctx.node,
      "condition must produce a single expression",
      ErrorType.INVALID_STRUCTURE
    )

    body.push(() => `if (!${cond()}) { break; }`);

    const body_node = seek_child_macro(ctx.node, "do");
    ctx.compiler.assert_(
      body_node !== null,
      ctx.node,
      "must have a `do` block",
      ErrorType.MISSING_BLOCK
    );

    const body_ctx = ctx.clone_with({ node: body_node!, statement_out: body });
    ctx.current_step?.process_node(body_ctx);
  }
}

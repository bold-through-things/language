// macros/while_macro.ts

import { BRACES, Emission_item, statement_block, statement_blocks } from "../utils/strutil.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Macro_provider, Register_macro_providers, REGISTER_MACRO_PROVIDERS } from "../core/macro_registry.ts";

export class While_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "while", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context): void {
    const [body] = ctx.statement(statement_blocks(
      statement_block("while(true)", BRACES),
    ));

    ctx.compiler.error_tracker.assert(
      body != undefined,
      {
        node: ctx.node,
        message: "`body` statement not initialized",
        type: ErrorType.INTERNAL_CODE_QUALITY
      }
    );

    ctx.compiler.error_tracker.assert(
      ctx.node.children.length === 2,
      {
        node: ctx.node,
        message: `must have two children, got ${ctx.node.children.map((ch) => ch.content)}`,
        type: ErrorType.INVALID_STRUCTURE
      }
    );

    const cond_node = ctx.node.children[0];

    const obuf: Emission_item[] = [];
    const cond_ctx = ctx.clone_with({
      node: cond_node,
      expression_out: obuf,
      statement_out: body,
    });
    cond_ctx.apply();

    const cond = obuf[0];
    ctx.compiler.error_tracker.assert(
      cond != null,
      {
        node: ctx.node,
        message: "condition must produce a single expression",
        type: ErrorType.INVALID_STRUCTURE
      }
    );

    body.push(() => `if (!${cond()}) { break; }`);

    const body_node = seek_child_macro(ctx.node, "do");
    ctx.compiler.error_tracker.assert(
      body_node !== null,
      {
        node: ctx.node,
        message: "must have a `do` block",
        type: ErrorType.MISSING_BLOCK
      }
    );

    const body_ctx = ctx.clone_with({ node: body_node!, statement_out: body });
    body_ctx.apply();
  }
}

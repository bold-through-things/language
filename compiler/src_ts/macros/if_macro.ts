// macros/if_macro.ts

import { Macro_provider, REGISTER_MACRO_PROVIDERS, Register_macro_providers } from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { ErrorType } from "../utils/error_types.ts";
import { BRACES, Emission_item, PARENTHESIS, statement_block, statement_blocks } from "../utils/strutil.ts";

export class If_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "if", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context): void {
    const args: Emission_item[] = [];

    // don't push this here else the condition will emit too late
    const stmt = statement_blocks(
      statement_block("if", PARENTHESIS),
      statement_block(null, BRACES),
      statement_block("else", BRACES),
    );
    const [ if_condition, then_body, else_body ] = stmt;

    for (const child of ctx.node.children) {
      // well TODO this is quite stupid since it lets you go
      /*
      if
      	get condition
      	else
      		do stuff
      	then
      		do other stuff
      	then
      		do more stuff
      */
      // ??????
      // but like just don't

      // we will be nuking if quite soon so yeah it's fine

      if (child.content.startsWith("then")) {
        for (const then_child of child.children) {
          const then_ctx = ctx.clone_with({ node: then_child, statement_out: then_body });
          then_ctx.apply();
        }
        continue;
      }

      if (child.content.startsWith("else")) {
        for (const else_child of child.children) {
          const else_ctx = ctx.clone_with({ node: else_child, statement_out: else_body });
          else_ctx.apply();
        }
        continue;
      }

      const expr: Emission_item[] = [];
      const child_ctx = ctx.clone_with({ node: child, expression_out: expr });
      child_ctx.apply();

      args.push(...expr.filter(e => e != null));
    }

    const cond = args[args.length - 1];
    ctx.compiler.error_tracker.assert(
      cond != null,
      {
        node: ctx.node,
        message: "if macro requires at least one expression as condition",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );

    ctx.compiler.error_tracker.assert(
      if_condition != undefined,
      {
        node: ctx.node,
        message: "`if_condition` statement not initialized",
        type: ErrorType.INTERNAL_CODE_QUALITY
      }
    )
    
    if_condition.push(() => cond());
    ctx.statement(stmt);
  }
}

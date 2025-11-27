// macros/if_macro.ts

import { MacroContext } from "../core/macro_registry.ts";
import { Macro_emission_provider } from "../core/macro_registry.ts";
import { BRACES, IndentedStringIO, PARENTHESIS, statement_block, statement_blocks, statement_raw } from "../utils/strutil.ts";

export class If_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
    const args: string[] = [];

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
          ctx.current_step?.process_node(then_ctx);
        }
        continue;
      }

      if (child.content.startsWith("else")) {
        for (const else_child of child.children) {
          const else_ctx = ctx.clone_with({ node: else_child, statement_out: else_body });
          ctx.current_step?.process_node(else_ctx);
        }
        continue;
      }

      const buf = new IndentedStringIO();
      const child_ctx = ctx.clone_with({ node: child, expression_out: buf });
      ctx.current_step?.process_node(child_ctx);

      const expr = buf.gets_to_end();
      if (expr.length > 0) {
        args.push(expr);
      }
    }

    const cond = args.length === 0 ? "" : args[args.length - 1];
    if_condition.push(statement_raw(cond));
    ctx.push(stmt);
  }
}

// macros/if_macro.ts

import { MacroContext } from "../core/macro_registry.ts";
import { Macro_emission_provider } from "../core/macro_registry.ts";
import { IndentedStringIO } from "../utils/strutil.ts";

export class If_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext): void {
    const args: string[] = [];

    for (const child of ctx.node.children) {
      if (child.content.startsWith("then")) {
        continue; // TODO: ugly; needs proper AST check
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
    ctx.statement_out.write(`if (${cond})`);
  }
}

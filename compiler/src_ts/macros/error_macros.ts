// macros/error_macros.ts
import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";

import { IndentedStringIO } from "../utils/strutil.ts";
import { not_null } from "../utils/utils.ts";

export class Must_compile_error_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  emission(ctx: MacroContext): void {
    for (const child of ctx.node.children) {
      const childCtx = ctx.clone_with({
        node: child,
        statement_out: [],
        expression_out: [],
      });
      not_null(ctx.current_step).process_node(childCtx);
    }
  }

  typecheck(ctx: MacroContext): TCResult {
    for (const child of ctx.node.children) {
      const childCtx = ctx.clone_with({ node: child });
      not_null(ctx.current_step).process_node(childCtx);
    }
    return null;
  }
}

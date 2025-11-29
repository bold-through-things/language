// macros/scope_macro.ts
import { Macro_emission_provider, Macro_typecheck_provider, MacroContext, TCResult } from "../core/macro_registry.ts";
import { Macro } from "../core/node.ts";
import { process_children_with_context } from "../utils/common_utils.ts";
import { BRACES, statement_block, statement_blocks } from "../utils/strutil.ts";

export const SCOPE_MACRO = ["else", "67lang:file"];

export class Scope_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  emission(ctx: MacroContext): void {
    const macroName = ctx.compiler.get_metadata(ctx.node, Macro).toString();

    const [ block ] = ctx.statement(statement_blocks(
      statement_block(macroName == "else" ? "else" : null, BRACES),
    ));
    for (const child of ctx.node.children) {
      const childCtx = ctx.clone_with({ node: child, statement_out: block });
      ctx.current_step?.process_node(childCtx);
    }
  }

  typecheck(ctx: MacroContext): TCResult {
    process_children_with_context(ctx, ctx.current_step!);
    return null;
  }
}

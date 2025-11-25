// macros/scope_macro.ts
import { Macro_emission_provider, Macro_typecheck_provider, MacroContext, TCResult } from "../core/macro_registry.ts";
import { Macro } from "../core/node.ts";
import { process_children_with_context } from "../utils/common_utils.ts";

export const SCOPE_MACRO = ["else", "67lang:file"];

export class Scope_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  emission(ctx: MacroContext): void {
    const macroName = ctx.compiler.get_metadata(ctx.node, Macro).toString();

    if (macroName === "else") {
      ctx.statement_out.write(`${macroName} `);
    }

    ctx.statement_out.write("{\n");
    ctx.statement_out.with_indent(() => {
      for (const child of ctx.node.children) {
        const childCtx = ctx.clone_with({ node: child });
        ctx.current_step?.process_node(childCtx);
        ctx.statement_out.write("\n");
      }
    });
    ctx.statement_out.write("} ");
  }

  typecheck(ctx: MacroContext): TCResult {
    process_children_with_context(ctx, ctx.current_step!);
    return null;
  }
}

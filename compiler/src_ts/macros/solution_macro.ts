// macros/solution_macro.ts
import { Macro_emission_provider, MacroContext } from "../core/macro_registry.ts";

export class Solution_macro_provider
  implements
    Macro_emission_provider
{
  emission(ctx: MacroContext) {
    ctx.node.children.forEach((child) => {
      ctx.current_step?.process_node(
        ctx.clone_with({ node: child })
      );
    });
  }
}

// macros/solution_macro.ts
import { Register_macro_providers, REGISTER_MACRO_PROVIDERS, Macro_provider } from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";

export class Solution_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "67lang:solution", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context) {
    ctx.node.children.forEach((child) => {
      ctx.clone_with({ node: child }).apply();
    });
  }
}

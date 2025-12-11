// macros/noscope_macro.ts

import {
  type Macro_context,
  type Macro_provider,
  REGISTER_MACRO_PROVIDERS,
  Register_macro_providers,
} from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Emission_item } from "../utils/strutil.ts";

export class Noscope_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "noscope", this.emission.bind(this));
  }

  // Emits children without introducing a scope node.
  emission(ctx: Emission_macro_context): void {
    for (const child of ctx.node.children) {
      const obuf: Emission_item[] = [];
      const child_ctx = ctx.clone_with({
        node: child,
        expression_out: obuf,
      });
      child_ctx.apply();
    }
  }

  // Intentionally *not* used. Keeping it to avoid accidental typecheck skipping.
  not_typecheck(_ctx: Macro_context): void {
    return;
  }
}

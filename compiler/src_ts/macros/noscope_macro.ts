// macros/noscope_macro.ts

import type {
  Macro_emission_provider,
  MacroContext,
} from "../core/macro_registry.ts";
import { Emission_item } from "../utils/strutil.ts";

export class Noscope_macro_provider implements Macro_emission_provider {
  // Emits children without introducing a scope node.
  emission(ctx: MacroContext): void {
    for (const child of ctx.node.children) {
      const obuf: Emission_item[] = [];
      const child_ctx = ctx.clone_with({
        node: child,
        expression_out: obuf,
      });
      ctx.current_step?.process_node(child_ctx);
    }
  }

  // Intentionally *not* used. Keeping it to avoid accidental typecheck skipping.
  not_typecheck(_ctx: MacroContext): void {
    return;
  }
}

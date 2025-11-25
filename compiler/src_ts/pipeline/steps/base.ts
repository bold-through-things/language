// pipeline/steps/base.ts
// Base class for all macro-processing steps

import { MacroRegistry, MacroContext, TCResult, Macro_ctx_proc } from "../../core/macro_registry.ts";

export abstract class MacroProcessingStep {
  macros: MacroRegistry<Macro_ctx_proc>;

  constructor() {
    // same semantics as Crystal version (yes, dumb default)
    this.macros = new MacroRegistry();
  }

  abstract process_node(ctx: MacroContext): TCResult;
}

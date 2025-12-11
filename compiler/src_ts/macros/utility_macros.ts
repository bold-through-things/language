// macros/utility_macros.ts
import { Register_macro_providers, Macro_provider, REGISTER_MACRO_PROVIDERS } from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";

export class Noop_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "noop", this.emission.bind(this));
  }
  emission(_ctx: Emission_macro_context) {}
}

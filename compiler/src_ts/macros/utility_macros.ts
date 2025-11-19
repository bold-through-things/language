// macros/utility_macros.ts
import { Macro_emission_provider, MacroContext } from "../core/macro_registry.ts";

export class Noop_macro_provider
  implements
    Macro_emission_provider
{
  emission(_ctx: MacroContext) {}
}

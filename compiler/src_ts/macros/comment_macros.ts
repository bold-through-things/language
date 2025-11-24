// macros/comment_macros.ts
import { Macro_preprocess_provider,
         Macro_typecheck_provider,
         Macro_emission_provider,
         Macro_code_linking_provider, 
         TCResult,
         MacroContext} from "../core/macro_registry.ts";

export const COMMENT_MACROS = ["#", "//", "/*", "--", "note"] as const;

export class Comment_macro_provider
  implements
    Macro_preprocess_provider,
    Macro_typecheck_provider,
    Macro_emission_provider,
    Macro_code_linking_provider
{
  preprocess(_ctx: MacroContext) {}
  emission(_ctx: MacroContext) {}
  code_linking(_ctx: MacroContext) {}
  register_functions(_ctx: MacroContext) {}
  register_type(_ctx: MacroContext) {}
  register_type_details(_ctx: MacroContext) {}
  typecheck(_ctx: MacroContext): TCResult {
    return null;
  }
}

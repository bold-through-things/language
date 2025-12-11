// macros/comment_macros.ts
import { Type_check_result } from "../compiler_types/proper_types.ts";
import { 
  Macro_context,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS,
  Macro_provider
} from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Type_checking_context, Type_registration_context } from "../pipeline/steps/typechecking.ts";

export const COMMENT_MACROS = ["#", "//", "/*", "--", "note"] as const;

export class Comment_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    for (const macroName of COMMENT_MACROS) {
      via(Preprocessing_context, macroName, this.preprocess.bind(this));
      via(Emission_macro_context, macroName, this.emission.bind(this));
      via(Type_registration_context, macroName, this.register_type.bind(this));
      via(Type_checking_context, macroName, this.typecheck.bind(this));
    }
  }

  preprocess(_ctx: Macro_context) {}
  emission(_ctx: Macro_context) {}
  register_type(_ctx: Type_registration_context): Type_check_result {
    return null;
  }
  typecheck(_ctx: Type_checking_context): Type_check_result {
    return null;
  }
}

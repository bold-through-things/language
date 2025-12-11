// macros/error_macros.ts
import { Type_check_result } from "../compiler_types/proper_types.ts";
import {
  Macro_provider,
  REGISTER_MACRO_PROVIDERS,
  Register_macro_providers,
} from "../core/macro_registry.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";

export class Must_compile_error_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, "must_compile_error", this.typecheck.bind(this));
    via(Emission_macro_context, "must_compile_error", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context): void {
    for (const child of ctx.node.children) {
      ctx.clone_with({
        node: child,
        statement_out: [],
        expression_out: [],
      }).apply();
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    for (const child of ctx.node.children) {
      ctx.clone_with({ node: child }).apply();
    }
    return null;
  }
}

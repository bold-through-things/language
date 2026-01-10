// macros/scope_macro.ts
import { Type_check_result } from "../compiler_types/proper_types.ts";
import { Register_macro_providers, Macro_provider, REGISTER_MACRO_PROVIDERS } from "../core/macro_registry.ts";
import { Macro } from "../core/node.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { process_children_with_context } from "../utils/common_utils.ts";
import { BRACES, statement_block, statement_blocks } from "../utils/strutil.ts";

export const SCOPE_MACRO = ["67lang:file", "finally"];

export class Scope_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    for (const macroName of SCOPE_MACRO) {
      via(Emission_macro_context, macroName, this.emission.bind(this));
      via(Type_checking_context, macroName, this.typecheck.bind(this));
    }
  }

  emission(ctx: Emission_macro_context): void {
    const macroName = ctx.compiler.get_metadata(ctx.node, Macro).toString();

    const [ block ] = ctx.statement(statement_blocks(
      statement_block(macroName == "else" ? "else" : null, BRACES),
    ));
    for (const child of ctx.node.children) {
      const childCtx = ctx.clone_with({ node: child, statement_out: block });
      childCtx.apply();
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    process_children_with_context(ctx);
    return null;
  }
}

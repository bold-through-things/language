/*
# macros/obtain_param_value_macro.cr
require "../core/macro_registry"
require "../utils/common_utils"

class Obtain_param_value_macro_provider
  include Macro_emission_provider
  include Macro_typecheck_provider

  def typecheck(ctx : MacroContext) : TCResult
    NEVER
  end

  def emission(ctx : MacroContext) : Nil
    param_name = get_single_arg(ctx)
    ctx.expression_out << (param_name)
  end
end
*/

import { NEVER } from "../compiler_types/proper_types.ts";
import type {
  Macro_emission_provider,
  Macro_typecheck_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";
import { get_single_arg } from "../utils/common_utils.ts";

export class Obtain_param_value_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  // Emits the parameter name as an expression.
  emission(ctx: MacroContext): void {
    const param_name = get_single_arg(ctx);
    ctx.expression_out.push(() => param_name);
  }

  typecheck(_ctx: MacroContext): TCResult {
    // need to short circuit this because the macro is internal and if we
    // inserted it, then we assume we checked the type before
    return NEVER;
  }
}


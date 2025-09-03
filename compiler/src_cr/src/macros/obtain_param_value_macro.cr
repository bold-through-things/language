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

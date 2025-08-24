"""Macro to obtain function parameter values."""

from core.macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider
from utils.common_utils import get_single_arg


class Obtain_param_value_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def typecheck(self, ctx: MacroContext):
        return "*"
    def emission(self, ctx: MacroContext):
        param_name = get_single_arg(ctx)
        ctx.expression_out.write(param_name)

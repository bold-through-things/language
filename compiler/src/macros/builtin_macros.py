from processor_base import builtins
from macro_registry import MacroContext, Macro_emission_provider
from node import Macro

class Builtin_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        macro = ctx.compiler.get_metadata(ctx.node, Macro)
        ctx.compiler.compile_fn_call(ctx, f"await _67lang.{builtins[macro]}(", ctx.node.children)
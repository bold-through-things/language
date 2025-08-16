from dataclasses import replace
from core.macro_registry import Macro_emission_provider, MacroContext
from utils.strutil import IndentedStringIO

class Noscope_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        for child in ctx.node.children:
            out = IndentedStringIO()
            ctx.current_step.process_node(replace(ctx, node=child, expression_out=out))

    # DEFINITELY NOT! if you do this it will prevent children from being inspected. trouble!
    def NOT_typecheck(self, ctx: MacroContext):
        return None
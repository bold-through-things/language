from dataclasses import replace
from macro_registry import MacroContext, Macro_emission_provider

class Solution_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        """Process all children of the solution node"""
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
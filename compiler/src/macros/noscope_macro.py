from dataclasses import replace
from macro_registry import MacroContext
from strutil import IndentedStringIO

class NoscopeMacro:
    def __call__(self, ctx: MacroContext):
        for child in ctx.node.children:
            out = IndentedStringIO()
            ctx.current_step.process_node(replace(ctx, node=child, expression_out=out))
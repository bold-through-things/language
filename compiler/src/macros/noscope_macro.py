from dataclasses import replace
from processor_base import unified_macros
from macro_registry import MacroContext
from strutil import IndentedStringIO

@unified_macros.add("noscope")
def block(ctx: MacroContext):
    for child in ctx.node.children:
        out = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=out))
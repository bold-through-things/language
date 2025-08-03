from dataclasses import replace
from processor_base import from macro_registry import MacroContext

# Legacy registries - will be moved into steps

@macros.add("67lang:solution")
def pil_solution(ctx: MacroContext):
    """Process all children of the solution node"""
    for child in ctx.node.children:
        child_ctx = replace(ctx, node=child)
        ctx.current_step.process_node(child_ctx)
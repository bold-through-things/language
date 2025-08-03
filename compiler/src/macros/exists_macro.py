"""
Exists macro - handles exists inside operations.
"""

from dataclasses import replace
from processor_base import cut
from macro_registry import MacroContext
from node import Args
from logger import default_logger

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

@macros.add("exists")
def exists_inside(ctx: MacroContext):
    # look for inside modifier among children
    target = None
    other_children = []
    
    for child in ctx.node.children:
        macro, _ = cut(child.content, " ")
        if macro == "inside":
            args_str = ctx.compiler.get_metadata(child, Args)
            ctx.compiler.assert_(args_str.strip() == "", child, "inside must have no arguments")
            ctx.compiler.assert_(len(child.children) == 1, child, "inside must have one child")
            target = child.children[0]
            default_logger.macro(f"inside modifier found, target set to: {target.content}")
        else:
            other_children.append(child)
    
    ctx.compiler.assert_(target is not None, ctx.node, "exists must have an inside modifier")
    ctx.compiler.compile_fn_call(ctx, f"await _67lang.exists_inside(", [target] + other_children)
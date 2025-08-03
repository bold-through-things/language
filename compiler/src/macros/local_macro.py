"""
Local variable macro - handles local variable declarations.
This macro is aliased as 'local'.
"""

from dataclasses import replace
from macro_registry import MacroContext
from node import SaneIdentifier
from common_utils import collect_child_expressions, get_single_arg

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

@macros.add("local")
def local(ctx: MacroContext):
    desired_name = get_single_arg(ctx)
    name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
    
    args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
    
    ctx.statement_out.write(f"let {name}")
    if len(args) > 0:
        ctx.statement_out.write(f" = {args[-1]}")
    ctx.statement_out.write(f"\n")
    ctx.expression_out.write(name)
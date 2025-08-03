from processor_base import from macro_registry import MacroContext

# Legacy registries - will be moved into steps

@macros.add("list")
def list_macro(ctx: MacroContext):
    """Handle list macro - iterate all children, collect their expressions, emit [expr1, expr2, expr3...]"""
    if not ctx.node.children:
        ctx.expression_out.write("[]")
        return
    
    from common_utils import collect_child_expressions
    expressions = collect_child_expressions(ctx)
    ctx.expression_out.write(f"[{', '.join(expressions)}]")
from macro_registry import Macro_emission_provider, MacroContext

class List_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        """Handle list macro - iterate all children, collect their expressions, emit [expr1, expr2, expr3...]"""
        if not ctx.node.children:
            ctx.expression_out.write("[]")
            return
        
        from common_utils import collect_child_expressions
        expressions = collect_child_expressions(ctx)
        ctx.expression_out.write(f"[{', '.join(expressions)}]")
    
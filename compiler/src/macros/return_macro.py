from macro_registry import MacroContext, Macro_emission_provider
from node import Node, Position, Macro, Args

class Return_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        if len(ctx.node.children) == 0:
            ctx.statement_out.write("return;")
            return

        if len(ctx.node.children) == 1:
            child_ctx = ctx.sub_compile_expression(ctx.node.children[0])
            ctx.statement_out.write(f"return {child_ctx.expression_out.getvalue()};")
            return

        ctx.compiler.assert_(False, ctx.node, "return must have 0 or 1 arguments")

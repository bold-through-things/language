from dataclasses import replace
from pipeline.steps import seek_child_macro
from core.macro_registry import Macro_emission_provider, MacroContext
from utils.strutil import IndentedStringIO

class While_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        ctx.statement_out.write("while(true) {")
        with ctx.statement_out:
            ctx.compiler.assert_(len(ctx.node.children) == 2, ctx.node, "must have two children")
            node = ctx.node.children[0]
            out = IndentedStringIO()
            inner_ctx = replace(ctx, node=node, expression_out=out)
            ctx.current_step.process_node(inner_ctx)

            ctx.statement_out.write(f"if (!{out.getvalue()}) ")
            ctx.statement_out.write("{ break; }\n")

            node = seek_child_macro(ctx.node, "do")
            ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
            inner_ctx = replace(ctx, node=node)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}")

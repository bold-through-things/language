from dataclasses import replace
from pipeline.steps import seek_child_macro
from core.macro_registry import Macro_emission_provider, MacroContext
from utils.strutil import IndentedStringIO

class If_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        args: list[str] = []
        if len(ctx.node.children) > 0:
            # ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "single child, the value") TODO!
            for child in ctx.node.children:
                if child.content.startswith("then"): # TODO - ugly. bwah!
                    continue
                e = IndentedStringIO()
                ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
                args.append(e.getvalue())

        ctx.statement_out.write(f"if ({args[-1]})")
        # TODO: validate that 'then' follows immediately as sibling
        # For now, if macro only processes the condition - then/else handled separately
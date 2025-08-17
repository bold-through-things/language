from dataclasses import replace
from core.macro_registry import Macro_emission_provider, Macro_preprocess_provider, MacroContext
from utils.strutil import IndentedStringIO


class Try_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        ctx.statement_out.write("try {\n")
        with ctx.statement_out:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}")


class Catch_macro_provider(Macro_emission_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        from core.node import Args
        args = ctx.compiler.get_metadata(ctx.node, Args)
        
        # Optional error variable name
        error_var = args.strip() if args.strip() else "error"
        
        # Add assume_local_exists for the error variable
        new_node = ctx.compiler.make_node(f"67lang:assume_local_exists {error_var}", pos=ctx.node.pos, children=[])
        ctx.node.prepend_child(new_node)
        
        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def emission(self, ctx: MacroContext):
        from core.node import Args
        args = ctx.compiler.get_metadata(ctx.node, Args)
        
        # Optional error variable name
        error_var = args.strip() if args.strip() else "error"
        
        ctx.statement_out.write(f"catch ({error_var}) {{\n")
        with ctx.statement_out:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}")


class Finally_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        ctx.statement_out.write("finally {\n")
        with ctx.statement_out:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}")


class Throw_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
        if len(ctx.node.children) == 0:
            ctx.statement_out.write("throw;")
        else:
            # Throw the first child as expression
            child = ctx.node.children[0]
            expr_out = IndentedStringIO()
            child_ctx = replace(ctx, node=child, expression_out=expr_out)
            ctx.current_step.process_node(child_ctx)
            ctx.statement_out.write(f"throw {expr_out.getvalue()};")
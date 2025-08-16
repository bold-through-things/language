from dataclasses import replace
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider
from utils.strutil import IndentedStringIO

class Must_compile_error_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def emission(self, ctx: MacroContext):
        """Process must_compile_error children during emission to catch emission-time errors.
        
        The children are processed normally but their output is discarded using dummy outputs.
        Any errors generated during emission will be available for the verification step to check.
        """
        # Create dummy outputs to discard emission results
        dummy_statement_out = IndentedStringIO()
        dummy_expression_out = IndentedStringIO()
        
        # Process all children with dummy outputs to catch potential emission-time errors
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child, statement_out=dummy_statement_out, expression_out=dummy_expression_out)
            ctx.current_step.process_node(child_ctx)

    def typecheck(self, ctx: MacroContext):
        # Process children to generate type errors during type checking step
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
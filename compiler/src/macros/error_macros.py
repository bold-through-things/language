from dataclasses import replace
from processor_base import from macro_registry import MacroContext
from strutil import IndentedStringIO

# Legacy registries - will be moved into steps

@macros.add("must_compile_error")
def must_compile_error_processing(ctx: MacroContext):
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
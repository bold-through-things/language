"""Preprocessing step implementation."""

from dataclasses import replace
from .base import MacroProcessingStep
from core.macro_registry import MacroContext, MacroRegistry
from core.node import Macro
from utils.logger import default_logger
from utils.error_types import ErrorType


class PreprocessingStep(MacroProcessingStep):
    """Handles preprocessing like access macro unrolling"""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        # Move preprocessor macros into this step
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node using the preprocessor registry"""
        default_logger.macro(f"preprocessing node: {ctx.node.content}")
        
        # Validate indentation: ensure content doesn't start with whitespace
        if ctx.node.content and ctx.node.content[0].isspace():
            ctx.compiler.compile_error(ctx.node, 
                "this language only accepts tabs for indentation, not spaces! spaces are like, totally uncool. use tabs instead, they're way more precise and semantic.", 
                ErrorType.INVALID_INDENTATION)
            # Don't return early - let the processing continue so we don't break the pipeline
        
        # Process current node  
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_preprocessors = self.macros.all()

        default_logger.macro(f"  -> Current node macro: {macro}")
        default_logger.macro(f"  -> Available preprocessors: {list(all_preprocessors.keys())}")

        if macro in all_preprocessors:
            default_logger.macro(f"applying preprocessor for macro: {macro}")
            with ctx.compiler.safely:
                all_preprocessors[macro](ctx)
        else:
            default_logger.macro(f"no preprocessor for macro: {macro}")
            # Process children if no specific preprocessor is found for the current node
            with default_logger.indent("macro", f"preprocessing children of {ctx.node.content}"):
                for i, child in enumerate(ctx.node.children):
                    with default_logger.indent("macro", f"child {i}: {child.content}"):
                        with ctx.compiler.safely:
                            child_ctx = replace(ctx, node=child)
                            self.process_node(child_ctx)
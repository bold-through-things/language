"""Type checking step implementation."""

from dataclasses import replace
from .base import MacroProcessingStep
from core.macro_registry import MacroContext, MacroRegistry
from core.node import Macro
from utils.logger import default_logger


class TypeCheckingStep(MacroProcessingStep):
    """Handles type checking"""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        # Use the unified typecheck registry
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Type check a single node"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        # Create a description for this node for indentation
        node_desc = f"node {macro}"
        if hasattr(ctx.node, 'content') and ctx.node.content:
            # Limit content preview to keep it readable
            content_preview = ctx.node.content[:50] + ("..." if len(ctx.node.content) > 50 else "")
            node_desc = f"node {macro}: {content_preview}"
        
        with default_logger.indent("typecheck", node_desc):
            if macro in all_macros:
                with ctx.compiler.safely:
                    return all_macros[macro](ctx)
            else:
                for child in ctx.node.children:
                    child_ctx = replace(ctx, node=child)
                    self.process_node(child_ctx)
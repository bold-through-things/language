"""Type registration step implementation."""

from dataclasses import replace
from .base import MacroProcessingStep
from core.macro_registry import MacroContext, MacroRegistry
from core.node import Macro


class TypeRegistrationStep(MacroProcessingStep):
    """Handles the first pass of type checking: registering types and functions."""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()

        if macro in all_macros:
            # Call the register_type method on the macro provider
            all_macros[macro](ctx)

        # Recursively process children to find nested definitions
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            self.process_node(child_ctx)


class TypeDetailRegistrationStep(MacroProcessingStep):
    """Handles the second pass of type registration: filling in field details with proper types."""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()

        if macro in all_macros:
            # Call the registered function directly
            all_macros[macro](ctx)

        # Recursively process children
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            self.process_node(child_ctx)
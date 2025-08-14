from dataclasses import replace
from processor_base import MacroProcessingStep, seek_child_macro, seek_all_child_macros
from macro_registry import MacroContext, MacroRegistry
from node import Macro, SaneIdentifier, Params, ResolvedConvention
from common_utils import get_single_arg
from logger import default_logger

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

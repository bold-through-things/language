from dataclasses import replace
from macro_registry import MacroContext, MacroRegistry
from node import Indexers, Callers, Macro, Args, SaneIdentifier, Target, Params, Position, Node
from common_utils import get_single_arg
from logger import default_logger
from strutil import cut
from steps.base_step import BaseProcessingStep
from registry_container import RegistryContainer

class PreprocessingStep(BaseProcessingStep):
    """Handles preprocessing of macros before main compilation"""
    
    def __init__(self, registries: RegistryContainer):
        super().__init__(registries)
        # Register macros with this step's registry
        self._register_macros()
        
    def get_macros(self) -> MacroRegistry:
        return self.registries.get_preprocessing()
        
    def _register_macros(self):
        """Register all preprocessing macros"""
        # Import existing preprocessing macros
        from preprocessing_macros import preprocessor
        
        # Copy all macros from the existing preprocessor registry
        for name, macro in preprocessor.all().items():
            self.get_macros()._registry[name] = macro
            
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for preprocessing"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        macros = self.get_macros().all()
        
        default_logger.macro(f"preprocessing macro: {macro}")
        
        if macro in macros:
            macros[macro](ctx)
        else:
            # Process children for nodes without specific preprocessing
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
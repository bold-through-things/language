from dataclasses import replace
from macro_registry import MacroContext, MacroRegistry
from node import Macro, Args, Node
from logger import default_logger
from error_types import ErrorType
from steps.base_step import BaseProcessingStep
from registry_container import RegistryContainer

class TypeCheckingStep(BaseProcessingStep):
    """Handles type checking during compilation"""
    
    def __init__(self, registries: RegistryContainer):
        super().__init__(registries)
        self._register_macros()
        
    def get_macros(self) -> MacroRegistry:
        return self.registries.get_typecheck()
        
    def _register_macros(self):
        """Register all type checking macros"""
        # Import existing typecheck macros
        from typecheck_macros import typecheck
        
        # Copy all macros from the existing typecheck registry
        for name, macro in typecheck.all().items():
            self.get_macros()._registry[name] = macro
            
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for type checking"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        macros = self.get_macros().all()
        
        default_logger.typecheck(f"type checking macro: {macro}")
        
        if macro in macros:
            macros[macro](ctx)
        else:
            # Process children for nodes without specific type checking
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
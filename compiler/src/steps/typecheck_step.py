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
        # Import all existing macro modules to populate the unified registry
        import macros.access_macros
        import macros.builtin_macros  
        import macros.collection_macros
        import macros.comment_macros
        import macros.error_macros
        import macros.for_macro
        import macros.if_macro
        import macros.literal_value_macros
        import macros.noscope_macro
        import macros.scope_macro
        import macros.solution_macro
        import macros.utility_macros
        import macros.while_macro
        
        # Use the existing unified typecheck registry
        from processor_base import unified_typecheck
        
        # Copy all macros from the unified registry to our registry
        for name, macro in unified_typecheck.all().items():
            self.get_macros()._registry[name] = macro
            
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for type checking"""
        # Skip processing nodes with indentation errors
        if ctx.node.content and ctx.node.content[0].isspace():
            return
            
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        macros = self.get_macros().all()
        
        default_logger.typecheck(f"type checking macro: {macro}")
        
        if macro in macros:
            macros[macro](ctx)
            # Don't process children - the macro handler is responsible for that
        else:
            # Check if this is a valid macro in ANY registry
            if not self._is_valid_macro(macro):
                ctx.compiler.compile_error(
                    ctx.node,
                    f"unknown macro '{macro}' - is this supposed to exist? did you maybe typo something?",
                    ErrorType.INVALID_MACRO
                )
                return
            
            # Process children for nodes without specific type checking
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
                
    def _is_valid_macro(self, macro: str) -> bool:
        """Check if macro exists in any registry"""
        # Import all macro modules to ensure unified registries are populated
        import macros.access_macros
        import macros.builtin_macros  
        import macros.collection_macros
        import macros.comment_macros
        import macros.error_macros
        import macros.for_macro
        import macros.if_macro
        import macros.literal_value_macros
        import macros.noscope_macro
        import macros.scope_macro
        import macros.solution_macro
        import macros.utility_macros
        import macros.while_macro
        from preprocessing_macros import preprocessor
        
        # Check all the various registries
        from processor_base import unified_macros, unified_typecheck
        
        all_registries = [
            unified_macros,
            unified_typecheck,
            preprocessor
        ]
        
        for registry in all_registries:
            if macro in registry.all():
                return True
                
        return False
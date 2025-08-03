from dataclasses import replace
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO
from contextlib import contextmanager
from node import Macro
from logger import default_logger
from error_types import ErrorType
from steps.base_step import BaseProcessingStep
from registry_container import RegistryContainer

class JavaScriptEmissionStep(BaseProcessingStep):
    """Handles JavaScript code emission"""
    
    def __init__(self, registries: RegistryContainer):
        super().__init__(registries)
        self._register_macros()
        
    def get_macros(self) -> MacroRegistry:
        return self.registries.get_codegen()
        
    def _register_macros(self):
        """Register all JavaScript emission macros"""
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
        
        # Use the existing unified macros registry
        from processor_base import unified_macros
        
        # Copy all macros from the unified registry to our registry
        for name, macro in unified_macros.all().items():
            self.get_macros()._registry[name] = macro
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for JavaScript emission"""            
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.get_macros().all()
        
        default_logger.codegen(f"emitting JavaScript for macro: {macro}")

        # --- cursed Python begins ---

        @contextmanager
        def possibly_wrapped(ctx: MacroContext):
            # no wrapping needed
            yield ctx

        with possibly_wrapped(ctx) as final_ctx:
            if macro in all_macros:
                all_macros[macro](final_ctx)
                
        # Process children for nodes that need it
        should_process_children = macro not in ["string", "regex", "int", "float", "true", "false"]
        if should_process_children:
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
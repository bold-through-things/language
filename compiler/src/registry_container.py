from macro_registry import MacroRegistry

class RegistryContainer:
    """Central container for all macro registries to avoid circular dependencies"""
    
    def __init__(self):
        # Core registries for different compilation phases
        self.preprocessing = MacroRegistry()
        self.code_linking = MacroRegistry() 
        self.typecheck = MacroRegistry()
        self.codegen = MacroRegistry()
        self.error_verification = MacroRegistry()
        
    def get_preprocessing(self) -> MacroRegistry:
        return self.preprocessing
        
    def get_code_linking(self) -> MacroRegistry:
        return self.code_linking
        
    def get_typecheck(self) -> MacroRegistry:
        return self.typecheck
        
    def get_codegen(self) -> MacroRegistry:
        return self.codegen
        
    def get_error_verification(self) -> MacroRegistry:
        return self.error_verification
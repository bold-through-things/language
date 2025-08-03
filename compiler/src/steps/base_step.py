from abc import ABC, abstractmethod
from macro_registry import MacroContext, MacroRegistry
from registry_container import RegistryContainer

class BaseProcessingStep(ABC):
    """Base class for macro processing steps in the compilation pipeline"""
    
    def __init__(self, registries: RegistryContainer):
        self.registries = registries
        
    @abstractmethod
    def get_macros(self) -> MacroRegistry:
        """Return the macro registry for this step"""
        pass
        
    @abstractmethod
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during this step"""
        pass
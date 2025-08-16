"""Base classes for processing steps."""

from abc import ABC, abstractmethod
from core.macro_registry import MacroContext, MacroRegistry


class MacroProcessingStep(ABC):
    """Base class for macro processing steps in the compilation pipeline"""
    
    def __init__(self):
        # Steps should override this if they need specific registries
        self.macros = MacroRegistry()
        
    @abstractmethod
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during this step"""
        pass
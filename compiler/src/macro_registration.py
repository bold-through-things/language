"""
Macro registration system - consolidates all macro registrations to eliminate circular dependencies.
This system uses the working macro implementations from the original codebase but adapts them to dependency injection.
"""

from macro_registry import MacroRegistry, MacroContext
from working_macros import register_working_preprocessor_macros, register_working_codegen_macros, register_working_typecheck_macros


def create_preprocessor_registry() -> MacroRegistry:
    """Create and populate the preprocessor macro registry"""
    registry = MacroRegistry()
    
    # Register all working preprocessor macros
    register_working_preprocessor_macros(registry)
    
    # Add any additional macros that need special preprocessing
    # Most processing will happen in later steps
    
    return registry
from working_macros import register_working_preprocessor_macros, register_working_codegen_macros, register_working_typecheck_macros


def create_preprocessor_registry() -> MacroRegistry:
    """Create and populate the preprocessor macro registry"""
    registry = MacroRegistry()
    
    # Register all working preprocessor macros
    register_working_preprocessor_macros(registry)
    
    # Add any additional macros that need special preprocessing
    # Most processing will happen in later steps
    
    return registry


def create_typecheck_registry() -> MacroRegistry:
    """Create and populate the typecheck macro registry"""
    registry = MacroRegistry()
    
    # Register all working typecheck macros
    register_working_typecheck_macros(registry)
    
    return registry


def create_codegen_registry() -> MacroRegistry:
    """Create and populate the JavaScript codegen macro registry"""
    registry = MacroRegistry()
    
    # Register all working codegen macros
    register_working_codegen_macros(registry)
    
    return registry
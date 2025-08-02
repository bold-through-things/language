# Refactored processor.py - now imports from individual macro modules
# Import all the base components
from processor_base import *

# Import macro processing steps
from preprocessing_macros import PreprocessingStep
from code_block_linking import CodeBlockLinkingStep
from typecheck_macros import TypeCheckingStep  
from literal_macros import JavaScriptEmissionStep

# Import all the individual macro registrations
from literal_macros import macros as literal_macros_registry, typecheck as literal_typecheck_registry
from macros.access_macros import macros as access_macros_registry, typecheck as access_typecheck_registry
import macros  # Import the new macros package to ensure registration
from preprocessing_macros import preprocessor
from typecheck_macros import typecheck as typecheck_macros_registry

# Import the main compiler class
from compiler import Compiler

# Merge all the registries for backward compatibility
macros = MacroRegistry()
typecheck = MacroRegistry()

# Merge literal macros
for name, handler in literal_macros_registry.all().items():
    macros._registry[name] = handler

for name, handler in literal_typecheck_registry.all().items():
    typecheck._registry[name] = handler
    
# Merge access macros  
for name, handler in access_macros_registry.all().items():
    macros._registry[name] = handler
    
for name, handler in access_typecheck_registry.all().items():
    typecheck._registry[name] = handler

# Note: control flow macros now register directly with unified_macros

# Merge type check macros
for name, handler in typecheck_macros_registry.all().items():
    typecheck._registry[name] = handler

# Legacy singleton instances for backward compatibility - these are created in their respective modules
from macros.access_macros import Macro_67lang_call
from preprocessing_macros import SubstitutingMacro, CallingMacro, ParamMacro, AccessMacro

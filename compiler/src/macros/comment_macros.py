from processor_base import unified_macros, unified_typecheck
from macro_registry import MacroRegistry

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

# Create a code linking registry for skipping comment macros  
code_linking = MacroRegistry()

@code_linking.add(*COMMENT_MACROS)
@macros.add(*COMMENT_MACROS)
@typecheck.add(*COMMENT_MACROS)
def comments(_):
    # comments are ignored during all processing steps. TODO - we could and perhaps should transfer comments to output?
    pass
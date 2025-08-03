from processor_base import from macro_registry import MacroRegistry

# Legacy registries - will be moved into steps

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

# Create a code linking registry for skipping comment macros  
code_linking = MacroRegistry()

@code_linking.add(*(COMMENT_MACROS + ["string", "regex"])) # TODO - ugly. don't concat lists like that. find a better way
@macros.add(*COMMENT_MACROS)
@typecheck.add(*COMMENT_MACROS)
def comments(_):
    # comments are ignored during all processing steps. TODO - we could and perhaps should transfer comments to output?
    pass
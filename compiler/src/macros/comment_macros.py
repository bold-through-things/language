from macro_registry import Macro_emission_provider, Macro_typecheck_provider, MacroRegistry

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

# Create a code linking registry for skipping comment macros  
code_linking = MacroRegistry()

class Comment_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def emission(self, _):
        pass

    def typecheck(self, _):
        pass

@code_linking.add(*(COMMENT_MACROS + ["string", "regex"])) # TODO - ugly. don't concat lists like that. find a better way
def comments(_):
    # comments are ignored during all processing steps. TODO - we could and perhaps should transfer comments to output?
    pass
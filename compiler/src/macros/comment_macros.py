from macro_registry import Macro_code_linking_provider, Macro_emission_provider, Macro_typecheck_provider, MacroRegistry

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

class Comment_macro_provider(Macro_emission_provider, Macro_typecheck_provider, Macro_code_linking_provider):
    def emission(self, _):
        pass

    def typecheck(self, _):
        pass

    def code_linking(self, _):
        pass
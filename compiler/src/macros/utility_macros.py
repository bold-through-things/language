from core.macro_registry import Macro_emission_provider

class Noop_macro_provider(Macro_emission_provider):
    def emission(self, _):
        pass
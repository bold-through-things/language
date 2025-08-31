# macros/utility_macros.cr
require "../core/macro_registry"

class Noop_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
  end
end

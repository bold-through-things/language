# macros/comment_macros.cr
require "../core/macro_registry"

COMMENT_MACROS = ["#", "//", "/*", "--", "note"] of String

class Comment_macro_provider
  include Macro_preprocess_provider
  include Macro_typecheck_provider
  include Macro_emission_provider
  include Macro_code_linking_provider

  def preprocess(ctx : MacroContext) : Nil; end
  def emission(ctx : MacroContext) : Nil; end
  def code_linking(ctx : MacroContext) : Nil; end
  def register_type(ctx : MacroContext) : Nil; end
  def register_type_details(ctx : MacroContext) : Nil; end

  def typecheck(ctx : MacroContext) : TCResult
    nil
  end
end

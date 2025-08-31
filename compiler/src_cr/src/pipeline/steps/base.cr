# pipeline/steps/base.cr
require "../../core/macro_registry"

abstract class MacroProcessingStep
  property macros : MacroRegistry

  def initialize
    # TODO - this fucking stupid, introduces errors!
    #  (if you forget to overwrite the value in subclasses...)
    @macros = MacroRegistry.new
  end

  abstract def process_node(ctx : MacroContext) : TCResult
end

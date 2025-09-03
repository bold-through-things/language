# pipeline/steps/type_registration.cr
require "./base"
require "../../core/macro_registry"
require "../../core/node"

class TypeRegistrationStep < MacroProcessingStep
  getter macros : MacroRegistry

  def initialize(@macros : MacroRegistry)
    # super()
  end

  def process_node(ctx : MacroContext) : Nil
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all = @macros.all
    if all.has_key?(macro_name)
      all[macro_name].call(ctx)
    end

    # TODO. this seems like trouble. should we only handle children if not matched?
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      process_node(child_ctx)
    end
    nil
  end
end

class TypeDetailRegistrationStep < MacroProcessingStep
  getter macros : MacroRegistry

  def initialize(@macros : MacroRegistry)
    # super()
  end

  def process_node(ctx : MacroContext) : Nil
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all = @macros.all
    if all.has_key?(macro_name)
      all[macro_name].call(ctx)
    end

    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      process_node(child_ctx)
    end
    nil
  end
end


class FunctionRegistrationStep < MacroProcessingStep
  getter macros : MacroRegistry

  def initialize(@macros : MacroRegistry)
    # super()
  end

  def process_node(ctx : MacroContext) : TCResult
    macro_name = ctx.compiler.get_metadata(ctx.node, Macro).to_s
    all = @macros.all
    rv = nil
    if all.has_key?(macro_name)
      rv = all[macro_name].call(ctx)
    end

    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      process_node(child_ctx)
    end
    rv
  end
end

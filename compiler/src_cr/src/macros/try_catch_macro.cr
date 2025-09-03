# macros/try_catch_macro.cr
require "../core/macro_registry"
require "../utils/strutil"
require "../core/node"

class Try_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    ctx.statement_out.write("try {\n")
    ctx.statement_out.with_indent do
      ctx.node.children.each do |child|
        child_ctx = ctx.clone_with(node: child)
        ctx.current_step.not_nil!.process_node(child_ctx)
        ctx.statement_out.write("\n")
      end
    end
    ctx.statement_out.write("}")
  end
end

class Catch_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider

  def preprocess(ctx : MacroContext) : Nil
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s
    error_var = args.strip.empty? ? "error" : args.strip

    local_node = ctx.compiler.make_node("local #{error_var}", pos: ctx.node.pos, children: [
      ctx.compiler.make_node("67lang:obtain_param_value #{error_var}", pos: ctx.node.pos, children: [] of Node),
      ctx.compiler.make_node("type Error", pos: ctx.node.pos, children: [] of Node)
    ] of Node)

    ctx.node.prepend_child(local_node)

    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  def emission(ctx : MacroContext) : Nil
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s
    error_var = args.strip.empty? ? "error" : args.strip

    ctx.statement_out << "catch (#{error_var}) {\n"
    ctx.statement_out.with_indent do
      ctx.node.children.each do |child|
        child_ctx = ctx.clone_with(node: child)
        ctx.current_step.not_nil!.process_node(child_ctx)
        ctx.statement_out << "\n"
      end
    end
    ctx.statement_out << "}"
  end
end

class Finally_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    ctx.statement_out << "finally {\n"
    ctx.statement_out.with_indent do
      ctx.node.children.each do |child|
        child_ctx = ctx.clone_with(node: child)
        ctx.current_step.not_nil!.process_node(child_ctx)
        ctx.statement_out << "\n"
      end
    end
    ctx.statement_out << "}"
  end
end

class Throw_macro_provider
  include Macro_emission_provider

  def emission(ctx : MacroContext) : Nil
    if ctx.node.children.empty?
      ctx.statement_out << ("throw;")
    else
      child = ctx.node.children[0]
      expr_out = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: child, expression_out: expr_out)
      ctx.current_step.not_nil!.process_node(child_ctx)
      ctx.statement_out << ("throw #{expr_out.gets_to_end};")
    end
  end
end

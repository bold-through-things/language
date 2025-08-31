# macros/bind_macro.cr
require "../core/macro_registry"
require "../utils/strutil"
require "../pipeline/builtin_calls"
require "../pipeline/call_conventions"

class Bind_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider
  include Macro_typecheck_provider

  def preprocess(ctx : MacroContext) : Nil
    parts = ctx.node.content.split
    ctx.compiler.assert_(
      parts.size == 5 && parts[0] == "bind" && parts[1] == "fn" && parts[3] == "as" && parts[4] == "callable",
      ctx.node,
      "bind syntax should be: bind fn <function_name> as callable"
    )

    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  def typecheck(ctx : MacroContext)
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
    "*"
  end

  def emission(ctx : MacroContext) : Nil
    parts = ctx.node.content.split
    desired_fn_name = parts[2]

    actual_fn_name = find_actual_fn_name(ctx, desired_fn_name)
    ctx.compiler.assert_(
      !actual_fn_name.nil?,
      ctx.node,
      "Function '#{desired_fn_name}' not found for binding - not in dynamic conventions or builtin calls"
    )

    # Collect unbound placeholder positions ("_" or "_ ...")
    unbound_param_names = [] of String
    ctx.node.children.each do |child|
      if child.content == "_" || child.content.starts_with?("_ ")
        unbound_param_names << "arg#{unbound_param_names.size}"
      end
    end

    # Emit: ((args...) => Actual.fn(args...))
    ctx.expression_out << "(("
    unless unbound_param_names.empty?
      ctx.expression_out << unbound_param_names.join(", ")
    end
    ctx.expression_out << ") => #{actual_fn_name}("

    joiner = Joiner.new(ctx.expression_out, ", ")
    unbound_index = 0
    ctx.node.children.each do |child|
      joiner.use do
        if child.content == "_" || child.content.starts_with?("_ ")
          ctx.expression_out << unbound_param_names[unbound_index]
          unbound_index += 1
        else
          child_ctx = ctx.clone_with(node: child)
          ctx.current_step.not_nil!.process_node(child_ctx)
        end
      end
    end

    ctx.expression_out << "))"
  end

  private def find_actual_fn_name(ctx : MacroContext, desired : String) : String?
    # 1) dynamic conventions
    if (dyn = ctx.compiler.dynamic_conventions_for(desired)) && !dyn.empty?
      dyn.each do |conv|
        case conv
        when DirectCall
          return conv.receiver ? "#{conv.receiver}.#{conv.fn}" : conv.fn
        end
      end
    end

    # 2) builtin calls
    if (arr = BUILTIN_CALLS[desired]?)
      arr.each do |conv|
        case conv
        when DirectCall
          return conv.receiver ? "#{conv.receiver}.#{conv.fn}" : conv.fn
        end
      end
      # If no DirectCall overload exists, we can't create a simple callable binding.
      # Fall through and return nil to trigger a compile error.
    end

    nil
  end
end

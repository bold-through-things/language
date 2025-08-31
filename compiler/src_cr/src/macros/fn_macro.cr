# macros/fn_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"
require "../utils/common_utils"
require "../pipeline/steps/utils"
require "../pipeline/js_conversion"
require "../pipeline/builtin_calls"

class Fn_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider

  # Extract parameter type demands from `param` children.
  private def get_param_demands(ctx : MacroContext) : Array(TypeDemand)
    demands = [] of TypeDemand
    seek_all_child_macros(ctx.node, "param").each do |param_node|
      if type_node = seek_child_macro(param_node, "type")
        _, param_type = cut(type_node.content, " ")
        demands << param_type
      else
        demands << "*"
      end
    end
    demands
  end

  def preprocess(ctx : MacroContext) : Nil
    # Hoist fn definitions to the root
    if (p = ctx.node.parent) && p != ctx.compiler.root_node
      ctx.compiler.root_node.not_nil!.prepend_child(ctx.node)
    end

    desired_name = get_single_arg(ctx)
    actual_name  = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, SaneIdentifier.new(actual_name))

    # Set up Params metadata
    params = Params.new
    ctx.compiler.set_metadata(ctx.node, Params, params)

    # Find the do block - functions must have bodies
    do_block = seek_child_macro(ctx.node, "do")
    ctx.compiler.assert_(!do_block.nil?, ctx.node, "function must have a do block")

    # Create proper local declarations for parameters inside the do block
    seek_all_child_macros(ctx.node, "param").each do |param_node|
      name = get_single_arg(ctx.clone_with(node: param_node))
      params.mapping[name] = true

      # local declaration
      local_node = ctx.compiler.make_node("local #{name}", pos: param_node.pos, children: [] of Node)

      # optional type child
      if type_node = seek_child_macro(param_node, "type")
        type_copy = type_node.copy_recursive
        local_node.append_child(type_copy)
      end

      # obtain_param_value
      obtain_value_node = ctx.compiler.make_node("67lang:obtain_param_value #{name}", pos: param_node.pos, children: [] of Node)
      local_node.append_child(obtain_value_node)

      # inject at beginning of do-block
      do_block.not_nil!.prepend_child(local_node)
    end

    # Only process non-param children now (params handled above)
    ctx.node.children.each do |child|
      macro_name = ctx.compiler.get_metadata(child, Macro).to_s
      next if macro_name == "param"
      child_ctx = ctx.clone_with(node: child)
      ctx.current_step.not_nil!.process_node(child_ctx)
    end
  end

  # Called during type registration phase (by your pipeline)
  def register_type(ctx : MacroContext) : Nil
    desired_name = get_single_arg(ctx)
    actual_name  = (ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || desired_name).to_s
    param_demands = get_param_demands(ctx)

    # DirectCall(fn: actual, receiver: nil, demands: [...], returns: "*")
    ctx.compiler.add_dynamic_convention(desired_name, DirectCall.new(fn: actual_name, receiver: nil, demands: param_demands, returns: "*"))
  end

  def emission(ctx : MacroContext) : Nil
    name = get_single_arg(ctx)
    name = (ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || name).to_s

    so = ctx.statement_out.as(IndentedStringIO)
    so.write("const #{name} = async function (")

    params_meta = ctx.compiler.get_metadata(ctx.node, Params).as(Params)
    param_names = params_meta.mapping.keys

    if !param_names.empty?
      so.write(NEWLINE)
      so.with_indent do
        param_names.each_with_index do |pname, i|
          so.write(pname)
          if i < param_names.size - 1
            so.write(", " + NEWLINE)
          else
            so.write(NEWLINE)
          end
        end
      end
    end

    so.write(") ")

    body = seek_child_macro(ctx.node, "do")
    ctx.compiler.assert_(!body.nil?, ctx.node, "must have a do block")

    inject = Inject_code_start.new
    ctx.compiler.set_metadata(body.not_nil!, Inject_code_start, inject)

    so.write("{")
    so.with_indent do
      # legacy injection; keep behavior
      param_names.each { |pname| inject.code << "#{pname} = #{pname}" + NEWLINE }
      inner_ctx = ctx.clone_with(node: body.not_nil!)
      ctx.current_step.not_nil!.process_node(inner_ctx)
    end
    so.write("}" + NEWLINE)
  end
end

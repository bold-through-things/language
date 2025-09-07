# macros/fn_macro.cr

require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"
require "../utils/common_utils"
require "../pipeline/steps/utils"
require "../pipeline/js_conversion"
require "../pipeline/builtin_calls"

# tiny metadata carrier for the parsed convention name
struct FnConventionName
  getter name : String?
  def initialize(@name : String?); end
end

class Fn_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider
  include Macro_functions_provider

  # ---------------- helpers ----------------

  # Accepts:
  #   "fn name"                         -> { "name", nil }
  #   "fn name is PrototypeCall"        -> { "name", "PrototypeCall" }
  private def parse_header(ctx : MacroContext) : {String, String?}
    # this comes from your utils; if you named it differently, you know where it lives
    args = ctx.compiler.get_metadata(ctx.node, Args).to_s.split(" ")
    case args.size
    when 1
      { args[0], nil }
    when 3
      if args[1] == "is"
        { args[0], args[2] }
      else
        ctx.compiler.compile_error(ctx.node, "fn header must be `<name>` or `<name> is <Convention>`", ErrorType::INVALID_MACRO)
        raise "bad header"
      end
    else
      ctx.compiler.compile_error(ctx.node, "fn header must be `<name>` or `<name> is <Convention>`", ErrorType::INVALID_MACRO)
      raise "bad header"
    end
  end

  # Extract parameter type demands from `param` children.
  private def get_param_demands(ctx : MacroContext) : Array(TypeDemand)
    demands = [] of TypeDemand
    seek_all_child_macros(ctx.node, "param").each do |param_node|
      if type_node = seek_child_macro(param_node, "type")
        child_res = ctx.current_step.not_nil!.process_node(ctx.clone_with(node: type_node))
        raise "? #{ctx.current_step}" if !child_res.is_a?(TypeParameter)
        demands << child_res.type_expr.not_nil!
      else
        ctx.compiler.compile_error(ctx.node, "no type provided for param", ErrorType::MISSING_TYPE)
      end
    end
    demands
  end

  private def get_return_type(ctx : MacroContext) : TypeDemand
    if ret_node = seek_child_macro(ctx.node, "returns")
      if type_node = seek_child_macro(ret_node, "type")
        child_res = ctx.current_step.not_nil!.process_node(ctx.clone_with(node: type_node))
        raise "? child_res=#{child_res}" if !child_res.is_a?(TypeParameter)
        return child_res.type_expr.not_nil!
      end
    end
    ctx.compiler.compile_error(ctx.node, "no type provided for return", ErrorType::MISSING_TYPE)
    raise "???"
  end

  private def build_convention(ctx : MacroContext, conv_name : String?, desired_name : String,
                               actual_name : String, param_demands : Array(TypeDemand),
                               return_type : TypeDemand) : Call_convention
    case conv_name
    when nil
      # plain function
      DirectCall.new(fn: actual_name, receiver: nil, demands: param_demands, returns: return_type)

    when "PrototypeCall"
      cnode = seek_child_macro(ctx.node, "constructor")
      ctx.compiler.assert_(!cnode.nil?, ctx.node, "PrototypeCall needs a `constructor` child")
      constructor = get_single_arg(ctx.clone_with(node: cnode.not_nil!))

      hfn_node = seek_child_macro(ctx.node, "fn") # host-side method name
      host_fn  = hfn_node ? get_single_arg(ctx.clone_with(node: hfn_node)) : desired_name

      PrototypeCall.new(constructor: constructor, fn: host_fn,
                        demands: param_demands, returns: return_type)

    when "DirectCall"
      recv = nil
      if rnode = seek_child_macro(ctx.node, "receiver")
        recv = get_single_arg(ctx.clone_with(node: rnode))
      end
      DirectCall.new(fn: actual_name, receiver: recv, demands: param_demands, returns: return_type)

    when "FieldCall"
      fnode = seek_child_macro(ctx.node, "field")
      ctx.compiler.assert_(!fnode.nil?, ctx.node, "FieldCall needs a `field` child")
      field = get_single_arg(ctx.clone_with(node: fnode.not_nil!))
      FieldCall.new(field, param_demands, return_type)

    when "NewCall"
      cnode = seek_child_macro(ctx.node, "constructor")
      ctx.compiler.assert_(!cnode.nil?, ctx.node, "NewCall needs a `constructor` child")
      constructor = get_single_arg(ctx.clone_with(node: cnode.not_nil!))
      NewCall.new(constructor, param_demands, return_type)

    else
      ctx.compiler.compile_error(ctx.node, "unknown call convention: #{conv_name}", ErrorType::INVALID_MACRO)
      raise "unknown convention"
    end
  end

  # ---------------- preprocess ----------------

  def preprocess(ctx : MacroContext) : Nil
    # Hoist fn definitions to the root
    if (p = ctx.node.parent) && p != ctx.compiler.root_node
      ctx.compiler.root_node.not_nil!.prepend_child(ctx.node)
    end

    name, conv_name = parse_header(ctx)
    actual_name = ctx.compiler.get_new_ident(name)

    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, SaneIdentifier.new(actual_name))
    ctx.compiler.set_metadata(ctx.node, FnConventionName, FnConventionName.new(conv_name))

    # Params metadata
    params = Params.new
    ctx.compiler.set_metadata(ctx.node, Params, params)

    do_block = seek_child_macro(ctx.node, "do")

    # Enforce body for plain functions; allow bodyless only when a convention is specified.
    if conv_name.nil?
      ctx.compiler.assert_(!do_block.nil?, ctx.node, "function must have a do block")
    end

    # Create locals for parameters inside the do block (only if body exists)
    if do_block
      seek_all_child_macros(ctx.node, "param").each do |param_node|
        pname = get_single_arg(ctx.clone_with(node: param_node))
        params.mapping[pname] = true

        local_node = ctx.compiler.make_node("local #{pname}", pos: param_node.pos, children: [] of Node)

        if type_node = seek_child_macro(param_node, "type")
          local_node.append_child(type_node.copy_recursive)
        end

        obtain_value_node = ctx.compiler.make_node("67lang:obtain_param_value #{pname}", pos: param_node.pos, children: [] of Node)
        local_node.append_child(obtain_value_node)

        do_block.prepend_child(local_node)
      end

      # Only process the do-block; config children are not executable code
      ctx.current_step.not_nil!.process_node(ctx.clone_with(node: do_block))
    end
  end

  # ---------------- type registration ----------------

  def register_functions(ctx : MacroContext) : TCResult
    name, conv_from_header = parse_header(ctx)
    actual_name   = (ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || name).to_s
    param_demands = get_param_demands(ctx)
    return_type   = get_return_type(ctx)

    convention = build_convention(ctx, conv_from_header, name, actual_name, param_demands, return_type)
    ctx.compiler.add_dynamic_convention(name, convention)
    p67! "added convention", name, convention
  end

  # ---------------- emission ----------------

  def emission(ctx : MacroContext) : Nil
    body = seek_child_macro(ctx.node, "do")
    return if body.nil? # binding-only

    name = get_single_arg(ctx) # safe: header is validated, first arg is the name
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

    inject = Inject_code_start.new
    ctx.compiler.set_metadata(body.not_nil!, Inject_code_start, inject)

    so.write("{")
    so.with_indent do
      param_names.each { |pname| inject.code << "#{pname} = #{pname}" + NEWLINE }
      ctx.current_step.not_nil!.process_node(ctx.clone_with(node: body.not_nil!))
    end
    so.write("}" + NEWLINE)
  end
end

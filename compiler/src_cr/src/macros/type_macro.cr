# macros/type_macro.cr
require "../core/macro_registry"
require "../core/node"
require "../utils/strutil"
require "../utils/common_utils"
require "../utils/command_parser"
require "../pipeline/steps/utils"
require "../pipeline/js_conversion"
require "../pipeline/call_conventions"
require "../compiler_types/proper_types"
require "../utils/error_types"

class Type_macro_provider
  include Macro_emission_provider
  include Macro_preprocess_provider
  include Macro_typecheck_provider
  include Macro_type_registration_provider
  include Macro_type_details_provider

  def typecheck(ctx : MacroContext) : TypeParameter | Nil
    if ctx.node.content.includes?(" is ")
      return _handle_type_definition(ctx).as(TypeParameter?) # returns nil in definition mode
    end
    _parse_type_expression(ctx)
  end

  def preprocess(ctx : MacroContext) : Nil
    if ctx.node.content.includes?(" is ") && ctx.node.parent && ctx.node.parent != ctx.compiler.root_node
      ctx.compiler.root_node.not_nil!.prepend_child(ctx.node)
    end
    ctx.node.children.each do |child|
      ctx.current_step.not_nil!.process_node(ctx.clone_with(node: child))
    end
  end

  def register_type(ctx : MacroContext) : Nil
    return unless ctx.node.content.includes?(" is ")

    _, rest = cut(ctx.node.content, " ")
    type_name, is_clause_full = cut(rest, " is ")
    type_name = type_name.strip

    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, SaneIdentifier.new(type_name))

    new_type = ComplexType.new(name: type_name, type_params: [] of Type, fields: [] of ::Tuple(String, Type))
    type_registry.register_type(new_type)
  end

  def register_type_details(ctx : MacroContext) : Nil
    return unless ctx.node.content.includes?(" is ")

    _, rest = cut(ctx.node.content, " ")
    type_name, _is_clause_full = cut(rest, " is ")
    type_name = type_name.strip

    new_type = type_registry.get_type(type_name)
    if new_type.nil?
      ctx.compiler.compile_error(ctx.node, "Type #{type_name} was not registered in pass 1", ErrorType::INVALID_MACRO)
      return
    end

    field_names = [] of String
    constructor_demands = [] of (Type | String)

    ctx.node.children.each do |child|
      macro_name, _ = cut(child.content, " ")
      if macro_name == "has"
        field_name = get_single_arg(ctx.clone_with(node: child))
        field_type_node = seek_child_macro(child, "type")
        ctx.compiler.assert_(!field_type_node.nil?, child, "Field '#{field_name}' must have a type defined.")

        field_type_name = get_single_arg(ctx.clone_with(node: field_type_node.not_nil!))
        field_type = _resolve_type_with_children(ctx.clone_with(node: field_type_node.not_nil!), field_type_name)
        ctx.compiler.assert_(!field_type.nil?, field_type_node.not_nil!, "Failed to resolve field type '#{field_type_name}' for field '#{field_name}'")

        field_names << field_name
        constructor_demands << field_type.not_nil!

        getter = FieldCall.new(field: field_name, demands: [new_type.not_nil!] of TypeDemand, returns: field_type.not_nil!)
        ctx.compiler.add_dynamic_convention(field_name, getter)

        setter = FieldCall.new(field: field_name, demands: [new_type.not_nil!, field_type.not_nil!] of TypeDemand, returns: field_type.not_nil!)
        ctx.compiler.add_dynamic_convention(field_name, setter)
      end
    end

    ctor = NewCall.new(constructor: type_name, demands: constructor_demands, returns: new_type.not_nil!)
    ctx.compiler.add_dynamic_convention(type_name, ctor)

    ctx.compiler.set_metadata(ctx.node, TypeFieldNames, TypeFieldNames.new(field_names))
  end

  def emission(ctx : MacroContext) : Nil
    return unless ctx.node.content.includes?(" is ")

    type_name = ctx.compiler.get_metadata(ctx.node, SaneIdentifier).to_s
    field_meta = ctx.compiler.get_metadata(ctx.node, TypeFieldNames).as(TypeFieldNames)
    fields = field_meta.names

    ctx.statement_out.write "function #{type_name}("
    joiner = Joiner.new(ctx.statement_out, ", ")
    fields.each { |fname| joiner.use { ctx.statement_out.write fname } }
    ctx.statement_out.write ") {#{NEWLINE}"
    ctx.statement_out.with_indent do
      fields.each { |fname| ctx.statement_out.write "this.#{fname} = #{fname};#{NEWLINE}" }
    end
    ctx.statement_out.write "}#{NEWLINE}"
  end

  private def _handle_type_definition(ctx : MacroContext) : TypeParameter | Nil
    register_type(ctx)
    nil
  end

  private def _parse_type_expression(ctx : MacroContext) : TypeParameter | Nil
    content = ctx.node.content.lchop("type ").strip
    parser = CommandParser.new(content, create_type_commands)
    parsed = parser.parse

    if parsed.nil?
      ctx.compiler.compile_error(ctx.node, "Invalid type expression syntax: #{content}", ErrorType::INVALID_MACRO)
      return nil
    end

    type_name = parsed["main"]?
    if type_name.nil? || type_name.to_s.empty?
      ctx.compiler.compile_error(ctx.node, "Type expression must specify a type name", ErrorType::INVALID_MACRO)
      return nil
    end

    resolved = _resolve_type_with_children(ctx, type_name.to_s)
    return nil if resolved.nil?

    param_name = parsed["parameter_name"]?.try &.to_s
    TypeParameter.new(resolved.not_nil!, param_name)
  end

  private def _resolve_type_with_children(ctx : MacroContext, type_name : String) : Type | String | Nil
    type_children = ctx.node.children.select { |ch| ch.content.starts_with?("type ") }

    if type_children.empty?
      resolved = type_registry.get_type(type_name)
      if resolved.nil?
        ctx.compiler.compile_error(ctx.node, "Unknown type: #{type_name}", ErrorType::INVALID_MACRO)
      end
      return resolved
    end

    type_args = [] of (Type | String)
    type_children.each do |tchild|
      child_ctx = ctx.clone_with(node: tchild)
      tparam = self.typecheck(child_ctx)
      if tparam.is_a?(TypeParameter)
        type_args << tparam.type_expr
      else
        ctx.compiler.compile_error(tchild, "Expected type expression", ErrorType::INVALID_MACRO)
        return nil
      end
    end

    instantiated = type_registry.instantiate_generic(type_name, type_args.map { |t| t.as(Type) }.to_a)
    if instantiated.nil?
      ctx.compiler.compile_error(ctx.node, "Cannot instantiate generic type #{type_name} with #{type_args.size} arguments", ErrorType::INVALID_MACRO)
    end
    instantiated
  end
end

# macros/collection_macros.cr

# List & Dict macros: typecheck + emission.
# - List supports element type declaration via `type T`, and operations:
#   append / prepend / insert_after_index
# - Dict supports type params `for K` and `for V`, and `entry` children (key, value)

require "../core/macro_registry"
require "../utils/strutil"
require "../utils/error_types"
require "../compiler_types/proper_types"

class List_macro_provider
  include Macro_emission_provider
  # Typecheck all children and separate type params from values
  def typecheck(ctx : MacroContext)
    type_params = [] of TypeParameter
    value_operations = [] of {Node, TCResult}

    step = ctx.current_step
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      result = step.not_nil!.process_node(child_ctx)

      if result.is_a?(TypeParameter)
        type_params << result.as(TypeParameter)
      else
        macro_name = ctx.compiler.get_metadata(child, Macro).to_s
        if {"append", "prepend", "insert_after_index"}.includes?(macro_name)
          # Explicit operation - check all its children
          child.children.each do |grandchild|
            grandchild_ctx = ctx.clone_with(node: grandchild)
            grandchild_result = step.not_nil!.process_node(grandchild_ctx)
            value_operations << {grandchild, grandchild_result}
          end
        else
          # Implicit append - check this child directly
          value_operations << {child, result}
        end
      end
    end

    # Must have exactly one type parameter
    if type_params.empty?
      ctx.compiler.compile_error(
        ctx.node,
        "List must specify element type. Add child `type ElementType` node.",
        ErrorType::INVALID_MACRO
      )
      return nil
    end

    if type_params.size > 1
      ctx.compiler.compile_error(
        ctx.node,
        "List can only have one element type",
        ErrorType::INVALID_MACRO
      )
      return nil
    end

    element_type = type_params.first.type_expr

    # Type-check all values against the declared element type
    value_operations.each do |value_node, value_type|
      next if value_type.nil?
      unless value_type.responds_to?(:is_assignable_to) && value_type.is_assignable_to(element_type)
        ctx.compiler.compile_error(
          value_node,
          "List element of type #{value_type} is not assignable to declared element type #{element_type}",
          ErrorType::INVALID_MACRO
        )
      end
    end

    # Create list type through registry
    type_registry.instantiate_generic("list", [element_type])
  end

  # Handle list macro - supports list operations (append, prepend, insert_after_index)
  def emission(ctx : MacroContext) : Nil
    if ctx.node.children.empty?
      ctx.expression_out << "[]"
      return
    end

    # Collect all operations in order
    operations = [] of {String, String, Array(Node)}
    ctx.node.children.each do |child|
      macro_name = ctx.compiler.get_metadata(child, Macro).to_s
      if macro_name == "type"
        # Skip type declarations during emission
        next
      elsif {"append", "prepend", "insert_after_index"}.includes?(macro_name)
        operations << {macro_name, child.content, child.children}
      else
        # Implicit append for direct children
        operations << {"append", "", [child]}
      end
    end

    # Helper to emit expression for a node
    get_expression = ->(n : Node) do
      expr_out = IndentedStringIO.new
      child_ctx = ctx.clone_with(node: n, expression_out: expr_out)
      ctx.current_step.try &.process_node(child_ctx)
      expr_out.gets_to_end
    end

    final_items = [] of String

    operations.each do |op, content, kids|
      case op
      when "append"
        kids.each do |k|
          expr = get_expression.call(k)
          final_items << expr unless expr.empty?
        end
      when "prepend"
        # reverse to maintain order when prepending
        tmp = [] of String
        kids.reverse_each do |k|
          expr = get_expression.call(k)
          tmp << expr unless expr.empty?
        end
        final_items = tmp + final_items
      when "insert_after_index"
        parts = content.strip.split
        if parts.size != 2
          ctx.compiler.compile_error(ctx.node, "insert_after_index expects format 'insert_after_index N', got '#{content}'", ErrorType::INVALID_MACRO)
          next
        end
        begin
          index = parts[1].to_i
          kids.each_with_index do |k, i|
            expr = get_expression.call(k)
            next if expr.empty?
            insert_at = index + 1 + i
            if insert_at < 0
              final_items.unshift(expr)
            elsif insert_at >= final_items.size
              final_items << expr
            else
              final_items.insert(insert_at, expr)
            end
          end
        rescue
          ctx.compiler.compile_error(ctx.node, "insert_after_index requires integer index, got '#{parts[1]}'", ErrorType::INVALID_MACRO)
        end
      end
    end

    ctx.expression_out << "[" + final_items.join(", ") + "]"
  end
end

class Dict_macro_provider
  include Macro_emission_provider
  # Typecheck all children and separate type params from entries
  def typecheck(ctx : MacroContext)
    type_params = [] of TypeParameter
    entry_ops = [] of {Node, TCResult, Node, TCResult}

    step = ctx.current_step
    ctx.node.children.each do |child|
      child_ctx = ctx.clone_with(node: child)
      result = step.not_nil!.process_node(child_ctx)

      if result.is_a?(TypeParameter)
        type_params << result.as(TypeParameter)
      else
        macro_name = ctx.compiler.get_metadata(child, Macro).to_s
        if macro_name == "entry"
          if child.children.size == 2
            key_node = child.children[0]
            val_node = child.children[1]
            key_type = step.not_nil!.process_node(ctx.clone_with(node: key_node))
            val_type = step.not_nil!.process_node(ctx.clone_with(node: val_node))
            entry_ops << {key_node, key_type, val_node, val_type}
          else
            ctx.compiler.compile_error(
              child,
              "Dict entry must have exactly 2 children (key, value), got #{child.children.size}",
              ErrorType::INVALID_MACRO
            )
          end
        else
          ctx.compiler.compile_error(
            child,
            "Dict children must be either type declarations or entry operations",
            ErrorType::INVALID_MACRO
          )
        end
      end
    end

    # Must have exactly two type parameters: K and V
    key_param = nil
    value_param = nil

    type_params.each do |tp|
      if tp.parameter_name == "K"
        key_param = tp
      elsif tp.parameter_name == "V"
        value_param = tp
      else
        ctx.compiler.compile_error(
          ctx.node,
          "Dict type parameter must be 'for K' or 'for V', got 'for #{tp.parameter_name}'",
          ErrorType::INVALID_MACRO
        )
      end
    end

    if key_param.nil? || value_param.nil?
      ctx.compiler.compile_error(
        ctx.node,
        "Dict must specify both key type (for K) and value type (for V)",
        ErrorType::INVALID_MACRO
      )
      return nil
    end

    key_type = key_param.not_nil!.type_expr
    value_type = value_param.not_nil!.type_expr

    # Type-check all entries against the declared types
    entry_ops.each do |k_node, k_res, v_node, v_res|
      if !k_res.nil? && !(k_res.responds_to?(:is_assignable_to) && k_res.is_assignable_to(key_type))
        ctx.compiler.compile_error(
          k_node,
          "Dict key of type #{k_res} is not assignable to declared key type #{key_type}",
          ErrorType::INVALID_MACRO
        )
      end
      if !v_res.nil? && !(v_res.responds_to?(:is_assignable_to) && v_res.is_assignable_to(value_type))
        ctx.compiler.compile_error(
          v_node,
          "Dict value of type #{v_res} is not assignable to declared value type #{value_type}",
          ErrorType::INVALID_MACRO
        )
      end
    end

    type_registry.instantiate_generic("dict", [key_type, value_type])
  end

  # Handle dict macro - check for entry children and emit {key1: value1, key2: value2, ...}
  def emission(ctx : MacroContext) : Nil
    if ctx.node.children.empty?
      ctx.expression_out << "{}"
      return
    end

    entry_pairs = [] of String

    ctx.node.children.each do |child|
      macro_name = ctx.compiler.get_metadata(child, Macro).to_s
      if macro_name == "type"
        next
      elsif macro_name != "entry"
        ctx.compiler.compile_error(child, "Dict children must be 'entry' macros or type declarations, got '#{macro_name}'", ErrorType::INVALID_MACRO)
        return
      end

      if child.children.size != 2
        ctx.compiler.compile_error(child, "Dict entry must have exactly 2 children (key, value), got #{child.children.size}", ErrorType::WRONG_ARG_COUNT)
        return
      end

      key_node = child.children[0]
      val_node = child.children[1]

      key_buf = IndentedStringIO.new
      key_ctx = ctx.clone_with(node: key_node, expression_out: key_buf)
      ctx.current_step.try &.process_node(key_ctx)
      key_expr = key_buf.gets_to_end

      val_buf = IndentedStringIO.new
      val_ctx = ctx.clone_with(node: val_node, expression_out: val_buf)
      ctx.current_step.try &.process_node(val_ctx)
      val_expr = val_buf.gets_to_end

      if !key_expr.empty? && !val_expr.empty?
        entry_pairs << "[#{key_expr}]: #{val_expr}"
      end
    end

    if entry_pairs.empty?
      ctx.expression_out << "{}"
    else
      ctx.expression_out << "{" + entry_pairs.join(", ") + "}"
    end
  end
end

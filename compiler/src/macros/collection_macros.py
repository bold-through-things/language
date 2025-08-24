from core.macro_registry import Macro_emission_provider, Macro_typecheck_provider, MacroContext
from utils.error_types import ErrorType
from compiler_types.proper_types import Type, TypeParameter, ComplexType
from dataclasses import replace

class List_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def typecheck(self, ctx: MacroContext) -> Type:
        # Typecheck all children and separate type params from values
        type_params = []
        value_operations = []
        
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            result = ctx.current_step.process_node(child_ctx)
            
            if isinstance(result, TypeParameter):
                type_params.append(result)
            else:
                # This is a value operation - check if it's explicit or implicit
                from core.node import Macro
                macro = ctx.compiler.get_metadata(child, Macro)
                if macro in ["append", "prepend", "insert_after_index"]:
                    # Explicit operation - check all its children
                    for grandchild in child.children:
                        grandchild_ctx = replace(ctx, node=grandchild)
                        grandchild_result = ctx.current_step.process_node(grandchild_ctx)
                        value_operations.append((grandchild, grandchild_result))
                else:
                    # Implicit append - check this child directly
                    value_operations.append((child, result))
        
        # Must have exactly one type parameter
        if not type_params:
            ctx.compiler.compile_error(
                ctx.node, 
                "List must specify element type. Add child `type ElementType` node.", 
                ErrorType.INVALID_MACRO
            )
            return None
        
        if len(type_params) > 1:
            ctx.compiler.compile_error(
                ctx.node,
                "List can only have one element type",
                ErrorType.INVALID_MACRO
            )
            return None
        
        element_type = type_params[0].type_expr
        
        # Type-check all values against the declared element type
        for value_node, value_type in value_operations:
            if value_type is None:
                continue  # Error already reported
            
            if not value_type.is_assignable_to(element_type):
                ctx.compiler.compile_error(
                    value_node,
                    f"List element of type {value_type} is not assignable to declared element type {element_type}",
                    ErrorType.INVALID_MACRO
                )
        
        # Create list type through registry
        from compiler_types.proper_types import type_registry
        return type_registry.instantiate_generic("list", [element_type])

    def emission(self, ctx: MacroContext):
        """Handle list macro - supports list operations (append, prepend, insert_after_index)"""
        if not ctx.node.children:
            ctx.expression_out.write("[]")
            return
        
        # Collect all operations in order
        from core.node import Macro
        operations = []
        
        for child in ctx.node.children:
            macro = ctx.compiler.get_metadata(child, Macro)
            if macro == "type":
                # Skip type declarations during emission
                continue
            elif macro in ["append", "prepend", "insert_after_index"]:
                operations.append((macro, child.content, child.children))
            else:
                # Implicit append for direct children
                operations.append(("append", "", [child]))
        
        # Build the final list in Python by applying operations in order
        from dataclasses import replace
        from utils.strutil import IndentedStringIO
        
        def get_expression(node):
            expr_out = IndentedStringIO()
            child_ctx = replace(ctx, node=node, expression_out=expr_out)
            child_ctx.current_step.process_node(child_ctx)
            return expr_out.getvalue()
        
        final_items = []
        
        for operation, content, children in operations:
            if operation == "append":
                for child in children:
                    expr = get_expression(child)
                    if expr:
                        final_items.append(expr)
            
            elif operation == "prepend":
                for child in reversed(children):  # reverse to maintain order when prepending
                    expr = get_expression(child)
                    if expr:
                        final_items.insert(0, expr)
            
            elif operation == "insert_after_index":
                # Parse index from content: "insert_after_index 0"
                parts = content.strip().split()
                if len(parts) != 2:
                    ctx.compiler.compile_error(ctx.node, f"insert_after_index expects format 'insert_after_index N', got '{content}'", ErrorType.INVALID_MACRO)
                    continue
                
                try:
                    index = int(parts[1])
                    for i, child in enumerate(children):
                        expr = get_expression(child)
                        if expr:
                            final_items.insert(index + 1 + i, expr)
                except ValueError:
                    ctx.compiler.compile_error(ctx.node, f"insert_after_index requires integer index, got '{parts[1]}'", ErrorType.INVALID_MACRO)
        
        ctx.expression_out.write(f"[{', '.join(final_items)}]")


class Dict_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def typecheck(self, ctx: MacroContext) -> Type:
        # Typecheck all children and separate type params from entries
        type_params = []
        entry_operations = []
        
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            result = ctx.current_step.process_node(child_ctx)
            
            if isinstance(result, TypeParameter):
                type_params.append(result)
            else:
                # This should be an entry operation
                from core.node import Macro
                macro = ctx.compiler.get_metadata(child, Macro)
                if macro == "entry":
                    # Entry has exactly 2 children: key and value
                    if len(child.children) == 2:
                        key_ctx = replace(ctx, node=child.children[0])
                        value_ctx = replace(ctx, node=child.children[1])
                        key_type = ctx.current_step.process_node(key_ctx)
                        value_type = ctx.current_step.process_node(value_ctx)
                        entry_operations.append((child.children[0], key_type, child.children[1], value_type))
                    else:
                        ctx.compiler.compile_error(
                            child,
                            f"Dict entry must have exactly 2 children (key, value), got {len(child.children)}",
                            ErrorType.INVALID_MACRO
                        )
                else:
                    ctx.compiler.compile_error(
                        child,
                        "Dict children must be either type declarations or entry operations",
                        ErrorType.INVALID_MACRO
                    )
        
        # Must have exactly two type parameters: K and V
        key_param = None
        value_param = None
        
        for type_param in type_params:
            if type_param.parameter_name == "K":
                key_param = type_param
            elif type_param.parameter_name == "V":
                value_param = type_param
            else:
                ctx.compiler.compile_error(
                    ctx.node,
                    f"Dict type parameter must be 'for K' or 'for V', got 'for {type_param.parameter_name}'",
                    ErrorType.INVALID_MACRO
                )
        
        if key_param is None or value_param is None:
            ctx.compiler.compile_error(
                ctx.node,
                "Dict must specify both key type (for K) and value type (for V)",
                ErrorType.INVALID_MACRO
            )
            return None
        
        key_type = key_param.type_expr
        value_type = value_param.type_expr
        
        # Type-check all entries against the declared types
        for key_node, key_result, value_node, value_result in entry_operations:
            if key_result is not None and not key_result.is_assignable_to(key_type):
                ctx.compiler.compile_error(
                    key_node,
                    f"Dict key of type {key_result} is not assignable to declared key type {key_type}",
                    ErrorType.INVALID_MACRO
                )
            
            if value_result is not None and not value_result.is_assignable_to(value_type):
                ctx.compiler.compile_error(
                    value_node,
                    f"Dict value of type {value_result} is not assignable to declared value type {value_type}",
                    ErrorType.INVALID_MACRO
                )
        
        # Create dict type through registry
        from compiler_types.proper_types import type_registry
        return type_registry.instantiate_generic("dict", [key_type, value_type])

    def emission(self, ctx: MacroContext):
        """Handle dict macro - check for entry children and emit {key1: value1, key2: value2, ...}"""
        if not ctx.node.children:
            ctx.expression_out.write("{}")
            return
        
        # Process only entry macros, skip type declarations  
        from core.node import Macro
        entry_pairs = []
        
        for child in ctx.node.children:
            macro = ctx.compiler.get_metadata(child, Macro)
            if macro == "type":
                # Skip type declarations during emission
                continue
            elif macro != "entry":
                ctx.compiler.compile_error(child, f"Dict children must be 'entry' macros or type declarations, got '{macro}'", ErrorType.INVALID_MACRO)
                return
            
            # Each entry should have exactly 2 children: key and value
            if len(child.children) != 2:
                ctx.compiler.compile_error(child, f"Dict entry must have exactly 2 children (key, value), got {len(child.children)}", ErrorType.WRONG_ARG_COUNT)
                return
            
            # Get key and value expressions
            from dataclasses import replace
            from utils.strutil import IndentedStringIO
            
            key_expression_out = IndentedStringIO()
            key_ctx = replace(ctx, node=child.children[0], expression_out=key_expression_out)
            key_ctx.current_step.process_node(key_ctx)
            key_expr = key_expression_out.getvalue()
            
            value_expression_out = IndentedStringIO()
            value_ctx = replace(ctx, node=child.children[1], expression_out=value_expression_out)
            value_ctx.current_step.process_node(value_ctx)
            value_expr = value_expression_out.getvalue()
            
            if key_expr and value_expr:
                entry_pairs.append(f"[{key_expr}]: {value_expr}")
        
        if entry_pairs:
            ctx.expression_out.write(f"{{{', '.join(entry_pairs)}}}")
        else:
            ctx.expression_out.write("{}")
    
from core.macro_registry import Macro_emission_provider, Macro_typecheck_provider, MacroContext
from utils.error_types import ErrorType

class List_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def typecheck(self, ctx: MacroContext):
        return "list"

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
            if macro in ["append", "prepend", "insert_after_index"]:
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
    def typecheck(self, ctx: MacroContext):
        return "dict"

    def emission(self, ctx: MacroContext):
        """Handle dict macro - check for entry children and emit {key1: value1, key2: value2, ...}"""
        if not ctx.node.children:
            ctx.expression_out.write("{}")
            return
        
        # Check if all children are entry macros
        from core.node import Macro
        entry_pairs = []
        
        for child in ctx.node.children:
            macro = ctx.compiler.get_metadata(child, Macro)
            if macro != "entry":
                ctx.compiler.compile_error(child, f"Dict children must be 'entry' macros, got '{macro}'", ErrorType.INVALID_MACRO)
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
    
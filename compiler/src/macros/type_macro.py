from dataclasses import replace
from pipeline.js_conversion import NEWLINE
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider
from utils.common_utils import get_single_arg
from core.node import Node, SaneIdentifier, TypeFieldNames
from pipeline.steps import seek_child_macro
from pipeline.builtin_calls import DirectCall, FieldCall, NewCall
from utils.logger import default_logger
from compiler_types.proper_types import Type, TypeParameter, type_registry
from utils.error_types import ErrorType
from utils.command_parser import CommandParser, create_type_commands

class Type_macro_provider(Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider):
    def typecheck(self, ctx: MacroContext):
        """Parse type expressions and return TypeParameter wrapper."""
        # Handle type definitions: 'type Name is BaseType'
        if " is " in ctx.node.content:
            return self._handle_type_definition(ctx)
        
        # Handle type expressions: 'type SomeType' or 'type SomeType for K'
        return self._parse_type_expression(ctx)
    
    def _parse_type_expression(self, ctx: MacroContext):
        """Parse a type expression like 'type string' or 'type list for V'."""
        content = ctx.node.content.removeprefix("type ").strip()
        
        parser = CommandParser(content, create_type_commands())
        parsed = parser.parse()
        
        if parsed is None:
            ctx.compiler.compile_error(
                ctx.node,
                f"Invalid type expression syntax: {content}",
                ErrorType.INVALID_MACRO
            )
            return None
        
        type_name = parsed.get('main')
        if not type_name:
            ctx.compiler.compile_error(
                ctx.node,
                "Type expression must specify a type name",
                ErrorType.INVALID_MACRO
            )
            return None
        
        # Parse the base type
        parsed_type = self._resolve_type_with_children(ctx, type_name)
        if parsed_type is None:
            return None
            
        return TypeParameter(parsed_type, parsed.get('parameter_name'))
    
    def _resolve_type_with_children(self, ctx: MacroContext, type_name: str) -> Type:
        """Resolve a type, potentially with generic children."""
        # Check if this node has type children (for generics)
        type_children = [child for child in ctx.node.children if child.content.startswith("type ")]
        
        if not type_children:
            # Simple type lookup
            resolved_type = type_registry.get_type(type_name)
            if resolved_type is None:
                ctx.compiler.compile_error(
                    ctx.node,
                    f"Unknown type: {type_name}",
                    ErrorType.INVALID_MACRO
                )
            return resolved_type
        
        # Generic type with type arguments
        type_args = []
        for type_child in type_children:
            child_ctx = replace(ctx, node=type_child)
            # TODO: This manual call to self.typecheck is architectural debt.
            # We're forced to do this because we're in type registration phase
            # but need typecheck machinery to process generic type arguments.
            # The root issue is that we need full Type objects (not strings) 
            # for call convention registration before the global typecheck pass.
            # This should be revisited with a cleaner architecture.
            type_param = self.typecheck(child_ctx)
            if isinstance(type_param, TypeParameter):
                type_args.append(type_param.type_expr)
            else:
                ctx.compiler.compile_error(
                    type_child,
                    "Expected type expression",
                    ErrorType.INVALID_MACRO
                )
                return None
        
        # Try to instantiate generic type through registry
        generic_type = type_registry.instantiate_generic(type_name, type_args)
        if generic_type is None:
            ctx.compiler.compile_error(
                ctx.node,
                f"Cannot instantiate generic type {type_name} with {len(type_args)} arguments",
                ErrorType.INVALID_MACRO
            )
        return generic_type
    
    def _handle_type_definition(self, ctx: MacroContext):
        """Handle type definitions like 'type Name is BaseType'."""
        # Keep existing type definition logic
        return self.register_type(ctx)

    def preprocess(self, ctx: MacroContext):
        # Hoist type definitions to the root
        if " is " in ctx.node.content and ctx.node.parent and ctx.node.parent != ctx.compiler.root_node:
            ctx.compiler.root_node.prepend_child(ctx.node)

        # Process children recursively
        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def register_type(self, ctx: MacroContext):
        if not " is " in ctx.node.content:
            return

        from utils.strutil import cut
        

        # Parse 'type Name is Clause'
        _, rest = cut(ctx.node.content, " ") # 'type Name is Clause'
        type_name, is_clause_full = cut(rest, " is ")
        is_clause = is_clause_full.strip() # 'heap_entry'

        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, type_name)

        # Register the new type in the type registry
        from compiler_types.proper_types import ComplexType
        new_type = ComplexType(name=type_name, type_params=(), fields=())
        type_registry.register_type(new_type)

        field_names = [] # Changed from field_definitions
        constructor_demands = []

        # Pass 1: Just register the basic type shell, don't process fields yet

    def register_type_details(self, ctx: MacroContext):
        """Pass 2: Fill in field details with proper types"""
        if not " is " in ctx.node.content:
            return

        from utils.strutil import cut
        
        # Parse 'type Name is Clause'
        _, rest = cut(ctx.node.content, " ") # 'type Name is Clause'
        type_name, is_clause_full = cut(rest, " is ")
        is_clause = is_clause_full.strip() # 'heap_entry'

        # Get the registered type
        new_type = type_registry.get_type(type_name)
        if new_type is None:
            ctx.compiler.compile_error(ctx.node, f"Type {type_name} was not registered in pass 1", ErrorType.INVALID_MACRO)
            return

        field_names = []
        constructor_demands = []

        for child in ctx.node.children:
            macro, _ = cut(child.content, " ")
            if macro == "has":
                field_name = get_single_arg(replace(ctx, node=child))
                field_type_node = seek_child_macro(child, "type")
                
                ctx.compiler.assert_(field_type_node is not None, child, f"Field '{field_name}' must have a type defined.")
                
                # Use _resolve_type_with_children to process generic types - now safe because all basic types are registered
                field_type_str = get_single_arg(replace(ctx, node=field_type_node))
                # Create a temporary context for the field type node to resolve its type properly
                field_ctx = replace(ctx, node=field_type_node)
                field_type = self._resolve_type_with_children(field_ctx, field_type_str)
                ctx.compiler.assert_(field_type is not None, field_type_node, f"Failed to resolve field type '{field_type_str}' for field '{field_name}'")
                
                field_names.append(field_name)
                constructor_demands.append(field_type)

                # Generate FieldCall convention for this field (getter)
                field_getter_convention = FieldCall(
                    field=field_name,
                    demands=[new_type], # Use the actual Type object for receiver
                    returns=field_type  # Now a proper Type object
                )
                ctx.compiler.add_dynamic_convention(field_name, field_getter_convention)

                # Generate FieldCall convention for this field (setter)
                field_setter_convention = FieldCall(
                    field=field_name,
                    demands=[new_type, field_type], # Use proper Type objects
                    returns=field_type # Returns the assigned value
                )
                ctx.compiler.add_dynamic_convention(field_name, field_setter_convention)
        
        # Generate Constructor Call Convention
        constructor_convention = NewCall(
            constructor=type_name,
            demands=constructor_demands,  # These are now proper Type objects
            returns=new_type
        )
        ctx.compiler.add_dynamic_convention(type_name, constructor_convention)

        # Store field names as metadata for emission
        ctx.compiler.set_metadata(ctx.node, TypeFieldNames, TypeFieldNames(field_names))

    def emission(self, ctx: MacroContext):
        if not " is " in ctx.node.content:
            return
        
        from core.node import SaneIdentifier, TypeFieldNames
        from utils.strutil import Joiner

        type_name = ctx.compiler.get_metadata(ctx.node, SaneIdentifier)
        field_names_metadata = ctx.compiler.get_metadata(ctx.node, TypeFieldNames)
        field_names = field_names_metadata.names

        ctx.statement_out.write(f"function {type_name}(")
        joiner = Joiner(ctx.statement_out, ", ")
        for field_name in field_names:
            with joiner:
                ctx.statement_out.write(field_name)
        ctx.statement_out.write(") {" + NEWLINE)
        with ctx.statement_out:
            for field_name in field_names:
                ctx.statement_out.write(f"this.{field_name} = {field_name};" + NEWLINE)
        ctx.statement_out.write("}" + NEWLINE)

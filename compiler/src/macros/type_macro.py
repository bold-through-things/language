from dataclasses import replace # Added import
from google_ai_research_sucks import NEWLINE_FUCK
from macro_registry import MacroContext, Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider
from common_utils import get_single_arg
from node import Node, SaneIdentifier
from logger import default_logger

class Type_macro_provider(Macro_emission_provider, Macro_preprocess_provider, Macro_typecheck_provider):
    def preprocess(self, ctx: MacroContext):
        # Hoist type definitions to the root
        if " is " in ctx.node.content and ctx.node.parent and ctx.node.parent != ctx.compiler.root_node:
            ctx.compiler.root_node.prepend_child(ctx.node)

        # Process children recursively
        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def typecheck(self, ctx: MacroContext):
        if not " is " in ctx.node.content:
            return

        default_logger.metadata_debug(f"Type_macro_provider.typecheck called for node: {ctx.node.content}")
        from strutil import cut
        from processor_base import seek_child_macro, DirectCall, FieldCall, NewCall
        from node import SaneIdentifier, FieldDemandType

        # Parse 'type Name is Clause'
        _, rest = cut(ctx.node.content, " ") # 'type Name is Clause'
        type_name, is_clause_full = cut(rest, " is ")
        is_clause = is_clause_full.strip() # 'heap_entry'

        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, type_name)
        default_logger.metadata_debug(f"Set SaneIdentifier for {ctx.node.content}: {type_name}")

        field_names = [] # Changed from field_definitions
        default_logger.metadata_debug(f"Initialized field_names: {field_names}")
        constructor_demands = []

        for child in ctx.node.children:
            macro, _ = cut(child.content, " ")
            if macro == "has":
                field_name = get_single_arg(replace(ctx, node=child))
                field_type_node = seek_child_macro(child, "type")
                
                ctx.compiler.assert_(field_type_node is not None, child, f"Field '{field_name}' must have a type defined.")
                
                field_type = get_single_arg(replace(ctx, node=field_type_node))
                
                field_names.append(field_name) # Store field name
                constructor_demands.append(field_type)

                # Generate FieldCall convention for this field (getter)
                field_getter_convention = FieldCall(
                    field=field_name,
                    demands=[type_name], # Receiver only
                    returns=field_type
                )
                ctx.compiler.add_dynamic_convention(field_name, field_getter_convention)
                default_logger.metadata_debug(f"Added dynamic getter convention for {field_name}")

                # Generate FieldCall convention for this field (setter)
                field_setter_convention = FieldCall(
                    field=field_name,
                    demands=[type_name, field_type], # Receiver and value to set
                    returns=field_type # Returns the assigned value
                )
                ctx.compiler.add_dynamic_convention(field_name, field_setter_convention)
                default_logger.metadata_debug(f"Added dynamic setter convention for {field_name}")

            # Process all children recursively
            ctx.current_step.process_node(replace(ctx, node=child))
        
        # Generate Constructor Call Convention
        constructor_convention = NewCall(
            constructor=type_name,
            demands=constructor_demands,
            returns=type_name
        )
        ctx.compiler.add_dynamic_convention(type_name, constructor_convention)
        default_logger.metadata_debug(f"Added dynamic constructor convention for {type_name}")

        # Store field names as metadata for emission
        from node import TypeFieldNames # Import TypeFieldNames
        default_logger.metadata_debug(f"Before setting TypeFieldNames for {ctx.node.content}, field_names: {field_names}")
        ctx.compiler.set_metadata(ctx.node, TypeFieldNames, TypeFieldNames(field_names))
        default_logger.metadata_debug(f"Set TypeFieldNames for {ctx.node.content}: {field_names}")

    def emission(self, ctx: MacroContext):
        if not " is " in ctx.node.content:
            return
        
        default_logger.metadata_debug(f"Type_macro_provider.emission called for node: {ctx.node.content}")
        from node import SaneIdentifier, TypeFieldNames
        from strutil import Joiner

        type_name = ctx.compiler.get_metadata(ctx.node, SaneIdentifier)
        default_logger.metadata_debug(f"Retrieved SaneIdentifier for {ctx.node.content}: {type_name}")
        field_names_metadata = ctx.compiler.get_metadata(ctx.node, TypeFieldNames)
        default_logger.metadata_debug(f"Retrieved TypeFieldNames for {ctx.node.content}: {field_names_metadata.names}")
        field_names = field_names_metadata.names

        ctx.statement_out.write(f"function {type_name}(")
        joiner = Joiner(ctx.statement_out, ", ")
        for field_name in field_names:
            with joiner:
                ctx.statement_out.write(field_name)
        ctx.statement_out.write(") {" + NEWLINE_FUCK)
        with ctx.statement_out:
            for field_name in field_names:
                ctx.statement_out.write(f"this.{field_name} = {field_name};" + NEWLINE_FUCK)
        ctx.statement_out.write("}" + NEWLINE_FUCK)

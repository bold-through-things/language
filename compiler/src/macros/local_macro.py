from dataclasses import replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtins, builtin_calls, DirectCall, seek_child_macro, cut, to_valid_js_ident,
    unified_macros, unified_typecheck, walk_upwards_for_local_definition
)
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, Target, ResolvedConvention, Node
from common_utils import collect_child_expressions, get_single_arg, get_two_args
from error_types import ErrorType
from logger import default_logger

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

# TODO: Import and bridge dependency injection version
from macro_base import di_registry, bridge_to_legacy

# Import the dependency injection version
try:
    from macros.local_macro_di import LocalMacro
    # Bridge to legacy registries for backward compatibility
    bridge_to_legacy(macros, "local", "process")
    # Note: preprocessing step is handled separately, typecheck goes to different registry  
    bridge_to_legacy(typecheck, "local", "typecheck")
    # Mark as using DI version
    USE_DI_LOCAL = True
except ImportError:
    # Fallback to old implementation if DI version not available
    USE_DI_LOCAL = False

# Only register old-style functions if DI version is not available
if not USE_DI_LOCAL:
    @macros.add("local")
    def local(ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
        
        args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
        
        ctx.statement_out.write(f"let {name}")
        if len(args) > 0:
            ctx.statement_out.write(f" = {args[-1]}")
        ctx.statement_out.write(f"\n")
        ctx.expression_out.write(name)

# Preprocessing for 'local' macro
if not USE_DI_LOCAL:
    def local_preprocessing(ctx: MacroContext):
        """Preprocessing logic for 'local' macro - sets up identifiers"""
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)

# Type checking for 'local' macro
if not USE_DI_LOCAL:
    @typecheck.add("local")
    def local_typecheck(ctx: MacroContext):
        """Type checking for 'local' macro"""
        type_node = seek_child_macro(ctx.node, "type")

        received = None
        # Process children to get their types
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            received = ctx.current_step.process_node(child_ctx) or received

        if not type_node:
            # TODO. this should be mandatory.
            if not seek_child_macro(ctx.node, "67lang:auto_type") or not received:
                return received
            from node import Node
            type_node = Node(f"type {received}", ctx.node.pos, [])
        
        from strutil import cut
        _, demanded = cut(type_node.content, " ")
        default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received} (children {[c.content for c in ctx.node.children]})")
        
        # Store the local variable type information in compiler metadata for upward walking
        from node import FieldDemandType
        ctx.compiler.set_metadata(ctx.node, FieldDemandType, demanded)
        
        # Also verify type matching if we have demanded type
        if demanded:
            if received is None:
                # If we have a demanded type but no received value, that's an error
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given None", ErrorType.MISSING_TYPE)
            elif received not in {"*", demanded}:
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given {received}", ErrorType.FIELD_TYPE_MISMATCH)
        
        return demanded or received or "*"

# Always provide the preprocessing function for backward compatibility
def local_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'local' macro - sets up identifiers"""
    desired_name = get_single_arg(ctx)
    actual_name = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
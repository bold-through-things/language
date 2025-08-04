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
from macro_base import di_registry, bridge_to_legacy, register_macro_manually

# TODO: Move this to a registration function to avoid import-time registration
def setup_fn_macros_di():
    """Set up dependency injection version of fn and param macros"""
    try:
        from macros.fn_macro_di import FnMacro, ParamMacro
        # Register manually to avoid import-time registration
        register_macro_manually("fn", FnMacro)
        register_macro_manually("param", ParamMacro, aliases=[])
        # Bridge to legacy registries for backward compatibility
        bridge_to_legacy(macros, "fn", "process")
        bridge_to_legacy(macros, "param", "process")
        return True
    except ImportError:
        return False

# Call setup function
USE_DI_FN = setup_fn_macros_di()

# Import the dependency injection version
if USE_DI_FN:
    # Already set up in function above
    pass
else:
    # Fallback - this code path should not be reached now
    USE_DI_FN = False

# Only register old-style functions if DI version is not available
if not USE_DI_FN:
    @macros.add("fn")
    def fn(ctx: MacroContext):
        name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or name
        ctx.statement_out.write(f"const {name} = async function (")
        joiner = Joiner(ctx.statement_out, ", \n")
        params_metadata = ctx.compiler.get_metadata(ctx.node, Params)
        params = params_metadata.mapping.items()
        if len(params) > 0:
            ctx.statement_out.write("\n")
        with ctx.statement_out:
            for k, _ in params:
                with joiner:
                    # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                    ctx.statement_out.write(k)
        if len(params) > 0:
            ctx.statement_out.write("\n")
        ctx.statement_out.write(") ")
        next = seek_child_macro(ctx.node, "do")

        ctx.compiler.assert_(next != None, ctx.node, "must have a do block")

        inject = Inject_code_start()
        ctx.compiler.set_metadata(next, Inject_code_start, inject)
        ctx.statement_out.write("{")
        with ctx.statement_out:
            # TODO. this is absolute legacy. i'm fairly sure this does nothing by now
            for k, _ in params:
                inject.code.append(f"{k} = {k}\n")
            inner_ctx = replace(ctx, node=next)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}")

# Preprocessing for 'fn' macro  
def fn_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'fn' macro - sets up identifiers and parameters"""
    from processor_base import seek_all_child_macros
    
    desired_name = get_single_arg(ctx)
    actual_name = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
    
    # TODO - also hate this hack.
    for child in seek_all_child_macros(ctx.node, "param"):
        name = get_single_arg(replace(ctx, node=child))
        ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))

    for child in ctx.node.children:
        ctx.current_step.process_node(replace(ctx, node=child))

# Preprocessing for 'param' macro
def param_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'param' macro - registers parameters"""
    args = get_single_arg(ctx, "param must have one argument - the name")
    parent = ctx.node.parent
    
    default_logger.macro(f"param '{args}'")
    
    assert parent != None
    ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
    parent_macro = ctx.compiler.get_metadata(parent, Macro)
    ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
    params = ctx.compiler.get_metadata(parent, Params)
    params.mapping[args] = True
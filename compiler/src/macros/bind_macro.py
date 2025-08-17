"""Bind macro for creating partial function applications."""

from dataclasses import replace
from pipeline.js_conversion import NEWLINE
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_preprocess_provider
from utils.strutil import Joiner
from utils.logger import default_logger


class Bind_macro_provider(Macro_emission_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        # Parse the header: "bind fn <function_name> as callable"
        parts = ctx.node.content.split()
        ctx.compiler.assert_(len(parts) == 5 and parts[0] == "bind" and parts[1] == "fn" and parts[3] == "as" and parts[4] == "callable", 
                           ctx.node, "bind syntax should be: bind fn <function_name> as callable")
        
        # Process children
        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def emission(self, ctx: MacroContext):
        # Parse the header: "bind fn <function_name> as callable"
        parts = ctx.node.content.split()
        desired_fn_name = parts[2]
        
        # Look up the actual function name from dynamic conventions
        actual_fn_name = desired_fn_name
        if desired_fn_name in ctx.compiler._dynamic_conventions:
            convention = ctx.compiler._dynamic_conventions[desired_fn_name]
            if hasattr(convention, 'fn'):
                actual_fn_name = convention.fn
            elif isinstance(convention, list) and len(convention) > 0 and hasattr(convention[0], 'fn'):
                actual_fn_name = convention[0].fn
        
        # Collect unbound parameter names in order
        unbound_param_names = []
        for child in ctx.node.children:
            if child.content.startswith("_ ") or child.content == "_":
                unbound_param_names.append(f"arg{len(unbound_param_names)}")
        
        # Emit the bound function as an expression
        ctx.expression_out.write("(")
        
        # Add unbound parameter names
        if unbound_param_names:
            ctx.expression_out.write(", ".join(unbound_param_names))
        
        ctx.expression_out.write(f") => {actual_fn_name}(")
        
        # Generate the parameter list for the original function call, maintaining order
        param_joiner = Joiner(ctx.expression_out, ", ")
        unbound_index = 0
        
        for child in ctx.node.children:
            with param_joiner:
                if child.content.startswith("_ ") or child.content == "_":
                    # Use the corresponding unbound parameter
                    ctx.expression_out.write(unbound_param_names[unbound_index])
                    unbound_index += 1
                else:
                    # Emit the bound value
                    inner_ctx = replace(ctx, node=child)
                    ctx.current_step.process_node(inner_ctx)
        
        ctx.expression_out.write(")")
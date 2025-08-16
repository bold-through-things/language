"""Function definition macro."""

from dataclasses import replace
from pipeline.js_conversion import NEWLINE
from pipeline.steps import seek_child_macro, seek_all_child_macros
from pipeline.builtin_calls import DirectCall
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_preprocess_provider
from utils.strutil import Joiner
from core.node import Params, Inject_code_start, SaneIdentifier
from utils.common_utils import get_single_arg
from utils.logger import default_logger


class Fn_macro_provider(Macro_emission_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        # Hoist fn definitions to the root
        if ctx.node.parent and ctx.node.parent != ctx.compiler.root_node:
            # Prepend to root children (this will also remove it from its old parent)
            ctx.compiler.root_node.prepend_child(ctx.node)

        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
        
        param_demands = []
        # TODO - also hate this hack.
        for child in seek_all_child_macros(ctx.node, "param"):
            name = get_single_arg(replace(ctx, node=child))
            param_demands.append("*") # Add a demand for each parameter
            new_node = ctx.compiler.make_node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[])
            ctx.node.prepend_child(new_node)
        
        ctx.compiler.add_dynamic_convention(desired_name, DirectCall(fn=actual_name, receiver=None, demands=param_demands, returns="*"))

        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def register_type(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name

        param_demands = []
        for child in seek_all_child_macros(ctx.node, "param"):
            param_demands.append("*") # Add a demand for each parameter

        ctx.compiler.add_dynamic_convention(desired_name, DirectCall(fn=actual_name, receiver=None, demands=param_demands, returns="*"))

    def emission(self, ctx: MacroContext):
        name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or name
        ctx.statement_out.write(f"const {name} = async function (")
        joiner = Joiner(ctx.statement_out, ", " + NEWLINE)
        params_metadata = ctx.compiler.get_metadata(ctx.node, Params)
        params = params_metadata.mapping.items()
        if len(params) > 0:
            ctx.statement_out.write(NEWLINE)
        with ctx.statement_out:
            for k, _ in params:
                with joiner:
                    # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                    ctx.statement_out.write(k)
        if len(params) > 0:
            ctx.statement_out.write(NEWLINE)
        ctx.statement_out.write(") ")
        next = seek_child_macro(ctx.node, "do")

        ctx.compiler.assert_(next != None, ctx.node, "must have a do block")

        inject = Inject_code_start()
        ctx.compiler.set_metadata(next, Inject_code_start, inject)
        ctx.statement_out.write("{")
        with ctx.statement_out:
            # TODO. this is absolute legacy. i'm fairly sure this does nothing by now
            for k, _ in params:
                inject.code.append(f"{k} = {k}" + NEWLINE)
            inner_ctx = replace(ctx, node=next)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}" + NEWLINE)
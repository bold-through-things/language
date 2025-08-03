"""
Function definition macro - handles fn macro in the 67lang language.
"""

from dataclasses import replace
from processor_base import (
    MacroProcessingStep, seek_child_macro, cut, to_valid_js_ident
)
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, Target
from common_utils import get_single_arg
from error_types import ErrorType
from logger import default_logger

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

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
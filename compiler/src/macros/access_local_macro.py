"""
Local access macro - handles 67lang:access_local operations.
"""

from dataclasses import replace
from processor_base import walk_upwards_for_local_definition
from macro_registry import MacroContext
from node import SaneIdentifier
from common_utils import collect_child_expressions, get_single_arg
from error_types import ErrorType

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

@macros.add("67lang:access_local")
def pil_access_local(ctx: MacroContext):
    desired_name = get_single_arg(ctx)
    res = walk_upwards_for_local_definition(ctx, desired_name)
    ctx.compiler.assert_(res != None, ctx.node, f"{desired_name} must access a defined local", ErrorType.NO_SUCH_LOCAL)
    actual_name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or desired_name

    args = collect_child_expressions(ctx)

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
        ctx.statement_out.write(f"{actual_name} = {args[-1]}\n")

    ctx.expression_out.write(actual_name)
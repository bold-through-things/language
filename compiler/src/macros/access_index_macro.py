"""
Index access macro - handles 67lang:access_index operations.
"""

from dataclasses import replace
from processor_base import walk_upwards_for_local_definition
from macro_registry import MacroContext
from node import SaneIdentifier
from common_utils import collect_child_expressions, get_single_arg
from error_types import ErrorType

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

@macros.add("67lang:access_index")
def access_index(ctx: MacroContext):
    name = get_single_arg(ctx, "single argument, the object into which we should index")
    res = walk_upwards_for_local_definition(ctx, name)
    ctx.compiler.assert_(res != None, ctx.node, f"{name} must access a defined function", ErrorType.NO_SUCH_LOCAL)
    name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
    ident = ctx.compiler.get_new_ident(name) # TODO - pass index name too (doable...)

    args: list[str] = collect_child_expressions(ctx)

    ctx.compiler.assert_(len(args) >= 1, ctx.node, "first child used as indexing key")
    key = args[0]

    if len(args) > 1:
        ctx.compiler.assert_(len(args) == 2, ctx.node, "second child used for assignment")
        ctx.statement_out.write(f"{name}[{key}] = {args[1]}\n")

    ctx.statement_out.write(f"const {ident} = await {name}[{key}]\n")
    ctx.expression_out.write(ident)
"""
Field access macro - handles 67lang:access_field operations.
"""

from dataclasses import replace
from processor_base import (
    js_field_access, walk_upwards_for_local_definition
)
from macro_registry import MacroContext
from node import SaneIdentifier
from common_utils import collect_child_expressions, get_two_args
from error_types import ErrorType

# Legacy registries - will be moved into steps
from preprocessing_macros import macros

@macros.add("67lang:access_field")
def access_field(ctx: MacroContext):
    name, field = get_two_args(ctx, "first argument is object, second is field")
    res = walk_upwards_for_local_definition(ctx, name)
    ctx.compiler.assert_(res != None, ctx.node, f"{name} must access a defined function", ErrorType.NO_SUCH_LOCAL)
    name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
    field_access = js_field_access(field)
    ident = ctx.compiler.get_new_ident("_".join([name, field]))

    args = collect_child_expressions(ctx)

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child node for assignment")
        ctx.statement_out.write(f"{name}{field_access} = {args[-1]}\n")
    ctx.statement_out.write(f"const {ident} = await {name}{field_access}\n")
    ctx.expression_out.write(ident)
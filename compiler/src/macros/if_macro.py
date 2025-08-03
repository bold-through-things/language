from dataclasses import replace
from processor_base import seek_child_macro, unified_macros, unified_typecheck, seek_parent_scope
from macro_registry import MacroContext
from strutil import IndentedStringIO
from common_utils import process_children_with_context

# JavaScript emission for 'if' macro
@unified_macros.add("if")
def if_header(ctx: MacroContext):
    args: list[str] = []
    if len(ctx.node.children) > 0:
        # ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "single child, the value") TODO!
        for child in ctx.node.children:
            if child.content.startswith("then"): # TODO - ugly. bwah!
                continue
            e = IndentedStringIO()
            ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
            args.append(e.getvalue())

    ctx.statement_out.write(f"if ({args[-1]})")
    ctx.statement_out.write(" {")
    with ctx.statement_out:
        node = seek_child_macro(ctx.node, "then")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `then` block")
        inner_ctx = replace(ctx, node=node)
        ctx.current_step.process_node(inner_ctx)
    ctx.statement_out.write("}")

# Type checking for scope macros related to 'if' (then, else)
@unified_typecheck.add("then", "else") 
def typecheck_if_scope_macro(ctx: MacroContext):
    """Type checking for 'then' and 'else' scope macros"""
    parent = seek_parent_scope(ctx.node)
    # Temporarily disable scope metadata - implement walking upwards approach later
    # ctx.compiler.set_metadata(ctx.node, Scope, Scope(parent=parent))
    process_children_with_context(ctx, ctx.current_step)
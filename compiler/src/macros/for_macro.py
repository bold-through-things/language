from dataclasses import replace
from processor_base import seek_child_macro, unified_macros
from macro_registry import MacroContext
from strutil import IndentedStringIO
from error_types import ErrorType

@unified_macros.add("for")
def for_macro(ctx: MacroContext):
    split = ctx.node.content.split(" ")
    ctx.compiler.assert_(len(split) == 3, ctx.node, "must have a syntax: for $ident in")
    # assert split[0] == "for" # inherent per semantics
    name = split[1]
    ctx.compiler.assert_(split[2] == "in", ctx.node, "must have a syntax: for $ident in")    

    args: list[str | None] = []
    for child in ctx.node.children:
        if child.content.startswith("do"):
            continue
        e = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    ctx.compiler.assert_(len(args) == 1, ctx.node, f"must have a single argument, the list provider (got {args})", ErrorType.WRONG_ARG_COUNT)

    iter_ident = ctx.compiler.get_new_ident("iter")
    ctx.statement_out.write(f"""
const {iter_ident} = {args[0]}[Symbol.iterator]();
while (true) {{
    const {{ value, done }} = {iter_ident}.next();
    if (done) {{ break; }}
    let {name} = value;
""")
    with ctx.statement_out:
        node = seek_child_macro(ctx.node, "do")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
        inner_ctx = replace(ctx, node=node)
        ctx.current_step.process_node(inner_ctx)
    ctx.statement_out.write("}")
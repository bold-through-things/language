from dataclasses import replace
from processor_base import MacroProcessingStep, seek_child_macro
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO
from node import Inject_code_start

# Legacy registries - will be moved into steps
macros = MacroRegistry()

SCOPE_MACRO = ["do", "then", "else", "PIL:file"]
@macros.add(*SCOPE_MACRO)
def scope_macro(ctx: MacroContext):
    from node import Macro
    if ctx.node.metadata[Macro] in ["else"]:
        ctx.statement_out.write(f"{ctx.node.metadata[Macro]} ")

    ctx.statement_out.write("{\n")
    with ctx.statement_out:
        ctx.statement_out.write("const parent_scope = scope\n")
        ctx.statement_out.write("{\n")
        with ctx.statement_out:
            ctx.statement_out.write("const scope = indentifire.scope(parent_scope)\n")
            inject = ctx.node.metadata.maybe(Inject_code_start)
            if inject:
                for code in inject.code:
                    ctx.statement_out.write(code)
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                child_ctx.current_step.process_node(child_ctx)
                ctx.statement_out.write("\n")
        ctx.statement_out.write("}\n")
    ctx.statement_out.write("} ")

@macros.add("noscope")
def block(ctx: MacroContext):
    for child in ctx.node.children:
        out = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=out))

@macros.add("for")
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

    ctx.compiler.assert_(len(args) == 1, ctx.node, "must have a single argument, the list provider")

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

@macros.add("if")
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

@macros.add("while")
def while_loop(ctx: MacroContext):
    ctx.statement_out.write("while(true) {")
    with ctx.statement_out:
        ctx.compiler.assert_(len(ctx.node.children) == 2, ctx.node, "must have two children")
        node = ctx.node.children[0]
        out = IndentedStringIO()
        inner_ctx = replace(ctx, node=node, expression_out=out)
        ctx.current_step.process_node(inner_ctx)

        ctx.statement_out.write(f"if (!{out.getvalue()}) ")
        ctx.statement_out.write("{ break; }\n")

        node = seek_child_macro(ctx.node, "do")
        ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
        inner_ctx = replace(ctx, node=node)
        ctx.current_step.process_node(inner_ctx)
    ctx.statement_out.write("}")
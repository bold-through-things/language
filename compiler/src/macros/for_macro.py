from dataclasses import replace
from processor_base import seek_child_macro
from macro_registry import MacroContext, Macro_emission_provider, Macro_preprocess_provider
from strutil import IndentedStringIO
from error_types import ErrorType

class For_macro_provider(Macro_emission_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        # TODO. yes i really do hate this hack. really what we should just do is unroll `for` into the
        #  manual while true early into the processing
        from node import Args, Node
        args = ctx.compiler.get_metadata(ctx.node, Args)
        args = args.split(" ")
        name = args[0] # TODO - this won't support any identifier, it probably should!

        # print("processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])
        
        new_node = ctx.compiler.make_node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[])
        ctx.node.prepend_child(new_node)
        # print("done processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])

        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))


    def emission(self, ctx: MacroContext):
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

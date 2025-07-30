from dataclasses import replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtins, builtin_calls, DirectCall, seek_child_macro, cut,
    unified_macros, unified_typecheck
)
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, Target

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

@macros.add("fn")
def fn(ctx: MacroContext):
    ctx.compiler.assert_(ctx.node.metadata[Args].find(" ") == -1, ctx.node, "must have a single arg - fn name")
    ctx.statement_out.write(f"const {ctx.node.metadata[Args]} = async function (")
    joiner = Joiner(ctx.statement_out, ", \n")
    params = ctx.node.metadata[Params].mapping.items()
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
    next.metadata[Inject_code_start] = inject
    ctx.statement_out.write("{")
    with ctx.statement_out:
        for k, _ in params:
            inject.code.append(f"{k} = {k}\n")
        inner_ctx = replace(ctx, node=next)
        ctx.current_step.process_node(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("PIL:access_field")
def access_field(ctx: MacroContext):
    args1 = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args1) == 2, ctx.node, "first argument is object, second is field")
    obj = args1[0]
    field = args1[1] # TODO - convert field to JS valid value
    field_access = js_field_access(field)
    ident = ctx.compiler.get_new_ident("_".join(args1))

    args: list[str | None] = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child node for assignment")
        ctx.statement_out.write(f"{obj}{field_access} = {args[-1]}\n")
    ctx.statement_out.write(f"const {ident} = await {obj}{field_access}\n")
    ctx.expression_out.write(ident)

@macros.add("PIL:access_index")
def access_index(ctx: MacroContext):
    args = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the object into which we should index")
    
    obj = args[0]
    ident = ctx.compiler.get_new_ident("_".join(args)) # TODO - pass index name too (doable...)

    args: list[str] = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = [a for a in args if a]

    ctx.compiler.assert_(len(args) >= 1, ctx.node, "first child used as indexing key")
    key = args[0]

    if len(args) > 1:
        ctx.compiler.assert_(len(args) == 2, ctx.node, "second child used for assignment")
        ctx.statement_out.write(f"{obj}[{key}] = {args[1]}\n")

    ctx.statement_out.write(f"const {ident} = await {obj}[{key}]\n")
    ctx.expression_out.write(ident)

@macros.add("PIL:access_local")
def pil_access_local(ctx: MacroContext):
    args1 = ctx.node.metadata[Args].split(" ")
    ctx.compiler.assert_(len(args1) == 1, ctx.node, "single argument, the object into which we should index")
    
    local = args1[0]
    ident = ctx.compiler.get_new_ident("_".join(args1)) # TODO - pass index name too (doable...)

    args: list[str | None] = []
    for child in ctx.node.children:
        e = IndentedStringIO()
        ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
        args.append(e.getvalue())
    args = list(filter(None, args))

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
        ctx.statement_out.write(f"{local} = {args[-1]}\n")

    ctx.statement_out.write(f"const {ident} = await {local}\n")
    ctx.expression_out.write(ident)

@macros.add("local")
def local(ctx: MacroContext):
    name, _ = cut(ctx.node.metadata[Args], " ") # TODO assert one arg
    args: list[str | None] = []
    if len(ctx.node.children) > 0:
        # ctx.compiler.assert_(len(ctx.node.children) == 1, ctx.node, "single child, the value") TODO!
        for child in ctx.node.children:
            e = IndentedStringIO()
            ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
            args.append(e.getvalue())
    args = list(filter(None, args))
    ctx.statement_out.write(f"let {name}")
    if len(args) > 0:
        ctx.statement_out.write(f" = {args[-1]}")
    ctx.statement_out.write(f"\n")
    ctx.expression_out.write(name)

@singleton
class PIL_call:
    @classmethod
    def resolve_convention(cls, ctx: MacroContext):
        args = ctx.node.metadata[Args].split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
        
        fn = args[0]

        convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)
        if fn in builtin_calls:
            convention = builtin_calls[fn]
        if fn in builtins:
            convention = DirectCall(fn=builtins[fn], demands=None, receiver="indentifire", returns=None)

        return convention

    def __init__(self):
        @typecheck.add("PIL:call")
        def _(ctx: MacroContext):
            convention = self.resolve_convention(ctx)

            args: list[str | None] = []
            for child in ctx.node.children:
                # Find the typecheck step to handle type checking
                typecheck_step = ctx.current_step
                # Import here to avoid circular imports
                from typecheck_macros import TypeCheckingStep
                assert isinstance(typecheck_step, TypeCheckingStep)
                received = typecheck_step.process_node(replace(ctx, node=child))
                args.append(received)
            args = [a for a in args if a]

            if convention.demands:
                for received, demanded in zip(args, convention.demands):
                    if "*" in {demanded, received}:
                        # TODO. generics!
                        continue
                    print(f"{ctx.node.content} demanded {demanded} and was given {received}")
                    # TODO - this should point to the child node that we received from, actually...
                    ctx.compiler.assert_(received == demanded, ctx.node, f"argument demands {demanded} and is given {received}")

            return convention.returns or "*"

        @macros.add("PIL:call")
        def _(ctx: MacroContext):
            args1 = ctx.node.metadata[Args].split(" ")
            ident = ctx.compiler.get_new_ident("_".join(args1))
            convention = self.resolve_convention(ctx)
            args: list[str | None] = []
            for child in ctx.node.children:
                e = IndentedStringIO()
                ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
                args.append(e.getvalue())

            call = convention.compile([a for a in args if a])

            ctx.statement_out.write(f"const {ident} = await {call}\n")
            ctx.expression_out.write(ident)

@macros.add("exists")
def exists_inside(ctx: MacroContext):
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.exists_inside(", [ctx.node.metadata[Target]] + ctx.node.children)
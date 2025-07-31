from dataclasses import replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtins, builtin_calls, DirectCall, seek_child_macro, cut,
    unified_macros, unified_typecheck
)
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, Target, ResolvedConvention
from common_utils import collect_child_expressions, get_single_arg, get_two_args
from logger import default_logger

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

@macros.add("fn")
def fn(ctx: MacroContext):
    args = get_single_arg(ctx, "must have a single arg - fn name")
    ctx.statement_out.write(f"const {args} = async function (")
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
        for k, _ in params:
            inject.code.append(f"{k} = {k}\n")
        inner_ctx = replace(ctx, node=next)
        ctx.current_step.process_node(inner_ctx)
    ctx.statement_out.write("}")

@macros.add("PIL:access_field")
def access_field(ctx: MacroContext):
    obj, field = get_two_args(ctx, "first argument is object, second is field")
    field_access = js_field_access(field)
    ident = ctx.compiler.get_new_ident("_".join([obj, field]))

    args = collect_child_expressions(ctx)

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child node for assignment")
        ctx.statement_out.write(f"{obj}{field_access} = {args[-1]}\n")
    ctx.statement_out.write(f"const {ident} = await {obj}{field_access}\n")
    ctx.expression_out.write(ident)

@macros.add("PIL:access_index")
def access_index(ctx: MacroContext):
    obj = get_single_arg(ctx, "single argument, the object into which we should index")
    ident = ctx.compiler.get_new_ident(obj) # TODO - pass index name too (doable...)

    args: list[str] = collect_child_expressions(ctx)

    ctx.compiler.assert_(len(args) >= 1, ctx.node, "first child used as indexing key")
    key = args[0]

    if len(args) > 1:
        ctx.compiler.assert_(len(args) == 2, ctx.node, "second child used for assignment")
        ctx.statement_out.write(f"{obj}[{key}] = {args[1]}\n")

    ctx.statement_out.write(f"const {ident} = await {obj}[{key}]\n")
    ctx.expression_out.write(ident)

@macros.add("PIL:access_local")
def pil_access_local(ctx: MacroContext):
    args_str = ctx.compiler.get_metadata(ctx.node, Args)
    args1 = args_str.split(" ")
    ctx.compiler.assert_(len(args1) == 1, ctx.node, "single argument, the object into which we should index")
    
    local = args1[0]
    ident = ctx.compiler.get_new_ident(local) # TODO - pass index name too (doable...)

    args = collect_child_expressions(ctx)

    if len(args) > 0:
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
        ctx.statement_out.write(f"{local} = {args[-1]}\n")

    ctx.statement_out.write(f"const {ident} = await {local}\n")
    ctx.expression_out.write(ident)

@macros.add("local")
def local(ctx: MacroContext):
    args = ctx.compiler.get_metadata(ctx.node, Args)
    name, _ = cut(args, " ") # TODO assert one arg
    
    args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
    
    ctx.statement_out.write(f"let {name}")
    if len(args) > 0:
        ctx.statement_out.write(f" = {args[-1]}")
    ctx.statement_out.write(f"\n")
    ctx.expression_out.write(name)

@singleton
class PIL_call:
    @classmethod
    def resolve_convention(cls, ctx: MacroContext, actual_arg_types: list[str] = None):
        args_str = ctx.compiler.get_metadata(ctx.node, Args)
        args = args_str.split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
        
        fn = args[0]

        convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)
        if fn in builtin_calls:
            overloads = builtin_calls[fn]
            if isinstance(overloads, list):
                # Multiple overloads - need to match by parameter types
                if actual_arg_types:
                    for overload in overloads:
                        if cls._matches_signature(actual_arg_types, overload.demands):
                            convention = overload
                            break
                    else:
                        # No matching overload found, use the first one for now
                        # This will cause a type error later which is what we want
                        convention = overloads[0]
                else:
                    # No type information available, use first overload
                    convention = overloads[0]
            else:
                # Legacy single overload
                convention = overloads
        if fn in builtins:
            convention = DirectCall(fn=builtins[fn], demands=None, receiver="indentifire", returns=None)

        return convention

    @classmethod
    def _matches_signature(cls, actual_types: list[str], demanded_types: list[str]) -> bool:
        """Check if actual parameter types match the demanded signature"""
        if len(actual_types) != len(demanded_types):
            return False
        
        for actual, demanded in zip(actual_types, demanded_types):
            # "*" matches anything
            if demanded == "*" or actual == "*":
                continue
            if actual != demanded:
                return False
        return True

    def __init__(self):
        @typecheck.add("PIL:call")
        def _(ctx: MacroContext):
            # First, determine the actual parameter types
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

            # Now resolve the convention with actual parameter types
            convention = self.resolve_convention(ctx, args)
            
            # Store the resolved convention in metadata for later use during compilation
            ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention(convention=convention))

            if convention.demands:
                for received, demanded in zip(args, convention.demands):
                    if "*" in {demanded, received}:
                        # TODO. generics!
                        continue
                    default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received}")
                    # TODO - this should point to the child node that we received from, actually...
                    ctx.compiler.assert_(received == demanded, ctx.node, f"argument demands {demanded} and is given {received}")

            return convention.returns or "*"

        @macros.add("PIL:call")
        def _(ctx: MacroContext):
            args_str = ctx.compiler.get_metadata(ctx.node, Args)
            args1 = args_str.split(" ")
            ident = ctx.compiler.get_new_ident("_".join(args1))
            
            # Try to get the resolved convention from metadata first
            try:
                resolved_conv = ctx.compiler.get_metadata(ctx.node, ResolvedConvention)
                convention = resolved_conv.convention
            except KeyError:
                # Fallback to the old method if metadata not available
                convention = self.resolve_convention(ctx)
            
            args = collect_child_expressions(ctx)

            call = convention.compile(args)

            ctx.statement_out.write(f"const {ident} = await {call}\n")
            ctx.expression_out.write(ident)

@macros.add("exists")
def exists_inside(ctx: MacroContext):
    # look for inside modifier among children
    target = None
    other_children = []
    
    for child in ctx.node.children:
        macro, _ = cut(child.content, " ")
        if macro == "inside":
            args_str = ctx.compiler.get_metadata(child, Args)
            ctx.compiler.assert_(args_str.strip() == "", child, "inside must have no arguments")
            ctx.compiler.assert_(len(child.children) == 1, child, "inside must have one child")
            target = child.children[0]
            default_logger.macro(f"inside modifier found, target set to: {target.content}")
        else:
            other_children.append(child)
    
    ctx.compiler.assert_(target is not None, ctx.node, "exists must have an inside modifier")
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.exists_inside(", [target] + other_children)
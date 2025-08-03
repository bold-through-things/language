from dataclasses import replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtins, builtin_calls, DirectCall, seek_child_macro, cut, to_valid_js_ident,
    unified_macros, unified_typecheck, walk_upwards_for_local_definition
)
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, Target, ResolvedConvention, Node
from common_utils import collect_child_expressions, get_single_arg, get_two_args
from error_types import ErrorType
from logger import default_logger

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

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

# Preprocessing for 'fn' macro  
def fn_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'fn' macro - sets up identifiers and parameters"""
    from processor_base import seek_all_child_macros
    
    desired_name = get_single_arg(ctx)
    actual_name = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
    
    # TODO - also hate this hack.
    for child in seek_all_child_macros(ctx.node, "param"):
        name = get_single_arg(replace(ctx, node=child))
        ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))

    for child in ctx.node.children:
        ctx.current_step.process_node(replace(ctx, node=child))

# Preprocessing for 'param' macro
def param_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'param' macro - registers parameters"""
    args = get_single_arg(ctx, "param must have one argument - the name")
    parent = ctx.node.parent
    
    default_logger.macro(f"param '{args}'")
    
    assert parent != None
    ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
    parent_macro = ctx.compiler.get_metadata(parent, Macro)
    ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
    params = ctx.compiler.get_metadata(parent, Params)
    params.mapping[args] = True

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

@macros.add("local")
def local(ctx: MacroContext):
    desired_name = get_single_arg(ctx)
    name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
    
    args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
    
    ctx.statement_out.write(f"let {name}")
    if len(args) > 0:
        ctx.statement_out.write(f" = {args[-1]}")
    ctx.statement_out.write(f"\n")
    ctx.expression_out.write(name)

# Preprocessing for 'local' macro
def local_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'local' macro - sets up identifiers"""
    desired_name = get_single_arg(ctx)
    actual_name = ctx.compiler.get_new_ident(desired_name)
    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)

@singleton
class Macro_67lang_call:
    @classmethod
    def resolve_convention(cls, ctx: MacroContext, actual_arg_types: list[str] = None):
        args_str = ctx.compiler.get_metadata(ctx.node, Args)
        args = args_str.split(" ")
        ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
        
        fn = args[0]

        convention = None
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
        elif fn in builtins:
            convention = DirectCall(fn=builtins[fn], demands=None, receiver="_67lang", returns=None)
        else:
            res = walk_upwards_for_local_definition(ctx, fn)
            ctx.compiler.assert_(res != None, ctx.node, f"{fn} must refer to a defined function")
            fn = ctx.compiler.get_metadata(res.node, SaneIdentifier)
            convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)

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
        @typecheck.add("67lang:call")
        def _(ctx: MacroContext):
            # First, determine the actual parameter types
            args: list[str | None] = []
            for child in ctx.node.children:
                # Find the typecheck step to handle type checking
                typecheck_step = ctx.current_step
                # Import here to avoid circular imports
                from steps.typecheck_step import TypeCheckingStep
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
                    ctx.compiler.assert_(received == demanded, ctx.node, f"argument demands {demanded} and is given {received}", ErrorType.ARGUMENT_TYPE_MISMATCH)

            return convention.returns or "*"

        @macros.add("67lang:call")
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
    ctx.compiler.compile_fn_call(ctx, f"await _67lang.exists_inside(", [target] + other_children)

# Preprocessing for 'access' (a, an, access) macro
def access_preprocessing(ctx: MacroContext):
    """Preprocessing logic for 'access' macro - handles access chain unrolling"""
    from processor_base import builtin_calls
    from strutil import cut
    from node import Position, Indexers, Callers
    
    args = ctx.compiler.get_metadata(ctx.node, Args)
    parent = ctx.node.parent
    
    assert parent != None
    assert ctx.node.content.split(" ")[0] in {"a", "an", "access"}, ctx.node.content
    
    # contextually process substituting and calling modifiers among children
    indexers = {}
    callers = {}
    other_children = []
    
    for child in ctx.node.children:
        macro, _ = cut(child.content, " ")
        if macro == "where" and "is" in child.content:
            # New syntax: "where $id is"
            parts = child.content.split(" ")
            if len(parts) >= 3 and parts[2] == "is":
                key = parts[1]
            else:
                ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
            
            default_logger.macro(f"substituting '{key}'")
            
            if len(child.children) >= 1:
                default_logger.debug(f"substituting '{key}' with {len(child.children)} child nodes")
                indexers[key] = child.children
            else:
                # shortcut for when the substitution is literal (i.e. most cases)
                default_logger.debug(f"substituting '{key}' with literal access")
                access = ctx.compiler.make_node(f"a {key}", ctx.node.pos or Position(0, 0), children=None)
                indexers[key] = [access]
        elif macro == "where" and "takes" in child.content:
            # New syntax: "where $id takes"
            parts = child.content.split(" ")
            if len(parts) >= 3 and parts[2] == "takes":
                key = parts[1]
            else:
                ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
            
            default_logger.macro(f"calling '{key}' with {len(child.children)} children")
            
            ctx.compiler.assert_(len(child.children) >= 1, child, "calling must have at least one child")
            callers[key] = child.children
        else:
            other_children.append(child)
    
    steps: list[str] = args.split(" ")
    subs = indexers | callers
    last_chain_ident = None
    replace_with: list[Node] = []
    p0 = Position(0, 0)
    
    for step in steps:
        ident = ctx.compiler.get_new_ident(step)
        step_is_last = step == steps[-1]
        children = list(filter(lambda n: not n.content.startswith("noscope"), other_children))
        step_needs_call = step in builtin_calls or (step_is_last and len(children) > 1) or step in callers
        args1: list[Node] = []
        if step in subs:
            args1 = subs[step]
        if step_is_last:
            args1 += other_children

        local: list[Node] = []
        if step in indexers:
            # index
            local.append(ctx.compiler.make_node(f"67lang:access_index {last_chain_ident}", ctx.node.pos or p0, args1))
            for arg in args1:                        
                ctx.current_step.process_node(replace(ctx, node=arg))
        elif step_needs_call:
            # call or set
            self_arg = []
            if last_chain_ident:
                self_arg = [ctx.compiler.make_node(f"67lang:access_local {last_chain_ident}", ctx.node.pos or p0, [])]
            local.append(ctx.compiler.make_node(f"67lang:call {step}", ctx.node.pos or p0, self_arg + args1))
            local.append(ctx.compiler.make_node("67lang:auto_type", ctx.node.pos or p0, []))
            for arg in args1:
                ctx.current_step.process_node(replace(ctx, node=arg))
        else:
            # static field
            access = f"access_field {last_chain_ident}" if last_chain_ident else "access_local"
            local.append(ctx.compiler.make_node(f"67lang:{access} {step}", ctx.node.pos or p0, args1))
            local.append(ctx.compiler.make_node("67lang:auto_type", ctx.node.pos or p0, []))
            for arg in args1:
                ctx.current_step.process_node(replace(ctx, node=arg))

        local_node = ctx.compiler.make_node(f"local {ident}", ctx.node.pos or p0, children=local)
        last_chain_ident = ident
        replace_with.append(local_node)
        
    replace_with = list(filter(None, [ctx.compiler.make_node("noscope", ctx.node.pos or p0, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
    # print(f"replace child {ctx.node.content} of {parent.content} with {[c.content for c in replace_with]}")
    parent.replace_child(ctx.node, replace_with)
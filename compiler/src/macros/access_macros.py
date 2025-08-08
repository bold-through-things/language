from dataclasses import replace
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtins, builtin_calls, DirectCall, seek_child_macro, cut, to_valid_js_ident,
    unified_macros, unified_typecheck, walk_upwards_for_local_definition
)
from macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, Target, ResolvedConvention, Node
from common_utils import collect_child_expressions, get_single_arg, get_two_args, collect_child_types
from error_types import ErrorType
from logger import default_logger
from typecheck_macros import TypeCheckingStep

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

class Fn_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
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

class Access_field_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
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

class Access_index_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
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

class Access_local_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def emission(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        res = walk_upwards_for_local_definition(ctx, desired_name)
        ctx.compiler.assert_(res != None, ctx.node, f"{desired_name} must access a defined local", ErrorType.NO_SUCH_LOCAL)
        actual_name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or desired_name

        args = collect_child_expressions(ctx)

        if len(args) > 0:
            ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
            ctx.statement_out.write(f"{actual_name} = {args[-1]}\n")

        ctx.expression_out.write(actual_name)

    def typecheck(self, ctx: MacroContext):
        first = get_single_arg(ctx, "single argument, the name of local")

        # Use utility function to collect child types
        types = collect_child_types(ctx)

        # Use upward walking to find local variable definition
        from processor_base import walk_upwards_for_local_definition
        res = walk_upwards_for_local_definition(ctx, first)
        ctx.compiler.assert_(res != None, ctx.node, f"{first} must access a defined local", ErrorType.NO_SUCH_LOCAL)
        demanded = res.type
        
        if demanded and demanded != "*":
            if len(types) > 0:
                # TODO - support multiple arguments
                ctx.compiler.assert_(len(types) == 1, ctx.node, f"only support one argument for now (TODO!)", ErrorType.WRONG_ARG_COUNT)
                received = types[0]
                ctx.compiler.assert_(received in {demanded, "*"}, ctx.node, f"field demands {demanded} but is given {received}", ErrorType.FIELD_TYPE_MISMATCH)
            default_logger.typecheck(f"{ctx.node.content} demanded {demanded}")
            return demanded or "*"
        return "*"


class Local_macro_provider(Macro_emission_provider, Macro_typecheck_provider):
    def emission(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
        
        args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
        
        ctx.statement_out.write(f"let {name}")
        if len(args) > 0:
            ctx.statement_out.write(f" = {args[-1]}")
        ctx.statement_out.write(f"\n")
        ctx.expression_out.write(name)

    def typecheck(self, ctx: MacroContext):
        type_node = seek_child_macro(ctx.node, "type")

        received = None
        typecheck_step = ctx.current_step
        assert isinstance(typecheck_step, TypeCheckingStep)
        for child in ctx.node.children:
            received = typecheck_step.process_node(replace(ctx, node=child)) or received

        if not type_node:
            # TODO. this should be mandatory.
            if not seek_child_macro(ctx.node, "67lang:auto_type") or not received:
                return received
            type_node = Node(f"type {received}", ctx.node.pos, [])
        
        _, demanded = cut(type_node.content, " ")
        default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received} (children {[c.content for c in ctx.node.children]})")
        
        # Store the local variable type information in compiler metadata for upward walking
        from node import FieldDemandType
        ctx.compiler.set_metadata(ctx.node, FieldDemandType, demanded)
        
        # Also verify type matching if we have demanded type
        if demanded:
            if received is None:
                # If we have a demanded type but no received value, that's an error
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given None", ErrorType.MISSING_TYPE)
            elif received not in {"*", demanded}:
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given {received}", ErrorType.FIELD_TYPE_MISMATCH)
        
        return demanded or received or "*"




class Exists_macro_provider(Macro_emission_provider):
    def emission(self, ctx: MacroContext):
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
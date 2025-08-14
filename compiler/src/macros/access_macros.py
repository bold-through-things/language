from dataclasses import replace
from google_ai_research_sucks import NEWLINE_FUCK
from processor_base import (
    MacroProcessingStep, singleton, js_field_access, 
    builtin_calls, DirectCall, seek_child_macro, seek_all_child_macros, cut, to_valid_js_ident,
    walk_upwards_for_local_definition
)
from macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider, Macro_preprocess_provider, MacroRegistry
from strutil import IndentedStringIO, Joiner
from node import Args, Macro, Params, Inject_code_start, SaneIdentifier, ResolvedConvention, Node, Position
from common_utils import collect_child_expressions, get_single_arg, get_two_args, collect_child_types
from error_types import ErrorType
from logger import default_logger
from typecheck_macros import TypeCheckingStep
from preprocessing_macros import PreprocessingStep



class Fn_macro_provider(Macro_emission_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        # Hoist fn definitions to the root
        if ctx.node.parent and ctx.node.parent != ctx.compiler.root_node:
            # Prepend to root children (this will also remove it from its old parent)
            ctx.compiler.root_node.prepend_child(ctx.node)

        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
        
        param_demands = []
        # TODO - also hate this hack.
        for child in seek_all_child_macros(ctx.node, "param"):
            name = get_single_arg(replace(ctx, node=child))
            param_demands.append("*") # Add a demand for each parameter
            ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))
        
        ctx.compiler.add_dynamic_convention(desired_name, DirectCall(fn=actual_name, receiver=None, demands=param_demands, returns="*"))

        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))

    def register_type(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name

        param_demands = []
        for child in seek_all_child_macros(ctx.node, "param"):
            param_demands.append("*") # Add a demand for each parameter

        ctx.compiler.add_dynamic_convention(desired_name, DirectCall(fn=actual_name, receiver=None, demands=param_demands, returns="*"))

    def emission(self, ctx: MacroContext):
        name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or name
        ctx.statement_out.write(f"const {name} = async function (")
        joiner = Joiner(ctx.statement_out, ", " + NEWLINE_FUCK)
        params_metadata = ctx.compiler.get_metadata(ctx.node, Params)
        params = params_metadata.mapping.items()
        if len(params) > 0:
            ctx.statement_out.write(NEWLINE_FUCK)
        with ctx.statement_out:
            for k, _ in params:
                with joiner:
                    # just the name for now - this is JavaScript. in future we'd probably want JSDoc here too
                    ctx.statement_out.write(k)
        if len(params) > 0:
            ctx.statement_out.write(NEWLINE_FUCK)
        ctx.statement_out.write(") ")
        next = seek_child_macro(ctx.node, "do")

        ctx.compiler.assert_(next != None, ctx.node, "must have a do block")

        inject = Inject_code_start()
        ctx.compiler.set_metadata(next, Inject_code_start, inject)
        ctx.statement_out.write("{")
        with ctx.statement_out:
            # TODO. this is absolute legacy. i'm fairly sure this does nothing by now
            for k, _ in params:
                inject.code.append(f"{k} = {k}" + NEWLINE_FUCK)
            inner_ctx = replace(ctx, node=next)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}" + NEWLINE_FUCK)




class Local_macro_provider(Macro_emission_provider, Macro_typecheck_provider, Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        # Process children first
        with default_logger.indent("macro", f"preprocessing children of {ctx.node.content}"):
            for i, child in enumerate(ctx.node.children):
                with default_logger.indent("macro", f"child {i}: {child.content}"):
                    with ctx.compiler.safely:
                        child_ctx = replace(ctx, node=child)
                        ctx.current_step.process_node(child_ctx)

        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)

    def emission(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
        
        args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
        
        ctx.statement_out.write(f"let {name}")
        if len(args) > 0:
            ctx.statement_out.write(f" = {args[-1]}")
        ctx.statement_out.write(NEWLINE_FUCK)
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
                return received or "*"
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
                
            else:
                other_children.append(child)
        
        ctx.compiler.assert_(target is not None, ctx.node, "exists must have an inside modifier")
        ctx.compiler.compile_fn_call(ctx, f"await _67lang.exists_inside(", [target] + other_children)

class Param_macro_provider(Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        args = get_single_arg(ctx, "param must have one argument - the name")
        parent = ctx.node.parent
        
        
        
        assert parent != None
        ctx.compiler.assert_(len(ctx.node.children) == 0, ctx.node, "param must have no children")
        parent_macro = ctx.compiler.get_metadata(parent, Macro)
        ctx.compiler.assert_(parent_macro == "fn", ctx.node, "params must be inside fn")
        params = ctx.compiler.get_metadata(parent, Params)
        params.mapping[args] = True

class Access_macro_provider(Macro_preprocess_provider):
    def preprocess(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        parent = ctx.node.parent
        
        assert parent != None
        assert ctx.node.content.split(" ")[0] in {"a", "an", "access"}, ctx.node.content
        
        # contextually process substituting and calling modifiers among children
        callers = {}
        other_children = []
        
        for child in ctx.node.children:
            macro, _ = cut(child.content, " ")
            if macro == "where" and "takes" in child.content:
                # New syntax: "where $id takes"
                parts = child.content.split(" ")
                if len(parts) >= 3 and parts[2] == "takes":
                    key = parts[1]
                else:
                    ctx.compiler.assert_(False, child, "where clause must be 'where $id is' or 'where $id takes'")
                
                
                
                ctx.compiler.assert_(len(child.children) >= 1, child, "calling must have at least one child")
                callers[key] = child.children
            else:
                other_children.append(child)
        
        steps: list[str] = args.split(" ")
        last_chain_ident = None
        replace_with: list[Node] = []
        p0 = Position(0, 0)
        
        from processor_base import builtin_calls
        
        nodes_to_process: list[Node] = []

        for i, step in enumerate(steps):
            ident = ctx.compiler.get_new_ident(step)
            step_is_last = step == steps[-1]
            
            args1: list[Node] = []
            if step in callers:
                args1 = callers[step]
            if step_is_last:
                args1 += other_children

            local: list[Node] = []
            
            self_arg = []
            if last_chain_ident:
                self_arg = [ctx.compiler.make_node(f"67lang:call {last_chain_ident}", ctx.node.pos or p0, [])]
            
            local.append(ctx.compiler.make_node(f"67lang:call {step}", ctx.node.pos or p0, self_arg + args1))
            local.append(ctx.compiler.make_node("67lang:auto_type", ctx.node.pos or p0, []))
            nodes_to_process.extend(args1)

            local_node = ctx.compiler.make_node(f"local {ident}", ctx.node.pos or p0, children=local)
            nodes_to_process.append(local_node)
            last_chain_ident = ident
            replace_with.append(local_node)
            
        replace_with = list(filter(None, [ctx.compiler.make_node("noscope", ctx.node.pos or p0, replace_with[:-1]) if len(replace_with) > 1 else None, replace_with[-1]]))
        parent.replace_child(ctx.node, replace_with)

        for node in nodes_to_process:
            assert isinstance(ctx.current_step, PreprocessingStep)
            ctx.current_step.process_node(replace(ctx, node=node))
from dataclasses import replace
from processor_base import MacroProcessingStep, seek_all_child_macros, seek_child_macro, unroll_parent_chain
from macro_registry import MacroContext, MacroRegistry
from node import Indexers, Callers, Macro, Args, SaneIdentifier, Target, Params, Position, Node
from common_utils import get_single_arg
from logger import default_logger
from strutil import cut


class PreprocessingStep(MacroProcessingStep):
    """First step: preprocessing macros that modify the AST structure"""
    
    def __init__(self, preprocessor_registry: MacroRegistry):
        super().__init__()
        self.macros = preprocessor_registry
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during preprocessing"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        default_logger.macro(f"preprocessing macro: {macro}")
        
        if macro in all_macros:
            try:
                all_macros[macro](ctx)
            except Exception as e:
                from error_types import ErrorType
                ctx.compiler.compile_error(ctx.node, f"preprocessor failed: {e}", ErrorType.UNKNOWN_ERROR)
        else:
            # Standard child processing for unregistered macros
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)


# Macro functions that will be registered by the compiler
class LocalMacro:
    def __call__(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)


class ForMacro:
    def __call__(self, ctx: MacroContext):
        # TODO. yes i really do hate this hack. really what we should just do is unroll `for` into the
        #  manual while true early into the processing
        args = ctx.compiler.get_metadata(ctx.node, Args)
        args = args.split(" ")
        name = args[0] # TODO - this won't support any identifier, it probably should!

        # print("processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])
        ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))
        # print("done processing", ctx.node.content, "with children", [c.content for c in ctx.node.children])

        for child in ctx.node.children:
            ctx.current_step.process_node(replace(ctx, node=child))


class FnMacro:
    def __call__(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
        
        # TODO - also hate this hack.
        for child in seek_all_child_macros(ctx.node, "param"):
            name = get_single_arg(replace(ctx, node=child))
            ctx.node.prepend_child(Node(f"67lang:assume_local_exists {name}", pos=ctx.node.pos, children=[]))

        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)


class WhileMacro:
    def __call__(self, ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)


class SubstitutingMacro:
    def __init__(self, substitute_with: str):
        self.substitute_with = substitute_with
        
    def __call__(self, ctx: MacroContext):
        ctx.node.children = []
        if "=" in self.substitute_with:
            from macros.comment_macros import call_with_match_and_continue_processing
            call_with_match_and_continue_processing(ctx, self.substitute_with)
        else:
            args = ctx.compiler.get_metadata(ctx.node, Args)
            ctx.node.content = f"{self.substitute_with} {args}".strip()
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)


class CallingMacro:
    def __init__(self, call_fn: str):
        self.call_fn = call_fn
        
    def __call__(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        from macros.comment_macros import call_with_match_and_continue_processing
        call_with_match_and_continue_processing(ctx, f"{self.call_fn}={args}")


class ParamMacro:
    def __call__(self, ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        actual_name = ctx.compiler.get_new_ident(desired_name)
        ctx.compiler.set_metadata(ctx.node, SaneIdentifier, actual_name)
        from node import FieldDemandType
        
        type_node = seek_child_macro(ctx.node, "type")
        if type_node:
            demanded_type = get_single_arg(replace(ctx, node=type_node))
            ctx.compiler.set_metadata(ctx.node, FieldDemandType, demanded_type)
        else:
            ctx.compiler.set_metadata(ctx.node, FieldDemandType, "*")


class AccessMacro:
    def __call__(self, ctx: MacroContext):
        args = ctx.compiler.get_metadata(ctx.node, Args)
        args = args.split(" ")
        
        # TODO. garbage, should reconsider this.
        ctx.compiler.set_metadata(ctx.node, Target, args[0] if len(args) > 0 else "")
        ctx.compiler.set_metadata(ctx.node, Params, args[1:])
        
        # TODO i really, really don't like this! why not just the parent, always?
        parent_chain = unroll_parent_chain(ctx.node.parent)
        parent_node = parent_chain[0] if parent_chain else None
        if parent_node is None:
            return
        parent_macro = ctx.compiler.get_metadata(parent_node, Macro)
        
        if parent_macro == "local":
            ctx.node.content = f"67lang:access_local {args[0]}"
            for arg in args[1:]:
                ctx.node.append_child(Node(f"literal {arg}", pos=ctx.node.pos, children=[]))
        elif parent_macro == "for":
            ctx.node.content = f"67lang:access_local {args[0]}"
            for arg in args[1:]:
                ctx.node.append_child(Node(f"literal {arg}", pos=ctx.node.pos, children=[]))
        elif parent_macro == "fn":
            # TODO - terrible, needs context
            
            # TODO. really can't do this. what if the function uses multiple return? would we rewrite every access?
            # also what if the same fn is rewritten multiple times? bad!
            desired_fn_name = get_single_arg(replace(ctx, node=parent_node))
            actual_fn_name = ctx.compiler.maybe_metadata(parent_node, SaneIdentifier) or desired_fn_name
            
            ctx.node.content = f"call {actual_fn_name}"
            for arg in args:
                ctx.node.append_child(Node(f"access {arg}", pos=ctx.node.pos, children=[]))
        else:
            default_logger.log("preprocessing", f"access within {parent_macro}")
            ctx.node.content = f"67lang:access {args[0]}"
            for arg in args[1:]:
                ctx.node.append_child(Node(f"literal {arg}", pos=ctx.node.pos, children=[]))
        
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
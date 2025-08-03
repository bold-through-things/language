from dataclasses import replace
from processor_base import MacroProcessingStep, seek_child_macro, seek_parent_scope
from macro_registry import MacroContext, MacroRegistry
from strutil import cut
from node import Node, Macro
from common_utils import collect_child_types, get_single_arg, process_children_with_context
from logger import default_logger
from error_types import ErrorType


class TypeCheckingStep(MacroProcessingStep):
    """Third step: type checking and validation"""
    
    def __init__(self, typecheck_registry: MacroRegistry):
        super().__init__()
        self.macros = typecheck_registry
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during type checking"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        default_logger.typecheck(f"type checking macro: {macro}")
        
        if macro in all_macros:
            try:
                result = all_macros[macro](ctx)
                # Store type result if returned
                if result is not None:
                    from node import TypeResult
                    ctx.compiler.set_metadata(ctx.node, TypeResult, result)
            except Exception as e:
                ctx.compiler.compile_error(ctx.node, f"type checker failed: {e}", ErrorType.UNKNOWN_ERROR)
        else:
            # Standard child processing for unregistered macros
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)


# Macro classes that will be registered by the compiler
class MustCompileErrorTypecheck:
    def __call__(self, ctx: MacroContext):
        # Process children to generate type errors during type checking step
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)


class AccessLocalTypecheck:
    def __call__(self, ctx: MacroContext):
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


class LocalTypecheck:
    def __call__(self, ctx: MacroContext):
        type_node = seek_child_macro(ctx.node, "type")

        received = None
        typecheck_step = ctx.current_step
        assert isinstance(typecheck_step, TypeCheckingStep)
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            typecheck_step.process_node(child_ctx)
            macro = str(ctx.compiler.get_metadata(child, Macro))
            if macro not in {"type", "noscope", "67lang:auto_type"}:
                from node import TypeResult
                result = ctx.compiler.maybe_metadata(child, TypeResult)
                if result:
                    received = result

        if type_node:
            demanded = get_single_arg(replace(ctx, node=type_node))
            if received and demanded != "*":
                ctx.compiler.assert_(received in {demanded, "*"}, ctx.node, f"local variable demands {demanded} but has {received}", ErrorType.VARIABLE_TYPE_MISMATCH)
                default_logger.typecheck(f"{ctx.node.content} received {received}, demanded {demanded}")
            return demanded
        return received or "*"


class CallTypecheck:
    def __call__(self, ctx: MacroContext):
        # Process all arguments to get their types
        arg_types = collect_child_types(ctx)
        
        # For now, return a generic type
        # TODO: Implement proper function type checking
        return "*"


class LiteralTypecheck:
    def __call__(self, ctx: MacroContext):
        from node import Args
        args = ctx.compiler.get_metadata(ctx.node, Args)
        
        # Determine type based on literal content
        if not args:
            return "str"
        
        # Try to determine type from the literal value
        if args == "true" or args == "false":
            return "bool"
        
        try:
            int(args)
            return "int" 
        except ValueError:
            pass
            
        try:
            float(args)
            return "float"
        except ValueError:
            pass
            
        # Default to string
        return "str"


class WhileTypecheck:
    def __call__(self, ctx: MacroContext):
        # Process children
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
        return None


class ForTypecheck:
    def __call__(self, ctx: MacroContext):
        # Process children
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
        return None


class IfTypecheck:
    def __call__(self, ctx: MacroContext):
        # Process children
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
        return None
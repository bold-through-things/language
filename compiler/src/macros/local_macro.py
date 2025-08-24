"""Local variable definition macro."""

from dataclasses import replace
from pipeline.js_conversion import NEWLINE
from pipeline.steps import seek_child_macro, TypeCheckingStep
from core.macro_registry import MacroContext, Macro_emission_provider, Macro_typecheck_provider, Macro_preprocess_provider
from core.node import SaneIdentifier, Node
from utils.common_utils import collect_child_expressions, get_single_arg
from utils.logger import default_logger
from utils.error_types import ErrorType
from utils.strutil import cut
from compiler_types.proper_types import Type, TypeParameter
from core.exceptions import graceful_typecheck

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
        ctx.statement_out.write(NEWLINE)
        ctx.expression_out.write(name)

    @graceful_typecheck
    def typecheck(self, ctx: MacroContext):
        # Collect type parameter and received type from children
        demanded_type = None
        received_type = None
        
        typecheck_step = ctx.current_step
        assert isinstance(typecheck_step, TypeCheckingStep)
        
        for child in ctx.node.children:
            child_result = typecheck_step.process_node(replace(ctx, node=child))
            
            if isinstance(child_result, TypeParameter):
                # This is a type declaration
                demanded_type = child_result.type_expr
            elif isinstance(child_result, Type):
                # This is a value with a type
                received_type = child_result
            elif child_result is not None:
                # Legacy string type - need to handle during transition
                default_logger.typecheck(f"Warning: got legacy string type {child_result}")
                # For now, just use the received value for compatibility
                received_type = child_result

        # Always error if no value provided (avoid Billion Dollar Mistake)
        if received_type is None:
            ctx.compiler.assert_(False, ctx.node, f"field demands {demanded_type or 'a value'} but is given None", ErrorType.MISSING_TYPE)
        
        # Type inference if no explicit type declared
        if demanded_type is None:
            demanded_type = received_type
        
        default_logger.typecheck(f"{ctx.node.content} demanded {demanded_type} and was given {received_type}")
        
        # Store the local variable type information for upward walking
        from core.node import FieldDemandType
        ctx.compiler.set_metadata(ctx.node, FieldDemandType, demanded_type)
        
        # Verify type compatibility
        if isinstance(received_type, Type) and isinstance(demanded_type, Type):
            if not received_type.is_assignable_to(demanded_type):
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded_type} but is given {received_type}", ErrorType.FIELD_TYPE_MISMATCH)
        elif str(received_type) != str(demanded_type) and str(received_type) != "*":
            # Legacy string comparison for transition
            ctx.compiler.assert_(False, ctx.node, f"field demands {demanded_type} but is given {received_type}", ErrorType.FIELD_TYPE_MISMATCH)
        
        return demanded_type

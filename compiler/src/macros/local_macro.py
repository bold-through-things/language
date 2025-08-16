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

    def typecheck(self, ctx: MacroContext):
        type_node = seek_child_macro(ctx.node, "type")

        received = None
        typecheck_step = ctx.current_step
        assert isinstance(typecheck_step, TypeCheckingStep)
        for child in ctx.node.children:
            received = typecheck_step.process_node(replace(ctx, node=child)) or received

        if not type_node:
            # Type inference is now always enabled
            if received:
                type_node = Node(f"type {received}", ctx.node.pos, [])
            else:
                return received or "*"
        
        _, demanded = cut(type_node.content, " ")
        default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received} (children {[c.content for c in ctx.node.children]})")
        
        # Store the local variable type information in compiler metadata for upward walking
        from core.node import FieldDemandType
        ctx.compiler.set_metadata(ctx.node, FieldDemandType, demanded)
        
        # Also verify type matching if we have demanded type
        if demanded:
            if received is None:
                # If we have a demanded type but no received value, that's an error
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given None", ErrorType.MISSING_TYPE)
            elif received not in {"*", demanded}:
                ctx.compiler.assert_(False, ctx.node, f"field demands {demanded} but is given {received}", ErrorType.FIELD_TYPE_MISMATCH)
        
        return demanded or received or "*"
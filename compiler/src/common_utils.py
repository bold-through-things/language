"""
common utility functions to reduce code duplication across the compiler.
"""

from dataclasses import replace
from typing import List, Optional
from strutil import IndentedStringIO
from macro_registry import MacroContext
from logger import default_logger

def collect_child_expressions(ctx: MacroContext, filter_empty: bool = True) -> List[str]:
    """
    collect expressions from all child nodes by processing them.
    this pattern was repeated many times across different macro handlers.
    
    Args:
        ctx: the macro context
        filter_empty: whether to filter out empty/None expressions
    
    Returns:
        list of expression strings from children
    """
    expressions: List[Optional[str]] = []
    
    default_logger.macro(f"collecting expressions from {len(ctx.node.children)} children")
    
    for i, child in enumerate(ctx.node.children):
        with default_logger.indent("macro", f"processing child {i}: {child.content}"):
            expression_out = IndentedStringIO()
            child_ctx = replace(ctx, node=child, expression_out=expression_out)
            ctx.current_step.process_node(child_ctx)
            expr_value = expression_out.getvalue()
            expressions.append(expr_value)
            default_logger.macro(f"child {i} produced: '{expr_value}'")
    
    if filter_empty:
        result = [expr for expr in expressions if expr]
        default_logger.macro(f"filtered {len(expressions)} -> {len(result)} non-empty expressions")
        return result
    else:
        return expressions

def collect_child_types(ctx: MacroContext, filter_empty: bool = True) -> List[str]:
    """
    collect type information from all child nodes during type checking.
    this pattern was also repeated in type checking code.
    
    Args:
        ctx: the macro context (should be in type checking step)
        filter_empty: whether to filter out empty/None types
    
    Returns:
        list of type strings from children
    """
    from typecheck_macros import TypeCheckingStep
    
    if not isinstance(ctx.current_step, TypeCheckingStep):
        default_logger.typecheck("warning: collect_child_types called outside TypeCheckingStep")
        return []
        
    types: List[Optional[str]] = []
    
    default_logger.typecheck(f"collecting types from {len(ctx.node.children)} children")
    
    for i, child in enumerate(ctx.node.children):
        with default_logger.indent("typecheck", f"type checking child {i}: {child.content}"):
            child_ctx = replace(ctx, node=child)
            child_type = ctx.current_step.process_node(child_ctx)
            types.append(child_type)
            default_logger.typecheck(f"child {i} has type: '{child_type}'")
    
    if filter_empty:
        result = [t for t in types if t]
        default_logger.typecheck(f"filtered {len(types)} -> {len(result)} non-empty types")
        return result
    else:
        return types

def process_children_with_context(ctx: MacroContext, step_processor) -> None:
    """
    process all children with the given step processor.
    another common pattern for walking the tree.
    
    Args:
        ctx: the macro context  
        step_processor: the processing step to apply to each child
    """
    default_logger.debug(f"processing {len(ctx.node.children)} children with {step_processor.__class__.__name__}")
    
    for i, child in enumerate(ctx.node.children):
        with default_logger.indent("debug", f"processing child {i}: {child.content}"):
            with ctx.compiler.safely:
                child_ctx = replace(ctx, node=child)
                step_processor.process_node(child_ctx)
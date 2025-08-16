"""Local variable lookup utilities.

This module contains the logic for walking up the AST to find local variable
definitions, which was previously buried in processor_base.py.
"""

from dataclasses import replace, dataclass
from utils.common_utils import get_single_arg
from utils.logger import default_logger
from utils.strutil import cut
from pipeline.steps import seek_child_macro


@dataclass
class LocalMatchResult:
    """Result of finding a local variable definition"""
    node: "Node"  # Forward reference
    type: str


def _try_match_local(ctx: "MacroContext", name: str):
    """Try to match a local variable definition at the current node"""
    from core.node import Macro, SaneIdentifier, FieldDemandType
    
    # TODO! really should stick to one or the other, not both...
    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    if macro == "local":
        desired_local_name = get_single_arg(ctx)
    elif macro == "67lang:assume_local_exists": # TODO - i hate this hack. find a better way!
        desired_local_name = get_single_arg(ctx)
    else:
        return None
    sane_local_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_local_name
    
    if name in {desired_local_name, sane_local_name}:
        # Found the local definition, try to get its type from metadata
        default_logger.typecheck(f"_try_match_local: found {name} at {ctx.node.content}")
        try:
            demanded = ctx.compiler.get_metadata(ctx.node, FieldDemandType)
            default_logger.typecheck(f"_try_match_local: found type {demanded} in metadata")
            return LocalMatchResult(ctx.node, str(demanded))
        except KeyError:
            default_logger.typecheck(f"_try_match_local: no type in metadata")
            # Fall back to looking for type node
            type_node = seek_child_macro(ctx.node, "type")
            if type_node:
                _, demanded = cut(type_node.content, " ")
                return LocalMatchResult(ctx.node, demanded)
            return LocalMatchResult(ctx.node, "*")


def _search_in_noscope(ctx: "MacroContext", name: str):
    """Search for local definitions inside a noscope node"""
    for child in ctx.node.children:
        child_ctx = replace(ctx, node=child)
        result = _try_match_local(child_ctx, name)
        if result is not None:
            return result
    return None


def walk_upwards_for_local_definition(ctx: "MacroContext", name: str):
    """Walk up the AST to find a local variable definition"""
    from core.node import Macro
    
    current = ctx.node
    compiler = ctx.compiler
    while current:
        ctx = replace(ctx, node=current)
        
        # Check siblings that come before this node
        if current.parent:
            siblings = current.parent.children
            current_index = None
            try:
                current_index = siblings.index(current)
            except ValueError:
                pass
            
            if current_index is not None:
                # Check preceding siblings for local definitions (nearest to first)
                for i in range(current_index - 1, -1, -1):
                    sibling = siblings[i]
                    # First check if the sibling itself is a local definition
                    sibling_ctx = replace(ctx, node=sibling)
                    result = _try_match_local(sibling_ctx, name)
                    if result is not None:
                        return result
                    
                    # Also check inside noscope nodes
                    try:
                        macro = compiler.get_metadata(sibling, Macro)
                        if macro == "noscope":
                            result = _search_in_noscope(sibling_ctx, name)
                            if result is not None:
                                return result
                    except KeyError:
                        pass
        
        # Move up to parent
        current = current.parent
    
    return None  # Not found
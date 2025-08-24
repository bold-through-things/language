"""Upwalking utilities for scope resolution.

This module contains the logic for walking up the AST to find definitions
in scope, which was previously buried in processor_base.py.
"""

from dataclasses import replace, dataclass
from typing import Protocol, Callable, Any
from utils.common_utils import get_single_arg
from utils.logger import default_logger
from utils.strutil import cut
from pipeline.steps import seek_child_macro


@dataclass
class UpwalkerResult:
    """Result of finding a definition via upwalking"""
    node: "Node"  # Forward reference
    type: str


class SearchStrategy(Protocol):
    """Protocol for upwalker search strategies"""
    def try_match(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Try to match at the current node"""
        ...
    
    def search_in_noscope(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Search inside a noscope node"""
        ...


class LocalNameSearchStrategy:
    """Search strategy for finding locals by name"""
    
    def __init__(self, name: str):
        self.name = name
    
    def try_match(self, ctx: "MacroContext") -> UpwalkerResult | None:
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
        
        if self.name in {desired_local_name, sane_local_name}:
            # Found the local definition, try to get its type from metadata
            default_logger.typecheck(f"LocalNameSearchStrategy: found {self.name} at {ctx.node.content}")
            try:
                demanded = ctx.compiler.get_metadata(ctx.node, FieldDemandType)
                default_logger.typecheck(f"LocalNameSearchStrategy: found type {demanded} in metadata")
                return UpwalkerResult(ctx.node, demanded)  # Keep as Type object
            except KeyError:
                default_logger.typecheck(f"LocalNameSearchStrategy: no type in metadata")
                # Fall back to looking for type node
                type_node = seek_child_macro(ctx.node, "type")
                if type_node:
                    _, demanded = cut(type_node.content, " ")
                    return UpwalkerResult(ctx.node, demanded)
                return UpwalkerResult(ctx.node, "*")
    
    def search_in_noscope(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Search for local definitions inside a noscope node"""
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            result = self.try_match(child_ctx)
            if result is not None:
                return result
        return None


class LastThenSearchStrategy:
    """Search strategy for finding locals with 67lang:last_then marker"""
    
    def try_match(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Try to match a local with 67lang:last_then marker"""
        from core.node import Macro
        
        try:
            macro = ctx.compiler.get_metadata(ctx.node, Macro)
            if macro == "local":
                # Check if this local has 67lang:last_then as first child
                if (len(ctx.node.children) > 0 and 
                    ctx.node.children[0].content == "67lang:last_then"):
                    return UpwalkerResult(ctx.node, "*")  # Type doesn't matter for pipeline
        except KeyError:
            pass
        return None
    
    def search_in_noscope(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Search for locals with 67lang:last_then inside a noscope node"""
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            result = self.try_match(child_ctx)
            if result is not None:
                return result
        return None


class Upwalker:
    """Generic upwalker for scope resolution with pluggable search strategies"""
    
    def __init__(self, strategy: SearchStrategy):
        self.strategy = strategy
    
    def find(self, ctx: "MacroContext") -> UpwalkerResult | None:
        """Walk up the AST to find a definition using the configured strategy"""
        from core.node import Macro
        
        current = ctx.node
        compiler = ctx.compiler
        while current:
            current_ctx = replace(ctx, node=current)
            
            # Check siblings that come before this node
            if current.parent:
                siblings = current.parent.children
                current_index = None
                try:
                    current_index = siblings.index(current)
                except ValueError:
                    pass
                
                if current_index is not None:
                    # Check preceding siblings (nearest to first)
                    for i in range(current_index - 1, -1, -1):
                        sibling = siblings[i]
                        # First check if the sibling itself matches
                        sibling_ctx = replace(current_ctx, node=sibling)
                        result = self.strategy.try_match(sibling_ctx)
                        if result is not None:
                            return result
                        
                        # Also check inside noscope nodes
                        try:
                            macro = compiler.get_metadata(sibling, Macro)
                            if macro == "noscope":
                                result = self.strategy.search_in_noscope(sibling_ctx)
                                if result is not None:
                                    return result
                        except KeyError:
                            pass
            
            # Move up to parent
            current = current.parent
        
        return None  # Not found


# Backward compatibility functions
def walk_upwards_for_local_definition(ctx: "MacroContext", name: str):
    """Walk up the AST to find a local variable definition"""
    strategy = LocalNameSearchStrategy(name)
    upwalker = Upwalker(strategy)
    result = upwalker.find(ctx)
    return result


# Convenience type alias for backward compatibility
LocalMatchResult = UpwalkerResult
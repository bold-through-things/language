"""Multi-provider dispatch system for macro routing based on matchers."""

from dataclasses import replace
from core.macro_registry import MacroContext


class Multi_provider:
    """Dispatch macro provider that routes to different providers based on matchers"""
    
    def __init__(self, matchers: list[tuple]):
        """
        matchers: list of (matcher_fn, provider) tuples
        matcher_fn: function that takes MacroContext and returns bool
        provider: macro provider to use if matcher returns True
        None matcher means default (always matches)
        """
        self.matchers = matchers
    
    def __getattr__(self, step_name: str):
        """Dynamically return dispatch function for any step name"""
        # Check if any provider has this step
        has_step = any(
            getattr(provider, step_name, None) is not None 
            for _, provider in self.matchers
        )
        
        if not has_step:
            return None
            
        def dispatch_fn(ctx: MacroContext):
            """Generic dispatch to appropriate provider based on matchers"""
            for matcher, provider in self.matchers:
                if matcher is None or matcher(ctx):
                    # Route to the appropriate provider
                    step_fn = getattr(provider, step_name, None)
                    if step_fn:
                        return step_fn(ctx)
                    else:
                        # TODO: This is ugly - we should probably have a better fallback
                        # Default behavior: process children if provider doesn't have this step
                        for child in ctx.node.children:
                            child_ctx = replace(ctx, node=child)
                            ctx.current_step.process_node(child_ctx)
                        return
            
            # Should never reach here if we have a None default
            assert False, "No matching provider found - this is a programmer error"
        
        return dispatch_fn
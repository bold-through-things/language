"""
Macro registration system - consolidates all macro registrations to eliminate circular dependencies
"""

from macro_registry import MacroRegistry
from steps.preprocessing_step import LocalMacro, ForMacro, FnMacro, WhileMacro, SubstitutingMacro, CallingMacro, ParamMacro, AccessMacro
from steps.typecheck_step import MustCompileErrorTypecheck, AccessLocalTypecheck, LocalTypecheck, CallTypecheck, LiteralTypecheck, WhileTypecheck, ForTypecheck, IfTypecheck


def create_preprocessor_registry() -> MacroRegistry:
    """Create and populate the preprocessor macro registry"""
    registry = MacroRegistry()
    
    # Register core preprocessing macros
    registry.add("local")(LocalMacro())
    registry.add("for")(ForMacro())
    registry.add("fn")(FnMacro())
    registry.add("while")(WhileMacro())
    registry.add("param")(ParamMacro())
    registry.add("access")(AccessMacro())
    
    # Register comment macros - skip for now due to circular deps
    # TODO: Convert comment macros to proper classes
    
    # Register substituting macros
    registry.add("lif")(SubstitutingMacro("if"))
    registry.add("lelse")(SubstitutingMacro("else"))
    registry.add("lwhen")(SubstitutingMacro("when"))
    registry.add("ret")(SubstitutingMacro("return"))
    registry.add("scope")(SubstitutingMacro("scope"))
    registry.add("ldict")(SubstitutingMacro("dict"))
    registry.add("llist")(SubstitutingMacro("list"))
    registry.add("assign")(SubstitutingMacro("set"))
    
    # Register calling macros - skip complex ones for now
    # registry.add("print")(CallingMacro("call print"))
    # registry.add("error")(CallingMacro("call error"))
    
    # Simple dummy implementations for now
    class SimplePrintMacro:
        def __call__(self, ctx):
            # Simple print handling without comment macro dependencies
            pass
    
    registry.add("print")(SimplePrintMacro())
    
    return registry


def create_typecheck_registry() -> MacroRegistry:
    """Create and populate the typecheck macro registry"""
    registry = MacroRegistry()
    
    # Register core typecheck macros
    registry.add("must_compile_error")(MustCompileErrorTypecheck())
    registry.add("67lang:access_local")(AccessLocalTypecheck())
    registry.add("local")(LocalTypecheck())
    registry.add("call")(CallTypecheck())
    registry.add("literal")(LiteralTypecheck())
    registry.add("while")(WhileTypecheck())
    registry.add("for")(ForTypecheck())
    registry.add("if")(IfTypecheck())
    
    return registry


def create_codegen_registry() -> MacroRegistry:
    """Create and populate the JavaScript codegen macro registry"""
    registry = MacroRegistry()
    
    # Create simple dummy classes for now to avoid import issues
    class DummyMacro:
        def __call__(self, ctx):
            # Just process children for unknown macros
            from dataclasses import replace
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
    
    # Register basic macros with dummy implementations
    registry.add("literal")(DummyMacro())
    registry.add("list")(DummyMacro())
    registry.add("dict")(DummyMacro())
    registry.add("call")(DummyMacro())
    registry.add("set")(DummyMacro())
    registry.add("return")(DummyMacro())
    registry.add("noop")(DummyMacro())
    registry.add("scope")(DummyMacro())
    registry.add("if")(DummyMacro())
    registry.add("else")(DummyMacro())
    registry.add("for")(DummyMacro())
    registry.add("do")(DummyMacro())
    registry.add("while")(DummyMacro())
    registry.add("noscope")(DummyMacro())
    registry.add("67lang:solution")(DummyMacro())
    registry.add("error")(DummyMacro())
    registry.add("67lang:access")(DummyMacro())
    registry.add("67lang:access_local")(DummyMacro())
    
    return registry
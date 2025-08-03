"""
Macro registration system - consolidates all macro registrations to eliminate circular dependencies
"""

from macro_registry import MacroRegistry
from steps.preprocessing_step import LocalMacro, ForMacro, FnMacro, WhileMacro, SubstitutingMacro, CallingMacro, ParamMacro, AccessMacro
from steps.typecheck_step import MustCompileErrorTypecheck, AccessLocalTypecheck, LocalTypecheck, CallTypecheck, LiteralTypecheck, WhileTypecheck, ForTypecheck, IfTypecheck
from node import Args


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
    
    # Register call macro for built-in function calls
    class CallMacro:
        def __call__(self, ctx):
            # Call macro just passes through during preprocessing
            # The real work happens in typecheck and codegen steps
            for child in ctx.node.children:
                from dataclasses import replace
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
    
    registry.add("call")(CallMacro())
    
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
    
    # Register control flow macros - these just pass through during preprocessing
    class PassThroughMacro:
        def __call__(self, ctx):
            for child in ctx.node.children:
                from dataclasses import replace
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
    
    # Register internal macros that may be generated during processing
    registry.add("67lang:assume_local_exists")(PassThroughMacro())
    
    registry.add("if")(PassThroughMacro())
    registry.add("then")(PassThroughMacro())
    registry.add("else")(PassThroughMacro())
    registry.add("do")(PassThroughMacro())
    registry.add("when")(PassThroughMacro())
    
    # Register literal macros
    registry.add("string")(PassThroughMacro())
    registry.add("regex")(PassThroughMacro())  # Added regex support
    registry.add("type")(PassThroughMacro())  # Added type macro
    registry.add("int")(PassThroughMacro())
    registry.add("float")(PassThroughMacro())
    registry.add("bool")(PassThroughMacro())
    registry.add("list")(PassThroughMacro())
    registry.add("dict")(PassThroughMacro())
    
    # Register other common macros  
    registry.add("a")(PassThroughMacro())
    registry.add("an")(PassThroughMacro())
    registry.add("where")(PassThroughMacro())
    registry.add("is")(PassThroughMacro())
    registry.add("key")(PassThroughMacro())
    registry.add("split")(PassThroughMacro())
    
    # Register calling macros with simplified implementation to avoid circular deps  
    class SimplePrintMacro:
        def __call__(self, ctx):
            # Expand print to call print
            args = ctx.compiler.get_metadata(ctx.node, Args)
            call_node = ctx.compiler.make_node(f"call print {args}", ctx.node.pos, ctx.node.children)
            # Process the call node
            from dataclasses import replace
            call_ctx = replace(ctx, node=call_node)
            ctx.current_step.process_node(call_ctx)
    
    class SimpleErrorMacro:
        def __call__(self, ctx):
            # Expand error to call error
            args = ctx.compiler.get_metadata(ctx.node, Args)
            call_node = ctx.compiler.make_node(f"call error {args}", ctx.node.pos, ctx.node.children)
            # Process the call node
            from dataclasses import replace
            call_ctx = replace(ctx, node=call_node)
            ctx.current_step.process_node(call_ctx)
    
    # Generic builtin function macro that expands to call <function_name>
    class BuiltinFunctionMacro:
        def __init__(self, function_name: str):
            self.function_name = function_name
            
        def __call__(self, ctx):
            # Expand builtin to call <function_name> by modifying the node in place
            args = ctx.compiler.get_metadata(ctx.node, Args)
            ctx.node.content = f"call {self.function_name} {args}".strip()
            # Process children
            for child in ctx.node.children:
                from dataclasses import replace
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
    
    # Register all builtin functions as macros (manually listed to avoid import issues)
    builtin_functions = [
        "prompt", "stdin", "is_tty", "concat", "any", "all", "eq", "asc", 
        "add", "mod", "none", "values", "keys", "zip", "push", "trim", "slice",
        "reverse", "length", "join", "exists", "inside", "sort", "break"
    ]
    for builtin_name in builtin_functions:
        registry.add(builtin_name)(BuiltinFunctionMacro(builtin_name))
    
    registry.add("print")(SimplePrintMacro())
    registry.add("error")(SimpleErrorMacro())
    
    # Register comment macros (these should be ignored during preprocessing)
    class CommentMacro:
        def __call__(self, ctx):
            # Comments are ignored during preprocessing, but we need to process children to ignore them too
            for child in ctx.node.children:
                from dataclasses import replace
                child_ctx = replace(ctx, node=child)
                # Process children through the same step to recursively ignore them
                ctx.current_step.process_node(child_ctx)
    
    comment_macros = ["#", "//", "/*", "--", "note", "Read", "Assume", "Parse", "Store", "Print", "Count"]  # Added more comment macros
    for comment_name in comment_macros:
        registry.add(comment_name)(CommentMacro())
    
    return registry


def create_typecheck_registry() -> MacroRegistry:
    """Create and populate the typecheck macro registry"""
    registry = MacroRegistry()
    
    # Register core typecheck macros
    registry.add("must_compile_error")(MustCompileErrorTypecheck())
    registry.add("67lang:access_local")(AccessLocalTypecheck())
    registry.add("67lang:assume_local_exists")(AccessLocalTypecheck())  # Alias for assume_local_exists
    registry.add("local")(LocalTypecheck())
    registry.add("call")(CallTypecheck())
    registry.add("literal")(LiteralTypecheck())
    registry.add("while")(WhileTypecheck())
    registry.add("for")(ForTypecheck())
    registry.add("if")(IfTypecheck())
    
    # Register comment macros (these should be ignored during typecheck)
    class CommentMacro:
        def __call__(self, ctx):
            # Comments are ignored during typecheck, including their children
            for child in ctx.node.children:
                from dataclasses import replace
                child_ctx = replace(ctx, node=child)
                # Process children through the same step to recursively ignore them
                ctx.current_step.process_node(child_ctx)
    
    comment_macros = ["#", "//", "/*", "--", "note", "Read", "Assume", "Parse", "Store", "Print", "Count"]  # Added more comment macros for typecheck
    for comment_name in comment_macros:
        registry.add(comment_name)(CommentMacro())
    
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
    
    # Proper implementations for essential macros
    class LocalMacro:
        def __call__(self, ctx):
            from common_utils import get_single_arg, collect_child_expressions
            from node import SaneIdentifier
            
            desired_name = get_single_arg(ctx)
            name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
            
            args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
            
            ctx.statement_out.write(f"let {name}")
            if len(args) > 0:
                ctx.statement_out.write(f" = {args[-1]}")
            ctx.statement_out.write(f"\n")
            ctx.expression_out.write(name)
    
    # Register the local macro with proper implementation
    registry.add("local")(LocalMacro())
    
    # Register basic macros with dummy implementations
    registry.add("67lang:file")(DummyMacro())
    registry.add("literal")(DummyMacro())
    registry.add("string")(DummyMacro())
    registry.add("regex")(DummyMacro())  # Added regex support for codegen
    registry.add("int")(DummyMacro())
    registry.add("float")(DummyMacro())
    registry.add("bool")(DummyMacro())
    registry.add("true")(DummyMacro())  # Added true literal
    registry.add("false")(DummyMacro())  # Added false literal
    registry.add("break")(DummyMacro())  # Added break literal
    registry.add("continue")(DummyMacro())  # Added continue literal
    registry.add("list")(DummyMacro())
    registry.add("dict")(DummyMacro())
    registry.add("call")(DummyMacro())
    registry.add("set")(DummyMacro())
    registry.add("return")(DummyMacro())
    registry.add("noop")(DummyMacro())
    registry.add("scope")(DummyMacro())
    registry.add("if")(DummyMacro())
    registry.add("else")(DummyMacro())
    registry.add("then")(DummyMacro())
    registry.add("for")(DummyMacro())
    registry.add("fn")(DummyMacro())  # Added fn macro
    registry.add("param")(DummyMacro())  # Added param macro
    registry.add("type")(DummyMacro())  # Added type macro
    registry.add("do")(DummyMacro())
    registry.add("while")(DummyMacro())
    registry.add("when")(DummyMacro())
    registry.add("noscope")(DummyMacro())
    registry.add("67lang:solution")(DummyMacro())
    registry.add("error")(DummyMacro())
    registry.add("67lang:access")(DummyMacro())
    registry.add("67lang:access_local")(DummyMacro())
    registry.add("67lang:assume_local_exists")(DummyMacro())
    registry.add("a")(DummyMacro())
    registry.add("an")(DummyMacro())
    registry.add("where")(DummyMacro())
    registry.add("is")(DummyMacro())
    registry.add("key")(DummyMacro())
    registry.add("split")(DummyMacro())
    
    # Register all builtin functions in codegen too (they should be dummy since preprocessing handles the call conversion)
    builtin_functions = [
        "prompt", "stdin", "is_tty", "concat", "any", "all", "eq", "asc", 
        "add", "mod", "none", "values", "keys", "zip", "push", "trim", "slice",
        "reverse", "length", "join", "exists", "inside", "sort"
    ]
    for builtin_name in builtin_functions:
        registry.add(builtin_name)(DummyMacro())
    
    registry.add("print")(DummyMacro())
    
    # Register comment macros (these should be ignored during codegen)
    comment_macros = ["#", "//", "/*", "--", "note", "Read", "Assume", "Parse", "Store", "Print", "Count"]  # Added more comment macros for codegen
    for comment_name in comment_macros:
        registry.add(comment_name)(DummyMacro())
    
    return registry
"""
Working macro implementations copied from the reference version and adapted for dependency injection.
"""

from macro_registry import MacroRegistry, MacroContext
from node import Args, Macro, SaneIdentifier, Params, Inject_code_start, Target, ResolvedConvention
from dataclasses import replace
from common_utils import get_single_arg, get_two_args, collect_child_expressions
from strutil import IndentedStringIO, Joiner
from error_types import ErrorType
from logger import default_logger
from processor_base import (
    js_field_access, DirectCall, seek_child_macro, cut, to_valid_js_ident,
    walk_upwards_for_local_definition, singleton, PrototypeCall
)

# Working builtins from reference version
builtins = {
    "print": "log",
    "prompt": "prompt",
    "stdin": "stdin",
    "is_tty": "is_tty",
    "concat": "concat",
    "any": "any",
    "all": "all", 
    "eq": "eq",
    "asc": "asc",
    "add": "add",
    "mod": "mod",
    "none": "none",
    "values": "values",
    "keys": "keys",
    "zip": "zip",    
}

# Working builtin_calls from reference version  
builtin_calls = {
    "join": [PrototypeCall(constructor="Array", fn="join", demands=["list", "str"], returns="str")],
    "sort": [PrototypeCall(constructor="Array", fn="sort", demands=["list"], returns="list")],
    "push": [PrototypeCall(constructor="Array", fn="push", demands=["list", "*"], returns="list")],
    "reverse": [PrototypeCall(constructor="Array", fn="reverse", demands=["list"], returns="list")],
    "split": [
        PrototypeCall(constructor="String", fn="split", demands=["str", "str"], returns="list"),
        PrototypeCall(constructor="String", fn="split", demands=["str", "regex"], returns="list"),
    ],
    "trim": [PrototypeCall(constructor="String", fn="trim", demands=["str"], returns="str")],
    "slice": [PrototypeCall(constructor="Array", fn="slice", demands=["list"], returns="list")],
}


def register_working_preprocessor_macros(registry: MacroRegistry):
    """Register working preprocessor macros adapted from reference version"""
    
    # Solution macro - just processes children
    def solution_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    registry.add("67lang:solution")(solution_macro)
    print(f"DEBUG: Registered 67lang:solution in preprocessor registry")  # Debug output
    
    # Comment macros - just pass through during preprocessing
    def comment_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    comment_macros = ["#", "//", "/*", "--", "note", "Read", "Assume", "Parse", "Store", "Print", "Count"]
    for comment_name in comment_macros:
        registry.add(comment_name)(comment_macro)
    
    # Pass-through macro for common language constructs during preprocessing
    def pass_through_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    # Register macros that just pass through during preprocessing
    pass_through_macros = [
        "67lang:file", "local", "fn", "for", "while", "if", "then", "else", "do", "when", "param", "type",
        "string", "int", "float", "bool", "list", "dict", "regex", "true", "false",
        "a", "an", "access", "where", "is", "key", "split", "call", "67lang:call",
        "67lang:access", "67lang:access_local", "67lang:access_field", "67lang:access_index",
        "67lang:assume_local_exists", "exists", "inside", "scope", "noscope", "set", "return"
    ]
    
    for macro_name in pass_through_macros:
        registry.add(macro_name)(pass_through_macro)
    
    # Builtin function macros - expand to call <function> during preprocessing  
    def builtin_macro_factory(builtin_name: str):
        def builtin_macro(ctx: MacroContext):
            # During preprocessing, expand builtin functions to call form
            # e.g., "stdin" becomes "call stdin"
            args = ctx.compiler.get_metadata(ctx.node, Args)
            new_content = f"call {builtin_name}"
            if args.strip():
                new_content += f" {args}"
            ctx.node.content = new_content
            # Process children normally
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                ctx.current_step.process_node(child_ctx)
        return builtin_macro
    
    # Register all builtins
    for builtin_name in builtins.keys():
        registry.add(builtin_name)(builtin_macro_factory(builtin_name))
    
    print(f"DEBUG: Registered {len(builtins)} builtins in preprocessor: {list(builtins.keys())}")  # Debug


def register_working_codegen_macros(registry: MacroRegistry):
    """Register working JavaScript codegen macros adapted from reference version"""
    
    # Solution macro - just processes children
    def solution_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    registry.add("67lang:solution")(solution_macro)
    
    # File macro - just processes children
    def file_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    registry.add("67lang:file")(file_macro)
    
    # Working local macro from reference
    def local_macro(ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or desired_name
        
        args = collect_child_expressions(ctx) if len(ctx.node.children) > 0 else []
        
        ctx.statement_out.write(f"let {name}")
        if len(args) > 0:
            ctx.statement_out.write(f" = {args[-1]}")
        ctx.statement_out.write(f"\n")
        ctx.expression_out.write(name)
    
    registry.add("local")(local_macro)
    
    # Working fn macro from reference
    def fn_macro(ctx: MacroContext):
        name = get_single_arg(ctx)
        name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) or name
        ctx.statement_out.write(f"const {name} = async function (")
        joiner = Joiner(ctx.statement_out, ", \n")
        params_metadata = ctx.compiler.get_metadata(ctx.node, Params)
        params = params_metadata.mapping.items()
        if len(params) > 0:
            ctx.statement_out.write("\n")
        with ctx.statement_out:
            for k, _ in params:
                with joiner:
                    ctx.statement_out.write(k)
        if len(params) > 0:
            ctx.statement_out.write("\n")
        ctx.statement_out.write(") ")
        next = seek_child_macro(ctx.node, "do")

        ctx.compiler.assert_(next != None, ctx.node, "must have a do block")

        inject = Inject_code_start()
        ctx.compiler.set_metadata(next, Inject_code_start, inject)
        ctx.statement_out.write("{")
        with ctx.statement_out:
            for k, _ in params:
                inject.code.append(f"{k} = {k}\n")
            inner_ctx = replace(ctx, node=next)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}")
    
    registry.add("fn")(fn_macro)
    
    # Working access_field macro from reference  
    def access_field_macro(ctx: MacroContext):
        name, field = get_two_args(ctx, "first argument is object, second is field")
        res = walk_upwards_for_local_definition(ctx, name)
        ctx.compiler.assert_(res != None, ctx.node, f"{name} must access a defined function", ErrorType.NO_SUCH_LOCAL)
        name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
        field_access = js_field_access(field)
        ident = ctx.compiler.get_new_ident("_".join([name, field]))

        args = collect_child_expressions(ctx)

        if len(args) > 0:
            ctx.compiler.assert_(len(args) == 1, ctx.node, "single child node for assignment")
            ctx.statement_out.write(f"{name}{field_access} = {args[-1]}\n")
        ctx.statement_out.write(f"const {ident} = await {name}{field_access}\n")
        ctx.expression_out.write(ident)
    
    registry.add("67lang:access_field")(access_field_macro)
    
    # Working access_index macro from reference
    def access_index_macro(ctx: MacroContext):
        name = get_single_arg(ctx, "single argument, the object into which we should index")
        res = walk_upwards_for_local_definition(ctx, name)
        ctx.compiler.assert_(res != None, ctx.node, f"{name} must access a defined function", ErrorType.NO_SUCH_LOCAL)
        name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or name
        ident = ctx.compiler.get_new_ident(name)

        args: list[str] = collect_child_expressions(ctx)

        ctx.compiler.assert_(len(args) >= 1, ctx.node, "first child used as indexing key")
        key = args[0]

        if len(args) > 1:
            ctx.compiler.assert_(len(args) == 2, ctx.node, "second child used for assignment")
            ctx.statement_out.write(f"{name}[{key}] = {args[1]}\n")

        ctx.statement_out.write(f"const {ident} = await {name}[{key}]\n")
        ctx.expression_out.write(ident)
    
    registry.add("67lang:access_index")(access_index_macro)
    
    # Working access_local macro from reference
    def access_local_macro(ctx: MacroContext):
        desired_name = get_single_arg(ctx)
        res = walk_upwards_for_local_definition(ctx, desired_name)
        ctx.compiler.assert_(res != None, ctx.node, f"{desired_name} must access a defined local", ErrorType.NO_SUCH_LOCAL)
        actual_name = ctx.compiler.maybe_metadata(res.node, SaneIdentifier) or desired_name

        args = collect_child_expressions(ctx)

        if len(args) > 0:
            ctx.compiler.assert_(len(args) == 1, ctx.node, "single child used for assignment")
            ctx.statement_out.write(f"{actual_name} = {args[-1]}\n")

        ctx.expression_out.write(actual_name)
    
    registry.add("67lang:access_local")(access_local_macro)
    
    # Working 67lang:call macro from reference
    @singleton
    class Macro_67lang_call:
        @classmethod
        def resolve_convention(cls, ctx: MacroContext, actual_arg_types: list[str] = None):
            args_str = ctx.compiler.get_metadata(ctx.node, Args)
            args = args_str.split(" ")
            ctx.compiler.assert_(len(args) == 1, ctx.node, "single argument, the function to call")
            
            fn = args[0]

            convention = None
            if fn in builtin_calls:
                overloads = builtin_calls[fn]
                if isinstance(overloads, list):
                    if actual_arg_types:
                        for overload in overloads:
                            if cls._matches_signature(actual_arg_types, overload.demands):
                                convention = overload
                                break
                        else:
                            convention = overloads[0]
                    else:
                        convention = overloads[0]
                else:
                    convention = overloads
            elif fn in builtins:
                convention = DirectCall(fn=builtins[fn], demands=None, receiver="_67lang", returns=None)
            else:
                res = walk_upwards_for_local_definition(ctx, fn)
                ctx.compiler.assert_(res != None, ctx.node, f"{fn} must refer to a defined function")
                fn = ctx.compiler.get_metadata(res.node, SaneIdentifier)
                convention = DirectCall(fn=fn, receiver=None, demands=None, returns=None)

            return convention

        @classmethod
        def _matches_signature(cls, actual_types: list[str], demanded_types: list[str]) -> bool:
            if len(actual_types) != len(demanded_types):
                return False
            
            for actual, demanded in zip(actual_types, demanded_types):
                if demanded == "*" or actual == "*":
                    continue
                if actual != demanded:
                    return False
            return True
        
        def register_macros(self, codegen_registry: MacroRegistry, typecheck_registry: MacroRegistry):
            def call_typecheck(ctx: MacroContext):
                args: list[str | None] = []
                for child in ctx.node.children:
                    typecheck_step = ctx.current_step
                    from typecheck_macros import TypeCheckingStep
                    assert isinstance(typecheck_step, TypeCheckingStep)
                    received = typecheck_step.process_node(replace(ctx, node=child))
                    args.append(received)
                args = [a for a in args if a]

                convention = self.resolve_convention(ctx, args)
                
                ctx.compiler.set_metadata(ctx.node, ResolvedConvention, ResolvedConvention(convention=convention))

                if convention.demands:
                    for received, demanded in zip(args, convention.demands):
                        if "*" in {demanded, received}:
                            continue
                        default_logger.typecheck(f"{ctx.node.content} demanded {demanded} and was given {received}")
                        ctx.compiler.assert_(received == demanded, ctx.node, f"argument demands {demanded} and is given {received}", ErrorType.ARGUMENT_TYPE_MISMATCH)

                return convention.returns or "*"
            
            def call_codegen(ctx: MacroContext):
                args_str = ctx.compiler.get_metadata(ctx.node, Args)
                args1 = args_str.split(" ")
                ident = ctx.compiler.get_new_ident("_".join(args1))
                
                try:
                    resolved_conv = ctx.compiler.get_metadata(ctx.node, ResolvedConvention)
                    convention = resolved_conv.convention
                except KeyError:
                    convention = self.resolve_convention(ctx)
                
                args = collect_child_expressions(ctx)

                call = convention.compile(args)

                ctx.statement_out.write(f"const {ident} = await {call}\n")
                ctx.expression_out.write(ident)
            
            typecheck_registry.add("67lang:call")(call_typecheck)
            codegen_registry.add("67lang:call")(call_codegen)
    
    # Create instance and register the codegen part only for now
    call_macro_instance = Macro_67lang_call()
    
    # We need to implement a simpler call macro that doesn't depend on typecheck during codegen
    def simple_call_codegen(ctx: MacroContext):
        args_str = ctx.compiler.get_metadata(ctx.node, Args)
        args1 = args_str.split(" ")
        ident = ctx.compiler.get_new_ident("_".join(args1))
        
        # Use a simplified convention resolution that doesn't depend on typecheck metadata
        convention = call_macro_instance.resolve_convention(ctx)
        
        args = collect_child_expressions(ctx)
        call = convention.compile(args)

        ctx.statement_out.write(f"const {ident} = await {call}\n")
        ctx.expression_out.write(ident)
    
    registry.add("67lang:call")(simple_call_codegen)
    
    # Working exists macro from reference
    def exists_macro(ctx: MacroContext):
        target = None
        other_children = []
        
        for child in ctx.node.children:
            macro, _ = cut(child.content, " ")
            if macro == "inside":
                args_str = ctx.compiler.get_metadata(child, Args)
                ctx.compiler.assert_(args_str.strip() == "", child, "inside must have no arguments")
                ctx.compiler.assert_(len(child.children) == 1, child, "inside must have one child")
                target = child.children[0]
                default_logger.macro(f"inside modifier found, target set to: {target.content}")
            else:
                other_children.append(child)
        
        ctx.compiler.assert_(target is not None, ctx.node, "exists must have an inside modifier")
        ctx.compiler.compile_fn_call(ctx, f"await _67lang.exists_inside(", [target] + other_children)
    
    registry.add("exists")(exists_macro)
    
    # Return nothing for now - we just register the macros
    return


def register_working_typecheck_macros(registry: MacroRegistry):
    """Register working typecheck macros adapted from reference version"""
    
    # Solution macro - just processes children  
    def solution_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
        return "*"  # Return wildcard type for typecheck
    
    registry.add("67lang:solution")(solution_macro)
    
    # File macro - just processes children
    def file_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
        return "*"  # Return wildcard type for typecheck
    
    registry.add("67lang:file")(file_macro)
    
    # Comment macros during typecheck are ignored
    def comment_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    comment_macros = ["#", "//", "/*", "--", "note", "Read", "Assume", "Parse", "Store", "Print", "Count"]
    for comment_name in comment_macros:
        registry.add(comment_name)(comment_macro)
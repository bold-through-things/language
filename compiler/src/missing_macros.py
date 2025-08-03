"""
Add critical missing macros from reference implementation:
- if/then/else control flow
- while loops  
- proper where clause handling in access macro
"""

from macro_registry import MacroRegistry, MacroContext
from dataclasses import replace
from strutil import IndentedStringIO
from processor_base import seek_child_macro
from logger import default_logger


def add_missing_control_flow_macros(registry: MacroRegistry):
    """Add if/while macros missing from current implementation"""
    
    # IF macro implementation from reference
    @registry.add("if")
    def if_header(ctx: MacroContext):
        args: list[str] = []
        if len(ctx.node.children) > 0:
            for child in ctx.node.children:
                if child.content.startswith("then"):
                    continue
                e = IndentedStringIO()
                ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
                args.append(e.getvalue())

        ctx.statement_out.write(f"if ({args[-1]})")
        ctx.statement_out.write(" {")
        with ctx.statement_out:
            node = seek_child_macro(ctx.node, "then")
            ctx.compiler.assert_(node != None, ctx.node, "must have a `then` block")
            inner_ctx = replace(ctx, node=node)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}")
    
    # WHILE macro implementation from reference
    @registry.add("while")
    def while_loop(ctx: MacroContext):
        ctx.statement_out.write("while(true) {")
        with ctx.statement_out:
            ctx.compiler.assert_(len(ctx.node.children) == 2, ctx.node, "must have two children")
            node = ctx.node.children[0]
            out = IndentedStringIO()
            inner_ctx = replace(ctx, node=node, expression_out=out)
            ctx.current_step.process_node(inner_ctx)

            ctx.statement_out.write(f"if (!{out.getvalue()}) ")
            ctx.statement_out.write("{ break; }\n")

            node = seek_child_macro(ctx.node, "do")
            ctx.compiler.assert_(node != None, ctx.node, "must have a `do` block")
            inner_ctx = replace(ctx, node=node)
            ctx.current_step.process_node(inner_ctx)
        ctx.statement_out.write("}")
    
    # THEN/ELSE/DO scope macros from reference 
    def scope_macro(ctx: MacroContext):
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            ctx.current_step.process_node(child_ctx)
    
    registry.add("then")(scope_macro)
    registry.add("else")(scope_macro) 
    registry.add("do")(scope_macro)
    
    print("DEBUG: Added missing control flow macros: if, while, then, else, do")


def add_missing_builtin_functions(registry: MacroRegistry):
    """Add missing builtin functions like none, eq, mod, asc"""
    
    # Direct call builtin functions  
    def builtin_function_factory(builtin_name: str, js_function: str):
        def builtin_function(ctx: MacroContext):
            args = []
            for child in ctx.node.children:
                e = IndentedStringIO()
                ctx.current_step.process_node(replace(ctx, node=child, expression_out=e))
                args.append(e.getvalue())
            
            result = f"_67lang.{js_function}({', '.join(args)})"
            ctx.expression_out.write(result)
        return builtin_function
    
    # Missing builtin functions from fizzbuzz test
    missing_builtins = {
        "none": "none",
        "eq": "eq", 
        "mod": "mod",
        "asc": "asc",
        "add": "add"
    }
    
    for name, js_fn in missing_builtins.items():
        registry.add(name)(builtin_function_factory(name, js_fn))
    
    print(f"DEBUG: Added missing builtin functions: {list(missing_builtins.keys())}")
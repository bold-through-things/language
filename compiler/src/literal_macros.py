from dataclasses import replace
from processor_base import MacroProcessingStep, builtins, js_lib, unified_macros, unified_typecheck
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, cut
from contextlib import contextmanager
from utils import *
from node import Macro, Args
from logger import default_logger

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

@macros.add("noop", "type", "PIL:auto_type")
def does_not_compile(_):
    # does not compile into code itself - nothing to do
    pass

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]

# Create a code linking registry for skipping comment macros  
code_linking = MacroRegistry()
@code_linking.add(*COMMENT_MACROS)
def skip_comment_macro(_):
    # comment macros are skipped during code linking
    pass

@macros.add(*COMMENT_MACROS)
@typecheck.add(*COMMENT_MACROS)
def comments(_):
    # comments are ignored. TODO - we could and perhaps should transfer comments to output?
    pass

@macros.add("must_compile_error")
def must_compile_error_processing(ctx: MacroContext):
    # Process children to catch emission-time errors but prevent JS output
    original_statement_out = ctx.statement_out
    original_expression_out = ctx.expression_out
    ctx = replace(ctx, statement_out=IndentedStringIO(), expression_out=IndentedStringIO())
    
    for child in ctx.node.children:
        child_ctx = replace(ctx, node=child)
        ctx.current_step.process_node(child_ctx)

@macros.add("int")
def int_macro(ctx: MacroContext):
    args = ctx.compiler.get_metadata(ctx.node, Args)
    ctx.expression_out.write(str(args))

@typecheck.add("int")
def int_typecheck(ctx: MacroContext):
    return "int"

@macros.add("string", "regex")
def str_macro(ctx: MacroContext):
    s: str = ctx.compiler.get_metadata(ctx.node, Args)
    if len(s) == 0:
        # multiline string case - collect content from children
        lines = []
        for child in ctx.node.children:
            if child.content:
                lines.append(child.content)
        s = "\n".join(lines)
    else:
        delim = s[0]
        ctx.compiler.assert_(s.endswith(delim), ctx.node, "must be delimited on both sides with the same character")
        s = s.removeprefix(delim).removesuffix(delim)
    s = s.replace("\n", "\\n")
    s = s.replace('"', '\\"')  # escape quotes during JS string emission
    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    sep = '"' if macro == "string" else "/"
    ctx.expression_out.write(f'{sep}{s}{sep}')

@typecheck.add("string")
def str_typecheck(ctx: MacroContext):
    return "str"

@typecheck.add("regex")
def regex_typecheck(ctx: MacroContext):
    return "regex"

with scope:
    literally = {
        "true": "true",
        "false": "false",
        "break": "break",
        "continue": "continue",
        "dict": "{}",
        "return": "return"
    }
    @macros.add(*[k for k in literally.keys()])
    def literally_macro(ctx: MacroContext):
        # TODO. this isn't inherently expression_out... indeed most of these should be statement_out...
        macro = ctx.compiler.get_metadata(ctx.node, Macro)
        ctx.expression_out.write(literally[macro])

@macros.add("list")
def list_macro(ctx: MacroContext):
    """Handle list macro - iterate all children, collect their expressions, emit [expr1, expr2, expr3...]"""
    if not ctx.node.children:
        ctx.expression_out.write("[]")
        return
    
    from common_utils import collect_child_expressions
    expressions = collect_child_expressions(ctx)
    ctx.expression_out.write(f"[{', '.join(expressions)}]")

@macros.add(*[b for b in builtins.keys()])
def builtin(ctx: MacroContext):
    macro = ctx.compiler.get_metadata(ctx.node, Macro)
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.{builtins[macro]}(", ctx.node.children)

@macros.add("PIL:solution")
def pil_solution(ctx: MacroContext):
    """Process all children of the solution node"""
    for child in ctx.node.children:
        child_ctx = replace(ctx, node=child)
        ctx.current_step.process_node(child_ctx)

class JavaScriptEmissionStep(MacroProcessingStep):
    """Handles JavaScript code emission"""
    
    def __init__(self):
        super().__init__()
        # Use the unified macros registry
        self.macros = unified_macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for JavaScript emission"""            
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        default_logger.codegen(f"emitting JavaScript for macro: {macro}")

        # --- cursed Python begins ---

        @contextmanager
        def possibly_wrapped(ctx: MacroContext):
            # no wrapping needed
            yield ctx

        if ctx.node.content == "PIL:solution":
            default_logger.codegen("wrapping solution in JavaScript runtime setup")
            @contextmanager
            def definitely_wrapped(ctx: MacroContext):
                out = IndentedStringIO()
                out.write(js_lib + "\n\n")
                # need to wrap this crap in async because browsers are GARBAGE 
                # (top level await only in modules? why?!)
                default_logger.codegen("adding async wrapper for browser compatibility")
                out.write("void (async () => {\n")
                with out:
                    out.write("'use strict';\n")
                    out.write("const scope = globalThis;\n")
                    yield replace(ctx, statement_out=out, expression_out=out)
                out.write("\n})();")
                ctx.compiler._js_output = out.getvalue()
                default_logger.codegen(f"JavaScript output generated: {len(out.getvalue())} characters")
            possibly_wrapped = definitely_wrapped

        # --- cursed Python ends ---

        with possibly_wrapped(ctx) as ctx:
            if macro in all_macros:
                default_logger.codegen(f"applying JavaScript emission macro: {macro}")
                with ctx.compiler.safely:
                    all_macros[macro](ctx)
            else:
                default_logger.codegen(f"ERROR: unknown macro {macro}")
                raise ValueError(f"TODO. unknown macro {macro}")
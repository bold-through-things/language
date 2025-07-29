from dataclasses import replace
from processor_base import MacroProcessingStep, builtins, js_lib, unified_macros, unified_typecheck
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO, cut
from contextlib import contextmanager
from utils import *
from node import Macro, Args

# Legacy registries - will be moved into steps
macros = unified_macros  # Use unified registry
typecheck = unified_typecheck  # Use unified registry

@macros.add("noop", "type", "PIL:auto_type")
def does_not_compile(_):
    # does not compile into code itself - nothing to do
    pass

COMMENT_MACROS = ["#", "//", "/*", "--", "note"]
@macros.add(*COMMENT_MACROS)
@typecheck.add(*COMMENT_MACROS)
def comments(_):
    # comments are ignored. TODO - we could and perhaps should transfer comments to output?
    pass

@macros.add("int")
def int_macro(ctx: MacroContext):
    ctx.expression_out.write(str(ctx.node.metadata[Args]))

@typecheck.add("int")
def int_typecheck(ctx: MacroContext):
    return "int"

@macros.add("string", "regex")
def str_macro(ctx: MacroContext):
    s: str = ctx.node.metadata[Args]
    if len(s) == 0:
        assert False # TODO
        for child in ctx.node.children:
            s += ctx.recover_string(child)
    else:
        delim = s[0]
        ctx.compiler.assert_(s.endswith(delim), ctx.node, "must be delimited on both sides with the same character")
        s = s.removeprefix(delim).removesuffix(delim)
    s = s.replace("\n", "\\n")
    # TODO escape quotes as well...
    sep = '"' if ctx.node.metadata[Macro] == "string" else "/"
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
        "list": "[]",
        "return": "return"
    }
    @macros.add(*[k for k in literally.keys()])
    def literally_macro(ctx: MacroContext):
        # TODO. this isn't inherently expression_out... indeed most of these should be statement_out...
        ctx.expression_out.write(literally[ctx.node.metadata[Macro]])

@macros.add(*[b for b in builtins.keys()])
def builtin(ctx: MacroContext):
    ctx.compiler.compile_fn_call(ctx, f"await indentifire.{builtins[ctx.node.metadata[Macro]]}(", ctx.node.children)

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
        from processor_base import ERASED_NODE
        
        if ctx.node == ERASED_NODE:
            return
            
        macro = str(ctx.node.metadata[Macro])
        all_macros = self.macros.all()

        # --- cursed Python begins ---

        @contextmanager
        def possibly_wrapped(ctx: MacroContext):
            # no wrapping needed
            yield ctx

        if ctx.node.content == "PIL:solution":
            @contextmanager
            def definitely_wrapped(ctx: MacroContext):
                out = IndentedStringIO()
                out.write(js_lib + "\n\n")
                # need to wrap this crap in async because browsers are GARBAGE 
                # (top level await only in modules? why?!)
                out.write("void (async () => {\n")
                with out:
                    out.write("'use strict';\n")
                    out.write("const scope = globalThis;\n")
                    yield replace(ctx, statement_out=out, expression_out=out)
                out.write("\n})();")
                ctx.compiler._js_output = out.getvalue()
            possibly_wrapped = definitely_wrapped

        # --- cursed Python ends ---

        with possibly_wrapped(ctx) as ctx:
            if macro in all_macros:
                with ctx.compiler.safely:
                    all_macros[macro](ctx)
            else:
                raise ValueError(f"TODO. unknown macro {macro}")
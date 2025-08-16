"""JavaScript emission step implementation."""

from dataclasses import replace
from contextlib import contextmanager
from .base import MacroProcessingStep
from core.macro_registry import MacroContext, MacroRegistry
from core.node import Macro
from utils.logger import default_logger
from utils.error_types import ErrorType
from utils.strutil import IndentedStringIO


class JavaScriptEmissionStep(MacroProcessingStep):
    """Handles JavaScript code emission"""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        # Use the unified macros registry
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node for JavaScript emission"""
        from pipeline.js_conversion import js_lib
        
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        default_logger.codegen(f"emitting JavaScript for macro: {macro}")

        # --- cursed Python begins ---

        @contextmanager
        def possibly_wrapped(ctx: MacroContext):
            # no wrapping needed
            yield ctx

        if ctx.node.content == "67lang:solution":
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
                # If there are already compile errors, don't crash - just skip this node
                if len(ctx.compiler.compile_errors) > 0:
                    default_logger.codegen(f"skipping malformed node due to existing compile errors")
                    return
                ctx.compiler.compile_error(ctx.node, f"unknown macro '{macro}' - is this supposed to exist? did you maybe typo something?", ErrorType.INVALID_MACRO)
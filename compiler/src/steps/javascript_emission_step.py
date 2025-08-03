from dataclasses import replace
from processor_base import MacroProcessingStep, js_lib
from macro_registry import MacroContext, MacroRegistry
from strutil import IndentedStringIO
from contextlib import contextmanager
from node import Macro
from logger import default_logger
from error_types import ErrorType


class JavaScriptEmissionStep(MacroProcessingStep):
    """Fourth step: JavaScript code emission"""
    
    def __init__(self, codegen_registry: MacroRegistry):
        super().__init__()
        self.macros = codegen_registry
        
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

        with possibly_wrapped(ctx) as wrapped_ctx:
            if macro in all_macros:
                try:
                    all_macros[macro](wrapped_ctx)
                except Exception as e:
                    ctx.compiler.compile_error(ctx.node, f"JavaScript emission failed: {e}", ErrorType.UNKNOWN_ERROR)
            else:
                # For unknown macros, emit children in statement mode
                default_logger.codegen(f"unknown macro {macro}, processing children")
                for child in ctx.node.children:
                    child_ctx = replace(wrapped_ctx, node=child)
                    self.process_node(child_ctx)
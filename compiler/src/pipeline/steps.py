"""Processing steps for the 67lang compilation pipeline.

This module consolidates all the processing steps that were previously scattered
across multiple misleadingly named files like preprocessing_macros.py, 
literal_macros.py, typecheck_macros.py, etc.
"""

from dataclasses import replace
from contextlib import contextmanager
from abc import ABC, abstractmethod
from typing import TypeVar, Any, Callable, cast

from core.macro_registry import MacroContext, MacroRegistry
from core.node import Macro
from utils.logger import default_logger
from utils.error_types import ErrorType
from utils.strutil import IndentedStringIO, cut


class MacroProcessingStep(ABC):
    """Base class for macro processing steps in the compilation pipeline"""
    
    def __init__(self):
        # Steps should override this if they need specific registries
        self.macros = MacroRegistry()
        
    @abstractmethod
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node during this step"""
        pass


class PreprocessingStep(MacroProcessingStep):
    """Handles preprocessing like access macro unrolling"""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        # Move preprocessor macros into this step
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process a single node using the preprocessor registry"""
        default_logger.macro(f"preprocessing node: {ctx.node.content}")
        
        # Validate indentation: ensure content doesn't start with whitespace
        if ctx.node.content and ctx.node.content[0].isspace():
            ctx.compiler.compile_error(ctx.node, 
                "this language only accepts tabs for indentation, not spaces! spaces are like, totally uncool. use tabs instead, they're way more precise and semantic.", 
                ErrorType.INVALID_INDENTATION)
            # Don't return early - let the processing continue so we don't break the pipeline
        
        # Process current node  
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_preprocessors = self.macros.all()

        default_logger.macro(f"  -> Current node macro: {macro}")
        default_logger.macro(f"  -> Available preprocessors: {list(all_preprocessors.keys())}")

        if macro in all_preprocessors:
            default_logger.macro(f"applying preprocessor for macro: {macro}")
            with ctx.compiler.safely:
                all_preprocessors[macro](ctx)
        else:
            default_logger.macro(f"no preprocessor for macro: {macro}")
            # Process children if no specific preprocessor is found for the current node
            with default_logger.indent("macro", f"preprocessing children of {ctx.node.content}"):
                for i, child in enumerate(ctx.node.children):
                    with default_logger.indent("macro", f"child {i}: {child.content}"):
                        with ctx.compiler.safely:
                            child_ctx = replace(ctx, node=child)
                            self.process_node(child_ctx)


class TypeRegistrationStep(MacroProcessingStep):
    """Handles the first pass of type checking: registering types and functions."""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()

        if macro in all_macros:
            # Call the register_type method on the macro provider
            all_macros[macro](ctx)

        # Recursively process children to find nested definitions
        for child in ctx.node.children:
            child_ctx = replace(ctx, node=child)
            self.process_node(child_ctx)


class TypeCheckingStep(MacroProcessingStep):
    """Handles type checking"""
    
    def __init__(self, macros: MacroRegistry):
        super().__init__()
        # Use the unified typecheck registry
        self.macros = macros
        
    def process_node(self, ctx: MacroContext) -> None:
        """Type check a single node"""
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        all_macros = self.macros.all()
        
        # Create a description for this node for indentation
        node_desc = f"node {macro}"
        if hasattr(ctx.node, 'content') and ctx.node.content:
            # Limit content preview to keep it readable
            content_preview = ctx.node.content[:50] + ("..." if len(ctx.node.content) > 50 else "")
            node_desc = f"node {macro}: {content_preview}"
        
        with default_logger.indent("typecheck", node_desc):
            if macro in all_macros:
                with ctx.compiler.safely:
                    return all_macros[macro](ctx)
            else:
                for child in ctx.node.children:
                    child_ctx = replace(ctx, node=child)
                    self.process_node(child_ctx)


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


# Utility functions that were scattered in processor_base.py

def unroll_parent_chain(n) -> list:
    """Walk up the parent chain and return all nodes"""
    from core.node import Node
    rv: list[Node] = []
    while n:
        rv.append(n)
        n = n.parent
    return rv


def seek_child_macro(n, macro: str):
    """Find a child node with a specific macro"""
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            return child
        

def seek_all_child_macros(n, macro: str):
    """Find all child nodes with a specific macro"""
    for child in n.children:
        m, _ = cut(child.content, " ")
        if macro == m:
            yield child


TYPICAL_IGNORED_MACROS = {"type", "noscope"}

def filter_child_macros(n):
    """Filter out typical ignored macros from children"""
    def get_macro(n): 
        macro, _ = cut(n.content, " ")
        return macro
    return [c for c in n.children if get_macro(c) not in TYPICAL_IGNORED_MACROS]


T = TypeVar("T")

def singleton(cls: type[T]) -> T:
    """converts the annotated class into a singleton, immediately instantiating it"""
    instance = cls()
    return cast(Callable[..., Any], lambda *args, **kwargs: instance)


class MacroAssertFailed(Exception):
    """
    raised by macros during processing to ensure said processing is possible.
    compiler will recover during tree walks as soon as possible, thus making it possible
    to catch multiple assert failures.
    automatically raised by Compiler.assert_ which you should use probably instead of manually
    raising this.
    """
    def __init__(self, message: str):
        self.message = message
        super().__init__(self.message) # Call the base Exception constructor
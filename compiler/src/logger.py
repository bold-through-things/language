"""
custom logging system for the language compiler.
supports tag-based filtering and automatic indentation based on call stack depth.
"""

import sys
from typing import Set, Optional, TextIO, List
from contextlib import contextmanager
import threading

class SmartIndentContext:
    """Tracks whether any output was produced in an indented context"""
    def __init__(self, tag: str, message: str, indent_level: int):
        self.tag = tag
        self.message = message
        self.indent_level = indent_level
        self.had_output = False
        self.header_printed = False
        
class Logger:
    """
    a logger that supports tag filtering and automatic indentation.
    tags let you filter what gets logged (e.g., --log typecheck).
    indentation automatically reflects nesting depth.
    """
    
    def __init__(self, output: TextIO = sys.stderr):
        self.output = output
        self.enabled_tags: Optional[Set[str]] = None  # None means all tags enabled
        self._indent_level = 0
        self._lock = threading.Lock()  # thread safety for indent level
        self._context_stack: List[SmartIndentContext] = []  # track indented contexts
        
    def enable_tags(self, tags: Set[str]):
        """enable only the specified tags. if empty set, disable all logging."""
        self.enabled_tags = tags
        
    def enable_all_tags(self):
        """enable all tags (default behavior)."""
        self.enabled_tags = None
        
    def is_tag_enabled(self, tag: str) -> bool:
        """check if a tag should be logged."""
        if self.enabled_tags is None:
            return True
        return tag in self.enabled_tags
        
    def log(self, tag: str, message: str):
        """log a message with the given tag if enabled."""
        if not self.is_tag_enabled(tag):
            return
            
        with self._lock:
            # Print any pending headers first
            self._ensure_headers_printed()
            
            # Mark that output occurred in all active contexts
            for context in self._context_stack:
                context.had_output = True
                
            indent = "  " * self._indent_level
            self.output.write(f"{indent}[{tag}] {message}\n")
            self.output.flush()
            
    def _ensure_headers_printed(self):
        """Print headers for any contexts that haven't had their headers printed yet"""
        for context in self._context_stack:
            if not context.header_printed:
                indent = "  " * context.indent_level
                self.output.write(f"{indent}[{context.tag}] begin: {context.message}\n")
                self.output.flush()
                context.header_printed = True
    
    @contextmanager
    def indent(self, tag: str, message: str):
        """
        context manager that logs entry/exit with indentation.
        useful for tracking entering/exiting functions or processing steps.
        only prints header/footer if something was logged inside.
        """
        if not self.is_tag_enabled(tag):
            yield
            return
        
        context = None
        try:
            with self._lock:
                # Create a new context but don't print header yet
                context = SmartIndentContext(tag, message, self._indent_level)
                self._context_stack.append(context)
                self._indent_level += 1
            
            yield
            
        finally:
            with self._lock:
                if context and context in self._context_stack:
                    self._context_stack.remove(context)
                    self._indent_level -= 1
                    
                    # Only print footer if we had output and header was printed
                    if context.had_output and context.header_printed:
                        indent = "  " * self._indent_level
                        self.output.write(f"{indent}[{tag}] done: {message}\n")
                        self.output.flush()
    
    def debug(self, message: str):
        """convenience method for debug messages."""
        self.log("debug", message)
        
    def typecheck(self, message: str):
        """convenience method for typecheck messages."""
        self.log("typecheck", message)
        
    def macro(self, message: str):
        """convenience method for macro processing messages."""
        self.log("macro", message)
        
    def compile(self, message: str):
        """convenience method for general compilation messages."""
        self.log("compile", message)
        
    def codegen(self, message: str):
        """convenience method for code generation messages."""
        self.log("codegen", message)
        
    def parse(self, message: str):
        """convenience method for parsing messages."""
        self.log("parse", message)
        
    def registry(self, message: str):
        """convenience method for macro registry messages."""
        self.log("registry", message)

# global logger instance that can be configured
default_logger = Logger()

def configure_logger_from_args(log_tags: Optional[str] = None):
    """
    configure the global logger based on command line arguments.
    log_tags: comma-separated string of tags to enable, or None to disable all logging
    """
    if log_tags is None:
        default_logger.enable_tags(set())  # disable all logging by default
    else:
        tags = set(tag.strip() for tag in log_tags.split(",") if tag.strip())
        default_logger.enable_tags(tags)
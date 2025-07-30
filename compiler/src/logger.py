"""
custom logging system for the language compiler.
supports tag-based filtering and automatic indentation based on call stack depth.
"""

import sys
from typing import Set, Optional, TextIO
from contextlib import contextmanager
import threading

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
            indent = "  " * self._indent_level
            self.output.write(f"{indent}[{tag}] {message}\n")
            self.output.flush()
    
    @contextmanager
    def indent(self, tag: str, message: str):
        """
        context manager that logs entry/exit with indentation.
        useful for tracking entering/exiting functions or processing steps.
        """
        if self.is_tag_enabled(tag):
            with self._lock:
                indent = "  " * self._indent_level
                self.output.write(f"{indent}[{tag}] → {message}\n")
                self.output.flush()
                self._indent_level += 1
        
        try:
            yield
        finally:
            if self.is_tag_enabled(tag):
                with self._lock:
                    self._indent_level -= 1
                    indent = "  " * self._indent_level
                    self.output.write(f"{indent}[{tag}] ← {message}\n")
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

# global logger instance that can be configured
default_logger = Logger()

def configure_logger_from_args(log_tags: Optional[str] = None):
    """
    configure the global logger based on command line arguments.
    log_tags: comma-separated string of tags to enable, or None for all
    """
    if log_tags is None:
        default_logger.enable_all_tags()
    elif log_tags.strip() == "":
        default_logger.enable_tags(set())  # disable all logging
    else:
        tags = set(tag.strip() for tag in log_tags.split(","))
        default_logger.enable_tags(tags)
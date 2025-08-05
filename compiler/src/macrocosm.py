#!/usr/bin/env python3

"""
Step 4: Ascend the ladder - Refactored 67lang compiler
Clean, registry-based architecture with proper separation of concerns
"""

from node import Node
from logger import default_logger
from handlers import (
    MacroHandler, PrintHandler, LocalHandler, IfHandler, ForHandler,
    AccessMacroHandler, WhileHandler, FunctionHandler, CallHandler,
    NoteHandler, DoScopeHandler, FileRootHandler
)
from value_compiler import ValueHandler
from typing import List, Dict, Any, Optional
import json


class Macrocosm:
    """Refactored compiler using registry pattern"""
    
    def __init__(self):
        self.errors = []
        self.compile_errors = []  # For compatibility with main.py
        self.nodes = []  # For compatibility with main.py
        self.value_handler = ValueHandler()
        
        # Register all macro handlers
        self.handlers = [
            FileRootHandler(),  # Should be first to handle root nodes
            PrintHandler(),
            LocalHandler(),
            IfHandler(),
            ForHandler(),
            AccessMacroHandler(),
            WhileHandler(),
            FunctionHandler(),
            CallHandler(),
            NoteHandler(),
            DoScopeHandler(),
        ]
    
    def register(self, node: Node):
        """Register a parsed node (compatibility with main.py)"""
        self.nodes.append(node)
    
    def compile(self) -> str:
        """Compile all registered nodes to JavaScript (compatibility with main.py)"""
        self.errors = []
        self.compile_errors = []
        
        statements = []
        for node in self.nodes:
            js = self._compile_node(node)
            if js:
                statements.append(js)
        
        if self.errors:
            # Convert errors to the format expected by main.py
            for error in self.errors:
                self.compile_errors.append({"message": error})
            error_msg = "\n".join(self.errors)
            raise RuntimeError(f"Compilation failed:\n{error_msg}")
        
        return "\n".join(statements)
    
    def compile_to_js(self, root_node: Node) -> str:
        """Compile 67lang AST to JavaScript"""
        self.errors = []
        
        statements = []
        for child in root_node.children:
            js = self._compile_node(child)
            if js:
                statements.append(js)
        
        if self.errors:
            error_msg = "\n".join(self.errors)
            raise RuntimeError(f"Compilation failed:\n{error_msg}")
        
        return "\n".join(statements)
    
    def _compile_node(self, node: Node) -> Optional[str]:
        """Compile a single node using the handler registry"""
        content = node.content.strip()
        
        # Try each handler
        for handler in self.handlers:
            if handler.can_handle(content):
                return handler.compile(node, self)
        
        # No handler found
        self._add_error(f"unknown macro: {content}", node)
        return ""
    
    def _compile_value(self, node: Node) -> str:
        """Compile a value expression"""
        return self.value_handler.compile_value(node, self)
    
    def _add_error(self, message: str, node: Node):
        """Add an error to the error list"""
        line_info = f"line {node.pos.line}" if node.pos else "unknown position"
        error = f"Error at {line_info}: {message}"
        self.errors.append(error)
        default_logger.compile(error)
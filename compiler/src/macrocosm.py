#!/usr/bin/env python3

"""
Step 4: Ascend the ladder - Refactored 67lang compiler
Clean, registry-based architecture with proper separation of concerns
"""

from node import Node
from logger import default_logger
from strutil import cut
from handlers import (
    MacroHandler, PrintHandler, LocalHandler, IfHandler, ThenHandler, ElseHandler, 
    ForHandler, AccessMacroHandler, WhileHandler, FunctionHandler, CallHandler,
    NoteHandler, DoScopeHandler, FileRootHandler, CommentHandler, IsTtyHandler,
    PromptHandler, StdinHandler, ConcatHandler, ZipHandler, ExistsHandler,
    InsideHandler, ValuesHandler, ReturnHandler, BreakHandler, TypeHandler, 
    WhereClauseHandler, RegexHandler
)
from value_compiler import ValueHandler
from typing import List, Dict, Any, Optional
import json


class Macrocosm:
    """Refactored compiler using direct macro mapping"""
    
    def __init__(self):
        self.errors = []
        self.compile_errors = []  # For compatibility with main.py
        self.nodes = []  # For compatibility with main.py
        self.value_handler = ValueHandler()
        
        # Direct mapping of macro names to handlers
        self.macro_handlers = {
            'print': PrintHandler(),
            'local': LocalHandler(),
            'if': IfHandler(),
            'then': ThenHandler(),
            'else': ElseHandler(),
            'for': ForHandler(),
            'while': WhileHandler(),
            'fn': FunctionHandler(),
            'call': CallHandler(),
            'note': NoteHandler(),
            'do': DoScopeHandler(),
            # New input/output macros
            '#': CommentHandler(),
            'is_tty': IsTtyHandler(),
            'prompt': PromptHandler(),
            'stdin': StdinHandler(),
            'concat': ConcatHandler(),
            'zip': ZipHandler(),
            'exists': ExistsHandler(),
            'inside': InsideHandler(),
            'values': ValuesHandler(),
            'return': ReturnHandler(),
            'break': BreakHandler(),
            'type': TypeHandler(),
            'where': WhereClauseHandler(),
            'regex': RegexHandler(),
            # Access aliases all map to the same handler
            'a': AccessMacroHandler(),
            'an': AccessMacroHandler(),
            'access': AccessMacroHandler(),
            # Value handler macros
            'string': self.value_handler,
            'int': self.value_handler,
            'float': self.value_handler,
            'true': self.value_handler,
            'false': self.value_handler,
            'all': self.value_handler,
            'any': self.value_handler,
            'none': self.value_handler,
            'add': self.value_handler,
            'sub': self.value_handler,
            'mul': self.value_handler,
            'div': self.value_handler,
            'mod': self.value_handler,
            'eq': self.value_handler,
            'ne': self.value_handler,
            'lt': self.value_handler,
            'gt': self.value_handler,
            'le': self.value_handler,
            'ge': self.value_handler,
            'asc': self.value_handler,
            'desc': self.value_handler,
            'list': self.value_handler,
            'dict': self.value_handler,
        }
        
        # Special handler for root nodes
        self.file_root_handler = FileRootHandler()
    
    @property
    def handlers(self):
        """Compatibility property for main.py"""
        return list(self.macro_handlers.values())
    
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
            # Emit errors in the right format from the start
            for error in self.errors:
                self.compile_errors.append({"message": error})
            error_msg = "\n".join(self.errors)
            raise RuntimeError(f"Compilation failed:\n{error_msg}")
        
        return "\n".join(statements)
    
    def compile_to_js(self, root_node: Node) -> str:
        """Compile 67lang AST to JavaScript - delegate to FileRootHandler"""
        self.errors = []
        
        # Root node should be handled by FileRootHandler
        js = self._compile_node(root_node)
        
        if self.errors:
            error_msg = "\n".join(self.errors)
            raise RuntimeError(f"Compilation failed:\n{error_msg}")
        
        return js or ""
    
    def _compile_node(self, node: Node) -> Optional[str]:
        """Compile a single node using direct macro mapping"""
        content = node.content.strip()
        
        # Handle file root specially
        if content == "67lang:file":
            return self.file_root_handler.compile(node, self)
        
        # Extract macro name using cut
        macro, rest = cut(content, ' ')
        
        # Look up handler directly
        if macro in self.macro_handlers:
            return self.macro_handlers[macro].compile(node, self)
        
        # Crash loud and hard for unknown nodes - no silent fallbacks
        self._add_error(f"unknown macro or unhandled node: '{macro}' in '{content}'", node)
        return ""
    
    def compile_value(self, node: Node) -> str:
        """Compile a value expression - replacement for _compile_value"""
        return self.value_handler.compile_value(node, self)
    
    def _add_error(self, message: str, node: Node):
        """Add an error to the error list"""
        line_info = f"line {node.pos.line}" if node.pos else "unknown position"
        error = f"Error at {line_info}: {message}"
        self.errors.append(error)
        default_logger.compile(error)
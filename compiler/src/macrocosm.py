#!/usr/bin/env python3

"""
Step 4: Ascend the ladder - Refactored 67lang compiler
Clean, registry-based architecture with proper separation of concerns
"""

from node import Node
from logger import default_logger
from typing import List, Dict, Any, Optional
import json
from abc import ABC, abstractmethod


class MacroHandler(ABC):
    """Base class for all macro handlers"""
    
    @abstractmethod
    def can_handle(self, content: str) -> bool:
        """Check if this handler can process the given content"""
        pass
    
    @abstractmethod
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        """Compile the node to JavaScript"""
        pass


class PrintHandler(MacroHandler):
    """Handles print statements"""
    
    def can_handle(self, content: str) -> bool:
        return content == "print"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        if not node.children:
            compiler._add_error("print statement has no children", node)
            return ""
        
        # Compile all child values
        js_values = []
        for child in node.children:
            js_value = compiler._compile_value(child)
            js_values.append(js_value)
        
        # Let console.log handle concatenation naturally
        return f"console.log({', '.join(js_values)});"


class LocalHandler(MacroHandler):
    """Handles local variable assignments"""
    
    def can_handle(self, content: str) -> bool:
        return content.startswith("local ")
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        var_name = node.content.removeprefix("local ")
        
        if not node.children:
            compiler._add_error("local statement has no value", node)
            return ""
        
        value_node = node.children[0]
        js_value = compiler._compile_value(value_node)
        
        return f"let {var_name} = {js_value};"


class IfHandler(MacroHandler):
    """Handles if statements"""
    
    def can_handle(self, content: str) -> bool:
        return content == "if"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        if not node.children:
            compiler._add_error("if statement has no condition", node)
            return ""
        
        condition = compiler._compile_value(node.children[0])
        
        # Find then and else blocks by looking at siblings
        then_block = None
        else_block = None
        
        if node.parent:
            if_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    if_index = i
                    break
            
            if if_index is not None:
                for i in range(if_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "then":
                        then_block = sibling
                    elif sibling.content == "else":
                        else_block = sibling
                        break
                    elif sibling.content == "if":
                        break
        
        result = f"if ({condition}) {{"
        
        if then_block:
            for child in then_block.children:
                child_js = compiler._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        if else_block:
            result += "\n  } else {"
            for child in else_block.children:
                child_js = compiler._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        result += "\n  }"
        return result


class ForHandler(MacroHandler):
    """Handles for loops"""
    
    def can_handle(self, content: str) -> bool:
        return content.startswith("for ") and " in" in content
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        content = node.content
        if not content.startswith("for ") or " in" not in content:
            compiler._add_error("invalid for loop syntax", node)
            return ""
        
        # Extract variable name using removeprefix
        var_part = content.removeprefix("for ")
        var_name = var_part.replace(" in", "").strip()
        
        if not node.children:
            compiler._add_error("for loop has no iterable", node)
            return ""
        
        iterable = compiler._compile_value(node.children[0])
        
        # Find do block
        do_block = None
        if node.parent:
            for_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    for_index = i
                    break
            
            if for_index is not None:
                for i in range(for_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "do":
                        do_block = sibling
                        break
        
        result = f"for (const {var_name} of {iterable}) {{"
        
        if do_block:
            for child in do_block.children:
                child_js = compiler._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        result += "\n  }"
        return result


class ValueHandler:
    """Handles value compilation - strings, ints, booleans, variables, etc."""
    
    def compile_value(self, node: Node, compiler: 'Macrocosm') -> str:
        content = node.content.strip()
        
        # Basic types
        if content.startswith('string '):
            string_content = content.removeprefix('string ')
            if string_content.startswith('"') and string_content.endswith('"'):
                return string_content
            else:
                return f'"{string_content}"'
        
        elif content.startswith('int '):
            return content.removeprefix('int ')
        
        elif content in ['true', 'false']:
            return content
        
        # Variable access - unify a, an, access
        elif content.startswith(('an ', 'a ', 'access ')):
            return self._handle_variable_access(content, node, compiler)
        
        # Arithmetic operations
        elif content == 'add':
            return self._compile_arithmetic(node, '+', compiler)
        elif content == 'mod':
            return self._compile_arithmetic(node, '%', compiler)
        
        # Comparisons
        elif content == 'asc':
            return self._compile_comparison(node, '<', compiler)
        elif content == 'eq':
            return self._compile_comparison(node, '===', compiler)
        
        # Data structures
        elif content == 'list':
            return self._compile_list(node, compiler)
        elif content == 'dict':
            return self._compile_dict(node, compiler)
        
        else:
            compiler._add_error(f"unknown value type: {content}", node)
            return f'"{content}"'
    
    def _handle_variable_access(self, content: str, node: Node, compiler: 'Macrocosm') -> str:
        """Unified handling for a, an, access prefixes"""
        # Determine the prefix and extract the rest
        if content.startswith('access '):
            var_part = content.removeprefix('access ')
        elif content.startswith('an '):
            var_part = content.removeprefix('an ')
        elif content.startswith('a '):
            var_part = content.removeprefix('a ')
        else:
            compiler._add_error(f"unknown variable access: {content}", node)
            return content
        
        # Check for method calls
        parts = var_part.split()
        if len(parts) >= 2:
            var_name, method_name = parts[0], parts[1]
            # Check if this is a method call (more flexible than hardcoded list)
            if self._is_method_call(method_name):
                return self._compile_method_call(var_name, method_name, node, compiler)
        
        # Check for key access syntax
        if 'key' in content:
            return self._compile_key_access(node, compiler)
        
        # Simple variable access
        return var_part
    
    def _is_method_call(self, method_name: str) -> bool:
        """Check if the given name is a method (extensible)"""
        # Common string methods - this is more maintainable than hardcoding in conditions
        string_methods = {'split', 'join', 'replace', 'trim', 'toLowerCase', 'toUpperCase'}
        return method_name in string_methods
    
    def _compile_method_call(self, var_name: str, method_name: str, node: Node, compiler: 'Macrocosm') -> str:
        """Compile method calls"""
        method_arg = None
        if node.children:
            method_arg = compiler._compile_value(node.children[0])
        
        if method_arg:
            return f"{var_name}.{method_name}({method_arg})"
        else:
            return f"{var_name}.{method_name}()"
    
    def _compile_key_access(self, node: Node, compiler: 'Macrocosm') -> str:
        """Compile key access for reading/writing"""
        content = node.content
        
        # Parse variable name from various forms
        if content.startswith("a ") and "key" in content:
            parts = content.split()
            if len(parts) >= 3 and parts[2] == "key":
                var_name = parts[1]
            else:
                compiler._add_error("invalid key access syntax", node)
                return ""
        else:
            compiler._add_error("invalid key access syntax", node)
            return ""
        
        # Find the key value
        key_value = None
        for child in node.children:
            if child.content.startswith("where key is"):
                if child.children:
                    key_value = compiler._compile_value(child.children[0])
                break
        
        if key_value is None:
            compiler._add_error("key access missing key value", node)
            return f"{var_name}[0]"
        
        return f"{var_name}[{key_value}]"
    
    def _compile_arithmetic(self, node: Node, operator: str, compiler: 'Macrocosm') -> str:
        """Compile arithmetic operations"""
        if len(node.children) < 2:
            compiler._add_error(f"arithmetic operation needs at least 2 operands", node)
            return "0"
        
        operands = []
        for child in node.children:
            operand = compiler._compile_value(child)
            operands.append(operand)
        
        # Chain operations left-to-right
        result = operands[0]
        for operand in operands[1:]:
            result = f"({result} {operator} {operand})"
        
        return result
    
    def _compile_comparison(self, node: Node, operator: str, compiler: 'Macrocosm') -> str:
        """Compile comparison operations"""
        if len(node.children) != 2:
            compiler._add_error(f"comparison operation needs exactly 2 operands", node)
            return "false"
        
        left = compiler._compile_value(node.children[0])
        right = compiler._compile_value(node.children[1])
        
        return f"({left} {operator} {right})"
    
    def _compile_list(self, node: Node, compiler: 'Macrocosm') -> str:
        """Compile a list literal"""
        elements = []
        for child in node.children:
            element = compiler._compile_value(child)
            elements.append(element)
        
        return f"[{', '.join(elements)}]"
    
    def _compile_dict(self, node: Node, compiler: 'Macrocosm') -> str:
        """Compile a dictionary literal"""
        if not node.children:
            return "{}"
        
        # TODO: Handle dictionary with initial values
        return "{}"


class KeyAssignmentHandler(MacroHandler):
    """Handles key assignment operations"""
    
    def can_handle(self, content: str) -> bool:
        return content.startswith('a ') and 'key' in content
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        content = node.content
        
        parts = content.split()
        if len(parts) < 3 or parts[2] != "key":
            compiler._add_error("invalid key assignment syntax", node)
            return ""
        
        var_name = parts[1]
        
        # Find key value and assignment value
        key_value = None
        assign_value = None
        
        for child in node.children:
            if child.content.startswith("where key is"):
                if child.children:
                    key_value = compiler._compile_value(child.children[0])
            else:
                assign_value = compiler._compile_value(child)
        
        if key_value is None:
            compiler._add_error("key assignment missing key", node)
            return ""
        
        if assign_value is None:
            compiler._add_error("key assignment missing value", node)
            return ""
        
        return f"{var_name}[{key_value}] = {assign_value};"


class Macrocosm:
    """Refactored compiler using registry pattern"""
    
    def __init__(self):
        self.nodes: List[Node] = []
        self.compile_errors: List[Dict[str, Any]] = []
        self.value_handler = ValueHandler()
        
        # Register handlers
        self.handlers: List[MacroHandler] = [
            PrintHandler(),
            LocalHandler(), 
            IfHandler(),
            ForHandler(),
            KeyAssignmentHandler(),
        ]
    
    def register(self, node: Node) -> None:
        """Register a parsed node for compilation"""
        self.nodes.append(node)
        default_logger.compile(f"registered node: {node.content}")
    
    def compile(self) -> str:
        """Compile all registered nodes to JavaScript"""
        default_logger.compile("starting JavaScript compilation")
        
        js_statements = []
        
        for node in self.nodes:
            try:
                js_code = self._compile_node(node)
                if js_code:
                    js_statements.append(js_code)
            except Exception as e:
                self._add_error(f"Compilation error in node '{node.content}': {e}", node)
        
        # Wrap in immediately invoked function expression
        result = "(() => {\n"
        for statement in js_statements:
            result += f"  {statement}\n"
        result += "})();"
        
        default_logger.compile(f"compilation complete, generated {len(js_statements)} statements")
        return result
    
    def _compile_node(self, node: Node) -> Optional[str]:
        """Compile a single node using the handler registry"""
        if node.content == "67lang:file":
            # Root file node - compile children
            js_statements = []
            for child in node.children:
                child_js = self._compile_node(child)
                if child_js:
                    js_statements.append(child_js)
            return "\n  ".join(js_statements) if js_statements else None
        
        elif node.content in ["then", "else", "do"]:
            # These are handled by their parent statements
            return None
        
        else:
            # Use handler registry
            for handler in self.handlers:
                if handler.can_handle(node.content):
                    return handler.compile(node, self)
            
            default_logger.compile(f"unknown node type: {node.content}")
            return None
    
    def _compile_value(self, node: Node) -> str:
        """Compile a value node using the value handler"""
        return self.value_handler.compile_value(node, self)
    
    def _add_error(self, message: str, node: Node) -> None:
        """Add a compilation error"""
        line_num = node.pos.line if node.pos else 0
        error = {
            "message": message,
            "line": line_num,
            "content": node.content
        }
        self.compile_errors.append(error)
        default_logger.compile(f"error: {message}")
#!/usr/bin/env python3

"""
Step 4: Ascend the ladder - Minimal 67lang compiler rewrite
Starting with basic types and print statements
"""

from node import Node
from logger import default_logger
from typing import List, Dict, Any, Optional
import json


class Macrocosm:
    """Minimal compiler for 67lang - Step 4 rewrite"""
    
    def __init__(self):
        self.nodes: List[Node] = []
        self.compile_errors: List[Dict[str, Any]] = []
        
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
        """Compile a single node to JavaScript"""
        if node.content == "67lang:file":
            # This is the root file node, compile its children
            js_statements = []
            for child in node.children:
                child_js = self._compile_node(child)
                if child_js:
                    js_statements.append(child_js)
            return "\n  ".join(js_statements) if js_statements else None
        elif node.content == "print":
            return self._compile_print(node)
        elif node.content.startswith("local "):
            return self._compile_local(node)
        else:
            default_logger.compile(f"unknown node type: {node.content}")
            return None
            
    def _compile_print(self, node: Node) -> str:
        """Compile a print statement"""
        if not node.children:
            self._add_error("print statement has no children", node)
            return ""
            
        # Multiple children means concatenation
        js_values = []
        for child in node.children:
            js_value = self._compile_value(child)
            js_values.append(js_value)
        
        if len(js_values) == 1:
            return f"console.log({js_values[0]});"
        else:
            # Concatenate with spaces
            concatenated = " + ' ' + ".join(js_values)
            return f"console.log({concatenated});"
        
    def _compile_value(self, node: Node) -> str:
        """Compile a value node to JavaScript"""
        content = node.content.strip()
        
        if content.startswith('string '):
            # Extract string content: string "hello world" -> "hello world"
            string_content = content[7:]  # Remove 'string '
            if string_content.startswith('"') and string_content.endswith('"'):
                return string_content  # Already quoted
            else:
                return f'"{string_content}"'
                
        elif content.startswith('int '):
            # Extract integer: int 42 -> 42
            int_content = content[4:]  # Remove 'int '
            return int_content
            
        elif content == 'true':
            return 'true'
            
        elif content == 'false':
            return 'false'
            
        elif content.startswith('an '):
            # Variable access: an name -> name
            var_name = content[3:]  # Remove 'an '
            return var_name
        elif content == 'add':
            return self._compile_arithmetic(node, '+')
        elif content == 'mod':
            return self._compile_arithmetic(node, '%')
        else:
            self._add_error(f"unknown value type: {content}", node)
            return f'"{content}"'  # Fallback to string
            
    def _compile_local(self, node: Node) -> str:
        """Compile a local variable assignment"""
        # Extract variable name: "local name" -> "name"
        var_name = node.content[6:]  # Remove "local "
        
        if not node.children:
            self._add_error("local statement has no value", node)
            return ""
            
        # Get the value to assign
        value_node = node.children[0]
        js_value = self._compile_value(value_node)
        
        return f"let {var_name} = {js_value};"
        
    def _compile_arithmetic(self, node: Node, operator: str) -> str:
        """Compile arithmetic operations"""
        if len(node.children) < 2:
            self._add_error(f"arithmetic operation needs at least 2 operands", node)
            return "0"
            
        # Compile all operands
        operands = []
        for child in node.children:
            operand = self._compile_value(child)
            operands.append(operand)
        
        # For multiple operands, chain the operations left-to-right
        result = operands[0]
        for operand in operands[1:]:
            result = f"({result} {operator} {operand})"
            
        return result
        
    def _add_error(self, message: str, node: Node) -> None:
        line_num = node.pos.line if node.pos else 0
        error = {
            "message": message,
            "line": line_num,
            "content": node.content
        }
        self.compile_errors.append(error)
        default_logger.compile(f"error: {message}")
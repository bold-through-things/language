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
        elif node.content == "if":
            return self._compile_if(node)
        elif node.content.startswith("for ") and " in" in node.content:
            return self._compile_for(node)
        elif node.content.startswith("a ") and "key" in node.content:
            return self._compile_key_assignment(node)
        elif node.content in ["then", "else", "do"]:
            # These are handled by their parent statements
            return None
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
            # Check if this is a method call by looking for method names
            parts = content[3:].split()  # Remove 'an '
            if len(parts) >= 2 and parts[1] in ['split', 'join']:
                return self._compile_method_call(node)
            else:
                # Simple variable access: an name -> name
                var_name = content[3:]  # Remove 'an '
                return var_name
        elif content == 'add':
            return self._compile_arithmetic(node, '+')
        elif content == 'mod':
            return self._compile_arithmetic(node, '%')
        elif content == 'asc':
            return self._compile_comparison(node, '<')
        elif content == 'eq':
            return self._compile_comparison(node, '===')
        elif content == 'list':
            return self._compile_list(node)
        elif content == 'dict':
            return self._compile_dict(node)
        elif content.startswith('access '):
            # Variable access in expressions: access numbers -> numbers
            var_name = content[7:]  # Remove 'access '
            return var_name
        elif content.startswith('a ') and 'key' in content:
            return self._compile_key_access(node)
        elif content.startswith('a '):
            # Check if this is a method call
            parts = content[2:].split()  # Remove 'a '
            if len(parts) >= 2 and parts[1] in ['split', 'join']:
                return self._compile_method_call(node)
            else:
                self._add_error(f"unknown a-syntax: {content}", node)
                return f'"{content}"'
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
        
    def _compile_comparison(self, node: Node, operator: str) -> str:
        """Compile comparison operations"""
        if len(node.children) != 2:
            self._add_error(f"comparison operation needs exactly 2 operands", node)
            return "false"
            
        left = self._compile_value(node.children[0])
        right = self._compile_value(node.children[1])
        
        return f"({left} {operator} {right})"
        
    def _compile_if(self, node: Node) -> str:
        """Compile if statement - needs to find associated then/else blocks"""
        # Find the condition (first child of if node)
        if not node.children:
            self._add_error("if statement has no condition", node)
            return ""
            
        condition = self._compile_value(node.children[0])
        
        # Find the then and else blocks by looking at siblings
        then_block = None
        else_block = None
        
        if node.parent:
            # Find this if node's position in parent's children
            if_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    if_index = i
                    break
                    
            if if_index is not None:
                # Look for then/else after the if
                for i in range(if_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "then":
                        then_block = sibling
                    elif sibling.content == "else":
                        else_block = sibling
                        break  # else ends the if statement
                    elif sibling.content == "if":
                        break  # new if statement
        
        # Compile the blocks
        result = f"if ({condition}) {{"
        
        if then_block:
            for child in then_block.children:
                child_js = self._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        if else_block:
            result += "\n  } else {"
            for child in else_block.children:
                child_js = self._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        result += "\n  }"
        return result
        
    def _compile_list(self, node: Node) -> str:
        """Compile a list literal"""
        elements = []
        for child in node.children:
            element = self._compile_value(child)
            elements.append(element)
        
        return f"[{', '.join(elements)}]"
        
    def _compile_dict(self, node: Node) -> str:
        """Compile a dictionary literal"""
        if not node.children:
            # Empty dictionary
            return "{}"
        
        # TODO: Handle dictionary with initial values if needed
        return "{}"
        
    def _compile_key_access(self, node: Node) -> str:
        """Compile key access for reading: a fruits key where key is int 0"""
        content = node.content
        
        # Parse "a fruits key" to get variable name
        if not content.startswith("a "):
            self._add_error("invalid key access syntax", node)
            return ""
            
        # Extract variable name: "a fruits key" -> "fruits"
        parts = content.split()
        if len(parts) < 3 or parts[2] != "key":
            self._add_error("invalid key access syntax", node)
            return ""
            
        var_name = parts[1]
        
        # Find the key value in children
        # Look for "where key is" child
        key_value = None
        for child in node.children:
            if child.content.startswith("where key is"):
                if child.children:
                    key_value = self._compile_value(child.children[0])
                break
        
        if key_value is None:
            self._add_error("key access missing key value", node)
            return f"{var_name}[0]"
            
        return f"{var_name}[{key_value}]"
        
    def _compile_key_assignment(self, node: Node) -> str:
        """Compile key assignment: a scores key where key is string 'Alice' -> value"""
        content = node.content
        
        # Parse "a scores key" to get variable name
        if not content.startswith("a "):
            self._add_error("invalid key assignment syntax", node)
            return ""
            
        # Extract variable name: "a scores key" -> "scores"
        parts = content.split()
        if len(parts) < 3 or parts[2] != "key":
            self._add_error("invalid key assignment syntax", node)
            return ""
            
        var_name = parts[1]
        
        # Find the key value and assignment value
        key_value = None
        assign_value = None
        
        for child in node.children:
            if child.content.startswith("where key is"):
                if child.children:
                    key_value = self._compile_value(child.children[0])
            else:
                # This should be the value to assign
                assign_value = self._compile_value(child)
        
        if key_value is None:
            self._add_error("key assignment missing key", node)
            return ""
            
        if assign_value is None:
            self._add_error("key assignment missing value", node)
            return ""
            
        return f"{var_name}[{key_value}] = {assign_value};"
        
    def _compile_method_call(self, node: Node) -> str:
        """Compile method calls like 'an text split' or 'a words join'"""
        content = node.content
        
        # Parse the method call
        if content.startswith('an '):
            # an text split -> text.split(...)
            parts = content[3:].split()  # Remove 'an '
            if len(parts) >= 2:
                var_name = parts[0]
                method_name = parts[1]
            else:
                self._add_error("invalid method call syntax", node)
                return ""
        elif content.startswith('a '):
            # a words join -> words.join(...)
            parts = content[2:].split()  # Remove 'a '
            if len(parts) >= 2:
                var_name = parts[0]
                method_name = parts[1]
            else:
                self._add_error("invalid method call syntax", node)
                return ""
        else:
            self._add_error("invalid method call syntax", node)
            return ""
        
        # Get the method argument if present
        method_arg = None
        if node.children:
            method_arg = self._compile_value(node.children[0])
        
        # Generate the method call
        if method_arg:
            return f"{var_name}.{method_name}({method_arg})"
        else:
            return f"{var_name}.{method_name}()"
        
    def _compile_for(self, node: Node) -> str:
        """Compile for loop"""
        # Parse "for item in" to get the loop variable name
        content = node.content
        if not content.startswith("for ") or " in" not in content:
            self._add_error("invalid for loop syntax", node)
            return ""
            
        # Extract variable name: "for num in" -> "num"
        var_part = content[4:]  # Remove "for "
        var_name = var_part.replace(" in", "").strip()
        
        # Find the iterable (first child) and do block (sibling)
        if not node.children:
            self._add_error("for loop has no iterable", node)
            return ""
            
        iterable = self._compile_value(node.children[0])
        
        # Find the do block by looking at siblings
        do_block = None
        if node.parent:
            # Find this for node's position in parent's children
            for_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    for_index = i
                    break
                    
            if for_index is not None:
                # Look for do block after the for
                for i in range(for_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "do":
                        do_block = sibling
                        break
        
        # Compile the loop
        result = f"for (const {var_name} of {iterable}) {{"
        
        if do_block:
            for child in do_block.children:
                child_js = self._compile_node(child)
                if child_js:
                    result += f"\n    {child_js}"
        
        result += "\n  }"
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
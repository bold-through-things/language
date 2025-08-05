#!/usr/bin/env python3

"""
Handler classes for 67lang compiler macros
Clean, registry-based architecture with proper separation of concerns
"""

from node import Node
from logger import default_logger
from strutil import cut
from typing import List, Dict, Any, Optional
import json
from abc import ABC, abstractmethod


class MacroHandler(ABC):
    """Base class for all macro handlers"""
    
    # Most handlers follow the simple pattern: macro_name = cut(content, ' ')[0]
    # Override this for special cases
    def get_macro_name(self, content: str) -> str:
        """Extract macro name from content"""
        macro, _ = cut(content, ' ')
        return macro
    
    def can_handle(self, content: str) -> bool:
        """Default implementation checks if macro matches expected_macro"""
        if hasattr(self, 'expected_macro'):
            return self.get_macro_name(content) == self.expected_macro
        # Custom handlers override this method
        return False
    
    @abstractmethod
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        """Compile the node to JavaScript"""
        pass


class PrintHandler(MacroHandler):
    """Handles print statements"""
    expected_macro = "print"
    
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
    expected_macro = "local"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, var_name = cut(node.content, ' ')
        
        if not node.children:
            compiler._add_error("local statement has no value", node)
            return ""
        
        value = compiler._compile_value(node.children[0])
        return f"let {var_name} = {value};"


class IfHandler(MacroHandler):
    """Handles if statements"""
    expected_macro = "if"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        if not node.children:
            compiler._add_error("if statement has no condition", node)
            return ""
        
        condition = compiler._compile_value(node.children[0])
        
        # Find then and else blocks
        then_block = None
        else_block = None
        
        if node.parent:
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    # Look for subsequent then and else blocks
                    for j in range(i + 1, len(node.parent.children)):
                        next_sibling = node.parent.children[j]
                        if next_sibling.content == "then":
                            then_block = next_sibling
                        elif next_sibling.content == "else":
                            else_block = next_sibling
                        elif next_sibling.content.startswith("if "):
                            break  # Next if statement
        
        # Crash loud crash hard - then block is required
        if not then_block:
            compiler._add_error("if statement missing required then block", node)
            return ""
        
        # Compile then block
        then_statements = []
        for child in then_block.children:
            child_js = compiler._compile_node(child)
            if child_js:
                then_statements.append(child_js)
        
        then_body = "\n    ".join(then_statements) if then_statements else ""
        
        if else_block:
            # Compile else block
            else_statements = []
            for child in else_block.children:
                child_js = compiler._compile_node(child)
                if child_js:
                    else_statements.append(child_js)
            
            else_body = "\n    ".join(else_statements) if else_statements else ""
            return f"if ({condition}) {{\n    {then_body}\n  }} else {{\n    {else_body}\n  }}"
        else:
            return f"if ({condition}) {{\n    {then_body}\n  }}"


class ForHandler(MacroHandler):
    """Handles for loops"""
    
    def can_handle(self, content: str) -> bool:
        macro, rest = cut(content, ' ')
        return macro == "for" and " in" in content
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, rest = cut(node.content, ' ')
        if " in" not in rest:
            compiler._add_error("invalid for loop syntax", node)
            return ""
        
        # Parse "var_name in collection"
        var_part, collection_part = rest.split(" in", 1)
        var_name = var_part.strip()
        collection_name = collection_part.strip()
        
        # Find the accompanying do block
        do_block = None
        if node.parent:
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    # Look for the next do block
                    for j in range(i + 1, len(node.parent.children)):
                        next_sibling = node.parent.children[j]
                        if next_sibling.content == "do":
                            do_block = next_sibling
                            break
                        elif next_sibling.content.startswith("for "):
                            break  # Next for loop
        
        # Crash loud crash hard - do block is required
        if not do_block:
            compiler._add_error("for loop missing required do block", node)
            return ""
        
        # Compile loop body
        body_statements = []
        for child in do_block.children:
            child_js = compiler._compile_node(child)
            if child_js:
                body_statements.append(child_js)
        
        body = "\n    ".join(body_statements) if body_statements else ""
        return f"for (const {var_name} of {collection_name}) {{\n    {body}\n  }}"


class AccessMacroHandler(MacroHandler):
    """Handles all access operations including key assignments, function calls, and variable assignments"""
    
    def can_handle(self, content: str) -> bool:
        macro, rest = cut(content, ' ')
        # Handle 'a' and 'access' with children (assignments or function calls)
        return macro in ['a', 'access'] and rest
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        macro, rest = cut(node.content, ' ')
        
        # Check if this is key assignment
        if 'key' in rest:
            return self._compile_key_assignment(node, compiler, rest)
        
        # For access operations with children, always treat as variable assignment  
        if macro == 'access' and node.children:
            return self._compile_variable_assignment(node, compiler, rest)
        
        # For 'a' operations with children, check if it could be a function call
        # by checking if the rest looks like a function name (no spaces)
        if macro == 'a' and node.children:
            if ' ' not in rest.strip():  # Simple name, likely a function call
                return self._compile_function_call(node, compiler, rest)
            else:
                # Has spaces or other syntax, not a simple function call
                compiler._add_error(f"invalid access operation: {node.content}", node)
                return ""
        
        compiler._add_error(f"unknown access operation: {node.content}", node)
        return ""
    
    def _compile_key_assignment(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Compile key assignment: a var_name key where key is value_expr"""
        # Parse variable name from the beginning
        parts = rest.split()
        if len(parts) >= 2 and parts[1] == "key":
            var_name = parts[0]
        else:
            compiler._add_error("invalid key assignment syntax", node)
            return ""
        
        # Find the key value from children
        key_value = None
        for child in node.children:
            if child.content.startswith("where key is"):
                if child.children:
                    key_value = compiler._compile_value(child.children[0])
                break
        
        if key_value is None:
            compiler._add_error("key assignment missing key value", node)
            return ""
        
        # Find the assignment value
        assignment_value = None
        for child in node.children:
            if not child.content.startswith("where "):
                assignment_value = compiler._compile_value(child)
                break
        
        if assignment_value is None:
            compiler._add_error("key assignment missing value", node)
            return ""
        
        return f"{var_name}[{key_value}] = {assignment_value};"
    
    def _compile_function_call(self, node: Node, compiler: 'Macrocosm', func_name: str) -> str:
        """Compile function call: a function_name args"""
        args = []
        for child in node.children:
            arg_js = compiler._compile_value(child)
            args.append(arg_js)
        
        return f"{func_name}({', '.join(args)})"
    
    def _compile_variable_assignment(self, node: Node, compiler: 'Macrocosm', var_name: str) -> str:
        """Handle variable assignment: access var_name value"""
        if not node.children:
            compiler._add_error("access assignment missing value", node)
            return ""
        
        value = compiler._compile_value(node.children[0])
        return f"{var_name} = {value};"


class WhileHandler(MacroHandler):
    """Handles while loops"""
    expected_macro = "while"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        if not node.children:
            compiler._add_error("while loop has no condition", node)
            return ""
        
        condition = compiler._compile_value(node.children[0])
        
        # Find the accompanying do block
        do_block = None
        if node.parent:
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    # Look for the next do block
                    for j in range(i + 1, len(node.parent.children)):
                        next_sibling = node.parent.children[j]
                        if next_sibling.content == "do":
                            do_block = next_sibling
                            break
                        elif next_sibling.content.startswith("while "):
                            break  # Next while loop
        
        # Crash loud crash hard - do block is required
        if not do_block:
            compiler._add_error("while loop missing required do block", node)
            return ""
        
        # Compile loop body
        body_statements = []
        for child in do_block.children:
            child_js = compiler._compile_node(child)
            if child_js:
                body_statements.append(child_js)
        
        body = "\n    ".join(body_statements) if body_statements else ""
        return f"while ({condition}) {{\n    {body}\n  }}"


class FunctionHandler(MacroHandler):
    """Handles function definitions"""
    expected_macro = "fn"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, func_name = cut(node.content, ' ')
        
        # Extract parameters from child nodes
        params = []
        for child in node.children:
            if child.content.startswith("param "):
                # The parameter name is the rest after "param "
                _, param_name = cut(child.content, ' ')
                params.append(param_name)
        
        # Find the accompanying do block
        do_block = None
        if node.parent:
            fn_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    fn_index = i
                    break
            
            if fn_index is not None:
                for i in range(fn_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "do":
                        do_block = sibling
                        break
                    elif sibling.content.startswith("fn "):
                        break  # Next function
        
        # Crash loud crash hard - do block is required for functions
        if not do_block:
            compiler._add_error("function definition missing required do block", node)
            return ""
        
        # Compile function body
        body_statements = []
        for body_node in do_block.children:
            body_js = compiler._compile_node(body_node)
            if body_js:
                body_statements.append(body_js)
        
        param_list = ", ".join(params)
        if body_statements:
            body_js = "\n    ".join(body_statements)
            return f"function {func_name}({param_list}) {{\n    {body_js}\n  }}"
        else:
            return f"function {func_name}({param_list}) {{\n  }}"


class CallHandler(MacroHandler):
    """Handles function calls"""
    expected_macro = "call"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, func_name = cut(node.content, ' ')
        
        # Compile arguments
        args = []
        for child in node.children:
            arg_js = compiler._compile_value(child)
            args.append(arg_js)
        
        return f"{func_name}({', '.join(args)})"


class NoteHandler(MacroHandler):
    """Handles comments"""
    expected_macro = "note"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Comments don't generate any JavaScript
        return None


class DoScopeHandler(MacroHandler):
    """Handles standalone do blocks (scopes)"""
    
    def can_handle(self, content: str) -> bool:
        return content == "do"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Check if this do block is handled by a control structure
        if node.parent:
            for sibling in node.parent.children:
                sibling_macro, _ = cut(sibling.content, ' ')
                if sibling_macro in ['for', 'while'] and sibling != node:
                    return None  # Let the for/while handler manage this
        
        # Standalone do block creates a scope
        statements = []
        for child in node.children:
            child_js = compiler._compile_node(child)
            if child_js:
                statements.append(child_js)
        
        if not statements:
            return "(() => {})();"  # Empty IIFE instead of confusing empty object
        
        body = "\n    ".join(statements)
        return f"{{\n    {body}\n  }}"


class FileRootHandler(MacroHandler):
    """Handles the root 67lang:file node"""
    
    def can_handle(self, content: str) -> bool:
        return content == "67lang:file"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Root file node - compile children and join them
        js_statements = []
        for child in node.children:
            child_js = compiler._compile_node(child)
            if child_js:
                js_statements.append(child_js)
        return "\n".join(js_statements) if js_statements else None
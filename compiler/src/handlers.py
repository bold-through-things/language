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
            # Allow variable declaration without initial value
            return f"let {var_name};"
        
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
    """Handles all access operations - contextual: 1 arg = getter, 2 args = setter"""
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        macro, rest = cut(node.content, ' ')
        
        # Check if this is key assignment
        if 'key' in rest:
            return self._compile_key_assignment(node, compiler, rest)
        
        # Access is contextual based on number of arguments:
        # 1 arg = getter (a variable_name or a object property)
        # 2 args = setter (a variable_name value)
        
        if len(node.children) == 0:
            # No children - simple variable access for values (handled by value compiler)
            compiler._add_error(f"access operation missing arguments: {node.content}", node)
            return ""
        elif len(node.children) == 1:
            # One child - this is actually a setter operation!
            # access variable_name -> variable_name = (child_value)
            if ' ' not in rest.strip():  # Simple variable name
                child_value = compiler._compile_value(node.children[0])
                return f"{rest} = {child_value};"
            else:
                # Complex access like "a fruits 0" with one child - property/index access
                return self._compile_property_access(node, compiler, rest)
        elif len(node.children) == 2:
            # Two children = setter operation (a variable_name value)
            return self._compile_variable_assignment(node, compiler, rest)
        else:
            # More than 2 children - could be method chaining or complex assignment
            if self._is_method_chaining(rest):
                return self._compile_method_chaining(node, compiler, rest)
            else:
                compiler._add_error(f"access operation has too many arguments: {node.content}", node)
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
        
        # Find "where key is" child and get the key value from the next sibling
        key_value = None
        assignment_value = None
        
        for i, child in enumerate(node.children):
            if child.content.strip() == "where key is":
                # Key value should be the next child
                if i + 1 < len(node.children):
                    key_value = compiler._compile_value(node.children[i + 1])
                # Assignment value should be the child after that (if exists)
                if i + 2 < len(node.children):
                    assignment_value = compiler._compile_value(node.children[i + 2])
                break
        
        if key_value is None:
            compiler._add_error("key assignment missing key value", node)
            return ""
        
        # Check if this is a method call (like "push")
        if len(parts) >= 3:
            method_name = parts[2]
            if assignment_value:
                return f"{var_name}[{key_value}].{method_name}({assignment_value});"
            else:
                return f"{var_name}[{key_value}].{method_name}();"
        
        # Regular assignment
        if assignment_value:
            return f"{var_name}[{key_value}] = {assignment_value};"
        else:
            # Initialize with empty value (like creating a list)
            return f"{var_name}[{key_value}] = [];"
        
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
    
    def _compile_property_access(self, node: Node, compiler: 'Macrocosm', property_path: str) -> str:
        """Handle property/index access like 'a fruits 0' or 'a obj prop'"""
        # For now, treat as array/object access
        # "a fruits 0" becomes "fruits[0]"
        # "a obj prop" becomes "obj.prop" or "obj[prop]"
        
        parts = property_path.split()
        if len(parts) >= 2:
            obj_name = parts[0]
            accessor = parts[1]
            
            # Check if accessor looks like a number (array index)
            try:
                int(accessor)
                return f"{obj_name}[{accessor}]"
            except ValueError:
                # Not a number, treat as property
                return f"{obj_name}.{accessor}"
        
        # Fallback
        return property_path
    
    def _compile_as_expression(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Compile access operation as an expression (for use in value contexts)"""
        # This is for when access operations are used as values (like in print arguments)
        
        # Check if this is key syntax
        if 'key' in rest:
            return self._compile_key_access_expression(node, compiler, rest)
        
        # Check for method chaining (multiple methods)
        if self._is_method_chaining(rest):
            # Remove the semicolon from the method chaining result since this is an expression
            result = self._compile_method_chaining(node, compiler, rest)
            return result.rstrip(';')
        
        # Check for single method call like "text split"
        parts = rest.split()
        if len(parts) == 2 and len(node.children) >= 1:
            # Single method call with arguments: obj method
            obj_name = parts[0]
            method_name = parts[1]
            
            # Collect arguments from children
            args = []
            for child in node.children:
                arg_js = compiler._compile_value(child)
                args.append(arg_js)
            
            return f"{obj_name}.{method_name}({', '.join(args)})"
        
        if len(node.children) == 1:
            # One child - treat as function call: a func_name arg
            args = []
            for child in node.children:
                arg_js = compiler._compile_value(child)
                args.append(arg_js)
            return f"{rest}({', '.join(args)})"
        
        # No children - property/index access like "a fruits 0"
        if len(parts) >= 2:
            obj_name = parts[0]
            accessor = parts[1]
            
            # Check if accessor looks like a number (array index)
            try:
                int(accessor)
                return f"{obj_name}[{accessor}]"
            except ValueError:
                # Not a number, treat as property
                return f"{obj_name}.{accessor}"
        
        # Fallback to simple variable access
        return rest
        
        # Simple variable reference
        return rest
    
    def _compile_key_access_expression(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Compile key access as expression: a var_name key -> var_name[key_value]"""
        # Parse variable name from the beginning
        parts = rest.split()
        if len(parts) >= 2 and parts[1] == "key":
            var_name = parts[0]
        else:
            return rest  # Not valid key syntax
        
        # Find the key value from children
        key_value = None
        for child in node.children:
            if child.content.strip() == "where key is":
                if child.children:
                    key_value = compiler._compile_value(child.children[0])
                break
        
        if key_value is not None:
            return f"{var_name}[{key_value}]"
        else:
            # No key value found, return as-is
            return rest
    
    def _is_method_chaining(self, rest: str) -> bool:
        """Check if this looks like method chaining (multiple method names)"""
        parts = rest.split()
        if len(parts) >= 3:  # obj method1 method2 ...
            # Check if the parts after the first one look like method names
            string_methods = {'split', 'join', 'replace', 'trim', 'toLowerCase', 'toUpperCase', 'sort'}
            # Only consider it method chaining if there are at least 2 methods (not just 1)
            method_count = sum(1 for part in parts[1:] if part in string_methods)
            return method_count >= 2
        return False
    
    def _compile_method_chaining(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Compile method chaining like 'a phrase split sort join'"""
        parts = rest.split()
        if len(parts) < 3:
            compiler._add_error("method chaining needs at least object and two methods", node)
            return ""
        
        obj_name = parts[0]
        methods = parts[1:]
        
        # Find method arguments from children
        method_args = {}
        join_arg = None
        
        for child in node.children:
            content = child.content.strip()
            if content.startswith("where ") and " takes" in content:
                # Parse "where split takes"
                method_name = content.split()[1]
                if child.children:
                    arg_value = compiler._compile_value(child.children[0])
                    method_args[method_name] = arg_value
            elif content.startswith("string "):
                # Standalone string argument (likely for join)
                join_arg = compiler._compile_value(child)
        
        # Build the method chain
        result = obj_name
        for method in methods:
            if method == 'split' and 'split' in method_args:
                result = f"{result}.{method}({method_args['split']})"
            elif method == 'join' and join_arg:
                result = f"{result}.{method}({join_arg})"
            else:
                result = f"{result}.{method}()"
        
        return result + ";"


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
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Root file node - compile children and join them
        js_statements = []
        for child in node.children:
            child_js = compiler._compile_node(child)
            if child_js:
                js_statements.append(child_js)
        return "\n".join(js_statements) if js_statements else None
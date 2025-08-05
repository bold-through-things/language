#!/usr/bin/env python3

"""
Step 4: Ascend the ladder - Refactored 67lang compiler
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
        macro, _ = cut(content, ' ')
        return macro == "print"
    
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
        macro, _ = cut(content, ' ')
        return macro == "local"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, var_name = cut(node.content, ' ')
        
        if not node.children:
            compiler._add_error("local statement has no value", node)
            return ""
        
        value_node = node.children[0]
        js_value = compiler._compile_value(value_node)
        
        return f"let {var_name} = {js_value};"


class IfHandler(MacroHandler):
    """Handles if statements"""
    
    def can_handle(self, content: str) -> bool:
        macro, _ = cut(content, ' ')
        return macro == "if"
    
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
        
        # Crash loud, crash hard - then_block is required
        if then_block is None:
            compiler._add_error("if statement missing required then block", node)
            return ""
        
        result = f"if ({condition}) {{"
        
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
        macro, rest = cut(content, ' ')
        return macro == "for" and " in" in content
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, rest = cut(node.content, ' ')
        if " in" not in rest:
            compiler._add_error("invalid for loop syntax", node)
            return ""
        
        # Extract variable name using cut
        var_name, _ = cut(rest, ' in')
        var_name = var_name.strip()
        
        if not node.children:
            compiler._add_error("for loop has no iterable", node)
            return ""
        
        iterable = compiler._compile_value(node.children[0])
        
        # Find do block - required
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
        
        # Crash loud, crash hard - do_block is required
        if do_block is None:
            compiler._add_error("for loop missing required do block", node)
            return ""
        
        result = f"for (const {var_name} of {iterable}) {{"
        
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
        
        # Use cut to extract macro and content
        macro, rest = cut(content, ' ')
        
        # Basic types
        if macro == 'string':
            if rest.startswith('"') and rest.endswith('"'):
                return rest
            else:
                return f'"{rest}"'
        
        elif macro == 'int':
            return rest
        
        elif macro == 'float':
            return rest
        
        elif content in ['true', 'false']:
            return content
        
        # Logical operators
        elif macro in ['all', 'any', 'none']:
            return self._compile_logical_operator(macro, node, compiler)
        
        # Variable access - unify a, an, access
        elif macro in ['an', 'a', 'access']:
            return self._handle_variable_access(content, node, compiler)
        
        # Arithmetic operations
        elif macro == 'add':
            return self._compile_arithmetic(node, '+', compiler)
        elif macro == 'mod':
            return self._compile_arithmetic(node, '%', compiler)
        
        # Comparisons
        elif macro == 'asc':
            return self._compile_comparison(node, '<', compiler)
        elif macro == 'eq':
            return self._compile_comparison(node, '===', compiler)
        
        # Data structures
        elif macro == 'list':
            return self._compile_list(node, compiler)
        elif macro == 'dict':
            return self._compile_dict(node, compiler)
        
        else:
            compiler._add_error(f"unknown value type: {content}", node)
            return f'"{content}"'
    
    def _compile_logical_operator(self, operator: str, node: Node, compiler: 'Macrocosm') -> str:
        """Compile logical operators: all, any, none"""
        # Handle empty case for all() = true
        if not node.children and operator == 'all':
            return 'true'
        
        if not node.children:
            if operator == 'any':
                return 'false'
            elif operator == 'none':
                return 'true'
            else:
                return 'true'  # all
        
        # Compile all child values
        values = []
        for child in node.children:
            values.append(compiler._compile_value(child))
        
        if operator == 'all':
            # All values must be true
            return f"[{', '.join(values)}].every(x => x)"
        elif operator == 'any':
            # At least one value must be true
            return f"[{', '.join(values)}].some(x => x)"
        elif operator == 'none':
            # No values should be true (all should be false)
            return f"![{', '.join(values)}].some(x => x)"
        
        return 'false'
    
    def _handle_variable_access(self, content: str, node: Node, compiler: 'Macrocosm') -> str:
        """Unified handling for a, an, access prefixes"""
        # Use cut to extract prefix and rest
        macro, var_part = cut(content, ' ')
        
        if macro not in ['access', 'an', 'a']:
            compiler._add_error(f"unknown variable access: {content}", node)
            return content
        
        # Check for method chaining: a var_name method1 method2 method3 ...
        parts = var_part.split()
        if len(parts) >= 2:
            var_name = parts[0]
            potential_methods = parts[1:]
            
            # Check if any of these are methods
            has_methods = any(self._is_method_call(method) for method in potential_methods)
            
            if has_methods:
                return self._compile_method_chaining(var_name, potential_methods, node, compiler)
        
        # Check for key access syntax
        if 'key' in content:
            return self._compile_key_access(node, compiler)
        
        # Simple variable access or function call
        return var_part
    
    def _compile_method_chaining(self, var_name: str, methods: List[str], node: Node, compiler: 'Macrocosm') -> str:
        """Compile method chaining: var.method1().method2().method3()"""
        result = var_name
        
        for method in methods:
            if self._is_method_call(method):
                # Check for method arguments in children
                method_arg = None
                for child in node.children:
                    if child.content.startswith(f"where {method} takes"):
                        if child.children:
                            method_arg = compiler._compile_value(child.children[0])
                            break
                
                if method_arg:
                    result = f"{result}.{method}({method_arg})"
                else:
                    result = f"{result}.{method}()"
        
        return result
    
    def _is_method_call(self, method_name: str) -> bool:
        """Check if the given name is a method (extensible)"""
        # Common string methods - this is more maintainable than hardcoding in conditions
        string_methods = {'split', 'join', 'replace', 'trim', 'toLowerCase', 'toUpperCase', 'sort'}
        return method_name in string_methods
    
    def _compile_method_call(self, var_name: str, method_name: str, node: Node, compiler: 'Macrocosm') -> str:
        """Compile method calls including chained methods"""
        # Handle method chaining: var method1 method2 ...
        parts = var_name.split()
        if len(parts) > 1:
            # This is actually chained: var_name method1 method2 method3
            base_var = parts[0]
            methods = parts[1:] + [method_name]
            
            result = base_var
            for i, method in enumerate(methods):
                if self._is_method_call(method):
                    # Check for method arguments in children
                    method_arg = None
                    for child in node.children:
                        if child.content.startswith(f"where {method} takes"):
                            if child.children:
                                method_arg = compiler._compile_value(child.children[0])
                                break
                    
                    if method_arg:
                        result = f"{result}.{method}({method_arg})"
                    else:
                        result = f"{result}.{method}()"
            
            return result
        else:
            # Simple method call
            method_arg = None
            for child in node.children:
                if child.content.startswith(f"where {method_name} takes"):
                    if child.children:
                        method_arg = compiler._compile_value(child.children[0])
                        break
            
            if method_arg:
                return f"{var_name}.{method_name}({method_arg})"
            else:
                return f"{var_name}.{method_name}()"
    
    def _compile_key_access(self, node: Node, compiler: 'Macrocosm') -> str:
        """Compile key access for reading/writing"""
        content = node.content
        
        # Parse variable name from various forms using cut
        macro, rest = cut(content, ' ')
        if macro == 'a' and 'key' in rest:
            parts = rest.split()
            if len(parts) >= 2 and parts[1] == "key":
                var_name = parts[0]
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
        """Handle key assignment: a var_name key where key is ..."""
        parts = rest.split()
        if len(parts) < 2 or parts[1] != "key":
            compiler._add_error("invalid key assignment syntax", node)
            return ""
        
        var_name = parts[0]
        
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
    
    def _compile_function_call(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Handle function calls: a function_name arg1 arg2 ..."""
        func_name = rest.strip()
        
        # Compile arguments
        args = []
        for child in node.children:
            arg_js = compiler._compile_value(child)
            args.append(arg_js)
        
        return f"{func_name}({', '.join(args)});"
    
    def _compile_variable_assignment(self, node: Node, compiler: 'Macrocosm', rest: str) -> str:
        """Handle variable assignment: access var_name value"""
        var_name = rest.strip()
        
        if not node.children:
            compiler._add_error("access assignment missing value", node)
            return ""
        
        value = compiler._compile_value(node.children[0])
        return f"{var_name} = {value};"


class WhileHandler(MacroHandler):
    """Handles while loops"""
    
    def can_handle(self, content: str) -> bool:
        macro, _ = cut(content, ' ')
        return macro == "while"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        if not node.children:
            compiler._add_error("while loop has no condition", node)
            return ""
        
        condition = compiler._compile_value(node.children[0])
        
        # Find do block - required
        do_block = None
        if node.parent:
            while_index = None
            for i, sibling in enumerate(node.parent.children):
                if sibling is node:
                    while_index = i
                    break
            
            if while_index is not None:
                for i in range(while_index + 1, len(node.parent.children)):
                    sibling = node.parent.children[i]
                    if sibling.content == "do":
                        do_block = sibling
                        break
        
        # Crash loud, crash hard - do_block is required
        if do_block is None:
            compiler._add_error("while loop missing required do block", node)
            return ""
        
        result = f"while ({condition}) {{"
        
        for child in do_block.children:
            child_js = compiler._compile_node(child)
            if child_js:
                result += f"\n    {child_js}"
        
        result += "\n  }"
        return result


class FunctionHandler(MacroHandler):
    """Handles function definitions"""
    
    def can_handle(self, content: str) -> bool:
        macro, _ = cut(content, ' ')
        return macro == "fn"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        _, func_name = cut(node.content, ' ')
        
        # Extract parameters from child nodes
        params = []
        for child in node.children:
            if child.content.startswith("param "):
                # The parameter name is the rest after "param "
                _, param_name = cut(child.content, ' ')
                params.append(param_name)
        
        # Find the function body (do block) among siblings
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
        
        # Compile function body
        body_statements = []
        if do_block:
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
    
    def can_handle(self, content: str) -> bool:
        macro, _ = cut(content, ' ')
        return macro == "call"
    
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
    
    def can_handle(self, content: str) -> bool:
        macro, _ = cut(content, ' ')
        return macro == "note"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Comments don't generate any JavaScript
        return None


class DoScopeHandler(MacroHandler):
    """Handles do scopes (blocks with local scope)"""
    
    def can_handle(self, content: str) -> bool:
        return content == "do"
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> Optional[str]:
        # Only compile as standalone do block, not when part of for/while
        if node.parent:
            # Check if this is part of a for/while construct
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
            return "{}"
        
        body = "\n    ".join(statements)
        return f"{{\n    {body}\n  }}"


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
            WhileHandler(),
            FunctionHandler(),
            CallHandler(),
            NoteHandler(),
            DoScopeHandler(),
            AccessMacroHandler(),
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
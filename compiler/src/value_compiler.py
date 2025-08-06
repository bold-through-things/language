#!/usr/bin/env python3

"""
Value compiler for 67lang - handles expressions, variables, literals, etc.
"""

from node import Node
from strutil import cut
from typing import List, Dict, Any, Optional


class ValueHandler:
    """Handles value compilation - strings, ints, booleans, variables, etc."""
    
    def compile(self, node: Node, compiler: 'Macrocosm') -> str:
        """Handler interface - delegate to compile_value"""
        return self.compile_value(node, compiler)
    
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
        
        # Variable access - only handle simple variable references for values
        elif macro in ['an']:
            # For value compilation, only handle simple variable names without children
            if not node.children and not ' ' in rest:
                return rest  # Simple variable reference
            else:
                # Complex access operations should be handled by AccessMacroHandler
                compiler._add_error(f"complex access operation in value context: {content}", node)
                return content
        
        # Arithmetic operations
        elif macro == 'add':
            return self._compile_arithmetic(node, '+', compiler)
        elif macro == 'sub':
            return self._compile_arithmetic(node, '-', compiler)
        elif macro == 'mul':
            return self._compile_arithmetic(node, '*', compiler)
        elif macro == 'div':
            return self._compile_arithmetic(node, '/', compiler)
        elif macro == 'mod':
            return self._compile_arithmetic(node, '%', compiler)
        
        # Comparison operations
        elif macro == 'eq':
            return self._compile_comparison(node, '===', compiler)
        elif macro == 'ne':
            return self._compile_comparison(node, '!==', compiler)
        elif macro == 'lt':
            return self._compile_comparison(node, '<', compiler)
        elif macro == 'gt':
            return self._compile_comparison(node, '>', compiler)
        elif macro == 'le':
            return self._compile_comparison(node, '<=', compiler)
        elif macro == 'ge':
            return self._compile_comparison(node, '>=', compiler)
        elif macro == 'asc':
            # asc means ascending/less than
            return self._compile_comparison(node, '<', compiler)
        elif macro == 'desc':
            # desc means descending/greater than
            return self._compile_comparison(node, '>', compiler)
        
        # Data structures
        elif macro == 'list':
            return self._compile_list(node, compiler)
        elif macro == 'dict':
            return self._compile_dict(node, compiler)
        
        # Otherwise, assume it's a variable reference
        return content
    
    def _compile_logical_operator(self, operator: str, node: Node, compiler: 'Macrocosm') -> str:
        """Compile logical operators: all, any, none"""
        if not node.children:
            # Empty case
            if operator == 'all':
                return 'true'  # all() is true by logical convention
            else:
                return 'false'
        
        values = []
        for child in node.children:
            value = compiler._compile_value(child)
            values.append(value)
        
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
    
    def _is_method_call(self, method_name: str) -> bool:
        """Check if the given name is a method (extensible)"""
        # Common string methods - this is more maintainable than hardcoding in conditions
        string_methods = {'split', 'join', 'replace', 'trim', 'toLowerCase', 'toUpperCase', 'sort'}
        return method_name in string_methods
    
    def _compile_arithmetic(self, node: Node, operator: str, compiler: 'Macrocosm') -> str:
        """Compile arithmetic operations with multiple operands"""
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
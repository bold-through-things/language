"""
Corrections for broken/incomplete TypeScript type definitions from Microsoft.

Because TypeScript's lib.d.ts files don't always accurately reflect JavaScript runtime behavior,
we need to apply corrections after parsing. This is Microsoft's fault, not ours.
"""

from dataclasses import dataclass
from typing import List, Dict, Any

@dataclass
class ParameterCorrection:
    """Make a parameter optional that TypeScript incorrectly marks as required."""
    interface: str
    method: str
    parameter_index: int  # 0-based index of parameter to make optional
    parameter_name: str  # Name of parameter for verification
    
    def query(self):
        """XPath-like query to find the parameter to correct"""
        return [
            ("each", "TSInterface"),
            ("filter", "name", self.interface),
            ("each", "members"),
            ("filter", "type", "TSFunction"),
            ("filter", "name", self.method),
            ("each", "parameters"),
            ("index", self.parameter_index),
            ("filter", "name", self.parameter_name)
        ]
    
    def apply(self, matched):
        """Apply the correction to the matched parameter"""
        matched.optional = True

@dataclass
class PropertyReturnTypeCorrection:
    """Correct the return type of a property (e.g., length should return int, not number/float)."""
    interface: str
    property_name: str
    old_return_type: str
    new_return_type: str
    
    def query(self):
        """XPath-like query to find properties to correct"""
        return [
            ("each", "TSInterface"),
            ("filter", "name", self.interface),
            ("each", "members"),
            ("filter", "type", "TSProperty"),
            ("filter", "name", self.property_name),
            ("filter", "property_type", self.old_return_type)
        ]
    
    def apply(self, matched):
        """Apply the correction to the matched property"""
        matched.property_type = self.new_return_type

# Corrections for Microsoft's broken TypeScript definitions
TYPESCRIPT_CORRECTIONS = {
    # String.split() can be called with no arguments in JavaScript (splits into individual characters)
    # but TypeScript incorrectly requires the separator parameter
    "make_optional": [
        ParameterCorrection(
            interface="String", 
            method="split", 
            parameter_index=0,
            parameter_name="splitter"
        ),
    ],
    
    # length properties should return int, not float (number in TypeScript maps to float in 67lang)
    "fix_return_types": [
        PropertyReturnTypeCorrection(
            interface="Array",
            property_name="length",
            old_return_type="number",
            new_return_type="int"
        ),
        PropertyReturnTypeCorrection(
            interface="String", 
            property_name="length",
            old_return_type="number",
            new_return_type="int"
        ),
    ],
}

def execute_query(data, query):
    """Execute XPath-like query on data structure"""
    from typescript_parser import TSInterface, TSFunction, TSProperty
    
    # Registry of types for polymorphic lookup
    TYPE_REGISTRY = {
        "TSInterface": TSInterface,
        "TSFunction": TSFunction, 
        "TSProperty": TSProperty,
    }
    
    def op_each(current, type_name):
        if type_name in TYPE_REGISTRY:
            target_type = TYPE_REGISTRY[type_name]
            return [item for item in current if isinstance(item, target_type)]
        elif type_name == "members":
            return [member for item in current for member in item.members]
        elif type_name == "parameters":
            return [param for item in current for param in item.parameters]
        else:
            raise RuntimeError(f"Unknown type in each operation: {type_name}")
    
    def op_filter(current, attr_name, expected_value):
        if attr_name == "type" and expected_value in TYPE_REGISTRY:
            target_type = TYPE_REGISTRY[expected_value]
            return [item for item in current if isinstance(item, target_type)]
        else:
            return [item for item in current if hasattr(item, attr_name) and getattr(item, attr_name) == expected_value]
    
    def op_index(current, index):
        if not isinstance(current, list):
            raise RuntimeError(f"Cannot index into non-list: {type(current)}")
        if index >= len(current):
            raise RuntimeError(f"Index {index} out of bounds, collection has {len(current)} items")
        return [current[index]]
    
    OPERATIONS = {
        "each": op_each,
        "filter": op_filter,
        "index": op_index,
    }
    
    current = data
    
    for step in query:
        operation, *args = step
        if operation not in OPERATIONS:
            raise RuntimeError(f"Unknown operation: {operation}")
        current = OPERATIONS[operation](current, *args)
            
    return current

def apply_typescript_corrections(declarations: List[Any]) -> List[Any]:
    """
    Apply corrections to parsed TypeScript declarations before generating builtins.
    
    This function fixes Microsoft's broken/incomplete type definitions.
    """
    for category_name, corrections in TYPESCRIPT_CORRECTIONS.items():
        for correction in corrections:
            try:
                # Execute the correction's query to find matching elements
                matching_elements = execute_query(declarations, correction.query())
                
                if not matching_elements:
                    raise RuntimeError(f"Query returned no results for {correction}")
                
                # Apply correction to all matching elements
                for element in matching_elements:
                    correction.apply(element)
                    print(f"CORRECTION: Applied {type(correction).__name__} to {correction} (Microsoft's TypeScript types are wrong)")
                    
            except RuntimeError as e:
                raise RuntimeError(f"Correction failed for {correction}: {e}") from e
    
    return declarations
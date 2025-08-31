"""
Proper type system for 67lang - no strings, mandatory generics.

Every type is represented as a proper object. Collections MUST have type parameters.
Generic types are first-class citizens.
"""

from dataclasses import dataclass
from typing import List, Dict, Optional, Set, Union
from abc import ABC, abstractmethod

from utils.common_utils import print_with_callback


class Type(ABC):
    """Base class for all types in the 67lang type system."""
    
    @abstractmethod
    def __str__(self) -> str:
        pass
    
    @abstractmethod
    def is_assignable_to(self, other: 'Type') -> bool:
        """Check if this type can be assigned to another type."""
        pass
    
    @abstractmethod
    def is_concrete(self) -> bool:
        """Check if this type has no type variables."""
        pass


@dataclass(frozen=True)
class PrimitiveType(Type):
    """Primitive types like int, string, bool."""
    name: str
    
    def __str__(self) -> str:
        return self.name
    
    def is_assignable_to(self, other: Type) -> bool:
        if isinstance(other, PrimitiveType):
            if self.name == other.name:
                return True
            # Check type hierarchy for subtype relationships
            from .type_hierarchy import type_hierarchy
            if self in type_hierarchy:
                return other in type_hierarchy[self] or other.name in type_hierarchy[self] or any(
                    self._is_transitive_subtype(parent, other.name, type_hierarchy) 
                    for parent in type_hierarchy[self]
                )
        elif isinstance(other, str):
            # Handle string type compatibility
            if self.name == other:
                return True
            # Check type hierarchy for assignability
            from .type_hierarchy import type_hierarchy
            if self in type_hierarchy:
                return other in type_hierarchy[self] or any(
                    self._is_transitive_subtype(parent, other, type_hierarchy) 
                    for parent in type_hierarchy[self]
                )
        return False
    
    def _is_transitive_subtype(self, current: str, target: str, hierarchy: dict) -> bool:
        """Check if current is transitively a subtype of target."""
        if current == target:
            return True
        if current in hierarchy:
            return any(
                self._is_transitive_subtype(parent, target, hierarchy)
                for parent in hierarchy[current]
            )
        return False
    
    def is_concrete(self) -> bool:
        return True


@dataclass(frozen=True)
class TypeVariable(Type):
    """Type variable like T, K, V that can be substituted."""
    name: str
    constraints: tuple[Type, ...] = ()
    
    def __str__(self) -> str:
        if self.constraints:
            constraint_str = " & ".join(str(c) for c in self.constraints)
            return f"{self.name} extends {constraint_str}"
        return self.name
    
    def is_assignable_to(self, other: Type) -> bool:
        # Type variables are assignable based on their constraints
        if isinstance(other, TypeVariable):
            return self.name == other.name
        
        # Check if any constraint is assignable to the target type
        return any(constraint.is_assignable_to(other) for constraint in self.constraints)
    
    def is_concrete(self) -> bool:
        return False


@dataclass(frozen=True)
class ComplexType(Type):
    """Complex types like List<String>, Dict<String, Module>, or user-defined types."""
    name: str
    type_params: tuple[Type, ...] = ()
    fields: tuple[tuple[str, Type], ...] = ()  # Using tuple for immutability
    
    def __str__(self) -> str:
        if not self.type_params:
            return self.name
        args_str = ", ".join(str(param) for param in self.type_params)
        return f"{self.name}<{args_str}>"
    
    @print_with_callback(lambda self, other, rv: f"assign {self} to {other}: {rv}")
    def is_assignable_to(self, other: Type) -> bool:
        # Handle compatibility with legacy string types (for built-in functions)
        if isinstance(other, str):
            # Direct name match
            if self.name == other:
                return True
            # Check type hierarchy for assignability
            from compiler_types.type_hierarchy import type_hierarchy
            # Get the base type (unbound generic) to match the type_hierarchy keys
            base_type = type_registry.get_type(self.name)
            return other in type_hierarchy.get(base_type, [])
        
        if not isinstance(other, ComplexType):
            return False
        
        if self.name != other.name:
            return False
        
        if len(self.type_params) != len(other.type_params):
            return False
        
        # Check type parameter compatibility (covariant for now)
        return all(
            self_param.is_assignable_to(other_param)
            for self_param, other_param in zip(self.type_params, other.type_params)
        )
    
    def is_concrete(self) -> bool:
        return all(param.is_concrete() for param in self.type_params)
    
    def get_field_type(self, field_name: str) -> Optional[Type]:
        """Get the type of a field by name."""
        for name, field_type in self.fields:
            if name == field_name:
                return field_type
        return None


@dataclass(frozen=True)
class FunctionType(Type):
    """Function type like (String, Int) -> Bool."""
    parameter_types: tuple[Type, ...]
    return_type: Type
    
    def __str__(self) -> str:
        if not self.parameter_types:
            return f"() -> {self.return_type}"
        
        params_str = ", ".join(str(param) for param in self.parameter_types)
        return f"({params_str}) -> {self.return_type}"
    
    def is_assignable_to(self, other: Type) -> bool:
        if not isinstance(other, FunctionType):
            return False
        
        # Function types are contravariant in parameters, covariant in return
        if len(self.parameter_types) != len(other.parameter_types):
            return False
        
        # Parameters: contravariant (other's params must be assignable to self's)
        params_compatible = all(
            other_param.is_assignable_to(self_param)
            for self_param, other_param in zip(self.parameter_types, other.parameter_types)
        )
        
        # Return type: covariant (self's return must be assignable to other's)
        return_compatible = self.return_type.is_assignable_to(other.return_type)
        
        return params_compatible and return_compatible
    
    def is_concrete(self) -> bool:
        return (all(param.is_concrete() for param in self.parameter_types) 
                and self.return_type.is_concrete())


# UserDefinedType removed - replaced by ComplexType


# Built-in primitive types
INT = PrimitiveType("int")
FLOAT = PrimitiveType("float")
STRING = PrimitiveType("str")  # Use shorter name
BOOL = PrimitiveType("bool")
VOID = PrimitiveType("void")


# Built-in generic types
class BuiltinGenericTypes:
    """Factory for built-in generic types."""
    
    @staticmethod
    def list_of(element_type: Type) -> ComplexType:
        return ComplexType("list", (element_type,), (("length", INT),))
    
    @staticmethod
    def dict_of(key_type: Type, value_type: Type) -> ComplexType:
        return ComplexType("dict", (key_type, value_type))  # No fields yet
    
    @staticmethod
    def function_of(param_types: List[Type], return_type: Type) -> FunctionType:
        return FunctionType(tuple(param_types), return_type)


class TypeSubstitution:
    """Handles type variable substitution."""
    
    def __init__(self, substitutions: Dict[str, Type]):
        self.substitutions = substitutions
    
    def apply(self, type_expr: Type) -> Type:
        """Apply substitutions to a type expression."""
        if isinstance(type_expr, TypeVariable):
            return self.substitutions.get(type_expr.name, type_expr)
        
        elif isinstance(type_expr, ComplexType):
            new_params = tuple(self.apply(param) for param in type_expr.type_params)
            return ComplexType(type_expr.name, new_params, type_expr.fields)
        
        elif isinstance(type_expr, FunctionType):
            new_params = tuple(self.apply(param) for param in type_expr.parameter_types)
            new_return = self.apply(type_expr.return_type)
            return FunctionType(new_params, new_return)
        
        else:
            return type_expr


class TypeRegistry:
    """Registry for all types in the system."""
    
    def __init__(self):
        self.types: Dict[str, ComplexType] = {}
        
        # Register built-in types
        self._register_builtins()
    
    def _register_builtins(self):
        """Register built-in types."""
        # List<T> template
        list_type = ComplexType(
            name="list",
            type_params=(TypeVariable("T"),),
            fields=(("length", INT),)
        )
        self.types["list"] = list_type
        
        # Dict<K, V> template  
        dict_type = ComplexType(
            name="dict",
            type_params=(TypeVariable("K"), TypeVariable("V"))
        )
        self.types["dict"] = dict_type
    
    def register_type(self, complex_type: ComplexType):
        """Register a type."""
        self.types[complex_type.name] = complex_type
    
    def get_type(self, name: str) -> Optional[Type]:
        """Get a type by name."""
        # Check primitives first
        if name == "int": return INT
        if name == "float": return FLOAT
        if name == "str": return STRING
        if name == "bool": return BOOL
        if name == "void": return VOID
        
        # Check complex types
        if name in self.types:
            return self.types[name]
        
        return None
    
    def instantiate_generic(self, name: str, type_args: List[Type]) -> Optional[ComplexType]:
        """Create an instance of a generic type."""
        if name not in self.types:
            return None
        
        template = self.types[name]
        if len(type_args) != len(template.type_params):
            return None
            
        return ComplexType(
            name=template.name,
            type_params=tuple(type_args),
            fields=template.fields
        )


# Global type registry
type_registry = TypeRegistry()


@dataclass(frozen=True)
class TypeParameter:
    """Wrapper to distinguish type expressions from value expressions in typecheck results."""
    type_expr: Type
    parameter_name: Optional[str] = None  # For 'type Foo for K' syntax
    
    def __str__(self) -> str:
        if self.parameter_name:
            return f"{self.type_expr} for {self.parameter_name}"
        return str(self.type_expr)
"""Error type constants for machine-readable compile error categorization."""

class ErrorType:
    """Error type constants for compile errors."""
    pass

# Auto-generate error type constants
_ERROR_TYPES = [
    # Syntax and structure errors
    "EXPECTED_DO_AFTER",           # Expected 'do' after 'for', 'while', etc.
    "EXPECTED_THEN_AFTER",         # Expected 'then' after 'if'
    "SYNTAX_ERROR",                # General syntax errors
    "INVALID_MACRO",               # Unknown macro
    "INVALID_INDENTATION",         # Invalid indentation (spaces instead of tabs)
    
    # Type checking errors
    "TYPE_MISMATCH",               # Type mismatch in field/argument
    "FIELD_TYPE_MISMATCH",         # Field demands specific type but given another
    "ARGUMENT_TYPE_MISMATCH",      # Argument demands specific type but given another
    "MISSING_TYPE",                # Field demands type but given None
    
    # Structure/argument errors  
    "WRONG_ARG_COUNT",             # Wrong number of arguments
    "MISSING_CHILD",               # Missing required child node
    "MISSING_BLOCK",               # Missing required block (do, then, etc.)
    "INVALID_STRUCTURE",           # Invalid node structure
    
    # Scope and context errors
    "MISSING_CONTEXT",             # Required context missing (e.g., param outside fn)
    "INVALID_PLACEMENT",           # Macro in wrong place
    
    # String literal errors
    "UNTERMINATED_STRING",         # String not properly delimited
    
    # General errors
    "ASSERTION_FAILED",            # General assertion failure
    "UNKNOWN_ERROR",               # Uncategorized error
]

# Set each error type as a class attribute with the same string value
for error_type in _ERROR_TYPES:
    setattr(ErrorType, error_type, error_type)
"""Error type constants for machine-readable compile error categorization."""

class ErrorType:
    """Error type constants for compile errors."""
    
    # Syntax and structure errors
    EXPECTED_DO_AFTER = "EXPECTED_DO_AFTER"           # Expected 'do' after 'for', 'while', etc.
    EXPECTED_THEN_AFTER = "EXPECTED_THEN_AFTER"       # Expected 'then' after 'if'
    SYNTAX_ERROR = "SYNTAX_ERROR"                      # General syntax errors
    INVALID_MACRO = "INVALID_MACRO"                    # Unknown macro
    
    # Type checking errors
    TYPE_MISMATCH = "TYPE_MISMATCH"                    # Type mismatch in field/argument
    FIELD_TYPE_MISMATCH = "FIELD_TYPE_MISMATCH"        # Field demands specific type but given another
    ARGUMENT_TYPE_MISMATCH = "ARGUMENT_TYPE_MISMATCH"  # Argument demands specific type but given another
    MISSING_TYPE = "MISSING_TYPE"                      # Field demands type but given None
    
    # Structure/argument errors  
    WRONG_ARG_COUNT = "WRONG_ARG_COUNT"               # Wrong number of arguments
    MISSING_CHILD = "MISSING_CHILD"                   # Missing required child node
    MISSING_BLOCK = "MISSING_BLOCK"                   # Missing required block (do, then, etc.)
    INVALID_STRUCTURE = "INVALID_STRUCTURE"           # Invalid node structure
    
    # Scope and context errors
    MISSING_CONTEXT = "MISSING_CONTEXT"               # Required context missing (e.g., param outside fn)
    INVALID_PLACEMENT = "INVALID_PLACEMENT"           # Macro in wrong place
    
    # String literal errors
    UNTERMINATED_STRING = "UNTERMINATED_STRING"       # String not properly delimited
    
    # General errors
    ASSERTION_FAILED = "ASSERTION_FAILED"             # General assertion failure
    UNKNOWN_ERROR = "UNKNOWN_ERROR"                   # Uncategorized error

def categorize_error_message(message: str) -> str:
    """Categorize an error message to determine its error type."""
    message_lower = message.lower()
    
    # Check for expected block patterns
    if "expected 'do' after" in message_lower:
        return ErrorType.EXPECTED_DO_AFTER
    if "expected 'then' after" in message_lower:
        return ErrorType.EXPECTED_THEN_AFTER
    
    # Check for type mismatch patterns
    if "field demands" in message_lower and "but is given" in message_lower:
        if "given none" in message_lower:
            return ErrorType.MISSING_TYPE
        return ErrorType.FIELD_TYPE_MISMATCH
    if "argument demands" in message_lower and "is given" in message_lower:
        return ErrorType.ARGUMENT_TYPE_MISMATCH
    
    # Check for count/structure patterns
    if "must have a single argument" in message_lower:
        return ErrorType.WRONG_ARG_COUNT
    if "single child" in message_lower or "single argument" in message_lower:
        return ErrorType.WRONG_ARG_COUNT
    if "must have" and "block" in message_lower:
        return ErrorType.MISSING_BLOCK
    if "must have" and "child" in message_lower:
        return ErrorType.MISSING_CHILD
    if "syntax:" in message_lower:
        return ErrorType.SYNTAX_ERROR
    
    # Check for context errors
    if "must be inside" in message_lower or "outside" in message_lower:
        return ErrorType.MISSING_CONTEXT
    
    # Check for string errors  
    if "delimited" in message_lower:
        return ErrorType.UNTERMINATED_STRING
        
    # Check for unknown macros
    if "unknown macro" in message_lower:
        return ErrorType.INVALID_MACRO
    
    # Default to assertion failed for "failed to assert" messages
    if "failed to assert" in message_lower:
        return ErrorType.ASSERTION_FAILED
        
    return ErrorType.UNKNOWN_ERROR
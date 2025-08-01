from processor_base import MacroProcessingStep
from macro_registry import MacroContext


class MustCompileErrorVerificationStep(MacroProcessingStep):
    """Step that verifies must_compile_error expectations and consumes matched errors."""
    
    def __init__(self):
        super().__init__()
        # This step doesn't register any macros - it just verifies expectations
        
    def process_node(self, ctx: MacroContext) -> None:
        """Verify must_compile_error expectations after error generation steps."""
        # Only process at the root level - we don't need to recurse
        if ctx.node.content != "PIL:solution":
            return
            
        self._verify_must_compile_error_expectations(ctx)
        
    def _verify_must_compile_error_expectations(self, ctx: MacroContext):
        """Verify that expected errors from must_compile_error macros occurred."""
        from error_types import ErrorType
        
        for expectation in ctx.compiler._must_compile_error_expectations:
            node = expectation['node']
            expected_errors = expectation['expected_errors']
            
            # Build a map of actual errors by line
            # Support multiple compile errors from a single line
            actual_errors_by_line = {}
            for error in ctx.compiler.compile_errors:
                line = error["line"]
                error_type = error.get("error_type", "UNKNOWN_ERROR")
                if line not in actual_errors_by_line:
                    actual_errors_by_line[line] = []
                actual_errors_by_line[line].append(error_type)
            
            # Track which errors were consumed by this expectation
            consumed_error_lines = []
            
            # Check each expected error
            for expected_line, expected_type in expected_errors.items():
                if expected_line not in actual_errors_by_line:
                    ctx.compiler.compile_error(
                        node, 
                        f"expected {expected_type} error on line {expected_line} but no error found",
                        ErrorType.ASSERTION_FAILED
                    )
                elif expected_type not in actual_errors_by_line[expected_line]:
                    ctx.compiler.compile_error(
                        node,
                        f"expected {expected_type} error on line {expected_line} but found {actual_errors_by_line[expected_line]}",
                        ErrorType.ASSERTION_FAILED
                    )
                else:
                    # Error matched, mark it for consumption
                    consumed_error_lines.append(expected_line)
            
            # Remove consumed errors from compile_errors
            # For now, remove all errors from consumed lines - this could be improved
            # to only remove the specific error types that were expected
            ctx.compiler.compile_errors = [
                error for error in ctx.compiler.compile_errors 
                if error["line"] not in consumed_error_lines
            ]
            
            # Mark this expectation as processed so it doesn't generate errors again during emission
            expectation['processed'] = True
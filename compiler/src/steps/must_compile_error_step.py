from processor_base import MacroProcessingStep
from macro_registry import MacroContext
from dataclasses import replace
from strutil import IndentedStringIO
from logger import default_logger


class MustCompileErrorVerificationStep(MacroProcessingStep):
    """Step that handles must_compile_error nodes - extracts expectations, processes children, and verifies errors."""
    
    def __init__(self):
        super().__init__()
        self.expectations = []  # Store expectations as we find them
        
    def process_node(self, ctx: MacroContext) -> None:
        """Process node using standard tree walking, handling must_compile_error nodes as we encounter them."""
        from node import Macro
        
        # Handle current node if it's must_compile_error
        macro = str(ctx.compiler.get_metadata(ctx.node, Macro))
        if macro == "must_compile_error":
            expected_errors = self._extract_expectations_from_node(ctx, ctx.node)
            if expected_errors is not None:
                self.expectations.append({
                    'node': ctx.node,
                    'expected_errors': expected_errors
                })
            # Don't process children - they were already processed by earlier steps
        else:
            # Process children for non-must_compile_error nodes (standard tree walking pattern)
            for child in ctx.node.children:
                child_ctx = replace(ctx, node=child)
                self.process_node(child_ctx)
        
        # At the solution level, verify all collected expectations
        if ctx.node.content == "67lang:solution":
            self._verify_expectations(ctx, self.expectations)
            self.expectations = []  # Reset for next compilation
        
    def _extract_expectations_from_node(self, ctx: MacroContext, node):
        """Extract expected errors from a must_compile_error node."""
        from error_types import ErrorType
        from node import Args
        
        args = ctx.compiler.get_metadata(node, Args)
        default_logger.macro(f"must_compile_error with args: '{args}'")
        
        # Parse expected errors from args: "ERROR_TYPE=line ERROR_TYPE2=line2"
        expected_errors = {}
        if not args.strip():
            ctx.compiler.compile_error(node, "must_compile_error macro requires arguments in format ERROR_TYPE=line", ErrorType.INVALID_MACRO)
            return None
            
        for pair in args.split():
            if "=" not in pair:
                ctx.compiler.compile_error(node, f"must_compile_error argument must contain '=': {pair}", ErrorType.INVALID_MACRO)
                return None
            error_type, line_str = pair.split("=", 1)
            try:
                line_num = int(line_str)
                expected_errors[line_num] = error_type.strip()
            except ValueError:
                ctx.compiler.compile_error(node, f"invalid line number in must_compile_error: {line_str}", ErrorType.INVALID_MACRO)
                return None
        
        return expected_errors
    
    def _verify_expectations(self, ctx: MacroContext, expectations):
        """Verify that expected errors from must_compile_error macros occurred."""
        from error_types import ErrorType
        
        for expectation in expectations:
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
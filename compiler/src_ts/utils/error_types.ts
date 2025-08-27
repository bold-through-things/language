/**
 * Error type constants for the 67lang compiler
 */

export class ErrorType {
	// Syntax and structure errors
	public static readonly EXPECTED_DO_AFTER = "EXPECTED_DO_AFTER";
	public static readonly EXPECTED_THEN_AFTER = "EXPECTED_THEN_AFTER";
	public static readonly SYNTAX_ERROR = "SYNTAX_ERROR";
	public static readonly INVALID_MACRO = "INVALID_MACRO";
	public static readonly INVALID_INDENTATION = "INVALID_INDENTATION";

	// Type checking errors
	public static readonly TYPE_MISMATCH = "TYPE_MISMATCH";
	public static readonly FIELD_TYPE_MISMATCH = "FIELD_TYPE_MISMATCH";
	public static readonly ARGUMENT_TYPE_MISMATCH = "ARGUMENT_TYPE_MISMATCH";
	public static readonly MISSING_TYPE = "MISSING_TYPE";
	public static readonly NO_SUCH_LOCAL = "NO_SUCH_LOCAL";
	public static readonly NO_MATCHING_OVERLOAD = "NO_MATCHING_OVERLOAD";
	public static readonly AMBIGUOUS_OVERLOAD = "AMBIGUOUS_OVERLOAD";

	// Structure/argument errors
	public static readonly WRONG_ARG_COUNT = "WRONG_ARG_COUNT";
	public static readonly MISSING_CHILD = "MISSING_CHILD";
	public static readonly MISSING_BLOCK = "MISSING_BLOCK";
	public static readonly INVALID_STRUCTURE = "INVALID_STRUCTURE";

	// Scope and context errors
	public static readonly MISSING_CONTEXT = "MISSING_CONTEXT";
	public static readonly INVALID_PLACEMENT = "INVALID_PLACEMENT";

	// String literal errors
	public static readonly UNTERMINATED_STRING = "UNTERMINATED_STRING";

	// Literal errors
	public static readonly INVALID_INT = "INVALID_INT";
	public static readonly INVALID_FLOAT = "INVALID_FLOAT";

	// General errors
	public static readonly ASSERTION_FAILED = "ASSERTION_FAILED";
	public static readonly UNKNOWN_ERROR = "UNKNOWN_ERROR";
}
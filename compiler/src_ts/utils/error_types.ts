// utils/error_types.ts

// Add/remove names here; everything else updates automatically.
export const ERROR_TYPES = [
  "EXPECTED_DO_AFTER",
  "EXPECTED_THEN_AFTER",
  "SYNTAX_ERROR",
  "INVALID_MACRO",
  "INVALID_INDENTATION",

  "TYPE_MISMATCH",
  "FIELD_TYPE_MISMATCH",
  "ARGUMENT_TYPE_MISMATCH",
  "MISSING_TYPE",
  "NO_SUCH_LOCAL",
  "NO_MATCHING_OVERLOAD",
  "AMBIGUOUS_OVERLOAD",

  "WRONG_ARG_COUNT",
  "MISSING_CHILD",
  "MISSING_BLOCK",
  "INVALID_STRUCTURE",

  "MISSING_CONTEXT",
  "INVALID_PLACEMENT",

  "UNTERMINATED_STRING",

  "INVALID_INT",
  "INVALID_FLOAT",

  "ASSERTION_FAILED",
  "UNKNOWN_ERROR",
] as const;

// TypeScript literal-union of all names.
export type ErrorType = typeof ERROR_TYPES[number];

// Simple namespace-like lookup (Crystal-style `ErrorType::FOO`)
export const ErrorType: Record<ErrorType, ErrorType> = Object.fromEntries(
  ERROR_TYPES.map((e) => [e, e]),
) as Record<ErrorType, ErrorType>;

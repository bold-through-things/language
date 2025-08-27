/**
 * Custom exceptions for the 67lang compiler
 */

export class MacroAssertFailed extends Error {
	constructor(message: string) {
		super(message);
		this.name = "MacroAssertFailed";
	}
}

export class CompilationError extends Error {
	constructor(message: string) {
		super(message);
		this.name = "CompilationError";
	}
}

/**
 * Decorator that catches MacroAssertFailed and returns '*' to prevent cascading errors
 */
export function gracefulTypecheck<T extends (...args: unknown[]) => unknown>(
	func: T,
): T {
	return ((...args: unknown[]) => {
		try {
			return func(...args);
		} catch (error) {
			if (error instanceof MacroAssertFailed) {
				// Return wildcard type to prevent cascading null propagation errors
				return "*";
			}
			throw error;
		}
	}) as T;
}
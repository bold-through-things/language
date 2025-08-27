/**
 * Utility classes and functions - TypeScript equivalent of utils.py
 */

export class scope {
	// TypeScript doesn't have context managers like Python, but we can simulate
	// the same pattern with try/finally or explicit cleanup functions
	enter(): void {
		// no setup needed
	}

	exit(): void {
		// no cleanup needed
	}
}

// Global scope instance
export const globalScope = new scope();

export type Constructor<T = {}> = abstract new (...args: any[]) => T;

export class TypeMap {
	private static defaultFactories = new Map<Constructor<unknown>, () => unknown>();
	private store = new Map<Constructor<unknown>, unknown>();

	get<T>(key: Constructor<T>): T {
		if (this.store.has(key as Constructor<unknown>)) {
			return this.store.get(key as Constructor<unknown>) as T;
		}
		if (TypeMap.defaultFactories.has(key as Constructor<unknown>)) {
			const factory = TypeMap.defaultFactories.get(key as Constructor<unknown>)!;
			const value = factory();
			this.store.set(key as Constructor<unknown>, value);
			return value as T;
		}
		throw new Error(`No entry or default factory registered for ${key.name}`);
	}

	maybe<T>(key: Constructor<T>): T | null {
		if (this.store.has(key as Constructor<unknown>)) {
			return this.store.get(key as Constructor<unknown>) as T;
		}
		return null;
	}

	set<T>(key: Constructor<T>, value: T): void {
		this.store.set(key as Constructor<unknown>, value);
	}

	static register<T>(key: Constructor<T>, factory: () => T): void {
		TypeMap.defaultFactories.set(key as Constructor<unknown>, factory);
	}
}

/**
 * Convert a string to a valid JavaScript identifier
 */
export function toValidJsIdent(name: string): string {
	// Enhanced character mapping for better readability
	const charMap: Record<string, string> = {
		" ": "_",
		".": "_dot_",
		"$": "_dollar_",
		"%": "_percent_",
		"+": "_plus_",
		"-": "_minus_",
		"*": "_star_",
		"/": "_slash_",
		"=": "_eq_",
		"!": "_bang_",
		"?": "_question_",
		":": "_colon_",
		";": "_semicolon_",
		",": "_comma_",
		"<": "_lt_",
		">": "_gt_",
		"(": "_lparen_",
		")": "_rparen_",
		"[": "_lbracket_",
		"]": "_rbracket_",
		"{": "_lbrace_",
		"}": "_rbrace_",
		"#": "_hash_",
		"@": "_at_",
		"&": "_amp_",
		"|": "_pipe_",
		"^": "_caret_",
		"~": "_tilde_",
		"`": "_backtick_",
		"'": "_quote_",
		'"': "_dblquote_",
		"\\": "_backslash_",
	};

	return name.replace(/./g, (c) => {
		if (/[a-zA-Z0-9_]/.test(c)) {
			return c;
		}
		return charMap[c] || `_${c.charCodeAt(0).toString(16).padStart(2, "0")}_`;
	});
}
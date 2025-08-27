/**
 * Custom logging system for the language compiler.
 * Supports tag-based filtering and automatic indentation based on call stack depth.
 */

interface Writer {
	write(s: string): void;
	flush?(): void;
}

class SmartIndentContext {
	hadOutput = false;
	headerPrinted = false;

	constructor(
		public tag: string,
		public message: string,
		public indentLevel: number,
	) {}
}

// Console adapter to match our Writer interface
const consoleWriter: Writer = {
	write: (s: string) => {
		Deno.stdout.writeSync(new TextEncoder().encode(s));
	},
	flush: () => {
		// Deno stdout auto-flushes
	}
};

export class Logger {
	private output: Writer;
	private enabledTags: Set<string> | null = null; // null means all tags enabled
	private indentLevel = 0;
	private contextStack: SmartIndentContext[] = [];

	constructor(output: Writer = consoleWriter) {
		this.output = output;
	}

	enableTags(tags: Set<string>): void {
		this.enabledTags = tags;
	}

	enableAllTags(): void {
		this.enabledTags = null;
	}

	isTagEnabled(tag: string): boolean {
		if (this.enabledTags === null) {
			return true;
		}
		return this.enabledTags.has(tag);
	}

	log(tag: string, message: string): void {
		if (!this.isTagEnabled(tag)) {
			return;
		}

		// Print any pending headers first
		this.ensureHeadersPrinted();

		// Mark that output occurred in all active contexts
		for (const context of this.contextStack) {
			context.hadOutput = true;
		}

		const indent = "  ".repeat(this.indentLevel);
		this.output.write(`${indent}[${tag}] ${message}\n`);
		this.output.flush?.();
	}

	private ensureHeadersPrinted(): void {
		for (const context of this.contextStack) {
			if (!context.headerPrinted) {
				const indent = "  ".repeat(context.indentLevel);
				this.output.write(`${indent}[${context.tag}] begin: ${context.message}\n`);
				this.output.flush?.();
				context.headerPrinted = true;
			}
		}
	}

	/**
	 * Context manager that logs entry/exit with indentation.
	 * Returns a cleanup function to call when done.
	 */
	indent(tag: string, message: string): () => void {
		if (!this.isTagEnabled(tag)) {
			return () => {}; // no-op cleanup
		}

		// Create a new context but don't print header yet
		const context = new SmartIndentContext(tag, message, this.indentLevel);
		this.contextStack.push(context);
		this.indentLevel += 1;

		// Return cleanup function
		return () => {
			const contextIndex = this.contextStack.indexOf(context);
			if (contextIndex !== -1) {
				this.contextStack.splice(contextIndex, 1);
				this.indentLevel -= 1;

				// Only print footer if we had output and header was printed
				if (context.hadOutput && context.headerPrinted) {
					const indent = "  ".repeat(this.indentLevel);
					this.output.write(`${indent}[${tag}] done: ${message}\n`);
					this.output.flush?.();
				}
			}
		};
	}

	// Convenience methods for different message types
	debug(message: string): void { this.log("debug", message); }
	typecheck(message: string): void { this.log("typecheck", message); }
	macro(message: string): void { this.log("macro", message); }
	compile(message: string): void { this.log("compile", message); }
	codegen(message: string): void { this.log("codegen", message); }
	parse(message: string): void { this.log("parse", message); }
	registry(message: string): void { this.log("registry", message); }
	metadataDebug(message: string): void { this.log("metadata_debug", message); }
}

// Global logger instance that can be configured
export const defaultLogger = new Logger();

export function configureLoggerFromArgs(logTags?: string): void {
	/**
	 * Configure the global logger based on command line arguments.
	 * logTags: comma-separated string of tags to enable, or undefined to disable all logging
	 */
	if (logTags === undefined) {
		defaultLogger.enableTags(new Set()); // disable all logging by default
	} else {
		const tags = new Set(
			logTags.split(",")
				.map(tag => tag.trim())
				.filter(tag => tag.length > 0)
		);
		defaultLogger.enableTags(tags);
	}
}
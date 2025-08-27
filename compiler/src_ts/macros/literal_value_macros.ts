/**
 * Literal value macro providers - TypeScript equivalent of literal_value_macros.py
 * Handles string, int, and float literals in 67lang
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider, MacroCodeLinkingProvider } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { ErrorType } from "../utils/error_types.ts";

export class NumberMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	constructor(private numberType: typeof Int | typeof Float) {}

	preprocess(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		
		try {
			if (this.numberType === Int) {
				const parsed = parseInt(args.toString(), 10);
				if (isNaN(parsed) || !Number.isInteger(parsed)) {
					throw new Error("Not a valid integer");
				}
			} else {
				const parsed = parseFloat(args.toString());
				if (isNaN(parsed)) {
					throw new Error("Not a valid float");
				}
			}
		} catch {
			const errorType = this.numberType === Int ? ErrorType.INVALID_INT : ErrorType.INVALID_FLOAT;
			compiler.assert(
				false,
				ctx.node,
				`${args} must be a valid ${this.numberType === Int ? "int" : "float"} string.`,
				errorType,
			);
		}
	}

	typecheck(_ctx: MacroContext): string | null {
		// TODO: Import proper types once available
		return this.numberType === Int ? "INT" : "FLOAT";
	}

	emission(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		ctx.expressionOut.write(args.toString());
	}
}

export class StringMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider, MacroCodeLinkingProvider {
	
	constructor(private kind: "string" | "regex") {}

	preprocess(_ctx: MacroContext): void {
		// Allow multiline string content to start with whitespace (preserved indentation)
		// The Python version does nothing here, so we follow suit
	}

	typecheck(_ctx: MacroContext): string | null {
		// TODO: Import proper types once available
		return this.kind === "string" ? "STRING" : "REGEX";
	}

	emission(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		
		if (this.kind === "string") {
			// TODO: Implement proper string delim handling like Python version
			// For now, simple implementation
			ctx.expressionOut.write(`"${args.toString()}"`);
		} else {
			// regex
			ctx.expressionOut.write(`/${args.toString()}/`);
		}
	}

	codeLinking(_ctx: MacroContext): void {
		// TODO: Implement code linking if needed
	}
}

// Placeholder classes for type safety - will be replaced with proper types
class Int {
	static toString() { return "int"; }
}

class Float {
	static toString() { return "float"; }
}

/**
 * Register literal value macros with the given registries
 */
export function registerLiteralMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any,
	codeLinkingRegistry?: any
): void {
	// Number macros
	const intMacro = new NumberMacroProvider(Int);
	const floatMacro = new NumberMacroProvider(Float);
	
	// String macros  
	const stringMacro = new StringMacroProvider("string");
	const regexMacro = new StringMacroProvider("regex");

	// Register int macro
	emissionRegistry.addFn(intMacro, "int");
	typecheckRegistry.addFn(intMacro, "int"); 
	preprocessRegistry.addFn(intMacro, "int");

	// Register float macro
	emissionRegistry.addFn(floatMacro, "float");
	typecheckRegistry.addFn(floatMacro, "float");
	preprocessRegistry.addFn(floatMacro, "float");

	// Register string macro
	emissionRegistry.addFn(stringMacro, "string");
	typecheckRegistry.addFn(stringMacro, "string");
	preprocessRegistry.addFn(stringMacro, "string");
	if (codeLinkingRegistry) {
		codeLinkingRegistry.addFn(stringMacro, "string");
	}

	// Register regex macro
	emissionRegistry.addFn(regexMacro, "regex");
	typecheckRegistry.addFn(regexMacro, "regex");
	preprocessRegistry.addFn(regexMacro, "regex");
	if (codeLinkingRegistry) {
		codeLinkingRegistry.addFn(regexMacro, "regex");
	}
}
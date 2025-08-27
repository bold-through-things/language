/**
 * Simple example macro providers - TypeScript equivalent pattern
 * This demonstrates how macro providers would be implemented in TypeScript
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";

export class StringMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(ctx: MacroContext): void {
		// Basic validation of string literal syntax
		const content = ctx.node.content;
		if (!content.startsWith("string ")) {
			throw new Error(`Invalid string macro: ${content}`);
		}
	}

	typecheck(_ctx: MacroContext): string | null {
		// Return the type this macro produces
		return "string";
	}

	emission(ctx: MacroContext): void {
		// Generate JavaScript code for this string literal
		const content = ctx.node.content;
		const stringValue = content.substring("string ".length).trim();
		
		// Simple string literal emission - would need proper escaping in real implementation
		ctx.expressionOut.write(`${stringValue}`);
	}
}

export class NumberMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	constructor(private numberType: "int" | "float") {}

	preprocess(ctx: MacroContext): void {
		const content = ctx.node.content;
		const prefix = `${this.numberType} `;
		if (!content.startsWith(prefix)) {
			throw new Error(`Invalid ${this.numberType} macro: ${content}`);
		}
		
		const numberStr = content.substring(prefix.length).trim();
		const value = this.numberType === "int" ? parseInt(numberStr, 10) : parseFloat(numberStr);
		
		if (isNaN(value)) {
			throw new Error(`${numberStr} must be a valid ${this.numberType} string.`);
		}
	}

	typecheck(_ctx: MacroContext): string | null {
		return this.numberType === "int" ? "number" : "number"; // Both map to JS number
	}

	emission(ctx: MacroContext): void {
		const content = ctx.node.content;
		const prefix = `${this.numberType} `;
		const numberStr = content.substring(prefix.length).trim();
		
		// Emit the number literal directly
		ctx.expressionOut.write(numberStr);
	}
}

// Example of how macros would be registered
export function registerLiteralMacros(emissionRegistry: any, typecheckRegistry: any, preprocessRegistry: any): void {
	const stringMacro = new StringMacroProvider();
	const intMacro = new NumberMacroProvider("int");
	const floatMacro = new NumberMacroProvider("float");

	// Register string macro
	emissionRegistry.addFn(stringMacro.emission.bind(stringMacro), "string");
	typecheckRegistry.addFn(stringMacro.typecheck.bind(stringMacro), "string");
	preprocessRegistry.addFn(stringMacro.preprocess.bind(stringMacro), "string");

	// Register number macros
	emissionRegistry.addFn(intMacro.emission.bind(intMacro), "int");
	typecheckRegistry.addFn(intMacro.typecheck.bind(intMacro), "int");
	preprocessRegistry.addFn(intMacro.preprocess.bind(intMacro), "int");

	emissionRegistry.addFn(floatMacro.emission.bind(floatMacro), "float");
	typecheckRegistry.addFn(floatMacro.typecheck.bind(floatMacro), "float");
	preprocessRegistry.addFn(floatMacro.preprocess.bind(floatMacro), "float");
}
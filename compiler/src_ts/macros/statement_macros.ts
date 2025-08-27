/**
 * Return macro and other statement macros - TypeScript equivalents
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";

export class ReturnMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// Return is always valid syntactically
	}

	typecheck(_ctx: MacroContext): string | null {
		return "never"; // Returns never continue execution
	}

	emission(ctx: MacroContext): void {
		// Emit return statement
		if (ctx.node.children.length > 0) {
			// Has return value - TODO: process expression
			ctx.statementOut.write("return /* TODO: process return value */;");
		} else {
			// No return value
			ctx.statementOut.write("return;");
		}
	}
}

export class ScopeMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// Scope blocks are always valid
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Emit scope block
		ctx.statementOut.write("{");
		ctx.statementOut.indent();
		
		// TODO: Process children
		// for (const child of ctx.node.children) {
		// 	// Process child statements
		// }
		
		ctx.statementOut.dedent();
		ctx.statementOut.write("}");
	}
}

/**
 * Register statement macros with the given registries
 */
export function registerStatementMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const returnMacro = new ReturnMacroProvider();
	const scopeMacro = new ScopeMacroProvider();

	// Register return macro
	emissionRegistry.addFn(returnMacro, "return");
	typecheckRegistry.addFn(returnMacro, "return");
	preprocessRegistry.addFn(returnMacro, "return");

	// Register scope macro
	emissionRegistry.addFn(scopeMacro, "scope");
	typecheckRegistry.addFn(scopeMacro, "scope");
	preprocessRegistry.addFn(scopeMacro, "scope");
}
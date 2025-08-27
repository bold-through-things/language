/**
 * Utility macro providers - TypeScript equivalent of utility_macros.py
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";

export class NoopMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// No-op: nothing to validate
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Emit nothing - this is a no-op
		ctx.statementOut.write("/* noop */");
	}
}

/**
 * Register utility macros with the given registries
 */
export function registerUtilityMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const noopMacro = new NoopMacroProvider();

	// Register noop macro
	emissionRegistry.addFn(noopMacro, "noop");
	typecheckRegistry.addFn(noopMacro, "noop");
	preprocessRegistry.addFn(noopMacro, "noop");
}
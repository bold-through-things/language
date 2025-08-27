/**
 * Solution macro provider - TypeScript equivalent of solution_macro.py
 * The main solution container for 67lang programs
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";

export class SolutionMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// Solution is the root container, always valid
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Emit JavaScript for the solution (main program)
		ctx.statementOut.write("// 67lang solution\n");
		
		// Process all children - TODO: implement full pipeline processing
		// for (const child of ctx.node.children) {
		// 	// Process child nodes through the pipeline
		// 	// This requires the full pipeline system to be implemented
		// }
	}
}

/**
 * Register solution macro with the given registries
 */
export function registerSolutionMacro(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const solutionMacro = new SolutionMacroProvider();

	// Register solution macro
	emissionRegistry.addFn(solutionMacro, "67lang:solution");
	typecheckRegistry.addFn(solutionMacro, "67lang:solution");
	preprocessRegistry.addFn(solutionMacro, "67lang:solution");
}
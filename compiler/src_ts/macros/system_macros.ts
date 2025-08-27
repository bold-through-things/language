/**
 * File and system macro providers - TypeScript equivalent of various system macros
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";

export class FileMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// File macro is always valid
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Process all children of the file
		for (const child of ctx.node.children) {
			const childCtx: MacroContext = {
				...ctx,
				node: child,
			};
			// TODO: This should be handled by the pipeline recursively
			// For now, just emit a comment
			ctx.statementOut.write(`// file child: ${child.content}\n`);
		}
	}
}

/**
 * Register file/system macros with the given registries
 */
export function registerSystemMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const fileMacro = new FileMacroProvider();

	// Register file macro
	emissionRegistry.addFn(fileMacro, "67lang:file");
	typecheckRegistry.addFn(fileMacro, "67lang:file");
	preprocessRegistry.addFn(fileMacro, "67lang:file");
}
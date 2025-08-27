/**
 * Comment macro providers - TypeScript equivalent of comment_macros.py
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";

export class CommentMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// Comments are always valid
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		
		// Emit as JavaScript comment
		ctx.statementOut.write(`// ${args.toString()}`);
	}
}

// List of comment macro names
export const COMMENT_MACROS = ["comment", "note", "todo", "fixme", "hack"];

/**
 * Register comment macros with the given registries
 */
export function registerCommentMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const commentMacro = new CommentMacroProvider();

	// Register all comment macro variants
	for (const macroName of COMMENT_MACROS) {
		emissionRegistry.addFn(commentMacro, macroName);
		typecheckRegistry.addFn(commentMacro, macroName);
		preprocessRegistry.addFn(commentMacro, macroName);
	}
}
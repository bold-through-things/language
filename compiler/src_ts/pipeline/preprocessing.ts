/**
 * Preprocessing step - TypeScript equivalent of pipeline/steps/preprocessing.py
 */

import { MacroProcessingStep } from "./base.ts";
import { MacroContext, MacroRegistry } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { defaultLogger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";

export class PreprocessingStep extends MacroProcessingStep {
	
	constructor(macros: MacroRegistry) {
		super(macros);
	}

	processNode(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const macro = compiler.getMacro(ctx.node);
		const allMacros = this.macros.all();
		
		defaultLogger.macro(`preprocessing macro: ${macro}`);
		
		// Look up macro provider
		const macroProvider = allMacros.get(macro.toString());
		if (!macroProvider) {
			compiler.compileError(
				ctx.node,
				`unknown macro: ${macro}`,
				ErrorType.INVALID_MACRO
			);
			return;
		}
		
		// Call the macro's preprocess method if it exists
		if (typeof macroProvider === 'object' && 'preprocess' in macroProvider) {
			(macroProvider as { preprocess: (ctx: MacroContext) => void }).preprocess(ctx);
		}
		
		// Process children
		for (const child of ctx.node.children) {
			const childCtx: MacroContext = {
				...ctx,
				node: child,
			};
			this.processNode(childCtx);
		}
	}
}
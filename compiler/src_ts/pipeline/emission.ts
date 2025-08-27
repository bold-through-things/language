/**
 * JavaScript emission step - TypeScript equivalent of pipeline/steps/emission.py
 */

import { MacroProcessingStep } from "./base.ts";
import { MacroContext, MacroRegistry } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { defaultLogger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";

export class JavaScriptEmissionStep extends MacroProcessingStep {
	
	constructor(macros: MacroRegistry) {
		super(macros);
	}

	processNode(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const macro = compiler.getMacro(ctx.node);
		const allMacros = this.macros.all();
		
		defaultLogger.codegen(`emitting JavaScript for macro: ${macro}`);
		
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
		
		// Call the macro's emission method
		if (typeof macroProvider === 'object' && 'emission' in macroProvider) {
			(macroProvider as { emission: (ctx: MacroContext) => void }).emission(ctx);
		} else if (typeof macroProvider === 'function') {
			macroProvider(ctx);
		}
	}
}
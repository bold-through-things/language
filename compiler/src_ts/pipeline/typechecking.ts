/**
 * Type checking step - TypeScript equivalent of pipeline/steps/typechecking.py
 */

import { MacroProcessingStep } from "./base.ts";
import { MacroContext, MacroRegistry } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { defaultLogger } from "../utils/logger.ts";
import { ErrorType } from "../utils/error_types.ts";

export class TypeCheckingStep extends MacroProcessingStep {
	
	constructor(macros: MacroRegistry) {
		super(macros);
	}

	processNode(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const macro = compiler.getMacro(ctx.node);
		const allMacros = this.macros.all();
		
		defaultLogger.typecheck(`typechecking macro: ${macro}`);
		
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
		
		// Call the macro's typecheck method if it exists
		if (typeof macroProvider === 'object' && 'typecheck' in macroProvider) {
			const resultType = (macroProvider as { typecheck: (ctx: MacroContext) => string | null }).typecheck(ctx);
			// TODO: Store result type as metadata
			defaultLogger.typecheck(`macro ${macro} has type: ${resultType}`);
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
/**
 * Pipeline step base classes - TypeScript equivalent of pipeline/steps/base.py
 */

import { MacroContext, MacroRegistry } from "../core/macro_registry.ts";

export abstract class MacroProcessingStep {
	protected macros: MacroRegistry;

	constructor(macros?: MacroRegistry) {
		this.macros = macros || new MacroRegistry();
	}

	abstract processNode(ctx: MacroContext): void;
}
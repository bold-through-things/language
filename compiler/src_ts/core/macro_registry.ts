/**
 * Macro registry system - TypeScript equivalent of macro_registry.py
 */

import { Node } from "./node.ts";
import { IndentedStringIO } from "../utils/strutil.ts";
import { defaultLogger } from "../utils/logger.ts";

export interface MacroContext {
	statementOut: IndentedStringIO;
	expressionOut: IndentedStringIO;
	node: Node;
	compiler: unknown; // TODO: Macrocosm type
	currentStep?: unknown; // TODO: MacroProcessingStep type
}

export interface MacroPreprocessProvider {
	preprocess(ctx: MacroContext): void;
}

export interface MacroTypecheckProvider {
	typecheck(ctx: MacroContext): string | null;
}

export interface MacroEmissionProvider {
	emission(ctx: MacroContext): void;
}

export interface MacroCodeLinkingProvider {
	codeLinking(ctx: MacroContext): void;
}

export type MacroProvider = 
	| MacroPreprocessProvider 
	| MacroTypecheckProvider 
	| MacroEmissionProvider
	| MacroCodeLinkingProvider;

export interface Macro {
	(ctx: MacroContext): string;
}

export class MacroRegistry {
	private registry = new Map<string, Macro>();

	addFn(macro: Macro | null, ...names: string[]): void {
		if (macro === null) {
			return;
		}
		for (const name of names) {
			this.registry.set(name, macro);
		}
	}

	get(name: string): Macro {
		const macro = this.registry.get(name);
		if (macro === undefined) {
			defaultLogger.macro(`ERROR: unknown macro '${name}'`);
			throw new Error(`Unknown macro: ${name}`);
		}
		return macro;
	}

	all(): Map<string, Macro> {
		return new Map(this.registry); // defensive copy
	}
}
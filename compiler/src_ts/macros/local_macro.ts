/**
 * Local variable macro provider - TypeScript equivalent of local_macro.py
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { ErrorType } from "../utils/error_types.ts";

export class LocalMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		
		// Validate local variable syntax
		if (!args.toString().trim()) {
			compiler.assert(false, ctx.node, "local must have a variable name", ErrorType.MISSING_CHILD);
		}
	}

	typecheck(_ctx: MacroContext): string | null {
		// TODO: Determine type from value or annotation
		return "any"; // Placeholder
	}

	emission(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		const args = compiler.getArgs(ctx.node);
		const varName = args.toString().trim();
		
		// Emit variable declaration
		if (ctx.node.children.length > 0) {
			// Has initial value
			// TODO: Process value expression through pipeline
			ctx.statementOut.write(`let ${varName} = /* TODO: process initial value */;`);
		} else {
			// No initial value
			ctx.statementOut.write(`let ${varName};`);
		}
	}
}

/**
 * Register local variable macro with the given registries
 */
export function registerLocalMacro(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const localMacro = new LocalMacroProvider();

	// Register local macro
	emissionRegistry.addFn(localMacro, "local");
	typecheckRegistry.addFn(localMacro, "local");
	preprocessRegistry.addFn(localMacro, "local");
}
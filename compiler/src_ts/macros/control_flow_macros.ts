/**
 * Control flow macro providers - TypeScript equivalent of if_macro.py, while_macro.py, etc.
 */

import { MacroContext, MacroEmissionProvider, MacroTypecheckProvider, MacroPreprocessProvider } from "../core/macro_registry.ts";
import { Macrocosm } from "../core/macrocosm.ts";
import { ErrorType } from "../utils/error_types.ts";

export class IfMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		
		// Validate that if has at least one child (the condition)
		if (ctx.node.children.length === 0) {
			compiler.assert(false, ctx.node, "if must have a condition", ErrorType.MISSING_CHILD);
		}
		
		// TODO: Validate that 'then' follows as next sibling
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Process condition - for now, just emit basic if structure
		// TODO: This needs proper pipeline integration to process child expressions
		
		const args: string[] = [];
		for (const child of ctx.node.children) {
			if (child.content.startsWith("then")) {
				continue; // Skip 'then' - handled separately
			}
			// TODO: Process child through expression pipeline
			args.push("true"); // Placeholder
		}
		
		const condition = args.length > 0 ? args[args.length - 1] : "true";
		ctx.statementOut.write(`if (${condition})`);
	}
}

export class WhileMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(ctx: MacroContext): void {
		const compiler = ctx.compiler as Macrocosm;
		
		if (ctx.node.children.length === 0) {
			compiler.assert(false, ctx.node, "while must have a condition", ErrorType.MISSING_CHILD);
		}
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Similar to if - needs proper pipeline integration
		const condition = "true"; // Placeholder
		ctx.statementOut.write(`while (${condition})`);
	}
}

export class ThenMacroProvider implements MacroPreprocessProvider, MacroTypecheckProvider, MacroEmissionProvider {
	
	preprocess(_ctx: MacroContext): void {
		// Then blocks are always valid
	}

	typecheck(_ctx: MacroContext): string | null {
		return "void";
	}

	emission(ctx: MacroContext): void {
		// Emit then block
		ctx.statementOut.write(" {");
		ctx.statementOut.indent();
		
		// TODO: Process children through pipeline
		// for (const child of ctx.node.children) {
		// 	// Process child statements
		// 	ctx.statementOut.write("// TODO: process child statement");
		// }
		
		ctx.statementOut.dedent();
		ctx.statementOut.write("}");
	}
}

/**
 * Register control flow macros with the given registries
 */
export function registerControlFlowMacros(
	emissionRegistry: any, 
	typecheckRegistry: any, 
	preprocessRegistry: any
): void {
	const ifMacro = new IfMacroProvider();
	const whileMacro = new WhileMacroProvider();
	const thenMacro = new ThenMacroProvider();

	// Register if macro
	emissionRegistry.addFn(ifMacro, "if");
	typecheckRegistry.addFn(ifMacro, "if");
	preprocessRegistry.addFn(ifMacro, "if");

	// Register while macro
	emissionRegistry.addFn(whileMacro, "while");
	typecheckRegistry.addFn(whileMacro, "while");
	preprocessRegistry.addFn(whileMacro, "while");

	// Register then macro
	emissionRegistry.addFn(thenMacro, "then");
	typecheckRegistry.addFn(thenMacro, "then");
	preprocessRegistry.addFn(thenMacro, "then");
}
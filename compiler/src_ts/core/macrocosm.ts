/**
 * Macrocosm - Central compilation orchestrator for 67lang
 * Manages macro registries and coordinates the compilation pipeline
 */

import { Node, Position, Macro, Args } from "./node.ts";
import { MacroRegistry } from "./macro_registry.ts";
import { defaultLogger } from "../utils/logger.ts";
import { MacroAssertFailed } from "./exceptions.ts";
import { ErrorType } from "../utils/error_types.ts";
import { cut } from "../utils/strutil.ts";
import { toValidJsIdent } from "../utils/utils.ts";

export interface CompileError {
	[key: string]: unknown;
}

export class Macrocosm {
	public nodes: Node[] = [];
	public incrementalId = 0;
	public compileErrors: CompileError[] = [];
	public rootNode: Node | null = null;

	public readonly registries: {
		emission: MacroRegistry;
		typecheck: MacroRegistry;
		codeLinking: MacroRegistry;
		preprocess: MacroRegistry;
		typeRegistration: MacroRegistry;
		typeDetailRegistration: MacroRegistry;
	};

	constructor(
		emissionRegistry: MacroRegistry,
		typecheckRegistry: MacroRegistry,
		codeLinkingRegistry: MacroRegistry,
		preprocessRegistry: MacroRegistry,
		typeRegistrationRegistry: MacroRegistry,
		typeDetailRegistrationRegistry: MacroRegistry,
	) {
		this.registries = {
			emission: emissionRegistry,
			typecheck: typecheckRegistry,
			codeLinking: codeLinkingRegistry,
			preprocess: preprocessRegistry,
			typeRegistration: typeRegistrationRegistry,
			typeDetailRegistration: typeDetailRegistrationRegistry,
		};

		// TODO: Initialize the processing pipeline
		// this.processingSteps = [
		//     new CodeBlockLinkingStep(codeLinkingRegistry),
		//     new PreprocessingStep(preprocessRegistry),
		//     new TypeRegistrationStep(typeRegistrationRegistry),
		//     new TypeDetailRegistrationStep(typeDetailRegistrationRegistry),
		//     new TypeCheckingStep(typecheckRegistry),
		//     new JavaScriptEmissionStep(emissionRegistry),
		//     new MustCompileErrorVerificationStep()
		// ];
	}

	public getNewIdent(name?: string): string {
		const ident = `_${this.incrementalId.toString(16)}${name ? `_${toValidJsIdent(name)}` : ""}`;
		this.incrementalId++;
		return ident;
	}

	public getMetadata<T>(node: Node, metadataType: new (...args: unknown[]) => T): T {
		defaultLogger.log("metadata", `get metadata ${metadataType.name} for ${node.content}`);

		// Use dynamic property access to retrieve metadata
		const attrName = `_metadata_${metadataType.name}`;

		// Auto-compute Macro and Args if not present
		if ((metadataType.name === "Macro" || metadataType.name === "Args") && !(attrName in node)) {
			this.ensureMacroArgsComputed(node);
		}

		if (attrName in node) {
			const value = (node as unknown as Record<string, T>)[attrName];
			if (value !== undefined) {
				return value;
			}
		}

		// TODO: Check for default factories from TypeMap system
		throw new Error(`No metadata of type ${metadataType.name} for node`);
	}

	public maybeMetadata<T>(node: Node, metadataType: new (...args: unknown[]) => T): T | null {
		try {
			return this.getMetadata(node, metadataType);
		} catch {
			return null;
		}
	}

	public setMetadata<T>(node: Node, metadataType: new (...args: unknown[]) => T, value: T): void {
		const attrName = `_metadata_${metadataType.name}`;
		(node as unknown as Record<string, T>)[attrName] = value;
		defaultLogger.log("metadata", `set metadata ${metadataType.name} ${String(value)} for ${node.content}`);
	}

	public invalidateMetadata(node: Node): void {
		// Remove all metadata attributes from the node
		const keys = Object.keys(node as unknown as Record<string, unknown>);
		for (const key of keys) {
			if (key.startsWith("_metadata_")) {
				delete (node as unknown as Record<string, unknown>)[key];
			}
		}

		// Recursively invalidate children
		for (const child of node.children) {
			this.invalidateMetadata(child);
		}
	}

	private ensureMacroArgsComputed(node: Node): void {
		const [macro, args] = cut(node.content, " ");
		this.setMetadata(node, Macro as unknown as new (...args: unknown[]) => unknown, new Macro(macro));
		this.setMetadata(node, Args as unknown as new (...args: unknown[]) => unknown, new Args(args));
	}

	public register(node: Node): void {
		this.nodes.push(node);
	}

	public assert(mustBeTrue: boolean, node: Node, message: string, errorType?: string, extraFields?: Record<string, unknown>): void {
		if (!mustBeTrue) {
			const finalErrorType = errorType || ErrorType.ASSERTION_FAILED;
			this.compileError(node, `failed to assert: ${message}`, finalErrorType, extraFields);
			throw new MacroAssertFailed(message);
		}
	}

	public compileError(node: Node, error: string, errorType: string, extraFields?: Record<string, unknown>): void {
		const pos = node.pos || new Position(0, 0);
		const entry: CompileError = {
			message: error,
			error_type: errorType,
			line: pos.line,
			column: pos.column,
			node_content: node.content,
			...extraFields,
		};
		this.compileErrors.push(entry);
	}

	public compile(): string {
		// TODO: Implement full compilation pipeline
		// This is a placeholder that needs to be implemented with the pipeline steps
		defaultLogger.compile("compilation started");

		// For now, return empty JS output
		return "// TODO: Implement compilation pipeline\n";
	}

	public nextIncrementalId(): number {
		return ++this.incrementalId;
	}

	public addCompileError(error: CompileError): void {
		this.compileErrors.push(error);
	}
}

/**
 * Create a new Macrocosm with all default macro providers registered
 */
export function createMacrocosm(): Macrocosm {
	// Create all registries
	const emissionRegistry = new MacroRegistry();
	const typecheckRegistry = new MacroRegistry();
	const codeLinkingRegistry = new MacroRegistry();
	const preprocessRegistry = new MacroRegistry();
	const typeRegistrationRegistry = new MacroRegistry();
	const typeDetailRegistrationRegistry = new MacroRegistry();

	// TODO: Register all macro providers
	// This needs to be implemented once all macro providers are migrated

	return new Macrocosm(
		emissionRegistry,
		typecheckRegistry,
		codeLinkingRegistry,
		preprocessRegistry,
		typeRegistrationRegistry,
		typeDetailRegistrationRegistry,
	);
}
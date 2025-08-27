/**
 * Macrocosm - Central compilation orchestrator for 67lang
 * Manages macro registries and coordinates the compilation pipeline
 */

import { Node, Position, Macro, Args } from "./node.ts";
import { MacroRegistry, MacroContext } from "./macro_registry.ts";
import { defaultLogger } from "../utils/logger.ts";
import { MacroAssertFailed } from "./exceptions.ts";
import { ErrorType } from "../utils/error_types.ts";
import { cut } from "../utils/strutil.ts";
import { toValidJsIdent } from "../utils/utils.ts";
import { registerLiteralMacros } from "../macros/literal_value_macros.ts";
import { registerUtilityMacros } from "../macros/utility_macros.ts";
import { registerCommentMacros } from "../macros/comment_macros.ts";
import { registerSolutionMacro } from "../macros/solution_macro.ts";
import { registerControlFlowMacros } from "../macros/control_flow_macros.ts";
import { registerLocalMacro } from "../macros/local_macro.ts";
import { registerSystemMacros } from "../macros/system_macros.ts";
import { PreprocessingStep } from "../pipeline/preprocessing.ts";
import { TypeCheckingStep } from "../pipeline/typechecking.ts";
import { JavaScriptEmissionStep } from "../pipeline/emission.ts";
import { IndentedStringIO } from "../utils/strutil.ts";

export interface CompileError {
	[key: string]: unknown;
}

export class Macrocosm {
	public nodes: Node[] = [];
	public incrementalId = 0;
	public compileErrors: CompileError[] = [];
	public rootNode: Node | null = null;
	private jsOutput = "";

	public readonly registries: {
		emission: MacroRegistry;
		typecheck: MacroRegistry;
		codeLinking: MacroRegistry;
		preprocess: MacroRegistry;
		typeRegistration: MacroRegistry;
		typeDetailRegistration: MacroRegistry;
	};

	private readonly processingSteps: Array<{ new (registry: MacroRegistry): { processNode(ctx: MacroContext): void } }>;

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

		// Initialize the processing pipeline
		this.processingSteps = [
			// TODO: CodeBlockLinkingStep,
			PreprocessingStep,
			// TODO: TypeRegistrationStep,
			// TODO: TypeDetailRegistrationStep,
			TypeCheckingStep,
			JavaScriptEmissionStep,
			// TODO: MustCompileErrorVerificationStep
		];
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

	// Type-safe overloads for Macro and Args
	public getMacro(node: Node): Macro {
		return this.getMetadata(node, Macro as unknown as new (...args: unknown[]) => Macro);
	}

	public getArgs(node: Node): Args {
		return this.getMetadata(node, Args as unknown as new (...args: unknown[]) => Args);
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
		// Discover macros first
		const discoverCleanup = defaultLogger.indent("compile", "discovering macros");
		try {
			for (const node of this.nodes) {
				this.discoverMacros(node);
			}
		} finally {
			discoverCleanup();
		}

		// Create solution node
		const solutionNode = this.makeNode("67lang:solution", new Position(0, 0), this.nodes || []);
		this.rootNode = solutionNode;

		// Execute the processing pipeline
		for (const StepClass of this.processingSteps) {
			const stepName = StepClass.name;
			const stepCleanup = defaultLogger.indent("compile", `processing step: ${stepName}`);
			
			try {
				// Create appropriate registry for this step
				let registry: MacroRegistry;
				if (stepName.includes("Preprocessing")) {
					registry = this.registries.preprocess;
				} else if (stepName.includes("TypeChecking")) {
					registry = this.registries.typecheck;
				} else if (stepName.includes("Emission")) {
					registry = this.registries.emission;
				} else {
					registry = new MacroRegistry(); // fallback
				}

				const step = new StepClass(registry);
				
				// Create context for processing
				const statementOut = new IndentedStringIO();
				const expressionOut = new IndentedStringIO();
				
				const ctx: MacroContext = {
					statementOut,
					expressionOut,
					node: solutionNode,
					compiler: this,
					currentStep: step,
				};
				
				step.processNode(ctx);
				
				// For emission step, capture the output
				if (stepName.includes("Emission")) {
					this.jsOutput = statementOut.getvalue();
				}
			} finally {
				stepCleanup();
			}
		}

		if (this.compileErrors.length > 0) {
			return ""; // Return empty string if compilation failed
		}

		return this.jsOutput;
	}

	private discoverMacros(node: Node): void {
		this.ensureMacroArgsComputed(node);
		for (const child of node.children) {
			this.discoverMacros(child);
		}
	}

	public makeNode(content: string, pos: Position, children: Node[] | null): Node {
		const node = new Node(content, pos, children);
		this.discoverMacros(node);
		return node;
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

	// Register literal value macros
	registerLiteralMacros(emissionRegistry, typecheckRegistry, preprocessRegistry, codeLinkingRegistry);
	
	// Register utility macros
	registerUtilityMacros(emissionRegistry, typecheckRegistry, preprocessRegistry);
	
	// Register comment macros
	registerCommentMacros(emissionRegistry, typecheckRegistry, preprocessRegistry);
	
	// Register solution macro
	registerSolutionMacro(emissionRegistry, typecheckRegistry, preprocessRegistry);
	
	// Register control flow macros
	registerControlFlowMacros(emissionRegistry, typecheckRegistry, preprocessRegistry);
	
	// Register local variable macro
	registerLocalMacro(emissionRegistry, typecheckRegistry, preprocessRegistry);
	
	// Register system macros (file, etc.)
	registerSystemMacros(emissionRegistry, typecheckRegistry, preprocessRegistry);

	// TODO: Register all other macro providers
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
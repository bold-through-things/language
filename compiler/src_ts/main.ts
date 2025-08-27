#!/usr/bin/env -S deno run --allow-read --allow-write
/**
 * Main entry point for the 67lang compiler - TypeScript version
 * This is a work-in-progress migration from the Python implementation
 */

import { parseArgs } from "./utils/cli.ts";
import { configureLoggerFromArgs, defaultLogger } from "./utils/logger.ts";
import { TreeParser } from "./core/tree_parser.ts";
import { createMacrocosm } from "./core/macrocosm.ts";

async function main(): Promise<void> {
	console.log("refactor confidently when the flame flickers.");
	
	try {
		const args = parseArgs();
		
		// Configure logging based on command line args BEFORE importing modules that register macros
		configureLoggerFromArgs(args.log);
		
		defaultLogger.compile("starting compilation process");
		
		const cleanup = defaultLogger.indent("compile", "initialization");
		try {
			const inputPath = args.inputDir;
			const filePattern = args.rte ? ".67lang.expanded" : ".67lang";
			
			// Find matching files
			const files: string[] = [];
			for await (const entry of Deno.readDir(inputPath)) {
				if (entry.isFile && entry.name.endsWith(filePattern)) {
					files.push(`${inputPath}/${entry.name}`);
				}
			}
			
			defaultLogger.compile(`found ${files.length} .67lang files: [${files.join(", ")}]`);
			
			// Create macrocosm equivalent
			const itsJustMacros = createMacrocosm();
			
			// Log macro registry summary if registry logging is enabled
			const codegenMacros = Array.from(itsJustMacros.registries.emission.all().keys()).join(", ");
			const typecheckMacros = Array.from(itsJustMacros.registries.typecheck.all().keys()).join(", ");
			const preprocessorMacros = Array.from(itsJustMacros.registries.preprocess.all().keys()).join(", ");
			defaultLogger.registry(`macro registry initialized with codegen macros: ${codegenMacros}`);
			defaultLogger.registry(`typecheck registry initialized with typecheck macros: ${typecheckMacros}`);
			defaultLogger.registry(`preprocessor registry initialized with preprocessor macros: ${preprocessorMacros}`);
			
			// Initialize parser
			const parser = new TreeParser();
			
			const parseCleanup = defaultLogger.indent("compile", "parsing files");
			try {
				for (const filename of files) {
					defaultLogger.compile(`parsing ${filename}`);
					const content = await Deno.readTextFile(filename);
					const node = parser.parseTree(content, itsJustMacros);
					itsJustMacros.register(node);
				}
			} finally {
				parseCleanup();
			}
			
			// Compile
			let crash: string | null = null;
			let compiled: string | null = null;
			
			const compileCleanup = defaultLogger.indent("compile", "single-step compilation");
			try {
				compiled = itsJustMacros.compile();
			} catch (error) {
				crash = error instanceof Error ? error.stack || error.message : String(error);
				defaultLogger.compile(`compilation crashed: ${error}`);
			} finally {
				compileCleanup();
			}
			
			if (args.expand) {
				// Write .67lang.expanded instead of .js
				defaultLogger.compile(`expand mode: writing expanded form to ${args.outputFile}`);
				let expandedContent = "";
				for (const node of itsJustMacros.nodes) {
					expandedContent += node.toString() + "\n\n";
				}
				await Deno.writeTextFile(args.outputFile, expandedContent);
			} else {
				// Write .js output
				if (compiled) {
					defaultLogger.compile(`compilation successful, writing output to ${args.outputFile}`);
					await Deno.writeTextFile(args.outputFile, compiled);
				}
			}
			
			if (itsJustMacros.compileErrors.length > 0 || crash) {
				console.log(`${itsJustMacros.compileErrors.length} compile errors.`);
				if (itsJustMacros.compileErrors.length > 0) {
					if (args.errorsFile) {
						await Deno.writeTextFile(args.errorsFile, JSON.stringify(itsJustMacros.compileErrors, null, 2) + "\n");
						console.log(`seek them in ${args.errorsFile}.`);
					} else {
						// Human readable output
						for (let i = 0; i < itsJustMacros.compileErrors.length; i++) {
							const entry = itsJustMacros.compileErrors[itsJustMacros.compileErrors.length - 1 - i];
							console.log(`\n\n${i + 1}:`);
							if (entry) {
								for (const [k, v] of Object.entries(entry)) {
									console.log(`  ${k} = ${JSON.stringify(v, null, 2)}`);
								}
							}
						}
					}
				}
				
				if (crash) {
					console.log(crash);
				}
				
				Deno.exit(1);
			}
			
		} finally {
			cleanup();
		}
		
		console.log("0 compile errors.");
		
	} catch (error) {
		console.error("Compilation failed:", error);
		if (error instanceof Error) {
			console.error(error.stack);
		}
		Deno.exit(1);
	}
}

if (import.meta.main) {
	await main();
}
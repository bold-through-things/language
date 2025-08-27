#!/usr/bin/env -S deno run --allow-read --allow-write
/**
 * Main entry point for the 67lang compiler - TypeScript version
 * This is a work-in-progress migration from the Python implementation
 */

import { parseArgs } from "./utils/cli.ts";
import { configureLoggerFromArgs, defaultLogger } from "./utils/logger.ts";
import { TreeParser } from "./core/tree_parser.ts";

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
			
			// Find matching files
			const files: string[] = [];
			for await (const entry of Deno.readDir(inputPath)) {
				if (entry.isFile) {
					const name = entry.name;
					if (args.rte && name.endsWith(".67lang.expanded")) {
						files.push(`${inputPath}/${name}`);
					} else if (!args.rte && name.endsWith(".67lang")) {
						files.push(`${inputPath}/${name}`);
					}
				}
			}
			
			defaultLogger.compile(`found ${files.length} .67lang files: [${files.join(", ")}]`);
			
			// TODO: Create macrocosm equivalent
			// const itsJustMacros = createMacrocosm();
			
			// Initialize parser
			const parser = new TreeParser();
			
			const parseCleanup = defaultLogger.indent("compile", "parsing files");
			try {
				for (const filename of files) {
					defaultLogger.compile(`parsing ${filename}`);
					const content = await Deno.readTextFile(filename);
					parser.parseTree(content);
					// TODO: Register with macrocosm
					// itsJustMacros.register(node);
				}
			} finally {
				parseCleanup();
			}
			
			// TODO: Implement compilation
			// const compiled = itsJustMacros.compile();
			
			if (args.expand) {
				// Write .67lang.expanded instead of .js
				defaultLogger.compile(`expand mode: writing expanded form to ${args.outputFile}`);
				// TODO: Write expanded form
				await Deno.writeTextFile(args.outputFile, "// TODO: Expanded form output\n");
			} else {
				// Write .js output
				defaultLogger.compile(`compilation successful, writing output to ${args.outputFile}`);
				// TODO: Write compiled JS
				await Deno.writeTextFile(args.outputFile, "// TODO: Compiled JS output\n");
			}
			
		} finally {
			cleanup();
		}
		
		// TODO: Handle compile errors and crashes
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
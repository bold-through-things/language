/**
 * Simple command line argument parser for the compiler main entry point
 */

export interface CompilerArgs {
	inputDir: string;
	outputFile: string;
	errorsFile?: string;
	log?: string;
	expand: boolean;
	rte: boolean;
}

export function parseArgs(): CompilerArgs {
	const args = Deno.args;
	
	const result: Partial<CompilerArgs> & { expand: boolean; rte: boolean } = {
		expand: false,
		rte: false,
	};

	let i = 0;
	while (i < args.length) {
		const arg = args[i]!;
		
		if (arg === '--errors-file') {
			i++;
			if (i >= args.length) {
				throw new Error("--errors-file requires a value");
			}
			result.errorsFile = args[i]!;
		} else if (arg === '--log') {
			i++;
			if (i >= args.length) {
				throw new Error("--log requires a value");
			}
			result.log = args[i]!;
		} else if (arg === '--expand') {
			result.expand = true;
		} else if (arg === '--rte') {
			result.rte = true;
		} else if (arg.startsWith('--')) {
			throw new Error(`Unknown option: ${arg}`);
		} else {
			// Positional arguments
			if (!result.inputDir) {
				result.inputDir = arg;
			} else if (!result.outputFile) {
				result.outputFile = arg;
			} else {
				throw new Error(`Unexpected argument: ${arg}`);
			}
		}
		i++;
	}

	if (!result.inputDir || !result.outputFile) {
		console.error("Usage: main.ts <input_dir> <output_file> [options]");
		console.error("");
		console.error("Options:");
		console.error("  --errors-file <file>  Output compilation errors and warnings as JSON");
		console.error("  --log <tags>          Comma-separated list of log tags to enable");
		console.error("  --expand              Compile in two-step mode: .67lang → .67lang.expanded");
		console.error("  --rte                 Compile in two-step mode: .67lang.expanded → .js");
		Deno.exit(1);
	}

	return result as CompilerArgs;
}
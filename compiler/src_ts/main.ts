#!/usr/bin/env -S deno run --allow-read --allow-write

// main.ts — entrypoint (ported from main.cr)

// expects: configure_logger_from_args(String | null) and default_logger
import {
  configureLoggerFromArgs,
  default_logger,
} from "./utils/logger.ts";

// expects: class TreeParser with parseTree(src: string, macrocosm: any): Node
import { TreeParser } from "./core/tree_parser.ts";

// expects: createMacrocosm(): any, compileErrorsToJsonAny(errors): unknown, MetaValue type
import {
  create_macrocosm,
} from "./core/macrocosm.ts";
import { MetaValue } from "./core/meta_value.ts";

import "./pipeline/load_builtins_json.ts"; // side-effect: loads builtins into TYPE_REGISTRY
import "./compiler_types/type_hierarchy.ts"; // side-effect: loads type hierarchy

// ---- CLI / usage ----

const USAGE = `Usage: main [options] <input_dir> <output_file>

Options:
  --errors-file FILE   Write errors/warnings JSON to FILE
  --log TAGS           Comma-separated log tags (e.g. typecheck,macro)
  --expand             Two-step: write .67lang.expanded instead of .js
  --rte                Compile from .67lang.expanded → .js (changes input pattern)
  -h, --help           Show this help
`;

type InspectionEntry = Record<string, MetaValue>;

// ---- helpers ----

function humanReadable(inspections: InspectionEntry[]): void {
  const encoder = new TextEncoder();
  const reversed = [...inspections].reverse();

  reversed.forEach((entry, idx) => {
    const i = idx + 1;
    let buf = `\n\n${i}:\n`;
    for (const [k, v] of Object.entries(entry)) {
      buf += `${JSON.stringify(k)} = ${JSON.stringify(v)}\n`;
    }
    Deno.stdout.writeSync(encoder.encode(buf));
  });
}

function writeJson(inspections: unknown, output: { write(data: Uint8Array): void }): void {
  const encoder = new TextEncoder();
  const text = JSON.stringify(inspections, null, 2) + "\n";
  output.write(encoder.encode(text));
  // no explicit flush needed; Deno handles it when closing
}

function parseArgs(args: string[]): {
  inputDir: string;
  outputFile: string;
  errorsFile: string | null;
  logSpec: string | null;
  expand: boolean;
  rte: boolean;
} {
  let errorsFile: string | null = null;
  let logSpec: string | null = null;
  let expand = false;
  let rte = false;

  const positionals: string[] = [];

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "--") {
      for (let j = i + 1; j < args.length; j++) {
        positionals.push(args[j]);
      }
      break;
    }

    if (arg === "--errors-file") {
      const next = args[++i];
      if (!next) {
        console.error("missing argument for --errors-file");
        console.error(USAGE);
        Deno.exit(2);
      }
      errorsFile = next;
      continue;
    }

    if (arg === "--log") {
      const next = args[++i];
      if (!next) {
        console.error("missing argument for --log");
        console.error(USAGE);
        Deno.exit(2);
      }
      logSpec = next;
      continue;
    }

    if (arg === "--expand") {
      expand = true;
      continue;
    }

    if (arg === "--rte") {
      rte = true;
      continue;
    }

    if (arg === "-h" || arg === "--help") {
      console.log(USAGE);
      Deno.exit(0);
    }

    if (arg.startsWith("-")) {
      console.error(`unknown option: ${arg}`);
      console.error(USAGE);
      Deno.exit(2);
    }

    positionals.push(arg);
  }

  if (positionals.length !== 2) {
    console.error(USAGE);
    Deno.exit(2);
  }

  const [inputDir, outputFile] = positionals;
  return { inputDir, outputFile, errorsFile, logSpec, expand, rte };
}

function collect67Files(root: string, rte: boolean): string[] {
  const results: string[] = [];
  const ext = rte ? ".67lang.expanded" : ".67lang";

  function walk(dir: string): void {
    for (const entry of Deno.readDirSync(dir)) {
      const fullPath = `${dir}/${entry.name}`;
      if (entry.isDirectory) {
        walk(fullPath);
      } else {
        if (entry.isFile && fullPath.endsWith(ext)) {
          results.push(fullPath);
        }
      }
    }
  }

  walk(root);
  return results;
}

// ---- main flow ----

function main(): void {
  // placeholder: will be overridden by --log if passed
  configureLoggerFromArgs(null);

  const {
    inputDir,
    outputFile,
    errorsFile,
    logSpec,
    expand,
    rte,
  } = parseArgs(Deno.args);

  // reconfigure logging with the user-provided tags
  configureLoggerFromArgs(logSpec);

  default_logger.compile("starting compilation process");

  const inputPath = inputDir;
  const files = collect67Files(inputPath, rte);

  default_logger.compile(
    `found ${files.length} .67lang files: ${files.join(", ")}`,
  );

  const itsJustMacros = create_macrocosm();

  // registry summary (only strings; adjust .all return type in your reg impl as needed)
  const codegenMacros = Object.keys(
    itsJustMacros.registries["emission"].all,
  ).join(", ");
  const typecheckMacros = Object.keys(
    itsJustMacros.registries["typecheck"].all,
  ).join(", ");
  const preprocessorMacros = Object.keys(
    itsJustMacros.registries["preprocess"].all,
  ).join(", ");

  default_logger.registry(
    `macro registry initialized with codegen macros: ${codegenMacros}`,
  );
  default_logger.registry(
    `typecheck registry initialized with typecheck macros: ${typecheckMacros}`,
  );
  default_logger.registry(
    `preprocessor registry initialized with preprocessor macros: ${preprocessorMacros}`,
  );

  const parserInst = new TreeParser();

  default_logger.indent("compile", "parsing files", () => {
    for (const filename of files) {
      default_logger.compile(`parsing ${filename}`);
      const src = Deno.readTextFileSync(filename);
      const node = parserInst.parseTree(src, itsJustMacros);
      itsJustMacros.register(node);
    }
  });

  let crash: string | null = null;
  let compiled: string | null = null;

  default_logger.indent("compile", "single-step compilation", () => {
    try {
      compiled = itsJustMacros.compile();
    } catch (ex) {
      const e = ex as Error;
      crash = e.stack ?? e.message;
      default_logger.compile(`compilation crashed: ${e.message}`);
    }
  });

  const hadErrors =
    Array.isArray(itsJustMacros.compile_errors) &&
    itsJustMacros.compile_errors.length !== 0;

  if (expand) {
    default_logger.compile(
      `expand mode: writing expanded form to ${outputFile}`,
    );
    const encoder = new TextEncoder();
    const file = Deno.openSync(outputFile, {
      write: true,
      create: true,
      truncate: true,
    });

    try {
      for (const node of itsJustMacros.nodes) {
        const repr =
          typeof node.inspect === "function" ? node.inspect() : String(node);
        const chunk = `${repr}\n\n`;
        file.writeSync(encoder.encode(chunk));
      }
    } finally {
      file.close();
    }
  } else {
    if (compiled && !hadErrors) {
      default_logger.compile(
        `compilation successful, writing output to ${outputFile}`,
      );
      Deno.writeTextFileSync(outputFile, compiled);
    }
  }

  console.log("refactor confidently when the flame flickers.");

  if (hadErrors || crash) {
    console.log(`${itsJustMacros.compile_errors.length} compile errors.`);

    if (hadErrors) {
      if (errorsFile) {
        const file = Deno.openSync(errorsFile, {
          write: true,
          create: true,
          truncate: true,
        });

        try {
          writeJson(itsJustMacros.compile_errors, file);
        } finally {
          file.close();
        }

        console.log(`seek them in ${errorsFile}.`);
      } else {
        humanReadable(itsJustMacros.compile_errors);
      }
    }

    if (crash) {
      const encoder = new TextEncoder();
      Deno.stdout.writeSync(encoder.encode(crash));
    }

    Deno.exit(1);
  }
}

if (import.meta.main) {
  main();
}

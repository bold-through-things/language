#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable-raw-imports

import {
  configureLoggerFromArgs,
  default_logger,
} from "./utils/logger.ts";

import { Tree_parser } from "./core/tree_parser.ts";

import {
  create_macrocosm,
} from "./core/macrocosm.ts";
import { JSON_value } from "./core/meta_value.ts";

import "./compiler_types/type_hierarchy.ts";
import { Fixed, interpret_tree, parse_tokens, with_guard, Rules } from "./utils/new_parser.ts";

import bindings_code from "../../tests/all/bindings.67lang" with { type: "text" }
import { proclaim } from "./utils/utils.ts";

const USAGE = `67lang compiler. readable clause centric CLI.

help
  display this help
in <input-dir>
  directory to scan recursively for sources
out <output-file>
  the file to write the output to
  JS unless expand then 67lang
err <errors-file>
  the file to write compiler errors to (if not provided, stdout)
log <log-spec>
  a comma-separated list of tags for logging "registry,compile"
expand
  instead of JavaScript provide the 67lang in Ready To Emit
rte
  consume the Ready To Emit and write JS

example...
  67lang in my_project/src out my_project/build/out.js err my_project/build/errors.json log compile,registry

"wait, it's just SQL?!"
`;

type InspectionEntry = Record<string, JSON_value>;

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
}

const argsSchema = {
  in: new Fixed(1),
  out: new Fixed(1),
  err: new Fixed(1),
  log: new Fixed(1),
  expand: new Fixed(0),
  rte: new Fixed(0),
  help: new Fixed(0),
  "--help": new Fixed(0),
}


const HELP = Symbol("HELP");
const UNIX_HELP = Symbol("UNIX_HELP");

const PARSED_ARGS = Symbol("PARSED_ARGS");
type Compile_command = {
  kind: typeof PARSED_ARGS;
  inputDir: string;
  outputFile: string;
  errorsFile: string | null;
  logSpec: string | null;
  expand: boolean;
  rte: boolean;
}

function parseArgsNew(args: string[]): Compile_command {
  const parsed = parse_tokens(args, argsSchema);

  type Command = Compile_command | typeof HELP | typeof UNIX_HELP

  const is_parsed_args = (v: Command): v is Compile_command => typeof v === "object" && v?.kind === PARSED_ARGS;

  const pa_rules = new Rules<Compile_command>();
  const rules = new Rules<Command>();

  const interpreted = interpret_tree<typeof argsSchema, Command>(
    {
      initial: {
        kind: PARSED_ARGS,
        inputDir: "",
        outputFile: "",
        errorsFile: null,
        logSpec: null,
        expand: false,
        rte: false,
      },
      tree: parsed,
      rules: [
        rules.mode_switch("help", () => HELP),
        rules.mode_switch("--help", () => UNIX_HELP),
        with_guard(is_parsed_args, pa_rules.required("in", "inputDir")),
        with_guard(is_parsed_args, pa_rules.required("out", "outputFile")),
        with_guard(is_parsed_args, pa_rules.optional("err", "errorsFile")),
        with_guard(is_parsed_args, pa_rules.optional("log", "logSpec")),
        with_guard(is_parsed_args, pa_rules.flag("expand", "expand", v => v)),
        with_guard(is_parsed_args, pa_rules.flag("rte", "rte", v => v)),
      ],
    }
  );

  if (interpreted === HELP) {
    proclaim("requested", USAGE);
    Deno.exit(0);
  }

  if (interpreted === UNIX_HELP) {
      proclaim("requested (wrong)", "this isn't Unix flags. try 'help'?");
      Deno.exit(0);
  }

  return interpreted;
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

function main(): void {
  const {
    inputDir,
    outputFile,
    errorsFile,
    logSpec,
    expand,
    rte,
  } = parseArgsNew(Deno.args);

  configureLoggerFromArgs(logSpec);

  default_logger.compile("starting compilation process");

  const inputPath = inputDir;
  const files = collect67Files(inputPath, rte);

  default_logger.compile(
    `found ${files.length} .67lang files: ${files.join(", ")}`,
  );

  const itsJustMacros = create_macrocosm();

  default_logger.registry("[registry] registering macro whatever"); // uhh TODO

  const parserInst = new Tree_parser({top_level: "67lang:file"});

  default_logger.indent("compile", "parsing files", () => {
    // TODO for now this works, in future we will need a macro that injects these bindings
    const bindingsNode = parserInst.parse_tree(bindings_code, itsJustMacros);
    itsJustMacros.register(bindingsNode);

    for (const filename of files) {
      default_logger.compile(`parsing ${filename}`);
      const src = Deno.readTextFileSync(filename);
      const node = parserInst.parse_tree(src, itsJustMacros);
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

      // then `deno check` the file we generated
      const checkProcess = new Deno.Command(Deno.execPath(), { // TODO should check if this would work within a binary
        args: ["check", outputFile],
        stdout: "piped",
        stderr: "piped",
      });

      const checkResult = checkProcess.outputSync();
      if (checkResult.code !== 0) {
        crash = new TextDecoder().decode(checkResult.stderr);
        proclaim(
          "our users need to know their code is broken (bug inside compiler though)", 
          "TypeScript typecheck failed:\n" + crash
        );
      }
    }
  }

  proclaim("just branding i suppose", "refactor confidently when the flame flickers.");

  if (hadErrors || crash) {
    proclaim("report amount of errors", `${itsJustMacros.compile_errors.length} compile errors.`);

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

        proclaim("tell user where to find them", `seek them in ${errorsFile}.`);
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

#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run --unstable-raw-imports

import {
  configureLoggerFromArgs,
  default_logger,
  Log_spec,
  LOGGER_NO_CONTEXT,
} from "./utils/logger.ts";

import { Tree_parser } from "./core/tree_parser.ts";

import {
  create_macrocosm,
} from "./core/macrocosm.ts";
import { JSON_value } from "./core/meta_value.ts";

import "./compiler_types/type_hierarchy.ts";

import bindings_code from "../../tests/all/bindings.67lang" with { type: "text" }
import { proclaim } from "./utils/utils.ts";
import { Arg_interpreter, Fixed, parse_tokens, VarOrTerminated } from "./utils/new_parser.ts";

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
  
function parseArgsNew(args: string[]) {
  const schema = {
    "in": new Fixed(1, [] /* TODO */, undefined),
    "out": new Fixed(1, [] /* TODO */, undefined),
    "err": new Fixed(1, [] /* TODO */, undefined),
    "log": new VarOrTerminated(null, [] /* TODO */, {
      "tag": new Fixed(1, [] /* TODO */, undefined),
      "line": new Fixed(1, [it => Number.isNaN(Number(it)) ? new Error(`${it} is not a number`) : null], undefined)
    }),
    "expand": new Fixed(0, [] /* TODO */, undefined),
    "rte": new Fixed(0, [] /* TODO */, undefined),
    "help": new Fixed(0, [] /* TODO */, undefined),
    "--help": new Fixed(0, [] /* TODO */, undefined),
  }

  const parsed = parse_tokens(args, schema);

  const interpreter = new Arg_interpreter(parsed);
  let interpreted;

  if (interpreter.has("help")) {
    interpreted = { kind: "help" as const };
  } else if (interpreter.has("--help")) {
    interpreted = { kind: "--help" as const };
  } else {
    const log_spec = interpreter.focus_each("log").map(log_focus => {
      const rv = {
        kind: "and" as const,
        items: [] as Log_spec[],
      }
      log_focus.each("tag").forEach(tag => rv.items.push({ kind: "tags", tags: [tag] }));
      log_focus.each("line").forEach(line => rv.items.push({ kind: "lines", lines: [Number(line)] }));
      return rv;
    }).reduce((acc, item) => {
      acc.items.push(item);
      return acc;
    }, {
      kind: "or" as const,
      items: [] as Log_spec[],
    });
    interpreted = {
      kind: "main" as const,
      input_dir: interpreter.required("in"),
      output_file: interpreter.required("out"),
      errors_file: interpreter.optional("err"),
      log_spec,
      expand: interpreter.has("expand"),
      rte: interpreter.has("rte"),      
    };
  }

  if (interpreted.kind === "help") {
    proclaim("requested", USAGE);
    Deno.exit(0);
  }

  if (interpreted.kind === "--help") {
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
    input_dir,
    output_file,
    errors_file,
    log_spec,
    expand,
    rte,
  } = parseArgsNew(Deno.args);

  configureLoggerFromArgs(log_spec);

  default_logger.log(LOGGER_NO_CONTEXT, "compile", "starting compilation process");

  const inputPath = input_dir;
  const files = collect67Files(inputPath, rte ?? false);

  default_logger.log(
    LOGGER_NO_CONTEXT, "compile",
    `found ${files.length} .67lang files: ${files.join(", ")}`,
  );

  const itsJustMacros = create_macrocosm();

  default_logger.log(LOGGER_NO_CONTEXT, "registry", "[registry] registering macro whatever"); // uhh TODO

  const parserInst = new Tree_parser({top_level: "67lang:file"});

  default_logger.indent(LOGGER_NO_CONTEXT, "compile", "parsing files", () => {
    // TODO for now this works, in future we will need a macro that injects these bindings
    const bindingsNode = parserInst.parse_tree(bindings_code, itsJustMacros);
    itsJustMacros.register(bindingsNode);

    for (const filename of files) {
      default_logger.log(LOGGER_NO_CONTEXT, "compile", `parsing ${filename}`);
      const src = Deno.readTextFileSync(filename);
      const node = parserInst.parse_tree(src, itsJustMacros);
      itsJustMacros.register(node);
    }
  });

  let crash: string | null = null;
  let compiled: string | null = null;

  default_logger.indent(LOGGER_NO_CONTEXT, "compile", "single-step compilation", () => {
    try {
      compiled = itsJustMacros.compile();
    } catch (ex) {
      const e = ex as Error;
      crash = e.stack ?? e.message;
      default_logger.log(LOGGER_NO_CONTEXT, "compile", `compilation crashed: ${e.message}`);
    }
  });

  const hadErrors =
    Array.isArray(itsJustMacros.compile_errors) &&
    itsJustMacros.compile_errors.length !== 0;

  if (expand) {
    default_logger.log(
      LOGGER_NO_CONTEXT, "compile",
      `expand mode: writing expanded form to ${output_file}`,
    );
    const encoder = new TextEncoder();
    const file = Deno.openSync(output_file, {
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
      default_logger.log(
        LOGGER_NO_CONTEXT, "compile",
        `compilation successful, writing output to ${output_file}`,
      );
      Deno.writeTextFileSync(output_file, compiled);

      // then `deno check` the file we generated
      const checkProcess = new Deno.Command(Deno.execPath(), { // TODO should check if this would work within a binary
        args: ["check", output_file],
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
      if (errors_file) {
        const file = Deno.openSync(errors_file, {
          write: true,
          create: true,
          truncate: true,
        });

        try {
          writeJson(itsJustMacros.compile_errors, file);
        } finally {
          file.close();
        }

        proclaim("tell user where to find them", `seek them in ${errors_file}.`);
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

// pipeline/steps/javascript_emission.ts

import { Macro_registry, Macro_context } from "../../core/macro_registry.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { IndentedStringIO, Emission_item, count_users } from "../../utils/strutil.ts";
import { JS_LIB } from "../js_conversion.ts";
import { Macro, Node } from "../../core/node.ts";
import { NewCall } from "../call_conventions.ts";
import { Macrocosm } from "../../core/macrocosm.ts";
import { Type_engine } from "../../compiler_types/proper_types.ts";

export class Emitted_expression_metadata {
  constructor(public expr: Emission_item) {
    // ...
  }
}

export class Emission_macro_context implements Macro_context {
  node: Node;
  compiler: Macrocosm;
  statement_out: Emission_item[];
  expression_out: Emission_item[];  
  registry: Macro_registry<Emission_macro_context>;
  type_engine: Type_engine;

  constructor(opts: {
    node: Node;
    compiler: Macrocosm,
    statement_out: Emission_item[],
    expression_out: Emission_item[],
    registry: Macro_registry<Emission_macro_context>;
    type_engine: Type_engine;
  }) {
    this.node = opts.node;
    this.compiler = opts.compiler;
    this.statement_out = opts.statement_out;
    this.expression_out = opts.expression_out;
    this.registry = opts.registry;
    this.type_engine = opts.type_engine;
  }

  clone_with(opts: {
    node?: Node;
    statement_out?: Emission_item[];
    expression_out?: Emission_item[];
  } = {}): Emission_macro_context {
    return new Emission_macro_context({
      node: opts.node ?? this.node,
      compiler: this.compiler,
      statement_out: opts.statement_out ?? this.statement_out,
      expression_out: opts.expression_out ?? this.expression_out,
      registry: this.registry,
      type_engine: this.type_engine,
    });
  }

  statement<T>(stmt: Emission_item & T): T {
    this.statement_out.push(stmt);
    return stmt;
  }

  expression<T>(expr: Emission_item & T): T {
    this.expression_out.push(expr);
    return expr;
  }

  apply() {
    const macroName = String(this.compiler.get_metadata(this.node, Macro));
    const all = this.registry.all();

    default_logger.codegen(`emitting JavaScript for macro: ${macroName}`);

    // Synthetic root wrapper
    if (this.node.content === "67lang:solution") {
      default_logger.codegen("wrapping solution in JavaScript runtime setup");

      const obuf = new IndentedStringIO();
      obuf.write(JS_LIB + "\n\n");

      for (const [_name, fn] of this.type_engine.functions) {
        const conv = fn.convention;
        if (conv instanceof NewCall && conv.implementation) {
          obuf.write(`${conv.implementation}\n\n`);
        }
      }

      default_logger.codegen("adding async wrapper for browser compatibility");
      obuf.write(`void (async () => {\n`);
      obuf.with_indent(() => {
        obuf.write(`'use strict';\n`);

        const stmts: Emission_item[] = [];
        const inner = this.clone_with({
          statement_out: stmts,
          expression_out: [], // discard
        });

        const fn = all[macroName];
        if (fn) {
          this.compiler.error_tracker.safely(this, () => fn(inner));
        } else {
          for (const child of this.node.children) {
            inner.clone_with({ node: child }).apply();
          }
        }

        // TODO this is a really fucking stupid h*ck. TypeScript to blame since they do not
        //  allow us to inspect the closures

        // 1. emit and then discard to count the users here

        this.compiler.error_tracker.safely(this, () => {
          count_users(() => {
            for (const stmt of stmts) {
              if (stmt !== null) {
                stmt();
              }
            }
          });

          // 2. emit the code now

          for (const stmt of stmts) {
            if (stmt !== null) {
              obuf.write(stmt());
            }
          }
        });
      });

      obuf.write(`\n})();`);

      this.compiler.js_output = obuf.gets_to_end(); // TODO that's fucking stupid
      default_logger.codegen(
        `JavaScript output generated: ${this.compiler.js_output.length} characters`,
      );
      return;
    }

    // Standard emission
    const fn = all[macroName];
    if (fn) {
      default_logger.codegen(`applying JavaScript emission macro: ${macroName}`);
      this.compiler.error_tracker.safely(this, () => fn(this));
      const last = this.expression_out[this.expression_out.length - 1];
      if (last !== undefined) {
        this.compiler.set_metadata(
          this.node,
          Emitted_expression_metadata,
          new Emitted_expression_metadata(
            // right TODO this isn't quite correct (what if emitted many)
            last,
          ),
        );
      }
      return;
    }

    default_logger.codegen(`ERROR: unknown macro ${macroName}`);

    if (this.compiler.error_tracker.has_errors) {
      default_logger.codegen("skipping malformed node due to existing compile errors");
      return;
    }

    if (this.node.content.trim() === "") {
      default_logger.codegen("skipping empty node");
      return;
    }

    this.compiler.error_tracker.fail({
      node: this.node,
      message: `unknown macro '${macroName}' - is this supposed to exist? did you maybe typo something?`,
      type: ErrorType.INVALID_MACRO,
    });

    return;
  }
}

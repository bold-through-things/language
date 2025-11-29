// pipeline/steps/javascript_emission.ts

import { MacroProcessingStep } from "./base.ts";
import { MacroRegistry, MacroContext, Macro_ctx_void_proc } from "../../core/macro_registry.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { IndentedStringIO, Emission_item, count_users } from "../../utils/strutil.ts";
import { JS_LIB } from "../js_conversion.ts";
import { Macro } from "../../core/node.ts";
import { NewCall } from "../call_conventions.ts";

export class Emitted_expression_metadata {
  constructor(public expr: Emission_item) {
    // ...
  }
}

export class JavaScriptEmissionStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry<Macro_ctx_void_proc>) {
    super();
    // DO NOT override this.macros via super() – Crystal version intentionally avoids calling super().
    // So we reassign manually to mirror semantics.
    this.macros = macros;
  }

  process_node(ctx: MacroContext): null {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const all = this.macros.all();

    default_logger.codegen(`emitting JavaScript for macro: ${macroName}`);

    // Synthetic root wrapper
    if (ctx.node.content === "67lang:solution") {
      default_logger.codegen("wrapping solution in JavaScript runtime setup");

      const obuf = new IndentedStringIO();
      obuf.write(JS_LIB + "\n\n");

      for (const conv of ctx.compiler.conventions) {
        if (conv instanceof NewCall && conv.implementation) {
          obuf.write(`${conv.implementation}\n\n`);
        }
      }

      default_logger.codegen("adding async wrapper for browser compatibility");
      obuf.write(`void (async () => {\n`);
      obuf.with_indent(() => {
        obuf.write(`'use strict';\n`);

        const stmts: Emission_item[] = [];
        const inner = ctx.clone_with({
          statement_out: stmts,
          expression_out: [], // discard
        });

        const fn = all[macroName];
        if (fn) {
          ctx.compiler.safely(() => fn(inner));
        } else {
          for (const child of ctx.node.children) {
            const childCtx = inner.clone_with({ node: child });
            this.process_node(childCtx);
          }
        }

        // TODO this is a really fucking stupid h*ck. TypeScript to blame since they do not
        //  allow us to inspect the closures

        // 1. emit and then discard to count the users here

        ctx.compiler.safely(() => {
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

      ctx.compiler.js_output = obuf.gets_to_end();
      default_logger.codegen(
        `JavaScript output generated: ${ctx.compiler.js_output.length} characters`,
      );
      return null;
    }

    // Standard emission
    const fn = all[macroName];
    if (fn) {
      default_logger.codegen(`applying JavaScript emission macro: ${macroName}`);
      ctx.compiler.safely(() => fn(ctx));
      ctx.compiler.set_metadata(
        ctx.node,
        Emitted_expression_metadata,
        new Emitted_expression_metadata(
          // right TODO this isn't quite correct (what if emitted many)
          ctx.expression_out[ctx.expression_out.length - 1],
        ),
      );
      return null;
    }

    default_logger.codegen(`ERROR: unknown macro ${macroName}`);

    if (ctx.compiler.compile_errors.length != 0) {
      default_logger.codegen("skipping malformed node due to existing compile errors");
      return null;
    }

    ctx.compiler.compile_error(
      ctx.node,
      `unknown macro '${macroName}' - is this supposed to exist? did you maybe typo something?`,
      ErrorType.INVALID_MACRO,
    );

    return null;
  }
}

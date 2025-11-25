// pipeline/steps/must_compile_error_verification.ts

import { MacroProcessingStep } from "./base.ts";
import { Macro_ctx_void_proc, MacroContext, MacroRegistry } from "../../core/macro_registry.ts";
import { Args, Macro, Node } from "../../core/node.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";

// ----------------------- helpers -----------------------

function mv_to_i(v: unknown): number | null {
  if (typeof v === "number") {
    return v | 0;
  }
  if (typeof v === "string") {
    const i = parseInt(v, 10);
    return Number.isNaN(i) ? null : i;
  }
  return null;
}

function mv_to_s(v: unknown): string | null {
  if (typeof v === "string") {
    return v;
  }
  return null;
}

// ----------------------- main step -----------------------

export class MustCompileErrorVerificationStep extends MacroProcessingStep {
  private expectations: Array<Expectation>;

  constructor(public override macros: MacroRegistry<Macro_ctx_void_proc>) {
    super();
    this.macros = macros;
    this.expectations = [];
  }

  process_node(ctx: MacroContext): null {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));

    if (macroName === "must_compile_error") {
      const exp = this.extract_expectations_from_node(ctx, ctx.node);
      if (exp) {
        this.expectations.push(new Expectation(ctx.node, exp));
      }
    } else {
      for (const child of ctx.node.children) {
        const childCtx = ctx.clone_with({ node: child });
        this.process_node(childCtx);
      }
    }

    if (ctx.node.content === "67lang:solution") {
      this.verify_expectations(ctx, this.expectations);
      this.expectations = [];
    }

    return null;
  }

  // ------------------- extraction -------------------

  private extract_expectations_from_node(
    ctx: MacroContext,
    node: Node,
  ): Map<number, string> | null {
    const args = String(ctx.compiler.get_metadata(node, Args) ?? "");
    default_logger.macro(`must_compile_error with args: "${args}"`);

    if (args.trim() === "") {
      ctx.compiler.compile_error(
        node,
        "must_compile_error macro requires arguments in format ERROR_TYPE=line or ERROR_TYPE=+offset",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const baseLine = node.pos?.line ?? 0;
    const expected = new Map<number, string>();

    for (const pair of args.split(/\s+/)) {
      if (!pair.includes("=")) {
        ctx.compiler.compile_error(
          node,
          `must_compile_error argument must contain '=': ${pair}`,
          ErrorType.INVALID_MACRO,
        );
        return null;
      }

      const [rawType, rawNum] = pair.split("=", 2).map((x) => x.trim());
      let lineNum: number | null = null;

      if (rawNum.startsWith("+")) {
        const off = rawNum.slice(1);
        const i = parseInt(off, 10);
        lineNum = Number.isNaN(i) ? null : baseLine + i;
      } else {
        const i = parseInt(rawNum, 10);
        lineNum = Number.isNaN(i) ? null : i;
      }

      if (lineNum === null) {
        ctx.compiler.compile_error(
          node,
          `invalid line number in must_compile_error: ${rawNum} (use absolute line number or +offset)`,
          ErrorType.INVALID_MACRO,
        );
        return null;
      }

      expected.set(lineNum, rawType);
    }

    return expected;
  }

  // ------------------- verification -------------------

  private verify_expectations(
    ctx: MacroContext,
    expectations: Array<Expectation>,
  ): void {
    const actualByLine = new Map<number, Array<string>>();

    for (const err of ctx.compiler.compile_errors) {
      const line_v = err["line"];
      if (line_v == null) {
        continue;
      }
      const line_i = mv_to_i(line_v);
      if (line_i == null) {
        continue;
      }

      const type_v = err["error_type"];
      const etype = mv_to_s(type_v) ?? "UNKNOWN_ERROR";

      let arr = actualByLine.get(line_i);
      if (!arr) {
        arr = [];
        actualByLine.set(line_i, arr);
      }
      arr.push(etype);
    }

    const consumed = new Set<number>();

    for (const exp of expectations) {
      for (const [expectedLine, expectedType] of exp.expected_errors) {
        const actual = actualByLine.get(expectedLine);

        if (!actual) {
          const nearby: Array<string> = [];
          const sorted = [...actualByLine.keys()].sort((a, b) => a - b);
          for (const ln of sorted) {
            if (Math.abs(ln - expectedLine) <= 3) {
              nearby.push(`line ${ln}: ${actualByLine.get(ln)}`);
            }
          }
          const info = nearby.length === 0
            ? ""
            : ` (nearby errors: ${nearby.join("; ")})`;

          ctx.compiler.compile_error(
            exp.node,
            `expected ${expectedType} error on line ${expectedLine} but no error found${info}`,
            ErrorType.ASSERTION_FAILED,
          );
        } else if (!actual.includes(expectedType)) {
          ctx.compiler.compile_error(
            exp.node,
            `expected ${expectedType} error on line ${expectedLine} but found ${actual}`,
            ErrorType.ASSERTION_FAILED,
          );
        } else {
          consumed.add(expectedLine);
        }
      }
    }

    ctx.compiler.compile_errors = ctx.compiler.compile_errors.filter((err) => {
      const ln = mv_to_i(err["line"]);
      if (ln == null) {
        return true;
      }
      return !consumed.has(ln);
    });
  }
}

// ----------------------- expectation wrapper -----------------------

class Expectation {
  public node: Node;
  public expected_errors: Map<number, string>;

  constructor(node: Node, expected: Map<number, string>) {
    this.node = node;
    this.expected_errors = expected;
  }
}

// pipeline/steps/must_compile_error_verification.ts

import { Macro_context, Macro_registry } from "../../core/macro_registry.ts";
import { Args, Macro, Node } from "../../core/node.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { Macrocosm } from "../../core/macrocosm.ts";
import { Macro_error } from "../../core/exceptions.ts";
import { unroll_parent_chain } from "./utils.ts";

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

export class Must_compile_error_context implements Macro_context {
  node: Node;
  compiler: Macrocosm;
  registry: Macro_registry<Must_compile_error_context>;
  expectations: Array<Expectation> = [];

  constructor(opts: {
    node: Node;
    compiler: Macrocosm,
    registry: Macro_registry<Must_compile_error_context>,
    expectations: Expectation[],
  }) {
    this.node = opts.node;
    this.compiler = opts.compiler;
    this.registry = opts.registry;
    this.expectations = opts.expectations || [];
  }

  clone_with(opts: { node: Node }): Must_compile_error_context {
    return new Must_compile_error_context({
      node: opts.node ?? this.node,
      compiler: this.compiler,
      registry: this.registry,
      expectations: this.expectations,
    });
  }

  apply(): null {
    const macroName = String(this.compiler.get_metadata(this.node, Macro));

    if (macroName === "must_compile_error") {
      const exp = this.extract_expectations_from_node(this, this.node);
      if (exp) {
        this.expectations.push(new Expectation(this.node, exp));
      }
    } else {
      for (const child of this.node.children) {
        const childCtx = this.clone_with({ node: child });
        childCtx.apply();
      }
    }

    if (this.node.content === "67lang:solution") {
      this.verify_expectations(this, this.expectations);
      this.expectations = [];
    }

    return null;
  }

  // ------------------- extraction -------------------

  private extract_expectations_from_node(
    ctx: Macro_context,
    node: Node,
  ): Map<number, string> | null {
    const args = String(ctx.compiler.get_metadata(node, Args) ?? "");

    if (args.trim() === "") {
      ctx.compiler.error_tracker.fail({
        node,
        message: "must_compile_error macro requires arguments in format ERROR_TYPE=line or ERROR_TYPE=+offset",
        type: ErrorType.INVALID_MACRO,
      });
      return null;
    }

    const baseLine = node.pos?.line ?? 0;
    const expected = new Map<number, string>();

    for (const pair of args.split(/\s+/)) {
      const [rawType, rawNum] = pair.split("=", 2).map((x) => x.trim());

      
      ctx.compiler.error_tracker.assert(
        rawType !== undefined && rawNum !== undefined,
        {
          node,
          message: `must_compile_error argument must contain '=': ${pair}`,
          type: ErrorType.INVALID_MACRO,
        }
      );

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
        ctx.compiler.error_tracker.fail({
          node,
          message: `invalid line number in must_compile_error: ${rawNum} (use absolute line number or +offset)`,
          type: ErrorType.INVALID_MACRO,
        });
        return null;
      }

      expected.set(lineNum, rawType);
    }

    return expected;
  }

  // ------------------- verification -------------------

  private verify_expectations(
    ctx: Macro_context,
    expectations: Array<Expectation>,
  ): void {
    function line(err: Macro_error): number {
      return err.node.pos?.line ?? 0;
    }

    const all_ours = ctx.compiler.error_tracker.all.filter((e) => unroll_parent_chain(e.node).includes(ctx.node));

    const actualByLine: [/*line*/ number, ErrorType, Macro_error][] = [];

    for (const err of all_ours) {
      actualByLine.push([line(err), err.type, err]);
    }

    const consumed: Macro_error[] = [];

    for (const exp of expectations) {
      for (const [expectedLine, expectedType] of exp.expected_errors) {
        ctx.compiler.error_tracker.safely(ctx, () => {
          const matched = actualByLine.filter(([line, type]) =>
            line === expectedLine && type === expectedType
          );
          ctx.compiler.error_tracker.assert(
            matched.length > 0,
            {
              node: exp.node,
              message: `expected compile error of type ${expectedType} at line ${expectedLine}, but none found`,
              type: ErrorType.EXPECTATION_VIOLATED,
            }
          );
          for (const [, , err] of matched) {
            consumed.push(err);
          }
        });
      }
    }
    
    for (const error of consumed) {
      ctx.compiler.error_tracker.tolerate(error, "matched by `must_compile_error` macro");
    }
  }
}

class Expectation {
  public node: Node;
  public expected_errors: Map<number, string>;

  constructor(node: Node, expected: Map<number, string>) {
    this.node = node;
    this.expected_errors = expected;
  }
}

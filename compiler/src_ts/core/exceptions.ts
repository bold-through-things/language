// core/exceptions.ts

import { Expression_return_type, Type_check_result, Type_reference, UPSTREAM_INVALID_NAME } from "../compiler_types/proper_types.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Macro_context } from "./macro_registry.ts";
import { JSON_value } from "./meta_value.ts";
import { Node } from "./node.ts";

const NEW = Symbol("NEW");

export class Macro_error_tracker {
  private errors: (Macro_error | null)[] = [];

  fail(opts: { message: string; node: Node; type: ErrorType, extras?: Record<string, JSON_value> }): never {
    const err = Macro_error[NEW]({
      message: opts.message,
      node: opts.node,
      type: opts.type,
      extras: opts.extras,
    });
    this.errors.push(err);
    throw err;
  }

  assert(condition: boolean, opts: { message: string; node: Node; type: ErrorType, extras?: Record<string, JSON_value> }): asserts condition {
    if (!condition) {
      this.fail(opts);
    }
  }

  tolerate(error: Macro_error, reason: string): void {
    this.assert(
      reason.length > 6,
      {
        message: `must include a reason tolerating error: ${error.message}`,
        node: error.node,
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    )
    const index = this.errors.indexOf(error);
    if (index >= 0) {
      this.errors[index] = null;
    }
  }

  safely<T>(ctx: Macro_context, fn: () => T): T | undefined {
    try {
      return fn();
    } catch (e) {
      if (!(e instanceof Macro_error)) {
        this.fail({
          message: `unexpected error type: ${e}`,
          node: ctx.node,
          type: ErrorType.INTERNAL_CODE_QUALITY,
        })
      } else {
        // already handled when created
      }
    }
  }

  public get all(): Macro_error[] {
    return this.errors.filter((e): e is Macro_error => e !== null);
  }

  public get has_errors(): boolean {
    return this.errors.length > 0;
  }
}

export class Macro_error extends Error {
  readonly node: Node;
  readonly type: ErrorType;
  readonly extras: Record<string, JSON_value> | null = null;

  private constructor(opts: {message: string, node: Node, type: ErrorType, extras?: Record<string, JSON_value>}) {
    super(opts.message);
    this.name = "Macro_error";
    this.node = opts.node;
    this.type = opts.type;
    if (opts.extras) {
      this.extras = opts.extras;
    }
  }

  static [NEW](opts: {message: string, node: Node, type: ErrorType, extras?: Record<string, JSON_value>}) {
    return new Macro_error(opts);
  }

  static assert(
    condition: boolean,
    opts: {
      ctx: Macro_context,
      message: string,
      type: ErrorType,
      extra?: Record<string, JSON_value>,
    }
  ): asserts condition {
    if (!condition) {
      throw new Macro_error({
        message: `Macro assertion failed at node ${opts.ctx.node.content}: ${opts.message}`,
        node: opts.ctx.node,
        type: opts.type,
        extras: opts.extra,
      });
    }
  }
}

export function graceful_typecheck<T extends Type_check_result>(
  ctx: Type_checking_context, 
  container: typeof Type_reference | typeof Expression_return_type,
  fn: () => T
): T | Type_check_result {
  try {
    const rv = fn();
    return rv;
  } catch (_e) {
    return new container(ctx.type_engine.get_type(UPSTREAM_INVALID_NAME));
  }
}

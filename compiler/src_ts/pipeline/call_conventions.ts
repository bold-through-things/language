// pipeline/call_conventions.ts
// Built-in function call definitions and call conventions.

import type { Type } from "../compiler_types/proper_types.ts";

// Types used in demands/returns
export type TypeDemand = Type;

// Convert a field name to JS access syntax
export function jsFieldAccess(s: string): string {
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(s)) {
    return `.${s}`;
  } else {
    return `["${s}"]`;
  }
}

// --- Call conventions ---------------------------------------------------------

export enum Async_mode {
  MAYBE,
  ASYNC,
  SYNC,
}

export class FieldCall {
  constructor(
    readonly field: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) { 
    // ...
  }

  compile(args: string[]): string {
    try {
      const receiver = args[0];
      const rest = args.slice(1);
      const maybeAssign = rest.length === 0
        ? ""
        : ` = (${rest.join(",")})`;
      const fieldExpr = this.formatField(this.field);
      return `(${receiver}${fieldExpr}${maybeAssign})`;
    } catch (e) {
      throw new Error(`FieldCall(${this.field}) failed to compile: ${e}`);
    }
  }

  private formatField(name: string): string {
    if (this.safeIdentifier(name) && !this.keyword(name)) {
      return `.${name}`;
    } else {
      return `[${this.quoteString(name)}]`;
    }
  }

  private safeIdentifier(s: string): boolean {
    return /^[A-Za-z_]\w*$/.test(s);
  }

  private keyword(s: string): boolean {
    const keywords = new Set([
      "alias", "begin", "break", "case", "class", "def", "do", "else", "elsif",
      "end", "ensure", "enum", "extend", "false", "for", "if", "in", "include",
      "module", "next", "nil", "not", "of", "out", "private", "protected",
      "require", "rescue", "return", "self", "super", "then", "true", "typeof",
      "unless", "until", "when", "while", "with", "yield",
    ]);
    return keywords.has(s);
  }

  private quoteString(s: string): string {
    // Emit a double-quoted string literal with minimal escaping.
    const escaped = s
      .replace(/\\/g, "\\\\")
      .replace(/"/g, '\\"');
    return `"${escaped}"`;
  }
}

export class PrototypeCall {
  constructor(
    readonly constructorName: string,
    readonly fn: string,
    readonly demands: TypeDemand[],
    readonly returns: TypeDemand,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    return `${this.constructorName}.prototype.${this.fn}.call(${args.join(", ")})`;
  }
}

// fn(args...)  (or receiver.fn(args...) if receiver provided)
export class DirectCall {

  constructor(
    readonly fn: string,
    readonly receiver: string | null = null,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    const prefix = this.receiver ? `${this.receiver}.` : "";
    return `${prefix}${this.fn}(${args.join(", ")})`;
  }
}

// just returns / assigns the identifier
export class LocalAccessCall {
  constructor(
    readonly fn: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    if (args.length > 0) {
      return `(${this.fn} = ${args.join(",")})`;
    } else {
      return this.fn;
    }
  }
}

// emits a direct JS operator for n-ary application (e.g., +, &&, ||)
// optionally wraps the whole expression (e.g., "!" prefix)
export class NaryOperatorCall {
  constructor(
    readonly operator: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly is_async: boolean = false,
    readonly wrapper: string | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    const expr = `(${args.join(` ${this.operator} `)})`;
    if (this.wrapper) {
      return `${this.wrapper}${expr}`;
    } else {
      return expr;
    }
  }
}

// emits chained comparisons: a < b && b < c
export class ChainedComparisonCall {
  constructor(
    readonly operator: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    if (args.length < 2) {
      return "true";
    }

    const parts: string[] = [];
    for (let i = 0; i < args.length - 1; i++) {
      parts.push(`${args[i]} ${this.operator} ${args[i + 1]}`);
    }

    return `(${parts.join(" && ")})`;
  }
}

// new Constructor(a, b)
export class NewCall {

  // only used for classes we define ourselves
  implementation: string | null = null;

  constructor(
    readonly constructorName: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    return `(new ${this.constructorName}(${args.join(", ")}))`;
  }
}

// obj[index]   or   obj[index] = value
export class IndexAccessCall {
  constructor(
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    const receiver = args[0];
    const index = args[1];
    const value = args[2];

    if (value !== undefined) {
      return `(${receiver}[${index}] = ${value})`;
    } else {
      return `${receiver}[${index}]`;
    }
  }
}

// fn(args...) where the first arg is the callable
export class CallableInvokeCall {
  constructor(
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) {
    // ...
  }

  compile(args: string[]): string {
    const fn = args[0];
    const params = args.slice(1);
    return `${fn}(${params.join(", ")})`;
  }
}

// Union of all call-convention classes
export type Call_convention =
  | FieldCall
  | PrototypeCall
  | DirectCall
  | LocalAccessCall
  | NaryOperatorCall
  | ChainedComparisonCall
  | NewCall
  | IndexAccessCall
  | CallableInvokeCall;

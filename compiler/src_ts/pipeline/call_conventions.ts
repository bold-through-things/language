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

export class FieldCall {
  readonly field: string;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    field: string,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.field = field;
    this.demands = demands;
    this.returns = returns;
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
  readonly constructorName: string;
  readonly fn: string;
  readonly demands: TypeDemand[];
  readonly returns: TypeDemand;

  constructor(
    constructorName: string,
    fn: string,
    demands: TypeDemand[],
    returns: TypeDemand,
  ) {
    this.constructorName = constructorName;
    this.fn = fn;
    this.demands = demands;
    this.returns = returns;
  }

  compile(args: string[]): string {
    return `${this.constructorName}.prototype.${this.fn}.call(${args.join(", ")})`;
  }
}

// fn(args...)  (or receiver.fn(args...) if receiver provided)
export class DirectCall {
  readonly fn: string;
  readonly receiver: string | null;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    fn: string,
    receiver: string | null = null,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.fn = fn;
    this.receiver = receiver;
    this.demands = demands;
    this.returns = returns;
  }

  compile(args: string[]): string {
    const prefix = this.receiver ? `${this.receiver}.` : "";
    return `${prefix}${this.fn}(${args.join(", ")})`;
  }
}

// just returns / assigns the identifier
export class LocalAccessCall {
  readonly fn: string;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    fn: string,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.fn = fn;
    this.demands = demands;
    this.returns = returns;
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
  readonly operator: string;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;
  readonly is_async: boolean;
  readonly wrapper: string | null;

  constructor(
    operator: string,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
    is_async: boolean = false,
    wrapper: string | null = null,
  ) {
    this.operator = operator;
    this.demands = demands;
    this.returns = returns;
    this.is_async = is_async;
    this.wrapper = wrapper;
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
  readonly operator: string;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;
  readonly is_async: boolean;

  constructor(
    operator: string,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
    is_async: boolean = false,
  ) {
    this.operator = operator;
    this.demands = demands;
    this.returns = returns;
    this.is_async = is_async;
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
  readonly constructorName: string;
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    constructorName: string,
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.constructorName = constructorName;
    this.demands = demands;
    this.returns = returns;
  }

  compile(args: string[]): string {
    return `(new ${this.constructorName}(${args.join(", ")}))`;
  }
}

// obj[index]   or   obj[index] = value
export class IndexAccessCall {
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.demands = demands;
    this.returns = returns;
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
  readonly demands: TypeDemand[] | null;
  readonly returns: TypeDemand | null;

  constructor(
    demands: TypeDemand[] | null = null,
    returns: TypeDemand | null = null,
  ) {
    this.demands = demands;
    this.returns = returns;
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

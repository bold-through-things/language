// pipeline/call_conventions.ts
// Built-in function call definitions and call conventions.

import type { Type } from "../compiler_types/proper_types.ts";
import { MacroAssertFailed } from "../core/exceptions.ts";
import { MacroContext } from "../core/macro_registry.ts";
import { ErrorType } from "../utils/error_types.ts";
import { BRACKETS, Emission_item, PARENTHESIS } from "../utils/strutil.ts";
import { FORCE_SYNTAX_ERROR } from "./js_conversion.ts";

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

const call = <T>(fn: () => T): T => fn();
const is_not_null = <T>(x: T | null): x is T => x !== null;

export class FieldCall {
  constructor(
    readonly field: string,
    readonly demands: TypeDemand[] | null = null,
    readonly returns: TypeDemand | null = null,
    readonly async_mode: Async_mode = Async_mode.MAYBE,
  ) { 
    // ...
  }

  compile(args: Emission_item[], _ctx: MacroContext): Emission_item {
    return () => {
      const args_real = args.filter(is_not_null);
      const receiver = args_real[0];
      const rest = args_real.slice(1);
      const [ maybeAssign, wrap ] = rest.length === 0
        ? ["", (s: string) => s]
        : [` = (${rest.map(call).join(",")})`, PARENTHESIS];
      const fieldExpr = this.formatField(this.field);

      if (!receiver) {
        return `/* invalid FieldCall: \`invalid${fieldExpr}${maybeAssign}\` */`;
      }

      return wrap(`${receiver()}${fieldExpr}${maybeAssign}`);
    };
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

  compile(args: Emission_item[]): Emission_item {
    return () => `${this.constructorName}.prototype.${this.fn}.call(${args.filter(is_not_null).map(call).join(", ")})`;
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

  compile(args: Emission_item[]): Emission_item {
    const prefix = this.receiver ? `${this.receiver}.` : "";
    return () => `${prefix}${this.fn}(${args.filter(is_not_null).map(call).join(", ")})`;
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

  compile(args: Emission_item[]): Emission_item {
    if (args.length > 0) {
      return () => `(${this.fn} = ${args.filter(is_not_null).map(call).join(",")})`;
    } else {
      return () => this.fn;
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

  compile(args: Emission_item[]): Emission_item {
    return () => {
      const expr = `(${args.filter(is_not_null).map(call).join(` ${this.operator} `)})`;
      if (this.wrapper) {
        return `${this.wrapper}${expr}`;
      } else {
        return expr;
      }
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

  compile(args: Emission_item[]): Emission_item {
    const args_real = args.filter(is_not_null);

    if (args_real.length < 2) {
      return () => "true";
    }

    return () => {
      const parts: string[] = [];
      for (let i = 0; i < args_real.length - 1; i++) {
        const arg = args_real[i];
        const next_arg = args_real[i + 1];
        parts.push(`${arg()} ${this.operator} ${next_arg()}`);
      }

      return `(${parts.join(" && ")})`;
    }
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

  compile(args: Emission_item[]): Emission_item {
    return () => `(new ${this.constructorName}(${args.filter(is_not_null).map(call).join(", ")}))`;
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

  compile(args: Emission_item[]): Emission_item {
    const args_real = args.filter(is_not_null);

    const receiver = args_real[0];
    const index = args_real[1];
    const value = args_real[2];

    if (args_real.length < 2) {
      return () => `${FORCE_SYNTAX_ERROR} /* invalid IndexAccessCall: \`${receiver?.() ?? "invalid"}[${index?.() ?? "invalid"}] = ${value?.() ?? "invalid"}\` */`
    }

    if (value !== undefined) {
      return () => `(${receiver()}[${index()}] = ${value()})`;
    } else {
      return () => `${receiver()}[${index()}]`;
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

  compile(args: Emission_item[]): Emission_item {
    const args_real = args.filter(is_not_null);
    const fn = args_real[0];
    const params = args_real.slice(1);
    return () => `${fn()}(${params.map(call).join(", ")})`;
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

// pipeline/call_conventions.ts
// Built-in function call definitions and call conventions.

import { Macro_context } from "../core/macro_registry.ts";
import { Emission_item, PARENTHESIS } from "../utils/strutil.ts";
import { map_adjacent } from "../utils/utils.ts";
import { FORCE_SYNTAX_ERROR } from "./js_conversion.ts";

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
  ASYNC,
  SYNC,
}

const call = <T>(fn: () => T): T => fn();
const is_not_null = <T>(x: T | null): x is T => x !== null;

export class FieldCall {
  readonly field: string;
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      field: string;
      async_mode: Async_mode;
    }
  ) { 
    this.field = opts.field;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[], _ctx: Macro_context): [Emission_item, Emission_item] {
    const [fexpr_type, field_expr] = this.formatField(this.field);
      const args_real = args.filter(is_not_null);
    const throw_undefined = fexpr_type === "index" ? 
      () => {
        const receiver = args_real[0];
        if (!receiver) {
          return `/* invalid FieldCall: \`invalid${field_expr}\` */`;
        }
        return `if (${receiver()}${field_expr} === undefined) { throw new Error("sparse object") }`;
      }: null;
    return [throw_undefined, () => {
      const receiver = args_real[0];
      const rest = args_real.slice(1);
      const [ maybeAssign, wrap ] = rest.length === 0
        ? ["", (s: string) => s]
        : [` = (${rest.map(call).join(",")})`, PARENTHESIS];

      if (!receiver) {
        return `/* invalid FieldCall: \`invalid${field_expr}${maybeAssign}\` */`;
      }

      return wrap(`${receiver()}${field_expr}${maybeAssign}`);
    }];
  }

  private formatField(name: string): ["index" | "property", string] {
    if (this.safeIdentifier(name) && !this.keyword(name)) {
      return ["property", `.${name}`];
    } else {
      return ["index", `[${this.quoteString(name)}]`];
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
  readonly async_mode: Async_mode;

  constructor(
    opts: {
      constructor: string,
      fn: string,
      async_mode: Async_mode,
    }
  ) {
    this.constructorName = opts.constructor;
    this.fn = opts.fn;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    return [null, () => `${this.constructorName}.prototype.${this.fn}.call(${args.filter(is_not_null).map(call).join(", ")})`];
  }
}

// fn(args...)  (or receiver.fn(args...) if receiver provided)
export class DirectCall {
  readonly fn: string;
  readonly receiver: string | null = null;
  readonly async_mode: Async_mode;

  constructor(
    opts: {
      fn: string,
      receiver?: string | null,
      async_mode: Async_mode,
    }
  ) {
    this.fn = opts.fn;
    this.receiver = opts.receiver ?? null;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    const prefix = this.receiver ? `${this.receiver}.` : "";
    return [null, () => `${prefix}${this.fn}(${args.filter(is_not_null).map(call).join(", ")})`];
  }
}

// just returns / assigns the identifier
export class LocalAccessCall {
  readonly fn: string;
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      fn: string,
      async_mode: Async_mode,
    }
  ) {
    this.fn = opts.fn;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    if (args.length > 0) {
      return [null, () => `(${this.fn} = ${args.filter(is_not_null).map(call).join(",")})`];
    } else {
      return [null, () => this.fn];
    }
  }
}

// emits a direct JS operator for n-ary application (e.g., +, &&, ||)
// optionally wraps the whole expression (e.g., "!" prefix)
export class NaryOperatorCall {
  readonly operator: string;
  readonly is_async: boolean = false;
  readonly wrapper: string | null = null;
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      operator: string,
      is_async?: boolean,
      wrapper?: string | null,
      async_mode: Async_mode,
    }
  ) {
    this.operator = opts.operator;
    this.is_async = opts.is_async ?? false;
    this.wrapper = opts.wrapper ?? null;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    return [null, () => {
      const expr = `(${args.filter(is_not_null).map(call).join(` ${this.operator} `)})`;
      if (this.wrapper) {
        return `${this.wrapper}${expr}`;
      } else {
        return expr;
      }
    }]
  }
}

// emits chained comparisons: a < b && b < c
export class ChainedComparisonCall {
  readonly operator: string;
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      operator: string,
      async_mode: Async_mode,
    }
  ) {
    this.operator = opts.operator;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    const args_real = args.filter(is_not_null);

    if (args_real.length < 2) {
      return [null, () => "true"];
    }

    return [null, () => 
      map_adjacent(args_real, (a, b) => 
        `(${a()} ${this.operator} ${b()})`
      ).join(" && ")
    ];
  }
}

// new Constructor(a, b)
export class NewCall {
  readonly constructorName: string;
  readonly async_mode: Async_mode;

  // only used for classes we define ourselves
  implementation: string | null = null;

  constructor(
    opts: {
      constructor: string,
      async_mode: Async_mode,
    }
  ) {
    this.constructorName = opts.constructor;
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    return [null, () => `(new ${this.constructorName}(${args.filter(is_not_null).map(call).join(", ")}))`];
  }
}

// obj[index]   or   obj[index] = value
export class IndexAccessCall {
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      async_mode: Async_mode,
    }
  ) {
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    const args_real = args.filter(is_not_null);

    const receiver = args_real[0];
    const index = args_real[1];
    const value = args_real[2];

    if (receiver === undefined || index === undefined) {
      return [null, () => `${FORCE_SYNTAX_ERROR} /* invalid IndexAccessCall: \`${receiver?.() ?? "invalid"}[${index?.() ?? "invalid"}] = ${value?.() ?? "invalid"}\` */`];
    }

    if (value !== undefined) {
      return [null, () => `(${receiver()}[${index()}] = ${value()})`];
    } else {
      return [() => `if (${receiver()}[${index()}] === undefined) { throw new Error("sparse array") }`, () => `${receiver()}[${index()}]`];
    }
  }
}

// fn(args...) where the first arg is the callable
export class CallableInvokeCall {
  readonly async_mode: Async_mode;
  constructor(
    opts: {
      async_mode: Async_mode,
    }
  ) {
    this.async_mode = opts.async_mode;
  }

  compile(args: Emission_item[]): [Emission_item, Emission_item] {
    const args_real = args.filter(is_not_null);
    const fn = args_real[0];
    const params = args_real.slice(1);
    if (fn === undefined) {
      return [null, () => `${FORCE_SYNTAX_ERROR} /* invalid CallableInvokeCall: \`invalid(${params.map(call).join(", ")})\` */`];
    }
    return [null, () => `${fn()}(${params.map(call).join(", ")})`];
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

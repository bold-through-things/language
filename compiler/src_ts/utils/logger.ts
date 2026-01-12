// utils/logger.ts

import { Macro_context } from "../core/macro_registry.ts";

class SmartIndentContext {
  tag: string;
  message: string;
  indentLevel: number;
  hadOutput: boolean = false;
  headerPrinted: boolean = false;

  constructor(tag: string, message: string, indentLevel: number) {
    this.tag = tag;
    this.message = message;
    this.indentLevel = indentLevel;
  }
}

export const LOGGER_NO_CONTEXT = Symbol("LOGGER_NO_CONTEXT");

export class Logger {
  private output: WritableStreamDefaultWriter<Uint8Array>;
  private indentLevel: number = 0;
  private contextStack: SmartIndentContext[] = [];

  private encoder = new TextEncoder();

  public log_spec: Log_spec = { kind: "and", items: [] };

  constructor(output = Deno.stderr.writable.getWriter()) {
    this.output = output;
  }

  log(ctx: Macro_context | typeof LOGGER_NO_CONTEXT, tag: string, message: string): void {
    if (!this.should_log(ctx, tag)) {
      return;
    }

    this.ensureHeadersPrinted();

    for (const c of this.contextStack) {
      c.hadOutput = true;
    }

    const indent = "  ".repeat(this.indentLevel);
    const line = `${indent}[${tag}] ${message}\n`;
    this.output.write(this.encoder.encode(line));
  }

  private ensureHeadersPrinted(): void {
    for (const c of this.contextStack) {
      if (c.headerPrinted) {
        continue;
      }
      const indent = "  ".repeat(c.indentLevel);
      const line = `${indent}[${c.tag}] begin: ${c.message}\n`;
      this.output.write(this.encoder.encode(line));
      c.headerPrinted = true;
    }
  }

  indent<T>(ctx: Macro_context | typeof LOGGER_NO_CONTEXT, tag: string, message: string, fn: () => T): T {
    if (!this.should_log(ctx, tag)) {
      return fn();
    }

    const context = new SmartIndentContext(tag, message, this.indentLevel);

    this.contextStack.push(context);
    this.indentLevel += 1;

    try {
      return fn();
    } finally {
      const idx = this.contextStack.indexOf(context);
      if (idx !== -1) {
        this.contextStack.splice(idx, 1);
      }
      this.indentLevel -= 1;

      if (context.hadOutput && context.headerPrinted) {
        const indent = "  ".repeat(this.indentLevel);
        const line = `${indent}[${tag}] done: ${message}\n`;
        this.output.write(this.encoder.encode(line));
      }
    }
  }

  should_log(ctx: Macro_context | typeof LOGGER_NO_CONTEXT, tag: string): boolean {
    function matches_spec(spec: Log_spec): boolean {
      switch (spec.kind) {
        case "and":
          return spec.items.every(matches_spec);
        case "or":
          return spec.items.some(matches_spec);
        case "tags":
          return spec.tags.includes(tag);
        case "lines": {
          if (ctx === LOGGER_NO_CONTEXT) {
            return false;
          }
          const line = ctx.node.pos?.line ?? 0;
          return spec.lines.includes(line);
        }
      }
    }
    return matches_spec(this.log_spec);
  }
}

// global logger (constant + accessor)
export const default_logger = new Logger();

export type Log_spec = {
  kind: "and",
  items: Log_spec[],
} | {
  kind: "or",
  items: Log_spec[],
} | {
  kind: "tags",
  tags: string[],
} | {
  kind: "lines",
  lines: number[],
};

export function configureLoggerFromArgs(spec: Log_spec | null): void {
  if (spec == null) {
    // disable all logging by default
    default_logger.log_spec = { kind: "and", items: [] };
  } else {
    default_logger.log_spec = spec;
  }
}

// utils/logger.ts

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

export class Logger {
  private output: WritableStreamDefaultWriter<Uint8Array>;
  // null => all tags enabled; empty set => all disabled
  private enabledTags: Set<string> | null = null;
  private indentLevel: number = 0;
  private contextStack: SmartIndentContext[] = [];

  private encoder = new TextEncoder();

  constructor(output = Deno.stderr.writable.getWriter()) {
    this.output = output;
  }

  enableTags(tags: Set<string>): void {
    this.enabledTags = tags;
  }

  enableAllTags(): void {
    this.enabledTags = null;
  }

  isTagEnabled(tag: string): boolean {
    if (this.enabledTags === null) {
      return true;
    }
    return this.enabledTags.has(tag);
  }

  log(tag: string, message: string): void {
    if (!this.isTagEnabled(tag)) {
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

  indent<T>(tag: string, message: string, fn: () => T): T {
    if (!this.isTagEnabled(tag)) {
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

  // Convenience tag methods
  debug(message: string): void {
    this.log("debug", message);
  }

  typecheck(message: string): void {
    this.log("typecheck", message);
  }

  macro(message: string): void {
    this.log("macro", message);
  }

  compile(message: string): void {
    this.log("compile", message);
  }

  codegen(message: string): void {
    this.log("codegen", message);
  }

  parse(message: string): void {
    this.log("parse", message);
  }

  registry(message: string): void {
    this.log("registry", message);
  }

  metadata_debug(message: string): void {
    this.log("metadata_debug", message);
  }
}

// global logger (constant + accessor)
export const default_logger = new Logger();

export function configureLoggerFromArgs(logTags: string | null): void {
  if (logTags == null) {
    // disable all logging by default (empty set)
    default_logger.enableTags(new Set());
  } else {
    const tags = logTags
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);
    default_logger.enableTags(new Set(tags));
  }
}

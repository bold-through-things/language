// utils/strutil.ts

export type Nested = (string | Nested)[];

// Minimal interface to match Crystal's OutIO usage in Joiner
export interface OutIO {
  write(s: string): number | void;
}

// cut(line, sep) => [before, after]
export function cut(line: string, sep: string): [string, string] {
  const idx = line.indexOf(sep);
  if (idx === -1) {
    return [line, ""];
  }
  const left = line.slice(0, idx);
  const right = line.slice(idx + sep.length) ?? "";
  return [left, right];
}

// extract_indent(line, max?) => [restOfLine, indentCount]
export function extractIndent(
  line: string,
  max?: number,
): [string, number] {
  let indent = 0;
  let s = line;

  while (s.startsWith("\t") && (max === undefined || indent < max)) {
    indent += 1;
    s = s.slice(1);
  }

  return [s, indent];
}

// join_nested(data, indent = 2, level = 0)
export function joinNested(
  data: Nested,
  indent: number = 2,
  level: number = 0,
): string {
  const stringify = (x: string | Nested): string => {
    if (typeof x === "string") {
      return x;
    } else {
      return joinNested(x, indent, level + 1);
    }
  };

  const s = data.map((item) => stringify(item)).join(" ");
  const prefix = " ".repeat(indent * level);

  return s
    .split("\n")
    .map((ln) => `${prefix}${ln}`)
    .join("\n");
}

// Joiner: emits @sep between uses onto @out
export class Joiner {
  private out: OutIO;
  private sep: string;
  private first: boolean = true;

  constructor(out: OutIO, sep: string) {
    this.out = out;
    this.sep = sep;
  }

  use(fn: () => void): void {
    if (!this.first) {
      this.out.write(this.sep);
    }
    this.first = false;
    fn();
  }
}

// IndentedStringIO

export class IndentedStringIO {
  private buf: string[] = [];
  private indentStr: string;
  private indentLevel: number = 0;
  private atLineStart: boolean = true;

  constructor(indent: string = "    ") {
    this.indentStr = indent;
  }

  // Crystal's << returns self
  append(str: string): this {
    this.write(str);
    return this;
  }

  write(s: string): number {
    // emulate each_line(chomp: false) by splitting but keeping the \n
    const lines = s.split(/(?<=\n)/);

    for (const line of lines) {
      if (this.atLineStart && line.trim().length > 0) {
        this.buf.push(this.indentStr.repeat(this.indentLevel));
      }
      this.buf.push(line);
      this.atLineStart = line.endsWith("\n");
    }

    return s.length;
  }

  writeline(s: string = ""): void {
    if (this.atLineStart) {
      this.buf.push(this.indentStr.repeat(this.indentLevel));
    }
    this.buf.push(s);
    this.buf.push("\n");
    this.atLineStart = true;
  }

  indent(levels: number = 1): void {
    this.indentLevel += levels;
  }

  dedent(levels: number = 1): void {
    this.indentLevel = Math.max(0, this.indentLevel - levels);
  }

  gets_to_end(): string {
    return this.buf.join("");
  }

  reset(): void {
    this.buf = [];
    this.indentLevel = 0;
    this.atLineStart = true;
  }

  to_string(): string {
    return this.gets_to_end();
  }

  with_indent(fn: (io: IndentedStringIO) => void): void {
    this.indent();
    try {
      fn(this);
    } finally {
      this.dedent();
    }
  }
}

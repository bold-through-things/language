// utils/strutil.ts

import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";

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

export function prefix_removed(line: string, prefix: string): string | null {
  if (line.startsWith(prefix)) {
    return line.slice(prefix.length);
  } else {
    return null;
  }
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
    this.write(s + "\n");
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

  // so fucking stupid! fuck your language vro
  async with_indent_a(fn: (io: IndentedStringIO) => Promise<void>): Promise<void> {
    this.indent();
    try {
      await fn(this);
    } finally {
      this.dedent();
    }
  }
};

export type Emission_item = (() => string) | null

let is_counting_users = false; // TODO i don't enjoy this global

/*
so the reason that we need this... how do i explain

if you have something like

```
let a = b; // would have been pulled by c
let c = a + 1; // would have been pulled by d
let d = c * 2;
```

because we don't emit the statements (`a` and `c` are only used here once) they're "pulled" by `d`
but `d` is never pulled! so it won't pull the other two

unless we afterwards "rewind" and walk these backwards

so we pull on `d` which pulls on `c` which pulls on `a`
we try to pull on `c` but it won't pull since we already pulled it (see `if (users == 0)` further down)
*/
let is_rewinding = false;
let rewind_counting_users: (() => void)[] = []; // TODO bad name

export function count_users(impl: () => void) {
  is_counting_users = true;
  is_rewinding = false;
  rewind_counting_users = [];
  try {
    impl();
  } finally {
    is_rewinding = true;
    try {
      rewind_counting_users.reverse();
      for (const fn of rewind_counting_users) {
        fn();
      }
    } finally {
      is_rewinding = false;
      rewind_counting_users = [];
    }

    is_counting_users = false;
  }
}

export function statement_expr(expr: Exclude<Emission_item, null>, intermediate_result: string): [Emission_item, Emission_item] { 
  let users = 0;
  return [
    () => // we define
    {
      if (is_counting_users) {
        // // yes this means the code will not be valid
        // // no it doesn't matter here
        rewind_counting_users.push(() => {
          if (users == 0) {
            expr();
          }
        });
        return "";
      }
      if (users < 1) {
        return `${expr()};`;
      } 
      if (users > 1) {
        return `const ${intermediate_result} = ${expr()};`;
      } 
      return ``;
    },
    () => // we use
    {
      if (is_counting_users) {
        users += 1;
        return `${expr()}`;
      }
      if (users > 1) {
        return `${intermediate_result}`;
      } 
      if (users == 1) {
        return `${expr()}`;
      }
      throw new Error(`statement_expr: used but not used ${intermediate_result}`);
      // return `${FORCE_SYNTAX_ERROR} /* ${intermediate_result} unused but also used (?) */`;
    }
  ]
}

export const PARENTHESIS = (s: string) => `(${s})`;
export const BRACES = (s: string) => `{${s}}`;
export const BRACKETS = (s: string) => `[${s}]`;

type Statement_block = Emission_item[] & { keyword: string | null; wrap: (s: string) => string };
export function statement_block(keyword: string | null = null, wrap: (s: string) => string = BRACES): Statement_block {
  return Object.assign([], {keyword, wrap});
}

export function statement_blocks(...blocks: Statement_block[]) {
  const compile = () => {
    const result = new IndentedStringIO();

    const block_joiner = new Joiner(result, " ");
    for (const block of compile.blocks) {
      block_joiner.use(() => {
        if (block.keyword) {
          result.write(`${block.keyword} `);
        }
        const indented = new IndentedStringIO();
        indented.with_indent(() => {
          for (const stmt of block) {
            if (stmt !== null) {
              const stmt_str = stmt();
              if (stmt_str.trim().length > 0) {
                indented.writeline();
                indented.write(stmt_str);
              }
            }
          }
        });
        let inner = indented.to_string(); // TODO this is so inefficient though
        if (!inner.endsWith("\n")) {
          inner = inner + "\n";
        }
        result.write(block.wrap(inner));
      });
    }
    result.writeline();

    return result.to_string();
  };
  compile.blocks = blocks;
  const iter = function* () {
    for (const block of compile.blocks) {
      yield block;
    }
  }
  compile[Symbol.iterator] = iter;
  return compile;
}

export function statement_local(var_name: string, expr: Emission_item | null): Emission_item {
  return () => {
    if (expr !== null) {
      return `let ${var_name} = ${expr()};`;
    } else {
      return `let ${var_name};`;
    }
  };
}

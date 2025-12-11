// ------------------------------------------------------------
// cursor

import { from_entries, keys } from "./utils.ts";

// ------------------------------------------------------------
class Cursor {
  constructor(public tokens: string[], public i: number = 0) {}

  has(): boolean {
    return this.i < this.tokens.length;
  }

  next(): string {
    if (!this.has()) {
      throw new Error("Unexpected end of tokens");
    }
    return this.tokens[this.i++] as string /* already checked above */;
  }

  peek(): string {
    if (!this.has()) {
      throw new Error("Unexpected end of tokens");
    }
    return this.tokens[this.i] as string /* already checked above */;
  }
}

// ------------------------------------------------------------
// validator
// ------------------------------------------------------------
export type Validator = (arg: string) => Error | null;

// ------------------------------------------------------------
// parse node
// ------------------------------------------------------------
export interface ParsedClause<T extends ClauseSpec> {
  value: string[];
  children: T["subParser"] extends Schema
  ? {
      [K in keyof T["subParser"]]: ParsedClause<T["subParser"][K]>[]
    }
  : null;
}

// ------------------------------------------------------------
// schema
// ------------------------------------------------------------
export type Schema = { 
    [keyword: string]: ClauseSpec & { subParser?: Schema }
};

type ClauseSpecAny = ClauseSpec & { subParser: Schema };

// ------------------------------------------------------------
// base class
// ------------------------------------------------------------
abstract class ClauseSpec {
  constructor(
    public argumentValidators: Validator[] = [],
    public subParser?: Schema
  ) {}

  validateArgs(args: string[]): void {
    if (this.argumentValidators.length === 0) {
      return;
    }
    for (let i = 0; i < args.length; i++) {
      const v = this.argumentValidators[i % this.argumentValidators.length];
      if (v === undefined) {
        throw new Error(`undefined ${i} validator`);
      }
      const arg = args[i]
      if (arg === undefined) {
        throw new Error(`undefined ${i} argument`);
      }
      const err = v(arg);
      if (err) {
        throw err;
      }
    }
  }

  abstract parse(cursor: Cursor, keywordToken: string): string[];
}

// ------------------------------------------------------------
// fixed count
// ------------------------------------------------------------
export class Fixed extends ClauseSpec {
  constructor(
    public count: number,
    validators?: Validator[],
    sub?: Schema
  ) {
    super(validators, sub);
  }

  parse(cursor: Cursor): string[] {
    const out: string[] = [];
    for (let i = 0; i < this.count; i++) {
      if (!cursor.has()) {
        throw new Error("Not enough arguments for fixed clause");
      }
      out.push(cursor.next());
    }
    return out;
  }
}

// ------------------------------------------------------------
// varargs / heredoc unified
// ------------------------------------------------------------
export class VarOrTerminated extends ClauseSpec {
  constructor(
    public setTerminatorString: string | null = null,
    validators?: Validator[],
    sub?: Schema
  ) {
    super(validators, sub);
  }

  parse(cursor: Cursor, keywordToken: string): string[] {
    // heredoc mode?
    if (this.setTerminatorString !== null && keywordToken.includes(this.setTerminatorString)) {
      const parts = keywordToken.split(this.setTerminatorString, 2);
      if (parts[0] === undefined || parts[1] === undefined || parts[1].length === 0) {
        throw new Error("Invalid terminator assignment: " + keywordToken);
      }
      const terminator = parts[1];

      const out: string[] = [];
      while (cursor.has() && cursor.peek() !== terminator) {
        out.push(cursor.next());
      }

      if (!cursor.has()) {
        throw new Error("Terminator not found: " + terminator);
      }

      cursor.next(); // eat terminator
      return out;
    }

    // plain varargs
    const out: string[] = [];
    while (cursor.has()) {
      out.push(cursor.next());
    }
    return out;
  }
}

// ------------------------------------------------------------
// parser
// ------------------------------------------------------------
export function parseTokens<T extends Schema>(tokens: string[], schema: T): { [K in keyof T]: ParsedClause<T[K]>[] } {
  const cursor = new Cursor(tokens);
  const result = from_entries(
    keys(schema).map((k) => [k, [] as ParsedClause<ClauseSpec>[]])
  );

  while (cursor.has()) {
    const token = cursor.next();

    let spec = schema[token];
    let keyword = token;
    if (!spec) {
      for (const maybeKeyword in schema) {
        const maybeSpec = schema[maybeKeyword];
        if (maybeSpec instanceof VarOrTerminated) {
          if (maybeSpec.setTerminatorString != null && token.startsWith(maybeKeyword + maybeSpec.setTerminatorString)) {
            spec = maybeSpec;
            keyword = maybeKeyword;
            break;
          }
        }
      }
    }

    if (!spec) {
      throw new Error("Unknown clause: " + token);
    }


    const args = spec.parse(cursor, token);
    spec.validateArgs(args);

    const node: ParsedClause<ClauseSpec> | ParsedClause<ClauseSpecAny> = 
      spec.subParser === undefined ? 
    {
      value: args,
      children: null
    } : {
      value: args,
      children: parseTokens(args, spec.subParser)
    };

    const rkw = result[keyword];

    if (rkw === undefined) {
      throw new Error("internal error: undefined rkw for " + keyword);
    }

    rkw.push(node);
  }

  return result as ReturnType<typeof parseTokens<T>>;
}

// TODO this should be autotest yes?
if (import.meta.main) {

  // ------------------------------------------------------------
  // validators
  // ------------------------------------------------------------
  const isInt: Validator = (x) => {
    if (/^-?\d+$/.test(x)) {
      return null;
    }
    return new Error("expected integer, got: " + x);
  };

  const exists: Validator = (x) => {
    if (x.length > 0) {
      return null;
    }
    return new Error("empty string not allowed");
  };

  // ------------------------------------------------------------
  // subparser example
  // ------------------------------------------------------------
  const filterSchema: Schema = {
    "filter_by_ext": new Fixed(1, [exists]),
    "move": new Fixed(1, [exists])
  };

  // ------------------------------------------------------------
  // top-level schema
  // ------------------------------------------------------------
  const schema = {
    "copy": new Fixed(2, [exists]),
    "from": new Fixed(1, [exists]),
    "to": new Fixed(1, [exists]),
    "each": new VarOrTerminated("=", [exists]),                    // varargs or heredoc
    "zip": new Fixed(0),                                           // no args
    "run": new VarOrTerminated(null, [], filterSchema),            // run <subsyntax>
    "add": new Fixed(2, [isInt, isInt])                             // two integers
  };

  // ------------------------------------------------------------
  // example command
  // ------------------------------------------------------------
  const tokens = [
    "copy", "fileA", "fileB",
    "each=END", "one", "two", "three", "END",
    "run", "filter_by_ext", "md", "move", "target"
  ];

  // ------------------------------------------------------------
  // run parser
  // ------------------------------------------------------------
  const tree = parseTokens(tokens, schema);

  // ------------------------------------------------------------
  // inspect result
  // ------------------------------------------------------------
  console.log(JSON.stringify(tree, null, 2));

  const tokens2 = [
    "add", "10", "20abc"
  ]

  try {
    const tree2 = parseTokens(tokens2, schema);
    console.log(JSON.stringify(tree2, null, 2));
  } catch (e) {
    console.error("Error during parsing:", e);
  }

}

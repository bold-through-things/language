import { from_entries, keys } from "./utils.ts";

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

export type Validator = (arg: string) => Error | null;

export interface Parsed_clause<T extends Clause_spec> {
  value: string[];
  children: T["subParser"] extends Schema
  ? {
      [K in keyof T["subParser"]]: Parsed_clause<T["subParser"][K]>[]
    }
  : null;
}

export type Schema = { 
    [keyword: string]: Clause_spec & { subParser?: Schema }
};

type Clause_spec_any = Clause_spec & { subParser: Schema };

abstract class Clause_spec {
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

export class Fixed extends Clause_spec {
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

export class VarOrTerminated extends Clause_spec {
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

export function parse_tokens<T extends Schema>(tokens: string[], schema: T): { [K in keyof T]: Parsed_clause<T[K]>[] } {
  const cursor = new Cursor(tokens);
  const result = from_entries(
    keys(schema).map((k) => [k, [] as Parsed_clause<Clause_spec>[]])
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

    const node: Parsed_clause<Clause_spec> | Parsed_clause<Clause_spec_any> = 
      spec.subParser === undefined ? 
    {
      value: args,
      children: null
    } : {
      value: args,
      children: parse_tokens(args, spec.subParser)
    };

    const rkw = result[keyword];

    if (rkw === undefined) {
      throw new Error("internal error: undefined rkw for " + keyword);
    }

    rkw.push(node);
  }

  return result as ReturnType<typeof parse_tokens<T>>;
}

type Has_subparsers<T extends Schema> = {
  [K in keyof T]: T[K] extends { subParser: Schema } ? T[K]: never
}
  
export class Arg_interpreter<T extends Schema> {
  constructor(public parsed: Parsed_tree<T>) {
    // ...
  }

  focus<T_subparsers extends Has_subparsers<T>>(clause: keyof Parsed_tree<T> & keyof T_subparsers): Arg_interpreter<T_subparsers[typeof clause]["subParser"]> {
    const entries = this.parsed[clause];
    if (entries === undefined || entries[0] === undefined) {
      throw new Error(`clause expected \`${clause}\``);
    }
    if (entries.length > 1) {
      throw new Error(`only one expected \`${clause}\``);
    }
    const subtree = entries[0].children;
    if (subtree === null) {
      // should never happen
      throw new Error("never");
    }
    return new Arg_interpreter<T_subparsers[typeof clause]["subParser"]>(subtree);
  }

  *focus_each<T_subparsers extends Has_subparsers<T>>(clause: keyof Parsed_tree<T> & keyof T_subparsers): Generator<Arg_interpreter<T_subparsers[typeof clause]["subParser"]>> {
    const entries = this.parsed[clause];
    if (entries === undefined) {
      return;
    }
    for (const entry of entries) {
      const subtree = entry.children;
      if (subtree === null) {
        // should never happen
        throw new Error("never");
      }
      yield new Arg_interpreter<T_subparsers[typeof clause]["subParser"]>(subtree);
    }
  }

  *each(clause: keyof Parsed_tree<T>): Generator<string> {
    const entries = this.parsed[clause];
    if (entries === undefined) {
      return;
    }
    for (const entry of entries) {
      if (entry.value[0] === undefined) {
        throw new Error(`${clause} is missing value`);
      }
      yield entry.value[0];
    }
  }

  has(clause: keyof Parsed_tree<T>) {
    return (this.parsed[clause]?.length ?? 0) > 0;
  }

  required(clause: keyof Parsed_tree<T>): string {
    const entries = this.parsed[clause] ?? [];
    if (entries[0] === undefined) {
      throw new Error(`${clause} required here`);
    }
    if (entries.length > 1) {
      throw new Error(`${clause} provided many times`);
    }
    const entry = entries[0];
    if (entry.value[0] === undefined) {
      // implies invalid schema, we should probably just validate the schema here then
      throw new Error(`${clause} is missing value`);
    }
    return entry.value[0];
  }

  optional(clause: keyof Parsed_tree<T>): string | null {
    const entries = this.parsed[clause] ?? [];
    if (entries[0] === undefined) {
      return null;
    }
    if (entries.length > 1) {
      throw new Error(`clause ${clause} provided multiple times`);
    }
    const entry = entries[0];
    return entry.value[0] ?? null;
  }
}

type String_keys<T> = keyof T & string;

type Parsed_tree<T extends Schema> = {
  [K in String_keys<T>]: Parsed_clause<T[K]>[]
};

// TODO this should be autotest yes?
if (import.meta.main) {
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

  const filterSchema: Schema = {
    "filter_by_ext": new Fixed(1, [exists]),
    "move": new Fixed(1, [exists])
  };

  const schema = {
    "copy": new Fixed(2, [exists]),
    "from": new Fixed(1, [exists]),
    "to": new Fixed(1, [exists]),
    "each": new VarOrTerminated("=", [exists]),
    "zip": new Fixed(0),
    "run": new VarOrTerminated(null, [], filterSchema),
    "add": new Fixed(2, [isInt, isInt])
  };

  const tokens = [
    "copy", "fileA", "fileB",
    "each=END", "one", "two", "three", "END",
    "run", "filter_by_ext", "md", "move", "target"
  ];


  const tree = parse_tokens(tokens, schema);

  console["log"](JSON.stringify(tree, null, 2));

  const tokens2 = [
    "add", "10", "20abc"
  ]

  try {
    const tree2 = parse_tokens(tokens2, schema);
    console["log"](JSON.stringify(tree2, null, 2));
  } catch (e) {
    console.error("Error during parsing:", e);
  }

}

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

export interface ParsedClause<T extends ClauseSpec> {
  value: string[];
  children: T["subParser"] extends Schema
  ? {
      [K in keyof T["subParser"]]: ParsedClause<T["subParser"][K]>[]
    }
  : null;
}

export type Schema = { 
    [keyword: string]: ClauseSpec & { subParser?: Schema }
};

type ClauseSpecAny = ClauseSpec & { subParser: Schema };

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

export function parse_tokens<T extends Schema>(tokens: string[], schema: T): { [K in keyof T]: ParsedClause<T[K]>[] } {
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

type Rule<T_result, T_schema extends Schema> = (current: T_result, parsed: Parsed_tree<T_schema>) => T_result;

type String_keys<T> = keyof T & string;

type Parsed_tree<T extends Schema> = {
  [K in String_keys<T>]: ParsedClause<T[K]>[]
};

type Has_field<K extends string, V> = { [P in K]: V };

type Undefined_is_never<T> = T extends undefined ? never : T;

export class Rules<T_result>{
  required<T_key extends string, T_schema extends Schema>(clause: keyof Parsed_tree<T_schema>, field: T_key) {
    return (current: T_result & Has_field<T_key, string>, parsed: Parsed_tree<T_schema>): T_result => {
      const entries = parsed[clause];
      if (entries === undefined || entries[0] === undefined) {
        throw new Error(`clause expected \`${clause}\``);
      }
      if (entries.length > 1) {
        throw new Error(`only one expected \`${clause}\``);
      }
      ;((current: Has_field<T_key, string>) => { // "TypeScript is a good language"
        current[field] = entries[0].value.join("");
      })(current);
      return current;
    }
  }
  optional<T_key extends string, T_schema extends Schema>(clause: keyof Parsed_tree<T_schema>, field: T_key) {
    return (current: T_result & Has_field<T_key, string | null>, parsed: Parsed_tree<T_schema>): T_result => {
      const entries = parsed[clause];
      if (entries !== undefined && entries[0] !== undefined) {
        if (entries.length > 1) {
          throw new Error(`only one expected \`${clause}\``);
        }
        ;((current: Has_field<T_key, string | null>) => { // "TypeScript is a good language"
          current[field] = entries[0].value.join("");
        })(current);
      }
      return current;
    }
  }
  optional_many<T_key extends string, T_schema extends Schema>(clause: keyof Parsed_tree<T_schema>, field: T_key) {
    return (current: T_result & Has_field<T_key, string[]>, parsed: Parsed_tree<T_schema>): T_result => {
      const entries = parsed[clause];
      if (entries !== undefined) {
        ;((current: Has_field<T_key, string[]>) => { // "TypeScript is a good language"
          current[field] = entries.flatMap(e => e.value);
        })(current);
      }
      return current;
    }
  }
  flag<T_key extends string, T_schema extends Schema, T_flag>(clause: keyof Parsed_tree<T_schema>, field: T_key, remap: (v: boolean) => T_flag) {
    return (current: T_result & Has_field<T_key, T_flag>, parsed: Parsed_tree<T_schema>): T_result => {
      const entries = parsed[clause];
      ;((current: Has_field<T_key, T_flag>) => { // "TypeScript is a good language"
        current[field] = remap(entries !== undefined && entries.length > 0);
      })(current);
      return current;
    }
  }
  subtree<T_key extends string, T_schema extends Schema & { [P in T_key]: { subParser: T_sub_schema } }, T_sub_schema extends Schema>(clause: T_key, rules: Rule<T_result, T_sub_schema>[]) {
    return (current: T_result, parsed: Parsed_tree<T_schema>): T_result => {
      const entries = parsed[clause];
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
      return interpret_tree({
        initial: current,
        tree: subtree,
        rules
      });
    }
  }
  mode_switch<T_new_result, T_key extends string, T_schema extends Schema>(clause: T_key, new_v: () => T_new_result) {
    return (current: T_result, parsed: Parsed_tree<T_schema>): T_result | T_new_result => {
      const entries = parsed[clause];
      if (entries === undefined || entries[0] === undefined) {
        return current;
      }
      if (entries.length > 1) {
        throw new Error(`only one expected \`${clause}\``);
      }
      return new_v();
    }
  }
}

export function with_guard<T_result_generic, T_result_specific extends T_result_generic, T_schema extends Schema>(
  guard: (current: T_result_generic, tree: Parsed_tree<T_schema>) => boolean,
  mapper: Rule<T_result_specific, T_schema>
): Rule<T_result_generic, T_schema> {
  return (current: T_result_generic, tree: Parsed_tree<T_schema>): T_result_generic => {
    if (guard(current, tree)) {
      return mapper(current as T_result_specific, tree);
    }
    return current;
  };
}

export function interpret_tree<T_schema extends Schema, T_result extends unknown>(
  opts: {
    initial: T_result
    tree: Parsed_tree<T_schema>,
    rules: Rule<T_result, T_schema>[]
  }
): T_result {
  let result = opts.initial;
  for (const rule of opts.rules) {
    result = rule(result, opts.tree);
  }
  return result;
}

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

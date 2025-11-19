// utils/command_parser.ts

// A tiny, generic parser for space-separated command syntax.
// It maps command words to small handlers that mutate a result record.

export type ResultValue = string | string[] | boolean;
export type ResultHash = Record<string, ResultValue>;

export abstract class Command {
  abstract execute(
    tokens: string[],
    pos: number,
    result: ResultHash,
  ): number;
}

// Sets a field to either `true` (flag) or to the next token.
export class SetFieldCommand extends Command {
  readonly field_name: string;
  readonly takes_argument: boolean;

  constructor(field_name: string, takes_argument: boolean = true) {
    super();
    this.field_name = field_name;
    this.takes_argument = takes_argument;
  }

  execute(tokens: string[], pos: number, result: ResultHash): number {
    if (!this.takes_argument) {
      result[this.field_name] = true;
      return pos;
    }
    if (pos >= tokens.length) {
      return pos;
    }
    result[this.field_name] = tokens[pos];
    return pos + 1;
  }
}

// Appends the next token into a list.
export class AppendToListCommand extends Command {
  readonly field_name: string;

  constructor(field_name: string) {
    super();
    this.field_name = field_name;
  }

  execute(tokens: string[], pos: number, result: ResultHash): number {
    if (pos >= tokens.length) {
      return pos;
    }
    const list = Array.isArray(result[this.field_name])
      ? (result[this.field_name] as string[])
      : [];
    list.push(tokens[pos]);
    result[this.field_name] = list;
    return pos + 1;
  }
}

// Consumes all remaining tokens into a list.
export class ConsumeRestCommand extends Command {
  readonly field_name: string;

  constructor(field_name: string) {
    super();
    this.field_name = field_name;
  }

  execute(tokens: string[], pos: number, result: ResultHash): number {
    result[this.field_name] = tokens.slice(pos);
    return tokens.length;
  }
}

// Generic parser.
export class CommandParser {
  private tokens: string[];
  private commands: Record<string, Command>;
  private default_fields: ResultHash;

  constructor(
    content: string,
    commands: Record<string, Command>,
    default_fields?: ResultHash,
  ) {
    this.tokens = content.split(/\s+/).filter((x) => x.length > 0);
    this.commands = commands;
    this.default_fields = default_fields ? { ...default_fields } : {};
  }

  parse(): ResultHash | null {
    const result: ResultHash = { ...this.default_fields };
    let pos = 0;

    // If the first token isn't a command, treat it as the main argument.
    if (this.tokens.length > 0 && !(this.tokens[0] in this.commands)) {
      result["main"] = this.tokens[0];
      pos = 1;
    }

    while (pos < this.tokens.length) {
      const token = this.tokens[pos];
      const cmd = this.commands[token];
      if (!cmd) {
        return null;
      }
      pos = cmd.execute(this.tokens, pos + 1, result);
    }

    return result;
  }
}

// Pre-built command sets.

export function create_type_commands(): Record<string, Command> {
  return {
    "for": new SetFieldCommand("parameter_name"),
    "is": new SetFieldCommand("base_type"),
    "extends": new AppendToListCommand("constraints"),
  };
}

export function create_pipeline_commands(): Record<string, Command> {
  return {
    "do": new SetFieldCommand("operation"),
    "get": new SetFieldCommand("operation"),
    "set": new SetFieldCommand("operation"),
    "chain": new ConsumeRestCommand("chain_steps"),
    "as": new SetFieldCommand("bind_name"),
    "into": new SetFieldCommand("assign_name"),
    "the": new SetFieldCommand("source_variable"),
    "from": new SetFieldCommand("source_variable"),
    "in": new SetFieldCommand("source_variable"),
  };
}

// macros/then_macro.ts

import {
  Macro_preprocess_provider,
  MacroContext,
} from "../core/macro_registry.ts";
import { Args, Node, Position } from "../core/node.ts";
import { cut } from "../utils/strutil.ts";
import {
  get_single_arg,
} from "../utils/common_utils.ts";
import {
  Upwalker,
  LastThenSearchStrategy,
} from "../pipeline/local_lookup.ts";
import {
  seek_all_child_macros,
  seek_child_macro,
} from "../pipeline/steps/utils.ts";

// --------------------------------------------------------
// Command primitives
// --------------------------------------------------------

abstract class ThenCommand {
  abstract execute(
    tokens: string[],
    pos: number,
    result: ParsedThen,
  ): number;
}

class DoCommand extends ThenCommand {
  execute(tokens: string[], pos: number, result: ParsedThen): number {
    if (pos >= tokens.length) {
      return pos;
    }
    result.operation_command = "do";
    result.operation_args.push(tokens[pos]);
    return pos + 1;
  }
}

class ChainCommand extends ThenCommand {
  execute(tokens: string[], pos: number, result: ParsedThen): number {
    result.operation_command = "chain";
    result.operation_args.push(...tokens.slice(pos));
    return tokens.length;
  }
}

class AsCommand extends ThenCommand {
  execute(tokens: string[], pos: number, result: ParsedThen): number {
    if (pos >= tokens.length) {
      return pos;
    }
    result.bind_name = tokens[pos];
    return pos + 1;
  }
}

class IntoCommand extends ThenCommand {
  execute(tokens: string[], pos: number, result: ParsedThen): number {
    if (pos >= tokens.length) {
      return pos;
    }
    result.assign_name = tokens[pos];
    return pos + 1;
  }
}

class SourceCommand extends ThenCommand {
  execute(tokens: string[], pos: number, result: ParsedThen): number {
    if (pos >= tokens.length) {
      return pos;
    }
    result.source_variable = tokens[pos];
    return pos + 1;
  }
}

// --------------------------------------------------------
// Parsed result
// --------------------------------------------------------

class ParsedThen {
  bind_name: string | null = null;
  assign_name: string | null = null;
  operation_command: string | null = null;
  operation_args: string[] = [];
  source_variable: string | null = null;
}

// --------------------------------------------------------
// Registry
// --------------------------------------------------------

const THEN_COMMANDS: Record<string, ThenCommand> = {
  "do": new DoCommand(),
  "get": new DoCommand(),
  "set": new DoCommand(),
  "chain": new ChainCommand(),
  "as": new AsCommand(),
  "into": new IntoCommand(),
  "the": new SourceCommand(),
  "from": new SourceCommand(),
  "in": new SourceCommand(),
};

// --------------------------------------------------------
// Parser
// --------------------------------------------------------

class ThenCommandParser {
  private tokens: string[];

  constructor(args: string) {
    this.tokens = args.split(/\s+/).filter(Boolean);
  }

  parse(): ParsedThen | null {
    const res = new ParsedThen();
    let pos = 0;
    while (pos < this.tokens.length) {
      const tok = this.tokens[pos];
      const cmd = THEN_COMMANDS[tok];
      if (!cmd) {
        return null;
      }
      pos = cmd.execute(this.tokens, pos + 1, res);
    }
    return res;
  }
}

// --------------------------------------------------------
// Construction helpers
// --------------------------------------------------------

function create_operation_call_node(
  ctx: MacroContext,
  op_cmd: string,
  op_args: string[],
  children: Node[],
  source_value_name: string | null,
): Node | null {
  const p0 = new Position(0, 0);

  switch (op_cmd) {
    case "do": {
      if (op_args.length !== 1) {
        ctx.compiler.assert_(false, ctx.node, "do requires exactly one method name");
        return null;
      }
      const opChildren: Node[] = [];
      if (source_value_name) {
        opChildren.push(
          ctx.compiler.make_node(`67lang:call ${source_value_name}`, ctx.node.pos ?? p0, []),
        );
      }
      opChildren.push(...children);
      return ctx.compiler.make_node(
        `67lang:call ${op_args[0]}`,
        ctx.node.pos ?? p0,
        opChildren,
      );
    }

    case "chain": {
      if (op_args.length === 0) {
        ctx.compiler.assert_(false, ctx.node, "chain requires at least one step");
        return null;
      }
      if (!source_value_name) {
        ctx.compiler.assert_(false, ctx.node, "chain requires a source value");
        return null;
      }

      let current: Node = ctx.compiler.make_node(
        `67lang:call ${source_value_name}`,
        ctx.node.pos ?? p0,
        [],
      );

      op_args.forEach((step, i) => {
        const callChildren = [current];
        if (i === op_args.length - 1) {
          callChildren.push(...children);
        }
        current = ctx.compiler.make_node(
          `67lang:call ${step}`,
          ctx.node.pos ?? p0,
          callChildren,
        );
      });

      return current;
    }

    default:
      ctx.compiler.assert_(false, ctx.node, `unknown operation command: ${op_cmd}`);
      return null;
  }
}

// --------------------------------------------------------
// Provider
// --------------------------------------------------------

export class Pipeline_macro_provider implements Macro_preprocess_provider {

  preprocess(ctx: MacroContext): void {
    const args = ctx.compiler.get_metadata(ctx.node, Args)?.toString() ?? "";
    const content = ctx.node.content;

    const isContinuation = content.startsWith("then");
    const parseContent = isContinuation ? args : content;

    const parent = ctx.node.parent;
    ctx.compiler.assert_(parent !== null, ctx.node, "pipeline node must have a parent");
    if (!parent) {
      return;
    }

    const parser = new ThenCommandParser(parseContent);
    const parsed = parser.parse();
    if (!parsed) {
      ctx.compiler.assert_(false, ctx.node, "pipeline requires a valid command");
      return;
    }

    if (!parsed.operation_command) {
      ctx.compiler.assert_(false, ctx.node, "pipeline requires an operation (do, get, set, chain)");
      return;
    }

    let sourceValueName: string | null = null;

    if (isContinuation) {
      const up = new Upwalker(new LastThenSearchStrategy());
      const lastThen = up.find(ctx);
      if (!lastThen) {
        ctx.compiler.assert_(false, ctx.node, "then used but no previous expression to pipe from");
        return;
      }
      sourceValueName = get_single_arg(ctx.clone_with({ node: lastThen.node }));
    } else {
      sourceValueName = parsed.source_variable;
    }

    const callNode = create_operation_call_node(
      ctx,
      parsed.operation_command,
      parsed.operation_args,
      ctx.node.children,
      sourceValueName,
    );
    if (!callNode) {
      return;
    }

    const p0 = new Position(0, 0);
    let newNode: Node;

    if (parsed.assign_name) {
      newNode = ctx.compiler.make_node(
        `67lang:call ${parsed.assign_name}`,
        ctx.node.pos ?? p0,
        [callNode],
      );
    } else if (parsed.bind_name) {
      newNode = ctx.compiler.make_node(
        `local ${parsed.bind_name}`,
        ctx.node.pos ?? p0,
        [
          ctx.compiler.make_node("67lang:last_then", ctx.node.pos ?? p0, []),
          callNode,
        ],
      );
    } else {
      const resultName = ctx.compiler.get_new_ident("pipeline_result");
      newNode = ctx.compiler.make_node(
        `local ${resultName}`,
        ctx.node.pos ?? p0,
        [
          ctx.compiler.make_node("67lang:last_then", ctx.node.pos ?? p0, []),
          callNode,
        ],
      );
    }

    parent.replace_child(ctx.node, [newNode]);

    ctx.current_step!.process_node(ctx.clone_with({ node: newNode }));
  }
}

export const Then_macro_provider = Pipeline_macro_provider;

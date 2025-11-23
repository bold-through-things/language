// macros/then_macro.ts

import {
  Macro_preprocess_provider,
  MacroContext,
} from "../core/macro_registry.ts";
import { Args, Node, Position } from "../core/node.ts";
import { get_single_arg } from "../utils/common_utils.ts";
import { Upwalker, LastThenSearchStrategy } from "../pipeline/local_lookup.ts";
import { parseTokens, Schema, Fixed, VarOrTerminated } from "../utils/new_parser.ts";
import { try_catch } from "../utils/utils.ts";

// --------------------------------------------------------
// Then-schema (new parser)
// --------------------------------------------------------

const thenSchema = {
  "do":    new Fixed(1),                // do <method>
  "get":   new Fixed(1),                // get <method>
  "set":   new Fixed(1),                // set <method>
  "chain": new VarOrTerminated(null),   // chain <steps...>
  "as":    new Fixed(1),
  "into":  new Fixed(1),
  "the":   new Fixed(1),
  "from":  new Fixed(1),
  "in":    new Fixed(1),
};

type Tree = ReturnType<typeof parseTokens< typeof thenSchema >>;
  
// --------------------------------------------------------
// Wrapper for the parse-tree
// --------------------------------------------------------

class ThenView {
  constructor(public tree: Tree) {}

  private _getFirstKeyword(keyword: keyof Tree): { name: string; args: string[] } | null {
    if (this.tree[keyword] && this.tree[keyword].length > 0) {
      return { name: keyword + "", args: this.tree[keyword][0].value };
    }
    return null;
  }

  get op(): { name: string; args: string[] } | null {
    return (
      this._getFirstKeyword("do") ?? 
      this._getFirstKeyword("get") ??
      this._getFirstKeyword("set") ?? 
      this._getFirstKeyword("chain")
    );
  }

  get bind(): string | null {
    return this._getFirstKeyword("as")?.args[0] || null;
  }

  get assign(): string | null {
    return this._getFirstKeyword("into")?.args[0] || null;
  }

  get source(): string | null {
    return (
      this._getFirstKeyword("the") ??
      this._getFirstKeyword("from") ??
      this._getFirstKeyword("in") ??
      null
    )?.args[0] || null;
  }
}

// --------------------------------------------------------
// Call builder
// --------------------------------------------------------

function create_operation_call_node(
  ctx: MacroContext,
  opCmd: string,
  opArgs: string[],
  children: Node[],
  sourceValueName: string | null,
): Node | null {
  const p0 = new Position(0, 0);

  switch (opCmd) {

    case "do":
    case "get":
    case "set": {
      if (opArgs.length !== 1) {
        ctx.compiler.assert_(false, ctx.node, `${opCmd} requires exactly one method name`);
        return null;
      }

      const opChildren: Node[] = [];
      if (sourceValueName) {
        opChildren.push(
          ctx.compiler.make_node(`67lang:call ${sourceValueName}`, ctx.node.pos ?? p0, []),
        );
      }
      opChildren.push(...children);

      return ctx.compiler.make_node(
        `67lang:call ${opArgs[0]}`,
        ctx.node.pos ?? p0,
        opChildren,
      );
    }

    case "chain": {
      if (opArgs.length === 0) {
        ctx.compiler.assert_(false, ctx.node, "chain requires at least one step");
        return null;
      }
      if (!sourceValueName) {
        ctx.compiler.assert_(false, ctx.node, "chain requires a source value");
        return null;
      }

      let current: Node = ctx.compiler.make_node(
        `67lang:call ${sourceValueName}`,
        ctx.node.pos ?? p0,
        [],
      );

      opArgs.forEach((step, i) => {
        const callChildren = [current];
        if (i === opArgs.length - 1) {
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
      ctx.compiler.assert_(false, ctx.node, `unknown operation: ${opCmd}`);
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

    // tokenize for the new parser
    const tokens = parseContent.split(/\s+/).filter(Boolean);
    const tree = try_catch(() => parseTokens(tokens, thenSchema), (e) => {
    console.log(tokens);
      ctx.compiler.assert_(false, ctx.node, `Failed to parse tokens: ${e}`);
    });

    const view = new ThenView(tree);
    const op = view.op;
    ctx.compiler.assert_(op !== null, ctx.node, "pipeline requires an operation (do, get, set, chain)");

    let sourceValueName: string | null = null;

    if (isContinuation) {
      const up = new Upwalker(new LastThenSearchStrategy());
      const lastThen = up.find(ctx);
      ctx.compiler.assert_(lastThen !== null, ctx.node, "then used but no previous expression to pipe from");
      sourceValueName = get_single_arg(ctx.clone_with({ node: lastThen!.node }));
    } else {
      sourceValueName = view.source;
    }

    const callNode = create_operation_call_node(
      ctx,
      op!.name,
      op!.args,
      ctx.node.children,
      sourceValueName,
    );
    if (!callNode) {
      return;
    }

    const p0 = new Position(0, 0);
    let newNode: Node;

    const assignName = view.assign;
    const bindName = view.bind;

    if (assignName) {
      newNode = ctx.compiler.make_node(
        `67lang:call ${assignName}`,
        ctx.node.pos ?? p0,
        [callNode],
      );
    } else if (bindName) {
      newNode = ctx.compiler.make_node(
        `local ${bindName}`,
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

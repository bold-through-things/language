// macros/then_macro.ts

import {
Macro_emission_provider,
  Macro_preprocess_provider,
  Macro_typecheck_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";
import { Args, Node, Position } from "../core/node.ts";
import { collect_child_expressions, get_single_arg } from "../utils/common_utils.ts";
import { Upwalker, LastThenSearchStrategy, MetadataSearchStrategy } from "../pipeline/local_lookup.ts";
import { parseTokens, Schema, Fixed, VarOrTerminated } from "../utils/new_parser.ts";
import { try_catch } from "../utils/utils.ts";
import { Emission_item, statement_expr } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { graceful_typecheck } from "../core/exceptions.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";

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

const LAST_PIPELINE_RESULT = Symbol("LAST_PIPELINE_RESULT");
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

function create_call_chain(
  ctx: MacroContext,
  opCmd: string,
  opArgs: (string | typeof LAST_PIPELINE_RESULT)[],
  children: Node[],
  sourceValue: string | typeof LAST_PIPELINE_RESULT | null,
): Node {
  const p0 = new Position(0, 0);

  ctx.compiler.assert_( // TODO might just be a compiler bug
    [...opArgs, sourceValue].filter((x) => x === LAST_PIPELINE_RESULT).length <= 1,
    ctx.node,
    `Only one ${_67lang_GET_LAST_PIPELINE_RESULT} allowed in pipeline operation`,
    ErrorType.INVALID_STRUCTURE,
  );

  function create_call_node(target: string | typeof LAST_PIPELINE_RESULT, children: Node[]): Node {
    if (target === LAST_PIPELINE_RESULT) {
      ctx.compiler.assert_( // TODO might just be a compiler bug though..?
        children.length === 0,
        ctx.node,
        `${_67lang_GET_LAST_PIPELINE_RESULT} does not take any arguments`,
      );
      return ctx.compiler.make_node(
        `${_67lang_GET_LAST_PIPELINE_RESULT}`,
        ctx.node.pos ?? p0,
        [],
      );
    } else {
      return ctx.compiler.make_node(
        `67lang:call ${target}`,
        ctx.node.pos ?? p0,
        children,
      );
    }
  }

  switch (opCmd) {

    case "do":
    case "get":
    case "set": {
      if (opArgs.length !== 1) {
        ctx.compiler.assert_(false, ctx.node, `${opCmd} requires exactly one method name`);
      }

      const opChildren: Node[] = [];
      if (sourceValue) {
        opChildren.push(
          create_call_node(sourceValue, [])
        );
      }
      opChildren.push(...children);

      return create_call_node(
        opArgs[0],
        opChildren,
      );
    }

    case "chain": {
      if (opArgs.length === 0) {
        ctx.compiler.assert_(false, ctx.node, "chain requires at least one step");
      }
      if (!sourceValue) {
        ctx.compiler.assert_(false, ctx.node, "chain requires a source value");
      }

      let current: Node = create_call_node(
        sourceValue,
        [],
      );

      opArgs.forEach((step, i) => {
        const callChildren = [current];
        if (i === opArgs.length - 1) {
          callChildren.push(...children);
        }
        current = create_call_node(
          step,
          callChildren,
        );
      });

      return current;
    }

    default:
      ctx.compiler.assert_(false, ctx.node, `unknown operation: ${opCmd}`);
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
      ctx.compiler.assert_(false, ctx.node, `Failed to parse tokens: ${e}`);
    });

    const view = new ThenView(tree);
    const op = view.op;
    ctx.compiler.assert_(op !== null, ctx.node, "pipeline requires an operation (do, get, set, chain)");

    let sourceValueName: string | typeof LAST_PIPELINE_RESULT | null = null;

    if (isContinuation) {
      // TODO...

      // const up = new Upwalker(new LastThenSearchStrategy());
      // const lastThen = up.find(ctx);
      // ctx.compiler.assert_(lastThen !== null, ctx.node, "then used but no previous expression to pipe from");
      // sourceValueName = get_single_arg(ctx.clone_with({ node: lastThen!.node }));

      sourceValueName = LAST_PIPELINE_RESULT;
    } else {
      sourceValueName = view.source;
    }

    const callNode = create_call_chain(
      ctx,
      op.name,
      op.args,
      ctx.node.children,
      sourceValueName,
    );
    if (!callNode) {
      return;
    }

    const p0 = new Position(0, 0);
    let resultNode: Node | null = null;
    let localAssignNode: Node | null = null;

    // TODO support for many
    const assignName = view.assign;
    const bindName = view.bind;

    resultNode = ctx.compiler.make_node(
      `${_67lang_PIPELINE_RESULT}`,
      ctx.node.pos ?? p0,
      [callNode],
    );
    const refResultNode = ctx.compiler.make_node(
      `${_67lang_GET_LAST_PIPELINE_RESULT}`,
      ctx.node.pos ?? p0,
      [],
    );

    if (assignName) {
      localAssignNode = ctx.compiler.make_node(
        `67lang:call ${assignName}`,
        ctx.node.pos ?? p0,
        [refResultNode],
      );
    } else if (bindName) {
      localAssignNode = ctx.compiler.make_node(
        `local ${bindName}`,
        ctx.node.pos ?? p0,
        [refResultNode],
      );
    }

    const replacement = [resultNode, localAssignNode].filter((x): x is Node => x !== null);

    if (replacement.length === 0) {
      throw new Error("wow compiler bug `replacement.length` is 0");
    }

    parent.replace_child(ctx.node, replacement);
    for (const child of replacement) {
      const cctx = ctx.clone_with({ node: child });
      ctx.current_step!.process_node(cctx);
    }
  }
}

export const _67lang_PIPELINE_RESULT = "67lang:pipeline_result";
export class Pipeline_result_macro_provider implements Macro_emission_provider, Macro_typecheck_provider {
  typecheck(ctx: MacroContext): TCResult {
    return graceful_typecheck((): TCResult => {
      let res: TCResult = null;
      for (const child of ctx.node.children) {
        const cctx = ctx.clone_with({ node: child });
        const t = ctx.current_step!.process_node(cctx);

        if (t) {
          res = t;
        }
      }

      ctx.compiler.assert_(
        res !== null,
        ctx.node,
        `${_67lang_PIPELINE_RESULT} must have a valid type from its children`,
        ErrorType.INVALID_STRUCTURE
      );

      ctx.compiler.set_metadata(
        ctx.node,
        Pipeline_result_typecheck_metadata,
        new Pipeline_result_typecheck_metadata(res),
      );
      
      return res;
    });
  }

  emission(ctx: MacroContext): void {
    const exprs = collect_child_expressions(ctx);
    const expr = exprs[exprs.length - 1];
    
    // although this would be a compiler bug, consider that the users could 
    // just use this one directly

    ctx.compiler.assert_(
      expr != null,
      ctx.node,
      `${_67lang_PIPELINE_RESULT} must have a valid expression`,
      ErrorType.INVALID_STRUCTURE
    );

    const ident = ctx.compiler.get_new_ident("_pipeline_result"); // TODO include the name of operation

    const [define, use] = statement_expr(expr, ident);
    ctx.statement_out.push(define);
    ctx.expression_out.push(use);

    ctx.compiler.set_metadata(
      ctx.node,
      Pipeline_result_emission_metadata,
      new Pipeline_result_emission_metadata(use),
    );
  }
}

export const _67lang_GET_LAST_PIPELINE_RESULT = "67lang:get_last_pipeline_result";
export class Get_last_pipeline_result_macro_provider implements Macro_emission_provider, Macro_typecheck_provider {
  typecheck(ctx: MacroContext): TCResult {
    const up = new Upwalker(new MetadataSearchStrategy(Pipeline_result_typecheck_metadata));
    const res = up.find(ctx);
    ctx.compiler.assert_(
      res !== null && res.found !== null,
      ctx.node,
      `in typechecking ${_67lang_GET_LAST_PIPELINE_RESULT} used but no previous pipeline result found`,
      ErrorType.INVALID_STRUCTURE,
    );

    const meta = res.found;
    return meta.type;
  }

  emission(ctx: MacroContext): void {
    const up = new Upwalker(new MetadataSearchStrategy(Pipeline_result_emission_metadata));
    const res = up.find(ctx);
    ctx.compiler.assert_(
      res !== null && res.found !== null,
      ctx.node,
      `in emission ${_67lang_GET_LAST_PIPELINE_RESULT} used but no previous pipeline result found`,
      ErrorType.INVALID_STRUCTURE,
    );


    const meta = res.found;
    ctx.expression_out.push(meta.expr ?? (() => `${FORCE_SYNTAX_ERROR} /* found no expression for last value */`));

    // const ident = ctx.compiler.get_new_ident("_pipeline_result");
    // const [define, use] = statement_expr(meta.expr ?? (() => `${FORCE_SYNTAX_ERROR} /* found no expression for last value */`), ident);
    // ctx.statement_out.push(define);
    // ctx.expression_out.push(use);
  }
}

class Pipeline_result_typecheck_metadata {
  constructor(readonly type: TCResult) {
    // ...
  }
}


class Pipeline_result_emission_metadata {
  constructor(readonly expr: Emission_item) {
    // ...
  }
}

// macros/then_macro.ts

import {
  Macro_context,
  REGISTER_MACRO_PROVIDERS,
  Macro_provider,
  Register_macro_providers,
} from "../core/macro_registry.ts";
import { Args, Node, Position } from "../core/node.ts";
import { collect_child_expressions } from "../utils/common_utils.ts";
import { Upwalker } from "../pipeline/local_lookup.ts";
import { parse_tokens, Fixed, VarOrTerminated } from "../utils/new_parser.ts";
import { try_catch } from "../utils/utils.ts";
import { Emission_item, statement_expr } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { graceful_typecheck } from "../core/exceptions.ts";
import { FORCE_SYNTAX_ERROR } from "../pipeline/js_conversion.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Expression_return_type, Type_check_result } from "../compiler_types/proper_types.ts";
import { Scope_macro_provider } from "./scope_macro.ts";

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

type Tree = ReturnType<typeof parse_tokens< typeof thenSchema >>;
  
// --------------------------------------------------------
// Wrapper for the parse-tree
// --------------------------------------------------------

const LAST_PIPELINE_RESULT = Symbol("LAST_PIPELINE_RESULT");
class ThenView {
  constructor(public tree: Tree) {}

  private _getFirstKeyword(keyword: keyof Tree): { name: string; args: string[] } | null {
    if (this.tree[keyword] && this.tree[keyword][0] !== undefined) {
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
  ctx: Macro_context,
  opCmd: string,
  opArgs: (string | typeof LAST_PIPELINE_RESULT)[],
  children: Node[],
  sourceValue: string | typeof LAST_PIPELINE_RESULT | null,
): Node {
  const p0 = new Position(0, 0);

  ctx.compiler.error_tracker.assert( // TODO might just be a compiler bug
    [...opArgs, sourceValue].filter((x) => x === LAST_PIPELINE_RESULT).length <= 1,
    {
      node: ctx.node,
      message: `Only one ${_67lang_GET_LAST_PIPELINE_RESULT} allowed in pipeline operation`,
      type: ErrorType.INVALID_STRUCTURE,
    }
  );

  function create_call_node(target: string | typeof LAST_PIPELINE_RESULT, children: Node[]): Node {
    if (target === LAST_PIPELINE_RESULT) {
      ctx.compiler.error_tracker.assert( // TODO might just be a compiler bug though..?
        children.length === 0,
        {
          node: ctx.node,
          message: `${_67lang_GET_LAST_PIPELINE_RESULT} does not take any arguments`,
          type: ErrorType.INVALID_STRUCTURE,
        }
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
      ctx.compiler.error_tracker.assert(
        opArgs.length === 1 && opArgs[0] !== undefined,
        {
          node: ctx.node, 
          message: `${opCmd} requires exactly one method name`,
          type: ErrorType.INVALID_STRUCTURE,
        }
      )

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
        ctx.compiler.error_tracker.fail({
          node: ctx.node, 
          message: "chain requires at least one step",
          type: ErrorType.INVALID_STRUCTURE,
        });
      }
      if (!sourceValue) {
        ctx.compiler.error_tracker.fail({
          node: ctx.node,
          message: "chain requires a source value",
          type: ErrorType.INVALID_STRUCTURE,
        });
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
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: `unknown operation: ${opCmd}`,
        type: ErrorType.INVALID_STRUCTURE,
      });
  }
}

const scope_provider = new Scope_macro_provider(); // yeah TODO this is quite ugly though

export class Pipeline_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    for (const macro_name of ["then", "pls", "yo"]) {
      via(Preprocessing_context, macro_name, this.preprocess.bind(this));
      via(Type_checking_context, macro_name, this.typecheck.bind(this));
      via(Emission_macro_context, macro_name, this.emission.bind(this));
    }
  }

  preprocess(ctx: Preprocessing_context): void {
    const args = ctx.compiler.get_metadata(ctx.node, Args)?.toString() ?? "";
    const content = ctx.node.content;

    const isContinuation = content.startsWith("then");

    const parent = ctx.node.parent;
    ctx.compiler.error_tracker.assert(
      parent !== null, 
      {
        node: ctx.node, 
        message: "pipeline node must have a parent",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );

    // tokenize for the new parser
    const tokens = args.split(/\s+/).filter(Boolean);
    const tree = try_catch(() => parse_tokens(tokens, thenSchema), (e) => {
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: `Failed to parse tokens: ${e}`,
        type: ErrorType.INVALID_STRUCTURE,
      });
    });

    const view = new ThenView(tree);
    const op = view.op;

    if (op === null) {
      ctx.compiler.error_tracker.assert(
        args.length === 0, // TODO
        {
          node: ctx.node,
          message: "must have empty args",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );
      for (const child of ctx.node.children) {
        const cctx = ctx.clone_with({ node: child });
        cctx.apply();
      }
      return;
    }

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
      cctx.apply();
    }
  }

  // if we survive this long then we are doing blocks instead
  // TODO
  typecheck(ctx: Type_checking_context): Type_check_result {
    return scope_provider.typecheck(ctx);
  }

  emission(ctx: Emission_macro_context): void {
    return scope_provider.emission(ctx);
  }
}

export const _67lang_PIPELINE_RESULT = "67lang:pipeline_result";
export class Pipeline_result_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, _67lang_PIPELINE_RESULT, this.typecheck.bind(this));
    via(Emission_macro_context, _67lang_PIPELINE_RESULT, this.emission.bind(this));
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    return graceful_typecheck(ctx, Expression_return_type, (): Type_check_result => {
      let res: Type_check_result = null;
      for (const child of ctx.node.children) {
        const cctx = ctx.clone_with({ node: child });
        const t = cctx.apply();

        if (t) {
          res = t;
        }
      }

      ctx.compiler.error_tracker.assert(
        res !== null,
        {
          node: ctx.node,
          message: `${_67lang_PIPELINE_RESULT} must have a valid type from its children`,
          type: ErrorType.INVALID_STRUCTURE,
        }
      );

      ctx.compiler.set_metadata(
        ctx.node,
        Pipeline_result_typecheck_metadata,
        new Pipeline_result_typecheck_metadata(res),
      );
      
      return res;
    });
  }

  emission(ctx: Emission_macro_context): void {
    const exprs = collect_child_expressions(ctx);
    const expr = exprs[exprs.length - 1];
    
    // although this would be a compiler bug, consider that the users could 
    // just use this one directly

    ctx.compiler.error_tracker.assert(
      expr != null,
      {
        node: ctx.node,
        message: `${_67lang_PIPELINE_RESULT} must have a valid expression`,
        type: ErrorType.INVALID_STRUCTURE,
      }
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
export class Get_last_pipeline_result_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, _67lang_GET_LAST_PIPELINE_RESULT, this.typecheck.bind(this));
    via(Emission_macro_context, _67lang_GET_LAST_PIPELINE_RESULT, this.emission.bind(this));
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const up = new Upwalker(req => req.ctx.compiler.maybe_metadata(req.ctx.node, Pipeline_result_typecheck_metadata) ?? null);
    const res = up.find(ctx);
    ctx.compiler.error_tracker.assert(
      res !== null && res.found !== null,
      {
        node: ctx.node,
        message: `in typechecking ${_67lang_GET_LAST_PIPELINE_RESULT} used but no previous pipeline result found`,
        type: ErrorType.INVALID_STRUCTURE,
      }
    );

    const meta = res.found;
    return meta.type;
  }

  emission(ctx: Emission_macro_context): void {
    const up = new Upwalker(req => req.ctx.compiler.maybe_metadata(req.ctx.node, Pipeline_result_emission_metadata) ?? null);
    const res = up.find(ctx);
    ctx.compiler.error_tracker.assert(
      res !== null && res.found !== null,
      {
        node: ctx.node,
        message: `in emission ${_67lang_GET_LAST_PIPELINE_RESULT} used but no previous pipeline result found`,
        type: ErrorType.INVALID_STRUCTURE,
      }
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
  constructor(readonly type: Type_check_result) {
    // ...
  }
}


class Pipeline_result_emission_metadata {
  constructor(readonly expr: Emission_item) {
    // ...
  }
}

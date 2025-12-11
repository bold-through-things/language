// macros/fn_macro.ts

import {
  Macro_context,
  REGISTER_MACRO_PROVIDERS,
  Register_macro_providers,
  Macro_provider,
} from "../core/macro_registry.ts";

import { Args, SaneIdentifier } from "../core/node.ts";
import { BRACES, PARENTHESIS, statement_block, statement_blocks } from "../utils/strutil.ts";
import {
  get_single_arg,
} from "../utils/common_utils.ts";

import { seek_child_macro, seek_all_child_macros } from "../pipeline/steps/utils.ts";

import { ErrorType } from "../utils/error_types.ts";
import { Async_mode, Call_convention, DirectCall, FieldCall, LocalAccessCall, NewCall, PrototypeCall } from "../pipeline/call_conventions.ts";
import { Function_67lang, Type, Type_check_result, Type_reference } from "../compiler_types/proper_types.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Upwalker_visibility, Provides_locals__metadata } from "./local_macro.ts";
import { Type_registration_context } from "../pipeline/steps/typechecking.ts";
import { if_ } from "../utils/utils.ts";

export class FnConventionName {
  constructor(public name: string | null) {}
}

export class Params {
  mapping: Record<string, Type> = {};
}

export class Fn_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Preprocessing_context, "fn", this.preprocess.bind(this));
    via(Type_registration_context, "fn", this.register_functions.bind(this));
    via(Emission_macro_context, "fn", this.emission.bind(this));
  }

  // Parses:
  //   "fn name" -> ["name", null]
  //   "fn name is Convention" -> ["name", "Convention"]
  private parse_header(ctx: Macro_context): [string, string | null] {
    const raw = ctx.compiler.get_metadata(ctx.node, Args).toString();
    const parts = raw.split(" ");

    if (parts[0] !== undefined && parts.length === 1) {
      return [parts[0], null];
    }

    if (parts[0] !== undefined && parts[2] !== undefined && parts[1] === "is") {
      return [parts[0], parts[2]];
    }

    ctx.compiler.error_tracker.fail({
      node: ctx.node,
      message: "fn header must be `<name>` or `<name> is <Convention>`",
      type: ErrorType.INVALID_MACRO,
    });
  }

  private get_param_demands(ctx: Type_registration_context): [string, Type][] {
    const demands: [string, Type][] = [];

    const param_nodes = seek_all_child_macros(ctx.node, "param");
    for (const p of param_nodes) {
      const pname = get_single_arg(ctx.clone_with({ node: p }));
      const tnode = seek_child_macro(p, "type");
      if (!tnode) {
        ctx.compiler.error_tracker.fail({
          node: ctx.node,
          message: "no type provided for param",
          type: ErrorType.MISSING_TYPE,
        });
        continue;
      }

      const child_res = ctx.clone_with({ node: tnode }).apply();

      ctx.compiler.error_tracker.assert(
        child_res instanceof Type_reference,
        {
          node: ctx.node,
          message: "child_res instanceof Type_reference",
          type: ErrorType.INTERNAL_CODE_QUALITY,
        }
      );

      demands.push([pname, child_res.ref]);
    }

    return demands;
  }

  private get_return_type(ctx: Type_registration_context): Type {
    const ret = seek_child_macro(ctx.node, "returns");
    if (ret) {
      const tnode = seek_child_macro(ret, "type");
      if (tnode) {
        const r = ctx.clone_with({ node: tnode }).apply();
        ctx.compiler.error_tracker.assert(
          r instanceof Type_reference, 
          {
            node: ctx.node,
            message: "r instanceof Type_reference",
            type: ErrorType.INTERNAL_CODE_QUALITY,
          }
        );
        return r.ref;
      }
    }

    ctx.compiler.error_tracker.fail({
      node: ctx.node,
      message: "no type provided for return",
      type: ErrorType.MISSING_TYPE,
    });
    throw new Error("missing return type");
  }

  private build_convention(
    ctx: Macro_context,
    conv_name: string | null,
    desired_name: string,
    actual_name: string,
  ): Call_convention {
    const is_binding = ctx.node.content.includes(" is ")
    const fn = if_(is_binding, () => {
      const hnode =  seek_child_macro(ctx.node, "fn");
      return hnode ? get_single_arg(ctx.clone_with({ node: hnode })) : desired_name;
    }, () => actual_name);

    const async_mode = if_(is_binding, () => {
      const amode = !!seek_child_macro(ctx.node, "async");
      const smode = !!seek_child_macro(ctx.node, "sync");

      ctx.compiler.error_tracker.assert(
        amode !== smode,
        {
          node: ctx.node,
          message: "must specify `async` or `sync`, not both or neither",
          type: ErrorType.INVALID_MACRO,
        }
      );

      if (amode) {
        return Async_mode.ASYNC;
      }

      if (smode) {
        return Async_mode.SYNC;
      }

      throw new Error("unreachable");
    }, () => Async_mode.ASYNC); // TODO we need to be quite smart with this

    if (conv_name === null) {
      return new DirectCall({
        fn,
        receiver: null,
        async_mode,
      });
    }

    if (conv_name === "PrototypeCall") {
      const cnode = seek_child_macro(ctx.node, "constructor");
      ctx.compiler.error_tracker.assert(
        cnode !== null,
        {
          node: ctx.node,
          message: "PrototypeCall needs a `constructor` child",
          type: ErrorType.INVALID_MACRO,
        }
      );

      const constructor = get_single_arg(
        ctx.clone_with({ node: cnode! }),
      );

      return new PrototypeCall({
        constructor,
        fn,
        async_mode,
      });
    }

    if (conv_name === "DirectCall") {
      let receiver: string | null = null;

      const rnode = seek_child_macro(ctx.node, "receiver");
      if (rnode) {
        receiver = get_single_arg(ctx.clone_with({ node: rnode }));
      }

      return new DirectCall({
        fn,
        receiver,
        async_mode,
      });
    }

    if (conv_name === "FieldCall") {
      const fnode = seek_child_macro(ctx.node, "field");
      ctx.compiler.error_tracker.assert(
        fnode !== null,
        {
          node: ctx.node,
          message: "FieldCall needs a `field` child",
          type: ErrorType.INVALID_MACRO,
        }
      );

      const field = get_single_arg(ctx.clone_with({ node: fnode! }));
      return new FieldCall({ field, async_mode });
    }

    if (conv_name === "NewCall") {
      const cnode = seek_child_macro(ctx.node, "constructor");
      ctx.compiler.error_tracker.assert(
        cnode !== null,
        {
          node: ctx.node,
          message: "NewCall needs a `constructor` child",
          type: ErrorType.INVALID_MACRO,
        }
      );

      const constructor = get_single_arg(
        ctx.clone_with({ node: cnode! }),
      );

      return new NewCall({ constructor, async_mode });
    }

    ctx.compiler.error_tracker.fail({
      node: ctx.node,
      message: `unknown call convention: ${conv_name}`,
      type: ErrorType.INVALID_MACRO,
    });
  }

  // ---------- preprocess ----------

  preprocess(ctx: Macro_context): void {
    const p = ctx.node.parent;
    if (p && p !== ctx.compiler.root_node) {
      ctx.compiler.root_node!.prepend_child(ctx.node);
    }

    const [name, conv_name] = this.parse_header(ctx);
    const actual_name = ctx.compiler.get_new_ident(name);

    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, new SaneIdentifier(actual_name));
    ctx.compiler.set_metadata(ctx.node, FnConventionName, new FnConventionName(conv_name));

    const do_block = seek_child_macro(ctx.node, "do");

    if (conv_name === null) {
      ctx.compiler.error_tracker.assert(
        do_block !== null,
        {
          node: ctx.node,
          message: "function must have a do block",
          type: ErrorType.INVALID_MACRO,
        }
      );
    }

    if (do_block) {
      ctx.clone_with({ node: do_block }).apply();
    }
  }

  // ---------- register functions ----------

  register_functions(ctx: Type_registration_context): Type_check_result {
    const [name, conv_name] = this.parse_header(ctx);
    const actual_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier)?.value || name;

    const params = this.get_param_demands(ctx);
    const ret = this.get_return_type(ctx);

    const convention = this.build_convention(
      ctx,
      conv_name,
      name,
      actual_name,
    );

    const params_meta = new Params();
    ctx.compiler.set_metadata(ctx.node, Params, params_meta);
    const locals_meta = new Provides_locals__metadata({});
    ctx.compiler.set_metadata(ctx.node, Provides_locals__metadata, locals_meta);
    for (const [pname, type] of params) {
      params_meta.mapping[pname] = type;
      locals_meta.locals[pname] = {
        sane_name: pname, // TODO
        type: type,
        local_lifetime: Upwalker_visibility.CHILDREN_ONLY,
        getter: ctx.type_engine.add_function(null, (fn) => {
          fn.demands = [];
          fn.returns = type;
          fn.convention = new LocalAccessCall({ fn: pname, async_mode: Async_mode.SYNC });
        }),
        setter: ctx.type_engine.add_function(null, (fn) => {
          fn.demands = [type];
          fn.returns = type;
          fn.convention = new LocalAccessCall({ fn: pname, async_mode: Async_mode.SYNC });
        })
      };
    }

    ctx.type_engine.add_function(name, 
      (fn: Function_67lang) => {
        fn.demands = params.map(([_pname, type]) => type);
        fn.returns = ret;
        fn.convention = convention;
      }
    );

    return null;
  }

  // ---------- emission ----------

  emission(ctx: Emission_macro_context): void {
    const body = seek_child_macro(ctx.node, "do");
    if (!body) {
      return;
    }

    const fn_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier)?.value || get_single_arg(ctx);

    const [params_block, body_block] = ctx.statement(statement_blocks(
      statement_block(`const ${fn_name} = async function`, PARENTHESIS),
      statement_block(null, BRACES)
    ));

    ctx.compiler.error_tracker.assert(
      params_block !== undefined && body_block !== undefined,
      {
        node: ctx.node,
        message: "failed to create fn emission blocks",
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    );

    const params = ctx.compiler.get_metadata(ctx.node, Params) as Params;
    Object.entries(params.mapping).forEach(([pname, type]) => params_block.push(() => (`${pname}: ${type.to_typescript()},`)));

    ctx.clone_with({ node: body, statement_out: body_block }).apply();
  }
}

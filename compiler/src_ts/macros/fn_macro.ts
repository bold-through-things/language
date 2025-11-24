// macros/fn_macro.ts

import {
  Macro_emission_provider,
  Macro_preprocess_provider,
  Macro_functions_provider,
  MacroContext,
  Macro_provider,
} from "../core/macro_registry.ts";

import { Args, Inject_code_start, Node, SaneIdentifier } from "../core/node.ts";
import { cut } from "../utils/strutil.ts";
import {
  collect_child_expressions,
  get_single_arg,
} from "../utils/common_utils.ts";

import { seek_child_macro, seek_all_child_macros } from "../pipeline/steps/utils.ts";

import { ErrorType } from "../utils/error_types.ts";
import { NEWLINE } from "../pipeline/js_conversion.ts";
import { IndentedStringIO } from "../utils/strutil.ts";
import { Async_mode, Call_convention, DirectCall, FieldCall, NewCall, PrototypeCall, TypeDemand } from "../pipeline/call_conventions.ts";
import { TypeParameter } from "../compiler_types/proper_types.ts";
import { if_ } from "../utils/utils.ts";

// -------- metadata carrier --------

export class FnConventionName {
  constructor(public name: string | null) {}
}

// Params container (identical to Crystal behaviour)
export class Params {
  mapping: Record<string, boolean> = {};
}

// -------------- provider --------------

export class Fn_macro_provider
  implements
    Macro_emission_provider,
    Macro_preprocess_provider,
    Macro_functions_provider {

  // ---------- helpers ----------

  // Parses:
  //   "fn name" -> ["name", null]
  //   "fn name is Convention" -> ["name", "Convention"]
  private parse_header(ctx: MacroContext): [string, string | null] {
    const raw = ctx.compiler.get_metadata(ctx.node, Args).toString();
    const parts = raw.split(" ");

    if (parts.length === 1) {
      return [parts[0], null];
    }

    if (parts.length === 3 && parts[1] === "is") {
      return [parts[0], parts[2]];
    }

    ctx.compiler.compile_error(
      ctx.node,
      "fn header must be `<name>` or `<name> is <Convention>`",
      ErrorType.INVALID_MACRO,
    );

    throw new Error("bad header");
  }

  private get_param_demands(ctx: MacroContext): TypeDemand[] {
    const demands: TypeDemand[] = [];

    const param_nodes = seek_all_child_macros(ctx.node, "param");
    for (const p of param_nodes) {
      const tnode = seek_child_macro(p, "type");
      if (!tnode) {
        ctx.compiler.compile_error(
          ctx.node,
          "no type provided for param",
          ErrorType.MISSING_TYPE,
        );
        continue;
      }

      const child_res = ctx.current_step!.process_node(
        ctx.clone_with({ node: tnode }),
      );

      if (!(child_res instanceof TypeParameter)) {
        throw new Error(`Expected TypeParameter, got ${child_res}`);
      }

      demands.push(child_res.type_expr!);
    }

    return demands;
  }

  private get_return_type(ctx: MacroContext): TypeDemand {
    const ret = seek_child_macro(ctx.node, "returns");
    if (ret) {
      const tnode = seek_child_macro(ret, "type");
      if (tnode) {
        const r = ctx.current_step!.process_node(
          ctx.clone_with({ node: tnode }),
        );
        if (!r || !("type_expr" in r)) {
          throw new Error(`child_res=${r}`);
        }
        return r.type_expr!;
      }
    }

    ctx.compiler.compile_error(
      ctx.node,
      "no type provided for return",
      ErrorType.MISSING_TYPE,
    );

    throw new Error("missing return type");
  }

  private build_convention(
    ctx: MacroContext,
    conv_name: string | null,
    desired_name: string,
    actual_name: string,
    param_demands: TypeDemand[],
    return_type: TypeDemand,
  ): Call_convention {
    const is_binding = ctx.node.content.includes(" is ")
    const emit_fn = if_(is_binding, () => {
      const hnode =  seek_child_macro(ctx.node, "fn");
      return hnode ? get_single_arg(ctx.clone_with({ node: hnode })) : desired_name;
    }, () => actual_name);

    const async_mode = if_(is_binding, () => {
      const amode = seek_child_macro(ctx.node, "async");
      const smode = seek_child_macro(ctx.node, "sync");

      ctx.compiler.assert_(
        !(amode && smode),
        ctx.node,
        "cannot have both async and sync modes",
        ErrorType.INVALID_MACRO,
      );

      if (amode) {
        return Async_mode.ASYNC;
      }

      if (smode) {
        return Async_mode.SYNC;
      }

      return Async_mode.MAYBE;
    }, () => Async_mode.MAYBE); // yes TODO we need to be quite smart with this

    if (conv_name === null) {
      return new DirectCall(
        emit_fn,
        null,
        param_demands,
        return_type,
        async_mode,
      );
    }

    if (conv_name === "PrototypeCall") {
      const cnode = seek_child_macro(ctx.node, "constructor");
      ctx.compiler.assert_(
        cnode !== null,
        ctx.node,
        "PrototypeCall needs a `constructor` child",
      );

      const constructor = get_single_arg(
        ctx.clone_with({ node: cnode! }),
      );

      return new PrototypeCall(
        constructor,
        emit_fn,
        param_demands,
        return_type,
        async_mode,
      );
    }

    if (conv_name === "DirectCall") {
      let recv: string | null = null;

      const rnode = seek_child_macro(ctx.node, "receiver");
      if (rnode) {
        recv = get_single_arg(ctx.clone_with({ node: rnode }));
      }

      return new DirectCall(
        emit_fn,
        recv,
        param_demands,
        return_type,
        async_mode,
      );
    }

    if (conv_name === "FieldCall") {
      const fnode = seek_child_macro(ctx.node, "field");
      ctx.compiler.assert_(
        fnode !== null,
        ctx.node,
        "FieldCall needs a `field` child",
      );

      const field = get_single_arg(ctx.clone_with({ node: fnode! }));
      return new FieldCall(field, param_demands, return_type, async_mode);
    }

    if (conv_name === "NewCall") {
      const cnode = seek_child_macro(ctx.node, "constructor");
      ctx.compiler.assert_(
        cnode !== null,
        ctx.node,
        "NewCall needs a `constructor` child",
      );

      const constructor = get_single_arg(
        ctx.clone_with({ node: cnode! }),
      );

      return new NewCall(constructor, param_demands, return_type, async_mode);
    }

    ctx.compiler.assert_(
      false,
      ctx.node,
      `unknown call convention: ${conv_name}`,
      ErrorType.INVALID_MACRO,
    );
  }

  // ---------- preprocess ----------

  preprocess(ctx: MacroContext): void {
    const p = ctx.node.parent;
    if (p && p !== ctx.compiler.root_node) {
      ctx.compiler.root_node!.prepend_child(ctx.node);
    }

    const [name, conv_name] = this.parse_header(ctx);
    const actual_name = ctx.compiler.get_new_ident(name);

    ctx.compiler.set_metadata(ctx.node, SaneIdentifier, new SaneIdentifier(actual_name));
    ctx.compiler.set_metadata(ctx.node, FnConventionName, new FnConventionName(conv_name));

    const params = new Params();
    ctx.compiler.set_metadata(ctx.node, Params, params);

    const do_block = seek_child_macro(ctx.node, "do");

    if (conv_name === null) {
      ctx.compiler.assert_(
        do_block !== null,
        ctx.node,
        "function must have a do block",
      );
    }

    if (do_block) {
      const param_nodes = seek_all_child_macros(ctx.node, "param");

      for (const pn of param_nodes) {
        const pname = get_single_arg(ctx.clone_with({ node: pn }));
        params.mapping[pname] = true;

        const local_node = ctx.compiler.make_node(
          `local ${pname}`,
          pn.pos, [],
        );

        const tnode = seek_child_macro(pn, "type");
        if (tnode) {
          local_node.append_child(tnode.copy_recursive());
        }

        const obtain = ctx.compiler.make_node(
          `67lang:obtain_param_value ${pname}`,
          pn.pos, [],
        );

        local_node.append_child(obtain);
        do_block.prepend_child(local_node);
      }

      ctx.current_step!.process_node(
        ctx.clone_with({ node: do_block }),
      );
    }
  }

  // ---------- register functions ----------

  register_functions(ctx: MacroContext): any {
    const [name, conv_name] = this.parse_header(ctx);
    const actual_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || name;

    const params = this.get_param_demands(ctx);
    const ret = this.get_return_type(ctx);

    const convention = this.build_convention(
      ctx,
      conv_name,
      name,
      actual_name.toString(),
      params,
      ret,
    );

    ctx.compiler.add_dynamic_convention(name, convention);
  }

  // ---------- emission ----------

  emission(ctx: MacroContext): void {
    const body = seek_child_macro(ctx.node, "do");
    if (!body) {
      return;
    }

    const fn_name = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier) || get_single_arg(ctx);

    const so = ctx.statement_out as IndentedStringIO;
    so.write(`const ${fn_name} = async function (`);

    const params = ctx.compiler.get_metadata(ctx.node, Params) as Params;
    const names = Object.keys(params.mapping);

    if (names.length > 0) {
      so.write(NEWLINE);
      so.with_indent(() => {
        names.forEach((p, i) => {
          so.write(p);
          if (i < names.length - 1) {
            so.write("," + NEWLINE);
          } else {
            so.write(NEWLINE);
          }
        });
      });
    }

    so.write(") ");

    const inject = { code: [] as string[] };
    ctx.compiler.set_metadata(body, Inject_code_start, inject);

    so.write("{");
    so.with_indent(() => {
      for (const p of names) {
        inject.code.push(`${p} = ${p}` + NEWLINE);
      }

      ctx.current_step!.process_node(
        ctx.clone_with({ node: body }),
      );
    });

    so.write("}" + NEWLINE);
  }
}

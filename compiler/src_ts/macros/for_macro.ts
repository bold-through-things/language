// macros/for_macro.ts

import {
  Macro_context,
  Macro_provider,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS
} from "../core/macro_registry.ts";

import { ErrorType } from "../utils/error_types.ts";
import { Node } from "../core/node.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";

export class For_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Preprocessing_context, "for", this.preprocess.bind(this));
  }

  private assert_for_syntax(ctx: Macro_context, parts: string[]): void {
    ctx.compiler.error_tracker.assert(
      parts.length >= 3,
      {
        node: ctx.node,
        message: "must have a syntax: for $ident in",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );
    ctx.compiler.error_tracker.assert(
      parts[0] === "for",
      {
        node: ctx.node,
        message: "must start with `for`",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );
    ctx.compiler.error_tracker.assert(
      parts[2] === "in",
      {
        node: ctx.node,
        message: "must have a syntax: for $ident in",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );
  }

  private find_body_node(node: Node): Node | null {
    return node.children.find((c) => c.content === "do") ?? null;
  }

  private take_iterable_child(ctx: Macro_context): Node {
    const expr_nodes = ctx.node.children.filter((c) => c.content !== "do");
    ctx.compiler.error_tracker.assert(
      expr_nodes.length === 1 && expr_nodes[0] !== undefined,
      {
        node: ctx.node,
        message: `must have a single argument, the list provider (got ${expr_nodes.map((c) => c.content)})`,
        type: ErrorType.WRONG_ARG_COUNT,
      }
    );
    return expr_nodes[0];
  }

  preprocess(ctx: Macro_context): void {
    const parts = ctx.node.content.split(" ");
    this.assert_for_syntax(ctx, parts);

    const loop_var = parts[1];
    const pos = ctx.node.pos!;

    const body_node = this.find_body_node(ctx.node);
    ctx.compiler.error_tracker.assert(
      body_node !== null, 
      { 
        node: ctx.node, 
        message: "must have a `do` block",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );

    const iterable_ast = this.take_iterable_child(ctx);

    const idx_ident = ctx.compiler.get_new_ident(`for_${loop_var}__index`);
    const list_ident = ctx.compiler.get_new_ident(`for_${loop_var}__list`);

    const local_idx = ctx.compiler.make_node(`local ${idx_ident}`, pos, []);
    local_idx.append_child(
      ctx.compiler.make_node("int 0", pos, [])
    );

    const local_list = ctx.compiler.make_node(`local ${list_ident}`, pos, []);
    local_list.append_child(iterable_ast);

    const cond = ctx.compiler.make_node("do asc?", pos, []); // TODO this breaks if ever you rename the `asc?` though
    cond.append_child(
      ctx.compiler.make_node(`get ${idx_ident}`, pos, [])
    );
    cond.append_child(
      ctx.compiler.make_node(`get length from ${list_ident}`, pos, [])
    );

    const while_node = ctx.compiler.make_node("while", pos, []);
    while_node.append_child(cond);

    const bind_item = ctx.compiler.make_node(`local ${loop_var}`, pos, []);
    const bind_expr = ctx.compiler.make_node(`do # the ${list_ident}`, pos, []);
    bind_expr.append_child(
      ctx.compiler.make_node(`get ${idx_ident}`, pos, [])
    );
    bind_item.append_child(bind_expr);

    const inc_idx = ctx.compiler.make_node(`do ${idx_ident}`, pos, []);
    const add_the = ctx.compiler.make_node(`do sum the ${idx_ident}`, pos, []);
    add_the.append_child(
      ctx.compiler.make_node("int 1", pos, [])
    );
    inc_idx.append_child(add_the);

    const new_do = ctx.compiler.make_node("do", pos, []);
    new_do.append_child(bind_item);
    new_do.append_child(inc_idx);

    body_node!.children.forEach((stmt) => {
      new_do.append_child(stmt);
    });

    while_node.append_child(new_do);

    const replacement = ctx.compiler.make_node("do", pos, []);
    replacement.append_child(local_idx);
    replacement.append_child(local_list);
    replacement.append_child(while_node);

    const parent = ctx.node.parent;
    ctx.compiler.error_tracker.assert(
      parent !== null, 
      {
        node: ctx.node, 
        message: "internal error: for-node has no parent",
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    );

    parent!.replace_child(ctx.node, replacement);

    replacement.children.forEach((child) => {
      const cctx = ctx.clone_with({ node: child });
      cctx.apply();
    });
  }
}

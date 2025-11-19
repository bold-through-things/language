// macros/for_macro.ts

import {
  Macro_preprocess_provider,
  MacroContext
} from "../core/macro_registry.ts";

import { ErrorType } from "../utils/error_types.ts";
import { Node } from "../core/node.ts";

export class For_macro_provider implements Macro_preprocess_provider {
  private assert_for_syntax(ctx: MacroContext, parts: string[]): void {
    ctx.compiler.assert_(
      parts.length >= 3,
      ctx.node,
      "must have a syntax: for $ident in"
    );
    ctx.compiler.assert_(
      parts[0] === "for",
      ctx.node,
      "must start with `for`"
    );
    ctx.compiler.assert_(
      parts[2] === "in",
      ctx.node,
      "must have a syntax: for $ident in"
    );
  }

  private find_body_node(node: Node): Node | null {
    return node.children.find((c) => c.content === "do") ?? null;
  }

  private take_iterable_child(ctx: MacroContext): Node {
    const expr_nodes = ctx.node.children.filter((c) => c.content !== "do");
    ctx.compiler.assert_(
      expr_nodes.length === 1,
      ctx.node,
      `must have a single argument, the list provider (got ${expr_nodes.map((c) => c.content)})`,
      ErrorType.WRONG_ARG_COUNT
    );
    return expr_nodes[0];
  }

  preprocess(ctx: MacroContext): void {
    const parts = ctx.node.content.split(" ");
    this.assert_for_syntax(ctx, parts);

    const loop_var = parts[1];
    const pos = ctx.node.pos!;

    const body_node = this.find_body_node(ctx.node);
    ctx.compiler.assert_(body_node !== null, ctx.node, "must have a `do` block");

    const iterable_ast = this.take_iterable_child(ctx);

    const idx_ident = ctx.compiler.get_new_ident(`for_${loop_var}__index`);
    const list_ident = ctx.compiler.get_new_ident(`for_${loop_var}__list`);

    const local_idx = ctx.compiler.make_node(`local ${idx_ident}`, pos, []);
    local_idx.append_child(
      ctx.compiler.make_node("int 0", pos, [])
    );

    const local_list = ctx.compiler.make_node(`local ${list_ident}`, pos, []);
    local_list.append_child(iterable_ast);

    const cond = ctx.compiler.make_node("do asc", pos, []);
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
    const add_the = ctx.compiler.make_node(`do add the ${idx_ident}`, pos, []);
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
    ctx.compiler.assert_(parent !== null, ctx.node, "internal error: for-node has no parent");

    parent!.replace_child(ctx.node, replacement);

    replacement.children.forEach((child) => {
      const cctx = ctx.clone_with({ node: child });
      ctx.current_step!.process_node(cctx);
    });
  }
}

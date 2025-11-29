// macros/collection_macros.ts

import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  MacroContext,
} from "../core/macro_registry.ts";
import { Emission_item, IndentedStringIO, cut } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { type_registry, TypeParameter } from "../compiler_types/proper_types.ts";
import { Macro, type Node } from "../core/node.ts";
import type { TCResult } from "../core/macro_registry.ts";
import { TypeCheckingStep } from "../pipeline/steps/typechecking.ts";
import { assert_instanceof, Error_like } from "../utils/utils.ts";

const LIST_OPS = new Set(["append", "prepend", "insert_after_index"]);

export class List_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  typecheck(ctx: MacroContext): TCResult {
    const type_params: TypeParameter[] = [];
    const value_ops: Array<[Node, TCResult]> = [];

    const step = assert_instanceof(ctx.current_step, TypeCheckingStep);
    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      const res = step.process_node(child_ctx);

      if (res && res instanceof TypeParameter) {
        type_params.push(res);
      } else {
        const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
        if (LIST_OPS.has(macro_name)) {
          for (const g of child.children) {
            const g_ctx = ctx.clone_with({ node: g });
            value_ops.push([g, step.process_node(g_ctx)]);
          }
        } else {
          value_ops.push([child, res]);
        }
      }
    }

    if (type_params.length === 0) {
      ctx.compiler.compile_error(
        ctx.node,
        "List must specify element type. Add child `type ElementType` node.",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }
    if (type_params.length > 1) {
      ctx.compiler.compile_error(
        ctx.node,
        "List can only have one element type",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const element_type = type_params[0].type_expr;

    for (const [node, vtype] of value_ops) {
      if (!vtype) {
        continue;
      }
      if (
        typeof (vtype as any).is_assignable_to !== "function" ||
        !(vtype as any).is_assignable_to(element_type)
      ) {
        ctx.compiler.compile_error(
          node,
          `List element of type ${vtype} is not assignable to declared element type ${element_type}`,
          ErrorType.INVALID_MACRO,
        );
      }
    }

    const rv = type_registry().instantiate_generic("list", [element_type]);

    if (rv instanceof Error_like) {
      ctx.compiler.assert_(
        false,
        ctx.node,
        `Failed to instantiate list type: ${rv.message}`,
        ErrorType.INVALID_MACRO,
      );
    }

    return rv;
  }

  emission(ctx: MacroContext): void {
    if (ctx.node.children.length === 0) {
      ctx.expression_out.push(() => "[]");
      return;
    }

    const ops: Array<[string, string, Node[]]> = [];

    for (const child of ctx.node.children) {
      const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
      if (macro_name === "type") {
        continue;
      }
      if (LIST_OPS.has(macro_name)) {
        ops.push([macro_name, child.content, child.children]);
      } else {
        ops.push(["append", "", [child]]);
      }
    }

    const get_expr = (n: Node): Emission_item[] => {
      const out: Emission_item[] = [];
      const child_ctx = ctx.clone_with({ node: n, expression_out: out });
      ctx.current_step?.process_node(child_ctx);
      return out;
    };

    let final_items: Emission_item[] = [];

    for (const [op, content, kids] of ops) {
      if (op === "append") {
        for (const k of kids) {
          const ex = get_expr(k);
          if (ex) {
            final_items.push(...ex);
          }
        }
      } else if (op === "prepend") {
        const tmp: Emission_item[] = [];
        for (const k of [...kids].reverse()) {
          const ex = get_expr(k);
          if (ex) {
            tmp.push(...ex);
          }
        }
        final_items = [...tmp, ...final_items];
      } else if (op === "insert_after_index") {
        const parts = content.trim().split(/\s+/);
        if (parts.length !== 2) {
          ctx.compiler.compile_error(
            ctx.node,
            `insert_after_index expects format 'insert_after_index N', got '${content}'`,
            ErrorType.INVALID_MACRO,
          );
          continue;
        }
        const idx_raw = parts[1];
        const idx = parseInt(idx_raw, 10);
        if (Number.isNaN(idx)) {
          ctx.compiler.compile_error(
            ctx.node,
            `insert_after_index requires integer index, got '${idx_raw}'`,
            ErrorType.INVALID_MACRO,
          );
          continue;
        }
        kids.forEach((k, i) => {
          const ex = get_expr(k);
          if (!ex) {
            return;
          }
          const pos = idx + 1 + i;
          if (pos < 0) {
            final_items.unshift(...ex);
          } else if (pos >= final_items.length) {
            final_items.push(...ex);
          } else {
            final_items.splice(pos, 0, ...ex);
          }
        });
      }
    }

    ctx.expression_out.push(() => `[${final_items.filter(item => item != null).map(item => item()).join(", ")}]`);
  }
}

export class Dict_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider
{
  typecheck(ctx: MacroContext): TCResult {
    const type_params: TypeParameter[] = [];
    const entries: Array<[Node, TCResult, Node, TCResult]> = [];

    const step = assert_instanceof(ctx.current_step, TypeCheckingStep);
    for (const child of ctx.node.children) {
      const cctx = ctx.clone_with({ node: child });
      const res = step.process_node(cctx);

      if (res instanceof TypeParameter) {
        type_params.push(res);
        continue;
      }

      const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
      if (macro_name === "entry") {
        if (child.children.length !== 2) {
          ctx.compiler.compile_error(
            child,
            `Dict entry must have exactly 2 children (key, value), got ${child.children.length}`,
            ErrorType.INVALID_MACRO,
          );
          continue;
        }
        const key = child.children[0];
        const val = child.children[1];
        const kt = step.process_node(ctx.clone_with({ node: key }));
        const vt = step.process_node(ctx.clone_with({ node: val }));
        entries.push([key, kt, val, vt]);
      } else {
        ctx.compiler.compile_error(
          child,
          "Dict children must be either type declarations or entry operations",
          ErrorType.INVALID_MACRO,
        );
      }
    }

    let key_param: TypeParameter | null = null;
    let val_param: TypeParameter | null = null;

    for (const tp of type_params) {
      if (tp.parameter_name === "K") {
        key_param = tp;
      } else if (tp.parameter_name === "V") {
        val_param = tp;
      } else {
        ctx.compiler.compile_error(
          ctx.node,
          `Dict type parameter must be 'for K' or 'for V', got 'for ${tp.parameter_name}'`,
          ErrorType.INVALID_MACRO,
        );
      }
    }

    if (!key_param || !val_param) {
      ctx.compiler.compile_error(
        ctx.node,
        "Dict must specify both key type (for K) and value type (for V)",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const kt = key_param.type_expr;
    const vt = val_param.type_expr;

    for (const [kn, kty, vn, vty] of entries) {
      if (
        kty &&
        (!("is_assignable_to" in (kty as any)) ||
          !(kty as any).is_assignable_to(kt))
      ) {
        ctx.compiler.compile_error(
          kn,
          `Dict key of type ${kty} is not assignable to declared key type ${kt}`,
          ErrorType.INVALID_MACRO,
        );
      }
      if (
        vty &&
        (!("is_assignable_to" in (vty as any)) ||
          !(vty as any).is_assignable_to(vt))
      ) {
        ctx.compiler.compile_error(
          vn,
          `Dict value of type ${vty} is not assignable to declared value type ${vt}`,
          ErrorType.INVALID_MACRO,
        );
      }
    }

    const rv = type_registry().instantiate_generic("dict", [kt, vt]);
    if (rv instanceof Error_like) {
      ctx.compiler.assert_(
        false,
        ctx.node,
        `Failed to instantiate dict type: ${rv.message}`,
        ErrorType.INVALID_MACRO,
      );
    }
    
    return rv;
  }

  emission(ctx: MacroContext): void {
    if (ctx.node.children.length === 0) {
      ctx.expression_out.push(() => "{}");
      return;
    }

    const parts: Exclude<Emission_item, null>[] = [];

    for (const child of ctx.node.children) {
      const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
      if (macro_name === "type") {
        continue;
      }
      if (macro_name !== "entry") {
        ctx.compiler.compile_error(
          child,
          `Dict children must be 'entry' macros or type declarations, got '${macro_name}'`,
          ErrorType.INVALID_MACRO,
        );
        return;
      }
      if (child.children.length !== 2) {
        ctx.compiler.compile_error(
          child,
          `Dict entry must have exactly 2 children (key, value), got ${child.children.length}`,
          ErrorType.WRONG_ARG_COUNT,
        );
        return;
      }

      ctx.compiler.assert_(
        // TODO this means no comments here
        child.children.length === 2,
        child,
        "Dict entry must have exactly 2 children (key, value)",
        ErrorType.WRONG_ARG_COUNT,
      );

      const [key_node, val_node] = child.children;

      const kb: Emission_item[] = [];
      const vb: Emission_item[] = [];

      const k_ctx = ctx.clone_with({ node: key_node, expression_out: kb });
      const v_ctx = ctx.clone_with({ node: val_node, expression_out: vb });

      ctx.current_step?.process_node(k_ctx);
      ctx.current_step?.process_node(v_ctx);

      const kexp = kb[0];
      const vexp = vb[0];

      ctx.compiler.assert_(
        kexp != null,
        key_node,
        "Dict entry key must produce a single expression",
        ErrorType.INVALID_STRUCTURE,
      );
      ctx.compiler.assert_(
        vexp != null,
        val_node,
        "Dict entry value must produce a single expression",
        ErrorType.INVALID_STRUCTURE,
      );

      if (kexp && vexp) {
        parts.push(() => `[${kexp()}]: ${vexp()}`);
      }
    }

    ctx.expression_out.push(() => parts.length === 0 ? "{}" : `{${parts.map(p => p()).join(", ")}}`);
  }
}

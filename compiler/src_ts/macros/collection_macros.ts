// macros/collection_macros.ts

import {
  REGISTER_MACRO_PROVIDERS,
} from "../core/macro_registry.ts";
import { Emission_item } from "../utils/strutil.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Macro, Resolved_type, type Node } from "../core/node.ts";
import type { Macro_provider, Register_macro_providers } from "../core/macro_registry.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Expression_return_type, Type, Type_check_result, Type_reference } from "../compiler_types/proper_types.ts";
import { Error_caused_by } from "../utils/utils.ts";

const LIST_OPS = new Set(["append", "prepend", "insert_after_index"]);

export class List_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, "list", this.typecheck.bind(this));
    via(Emission_macro_context, "list", this.emission.bind(this));
  }
  
  typecheck(ctx: Type_checking_context): Type_check_result {
    const type_params: Type_reference[] = [];
    const value_ops: Array<[Node, Type]> = [];

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      const res = child_ctx.apply();

      if (res instanceof Type_reference) {
        type_params.push(res);
      } else {
        const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
        if (LIST_OPS.has(macro_name)) {
          for (const g of child.children) {
            const g_ctx = ctx.clone_with({ node: g });
            const tc = g_ctx.apply();
            ctx.compiler.error_tracker.assert(
              tc instanceof Expression_return_type,
              {
                node: g,
                message: "tc instanceof Expression_return_type",
                type: ErrorType.INTERNAL_CODE_QUALITY,
              }
            );
            value_ops.push([g, tc.type]);
          }
        } else {
          if (res instanceof Expression_return_type) {
            value_ops.push([child, res.type]);
          }
        }
      }
    }

    if (type_params[0] === undefined) {
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: "List must specify element type. Add child `type ElementType` node.",
        type: ErrorType.INVALID_MACRO,
      });
      return null;
    }
    if (type_params.length > 1) {
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: "List can only have one element type",
        type: ErrorType.INVALID_MACRO,
      });
      return null;
    }

    const element_type = type_params[0].ref;

    for (const [_node, vtype] of value_ops) {
      if (!vtype) {
        continue;
      }
      ctx.compiler.error_tracker.assert(
        ctx.type_engine.can_assign({value_type: vtype, field_type: element_type}),
        {
          node: ctx.node,
          message: `type mismatch assigning \`${vtype}\` to \`${element_type}\``,
          type: ErrorType.TYPE_MISMATCH,
        }
      );
    }

    const rv = ctx.type_engine.instantiate_generic({
      name: "list", 
      type_args: [element_type],
      ctx,
      caused_by: Error_caused_by.USER
    });

    ctx.compiler.error_tracker.assert(
      rv instanceof Type,
      {
        node: ctx.node,
        message: `list type instantiation error`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    return new Expression_return_type(rv);
  }

  emission(ctx: Emission_macro_context): void {
    const resolved = ctx.compiler.get_metadata(
      ctx.node,
      Resolved_type
    ).type;

    ctx.compiler.error_tracker.assert(
      resolved instanceof Expression_return_type,
      {
        node: ctx.node,
        message: "resolved instanceof Expression_return_type",
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    );
    if (ctx.node.children.length === 0) {
      ctx.expression_out.push(() => `[] as ${resolved.type.to_typescript()}`);
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
      child_ctx.apply();
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
        const parts = content.trim().split(/\s+/, 2);
        ctx.compiler.error_tracker.assert(
          parts[0] !== undefined && parts[1] !== undefined,
          {
            node: ctx.node,
            message: `insert_after_index expects format 'insert_after_index N', got '${content}'`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        const idx_raw = parts[1];
        const idx = parseInt(idx_raw, 10);
        if (Number.isNaN(idx)) {
          ctx.compiler.error_tracker.fail({
            node: ctx.node,
            message: `insert_after_index requires integer index, got '${idx_raw}'`,
            type: ErrorType.INVALID_MACRO,
          });
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

    ctx.expression_out.push(() => `[${final_items.filter(item => item != null).map(item => item()).join(", ")}] as ${resolved.type.to_typescript()}`);
  }
}

export class Dict_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, "dict", this.typecheck.bind(this));
    via(Emission_macro_context, "dict", this.emission.bind(this));
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const type_params: Type_reference[] = [];
    const entries: [Node, Type, Node, Type][] = [];

    for (const child of ctx.node.children) {
      const cctx = ctx.clone_with({ node: child });
      const res = cctx.apply();

      if (res instanceof Type_reference) {
        type_params.push(res);
        continue;
      }

      const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
      if (macro_name === "entry") {
        ctx.compiler.error_tracker.assert(
          child.children[0] !== undefined && child.children[1] !== undefined,
          {
            node: child,
            message: `Dict entry must have exactly 2 children (key, value), got ${child.children.length}`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        const key = child.children[0];
        const val = child.children[1];
        const kt = ctx.clone_with({ node: key }).apply();
        const vt = ctx.clone_with({ node: val }).apply();
      
        ctx.compiler.error_tracker.assert(
          kt instanceof Expression_return_type,
          {
            node: key,
            message: "kt instanceof Expression_return_type",
            type: ErrorType.INTERNAL_CODE_QUALITY,
          }
        );
        ctx.compiler.error_tracker.assert(
          vt instanceof Expression_return_type,
          {
            node: val,
            message: "vt instanceof Expression_return_type",
            type: ErrorType.INTERNAL_CODE_QUALITY,
          }
        );

        entries.push([key, kt.type, val, vt.type]);
      } else {
        ctx.compiler.error_tracker.fail({
          node: child,
          message: "Dict children must be either type declarations or entry operations",
          type: ErrorType.INVALID_MACRO,
        });
      }
    }

    let key_param: Type_reference | null = null;
    let val_param: Type_reference | null = null;

    for (const tp of type_params) {
      if (tp.parameter_name === "K") {
        key_param = tp;
      } else if (tp.parameter_name === "V") {
        val_param = tp;
      } else {
        ctx.compiler.error_tracker.fail({
          node: ctx.node,
          message: `Dict type parameter must be 'for K' or 'for V', got 'for ${tp.parameter_name}'`,
          type: ErrorType.INVALID_MACRO,
        });
      }
    }

    if (!key_param || !val_param) {
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: "Dict must specify both key type (for K) and value type (for V)",
        type: ErrorType.INVALID_MACRO,
      });
      return null;
    }

    const kt = key_param.ref;
    const vt = val_param.ref;

    for (const [_kn, kty, _vn, vty] of entries) {
      ctx.compiler.error_tracker.assert(
        ctx.type_engine.can_assign({value_type: kty, field_type: kt}),
        {
          node: ctx.node,
          message: `type mismatch assigning \`${kty}\` to \`${kt}\``,
          type: ErrorType.TYPE_MISMATCH,
        }
      );
      ctx.compiler.error_tracker.assert(
        ctx.type_engine.can_assign({value_type: vty, field_type: vt}),
        {
          node: ctx.node,
          message: `type mismatch assigning \`${vty}\` to \`${vt}\``,
          type: ErrorType.TYPE_MISMATCH,
        }
      );
    }

    const rv = ctx.type_engine.instantiate_generic({
      name: "dict", 
      type_args: [kt, vt],
      ctx,
      caused_by: Error_caused_by.USER
    });
    
    ctx.compiler.error_tracker.assert(
      rv instanceof Type, 
      {
        node: ctx.node,
        message: `rv instanceof Type`,
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    );
    
    return new Expression_return_type(rv);
  }

  emission(ctx: Emission_macro_context): void {
    const resolved = ctx.compiler.get_metadata(
      ctx.node,
      Resolved_type
    ).type;

    ctx.compiler.error_tracker.assert(
      resolved instanceof Expression_return_type,
      {
        node: ctx.node,
        message: "resolved instanceof Expression_return_type",
        type: ErrorType.INTERNAL_CODE_QUALITY,
      }
    );
    if (ctx.node.children.length === 0) {
      ctx.expression_out.push(() => `{} as ${resolved.type.to_typescript()}`);
      return;
    }

    const parts: Exclude<Emission_item, null>[] = [];

    for (const child of ctx.node.children) {
      const macro_name = ctx.compiler.get_metadata(child, Macro).toString();
      if (macro_name === "type") {
        continue;
      }
      if (macro_name !== "entry") {
        ctx.compiler.error_tracker.fail({
          node: child,
          message: `Dict children must be 'entry' macros or type declarations, got '${macro_name}'`,
          type: ErrorType.INVALID_MACRO,
        });
        return;
      }
      if (child.children.length !== 2) {
        ctx.compiler.error_tracker.fail({
          node: child,
          message: `Dict entry must have exactly 2 children (key, value), got ${child.children.length}`,
          type: ErrorType.WRONG_ARG_COUNT,
        });
        return;
      }

      ctx.compiler.error_tracker.assert(
        // TODO this means no comments here
        child.children[0] !== undefined && child.children[1] !== undefined,
        {
          node: child,
          message: "Dict entry must have exactly 2 children (key, value)",
          type: ErrorType.WRONG_ARG_COUNT,
        }
      );

      const [key_node, val_node] = child.children;

      const kb: Emission_item[] = [];
      const vb: Emission_item[] = [];

      const k_ctx = ctx.clone_with({ node: key_node, expression_out: kb });
      const v_ctx = ctx.clone_with({ node: val_node, expression_out: vb });

      k_ctx.apply();
      v_ctx.apply();

      const kexp = kb[0];
      const vexp = vb[0];

      ctx.compiler.error_tracker.assert(
        kexp != null,
        {
          node: key_node,
          message: "Dict entry key must produce a single expression",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );
      ctx.compiler.error_tracker.assert(
        vexp != null,
        {
          node: val_node,
          message: "Dict entry value must produce a single expression",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );

      if (kexp && vexp) {
        parts.push(() => `[${kexp()}]: ${vexp()}`);
      }
    }

    ctx.expression_out.push(
      () => 
        parts.length === 0 ? 
          `{} as ${resolved.type.to_typescript()}` : 
          `{${parts.map(p => p()).join(", ")}} as ${resolved.type.to_typescript()}`
        );
  }
}

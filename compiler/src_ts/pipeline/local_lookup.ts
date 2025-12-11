// pipeline/local_lookup.ts
// Upwalking utilities for scope resolution.

import { Node } from "../core/node.ts";
import { Macro_context } from "../core/macro_registry.ts";
import { ErrorType } from "../utils/error_types.ts";

export class UpwalkerResult<T> {
  node: Node;
  found: T | null;

  constructor(node: Node, found: T | null) {
    this.node = node;
    this.found = found;
  }
}

export type Search_strategy<T> = (req: Match_request) => T | null;

export type Match_request = {
  ctx: Macro_context;
  is_direct_parent: boolean;
}

export class Upwalker<T> {
  constructor(private strategy: Search_strategy<T>) {}

  find(ctx: Macro_context): UpwalkerResult<T> | null {
    let current: Node | null = ctx.node;

    while (current) {
      const current_ctx = ctx.clone_with({ node: current });

      const parent: Node | null = current.parent;
      if (parent) {
        const siblings: Node[] = parent.children;
        let current_index: number | null = null;

        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i] == current) {
            current_index = i;
            break;
          }
        }

        if (current_index !== null) {
          const start_index = current_index;
          for (let i = start_index; i >= 0; i--) {
            const sibling = siblings[i];

            ctx.compiler.error_tracker.assert(
              sibling != undefined,
              {
                node: current,
                message: "Sibling node is undefined during upwalk",
                type: ErrorType.INTERNAL_CODE_QUALITY,
              },
            );

            const sib_ctx = current_ctx.clone_with({ node: sibling });

            const res = this.strategy({ ctx: sib_ctx, is_direct_parent: i === start_index });
            if (res) {
              return new UpwalkerResult(sib_ctx.node, res);
            }
          }
        }
      }

      current = current.parent;
    }

    return null;
  }
}

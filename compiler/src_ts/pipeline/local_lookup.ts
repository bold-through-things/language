// pipeline/local_lookup.ts
// Upwalking utilities for scope resolution.

import { MacroContext } from "../core/macro_registry.ts";
import { FieldDemandType, Macro, Node, Position, SaneIdentifier } from "../core/node.ts";
import {
  get_single_arg,
} from "../utils/common_utils.ts";
import { default_logger } from "../utils/logger.ts";
import {
  seek_child_macro,
} from "../pipeline/steps/utils.ts";
import { Type, TypeParameter } from "../compiler_types/proper_types.ts";
import { MetaCtor } from "../core/macrocosm.ts";

// ------------------------------------------------------------
// Result
// ------------------------------------------------------------

export class UpwalkerResult<T> {
  node: Node;
  found: T | null;

  constructor(node: Node, found: T | null) {
    this.node = node;
    this.found = found;
  }
}

// ------------------------------------------------------------
// Strategy base
// ------------------------------------------------------------

export abstract class SearchStrategy<T> {
  abstract try_match(ctx: MacroContext): UpwalkerResult<T> | null;
  abstract search_in_noscope(ctx: MacroContext): UpwalkerResult<T> | null;
}

// ------------------------------------------------------------
// Local name lookup
// ------------------------------------------------------------

export class LocalNameSearchStrategy extends SearchStrategy<Type> {
  constructor(private name: string) {
    super();
  }

  try_match(ctx: MacroContext): UpwalkerResult<Type> | null {
    let mname: string;
    try {
      mname = ctx.compiler.get_metadata(ctx.node, Macro)?.toString() ?? "";
    } catch {
      return null;
    }

    let desired_local_name: string;
    switch (mname) {
      case "local":
      case "67lang:assume_local_exists":
        desired_local_name = get_single_arg(ctx);
        break;
      default:
        return null;
    }

    const sane = ctx.compiler.maybe_metadata(ctx.node, SaneIdentifier)?.toString();
    if (this.name === desired_local_name || (sane && this.name === sane)) {
      default_logger.typecheck(
        `LocalNameSearchStrategy: found ${this.name} at ${ctx.node.content}`,
      );
      const demanded = ctx.compiler
        .maybe_metadata(ctx.node, FieldDemandType)
        ?.tc;
      default_logger.typecheck(
        `LocalNameSearchStrategy: found type ${demanded} in metadata`,
      );
      if (demanded && demanded instanceof TypeParameter) {
        throw "wtf";
      }
      return new UpwalkerResult(ctx.node, demanded ?? null);
    }

    return null;
  }

  search_in_noscope(ctx: MacroContext): UpwalkerResult<Type> | null {
    for (const child of ctx.node.children) {
      const res = this.try_match(ctx.clone_with({ node: child }));
      if (res) {
        return res;
      }
    }
    return null;
  }
}

// ------------------------------------------------------------
// then-chain lookup
// ------------------------------------------------------------

export class LastThenSearchStrategy extends SearchStrategy<Type> {
  try_match(ctx: MacroContext): UpwalkerResult<Type> | null {
    try {
      const mname = ctx.compiler.get_metadata(ctx.node, Macro)?.toString() ?? "";
      if (mname === "local") {
        if (
          ctx.node.children.length > 0 &&
          ctx.node.children[0].content === "67lang:last_then"
        ) {
          default_logger.typecheck(
            `LastThenSearchStrategy: found ${ctx.node.content}`,
          );
          const demanded = ctx.compiler
            .maybe_metadata(ctx.node, FieldDemandType)
            ?.tc;
          default_logger.typecheck(
            `LastThenSearchStrategy: found type ${demanded} in metadata`,
          );
          if (demanded && demanded instanceof TypeParameter) {
            throw "wtf";
          }
          return new UpwalkerResult(ctx.node, demanded ?? null);
        }
      }
    } catch {
      // ignore
    }
    return null;
  }

  search_in_noscope(ctx: MacroContext): UpwalkerResult<Type> | null {
    for (const child of ctx.node.children) {
      const res = this.try_match(ctx.clone_with({ node: child }));
      if (res) {
        return res;
      }
    }
    return null;
  }
}

export class MetadataSearchStrategy<T> extends SearchStrategy<T> {
  constructor(private meta: MetaCtor<T>) {
    super();
  }

  try_match(ctx: MacroContext): UpwalkerResult<T> | null {
    const meta = ctx.compiler.maybe_metadata(ctx.node, this.meta);
    if (meta !== undefined) {
      default_logger.typecheck( // TODO it's not typecheck i think though...
        `MetadataSearchStrategy: found metadata ${this.meta.name} at ${ctx.node.content}`,
      );
      return new UpwalkerResult(ctx.node, meta);
    }
    return null;
  }

  search_in_noscope(ctx: MacroContext): UpwalkerResult<T> | null {
    for (const child of ctx.node.children) {
      const res = this.try_match(ctx.clone_with({ node: child }));
      if (res) {
        return res;
      }
    }
    return null;
  }
}

// ------------------------------------------------------------
// Upwalker
// ------------------------------------------------------------

export class Upwalker<T> {
  constructor(private strategy: SearchStrategy<T>) {}

  find(ctx: MacroContext): UpwalkerResult<T> | null {
    let current: Node | null = ctx.node;
    const compiler = ctx.compiler;

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
          for (let i = current_index - 1; i >= 0; i--) {
            const sibling = siblings[i];
            const sib_ctx = current_ctx.clone_with({ node: sibling });

            const res = this.strategy.try_match(sib_ctx);
            if (res) {
              return res;
            }

            let mname: string | null = null;
            try {
              mname = compiler.get_metadata(sibling, Macro)?.toString() ?? null;
            } catch {
              mname = null;
            }

            if (mname === "noscope") {
              const r2 = this.strategy.search_in_noscope(sib_ctx);
              if (r2) {
                return r2;
              }
            }
          }
        }
      }

      current = current.parent;
    }

    return null;
  }
}

// ------------------------------------------------------------
// Backcompat helpers
// ------------------------------------------------------------

export function walk_upwards_for_local_definition(
  ctx: MacroContext,
  name: string,
): UpwalkerResult<Type> | null {
  return new Upwalker(new LocalNameSearchStrategy(name)).find(ctx);
}

// pipeline/steps/utils.ts

import { cut } from "../../utils/strutil.ts";
import type { Node } from "../../core/node.ts";

// unroll_parent_chain(n)
export function unroll_parent_chain(n: Node | null): Node[] {
  const out: Node[] = [];
  let cur: Node | null = n;
  while (cur !== null) {
    out.push(cur);
    cur = cur.parent ?? null;
  }
  return out;
}

// seek_child_macro(n, macro_name)
export function seek_child_macro(n: Node, macro_name: string): Node | null {
  for (const child of n.children) {
    const [m] = cut(child.content, " ");
    if (m === macro_name) {
      return child;
    }
  }
  return null;
}

// seek_all_child_macros(n, macro_name)
export function seek_all_child_macros(n: Node, macro_name: string): Node[] {
  const out: Node[] = [];
  for (const child of n.children) {
    const [m] = cut(child.content, " ");
    if (m === macro_name) {
      out.push(child);
    }
  }
  return out;
}

export const TYPICAL_IGNORED_MACROS = new Set<string>(["type", "noscope"]);

// filter_child_macros(n)
export function filter_child_macros(n: Node): Node[] {
  return n.children.filter((c) => {
    const [macro_name] = cut(c.content, " ");
    return !TYPICAL_IGNORED_MACROS.has(macro_name);
  });
}

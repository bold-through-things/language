// macros/exists_macro.ts

import { Macro_emission_provider } from "../core/macro_registry.ts";
import { MacroContext } from "../core/macro_registry.ts";
import { Args, Node } from "../core/node.ts";
import { cut } from "../utils/strutil.ts";

export class Exists_macro_provider implements Macro_emission_provider {

  emission(ctx: MacroContext): void {
    let target: Node | null = null;
    const others: Node[] = [];

    for (const child of ctx.node.children) {
      const [mname] = cut(child.content, " ");
      if (mname === "inside") {
        const argsStr = ctx.compiler.get_metadata(child, Args)?.toString() ?? "";
        ctx.compiler.assert_(argsStr.trim() === "", child, "inside must have no arguments");
        ctx.compiler.assert_(child.children.length === 1, child, "inside must have one child");
        target = child.children[0];
      } else {
        others.push(child);
      }
    }

    ctx.compiler.assert_(target !== null, ctx.node, "exists must have an inside modifier");

    ctx.compiler.compile_fn_call(
      ctx,
      "await _67lang.exists_inside(",
      [target as Node, ...others],
    );
  }
}

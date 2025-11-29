// pipeline/steps/type_checking.ts

import { MacroProcessingStep } from "./base.ts";
import { Macro_ctx_typecheck_proc, MacroContext, MacroRegistry, TCResult } from "../../core/macro_registry.ts";
import { Macro, Resolved_type } from "../../core/node.ts";
import { default_logger } from "../../utils/logger.ts";

export class TypeCheckingStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry<Macro_ctx_typecheck_proc>) {
    super();
    this.macros = macros;
  }

  process_node(ctx: MacroContext): TCResult {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const allMacros = this.macros.all();

    const content = ctx.node.content;
    const preview =
      content.length > 50
        ? content.slice(0, 50) + "..."
        : content;

    const nodeDesc = `node ${macroName}: ${preview}`;

    return default_logger.indent("typecheck", nodeDesc, () => {
      if (macroName in allMacros) {
        let result: TCResult = null;
        ctx.compiler.safely(() => {
          result = allMacros[macroName].call(ctx, ctx);
        });
        ctx.compiler.set_metadata(
          ctx.node,
          Resolved_type,
          new Resolved_type(result),
        );
        return result;
      } else {
        let last: TCResult = null;
        ctx.node.children.forEach((child) => {
          const childCtx = ctx.clone_with({ node: child });
          last = this.process_node(childCtx);
        });
        ctx.compiler.set_metadata(
          ctx.node,
          Resolved_type,
          new Resolved_type(last),
        );
        return last;
      }
    });
  }
}

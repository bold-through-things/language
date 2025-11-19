// pipeline/steps/preprocessing.ts

import { MacroProcessingStep } from "./base.ts";
import { MacroContext, MacroRegistry } from "../../core/macro_registry.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { Macro } from "../../core/node.ts";

export class PreprocessingStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry) {
    super();
    this.macros = macros;
  }

  process_node(ctx: MacroContext): null {
    default_logger.macro(`preprocessing node: ${ctx.node.content}`);

    // Validate indentation: ensure content doesn't start with whitespace
    if (ctx.node.content.length > 0 && /^\s/.test(ctx.node.content[0])) {
      ctx.compiler.compile_error(
        ctx.node,
        "oh spaces? yea? how many, two, or four, or maybe six?!",
        ErrorType.INVALID_INDENTATION,
      );
    }

    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const all = this.macros.all();

    default_logger.macro(`  -> Current node macro: ${macroName}`);
    default_logger.macro(
      `  -> Available preprocessors: [${Object.keys(all).join(", ")}]`,
    );

    const fn = all[macroName];

    if (fn) {
      default_logger.macro(`applying preprocessor for macro: ${macroName}`);
      ctx.compiler.safely(() => {
        fn.call(ctx, ctx);
      });
    } else {
      default_logger.macro(`no preprocessor for macro: ${macroName}`);
      default_logger.indent("macro", `preprocessing children of ${ctx.node.content}`, () => {
        ctx.node.children.forEach((child, i) => {
          default_logger.indent("macro", `child ${i}: ${child.content}`, () => {
            ctx.compiler.safely(() => {
              const childCtx = ctx.clone_with({ node: child });
              this.process_node(childCtx);
            });
          });
        });
      });
    }

    return null;
  }
}

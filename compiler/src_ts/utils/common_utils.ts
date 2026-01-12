// utils/common_utils.ts

import { cut, Emission_item } from "./strutil.ts";
import { Macro_context } from "../core/macro_registry.ts";
import { Args } from "../core/node.ts";
import { default_logger } from "./logger.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { ErrorType } from "./error_types.ts";

// Expressions from children
export function collect_child_expressions(ctx: Emission_macro_context): Emission_item[] {
  const expressions: Emission_item[] = [];

  return default_logger.indent(ctx, "debug", `collect_child_expressions`, () => {
    ctx.node.children.forEach((child, i) => {
      default_logger.indent(ctx, "debug", `processing child ${i}: ${child.content}`, () => {
        const out: Emission_item[] = [];
        const cctx = ctx.clone_with({ node: child, expression_out: out });
        cctx.apply();

        expressions.push(...out);
      });
    });

    const result = expressions.filter((x) => x != null);
    default_logger.log(ctx, "debug", `filtered ${expressions.length} -> ${result.length} non-empty expressions`);

    return result;
  });
}

// Run a processing step for children with safety wrapper
export function process_children_with_context(
  ctx: Macro_context,
): void {

  ctx.node.children.forEach((child, i) => {
    default_logger.indent(ctx, "debug", `processing child ${i}: ${child.content}`, () => {
      ctx.compiler.error_tracker.safely(ctx, () => {
        const cctx = ctx.clone_with({ node: child });
        cctx.apply();
      });
    });
  });
}

// Metadata arg getter
export function get_args_string(
  ctx: Macro_context,
): string {
  return ctx.compiler.get_metadata(ctx.node, Args).toString();
}

// Require exactly one arg
export function get_single_arg(
  ctx: Macro_context,
  error_msg = "must have a single argument",
): string {
  const args = get_args_string(ctx);
  const [first, rest] = cut(args, " ");

  ctx.compiler.error_tracker.assert(
    rest === "",
    {
      node: ctx.node,
      message: error_msg,
      type: ErrorType.INVALID_MACRO,
    }
  );

  return first;
}

// Require exactly two args
export function get_two_args(
  ctx: Macro_context,
  error_msg = "must have exactly two arguments",
): [string, string] {
  const args = get_args_string(ctx);
  const parts = args.split(" ", 2);

  ctx.compiler.error_tracker.assert(
    parts[0] !== undefined && parts[1] !== undefined,
    {
      node: ctx.node,
      message: error_msg,
      type: ErrorType.INVALID_MACRO,
    }
  );

  return [parts[0], parts[1]];
}

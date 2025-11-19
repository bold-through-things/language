// utils/common_utils.ts

import { cut } from "./strutil.ts";
import { MacroContext } from "../core/macro_registry.ts";
import { Args, Node } from "../core/node.ts";
import { default_logger } from "./logger.ts";
import { IndentedStringIO } from "../utils/strutil.ts";

// Expressions from children
export function collect_child_expressions(ctx: MacroContext): string[] {
  const expressions: (string | null)[] = [];

  default_logger.debug(`collecting expressions from ${ctx.node.children.length} children`);

  ctx.node.children.forEach((child, i) => {
    default_logger.indent("debug", `processing child ${i}: ${child.content}`, () => {
      const out = new IndentedStringIO();
      const cctx = ctx.clone_with({ node: child, expression_out: out });
      ctx.current_step!.process_node(cctx);

      const value = out.gets_to_end();
      expressions.push(value === "" ? null : value);

      default_logger.debug(`child ${i} produced: '${value}'`);
    });
  });

  const result = expressions.filter((x): x is string => x !== null);
  default_logger.debug(`filtered ${expressions.length} -> ${result.length} non-empty expressions`);

  return result;
}

// Types from children
export function collect_child_types(ctx: MacroContext): string[] {
  const types: string[] = [];

  default_logger.typecheck(`collecting types from ${ctx.node.content}`);

  ctx.node.children.forEach((child, i) => {
    default_logger.indent("typecheck", `type checking child ${i}: ${child.content}`, () => {
      const cctx = ctx.clone_with({ node: child });
      const t = ctx.current_step!.process_node(cctx);

      if (t) {
        types.push(String(t));
        default_logger.typecheck(`child ${i} has type: '${t}'`);
      } else {
        default_logger.typecheck(`child ${i} has type: <nil>`);
      }
    });
  });

  default_logger.typecheck(`filtered ${types.length} non-empty types`);
  return types;
}

// Run a processing step for children with safety wrapper
export function process_children_with_context(
  ctx: MacroContext,
  step_processor: { process_node(c: MacroContext): any },
): void {
  default_logger.debug(
    `processing children of ${ctx.node.content} with ${step_processor.constructor.name}`,
  );

  ctx.node.children.forEach((child, i) => {
    default_logger.indent("debug", `processing child ${i}: ${child.content}`, () => {
      ctx.compiler.safely(() => {
        const cctx = ctx.clone_with({ node: child });
        step_processor.process_node(cctx);
      });
    });
  });
}

// Metadata arg getter
export function get_args_string(ctx: MacroContext): string {
  const args = ctx.compiler.get_metadata(ctx.node, Args).toString();
  default_logger.debug(`extracted args: '${args}'`);
  return args;
}

// Require exactly one arg
export function get_single_arg(
  ctx: MacroContext,
  error_msg = "must have a single argument",
): string {
  const args = get_args_string(ctx);
  const [first, rest] = cut(args, " ");

  ctx.compiler.assert_(rest === "", ctx.node, error_msg);
  default_logger.debug(`validated single arg: '${first}'`);

  return first;
}

// Require exactly two args
export function get_two_args(
  ctx: MacroContext,
  error_msg = "must have exactly two arguments",
): [string, string] {
  const args = get_args_string(ctx);
  const parts = args.split(" ");

  ctx.compiler.assert_(parts.length === 2, ctx.node, error_msg);
  default_logger.debug(`validated two args: '${parts[0]}', '${parts[1]}'`);

  return [parts[0], parts[1]];
}

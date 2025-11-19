// macros/try_catch_macro.ts

import {
  Macro_emission_provider,
  Macro_preprocess_provider,
  MacroContext,
} from "../core/macro_registry.ts";

import { Node, Args } from "../core/node.ts";
import { IndentedStringIO } from "../utils/strutil.ts";

export class Try_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext) {
    ctx.statement_out.write("try {\n");
    ctx.statement_out.with_indent(() => {
      for (const child of ctx.node.children) {
        const child_ctx = ctx.clone_with({ node: child });
        ctx.current_step!.process_node(child_ctx);
        ctx.statement_out.write("\n");
      }
    });
    ctx.statement_out.write("}");
  }
}

export class Catch_macro_provider
  implements Macro_emission_provider, Macro_preprocess_provider
{
  preprocess(ctx: MacroContext) {
    const args = ctx.compiler.get_metadata(ctx.node, Args)?.toString() ?? "";
    const error_var = args.trim() === "" ? "error" : args.trim();

    const local_node = ctx.compiler.make_node(
      `local ${error_var}`,
      ctx.node.pos,
      [
        ctx.compiler.make_node(
          `67lang:obtain_param_value ${error_var}`,
          ctx.node.pos,
          [],
        ),
        ctx.compiler.make_node(
          "type Error",
          ctx.node.pos,
          [],
        ),
      ],
    );

    ctx.node.prepend_child(local_node);

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      ctx.current_step!.process_node(child_ctx);
    }
  }

  emission(ctx: MacroContext) {
    const args = ctx.compiler.get_metadata(ctx.node, Args)?.toString() ?? "";
    const error_var = args.trim() === "" ? "error" : args.trim();

    ctx.statement_out.write(`catch (${error_var}) {\n`);
    ctx.statement_out.with_indent(() => {
      for (const child of ctx.node.children) {
        const child_ctx = ctx.clone_with({ node: child });
        ctx.current_step!.process_node(child_ctx);
        ctx.statement_out.write("\n");
      }
    });
    ctx.statement_out.write("}");
  }
}

export class Finally_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext) {
    ctx.statement_out.write("finally {\n");
    ctx.statement_out.with_indent(() => {
      for (const child of ctx.node.children) {
        const child_ctx = ctx.clone_with({ node: child });
        ctx.current_step!.process_node(child_ctx);
        ctx.statement_out.write("\n");
      }
    });
    ctx.statement_out.write("}");
  }
}

export class Throw_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext) {
    if (ctx.node.children.length === 0) {
      ctx.statement_out.write("throw;");
      return;
    }

    const child = ctx.node.children[0];
    const expr_out = new IndentedStringIO();
    const child_ctx = ctx.clone_with({ node: child, expression_out: expr_out });
    ctx.current_step!.process_node(child_ctx);

    ctx.statement_out.write(`throw ${expr_out.gets_to_end()};`);
  }
}

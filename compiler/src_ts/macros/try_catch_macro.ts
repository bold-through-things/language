// macros/try_catch_macro.ts

import {
  Macro_emission_provider,
  Macro_preprocess_provider,
  MacroContext,
} from "../core/macro_registry.ts";

import { Node, Args } from "../core/node.ts";
import { BRACES, IndentedStringIO, PARENTHESIS, statement_block, statement_blocks, statement_raw } from "../utils/strutil.ts";

export class Try_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext) {
    const catch_blocks: (typeof try_block)[] = [];
    const new_catch = () => {
      const rv = [statement_block("catch", PARENTHESIS), statement_block(null, BRACES)]
      catch_blocks.push(...rv);
      return rv;
    };
    const stmt = ctx.push(statement_blocks(
      statement_block("try", BRACES),
      statement_block("finally", BRACES),
    ))
    const [try_block, finally_block] = stmt;

    for (const child of ctx.node.children) {
      if (child.content.startsWith("catch")) { // TODO cut macro
        const catch_ = child;

        const [catch_header, catch_body] = new_catch();

        const args = ctx.compiler.get_metadata(catch_, Args)?.toString() ?? "";
        const error_var = args.trim() === "" ? "error" : args.trim();
        catch_header.push(statement_raw(error_var));

        for (const catch_child of catch_.children) {
          const catch_ctx = ctx.clone_with({ node: catch_child, statement_out: catch_body });
          ctx.current_step!.process_node(catch_ctx);
        }
        continue;
      }

      if (child.content.startsWith("finally")) {
        const finally_ctx = ctx.clone_with({ node: child, statement_out: finally_block });
        ctx.current_step!.process_node(finally_ctx);
        continue;
      }

      const child_ctx = ctx.clone_with({ node: child, statement_out: try_block });
      ctx.current_step!.process_node(child_ctx);
    }

    stmt.blocks.splice(1, 0, ...catch_blocks);
  }
}

export class Catch_macro_provider
  implements Macro_preprocess_provider
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
}

export class Throw_macro_provider implements Macro_emission_provider {
  emission(ctx: MacroContext) {
    if (ctx.node.children.length === 0) {
      ctx.statement_out.push(statement_raw("throw;"));
      return;
    }

    const child = ctx.node.children[0];
    const expr_out = new IndentedStringIO();
    const child_ctx = ctx.clone_with({ node: child, expression_out: expr_out });
    ctx.current_step!.process_node(child_ctx);

    ctx.statement_out.push(statement_raw(`throw ${expr_out.gets_to_end()};`));
  }
}

// macros/try_catch_macro.ts

import { Type_check_result } from "../compiler_types/proper_types.ts";
import {
  Register_macro_providers,
  Macro_provider,
  REGISTER_MACRO_PROVIDERS,
} from "../core/macro_registry.ts";

import { Args } from "../core/node.ts";
import { Async_mode, LocalAccessCall } from "../pipeline/call_conventions.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { ErrorType } from "../utils/error_types.ts";
import { BRACES, Emission_item, PARENTHESIS, statement_block, statement_blocks } from "../utils/strutil.ts";
import { first_matching_key } from "../utils/utils.ts";
import { Provides_locals__metadata, Upwalker_visibility } from "./local_macro.ts";

export class Try_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Type_checking_context, "try", this.typecheck.bind(this));
    via(Emission_macro_context, "try", this.emission.bind(this));
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    for (const child of ctx.node.children) {
      if (child.content.startsWith("catch")) { // TODO cut macro
        const catch_ = child;
        const args = ctx.compiler.get_metadata(catch_, Args)?.toString() ?? "";
        const error_var = args.trim() === "" ? "error" : args.trim();
        const sane_name = ctx.compiler.get_new_ident(error_var);

        const type = ctx.type_engine.get_type("!"); // TODO
        ctx.compiler.set_metadata(
          catch_,
          Provides_locals__metadata,
          new Provides_locals__metadata({
            [error_var]: {
              sane_name,
              type: type,
              local_lifetime: Upwalker_visibility.CHILDREN_ONLY,
              getter: ctx.type_engine.add_function(null, (fn) => {
                fn.demands = [];
                fn.returns = type;
                fn.convention = new LocalAccessCall({ fn: sane_name, async_mode: Async_mode.SYNC });
              }),
              setter: null,
            }
          }),
        );

        for (const catch_child of catch_.children) {
          const catch_ctx = ctx.clone_with({ node: catch_child });
          catch_ctx.apply();
        }
      } else {
        const child_ctx = ctx.clone_with({ node: child });
        child_ctx.apply();
      }
    }

    return null; // TODO
  }

  emission(ctx: Emission_macro_context) {
    const catch_blocks: (Exclude<typeof try_block, undefined>)[] = [];
    const new_catch = () => {
      const rv: [Exclude<typeof try_block, undefined>, Exclude<typeof try_block, undefined>] = [statement_block("catch", PARENTHESIS), statement_block(null, BRACES)]
      catch_blocks.push(...rv);
      return rv;
    };
    const stmt = ctx.statement(statement_blocks(
      statement_block("try", BRACES),
      statement_block("finally", BRACES),
    ))
    const [try_block, finally_block] = stmt;

    for (const child of ctx.node.children) {
      if (child.content.startsWith("catch")) { // TODO cut macro
        const catch_ = child;

        const provides = ctx.compiler.get_metadata(catch_, Provides_locals__metadata);
        const first_and_only = first_matching_key(provides.locals, () => true);
        ctx.compiler.error_tracker.assert(
          first_and_only !== undefined,
          {
            node: catch_,
            message: "catch block must provide exactly one local",
            type: ErrorType.INTERNAL_CODE_QUALITY,
          }
        );

        const [catch_header, catch_body] = new_catch();
        catch_header.push(() => first_and_only.sane_name);

        for (const catch_child of catch_.children) {
          const catch_ctx = ctx.clone_with({ node: catch_child, statement_out: catch_body });
          catch_ctx.apply();
        }
        continue;
      }

      if (child.content.startsWith("finally")) {
        const finally_ctx = ctx.clone_with({ node: child, statement_out: finally_block });
        finally_ctx.apply();
        continue;
      }

      const child_ctx = ctx.clone_with({ node: child, statement_out: try_block });
      child_ctx.apply();
    }

    stmt.blocks.splice(1, 0, ...catch_blocks);
  }
}

export class Throw_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "throw", this.emission.bind(this));
  }

  emission(ctx: Emission_macro_context) {
    if (ctx.node.children.length === 0) {
      ctx.statement_out.push(() => "throw;");
      return;
    }

    const child = ctx.node.children[0];
    const expr_out: Emission_item[] = [];
    const child_ctx = ctx.clone_with({ node: child, expression_out: expr_out });
    child_ctx.apply();

    const throw_value = expr_out[0];
    ctx.compiler.error_tracker.assert(
      throw_value != null,
      {
        node: ctx.node,
        message: "throw macro must produce a single expression",
        type: ErrorType.INVALID_STRUCTURE,
      }
    );

    ctx.statement_out.push(() => `throw ${throw_value()};`);
  }
}

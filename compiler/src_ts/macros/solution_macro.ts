// macros/solution_macro.ts
import { ComplexType, Expression_return_type, Type_check_result } from "../compiler_types/proper_types.ts";
import { Register_macro_providers, REGISTER_MACRO_PROVIDERS, Macro_provider } from "../core/macro_registry.ts";
import { Node } from "../core/node.ts";
import { Async_mode, LocalAccessCall } from "../pipeline/call_conventions.ts";
import { Upwalker } from "../pipeline/local_lookup.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Arg_interpreter, Fixed, parse_tokens, VarOrTerminated } from "../utils/new_parser.ts";
import { BRACES, cut, Emission_item, statement_block, statement_blocks } from "../utils/strutil.ts";
import { Provides_locals__metadata, Upwalker_visibility } from "./local_macro.ts";

export class Solution_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    for (const macro_name of ["67lang:solution", "solution"]) {
      via(Type_checking_context, macro_name, this.typecheck.bind(this));
      via(Emission_macro_context, macro_name, this.emission.bind(this));
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    ctx.compiler.set_metadata(ctx.node, Solution_config_metadata, new Solution_config_metadata());
    for (const child of ctx.node.children) {
      ctx.clone_with({ node: child }).apply();
    }
    return null;
  }

  emission(ctx: Emission_macro_context) {
    const solution_metadata = ctx.compiler.get_metadata(ctx.node, Solution_config_metadata);
    
    let out_buf: Emission_item[] = [];
    ctx.node.children.forEach((child) => {
      ctx.clone_with({ node: child, statement_out: out_buf, expression_out: [] }).apply();
    });

    // TODO we need a test for the Cartesian support here
    for (const loop of solution_metadata.loops) {
      if (loop.kind === "forever") {
        const while_true = statement_block("while (true)", BRACES);
        while_true.push(...out_buf);
        out_buf = [statement_blocks(while_true)];
      } else if (loop.kind === "each") {
        const pre_statements: Emission_item[] = [];
        const pre_expressions: Emission_item[] = [];
        for (const child of loop.list) {
          const child_ctx = ctx.clone_with({ node: child, statement_out: pre_statements, expression_out: pre_expressions });
          child_ctx.apply();
        }
        ctx.statement_out.push(...pre_statements);
        const provides = ctx.compiler.get_metadata(ctx.node, Provides_locals__metadata);
        const local = provides.locals[loop.each];
        ctx.compiler.error_tracker.assert(
          local != null,
          {
            message: `local != null`,
            node: ctx.node,
            type: ErrorType.INTERNAL_CODE_QUALITY
          }
        );
        const last_expr = pre_expressions[pre_expressions.length - 1];
        ctx.compiler.error_tracker.assert(
          last_expr != undefined && last_expr != null,
          {
            message: `must provide expression for the iterated list`,
            node: ctx.node,
            type: ErrorType.INVALID_STRUCTURE
          }
        );
        const for_each_header: Emission_item = () => `for (const ${local.sane_name} of ${last_expr()})`;
        const for_each = statement_block(``, BRACES);
        for_each.push(...out_buf);
        out_buf = [for_each_header, statement_blocks(for_each)];
      }
    }

    ctx.statement_out.push(...out_buf);
  }
}

class Solution_config_metadata {
  public loops: ({ kind: "forever" } | { kind: "each"; each: string, list: Node[] })[] = [];
}

export class Point_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    for (const macro_name of ["point"]) {
      via(Type_checking_context, macro_name, this.typecheck.bind(this));
      via(Emission_macro_context, macro_name, this.emission.bind(this));
    }
  }
  typecheck(ctx: Type_checking_context): Type_check_result {
    const [_, args] = cut(ctx.node.content, " ");
    const parsed = this.parse_point(args.split(/\s+/));
    const res = new Upwalker(rq => ctx.compiler.maybe_metadata(rq.ctx.node, Solution_config_metadata)).find(ctx);
    const solution_metadata = res?.found;
    const solution_node = res?.node;
    ctx.compiler.error_tracker.assert(
      solution_metadata != null && solution_node != null,
      {
        message: "`point` must be inside `solution`",
        node: ctx.node,
        type: ErrorType.INVALID_STRUCTURE
      }
    );
    ctx.compiler.error_tracker.assert(
      parsed !== undefined,
      {
        message: "clause was not provided for this `point`",
        node: ctx.node,
        type: ErrorType.INVALID_MACRO
      }
    );
    if (parsed.kind === "loops forever") {
      solution_metadata.loops.push({ kind: "forever" });
      return null;
    }
    if (parsed.kind === "loops each") { 
      let last: Type_check_result = null;
      for (const child of ctx.node.children) {
        last = ctx.clone_with({ node: child }).apply();
      }
      solution_metadata.loops.push({ kind: "each", each: parsed.each, list: ctx.node.children });
      ctx.compiler.error_tracker.assert(
        last instanceof Expression_return_type && 
        last.type instanceof ComplexType &&
        ctx.type_engine.can_assign({
          value_type: last.type, 
          field_type: ctx.type_engine.get_type("list")
        }), 
        {
          message: "for `point each` provide a `list` for iteration",
          node: ctx.node,
          type: ErrorType.ARGUMENT_TYPE_MISMATCH
        }
      );
      const item_type = last.type.type_params[0];
      ctx.compiler.error_tracker.assert(
        item_type instanceof ComplexType,
        {
          message: "item type of iterated list expected",
          node: ctx.node,
          type: ErrorType.INTERNAL_CODE_QUALITY
        }
      );
      const sane_name = ctx.compiler.get_new_ident(parsed.each);
      // well, TODO. i really fucking hate this but i have no better thought right now here
      const provides = ctx.compiler.maybe_metadata(solution_node, Provides_locals__metadata) ?? new Provides_locals__metadata({});
      provides.locals[parsed.each] = {
        sane_name,
        type: item_type,
        local_lifetime: Upwalker_visibility.CHILDREN_ONLY,
        getter: ctx.type_engine.add_function(null, (fn) => {
          fn.demands = [];
          fn.returns = item_type;
          fn.convention = new LocalAccessCall({ fn: sane_name, async_mode: Async_mode.SYNC });
        }),
        setter: null // TODO ?
      };
      ctx.compiler.set_metadata(solution_node, Provides_locals__metadata, provides);
      return null;
    }
    return null;
  }

  emission(_ctx: Emission_macro_context) {
    // handled by `solution` parent
  }


  private parse_point(args: string[]) {
    // loops each var1
    const schema = {
      "loops": new VarOrTerminated(null, [], {
        "forever": new Fixed(0, [], undefined),
        "each": new Fixed(1, [], undefined),
      })
    }
    const parsed = parse_tokens(args, schema);
    
    const interpreter = new Arg_interpreter(parsed);
    let interpreted;

    if (interpreter.has("loops")) {
      const loop_focus = interpreter.focus("loops");
      if (loop_focus.has("forever")) {
        interpreted = {
          kind: "loops forever" as const,
        };
      } else if (loop_focus.has("each")) {
        interpreted = {
          kind: "loops each" as const,
          each: loop_focus.required("each"),
        };
      }
    }
    return interpreted;
    /* 
    let interpreted: {
        kind: "loops forever";
    } | {
        kind: "loops each";
        each: string;
    } | undefined
     */
  }
}

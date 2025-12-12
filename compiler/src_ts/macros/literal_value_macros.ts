// macros/literal_value_macros.ts

import { Macro_context, Macro_provider, REGISTER_MACRO_PROVIDERS, Register_macro_providers } from "../core/macro_registry.ts";

import { ErrorType } from "../utils/error_types.ts";
import { Args, Node } from "../core/node.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Type_checking_context } from "../pipeline/steps/typechecking.ts";
import { Expression_return_type, Type_check_result } from "../compiler_types/proper_types.ts";

// ----- Number -----

export class Number_macro_provider implements Macro_provider {
  constructor(
    private number_type: "int" | "float" // simpler discriminator
  ) {}

  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Preprocessing_context, this.number_type, this.preprocess.bind(this));
    via(Type_checking_context, this.number_type, this.typecheck.bind(this));
    via(Emission_macro_context, this.number_type, this.emission.bind(this));
  }

  preprocess(ctx: Macro_context): void {
    const arg = ctx.compiler.get_metadata(ctx.node, Args).toString();

    let ok = false;

    if (this.number_type === "int") {
      ok = /^-?\d+$/.test(arg);
    } else {
      ok = /^-?(\d+(\.\d*)?|\.\d+)([eE][-+]?\d+)?$/.test(arg);
    }

    if (!ok) {
      const err =
        this.number_type === "int"
          ? ErrorType.INVALID_INT
          : ErrorType.INVALID_FLOAT;
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: `${arg} must be a valid ${this.number_type}.`,
        type: err,
      });
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const int = ctx.type_engine.get_type("int");
    const float = ctx.type_engine.get_type("float");
    return new Expression_return_type(this.number_type === "int" ? int : float);
  }

  emission(ctx: Emission_macro_context): void {
    let num = ctx.compiler.get_metadata(ctx.node, Args).toString();
    // strip leading pointless zeros since TypeScript explodes
    num = num.replace(/^(-?)0+(\d)/, "$1$2");
    const is_negative = num.startsWith("-");
    if (is_negative) {
      num = `(${num})`;
    }
    ctx.expression_out.push(() => num);
  }
}

// ----- String / Regex -----

function collect_content(node: Node, depth: number, out: string[]): void {
  if (node.content && node.content.length > 0) {
    out.push("\t".repeat(depth) + node.content);
  }
  for (const ch of node.children) {
    collect_content(ch, depth + 1, out);
  }
}

export class String_macro_provider implements Macro_provider {
  constructor(private kind: "string" | "regex") {}

  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Preprocessing_context, this.kind, this.preprocess.bind(this));
    via(Type_checking_context, this.kind, this.typecheck.bind(this));
    via(Emission_macro_context, this.kind, this.emission.bind(this));
  }

  preprocess(_ctx: Macro_context): void {
    // noop
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    const string = ctx.type_engine.get_type("str");
    const regex = ctx.type_engine.get_type("regex");
    return new Expression_return_type(this.kind === "string" ? string : regex);
  }

  code_linking(_ctx: Macro_context): void {
    // noop
  }

  emission(ctx: Emission_macro_context): void {
    let s = ctx.compiler.get_metadata(ctx.node, Args).toString();

    if (s[0] === undefined) {
      // multiline
      const lines: string[] = [];
      for (const ch of ctx.node.children) {
        collect_content(ch, 0, lines);
      }
      s = lines.join("\n");
    } else {
      const delim = s[0];
      ctx.compiler.error_tracker.assert(
        s.endsWith(delim),
        {
          node: ctx.node,
          message: "must be delimited on both sides with the same character",
          type: ErrorType.INVALID_STRUCTURE,
        }
      );
      s = s.slice(1, -1);
    }

    s = s.replaceAll("\n", "\\n").replaceAll(`"`, `\\"`);

    const sep = this.kind === "string" ? `"` : `/`;
    ctx.expression_out.push(() => `${sep}${s}${sep}`);
  }
}

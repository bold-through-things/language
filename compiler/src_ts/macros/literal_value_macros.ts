// macros/literal_value_macros.ts

import { MacroContext, TCResult } from "../core/macro_registry.ts";
import {
  Macro_emission_provider,
  Macro_typecheck_provider,
  Macro_preprocess_provider,
  Macro_code_linking_provider
} from "../core/macro_registry.ts";

import { ErrorType } from "../utils/error_types.ts";
import { Args, Node } from "../core/node.ts";
import {
  INT,
  FLOAT,
  STRING,
  REGEX,
} from "../compiler_types/proper_types.ts";

// ----- Number -----

export class Number_macro_provider
  implements Macro_emission_provider, Macro_typecheck_provider, Macro_preprocess_provider
{
  constructor(
    private number_type: "int" | "float" // simpler discriminator
  ) {}

  preprocess(ctx: MacroContext): void {
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
      ctx.compiler.assert_(
        false,
        ctx.node,
        `${arg} must be a valid ${this.number_type}.`,
        err
      );
    }
  }

  typecheck(ctx: MacroContext): TCResult {
    return this.number_type === "int" ? INT : FLOAT;
  }

  emission(ctx: MacroContext): void {
    const arg = ctx.compiler.get_metadata(ctx.node, Args).toString();
    ctx.expression_out.push(() => arg);
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

export class String_macro_provider
  implements
    Macro_emission_provider,
    Macro_typecheck_provider,
    Macro_preprocess_provider,
    Macro_code_linking_provider
{
  constructor(private kind: "string" | "regex") {}

  preprocess(_ctx: MacroContext): void {
    // noop
  }

  typecheck(_ctx: MacroContext): TCResult {
    return this.kind === "string" ? STRING : REGEX;
  }

  code_linking(_ctx: MacroContext): void {
    // noop
  }

  emission(ctx: MacroContext): void {
    let s = ctx.compiler.get_metadata(ctx.node, Args).toString();

    if (s.length === 0) {
      // multiline
      const lines: string[] = [];
      for (const ch of ctx.node.children) {
        collect_content(ch, 0, lines);
      }
      s = lines.join("\n");
    } else {
      const delim = s[0];
      ctx.compiler.assert_(
        s.endsWith(delim),
        ctx.node,
        "must be delimited on both sides with the same character"
      );
      s = s.slice(1, -1);
    }

    s = s.replaceAll("\n", "\\n").replaceAll(`"`, `\\"`);

    const sep = this.kind === "string" ? `"` : `/`;
    ctx.expression_out.push(() => `${sep}${s}${sep}`);
  }
}

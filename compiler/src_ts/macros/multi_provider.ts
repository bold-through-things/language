// macros/multi_provider.ts

import {
  Macro_preprocess_provider,
  Macro_typecheck_provider,
  Macro_emission_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";

export type Matcher = ((ctx: MacroContext) => boolean) | null;

export class Multi_provider
  implements
    Macro_preprocess_provider,
    Macro_typecheck_provider,
    Macro_emission_provider
{
  // (code_linking_provider is intentionally omitted like Crystal)

  private entries: Array<Entry>;

  constructor(
    matchers: Array<
      [
        Matcher,
        {
          preprocess?: (ctx: MacroContext) => void;
          typecheck?: (ctx: MacroContext) => TCResult;
          emission?: (ctx: MacroContext) => void;
          code_linking?: (ctx: MacroContext) => void;
          register_type?: (ctx: MacroContext) => void;
          register_type_details?: (ctx: MacroContext) => void;
        },
      ]
    >,
  ) {
    this.entries = [];

    for (const [matcher, provider] of matchers) {
      const preprocess = provider.preprocess
        ? (c: MacroContext) => provider.preprocess!(c)
        : null;
      const typecheck = provider.typecheck
        ? (c: MacroContext): TCResult => provider.typecheck!(c)
        : null;
      const emission = provider.emission
        ? (c: MacroContext) => provider.emission!(c)
        : null;
      const code_link = provider.code_linking
        ? (c: MacroContext) => provider.code_linking!(c)
        : null;
      const reg_type = provider.register_type
        ? (c: MacroContext) => provider.register_type!(c)
        : null;
      const reg_type_d = provider.register_type_details
        ? (c: MacroContext) => provider.register_type_details!(c)
        : null;

      this.entries.push(
        new Entry(
          matcher,
          preprocess,
          typecheck,
          emission,
          code_link,
          reg_type,
          reg_type_d,
        ),
      );
    }
  }

  preprocess(ctx: MacroContext): void {
    this.dispatch_void(ctx, (e) => e.preprocess);
  }

  emission(ctx: MacroContext): void {
    this.dispatch_void(ctx, (e) => e.emission);
  }

  register_type(ctx: MacroContext): void {
    this.dispatch_void(ctx, (e) => e.register_type);
  }

  register_type_details(ctx: MacroContext): void {
    this.dispatch_void(ctx, (e) => e.register_type_details);
  }

  typecheck(ctx: MacroContext): TCResult {
    for (const e of this.entries) {
      const m = e.matcher;
      if (m === null || m(ctx)) {
        if (e.typecheck) {
          return e.typecheck(ctx);
        } else {
          let last: any = null;
          for (const ch of ctx.node.children) {
            last = ctx.current_step!.process_node(ctx.clone_with({ node: ch }));
          }
          return last;
        }
      }
    }
    throw new Error("No matching provider found");
  }

  private dispatch_void(
    ctx: MacroContext,
    pick: (e: Entry) => ((ctx: MacroContext) => any) | null,
  ): any {
    for (const e of this.entries) {
      const m = e.matcher;
      if (m === null || m(ctx)) {
        const proc = pick(e);
        if (proc) {
          return proc(ctx);
        } else {
          let last: any = null;
          for (const ch of ctx.node.children) {
            last = ctx.current_step!.process_node(ctx.clone_with({ node: ch }));
          }
          return last;
        }
      }
    }
    throw new Error("no matching provider found");
  }
}

// ------------------------------------------------------------

class Entry {
  matcher: Matcher;
  preprocess: ((ctx: MacroContext) => void) | null;
  typecheck: ((ctx: MacroContext) => TCResult) | null;
  emission: ((ctx: MacroContext) => void) | null;
  code_linking: ((ctx: MacroContext) => void) | null;
  register_type: ((ctx: MacroContext) => void) | null;
  register_type_details: ((ctx: MacroContext) => void) | null;

  constructor(
    matcher: Matcher,
    preprocess: ((ctx: MacroContext) => void) | null,
    typecheck: ((ctx: MacroContext) => TCResult) | null,
    emission: ((ctx: MacroContext) => void) | null,
    code_linking: ((ctx: MacroContext) => void) | null,
    register_type: ((ctx: MacroContext) => void) | null,
    register_type_details: ((ctx: MacroContext) => void) | null,
  ) {
    this.matcher = matcher;
    this.preprocess = preprocess;
    this.typecheck = typecheck;
    this.emission = emission;
    this.code_linking = code_linking;
    this.register_type = register_type;
    this.register_type_details = register_type_details;
  }
}

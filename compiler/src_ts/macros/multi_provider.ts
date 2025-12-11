// macros/multi_provider.ts

import {
  Macro_context,
  Macro_provider,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS,
} from "../core/macro_registry.ts";
import { Constructor } from "../utils/utils.ts";

export type Matcher = ((ctx: Macro_context) => boolean) | null;

export class Multi_provider implements Macro_provider {

  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    const entries = this.entries.map((e) => ({
      matcher: e[0],
      provider: e[1],
    }));
    // this one must be a little smarter
    const final = new Map<Constructor<Macro_context>, (ctx: Macro_context) => void>();
    for (const e of entries) {
      const m = e.matcher;
      const wrap_via = <T extends Macro_context>(step_type: Constructor<T>, proposed_macro_name: string, fn: (ctx: T) => void) => {
        if (proposed_macro_name !== this.macro_name) {
          return;
        }        

        const existing = final.get(step_type);
        const wrapped = (ctx: Macro_context) => {
          if (m === null || m(ctx)) {
            fn(ctx as T);
          } else if (existing) {
            existing(ctx);
          } else {
            // default behavior: process children
            for (const ch of ctx.node.children) {
              ctx.clone_with({ node: ch }).apply();
            }
          }
        };
        final.set(step_type, wrapped);
      }
      e.provider[REGISTER_MACRO_PROVIDERS](wrap_via);
    }
    for (const [step_type, methods] of final.entries()) {
      via(step_type, this.macro_name, methods);
    }
  }


  constructor(
    private macro_name: string,
    private entries: [Matcher, Macro_provider][],
  ) {
    // ...
  }
}

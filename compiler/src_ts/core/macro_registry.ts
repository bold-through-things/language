// core/macro_registry.ts

import { IndentedStringIO } from "../utils/strutil.ts";
import { default_logger } from "../utils/logger.ts";
import type { Node } from "./node.ts";
import type { Macrocosm } from "./macrocosm.ts";
import { Constructor } from "../utils/utils.ts";
; 

export type OutIO = IndentedStringIO | { 
  write: (s: string) => void,
  gets_to_end: () => string
};

// --------------------------------------
// MacroContext
// --------------------------------------

export interface Macro_context<T = unknown> {
  node: Node;
  compiler: Macrocosm;
  clone_with(opts: {
    node: Node
  }): Macro_context;
  apply(): T;
}

export const REGISTER_MACRO_PROVIDERS = Symbol("REGISTER_MACRO_PROVIDERS");

export interface Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void;
}

export type Register_macro_providers = <T extends Macro_context>(type: Constructor<T>, macro: string, fn: Ctx_proc<T>) => void;


// --------------------------------------
// MacroRegistry
// --------------------------------------

export type Ctx_proc<T extends Macro_context> = (ctx: T) => ReturnType<T["apply"]>

export class Macro_registry<T extends Macro_context> {
  private registry: Record<string, Ctx_proc<T>>;

  constructor() {
    this.registry = {};
  }

  add_fn(fn: Ctx_proc<T> | null, ...names: string[]): void {
    if (fn === null) {
      return;
    }
    for (const name of names) {
      this.registry[name] = fn;
    }
  }

  get(name: string): Ctx_proc<T> {
    const fn = this.registry[name];
    if (!fn) {
      throw new Error(`Unknown macro: ${name}`);
    }
    return fn;
  }

  all(): Record<string, Ctx_proc<T>> {
    return { ...this.registry };
  }
}

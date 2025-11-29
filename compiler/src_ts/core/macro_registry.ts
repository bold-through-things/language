// core/macro_registry.ts

import { IndentedStringIO, Emission_item } from "../utils/strutil.ts";
import { default_logger } from "../utils/logger.ts";
import type { Node } from "./node.ts";
import type { Macrocosm } from "./macrocosm.ts";
import { Type, TypeParameter } from "../compiler_types/proper_types.ts";

export type TCResult = Type | null | TypeParameter; 

export type OutIO = IndentedStringIO | { 
  write: (s: string) => void,
  gets_to_end: () => string
};

export type Macro_ctx_typecheck_proc = (ctx: MacroContext) => TCResult;
export type Macro_ctx_void_proc = (ctx: MacroContext) => void;

export type Macro_ctx_proc =
  | Macro_ctx_typecheck_proc
  | Macro_ctx_void_proc;

// --------------------------------------
// MacroContext
// --------------------------------------

export class MacroContext {
  statement_out: Emission_item[];
  expression_out: Emission_item[];
  node: Node;
  compiler: Macrocosm;
  current_step: MacroProcessingStep | null;

  constructor(
    statement_out: Emission_item[],
    expression_out: Emission_item[],
    node: Node,
    compiler: Macrocosm,
    current_step: MacroProcessingStep | null = null,
  ) {
    this.statement_out = statement_out;
    this.expression_out = expression_out;
    this.node = node;
    this.compiler = compiler;
    this.current_step = current_step;
  }

  clone_with(opts: {
    statement_out?: Emission_item[] | null;
    expression_out?: Emission_item[] | null;
    node?: Node | null;
    compiler?: Macrocosm | null;
    current_step?: MacroProcessingStep | null;
  } = {}): MacroContext {
    return new MacroContext(
      opts.statement_out ?? this.statement_out,
      opts.expression_out ?? this.expression_out,
      opts.node ?? this.node,
      opts.compiler ?? this.compiler,
      opts.current_step ?? this.current_step,
    );
  }

  statement<T>(stmt: Emission_item & T): T {
    this.statement_out.push(stmt);
    return stmt;
  }

  expression<T>(expr: Emission_item & T): T {
    this.expression_out.push(expr);
    return expr;
  }
}

// --------------------------------------
// Provider "interfaces"
// --------------------------------------

export interface Macro_preprocess_provider {
  preprocess(ctx: MacroContext): void;
}

export interface Macro_type_registration_provider {
  register_type(ctx: MacroContext): any;
}

export interface Macro_type_details_provider {
  register_type_details(ctx: MacroContext): any;
}

export interface Macro_functions_provider {
  register_functions(ctx: MacroContext): TCResult;
}

export interface Macro_typecheck_provider {
  typecheck(ctx: MacroContext): TCResult;
}

export interface Macro_emission_provider {
  emission(ctx: MacroContext): void;
}

export interface Macro_code_linking_provider {
  code_linking(ctx: MacroContext): void;
}

export type Macro_provider =
  | Macro_preprocess_provider
  | Macro_code_linking_provider
  | Macro_typecheck_provider
  | Macro_emission_provider
  | Macro_type_registration_provider
  | Macro_type_details_provider
  | Macro_functions_provider;

// --------------------------------------
// Processing step base class
// --------------------------------------

export abstract class MacroProcessingStep {
  abstract process_node(ctx: MacroContext): void | TCResult;
}

// --------------------------------------
// MacroRegistry
// --------------------------------------

export class MacroRegistry<TProc extends Macro_ctx_proc> {
  private registry: Record<string, TProc>;

  constructor() {
    this.registry = {};
  }

  add_fn(fn: TProc | null, ...names: string[]): void {
    if (fn === null) {
      return;
    }
    for (const name of names) {
      this.registry[name] = fn;
    }
  }

  get(name: string): TProc {
    const fn = this.registry[name];
    if (!fn) {
      default_logger.macro(`ERROR: unknown macro "${name}"`);
      throw new Error(`Unknown macro: ${name}`);
    }
    return fn;
  }

  all(): Record<string, TProc> {
    return { ...this.registry };
  }
}

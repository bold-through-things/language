// core/macrocosm.ts

import { cut } from "../utils/strutil.ts";
import { default_logger } from "../utils/logger.ts";
import {
  Node,
  Position,
  Macro,
  Args,
  Params,
  Indexers,
  Callers
} from "./node.ts";
import { Constructor, not_null, TypeMap } from "../utils/utils.ts";
import { to_valid_js_ident } from "../pipeline/js_conversion.ts";
import { Macro_error_tracker } from "../core/exceptions.ts";
import { Macro_context, Macro_registry, Register_macro_providers, Macro_provider, REGISTER_MACRO_PROVIDERS, Ctx_proc } from "./macro_registry.ts";

import { Noscope_macro_provider } from "../macros/noscope_macro.ts";
import {
  List_macro_provider,
  Dict_macro_provider,
} from "../macros/collection_macros.ts";
import { If_macro_provider } from "../macros/if_macro.ts";
import {
  Number_macro_provider,
  String_macro_provider,
} from "../macros/literal_value_macros.ts";
import { While_macro_provider } from "../macros/while_macro.ts";
import { For_macro_provider } from "../macros/for_macro.ts";
import { Local_macro_provider } from "../macros/local_macro.ts";
import { Fn_macro_provider } from "../macros/fn_macro.ts";
import { Call_macro_provider } from "../macros/call_macro.ts";
import {
  Comment_macro_provider,
} from "../macros/comment_macros.ts";
import { Return_macro_provider } from "../macros/return_macro.ts";
import {
  Scope_macro_provider,
} from "../macros/scope_macro.ts";
import { Type_macro_provider } from "../macros/type_macro.ts";
import {
  Try_macro_provider,
  Throw_macro_provider,
} from "../macros/try_catch_macro.ts";
import { Bind_macro_provider } from "../macros/bind_macro.ts";
import {
  Must_compile_error_macro_provider,
} from "../macros/error_macros.ts";

import {
  Expression_return_type,
  Type_check_result,
  Type_engine,
} from "../compiler_types/proper_types.ts";
import { JSON_value } from "./meta_value.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Must_compile_error_context } from "../pipeline/steps/must_compile_error_step.ts";
import { Solution_macro_provider } from "../macros/solution_macro.ts";
import { Multi_provider } from "../macros/multi_provider.ts";
import { _67lang_GET_LAST_PIPELINE_RESULT, _67lang_PIPELINE_RESULT, Get_last_pipeline_result_macro_provider, Pipeline_macro_provider, Pipeline_result_macro_provider } from "../macros/then_macro.ts";
import { Noop_macro_provider } from "../macros/utility_macros.ts";
import { Type_checking_context, Type_registration_context } from "../pipeline/steps/typechecking.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";

// --- metadata store (TS replacement for def_metadata macro) -------------------

export type MetaCtor<T> = { new (...args: any[]): T; name: string };

export class Macrocosm {
  readonly nodes: Node[] = [];
  compile_errors: Array<Record<string, JSON_value>> = [];

  private incremental_id = 0;
  js_output = "";
  root_node: Node | null = null;

  readonly processing_steps: ((node: Node) => Macro_context)[];

  readonly error_tracker: Macro_error_tracker = new Macro_error_tracker();

  // metadata: Node -> (type-name -> value)
  private metadata: Map<Node, Map<string, unknown>> = new Map();

  constructor(
    emission_registry: Macro_registry<Emission_macro_context>,
    typecheck_registry: Macro_registry<Type_checking_context>,
    preprocess_registry: Macro_registry<Preprocessing_context>,
    type_registration_registry: Macro_registry<Type_registration_context>,
  ) {
    const compiler = this;
    const type_engine = new Type_engine();
    this.processing_steps = [
      (node: Node) => new Preprocessing_context({ compiler, registry: preprocess_registry, node }),
      (node: Node) => new Type_registration_context({ compiler, registry: type_registration_registry, node, type_engine }),
      (node: Node) => new Type_checking_context({ compiler, registry: typecheck_registry, node, type_engine }),
      (node: Node) => new Emission_macro_context({ compiler, registry: emission_registry, statement_out: [], expression_out: [], node, type_engine }),
      (node: Node) => new Must_compile_error_context({ compiler, registry: new Macro_registry<Must_compile_error_context>(), node, expectations: [] }), // TODO: share registry
    ];
  }

  get_new_ident(name: string | null): string {
    let ident = `_0x${this.incremental_id.toString(16)}`;
    if (name && name.length > 0) {
      ident += `_${to_valid_js_ident(name)}`;
    }
    this.incremental_id += 1;
    return ident;
  }

  // --- metadata APIs (typed) --------------------------------------------------

  private metaKey<T>(ctor: MetaCtor<T>): string {
    return ctor.name;
  }

  set_metadata<T>(node: Node, t: MetaCtor<T>, value: T): void {
    const key = this.metaKey(t);
    let m = this.metadata.get(node);
    if (!m) {
      m = new Map();
      this.metadata.set(node, m);
    }
    m.set(key, value);
    default_logger.log(
      "metadata",
      `set metadata ${key} ${String(value)} for ${node} ${node.content}`,
    );
  }

  maybe_metadata<T>(node: Node, t: MetaCtor<T>): T | null {
    const key = this.metaKey(t);
    const m = this.metadata.get(node);
    if (!m) {
      return null;
    }
    const v = m.get(key);
    return (v as T | undefined) ?? null;
  }

  compute_metadata<T>(node: Node, t: MetaCtor<T>, factory: () => T): T {
    const existing = this.maybe_metadata(node, t);
    if (existing !== null) {
      return existing;
    }
    const v = factory();
    this.set_metadata(node, t, v);
    return v;
  }

  get_metadata<T>(node: Node, t: MetaCtor<T>): T {
    // special-case Macro / Args to lazily compute from node.content
    if (t === (Macro as unknown)) {
      this.ensure_macro_args_computed(node);
    }
    if (t === (Args as unknown)) {
      this.ensure_macro_args_computed(node);
    }

    const key = this.metaKey(t);
    const m = this.metadata.get(node);
    if (m && m.has(key)) {
      return m.get(key) as T;
    }

    const factory = TypeMap.getFactory(t);
    if (factory) {
      const v = factory();
      let mm = this.metadata.get(node);
      if (!mm) {
        mm = new Map();
        this.metadata.set(node, mm);
      }
      mm.set(key, v);
      return v;
    }

    throw new Error(`No metadata of type ${key} for node`);
  }

  invalidate_metadata(node: Node): void {
    this.metadata.delete(node);
    for (const ch of node.children) {
      this.invalidate_metadata(ch);
    }
  }

  // --- macro arg splitting ----------------------------------------------------

  private ensure_macro_args_computed(node: Node): void {
    const hasMacro = this.maybe_metadata(node, Macro) !== null;
    const hasArgs = this.maybe_metadata(node, Args) !== null;
    if (hasMacro && hasArgs) {
      return;
    }

    const [macro_name, args] = cut(node.content, " ");
    this.set_metadata(node, Macro, new Macro(macro_name));
    this.set_metadata(node, Args, new Args(args));
  }

  // --- public API -------------------------------------------------------------

  register(node: Node): void {
    this.nodes.push(node);
  }

  private compile_error(
    node: Node,
    error: string,
    error_type: string,
    extra_fields: Record<string, JSON_value> | null = null,
  ): void {
    const pos = node.pos ?? new Position(0, 0);
    const entry: Record<string, JSON_value> = {
      recoverable: false as unknown as JSON_value,
      line: pos.line as unknown as JSON_value,
      char: pos.char as unknown as JSON_value,
      content: node.content as unknown as JSON_value,
      error: error as unknown as JSON_value,
      error_type: error_type as unknown as JSON_value,
    };

    if (extra_fields) {
      for (const [k, v] of Object.entries(extra_fields)) {
        entry[k] = v;
      }
    }

    this.compile_errors.push(entry);
  }

  compile(): string {
    default_logger.indent("compile", "discovering macros", () => {
      for (const n of this.nodes) {
        this.discover_macros(n);
      }
    });

    const solution_node = this.make_node(
      "67lang:solution",
      new Position(0, 0),
      [...this.nodes],
    );
    this.root_node = solution_node;

    for (const step of this.processing_steps) {
      // TODO
      // const stepName = (step as any).constructor.name;
      // default_logger.indent(
      //   "compile",
      //   `processing step: ${stepName}`,
        // () => {
        const ctx = step(solution_node)
        this.error_tracker.safely(ctx, () => {
          ctx.apply();
        });
        // },
      // );
    }

    for (const err of this.error_tracker.all) {
      this.compile_error(
        err.node,
        err.message,
        err.type,
        err.extras ?? null,
      );
    }

    if (this.compile_errors.length !== 0) {
      return "";
    }

    return this.js_output;
  }

  private discover_macros(node: Node): void {
    this.ensure_macro_args_computed(node);
    for (const ch of node.children) {
      this.discover_macros(ch);
    }
  }

  make_node(
    content: string,
    pos: Position | null,
    children: Node[] | null,
  ): Node {
    const p = pos ?? new Position(0, 0);
    const n = new Node(content, p, children ?? []);
    this.discover_macros(n);
    return n;
  }

}

// Literal_macro_provider

export class Literal_macro_provider implements Macro_provider {
  constructor(
    private macro_name: string, 
    private value: string, 
    private t_name: string | null
  ) {
    // ...
  }

  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, this.macro_name, this.emission.bind(this));
    via(Type_checking_context, this.macro_name, this.typecheck.bind(this));
  }

  emission(ctx: Emission_macro_context): void {
    if (this.t_name === null) {
      ctx.statement_out.push(() => this.value);
    } else {
      ctx.expression_out.push(() => this.value);
    }
  }

  typecheck(ctx: Type_checking_context): Type_check_result {
    if (this.t_name) {
      return new Expression_return_type(ctx.type_engine.get_type(this.t_name));
    } else {
      // TODO a stupid h*ck
      return null;
    }    
  }
}

// --- macrocosm factory --------------------------------------------------------

export function create_macrocosm(): Macrocosm {
  const has_arguments = (ctx: Macro_context): boolean => {
    const args = ctx.compiler.get_metadata(ctx.node, Args).toString();
    return args.trim().length > 0;
  };

  const providers = [
    new Noop_macro_provider(),
    new Type_macro_provider(),
    new While_macro_provider(),
    new For_macro_provider(),
    new Number_macro_provider("int"),
    new Number_macro_provider("float"),
    new String_macro_provider("string"),
    new String_macro_provider("regex"),
    new If_macro_provider(),
    new List_macro_provider(),
    new Dict_macro_provider(),
    new Local_macro_provider(),
    new Fn_macro_provider(),
    new Bind_macro_provider(),
    new Call_macro_provider(),
    new Pipeline_result_macro_provider(),
    new Get_last_pipeline_result_macro_provider(),
    new Solution_macro_provider(),
    new Must_compile_error_macro_provider(),
    new Comment_macro_provider(),
    new Multi_provider(
      "do",
      [
        [has_arguments, new Pipeline_macro_provider()],
        [null, new Scope_macro_provider()]
      ],
    ),
    new Multi_provider(
      "then",
      [
        [has_arguments, new Pipeline_macro_provider()],
        [null, new Scope_macro_provider()]
      ],
    ),
    new Multi_provider("get", [[null, new Pipeline_macro_provider()]]),
    new Multi_provider("set", [[null, new Pipeline_macro_provider()]]),
    new Multi_provider("67lang:file", [[null, new Scope_macro_provider()]]),
    new Multi_provider("finally", [[null, new Scope_macro_provider()]]),    
    new Noscope_macro_provider(),
    new Return_macro_provider(),
    new Try_macro_provider(),
    new Throw_macro_provider()
  ]
  
  const literalTable: Record<string, [string, string | null]> = {
    true: ["true", "bool"],
    false: ["false", "bool"],
    break: ["break;", null],
    continue: ["continue;", null],
  };

  for (const [macro_name, [value, type]] of Object.entries(literalTable)) {
    providers.push(new Literal_macro_provider(macro_name, value, type));
  }

  const registries: Map<Constructor<Macro_context>, Macro_registry<Macro_context<unknown>>> = new Map();
  const create_registry = <T extends Macro_context<unknown>>(_name: string, type: Constructor<T>): Macro_registry<T> => {
    const r = new Macro_registry<T>();
    registries.set(type, r as unknown as Macro_registry<Macro_context>);
    return r;
  };

  const preprocess = create_registry<Preprocessing_context>("preprocess", Preprocessing_context);
  const typecheck = create_registry<Type_checking_context>("typecheck", Type_checking_context);
  const emission = create_registry<Emission_macro_context>("emission", Emission_macro_context);
  const type_registration = create_registry<Type_registration_context>("type_registration", Type_registration_context);
  for (const p of providers) {
    p[REGISTER_MACRO_PROVIDERS]((
      ctxType,
      macro_name,
      proc,
    ) => {
      const registry = not_null(registries.get(ctxType));
      registry.add_fn(proc as Ctx_proc<Macro_context>, macro_name);
    });
  }

  const rv = new Macrocosm(
    emission,
    typecheck,
    preprocess,
    type_registration,
  );
  return rv;
}

// default factories for metadata types that want auto-creation

TypeMap.register(Callers, () => new Callers());
TypeMap.register(Indexers, () => new Indexers());
TypeMap.register(Params, () => new Params());

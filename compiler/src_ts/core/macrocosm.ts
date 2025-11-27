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
import { not_null, TypeMap } from "../utils/utils.ts";
import { to_valid_js_ident } from "../pipeline/js_conversion.ts";
import { MacroAssertFailed } from "../core/exceptions.ts";
// TODO we likely do not need this
// import {
//   meta_to_json_any,
//   type MetaValue,
// } from "../core/meta_value.ts";
import { Macro_ctx_proc, Macro_ctx_typecheck_proc, Macro_ctx_void_proc, Macro_provider, MacroContext, MacroProcessingStep, MacroRegistry, TCResult } from "./macro_registry.ts";

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
  COMMENT_MACROS,
  Comment_macro_provider,
} from "../macros/comment_macros.ts";
import { Return_macro_provider } from "../macros/return_macro.ts";
import {
SCOPE_MACRO,
  Scope_macro_provider,
} from "../macros/scope_macro.ts";
import { Type_macro_provider } from "../macros/type_macro.ts";
import {
  Try_macro_provider,
  Catch_macro_provider,
  Throw_macro_provider,
} from "../macros/try_catch_macro.ts";
import { Bind_macro_provider } from "../macros/bind_macro.ts";
import { Obtain_param_value_macro_provider } from "../macros/obtain_param_value_macro.ts";
import {
  Must_compile_error_macro_provider,
} from "../macros/error_macros.ts";

// and somewhere:

import { IndentedStringIO } from "../utils/strutil.ts";
import {
  Call_convention,
} from "../pipeline/call_conventions.ts";
import {
  BOOL,
  type Type,
} from "../compiler_types/proper_types.ts";
import { MetaValue } from "./meta_value.ts";
import { PreprocessingStep } from "../pipeline/steps/processing.ts";
import { FunctionRegistrationStep, TypeDetailRegistrationStep, TypeRegistrationStep } from "../pipeline/steps/type_registration.ts";
import { JavaScriptEmissionStep } from "../pipeline/steps/emission.ts";
import { MustCompileErrorVerificationStep } from "../pipeline/steps/must_compile_error_step.ts";
import { TypeCheckingStep } from "../pipeline/steps/typechecking.ts";
import { Solution_macro_provider } from "../macros/solution_macro.ts";
import { Multi_provider } from "../macros/multi_provider.ts";
import { Pipeline_macro_provider } from "../macros/then_macro.ts";
import { Noop_macro_provider } from "../macros/utility_macros.ts";
import { ErrorType } from "../utils/error_types.ts";

// --- metadata store (TS replacement for def_metadata macro) -------------------

export type MetaCtor<T> = { new (...args: any[]): T; name: string };

export class Macrocosm {
  readonly nodes: Node[] = [];
  compile_errors: Array<Record<string, MetaValue>> = [];
  readonly registries: Record<string, MacroRegistry<Macro_ctx_proc>> = {};

  private incremental_id = 0;
  js_output = "";
  root_node: Node | null = null;

  private dynamic_conventions: Record<string, Call_convention[]> = Object.create(null);

  readonly processing_steps: MacroProcessingStep[];

  // metadata: Node -> (type-name -> value)
  private metadata: Map<Node, Map<string, unknown>> = new Map();

  constructor(
    emission_registry: MacroRegistry<Macro_ctx_void_proc>,
    typecheck_registry: MacroRegistry<Macro_ctx_typecheck_proc>,
    preprocess_registry: MacroRegistry<Macro_ctx_void_proc>,
    type_registration_registry: MacroRegistry<Macro_ctx_typecheck_proc>,
    type_detail_registration_registry: MacroRegistry<Macro_ctx_typecheck_proc>,
    function_registration: MacroRegistry<Macro_ctx_typecheck_proc>,
  ) {
    this.processing_steps = [
      new PreprocessingStep(preprocess_registry),
      new TypeRegistrationStep(type_registration_registry),
      new TypeDetailRegistrationStep(type_detail_registration_registry),
      new FunctionRegistrationStep(function_registration),
      new TypeCheckingStep(typecheck_registry),
      new JavaScriptEmissionStep(emission_registry),
      new MustCompileErrorVerificationStep(new MacroRegistry<Macro_ctx_void_proc>()),
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

  assert_(
    must_be_true: boolean,
    node: Node,
    message: string,
    error_type?: string | null,
    extra_fields?: Record<string, MetaValue> | null,
  ): asserts must_be_true {
    if (must_be_true) {
      return;
    }

    this.compile_error(node, `failed to assert: ${message}`, error_type ?? ErrorType.ASSERTION_FAILED, extra_fields ?? null);
    throw new MacroAssertFailed(message);
  }

  compile_error(
    node: Node,
    error: string,
    error_type: string,
    extra_fields: Record<string, MetaValue> | null = null,
  ): void {
    const pos = node.pos ?? new Position(0, 0);
    const entry: Record<string, MetaValue> = {
      recoverable: false as unknown as MetaValue,
      line: pos.line as unknown as MetaValue,
      char: pos.char as unknown as MetaValue,
      content: node.content as unknown as MetaValue,
      error: error as unknown as MetaValue,
      error_type: error_type as unknown as MetaValue,
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
      const stepName = (step as any).constructor.name;
      default_logger.indent(
        "compile",
        `processing step: ${stepName}`,
        () => {
          const ctx: MacroContext = new MacroContext(
            [],
            new IndentedStringIO(),
            solution_node,
            this,
            step,
          );

          step.process_node(ctx);
        },
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

  add_dynamic_convention(
    name: string,
    convention: Call_convention,
  ): void {
    let arr = this.dynamic_conventions[name];
    if (!arr) {
      arr = [];
      this.dynamic_conventions[name] = arr;
    }
    arr.push(convention);
  }

  dynamic_conventions_for(
    name: string,
  ): Call_convention[] | undefined {
    if (Object.prototype.hasOwnProperty.call(this.dynamic_conventions, name)) {
      return this.dynamic_conventions[name];
    }
    return undefined;
  }

  get conventions(): Call_convention[] {
    const all: Call_convention[] = [];
    for (const convs of Object.values(this.dynamic_conventions)) {
      all.push(...convs);
    }
    return all;
  }

  safely(fn: () => void): void {
    try {
      fn();
    } catch (e) {
      if (!(e instanceof MacroAssertFailed)) {
        throw e;
      }
      // swallow MacroAssertFailed
    }
  }
}

// Literal_macro_provider

export class Literal_macro_provider {
  private value: string;
  private t: Type | null;

  constructor(value: string, t: Type | null) {
    this.value = value;
    this.t = t;
  }

  emission(ctx: MacroContext): void {
    ctx.expression_out.write(this.value);
  }

  typecheck(ctx: MacroContext): TCResult {
    return this.t as TCResult;
  }
}

// --- macrocosm factory --------------------------------------------------------

export function create_macrocosm(): Macrocosm {
  const has_arguments = (ctx: MacroContext): boolean => {
    const args = ctx.compiler.get_metadata(ctx.node, Args).toString();
    return args.trim().length > 0;
  };

  const macro_providers: Record<string, Macro_provider> = {};

  macro_providers["while"] = new While_macro_provider();
  macro_providers["for"] = new For_macro_provider();
  macro_providers["int"] = new Number_macro_provider("int");
  macro_providers["float"] = new Number_macro_provider("float");
  macro_providers["string"] = new String_macro_provider("string");
  macro_providers["regex"] = new String_macro_provider("regex");
  macro_providers["if"] = new If_macro_provider();
  macro_providers["list"] = new List_macro_provider();
  macro_providers["dict"] = new Dict_macro_provider();
  macro_providers["local"] = new Local_macro_provider();
  macro_providers["fn"] = new Fn_macro_provider();
  macro_providers["bind"] = new Bind_macro_provider();
  macro_providers["67lang:call"] = new Call_macro_provider();
  macro_providers["noop"] = new Noop_macro_provider();
  macro_providers["type"] = new Type_macro_provider();
  macro_providers["67lang:assume_local_exists"] = new Noop_macro_provider();
  macro_providers["67lang:assume_type_valid"] = new Noop_macro_provider();
  macro_providers["67lang:obtain_param_value"] =
    new Obtain_param_value_macro_provider();
  macro_providers["67lang:last_then"] = new Noop_macro_provider();
  macro_providers["67lang:solution"] = new Solution_macro_provider();
  macro_providers["must_compile_error"] = new Must_compile_error_macro_provider();
  macro_providers["then"] = new Multi_provider([
    [has_arguments, new Pipeline_macro_provider()],
    [null, new Scope_macro_provider()],
  ]);
  macro_providers["do"] = new Multi_provider([
    [has_arguments, new Pipeline_macro_provider()],
    [null, new Scope_macro_provider()],
  ]);
  macro_providers["get"] = new Pipeline_macro_provider();
  macro_providers["noscope"] = new Noscope_macro_provider();
  macro_providers["return"] = new Return_macro_provider();
  macro_providers["try"] = new Try_macro_provider();
  macro_providers["catch"] = new Catch_macro_provider();
  macro_providers["finally"] = new Scope_macro_provider();
  macro_providers["throw"] = new Throw_macro_provider();

  for (const m of COMMENT_MACROS) {
    macro_providers[m] = new Comment_macro_provider();
  }
  for (const m of SCOPE_MACRO) {
    macro_providers[m] = new Scope_macro_provider();
  }

  const literalTable: Record<string, [string, Type | null]> = {
    true: ["true", BOOL],
    false: ["false", BOOL],
    break: ["break", null],
    continue: ["continue", null],
  };

  for (const [k, [value, tname]] of Object.entries(literalTable)) {
    macro_providers[k] = new Literal_macro_provider(value, tname);
  }

  for (const [name, provider] of Object.entries(macro_providers)) {
    default_logger.registry(
      `registering macro "${name}" -> ${(provider as any).constructor.name}`,
    );
  }

  const registries: Record<string, MacroRegistry<Macro_ctx_proc>> = {};
  const create_registry = <T extends Macro_ctx_proc>(name: string): MacroRegistry<T> => {
    const r = new MacroRegistry<T>();
    registries[name] = r;
    return r;
  };

  const preprocess = create_registry<Macro_ctx_void_proc>("preprocess");
  const typecheck = create_registry<Macro_ctx_typecheck_proc>("typecheck");
  const emission = create_registry<Macro_ctx_void_proc>("emission");
  const type_registration = create_registry<Macro_ctx_typecheck_proc>("type_registration");
  const type_detail_registration = create_registry<Macro_ctx_typecheck_proc>("type_detail_registration");
  const function_registration = create_registry<Macro_ctx_typecheck_proc>("function_registration");

  for (const [macro_name, provider] of Object.entries(macro_providers)) {
    // preprocess
    if ("preprocess" in provider) {
      preprocess.add_fn(
        (c: MacroContext) => provider.preprocess(c),
        macro_name,
      );
    } else {
      preprocess.add_fn(null, macro_name);
    }

    // typecheck
    if ("typecheck" in provider) {
      typecheck.add_fn(
        (c: MacroContext): TCResult => {
          const rv = provider.typecheck(c);
          if (typeof rv === "string") {
            throw new Error(
              `String... ${rv} is_a? String ${typeof rv === "string"}`,
            );
          }
          return rv;
        },
        macro_name,
      );
    } else {
      typecheck.add_fn(null, macro_name);
    }

    // function_registration
    if ("register_functions" in provider) {
      function_registration.add_fn(
        (c: MacroContext): TCResult => {
          const rv = provider.register_functions(c);
          if (typeof rv === "string") {
            throw new Error(
              `String... ${rv} is_a? String ${typeof rv === "string"}`,
            );
          }
          return rv;
        },
        macro_name,
      );
    } else {
      function_registration.add_fn(null, macro_name);
    }

    // emission
    if ("emission" in provider) {
      emission.add_fn(
        (c: MacroContext) => provider.emission(c),
        macro_name,
      );
    } else {
      emission.add_fn(null, macro_name);
    }

    // type_registration
    if ("register_type" in provider) {
      type_registration.add_fn(
        (c: MacroContext) => provider.register_type(c),
        macro_name,
      );
    } else {
      type_registration.add_fn(null, macro_name);
    }

    // type_detail_registration
    if ("register_type_details" in provider) {
      type_detail_registration.add_fn(
        (c: MacroContext) => provider.register_type_details(c),
        macro_name,
      );
    } else {
      type_detail_registration.add_fn(null, macro_name);
    }
  }

  const rv = new Macrocosm(
    emission,
    typecheck,
    preprocess,
    type_registration,
    type_detail_registration,
    function_registration,
  );
  Object.assign(rv.registries, registries);
  return rv;
}

// default factories for metadata types that want auto-creation

TypeMap.register(Callers, () => new Callers());
TypeMap.register(Indexers, () => new Indexers());
TypeMap.register(Params, () => new Params());

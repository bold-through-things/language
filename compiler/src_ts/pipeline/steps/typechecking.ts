// pipeline/steps/type_checking.ts

import { Macro_registry, Macro_context } from "../../core/macro_registry.ts";
import { Macro, Node, Resolved_type } from "../../core/node.ts";
import { default_logger } from "../../utils/logger.ts";
import { Macrocosm } from "../../core/macrocosm.ts";
import { ComplexType, Type_check_result, Type_engine, TypeVariable } from "../../compiler_types/proper_types.ts";
import { load_builtins } from "../builtin_calls.ts";
import { load_type_hierarchy_json } from "../../compiler_types/type_hierarchy.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { Error_caused_by } from "../../utils/utils.ts";

const TYPE_ENGINE_INIT = Symbol("TYPE_ENGINE_INIT"); // a package private field
const FINALIZERS = Symbol("FINALIZERS");

type Type_engine_with_init = Type_engine & {
  [TYPE_ENGINE_INIT]?: boolean;
};

export class Type_registration_context implements Macro_context {
  node: Node;
  compiler: Macrocosm;
  registry: Macro_registry<Type_registration_context>;
  type_engine: Type_engine;
  private finalizers: Array<() => void> = [];
  private is_top_level: boolean;

  constructor(opts: {
    node: Node;
    compiler: Macrocosm,
    registry: Macro_registry<Type_registration_context>,
    type_engine: Type_engine,
    [FINALIZERS]?: Array<() => void>,
  }) {
    this.node = opts.node;
    this.compiler = opts.compiler;
    const type_engine_with_init = opts.type_engine as Type_engine_with_init;

    if (!type_engine_with_init[TYPE_ENGINE_INIT]) {
      type_engine_with_init[TYPE_ENGINE_INIT] = true;
      register_builtins(this, opts.type_engine);
    }

    this.registry = opts.registry;
    this.type_engine = opts.type_engine;

    this.finalizers = opts[FINALIZERS] ?? [];
    this.is_top_level = !(FINALIZERS in opts);
  }

  clone_with(opts: { node: Node }): Type_registration_context {
    return new Type_registration_context({
      node: opts.node ?? this.node,
      compiler: this.compiler,
      registry: this.registry,
      type_engine: this.type_engine,
      [FINALIZERS]: this.finalizers,
    });
  }

  apply(): Type_check_result {
    const macroName = String(this.compiler.get_metadata(this.node, Macro));
    const allMacros = this.registry.all();

    const rv = default_logger.indent(this, "type registration", `node ${macroName}`, (): Type_check_result => {
      const macro_impl = allMacros[macroName];
      if (macro_impl !== undefined) {
        return this.compiler.error_tracker.safely(this, () => 
          macro_impl(this)
        ) ?? null;
      } else {
        let last: Type_check_result = null;
        this.node.children.forEach((child) => {
          const childCtx = this.clone_with({ node: child });
          last = childCtx.apply();
        });
        return last;
      }
    });

    if (this.is_top_level) {
      for (const finalizer of this.finalizers) {
        finalizer();
      }
    }

    return rv;
  }

  finalizer(fn: () => void) {
    this.finalizers.push(fn);
  }
}

export class Type_checking_context implements Macro_context {
  node: Node;
  compiler: Macrocosm;
  registry: Macro_registry<Type_checking_context>;
  type_engine: Type_engine;

  constructor(opts: {
    node: Node;
    compiler: Macrocosm,
    registry: Macro_registry<Type_checking_context>,
    type_engine: Type_engine,
  }) {
    this.node = opts.node;
    this.compiler = opts.compiler;
    this.registry = opts.registry;
    this.type_engine = opts.type_engine;
  }

  clone_with(opts: { node: Node }): Type_checking_context {
    return new Type_checking_context({
      node: opts.node ?? this.node,
      compiler: this.compiler,
      registry: this.registry,
      type_engine: this.type_engine,
    });
  }

  apply(): Type_check_result {
    const macroName = String(this.compiler.get_metadata(this.node, Macro));
    const allMacros = this.registry.all();

    const content = this.node.content;
    const preview =
      content.length > 50
        ? content.slice(0, 50) + "..."
        : content;

    const nodeDesc = `node ${macroName}: ${preview}`;

    const rv = default_logger.indent(this, "typecheck", nodeDesc, () => {
      const macro_impl = allMacros[macroName]
      if (macro_impl !== undefined) {
        let result: Type_check_result = null;
        this.compiler.error_tracker.safely(this, () => {
          result = macro_impl(this);
        });
        this.compiler.set_metadata(
          this.node,
          Resolved_type,
          new Resolved_type(result),
        );
        return result;
      } else {
        let last: Type_check_result = null;
        this.node.children.forEach((child) => {
          const childCtx = this.clone_with({ node: child });
          last = childCtx.apply();
        });
        this.compiler.set_metadata(
          this.node,
          Resolved_type,
          new Resolved_type(last),
        );
        return last;
      }
    });

    return rv;
  }
}

function register_builtins(ctx: Macro_context, engine: Type_engine) {
  function get_complex_type(name: string) {
    const type = engine.get_type(name);
    ctx.compiler.error_tracker.assert(
      type instanceof ComplexType,
      {
        node: ctx.node,
        message: `Expected complex type for builtin type '${name}', got '${type.to_string()}'`,
        type: ErrorType.INTERNAL_TYPE_REGISTRATION,
      }
    );
    return type;
  }

  function comp_prim(name: string, ts_name: string) {
    get_complex_type(name).configure({
      ctx,
      typescript_name: ts_name,
      caused_by: Error_caused_by.INTERNAL,
    })
  }

  comp_prim("int", "number");
  comp_prim("float", "number");
  comp_prim("str", "string");
  comp_prim("regex", "RegExp");
  comp_prim("bool", "boolean");
  comp_prim("void", "void");
  get_complex_type("list").configure(
    {
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      type_params: [new TypeVariable({ name: "T" })],
      typescript_name: "Array",
    },
  );

  get_complex_type("dict").configure(
    {
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      type_params: [new TypeVariable({ name: "K" }), new TypeVariable({ name: "V" })],
      typescript_name: "Record",
    },
  );

  get_complex_type("set").configure(
    {
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      type_params: [new TypeVariable({ name: "T" })],
      typescript_name: "Set",
    },
  );


  get_complex_type("!").configure(
    {
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: "Error",
    },
  );

  load_builtins(ctx, engine);

  load_type_hierarchy_json(ctx, engine);

  // uhh TODO i think a bug here?
  engine.type_hierarchy.set(
    engine.get_type("int"),
    [engine.get_type("float")],
  );
}

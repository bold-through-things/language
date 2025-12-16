// compiler_types/proper_types.ts

import { Macro_error_tracker } from "../core/exceptions.ts";
import { Macro_context } from "../core/macro_registry.ts";
import { Call_convention } from "../pipeline/call_conventions.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Error_caused_by, map_each_pair, readonly } from "../utils/utils.ts";

// Proper type system for 67lang — objects, mandatory generics.

const NEW = Symbol("NEW"); // a package private hook

export abstract class Type {
  abstract readonly name: string;

  abstract is_concrete(): boolean;

  abstract to_typescript(): string;

  abstract to_string(): string;
}

export class TypeVariable extends Type {
  readonly name: string;
  readonly constraints: Type[];

  constructor(opts: { name: string, constraints?: Type[] } ) {
    super();
    this.name = opts.name;
    this.constraints = opts.constraints ?? [];
  }

  override to_string(): string {
    if (this.constraints.length === 0) {
      return this.name;
    }
    return `${this.name} extends ${this.constraints.map((c) => c.to_string()).join(" & ")}`;
  }

  to_typescript(): string {
    return this.name;
  }

  is_concrete(): boolean {
    return false;
  }
}

const remap_error = {
  [Error_caused_by.USER]: ErrorType.INVALID_MACRO, // um TODO here
  [Error_caused_by.INTERNAL]: ErrorType.INTERNAL_TYPE_REGISTRATION,
}

export class ComplexType extends Type {
  readonly name: string;
  private _type_params: Type[];
  get type_params(): ReadonlyArray<Type> {
    // well TODO should cache it here
    return readonly(this._type_params);
  }
  private _typescript_name: string;
  get typescript_name(): string {
    return this._typescript_name;
  }

  protected constructor(
    opts: { name: string, type_params?: Type[], typescript_name: string },
  ) {
    super();
    this.name = opts.name;
    this._type_params = opts.type_params ?? [];
    this._typescript_name = opts.typescript_name;
  }

  static [NEW](
    opts: { name: string, type_params?: Type[], typescript_name: string },
  ) {
    return new ComplexType({
      name: opts.name,
      type_params: opts.type_params?.slice() ?? [],
      typescript_name: opts.typescript_name,
    });
  }

  configure(opts: { 
    ctx: Macro_context,
    typescript_name?: string,
    type_params?: Type[],
    caused_by: Error_caused_by,
  }): ComplexType {
    function assert_type_variable(t: Type): TypeVariable {
      ctx.compiler.error_tracker.assert(
        t instanceof TypeVariable,
        {
          message: `list of type parameters must only be \`TypeVariable\`, got a ${t.constructor.name} here`,
          node: ctx.node,
          type: remap_error[opts.caused_by],
        }
      );
      return t;
    }

    const ctx: Macro_context = opts.ctx;
    if (opts.typescript_name !== undefined) {
      ctx.compiler.error_tracker.assert(
        this._typescript_name === opts.typescript_name || this._typescript_name === "",
        {
          message: `already \`typescript_name == "${this._typescript_name}"\`, attempting overwrite with "${opts.typescript_name}"`,
          node: ctx.node,
          type: remap_error[opts.caused_by],
        }
      );
      this._typescript_name = opts.typescript_name;
    }
    if (opts.type_params !== undefined) {
      const new_ = new Set(opts.type_params.map((t) => assert_type_variable(t)).map((t) => t.name));
      const removed = this._type_params.map((t) => assert_type_variable(t).name).filter((n) => !new_.has(n));
      ctx.compiler.error_tracker.assert(
        removed.length === 0,
        {
          message: `cannot remove type parameters ${removed.join(", ")} from type ${this.name}`,
          node: ctx.node,
          type: remap_error[opts.caused_by],
        }
      );
      this._type_params = opts.type_params.slice();
    }
    return this;
  }

  instantiate_with(opts: {
    ctx: Macro_context,
    type_params: Type[],
    caused_by: Error_caused_by
  }): ComplexType {
    const ctx: Macro_context = opts.ctx;
    ctx.compiler.error_tracker.assert(
      opts.type_params.length === this._type_params.length, {
        message: `Type ${this.name} expects ${this._type_params.length} type arguments, got ${opts.type_params.length}`,
        node: ctx.node,
        type: remap_error[opts.caused_by],
      }
    );
    if (this._type_params.length === 0) {
      return this;
    }
    return new ComplexType({
      name: this.name,
      type_params: opts.type_params.slice(),
      typescript_name: this._typescript_name,
    });
  }

  to_typescript(): string {
    if (this._type_params.length === 0) {
      return this._typescript_name;
    }
    if (this._typescript_name === "Function") {
      // uhh TODO this is a little fucking stupid yes?
      const inner = this._type_params.slice(0, -1).map((t, i) => `arg${i}: ${t.to_typescript()}`).join(", ");
      const last = this._type_params[this._type_params.length - 1]?.to_typescript();
      return `(${inner}) => ${last}`;
    }
    const inner = this._type_params.map((t) => t.to_typescript()).join(", ");
    return `${this._typescript_name}<${inner}>`;
  }

  override to_string(): string {
    if (this._type_params.length === 0) {
      return this.name;
    }
    const inner = this._type_params.map((t) => t.to_string()).join(", ");
    return `${this.name}<${inner}>`;
  }

  is_concrete(): boolean {
    return this._type_params.every((t) => t.is_concrete());
  }
}

/*
```
note valid
local 1
	type *
	do returns:Some_type

note error
local 2
	type Some_type
	do returns:*
```
*/
export const [ 
  [UNKNOWN_NAME, UNKNOWN], 
  [NEVER_NAME, NEVER],
  [UPSTREAM_INVALID_NAME, UPSTREAM_INVALID]
] = 
  function() {
    class Special_type extends Type {
      constructor (
        readonly name: string,
      ) {
        // ...
        super();
      }

      override to_string(): string {
        return this.name;
      }

      to_typescript(): string {
        return "unknown";
      }

      is_concrete(): boolean {
        return true;
      }
    }
    function map_tuple<T extends readonly unknown[], U>(
      arr: T,
      fn: (item: T[number], index: number) => U
    ): {[K in keyof T]: U } {
      const rv: U[] = [];
      for (let i = 0; i < arr.length; i++) {
        rv.push(fn(arr[i], i));
      }
      return rv as {[K in keyof T]: U };
    }
    const names = [
      /*
      considered `;]` and `];` (yes, really) which would type much faster,
      but it's 2025 and LLMs will type for you.
      */
      "67lang:unknown",
      "67lang:never",
      "67lang:upstream_invalid"
    ] as const;
    return map_tuple(names, (name) => [name, new Special_type(name)] as [string, Type]);
  }();

// -------- Substitution --------

export class TypeSubstitution {
  readonly substitutions: Record<string, Type>;

  constructor(substitutions: Record<string, Type>) {
    this.substitutions = { ...substitutions };
  }

  apply(opts: {
    ctx: Macro_context, 
    type_expr: Type,
    caused_by: Error_caused_by,
  }): Type {
    if (Object.values(this.substitutions).some(t => t === UPSTREAM_INVALID)) {
      return UPSTREAM_INVALID;
    }
    if (opts.type_expr instanceof TypeVariable) {
      const sub = this.substitutions[opts.type_expr.name];
      return sub ?? opts.type_expr;
    }
    if (opts.type_expr instanceof ComplexType) {
      const new_params = opts.type_expr.type_params.map((t) => this.apply({ ctx: opts.ctx, type_expr: t, caused_by: opts.caused_by }));
      return opts.type_expr.instantiate_with({ ctx: opts.ctx, type_params: new_params, caused_by: opts.caused_by });
    }
    return opts.type_expr;
  }
}

export class Function_67lang {
  demands: Type[] = [];
  returns: Type | null = null;
  convention: Call_convention | null = null;

  private constructor() {
    // ...
  }

  static[NEW]() {
    return new Function_67lang();
  }
}

export class Type_engine {
  private readonly types: Record<string, Type> = Object.create(null);
  private readonly __functions: Record<string, Function_67lang[]> = Object.create(null);
  public readonly type_hierarchy: Map<Type, Type[]> = new Map();
  public readonly union_types: Map<string, string[]> = new Map();

  constructor() {
    this.types[UNKNOWN_NAME] = UNKNOWN;
    this.types[NEVER_NAME] = NEVER;
    this.types[UPSTREAM_INVALID_NAME] = UPSTREAM_INVALID;
  }

  get_type(name: string): Type {
    const existing = this.types[name];
    if (existing) {
      return existing;
    }
    const t = ComplexType[NEW]({ name, typescript_name: "" });
    this.types[name] = t;
    return t;
  }

  instantiate_generic(opts: {
    name: string, 
    type_args: Type[]
    ctx: Macro_context,
    caused_by: Error_caused_by,
  }): ComplexType {
    const error_tracker: Macro_error_tracker = opts.ctx.compiler.error_tracker;
    const tmpl = this.types[opts.name];
    error_tracker.assert(
      tmpl !== undefined,
      {
        message: `type ${opts.name} not found in engine`,
        node: opts.ctx.node,
        type: remap_error[opts.caused_by],
      }
    )
    error_tracker.assert(
      tmpl instanceof ComplexType,
      {
        message: `type ${opts.name} is implemented through ${tmpl.constructor.name}, expected ComplexType here`,
        node: opts.ctx.node,
        type: remap_error[opts.caused_by],
      }
    )
    error_tracker.assert(
      opts.type_args.length === tmpl.type_params.length,
      {
        message: `type ${opts.name} expects ${tmpl.type_params.length} type arguments, got ${opts.type_args.length}`,
        node: opts.ctx.node,
        type: remap_error[opts.caused_by],
      }
    )
    return tmpl.instantiate_with({ ctx: opts.ctx, type_params: opts.type_args.slice(), caused_by: opts.caused_by });
  }

  can_assign({value_type, field_type}: {value_type: Type, field_type: Type}): boolean {
    if (field_type === UNKNOWN) {
      return true;
    }

    if (field_type === NEVER) {
      if (field_type === value_type) {
        // TODO not sure about this though,,,,,,
        return true;
      }
      return false;
    }

    if (value_type === UPSTREAM_INVALID) {
      return true;
    }

    if (value_type instanceof ComplexType && field_type instanceof ComplexType) {
      const parents = this.type_hierarchy.get(value_type) ?? [];

      const is_subtype =
        parents.includes(field_type) ||
        parents.some((p) => this.is_transitive_subtype(p, field_type));

      if (is_subtype) {
        return true; // matches Crystal comment: probably too permissive, but preserved
      }

      if (value_type.name !== field_type.name) {
        return false;
      }
      if (value_type.type_params.length !== field_type.type_params.length) {
        return false;
      }
      return map_each_pair(
        value_type.type_params,
        field_type.type_params,
        (vt, ft) => this.can_assign({value_type: vt, field_type: ft}),
      ).every((b) => b);
    }

    if (field_type instanceof TypeVariable) {
      return false;
    }

    return false;
  }

  is_transitive_subtype(current: Type, target: Type): boolean {
    if (current === target) {
      return true;
    }
    const parents = this.type_hierarchy.get(current);
    if (!parents) {
      return false;
    }
    for (const p of parents) {
      if (this.is_transitive_subtype(p, target)) {
        return true;
      }
    }
    return false;
  }

  add_function(
    name: string | null,
    then: (fn: Function_67lang) => void
  ): Function_67lang {
    const fn = Function_67lang[NEW]();
    then(fn);
    if (name === null) {
      return fn;
    }
    let arr = this.__functions[name];
    if (!arr) {
      arr = [];
      this.__functions[name] = arr;
    }
    arr.push(fn);
    return fn;
  }

  get_functions(
    name: string,
  ): Function_67lang[] | undefined {
    if (name in this.__functions) {
      return this.__functions[name];
    }
    return undefined;
  }

  get functions(): [string, Function_67lang][] {
    const all: [string, Function_67lang][] = [];
    for (const [name, convs] of Object.entries(this.__functions)) {
      all.push(...convs.map((c) => [name, c] as [string, Function_67lang]));
    }
    return all;
  }
}

/*
returned by nodes which stand for types
*/
export class Type_reference {
  readonly ref: Type;
  readonly parameter_name: string | null = null;

  constructor(ref: Type, parameter_name?: string) {
    this.ref = ref;
    this.parameter_name = parameter_name ?? null;
  }

  toString(): string {
    if (this.parameter_name) {
      return `${this.ref.to_string()} for ${this.parameter_name}`;
    }
    return this.ref.to_string();
  }
}

/*
returned by nodes which stand for functions
*/
export class Function_reference {
  readonly ref: Function_67lang;

  constructor(ref: Function_67lang) {
    this.ref = ref;
  }

  toString(): string {
    return `function`;
  }
}

/* 
returned by nodes which are expressions and describes the type of value that's returned 
*/
export class Expression_return_type {
  constructor(public type: Type) {
    // ...
  }
}


export type Type_check_result = Type_reference | Expression_return_type | null;

// compiler_types/proper_types.ts

import { Error_like } from "../utils/utils.ts";

// Proper type system for 67lang — objects, mandatory generics.

export abstract class Type {
  abstract readonly name: string;

  abstract is_assignable_to(other: Type): boolean;
  abstract is_concrete(): boolean;

  abstract to_typescript(): string;
}

export const TYPE_HIERARCHY: Map<Type, Type[]> = new Map();
export const UNION_TYPES: Map<string, string[]> = new Map();

// -------- helpers --------

export function is_transitive_subtype(current: Type, target: Type): boolean {
  if (current === target) {
    return true;
  }
  const parents = TYPE_HIERARCHY.get(current);
  if (!parents) {
    return false;
  }
  for (const p of parents) {
    if (is_transitive_subtype(p, target)) {
      return true;
    }
  }
  return false;
}

// -------- Primitive --------

export class PrimitiveType extends Type {
  readonly name: string;
  readonly typescript_name: string;

  constructor(opts: { name: string, typescript_name: string }) {
    super();
    this.name = opts.name;
    this.typescript_name = opts.typescript_name;
  }

  override toString(): string {
    return this.name;
  }

  to_typescript(): string {
    return this.typescript_name;
  }

  is_assignable_to(other: Type): boolean {
    if (other.name === "*") {
      return true; // wildcard
    }
    if (this.name === other.name) {
      return true;
    }
    if (other instanceof TypeVariable) {
      return true;
    }

    const direct = TYPE_HIERARCHY.get(this) ?? [];
    const by_name_type = TYPE_REGISTRY.get_type(this.name);
    const via_name = by_name_type ? TYPE_HIERARCHY.get(by_name_type) ?? [] : [];
    const parents = [...direct, ...via_name];

    if (parents.includes(other)) {
      return true;
    }
    for (const p of parents) {
      if (is_transitive_subtype(p, other)) {
        return true;
      }
    }
    return false;
  }

  is_concrete(): boolean {
    return true;
  }
}

// -------- Type Variable --------

export class TypeVariable extends Type {
  readonly name: string;
  readonly constraints: Type[];

  constructor(opts: { name: string, constraints?: Type[] } ) {
    super();
    this.name = opts.name;
    this.constraints = opts.constraints ?? [];
  }

  override toString(): string {
    if (this.constraints.length === 0) {
      return this.name;
    }
    return `${this.name} extends ${this.constraints.map((c) => c.toString()).join(" & ")}`;
  }

  to_typescript(): string {
    return this.name;
  }

  is_assignable_to(other: Type): boolean {
    if (other.name === "*") {
      return true;
    }
    if (other instanceof TypeVariable && this.name === other.name) {
      return true;
    }
    return this.constraints.some((c) => c.is_assignable_to(other));
  }

  is_concrete(): boolean {
    return false;
  }
}

// -------- Complex (generics / user types) --------

export class ComplexType extends Type {
  readonly name: string;
  readonly type_params: Type[];
  readonly typescript_name: string;

  constructor(
    opts: { name: string, type_params?: Type[], typescript_name: string },
  ) {
    super();
    this.name = opts.name;
    this.type_params = opts.type_params ?? [];
    this.typescript_name = opts.typescript_name;
  }

  to_typescript(): string {
    if (this.type_params.length === 0) {
      return this.typescript_name;
    }
    const inner = this.type_params.map((t) => t.to_typescript()).join(", ");
    return `${this.typescript_name}<${inner}>`;
  }

  override toString(): string {
    if (this.type_params.length === 0) {
      return this.name;
    }
    const inner = this.type_params.map((t) => t.toString()).join(", ");
    return `${this.name}<${inner}>`;
  }

  is_assignable_to(other: Type): boolean {
    if (other.name === "*") {
      return true;
    }

    if (other instanceof ComplexType) {
      const direct = TYPE_HIERARCHY.get(this) ?? [];
      const by_name_type = TYPE_REGISTRY.get_type(this.name);
      const via_name = by_name_type ? TYPE_HIERARCHY.get(by_name_type) ?? [] : [];
      const parents = [...direct, ...via_name];

      const is_subtype =
        parents.includes(other) ||
        parents.some((p) => is_transitive_subtype(p, other));

      if (is_subtype) {
        return true; // matches Crystal comment: probably too permissive, but preserved
      }

      if (this.name !== other.name) {
        return false;
      }
      if (this.type_params.length !== other.type_params.length) {
        return false;
      }
      return this.type_params.every((a, i) => a.is_assignable_to(other.type_params[i]));
    }

    if (other instanceof PrimitiveType || other instanceof TypeVariable) {
      return false;
    }

    return false;
  }

  is_concrete(): boolean {
    return this.type_params.every((t) => t.is_concrete());
  }
}

// -------- Bottom / Never --------

export class NeverType extends Type {
  readonly name: string = "never";

  override toString(): string {
    return "never";
  }

  to_typescript(): string {
    return "never";
  }

  is_assignable_to(_other: Type): boolean {
    return true; // bottom: subtype of everything
  }

  is_concrete(): boolean {
    return true;
  }
}

// -------- Builtin helpers --------

export const BuiltinGenericTypes = {
  list_of(element_type: Type): ComplexType {
    return new ComplexType({ name: "list", type_params: [element_type], typescript_name: "Array" });
  },

  dict_of(key_type: Type, value_type: Type): ComplexType {
    return new ComplexType({ name: "dict", type_params: [key_type, value_type], typescript_name: "Record" });
  },
};

// -------- Substitution --------

export class TypeSubstitution {
  readonly substitutions: Record<string, Type>;

  constructor(substitutions: Record<string, Type>) {
    this.substitutions = { ...substitutions };
  }

  apply(type_expr: Type): Type {
    if (type_expr instanceof TypeVariable) {
      const sub = this.substitutions[type_expr.name];
      return sub ?? type_expr;
    }
    if (type_expr instanceof ComplexType) {
      const new_params = type_expr.type_params.map((t) => this.apply(t));
      return new ComplexType({ name: type_expr.name, type_params: new_params, typescript_name: type_expr.typescript_name });
    }
    return type_expr;
  }
}

// -------- Registry --------

export class TypeRegistry {
  readonly types: Record<string, Type>;

  constructor() {
    this.types = {};
  }

  register_type(complex_type: Type): void {
    this.types[complex_type.name] = complex_type;
  }

  compute_type(name: string, builder: () => Type): Type {
    const existing = this.get_type(name);
    if (existing) {
      return existing;
    }
    const t = builder();
    this.types[t.name] = t;
    return t;
  }

  get_type(name: string): Type | undefined {
    return this.types[name];
  }

  instantiate_generic(name: string, type_args: Type[]): ComplexType | Error_like | null {
    const tmpl = this.types[name];
    if (!tmpl) {
      return new Error_like(`Type template ${name} not found`);
    }
    if (!(tmpl instanceof ComplexType)) {
      throw new Error("??????");
    }
    if (type_args.length !== tmpl.type_params.length) {
      return new Error_like(`Type ${name} expects ${tmpl.type_params.length} type arguments, got ${type_args.length}`);
    }
    return new ComplexType({ name: tmpl.name, type_params: type_args.slice(), typescript_name: tmpl.typescript_name });
  }
}

// Global registry and basic types

export const TYPE_REGISTRY = new TypeRegistry();

function comp_prim(name: string, typescript_name: string): PrimitiveType {
  return TYPE_REGISTRY.compute_type(
    name,
    () => new PrimitiveType({ name, typescript_name }),
  ) as PrimitiveType;
}

export const NEVER = new NeverType();
export const WILDCARD = TYPE_REGISTRY.compute_type("*", () => new ComplexType({ name: "*", typescript_name: "any" })); // TODO nuke me...
export const INT = comp_prim("int", "number");
export const FLOAT = comp_prim("float", "number");
export const STRING = comp_prim("str", "string");
export const REGEX = comp_prim("regex", "RegExp");
export const BOOL = comp_prim("bool", "boolean");
export const VOID = comp_prim("void", "void");
export const LIST = new ComplexType({ name: "list", type_params: [new TypeVariable({ name: "T" })], typescript_name: "Array" });

export const DICT = TYPE_REGISTRY.compute_type(
  "dict",
  () => new ComplexType({ name: "dict", type_params: [new TypeVariable({ name: "K" }), new TypeVariable({ name: "V" })], typescript_name: "Record" }),
);

export const SET = new ComplexType({ name: "set", type_params: [new TypeVariable({ name: "T" })], typescript_name: "Set" });

export const CALLABLE = TYPE_REGISTRY.compute_type(
  "callable",
  () => new ComplexType({ name: "callable", type_params: [new TypeVariable({ name: "RV" })], typescript_name: "Function" }),
);

// register some builtins
TYPE_REGISTRY.register_type(LIST);
TYPE_REGISTRY.register_type(SET);
TYPE_REGISTRY.register_type(new ComplexType({ name: "Error", typescript_name: "Error" }));

// Convenience accessor
export function type_registry(): TypeRegistry {
  return TYPE_REGISTRY;
}

// -------- Wrapper to mark type parameters in typecheck results --------

export class TypeParameter {
  readonly type_expr: Type;
  readonly parameter_name?: string;

  constructor(type_expr: Type, parameter_name?: string) {
    this.type_expr = type_expr;
    this.parameter_name = parameter_name;
  }

  toString(): string {
    if (this.parameter_name) {
      return `${this.type_expr.toString()} for ${this.parameter_name}`;
    }
    return this.type_expr.toString();
  }
}

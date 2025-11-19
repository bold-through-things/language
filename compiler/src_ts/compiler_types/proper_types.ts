// compiler_types/proper_types.ts

// Proper type system for 67lang — objects, mandatory generics.

export abstract class Type {
  abstract readonly name: string;

  abstract is_assignable_to(other: Type): boolean;
  abstract is_concrete(): boolean;
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

  constructor(name: string) {
    super();
    this.name = name;
  }

  override toString(): string {
    return this.name;
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

  constructor(name: string, constraints: Type[] = []) {
    super();
    this.name = name;
    this.constraints = constraints;
  }

  override toString(): string {
    if (this.constraints.length === 0) {
      return this.name;
    }
    return `${this.name} extends ${this.constraints.map((c) => c.toString()).join(" & ")}`;
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
  readonly fields: Array<{ name: string; type: Type }>;

  constructor(
    name: string,
    type_params: Type[] = [],
    fields: Array<{ name: string; type: Type }> = [],
  ) {
    super();
    this.name = name;
    this.type_params = type_params.slice();
    this.fields = fields.map((f) => ({ name: f.name, type: f.type }));
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

  get_field_type(field_name: string): Type | null {
    for (const { name, type } of this.fields) {
      if (name === field_name) {
        return type;
      }
    }
    return null;
  }
}

// -------- Bottom / Never --------

export class NeverType extends Type {
  readonly name: string = "never";

  override toString(): string {
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

export class FunctionType extends ComplexType {
  constructor(param_types: Type[], return_type: Type) {
    super("function", [...param_types, return_type]);
  }
}

export const BuiltinGenericTypes = {
  list_of(element_type: Type): ComplexType {
    return new ComplexType("list", [element_type], [{ name: "length", type: INT }]);
  },

  dict_of(key_type: Type, value_type: Type): ComplexType {
    return new ComplexType("dict", [key_type, value_type]);
  },

  function_of(param_types: Type[], return_type: Type): FunctionType {
    return new FunctionType(param_types, return_type);
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
      return new ComplexType(type_expr.name, new_params, type_expr.fields);
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
    switch (name) {
      case "int":
        return INT;
      case "float":
        return FLOAT;
      case "bool":
        return BOOL;
      case "void":
        return VOID;
      default:
        return this.types[name];
    }
  }

  instantiate_generic(name: string, type_args: Type[]): ComplexType | null {
    const tmpl = this.types[name];
    if (!tmpl) {
      return null;
    }
    if (!(tmpl instanceof ComplexType)) {
      throw new Error("??????");
    }
    if (type_args.length !== tmpl.type_params.length) {
      return null;
    }
    return new ComplexType(tmpl.name, type_args.slice(), tmpl.fields);
  }
}

// Global registry and basic types

export const TYPE_REGISTRY = new TypeRegistry();

export const NEVER = new NeverType();
export const WILDCARD = TYPE_REGISTRY.compute_type("*", () => new ComplexType("*")); // TODO nuke me...
export const INT = new PrimitiveType("int");
export const FLOAT = new PrimitiveType("float");
export const STRING = TYPE_REGISTRY.compute_type("str", () => new PrimitiveType("str"));
export const REGEX = new PrimitiveType("regex");
export const BOOL = new PrimitiveType("bool");
export const VOID = new PrimitiveType("void");

export const LIST = new ComplexType("list", [new TypeVariable("T")], [
  { name: "length", type: INT },
]);

export const DICT = TYPE_REGISTRY.compute_type(
  "dict",
  () => new ComplexType("dict", [new TypeVariable("K"), new TypeVariable("V")]),
);

export const SET = new ComplexType("set", [new TypeVariable("T")]);

export const CALLABLE = TYPE_REGISTRY.compute_type(
  "callable",
  () => new ComplexType("callable", [new TypeVariable("RV")]),
);

if (!CALLABLE) {
  throw new Error("fuck you");
}

// register some builtins
TYPE_REGISTRY.register_type(LIST);
TYPE_REGISTRY.register_type(SET);
TYPE_REGISTRY.register_type(new ComplexType("Error"));

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

// utils/utils.ts

type Constructor<T> = {
  new (...args: any[]): T;
  name: string;
};

class Box {
  // marker base
}

class TypedBox<T> extends Box {
  value: T;
  constructor(value: T) {
    super();
    this.value = value;
  }
}

export class TypeMap {
  private store: Map<string, Box> = new Map();

  // Used like Crystal's default_factory_for / def_default_factory_for
  private static defaultFactories: Map<string, () => unknown> = new Map();

  // crystal: [](klass : T.class) : T forall T
  get<T>(klass: Constructor<T>): T {
    const key = klass.name;
    const box = this.store.get(key);
    if (box) {
      return (box as TypedBox<T>).value;
    }

    const factory = TypeMap.getFactory(klass);
    if (factory) {
      const value = factory();
      this.store.set(key, new TypedBox<T>(value));
      return value as T;
    }

    throw new Error(
      `No entry or default factory registered for ${key}`,
    );
  }

  // crystal: maybe(klass : T.class) : T? forall T
  maybe<T>(klass: Constructor<T>): T | null {
    const key = klass.name;
    const box = this.store.get(key);
    if (box) {
      return (box as TypedBox<T>).value;
    }
    return null;
  }

  // crystal: []=(klass : T.class, value : T)
  set<T>(klass: Constructor<T>, value: T): void {
    const key = klass.name;
    this.store.set(key, new TypedBox<T>(value));
  }

  // ---- default_factory_for ----

  static getFactory<T>(
    klass: Constructor<T>,
  ): (() => T) | undefined {
    const key = klass.name;
    const factory = this.defaultFactories.get(key);
    if (!factory) {
      return undefined;
    }
    return factory as () => T;
  }

  // TypeMap.register(Type, () => new Type())
  // (replacement for the Crystal macro-based def_default_factory_for)
  static register<T>(
    klass: Constructor<T>,
    factory: () => T,
  ): void {
    const key = klass.name;
    this.defaultFactories.set(key, factory);
  }
}

export function not_null<T>(value: T | null | undefined): T {
  if (value === null || value === undefined) {
    throw new Error("Unexpected null or undefined value");
  }
  return value;
}

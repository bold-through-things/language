// utils/utils.ts

import { Macro_context } from "../core/macro_registry.ts";
import { ErrorType } from "./error_types.ts";

export type Constructor<T> = {
  new (...args: never[]): T;
  name: string;
};

export enum Error_caused_by {
  USER,
  INTERNAL,
}

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

// TODO i really do not like the MacroContext here
//  perhaps a custom handler function?
export function choose_single<T, TR>(ctx: Macro_context, options: [T, (v: T) => TR][]): TR {
  const valid = options.filter(([v, _]) => v);
  const valid0 = valid[0];
  if (valid0 === undefined) { // TODO redundant. this should simply work as `switch` here?
    ctx.compiler.error_tracker.assert(
      false,
      {
        node: ctx.node,
        message: `Expected exactly one valid option, got ${valid.length}`,
        type: ErrorType.INVALID_MACRO,
      }
    );
  }
  const [_v, f] = valid0;
  return f(_v);
}

// i fucking love JS, the best
export function try_catch<T>(f: () => T, on_err: (e: unknown) => T): T {
  try {
    return f();
  } catch (e) {
    return on_err(e);
  }
}

export function if_<T>(condition: boolean, f: () => T, fnot: () => T): T {
  if (condition) {
    return f();
  } else {
    return fnot();
  }
}

export class Error_like {
  constructor (
    readonly message: string,
  ) {
    // ...
  }
}

export function partition<T1, T2>(arr: (T1 | T2)[], predicate: (v: T1 | T2) => v is T1): [T1[], T2[]] {
  const trues: T1[] = [];
  const falses: T2[] = [];
  for (const v of arr) {
    if (predicate(v)) {
      trues.push(v);
    } else {
      falses.push(v);
    }
  }
  return [trues, falses];
}

export const WIP_SATISFIED = Symbol("WIP_SATISFIED");

type Contemplates<T> = (v: T) => (typeof WIP_SATISFIED | void);

export class WIP<T> {
  private current: Contemplates<T>[] = [];

  constructor(
    public value: T,
  ) {
    // ...
  }

  mention() {
    const to_remove: Contemplates<T>[] = [];
    for (const fn of this.current) {
      const result = fn(this.value);
      if (result === WIP_SATISFIED) {
        to_remove.push(fn);
      }
    }
    this.current = this.current.filter((fn) => !to_remove.includes(fn));
  }

  contemplate(fn: Contemplates<T>): void {
    const result = fn(this.value);
    if (result === WIP_SATISFIED) {
      return;
    }
    this.current.push(fn);
  }

}

export function readonly<T>(arr: T[]): ReadonlyArray<T> {
  const modifies = [
    "copyWithin",
    "fill",
    "pop",
    "push",
    "reverse",
    "shift",
    "sort",
    "splice",
    "unshift",
  ]

  return new Proxy(arr, {
    get(target, prop, receiver) {
      if (modifies.includes(prop as string)) {
        throw new Error("Cannot modify readonly array");
      }
      if (typeof prop === "symbol") {
        return Reflect.get(target, prop, receiver);
      }
      const num = Number(prop);
      if (isNaN(num) || !Number.isInteger(num) || num < 0 || num >= target.length) {
        return Reflect.get(target, prop, receiver);
      }
      return target[num];
    },
    set(_target, _prop, _value) {
      throw new Error("Cannot modify readonly array");
    },
    deleteProperty(_target, _prop) {
      throw new Error("Cannot modify readonly array");
    },
  });
}

export function map_adjacent<T1, TR>(arr: T1[], fn: (a: T1, b: T1, i: number) => TR): TR[] {
  const out: TR[] = [];
  for (let i = 0; i < arr.length - 1; i++) {
    const a = arr[i];
    const b = arr[i + 1];
    if (a === undefined || b === undefined) {
      throw new Error("sparse array");
    }
    out.push(fn(a, b, i));
  }
  return out;
}

export function map_each_pair<T1, T2, TR>(a1: readonly T1[], a2: readonly T2[], fn: (v1: T1, v2: T2, i: number) => TR): TR[] {
  if (a1.length !== a2.length) {
    throw new Error("length mismatch");
  }
  const out: TR[] = [];
  for (let i = 0; i < a1.length; i++) {
    const i1 = a1[i];
    const i2 = a2[i];
    if (i1 === undefined || i2 === undefined) {
      throw new Error("sparse array");
    }
    out.push(fn(i1, i2, i));
  }
  return out;
}

export function for_each_pair<T1, T2>(a1: T1[], a2: T2[], fn: (v1: T1, v2: T2, i: number) => void): void {
  if (a1.length !== a2.length) {
    throw new Error("length mismatch");
  }
  for (let i = 0; i < a1.length; i++) {
    const i1 = a1[i];
    const i2 = a2[i];
    if (i1 === undefined || i2 === undefined) {
      throw new Error("sparse array");
    }
    fn(i1, i2, i);
  }
}

export function keys<T extends object>(obj: T): (keyof T)[] {
  // TypeScript ??????
  return Object.keys(obj) as (keyof T)[];
}

export function from_entries<K extends string | number | symbol, V>(entries: [K, V][]): { [key in K]: V } {
  const obj = Object.create(null) as { [key in K]: V };
  for (const [k, v] of entries) {
    obj[k] = v;
  }
  return obj;
}

export function first_matching_key<T>(obj: Record<string, T>, fn: (k: string, v: T) => boolean): T | undefined {
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (v === undefined) {
      // ?????? should throw perhaps
      continue;
    }
    if (fn(k, v)) {
      return v;
    }
  }
  return undefined;
}

const c = console
const cl = c.log.bind(c);
/*
this maybe seems a little silly

so the reason that i added this is mark each place where we expect to write for users.
`_reason` is unused but it should help avoid misuse of this

you still can use the normal `log` for your debugging though
*/
export function proclaim(_reason: string, statement: string) {
  cl(statement);
}

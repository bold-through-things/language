// pipeline/builtin_calls.ts

import {
  Call_convention,
  FieldCall,
  DirectCall,
  NaryOperatorCall,
  ChainedComparisonCall,
  IndexAccessCall,
  CallableInvokeCall,
  TypeDemand,
  Async_mode,
} from "./call_conventions.ts";

import {
  Type,
  TypeVariable,
  ComplexType,
  INT,
  SET,
  VOID,
  BOOL,
  WILDCARD,
  TYPE_REGISTRY,
} from "../compiler_types/proper_types.ts";
import { not_null } from "../utils/utils.ts";

// Built-ins map
export const BUILTIN_CALLS: Record<string, Call_convention[]> = Object.create(null);
export const N_ARIES: Record<string, Call_convention[]> = {};

export const MAX_NARY = 6;

// register(name, convs)
export function register(
  name: string,
  convs: Call_convention[],
): void {
  if (!(name in BUILTIN_CALLS)) {
    BUILTIN_CALLS[name] = [];
  }
  BUILTIN_CALLS[name].push(...convs);
}

// Helpers to generate fixed-arity variants by repeating T in the demands
export function spread_nary(
  operator: string,
  t: TypeVariable,
  max_arity: number = MAX_NARY,
  wrapper: string | null = null,
  name: string | null = null,
): Call_convention[] {
  const out: Call_convention[] = [];
  for (let n = 1; n <= max_arity; n++) {
    const demands: TypeDemand[] = Array.from({ length: n }, () => t as TypeDemand);
    out.push(
      new NaryOperatorCall(operator, demands, t as TypeDemand, false, wrapper ?? undefined, Async_mode.SYNC),
    );
  }
  return out;
}

export function spread_chain(
  operator: string,
  t: TypeVariable,
  max_arity: number = MAX_NARY,
): Call_convention[] {
  const out: Call_convention[] = [];
  for (let n = 1; n <= max_arity; n++) {
    const demands: TypeDemand[] = Array.from({ length: n }, () => t as TypeDemand);
    out.push(
      new ChainedComparisonCall(operator, demands, t as TypeDemand, Async_mode.SYNC),
    );
  }
  return out;
}

// Type params
const T = new TypeVariable("T");
const K = new TypeVariable("K");
const V = new TypeVariable("V");

// N-ary logical/arithmetic ops expanded into fixed arities 1..MAX_NARY
N_ARIES["concat"] = spread_nary("+", T, MAX_NARY, null, "concat");
N_ARIES["any"] = spread_nary("||", T);
N_ARIES["all"] = spread_nary("&&", T);
N_ARIES["add"] = spread_nary("+", T);
N_ARIES["sub"] = spread_nary("-", T);
N_ARIES["mul"] = spread_nary("*", T);
N_ARIES["mod"] = spread_nary("%", T);
N_ARIES["div"] = spread_nary("/", T);

// none(x1, ..., xn) = ! (x1 || ... || xn)
N_ARIES["none"] = spread_nary("||", T, MAX_NARY, "!");

// Chained comparisons expanded into fixed arities 1..MAX_NARY
N_ARIES["asc"] = spread_chain("<", T);
N_ARIES["nondesc"] = spread_chain("<=", T);
N_ARIES["desc"] = spread_chain(">", T);
N_ARIES["nonasc"] = spread_chain(">=", T);
N_ARIES["eq"] = spread_chain("===", T);

for (const [kname, v] of Object.entries(N_ARIES)) {
  if (!BUILTIN_CALLS[kname]) {
    BUILTIN_CALLS[kname] = [];
  }
  BUILTIN_CALLS[kname].push(...v);
}

// "#": list/dict indexing + assignment
BUILTIN_CALLS["#"] = [
  // list get
  new IndexAccessCall(
    [new ComplexType("list", [T]), INT] as TypeDemand[],
    T as TypeDemand,
    Async_mode.SYNC,
  ),
  // list set
  new IndexAccessCall(
    [new ComplexType("list", [T]), INT, T] as TypeDemand[],
    T as TypeDemand,
    Async_mode.SYNC,
  ),
  // dict get
  new IndexAccessCall(
    [new ComplexType("dict", [K, V]), K] as TypeDemand[],
    V as TypeDemand,
    Async_mode.SYNC,
  ),
  // dict set
  new IndexAccessCall(
    [new ComplexType("dict", [K, V]), K, V] as TypeDemand[],
    V as TypeDemand,
    Async_mode.SYNC,
  ),
];

// "~": callable invoke
const RV = new TypeVariable("RV");
for (let size = 0; size <= MAX_NARY; size++) {
  const args: Type[] = Array.from(
    { length: size },
    (_v, n) => new TypeVariable(`ARG${n}`),
  );
  // TODO i really hate to spam the types
  const n = size == 0 ? "" : size + "";
  const name = `callable${n}`;
  const callable = TYPE_REGISTRY.compute_type(name, () => new ComplexType(name, [...args, RV]));
  register("~", [
    new CallableInvokeCall(
      [callable, ...args] as TypeDemand[],
      RV as TypeDemand,
      Async_mode.MAYBE, // TODO
    ),
  ]);
}

// tuple element accessors: "0", "1", ...
for (let size = 2; size <= MAX_NARY; size++) {
  const tvs: Type[] = Array.from(
    { length: size },
    (_v, n) => new TypeVariable(`V${n}`),
  );

  for (let n = 0; n < size; n++) {
    const tv = tvs[n] as TypeDemand;
    const fn = String(n);
    if (!BUILTIN_CALLS[fn]) {
      BUILTIN_CALLS[fn] = [];
    }

    // getter
    BUILTIN_CALLS[fn].push(
      new FieldCall(
        fn,
        [new ComplexType("tuple", tvs)] as TypeDemand[],
        tv,
        Async_mode.SYNC,
      ),
    );

    // setter
    BUILTIN_CALLS[fn].push(
      new FieldCall(
        fn,
        [new ComplexType("tuple", tvs), tv] as TypeDemand[],
        tv,
        Async_mode.SYNC,
      ),
    );
  }
}

// print (0..MAX_NARY arguments of WILDCARD)
for (let size = 0; size <= MAX_NARY; size++) {
  const demands: TypeDemand[] = Array.from(
    { length: size },
    () => WILDCARD as TypeDemand,
  );
  register("print", [
    new DirectCall("log", "console", demands, VOID as TypeDemand),
  ]);
}

// 67lang shims
// well TODO this should be a varargs
BUILTIN_CALLS["zip"] = [
  new DirectCall(
    "zip",
    "_67lang",
    [
      new ComplexType("list", [new TypeVariable("A")]),
      new ComplexType("list", [new TypeVariable("B")]),
    ] as TypeDemand[],
    new ComplexType("list", [
      new ComplexType("tuple", [
        new TypeVariable("A"),
        new TypeVariable("B"),
      ]),
    ]) as TypeDemand,
    Async_mode.SYNC,
  ),
];


BUILTIN_CALLS["set"] = new Array(MAX_NARY).fill(0).map((_, i) => 
  new DirectCall("new_set", "_67lang", new Array(i).fill(
    new TypeVariable("T"),
  ), SET, Async_mode.SYNC),
);

BUILTIN_CALLS["has_keys"] = new Array(MAX_NARY).fill(0).flatMap((_, i) => 
  ([["list", TYPE_REGISTRY.get_type("int")], ["dict", new TypeVariable("K")]] as [string, Type][]).map(([container_type, item_type]) => 
    new DirectCall("has_keys", "_67lang", [
      not_null(TYPE_REGISTRY.get_type(container_type)),
      ...new Array(i).fill(item_type),
    ], BOOL, Async_mode.SYNC),
  )
);

BUILTIN_CALLS["has_values"] = new Array(MAX_NARY).fill(0).flatMap((_, i) => 
  ([["list", new TypeVariable("V")], ["dict", new TypeVariable("V")]] as [string, Type][]).map(([container_type, item_type]) => 
    new DirectCall("has_values", "_67lang", [
      not_null(TYPE_REGISTRY.get_type(container_type)),
      ...new Array(i).fill(item_type),
    ], BOOL, Async_mode.SYNC),
  )
);

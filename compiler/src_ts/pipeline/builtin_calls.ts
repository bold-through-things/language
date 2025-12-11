// pipeline/builtin_calls.ts

import {
  Call_convention,
  FieldCall,
  DirectCall,
  NaryOperatorCall,
  ChainedComparisonCall,
  IndexAccessCall,
  CallableInvokeCall,
  Async_mode,
} from "./call_conventions.ts";

import {
  Type,
  TypeVariable,
  ComplexType,
  Type_engine,
  Function_67lang,
} from "../compiler_types/proper_types.ts";
import { Macro_context } from "../core/macro_registry.ts";
import { ErrorType } from "../utils/error_types.ts";
import { Error_caused_by } from "../utils/utils.ts";

export function load_builtins(ctx: Macro_context, engine: Type_engine): void {
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

  const max_nary = 6;

  function spread_nary(
    name: string,
    operator: string,
    t: TypeVariable,
    max_arity: number = max_nary,
    wrapper: string | null = null,
  ): Call_convention[] {
    const out: Call_convention[] = [];
    for (let n = 1; n <= max_arity; n++) {
      const demands: Type[] = repeat(n, t);
      engine.add_function(name, (fn: Function_67lang) => {
        fn.demands = demands;
        fn.returns = t;
        fn.convention = new NaryOperatorCall({ operator, wrapper: wrapper ?? undefined, async_mode: Async_mode.SYNC });
      })
    }
    return out;
  }

  function spread_chain(
    name: string,
    operator: string,
    t: TypeVariable,
    max_arity: number = max_nary,
  ): Call_convention[] {
    const out: Call_convention[] = [];
    for (let n = 1; n <= max_arity; n++) {
      const demands: Type[] = repeat(n, t);
      engine.add_function(name, (fn: Function_67lang) => {
        fn.demands = demands;
        fn.returns = t;
        fn.convention = new ChainedComparisonCall({ operator, async_mode: Async_mode.SYNC });
      });
    }
    return out;
  }

  function repeat<T>(length: number, value: T): T[] {
    return Array.from({ length }, () => value);
  }

  function repeat_fn<T>(length: number, fn: (i: number) => T): T[] {
    return Array.from({ length }, (_v, i) => fn(i));
  }

  // Type params
  const T = new TypeVariable({ name: "T" });
  const K = new TypeVariable({ name: "K" });
  const V = new TypeVariable({ name: "V" });

  // N-ary logical/arithmetic ops expanded into fixed arities 1..MAX_NARY
  spread_nary("concat", "+", T, max_nary, null);
  spread_nary("any", "||", T);
  spread_nary("all", "&&", T);
  spread_nary("add", "+", T);
  spread_nary("sub", "-", T);
  spread_nary("mul", "*", T);
  spread_nary("mod", "%", T);
  spread_nary("div", "/", T);

  // none(x1, ..., xn) = ! (x1 || ... || xn)
  spread_nary("none", "||", T, max_nary, "!");

  // Chained comparisons expanded into fixed arities 1..MAX_NARY
  spread_chain("asc", "<", T);
  spread_chain("nondesc", "<=", T);
  spread_chain("desc", ">", T);
  spread_chain("nonasc", ">=", T);
  spread_chain("eq", "===", T);
  spread_chain("neq", "!==", T);

  // "#": list/dict indexing + assignment
  const list_T = get_complex_type("list")
    .configure({
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: "Array",
      type_params: [T],
    });
  const dict_KV = get_complex_type("dict")
    .configure({
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: "Record",
      type_params: [K, V],
    });
  const set_T = get_complex_type("set").configure({
    ctx,
    caused_by: Error_caused_by.INTERNAL,
    typescript_name: "Set",
    type_params: [T],
  });
  const int = engine.get_type("int");
  engine.add_function("#", (fn: Function_67lang) => {
    // list get
    fn.demands = [list_T, int];
    fn.returns = T;
    fn.convention = new IndexAccessCall({
      async_mode: Async_mode.SYNC,
    });
  });
  engine.add_function("#", (fn: Function_67lang) => {
    // list set
    fn.demands = [list_T, int, T];
    fn.returns = T;
    fn.convention = new IndexAccessCall({
      async_mode: Async_mode.SYNC,
    });
  });
  engine.add_function("#", (fn: Function_67lang) => {
    // dict get
    fn.demands = [dict_KV, K];
    fn.returns = V;
    fn.convention = new IndexAccessCall({
      async_mode: Async_mode.SYNC,
    });
  });
  engine.add_function("#", (fn: Function_67lang) => {
    // dict set
    fn.demands = [dict_KV, K, V];
    fn.returns = V;
    fn.convention = new IndexAccessCall({
      async_mode: Async_mode.SYNC,
    });
  });
  
  // "~": callable invoke
  const RV = new TypeVariable({ name: "RV" });
  for (let size = 0; size <= max_nary; size++) {
    const args: Type[] = repeat_fn(
      size,
      (n) => new TypeVariable({ name: `ARG${n}` }),
    );
    // TODO i really hate to spam the types
    const n = size == 0 ? "" : size + "";
    const name = `callable${n}`;
    const callable = get_complex_type(name).configure({
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: "Function",
      type_params: [...args, RV],
    });
    engine.add_function("~", (fn: Function_67lang) => {
      fn.demands = [callable, ...args];
      fn.returns = RV;
      fn.convention = new CallableInvokeCall({
        async_mode: Async_mode.ASYNC, // TODO
      });
    });
  }

  // tuple element accessors: "0", "1", ...
  for (let size = 2; size <= max_nary; size++) {
    const tvs: Type[] = repeat_fn(
      size,
      (n) => new TypeVariable({ name: `V${n}` }),
    );

    const tuple = get_complex_type(`tuple${size}`).configure({
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: "Array",
      type_params: tvs,
    });

    tvs.forEach((tv, n) => {
      const fn = String(n);
      
      engine.add_function(fn, (f: Function_67lang) => {
        // getter
        f.demands = [tuple];
        f.returns = tv;
        f.convention = new FieldCall({
          field: fn,
          async_mode: Async_mode.SYNC,
        });
      });

      engine.add_function(fn, (f: Function_67lang) => {
        // setter
        f.demands = [
          tuple,
          tv,
        ];
        f.returns = tv;
        f.convention = new FieldCall({
          field: fn,
          async_mode: Async_mode.SYNC,
        });
      });
    });
  }

  const unknown = engine.get_type("67lang:unknown");
  const never = engine.get_type("67lang:never");

  // print (0..MAX_NARY arguments of WILDCARD)
  for (let size = 0; size <= max_nary; size++) {
    const demands: Type[] = repeat(size, unknown);
    engine.add_function("print", (fn: Function_67lang) => {
      fn.demands = demands;
      fn.returns = never; // um TODO
      fn.convention = new DirectCall({fn: "log", receiver: "console", async_mode: Async_mode.SYNC });
    });
  }

  // 67lang shims
  // well TODO this should be a varargs
  engine.add_function("zip", (fn: Function_67lang) => {
    fn.convention = new DirectCall({ fn: "zip", receiver: "_67lang", async_mode: Async_mode.SYNC });
    fn.demands = [
      list_T.instantiate_with({ ctx, caused_by: Error_caused_by.INTERNAL, type_params: [new TypeVariable({ name: "A" })] }),
      list_T.instantiate_with({ ctx, caused_by: Error_caused_by.INTERNAL, type_params: [new TypeVariable({ name: "B" })] }),
    ]
    fn.returns =
      list_T.instantiate_with({ 
        ctx,
        caused_by: Error_caused_by.INTERNAL,
        type_params: [
          get_complex_type("tuple2").instantiate_with({
            ctx,
            caused_by: Error_caused_by.INTERNAL,
            type_params: [
              new TypeVariable({ name: "A" }),
              new TypeVariable({ name: "B" }),
            ],
          })
        ]
      });
  });

  for (let size = 0; size < max_nary; size++) {
    engine.add_function("set", (fn: Function_67lang) => {
      fn.convention = new DirectCall({ fn: "new_set", receiver: "_67lang", async_mode: Async_mode.SYNC });
      fn.demands = repeat(size, T);
      fn.returns = set_T;
    });
  }

  engine.add_function("has_keys", (fn: Function_67lang) => {
    fn.convention = new DirectCall({ fn: "has_keys", receiver: "_67lang", async_mode: Async_mode.SYNC });
    fn.demands = [
      dict_KV,
      K,
    ];
    fn.returns = engine.get_type("bool");
  });

  engine.add_function("has_values", (fn: Function_67lang) => {
    fn.convention = new DirectCall({ fn: "has_values", receiver: "_67lang", async_mode: Async_mode.SYNC });
    fn.demands = [
      dict_KV,
      V,
    ];
    fn.returns = engine.get_type("bool");
  });


  engine.add_function("has_values", (fn: Function_67lang) => {
    fn.convention = new DirectCall({ fn: "has_values", receiver: "_67lang", async_mode: Async_mode.SYNC });
    fn.demands = [
      list_T,
      T,
    ];
    fn.returns = engine.get_type("bool");
  });
}

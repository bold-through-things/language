// pipeline/load_builtins_json.ts

import { INT, FLOAT, STRING, BOOL, VOID, LIST, DICT, Type, PrimitiveType,
         ComplexType, TypeVariable, TYPE_REGISTRY } from "../compiler_types/proper_types.ts";

import { Call_convention,
         DirectCall,
         PrototypeCall,
         NewCall,
         FieldCall,
         IndexAccessCall } from "./call_conventions.ts";

import { BUILTIN_CALLS } from "./builtin_calls.ts";


// In Deno we read the asset at runtime; Crystal did compile-time include.
import * as path from "node:path";
import * as fs from "node:fs";

const BUILTINS_PATH = path.resolve(
  path.dirname(import.meta.filename ?? ""),
  "../assets/typescript_builtins.json"
);

// Load file synchronously (Crystal used compile-time embed)
export const BUILTINS_RAW = fs.readFileSync(BUILTINS_PATH, "utf8");

type JSONValue = any; // sufficient for this case
type TypeDemand = Type;


// -------------------------------------------------------------
// Crystal: private def ref_to_type(id : String) : Type
// -------------------------------------------------------------
function ref_to_type(id: string): Type {
  switch (id) {
    case "INT": return INT;
    case "FLOAT": return FLOAT;
    case "STRING": return STRING;
    case "BOOL": return BOOL;
    case "VOID": return VOID;
    case "LIST_TYPE":
      return TYPE_REGISTRY.get_type("list") as ComplexType;
    case "DICT_TYPE":
      return TYPE_REGISTRY.get_type("dict") as ComplexType;
    default:
      return TYPE_REGISTRY.get_type(id) || new ComplexType(id);
  }
}


// -------------------------------------------------------------
// Crystal: private def decode_type(node : JSON::Any) : TypeDemand
// -------------------------------------------------------------
function decode_type(node: JSONValue): TypeDemand {
  const h = node;

  switch (h["k"]) {
    case "wild":
      throw new Error("not supported");

    case "ref":
      return ref_to_type(h["id"]);

    case "prim": {
      const name = h["n"];
      switch (name) {
        case "int": return INT;
        case "float": return FLOAT;
        case "str": return STRING;
        case "bool": return BOOL;
        case "void": return VOID;
        default:
          return TYPE_REGISTRY.compute_type(name, () => new PrimitiveType(name));
      }
    }

    case "cx": {
      const name = h["n"];
      const ps_any: JSONValue[] = (h["p"] ?? []);
      const params: Type[] = ps_any.map(decode_type);

      if (params.length === 0) {
        return TYPE_REGISTRY.compute_type(name, () => new ComplexType(name));
      } else {
        return new ComplexType(name, params);
      }
    }

    case "name": {
      const name = h["n"];
      return TYPE_REGISTRY.compute_type(name, () => new ComplexType(name));
    }

    case "tv": {
      const name = h["n"];
      return new TypeVariable(name);
    }

    default:
      throw new Error(`Unknown type kind: ${h["k"]}`);
  }
}


// -------------------------------------------------------------
// Crystal: private def decode_demands(node : JSON::Any?) : Array(TypeDemand)?
// -------------------------------------------------------------
function decode_demands(node: JSONValue | undefined | null): TypeDemand[] | null {
  if (!node) {
    return null;
  }
  return node.map((e: any) => decode_type(e));
}


// -------------------------------------------------------------
// Crystal: def load_builtins_from_json(raw : String) : Nil
// -------------------------------------------------------------
export function load_builtins_from_json(raw: string): void {
  const json = JSON.parse(raw);
  const builtins: Record<string, JSONValue> = json["builtins"] ?? {};

  Object.entries(builtins).forEach(([name, arr_any]) => {
    const calls: Call_convention[] = [];

    arr_any.forEach((call_any: JSONValue) => {
      const h = call_any;
      const kind = h["kind"];
      const demands = decode_demands(h["demands"]);
      const returns = h["returns"] ? decode_type(h["returns"]) : undefined;

      switch (kind) {
        case "DirectCall": {
          const fn = h["fn"];
          const rec = h["receiver"] ?? null;
          calls.push(new DirectCall(fn, rec, demands ?? null, returns ?? null));
          break;
        }

        case "PrototypeCall": {
          const ctor = h["constructor"];
          const fn = h["fn"];
          if (!demands || !returns) {
            throw new Error("PrototypeCall missing demands/returns");
          }
          calls.push(new PrototypeCall(ctor, fn, demands, returns));
          break;
        }

        case "NewCall": {
          const ctor = h["constructor"];
          calls.push(new NewCall(ctor, demands ?? null, returns ?? null));
          break;
        }

        case "FieldCall": {
          const fld = h["field"];
          calls.push(new FieldCall(fld, demands ?? null, returns ?? null));
          break;
        }

        case "IndexAccessCall": {
          calls.push(new IndexAccessCall(demands ?? null, returns ?? null));
          break;
        }

        default:
          throw new Error(`Unknown call kind ${kind}`);
      }
    });

    if (!(name in BUILTIN_CALLS)) {
      BUILTIN_CALLS[name] = [];
    }
    BUILTIN_CALLS[name].push(...calls);
  });
}


// Load immediately (Crystal evaluated at file load)
// load_builtins_from_json(BUILTINS_RAW);

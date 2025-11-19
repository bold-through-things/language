// compiler_types/type_hierarchy.ts

import { not_null } from "../utils/utils.ts";
import {
  Type,
  ComplexType,
  TYPE_REGISTRY,
  INT,
  FLOAT,
  STRING,
  BOOL,
  VOID,
  DICT,
  LIST,
  TYPE_HIERARCHY,
  UNION_TYPES,
} from "./proper_types.ts";

// Raw JSON file (Deno)
const HIER_RAW = await Deno.readTextFile(
  new URL("../assets/type_hierarchy.json", import.meta.url),
);

function decode_h_value(x: any): Type {
  const remap: Record<string, Type> = {
    INT: INT,
    FLOAT: FLOAT,
    DICT_TYPE: TYPE_REGISTRY.get_type("dict")!,
    LIST_TYPE: TYPE_REGISTRY.get_type("list")!,
    STRING: STRING,
    BOOL: BOOL,
    VOID: VOID,
  };

  if (typeof x === "string") {
    return remap[x] ?? TYPE_REGISTRY.compute_type(x, () => new ComplexType(x));
  } else {
    const s = String(x);
    return remap[s] ?? TYPE_REGISTRY.compute_type(s, () => new ComplexType(s));
  }
}

function load_type_hierarchy_json(raw: string): void {
  const json = JSON.parse(raw);

  if (json.type_hierarchy) {
    for (const k in json.type_hierarchy) {
      const parentsArr = json.type_hierarchy[k];
      const t = decode_h_value(k);
      const parents = parentsArr.map((e: any) => decode_h_value(e));
      TYPE_HIERARCHY.set(t, parents);
    }
  }

  if (json.unions) {
    for (const k in json.unions) {
      const v = json.unions[k];
      UNION_TYPES.set(k, v.map((e: any) => String(e)));
    }
  }
}

load_type_hierarchy_json(HIER_RAW);


if (!INT.is_assignable_to(FLOAT)) {
  throw new Error("int should be assignable to float");
}

if (!not_null(TYPE_REGISTRY.get_type("Uint8Array")).is_assignable_to(not_null(TYPE_REGISTRY.get_type("AllowSharedBufferSource")))) {
  throw new Error("Uint8Array should be assignable to AllowSharedBufferSource");
}
// compiler_types/type_hierarchy.ts

import { Macro_context } from "../core/macro_registry.ts";
import { JSON_value } from "../core/meta_value.ts";
import { ErrorType } from "../utils/error_types.ts";
import {
  Type_engine,
} from "./proper_types.ts";

// Raw JSON file (Deno)
const HIER_RAW = await Deno.readTextFile(
  new URL("../assets/type_hierarchy.json", import.meta.url), // TODO the fuck! embed it
);

export function load_type_hierarchy_json(ctx: Macro_context, engine: Type_engine): void {
  const json = JSON.parse(HIER_RAW);

  if (json.type_hierarchy) {
    for (const k in json.type_hierarchy) {
      const parentsArr: JSON_value[] = json.type_hierarchy[k];
      const t = engine.get_type(k);
      const parents = parentsArr.map(
        e => (
          ctx.compiler.error_tracker.assert(
            typeof e === "string", 
            {
              node: ctx.node,
              message: `expected string, got ${typeof e}`,
              type: ErrorType.INTERNAL_CODE_QUALITY
            }
          ),
          e
        )
      ).map(e => engine.get_type(e));
      engine.type_hierarchy.set(t, parents);
    }
  }

  if (json.unions) {
    for (const k in json.unions) {
      const v = json.unions[k];
      engine.union_types.set(k, v.map((e: JSON_value) => String(e)));
    }
  }


  // if (!INT.is_assignable_to(FLOAT)) {
  //   throw new Error("int should be assignable to float");
  // }

  // if (!not_null(TYPE_REGISTRY.get_type("Uint8Array")).is_assignable_to(not_null(TYPE_REGISTRY.get_type("AllowSharedBufferSource")))) {
  //   throw new Error("Uint8Array should be assignable to AllowSharedBufferSource");
  // }
}

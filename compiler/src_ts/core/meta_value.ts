// core/meta_value.ts

import {
  Type,
  ComplexType,
  Function_67lang,
} from "../compiler_types/proper_types.ts";
import {
  Call_convention,
  FieldCall,
  PrototypeCall,
  DirectCall,
  NewCall,
  NaryOperatorCall,
  ChainedComparisonCall,
  LocalAccessCall,
  IndexAccessCall,
  CallableInvokeCall,
} from "../pipeline/call_conventions.ts";

export type JSON_value = 
  | null
  | boolean
  | number
  | string
  | Array<JSON_value>
  | { [key: string]: JSON_value };

export function type_to_meta(t: Type | null): JSON_value {
  if (t instanceof ComplexType) {
    return {
      type: "ComplexType",
      name: t.name,
      type_params: t.type_params.map((p) => type_to_meta(p)),
    };
  }

  if (t instanceof Type) {
    return {
      type: t.constructor.name,
      name: t.to_string(),
    };
  }

  // last resort: printable string
  return String(t);
}

export function function_to_meta(
  fn: Function_67lang,
): { [key: string]: JSON_value } {
  return {
    convention: convention_to_meta(fn.convention),
    demands: fn.demands.map((d) => type_to_meta(d)),
    returns: type_to_meta(fn.returns),
  };
}

export function convention_to_meta(
  c: Call_convention | null,
): { [key: string]: JSON_value } {
  if (!c) {
    return { convention: "null" };
  }

  const h: { [key: string]: JSON_value } = {
    convention: c.constructor.name, // TODO bad nesting (as `convention.convention`)
  };

  if (c instanceof FieldCall) {
    h.field = c.field;
  } else if (c instanceof PrototypeCall) {
    h.constructor = c.constructor;
    h.fn = c.fn;
  } else if (c instanceof DirectCall) {
    h.fn = c.fn;
    if (c.receiver) {
      h.receiver = c.receiver;
    }
  } else if (c instanceof NewCall) {
    h.constructor = c.constructor;
  } else if (c instanceof NaryOperatorCall) {
    h.operator = c.operator;
  } else if (c instanceof ChainedComparisonCall) {
    h.operator = c.operator;
  } else if (c instanceof LocalAccessCall) {
    h.fn = c.fn;
  } else if (c instanceof IndexAccessCall || c instanceof CallableInvokeCall) {
    // nothing extra
  }

  return h;
}

// In JS, MetaValue is already JSON-ready, so this is just identity.
// Kept for API parity with the Crystal code.
export function meta_to_json_any(v: JSON_value): unknown {
  return v;
}

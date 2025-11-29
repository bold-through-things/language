// core/meta_value.ts

import {
  Type,
  PrimitiveType,
  ComplexType,
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
  TypeDemand,
} from "../pipeline/call_conventions.ts";

// JSON-shaped meta payloads
export type MetaValue = ReturnType<typeof JSON.parse>;

// ---- helpers for JSON-friendly diagnostic payloads ----

export function type_to_meta(t: Type): MetaValue {
  if (t instanceof PrimitiveType) {
    return {
      name: t.name,
      type_params: [],
      fields: [],
    };
  }

  if (t instanceof ComplexType) {
    return {
      name: t.name,
      type_params: t.type_params.map((p) => type_to_meta(p)),
    };
  }

  // last resort: printable string
  return String(t);
}

export function demand_to_meta(x: TypeDemand): MetaValue {
  if (typeof x === "string") {
    return x;
  }
  return type_to_meta(x);
}

export function convention_to_meta(
  c: Call_convention,
): { [key: string]: MetaValue } {
  const h: { [key: string]: MetaValue } = {
    convention: c.constructor.name,
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

  const anyConv = c as any;

  if ("demands" in anyConv && anyConv.demands) {
    const d = anyConv.demands as TypeDemand[] | null;
    if (d) {
      h.demands = d.map((v) => demand_to_meta(v));
    }
  }

  if ("returns" in anyConv && anyConv.returns !== undefined) {
    const r = anyConv.returns as TypeDemand | null;
    if (r != null) {
      h.returns = demand_to_meta(r);
    }
  }

  return h;
}

// In JS, MetaValue is already JSON-ready, so this is just identity.
// Kept for API parity with the Crystal code.
export function meta_to_json_any(v: MetaValue): unknown {
  return v;
}

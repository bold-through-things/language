// macros/type_macro.ts

import {
  Macro_context,
  Register_macro_providers,
  REGISTER_MACRO_PROVIDERS,
  Macro_provider,
} from "../core/macro_registry.ts";
import { cut, IndentedStringIO } from "../utils/strutil.ts";
import { get_single_arg } from "../utils/common_utils.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { Joiner } from "../utils/strutil.ts";
import {
Async_mode,
  FieldCall,
  NewCall
} from "../pipeline/call_conventions.ts";
import {
  Type,
  TypeVariable,
  Type_check_result,
  Type_reference,
  Function_67lang,
  ComplexType,
} from "../compiler_types/proper_types.ts";
import { ErrorType } from "../utils/error_types.ts";
import { choose_single, Error_caused_by, not_null, try_catch, WIP } from "../utils/utils.ts";
import { Fixed, parseTokens } from "../utils/new_parser.ts";
import { Emission_macro_context } from "../pipeline/steps/emission.ts";
import { Type_checking_context, Type_registration_context } from "../pipeline/steps/typechecking.ts";
import { Preprocessing_context } from "../pipeline/steps/processing.ts";
import { Macro_error_tracker } from "../core/exceptions.ts";

/*
should now support a way to bind existing types

type My_Web_Socket is JS:object
	constructor WebSocket
	has on_message
		alias onmessage
		type callable
			type Event
			type void

that's good enough for now. in future we will want to also have

type My_plain is JS:object
	plain
	has param_name
		alias paramName
		type str
	has param_value
		alias paramValue
		type str

type My_marked is JS:object
	marked EXTERNAL_SYMBOL_NAME
*/


const typeSchema = {
  "named": new Fixed(1),
  "for":   new Fixed(1),
  "is":    new Fixed(1),
  "var":  new Fixed(0),
};

class Type_spec__type_ref {
  constructor(
    public type_name: string,
    public for_param: string | null = null,
  ) {
    // ...
  }
}

class Type_spec__var_def {
  constructor(
    public var_name: string,
    public for_param: string | null = null,
  ) {
    // ...
  }
}

class Type_spec__new_type {
  constructor(
    public type_name: string,
    public mode: string,
  ) {
    // ...
  }
}

type Type_spec = Type_spec__type_ref | Type_spec__var_def | Type_spec__new_type;

export class Type_macro_provider implements Macro_provider {
  [REGISTER_MACRO_PROVIDERS](via: Register_macro_providers): void {
    via(Emission_macro_context, "type", this.emission.bind(this));
    via(Type_registration_context, "type", this.register_type.bind(this));
    via(Type_checking_context, "type", this.typecheck.bind(this));
    via(Preprocessing_context, "type", this.preprocess.bind(this));
  }

  private parse_spec(ctx: Macro_context): Type_spec {
    const content = ctx.node.content.trim();
    const tokens = content.split(/\s+/).filter((x) => x.length > 0).slice(1); // skip `type`

    const parsed = try_catch(() => parseTokens(tokens, typeSchema), (e) => {
      ctx.compiler.error_tracker.fail({
        node: ctx.node, message: `Failed to parse type expression: ${e}`, type: ErrorType.INVALID_MACRO,
      });
    });

    // `type named $name`
    // `type named $name is $mode`
    // `type named $name for $param`
    // `type named $var_name var`

    function required(arg: keyof typeof parsed): string {
      if (parsed[arg] && parsed[arg][0] !== undefined) {
        return parsed[arg][0].value.join("");
      }
      ctx.compiler.error_tracker.fail({
        node: ctx.node,
        message: `missing required argument: ${arg}`,
        type: ErrorType.INVALID_MACRO,
      });
    }

    function optional(arg: keyof typeof parsed): string | null {
      if (parsed[arg] && parsed[arg][0] !== undefined) {
        return parsed[arg][0].value.join("");
      }
      return null;
    }

    function flag(arg: keyof typeof parsed): boolean {  
      return parsed[arg] && parsed[arg].length === 1;
    }

    const type_name = required("named");
    ctx.compiler.error_tracker.assert(
      type_name !== "",
      {
        node: ctx.node,
        message: `in \`${content}\`: no \`type $name\` provided`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    const param_name = optional("for");
    const is_var = flag("var");
    const mode = optional("is");

    ctx.compiler.error_tracker.assert(
      [null, "JS:object", "heap_entry"].includes(mode),
      {
        node: ctx.node,
        message: `in \`${content}\`: \`is\` invalid`,
        type: ErrorType.INVALID_MACRO,
      }
    );
    ctx.compiler.error_tracker.assert(
      [is_var, mode].filter((x) => x !== null && x !== false).length <= 1,
      {
        node: ctx.node,
        message: `in \`${content}\`: clause collision`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    
    if (is_var) {
      return new Type_spec__var_def(type_name, param_name);
    } else if (mode !== null) {
      return new Type_spec__new_type(type_name, mode);
    } else {
      return new Type_spec__type_ref(type_name, param_name);
    }
  }
    
  typecheck(ctx: Type_checking_context): Type_check_result {
    const spec = this.parse_spec(ctx);

    if (spec instanceof Type_spec__var_def) {
      return new Type_reference(new TypeVariable({ name: spec.var_name }), spec.for_param ?? undefined);
    }

    if (spec instanceof Type_spec__new_type) {
      return new Type_reference(ctx.type_engine.get_type(spec.type_name));
    }

    return this.type_reference(ctx, spec);
  }

  preprocess(ctx: Preprocessing_context): void {
    const spec = this.parse_spec(ctx);

    if (
      spec instanceof Type_spec__new_type &&
      ctx.node.parent &&
      ctx.node.parent !== ctx.compiler.root_node
    ) {
      not_null(ctx.compiler.root_node).prepend_child(ctx.node);
    }

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      child_ctx.apply();
    }
  }

  register_type(ctx: Type_registration_context): Type_check_result {
    const spec = this.parse_spec(ctx);

    if (spec instanceof Type_spec__var_def) {
      return new Type_reference(new TypeVariable({ name: spec.var_name }), spec.for_param ?? undefined);
    }

    const type = ctx.type_engine.get_type(spec.type_name);

    if (spec instanceof Type_spec__type_ref) {
      return this.type_reference(ctx, spec);
    }

    const sane = ctx.compiler.get_new_ident(spec.type_name);
    const new_type = type;

    ctx.compiler.error_tracker.assert(
      ["JS:object", "heap_entry"].includes(spec.mode),
      {
        node: ctx.node,
        message: `Unsupported type definition mode: ${spec.mode}`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    const fields: [string, Type][] = [];
    const constructor_demands: Type[] = [];

    for (const child of ctx.node.children) {
      const [macro_name] = cut(child.content, " ");
      if (macro_name === "has") {
        const field_name = get_single_arg(ctx.clone_with({ node: child })); // TODO need sane

        const field_type_node = seek_child_macro(child, "type");
        ctx.compiler.error_tracker.assert(
          !!field_type_node,
          {
            node: child,
            message: `Field '${field_name}' must have a type defined.`,
            type: ErrorType.INVALID_MACRO,
          }
        );

        const field_type_ctx = ctx.clone_with({ node: field_type_node! });
        const field_type_spec = this.parse_spec(field_type_ctx);
        ctx.compiler.error_tracker.assert(
          field_type_spec instanceof Type_spec__type_ref,
          {
            node: field_type_node!,
            message: `Field '${field_name}' has invalid type specification.`,
            type: ErrorType.INVALID_MACRO,
          }
        );
        const field_type = this.type_reference(field_type_ctx, field_type_spec).ref;
        ctx.compiler.error_tracker.assert(
          !!field_type,
          {
            node: field_type_node!,
            message: `Failed to resolve field type '${field_type_spec.type_name}' for field '${field_name}'`,
            type: ErrorType.INVALID_MACRO,
          }
        );

        fields.push([field_name, field_type]);
        constructor_demands.push(field_type);

        ctx.type_engine.add_function(field_name, (getter: Function_67lang) => {
          getter.convention = new FieldCall({field: field_name, async_mode: Async_mode.SYNC});
          getter.demands = [new_type];
          getter.returns = field_type;
        });

        ctx.type_engine.add_function(field_name, (setter: Function_67lang) => {
          setter.convention = new FieldCall({field: field_name, async_mode: Async_mode.SYNC});
          setter.demands = [new_type, field_type];
          setter.returns = field_type;
        });
      }
    }

    // TODO just skip this if we gonna drop it
    let convention = new NewCall({
      constructor: sane,
      async_mode: Async_mode.SYNC,
    });
    ctx.finalizer(() => {
      const impl_out = new IndentedStringIO();
      impl_out.writeline(`class ${sane} {`);
      impl_out.with_indent(() => {
        for (const [fname, ftype] of fields) {
          impl_out.writeline(`${fname}: ${ftype.to_typescript()};`);
        }
        impl_out.writeline(`constructor(`);
        impl_out.with_indent(() => {
          for (const [fname, ftype] of fields) {    
              impl_out.write(`${fname}: ${ftype.to_typescript()},\n`);
          }
        });
        impl_out.write(`) {\n`);
        impl_out.with_indent(() => {
          for (const [fname] of fields) {
            impl_out.write(
              `this.${fname} = ${fname};\n`,
            );
          }
        });
        impl_out.write(`}\n`);
      });
      impl_out.write(`}\n`);
      convention.implementation = impl_out.to_string();
    });

    if (spec.mode === "JS:object") {
      const js_ctor = seek_child_macro(ctx.node, "constructor");
      const plain = seek_child_macro(ctx.node, "plain");
      // const marked = seek_child_macro(ctx.node, "marked");
      choose_single(ctx, [
        [
          js_ctor, () => {
            ctx.compiler.error_tracker.assert(
              !!js_ctor,
              {
                node: ctx.node,
                message: "never",
                type: ErrorType.INTERNAL_CODE_QUALITY,
              }
            );
            const js_ctor_name = get_single_arg(ctx.clone_with({ node: js_ctor }));
            convention = new NewCall({
              async_mode: Async_mode.SYNC,
              constructor: String(js_ctor_name),
            });
            // no need to set implementation here because we're binding the existing one
          }
        ],
        [
          plain, () => {
            convention = new NewCall({
              constructor: `plain_object_${sane}`,
              async_mode: Async_mode.SYNC,
            });
            // this is a weird one since it's kind of binding, kind of not.
            const plain_out = new IndentedStringIO();
            plain_out.write(`function plain_object_${sane}(`);
            const joiner = new Joiner(plain_out, ", ");
            for (const [fname, ftype] of fields) {
              joiner.use(() => {
                plain_out.write(`${fname}: ${ftype.to_typescript()}`);
              });
            }
            plain_out.write(`) {\n`);
            plain_out.with_indent(() => {
              plain_out.write(`const obj = {\n`);
              plain_out.with_indent(() => {
                for (const fname of fields) {
                  // TODO i can't be arsed right now. needs `alias`
                  plain_out.write(
                    `${fname}: ${fname},\n`,
                  );
                }
              });
              plain_out.write(`};\n`);
              plain_out.write(`return obj;\n`);
            });
            plain_out.write(`}\n`);
            convention.implementation = plain_out.to_string();
          }
        ], 
        // TODO i can't be arsed right now. needs `marked`
      ]);
    }

    ctx.type_engine.add_function(spec.type_name, (ctor: Function_67lang) => {
      ctor.convention = convention;
      ctor.demands = constructor_demands;
      ctor.returns = new_type;
    });

    ctx.compiler.error_tracker.assert(
      new_type instanceof ComplexType,
      {
        node: ctx.node,
        message: `type '${spec.type_name}' is not a complex type`,
        type: ErrorType.INVALID_MACRO,
      }
    );

    new_type.configure({
      ctx,
      caused_by: Error_caused_by.INTERNAL,
      typescript_name: sane,
    });

    return new Type_reference(new_type);
  }

  emission(_ctx: Macro_context): void {
    // handled by the step
  }

  private type_reference(ctx: Type_checking_context | Type_registration_context, spec: Type_spec__type_ref): Type_reference {
    const error_tracker: Macro_error_tracker = ctx.compiler.error_tracker;
    
    const base = ctx.type_engine.get_type(spec.type_name);
    if (!(base instanceof ComplexType)) {
      return new Type_reference(base, spec.for_param ?? undefined);
    }

    const auto_param = (() => {
      const type_vars = base.type_params.filter((p) => p instanceof TypeVariable)
      if (type_vars.length === 1 && type_vars[0] instanceof TypeVariable) {
        return type_vars[0].name;
      }
      return null;
    })();
    let unnamed_param_count = 0;

    const subs: Record<string, Type> = {};
    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      const res = child_ctx.apply();
      if (res instanceof Type_reference) {
        let parameter_name = res.parameter_name;
        if (parameter_name === null) {
          parameter_name = auto_param;
          unnamed_param_count++;
          if (unnamed_param_count > 1) {
            ctx.compiler.error_tracker.fail({
              node: child,
              message: `ambiguous type parameter for type '${spec.type_name}'`,
              type: ErrorType.INVALID_MACRO,
            });
          }
        }
        if (parameter_name === null) {
          error_tracker.fail({
            node: child,
            message: `type parameter name required for type '${spec.type_name}'`,
            type: ErrorType.INVALID_MACRO,
          });
        }  
        subs[parameter_name] = res.ref;
      } else if (res === null) {
        continue;
      } else {
        ctx.compiler.error_tracker.fail({
          node: child,
          message: `expected type expression from child \`${child.content}\` ${res}`,
          type: ErrorType.INVALID_MACRO,
        });
      }
    }

    Object.keys(subs).forEach((k) => {
      error_tracker.assert(
        base.type_params.some((p) => p instanceof TypeVariable && p.name === k),
        {
          node: ctx.node,
          message: `type '${spec.type_name}' has no type parameter '${k}'`,
          type: ErrorType.INVALID_MACRO,
        }
      );
    });

    if (base.type_params.length === 0) {
      return new Type_reference(base, spec.for_param ?? undefined);
    }

    const new_type_params = base.type_params.map((p) => {
      if (p instanceof TypeVariable) {
        const p_name = p.name;
        if (subs[p_name] !== undefined) {
          return subs[p_name];
        }
      }
      return p;
    });
    const inst = ctx.type_engine.instantiate_generic({
      name: base.name,
      type_args: new_type_params,
      caused_by: Error_caused_by.USER,
      ctx,
    });
    
    return new Type_reference(inst, spec.for_param ?? undefined);
  }
}

// only needed so we track it as a metadata
export class WIP_type {
  private __WIP: WIP<Type>;
  constructor(
    type: Type,
  ) {
    this.__WIP = new WIP(type);
  }

  get WIP(): WIP<Type> {
    return this.__WIP;
  }
}

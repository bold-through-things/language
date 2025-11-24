// macros/type_macro.ts

import {
  Macro_emission_provider,
  Macro_preprocess_provider,
  Macro_typecheck_provider,
  Macro_type_registration_provider,
  Macro_type_details_provider,
  Macro_functions_provider,
  MacroContext,
  TCResult,
} from "../core/macro_registry.ts";
import { SaneIdentifier } from "../core/node.ts";
import { cut, IndentedStringIO } from "../utils/strutil.ts";
import { get_single_arg } from "../utils/common_utils.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { Joiner } from "../utils/strutil.ts";
import { NEWLINE } from "../pipeline/js_conversion.ts";
import {
  FieldCall,
  NewCall
} from "../pipeline/call_conventions.ts";
import {
  type Type,
  TypeParameter,
  ComplexType,
  type_registry,
  TypeVariable,
} from "../compiler_types/proper_types.ts";
import { ErrorType } from "../utils/error_types.ts";
import { choose_single, try_catch } from "../utils/utils.ts";
import { Fixed, parseTokens, Schema } from "../utils/new_parser.ts";

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
  "type": new Fixed(1),
  "for":   new Fixed(1),
  "is":    new Fixed(1),
  "var":  new Fixed(0),
};

export class Type_macro_provider
  implements
    Macro_emission_provider,
    Macro_preprocess_provider,
    Macro_typecheck_provider,
    Macro_type_registration_provider,
    Macro_type_details_provider,
    Macro_functions_provider
{
  typecheck(ctx: MacroContext): TCResult {
    if (ctx.node.content.includes(" is ")) {
      // definition mode → registers type, returns null
      return this.handle_type_definition(ctx);
    }
    return this.parse_type_expression(ctx);
  }

  preprocess(ctx: MacroContext): void {
    if (
      ctx.node.content.includes(" is ") &&
      ctx.node.parent &&
      ctx.node.parent !== ctx.compiler.root_node
    ) {
      ctx.compiler.root_node!.prepend_child(ctx.node);
    }

    for (const child of ctx.node.children) {
      const child_ctx = ctx.clone_with({ node: child });
      ctx.current_step!.process_node(child_ctx);
    }
  }

  register_type(ctx: MacroContext): void {
    if (!ctx.node.content.includes(" is ")) {
      return;
    }

    const [, rest] = cut(ctx.node.content, " ");
    let [type_name, mode] = cut(rest, " is ");
    type_name = type_name.trim();

    const sane = ctx.compiler.get_new_ident(type_name);

    ctx.compiler.assert_(
      ["JS:object", "heap_entry"].includes(mode),
      ctx.node,
      `Unsupported type definition mode: ${mode}`,
    );

    ctx.compiler.set_metadata(
      ctx.node,
      SaneIdentifier,
      new SaneIdentifier(sane),
    );

    const new_type = new ComplexType(type_name, [], []);
    type_registry().register_type(new_type);
  }

  register_type_details(ctx: MacroContext): void {
    if (!ctx.node.content.includes(" is ")) {
      return;
    }

    const [, rest] = cut(ctx.node.content, " ");
    let [type_name, mode] = cut(rest, " is ");
    type_name = type_name.trim();

    const new_type = type_registry().get_type(type_name);
    if (!new_type) {
      ctx.compiler.compile_error(
        ctx.node,
        `Type ${type_name} was not registered in pass 1`,
        ErrorType.INVALID_MACRO,
      );
      return;
    }

    const field_names: string[] = [];
    const constructor_demands: Type[] = [];

    for (const child of ctx.node.children) {
      const [macro_name] = cut(child.content, " ");
      if (macro_name === "has") {
        const field_name = get_single_arg(ctx.clone_with({ node: child }));

        const field_type_node = seek_child_macro(child, "type");
        ctx.compiler.assert_(
          !!field_type_node,
          child,
          `Field '${field_name}' must have a type defined.`,
        );

        const field_type_name = get_single_arg(
          ctx.clone_with({ node: field_type_node! }),
        );
        const field_type = this.resolve_type_with_children(
          ctx.clone_with({ node: field_type_node! }),
          field_type_name,
        );
        ctx.compiler.assert_(
          !!field_type,
          field_type_node!,
          `Failed to resolve field type '${field_type_name}' for field '${field_name}'`,
        );

        field_names.push(field_name);
        constructor_demands.push(field_type!);

        const getter = new FieldCall(field_name, [new_type], field_type!);
        ctx.compiler.add_dynamic_convention(field_name, getter);

        const setter = new FieldCall(
          field_name,
          [new_type, field_type!],
          field_type!,
        );
        ctx.compiler.add_dynamic_convention(field_name, setter);
      }
    }

    const sane = ctx.compiler.get_metadata(ctx.node, SaneIdentifier).value;

    // TODO just skip this if we gonna drop it
    let ctor = new NewCall(sane, constructor_demands, new_type);
    const impl_out = new IndentedStringIO();
    impl_out.write(`function ${sane}(`);
    const joiner = new Joiner(impl_out, ", ");
    for (const fname of field_names) {
      joiner.use(() => {
        impl_out.write(fname);
      });
    }
    impl_out.write(`) {\n`);
    impl_out.with_indent(() => {
      for (const fname of field_names) {
        impl_out.write(
          `this.${fname} = ${fname};\n`,
        );
      }
    });
    impl_out.write(`}\n`);
    ctor.implementation = impl_out.to_string();

    if (mode === "JS:object") {
      const js_ctor = seek_child_macro(ctx.node, "constructor");
      const plain = seek_child_macro(ctx.node, "plain");
      const marked = seek_child_macro(ctx.node, "marked");
      choose_single(ctx, [
        [
          js_ctor, () => {
            const js_ctor_name = get_single_arg(ctx.clone_with({ node: js_ctor }));
            ctor = new NewCall(
              String(js_ctor_name),
              constructor_demands,
              new_type,
            );
            // no need to set implementation here because we're binding the existing one
          }
        ],
        [
          plain, () => {
            ctor = new NewCall(
              `plain_object_${sane}`,
              constructor_demands,
              new_type,
            );
            // this is a weird one since it's kind of binding, kind of not.
            const plain_out = new IndentedStringIO();
            plain_out.write(`function plain_object_${sane}(`);
            const joiner = new Joiner(plain_out, ", ");
            for (const fname of field_names) {
              joiner.use(() => {
                plain_out.write(fname);
              });
            }
            plain_out.write(`) {\n`);
            plain_out.with_indent(() => {
              plain_out.write(`const obj = {\n`);
              plain_out.with_indent(() => {
                for (const fname of field_names) {
                  // TODO i can't be arsed right now. needs `alias`
                  plain_out.write(
                    `${fname}: ${fname},\n`,
                  );
                }
              });
              plain_out.write(`};\n`);
            });
            plain_out.write(`}\n`);
            ctor.implementation = plain_out.to_string();
          }
        ], 
        // TODO i can't be arsed right now. needs `marked`
      ]);
    }

    ctx.compiler.add_dynamic_convention(type_name, ctor);
  }

  emission(_ctx: MacroContext): void {
    // handled by the step
  }

  register_functions(ctx: MacroContext): TCResult {
    // same hack as Crystal: just invoke typecheck
    return this.typecheck(ctx);
  }

  // ---------------- private helpers ----------------

  private handle_type_definition(ctx: MacroContext): TypeParameter | null {
    this.register_type(ctx);
    return null;
  }

  private parse_type_expression(ctx: MacroContext): TypeParameter | null {
    const content = ctx.node.content.trim();
    const tokens = content.split(/\s+/).filter((x) => x.length > 0);
    // TODO right now you could do stupid shit like `type MyType for param is JS:object is JS:object for other_param`
    const parsed = try_catch(() => parseTokens(tokens, typeSchema), (e) => {
      ctx.compiler.assert_(false, ctx.node, `Failed to parse type expression: ${e}`, ErrorType.INVALID_MACRO);
    });

    const type_name_raw = parsed.type[0].value;
    const type_name = type_name_raw ? String(type_name_raw) : "";

    if (!type_name) {
      ctx.compiler.compile_error(
        ctx.node,
        "Type expression must specify a type name",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const param_name_raw = parsed.for?.[0].value;
    const param_name =
      param_name_raw === undefined || param_name_raw === null
        ? undefined
        : String(param_name_raw);

    if (parsed.var?.length > 0) {
      return new TypeParameter(new TypeVariable(type_name), param_name);
    }

    const resolved = this.resolve_type_with_children(ctx, type_name);
    if (!resolved) {
      return null;
    }

    return new TypeParameter(resolved, param_name);
  }

  private resolve_type_with_children(
    ctx: MacroContext,
    type_name: string,
  ): Type | null {
    const type_children = ctx.node.children.filter((ch) =>
      ch.content.startsWith("type "),
    );

    if (type_children.length === 0) {
      const resolved = type_registry().get_type(type_name);
      if (!resolved) {
        ctx.compiler.compile_error(
          ctx.node,
          `Unknown type: ${type_name}`,
          ErrorType.INVALID_MACRO,
        );
      }
      return resolved ?? null;
    }

    const type_args: Type[] = [];

    for (const tchild of type_children) {
      const child_ctx = ctx.clone_with({ node: tchild });
      const tparam = this.typecheck(child_ctx);
      if (tparam instanceof TypeParameter) {
        type_args.push(tparam.type_expr);
      } else {
        ctx.compiler.compile_error(
          tchild,
          "Expected type expression",
          ErrorType.INVALID_MACRO,
        );
        return null;
      }
    }

    const instantiated = type_registry().instantiate_generic(type_name, type_args);
    if (!instantiated) {
      ctx.compiler.compile_error(
        ctx.node,
        `Cannot instantiate generic type ${type_name} with ${type_args.length} arguments`,
        ErrorType.INVALID_MACRO,
      );
    }

    return instantiated ?? null;
  }
}

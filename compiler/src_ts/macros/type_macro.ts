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
import { Node, SaneIdentifier, TypeFieldNames } from "../core/node.ts";
import { cut } from "../utils/strutil.ts";
import { get_single_arg } from "../utils/common_utils.ts";
import { CommandParser, create_type_commands } from "../utils/command_parser.ts";
import { seek_child_macro } from "../pipeline/steps/utils.ts";
import { Joiner } from "../utils/strutil.ts";
import { NEWLINE } from "../pipeline/js_conversion.ts";
import {
  FieldCall,
  NewCall,
  type Call_convention,
  type TypeDemand,
} from "../pipeline/call_conventions.ts";
import {
  type Type,
  TypeParameter,
  ComplexType,
  type_registry,
} from "../compiler_types/proper_types.ts";
import { ErrorType } from "../utils/error_types.ts";

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
    let [type_name, _is_clause_full] = cut(rest, " is ");
    type_name = type_name.trim();

    ctx.compiler.set_metadata(
      ctx.node,
      SaneIdentifier,
      new SaneIdentifier(type_name),
    );

    const new_type = new ComplexType(type_name, [], []);
    type_registry().register_type(new_type);
  }

  register_type_details(ctx: MacroContext): void {
    if (!ctx.node.content.includes(" is ")) {
      return;
    }

    const [, rest] = cut(ctx.node.content, " ");
    let [type_name] = cut(rest, " is ");
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

    const ctor = new NewCall(type_name, constructor_demands, new_type);
    ctx.compiler.add_dynamic_convention(type_name, ctor);

    ctx.compiler.set_metadata(
      ctx.node,
      TypeFieldNames,
      new TypeFieldNames(field_names),
    );
  }

  emission(ctx: MacroContext): void {
    if (!ctx.node.content.includes(" is ")) {
      return;
    }

    const type_name = ctx.compiler.get_metadata(ctx.node, SaneIdentifier).value;
    const field_meta = ctx.compiler.get_metadata(
      ctx.node,
      TypeFieldNames,
    ) as TypeFieldNames;
    const fields = field_meta.names;

    ctx.statement_out.write(`function ${type_name}(`);
    const joiner = new Joiner(ctx.statement_out, ", ");
    for (const fname of fields) {
      joiner.use(() => {
        ctx.statement_out.write(fname);
      });
    }
    ctx.statement_out.write(`) {${NEWLINE}`);
    ctx.statement_out.with_indent(() => {
      for (const fname of fields) {
        ctx.statement_out.write(
          `this.${fname} = ${fname};${NEWLINE}`,
        );
      }
    });
    ctx.statement_out.write(`}${NEWLINE}`);
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
    const content = ctx.node.content.replace(/^type /, "").trim();
    const parser = new CommandParser(content, create_type_commands());
    const parsed = parser.parse();

    if (!parsed) {
      ctx.compiler.compile_error(
        ctx.node,
        `Invalid type expression syntax: ${content}`,
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const type_name_raw = parsed["main"];
    const type_name = type_name_raw ? String(type_name_raw) : "";

    if (!type_name) {
      ctx.compiler.compile_error(
        ctx.node,
        "Type expression must specify a type name",
        ErrorType.INVALID_MACRO,
      );
      return null;
    }

    const resolved = this.resolve_type_with_children(ctx, type_name);
    if (!resolved) {
      return null;
    }

    const param_name_raw = parsed["parameter_name"];
    const param_name =
      param_name_raw === undefined || param_name_raw === null
        ? undefined
        : String(param_name_raw);

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

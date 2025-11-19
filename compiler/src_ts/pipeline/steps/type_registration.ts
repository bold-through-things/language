// pipeline/steps/type_registration.ts

import { MacroProcessingStep } from "./base.ts";
import { MacroContext, MacroRegistry, TCResult } from "../../core/macro_registry.ts";
import { Macro } from "../../core/node.ts";

export class TypeRegistrationStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry) {
    super();
    this.macros = macros;
  }

  process_node(ctx: MacroContext): null {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const all = this.macros.all();

    if (Object.prototype.hasOwnProperty.call(all, macroName)) {
      all[macroName].call(ctx, ctx);
    }

    ctx.node.children.forEach((child) => {
      const childCtx = ctx.clone_with({ node: child });
      this.process_node(childCtx);
    });

    return null;
  }
}

export class TypeDetailRegistrationStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry) {
    super();
    this.macros = macros;
  }

  process_node(ctx: MacroContext): null {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const all = this.macros.all();

    if (Object.prototype.hasOwnProperty.call(all, macroName)) {
      all[macroName].call(ctx, ctx);
    }

    ctx.node.children.forEach((child) => {
      const childCtx = ctx.clone_with({ node: child });
      this.process_node(childCtx);
    });

    return null;
  }
}

export class FunctionRegistrationStep extends MacroProcessingStep {
  constructor(public override macros: MacroRegistry) {
    super();
    this.macros = macros;
  }

  process_node(ctx: MacroContext): TCResult {
    const macroName = String(ctx.compiler.get_metadata(ctx.node, Macro));
    const all = this.macros.all();

    if (Object.prototype.hasOwnProperty.call(all, macroName)) {
      return all[macroName].call(ctx, ctx);
    }

    ctx.node.children.forEach((child) => {
      const childCtx = ctx.clone_with({ node: child });
      this.process_node(childCtx);
    });

    return null;
  }
}

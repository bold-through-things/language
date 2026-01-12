// pipeline/steps/preprocessing.ts

import { Macro_context, Macro_registry } from "../../core/macro_registry.ts";
import { default_logger } from "../../utils/logger.ts";
import { ErrorType } from "../../utils/error_types.ts";
import { Macro, Node } from "../../core/node.ts";
import { Macrocosm } from "../../core/macrocosm.ts";

export class Preprocessing_context implements Macro_context {
  node: Node;
  compiler: Macrocosm;
  registry: Macro_registry<Preprocessing_context>;

  constructor(opts: {
    node: Node;
    compiler: Macrocosm,
    registry: Macro_registry<Preprocessing_context>,
  }) {
    this.node = opts.node;
    this.compiler = opts.compiler;
    this.registry = opts.registry;
  }

  clone_with(opts: { node: Node }): Preprocessing_context {
    return new Preprocessing_context({
      node: opts.node ?? this.node,
      compiler: this.compiler,
      registry: this.registry,
    });
  }

  apply() {
    default_logger.indent(this, "macro", `preprocessing node: ${this.node.content}`, () => {
      // Validate indentation: ensure content doesn't start with whitespace
      if (this.node.content.length > 0 && /^\s/.test(this.node.content[0] ?? "")) {
        this.compiler.error_tracker.fail({
          node: this.node,
          message: "oh spaces? yea? how many, two, or four, or maybe six?!",
          type: ErrorType.INVALID_INDENTATION,
        });
      }

      const macroName = String(this.compiler.get_metadata(this.node, Macro));
      const all = this.registry.all();

      const fn = all[macroName];

      if (fn) {
        default_logger.log(this, "macro", `applying preprocessor for macro: ${macroName}`);
        this.compiler.error_tracker.safely(this, () => {
          fn(this);
        });
      } else {
        default_logger.log(this, "macro", `no preprocessor for macro: ${macroName}`);
        default_logger.indent(this, "macro", `preprocessing children of ${this.node.content}`, () => {
          this.node.children.forEach((child, i) => {
            default_logger.indent(this, "macro", `child ${i}: ${child.content}`, () => {
              this.compiler.error_tracker.safely(this, () => {
                const childCtx = this.clone_with({ node: child });
                childCtx.apply();
              });
            });
          });
        });
      }
    });
  }
}

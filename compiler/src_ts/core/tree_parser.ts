// core/tree_parser.ts

import { extractIndent } from "../utils/strutil.ts";
import { Node, Position } from "./node.ts";
import { default_logger, LOGGER_NO_CONTEXT } from "../utils/logger.ts";

class Trim_stack<T> {
  private data: T[] = [];

  set(index: number, value: T): void {
    if (index === this.data.length) {
      this.data.push(value);
    } else if (index >= 0 && index < this.data.length) {
      this.data[index] = value;
    } else {
      throw new RangeError(
        "Index out of bounds (can only set existing index or append)",
      );
    }
  }

  get(index: number): T | undefined {
    return this.data[index];
  }

  trim(max_index: number): void {
    if (max_index < 0) {
      this.data = [];
    } else {
      const new_size = Math.min(max_index + 1, this.data.length);
      this.data = this.data.slice(0, new_size);
    }
  }

  get size(): number {
    return this.data.length;
  }

  toString(): string {
    return `${this.constructor.name}(${JSON.stringify(this.data)})`;
  }
}

class Parsing_node {
  readonly content: string;
  readonly position: Position;
  readonly children: Parsing_node[];

  constructor(
    content: string,
    position: Position,
    children: Parsing_node[] = [],
  ) {
    this.content = content;
    this.position = position;
    this.children = children;
  }

  to_Node(): Node {
    return new Node(
      this.content,
      this.position,
      this.children.map((c) => c.to_Node()),
    );
  }
}

export class Tree_parser {
  private top_level: string;
  constructor(opts: {
    top_level: string
  }) {
    this.top_level = opts.top_level;
  }
  parse_tree(code: string, _compiler: unknown = null): Node {
    if (code.endsWith("\n")) {
      code = code.slice(0, -1);
    }

    // wrap with newlines like Crystal
    code = `\n${code}\n`;

    const scope = new Trim_stack<Parsing_node>();
    const root = new Parsing_node(this.top_level, new Position(0));
    scope.set(0, root);
    let line_num = 0;

    const lines = code.split("\n");

    for (const raw of lines) {
      line_num += 1;

      let [line, extracted_indent] = extractIndent(raw, scope.size - 1);
      let indent = extracted_indent + 1;

      if (line.trim().length === 0) {
        indent = scope.size;
      }

      line = line.trimEnd();

      default_logger.log(
        LOGGER_NO_CONTEXT, // but TODO contextualize by line
        "parse",
        `line ${line_num}: indent=${indent}, content='${line}'`,
      );

      const parent = scope.get(indent - 1);
      if (parent === undefined) {
        throw new Error(
          `Invalid indentation at line ${line_num}: ${raw}`,
        );
      }
      const node = new Parsing_node(line, new Position(line_num));
      parent.children.push(node);
      scope.set(indent, node);
      scope.trim(indent);
    }

    return root.to_Node();
  }
}

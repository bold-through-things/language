// core/tree_parser.ts

import { extractIndent } from "../utils/strutil.ts";
import { Node, Position } from "./node.ts";
import { default_logger } from "../utils/logger.ts";

class TrimStack<T> {
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

  trim(maxIndex: number): void {
    if (maxIndex < 0) {
      this.data = [];
    } else {
      const newSize = Math.min(maxIndex + 1, this.data.length);
      this.data = this.data.slice(0, newSize);
    }
  }

  get size(): number {
    return this.data.length;
  }

  toString(): string {
    return `${this.constructor.name}(${JSON.stringify(this.data)})`;
  }
}

class ParsingNode {
  readonly content: string;
  readonly position: Position;
  readonly children: ParsingNode[];

  constructor(
    content: string,
    position: Position,
    children: ParsingNode[] = [],
  ) {
    this.content = content;
    this.position = position;
    this.children = children;
  }

  toNode(): Node {
    return new Node(
      this.content,
      this.position,
      this.children.map((c) => c.toNode()),
    );
  }
}

export class TreeParser {
  parseTree(code: string, _compiler: unknown = null): Node {
    // wrap with newlines like Crystal
    code = `\n${code}\n`;

    const scope = new TrimStack<ParsingNode>();
    const root = new ParsingNode("67lang:file", new Position(0));
    scope.set(0, root);
    let lineNum = 0;

    const lines = code.split("\n");
    default_logger.log("parse", `processing ${lines.length} lines`);

    for (const raw of lines) {
      lineNum += 1;

      const [line_0, extractedIndent] = extractIndent(raw, scope.size - 1);
      const indent = extractedIndent + 1;

      if (line_0.trim().length === 0) {
        continue;
      }

      const line = line_0.trimEnd();

      default_logger.log(
        "parse",
        `line ${lineNum}: indent=${indent}, content='${line}'`,
      );

      const parent = scope.get(indent - 1);
      if (parent === undefined) {
        throw new Error(
          `Invalid indentation at line ${lineNum}: ${raw}`,
        );
      }
      const node = new ParsingNode(line, new Position(lineNum));
      parent.children.push(node);
      scope.set(indent, node);
      scope.trim(indent);
    }

    return root.toNode();
  }
}

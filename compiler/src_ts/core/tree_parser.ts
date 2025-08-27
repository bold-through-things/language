/**
 * Tree parser - TypeScript equivalent of tree_parser.py
 */

import { Node, Position } from "./node.ts";
import { extractIndent } from "../utils/strutil.ts";
import { defaultLogger } from "../utils/logger.ts";

class TrimStack<T> {
	private data: T[] = [];

	set(index: number, value: T): void {
		if (index === this.data.length) {
			this.data.push(value);
		} else if (index >= 0 && index < this.data.length) {
			this.data[index] = value;
		} else {
			throw new Error("Index out of bounds (can only set existing index or append)");
		}
	}

	get(index: number): T {
		return this.data[index]!;
	}

	trim(maxIndex: number): void {
		if (maxIndex < 0) {
			this.data.length = 0;
		} else {
			this.data.length = maxIndex + 1;
		}
	}

	get length(): number {
		return this.data.length;
	}

	toString(): string {
		return `${this.constructor.name}(${JSON.stringify(this.data)})`;
	}
}

class ParsingNode {
	public children: ParsingNode[] = [];

	constructor(
		public content: string,
		public position: Position,
	) {}

	toNode(): Node {
		return new Node(
			this.content,
			this.position,
			this.children.map(child => child.toNode())
		);
	}
}

export class TreeParser {
	parseTree(code: string, _compiler?: unknown): Node {
		// prepend and append newlines for simpler and cleaner handling
		// TODO - although this will fuck over line numbers, so might actually be a bad idea?
		code = `\n${code}\n`;

		const scope = new TrimStack<ParsingNode>();
		const root = new ParsingNode("67lang:file", new Position(0));
		scope.set(0, root);
		let lineNum = 0;

		const lines = code.split("\n");
		defaultLogger.parse(`processing ${lines.length} lines`);

		for (const line of lines) {
			lineNum += 1; // at the start - assumes above \n{code}\n

			const [lineContent, indent] = extractIndent(line, scope.length - 1);

			// simplifies code. all the top-level lines are indent-1, belonging to a fake top-level Node
			// which is at indent-0
			const adjustedIndent = indent + 1;

			if (lineContent.trim().length === 0) {
				// skip empty/indentation-only lines
				continue;
			}

			defaultLogger.parse(`line ${lineNum}: indent=${adjustedIndent}, content='${lineContent}'`);
			const node = new ParsingNode(lineContent, new Position(lineNum));
			scope.get(adjustedIndent - 1).children.push(node);
			scope.set(adjustedIndent, node);
			scope.trim(adjustedIndent);
		}

		const result = root.toNode();
		return result;
	}
}
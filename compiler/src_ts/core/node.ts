/**
 * Core AST node and related data structures - TypeScript equivalent of node.py
 */

import { TypeMap } from "../utils/utils.ts";

export class Position {
	constructor(
		public line: number,
		public char: number = 0,
	) {}
}

export class Node {
	public content: string;
	private _children: Node[];
	public parent: Node | null = null;
	public pos: Position | null;

	constructor(content: string | null, pos: Position | null, children: Node[] | null) {
		this.content = content || "";
		this._children = children || [];
		this.pos = pos;
		
		for (const child of this._children) {
			child.parent = this;
		}
	}

	get children(): readonly Node[] {
		return [...this._children];
	}

	replaceChild(target: Node, newChild: Node | Node[] | null): void {
		const matches = this._children
			.map((child, index) => child === target ? index : -1)
			.filter(index => index !== -1);

		if (matches.length === 0) {
			throw new Error("target child not found");
		}
		if (matches.length > 1) {
			throw new Error("target child appears multiple times");
		}

		const index = matches[0]!;
		// detach old
		this._children.splice(index, 1);
		target.parent = null;
		this.insertChild(index, newChild);

		// Notify about tree changes for metadata invalidation
		this.notifyTreeChange();
	}

	appendChild(newChild: Node | Node[] | null): void {
		this.insertChild(this._children.length, newChild);
		this.notifyTreeChange();
	}

	prependChild(newChild: Node | Node[] | null): void {
		this.insertChild(0, newChild);
		this.notifyTreeChange();
	}

	private insertChild(index: number, newChild: Node | Node[] | null): void {
		// prepare new children
		let replacement: Node[];
		if (newChild === null) {
			replacement = [];
		} else if (newChild instanceof Node) {
			replacement = [newChild];
		} else {
			replacement = [...newChild];
		}

		for (let i = replacement.length - 1; i >= 0; i--) {
			const child = replacement[i]!;
			if (child.parent) {
				// Detach from old parent
				const oldParentIndex = child.parent._children.indexOf(child);
				if (oldParentIndex !== -1) {
					child.parent._children.splice(oldParentIndex, 1);
				}
				child.parent = null;
			}
			child.parent = this;
			this._children.splice(index, 0, child);
		}
	}

	private notifyTreeChange(): void {
		/**
		 * Hook for notifying about tree changes - to be implemented by compiler
		 * This will be used by the compiler to invalidate metadata
		 */
	}

	toString(): string {
		return this.indentedRepr();
	}

	indentedRepr(indent: string = ""): string {
		const nextIndent = "\t" + indent;
		return `${indent}${this.content}\n` + 
			this._children.map(child => child.indentedRepr(nextIndent)).join("\n");
	}

	copyRecursive(): Node {
		/**
		 * Create a recursive copy of this node and all its children.
		 */
		const newNode = new Node(this.content, this.pos, []);
		for (const child of this._children) {
			const copiedChild = child.copyRecursive();
			copiedChild.parent = newNode;
			newNode._children.push(copiedChild);
		}
		return newNode;
	}
}

export class Indexers {
	constructor(public mapping: Map<string, unknown> = new Map()) {}
}

TypeMap.register(Indexers, () => new Indexers());

export class Callers {
	constructor(public mapping: Map<string, unknown> = new Map()) {}
}

TypeMap.register(Callers, () => new Callers());

export class Params {
	constructor(public mapping: Map<string, unknown> = new Map()) {}
}

TypeMap.register(Params, () => new Params());

export class InjectCodeStart {
	constructor(public code: string[] = []) {}
}

export class Macro extends String {
	constructor(value: string) {
		super(value);
	}
}

export class Args extends String {
	constructor(value: string) {
		super(value);
	}
}

export class SaneIdentifier extends String {
	constructor(value: string) {
		super(value);
	}
}

export class FieldDemandType {
	// TODO: Remove this class and store Type objects directly
}

export class TypeFieldNames {
	constructor(public names: string[] = []) {}
}

export class ResolvedConvention {
	/**
	 * Stores the resolved calling convention for a function call
	 */
	public convention: unknown = null; // Will hold PrototypeCall or DirectCall
}
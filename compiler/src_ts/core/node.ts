// core/node.ts

// Side-effect imports to mirror Crystal requires; you'll fill these in later.
import "../utils/utils.ts";
import "../pipeline/call_conventions.ts";
import { Call_convention } from "../pipeline/call_conventions.ts";

// --- Position ---

export class Position {
  line: number;
  char: number;

  constructor(line: number, char: number = 0) {
    this.line = line;
    this.char = char;
  }
}

// --- Node ---

export class Node {
  content: string;
  pos: Position | null;

  private _parent: Node | null;
  private _children: Node[];

  constructor(
    content: string | null,
    pos: Position | null,
    children: Node[] | null = null,
  ) {
    this.content = content ?? "";
    this._children = [];
    this._parent = null;

    if (children) {
      for (const ch of children) {
        this.append_child(ch);
      }
    }

    this.assertAllChildrenParented();
    this.pos = pos;
  }

  get parent(): Node | null {
    return this._parent;
  }

  protected setParent(n: Node | null): void {
    const old = this._parent;
    this._parent = n;
    if (old) {
      old.assertAllChildrenParented();
    }
  }

  private assertAllChildrenParented(): void {
    for (const ch of this._children) {
      if (ch.parent !== this) {
        throw new Error("Child parent mismatch in Node tree");
      }
    }
  }

  get children(): Node[] {
    this.assertAllChildrenParented();
    return this._children.slice();
  }

  replace_child(
    target: Node,
    newChild: Node | Node[] | null,
  ): void {
    const matches: number[] = [];

    this._children.forEach((ch, i) => {
      if (ch === target) {
        matches.push(i);
      }
    });

    if (matches.length === 0) {
      throw new Error("target child not found");
    }

    if (matches.length > 1) {
      throw new Error("target child appears multiple times");
    }

    const index = matches[0];
    this._children.splice(index, 1);
    target.setParent(null);
    this.insert_child(index, newChild);
    this.notifyTreeChange();
  }

  append_child(newChild: Node | Node[] | null): void {
    this.insert_child(this._children.length, newChild);
    this.notifyTreeChange();
  }

  prepend_child(newChild: Node | Node[] | null): void {
    this.insert_child(0, newChild);
    this.notifyTreeChange();
  }

  private insert_child(
    index: number,
    newChild: Node | Node[] | null,
  ): void {
    let replacement: Node[];

    if (newChild == null) {
      replacement = [];
    } else if (Array.isArray(newChild)) {
      replacement = newChild;
    } else {
      replacement = [newChild];
    }

    // reverse_each + insert(index) to preserve order
    for (let i = replacement.length - 1; i >= 0; i--) {
      const child = replacement[i];

      // detach from old parent if present
      const p = child._parent;
      if (p) {
        const idx = p._children.indexOf(child);
        if (idx !== -1) {
          p._children.splice(idx, 1);
        }
        child.setParent(null);
        p.assertAllChildrenParented();
      }

      child.setParent(this);
      this._children.splice(index, 0, child);
    }

    this.assertAllChildrenParented();
  }

  // hook for compiler metadata invalidation
  protected notifyTreeChange(): void {
    // no-op by default
  }

  indentedRepr(indent: string = ""): string {
    const nextIndent = "\t" + indent;
    let out = "";

    out += indent + this.content + "\n";
    for (const ch of this._children) {
      out += ch.indentedRepr(nextIndent) + "\n";
    }

    // rstrip('\n')
    return out.replace(/\n+$/g, "");
  }

  inspect(): string {
    return this.indentedRepr();
  }

  copy_recursive(): Node {
    const newNode = new Node(this.content, this.pos, []);
    for (const ch of this._children) {
      const childCopy = ch.copy_recursive();
      newNode._children.push(childCopy);
      childCopy.setParent(newNode);
    }
    return newNode;
  }
}

// --- Metadata holder types ---

export class Indexers {
  mapping: Record<string, unknown>;

  constructor() {
    this.mapping = {};
  }
}

export class Callers {
  mapping: Record<string, unknown>;

  constructor() {
    this.mapping = {};
  }
}

export class Params {
  mapping: Record<string, boolean>;

  constructor() {
    this.mapping = {};
  }
}

export class Inject_code_start {
  code: string[];

  constructor() {
    this.code = [];
  }
}

// --- String wrapper meta-types ---

export class Macro {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  empty(): boolean {
    return this.value.length === 0;
  }

  strip(): string {
    return this.value.trim();
  }

  split(sep: string): string[] {
    return this.value.split(sep);
  }

  startsWith(p: string): boolean {
    return this.value.startsWith(p);
  }

  endsWith(s: string): boolean {
    return this.value.endsWith(s);
  }
}

export class Args {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }

  empty(): boolean {
    return this.value.length === 0;
  }

  strip(): string {
    return this.value.trim();
  }

  split(sep: string): string[] {
    return this.value.split(sep);
  }
}

export class SaneIdentifier {
  readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value;
  }
}

// TODO: remove and store Type objects directly
export class FieldDemandType {
  tc: unknown; // TCResult placeholder

  constructor(tc: unknown) {
    this.tc = tc;
  }
}

// Stores the resolved calling convention for a function call
export class ResolvedConvention {
  convention: Call_convention; // Call_convention placeholder

  constructor(convention: Call_convention) {
    this.convention = convention;
  }
}

export class Macro_previously_failed {
  constructor(readonly reason: string) {
    // ...
  }
}

// optional factory funcs (compatibility with prior registrations if needed)
export function __indexers(): Indexers {
  return new Indexers();
}

export function __callers(): Callers {
  return new Callers();
}

export function __params(): Params {
  return new Params();
}

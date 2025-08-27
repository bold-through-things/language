/**
 * String utility functions - TypeScript equivalent of strutil.py
 */

export function cut(line: string, sep: string): [string, string] {
	const index = line.indexOf(sep);
	if (index === -1) {
		return [line, ""];
	}
	return [line.slice(0, index), line.slice(index + sep.length)];
}

export function extractIndent(line: string, max?: number): [string, number] {
	let indent = 0;
	while (line.startsWith('\t') && (max === undefined || indent < max)) {
		indent += 1;
		line = line.slice(1);
	}
	return [line, indent];
}

// Recursive type for nested string arrays
type NestedStringArray = Array<string | NestedStringArray>;

export function joinNested(data: NestedStringArray, indent: number = 2, level: number = 0): string {
	function stringify(x: string | NestedStringArray): string {
		if (typeof x === "string") {
			return x;
		}
		return joinNested(x, indent, level + 1);
	}

	const s = data.map(stringify).join(" ");
	const lines = s.split("\n").map(line => " ".repeat(indent * level) + line);
	return lines.join('\n');
}

export class Joiner {
	private first = true;

	constructor(private out: { write(s: string): void }, private sep: string) {}

	enter(): void {
		if (this.first) {
			this.first = false;
		} else {
			this.out.write(this.sep);
		}
	}

	exit(): void {
		// no-op
	}
}

export class IndentedStringIO {
	private buf: string[] = [];
	private indentLevel = 0;
	private atLineStart = true;

	constructor(private indentStr: string = '    ') {}

	write(s: string): number {
		const lines = s.split(/(\r?\n)/);
		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]!;
			
			// Handle line endings
			if (line.match(/\r?\n/)) {
				this.buf.push(line);
				this.atLineStart = true;
				continue;
			}
			
			// Handle content
			if (this.atLineStart && line.trim()) {
				this.buf.push(this.indentStr.repeat(this.indentLevel));
				this.atLineStart = false;
			}
			this.buf.push(line);
		}
		return s.length;
	}

	writeline(s: string = ''): void {
		if (this.atLineStart && s.trim()) {
			this.buf.push(this.indentStr.repeat(this.indentLevel));
		}
		this.buf.push(s + '\n');
		this.atLineStart = true;
	}

	indent(levels: number = 1): void {
		this.indentLevel += levels;
	}

	dedent(levels: number = 1): void {
		this.indentLevel = Math.max(0, this.indentLevel - levels);
	}

	getvalue(): string {
		return this.buf.join('');
	}

	reset(): void {
		this.buf.length = 0;
		this.indentLevel = 0;
		this.atLineStart = true;
	}

	toString(): string {
		return this.getvalue();
	}
}
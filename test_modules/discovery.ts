// test_modules/discovery.ts
import { fileExists, readFile, TEST_ROOT } from "./paths.ts";

export interface TestCase {
    name: string;
    defPath: string;
    codePath: string;
    casePath: string;
}

export interface DiscoveryArgs {
    glob: string | null;
}

export function discoverTests(args: DiscoveryArgs): TestCase[] {
    const results: TestCase[] = [];

    const testsRoot = TEST_ROOT;

    for (const entry of walkTestsJson(testsRoot)) {
        const baseDir = entry.dir;

        for (const row of entry.json) {
            const codeGlobs = resolveGlob(row.code, baseDir);
            const caseGlobs = resolveGlob(row.case, baseDir);

            for (const cp of codeGlobs) {
                for (const kp of caseGlobs) {
                    const name = makeName(testsRoot, baseDir, cp, kp);

                    results.push({
                        name: name,
                        defPath: baseDir,
                        codePath: cp,
                        casePath: kp
                    });
                }
            }
        }
    }

    return results;
}

function* walkTestsJson(root: string): Generator<{ dir: string; json: any[] }> {
    for (const entry of Deno.readDirSync(root)) {
        if (entry.isDirectory) {
            const sub = `${root}/${entry.name}`;
            yield* walkTestsJson(sub);
        }
        if (entry.isFile && entry.name === "tests.json") {
            const full = `${root}/${entry.name}`;
            const dir = root;

            const text = readFile(full);
            if (!text) {
                continue;
            }

            let json: any[];
            try {
                json = JSON.parse(text);
            } catch {
                continue;
            }

            yield { dir: dir, json: json };
        }
    }
}

function resolveGlob(pattern: string, base: string): string[] {
    if (pattern.includes("*")) {
        const out: string[] = [];
        for (const entry of walkRecursive(base)) {
            if (minimatch(entry.substring(base.length + 1), pattern)) {
                out.push(entry);
            }
        }
        return out;
    } else {
        return [`${base}/${pattern}`];
    }
}

function* walkRecursive(root: string): Generator<string> {
    for (const ent of Deno.readDirSync(root)) {
        const full = `${root}/${ent.name}`;
        if (ent.isFile) {
            yield full;
        }
        if (ent.isDirectory) {
            yield full;
            yield* walkRecursive(full);
        }
    }
}

function minimatch(path: string, pattern: string): boolean {
    // extremely tiny fnmatch-like implementation
    // '*' matches any substring
    const esc = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
    const regex = "^" + esc.replace(/\*/g, "[^/]*") + "$";
    return new RegExp(regex).test(path);
}

function makeName(root: string, base: string, code: string, kase: string): string {
    const defParts = relativeParts(root, base);
    const codeParts = relativeParts(base, code);
    const caseParts = relativeParts(base, kase);
    return "test_" + [...defParts, ...codeParts, ...caseParts].join("_");
}

function relativeParts(from: string, to: string): string[] {
    const rel = relativePath(from, to);
    return rel.split("/").filter((x) => x.length > 0);
}

function relativePath(from: string, to: string): string {
    const f = from.split("/").filter(Boolean);
    const t = to.split("/").filter(Boolean);
    while (f.length && t.length && f[0] === t[0]) {
        f.shift();
        t.shift();
    }
    return t.join("/");
}

export function buildMidglob(glob: string | null): (name: string) => boolean {
    if (!glob) {
        return () => true;
    }
    const esc = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    const regex = new RegExp(".*" + esc + ".*");
    return (s) => regex.test(s);
}

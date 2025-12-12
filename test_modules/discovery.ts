// test_modules/discovery.ts
import { JSON_value } from "../compiler/src_ts/core/meta_value.ts";
import { readFile, TEST_ROOT } from "./paths.ts";

export interface Test_case {
    name: string;
    base_name: string;
    tags: string[];
    def_path: string;
    code_path: string;
    case_path: string;
}

export interface Discovery_args {
    glob: string | null;
}

export function discover_tests(_args: Discovery_args): Test_case[] {
    const results: Test_case[] = [];

    const testsRoot = TEST_ROOT;

    for (const entry of walk_tests_JSON(testsRoot)) {
        const baseDir = entry.dir;

        for (const row of entry.json) {
            if (
                typeof row !== "object" || 
                row === null || 
                Array.isArray(row) || 
                row === undefined ||
                typeof row.code !== "string" ||
                typeof row.case !== "string" ||
                (row.tags !== undefined && !Array.isArray(row.tags))
            ) {
                throw new Error(`what the fuck is this at ${entry.path}, ${JSON.stringify(row)}`);
            }

            const codeGlobs = resolve_glob(row.code, baseDir);
            const caseGlobs = resolve_glob(row.case, baseDir);

            const tags = (row.tags ?? []).filter((x): x is string => {
                if (!(typeof x === "string")) { 
                    throw new Error(`tag in ${entry.path}: ${JSON.stringify(row)}`) 
                } 
                return true; 
            });

            for (const cp of codeGlobs) {
                for (const kp of caseGlobs) {
                    const name = make_name(testsRoot, baseDir, cp, kp);
                    const base_name = make_base_name(testsRoot, baseDir);

                    results.push({
                        name,
                        base_name,
                        def_path: baseDir,
                        code_path: cp,
                        case_path: kp,
                        tags,
                    });
                }
            }
        }
    }

    return results;
}

function* walk_tests_JSON(root: string): Generator<{ dir: string; json: JSON_value[], path: string }> {
    for (const entry of Deno.readDirSync(root)) {
        if (entry.isDirectory) {
            const sub = `${root}/${entry.name}`;
            yield* walk_tests_JSON(sub);
        }
        if (entry.isFile && entry.name === "tests.json") {
            const full = `${root}/${entry.name}`;
            const dir = root;

            const text = readFile(full);
            if (!text) {
                continue;
            }

            let json: JSON_value[];
            try {
                json = JSON.parse(text);
            } catch {
                continue;
            }

            yield { dir: dir, json: json, path: full };
        }
    }
}

function resolve_glob(pattern: string, base: string): string[] {
    if (pattern.includes("*")) {
        const out: string[] = [];
        for (const entry of walk_recursive(base)) {
            if (minimatch(entry.substring(base.length + 1), pattern)) {
                out.push(entry);
            }
        }
        return out;
    } else {
        return [`${base}/${pattern}`];
    }
}

function* walk_recursive(root: string): Generator<string> {
    for (const ent of Deno.readDirSync(root)) {
        const full = `${root}/${ent.name}`;
        if (ent.isFile) {
            yield full;
        }
        if (ent.isDirectory) {
            yield full;
            yield* walk_recursive(full);
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

function make_base_name(root: string, base: string): string {
    const defParts = relative_parts(root, base);
    return "test_" + defParts.join("_");
}

function make_name(root: string, base: string, code: string, kase: string): string {
    const codeParts = relative_parts(base, code);
    const caseParts = relative_parts(base, kase);
    return make_base_name(root, base) + "_" + [...codeParts, ...caseParts].join("_");
}

function relative_parts(from: string, to: string): string[] {
    const rel = relative_path(from, to);
    return rel.split("/").filter((x) => x.length > 0);
}

function relative_path(from: string, to: string): string {
    const f = from.split("/").filter(Boolean);
    const t = to.split("/").filter(Boolean);
    while (f.length && t.length && f[0] === t[0]) {
        f.shift();
        t.shift();
    }
    return t.join("/");
}

export function build_midglob(glob: string | null): (name: string) => boolean {
    if (!glob) {
        return () => true;
    }
    const esc = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*");
    const regex = new RegExp(".*" + esc + ".*");
    return (s) => regex.test(s);
}

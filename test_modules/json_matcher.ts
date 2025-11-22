// test_modules/json_matcher.ts

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };

class MatchError {
    path: string;
    msg: string;

    constructor(path: string, msg: string) {
        this.path = path;
        this.msg = msg;
    }

    toString(): string {
        return `${this.path}: ${this.msg}`;
    }
}

function jsonPath(path: string, key: string | number): string {
    if (path === "$") {
        return typeof key === "string" ? `$.${key}` : `$[${key}]`;
    }
    return typeof key === "string" ? `${path}.${key}` : `${path}[${key}]`;
}

function typeName(x: unknown): string {
    if (x === null) {
        return "null";
    }
    if (typeof x === "boolean") {
        return "boolean";
    }
    if (typeof x === "number") {
        return "number";
    }
    if (typeof x === "string") {
        return "string";
    }
    if (Array.isArray(x)) {
        return "array";
    }
    if (typeof x === "object") {
        return "object";
    }
    return typeof x;
}

function isOpDict(d: unknown): d is Record<string, Json> {
    if (!d || typeof d !== "object") {
        return false;
    }
    for (const k of Object.keys(d as Record<string, Json>)) {
        if (k.startsWith("$")) {
            return true;
        }
    }
    return false;
}

// forward declarations
function matchAny(spec: Json, actual: Json, path: string, errs: MatchError[]): void;

function matchAny(spec: Json, actual: Json, path: string, errs: MatchError[]): void {
    if (typeof spec === "object" && spec !== null && !Array.isArray(spec)) {
        const specObj = spec as Record<string, Json>;
        const hasArrayOps = ["$len", "$any", "$all", "$subset", "$items", "$count"].some((k) =>
            Object.prototype.hasOwnProperty.call(specObj, k)
        );
        if (hasArrayOps) {
            matchArrayController(specObj, actual, path, errs);
            return;
        }
        if (isOpDict(spec)) {
            matchScalarOp(specObj, actual, path, errs);
            return;
        }
        matchObject(specObj, actual, path, errs);
        return;
    }

    if (Array.isArray(spec)) {
        matchList(spec, actual, path, errs);
        return;
    }

    if (spec !== actual) {
        errs.push(new MatchError(path, `expected ${JSON.stringify(spec)}, got ${JSON.stringify(actual)}`));
    }
}

function matchScalarOp(spec: Record<string, Json>, actual: Json, path: string, errs: MatchError[]): void {
    for (const [op, val] of Object.entries(spec)) {
        if (["$len", "$any", "$all", "$subset", "$items", "$count", "$strict", "$forbid", "$where"].includes(op)) {
            continue;
        }

        if (op === "$eq") {
            if (actual !== val) {
                errs.push(new MatchError(path, `expected == ${JSON.stringify(val)}, got ${JSON.stringify(actual)}`));
            }
        } else if (op === "$contains") {
            if (typeof actual !== "string") {
                errs.push(new MatchError(path, `$contains needs string, got ${typeName(actual)}`));
            } else if (typeof val !== "string" || !actual.includes(val)) {
                errs.push(new MatchError(path, `expected to contain ${JSON.stringify(val)}, got ${JSON.stringify(actual)}`));
            }
        } else if (op === "$regex") {
            if (typeof actual !== "string") {
                errs.push(new MatchError(path, `$regex needs string, got ${typeName(actual)}`));
            } else {
                const re = new RegExp(String(val));
                if (!re.test(actual)) {
                    errs.push(new MatchError(path, `expected to match /${val}/, got ${JSON.stringify(actual)}`));
                }
            }
        } else if (op === "$gt" || op === "$ge" || op === "$lt" || op === "$le") {
            if (typeof actual !== "number") {
                errs.push(new MatchError(path, `${op} needs number, got ${typeName(actual)}`));
            } else {
                const numVal = Number(val);
                if (op === "$gt" && !(actual > numVal)) {
                    errs.push(new MatchError(path, `expected > ${numVal}, got ${actual}`));
                }
                if (op === "$ge" && !(actual >= numVal)) {
                    errs.push(new MatchError(path, `expected >= ${numVal}, got ${actual}`));
                }
                if (op === "$lt" && !(actual < numVal)) {
                    errs.push(new MatchError(path, `expected < ${numVal}, got ${actual}`));
                }
                if (op === "$le" && !(actual <= numVal)) {
                    errs.push(new MatchError(path, `expected <= ${numVal}, got ${actual}`));
                }
            }
        } else if (op === "$in") {
            if (!Array.isArray(val)) {
                errs.push(new MatchError(path, `$in needs array, got ${typeName(val)}`));
            } else {
                let found = false;
                for (const candidate of val) {
                    if (candidate === actual) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    errs.push(new MatchError(path, `expected one of ${JSON.stringify(val)}, got ${JSON.stringify(actual)}`));
                }
            }
        } else if (op === "$type") {
            if (typeName(actual) !== String(val)) {
                errs.push(new MatchError(path, `expected type ${val}, got ${typeName(actual)}`));
            }
        } else if (op === "$present") {
            // handled at object level
        } else if (op === "$not") {
            const subErrs: MatchError[] = [];
            matchAny(val as Json, actual, path, subErrs);
            if (subErrs.length === 0) {
                errs.push(new MatchError(path, `$not failed: value matches forbidden spec`));
            }
        } else if (op === "$oneOf") {
            if (!Array.isArray(val)) {
                errs.push(new MatchError(path, `$oneOf needs array, got ${typeName(val)}`));
                continue;
            }
            const allErrs: Array<[number, MatchError[]]> = [];
            let matched = false;
            for (let i = 0; i < val.length; i++) {
                const s = val[i] as Json;
                const subErrs: MatchError[] = [];
                matchAny(s, actual, path, subErrs);
                if (subErrs.length === 0) {
                    matched = true;
                    break;
                }
                allErrs.push([i, subErrs]);
            }
            if (!matched) {
                const flat = allErrs
                    .map(([i, es]) => `alt[${i}] first error: ${es[0].toString()}`)
                    .join("; ");
                errs.push(new MatchError(path, `none of $oneOf matched; ${flat}`));
            }
        } else {
            errs.push(new MatchError(path, `unknown operator ${op}`));
        }
    }
}

function matchObject(spec: Record<string, Json>, actual: Json, path: string, errs: MatchError[]): void {
    if (typeof actual !== "object" || actual === null || Array.isArray(actual)) {
        errs.push(new MatchError(path, `expected object, got ${typeName(actual)}`));
        return;
    }

    const actualObj = actual as Record<string, Json>;

    const strict = Boolean(spec["$strict"]);
    const forbidVal = spec["$forbid"];
    const forbid = Array.isArray(forbidVal) ? new Set<string>(forbidVal.map(String)) : new Set<string>();

    const specKeys = Object.keys(spec).filter((k) => !k.startsWith("$"));

    if (strict) {
        const extras = Object.keys(actualObj).filter((k) => !specKeys.includes(k));
        if (extras.length > 0) {
            const sorted = [...extras].sort();
            errs.push(new MatchError(path, `$strict: unexpected keys present: ${JSON.stringify(sorted)}`));
        }
    }

    if (forbid.size > 0) {
        const present = [...forbid].filter((k) => Object.prototype.hasOwnProperty.call(actualObj, k)).sort();
        if (present.length > 0) {
            errs.push(new MatchError(path, `$forbid: keys must be absent: ${JSON.stringify(present)}`));
        }
    }

    for (const k of specKeys) {
        if (!Object.prototype.hasOwnProperty.call(actualObj, k)) {
            const v = spec[k];
            if (typeof v === "object" && v !== null && !Array.isArray(v) && v["$present"] === true) {
                continue;
            }
            errs.push(new MatchError(jsonPath(path, k), "missing key"));
            continue;
        }
        matchAny(spec[k] as Json, actualObj[k], jsonPath(path, k), errs);
    }
}

function matches(want: Json, got: Json): [boolean, MatchError[]] {
    const e: MatchError[] = [];
    matchAny(want, got, "$", e);
    return [e.length === 0, e];
}

function arrayCount(whereSpec: Json, actual: Json, path: string, cmpOps: Record<string, Json>, errs: MatchError[]): void {
    if (!Array.isArray(actual)) {
        errs.push(new MatchError(path, `expected array for $count, got ${typeName(actual)}`));
        return;
    }
    let n = 0;
    for (let i = 0; i < actual.length; i++) {
        const el = actual[i] as Json;
        const [ok] = matches(whereSpec, el);
        if (ok) {
            n += 1;
        }
    }
    matchScalarOp(cmpOps, n as unknown as Json, `${path}/$count`, errs);
}

function unorderedMultisetMatch(specItems: Json[], actualItems: Json[], path: string, errs: MatchError[]): void {
    const used = new Array(actualItems.length).fill(false);
    let bestHint: MatchError | null = null;

    const backtrack = (j: number): boolean => {
        if (j === specItems.length) {
            return true;
        }
        const want = specItems[j];
        for (let i = 0; i < actualItems.length; i++) {
            if (used[i]) {
                continue;
            }
            const got = actualItems[i];
            const subErrs: MatchError[] = [];
            matchAny(want, got, jsonPath(path, i), subErrs);
            if (subErrs.length === 0) {
                used[i] = true;
                if (backtrack(j + 1)) {
                    return true;
                }
                used[i] = false;
            } else if (bestHint === null) {
                bestHint = subErrs[0];
            }
        }
        return false;
    };

    if (!backtrack(0)) {
        errs.push(new MatchError(path, "unordered multiset match failed"));
        if (bestHint) {
            errs.push(bestHint);
        }
    }
}

function matchArrayController(spec: Record<string, Json>, actual: Json, path: string, errs: MatchError[]): void {
    if (!Array.isArray(actual)) {
        errs.push(new MatchError(path, `expected array, got ${typeName(actual)}`));
        return;
    }

    if ("$len" in spec) {
        const want = spec["$len"] as Json;
        if (typeof want === "object" && want !== null && !Array.isArray(want)) {
            matchScalarOp(want as Record<string, Json>, actual.length as unknown as Json, `${path}/$len`, errs);
        } else {
            const n = Number(want);
            if (actual.length !== n) {
                errs.push(new MatchError(path, `expected length ${n}, got ${actual.length}`));
            }
        }
    }

    if ("$count" in spec) {
        const payload = spec["$count"];
        if (typeof payload === "object" && payload !== null && !Array.isArray(payload)) {
            const payloadObj = payload as Record<string, Json>;
            const where = (payloadObj["$where"] ?? {}) as Json;
            const cmpOps: Record<string, Json> = {};
            for (const [k, v] of Object.entries(payloadObj)) {
                if (k.startsWith("$") && k !== "$where") {
                    cmpOps[k] = v;
                }
            }
            arrayCount(where, actual, path, cmpOps, errs);
        }
    }

    if ("$any" in spec) {
        const each = spec["$any"] as Json;
        let okAny = false;
        for (let i = 0; i < actual.length; i++) {
            const el = actual[i] as Json;
            const subErrs: MatchError[] = [];
            matchAny(each, el, jsonPath(path, i), subErrs);
            if (subErrs.length === 0) {
                okAny = true;
                break;
            }
        }
        if (!okAny) {
            errs.push(new MatchError(path, "$any failed: no element matched"));
        }
    }

    if ("$all" in spec) {
        const each = spec["$all"] as Json;
        for (let i = 0; i < actual.length; i++) {
            const el = actual[i] as Json;
            matchAny(each, el, jsonPath(path, i), errs);
        }
    }

    if ("$subset" in spec) {
        const subsetSpecs = Array.isArray(spec["$subset"]) ? spec["$subset"] as Json[] : [];
        unorderedMultisetMatch(subsetSpecs, actual as Json[], path, errs);
    }

    if ("$items" in spec) {
        const wantItems = Array.isArray(spec["$items"]) ? spec["$items"] as Json[] : [];
        const order = (spec["$order"] as string) ?? "any";
        if (order === "exact") {
            if (wantItems.length !== actual.length) {
                errs.push(new MatchError(path, `$items exact: length mismatch ${wantItems.length} != ${actual.length}`));
            } else {
                for (let i = 0; i < wantItems.length; i++) {
                    matchAny(wantItems[i], actual[i] as Json, jsonPath(path, i), errs);
                }
            }
        } else {
            if (wantItems.length !== actual.length) {
                errs.push(new MatchError(path, `$items any: actual has ${actual.length} items, spec has ${wantItems.length}`));
            }
            unorderedMultisetMatch(wantItems, actual as Json[], path, errs);
        }
    }
}

function matchList(spec: Json, actual: Json, path: string, errs: MatchError[]): void {
    if (!Array.isArray(actual)) {
        errs.push(new MatchError(path, `expected array, got ${typeName(actual)}`));
        return;
    }
    const specList = Array.isArray(spec) ? spec as Json[] : [];
    unorderedMultisetMatch(specList, actual as Json[], path, errs);
}

function prettyJson(s: string): string {
    try {
        const parsed = JSON.parse(s);
        return JSON.stringify(parsed, null, 2);
    } catch {
        return s;
    }
}

export function validateJsonSpec(
    actualJsonText: string,
    specJsonText: string
): [boolean, string, string] {
    let actual: Json;
    try {
        actual = JSON.parse(actualJsonText) as Json;
    } catch (e) {
        return [false, `Actual errors-file is not valid JSON: ${String(e)}`, prettyJson(actualJsonText)];
    }

    let spec: Json;
    try {
        spec = JSON.parse(specJsonText) as Json;
    } catch (e) {
        return [false, `Spec file is not valid JSON: ${String(e)}`, prettyJson(actualJsonText)];
    }

    const errs: MatchError[] = [];
    matchAny(spec, actual, "$", errs);

    if (errs.length === 0) {
        return [true, "OK", JSON.stringify(actual, null, 2)];
    }

    const lines: string[] = ["JSON spec mismatches:"];
    for (const e of errs) {
        lines.push(`  - ${e.toString()}`);
    }
    return [false, lines.join("\n"), JSON.stringify(actual, null, 2)];
}

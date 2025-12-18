// test_modules/paths.ts
export const TEST_ROOT = "tests/all";
export const EXECUTABLE = "out.ts";

export function read_file(path: string): string | null {
    try {
        return Deno.readTextFileSync(path);
    } catch (_) {
        return null;
    }
}

export function file_exists(path: string): boolean {
    try {
        Deno.statSync(path);
        return true;
    } catch (_) {
        return false;
    }
}

export function* walk_recursive(root: string): Generator<string> {
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

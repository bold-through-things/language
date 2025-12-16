// test_modules/paths.ts
export const TEST_ROOT = "tests/all";
export const EXECUTABLE = "out.ts";

export function readFile(path: string): string | null {
    try {
        return Deno.readTextFileSync(path);
    } catch (_) {
        return null;
    }
}

export function fileExists(path: string): boolean {
    try {
        Deno.statSync(path);
        return true;
    } catch (_) {
        return false;
    }
}


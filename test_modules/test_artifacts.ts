// test_modules/test_artifacts.ts

import { TestCase } from "./discovery.ts";

export function getTestArtifacts(tc: TestCase): string[] {
    const out: string[] = [];

    const caseArtifacts = [
        `${tc.casePath}/.67lang.expanded`,
        `${tc.casePath}/out.js`,
        `${tc.casePath}/success.stdout.actual`,
        `${tc.casePath}/runtime.stderr.actual`
    ];

    const codeArtifacts = [
        `${tc.codePath}/.67lang.expanded`,
        `${tc.codePath}/out.js`,
        `${tc.codePath}/compile.stderr.actual`
    ];

    for (const a of [...caseArtifacts, ...codeArtifacts]) {
        try {
            Deno.statSync(a);
            out.push(a);
        } catch {
            // ignore missing
        }
    }

    return out;
}

// test_modules/test_artifacts.ts

import { Test_case } from "./discovery.ts";

export function getTestArtifacts(tc: Test_case): string[] {
    const out: string[] = [];

    const caseArtifacts = [
        `${tc.case_path}/.67lang.expanded`,
        `${tc.case_path}/out.js`,
        `${tc.case_path}/success.stdout.actual`,
        `${tc.case_path}/runtime.stderr.actual`
    ];

    const codeArtifacts = [
        `${tc.code_path}/.67lang.expanded`,
        `${tc.code_path}/out.js`,
        `${tc.code_path}/compile.stderr.actual`
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

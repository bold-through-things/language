// test_modules/test_diff_reporter.ts

import { TestCase } from "./discovery.ts";

export class TestDiffReporter {
    private testCasePath: string;
    private diffDir: string;

    constructor(testCasePath: string) {
        this.testCasePath = testCasePath;
        this.diffDir = `${testCasePath}/test_diffs`;
        try {
            Deno.mkdirSync(this.diffDir, { recursive: true });
        } catch {
            // ignore
        }
    }

    compareText(actual: string, expected: string, outputType: string): [boolean, string | null] {
        if (actual.trim() === expected.trim()) {
            return [true, null];
        }

        const actualFile = `${this.diffDir}/actual_${outputType}.txt`;
        const expectedFile = `${this.diffDir}/expected_${outputType}.txt`;
        const diffFile = `${this.diffDir}/diff_${outputType}.txt`;

        Deno.writeTextFileSync(actualFile, actual);
        Deno.writeTextFileSync(expectedFile, expected);

        const diffLines = unifiedDiff(
            expected.split(/\r?\n/),
            actual.split(/\r?\n/),
            `expected_${outputType}`,
            `actual_${outputType}`
        );

        Deno.writeTextFileSync(diffFile, diffLines.join("\n"));

        const previewLines = diffLines.slice(0, 50);
        let diffPreview = previewLines.join("\n");
        if (diffLines.length > 50) {
            diffPreview += `\n... (and ${diffLines.length - 50} more lines)\n`;
        }

        const errorMsg =
            `${outputType} mismatch.\n\n` +
            `preview of differences:\n` +
            `${diffPreview}\n\n` +
            `full diff stored in: ${diffFile}\n` +
            `actual output stored in: ${actualFile}\n` +
            `expected output stored in: ${expectedFile}\n\n` +
            `to review:\n` +
            `  cat ${diffFile}\n` +
            `  diff ${expectedFile} ${actualFile}\n`;

        return [false, errorMsg];
    }
}

export function createTestDiffReporter(testCase: TestCase): TestDiffReporter {
    return new TestDiffReporter(testCase.casePath);
}

// very small unified diff implementation
function unifiedDiff(
    a: string[],
    b: string[],
    fromFile: string,
    toFile: string
): string[] {
    const header = [
        `--- ${fromFile}`,
        `+++ ${toFile}`
    ];

    const hunks: string[] = [];

    // naive line-by-line diff, not LCS-perfect but good enough for test hints
    const maxLen = Math.max(a.length, b.length);
    for (let i = 0; i < maxLen; i++) {
        const left = i < a.length ? a[i] : null;
        const right = i < b.length ? b[i] : null;
        if (left === right) {
            hunks.push(` ${left ?? ""}`);
        } else {
            if (left !== null) {
                hunks.push(`-${left}`);
            }
            if (right !== null) {
                hunks.push(`+${right}`);
            }
        }
    }

    return [...header, ...hunks];
}

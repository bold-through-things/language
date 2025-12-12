// test_modules/main.ts

import { runWithInput } from "./subprocess.ts";
import { readFile, fileExists, EXECUTABLE } from "./paths.ts";
import { build_midglob, discover_tests, Test_case } from "./discovery.ts";
import { validateJsonSpec } from "./json_matcher.ts";
import { createTestDiffReporter } from "./test_diff_reporter.ts";
import { getTestArtifacts } from "./test_artifacts.ts";
import { Fixed, ParsedClause, parseTokens, Schema, VarOrTerminated } from "../compiler/src_ts/utils/new_parser.ts";

const USAGE = `67lang test runner.

TODO
`;

const new_schema = {
    path: new Fixed(1),
    succeeds: new Fixed(0),
    fails: new Fixed(0),
}

const argsSchema = {
    glob: new Fixed(1), // TODO i see the point for doing this varargs yes
    stdin: new Fixed(0),
    compile: new Fixed(0),
    debug: new Fixed(0),
    run: new Fixed(0),
    expand: new Fixed(0),
    help: new Fixed(0),
    "--help": new Fixed(0),
    pass: new VarOrTerminated(null, []),
    present: new Fixed(0),
    new: new VarOrTerminated(null, [], new_schema),
};

interface Command_new {
    command: "new";
    path: string;
    type: "succeeds" | "fails";
}

interface Command_present {
    command: "present";
    glob: string;
}

interface Command_default {
    command: "default";
    glob: string | null;
    stdin: boolean;
    compile: boolean;
    debug: boolean;
    run: boolean;
    expand: boolean;
    compilerArgs: string[];
}

type Command = Command_new | Command_present | Command_default;

interface Named_test {
    name: string;
    fn: (log: TestLog) => Promise<void>;
}

function parse_args(args: string[]): Command {
    type Parsed_tree_node<T extends Schema> = {
        [K in keyof T]: ParsedClause<Fixed | VarOrTerminated>[];
    }

    const parsed = parseTokens(args, argsSchema);

    // right, TODO these `0` are a problem
    
    function required<T extends Schema>(node: Parsed_tree_node<T>, arg: (keyof T) & string): string {
        if (node[arg] && node[arg][0] !== undefined) {
            return node[arg][0].value.join("");
        }
        throw new Error(`missing required argument: ${arg}`);
    }
    
    function optional<T extends Schema>(node: Parsed_tree_node<T>, arg: (keyof T) & string): string | null {
        if (node[arg] && node[arg][0] !== undefined) {
            return node[arg][0].value.join("");
        }
        return null;
    }

    function optional_many<T extends Schema>(node: Parsed_tree_node<T>, arg: (keyof T) & string): string[] {
        if (node[arg] && node[arg].length > 0) {
            const results: string[] = [];
            for (const entry of node[arg]) {
                results.push(...entry.value);
            }
            return results;
        }
        return [];
    }

    function flag<T extends Schema>(node: Parsed_tree_node<T>, arg: (keyof T) & string): boolean {  
        return (node[arg]?.length ?? 0) > 0;
    }

    function children<T extends Schema>(
        node: Parsed_tree_node<T>, 
        arg: (keyof T) & string
    ): Parsed_tree_node<Exclude<T[typeof arg]["subParser"], undefined>> | null {
        if (node[arg] && node[arg][0] !== undefined) {
            return node[arg][0].children ?? null;
        }
        return null;
    }

    const new_node = children(parsed, "new");
    if (new_node != null) {
        const path = required(new_node, "path");
        const succeeds = flag(new_node, "succeeds");
        const fails = flag(new_node, "fails");
        if (succeeds === fails) {
            throw new Error("specify exactly one `succeeds` or `fails`");
        }
        const type = succeeds ? "succeeds" : "fails";
        return { command: "new", path, type, }
    }

    if (flag(parsed, "present")) {
        const glob = required(parsed, "present");
        return { command: "present", glob,  };
    }
    
    if (flag(parsed, "help")) {
        console.log(USAGE);
        Deno.exit(0);
    }

    if (flag(parsed, "--help")) {
        console.log("this isn't Unix flags. try 'help'?");
        Deno.exit(0);
    }

    const rv = {
        command: "default" as const,
        glob: optional(parsed, "glob"),
        stdin: flag(parsed, "stdin"),
        compile: flag(parsed, "compile"),
        debug: flag(parsed, "debug"),
        run: flag(parsed, "run"),
        expand: flag(parsed, "expand"),
        compilerArgs: optional_many(parsed, "pass"),
    };

    if (!rv.run && !rv.compile) {
        rv.compile = true;
        rv.run = true;
    }

    return rv;
}

async function readAllStdin(): Promise<string> {
    const chunks: Uint8Array[] = [];
    const buf = new Uint8Array(4096);
    while (true) {
        const n = await Deno.stdin.read(buf);
        if (n === null) {
            break;
        }
        chunks.push(buf.slice(0, n));
    }
    const dec = new TextDecoder();
    let out = "";
    for (const c of chunks) {
        out += dec.decode(c);
    }
    return out;
}

function joinPath(...parts: string[]): string {
    const cleaned: string[] = [];
    for (let p of parts) {
        if (p === "") {
            continue;
        }
        if (p.endsWith("/")) {
            p = p.slice(0, -1);
        }
        if (p.startsWith("/")) {
            if (cleaned.length === 0) {
                cleaned.push(p);
            } else {
                cleaned.push(p.replace(/^\/+/, ""));
            }
        } else {
            cleaned.push(p);
        }
    }
    if (cleaned.length === 0) {
        return "";
    }
    if ((cleaned[0] ?? "").startsWith("/")) {
        return cleaned[0] + (cleaned.length > 1 ? "/" + cleaned.slice(1).join("/") : "");
    }
    return cleaned.join("/");
}

async function copyTree(src: string, dest: string): Promise<void> {
    for await (const ent of Deno.readDir(src)) {
        const srcPath = joinPath(src, ent.name);
        const destPath = joinPath(dest, ent.name);
        if (ent.isDirectory) {
            try {
                await Deno.mkdir(destPath, { recursive: true });
            } catch {
                // ignore
            }
            await copyTree(srcPath, destPath);
        } else if (ent.isFile) {
            await Deno.copyFile(srcPath, destPath);
        }
    }
}

async function validateGitignoreForTest(tc: Test_case): Promise<void> {
    const artifacts = getTestArtifacts(tc);
    if (artifacts.length === 0) {
        return;
    }

    for (const artifact of artifacts) {
        const { code, stdout, stderr } = await runWithInput(
            ["git", "ls-files", artifact],
            { stdin: "" }
        );
        if (code !== 0) {
            throw new Error(`git ls-files failed for ${artifact}: ${stderr}`);
        }
        if (!stdout.trim()) {
            throw new Error(`must track valuable artifact: ${artifact}`);
        }
    }

    const testDiffDirs = [
        joinPath(tc.case_path, "test_diffs"),
        joinPath(tc.code_path, "test_diffs")
    ];

    for (const d of testDiffDirs) {
        if (!fileExists(d)) {
            continue;
        }
        const { code, stderr } = await runWithInput(
            ["git", "check-ignore", d],
            { stdin: "" }
        );
        if (code !== 0) {
            throw new Error(`must ignore test_diffs directory: ${d}. git check-ignore failed: ${stderr}`);
        }
    }
}

function getCompilerCmd(_argsObj: Command_default): string[] {
    return [
        "deno",
        "run",
        "--check",
        "--allow-read",
        "--allow-write",
        "--allow-run",
        "--unstable-raw-imports",
        joinPath(Deno.cwd(), "compiler/src_ts/main.ts")
    ];
}

type CommandOutput = {
    code: number;
    stdout: string;
    stderr: string;
};

type TestLog = {
    compilation: CommandOutput[];
    execution: CommandOutput[];
}

async function runSingleTest(tc: Test_case, args: Command_default, stdinText: string | null, scriptDir: string, log: TestLog): Promise<void> {
    const caseDir = tc.case_path;
    const codeDir = tc.code_path;

    console.log(tc.name);
    console.log(`running test for ${JSON.stringify(tc)}`);

    const diffReporter = createTestDiffReporter(tc);

    const specPath = joinPath(codeDir, "compile.stderr.expected.json");
    const expectedCompileErr = readFile(specPath);
    const expectedRuntimeErr = readFile(joinPath(caseDir, "runtime.stderr.expected"));
    const expectedStdoutRaw = readFile(joinPath(caseDir, "success.stdout.expected"));

    let stdinPerTest: string | null;
    if (args.stdin) {
        stdinPerTest = stdinText;
    } else {
        stdinPerTest = readFile(joinPath(caseDir, "stdin"));
    }

    const projectRoot = Deno.cwd();
    const codeDirAbs = joinPath(projectRoot, codeDir);
    const caseDirAbs = joinPath(projectRoot, caseDir);
    const compileErrActualAbs = joinPath(codeDirAbs, "compile.stderr.actual");
    const outPathAbs = joinPath(codeDirAbs, EXECUTABLE);
    const expandedPathAbs = joinPath(codeDirAbs, ".67lang.expanded");

    try {
        await Deno.remove(compileErrActualAbs);
    } catch {
        // ignore
    }

    if (args.compile) {
        const tmpDir = await Deno.makeTempDir();

        await copyTree(codeDirAbs, tmpDir);
        await copyTree(caseDirAbs, tmpDir);

        const compilerCmd = getCompilerCmd(args);

        let compileProcCode = 0;
        let compileProcStderr = "";
        let compileProcStdout = "";

        if (args.expand) {
            console.log(`${caseDir}: two-step compilation (expand mode)...`);

            const step1Cmd = [
                ...compilerCmd,
                "err",
                compileErrActualAbs,
                "expand",
                "in",
                codeDirAbs,
                "out",
                expandedPathAbs,
                ...args.compilerArgs
            ];

            console.log(`${caseDir}: step 1 - expanding...`);
            const step1 = await runWithInput(step1Cmd, { cwd: tmpDir, stdin: "" });
            log.compilation.push({
                code: step1.code,
                stdout: step1.stdout,
                stderr: step1.stderr
            });
            console.log(`${caseDir}: step 1 complete. return code=${step1.code}`);
            console.log(step1.stdout);
            console.log(step1.stderr);

            if (step1.code !== 0) {
                throw new Error("isn't being used just yet in either way. fix me! assert the errors here");
            }

            const step2Cmd = [
                ...compilerCmd,
                "err",
                compileErrActualAbs,
                "rte",
                "in",
                codeDirAbs,
                "out",
                outPathAbs,
                ...args.compilerArgs
            ];

            console.log(`${caseDir}: step 2 - compiling expanded form to JS...`);
            const step2 = await runWithInput(step2Cmd, { cwd: tmpDir, stdin: "" });
            log.compilation.push({
                code: step2.code,
                stdout: step2.stdout,
                stderr: step2.stderr
            });
            console.log(`${caseDir}: step 2 complete. return code=${step2.code}`);
            console.log(step2.stdout);
            console.log(step2.stderr);

            compileProcCode = step2.code;
            compileProcStdout = step2.stdout;
            compileProcStderr = step2.stderr;
        } else {
            console.log(`${caseDir}: single-step compilation...`);

            const compileCmd = [
                ...compilerCmd,
                "err",
                compileErrActualAbs,
                "in",
                codeDirAbs,
                "out",
                outPathAbs,
                ...args.compilerArgs
            ];

            console.log(`running ${JSON.stringify(compileCmd)}`);
            const proc = await runWithInput(compileCmd, { cwd: tmpDir, stdin: "" });
            log.compilation.push({
                code: proc.code,
                stdout: proc.stdout,
                stderr: proc.stderr
            });
            compileProcCode = proc.code;
            compileProcStdout = proc.stdout;
            compileProcStderr = proc.stderr;

            console.log(`${caseDir}: done compiling. return code=${compileProcCode}`);
            console.log(compileProcStdout);
            console.log(compileProcStderr);
        }

        const writeFailureArtifacts = (label: string, report: string, actualJsonPretty: string): void => {
            const outDir = joinPath(tc.case_path, "test_diffs");
            try {
                Deno.mkdirSync(outDir, { recursive: true });
            } catch {
                // ignore
            }
            Deno.writeTextFileSync(joinPath(outDir, `${label}.report.txt`), report);
            Deno.writeTextFileSync(joinPath(outDir, `${label}.actual.json`), actualJsonPretty);
        };

        if (expectedCompileErr !== null) {
            const actualCompileErr = readFile(compileErrActualAbs) ?? "";
            const [ok, report, prettyActual] = validateJsonSpec(actualCompileErr, expectedCompileErr);
            if (!ok) {
                writeFailureArtifacts("compile_errors_spec", report, prettyActual);
                throw new Error(report);
            }
            if (compileProcCode === 0) {
                throw new Error("Expected compile to fail");
            }
            return;
        }

        if (compileProcCode !== 0) {
            throw new Error(`Compile failed unexpectedly\n${compileProcStderr}`);
        }
    }

    if (args.run) {
        const execCmd: string[] = [
            "deno",
            "run",
            "--check", // yes compiler checks it, what if it did not though?
            "--allow-read"
        ];
        if (args.debug) {
            execCmd.push("--inspect-brk=127.0.0.1:9229");
        }
        execCmd.push(outPathAbs);

        console.log(`${caseDir}: running... ${JSON.stringify(execCmd)}`);
        const { code, stdout, stderr } = await runWithInput(execCmd, {
            cwd: caseDirAbs,
            stdin: stdinPerTest ?? ""
        });
        log.execution.push({
            code: code,
            stdout: stdout,
            stderr: stderr
        });
        console.log(`${caseDir}: complete.`);
        console.log(stdout);

        if (args.stdin) {
            // custom input; no assertions
        } else {
            if (expectedRuntimeErr !== null) {
                const [isEqual, errorMsg] = diffReporter.compareText(
                    stderr.trim(),
                    expectedRuntimeErr.trim(),
                    "runtime_stderr"
                );
                if (!isEqual) {
                    throw new Error(errorMsg ?? "Runtime stderr mismatch");
                }
                if (code === 0) {
                    throw new Error("Expected runtime failure");
                }
            } else {
                function strip_suffix(s: string, suffix: string): string {
                    if (s.endsWith(suffix)) {
                        return s.slice(0, s.length - suffix.length);
                    }
                    return s;
                }
                const expectedOut = (expectedStdoutRaw ?? "").trim().replace(
                    "67lang:test_suite:project_path",
                    scriptDir
                ).replace(
                    "67lang:test_suite:case_path",
                    strip_suffix(caseDirAbs, "/."),
                );
                const [isEqual, errorMsg] = diffReporter.compareText(
                    stdout.trim(),
                    expectedOut,
                    "runtime_stdout"
                );
                if (!isEqual) {
                    throw new Error(errorMsg ?? "Runtime stdout mismatch");
                }
                if (code !== 0) {
                    throw new Error("Runtime failed unexpectedly");
                }
            }
        }
    }

    await validateGitignoreForTest(tc);
}

async function testSilentCompilation(args: Command_default, log: TestLog): Promise<void> {
    const testDir = joinPath(Deno.cwd(), "tests", "all", "examples", "anagram_groups");

    const tmpDir = await Deno.makeTempDir();
    const outFile = joinPath(tmpDir, EXECUTABLE);

    const compilerCmd = getCompilerCmd(args).filter(it => it !== "--check");

    const cmd = [
        ...compilerCmd,
        "err",
        "/dev/null", // not our concern
        "in",
        testDir,
        "out",
        outFile
    ];

    const result = await runWithInput(cmd, {
        cwd: joinPath(Deno.cwd(), "compiler"),
        stdin: ""
    });
    log.compilation.push({
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr
    });

    if (result.code !== 0) {
        throw new Error(`Compilation failed: ${result.stderr}`);
    }

    const stdoutLines = result.stdout.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    const stderrLines = result.stderr.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    const expectedMessage = "refactor confidently when the flame flickers.";

    const totalLines = [...stdoutLines, ...stderrLines];
    if (totalLines.length !== 1) {
        throw new Error(
            `Expected only the flicker message, but got stdout: ${JSON.stringify(stdoutLines)}, stderr: ${JSON.stringify(stderrLines)}`
        );
    }
    if (totalLines[0] !== expectedMessage) {
        throw new Error(`Expected '${expectedMessage}', got '${totalLines[0]}'`);
    }

    try {
        const stat = await Deno.stat(outFile);
        if (!stat.isFile) {
            throw new Error("Output file was not created");
        }
    } catch {
        throw new Error("Output file was not created");
    }
}

async function testVerboseCompilation(args: Command_default, log: TestLog): Promise<void> {
    const testDir = joinPath(Deno.cwd(), "tests", "all", "examples", "anagram_groups");

    const tmpDir = await Deno.makeTempDir();
    const outFile = joinPath(tmpDir, EXECUTABLE);

    const compilerCmd = getCompilerCmd(args);

    const cmd = [
        ...compilerCmd,
        "err",
        "/dev/null", // not our concern
        "in",
        testDir,
        "out",
        outFile,
        "log",
        "registry"
    ];

    const result = await runWithInput(cmd, {
        cwd: joinPath(Deno.cwd(), "compiler"),
        stdin: ""
    });
    log.compilation.push({
        code: result.code,
        stdout: result.stdout,
        stderr: result.stderr
    });

    if (result.code !== 0) {
        throw new Error(`Compilation failed: ${result.stderr}`);
    }

    const allOutput = result.stdout + result.stderr;
    if (!allOutput.includes("[registry] registering macro")) {
        throw new Error("Expected registry log messages when --log registry is used");
    }
    if (!allOutput.includes("refactor confidently when the flame flickers.")) {
        throw new Error("Expected final flicker message");
    }
}

async function runAllTests(args: Command_default, stdinText: string | null): Promise<number> {
    const scriptDir = Deno.cwd();
    const globFilter = build_midglob(args.glob);

    const tests: Named_test[] = [];

    const e2e = discover_tests({ glob: args.glob });
    for (const tc of e2e) {
        if (!globFilter(tc.name) && !tc.tags.some(tag => globFilter(tag))) {
            console.log(`ignoring \`${tc.name}\` [${tc.tags.map(tag => `\`${tag}\``).join(", ")}] per midglob \`${args.glob}\``);
            continue;
        }
        tests.push({
            name: tc.name,
            fn: (log: TestLog) => runSingleTest(tc, args, stdinText, scriptDir, log)
        });
    }

    if (globFilter("test_silent_compilation")) {
        tests.push({
            name: "test_silent_compilation",
            fn: (log: TestLog) => testSilentCompilation(args, log)
        });
    } else {
        console.log(`ignoring \`test_silent_compilation\` per midglob \`${args.glob}\``);
    }

    if (globFilter("test_verbose_compilation")) {
        tests.push({
            name: "test_verbose_compilation",
            fn: (log: TestLog) => testVerboseCompilation(args, log)
        });
    } else {
        console.log(`ignoring \`test_verbose_compilation\` per midglob \`${args.glob}\``);
    }

    let failed = 0;
    const failures: Record<string, TestLog> = {};
    for (const t of tests) {
        console.log(`\n--- ${t.name} ---`);
        const log: TestLog = {
            compilation: [],
            execution: []
        };
        try {
            await t.fn(log);
            console.log(`--- OK: ${t.name} ---`);
            // log discarded
        } catch (e) {
            failed += 1;
            console.error(`--- FAIL: ${t.name} ---`);
            console.error(String(e));
            failures[t.name] = log;
        }
    }

    console.log(`\n=== Done ===`);

    for (const [name, log] of Object.entries(failures)) {
        console.log(`\n--- Failure log for ${name} ---`);
        // TODO should print commands as well
        if (log.compilation.length > 0) {
            console.log("--- Compilation ---");
            for (const [i, comp] of log.compilation.entries()) {
                console.log(` Step ${i + 1}: code=${comp.code}`);
                console.log("  stdout:");
                console.log(comp.stdout);
                console.log("  stderr:");
                console.log(comp.stderr);
            }
        }
        if (log.execution.length > 0) {
            console.log("--- Execution ---");
            for (const [i, exec] of log.execution.entries()) {
                console.log(` Step ${i + 1}: code=${exec.code}`);
                console.log("  stdout:");
                console.log(exec.stdout);
                console.log("  stderr:");
                console.log(exec.stderr);
            }
        }
    }

    console.log("\n=== Summary ===");
    console.log(`Total tests: ${tests.length}`);
    console.log(`Passed: ${tests.length - failed}`);
    console.log(`Failed: ${failed}`);

    const successfulChar = failed ? "✓" : "✅";
    const failedChar = "❌";
    
    let summaryLine = successfulChar.repeat(tests.length - failed) + failedChar.repeat(failed);
    console.log(summaryLine);

    if (failed) {
        const columns = Deno.consoleSize().columns ?? 80;
        const finalLineChar = failed ? "🟥" : " ";
        summaryLine = finalLineChar.repeat(columns / 2);
        console.log("\n" + summaryLine);
    }

    return failed === 0 ? 0 : 1;
}

function present(args: Command_present): void {
    // tests/present
    // 1. remove all symlinks
    // 2. create symlinks only to tests that match the glob

    for (const file of Deno.readDirSync(joinPath(Deno.cwd(), "tests", "present"))) {
        const filePath = joinPath(Deno.cwd(), "tests", "present", file.name);
        const stat = Deno.lstatSync(filePath);
        if (stat.isSymlink) {
            console.log(`removing symlink: ${filePath}`);
            Deno.removeSync(filePath);
        }
    }

    const used_names = new Set<string>();
    function get_unique_name(base: string): string {
        let name = base;
        let counter = 1;
        while (used_names.has(name)) {
            name = `${base}_${counter}`;
            counter += 1;
        }
        used_names.add(name);
        return name;
    }

    const glob_filter = build_midglob(args.glob);
    const e2e = discover_tests({ glob: args.glob });
    const unique_by_base_name = new Map<string, Test_case>();
    for (const tc of e2e) {
        unique_by_base_name.set(tc.base_name, tc);
    }
    for (const tc of unique_by_base_name.values()) {
        if (!glob_filter(tc.name) && !tc.tags.some(tag => glob_filter(tag))) {
            console.log(`ignoring \`${tc.name}\` [${tc.tags.map(tag => `\`${tag}\``).join(", ")}] per midglob \`${args.glob}\``);
            continue;
        }
        const linkPath = joinPath(Deno.cwd(), tc.def_path);
        const uniqueName = get_unique_name(tc.base_name.replace(/\//g, "_"));
        const destPath = joinPath(Deno.cwd(), "tests", "present", uniqueName);
        console.log(`creating symlink: ${destPath} -> ${linkPath}`);
        Deno.symlinkSync(linkPath, destPath, { type: "dir" });
    }
}

function new_(args: Command_new): void {
    // assuming no case dir for now (`case`: ".")
    const testDir = joinPath(Deno.cwd(), "tests", "all");
    const fullPath = joinPath(testDir, args.path);
    Deno.mkdirSync(fullPath, { recursive: true });
    if (args.type === "succeeds") {
        const codePath = joinPath(fullPath, "main.67lang");
        Deno.writeTextFileSync(codePath, `note huge success\ndo print\n\tstring "huge success"\n`);
        
        const successOutPath = joinPath(fullPath, "success.stdout.expected");
        Deno.writeTextFileSync(successOutPath, `huge success\n`);        
    } else {
        const codePath = joinPath(fullPath, "main.67lang");
        Deno.writeTextFileSync(codePath, `note inevitable fail`);

        const failureErrPath = joinPath(fullPath, "compile.stderr.expected.json");
        Deno.writeTextFileSync(failureErrPath, JSON.stringify({
            "$items": [
                {
                    "recoverable": false,
                    "line": 1,
                    "char": 0,
                    "content": { "$contains": "failure" },
                    "error_type": "INVALID_MACRO",
                },
            ],
            "$order": "any",
            "$key": ["line", "error_type"]
        }, null, 2));
    }
    const testJsonPath = joinPath(fullPath, "tests.json");
    const testJsonContent = {
        code: ".",
        case: ".",
        tags: ["TODO"]
    };
    Deno.writeTextFileSync(testJsonPath, JSON.stringify([testJsonContent], null, 2));
}

export async function main(): Promise<void> {
    const args = parse_args(Deno.args);

    if (args.command === "present") {
        present(args);
        Deno.exit(0);
    }

    if (args.command === "new") {
        new_(args);
        Deno.exit(0);
    }

    const stdinText = args.stdin ? await readAllStdin() : null;

    const code = await runAllTests(args, stdinText);
    Deno.exit(code);
}

// if this module is the entrypoint, run main
if (import.meta.main) {
    await main();
}

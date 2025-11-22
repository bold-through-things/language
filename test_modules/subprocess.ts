// test_modules/subprocess.ts
export interface RunResult {
    code: number;
    stdout: string;
    stderr: string;
}

export interface RunOptions {
    cwd?: string;
    stdin?: string | null;
}

export async function runWithInput(args: string[], options: RunOptions = {}): Promise<RunResult> {
    const cmd = new Deno.Command(args[0], {
        args: args.slice(1),
        cwd: options.cwd,
        stdin: options.stdin ? "piped" : "null",
        stdout: "piped",
        stderr: "piped"
    });

    const child = cmd.spawn();

    const stdoutChunks: Uint8Array[] = [];
    const stderrChunks: Uint8Array[] = [];

    const decoder = new TextDecoder();

    // read + print + buffer simultaneously
    const pump = async (
        stream: ReadableStream<Uint8Array> | null,
        sink: Uint8Array[],
        printFn: (s: string) => void
    ): Promise<void> => {
        if (!stream) {
            return;
        }
        const reader = stream.getReader();
        try {
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    break;
                }
                sink.push(value);
                printFn(decoder.decode(value));
            }
        } finally {
            reader.releaseLock();
        }
    };

    const pStdout = pump(child.stdout, stdoutChunks, (s) => {
        Deno.stdout.writeSync(new TextEncoder().encode(s));
    });

    const pStderr = pump(child.stderr, stderrChunks, (s) => {
        Deno.stderr.writeSync(new TextEncoder().encode(s));
    });

    if (options.stdin) {
        const writer = child.stdin?.getWriter();
        if (writer) {
            await writer.write(new TextEncoder().encode(options.stdin));
            await writer.close();
        }
    }

    const status = await child.status;
    await pStdout;
    await pStderr;

    return {
        code: status.code,
        stdout: decodeAll(stdoutChunks),
        stderr: decodeAll(stderrChunks)
    };
}

function decodeAll(chunks: Uint8Array[]): string {
    const decoder = new TextDecoder();
    let out = "";
    for (const c of chunks) {
        out += decoder.decode(c);
    }
    return out;
}

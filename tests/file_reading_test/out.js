globalThis._67lang = {
    // TODO eliminating this one probably next thing
    exists_inside: (inside, ...arr) => {
        if (Array.isArray(inside)) {
            // array
            return arr.every(v => inside.includes(v))
        } else {
            // assume dict
            return arr.every(v => v in inside)
        }
    },
    zip: (...arrays) => {
        const maxLength = Math.max(...arrays.map(x => x.length));
        return Array.from({ length: maxLength }).map((_, i) => {
            return arrays.map(array => array[i]);
        });
    },
    new_set: (...args) => {
        // need this since semantics differ here
        // (we are remapping `...args` to first)
        return new Set(args);
    },

    maybe_await: async function (value) {
        // we expect the JIT will optimize this h*ck
        // TODO benchmark as test
        if (value instanceof Promise) {
            return await value;
        } else {
            return value;
        }
    }
}

const is_browser = typeof window !== "undefined" && typeof window.document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
    _67lang.prompt = async function (msg) {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) { return ""; }
        return new TextDecoder().decode(buf.subarray(0, n)).trim();
    };

    let stdin_cached = null;

    _67lang.stdin = async function () {
        if (stdin_cached === null) {
            const reader = Deno.stdin.readable.getReader();
            const chunks = [];
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                chunks.push(value);
            }
            reader.releaseLock();
            const size = chunks.reduce((n, c) => n + c.length, 0);
            const all = new Uint8Array(size);
            let offset = 0;
            for (const chunk of chunks) {
                all.set(chunk, offset);
                offset += chunk.length;
            }
            stdin_cached = new TextDecoder().decode(all);
        }
        return stdin_cached;
    };

    _67lang.is_tty = () => Deno.stdin.isTerminal();
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {


















    } {

        const _0x68_print = await _67lang.maybe_await(console.log("Current working directory:"))
        let _0x3f__0x3e_pipeline_result = _0x68_print
        _0x3f__0x3e_pipeline_result
        const _0x6a_cwd = Deno.cwd()
        let _0x42__0x41_pipeline_result = _0x6a_cwd
        const _0x69_print = await _67lang.maybe_await(console.log(_0x42__0x41_pipeline_result))
        let _0x43__0x40_pipeline_result = _0x69_print
        _0x43__0x40_pipeline_result
        const _0x6b_print = await _67lang.maybe_await(console.log("Reading sample.txt:"))
        let _0x45__0x44_pipeline_result = _0x6b_print
        _0x45__0x44_pipeline_result
        try {
            const _0x6c_read_file = await (Deno.readTextFile("sample.txt"))
            let _0x47__0x46_pipeline_result = _0x6c_read_file
            let _0x48_content = _0x47__0x46_pipeline_result
            _0x48_content
            const _0x6e_content = _0x48_content
            let _0x4b__0x4a_pipeline_result = _0x6e_content
            const _0x6d_print = await _67lang.maybe_await(console.log(_0x4b__0x4a_pipeline_result))
            let _0x4c__0x49_pipeline_result = _0x6d_print
            _0x4c__0x49_pipeline_result
        }
        catch (error) {
            let _0x4d_error = error
            _0x4d_error
            const _0x6f_print = await _67lang.maybe_await(console.log("Error reading file:"))
            let _0x4f__0x4e_pipeline_result = _0x6f_print
            _0x4f__0x4e_pipeline_result
            const _0x71_error = _0x4d_error
            let _0x52__0x51_pipeline_result = _0x71_error
            const _0x70_print = await _67lang.maybe_await(console.log(_0x52__0x51_pipeline_result))
            let _0x53__0x50_pipeline_result = _0x70_print
            _0x53__0x50_pipeline_result
        }
        const _0x72_print = await _67lang.maybe_await(console.log("File reading test complete"))
        let _0x55__0x54_pipeline_result = _0x72_print
        _0x55__0x54_pipeline_result

    } 
})();
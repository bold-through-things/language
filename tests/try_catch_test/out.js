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
        return new Set(args);
    },

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
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
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)











        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0x52_print = await _67lang.maybe_await(console.log("Starting execution"))
            let _0x2f__0x2e_pipeline_result = _0x52_print
            _0x2f__0x2e_pipeline_result
            try {
                const _0x53_print = await _67lang.maybe_await(console.log("Inside try block"))
                let _0x31__0x30_pipeline_result = _0x53_print
                _0x31__0x30_pipeline_result
                const _0x54_print = await _67lang.maybe_await(console.log("About to throw"))
                let _0x33__0x32_pipeline_result = _0x54_print
                _0x33__0x32_pipeline_result
                throw "Test error message";
                const _0x55_print = await _67lang.maybe_await(console.log("This should not print"))
                let _0x35__0x34_pipeline_result = _0x55_print
                _0x35__0x34_pipeline_result
            }
            catch (error) {
                let _0x36_error = error
                _0x36_error
                const _0x56_print = await _67lang.maybe_await(console.log("Caught error:"))
                let _0x38__0x37_pipeline_result = _0x56_print
                _0x38__0x37_pipeline_result
                const _0x58_error = _0x36_error
                let _0x3b__0x3a_pipeline_result = _0x58_error
                const _0x57_print = await _67lang.maybe_await(console.log(_0x3b__0x3a_pipeline_result))
                let _0x3c__0x39_pipeline_result = _0x57_print
                _0x3c__0x39_pipeline_result
            }
            finally {
                const _0x59_print = await _67lang.maybe_await(console.log("Finally block executed"))
                let _0x3e__0x3d_pipeline_result = _0x59_print
                _0x3e__0x3d_pipeline_result
                const _0x5a_print = await _67lang.maybe_await(console.log("Many statements"))
                let _0x40__0x3f_pipeline_result = _0x5a_print
                _0x40__0x3f_pipeline_result
            }
            const _0x5b_print = await _67lang.maybe_await(console.log("Execution complete"))
            let _0x42__0x41_pipeline_result = _0x5b_print
            _0x42__0x41_pipeline_result

        }
    } 
})();
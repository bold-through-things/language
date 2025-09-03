
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
    }
}

if (typeof window === "undefined") {
    // Deno environment

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

    _67lang.is_tty = () => Deno.isatty(Deno.stdin.rid);
}



void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0x15_print = await console.log("Starting execution")
            let _0x1__0x0_pipeline_result = _0x15_print
            _0x1__0x0_pipeline_result
            try {
                const _0x16_print = await console.log("Inside try block")
                let _0x3__0x2_pipeline_result = _0x16_print
                _0x3__0x2_pipeline_result
                const _0x17_print = await console.log("About to throw")
                let _0x5__0x4_pipeline_result = _0x17_print
                _0x5__0x4_pipeline_result
                throw "Test error message";
                const _0x18_print = await console.log("This should not print")
                let _0x7__0x6_pipeline_result = _0x18_print
                _0x7__0x6_pipeline_result
            }
            catch (error) {
                let _0x8_error = error
                _0x8_error
                const _0x19_print = await console.log("Caught error:")
                let _0xa__0x9_pipeline_result = _0x19_print
                _0xa__0x9_pipeline_result
                const _0x1b_error = await _0x8_error
                let _0xd__0xc_pipeline_result = _0x1b_error
                const _0x1a_print = await console.log(_0xd__0xc_pipeline_result)
                let _0xe__0xb_pipeline_result = _0x1a_print
                _0xe__0xb_pipeline_result
            }
            finally {
                const _0x1c_print = await console.log("Finally block executed")
                let _0x10__0xf_pipeline_result = _0x1c_print
                _0x10__0xf_pipeline_result
                const _0x1d_print = await console.log("Many statements")
                let _0x12__0x11_pipeline_result = _0x1d_print
                _0x12__0x11_pipeline_result
            }
            const _0x1e_print = await console.log("Execution complete")
            let _0x14__0x13_pipeline_result = _0x1e_print
            _0x14__0x13_pipeline_result

        }
    } 
})();
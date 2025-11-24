
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















        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0x55_print = await console.log("Current working directory:")
            let _0x2f__0x2e_pipeline_result = _0x55_print
            _0x2f__0x2e_pipeline_result
            const _0x57_cwd = await Deno.cwd()
            let _0x32__0x31_pipeline_result = _0x57_cwd
            const _0x56_print = await console.log(_0x32__0x31_pipeline_result)
            let _0x33__0x30_pipeline_result = _0x56_print
            _0x33__0x30_pipeline_result
            const _0x58_print = await console.log("Reading sample.txt:")
            let _0x35__0x34_pipeline_result = _0x58_print
            _0x35__0x34_pipeline_result
            try {
                const _0x59_read_file = await Deno.readTextFile("sample.txt")
                let _0x37__0x36_pipeline_result = _0x59_read_file
                let _0x38_content = _0x37__0x36_pipeline_result
                _0x38_content
                const _0x5b_content = await _0x38_content
                let _0x3b__0x3a_pipeline_result = _0x5b_content
                const _0x5a_print = await console.log(_0x3b__0x3a_pipeline_result)
                let _0x3c__0x39_pipeline_result = _0x5a_print
                _0x3c__0x39_pipeline_result
            }
            catch (error) {
                let _0x3d_error = error
                _0x3d_error
                const _0x5c_print = await console.log("Error reading file:")
                let _0x3f__0x3e_pipeline_result = _0x5c_print
                _0x3f__0x3e_pipeline_result
                const _0x5e_error = await _0x3d_error
                let _0x42__0x41_pipeline_result = _0x5e_error
                const _0x5d_print = await console.log(_0x42__0x41_pipeline_result)
                let _0x43__0x40_pipeline_result = _0x5d_print
                _0x43__0x40_pipeline_result
            }
            const _0x5f_print = await console.log("File reading test complete")
            let _0x45__0x44_pipeline_result = _0x5f_print
            _0x45__0x44_pipeline_result

        }
    } 
})();
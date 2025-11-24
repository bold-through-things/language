
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
            let _0x2e_str = "testing"
            _0x2e_str

            const _0x48_str = await _0x2e_str
            const _0x47_split = await String.prototype.split.call(_0x48_str, "t")
            let _0x31__0x30_pipeline_result = _0x47_split
            const _0x46_print = await console.log(_0x31__0x30_pipeline_result)
            let _0x32__0x2f_pipeline_result = _0x46_print
            _0x32__0x2f_pipeline_result

            const _0x4b_str = await _0x2e_str
            const _0x4a_split = await String.prototype.split.call(_0x4b_str, /t/)
            let _0x35__0x34_pipeline_result = _0x4a_split
            const _0x49_print = await console.log(_0x35__0x34_pipeline_result)
            let _0x36__0x33_pipeline_result = _0x49_print
            _0x36__0x33_pipeline_result
        }
    } 
})();
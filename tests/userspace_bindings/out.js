
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
            let _0x1_test = "test"
            _0x1_test
            const _0x7_test = await _0x1_test
            const _0x6_my_split = await String.prototype.split.call(_0x7_test, "")
            let _0x3__0x2_pipeline_result = _0x6_my_split
            _0x3__0x2_pipeline_result
            const _0x9__0x2_pipeline_result = await _0x3__0x2_pipeline_result
            const _0x8_print = await console.log(_0x9__0x2_pipeline_result)
            let _0x5__0x4_pipeline_result = _0x8_print
            _0x5__0x4_pipeline_result
        }
    } 
})();
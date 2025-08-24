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

            let _0x0_user = {["name"]: "Bob", ["age"]: "30", ["city"]: "New York"}
            _0x0_user
            const _0x17_user = await _0x0_user
            let _0x3__0x2_pipeline_result = _0x17_user
            const _0x16_print = await console.log(_0x3__0x2_pipeline_result)
            let _0x4__0x1_pipeline_result = _0x16_print
            _0x4__0x1_pipeline_result
            const _0x18_new_set = await _67lang.new_set("apple", "banana", "cherry")
            let _0x6__0x5_pipeline_result = _0x18_new_set
            let _0x7_my_set = _0x6__0x5_pipeline_result
            _0x7_my_set
            const _0x1a_my_set = await _0x7_my_set
            let _0xa__0x9_pipeline_result = _0x1a_my_set
            const _0x19_print = await console.log(_0xa__0x9_pipeline_result)
            let _0xb__0x8_pipeline_result = _0x19_print
            _0xb__0x8_pipeline_result
            let _0xc_my_list = [-2, -1, 0, 1, 2, 3]
            _0xc_my_list
            const _0x1c_my_list = await _0xc_my_list
            let _0xf__0xe_pipeline_result = _0x1c_my_list
            const _0x1b_print = await console.log(_0xf__0xe_pipeline_result)
            let _0x10__0xd_pipeline_result = _0x1b_print
            _0x10__0xd_pipeline_result

            let _0x11_simple_list = [1, 2, 3]
            _0x11_simple_list
            const _0x1e_simple_list = await _0x11_simple_list
            let _0x14__0x13_pipeline_result = _0x1e_simple_list
            const _0x1d_print = await console.log(_0x14__0x13_pipeline_result)
            let _0x15__0x12_pipeline_result = _0x1d_print
            _0x15__0x12_pipeline_result
        }
    } 
})();
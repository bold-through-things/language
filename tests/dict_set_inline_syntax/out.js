
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

            let _0x2e_user = {["name"]: "Bob", ["age"]: "30", ["city"]: "New York"}
            _0x2e_user
            const _0x54_user = await _0x2e_user
            let _0x31__0x30_pipeline_result = _0x54_user
            const _0x53_print = await console.log(_0x31__0x30_pipeline_result)
            let _0x32__0x2f_pipeline_result = _0x53_print
            _0x32__0x2f_pipeline_result
            const _0x55_new_set = await _67lang.new_set("apple", "banana", "cherry")
            let _0x34__0x33_pipeline_result = _0x55_new_set
            let _0x35_my_set = _0x34__0x33_pipeline_result
            _0x35_my_set
            const _0x57_my_set = await _0x35_my_set
            let _0x38__0x37_pipeline_result = _0x57_my_set
            const _0x56_print = await console.log(_0x38__0x37_pipeline_result)
            let _0x39__0x36_pipeline_result = _0x56_print
            _0x39__0x36_pipeline_result
            let _0x3a_my_list = [-2, -1, 0, 1, 2, 3]
            _0x3a_my_list
            const _0x59_my_list = await _0x3a_my_list
            let _0x3d__0x3c_pipeline_result = _0x59_my_list
            const _0x58_print = await console.log(_0x3d__0x3c_pipeline_result)
            let _0x3e__0x3b_pipeline_result = _0x58_print
            _0x3e__0x3b_pipeline_result

            let _0x3f_simple_list = [1, 2, 3]
            _0x3f_simple_list
            const _0x5b_simple_list = await _0x3f_simple_list
            let _0x42__0x41_pipeline_result = _0x5b_simple_list
            const _0x5a_print = await console.log(_0x42__0x41_pipeline_result)
            let _0x43__0x40_pipeline_result = _0x5a_print
            _0x43__0x40_pipeline_result
        }
    } 
})();
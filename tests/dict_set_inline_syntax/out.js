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

        let _0x3e_user = {["name"]: "Bob", ["age"]: "30", ["city"]: "New York"}
        _0x3e_user
        const _0x67_user = _0x3e_user
        let _0x41__0x40_pipeline_result = _0x67_user
        const _0x66_print = await _67lang.maybe_await(console.log(_0x41__0x40_pipeline_result))
        let _0x42__0x3f_pipeline_result = _0x66_print
        _0x42__0x3f_pipeline_result
        const _0x68_set = _67lang.new_set("apple", "banana", "cherry")
        let _0x44__0x43_pipeline_result = _0x68_set
        let _0x45_my_set = _0x44__0x43_pipeline_result
        _0x45_my_set
        const _0x6a_my_set = _0x45_my_set
        let _0x48__0x47_pipeline_result = _0x6a_my_set
        const _0x69_print = await _67lang.maybe_await(console.log(_0x48__0x47_pipeline_result))
        let _0x49__0x46_pipeline_result = _0x69_print
        _0x49__0x46_pipeline_result
        let _0x4a_my_list = [-2, -1, 0, 1, 2, 3]
        _0x4a_my_list
        const _0x6c_my_list = _0x4a_my_list
        let _0x4d__0x4c_pipeline_result = _0x6c_my_list
        const _0x6b_print = await _67lang.maybe_await(console.log(_0x4d__0x4c_pipeline_result))
        let _0x4e__0x4b_pipeline_result = _0x6b_print
        _0x4e__0x4b_pipeline_result

        let _0x4f_simple_list = [1, 2, 3]
        _0x4f_simple_list
        const _0x6e_simple_list = _0x4f_simple_list
        let _0x52__0x51_pipeline_result = _0x6e_simple_list
        const _0x6d_print = await _67lang.maybe_await(console.log(_0x52__0x51_pipeline_result))
        let _0x53__0x50_pipeline_result = _0x6d_print
        _0x53__0x50_pipeline_result
    } 
})();
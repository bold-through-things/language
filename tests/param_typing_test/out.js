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
    const _0x3e_process_list = async function (
        my_list
    ) {{
            let _0x3f_my_list = my_list
            _0x3f_my_list


            const _0x64_my_list = _0x3f_my_list
            const _0x63_slice = Array.prototype.slice.call(_0x64_my_list)
            let _0x41__0x40_pipeline_result = _0x63_slice
            let _0x42_copied_list = _0x41__0x40_pipeline_result
            _0x42_copied_list

            const _0x66_copied_list = _0x42_copied_list
            const _0x65_reverse = Array.prototype.reverse.call(_0x66_copied_list)
            let _0x44__0x43_pipeline_result = _0x65_reverse
            _0x44__0x43_pipeline_result
            const _0x67_copied_list = _0x42_copied_list
            let _0x46__0x45_pipeline_result = _0x67_copied_list
            return _0x46__0x45_pipeline_result;
        } }
    {


















    } {

        let _0x47_test_list = ["a", "b", "c"]
        _0x47_test_list
        const _0x69_test_list = _0x47_test_list
        let _0x4a__0x49_pipeline_result = _0x69_test_list
        const _0x68_process_list = await _67lang.maybe_await(_0x3e_process_list(_0x4a__0x49_pipeline_result))
        let _0x4b__0x48_pipeline_result = _0x68_process_list
        let _0x4c_result = _0x4b__0x48_pipeline_result
        _0x4c_result
        const _0x6b_result = _0x4c_result
        let _0x4f__0x4e_pipeline_result = _0x6b_result
        const _0x6a_print = await _67lang.maybe_await(console.log(_0x4f__0x4e_pipeline_result))
        let _0x50__0x4d_pipeline_result = _0x6a_print
        _0x50__0x4d_pipeline_result
    } 
})();
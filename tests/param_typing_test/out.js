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
    const _0x2e_process_list = async function (
        my_list
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                my_list = my_list
                let _0x2f_my_list = my_list
                _0x2f_my_list


                const _0x51_my_list = _0x2f_my_list
                const _0x50_slice = Array.prototype.slice.call(_0x51_my_list)
                let _0x31__0x30_pipeline_result = _0x50_slice
                let _0x32_copied_list = _0x31__0x30_pipeline_result
                _0x32_copied_list

                const _0x53_copied_list = _0x32_copied_list
                const _0x52_reverse = Array.prototype.reverse.call(_0x53_copied_list)
                let _0x34__0x33_pipeline_result = _0x52_reverse
                _0x34__0x33_pipeline_result
                const _0x54_copied_list = _0x32_copied_list
                let _0x36__0x35_pipeline_result = _0x54_copied_list
                return _0x36__0x35_pipeline_result;
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)











        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            let _0x37_test_list = ["a", "b", "c"]
            _0x37_test_list
            const _0x56_test_list = _0x37_test_list
            let _0x3a__0x39_pipeline_result = _0x56_test_list
            const _0x55_process_list = await _67lang.maybe_await(_0x2e_process_list(_0x3a__0x39_pipeline_result))
            let _0x3b__0x38_pipeline_result = _0x55_process_list
            let _0x3c_result = _0x3b__0x38_pipeline_result
            _0x3c_result
            const _0x58_result = _0x3c_result
            let _0x3f__0x3e_pipeline_result = _0x58_result
            const _0x57_print = await _67lang.maybe_await(console.log(_0x3f__0x3e_pipeline_result))
            let _0x40__0x3d_pipeline_result = _0x57_print
            _0x40__0x3d_pipeline_result
        }
    } 
})();
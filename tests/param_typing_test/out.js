
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
    const _0x0_process_list = async function (
        my_list
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                my_list = my_list
                let _0x1_my_list = my_list
                _0x1_my_list


                const _0x14_my_list = await _0x1_my_list
                const _0x13_slice = await Array.prototype.slice.call(_0x14_my_list)
                let _0x3__0x2_pipeline_result = _0x13_slice
                let _0x4_copied_list = _0x3__0x2_pipeline_result
                _0x4_copied_list

                const _0x16_copied_list = await _0x4_copied_list
                const _0x15_reverse = await Array.prototype.reverse.call(_0x16_copied_list)
                let _0x6__0x5_pipeline_result = _0x15_reverse
                _0x6__0x5_pipeline_result
                const _0x17_copied_list = await _0x4_copied_list
                let _0x8__0x7_pipeline_result = _0x17_copied_list
                return _0x8__0x7_pipeline_result;
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            let _0x9_test_list = ["a", "b", "c"]
            _0x9_test_list
            const _0x19_test_list = await _0x9_test_list
            let _0xc__0xb_pipeline_result = _0x19_test_list
            const _0x18_process_list = await _0x0_process_list(_0xc__0xb_pipeline_result)
            let _0xd__0xa_pipeline_result = _0x18_process_list
            let _0xe_result = _0xd__0xa_pipeline_result
            _0xe_result
            const _0x1b_result = await _0xe_result
            let _0x11__0x10_pipeline_result = _0x1b_result
            const _0x1a_print = await console.log(_0x11__0x10_pipeline_result)
            let _0x12__0xf_pipeline_result = _0x1a_print
            _0x12__0xf_pipeline_result
        }
    } 
})();
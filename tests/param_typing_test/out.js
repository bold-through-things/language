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


                const _0x13_my_list = await my_list
                const _0x12_slice = await Array.prototype.slice.call(_0x13_my_list)
                let _0x2__0x1_pipeline_result = _0x12_slice
                let _0x3_copied_list = _0x2__0x1_pipeline_result
                _0x3_copied_list

                const _0x15_copied_list = await _0x3_copied_list
                const _0x14_reverse = await Array.prototype.reverse.call(_0x15_copied_list)
                let _0x5__0x4_pipeline_result = _0x14_reverse
                _0x5__0x4_pipeline_result
                const _0x16_copied_list = await _0x3_copied_list
                let _0x7__0x6_pipeline_result = _0x16_copied_list
                return _0x7__0x6_pipeline_result;
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            let _0x8_test_list = ["a", "b", "c"]
            _0x8_test_list
            const _0x18_test_list = await _0x8_test_list
            let _0xb__0xa_pipeline_result = _0x18_test_list
            const _0x17_process_list = await _0x0_process_list(_0xb__0xa_pipeline_result)
            let _0xc__0x9_pipeline_result = _0x17_process_list
            let _0xd_result = _0xc__0x9_pipeline_result
            _0xd_result
            const _0x1a_result = await _0xd_result
            let _0x10__0xf_pipeline_result = _0x1a_result
            const _0x19_print = await console.log(_0x10__0xf_pipeline_result)
            let _0x11__0xe_pipeline_result = _0x19_print
            _0x11__0xe_pipeline_result
        }
    } 
})();
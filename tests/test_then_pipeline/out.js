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


            let _0x0_phrase = "hello world"
            _0x0_phrase

            let _0x1_final_count = "0"
            _0x1_final_count
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)

                    const _0xb_phrase = await _0x0_phrase
                    let _0x3__0x2_pipeline_result = _0xb_phrase
                    _0x3__0x2_pipeline_result
                    const _0xd__0x2_pipeline_result = await _0x3__0x2_pipeline_result
                    const _0xc_split = await String.prototype.split.call(_0xd__0x2_pipeline_result, " ")
                    let _0x5__0x4_pipeline_result = _0xc_split
                    _0x5__0x4_pipeline_result
                    const _0xf__0x4_pipeline_result = await _0x5__0x4_pipeline_result
                    const _0xe_length = await (_0xf__0x4_pipeline_result.length)
                    let _0x6_words = _0xe_length
                    _0x6_words
                    const _0x12_words = await _0x6_words
                    const _0x11_toString = await Number.prototype.toString.call(_0x12_words)
                    const _0x10_final_count = await (_0x1_final_count = _0x11_toString)
                    _0x10_final_count
                }
            } 

            const _0x14_final_count = await _0x1_final_count
            let _0x9__0x8_pipeline_result = _0x14_final_count
            const _0x13_print = await console.log(_0x9__0x8_pipeline_result)
            let _0xa__0x7_pipeline_result = _0x13_print
            _0xa__0x7_pipeline_result
        }
    } 
})();
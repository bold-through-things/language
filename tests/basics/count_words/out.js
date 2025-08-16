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
            const _0x27_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x27_stdin
            let _0x2_input = _0x1__0x0_pipeline_result
            _0x2_input
            const _0x29_input = await _0x2_input
            const _0x28_split = await String.prototype.split.call(_0x29_input, "\n")
            let _0x4__0x3_pipeline_result = _0x28_split
            let _0x5_words = _0x4__0x3_pipeline_result
            _0x5_words
            let _0x6_count = {}
            _0x6_count
            const _0x2a_words = await _0x5_words
            let _0x8__0x7_pipeline_result = _0x2a_words

            const _0x2b_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x2b_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x2d_count = await _0x6_count
                        let _0xd__0xc_pipeline_result = _0x2d_count
                        const _0x2e_word = await word
                        let _0xb__0xa_pipeline_result = _0x2e_word
                        const _0x2f_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0xd__0xc_pipeline_result, _0xb__0xa_pipeline_result)
                        const _0x2c_none = await !(_0x2f_await__67lang_dot_exists_inside_lp_)
                        let _0xe__0x9_pipeline_result = _0x2c_none
                        if (_0xe__0x9_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x31_count = await _0x6_count
                                let _0x11__0x10_pipeline_result = _0x31_count
                                const _0x32_word = await word
                                let _0x13__0x12_pipeline_result = _0x32_word
                                const _0x30__hash_ = await (_0x11__0x10_pipeline_result[_0x13__0x12_pipeline_result] = 0)
                                let _0x14__0xf_pipeline_result = _0x30__hash_
                                _0x14__0xf_pipeline_result
                            }
                        } 

                        const _0x34_count = await _0x6_count
                        let _0x17__0x16_pipeline_result = _0x34_count
                        const _0x35_word = await word
                        let _0x19__0x18_pipeline_result = _0x35_word
                        const _0x38_count = await _0x6_count
                        let _0x1d__0x1c_pipeline_result = _0x38_count
                        const _0x39_word = await word
                        let _0x1f__0x1e_pipeline_result = _0x39_word
                        const _0x37__hash_ = await _0x1d__0x1c_pipeline_result[_0x1f__0x1e_pipeline_result]
                        let _0x20__0x1b_pipeline_result = _0x37__hash_
                        const _0x36_add = await (1 + _0x20__0x1b_pipeline_result)
                        let _0x21__0x1a_pipeline_result = _0x36_add
                        const _0x33__hash_ = await (_0x17__0x16_pipeline_result[_0x19__0x18_pipeline_result] = _0x21__0x1a_pipeline_result)
                        let _0x22__0x15_pipeline_result = _0x33__hash_
                        _0x22__0x15_pipeline_result
                    }
                } }
            const _0x3b_count = await _0x6_count
            let _0x25__0x24_pipeline_result = _0x3b_count
            const _0x3a_print = await console.log(_0x25__0x24_pipeline_result)
            let _0x26__0x23_pipeline_result = _0x3a_print
            _0x26__0x23_pipeline_result
        }
    } 
})();
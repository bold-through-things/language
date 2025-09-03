
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
            const _0x3a_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x3a_stdin
            let _0x2_input = _0x1__0x0_pipeline_result
            _0x2_input
            const _0x3c_input = await _0x2_input
            const _0x3b_split = await String.prototype.split.call(_0x3c_input, "\n")
            let _0x4__0x3_pipeline_result = _0x3b_split
            let _0x5_words = _0x4__0x3_pipeline_result
            _0x5_words
            let _0x6_count = {}
            _0x6_count
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x9__0x7_for_word__index = 0
                    _0x9__0x7_for_word__index
                    const _0x3d_words = await _0x5_words
                    let _0xb__0xa_pipeline_result = _0x3d_words
                    let _0xc__0x8_for_word__list = _0xb__0xa_pipeline_result
                    _0xc__0x8_for_word__list
                    while(true) {
                        const _0x3f__0x7_for_word__index = await _0x9__0x7_for_word__index
                        let _0xf__0xe_pipeline_result = _0x3f__0x7_for_word__index
                        const _0x41__0x8_for_word__list = await _0xc__0x8_for_word__list
                        const _0x40_length = await (_0x41__0x8_for_word__list.length)
                        let _0x11__0x10_pipeline_result = _0x40_length
                        const _0x3e_asc = await (_0xf__0xe_pipeline_result < _0x11__0x10_pipeline_result)
                        let _0x12__0xd_pipeline_result = _0x3e_asc
                        if (!_0x12__0xd_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x43__0x8_for_word__list = await _0xc__0x8_for_word__list
                                const _0x44__0x7_for_word__index = await _0x9__0x7_for_word__index
                                let _0x15__0x14_pipeline_result = _0x44__0x7_for_word__index
                                const _0x42__hash_ = await _0x43__0x8_for_word__list[_0x15__0x14_pipeline_result]
                                let _0x16__0x13_pipeline_result = _0x42__hash_
                                let _0x17_word = _0x16__0x13_pipeline_result
                                _0x17_word
                                const _0x47__0x7_for_word__index = await _0x9__0x7_for_word__index
                                const _0x46_add = await (_0x47__0x7_for_word__index + 1)
                                let _0x1a__0x19_pipeline_result = _0x46_add
                                const _0x45__0x7_for_word__index = await (_0x9__0x7_for_word__index = _0x1a__0x19_pipeline_result)
                                let _0x1b__0x18_pipeline_result = _0x45__0x7_for_word__index
                                _0x1b__0x18_pipeline_result
                                const _0x49_count = await _0x6_count
                                let _0x20__0x1f_pipeline_result = _0x49_count
                                const _0x4a_word = await _0x17_word
                                let _0x1e__0x1d_pipeline_result = _0x4a_word
                                const _0x4b_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x20__0x1f_pipeline_result, _0x1e__0x1d_pipeline_result)
                                const _0x48_none = await !(_0x4b_await__67lang_dot_exists_inside_lp_)
                                let _0x21__0x1c_pipeline_result = _0x48_none
                                if (_0x21__0x1c_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x4d_count = await _0x6_count
                                        let _0x24__0x23_pipeline_result = _0x4d_count
                                        const _0x4e_word = await _0x17_word
                                        let _0x26__0x25_pipeline_result = _0x4e_word
                                        const _0x4c__hash_ = await (_0x24__0x23_pipeline_result[_0x26__0x25_pipeline_result] = 0)
                                        let _0x27__0x22_pipeline_result = _0x4c__hash_
                                        _0x27__0x22_pipeline_result
                                    }
                                } 

                                const _0x50_count = await _0x6_count
                                let _0x2a__0x29_pipeline_result = _0x50_count
                                const _0x51_word = await _0x17_word
                                let _0x2c__0x2b_pipeline_result = _0x51_word
                                const _0x54_count = await _0x6_count
                                let _0x30__0x2f_pipeline_result = _0x54_count
                                const _0x55_word = await _0x17_word
                                let _0x32__0x31_pipeline_result = _0x55_word
                                const _0x53__hash_ = await _0x30__0x2f_pipeline_result[_0x32__0x31_pipeline_result]
                                let _0x33__0x2e_pipeline_result = _0x53__hash_
                                const _0x52_add = await (1 + _0x33__0x2e_pipeline_result)
                                let _0x34__0x2d_pipeline_result = _0x52_add
                                const _0x4f__hash_ = await (_0x2a__0x29_pipeline_result[_0x2c__0x2b_pipeline_result] = _0x34__0x2d_pipeline_result)
                                let _0x35__0x28_pipeline_result = _0x4f__hash_
                                _0x35__0x28_pipeline_result
                            }
                        } }
                }
            } 
            const _0x57_count = await _0x6_count
            let _0x38__0x37_pipeline_result = _0x57_count
            const _0x56_print = await console.log(_0x38__0x37_pipeline_result)
            let _0x39__0x36_pipeline_result = _0x56_print
            _0x39__0x36_pipeline_result
        }
    } 
})();

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
            const _0x52_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x52_stdin
            let _0x2_input = _0x1__0x0_pipeline_result
            _0x2_input
            const _0x54_input = await _0x2_input
            const _0x53_split = await String.prototype.split.call(_0x54_input, "\n")
            let _0x4__0x3_pipeline_result = _0x53_split
            let _0x5_words = _0x4__0x3_pipeline_result
            _0x5_words
            let _0x6_groups = {}
            _0x6_groups
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x9__0x7_for_word__index = 0
                    _0x9__0x7_for_word__index
                    const _0x55_words = await _0x5_words
                    let _0xb__0xa_pipeline_result = _0x55_words
                    let _0xc__0x8_for_word__list = _0xb__0xa_pipeline_result
                    _0xc__0x8_for_word__list
                    while(true) {
                        const _0x57__0x7_for_word__index = await _0x9__0x7_for_word__index
                        let _0xf__0xe_pipeline_result = _0x57__0x7_for_word__index
                        const _0x59__0x8_for_word__list = await _0xc__0x8_for_word__list
                        const _0x58_length = await (_0x59__0x8_for_word__list.length)
                        let _0x11__0x10_pipeline_result = _0x58_length
                        const _0x56_asc = await (_0xf__0xe_pipeline_result < _0x11__0x10_pipeline_result)
                        let _0x12__0xd_pipeline_result = _0x56_asc
                        if (!_0x12__0xd_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x5b__0x8_for_word__list = await _0xc__0x8_for_word__list
                                const _0x5c__0x7_for_word__index = await _0x9__0x7_for_word__index
                                let _0x15__0x14_pipeline_result = _0x5c__0x7_for_word__index
                                const _0x5a__hash_ = await _0x5b__0x8_for_word__list[_0x15__0x14_pipeline_result]
                                let _0x16__0x13_pipeline_result = _0x5a__hash_
                                let _0x17_word = _0x16__0x13_pipeline_result
                                _0x17_word
                                const _0x5f__0x7_for_word__index = await _0x9__0x7_for_word__index
                                const _0x5e_add = await (_0x5f__0x7_for_word__index + 1)
                                let _0x1a__0x19_pipeline_result = _0x5e_add
                                const _0x5d__0x7_for_word__index = await (_0x9__0x7_for_word__index = _0x1a__0x19_pipeline_result)
                                let _0x1b__0x18_pipeline_result = _0x5d__0x7_for_word__index
                                _0x1b__0x18_pipeline_result
                                const _0x61_word = await _0x17_word
                                const _0x60_split = await String.prototype.split.call(_0x61_word, "")
                                let _0x1d__0x1c_pipeline_result = _0x60_split
                                _0x1d__0x1c_pipeline_result
                                const _0x63__0x1c_pipeline_result = await _0x1d__0x1c_pipeline_result
                                const _0x62_sort = await Array.prototype.sort.call(_0x63__0x1c_pipeline_result)
                                let _0x1f__0x1e_pipeline_result = _0x62_sort
                                _0x1f__0x1e_pipeline_result
                                const _0x65__0x1e_pipeline_result = await _0x1f__0x1e_pipeline_result
                                const _0x64_join = await Array.prototype.join.call(_0x65__0x1e_pipeline_result, "")
                                let _0x20_key = _0x64_join
                                _0x20_key



                                const _0x67_groups = await _0x6_groups
                                let _0x25__0x24_pipeline_result = _0x67_groups
                                const _0x68_key = await _0x20_key
                                let _0x23__0x22_pipeline_result = _0x68_key
                                const _0x69_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x25__0x24_pipeline_result, _0x23__0x22_pipeline_result)
                                const _0x66_none = await !(_0x69_await__67lang_dot_exists_inside_lp_)
                                let _0x26__0x21_pipeline_result = _0x66_none
                                if (_0x26__0x21_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x6b_groups = await _0x6_groups
                                        let _0x29__0x28_pipeline_result = _0x6b_groups
                                        const _0x6c_key = await _0x20_key
                                        let _0x2b__0x2a_pipeline_result = _0x6c_key
                                        const _0x6a__hash_ = await (_0x29__0x28_pipeline_result[_0x2b__0x2a_pipeline_result] = [])
                                        let _0x2c__0x27_pipeline_result = _0x6a__hash_
                                        _0x2c__0x27_pipeline_result
                                    }
                                } 
                                const _0x6e_groups = await _0x6_groups
                                let _0x2f__0x2e_pipeline_result = _0x6e_groups
                                const _0x6f_key = await _0x20_key
                                let _0x31__0x30_pipeline_result = _0x6f_key
                                const _0x6d__hash_ = await _0x2f__0x2e_pipeline_result[_0x31__0x30_pipeline_result]
                                let _0x32__0x2d_pipeline_result = _0x6d__hash_
                                _0x32__0x2d_pipeline_result
                                const _0x71__0x2d_pipeline_result = await _0x32__0x2d_pipeline_result
                                const _0x72_word = await _0x17_word
                                let _0x35__0x34_pipeline_result = _0x72_word
                                const _0x70_push = await Array.prototype.push.call(_0x71__0x2d_pipeline_result, _0x35__0x34_pipeline_result)
                                let _0x36__0x33_pipeline_result = _0x70_push
                                _0x36__0x33_pipeline_result
                            }
                        } }
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x39__0x37_for_group__index = 0
                    _0x39__0x37_for_group__index
                    const _0x74_groups = await _0x6_groups
                    const _0x73_values = await Object.values(_0x74_groups)
                    let _0x3b__0x3a_pipeline_result = _0x73_values
                    let _0x3c__0x38_for_group__list = _0x3b__0x3a_pipeline_result
                    _0x3c__0x38_for_group__list
                    while(true) {
                        const _0x76__0x37_for_group__index = await _0x39__0x37_for_group__index
                        let _0x3f__0x3e_pipeline_result = _0x76__0x37_for_group__index
                        const _0x78__0x38_for_group__list = await _0x3c__0x38_for_group__list
                        const _0x77_length = await (_0x78__0x38_for_group__list.length)
                        let _0x41__0x40_pipeline_result = _0x77_length
                        const _0x75_asc = await (_0x3f__0x3e_pipeline_result < _0x41__0x40_pipeline_result)
                        let _0x42__0x3d_pipeline_result = _0x75_asc
                        if (!_0x42__0x3d_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x7a__0x38_for_group__list = await _0x3c__0x38_for_group__list
                                const _0x7b__0x37_for_group__index = await _0x39__0x37_for_group__index
                                let _0x45__0x44_pipeline_result = _0x7b__0x37_for_group__index
                                const _0x79__hash_ = await _0x7a__0x38_for_group__list[_0x45__0x44_pipeline_result]
                                let _0x46__0x43_pipeline_result = _0x79__hash_
                                let _0x47_group = _0x46__0x43_pipeline_result
                                _0x47_group
                                const _0x7e__0x37_for_group__index = await _0x39__0x37_for_group__index
                                const _0x7d_add = await (_0x7e__0x37_for_group__index + 1)
                                let _0x4a__0x49_pipeline_result = _0x7d_add
                                const _0x7c__0x37_for_group__index = await (_0x39__0x37_for_group__index = _0x4a__0x49_pipeline_result)
                                let _0x4b__0x48_pipeline_result = _0x7c__0x37_for_group__index
                                _0x4b__0x48_pipeline_result
                                const _0x81_group = await _0x47_group
                                let _0x4f__0x4e_pipeline_result = _0x81_group
                                const _0x80_join = await Array.prototype.join.call(_0x4f__0x4e_pipeline_result, " ")
                                let _0x50__0x4d_pipeline_result = _0x80_join
                                const _0x7f_print = await console.log(_0x50__0x4d_pipeline_result)
                                let _0x51__0x4c_pipeline_result = _0x7f_print
                                _0x51__0x4c_pipeline_result
                            }
                        } }
                }
            } 
        }
    } 
})();
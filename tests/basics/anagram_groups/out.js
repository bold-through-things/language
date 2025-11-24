
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
            const _0x8f_stdin = await _67lang.stdin()
            let _0x2f__0x2e_pipeline_result = _0x8f_stdin
            let _0x30_input = _0x2f__0x2e_pipeline_result
            _0x30_input
            const _0x91_input = await _0x30_input
            const _0x90_split = await String.prototype.split.call(_0x91_input, "\n")
            let _0x32__0x31_pipeline_result = _0x90_split
            let _0x33_words = _0x32__0x31_pipeline_result
            _0x33_words
            let _0x34_groups = {}
            _0x34_groups
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x37__0x35_for_word__index = 0
                    _0x37__0x35_for_word__index
                    const _0x92_words = await _0x33_words
                    let _0x39__0x38_pipeline_result = _0x92_words
                    let _0x3a__0x36_for_word__list = _0x39__0x38_pipeline_result
                    _0x3a__0x36_for_word__list
                    while(true) {
                        const _0x94__0x35_for_word__index = await _0x37__0x35_for_word__index
                        let _0x3d__0x3c_pipeline_result = _0x94__0x35_for_word__index
                        const _0x96__0x36_for_word__list = await _0x3a__0x36_for_word__list
                        const _0x95_length = await (_0x96__0x36_for_word__list.length)
                        let _0x3f__0x3e_pipeline_result = _0x95_length
                        const _0x93_asc = await (_0x3d__0x3c_pipeline_result < _0x3f__0x3e_pipeline_result)
                        let _0x40__0x3b_pipeline_result = _0x93_asc
                        if (!_0x40__0x3b_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x98__0x36_for_word__list = await _0x3a__0x36_for_word__list
                                const _0x99__0x35_for_word__index = await _0x37__0x35_for_word__index
                                let _0x43__0x42_pipeline_result = _0x99__0x35_for_word__index
                                const _0x97__hash_ = await _0x98__0x36_for_word__list[_0x43__0x42_pipeline_result]
                                let _0x44__0x41_pipeline_result = _0x97__hash_
                                let _0x45_word = _0x44__0x41_pipeline_result
                                _0x45_word
                                const _0x9c__0x35_for_word__index = await _0x37__0x35_for_word__index
                                const _0x9b_add = await (_0x9c__0x35_for_word__index + 1)
                                let _0x48__0x47_pipeline_result = _0x9b_add
                                const _0x9a__0x35_for_word__index = await (_0x37__0x35_for_word__index = _0x48__0x47_pipeline_result)
                                let _0x49__0x46_pipeline_result = _0x9a__0x35_for_word__index
                                _0x49__0x46_pipeline_result
                                const _0x9e_word = await _0x45_word
                                const _0x9d_split = await String.prototype.split.call(_0x9e_word, "")
                                let _0x4b__0x4a_pipeline_result = _0x9d_split
                                _0x4b__0x4a_pipeline_result
                                const _0xa0__0x4a_pipeline_result = await _0x4b__0x4a_pipeline_result
                                const _0x9f_sort = await Array.prototype.sort.call(_0xa0__0x4a_pipeline_result)
                                let _0x4d__0x4c_pipeline_result = _0x9f_sort
                                _0x4d__0x4c_pipeline_result
                                const _0xa2__0x4c_pipeline_result = await _0x4d__0x4c_pipeline_result
                                const _0xa1_join = await Array.prototype.join.call(_0xa2__0x4c_pipeline_result, "")
                                let _0x4e_key = _0xa1_join
                                _0x4e_key



                                const _0xa4_groups = await _0x34_groups
                                let _0x53__0x52_pipeline_result = _0xa4_groups
                                const _0xa5_key = await _0x4e_key
                                let _0x51__0x50_pipeline_result = _0xa5_key
                                const _0xa6_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x53__0x52_pipeline_result, _0x51__0x50_pipeline_result)
                                const _0xa3_none = await !(_0xa6_await__67lang_dot_exists_inside_lp_)
                                let _0x54__0x4f_pipeline_result = _0xa3_none
                                if (_0x54__0x4f_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xa8_groups = await _0x34_groups
                                        let _0x57__0x56_pipeline_result = _0xa8_groups
                                        const _0xa9_key = await _0x4e_key
                                        let _0x59__0x58_pipeline_result = _0xa9_key
                                        const _0xa7__hash_ = await (_0x57__0x56_pipeline_result[_0x59__0x58_pipeline_result] = [])
                                        let _0x5a__0x55_pipeline_result = _0xa7__hash_
                                        _0x5a__0x55_pipeline_result
                                    }
                                } 
                                const _0xab_groups = await _0x34_groups
                                let _0x5d__0x5c_pipeline_result = _0xab_groups
                                const _0xac_key = await _0x4e_key
                                let _0x5f__0x5e_pipeline_result = _0xac_key
                                const _0xaa__hash_ = await _0x5d__0x5c_pipeline_result[_0x5f__0x5e_pipeline_result]
                                let _0x60__0x5b_pipeline_result = _0xaa__hash_
                                _0x60__0x5b_pipeline_result
                                const _0xae__0x5b_pipeline_result = await _0x60__0x5b_pipeline_result
                                const _0xaf_word = await _0x45_word
                                let _0x63__0x62_pipeline_result = _0xaf_word
                                const _0xad_push = await Array.prototype.push.call(_0xae__0x5b_pipeline_result, _0x63__0x62_pipeline_result)
                                let _0x64__0x61_pipeline_result = _0xad_push
                                _0x64__0x61_pipeline_result
                            }
                        } }
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x67__0x65_for_group__index = 0
                    _0x67__0x65_for_group__index
                    const _0xb1_groups = await _0x34_groups
                    const _0xb0_values = await Object.values(_0xb1_groups)
                    let _0x69__0x68_pipeline_result = _0xb0_values
                    let _0x6a__0x66_for_group__list = _0x69__0x68_pipeline_result
                    _0x6a__0x66_for_group__list
                    while(true) {
                        const _0xb3__0x65_for_group__index = await _0x67__0x65_for_group__index
                        let _0x6d__0x6c_pipeline_result = _0xb3__0x65_for_group__index
                        const _0xb5__0x66_for_group__list = await _0x6a__0x66_for_group__list
                        const _0xb4_length = await (_0xb5__0x66_for_group__list.length)
                        let _0x6f__0x6e_pipeline_result = _0xb4_length
                        const _0xb2_asc = await (_0x6d__0x6c_pipeline_result < _0x6f__0x6e_pipeline_result)
                        let _0x70__0x6b_pipeline_result = _0xb2_asc
                        if (!_0x70__0x6b_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xb7__0x66_for_group__list = await _0x6a__0x66_for_group__list
                                const _0xb8__0x65_for_group__index = await _0x67__0x65_for_group__index
                                let _0x73__0x72_pipeline_result = _0xb8__0x65_for_group__index
                                const _0xb6__hash_ = await _0xb7__0x66_for_group__list[_0x73__0x72_pipeline_result]
                                let _0x74__0x71_pipeline_result = _0xb6__hash_
                                let _0x75_group = _0x74__0x71_pipeline_result
                                _0x75_group
                                const _0xbb__0x65_for_group__index = await _0x67__0x65_for_group__index
                                const _0xba_add = await (_0xbb__0x65_for_group__index + 1)
                                let _0x78__0x77_pipeline_result = _0xba_add
                                const _0xb9__0x65_for_group__index = await (_0x67__0x65_for_group__index = _0x78__0x77_pipeline_result)
                                let _0x79__0x76_pipeline_result = _0xb9__0x65_for_group__index
                                _0x79__0x76_pipeline_result
                                const _0xbe_group = await _0x75_group
                                let _0x7d__0x7c_pipeline_result = _0xbe_group
                                const _0xbd_join = await Array.prototype.join.call(_0x7d__0x7c_pipeline_result, " ")
                                let _0x7e__0x7b_pipeline_result = _0xbd_join
                                const _0xbc_print = await console.log(_0x7e__0x7b_pipeline_result)
                                let _0x7f__0x7a_pipeline_result = _0xbc_print
                                _0x7f__0x7a_pipeline_result
                            }
                        } }
                }
            } 
        }
    } 
})();
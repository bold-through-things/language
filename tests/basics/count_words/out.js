
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
            const _0x77_stdin = await _67lang.stdin()
            let _0x2f__0x2e_pipeline_result = _0x77_stdin
            let _0x30_input = _0x2f__0x2e_pipeline_result
            _0x30_input
            const _0x79_input = await _0x30_input
            const _0x78_split = await String.prototype.split.call(_0x79_input, "\n")
            let _0x32__0x31_pipeline_result = _0x78_split
            let _0x33_words = _0x32__0x31_pipeline_result
            _0x33_words
            let _0x34_count = {}
            _0x34_count
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x37__0x35_for_word__index = 0
                    _0x37__0x35_for_word__index
                    const _0x7a_words = await _0x33_words
                    let _0x39__0x38_pipeline_result = _0x7a_words
                    let _0x3a__0x36_for_word__list = _0x39__0x38_pipeline_result
                    _0x3a__0x36_for_word__list
                    while(true) {
                        const _0x7c__0x35_for_word__index = await _0x37__0x35_for_word__index
                        let _0x3d__0x3c_pipeline_result = _0x7c__0x35_for_word__index
                        const _0x7e__0x36_for_word__list = await _0x3a__0x36_for_word__list
                        const _0x7d_length = await (_0x7e__0x36_for_word__list.length)
                        let _0x3f__0x3e_pipeline_result = _0x7d_length
                        const _0x7b_asc = await (_0x3d__0x3c_pipeline_result < _0x3f__0x3e_pipeline_result)
                        let _0x40__0x3b_pipeline_result = _0x7b_asc
                        if (!_0x40__0x3b_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x80__0x36_for_word__list = await _0x3a__0x36_for_word__list
                                const _0x81__0x35_for_word__index = await _0x37__0x35_for_word__index
                                let _0x43__0x42_pipeline_result = _0x81__0x35_for_word__index
                                const _0x7f__hash_ = await _0x80__0x36_for_word__list[_0x43__0x42_pipeline_result]
                                let _0x44__0x41_pipeline_result = _0x7f__hash_
                                let _0x45_word = _0x44__0x41_pipeline_result
                                _0x45_word
                                const _0x84__0x35_for_word__index = await _0x37__0x35_for_word__index
                                const _0x83_add = await (_0x84__0x35_for_word__index + 1)
                                let _0x48__0x47_pipeline_result = _0x83_add
                                const _0x82__0x35_for_word__index = await (_0x37__0x35_for_word__index = _0x48__0x47_pipeline_result)
                                let _0x49__0x46_pipeline_result = _0x82__0x35_for_word__index
                                _0x49__0x46_pipeline_result
                                const _0x86_count = await _0x34_count
                                let _0x4e__0x4d_pipeline_result = _0x86_count
                                const _0x87_word = await _0x45_word
                                let _0x4c__0x4b_pipeline_result = _0x87_word
                                const _0x88_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x4e__0x4d_pipeline_result, _0x4c__0x4b_pipeline_result)
                                const _0x85_none = await !(_0x88_await__67lang_dot_exists_inside_lp_)
                                let _0x4f__0x4a_pipeline_result = _0x85_none
                                if (_0x4f__0x4a_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x8a_count = await _0x34_count
                                        let _0x52__0x51_pipeline_result = _0x8a_count
                                        const _0x8b_word = await _0x45_word
                                        let _0x54__0x53_pipeline_result = _0x8b_word
                                        const _0x89__hash_ = await (_0x52__0x51_pipeline_result[_0x54__0x53_pipeline_result] = 0)
                                        let _0x55__0x50_pipeline_result = _0x89__hash_
                                        _0x55__0x50_pipeline_result
                                    }
                                } 

                                const _0x8d_count = await _0x34_count
                                let _0x58__0x57_pipeline_result = _0x8d_count
                                const _0x8e_word = await _0x45_word
                                let _0x5a__0x59_pipeline_result = _0x8e_word
                                const _0x91_count = await _0x34_count
                                let _0x5e__0x5d_pipeline_result = _0x91_count
                                const _0x92_word = await _0x45_word
                                let _0x60__0x5f_pipeline_result = _0x92_word
                                const _0x90__hash_ = await _0x5e__0x5d_pipeline_result[_0x60__0x5f_pipeline_result]
                                let _0x61__0x5c_pipeline_result = _0x90__hash_
                                const _0x8f_add = await (1 + _0x61__0x5c_pipeline_result)
                                let _0x62__0x5b_pipeline_result = _0x8f_add
                                const _0x8c__hash_ = await (_0x58__0x57_pipeline_result[_0x5a__0x59_pipeline_result] = _0x62__0x5b_pipeline_result)
                                let _0x63__0x56_pipeline_result = _0x8c__hash_
                                _0x63__0x56_pipeline_result
                            }
                        } }
                }
            } 
            const _0x94_count = await _0x34_count
            let _0x66__0x65_pipeline_result = _0x94_count
            const _0x93_print = await console.log(_0x66__0x65_pipeline_result)
            let _0x67__0x64_pipeline_result = _0x93_print
            _0x67__0x64_pipeline_result
        }
    } 
})();
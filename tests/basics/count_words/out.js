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
    {


















    } {
        const _0x8a_stdin = await (_67lang.stdin())
        let _0x3f__0x3e_pipeline_result = _0x8a_stdin
        let _0x40_input = _0x3f__0x3e_pipeline_result
        _0x40_input
        const _0x8c_input = _0x40_input
        const _0x8b_split = String.prototype.split.call(_0x8c_input, "\n")
        let _0x42__0x41_pipeline_result = _0x8b_split
        let _0x43_words = _0x42__0x41_pipeline_result
        _0x43_words
        let _0x44_count = {}
        _0x44_count
        {
            let _0x47__0x45_for_word__index = 0
            _0x47__0x45_for_word__index
            const _0x8d_words = _0x43_words
            let _0x49__0x48_pipeline_result = _0x8d_words
            let _0x4a__0x46_for_word__list = _0x49__0x48_pipeline_result
            _0x4a__0x46_for_word__list
            while(true) {
                const _0x8f__0x45_for_word__index = _0x47__0x45_for_word__index
                let _0x4d__0x4c_pipeline_result = _0x8f__0x45_for_word__index
                const _0x91__0x46_for_word__list = _0x4a__0x46_for_word__list
                const _0x90_length = (_0x91__0x46_for_word__list.length)
                let _0x4f__0x4e_pipeline_result = _0x90_length
                const _0x8e_asc = (_0x4d__0x4c_pipeline_result < _0x4f__0x4e_pipeline_result)
                let _0x50__0x4b_pipeline_result = _0x8e_asc
                if (!_0x50__0x4b_pipeline_result) { break; }
                {
                    const _0x93__0x46_for_word__list = _0x4a__0x46_for_word__list
                    const _0x94__0x45_for_word__index = _0x47__0x45_for_word__index
                    let _0x53__0x52_pipeline_result = _0x94__0x45_for_word__index
                    const _0x92__hash_ = _0x93__0x46_for_word__list[_0x53__0x52_pipeline_result]
                    let _0x54__0x51_pipeline_result = _0x92__hash_
                    let _0x55_word = _0x54__0x51_pipeline_result
                    _0x55_word
                    const _0x97__0x45_for_word__index = _0x47__0x45_for_word__index
                    const _0x96_add = (_0x97__0x45_for_word__index + 1)
                    let _0x58__0x57_pipeline_result = _0x96_add
                    const _0x95__0x45_for_word__index = (_0x47__0x45_for_word__index = _0x58__0x57_pipeline_result)
                    let _0x59__0x56_pipeline_result = _0x95__0x45_for_word__index
                    _0x59__0x56_pipeline_result
                    const _0x99_count = _0x44_count
                    let _0x5e__0x5d_pipeline_result = _0x99_count
                    const _0x9a_word = _0x55_word
                    let _0x5c__0x5b_pipeline_result = _0x9a_word
                    const _0x9b_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x5e__0x5d_pipeline_result, _0x5c__0x5b_pipeline_result)
                    const _0x98_none = !(_0x9b_await__67lang_dot_exists_inside_lp_)
                    let _0x5f__0x5a_pipeline_result = _0x98_none
                    if (_0x5f__0x5a_pipeline_result)
                    {
                        const _0x9d_count = _0x44_count
                        let _0x62__0x61_pipeline_result = _0x9d_count
                        const _0x9e_word = _0x55_word
                        let _0x64__0x63_pipeline_result = _0x9e_word
                        const _0x9c__hash_ = (_0x62__0x61_pipeline_result[_0x64__0x63_pipeline_result] = 0)
                        let _0x65__0x60_pipeline_result = _0x9c__hash_
                        _0x65__0x60_pipeline_result
                    } 

                    const _0xa0_count = _0x44_count
                    let _0x68__0x67_pipeline_result = _0xa0_count
                    const _0xa1_word = _0x55_word
                    let _0x6a__0x69_pipeline_result = _0xa1_word
                    const _0xa4_count = _0x44_count
                    let _0x6e__0x6d_pipeline_result = _0xa4_count
                    const _0xa5_word = _0x55_word
                    let _0x70__0x6f_pipeline_result = _0xa5_word
                    const _0xa3__hash_ = _0x6e__0x6d_pipeline_result[_0x70__0x6f_pipeline_result]
                    let _0x71__0x6c_pipeline_result = _0xa3__hash_
                    const _0xa2_add = (1 + _0x71__0x6c_pipeline_result)
                    let _0x72__0x6b_pipeline_result = _0xa2_add
                    const _0x9f__hash_ = (_0x68__0x67_pipeline_result[_0x6a__0x69_pipeline_result] = _0x72__0x6b_pipeline_result)
                    let _0x73__0x66_pipeline_result = _0x9f__hash_
                    _0x73__0x66_pipeline_result
                } }
        } 
        const _0xa7_count = _0x44_count
        let _0x76__0x75_pipeline_result = _0xa7_count
        const _0xa6_print = await _67lang.maybe_await(console.log(_0x76__0x75_pipeline_result))
        let _0x77__0x74_pipeline_result = _0xa6_print
        _0x77__0x74_pipeline_result
    } 
})();
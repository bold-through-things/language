globalThis._67lang = {
    EXISTS_INSIDE_AS_KEY: Symbol("EXISTS_INSIDE_AS_KEY"),
    EXISTS_INSIDE_AS_VALUE: Symbol("EXISTS_INSIDE_AS_VALUE"),
    exists_inside: (inside, k_or_v, ...arr) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (v) => Number.isInteger(v) && v >= 0 && v < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => v in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_KEY, ...values),
    has_values: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_VALUE, ...values),

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
        const _0x8f_stdin = await (_67lang.stdin())
        let _0x41__0x40_pipeline_result = _0x8f_stdin
        let _0x42_input = _0x41__0x40_pipeline_result
        _0x42_input
        const _0x91_input = _0x42_input
        const _0x90_split = String.prototype.split.call(_0x91_input, "\n")
        let _0x44__0x43_pipeline_result = _0x90_split
        let _0x45_words = _0x44__0x43_pipeline_result
        _0x45_words
        let _0x46_count = {}
        _0x46_count
        {
            let _0x49__0x47_for_word__index = 0
            _0x49__0x47_for_word__index
            const _0x92_words = _0x45_words
            let _0x4b__0x4a_pipeline_result = _0x92_words
            let _0x4c__0x48_for_word__list = _0x4b__0x4a_pipeline_result
            _0x4c__0x48_for_word__list
            while(true) {
                const _0x94__0x47_for_word__index = _0x49__0x47_for_word__index
                let _0x4f__0x4e_pipeline_result = _0x94__0x47_for_word__index
                const _0x96__0x48_for_word__list = _0x4c__0x48_for_word__list
                const _0x95_length = (_0x96__0x48_for_word__list.length)
                let _0x51__0x50_pipeline_result = _0x95_length
                const _0x93_asc = (_0x4f__0x4e_pipeline_result < _0x51__0x50_pipeline_result)
                let _0x52__0x4d_pipeline_result = _0x93_asc
                if (!_0x52__0x4d_pipeline_result) { break; }
                {
                    const _0x98__0x48_for_word__list = _0x4c__0x48_for_word__list
                    const _0x99__0x47_for_word__index = _0x49__0x47_for_word__index
                    let _0x55__0x54_pipeline_result = _0x99__0x47_for_word__index
                    const _0x97__hash_ = _0x98__0x48_for_word__list[_0x55__0x54_pipeline_result]
                    let _0x56__0x53_pipeline_result = _0x97__hash_
                    let _0x57_word = _0x56__0x53_pipeline_result
                    _0x57_word
                    const _0x9c__0x47_for_word__index = _0x49__0x47_for_word__index
                    const _0x9b_add = (_0x9c__0x47_for_word__index + 1)
                    let _0x5a__0x59_pipeline_result = _0x9b_add
                    const _0x9a__0x47_for_word__index = (_0x49__0x47_for_word__index = _0x5a__0x59_pipeline_result)
                    let _0x5b__0x58_pipeline_result = _0x9a__0x47_for_word__index
                    _0x5b__0x58_pipeline_result
                    const _0x9f_count = _0x46_count
                    const _0xa0_word = _0x57_word
                    let _0x5f__0x5e_pipeline_result = _0xa0_word
                    const _0x9e_has_keys = _67lang.has_keys(_0x9f_count, _0x5f__0x5e_pipeline_result)
                    let _0x60__0x5d_pipeline_result = _0x9e_has_keys
                    const _0x9d_none = !(_0x60__0x5d_pipeline_result)
                    let _0x61__0x5c_pipeline_result = _0x9d_none
                    if (_0x61__0x5c_pipeline_result)
                    {
                        const _0xa2_count = _0x46_count
                        let _0x64__0x63_pipeline_result = _0xa2_count
                        const _0xa3_word = _0x57_word
                        let _0x66__0x65_pipeline_result = _0xa3_word
                        const _0xa1__hash_ = (_0x64__0x63_pipeline_result[_0x66__0x65_pipeline_result] = 0)
                        let _0x67__0x62_pipeline_result = _0xa1__hash_
                        _0x67__0x62_pipeline_result
                    } 

                    const _0xa5_count = _0x46_count
                    let _0x6a__0x69_pipeline_result = _0xa5_count
                    const _0xa6_word = _0x57_word
                    let _0x6c__0x6b_pipeline_result = _0xa6_word
                    const _0xa9_count = _0x46_count
                    let _0x70__0x6f_pipeline_result = _0xa9_count
                    const _0xaa_word = _0x57_word
                    let _0x72__0x71_pipeline_result = _0xaa_word
                    const _0xa8__hash_ = _0x70__0x6f_pipeline_result[_0x72__0x71_pipeline_result]
                    let _0x73__0x6e_pipeline_result = _0xa8__hash_
                    const _0xa7_add = (1 + _0x73__0x6e_pipeline_result)
                    let _0x74__0x6d_pipeline_result = _0xa7_add
                    const _0xa4__hash_ = (_0x6a__0x69_pipeline_result[_0x6c__0x6b_pipeline_result] = _0x74__0x6d_pipeline_result)
                    let _0x75__0x68_pipeline_result = _0xa4__hash_
                    _0x75__0x68_pipeline_result
                } }
        } 
        const _0xac_count = _0x46_count
        let _0x78__0x77_pipeline_result = _0xac_count
        const _0xab_print = await _67lang.maybe_await(console.log(_0x78__0x77_pipeline_result))
        let _0x79__0x76_pipeline_result = _0xab_print
        _0x79__0x76_pipeline_result
    } 
})();
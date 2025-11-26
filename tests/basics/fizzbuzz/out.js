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
        let _0x40_fizz_divisor = 0
        _0x40_fizz_divisor
        let _0x41_buzz_divisor = 0
        _0x41_buzz_divisor
        let _0x42_n = 0
        _0x42_n

        {
            const _0x97_stdin = await (_67lang.stdin())
            let _0x44__0x43_pipeline_result = _0x97_stdin
            let _0x45_input = _0x44__0x43_pipeline_result
            _0x45_input
            const _0x99_input = _0x45_input
            const _0x98_split = String.prototype.split.call(_0x99_input, "\n")
            let _0x47__0x46_pipeline_result = _0x98_split
            let _0x48_input = _0x47__0x46_pipeline_result
            _0x48_input

            const _0x9b_input = _0x48_input
            let _0x4b__0x4a_pipeline_result = _0x9b_input
            const _0x9a__hash_ = _0x4b__0x4a_pipeline_result[0]
            let _0x4c__0x49_pipeline_result = _0x9a__hash_
            _0x4c__0x49_pipeline_result
            const _0x9e__0x49_pipeline_result = _0x4c__0x49_pipeline_result
            const _0x9d_int_colon_parse = globalThis.parseInt(_0x9e__0x49_pipeline_result)
            const _0x9c_fizz_divisor = (_0x40_fizz_divisor = _0x9d_int_colon_parse)
            _0x9c_fizz_divisor
            const _0xa0_input = _0x48_input
            let _0x4f__0x4e_pipeline_result = _0xa0_input
            const _0x9f__hash_ = _0x4f__0x4e_pipeline_result[1]
            let _0x50__0x4d_pipeline_result = _0x9f__hash_
            _0x50__0x4d_pipeline_result
            const _0xa3__0x4d_pipeline_result = _0x50__0x4d_pipeline_result
            const _0xa2_int_colon_parse = globalThis.parseInt(_0xa3__0x4d_pipeline_result)
            const _0xa1_buzz_divisor = (_0x41_buzz_divisor = _0xa2_int_colon_parse)
            _0xa1_buzz_divisor
            const _0xa5_input = _0x48_input
            let _0x53__0x52_pipeline_result = _0xa5_input
            const _0xa4__hash_ = _0x53__0x52_pipeline_result[2]
            let _0x54__0x51_pipeline_result = _0xa4__hash_
            _0x54__0x51_pipeline_result
            const _0xa8__0x51_pipeline_result = _0x54__0x51_pipeline_result
            const _0xa7_int_colon_parse = globalThis.parseInt(_0xa8__0x51_pipeline_result)
            const _0xa6_n = (_0x42_n = _0xa7_int_colon_parse)
            _0xa6_n
        } 
        let _0x55_i = 0
        _0x55_i
        while(true) {
            const _0xaa_i = _0x55_i
            let _0x58__0x57_pipeline_result = _0xaa_i
            const _0xab_n = _0x42_n
            let _0x5a__0x59_pipeline_result = _0xab_n
            const _0xa9_nondesc = (_0x58__0x57_pipeline_result <= _0x5a__0x59_pipeline_result)
            let _0x5b__0x56_pipeline_result = _0xa9_nondesc
            if (!_0x5b__0x56_pipeline_result) { break; }
            {
                let _0x5c_out = ""
                _0x5c_out
                const _0xae_i = _0x55_i
                let _0x60__0x5f_pipeline_result = _0xae_i
                const _0xaf_fizz_divisor = _0x40_fizz_divisor
                let _0x62__0x61_pipeline_result = _0xaf_fizz_divisor
                const _0xad_mod = (_0x60__0x5f_pipeline_result % _0x62__0x61_pipeline_result)
                let _0x63__0x5e_pipeline_result = _0xad_mod
                const _0xac_eq = (_0x63__0x5e_pipeline_result === 0)
                let _0x64__0x5d_pipeline_result = _0xac_eq
                if (_0x64__0x5d_pipeline_result)
                {
                    const _0xb2_out = _0x5c_out
                    let _0x66__0x65_pipeline_result = _0xb2_out
                    const _0xb1_concat = (_0x66__0x65_pipeline_result + "fizz")
                    const _0xb0_out = (_0x5c_out = _0xb1_concat)
                    _0xb0_out
                } 
                const _0xb5_i = _0x55_i
                let _0x6a__0x69_pipeline_result = _0xb5_i
                const _0xb6_buzz_divisor = _0x41_buzz_divisor
                let _0x6c__0x6b_pipeline_result = _0xb6_buzz_divisor
                const _0xb4_mod = (_0x6a__0x69_pipeline_result % _0x6c__0x6b_pipeline_result)
                let _0x6d__0x68_pipeline_result = _0xb4_mod
                const _0xb3_eq = (_0x6d__0x68_pipeline_result === 0)
                let _0x6e__0x67_pipeline_result = _0xb3_eq
                if (_0x6e__0x67_pipeline_result)
                {
                    const _0xb9_out = _0x5c_out
                    let _0x70__0x6f_pipeline_result = _0xb9_out
                    const _0xb8_concat = (_0x70__0x6f_pipeline_result + "buzz")
                    const _0xb7_out = (_0x5c_out = _0xb8_concat)
                    _0xb7_out
                } 
                const _0xbb_out = _0x5c_out
                let _0x73__0x72_pipeline_result = _0xbb_out
                const _0xba_eq = (_0x73__0x72_pipeline_result === "")
                let _0x74__0x71_pipeline_result = _0xba_eq
                if (_0x74__0x71_pipeline_result)
                {
                    const _0xbf_i = _0x55_i
                    const _0xbe_str = Number.prototype.toString.call(_0xbf_i)
                    let _0x76__0x75_pipeline_result = _0xbe_str
                    const _0xbd_concat = ("" + _0x76__0x75_pipeline_result)
                    const _0xbc_out = (_0x5c_out = _0xbd_concat)
                    _0xbc_out
                } 
                const _0xc1_out = _0x5c_out
                let _0x79__0x78_pipeline_result = _0xc1_out
                const _0xc0_print = await _67lang.maybe_await(console.log(_0x79__0x78_pipeline_result))
                let _0x7a__0x77_pipeline_result = _0xc0_print
                _0x7a__0x77_pipeline_result
                const _0xc4_i = _0x55_i
                let _0x7e__0x7d_pipeline_result = _0xc4_i
                const _0xc3_add = (_0x7e__0x7d_pipeline_result + 1)
                let _0x7f__0x7c_pipeline_result = _0xc3_add
                let _0x80__fix_the_fucking_add_return_type = _0x7f__0x7c_pipeline_result
                const _0xc2_i = (_0x55_i = _0x80__fix_the_fucking_add_return_type)
                let _0x81__0x7b_pipeline_result = _0xc2_i
                _0x81__0x7b_pipeline_result
            } }
    } 
})();
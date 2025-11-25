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

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
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
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


















        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x3e_fizz_divisor = 0
            _0x3e_fizz_divisor
            let _0x3f_buzz_divisor = 0
            _0x3f_buzz_divisor
            let _0x40_n = 0
            _0x40_n

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x92_stdin = await (_67lang.stdin())
                    let _0x42__0x41_pipeline_result = _0x92_stdin
                    let _0x43_input = _0x42__0x41_pipeline_result
                    _0x43_input
                    const _0x94_input = _0x43_input
                    const _0x93_split = String.prototype.split.call(_0x94_input, "\n")
                    let _0x45__0x44_pipeline_result = _0x93_split
                    let _0x46_input = _0x45__0x44_pipeline_result
                    _0x46_input

                    const _0x96_input = _0x46_input
                    let _0x49__0x48_pipeline_result = _0x96_input
                    const _0x95__hash_ = _0x49__0x48_pipeline_result[0]
                    let _0x4a__0x47_pipeline_result = _0x95__hash_
                    _0x4a__0x47_pipeline_result
                    const _0x99__0x47_pipeline_result = _0x4a__0x47_pipeline_result
                    const _0x98_int_colon_parse = globalThis.parseInt(_0x99__0x47_pipeline_result)
                    const _0x97_fizz_divisor = (_0x3e_fizz_divisor = _0x98_int_colon_parse)
                    _0x97_fizz_divisor
                    const _0x9b_input = _0x46_input
                    let _0x4d__0x4c_pipeline_result = _0x9b_input
                    const _0x9a__hash_ = _0x4d__0x4c_pipeline_result[1]
                    let _0x4e__0x4b_pipeline_result = _0x9a__hash_
                    _0x4e__0x4b_pipeline_result
                    const _0x9e__0x4b_pipeline_result = _0x4e__0x4b_pipeline_result
                    const _0x9d_int_colon_parse = globalThis.parseInt(_0x9e__0x4b_pipeline_result)
                    const _0x9c_buzz_divisor = (_0x3f_buzz_divisor = _0x9d_int_colon_parse)
                    _0x9c_buzz_divisor
                    const _0xa0_input = _0x46_input
                    let _0x51__0x50_pipeline_result = _0xa0_input
                    const _0x9f__hash_ = _0x51__0x50_pipeline_result[2]
                    let _0x52__0x4f_pipeline_result = _0x9f__hash_
                    _0x52__0x4f_pipeline_result
                    const _0xa3__0x4f_pipeline_result = _0x52__0x4f_pipeline_result
                    const _0xa2_int_colon_parse = globalThis.parseInt(_0xa3__0x4f_pipeline_result)
                    const _0xa1_n = (_0x40_n = _0xa2_int_colon_parse)
                    _0xa1_n
                }
            } 
            let _0x53_i = 0
            _0x53_i
            while(true) {
                const _0xa5_i = _0x53_i
                let _0x56__0x55_pipeline_result = _0xa5_i
                const _0xa6_n = _0x40_n
                let _0x58__0x57_pipeline_result = _0xa6_n
                const _0xa4_nondesc = (_0x56__0x55_pipeline_result <= _0x58__0x57_pipeline_result)
                let _0x59__0x54_pipeline_result = _0xa4_nondesc
                if (!_0x59__0x54_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x5a_out = ""
                        _0x5a_out
                        const _0xa9_i = _0x53_i
                        let _0x5e__0x5d_pipeline_result = _0xa9_i
                        const _0xaa_fizz_divisor = _0x3e_fizz_divisor
                        let _0x60__0x5f_pipeline_result = _0xaa_fizz_divisor
                        const _0xa8_mod = (_0x5e__0x5d_pipeline_result % _0x60__0x5f_pipeline_result)
                        let _0x61__0x5c_pipeline_result = _0xa8_mod
                        const _0xa7_eq = (_0x61__0x5c_pipeline_result === 0)
                        let _0x62__0x5b_pipeline_result = _0xa7_eq
                        if (_0x62__0x5b_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xad_out = _0x5a_out
                                let _0x64__0x63_pipeline_result = _0xad_out
                                const _0xac_concat = (_0x64__0x63_pipeline_result + "fizz")
                                const _0xab_out = (_0x5a_out = _0xac_concat)
                                _0xab_out
                            }
                        } 
                        const _0xb0_i = _0x53_i
                        let _0x68__0x67_pipeline_result = _0xb0_i
                        const _0xb1_buzz_divisor = _0x3f_buzz_divisor
                        let _0x6a__0x69_pipeline_result = _0xb1_buzz_divisor
                        const _0xaf_mod = (_0x68__0x67_pipeline_result % _0x6a__0x69_pipeline_result)
                        let _0x6b__0x66_pipeline_result = _0xaf_mod
                        const _0xae_eq = (_0x6b__0x66_pipeline_result === 0)
                        let _0x6c__0x65_pipeline_result = _0xae_eq
                        if (_0x6c__0x65_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xb4_out = _0x5a_out
                                let _0x6e__0x6d_pipeline_result = _0xb4_out
                                const _0xb3_concat = (_0x6e__0x6d_pipeline_result + "buzz")
                                const _0xb2_out = (_0x5a_out = _0xb3_concat)
                                _0xb2_out
                            }
                        } 
                        const _0xb6_out = _0x5a_out
                        let _0x71__0x70_pipeline_result = _0xb6_out
                        const _0xb5_eq = (_0x71__0x70_pipeline_result === "")
                        let _0x72__0x6f_pipeline_result = _0xb5_eq
                        if (_0x72__0x6f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xba_i = _0x53_i
                                const _0xb9_str = Number.prototype.toString.call(_0xba_i)
                                let _0x74__0x73_pipeline_result = _0xb9_str
                                const _0xb8_concat = ("" + _0x74__0x73_pipeline_result)
                                const _0xb7_out = (_0x5a_out = _0xb8_concat)
                                _0xb7_out
                            }
                        } 
                        const _0xbc_out = _0x5a_out
                        let _0x77__0x76_pipeline_result = _0xbc_out
                        const _0xbb_print = await _67lang.maybe_await(console.log(_0x77__0x76_pipeline_result))
                        let _0x78__0x75_pipeline_result = _0xbb_print
                        _0x78__0x75_pipeline_result
                        const _0xbf_i = _0x53_i
                        let _0x7c__0x7b_pipeline_result = _0xbf_i
                        const _0xbe_add = (_0x7c__0x7b_pipeline_result + 1)
                        let _0x7d__0x7a_pipeline_result = _0xbe_add
                        let _0x7e__fix_the_fucking_add_return_type = _0x7d__0x7a_pipeline_result
                        const _0xbd_i = (_0x53_i = _0x7e__fix_the_fucking_add_return_type)
                        let _0x7f__0x79_pipeline_result = _0xbd_i
                        _0x7f__0x79_pipeline_result
                    }
                } }
        }
    } 
})();
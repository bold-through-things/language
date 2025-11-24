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
            let _0x2e_fizz_divisor = 0
            _0x2e_fizz_divisor
            let _0x2f_buzz_divisor = 0
            _0x2f_buzz_divisor
            let _0x30_n = 0
            _0x30_n

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x7f_stdin = await (_67lang.stdin())
                    let _0x32__0x31_pipeline_result = _0x7f_stdin
                    let _0x33_input = _0x32__0x31_pipeline_result
                    _0x33_input
                    const _0x81_input = _0x33_input
                    const _0x80_split = String.prototype.split.call(_0x81_input, "\n")
                    let _0x35__0x34_pipeline_result = _0x80_split
                    let _0x36_input = _0x35__0x34_pipeline_result
                    _0x36_input

                    const _0x83_input = _0x36_input
                    let _0x39__0x38_pipeline_result = _0x83_input
                    const _0x82__hash_ = _0x39__0x38_pipeline_result[0]
                    let _0x3a__0x37_pipeline_result = _0x82__hash_
                    _0x3a__0x37_pipeline_result
                    const _0x86__0x37_pipeline_result = _0x3a__0x37_pipeline_result
                    const _0x85_parseInt = await _67lang.maybe_await(parseInt(_0x86__0x37_pipeline_result))
                    const _0x84_fizz_divisor = (_0x2e_fizz_divisor = _0x85_parseInt)
                    _0x84_fizz_divisor
                    const _0x88_input = _0x36_input
                    let _0x3d__0x3c_pipeline_result = _0x88_input
                    const _0x87__hash_ = _0x3d__0x3c_pipeline_result[1]
                    let _0x3e__0x3b_pipeline_result = _0x87__hash_
                    _0x3e__0x3b_pipeline_result
                    const _0x8b__0x3b_pipeline_result = _0x3e__0x3b_pipeline_result
                    const _0x8a_parseInt = await _67lang.maybe_await(parseInt(_0x8b__0x3b_pipeline_result))
                    const _0x89_buzz_divisor = (_0x2f_buzz_divisor = _0x8a_parseInt)
                    _0x89_buzz_divisor
                    const _0x8d_input = _0x36_input
                    let _0x41__0x40_pipeline_result = _0x8d_input
                    const _0x8c__hash_ = _0x41__0x40_pipeline_result[2]
                    let _0x42__0x3f_pipeline_result = _0x8c__hash_
                    _0x42__0x3f_pipeline_result
                    const _0x90__0x3f_pipeline_result = _0x42__0x3f_pipeline_result
                    const _0x8f_parseInt = await _67lang.maybe_await(parseInt(_0x90__0x3f_pipeline_result))
                    const _0x8e_n = (_0x30_n = _0x8f_parseInt)
                    _0x8e_n
                }
            } 
            let _0x43_i = 0
            _0x43_i
            while(true) {
                const _0x92_i = _0x43_i
                let _0x46__0x45_pipeline_result = _0x92_i
                const _0x93_n = _0x30_n
                let _0x48__0x47_pipeline_result = _0x93_n
                const _0x91_nondesc = (_0x46__0x45_pipeline_result <= _0x48__0x47_pipeline_result)
                let _0x49__0x44_pipeline_result = _0x91_nondesc
                if (!_0x49__0x44_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x4a_out = ""
                        _0x4a_out
                        const _0x96_i = _0x43_i
                        let _0x4e__0x4d_pipeline_result = _0x96_i
                        const _0x97_fizz_divisor = _0x2e_fizz_divisor
                        let _0x50__0x4f_pipeline_result = _0x97_fizz_divisor
                        const _0x95_mod = (_0x4e__0x4d_pipeline_result % _0x50__0x4f_pipeline_result)
                        let _0x51__0x4c_pipeline_result = _0x95_mod
                        const _0x94_eq = (_0x51__0x4c_pipeline_result === 0)
                        let _0x52__0x4b_pipeline_result = _0x94_eq
                        if (_0x52__0x4b_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x9a_out = _0x4a_out
                                let _0x54__0x53_pipeline_result = _0x9a_out
                                const _0x99_concat = (_0x54__0x53_pipeline_result + "fizz")
                                const _0x98_out = (_0x4a_out = _0x99_concat)
                                _0x98_out
                            }
                        } 
                        const _0x9d_i = _0x43_i
                        let _0x58__0x57_pipeline_result = _0x9d_i
                        const _0x9e_buzz_divisor = _0x2f_buzz_divisor
                        let _0x5a__0x59_pipeline_result = _0x9e_buzz_divisor
                        const _0x9c_mod = (_0x58__0x57_pipeline_result % _0x5a__0x59_pipeline_result)
                        let _0x5b__0x56_pipeline_result = _0x9c_mod
                        const _0x9b_eq = (_0x5b__0x56_pipeline_result === 0)
                        let _0x5c__0x55_pipeline_result = _0x9b_eq
                        if (_0x5c__0x55_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xa1_out = _0x4a_out
                                let _0x5e__0x5d_pipeline_result = _0xa1_out
                                const _0xa0_concat = (_0x5e__0x5d_pipeline_result + "buzz")
                                const _0x9f_out = (_0x4a_out = _0xa0_concat)
                                _0x9f_out
                            }
                        } 
                        const _0xa3_out = _0x4a_out
                        let _0x61__0x60_pipeline_result = _0xa3_out
                        const _0xa2_eq = (_0x61__0x60_pipeline_result === "")
                        let _0x62__0x5f_pipeline_result = _0xa2_eq
                        if (_0x62__0x5f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xa7_i = _0x43_i
                                const _0xa6_toString = Number.prototype.toString.call(_0xa7_i)
                                let _0x64__0x63_pipeline_result = _0xa6_toString
                                const _0xa5_concat = ("" + _0x64__0x63_pipeline_result)
                                const _0xa4_out = (_0x4a_out = _0xa5_concat)
                                _0xa4_out
                            }
                        } 
                        const _0xa9_out = _0x4a_out
                        let _0x67__0x66_pipeline_result = _0xa9_out
                        const _0xa8_print = await _67lang.maybe_await(console.log(_0x67__0x66_pipeline_result))
                        let _0x68__0x65_pipeline_result = _0xa8_print
                        _0x68__0x65_pipeline_result
                        const _0xac_i = _0x43_i
                        let _0x6c__0x6b_pipeline_result = _0xac_i
                        const _0xab_add = (_0x6c__0x6b_pipeline_result + 1)
                        let _0x6d__0x6a_pipeline_result = _0xab_add
                        let _0x6e__fix_the_fucking_add_return_type = _0x6d__0x6a_pipeline_result
                        const _0xaa_i = (_0x43_i = _0x6e__fix_the_fucking_add_return_type)
                        let _0x6f__0x69_pipeline_result = _0xaa_i
                        _0x6f__0x69_pipeline_result
                    }
                } }
        }
    } 
})();
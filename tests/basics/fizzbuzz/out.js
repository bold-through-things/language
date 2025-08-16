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
            let _0x0_fizz_divisor
            _0x0_fizz_divisor
            let _0x1_buzz_divisor
            _0x1_buzz_divisor
            let _0x2_n
            _0x2_n
            const _0x39_is_tty = await _67lang.is_tty()
            let _0x4__0x3_pipeline_result = _0x39_is_tty
            if (_0x4__0x3_pipeline_result) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x3b_prompt = await _67lang.prompt("fizz? ")
                        const _0x3a_fizz_divisor = await (_0x0_fizz_divisor = _0x3b_prompt)
                        _0x3a_fizz_divisor
                        const _0x3d_prompt = await _67lang.prompt("buzz? ")
                        const _0x3c_buzz_divisor = await (_0x1_buzz_divisor = _0x3d_prompt)
                        _0x3c_buzz_divisor
                        const _0x3f_prompt = await _67lang.prompt("n? ")
                        const _0x3e_n = await (_0x2_n = _0x3f_prompt)
                        _0x3e_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x40_stdin = await _67lang.stdin()
                    let _0x6__0x5_pipeline_result = _0x40_stdin
                    let _0x7_input = _0x6__0x5_pipeline_result
                    _0x7_input
                    const _0x42_input = await _0x7_input
                    const _0x41_split = await String.prototype.split.call(_0x42_input, "\n")
                    let _0x9__0x8_pipeline_result = _0x41_split
                    let _0xa_input = _0x9__0x8_pipeline_result
                    _0xa_input

                    const _0x45_input = await _0xa_input
                    let _0xc__0xb_pipeline_result = _0x45_input
                    const _0x44__hash_ = await _0xc__0xb_pipeline_result[0]
                    const _0x43_fizz_divisor = await (_0x0_fizz_divisor = _0x44__hash_)
                    _0x43_fizz_divisor
                    const _0x48_input = await _0xa_input
                    let _0xe__0xd_pipeline_result = _0x48_input
                    const _0x47__hash_ = await _0xe__0xd_pipeline_result[1]
                    const _0x46_buzz_divisor = await (_0x1_buzz_divisor = _0x47__hash_)
                    _0x46_buzz_divisor
                    const _0x4b_input = await _0xa_input
                    let _0x10__0xf_pipeline_result = _0x4b_input
                    const _0x4a__hash_ = await _0x10__0xf_pipeline_result[2]
                    const _0x49_n = await (_0x2_n = _0x4a__hash_)
                    _0x49_n
                }
            } 
            let _0x11_i = 0
            _0x11_i
            while(true) {const _0x4d_i = await _0x11_i
                let _0x14__0x13_pipeline_result = _0x4d_i
                const _0x4e_n = await _0x2_n
                let _0x16__0x15_pipeline_result = _0x4e_n
                const _0x4c_nondesc = await (_0x14__0x13_pipeline_result <= _0x16__0x15_pipeline_result)
                let _0x17__0x12_pipeline_result = _0x4c_nondesc
                if (!_0x17__0x12_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x18_out = ""
                        _0x18_out
                        const _0x51_i = await _0x11_i
                        let _0x1c__0x1b_pipeline_result = _0x51_i
                        const _0x52_fizz_divisor = await _0x0_fizz_divisor
                        let _0x1e__0x1d_pipeline_result = _0x52_fizz_divisor
                        const _0x50_mod = await (_0x1c__0x1b_pipeline_result % _0x1e__0x1d_pipeline_result)
                        let _0x1f__0x1a_pipeline_result = _0x50_mod
                        const _0x4f_eq = await (_0x1f__0x1a_pipeline_result === 0)
                        let _0x20__0x19_pipeline_result = _0x4f_eq
                        if (_0x20__0x19_pipeline_result) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x55_out = await _0x18_out
                                    let _0x22__0x21_pipeline_result = _0x55_out
                                    const _0x54_concat = await (_0x22__0x21_pipeline_result + "fizz")
                                    const _0x53_out = await (_0x18_out = _0x54_concat)
                                    _0x53_out
                                }
                            } }
                        const _0x58_i = await _0x11_i
                        let _0x26__0x25_pipeline_result = _0x58_i
                        const _0x59_buzz_divisor = await _0x1_buzz_divisor
                        let _0x28__0x27_pipeline_result = _0x59_buzz_divisor
                        const _0x57_mod = await (_0x26__0x25_pipeline_result % _0x28__0x27_pipeline_result)
                        let _0x29__0x24_pipeline_result = _0x57_mod
                        const _0x56_eq = await (_0x29__0x24_pipeline_result === 0)
                        let _0x2a__0x23_pipeline_result = _0x56_eq
                        if (_0x2a__0x23_pipeline_result) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x5c_out = await _0x18_out
                                    let _0x2c__0x2b_pipeline_result = _0x5c_out
                                    const _0x5b_concat = await (_0x2c__0x2b_pipeline_result + "buzz")
                                    const _0x5a_out = await (_0x18_out = _0x5b_concat)
                                    _0x5a_out
                                }
                            } }
                        const _0x5e_out = await _0x18_out
                        let _0x2f__0x2e_pipeline_result = _0x5e_out
                        const _0x5d_eq = await (_0x2f__0x2e_pipeline_result === "")
                        let _0x30__0x2d_pipeline_result = _0x5d_eq
                        if (_0x30__0x2d_pipeline_result) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x61_i = await _0x11_i
                                    let _0x32__0x31_pipeline_result = _0x61_i
                                    const _0x60_concat = await ("" + _0x32__0x31_pipeline_result)
                                    const _0x5f_out = await (_0x18_out = _0x60_concat)
                                    _0x5f_out
                                }
                            } }
                        const _0x63_out = await _0x18_out
                        let _0x35__0x34_pipeline_result = _0x63_out
                        const _0x62_print = await console.log(_0x35__0x34_pipeline_result)
                        let _0x36__0x33_pipeline_result = _0x62_print
                        _0x36__0x33_pipeline_result
                        const _0x66_i = await _0x11_i
                        let _0x38__0x37_pipeline_result = _0x66_i
                        const _0x65_add = await (_0x38__0x37_pipeline_result + 1)
                        const _0x64_i = await (_0x11_i = _0x65_add)
                        _0x64_i
                    }
                } }
        }
    } 
})();
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
            const _0x86_is_tty = await _67lang.is_tty()
            let _0x4__0x3_is_tty = _0x86_is_tty
            if (_0x4__0x3_is_tty) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x88_prompt = await _67lang.prompt("fizz? ")
                        let _0x8__0x6_prompt = _0x88_prompt
                        const _0x87_fizz_divisor = await (_0x0_fizz_divisor = _0x8__0x6_prompt)
                        let _0x9__0x5_fizz_divisor = _0x87_fizz_divisor
                        _0x9__0x5_fizz_divisor
                        const _0x8a_prompt = await _67lang.prompt("buzz? ")
                        let _0xd__0xb_prompt = _0x8a_prompt
                        const _0x89_buzz_divisor = await (_0x1_buzz_divisor = _0xd__0xb_prompt)
                        let _0xe__0xa_buzz_divisor = _0x89_buzz_divisor
                        _0xe__0xa_buzz_divisor
                        const _0x8c_prompt = await _67lang.prompt("n? ")
                        let _0x12__0x10_prompt = _0x8c_prompt
                        const _0x8b_n = await (_0x2_n = _0x12__0x10_prompt)
                        let _0x13__0xf_n = _0x8b_n
                        _0x13__0xf_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x8d_stdin = await _67lang.stdin()
                    let _0x15__0x14_stdin = _0x8d_stdin
                    let _0x16_input = _0x15__0x14_stdin
                    _0x16_input
                    const _0x8e_input = await _0x16_input
                    let _0x19__0x17_input = _0x8e_input
                    const _0x90__0x17_input = await _0x19__0x17_input
                    const _0x8f_split = await String.prototype.split.call(_0x90__0x17_input, "\n")
                    let _0x1a__0x18_split = _0x8f_split
                    let _0x1b_input = _0x1a__0x18_split
                    _0x1b_input

                    const _0x92_input = await _0x1b_input
                    let _0x21__0x1d_input = _0x92_input
                    const _0x94__0x1d_input = await _0x21__0x1d_input
                    const _0x93__hash_ = await _0x94__0x1d_input[0]
                    let _0x22__0x1e__hash_ = _0x93__hash_
                    const _0x91_fizz_divisor = await (_0x0_fizz_divisor = _0x22__0x1e__hash_)
                    let _0x23__0x1c_fizz_divisor = _0x91_fizz_divisor
                    _0x23__0x1c_fizz_divisor
                    const _0x96_input = await _0x1b_input
                    let _0x29__0x25_input = _0x96_input
                    const _0x98__0x25_input = await _0x29__0x25_input
                    const _0x97__hash_ = await _0x98__0x25_input[1]
                    let _0x2a__0x26__hash_ = _0x97__hash_
                    const _0x95_buzz_divisor = await (_0x1_buzz_divisor = _0x2a__0x26__hash_)
                    let _0x2b__0x24_buzz_divisor = _0x95_buzz_divisor
                    _0x2b__0x24_buzz_divisor
                    const _0x9a_input = await _0x1b_input
                    let _0x31__0x2d_input = _0x9a_input
                    const _0x9c__0x2d_input = await _0x31__0x2d_input
                    const _0x9b__hash_ = await _0x9c__0x2d_input[2]
                    let _0x32__0x2e__hash_ = _0x9b__hash_
                    const _0x99_n = await (_0x2_n = _0x32__0x2e__hash_)
                    let _0x33__0x2c_n = _0x99_n
                    _0x33__0x2c_n
                }
            } 
            let _0x34_i = 0
            _0x34_i
            while(true) {const _0x9e_i = await _0x34_i
                let _0x3a__0x36_i = _0x9e_i
                const _0x9f_n = await _0x2_n
                let _0x3b__0x38_n = _0x9f_n
                const _0x9d_nondesc = await (_0x3a__0x36_i <= _0x3b__0x38_n)
                let _0x3c__0x35_nondesc = _0x9d_nondesc
                if (!_0x3c__0x35_nondesc) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x3d_out = ""
                        _0x3d_out
                        const _0xa2_i = await _0x34_i
                        let _0x47__0x40_i = _0xa2_i
                        const _0xa3_fizz_divisor = await _0x0_fizz_divisor
                        let _0x48__0x42_fizz_divisor = _0xa3_fizz_divisor
                        const _0xa1_mod = await (_0x47__0x40_i % _0x48__0x42_fizz_divisor)
                        let _0x49__0x3f_mod = _0xa1_mod
                        const _0xa0_eq = await (_0x49__0x3f_mod === 0)
                        let _0x4a__0x3e_eq = _0xa0_eq
                        if (_0x4a__0x3e_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xa6_out = await _0x3d_out
                                    let _0x51__0x4d_out = _0xa6_out
                                    const _0xa5_concat = await (_0x51__0x4d_out + "fizz")
                                    let _0x52__0x4c_concat = _0xa5_concat
                                    const _0xa4_out = await (_0x3d_out = _0x52__0x4c_concat)
                                    let _0x53__0x4b_out = _0xa4_out
                                    _0x53__0x4b_out
                                }
                            } }
                        const _0xa9_i = await _0x34_i
                        let _0x5d__0x56_i = _0xa9_i
                        const _0xaa_buzz_divisor = await _0x1_buzz_divisor
                        let _0x5e__0x58_buzz_divisor = _0xaa_buzz_divisor
                        const _0xa8_mod = await (_0x5d__0x56_i % _0x5e__0x58_buzz_divisor)
                        let _0x5f__0x55_mod = _0xa8_mod
                        const _0xa7_eq = await (_0x5f__0x55_mod === 0)
                        let _0x60__0x54_eq = _0xa7_eq
                        if (_0x60__0x54_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xad_out = await _0x3d_out
                                    let _0x67__0x63_out = _0xad_out
                                    const _0xac_concat = await (_0x67__0x63_out + "buzz")
                                    let _0x68__0x62_concat = _0xac_concat
                                    const _0xab_out = await (_0x3d_out = _0x68__0x62_concat)
                                    let _0x69__0x61_out = _0xab_out
                                    _0x69__0x61_out
                                }
                            } }
                        const _0xaf_out = await _0x3d_out
                        let _0x6d__0x6b_out = _0xaf_out
                        const _0xae_eq = await (_0x6d__0x6b_out === "")
                        let _0x6e__0x6a_eq = _0xae_eq
                        if (_0x6e__0x6a_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xb2_i = await _0x34_i
                                    let _0x75__0x71_i = _0xb2_i
                                    const _0xb1_concat = await ("" + _0x75__0x71_i)
                                    let _0x76__0x70_concat = _0xb1_concat
                                    const _0xb0_out = await (_0x3d_out = _0x76__0x70_concat)
                                    let _0x77__0x6f_out = _0xb0_out
                                    _0x77__0x6f_out
                                }
                            } }
                        const _0xb4_out = await _0x3d_out
                        let _0x7b__0x79_out = _0xb4_out
                        const _0xb3_print = await console.log(_0x7b__0x79_out)
                        let _0x7c__0x78_print = _0xb3_print
                        _0x7c__0x78_print
                        const _0xb7_i = await _0x34_i
                        let _0x83__0x7f_i = _0xb7_i
                        const _0xb6_add = await (_0x83__0x7f_i + 1)
                        let _0x84__0x7e_add = _0xb6_add
                        const _0xb5_i = await (_0x34_i = _0x84__0x7e_add)
                        let _0x85__0x7d_i = _0xb5_i
                        _0x85__0x7d_i
                    }
                } }
        }
    } 
})();
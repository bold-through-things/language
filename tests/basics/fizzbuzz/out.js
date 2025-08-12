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
            const _0x85_is_tty = await _67lang.is_tty()
            let _0x4__0x3_is_tty = _0x85_is_tty
            if (_0x4__0x3_is_tty) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x87_prompt = await _67lang.prompt("fizz? ")
                        let _0x8__0x6_prompt = _0x87_prompt
                        const _0x86_fizz_divisor = await (_0x0_fizz_divisor = _0x8__0x6_prompt)
                        let _0x9__0x5_fizz_divisor = _0x86_fizz_divisor
                        _0x9__0x5_fizz_divisor
                        const _0x89_prompt = await _67lang.prompt("buzz? ")
                        let _0xd__0xb_prompt = _0x89_prompt
                        const _0x88_buzz_divisor = await (_0x1_buzz_divisor = _0xd__0xb_prompt)
                        let _0xe__0xa_buzz_divisor = _0x88_buzz_divisor
                        _0xe__0xa_buzz_divisor
                        const _0x8b_prompt = await _67lang.prompt("n? ")
                        let _0x12__0x10_prompt = _0x8b_prompt
                        const _0x8a_n = await (_0x2_n = _0x12__0x10_prompt)
                        let _0x13__0xf_n = _0x8a_n
                        _0x13__0xf_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x8c_stdin = await _67lang.stdin()
                    let _0x15__0x14_stdin = _0x8c_stdin
                    let _0x16_input = _0x15__0x14_stdin
                    _0x16_input
                    const _0x8e_input = await _0x16_input
                    let _0x1c__0x18_input = _0x8e_input
                    const _0x90__0x18_input = await _0x1c__0x18_input
                    const _0x8f_split = await String.prototype.split.call(_0x90__0x18_input, "\n")
                    let _0x1d__0x19_split = _0x8f_split
                    const _0x8d_input = await (_0x16_input = _0x1d__0x19_split)
                    let _0x1e__0x17_input = _0x8d_input
                    _0x1e__0x17_input

                    const _0x92_input = await _0x16_input
                    let _0x24__0x20_input = _0x92_input
                    const _0x94__0x20_input = await _0x24__0x20_input
                    const _0x93__hash_ = await _0x94__0x20_input[0]
                    let _0x25__0x21__hash_ = _0x93__hash_
                    const _0x91_fizz_divisor = await (_0x0_fizz_divisor = _0x25__0x21__hash_)
                    let _0x26__0x1f_fizz_divisor = _0x91_fizz_divisor
                    _0x26__0x1f_fizz_divisor
                    const _0x96_input = await _0x16_input
                    let _0x2c__0x28_input = _0x96_input
                    const _0x98__0x28_input = await _0x2c__0x28_input
                    const _0x97__hash_ = await _0x98__0x28_input[1]
                    let _0x2d__0x29__hash_ = _0x97__hash_
                    const _0x95_buzz_divisor = await (_0x1_buzz_divisor = _0x2d__0x29__hash_)
                    let _0x2e__0x27_buzz_divisor = _0x95_buzz_divisor
                    _0x2e__0x27_buzz_divisor
                    const _0x9a_input = await _0x16_input
                    let _0x34__0x30_input = _0x9a_input
                    const _0x9c__0x30_input = await _0x34__0x30_input
                    const _0x9b__hash_ = await _0x9c__0x30_input[2]
                    let _0x35__0x31__hash_ = _0x9b__hash_
                    const _0x99_n = await (_0x2_n = _0x35__0x31__hash_)
                    let _0x36__0x2f_n = _0x99_n
                    _0x36__0x2f_n
                }
            } 
            let _0x37_i = 0
            _0x37_i
            while(true) {const _0x9e_i = await _0x37_i
                let _0x3d__0x39_i = _0x9e_i
                const _0x9f_n = await _0x2_n
                let _0x3e__0x3b_n = _0x9f_n
                const _0x9d_nondesc = await (_0x3d__0x39_i <= _0x3e__0x3b_n)
                let _0x3f__0x38_nondesc = _0x9d_nondesc
                if (!_0x3f__0x38_nondesc) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x40_out = ""
                        _0x40_out
                        const _0xa2_i = await _0x37_i
                        let _0x4a__0x43_i = _0xa2_i
                        const _0xa3_fizz_divisor = await _0x0_fizz_divisor
                        let _0x4b__0x45_fizz_divisor = _0xa3_fizz_divisor
                        const _0xa1_mod = await (_0x4a__0x43_i % _0x4b__0x45_fizz_divisor)
                        let _0x4c__0x42_mod = _0xa1_mod
                        const _0xa0_eq = await (_0x4c__0x42_mod === 0)
                        let _0x4d__0x41_eq = _0xa0_eq
                        if (_0x4d__0x41_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xa6_out = await _0x40_out
                                    let _0x54__0x50_out = _0xa6_out
                                    const _0xa5_concat = await (_0x54__0x50_out + "fizz")
                                    let _0x55__0x4f_concat = _0xa5_concat
                                    const _0xa4_out = await (_0x40_out = _0x55__0x4f_concat)
                                    let _0x56__0x4e_out = _0xa4_out
                                    _0x56__0x4e_out
                                }
                            } }
                        const _0xa9_i = await _0x37_i
                        let _0x60__0x59_i = _0xa9_i
                        const _0xaa_buzz_divisor = await _0x1_buzz_divisor
                        let _0x61__0x5b_buzz_divisor = _0xaa_buzz_divisor
                        const _0xa8_mod = await (_0x60__0x59_i % _0x61__0x5b_buzz_divisor)
                        let _0x62__0x58_mod = _0xa8_mod
                        const _0xa7_eq = await (_0x62__0x58_mod === 0)
                        let _0x63__0x57_eq = _0xa7_eq
                        if (_0x63__0x57_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xad_out = await _0x40_out
                                    let _0x6a__0x66_out = _0xad_out
                                    const _0xac_concat = await (_0x6a__0x66_out + "buzz")
                                    let _0x6b__0x65_concat = _0xac_concat
                                    const _0xab_out = await (_0x40_out = _0x6b__0x65_concat)
                                    let _0x6c__0x64_out = _0xab_out
                                    _0x6c__0x64_out
                                }
                            } }
                        const _0xaf_out = await _0x40_out
                        let _0x70__0x6e_out = _0xaf_out
                        const _0xae_eq = await (_0x70__0x6e_out === "")
                        let _0x71__0x6d_eq = _0xae_eq
                        if (_0x71__0x6d_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xb1_i = await _0x37_i
                                    let _0x75__0x73_i = _0xb1_i
                                    const _0xb0_out = await (_0x40_out = _0x75__0x73_i)
                                    let _0x76__0x72_out = _0xb0_out
                                    _0x76__0x72_out
                                }
                            } }
                        const _0xb3_out = await _0x40_out
                        let _0x7a__0x78_out = _0xb3_out
                        const _0xb2_print = await console.log(_0x7a__0x78_out)
                        let _0x7b__0x77_print = _0xb2_print
                        _0x7b__0x77_print
                        const _0xb6_i = await _0x37_i
                        let _0x82__0x7e_i = _0xb6_i
                        const _0xb5_add = await (_0x82__0x7e_i + 1)
                        let _0x83__0x7d_add = _0xb5_add
                        const _0xb4_i = await (_0x37_i = _0x83__0x7d_add)
                        let _0x84__0x7c_i = _0xb4_i
                        _0x84__0x7c_i
                    }
                } }
        }
    } 
})();
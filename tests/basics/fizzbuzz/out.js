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
            const _0x34_is_tty = await _67lang.is_tty()
            let _0x3_is_tty = _0x34_is_tty
            if (_0x3_is_tty) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x35_prompt = await _67lang.prompt("fizz? ")
                        let _0x5_prompt = _0x35_prompt
                        _0x0_fizz_divisor = _0x5_prompt
                        let _0x4_fizz_divisor = _0x0_fizz_divisor
                        _0x4_fizz_divisor
                        const _0x36_prompt = await _67lang.prompt("buzz? ")
                        let _0x7_prompt = _0x36_prompt
                        _0x1_buzz_divisor = _0x7_prompt
                        let _0x6_buzz_divisor = _0x1_buzz_divisor
                        _0x6_buzz_divisor
                        const _0x37_prompt = await _67lang.prompt("n? ")
                        let _0x9_prompt = _0x37_prompt
                        _0x2_n = _0x9_prompt
                        let _0x8_n = _0x2_n
                        _0x8_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x38_stdin = await _67lang.stdin()
                    let _0xa_stdin = _0x38_stdin
                    let _0xb_input = _0xa_stdin
                    _0xb_input
                    let _0xd_input = _0xb_input
                    const _0x39_split = await String.prototype.split.call(_0xd_input, "\n")
                    let _0xe_split = _0x39_split
                    _0xb_input = _0xe_split
                    let _0xc_input = _0xb_input
                    _0xc_input

                    let _0x10_input = _0xb_input
                    const _0x3a__hash_ = await _0x10_input[0]
                    let _0x11__hash_ = _0x3a__hash_
                    _0x0_fizz_divisor = _0x11__hash_
                    let _0xf_fizz_divisor = _0x0_fizz_divisor
                    _0xf_fizz_divisor
                    let _0x13_input = _0xb_input
                    const _0x3b__hash_ = await _0x13_input[1]
                    let _0x14__hash_ = _0x3b__hash_
                    _0x1_buzz_divisor = _0x14__hash_
                    let _0x12_buzz_divisor = _0x1_buzz_divisor
                    _0x12_buzz_divisor
                    let _0x16_input = _0xb_input
                    const _0x3c__hash_ = await _0x16_input[2]
                    let _0x17__hash_ = _0x3c__hash_
                    _0x2_n = _0x17__hash_
                    let _0x15_n = _0x2_n
                    _0x15_n
                }
            } 
            let _0x18_i = 0
            _0x18_i
            while(true) {let _0x1a_i = _0x18_i
                let _0x1b_n = _0x2_n
                const _0x3d_nondesc = await (_0x1a_i <= _0x1b_n)
                let _0x19_nondesc = _0x3d_nondesc
                if (!_0x19_nondesc) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1c_out = ""
                        _0x1c_out
                        let _0x1f_i = _0x18_i
                        let _0x20_fizz_divisor = _0x0_fizz_divisor
                        const _0x3f_mod = await (_0x1f_i % _0x20_fizz_divisor)
                        let _0x1e_mod = _0x3f_mod
                        const _0x3e_eq = await (_0x1e_mod === 0)
                        let _0x1d_eq = _0x3e_eq
                        if (_0x1d_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x23_out = _0x1c_out
                                    const _0x40_concat = await (_0x23_out + "fizz")
                                    let _0x22_concat = _0x40_concat
                                    _0x1c_out = _0x22_concat
                                    let _0x21_out = _0x1c_out
                                    _0x21_out
                                }
                            } }
                        let _0x26_i = _0x18_i
                        let _0x27_buzz_divisor = _0x1_buzz_divisor
                        const _0x42_mod = await (_0x26_i % _0x27_buzz_divisor)
                        let _0x25_mod = _0x42_mod
                        const _0x41_eq = await (_0x25_mod === 0)
                        let _0x24_eq = _0x41_eq
                        if (_0x24_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x2a_out = _0x1c_out
                                    const _0x43_concat = await (_0x2a_out + "buzz")
                                    let _0x29_concat = _0x43_concat
                                    _0x1c_out = _0x29_concat
                                    let _0x28_out = _0x1c_out
                                    _0x28_out
                                }
                            } }
                        let _0x2c_out = _0x1c_out
                        const _0x44_eq = await (_0x2c_out === "")
                        let _0x2b_eq = _0x44_eq
                        if (_0x2b_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x2e_i = _0x18_i
                                    _0x1c_out = _0x2e_i
                                    let _0x2d_out = _0x1c_out
                                    _0x2d_out
                                }
                            } }
                        let _0x30_out = _0x1c_out
                        const _0x45_print = await console.log(_0x30_out)
                        let _0x2f_print = _0x45_print
                        _0x2f_print
                        let _0x33_i = _0x18_i
                        const _0x46_add = await (_0x33_i + 1)
                        let _0x32_add = _0x46_add
                        _0x18_i = _0x32_add
                        let _0x31_i = _0x18_i
                        _0x31_i
                    }
                } }
        }
    } 
})();
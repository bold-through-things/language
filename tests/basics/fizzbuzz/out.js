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
            let _0x0_fizz_divisor = ""
            _0x0_fizz_divisor
            let _0x1_buzz_divisor = ""
            _0x1_buzz_divisor
            let _0x2_n = ""
            _0x2_n
            const _0x43_is_tty = await _67lang.is_tty()
            let _0x4__0x3_pipeline_result = _0x43_is_tty
            if (_0x4__0x3_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x45_prompt = await prompt("fizz? ")
                    const _0x44_fizz_divisor = await (_0x0_fizz_divisor = _0x45_prompt)
                    _0x44_fizz_divisor
                    const _0x47_prompt = await prompt("buzz? ")
                    const _0x46_buzz_divisor = await (_0x1_buzz_divisor = _0x47_prompt)
                    _0x46_buzz_divisor
                    const _0x49_prompt = await prompt("n? ")
                    const _0x48_n = await (_0x2_n = _0x49_prompt)
                    _0x48_n
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x4a_stdin = await _67lang.stdin()
                    let _0x6__0x5_pipeline_result = _0x4a_stdin
                    let _0x7_input = _0x6__0x5_pipeline_result
                    _0x7_input
                    const _0x4c_input = await _0x7_input
                    const _0x4b_split = await String.prototype.split.call(_0x4c_input, "\n")
                    let _0x9__0x8_pipeline_result = _0x4b_split
                    let _0xa_input = _0x9__0x8_pipeline_result
                    _0xa_input

                    const _0x4f_input = await _0xa_input
                    let _0xc__0xb_pipeline_result = _0x4f_input
                    const _0x4e__hash_ = await _0xc__0xb_pipeline_result[0]
                    const _0x4d_fizz_divisor = await (_0x0_fizz_divisor = _0x4e__hash_)
                    _0x4d_fizz_divisor
                    const _0x52_input = await _0xa_input
                    let _0xe__0xd_pipeline_result = _0x52_input
                    const _0x51__hash_ = await _0xe__0xd_pipeline_result[1]
                    const _0x50_buzz_divisor = await (_0x1_buzz_divisor = _0x51__hash_)
                    _0x50_buzz_divisor
                    const _0x55_input = await _0xa_input
                    let _0x12__0x11_pipeline_result = _0x55_input
                    const _0x54__hash_ = await _0x12__0x11_pipeline_result[2]
                    let _0x13__0x10_pipeline_result = _0x54__hash_
                    let _0x14__generics_please_i_beg_you_help = _0x13__0x10_pipeline_result
                    const _0x53_n = await (_0x2_n = _0x14__generics_please_i_beg_you_help)
                    let _0x15__0xf_pipeline_result = _0x53_n
                    _0x15__0xf_pipeline_result
                }
            } 
            let _0x16_i = 0
            _0x16_i
            while(true) {const _0x57_i = await _0x16_i
                let _0x19__0x18_pipeline_result = _0x57_i
                const _0x58_n = await _0x2_n
                let _0x1b__0x1a_pipeline_result = _0x58_n
                const _0x56_nondesc = await (_0x19__0x18_pipeline_result <= _0x1b__0x1a_pipeline_result)
                let _0x1c__0x17_pipeline_result = _0x56_nondesc
                if (!_0x1c__0x17_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1d_out = ""
                        _0x1d_out
                        const _0x5b_i = await _0x16_i
                        let _0x21__0x20_pipeline_result = _0x5b_i
                        const _0x5c_fizz_divisor = await _0x0_fizz_divisor
                        let _0x23__0x22_pipeline_result = _0x5c_fizz_divisor
                        const _0x5a_mod = await (_0x21__0x20_pipeline_result % _0x23__0x22_pipeline_result)
                        let _0x24__0x1f_pipeline_result = _0x5a_mod
                        const _0x59_eq = await (_0x24__0x1f_pipeline_result === 0)
                        let _0x25__0x1e_pipeline_result = _0x59_eq
                        if (_0x25__0x1e_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x5f_out = await _0x1d_out
                                let _0x27__0x26_pipeline_result = _0x5f_out
                                const _0x5e_concat = await String.prototype.concat.call(_0x27__0x26_pipeline_result, "fizz")
                                const _0x5d_out = await (_0x1d_out = _0x5e_concat)
                                _0x5d_out
                            }
                        } 
                        const _0x62_i = await _0x16_i
                        let _0x2b__0x2a_pipeline_result = _0x62_i
                        const _0x63_buzz_divisor = await _0x1_buzz_divisor
                        let _0x2d__0x2c_pipeline_result = _0x63_buzz_divisor
                        const _0x61_mod = await (_0x2b__0x2a_pipeline_result % _0x2d__0x2c_pipeline_result)
                        let _0x2e__0x29_pipeline_result = _0x61_mod
                        const _0x60_eq = await (_0x2e__0x29_pipeline_result === 0)
                        let _0x2f__0x28_pipeline_result = _0x60_eq
                        if (_0x2f__0x28_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x66_out = await _0x1d_out
                                let _0x31__0x30_pipeline_result = _0x66_out
                                const _0x65_concat = await String.prototype.concat.call(_0x31__0x30_pipeline_result, "buzz")
                                const _0x64_out = await (_0x1d_out = _0x65_concat)
                                _0x64_out
                            }
                        } 
                        const _0x68_out = await _0x1d_out
                        let _0x34__0x33_pipeline_result = _0x68_out
                        const _0x67_eq = await (_0x34__0x33_pipeline_result === "")
                        let _0x35__0x32_pipeline_result = _0x67_eq
                        if (_0x35__0x32_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x6b_i = await _0x16_i
                                let _0x37__0x36_pipeline_result = _0x6b_i
                                const _0x6a_concat = await ("" + _0x37__0x36_pipeline_result)
                                const _0x69_out = await (_0x1d_out = _0x6a_concat)
                                _0x69_out
                            }
                        } 
                        const _0x6d_out = await _0x1d_out
                        let _0x3a__0x39_pipeline_result = _0x6d_out
                        const _0x6c_print = await console.log(_0x3a__0x39_pipeline_result)
                        let _0x3b__0x38_pipeline_result = _0x6c_print
                        _0x3b__0x38_pipeline_result
                        const _0x70_i = await _0x16_i
                        let _0x3f__0x3e_pipeline_result = _0x70_i
                        const _0x6f_add = await (_0x3f__0x3e_pipeline_result + 1)
                        let _0x40__0x3d_pipeline_result = _0x6f_add
                        let _0x41__fix_the_fucking_add_return_type = _0x40__0x3d_pipeline_result
                        const _0x6e_i = await (_0x16_i = _0x41__fix_the_fucking_add_return_type)
                        let _0x42__0x3c_pipeline_result = _0x6e_i
                        _0x42__0x3c_pipeline_result
                    }
                } }
        }
    } 
})();
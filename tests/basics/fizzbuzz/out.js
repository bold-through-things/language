
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
            let _0x0_fizz_divisor = 0
            _0x0_fizz_divisor
            let _0x1_buzz_divisor = 0
            _0x1_buzz_divisor
            let _0x2_n = 0
            _0x2_n

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x42_stdin = await _67lang.stdin()
                    let _0x4__0x3_pipeline_result = _0x42_stdin
                    let _0x5_input = _0x4__0x3_pipeline_result
                    _0x5_input
                    const _0x44_input = await _0x5_input
                    const _0x43_split = await String.prototype.split.call(_0x44_input, "\n")
                    let _0x7__0x6_pipeline_result = _0x43_split
                    let _0x8_input = _0x7__0x6_pipeline_result
                    _0x8_input

                    const _0x46_input = await _0x8_input
                    let _0xb__0xa_pipeline_result = _0x46_input
                    const _0x45__hash_ = await _0xb__0xa_pipeline_result[0]
                    let _0xc__0x9_pipeline_result = _0x45__hash_
                    _0xc__0x9_pipeline_result
                    const _0x49__0x9_pipeline_result = await _0xc__0x9_pipeline_result
                    const _0x48_parseInt = await parseInt(_0x49__0x9_pipeline_result)
                    const _0x47_fizz_divisor = await (_0x0_fizz_divisor = _0x48_parseInt)
                    _0x47_fizz_divisor
                    const _0x4b_input = await _0x8_input
                    let _0xf__0xe_pipeline_result = _0x4b_input
                    const _0x4a__hash_ = await _0xf__0xe_pipeline_result[1]
                    let _0x10__0xd_pipeline_result = _0x4a__hash_
                    _0x10__0xd_pipeline_result
                    const _0x4e__0xd_pipeline_result = await _0x10__0xd_pipeline_result
                    const _0x4d_parseInt = await parseInt(_0x4e__0xd_pipeline_result)
                    const _0x4c_buzz_divisor = await (_0x1_buzz_divisor = _0x4d_parseInt)
                    _0x4c_buzz_divisor
                    const _0x50_input = await _0x8_input
                    let _0x13__0x12_pipeline_result = _0x50_input
                    const _0x4f__hash_ = await _0x13__0x12_pipeline_result[2]
                    let _0x14__0x11_pipeline_result = _0x4f__hash_
                    _0x14__0x11_pipeline_result
                    const _0x53__0x11_pipeline_result = await _0x14__0x11_pipeline_result
                    const _0x52_parseInt = await parseInt(_0x53__0x11_pipeline_result)
                    const _0x51_n = await (_0x2_n = _0x52_parseInt)
                    _0x51_n
                }
            } 
            let _0x15_i = 0
            _0x15_i
            while(true) {
                const _0x55_i = await _0x15_i
                let _0x18__0x17_pipeline_result = _0x55_i
                const _0x56_n = await _0x2_n
                let _0x1a__0x19_pipeline_result = _0x56_n
                const _0x54_nondesc = await (_0x18__0x17_pipeline_result <= _0x1a__0x19_pipeline_result)
                let _0x1b__0x16_pipeline_result = _0x54_nondesc
                if (!_0x1b__0x16_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1c_out = ""
                        _0x1c_out
                        const _0x59_i = await _0x15_i
                        let _0x20__0x1f_pipeline_result = _0x59_i
                        const _0x5a_fizz_divisor = await _0x0_fizz_divisor
                        let _0x22__0x21_pipeline_result = _0x5a_fizz_divisor
                        const _0x58_mod = await (_0x20__0x1f_pipeline_result % _0x22__0x21_pipeline_result)
                        let _0x23__0x1e_pipeline_result = _0x58_mod
                        const _0x57_eq = await (_0x23__0x1e_pipeline_result === 0)
                        let _0x24__0x1d_pipeline_result = _0x57_eq
                        if (_0x24__0x1d_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x5d_out = await _0x1c_out
                                let _0x26__0x25_pipeline_result = _0x5d_out
                                const _0x5c_concat = await String.prototype.concat.call(_0x26__0x25_pipeline_result, "fizz")
                                const _0x5b_out = await (_0x1c_out = _0x5c_concat)
                                _0x5b_out
                            }
                        } 
                        const _0x60_i = await _0x15_i
                        let _0x2a__0x29_pipeline_result = _0x60_i
                        const _0x61_buzz_divisor = await _0x1_buzz_divisor
                        let _0x2c__0x2b_pipeline_result = _0x61_buzz_divisor
                        const _0x5f_mod = await (_0x2a__0x29_pipeline_result % _0x2c__0x2b_pipeline_result)
                        let _0x2d__0x28_pipeline_result = _0x5f_mod
                        const _0x5e_eq = await (_0x2d__0x28_pipeline_result === 0)
                        let _0x2e__0x27_pipeline_result = _0x5e_eq
                        if (_0x2e__0x27_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x64_out = await _0x1c_out
                                let _0x30__0x2f_pipeline_result = _0x64_out
                                const _0x63_concat = await String.prototype.concat.call(_0x30__0x2f_pipeline_result, "buzz")
                                const _0x62_out = await (_0x1c_out = _0x63_concat)
                                _0x62_out
                            }
                        } 
                        const _0x66_out = await _0x1c_out
                        let _0x33__0x32_pipeline_result = _0x66_out
                        const _0x65_eq = await (_0x33__0x32_pipeline_result === "")
                        let _0x34__0x31_pipeline_result = _0x65_eq
                        if (_0x34__0x31_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x6a_i = await _0x15_i
                                const _0x69_toString = await Number.prototype.toString.call(_0x6a_i)
                                let _0x36__0x35_pipeline_result = _0x69_toString
                                const _0x68_concat = await String.prototype.concat.call("", _0x36__0x35_pipeline_result)
                                const _0x67_out = await (_0x1c_out = _0x68_concat)
                                _0x67_out
                            }
                        } 
                        const _0x6c_out = await _0x1c_out
                        let _0x39__0x38_pipeline_result = _0x6c_out
                        const _0x6b_print = await console.log(_0x39__0x38_pipeline_result)
                        let _0x3a__0x37_pipeline_result = _0x6b_print
                        _0x3a__0x37_pipeline_result
                        const _0x6f_i = await _0x15_i
                        let _0x3e__0x3d_pipeline_result = _0x6f_i
                        const _0x6e_add = await (_0x3e__0x3d_pipeline_result + 1)
                        let _0x3f__0x3c_pipeline_result = _0x6e_add
                        let _0x40__fix_the_fucking_add_return_type = _0x3f__0x3c_pipeline_result
                        const _0x6d_i = await (_0x15_i = _0x40__fix_the_fucking_add_return_type)
                        let _0x41__0x3b_pipeline_result = _0x6d_i
                        _0x41__0x3b_pipeline_result
                    }
                } }
        }
    } 
})();
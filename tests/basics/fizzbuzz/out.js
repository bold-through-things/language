globalThis._67lang = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    any: (...arr) => arr.reduce((sum, a) => sum || a, false),
    all: (...arr) => arr.reduce((sum, a) => sum && a, true),
    asc: (...arr) => arr.every((v, i, a) => !i || a[i - 1] <= v), // who let bro cook? https://stackoverflow.com/a/53833620
    add: (...arr) => arr.reduce((sum, a) => sum + (a ?? 0), 0),
    mod: (...arr) => arr[0] % arr[1], // TODO - shouldn't be a binary operation (how?) TODO - ensure we're not ignoring inputs silently
    none: (...arr) => arr.every(v => !v),
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

    keys: Object.keys.bind(Object),
    values: Object.values.bind(Object),
    log: console.log.bind(console),

    store() {
        const obj = { value: null }
        const fn = (function (set) { if (set !== undefined) { this.value = set; return set; } else { return this.value; } }).bind(obj)
        return fn
    },



    /**
     * Calls a method or sets a property on an object, simulating `obj[field](...)` or `obj[field] = value`.
     * If a setter exists on the prototype, it's invoked. Otherwise, the field is either called (if function) or assigned to.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to call or assign.
     * @param {...unknown} values - Arguments to pass to the method or the value to assign.
     * @returns {Promise<unknown>} The result of the method call, or `undefined` if assigning.
     * @throws {TypeError} If the number of arguments is invalid for the setter or assignment.
     */
    async access(obj, field, ...values) {
        if (values.length == 0) {
            const value = obj[field];

            if (typeof value === 'function') {
                return await value.call(obj);
            } else {
                return value;
            }
        }

        const proto = Object.getPrototypeOf(obj);
        const desc = proto ? Object.getOwnPropertyDescriptor(proto, field) : undefined;

        if (desc?.set) {
            if (values.length !== 1) {
                throw new TypeError(`Setter for '${String(field)}' expects exactly 1 argument, got ${values.length}`);
            }
            obj[field] = values[0];
            return values[0];
        }

        const member = obj[field];

        if (typeof member === 'function') {
            return await member.call(obj, ...values);
        } else {
            if (values.length !== 1) {
                throw new TypeError(`Assignment to '${String(field)}' expects exactly 1 value, got ${values.length}`);
            }
            obj[field] = values[0];
            return values[0];
        }
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
        if (n === null) return "";
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
            const _0x31_await__67lang_dot_is_tty_lp_ = await _67lang.is_tty()
            if (_0x31_await__67lang_dot_is_tty_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x32_await__67lang_dot_prompt_lp_ = await _67lang.prompt("fizz? ")
                        _0x0_fizz_divisor = _0x32_await__67lang_dot_prompt_lp_
                        let _0x3_fizz_divisor = _0x0_fizz_divisor
                        _0x3_fizz_divisor
                        const _0x33_await__67lang_dot_prompt_lp_ = await _67lang.prompt("buzz? ")
                        _0x1_buzz_divisor = _0x33_await__67lang_dot_prompt_lp_
                        let _0x4_buzz_divisor = _0x1_buzz_divisor
                        _0x4_buzz_divisor
                        const _0x34_await__67lang_dot_prompt_lp_ = await _67lang.prompt("n? ")
                        _0x2_n = _0x34_await__67lang_dot_prompt_lp_
                        let _0x5_n = _0x2_n
                        _0x5_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x35_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
                    let _0x6_input = _0x35_await__67lang_dot_stdin_lp_
                    _0x6_input
                    let _0xa__0x7_input = _0x6_input
                    const _0x36_split = await String.prototype.split.call(_0xa__0x7_input, "\n")
                    let _0xb__0x8_split = _0x36_split
                    _0x6_input = _0xb__0x8_split
                    let _0x9_input = _0x6_input
                    _0x9_input

                    let _0xf__0xc_input = _0x6_input
                    const _0x37__0xf__0xc_input = await _0xf__0xc_input[0]
                    let _0x10__0xd_key = _0x37__0xf__0xc_input
                    _0x0_fizz_divisor = _0x10__0xd_key
                    let _0xe_fizz_divisor = _0x0_fizz_divisor
                    _0xe_fizz_divisor
                    let _0x14__0x11_input = _0x6_input
                    const _0x38__0x14__0x11_input = await _0x14__0x11_input[1]
                    let _0x15__0x12_key = _0x38__0x14__0x11_input
                    _0x1_buzz_divisor = _0x15__0x12_key
                    let _0x13_buzz_divisor = _0x1_buzz_divisor
                    _0x13_buzz_divisor
                    let _0x19__0x16_input = _0x6_input
                    const _0x39__0x19__0x16_input = await _0x19__0x16_input[2]
                    let _0x1a__0x17_key = _0x39__0x19__0x16_input
                    _0x2_n = _0x1a__0x17_key
                    let _0x18_n = _0x2_n
                    _0x18_n
                }
            } 
            let _0x1b_i = 0
            _0x1b_i
            while(true) {let _0x1c_i = _0x1b_i
                let _0x1d_n = _0x2_n
                const _0x3a_await__67lang_dot_asc_lp_ = await _67lang.asc(_0x1c_i, _0x1d_n)
                if (!_0x3a_await__67lang_dot_asc_lp_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1e_out = ""
                        _0x1e_out
                        let _0x1f_i = _0x1b_i
                        let _0x20_fizz_divisor = _0x0_fizz_divisor
                        const _0x3b_await__67lang_dot_mod_lp_ = await _67lang.mod(_0x1f_i, _0x20_fizz_divisor)
                        const _0x3c_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x3b_await__67lang_dot_mod_lp_, 0)
                        if (_0x3c_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x23__0x21_out = _0x1e_out
                                    const _0x3d_await__67lang_dot_concat_lp_ = await _67lang.concat(_0x23__0x21_out, "fizz")
                                    _0x1e_out = _0x3d_await__67lang_dot_concat_lp_
                                    let _0x22_out = _0x1e_out
                                    _0x22_out
                                }
                            } }
                        let _0x24_i = _0x1b_i
                        let _0x25_buzz_divisor = _0x1_buzz_divisor
                        const _0x3e_await__67lang_dot_mod_lp_ = await _67lang.mod(_0x24_i, _0x25_buzz_divisor)
                        const _0x3f_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x3e_await__67lang_dot_mod_lp_, 0)
                        if (_0x3f_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x28__0x26_out = _0x1e_out
                                    const _0x40_await__67lang_dot_concat_lp_ = await _67lang.concat(_0x28__0x26_out, "buzz")
                                    _0x1e_out = _0x40_await__67lang_dot_concat_lp_
                                    let _0x27_out = _0x1e_out
                                    _0x27_out
                                }
                            } }
                        let _0x29_out = _0x1e_out
                        const _0x41_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x29_out, "")
                        if (_0x41_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x2c__0x2a_i = _0x1b_i
                                    _0x1e_out = _0x2c__0x2a_i
                                    let _0x2b_out = _0x1e_out
                                    _0x2b_out
                                }
                            } }
                        let _0x2d_out = _0x1e_out
                        const _0x42_await__67lang_dot_log_lp_ = await _67lang.log(_0x2d_out)
                        _0x42_await__67lang_dot_log_lp_
                        let _0x30__0x2e_i = _0x1b_i
                        const _0x43_await__67lang_dot_add_lp_ = await _67lang.add(_0x30__0x2e_i, 1)
                        _0x1b_i = _0x43_await__67lang_dot_add_lp_
                        let _0x2f_i = _0x1b_i
                        _0x2f_i
                    }
                } }
        }
    } 
})();
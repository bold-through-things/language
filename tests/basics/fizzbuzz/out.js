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
            let fizz_divisor
            fizz_divisor
            let buzz_divisor
            buzz_divisor
            let n
            n
            const _0x1f_await__67lang_dot_is_tty_lp_ = await _67lang.is_tty()
            if (_0x1f_await__67lang_dot_is_tty_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x21_await__67lang_dot_prompt_lp_ = await _67lang.prompt("fizz? ")
                        fizz_divisor = _0x21_await__67lang_dot_prompt_lp_
                        const _0x20_fizz_divisor = await fizz_divisor
                        let _0x0_fizz_divisor = _0x20_fizz_divisor
                        _0x0_fizz_divisor
                        const _0x23_await__67lang_dot_prompt_lp_ = await _67lang.prompt("buzz? ")
                        buzz_divisor = _0x23_await__67lang_dot_prompt_lp_
                        const _0x22_buzz_divisor = await buzz_divisor
                        let _0x1_buzz_divisor = _0x22_buzz_divisor
                        _0x1_buzz_divisor
                        const _0x25_await__67lang_dot_prompt_lp_ = await _67lang.prompt("n? ")
                        n = _0x25_await__67lang_dot_prompt_lp_
                        const _0x24_n = await n
                        let _0x2_n = _0x24_n
                        _0x2_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x26_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
                    let input = _0x26_await__67lang_dot_stdin_lp_
                    input
                    const _0x28_input = await input
                    let _0x3_input = _0x28_input
                    const _0x2a__0x3_input = await _0x3_input
                    const _0x29_split = await String.prototype.split.call(_0x2a__0x3_input, "\n")
                    let _0x4_split = _0x29_split
                    input = _0x4_split
                    const _0x27_input = await input
                    let _0x5_input = _0x27_input
                    _0x5_input

                    const _0x2c_input = await input
                    let _0x6_input = _0x2c_input
                    const _0x2d__0x6_input = await _0x6_input[0]
                    let _0x7_key = _0x2d__0x6_input
                    fizz_divisor = _0x7_key
                    const _0x2b_fizz_divisor = await fizz_divisor
                    let _0x8_fizz_divisor = _0x2b_fizz_divisor
                    _0x8_fizz_divisor
                    const _0x2f_input = await input
                    let _0x9_input = _0x2f_input
                    const _0x30__0x9_input = await _0x9_input[1]
                    let _0xa_key = _0x30__0x9_input
                    buzz_divisor = _0xa_key
                    const _0x2e_buzz_divisor = await buzz_divisor
                    let _0xb_buzz_divisor = _0x2e_buzz_divisor
                    _0xb_buzz_divisor
                    const _0x32_input = await input
                    let _0xc_input = _0x32_input
                    const _0x33__0xc_input = await _0xc_input[2]
                    let _0xd_key = _0x33__0xc_input
                    n = _0xd_key
                    const _0x31_n = await n
                    let _0xe_n = _0x31_n
                    _0xe_n
                }
            } 
            let i = 0
            i
            while(true) {const _0x34_i = await i
                let _0xf_i = _0x34_i
                const _0x35_n = await n
                let _0x10_n = _0x35_n
                const _0x36_await__67lang_dot_asc_lp_ = await _67lang.asc(_0xf_i, _0x10_n)
                if (!_0x36_await__67lang_dot_asc_lp_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let out = ""
                        out
                        const _0x37_i = await i
                        let _0x11_i = _0x37_i
                        const _0x38_fizz_divisor = await fizz_divisor
                        let _0x12_fizz_divisor = _0x38_fizz_divisor
                        const _0x39_await__67lang_dot_mod_lp_ = await _67lang.mod(_0x11_i, _0x12_fizz_divisor)
                        const _0x3a_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x39_await__67lang_dot_mod_lp_, 0)
                        if (_0x3a_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x3c_out = await out
                                    let _0x13_out = _0x3c_out
                                    const _0x3d_await__67lang_dot_concat_lp_ = await _67lang.concat(_0x13_out, "fizz")
                                    out = _0x3d_await__67lang_dot_concat_lp_
                                    const _0x3b_out = await out
                                    let _0x14_out = _0x3b_out
                                    _0x14_out
                                }
                            } }
                        const _0x3e_i = await i
                        let _0x15_i = _0x3e_i
                        const _0x3f_buzz_divisor = await buzz_divisor
                        let _0x16_buzz_divisor = _0x3f_buzz_divisor
                        const _0x40_await__67lang_dot_mod_lp_ = await _67lang.mod(_0x15_i, _0x16_buzz_divisor)
                        const _0x41_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x40_await__67lang_dot_mod_lp_, 0)
                        if (_0x41_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x43_out = await out
                                    let _0x17_out = _0x43_out
                                    const _0x44_await__67lang_dot_concat_lp_ = await _67lang.concat(_0x17_out, "buzz")
                                    out = _0x44_await__67lang_dot_concat_lp_
                                    const _0x42_out = await out
                                    let _0x18_out = _0x42_out
                                    _0x18_out
                                }
                            } }
                        const _0x45_out = await out
                        let _0x19_out = _0x45_out
                        const _0x46_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x19_out, "")
                        if (_0x46_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x48_i = await i
                                    let _0x1a_i = _0x48_i
                                    out = _0x1a_i
                                    const _0x47_out = await out
                                    let _0x1b_out = _0x47_out
                                    _0x1b_out
                                }
                            } }
                        const _0x49_out = await out
                        let _0x1c_out = _0x49_out
                        const _0x4a_await__67lang_dot_log_lp_ = await _67lang.log(_0x1c_out)
                        _0x4a_await__67lang_dot_log_lp_
                        const _0x4c_i = await i
                        let _0x1d_i = _0x4c_i
                        const _0x4d_await__67lang_dot_add_lp_ = await _67lang.add(_0x1d_i, 1)
                        i = _0x4d_await__67lang_dot_add_lp_
                        const _0x4b_i = await i
                        let _0x1e_i = _0x4b_i
                        _0x1e_i
                    }
                } }
        }
    } 
})();
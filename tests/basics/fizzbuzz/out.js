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
            const _0x57_is_tty = await _67lang.is_tty()
            let _0x3_is_tty = _0x57_is_tty
            if (_0x3_is_tty) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x58_prompt = await _67lang.prompt("fizz? ")
                        let _0x6__0x4_prompt = _0x58_prompt
                        _0x0_fizz_divisor = _0x6__0x4_prompt
                        let _0x5_fizz_divisor = _0x0_fizz_divisor
                        _0x5_fizz_divisor
                        const _0x59_prompt = await _67lang.prompt("buzz? ")
                        let _0x9__0x7_prompt = _0x59_prompt
                        _0x1_buzz_divisor = _0x9__0x7_prompt
                        let _0x8_buzz_divisor = _0x1_buzz_divisor
                        _0x8_buzz_divisor
                        const _0x5a_prompt = await _67lang.prompt("n? ")
                        let _0xc__0xa_prompt = _0x5a_prompt
                        _0x2_n = _0xc__0xa_prompt
                        let _0xb_n = _0x2_n
                        _0xb_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x5b_stdin = await _67lang.stdin()
                    let _0xd_stdin = _0x5b_stdin
                    let _0xe_input = _0xd_stdin
                    _0xe_input
                    let _0x12__0xf_input = _0xe_input
                    const _0x5c_split = await String.prototype.split.call(_0x12__0xf_input, "\n")
                    let _0x13__0x10_split = _0x5c_split
                    _0xe_input = _0x13__0x10_split
                    let _0x11_input = _0xe_input
                    _0x11_input

                    let _0x17__0x14_input = _0xe_input
                    const _0x5d__0x17__0x14_input = await _0x17__0x14_input[0]
                    let _0x18__0x15_key = _0x5d__0x17__0x14_input
                    _0x0_fizz_divisor = _0x18__0x15_key
                    let _0x16_fizz_divisor = _0x0_fizz_divisor
                    _0x16_fizz_divisor
                    let _0x1c__0x19_input = _0xe_input
                    const _0x5e__0x1c__0x19_input = await _0x1c__0x19_input[1]
                    let _0x1d__0x1a_key = _0x5e__0x1c__0x19_input
                    _0x1_buzz_divisor = _0x1d__0x1a_key
                    let _0x1b_buzz_divisor = _0x1_buzz_divisor
                    _0x1b_buzz_divisor
                    let _0x21__0x1e_input = _0xe_input
                    const _0x5f__0x21__0x1e_input = await _0x21__0x1e_input[2]
                    let _0x22__0x1f_key = _0x5f__0x21__0x1e_input
                    _0x2_n = _0x22__0x1f_key
                    let _0x20_n = _0x2_n
                    _0x20_n
                }
            } 
            let _0x23_i = 0
            _0x23_i
            while(true) {let _0x27__0x24_i = _0x23_i
                let _0x28__0x25_n = _0x2_n
                const _0x60_nondesc = await (_0x27__0x24_i <= _0x28__0x25_n)
                let _0x26_nondesc = _0x60_nondesc
                if (!_0x26_nondesc) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x29_out = ""
                        _0x29_out
                        let _0x30__0x2a_i = _0x23_i
                        let _0x31__0x2b_fizz_divisor = _0x0_fizz_divisor
                        const _0x62_mod = await (_0x30__0x2a_i % _0x31__0x2b_fizz_divisor)
                        let _0x32__0x2c_mod = _0x62_mod
                        const _0x61_eq = await _67lang.eq(_0x32__0x2c_mod, 0)
                        let _0x2f_eq = _0x61_eq
                        if (_0x2f_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x37__0x33_out = _0x29_out
                                    const _0x63_concat = await (_0x37__0x33_out + "fizz")
                                    let _0x38__0x34_concat = _0x63_concat
                                    _0x29_out = _0x38__0x34_concat
                                    let _0x36_out = _0x29_out
                                    _0x36_out
                                }
                            } }
                        let _0x3f__0x39_i = _0x23_i
                        let _0x40__0x3a_buzz_divisor = _0x1_buzz_divisor
                        const _0x65_mod = await (_0x3f__0x39_i % _0x40__0x3a_buzz_divisor)
                        let _0x41__0x3b_mod = _0x65_mod
                        const _0x64_eq = await _67lang.eq(_0x41__0x3b_mod, 0)
                        let _0x3e_eq = _0x64_eq
                        if (_0x3e_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x46__0x42_out = _0x29_out
                                    const _0x66_concat = await (_0x46__0x42_out + "buzz")
                                    let _0x47__0x43_concat = _0x66_concat
                                    _0x29_out = _0x47__0x43_concat
                                    let _0x45_out = _0x29_out
                                    _0x45_out
                                }
                            } }
                        let _0x4a__0x48_out = _0x29_out
                        const _0x67_eq = await _67lang.eq(_0x4a__0x48_out, "")
                        let _0x49_eq = _0x67_eq
                        if (_0x49_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x4d__0x4b_i = _0x23_i
                                    _0x29_out = _0x4d__0x4b_i
                                    let _0x4c_out = _0x29_out
                                    _0x4c_out
                                }
                            } }
                        let _0x50__0x4e_out = _0x29_out
                        const _0x68_print = await console.log(_0x50__0x4e_out)
                        let _0x4f_print = _0x68_print
                        _0x4f_print
                        let _0x55__0x51_i = _0x23_i
                        const _0x69_add = await (_0x55__0x51_i + 1)
                        let _0x56__0x52_add = _0x69_add
                        _0x23_i = _0x56__0x52_add
                        let _0x54_i = _0x23_i
                        _0x54_i
                    }
                } }
        }
    } 
})();
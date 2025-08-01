globalThis.indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum || a, false),
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

    indentifire.prompt = async function (msg) {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) return "";
        return new TextDecoder().decode(buf.subarray(0, n)).trim();
    };

    let stdin_cached = null;

    indentifire.stdin = async function () {
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

    indentifire.is_tty = () => Deno.isatty(Deno.stdin.rid);
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = indentifire.scope(parent_scope)
            let fizz_divisor
            fizz_divisor
            let buzz_divisor
            buzz_divisor
            let n
            n
            const _0x1f__await_indentifire_0x2e_is_tty_0x28_ = await indentifire.is_tty()
            if (_0x1f__await_indentifire_0x2e_is_tty_0x28_) {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x21__await_indentifire_0x2e_prompt_0x28_ = await indentifire.prompt("fizz? ")
                        fizz_divisor = _0x21__await_indentifire_0x2e_prompt_0x28_
                        const _0x20__fizz_divisor = await fizz_divisor
                        let _0x0__fizz_divisor = _0x20__fizz_divisor
                        _0x0__fizz_divisor
                        const _0x23__await_indentifire_0x2e_prompt_0x28_ = await indentifire.prompt("buzz? ")
                        buzz_divisor = _0x23__await_indentifire_0x2e_prompt_0x28_
                        const _0x22__buzz_divisor = await buzz_divisor
                        let _0x1__buzz_divisor = _0x22__buzz_divisor
                        _0x1__buzz_divisor
                        const _0x25__await_indentifire_0x2e_prompt_0x28_ = await indentifire.prompt("n? ")
                        n = _0x25__await_indentifire_0x2e_prompt_0x28_
                        const _0x24__n = await n
                        let _0x2__n = _0x24__n
                        _0x2__n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    const _0x26__await_indentifire_0x2e_stdin_0x28_ = await indentifire.stdin()
                    let input = _0x26__await_indentifire_0x2e_stdin_0x28_
                    input
                    const _0x28__input = await input
                    let _0x3__input = _0x28__input
                    const _0x2a___0x3__input = await _0x3__input
                    const _0x29__split = await String.prototype.split.call(_0x2a___0x3__input, "\n")
                    let _0x4__split = _0x29__split
                    input = _0x4__split
                    const _0x27__input = await input
                    let _0x5__input = _0x27__input
                    _0x5__input

                    const _0x2c__input = await input
                    let _0x6__input = _0x2c__input
                    const _0x2d___0x6__input = await _0x6__input[0]
                    let _0x7__key = _0x2d___0x6__input
                    fizz_divisor = _0x7__key
                    const _0x2b__fizz_divisor = await fizz_divisor
                    let _0x8__fizz_divisor = _0x2b__fizz_divisor
                    _0x8__fizz_divisor
                    const _0x2f__input = await input
                    let _0x9__input = _0x2f__input
                    const _0x30___0x9__input = await _0x9__input[1]
                    let _0xa__key = _0x30___0x9__input
                    buzz_divisor = _0xa__key
                    const _0x2e__buzz_divisor = await buzz_divisor
                    let _0xb__buzz_divisor = _0x2e__buzz_divisor
                    _0xb__buzz_divisor
                    const _0x32__input = await input
                    let _0xc__input = _0x32__input
                    const _0x33___0xc__input = await _0xc__input[2]
                    let _0xd__key = _0x33___0xc__input
                    n = _0xd__key
                    const _0x31__n = await n
                    let _0xe__n = _0x31__n
                    _0xe__n
                }
            } 
            let i = 0
            i
            while(true) {const _0x34__i = await i
                let _0xf__i = _0x34__i
                const _0x35__n = await n
                let _0x10__n = _0x35__n
                const _0x36__await_indentifire_0x2e_asc_0x28_ = await indentifire.asc(_0xf__i, _0x10__n)
                if (!_0x36__await_indentifire_0x2e_asc_0x28_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        let out = ""
                        out
                        const _0x37__i = await i
                        let _0x11__i = _0x37__i
                        const _0x38__fizz_divisor = await fizz_divisor
                        let _0x12__fizz_divisor = _0x38__fizz_divisor
                        const _0x39__await_indentifire_0x2e_mod_0x28_ = await indentifire.mod(_0x11__i, _0x12__fizz_divisor)
                        const _0x3a__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x39__await_indentifire_0x2e_mod_0x28_, 0)
                        if (_0x3a__await_indentifire_0x2e_eq_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    const _0x3c__out = await out
                                    let _0x13__out = _0x3c__out
                                    const _0x3d__await_indentifire_0x2e_concat_0x28_ = await indentifire.concat(_0x13__out, "fizz")
                                    out = _0x3d__await_indentifire_0x2e_concat_0x28_
                                    const _0x3b__out = await out
                                    let _0x14__out = _0x3b__out
                                    _0x14__out
                                }
                            } }
                        const _0x3e__i = await i
                        let _0x15__i = _0x3e__i
                        const _0x3f__buzz_divisor = await buzz_divisor
                        let _0x16__buzz_divisor = _0x3f__buzz_divisor
                        const _0x40__await_indentifire_0x2e_mod_0x28_ = await indentifire.mod(_0x15__i, _0x16__buzz_divisor)
                        const _0x41__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x40__await_indentifire_0x2e_mod_0x28_, 0)
                        if (_0x41__await_indentifire_0x2e_eq_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    const _0x43__out = await out
                                    let _0x17__out = _0x43__out
                                    const _0x44__await_indentifire_0x2e_concat_0x28_ = await indentifire.concat(_0x17__out, "buzz")
                                    out = _0x44__await_indentifire_0x2e_concat_0x28_
                                    const _0x42__out = await out
                                    let _0x18__out = _0x42__out
                                    _0x18__out
                                }
                            } }
                        const _0x45__out = await out
                        let _0x19__out = _0x45__out
                        const _0x46__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x19__out, "")
                        if (_0x46__await_indentifire_0x2e_eq_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    const _0x48__i = await i
                                    let _0x1a__i = _0x48__i
                                    out = _0x1a__i
                                    const _0x47__out = await out
                                    let _0x1b__out = _0x47__out
                                    _0x1b__out
                                }
                            } }
                        const _0x49__out = await out
                        let _0x1c__out = _0x49__out
                        const _0x4a__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x1c__out)
                        _0x4a__await_indentifire_0x2e_log_0x28_
                        const _0x4c__i = await i
                        let _0x1d__i = _0x4c__i
                        const _0x4d__await_indentifire_0x2e_add_0x28_ = await indentifire.add(_0x1d__i, 1)
                        i = _0x4d__await_indentifire_0x2e_add_0x28_
                        const _0x4b__i = await i
                        let _0x1e__i = _0x4b__i
                        _0x1e__i
                    }
                } }
        }
    } 
})();
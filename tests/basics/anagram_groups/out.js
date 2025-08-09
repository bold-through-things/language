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
            const _0x25_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x25_stdin
            let _0x1_input = _0x0_stdin
            _0x1_input
            let _0x2_input = _0x1_input
            const _0x26_split = await String.prototype.split.call(_0x2_input, "\n")
            let _0x3_split = _0x26_split
            let _0x4_words = _0x3_split
            _0x4_words
            let _0x5_groups = {}
            _0x5_groups
            let _0x7__0x6_words = _0x4_words

            const _0x27_iter = _0x7__0x6_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x27_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x8_word = word
                        const _0x28_split = await String.prototype.split.call(_0x8_word, "")
                        let _0x9_split = _0x28_split
                        const _0x29_sort = await Array.prototype.sort.call(_0x9_split)
                        let _0xa_sort = _0x29_sort
                        const _0x2a_join = await Array.prototype.join.call(_0xa_sort, "")
                        let _0xb_join = _0x2a_join
                        let _0xc_key = _0xb_join
                        _0xc_key



                        let _0x11__0xe_groups = _0x5_groups
                        let _0x10__0xd_key = _0xc_key
                        const _0x2c_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x11__0xe_groups, _0x10__0xd_key)
                        const _0x2b_none = await !(_0x2c_await__67lang_dot_exists_inside_lp_)
                        let _0xf_none = _0x2b_none
                        if (_0xf_none) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x12_groups = _0x5_groups

                                    let _0x14_key = _0xc_key
                                    _0x12_groups[_0x14_key] = []
                                    const _0x2d__0x12_groups = await _0x12_groups[_0x14_key]
                                    let _0x13_key = _0x2d__0x12_groups
                                    _0x13_key
                                }
                            } }
                        let _0x16_groups = _0x5_groups
                        let _0x18_key = _0xc_key
                        const _0x2e__0x16_groups = await _0x16_groups[_0x18_key]
                        let _0x17_key = _0x2e__0x16_groups

                        let _0x1a__0x15_word = word
                        const _0x2f_push = await Array.prototype.push.call(_0x17_key, _0x1a__0x15_word)
                        let _0x19_push = _0x2f_push
                        _0x19_push
                    }
                } }
            let _0x1e__0x1b_groups = _0x5_groups
            const _0x30_values = await Object.values(_0x1e__0x1b_groups)
            let _0x1f__0x1c_values = _0x30_values

            const _0x31_iter = _0x1f__0x1c_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x31_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x23__0x20_group = group
                        const _0x33_join = await Array.prototype.join.call(_0x23__0x20_group, " ")
                        let _0x24__0x21_join = _0x33_join
                        const _0x32_print = await console.log(_0x24__0x21_join)
                        let _0x22_print = _0x32_print
                        _0x22_print
                    }
                } }
        }
    } 
})();
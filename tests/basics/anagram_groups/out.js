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
            const _0x14_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let input = _0x14_await__67lang_dot_stdin_lp_
            input
            const _0x15_input = await input
            let _0x0_input = _0x15_input
            const _0x17__0x0_input = await _0x0_input
            const _0x16_split = await String.prototype.split.call(_0x17__0x0_input, "\n")
            let _0x1_split = _0x16_split
            let words = _0x1_split
            words
            let groups = {}
            groups
            const _0x18_words = await words
            let _0x2_words = _0x18_words

            const _0x19_iter = _0x2_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x19_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x1a_word = await word
                        let _0x3_word = _0x1a_word
                        const _0x1c__0x3_word = await _0x3_word
                        const _0x1b_split = await String.prototype.split.call(_0x1c__0x3_word, "")
                        let _0x4_split = _0x1b_split
                        const _0x1e__0x4_split = await _0x4_split
                        const _0x1d_sort = await Array.prototype.sort.call(_0x1e__0x4_split)
                        let _0x5_sort = _0x1d_sort
                        const _0x20__0x5_sort = await _0x5_sort
                        const _0x1f_join = await Array.prototype.join.call(_0x20__0x5_sort, "")
                        let _0x6_join = _0x1f_join
                        let key = _0x6_join
                        key



                        const _0x21_groups = await groups
                        let _0x8_groups = _0x21_groups
                        const _0x22_key = await key
                        let _0x7_key = _0x22_key
                        const _0x23_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x8_groups, _0x7_key)
                        const _0x24_await__67lang_dot_none_lp_ = await _67lang.none(_0x23_await__67lang_dot_exists_inside_lp_)
                        if (_0x24_await__67lang_dot_none_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x25_groups = await groups
                                    let _0x9_groups = _0x25_groups

                                    const _0x27_key = await key
                                    let _0xb_key = _0x27_key
                                    _0x9_groups[_0xb_key] = []
                                    const _0x26__0x9_groups = await _0x9_groups[_0xb_key]
                                    let _0xa_key = _0x26__0x9_groups
                                    _0xa_key
                                }
                            } }
                        const _0x28_groups = await groups
                        let _0xd_groups = _0x28_groups
                        const _0x2a_key = await key
                        let _0xf_key = _0x2a_key
                        const _0x29__0xd_groups = await _0xd_groups[_0xf_key]
                        let _0xe_key = _0x29__0xd_groups

                        const _0x2c__0xe_key = await _0xe_key
                        const _0x2d_word = await word
                        let _0xc_word = _0x2d_word
                        const _0x2b_push = await Array.prototype.push.call(_0x2c__0xe_key, _0xc_word)
                        let _0x10_push = _0x2b_push
                        _0x10_push
                    }
                } }
            const _0x2e_groups = await groups
            let _0x11_groups = _0x2e_groups
            const _0x2f_await__67lang_dot_values_lp_ = await _67lang.values(_0x11_groups)

            const _0x30_iter = _0x2f_await__67lang_dot_values_lp_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x30_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x31_group = await group
                        let _0x12_group = _0x31_group
                        const _0x33__0x12_group = await _0x12_group
                        const _0x32_join = await Array.prototype.join.call(_0x33__0x12_group, " ")
                        let _0x13_join = _0x32_join
                        const _0x34_await__67lang_dot_log_lp_ = await _67lang.log(_0x13_join)
                        _0x34_await__67lang_dot_log_lp_
                    }
                } }
        }
    } 
})();
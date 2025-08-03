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
            const _0x1b_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_input = _0x1b_await__67lang_dot_stdin_lp_
            _0x0_input
            let _0x1_input = _0x0_input
            const _0x1c_split = await String.prototype.split.call(_0x1_input, "\n")
            let _0x2_split = _0x1c_split
            let _0x3_words = _0x2_split
            _0x3_words
            let _0x4_groups = {}
            _0x4_groups
            let _0x6__0x5_words = _0x3_words

            const _0x1d_iter = _0x6__0x5_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x1d_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_word = word
                        const _0x1e_split = await String.prototype.split.call(_0x7_word, "")
                        let _0x8_split = _0x1e_split
                        const _0x1f_sort = await Array.prototype.sort.call(_0x8_split)
                        let _0x9_sort = _0x1f_sort
                        const _0x20_join = await Array.prototype.join.call(_0x9_sort, "")
                        let _0xa_join = _0x20_join
                        let _0xb_key = _0xa_join
                        _0xb_key



                        let _0xd_groups = _0x4_groups
                        let _0xc_key = _0xb_key
                        const _0x21_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0xd_groups, _0xc_key)
                        const _0x22_await__67lang_dot_none_lp_ = await _67lang.none(_0x21_await__67lang_dot_exists_inside_lp_)
                        if (_0x22_await__67lang_dot_none_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0xe_groups = _0x4_groups

                                    let _0x10_key = _0xb_key
                                    _0xe_groups[_0x10_key] = []
                                    const _0x23__0xe_groups = await _0xe_groups[_0x10_key]
                                    let _0xf_key = _0x23__0xe_groups
                                    _0xf_key
                                }
                            } }
                        let _0x12_groups = _0x4_groups
                        let _0x14_key = _0xb_key
                        const _0x24__0x12_groups = await _0x12_groups[_0x14_key]
                        let _0x13_key = _0x24__0x12_groups

                        let _0x16__0x11_word = word
                        const _0x25_push = await Array.prototype.push.call(_0x13_key, _0x16__0x11_word)
                        let _0x15_push = _0x25_push
                        _0x15_push
                    }
                } }
            let _0x18__0x17_groups = _0x4_groups
            const _0x26_await__67lang_dot_values_lp_ = await _67lang.values(_0x18__0x17_groups)

            const _0x27_iter = _0x26_await__67lang_dot_values_lp_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x27_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x19_group = group
                        const _0x28_join = await Array.prototype.join.call(_0x19_group, " ")
                        let _0x1a_join = _0x28_join
                        const _0x29_await__67lang_dot_log_lp_ = await _67lang.log(_0x1a_join)
                        _0x29_await__67lang_dot_log_lp_
                    }
                } }
        }
    } 
})();
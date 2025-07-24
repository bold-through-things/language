globalThis.indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum || a, false),
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
    async call_or_set(obj, field, ...values) {
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

    /**
     * Gets a value from an object by field. If it's a function, calls it with `obj` as `this` and returns the result.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to access.
     * @returns {Promise<unknown>} The result of the method call or the field value.
     */
    async get_or_call(obj, field) {
        const value = obj[field];

        if (typeof value === 'function') {
            return await value.call(obj);
        } else {
            return value;
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
            scope.input = indentifire.store()
            const _0x0 = await indentifire.stdin()
            const _0x1 = await indentifire.call_or_set(scope, 'input', _0x0)
            _0x1
            scope.words = indentifire.store()
            /*input call=False index=False args=["'input'"]*/
            const _0x2_input = await indentifire.get_or_call(scope, 'input')
            /*split call=True index=False args=["'split'", '"\\n"']*/
            const _0x3_split = await indentifire.call_or_set(_0x2_input, 'split', "\n")
            const _0x4 = await indentifire.call_or_set(scope, 'words', _0x3_split)
            _0x4
            scope.groups = indentifire.store()
            const _0x5 = await indentifire.call_or_set(scope, 'groups', {})
            _0x5
            /*words call=False index=False args=["'words'"]*/
            const _0x6_words = await indentifire.get_or_call(scope, 'words')

            const _0x7 = _0x6_words[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x7.next();
                    if (done) break;
                    scope.word = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        scope.key = indentifire.store()
                        /*word call=False index=False args=["'word'"]*/
                        const _0x8_word = await indentifire.get_or_call(scope, 'word')
                        /*split call=True index=False args=["'split'", '""']*/
                        const _0x9_split = await indentifire.call_or_set(_0x8_word, 'split', "")
                        /*sort call=False index=False args=["'sort'"]*/
                        const _0xa_sort = await indentifire.get_or_call(_0x9_split, 'sort')
                        /*join call=True index=False args=["'join'", '""']*/
                        const _0xb_join = await indentifire.call_or_set(_0xa_sort, 'join', "")
                        const _0xc = await indentifire.call_or_set(scope, 'key', _0xb_join)
                        _0xc



                        /*groups call=False index=False args=["'groups'"]*/
                        const _0xd_groups = await indentifire.get_or_call(scope, 'groups')
                        /*key call=False index=False args=["'key'"]*/
                        const _0xe_key = await indentifire.get_or_call(scope, 'key')
                        const _0xf = await indentifire.exists_inside(_0xd_groups, _0xe_key)
                        const _0x10 = await indentifire.none(_0xf)
                        if (_0x10)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*key call=False index=False args=["'key'"]*/
                                    const _0x11_key = await indentifire.get_or_call(scope, 'key')
                                    /*groups call=False index=False args=["'groups'"]*/
                                    const _0x12_groups = await indentifire.get_or_call(scope, 'groups')
                                    /*key call=True index=True args=['_0x11_key', '[]']*/
                                    const _0x13_key = await indentifire.call_or_set(_0x12_groups, _0x11_key, [])
                                    _0x13_key
                                }
                            } }

                        /*key call=False index=False args=["'key'"]*/
                        const _0x14_key = await indentifire.get_or_call(scope, 'key')
                        /*groups call=False index=False args=["'groups'"]*/
                        const _0x15_groups = await indentifire.get_or_call(scope, 'groups')
                        /*key call=False index=True args=['_0x14_key']*/
                        const _0x16_key = await indentifire.get_or_call(_0x15_groups, _0x14_key)
                        /*word call=False index=False args=["'word'"]*/
                        const _0x17_word = await indentifire.get_or_call(scope, 'word')
                        /*push call=True index=False args=["'push'", '_0x17_word']*/
                        const _0x18_push = await indentifire.call_or_set(_0x16_key, 'push', _0x17_word)
                        _0x18_push
                    }
                } }

            /*groups call=False index=False args=["'groups'"]*/
            const _0x19_groups = await indentifire.get_or_call(scope, 'groups')
            const _0x1a = await indentifire.values(_0x19_groups)

            const _0x1b = _0x1a[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x1b.next();
                    if (done) break;
                    scope.group = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*group call=False index=False args=["'group'"]*/
                        const _0x1c_group = await indentifire.get_or_call(scope, 'group')
                        /*join call=True index=False args=["'join'", '" "']*/
                        const _0x1d_join = await indentifire.call_or_set(_0x1c_group, 'join', " ")
                        const _0x1e = await indentifire.log(_0x1d_join)
                        _0x1e
                    }
                } }

        }
    } 
})();
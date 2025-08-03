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

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x0_test = 0
                    _0x0_test
                    let _0x1_test_1
                    _0x1_test_1
                    let _0x3_test_1 = _0x1_test_1
                    _0x0_test = _0x3_test_1
                    let _0x2_test = _0x0_test
                    _0x2_test
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            let _0x4_test_1
                            _0x4_test_1
                            let _0x6_test_1 = _0x4_test_1
                            _0x0_test = _0x6_test_1
                            let _0x5_test = _0x0_test
                            _0x5_test
                        }
                    } 
                }
            } 

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x7_test = "test"
                    _0x7_test
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x8_test_str
                    _0x8_test_str
                    let _0x9_test_int
                    _0x9_test_int
                    let _0xb_test_str = _0x8_test_str
                    _0x9_test_int = _0xb_test_str
                    let _0xa_test_int = _0x9_test_int
                    _0xa_test_int
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            _0x8_test_str = 0
                            let _0xc_test_str = _0x8_test_str
                            _0xc_test_str
                            let _0xd_test_bool
                            _0xd_test_bool
                            let _0xf_test_str = _0x8_test_str
                            const _0x1a_split = await String.prototype.split.call(_0xf_test_str)
                            let _0x10_split = _0x1a_split
                            const _0x1b_sort = await Array.prototype.sort.call(_0x10_split)
                            let _0x11_sort = _0x1b_sort
                            const _0x1c_join = await Array.prototype.join.call(_0x11_sort)
                            let _0x13__0x12_join = _0x1c_join
                            _0xd_test_bool = _0x13__0x12_join
                            let _0xe_test_bool = _0xd_test_bool
                            _0xe_test_bool
                            let _0x14_test_bool = _0xd_test_bool

                            const _0x1d_split = await String.prototype.split.call(_0x14_test_bool)
                            let _0x15_split = _0x1d_split
                            _0x15_split
                            let _0x16_test_str = _0x8_test_str
                            const _0x1e_split = await String.prototype.split.call(_0x16_test_str)
                            let _0x17_split = _0x1e_split
                            const _0x1f_split = await String.prototype.split.call(_0x17_split)
                            let _0x18_split = _0x1f_split

                            const _0x20_split = await String.prototype.split.call(_0x18_split)
                            let _0x19_split = _0x20_split
                            _0x19_split
                        }
                    } 
                }
            } 
        }
    } 
})();
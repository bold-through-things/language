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

            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    let test = 0
                    test
                    const _0x16__test = await test
                    let _0x0__test = _0x16__test
                    let test_1 = _0x0__test
                    test_1
                    const _0x18__test_1 = await test_1
                    let _0x1__test_1 = _0x18__test_1
                    test = _0x1__test_1
                    const _0x17__test = await test
                    let _0x2__test = _0x17__test
                    _0x2__test
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            const _0x19__test = await test
                            let _0x3__test = _0x19__test
                            let test_1 = _0x3__test
                            test_1
                            const _0x1b__test_1 = await test_1
                            let _0x4__test_1 = _0x1b__test_1
                            test = _0x4__test_1
                            const _0x1a__test = await test
                            let _0x5__test = _0x1a__test
                            _0x5__test
                        }
                    } 
                }
            } 

            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    let test = "test"
                    test
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    let test_str
                    test_str
                    const _0x1c__test_str = await test_str
                    let _0x6__test_str = _0x1c__test_str
                    let test_int = _0x6__test_str
                    test_int
                    const _0x1e__test_str = await test_str
                    let _0x7__test_str = _0x1e__test_str
                    test_int = _0x7__test_str
                    const _0x1d__test_int = await test_int
                    let _0x8__test_int = _0x1d__test_int
                    _0x8__test_int
                    {
                        const parent_scope = scope
                        {
                            const scope = indentifire.scope(parent_scope)
                            test_str = 0
                            const _0x1f__test_str = await test_str
                            let _0x9__test_str = _0x1f__test_str
                            _0x9__test_str
                            const _0x20__test_str = await test_str
                            let _0xa__test_str = _0x20__test_str
                            let test_bool = _0xa__test_str
                            test_bool
                            const _0x22__test_str = await test_str
                            let _0xb__test_str = _0x22__test_str
                            const _0x24___0xb__test_str = await _0xb__test_str
                            const _0x23__split = await String.prototype.split.call(_0x24___0xb__test_str)
                            let _0xc__split = _0x23__split
                            const _0x26___0xc__split = await _0xc__split
                            const _0x25__sort = await Array.prototype.sort.call(_0x26___0xc__split)
                            let _0xd__sort = _0x25__sort
                            const _0x28___0xd__sort = await _0xd__sort
                            const _0x27__join = await Array.prototype.join.call(_0x28___0xd__sort)
                            let _0xe__join = _0x27__join
                            test_bool = _0xe__join
                            const _0x21__test_bool = await test_bool
                            let _0xf__test_bool = _0x21__test_bool
                            _0xf__test_bool
                            const _0x29__test_bool = await test_bool
                            let _0x10__test_bool = _0x29__test_bool

                            const _0x2b___0x10__test_bool = await _0x10__test_bool
                            const _0x2a__split = await String.prototype.split.call(_0x2b___0x10__test_bool)
                            let _0x11__split = _0x2a__split
                            _0x11__split
                            const _0x2c__test_str = await test_str
                            let _0x12__test_str = _0x2c__test_str
                            const _0x2e___0x12__test_str = await _0x12__test_str
                            const _0x2d__split = await String.prototype.split.call(_0x2e___0x12__test_str)
                            let _0x13__split = _0x2d__split
                            const _0x30___0x13__split = await _0x13__split
                            const _0x2f__split = await String.prototype.split.call(_0x30___0x13__split)
                            let _0x14__split = _0x2f__split

                            const _0x32___0x14__split = await _0x14__split
                            const _0x31__split = await String.prototype.split.call(_0x32___0x14__split)
                            let _0x15__split = _0x31__split
                            _0x15__split
                        }
                    } 
                }
            } 
        }
    } 
})();
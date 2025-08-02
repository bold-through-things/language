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

            const _0x20__await__67lang_0x2e_stdin_0x28_ = await _67lang.stdin()
            let lines = _0x20__await__67lang_0x2e_stdin_0x28_
            lines
            const _0x22__lines = await lines
            let _0x0__lines = _0x22__lines
            const _0x24___0x0__lines = await _0x0__lines
            const _0x23__split = await String.prototype.split.call(_0x24___0x0__lines, "\n")
            let _0x1__split = _0x23__split
            lines = _0x1__split
            const _0x21__lines = await lines
            let _0x2__lines = _0x21__lines
            _0x2__lines
            let i = 0
            i
            let header = []
            header
            let rows = []
            rows
            const _0x25__lines = await lines
            let _0x3__lines = _0x25__lines

            const _0x26__iter = _0x3__lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x26__iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x27__i = await i
                        let _0x4__i = _0x27__i
                        const _0x28__await__67lang_0x2e_eq_0x28_ = await _67lang.eq(_0x4__i, 0)
                        if (_0x28__await__67lang_0x2e_eq_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x2a__line = await line
                                    let _0x5__line = _0x2a__line
                                    const _0x2c___0x5__line = await _0x5__line
                                    const _0x2b__split = await String.prototype.split.call(_0x2c___0x5__line, ",")
                                    let _0x6__split = _0x2b__split
                                    header = _0x6__split
                                    const _0x29__header = await header
                                    let _0x7__header = _0x29__header
                                    _0x7__header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x2d__header = await header
                                let _0x8__header = _0x2d__header
                                const _0x2e__line = await line
                                let _0x9__line = _0x2e__line
                                const _0x30___0x9__line = await _0x9__line
                                const _0x2f__split = await String.prototype.split.call(_0x30___0x9__line, ",")
                                let _0xa__split = _0x2f__split
                                const _0x31__await__67lang_0x2e_zip_0x28_ = await _67lang.zip(_0x8__header, _0xa__split)
                                let zip = _0x31__await__67lang_0x2e_zip_0x28_
                                zip
                                let row = {}
                                row
                                const _0x32__zip = await zip
                                let _0xb__zip = _0x32__zip

                                const _0x33__iter = _0xb__zip[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x33__iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x34__row = await row
                                            let _0x10__row = _0x34__row

                                            const _0x36__kv = await kv
                                            let _0xc__kv = _0x36__kv
                                            const _0x37___0xc__kv_0 = await _0xc__kv["0"]
                                            let _0xd__0 = _0x37___0xc__kv_0
                                            const _0x38__kv = await kv
                                            let _0xe__kv = _0x38__kv
                                            const _0x39___0xe__kv_1 = await _0xe__kv["1"]
                                            let _0xf__1 = _0x39___0xe__kv_1
                                            _0x10__row[_0xd__0] = _0xf__1
                                            const _0x35___0x10__row = await _0x10__row[_0xd__0]
                                            let _0x11__key = _0x35___0x10__row
                                            _0x11__key
                                        }
                                    } }
                                const _0x3a__rows = await rows
                                let _0x13__rows = _0x3a__rows

                                const _0x3c___0x13__rows = await _0x13__rows
                                const _0x3d__row = await row
                                let _0x12__row = _0x3d__row
                                const _0x3b__push = await Array.prototype.push.call(_0x3c___0x13__rows, _0x12__row)
                                let _0x14__push = _0x3b__push
                                _0x14__push
                            }
                        } 
                        const _0x3f__i = await i
                        let _0x15__i = _0x3f__i
                        const _0x40__await__67lang_0x2e_add_0x28_ = await _67lang.add(_0x15__i, 1)
                        i = _0x40__await__67lang_0x2e_add_0x28_
                        const _0x3e__i = await i
                        let _0x16__i = _0x3e__i
                        _0x16__i
                    }
                } }
            const _0x41__rows = await rows
            let _0x17__rows = _0x41__rows

            const _0x42__iter = _0x17__rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x42__iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x43__row = await row
                        let _0x18__row = _0x43__row
                        const _0x44___0x18__row_name = await _0x18__row.name
                        let _0x19__name = _0x44___0x18__row_name
                        const _0x45__await__67lang_0x2e_log_0x28_ = await _67lang.log(_0x19__name)
                        _0x45__await__67lang_0x2e_log_0x28_
                    }
                } }
            let age_over_30 = 0
            age_over_30
            const _0x46__rows = await rows
            let _0x1a__rows = _0x46__rows

            const _0x47__iter = _0x1a__rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x47__iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x48__row = await row
                        let _0x1b__row = _0x48__row
                        const _0x49___0x1b__row_age = await _0x1b__row.age
                        let _0x1c__age = _0x49___0x1b__row_age
                        const _0x4a__await__67lang_0x2e_asc_0x28_ = await _67lang.asc(_0x1c__age, 30)
                        if (_0x4a__await__67lang_0x2e_asc_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x4c__age_over_30 = await age_over_30
                                    let _0x1d__age_over_30 = _0x4c__age_over_30
                                    const _0x4d__await__67lang_0x2e_add_0x28_ = await _67lang.add(_0x1d__age_over_30, 1)
                                    age_over_30 = _0x4d__await__67lang_0x2e_add_0x28_
                                    const _0x4b__age_over_30 = await age_over_30
                                    let _0x1e__age_over_30 = _0x4b__age_over_30
                                    _0x1e__age_over_30
                                }
                            } }
                    }
                } }
            const _0x4e__age_over_30 = await age_over_30
            let _0x1f__age_over_30 = _0x4e__age_over_30
            const _0x4f__await__67lang_0x2e_log_0x28_ = await _67lang.log(_0x1f__age_over_30)
            _0x4f__await__67lang_0x2e_log_0x28_
        }
    } 
})();
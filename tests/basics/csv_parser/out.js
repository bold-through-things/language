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

            const _0x28_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_lines = _0x28_await__67lang_dot_stdin_lp_
            _0x0_lines
            let _0x2_lines = _0x0_lines
            const _0x29_split = await String.prototype.split.call(_0x2_lines, "\n")
            let _0x4__0x3_split = _0x29_split
            _0x0_lines = _0x4__0x3_split
            let _0x1_lines = _0x0_lines
            _0x1_lines
            let _0x5_i = 0
            _0x5_i
            let _0x6_header = []
            _0x6_header
            let _0x7_rows = []
            _0x7_rows
            let _0x8_lines = _0x0_lines

            const _0x2a_iter = _0x8_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x2a_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_i = _0x5_i
                        const _0x2b_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x9_i, 0)
                        if (_0x2b_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0xb_line = line
                                    const _0x2c_split = await String.prototype.split.call(_0xb_line, ",")
                                    let _0xd__0xc_split = _0x2c_split
                                    _0x6_header = _0xd__0xc_split
                                    let _0xa_header = _0x6_header
                                    _0xa_header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x2d_await__67lang_dot_zip_lp_ = await _67lang.zip(",")
                                let _0xe_zip = _0x2d_await__67lang_dot_zip_lp_
                                _0xe_zip
                                let _0xf_row = {}
                                _0xf_row
                                let _0x10_zip = _0xe_zip

                                const _0x2e_iter = _0x10_zip[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x2e_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x11_row = _0xf_row

                                            let _0x13_kv = kv
                                            const _0x30__0x13_kv_0 = await _0x13_kv["0"]
                                            let _0x15__0x14__0 = _0x30__0x13_kv_0
                                            let _0x16_kv = kv
                                            const _0x31__0x16_kv_1 = await _0x16_kv["1"]
                                            let _0x18__0x17__1 = _0x31__0x16_kv_1
                                            _0x11_row[_0x15__0x14__0] = _0x18__0x17__1
                                            const _0x2f__0x11_row = await _0x11_row[_0x15__0x14__0]
                                            let _0x12_key = _0x2f__0x11_row
                                            _0x12_key
                                        }
                                    } }
                                let _0x19_rows = _0x7_rows

                                let _0x1b_row = _0xf_row
                                const _0x32_push = await Array.prototype.push.call(_0x19_rows, _0x1b_row)
                                let _0x1a_push = _0x32_push
                                _0x1a_push
                            }
                        } 
                        let _0x1d_i = _0x5_i
                        const _0x33_await__67lang_dot_add_lp_ = await _67lang.add(_0x1d_i, 1)
                        _0x5_i = _0x33_await__67lang_dot_add_lp_
                        let _0x1c_i = _0x5_i
                        _0x1c_i
                    }
                } }
            let _0x1e_rows = _0x7_rows

            const _0x34_iter = _0x1e_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x34_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1f_row = row
                        const _0x35__0x1f_row_name = await _0x1f_row.name
                        let _0x20_name = _0x35__0x1f_row_name
                        const _0x36_await__67lang_dot_log_lp_ = await _67lang.log(_0x20_name)
                        _0x36_await__67lang_dot_log_lp_
                    }
                } }
            let _0x21_age_over_30 = 0
            _0x21_age_over_30
            let _0x22_rows = _0x7_rows

            const _0x37_iter = _0x22_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x37_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x23_row = row
                        const _0x38__0x23_row_age = await _0x23_row.age
                        let _0x24_age = _0x38__0x23_row_age
                        const _0x39_await__67lang_dot_asc_lp_ = await _67lang.asc(_0x24_age, 30)
                        if (_0x39_await__67lang_dot_asc_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x26_age_over_30 = _0x21_age_over_30
                                    const _0x3a_await__67lang_dot_add_lp_ = await _67lang.add(_0x26_age_over_30, 1)
                                    _0x21_age_over_30 = _0x3a_await__67lang_dot_add_lp_
                                    let _0x25_age_over_30 = _0x21_age_over_30
                                    _0x25_age_over_30
                                }
                            } }
                    }
                } }
            let _0x27_age_over_30 = _0x21_age_over_30
            const _0x3b_await__67lang_dot_log_lp_ = await _67lang.log(_0x27_age_over_30)
            _0x3b_await__67lang_dot_log_lp_
        }
    } 
})();
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

            const _0x20_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let lines = _0x20_await__67lang_dot_stdin_lp_
            lines
            const _0x22_lines = await lines
            let _0x0_lines = _0x22_lines
            const _0x24__0x0_lines = await _0x0_lines
            const _0x23_split = await String.prototype.split.call(_0x24__0x0_lines, "\n")
            let _0x1_split = _0x23_split
            lines = _0x1_split
            const _0x21_lines = await lines
            let _0x2_lines = _0x21_lines
            _0x2_lines
            let i = 0
            i
            let header = []
            header
            let rows = []
            rows
            const _0x25_lines = await lines
            let _0x3_lines = _0x25_lines

            const _0x26_iter = _0x3_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x26_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x27_i = await i
                        let _0x4_i = _0x27_i
                        const _0x28_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x4_i, 0)
                        if (_0x28_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x2a_line = await line
                                    let _0x5_line = _0x2a_line
                                    const _0x2c__0x5_line = await _0x5_line
                                    const _0x2b_split = await String.prototype.split.call(_0x2c__0x5_line, ",")
                                    let _0x6_split = _0x2b_split
                                    header = _0x6_split
                                    const _0x29_header = await header
                                    let _0x7_header = _0x29_header
                                    _0x7_header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x2d_header = await header
                                let _0x8_header = _0x2d_header
                                const _0x2e_line = await line
                                let _0x9_line = _0x2e_line
                                const _0x30__0x9_line = await _0x9_line
                                const _0x2f_split = await String.prototype.split.call(_0x30__0x9_line, ",")
                                let _0xa_split = _0x2f_split
                                const _0x31_await__67lang_dot_zip_lp_ = await _67lang.zip(_0x8_header, _0xa_split)
                                let zip = _0x31_await__67lang_dot_zip_lp_
                                zip
                                let row = {}
                                row
                                const _0x32_zip = await zip
                                let _0xb_zip = _0x32_zip

                                const _0x33_iter = _0xb_zip[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x33_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x34_row = await row
                                            let _0x10_row = _0x34_row

                                            const _0x36_kv = await kv
                                            let _0xc_kv = _0x36_kv
                                            const _0x37__0xc_kv_0 = await _0xc_kv["0"]
                                            let _0xd__0 = _0x37__0xc_kv_0
                                            const _0x38_kv = await kv
                                            let _0xe_kv = _0x38_kv
                                            const _0x39__0xe_kv_1 = await _0xe_kv["1"]
                                            let _0xf__1 = _0x39__0xe_kv_1
                                            _0x10_row[_0xd__0] = _0xf__1
                                            const _0x35__0x10_row = await _0x10_row[_0xd__0]
                                            let _0x11_key = _0x35__0x10_row
                                            _0x11_key
                                        }
                                    } }
                                const _0x3a_rows = await rows
                                let _0x13_rows = _0x3a_rows

                                const _0x3c__0x13_rows = await _0x13_rows
                                const _0x3d_row = await row
                                let _0x12_row = _0x3d_row
                                const _0x3b_push = await Array.prototype.push.call(_0x3c__0x13_rows, _0x12_row)
                                let _0x14_push = _0x3b_push
                                _0x14_push
                            }
                        } 
                        const _0x3f_i = await i
                        let _0x15_i = _0x3f_i
                        const _0x40_await__67lang_dot_add_lp_ = await _67lang.add(_0x15_i, 1)
                        i = _0x40_await__67lang_dot_add_lp_
                        const _0x3e_i = await i
                        let _0x16_i = _0x3e_i
                        _0x16_i
                    }
                } }
            const _0x41_rows = await rows
            let _0x17_rows = _0x41_rows

            const _0x42_iter = _0x17_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x42_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x43_row = await row
                        let _0x18_row = _0x43_row
                        const _0x44__0x18_row_name = await _0x18_row.name
                        let _0x19_name = _0x44__0x18_row_name
                        const _0x45_await__67lang_dot_log_lp_ = await _67lang.log(_0x19_name)
                        _0x45_await__67lang_dot_log_lp_
                    }
                } }
            let age_over_30 = 0
            age_over_30
            const _0x46_rows = await rows
            let _0x1a_rows = _0x46_rows

            const _0x47_iter = _0x1a_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x47_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x48_row = await row
                        let _0x1b_row = _0x48_row
                        const _0x49__0x1b_row_age = await _0x1b_row.age
                        let _0x1c_age = _0x49__0x1b_row_age
                        const _0x4a_await__67lang_dot_asc_lp_ = await _67lang.asc(_0x1c_age, 30)
                        if (_0x4a_await__67lang_dot_asc_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x4c_age_over_30 = await age_over_30
                                    let _0x1d_age_over_30 = _0x4c_age_over_30
                                    const _0x4d_await__67lang_dot_add_lp_ = await _67lang.add(_0x1d_age_over_30, 1)
                                    age_over_30 = _0x4d_await__67lang_dot_add_lp_
                                    const _0x4b_age_over_30 = await age_over_30
                                    let _0x1e_age_over_30 = _0x4b_age_over_30
                                    _0x1e_age_over_30
                                }
                            } }
                    }
                } }
            const _0x4e_age_over_30 = await age_over_30
            let _0x1f_age_over_30 = _0x4e_age_over_30
            const _0x4f_await__67lang_dot_log_lp_ = await _67lang.log(_0x1f_age_over_30)
            _0x4f_await__67lang_dot_log_lp_
        }
    } 
})();
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
            const _0x54_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_lines = _0x54_await__67lang_dot_stdin_lp_
            _0x0_lines
            let _0x2_lines = _0x0_lines
            const _0x55_split = await String.prototype.split.call(_0x2_lines, "\n")
            let _0x4__0x3_split = _0x55_split
            _0x0_lines = _0x4__0x3_split
            let _0x1_lines = _0x0_lines
            _0x1_lines
            let _0x5_modules = {}
            _0x5_modules
            let _0x6_lines = _0x0_lines

            const _0x56_iter = _0x6_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x56_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_module = {}
                        _0x7_module
                        let _0x8_kv = ":"2
                        _0x8_kv
                        let _0x9_module = _0x7_module

                        let _0xb_kv = _0x8_kv
                        const _0x58__0xb_kv_0 = await _0xb_kv["0"]
                        let _0xc__0 = _0x58__0xb_kv_0
                        const _0x59_trim = await String.prototype.trim.call(_0xc__0)
                        let _0xe__0xd_trim = _0x59_trim
                        _0x9_module.id = _0xe__0xd_trim
                        const _0x57__0x9_module_id = await _0x9_module.id
                        let _0xa_id = _0x57__0x9_module_id
                        _0xa_id
                        let _0xf_module = _0x7_module

                        let _0x11_kv = _0x8_kv
                        const _0x5b__0x11_kv_1 = await _0x11_kv["1"]
                        let _0x12__1 = _0x5b__0x11_kv_1
                        const _0x5c_trim = await String.prototype.trim.call(_0x12__1)
                        let _0x13_trim = _0x5c_trim
                        const _0x5d_split = await String.prototype.split.call(_0x13_trim, /\s+/)
                        let _0x15__0x14_split = _0x5d_split
                        _0xf_module.deps = _0x15__0x14_split
                        const _0x5a__0xf_module_deps = await _0xf_module.deps
                        let _0x10_deps = _0x5a__0xf_module_deps
                        _0x10_deps

                        let _0x16_kv = _0x8_kv
                        const _0x5e__0x16_kv_1 = await _0x16_kv["1"]
                        let _0x17__1 = _0x5e__0x16_kv_1
                        const _0x5f_trim = await String.prototype.trim.call(_0x17__1)
                        let _0x18_trim = _0x5f_trim
                        const _0x60_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x18_trim, "")
                        if (_0x60_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x19_module = _0x7_module

                                    _0x19_module.deps = []
                                    const _0x61__0x19_module_deps = await _0x19_module.deps
                                    let _0x1a_deps = _0x61__0x19_module_deps
                                    _0x1a_deps
                                }
                            } }
                        let _0x1b_modules = _0x5_modules

                        let _0x1d_module = _0x7_module
                        const _0x63__0x1d_module_id = await _0x1d_module.id
                        let _0x1f__0x1e_id = _0x63__0x1d_module_id
                        let _0x20_module = _0x7_module
                        _0x1b_modules[_0x1f__0x1e_id] = _0x20_module
                        const _0x62__0x1b_modules = await _0x1b_modules[_0x1f__0x1e_id]
                        let _0x1c_id = _0x62__0x1b_modules
                        _0x1c_id
                    }
                } }




            let _0x21_build_order = []
            _0x21_build_order
            let _0x22_dep_loops = []
            _0x22_dep_loops
            const _0x23_visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        let _0x24_module = module
                        const _0x64__0x24_module_visited = await _0x24_module.visited
                        let _0x25_visited = _0x64__0x24_module_visited
                        if (_0x25_visited) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return
                                }
                            } }
                        let _0x26_module = module

                        _0x26_module.visited = true
                        const _0x65__0x26_module_visited = await _0x26_module.visited
                        let _0x27_visited = _0x65__0x26_module_visited
                        _0x27_visited

                        let _0x28_next_chain
                        _0x28_next_chain
                        let _0x29_next_chain = _0x28_next_chain

                        let _0x2b_module = module
                        const _0x67__0x2b_module_id = await _0x2b_module.id
                        let _0x2c_id = _0x67__0x2b_module_id
                        const _0x66_push = await Array.prototype.push.call(_0x29_next_chain, _0x2c_id)
                        let _0x2a_push = _0x66_push
                        _0x2a_push
                        let _0x2d_module = module
                        const _0x68__0x2d_module_deps = await _0x2d_module.deps
                        let _0x2e_deps = _0x68__0x2d_module_deps

                        const _0x69_iter = _0x2e_deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x69_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x2f_dep_id = dep_id
                                    const _0x6a_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x2f_dep_id)
                                    if (_0x6a_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x30_dep_loop = []
                                                _0x30_dep_loop
                                                let _0x31_dep_loop = _0x30_dep_loop

                                                let _0x33_dep_id = dep_id
                                                const _0x6b_push = await Array.prototype.push.call(_0x31_dep_loop, _0x33_dep_id)
                                                let _0x32_push = _0x6b_push
                                                _0x32_push
                                                let _0x34_next_chain = _0x28_next_chain
                                                const _0x6c_slice = await Array.prototype.slice.call(_0x34_next_chain)
                                                let _0x35_slice = _0x6c_slice
                                                const _0x6d_reverse = await Array.prototype.reverse.call(_0x35_slice)
                                                let _0x36_reverse = _0x6d_reverse

                                                const _0x6e_iter = _0x36_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x6e_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            let _0x37_dep_loop = _0x30_dep_loop

                                                            let _0x39_chain_dep_id = chain_dep_id
                                                            const _0x6f_push = await Array.prototype.push.call(_0x37_dep_loop, _0x39_chain_dep_id)
                                                            let _0x38_push = _0x6f_push
                                                            _0x38_push
                                                            let _0x3a_chain_dep_id = chain_dep_id
                                                            let _0x3b_dep_id = dep_id
                                                            const _0x70_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x3a_chain_dep_id, _0x3b_dep_id)
                                                            if (_0x70_await__67lang_dot_eq_lp_) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                let _0x3c_dep_loop = _0x30_dep_loop

                                                const _0x71_reverse = await Array.prototype.reverse.call(_0x3c_dep_loop)
                                                let _0x3d_reverse = _0x71_reverse
                                                _0x3d_reverse
                                                let _0x3e_dep_loops = _0x22_dep_loops

                                                let _0x40_dep_loop = _0x30_dep_loop
                                                const _0x73_join = await Array.prototype.join.call(_0x40_dep_loop, " → ")
                                                let _0x41_join = _0x73_join
                                                const _0x72_push = await Array.prototype.push.call(_0x3e_dep_loops, _0x41_join)
                                                let _0x3f_push = _0x72_push
                                                _0x3f_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x43_modules = _0x5_modules
                                            let _0x45_dep_id = dep_id
                                            const _0x75__0x43_modules = await _0x43_modules[_0x45_dep_id]
                                            let _0x44_id = _0x75__0x43_modules
                                            let _0x46_next_chain = _0x28_next_chain
                                            const _0x74_visit = await _0x23_visit(_0x44_id, _0x46_next_chain)
                                            let _0x42_visit = _0x74_visit
                                            _0x42_visit
                                        }
                                    } 
                                }
                            } }
                        let _0x47_build_order = _0x21_build_order

                        let _0x49_module = module
                        const _0x77__0x49_module_id = await _0x49_module.id
                        let _0x4a_id = _0x77__0x49_module_id
                        const _0x76_push = await Array.prototype.push.call(_0x47_build_order, _0x4a_id)
                        let _0x48_push = _0x76_push
                        _0x48_push
                    }
                } }
            let _0x4b_modules = _0x5_modules
            const _0x78_await__67lang_dot_values_lp_ = await _67lang.values(_0x4b_modules)

            const _0x79_iter = _0x78_await__67lang_dot_values_lp_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x79_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x4d_module = module
                        const _0x7a_visit = await _0x23_visit(_0x4d_module, [])
                        let _0x4c_visit = _0x7a_visit
                        _0x4c_visit
                    }
                } }
            let _0x4e_dep_loops = _0x22_dep_loops
            const _0x7b__0x4e_dep_loops_length = await _0x4e_dep_loops.length
            let _0x4f_length = _0x7b__0x4e_dep_loops_length
            const _0x7c_await__67lang_dot_asc_lp_ = await _67lang.asc(1, _0x4f_length)
            if (_0x7c_await__67lang_dot_asc_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x50_dep_loops = _0x22_dep_loops
                        const _0x7d_join = await Array.prototype.join.call(_0x50_dep_loops, "\n")
                        let _0x51_join = _0x7d_join
                        const _0x7e_await__67lang_dot_concat_lp_ = await _67lang.concat("ERROR: there are dependency loops.\n", _0x51_join)
                        const _0x7f_await__67lang_dot_log_lp_ = await _67lang.log(_0x7e_await__67lang_dot_concat_lp_)
                        _0x7f_await__67lang_dot_log_lp_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x52_build_order = _0x21_build_order
                    const _0x80_join = await Array.prototype.join.call(_0x52_build_order, "\n")
                    let _0x53_join = _0x80_join
                    const _0x81_await__67lang_dot_log_lp_ = await _67lang.log(_0x53_join)
                    _0x81_await__67lang_dot_log_lp_
                }
            } 
        }
    } 
})();
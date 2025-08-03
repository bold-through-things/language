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
            const _0x77_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_lines = _0x77_await__67lang_dot_stdin_lp_
            _0x0_lines
            let _0x4__0x1_lines = _0x0_lines
            const _0x78_split = await String.prototype.split.call(_0x4__0x1_lines, "\n")
            let _0x5__0x2_split = _0x78_split
            _0x0_lines = _0x5__0x2_split
            let _0x3_lines = _0x0_lines
            _0x3_lines
            let _0x6_modules = {}
            _0x6_modules
            let _0x8__0x7_lines = _0x0_lines

            const _0x79_iter = _0x8__0x7_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x79_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_module = {}
                        _0x9_module
                        let _0xa_line = line
                        const _0x7a_split = await String.prototype.split.call(_0xa_line, ":", 2)
                        let _0xb_split = _0x7a_split
                        let _0xc_kv = _0xb_split
                        _0xc_kv
                        let _0x10_module = _0x9_module

                        let _0x12__0xd_kv = _0xc_kv
                        const _0x7c__0x12__0xd_kv_0 = await _0x12__0xd_kv["0"]
                        let _0x13__0xe__0 = _0x7c__0x12__0xd_kv_0
                        const _0x7d_trim = await String.prototype.trim.call(_0x13__0xe__0)
                        let _0x14__0xf_trim = _0x7d_trim
                        _0x10_module.id = _0x14__0xf_trim
                        const _0x7b__0x10_module_id = await _0x10_module.id
                        let _0x11_id = _0x7b__0x10_module_id
                        _0x11_id
                        let _0x19_module = _0x9_module

                        let _0x1b__0x15_kv = _0xc_kv
                        const _0x7f__0x1b__0x15_kv_1 = await _0x1b__0x15_kv["1"]
                        let _0x1c__0x16__1 = _0x7f__0x1b__0x15_kv_1
                        const _0x80_trim = await String.prototype.trim.call(_0x1c__0x16__1)
                        let _0x1d__0x17_trim = _0x80_trim
                        const _0x81_split = await String.prototype.split.call(_0x1d__0x17_trim, /\s+/)
                        let _0x1e__0x18_split = _0x81_split
                        _0x19_module.deps = _0x1e__0x18_split
                        const _0x7e__0x19_module_deps = await _0x19_module.deps
                        let _0x1a_deps = _0x7e__0x19_module_deps
                        _0x1a_deps

                        let _0x1f_kv = _0xc_kv
                        const _0x82__0x1f_kv_1 = await _0x1f_kv["1"]
                        let _0x20__1 = _0x82__0x1f_kv_1
                        const _0x83_trim = await String.prototype.trim.call(_0x20__1)
                        let _0x21_trim = _0x83_trim
                        const _0x84_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x21_trim, "")
                        if (_0x84_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x22_module = _0x9_module

                                    _0x22_module.deps = []
                                    const _0x85__0x22_module_deps = await _0x22_module.deps
                                    let _0x23_deps = _0x85__0x22_module_deps
                                    _0x23_deps
                                }
                            } }
                        let _0x27_modules = _0x6_modules

                        let _0x29__0x24_module = _0x9_module
                        const _0x87__0x29__0x24_module_id = await _0x29__0x24_module.id
                        let _0x2a__0x25_id = _0x87__0x29__0x24_module_id
                        let _0x2b__0x26_module = _0x9_module
                        _0x27_modules[_0x2a__0x25_id] = _0x2b__0x26_module
                        const _0x86__0x27_modules = await _0x27_modules[_0x2a__0x25_id]
                        let _0x28_id = _0x86__0x27_modules
                        _0x28_id
                    }
                } }




            let _0x2d_build_order = []
            _0x2d_build_order
            let _0x2e_dep_loops = []
            _0x2e_dep_loops
            const _0x2f_visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        let _0x30_module = module
                        const _0x88__0x30_module_visited = await _0x30_module.visited
                        let _0x31_visited = _0x88__0x30_module_visited
                        if (_0x31_visited) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return
                                }
                            } }
                        let _0x32_module = module

                        _0x32_module.visited = true
                        const _0x89__0x32_module_visited = await _0x32_module.visited
                        let _0x33_visited = _0x89__0x32_module_visited
                        _0x33_visited

                        let _0x34_chain = chain
                        const _0x8a_slice = await Array.prototype.slice.call(_0x34_chain)
                        let _0x35_slice = _0x8a_slice
                        let _0x36_next_chain = _0x35_slice
                        _0x36_next_chain
                        let _0x39_next_chain = _0x36_next_chain

                        let _0x3b__0x37_module = module
                        const _0x8c__0x3b__0x37_module_id = await _0x3b__0x37_module.id
                        let _0x3c__0x38_id = _0x8c__0x3b__0x37_module_id
                        const _0x8b_push = await Array.prototype.push.call(_0x39_next_chain, _0x3c__0x38_id)
                        let _0x3a_push = _0x8b_push
                        _0x3a_push
                        let _0x3f__0x3d_module = module
                        const _0x8d__0x3f__0x3d_module_deps = await _0x3f__0x3d_module.deps
                        let _0x40__0x3e_deps = _0x8d__0x3f__0x3d_module_deps

                        const _0x8e_iter = _0x40__0x3e_deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x8e_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x42_next_chain = _0x36_next_chain
                                    let _0x41_dep_id = dep_id
                                    const _0x8f_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x42_next_chain, _0x41_dep_id)
                                    if (_0x8f_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x43_dep_loop = []
                                                _0x43_dep_loop
                                                let _0x45_dep_loop = _0x43_dep_loop

                                                let _0x47__0x44_dep_id = dep_id
                                                const _0x90_push = await Array.prototype.push.call(_0x45_dep_loop, _0x47__0x44_dep_id)
                                                let _0x46_push = _0x90_push
                                                _0x46_push
                                                let _0x4b__0x48_next_chain = _0x36_next_chain
                                                const _0x91_slice = await Array.prototype.slice.call(_0x4b__0x48_next_chain)
                                                let _0x4c__0x49_slice = _0x91_slice
                                                const _0x92_reverse = await Array.prototype.reverse.call(_0x4c__0x49_slice)
                                                let _0x4d__0x4a_reverse = _0x92_reverse

                                                const _0x93_iter = _0x4d__0x4a_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x93_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            let _0x4f_dep_loop = _0x43_dep_loop

                                                            let _0x51__0x4e_chain_dep_id = chain_dep_id
                                                            const _0x94_push = await Array.prototype.push.call(_0x4f_dep_loop, _0x51__0x4e_chain_dep_id)
                                                            let _0x50_push = _0x94_push
                                                            _0x50_push
                                                            let _0x52_chain_dep_id = chain_dep_id
                                                            let _0x53_dep_id = dep_id
                                                            const _0x95_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x52_chain_dep_id, _0x53_dep_id)
                                                            if (_0x95_await__67lang_dot_eq_lp_) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                let _0x54_dep_loop = _0x43_dep_loop

                                                const _0x96_reverse = await Array.prototype.reverse.call(_0x54_dep_loop)
                                                let _0x55_reverse = _0x96_reverse
                                                _0x55_reverse
                                                let _0x58_dep_loops = _0x2e_dep_loops

                                                let _0x5a__0x56_dep_loop = _0x43_dep_loop
                                                const _0x98_join = await Array.prototype.join.call(_0x5a__0x56_dep_loop, " → ")
                                                let _0x5b__0x57_join = _0x98_join
                                                const _0x97_push = await Array.prototype.push.call(_0x58_dep_loops, _0x5b__0x57_join)
                                                let _0x59_push = _0x97_push
                                                _0x59_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x62__0x5d_modules = _0x6_modules
                                            let _0x63__0x5c_dep_id = dep_id
                                            const _0x9a__0x62__0x5d_modules = await _0x62__0x5d_modules[_0x63__0x5c_dep_id]
                                            let _0x64__0x5e_id = _0x9a__0x62__0x5d_modules
                                            let _0x65__0x60_next_chain = _0x36_next_chain
                                            const _0x99_visit = await _0x2f_visit(_0x64__0x5e_id, _0x65__0x60_next_chain)
                                            let _0x61_visit = _0x99_visit
                                            _0x61_visit
                                        }
                                    } 
                                }
                            } }
                        let _0x68_build_order = _0x2d_build_order

                        let _0x6a__0x66_module = module
                        const _0x9c__0x6a__0x66_module_id = await _0x6a__0x66_module.id
                        let _0x6b__0x67_id = _0x9c__0x6a__0x66_module_id
                        const _0x9b_push = await Array.prototype.push.call(_0x68_build_order, _0x6b__0x67_id)
                        let _0x69_push = _0x9b_push
                        _0x69_push
                    }
                } }
            let _0x6d__0x6c_modules = _0x6_modules
            const _0x9d_await__67lang_dot_values_lp_ = await _67lang.values(_0x6d__0x6c_modules)

            const _0x9e_iter = _0x9d_await__67lang_dot_values_lp_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x9e_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x70__0x6e_module = module
                        const _0x9f_visit = await _0x2f_visit(_0x70__0x6e_module, [])
                        let _0x6f_visit = _0x9f_visit
                        _0x6f_visit
                    }
                } }
            let _0x71_dep_loops = _0x2e_dep_loops
            const _0xa0__0x71_dep_loops_length = await _0x71_dep_loops.length
            let _0x72_length = _0xa0__0x71_dep_loops_length
            const _0xa1_await__67lang_dot_asc_lp_ = await _67lang.asc(1, _0x72_length)
            if (_0xa1_await__67lang_dot_asc_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x73_dep_loops = _0x2e_dep_loops
                        const _0xa2_join = await Array.prototype.join.call(_0x73_dep_loops, "\n")
                        let _0x74_join = _0xa2_join
                        const _0xa3_await__67lang_dot_concat_lp_ = await _67lang.concat("ERROR: there are dependency loops.\n", _0x74_join)
                        const _0xa4_await__67lang_dot_log_lp_ = await _67lang.log(_0xa3_await__67lang_dot_concat_lp_)
                        _0xa4_await__67lang_dot_log_lp_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x75_build_order = _0x2d_build_order
                    const _0xa5_join = await Array.prototype.join.call(_0x75_build_order, "\n")
                    let _0x76_join = _0xa5_join
                    const _0xa6_await__67lang_dot_log_lp_ = await _67lang.log(_0x76_join)
                    _0xa6_await__67lang_dot_log_lp_
                }
            } 
        }
    } 
})();
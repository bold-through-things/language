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
            const _0x4d_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let lines = _0x4d_await__67lang_dot_stdin_lp_
            lines
            const _0x4f_lines = await lines
            let _0x0_lines = _0x4f_lines
            const _0x51__0x0_lines = await _0x0_lines
            const _0x50_split = await String.prototype.split.call(_0x51__0x0_lines, "\n")
            let _0x1_split = _0x50_split
            lines = _0x1_split
            const _0x4e_lines = await lines
            let _0x2_lines = _0x4e_lines
            _0x2_lines
            let modules = {}
            modules
            const _0x52_lines = await lines
            let _0x3_lines = _0x52_lines

            const _0x53_iter = _0x3_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x53_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let module = {}
                        module
                        const _0x54_line = await line
                        let _0x4_line = _0x54_line
                        const _0x56__0x4_line = await _0x4_line
                        const _0x55_split = await String.prototype.split.call(_0x56__0x4_line, ":", 2)
                        let _0x5_split = _0x55_split
                        let kv = _0x5_split
                        kv
                        const _0x57_module = await module
                        let _0x9_module = _0x57_module

                        const _0x59_kv = await kv
                        let _0x6_kv = _0x59_kv
                        const _0x5a__0x6_kv_0 = await _0x6_kv["0"]
                        let _0x7__0 = _0x5a__0x6_kv_0
                        const _0x5c__0x7__0 = await _0x7__0
                        const _0x5b_trim = await String.prototype.trim.call(_0x5c__0x7__0)
                        let _0x8_trim = _0x5b_trim
                        _0x9_module.id = _0x8_trim
                        const _0x58__0x9_module_id = await _0x9_module.id
                        let _0xa_id = _0x58__0x9_module_id
                        _0xa_id
                        const _0x5d_module = await module
                        let _0xf_module = _0x5d_module

                        const _0x5f_kv = await kv
                        let _0xb_kv = _0x5f_kv
                        const _0x60__0xb_kv_1 = await _0xb_kv["1"]
                        let _0xc__1 = _0x60__0xb_kv_1
                        const _0x62__0xc__1 = await _0xc__1
                        const _0x61_trim = await String.prototype.trim.call(_0x62__0xc__1)
                        let _0xd_trim = _0x61_trim
                        const _0x64__0xd_trim = await _0xd_trim
                        const _0x63_split = await String.prototype.split.call(_0x64__0xd_trim, /\s+/)
                        let _0xe_split = _0x63_split
                        _0xf_module.deps = _0xe_split
                        const _0x5e__0xf_module_deps = await _0xf_module.deps
                        let _0x10_deps = _0x5e__0xf_module_deps
                        _0x10_deps

                        const _0x65_kv = await kv
                        let _0x11_kv = _0x65_kv
                        const _0x66__0x11_kv_1 = await _0x11_kv["1"]
                        let _0x12__1 = _0x66__0x11_kv_1
                        const _0x68__0x12__1 = await _0x12__1
                        const _0x67_trim = await String.prototype.trim.call(_0x68__0x12__1)
                        let _0x13_trim = _0x67_trim
                        const _0x69_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x13_trim, "")
                        if (_0x69_await__67lang_dot_eq_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x6a_module = await module
                                    let _0x14_module = _0x6a_module

                                    _0x14_module.deps = []
                                    const _0x6b__0x14_module_deps = await _0x14_module.deps
                                    let _0x15_deps = _0x6b__0x14_module_deps
                                    _0x15_deps
                                }
                            } }
                        const _0x6c_modules = await modules
                        let _0x19_modules = _0x6c_modules

                        const _0x6e_module = await module
                        let _0x16_module = _0x6e_module
                        const _0x6f__0x16_module_id = await _0x16_module.id
                        let _0x17_id = _0x6f__0x16_module_id
                        const _0x70_module = await module
                        let _0x18_module = _0x70_module
                        _0x19_modules[_0x17_id] = _0x18_module
                        const _0x6d__0x19_modules = await _0x19_modules[_0x17_id]
                        let _0x1a_id = _0x6d__0x19_modules
                        _0x1a_id
                    }
                } }




            let build_order = []
            build_order
            let dep_loops = []
            dep_loops
            const visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        const _0x71_module = await module
                        let _0x1c_module = _0x71_module
                        const _0x72__0x1c_module_visited = await _0x1c_module.visited
                        let _0x1d_visited = _0x72__0x1c_module_visited
                        if (_0x1d_visited) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return
                                }
                            } }
                        const _0x73_module = await module
                        let _0x1e_module = _0x73_module

                        _0x1e_module.visited = true
                        const _0x74__0x1e_module_visited = await _0x1e_module.visited
                        let _0x1f_visited = _0x74__0x1e_module_visited
                        _0x1f_visited

                        const _0x75_chain = await chain
                        let _0x20_chain = _0x75_chain
                        const _0x77__0x20_chain = await _0x20_chain
                        const _0x76_slice = await Array.prototype.slice.call(_0x77__0x20_chain)
                        let _0x21_slice = _0x76_slice
                        let next_chain = _0x21_slice
                        next_chain
                        const _0x78_next_chain = await next_chain
                        let _0x24_next_chain = _0x78_next_chain

                        const _0x7a__0x24_next_chain = await _0x24_next_chain
                        const _0x7b_module = await module
                        let _0x22_module = _0x7b_module
                        const _0x7c__0x22_module_id = await _0x22_module.id
                        let _0x23_id = _0x7c__0x22_module_id
                        const _0x79_push = await Array.prototype.push.call(_0x7a__0x24_next_chain, _0x23_id)
                        let _0x25_push = _0x79_push
                        _0x25_push
                        const _0x7d_module = await module
                        let _0x26_module = _0x7d_module
                        const _0x7e__0x26_module_deps = await _0x26_module.deps
                        let _0x27_deps = _0x7e__0x26_module_deps

                        const _0x7f_iter = _0x27_deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x7f_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x80_next_chain = await next_chain
                                    let _0x29_next_chain = _0x80_next_chain
                                    const _0x81_dep_id = await dep_id
                                    let _0x28_dep_id = _0x81_dep_id
                                    const _0x82_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x29_next_chain, _0x28_dep_id)
                                    if (_0x82_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let dep_loop = []
                                                dep_loop
                                                const _0x83_dep_loop = await dep_loop
                                                let _0x2b_dep_loop = _0x83_dep_loop

                                                const _0x85__0x2b_dep_loop = await _0x2b_dep_loop
                                                const _0x86_dep_id = await dep_id
                                                let _0x2a_dep_id = _0x86_dep_id
                                                const _0x84_push = await Array.prototype.push.call(_0x85__0x2b_dep_loop, _0x2a_dep_id)
                                                let _0x2c_push = _0x84_push
                                                _0x2c_push
                                                const _0x87_next_chain = await next_chain
                                                let _0x2d_next_chain = _0x87_next_chain
                                                const _0x89__0x2d_next_chain = await _0x2d_next_chain
                                                const _0x88_slice = await Array.prototype.slice.call(_0x89__0x2d_next_chain)
                                                let _0x2e_slice = _0x88_slice
                                                const _0x8b__0x2e_slice = await _0x2e_slice
                                                const _0x8a_reverse = await Array.prototype.reverse.call(_0x8b__0x2e_slice)
                                                let _0x2f_reverse = _0x8a_reverse

                                                const _0x8c_iter = _0x2f_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x8c_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            const _0x8d_dep_loop = await dep_loop
                                                            let _0x31_dep_loop = _0x8d_dep_loop

                                                            const _0x8f__0x31_dep_loop = await _0x31_dep_loop
                                                            const _0x90_chain_dep_id = await chain_dep_id
                                                            let _0x30_chain_dep_id = _0x90_chain_dep_id
                                                            const _0x8e_push = await Array.prototype.push.call(_0x8f__0x31_dep_loop, _0x30_chain_dep_id)
                                                            let _0x32_push = _0x8e_push
                                                            _0x32_push
                                                            const _0x91_chain_dep_id = await chain_dep_id
                                                            let _0x33_chain_dep_id = _0x91_chain_dep_id
                                                            const _0x92_dep_id = await dep_id
                                                            let _0x34_dep_id = _0x92_dep_id
                                                            const _0x93_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x33_chain_dep_id, _0x34_dep_id)
                                                            if (_0x93_await__67lang_dot_eq_lp_) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                const _0x94_dep_loop = await dep_loop
                                                let _0x35_dep_loop = _0x94_dep_loop

                                                const _0x96__0x35_dep_loop = await _0x35_dep_loop
                                                const _0x95_reverse = await Array.prototype.reverse.call(_0x96__0x35_dep_loop)
                                                let _0x36_reverse = _0x95_reverse
                                                _0x36_reverse
                                                const _0x97_dep_loops = await dep_loops
                                                let _0x39_dep_loops = _0x97_dep_loops

                                                const _0x99__0x39_dep_loops = await _0x39_dep_loops
                                                const _0x9a_dep_loop = await dep_loop
                                                let _0x37_dep_loop = _0x9a_dep_loop
                                                const _0x9c__0x37_dep_loop = await _0x37_dep_loop
                                                const _0x9b_join = await Array.prototype.join.call(_0x9c__0x37_dep_loop, " → ")
                                                let _0x38_join = _0x9b_join
                                                const _0x98_push = await Array.prototype.push.call(_0x99__0x39_dep_loops, _0x38_join)
                                                let _0x3a_push = _0x98_push
                                                _0x3a_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x9e_modules = await modules
                                            let _0x3c_modules = _0x9e_modules
                                            const _0xa0_dep_id = await dep_id
                                            let _0x3b_dep_id = _0xa0_dep_id
                                            const _0x9f__0x3c_modules = await _0x3c_modules[_0x3b_dep_id]
                                            let _0x3d_id = _0x9f__0x3c_modules
                                            const _0xa1_next_chain = await next_chain
                                            let _0x3e_next_chain = _0xa1_next_chain
                                            const _0x9d_visit = await visit(_0x3d_id, _0x3e_next_chain)
                                            let _0x3f_visit = _0x9d_visit
                                            _0x3f_visit
                                        }
                                    } 
                                }
                            } }
                        const _0xa2_build_order = await build_order
                        let _0x42_build_order = _0xa2_build_order

                        const _0xa4__0x42_build_order = await _0x42_build_order
                        const _0xa5_module = await module
                        let _0x40_module = _0xa5_module
                        const _0xa6__0x40_module_id = await _0x40_module.id
                        let _0x41_id = _0xa6__0x40_module_id
                        const _0xa3_push = await Array.prototype.push.call(_0xa4__0x42_build_order, _0x41_id)
                        let _0x43_push = _0xa3_push
                        _0x43_push
                    }
                } }
            const _0xa7_modules = await modules
            let _0x44_modules = _0xa7_modules
            const _0xa8_await__67lang_dot_values_lp_ = await _67lang.values(_0x44_modules)

            const _0xa9_iter = _0xa8_await__67lang_dot_values_lp_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xa9_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xab_module = await module
                        let _0x45_module = _0xab_module
                        const _0xaa_visit = await visit(_0x45_module, [])
                        let _0x46_visit = _0xaa_visit
                        _0x46_visit
                    }
                } }
            const _0xac_dep_loops = await dep_loops
            let _0x47_dep_loops = _0xac_dep_loops
            const _0xad__0x47_dep_loops_length = await _0x47_dep_loops.length
            let _0x48_length = _0xad__0x47_dep_loops_length
            const _0xae_await__67lang_dot_asc_lp_ = await _67lang.asc(1, _0x48_length)
            if (_0xae_await__67lang_dot_asc_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xaf_dep_loops = await dep_loops
                        let _0x49_dep_loops = _0xaf_dep_loops
                        const _0xb1__0x49_dep_loops = await _0x49_dep_loops
                        const _0xb0_join = await Array.prototype.join.call(_0xb1__0x49_dep_loops, "\n")
                        let _0x4a_join = _0xb0_join
                        const _0xb2_await__67lang_dot_concat_lp_ = await _67lang.concat("ERROR: there are dependency loops.\n", _0x4a_join)
                        const _0xb3_await__67lang_dot_log_lp_ = await _67lang.log(_0xb2_await__67lang_dot_concat_lp_)
                        _0xb3_await__67lang_dot_log_lp_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xb4_build_order = await build_order
                    let _0x4b_build_order = _0xb4_build_order
                    const _0xb6__0x4b_build_order = await _0x4b_build_order
                    const _0xb5_join = await Array.prototype.join.call(_0xb6__0x4b_build_order, "\n")
                    let _0x4c_join = _0xb5_join
                    const _0xb7_await__67lang_dot_log_lp_ = await _67lang.log(_0x4c_join)
                    _0xb7_await__67lang_dot_log_lp_
                }
            } 
        }
    } 
})();
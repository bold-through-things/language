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
            scope.lines = indentifire.store()
            const _0x0 = await indentifire.stdin()
            const _0x1 = await indentifire.access(scope, 'lines', _0x0)
            _0x1
            /*lines call=False index=False args=["'lines'"]*/
            const _0x2_lines = await indentifire.access(scope, 'lines')
            /*split call=True index=False args=["'split'", '"\\n"']*/
            const _0x3_split = await indentifire.access(_0x2_lines, 'split', "\n")
            /*lines call=True index=False args=["'lines'", '_0x3_split']*/
            const _0x4_lines = await indentifire.access(scope, 'lines', _0x3_split)
            _0x4_lines
            scope.modules = indentifire.store()
            const _0x5 = await indentifire.access(scope, 'modules', {})
            _0x5
            /*lines call=False index=False args=["'lines'"]*/
            const _0x6_lines = await indentifire.access(scope, 'lines')

            const _0x7 = _0x6_lines[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x7.next();
                    if (done) break;
                    scope.line = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        scope.module = indentifire.store()
                        const _0x8 = await indentifire.access(scope, 'module', {})
                        _0x8
                        scope.kv = indentifire.store()
                        /*line call=False index=False args=["'line'"]*/
                        const _0x9_line = await indentifire.access(scope, 'line')
                        /*split call=True index=False args=["'split'", '":"', '2']*/
                        const _0xa_split = await indentifire.access(_0x9_line, 'split', ":", 2)
                        const _0xb = await indentifire.access(scope, 'kv', _0xa_split)
                        _0xb
                        /*module call=False index=False args=["'module'"]*/
                        const _0xc_module = await indentifire.access(scope, 'module')
                        /*kv call=False index=False args=["'kv'"]*/
                        const _0xd_kv = await indentifire.access(scope, 'kv')
                        /*0 call=False index=False args=["'0'"]*/
                        const _0xe_0 = await indentifire.access(_0xd_kv, '0')
                        /*trim call=False index=False args=["'trim'"]*/
                        const _0xf_trim = await indentifire.access(_0xe_0, 'trim')
                        /*id call=True index=False args=["'id'", '_0xf_trim']*/
                        const _0x10_id = await indentifire.access(_0xc_module, 'id', _0xf_trim)
                        _0x10_id
                        /*module call=False index=False args=["'module'"]*/
                        const _0x11_module = await indentifire.access(scope, 'module')
                        /*kv call=False index=False args=["'kv'"]*/
                        const _0x12_kv = await indentifire.access(scope, 'kv')
                        /*1 call=False index=False args=["'1'"]*/
                        const _0x13_1 = await indentifire.access(_0x12_kv, '1')
                        /*trim call=False index=False args=["'trim'"]*/
                        const _0x14_trim = await indentifire.access(_0x13_1, 'trim')
                        /*split call=True index=False args=["'split'", '/\\s+/']*/
                        const _0x15_split = await indentifire.access(_0x14_trim, 'split', /\s+/)
                        /*deps call=True index=False args=["'deps'", '_0x15_split']*/
                        const _0x16_deps = await indentifire.access(_0x11_module, 'deps', _0x15_split)
                        _0x16_deps

                        /*kv call=False index=False args=["'kv'"]*/
                        const _0x17_kv = await indentifire.access(scope, 'kv')
                        /*1 call=False index=False args=["'1'"]*/
                        const _0x18_1 = await indentifire.access(_0x17_kv, '1')
                        /*trim call=False index=False args=["'trim'"]*/
                        const _0x19_trim = await indentifire.access(_0x18_1, 'trim')
                        const _0x1a = await indentifire.eq(_0x19_trim, "")
                        if (_0x1a)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*module call=False index=False args=["'module'"]*/
                                    const _0x1b_module = await indentifire.access(scope, 'module')
                                    /*deps call=True index=False args=["'deps'", '[]']*/
                                    const _0x1c_deps = await indentifire.access(_0x1b_module, 'deps', [])
                                    _0x1c_deps
                                }
                            } }
                        /*module call=False index=False args=["'module'"]*/
                        const _0x1d_module = await indentifire.access(scope, 'module')
                        /*id call=False index=False args=["'id'"]*/
                        const _0x1e_id = await indentifire.access(_0x1d_module, 'id')
                        /*modules call=False index=False args=["'modules'"]*/
                        const _0x1f_modules = await indentifire.access(scope, 'modules')
                        /*module call=False index=False args=["'module'"]*/
                        const _0x20_module = await indentifire.access(scope, 'module')
                        /*id call=True index=True args=['_0x1e_id', '_0x20_module']*/
                        const _0x21_id = await indentifire.access(_0x1f_modules, _0x1e_id, _0x20_module)
                        _0x21_id
                    }
                } }




            scope.build_order = indentifire.store()
            const _0x22 = await indentifire.access(scope, 'build_order', [])
            _0x22
            scope.dep_loops = indentifire.store()
            const _0x23 = await indentifire.access(scope, 'dep_loops', [])
            _0x23
            scope.visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        scope.module = module
                        scope.chain = chain
                        /*module call=False index=False args=["'module'"]*/
                        const _0x24_module = await indentifire.access(scope, 'module')
                        /*visited call=False index=False args=["'visited'"]*/
                        const _0x25_visited = await indentifire.access(_0x24_module, 'visited')
                        if (_0x25_visited)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    return
                                }
                            } }
                        /*module call=False index=False args=["'module'"]*/
                        const _0x26_module = await indentifire.access(scope, 'module')
                        /*visited call=True index=False args=["'visited'", 'true']*/
                        const _0x27_visited = await indentifire.access(_0x26_module, 'visited', true)
                        _0x27_visited

                        scope.next_chain = indentifire.store()
                        /*chain call=False index=False args=["'chain'"]*/
                        const _0x28_chain = await indentifire.access(scope, 'chain')
                        /*slice call=False index=False args=["'slice'"]*/
                        const _0x29_slice = await indentifire.access(_0x28_chain, 'slice')
                        const _0x2a = await indentifire.access(scope, 'next_chain', _0x29_slice)
                        _0x2a
                        /*next_chain call=False index=False args=["'next_chain'"]*/
                        const _0x2b_next_chain = await indentifire.access(scope, 'next_chain')
                        /*module call=False index=False args=["'module'"]*/
                        const _0x2c_module = await indentifire.access(scope, 'module')
                        /*id call=False index=False args=["'id'"]*/
                        const _0x2d_id = await indentifire.access(_0x2c_module, 'id')
                        /*push call=True index=False args=["'push'", '_0x2d_id']*/
                        const _0x2e_push = await indentifire.access(_0x2b_next_chain, 'push', _0x2d_id)
                        _0x2e_push
                        /*module call=False index=False args=["'module'"]*/
                        const _0x2f_module = await indentifire.access(scope, 'module')
                        /*deps call=False index=False args=["'deps'"]*/
                        const _0x30_deps = await indentifire.access(_0x2f_module, 'deps')

                        const _0x31 = _0x30_deps[Symbol.iterator]();
                        while (true) {
                            {
                                const { value, done } = _0x31.next();
                                if (done) break;
                                scope.dep_id = value;
                            }
                            {
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*next_chain call=False index=False args=["'next_chain'"]*/
                                    const _0x32_next_chain = await indentifire.access(scope, 'next_chain')
                                    /*dep_id call=False index=False args=["'dep_id'"]*/
                                    const _0x33_dep_id = await indentifire.access(scope, 'dep_id')
                                    const _0x34 = await indentifire.exists_inside(_0x32_next_chain, _0x33_dep_id)
                                    if (_0x34)
                                    {{
                                            const parent_scope = scope
                                            {
                                                const scope = indentifire.scope(parent_scope)
                                                scope.dep_loop = indentifire.store()
                                                const _0x35 = await indentifire.access(scope, 'dep_loop', [])
                                                _0x35
                                                /*dep_loop call=False index=False args=["'dep_loop'"]*/
                                                const _0x36_dep_loop = await indentifire.access(scope, 'dep_loop')
                                                /*dep_id call=False index=False args=["'dep_id'"]*/
                                                const _0x37_dep_id = await indentifire.access(scope, 'dep_id')
                                                /*push call=True index=False args=["'push'", '_0x37_dep_id']*/
                                                const _0x38_push = await indentifire.access(_0x36_dep_loop, 'push', _0x37_dep_id)
                                                _0x38_push
                                                /*next_chain call=False index=False args=["'next_chain'"]*/
                                                const _0x39_next_chain = await indentifire.access(scope, 'next_chain')
                                                /*slice call=False index=False args=["'slice'"]*/
                                                const _0x3a_slice = await indentifire.access(_0x39_next_chain, 'slice')
                                                /*reverse call=False index=False args=["'reverse'"]*/
                                                const _0x3b_reverse = await indentifire.access(_0x3a_slice, 'reverse')

                                                const _0x3c = _0x3b_reverse[Symbol.iterator]();
                                                while (true) {
                                                    {
                                                        const { value, done } = _0x3c.next();
                                                        if (done) break;
                                                        scope.chain_dep_id = value;
                                                    }
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = indentifire.scope(parent_scope)
                                                            /*dep_loop call=False index=False args=["'dep_loop'"]*/
                                                            const _0x3d_dep_loop = await indentifire.access(scope, 'dep_loop')
                                                            /*chain_dep_id call=False index=False args=["'chain_dep_id'"]*/
                                                            const _0x3e_chain_dep_id = await indentifire.access(scope, 'chain_dep_id')
                                                            /*push call=True index=False args=["'push'", '_0x3e_chain_dep_id']*/
                                                            const _0x3f_push = await indentifire.access(_0x3d_dep_loop, 'push', _0x3e_chain_dep_id)
                                                            _0x3f_push
                                                            /*chain_dep_id call=False index=False args=["'chain_dep_id'"]*/
                                                            const _0x40_chain_dep_id = await indentifire.access(scope, 'chain_dep_id')
                                                            /*dep_id call=False index=False args=["'dep_id'"]*/
                                                            const _0x41_dep_id = await indentifire.access(scope, 'dep_id')
                                                            const _0x42 = await indentifire.eq(_0x40_chain_dep_id, _0x41_dep_id)
                                                            if (_0x42)
                                                            {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = indentifire.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                /*dep_loop call=False index=False args=["'dep_loop'"]*/
                                                const _0x43_dep_loop = await indentifire.access(scope, 'dep_loop')
                                                /*reverse call=False index=False args=["'reverse'"]*/
                                                const _0x44_reverse = await indentifire.access(_0x43_dep_loop, 'reverse')
                                                _0x44_reverse
                                                /*dep_loops call=False index=False args=["'dep_loops'"]*/
                                                const _0x45_dep_loops = await indentifire.access(scope, 'dep_loops')
                                                /*dep_loop call=False index=False args=["'dep_loop'"]*/
                                                const _0x46_dep_loop = await indentifire.access(scope, 'dep_loop')
                                                /*join call=True index=False args=["'join'", '" → "']*/
                                                const _0x47_join = await indentifire.access(_0x46_dep_loop, 'join', " → ")
                                                /*push call=True index=False args=["'push'", '_0x47_join']*/
                                                const _0x48_push = await indentifire.access(_0x45_dep_loops, 'push', _0x47_join)
                                                _0x48_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = indentifire.scope(parent_scope)
                                            scope.dep = indentifire.store()
                                            /*dep_id call=False index=False args=["'dep_id'"]*/
                                            const _0x49_dep_id = await indentifire.access(scope, 'dep_id')
                                            /*modules call=False index=False args=["'modules'"]*/
                                            const _0x4a_modules = await indentifire.access(scope, 'modules')
                                            /*id call=False index=True args=['_0x49_dep_id']*/
                                            const _0x4b_id = await indentifire.access(_0x4a_modules, _0x49_dep_id)
                                            const _0x4c = await indentifire.access(scope, 'dep', _0x4b_id)
                                            _0x4c
                                            /*dep call=False index=False args=["'dep'"]*/
                                            const _0x4d_dep = await indentifire.access(scope, 'dep')
                                            /*visited call=False index=False args=["'visited'"]*/
                                            const _0x4e_visited = await indentifire.access(_0x4d_dep, 'visited')
                                            const _0x4f = await indentifire.none(_0x4e_visited)
                                            if (_0x4f)
                                            {{
                                                    const parent_scope = scope
                                                    {
                                                        const scope = indentifire.scope(parent_scope)
                                                        /*dep call=False index=False args=["'dep'"]*/
                                                        const _0x50_dep = await indentifire.access(scope, 'dep')
                                                        /*next_chain call=False index=False args=["'next_chain'"]*/
                                                        const _0x51_next_chain = await indentifire.access(scope, 'next_chain')
                                                        /*visit call=True index=False args=["'visit'", '_0x50_dep', '_0x51_next_chain']*/
                                                        const _0x52_visit = await indentifire.access(scope, 'visit', _0x50_dep, _0x51_next_chain)
                                                        _0x52_visit
                                                    }
                                                } }
                                        }
                                    } 
                                }
                            } }
                        /*build_order call=False index=False args=["'build_order'"]*/
                        const _0x53_build_order = await indentifire.access(scope, 'build_order')
                        /*module call=False index=False args=["'module'"]*/
                        const _0x54_module = await indentifire.access(scope, 'module')
                        /*id call=False index=False args=["'id'"]*/
                        const _0x55_id = await indentifire.access(_0x54_module, 'id')
                        /*push call=True index=False args=["'push'", '_0x55_id']*/
                        const _0x56_push = await indentifire.access(_0x53_build_order, 'push', _0x55_id)
                        _0x56_push
                    }
                } }
            /*modules call=False index=False args=["'modules'"]*/
            const _0x57_modules = await indentifire.access(scope, 'modules')
            const _0x58 = await indentifire.values(_0x57_modules)

            const _0x59 = _0x58[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x59.next();
                    if (done) break;
                    scope.module = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*module call=False index=False args=["'module'"]*/
                        const _0x5a_module = await indentifire.access(scope, 'module')
                        /*visit call=True index=False args=["'visit'", '_0x5a_module', '[]']*/
                        const _0x5b_visit = await indentifire.access(scope, 'visit', _0x5a_module, [])
                        _0x5b_visit
                    }
                } }
            /*dep_loops call=False index=False args=["'dep_loops'"]*/
            const _0x5c_dep_loops = await indentifire.access(scope, 'dep_loops')
            /*length call=False index=False args=["'length'"]*/
            const _0x5d_length = await indentifire.access(_0x5c_dep_loops, 'length')
            const _0x5e = await indentifire.asc(1, _0x5d_length)
            if (_0x5e)
            {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*dep_loops call=False index=False args=["'dep_loops'"]*/
                        const _0x5f_dep_loops = await indentifire.access(scope, 'dep_loops')
                        /*join call=True index=False args=["'join'", '"\\n"']*/
                        const _0x60_join = await indentifire.access(_0x5f_dep_loops, 'join', "\n")
                        const _0x61 = await indentifire.concat("ERROR: there are dependency loops.\n", _0x60_join)
                        const _0x62 = await indentifire.log(_0x61)
                        _0x62
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    /*build_order call=False index=False args=["'build_order'"]*/
                    const _0x63_build_order = await indentifire.access(scope, 'build_order')
                    /*join call=True index=False args=["'join'", '"\\n"']*/
                    const _0x64_join = await indentifire.access(_0x63_build_order, 'join', "\n")
                    const _0x65 = await indentifire.log(_0x64_join)
                    _0x65
                }
            } 
        }
    } 
})();
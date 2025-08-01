globalThis.indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum || a, false),
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
            const _0x4d__await_indentifire_0x2e_stdin_0x28_ = await indentifire.stdin()
            let lines = _0x4d__await_indentifire_0x2e_stdin_0x28_
            lines
            const _0x4f__lines = await lines
            let _0x0__lines = _0x4f__lines
            const _0x51___0x0__lines = await _0x0__lines
            const _0x50__split = await String.prototype.split.call(_0x51___0x0__lines, "\n")
            let _0x1__split = _0x50__split
            lines = _0x1__split
            const _0x4e__lines = await lines
            let _0x2__lines = _0x4e__lines
            _0x2__lines
            let modules = {}
            modules
            const _0x52__lines = await lines
            let _0x3__lines = _0x52__lines

            const _0x53__iter = _0x3__lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x53__iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        let module = {}
                        module
                        const _0x54__line = await line
                        let _0x4__line = _0x54__line
                        const _0x56___0x4__line = await _0x4__line
                        const _0x55__split = await String.prototype.split.call(_0x56___0x4__line, ":", 2)
                        let _0x5__split = _0x55__split
                        let kv = _0x5__split
                        kv
                        const _0x57__module = await module
                        let _0x9__module = _0x57__module

                        const _0x59__kv = await kv
                        let _0x6__kv = _0x59__kv
                        const _0x5a___0x6__kv_0 = await _0x6__kv["0"]
                        let _0x7__0 = _0x5a___0x6__kv_0
                        const _0x5c___0x7__0 = await _0x7__0
                        const _0x5b__trim = await String.prototype.trim.call(_0x5c___0x7__0)
                        let _0x8__trim = _0x5b__trim
                        _0x9__module.id = _0x8__trim
                        const _0x58___0x9__module_id = await _0x9__module.id
                        let _0xa__id = _0x58___0x9__module_id
                        _0xa__id
                        const _0x5d__module = await module
                        let _0xf__module = _0x5d__module

                        const _0x5f__kv = await kv
                        let _0xb__kv = _0x5f__kv
                        const _0x60___0xb__kv_1 = await _0xb__kv["1"]
                        let _0xc__1 = _0x60___0xb__kv_1
                        const _0x62___0xc__1 = await _0xc__1
                        const _0x61__trim = await String.prototype.trim.call(_0x62___0xc__1)
                        let _0xd__trim = _0x61__trim
                        const _0x64___0xd__trim = await _0xd__trim
                        const _0x63__splitr = await String.prototype.split.call(_0x64___0xd__trim, /\s+/)
                        let _0xe__splitr = _0x63__splitr
                        _0xf__module.deps = _0xe__splitr
                        const _0x5e___0xf__module_deps = await _0xf__module.deps
                        let _0x10__deps = _0x5e___0xf__module_deps
                        _0x10__deps

                        const _0x65__kv = await kv
                        let _0x11__kv = _0x65__kv
                        const _0x66___0x11__kv_1 = await _0x11__kv["1"]
                        let _0x12__1 = _0x66___0x11__kv_1
                        const _0x68___0x12__1 = await _0x12__1
                        const _0x67__trim = await String.prototype.trim.call(_0x68___0x12__1)
                        let _0x13__trim = _0x67__trim
                        const _0x69__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x13__trim, "")
                        if (_0x69__await_indentifire_0x2e_eq_0x28_) {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    const _0x6a__module = await module
                                    let _0x14__module = _0x6a__module

                                    _0x14__module.deps = []
                                    const _0x6b___0x14__module_deps = await _0x14__module.deps
                                    let _0x15__deps = _0x6b___0x14__module_deps
                                    _0x15__deps
                                }
                            } }
                        const _0x6c__modules = await modules
                        let _0x19__modules = _0x6c__modules

                        const _0x6e__module = await module
                        let _0x16__module = _0x6e__module
                        const _0x6f___0x16__module_id = await _0x16__module.id
                        let _0x17__id = _0x6f___0x16__module_id
                        const _0x70__module = await module
                        let _0x18__module = _0x70__module
                        _0x19__modules[_0x17__id] = _0x18__module
                        const _0x6d___0x19__modules = await _0x19__modules[_0x17__id]
                        let _0x1a__id = _0x6d___0x19__modules
                        _0x1a__id
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
                        const scope = indentifire.scope(parent_scope)
                        module = module
                        chain = chain
                        const _0x71__module = await module
                        let _0x1c__module = _0x71__module
                        const _0x72___0x1c__module_visited = await _0x1c__module.visited
                        let _0x1d__visited = _0x72___0x1c__module_visited
                        if (_0x1d__visited) {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    return
                                }
                            } }
                        const _0x73__module = await module
                        let _0x1e__module = _0x73__module

                        _0x1e__module.visited = true
                        const _0x74___0x1e__module_visited = await _0x1e__module.visited
                        let _0x1f__visited = _0x74___0x1e__module_visited
                        _0x1f__visited

                        const _0x75__chain = await chain
                        let _0x20__chain = _0x75__chain
                        const _0x77___0x20__chain = await _0x20__chain
                        const _0x76__slice = await Array.prototype.slice.call(_0x77___0x20__chain)
                        let _0x21__slice = _0x76__slice
                        let next_chain = _0x21__slice
                        next_chain
                        const _0x78__next_chain = await next_chain
                        let _0x24__next_chain = _0x78__next_chain

                        const _0x7a___0x24__next_chain = await _0x24__next_chain
                        const _0x7b__module = await module
                        let _0x22__module = _0x7b__module
                        const _0x7c___0x22__module_id = await _0x22__module.id
                        let _0x23__id = _0x7c___0x22__module_id
                        const _0x79__push = await Array.prototype.push.call(_0x7a___0x24__next_chain, _0x23__id)
                        let _0x25__push = _0x79__push
                        _0x25__push
                        const _0x7d__module = await module
                        let _0x26__module = _0x7d__module
                        const _0x7e___0x26__module_deps = await _0x26__module.deps
                        let _0x27__deps = _0x7e___0x26__module_deps

                        const _0x7f__iter = _0x27__deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x7f__iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    const _0x80__next_chain = await next_chain
                                    let _0x29__next_chain = _0x80__next_chain
                                    const _0x81__dep_id = await dep_id
                                    let _0x28__dep_id = _0x81__dep_id
                                    const _0x82__await_indentifire_0x2e_exists_inside_0x28_ = await indentifire.exists_inside(_0x29__next_chain, _0x28__dep_id)
                                    if (_0x82__await_indentifire_0x2e_exists_inside_0x28_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = indentifire.scope(parent_scope)
                                                let dep_loop = []
                                                dep_loop
                                                const _0x83__dep_loop = await dep_loop
                                                let _0x2b__dep_loop = _0x83__dep_loop

                                                const _0x85___0x2b__dep_loop = await _0x2b__dep_loop
                                                const _0x86__dep_id = await dep_id
                                                let _0x2a__dep_id = _0x86__dep_id
                                                const _0x84__push = await Array.prototype.push.call(_0x85___0x2b__dep_loop, _0x2a__dep_id)
                                                let _0x2c__push = _0x84__push
                                                _0x2c__push
                                                const _0x87__next_chain = await next_chain
                                                let _0x2d__next_chain = _0x87__next_chain
                                                const _0x89___0x2d__next_chain = await _0x2d__next_chain
                                                const _0x88__slice = await Array.prototype.slice.call(_0x89___0x2d__next_chain)
                                                let _0x2e__slice = _0x88__slice
                                                const _0x8b___0x2e__slice = await _0x2e__slice
                                                const _0x8a__reverse = await Array.prototype.reverse.call(_0x8b___0x2e__slice)
                                                let _0x2f__reverse = _0x8a__reverse

                                                const _0x8c__iter = _0x2f__reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x8c__iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = indentifire.scope(parent_scope)
                                                            const _0x8d__dep_loop = await dep_loop
                                                            let _0x31__dep_loop = _0x8d__dep_loop

                                                            const _0x8f___0x31__dep_loop = await _0x31__dep_loop
                                                            const _0x90__chain_dep_id = await chain_dep_id
                                                            let _0x30__chain_dep_id = _0x90__chain_dep_id
                                                            const _0x8e__push = await Array.prototype.push.call(_0x8f___0x31__dep_loop, _0x30__chain_dep_id)
                                                            let _0x32__push = _0x8e__push
                                                            _0x32__push
                                                            const _0x91__chain_dep_id = await chain_dep_id
                                                            let _0x33__chain_dep_id = _0x91__chain_dep_id
                                                            const _0x92__dep_id = await dep_id
                                                            let _0x34__dep_id = _0x92__dep_id
                                                            const _0x93__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x33__chain_dep_id, _0x34__dep_id)
                                                            if (_0x93__await_indentifire_0x2e_eq_0x28_) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = indentifire.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                const _0x94__dep_loop = await dep_loop
                                                let _0x35__dep_loop = _0x94__dep_loop

                                                const _0x96___0x35__dep_loop = await _0x35__dep_loop
                                                const _0x95__reverse = await Array.prototype.reverse.call(_0x96___0x35__dep_loop)
                                                let _0x36__reverse = _0x95__reverse
                                                _0x36__reverse
                                                const _0x97__dep_loops = await dep_loops
                                                let _0x39__dep_loops = _0x97__dep_loops

                                                const _0x99___0x39__dep_loops = await _0x39__dep_loops
                                                const _0x9a__dep_loop = await dep_loop
                                                let _0x37__dep_loop = _0x9a__dep_loop
                                                const _0x9c___0x37__dep_loop = await _0x37__dep_loop
                                                const _0x9b__join = await Array.prototype.join.call(_0x9c___0x37__dep_loop, " → ")
                                                let _0x38__join = _0x9b__join
                                                const _0x98__push = await Array.prototype.push.call(_0x99___0x39__dep_loops, _0x38__join)
                                                let _0x3a__push = _0x98__push
                                                _0x3a__push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = indentifire.scope(parent_scope)
                                            const _0x9e__modules = await modules
                                            let _0x3c__modules = _0x9e__modules
                                            const _0xa0__dep_id = await dep_id
                                            let _0x3b__dep_id = _0xa0__dep_id
                                            const _0x9f___0x3c__modules = await _0x3c__modules[_0x3b__dep_id]
                                            let _0x3d__id = _0x9f___0x3c__modules
                                            const _0xa1__next_chain = await next_chain
                                            let _0x3e__next_chain = _0xa1__next_chain
                                            const _0x9d__visit = await visit(_0x3d__id, _0x3e__next_chain)
                                            let _0x3f__visit = _0x9d__visit
                                            _0x3f__visit
                                        }
                                    } 
                                }
                            } }
                        const _0xa2__build_order = await build_order
                        let _0x42__build_order = _0xa2__build_order

                        const _0xa4___0x42__build_order = await _0x42__build_order
                        const _0xa5__module = await module
                        let _0x40__module = _0xa5__module
                        const _0xa6___0x40__module_id = await _0x40__module.id
                        let _0x41__id = _0xa6___0x40__module_id
                        const _0xa3__push = await Array.prototype.push.call(_0xa4___0x42__build_order, _0x41__id)
                        let _0x43__push = _0xa3__push
                        _0x43__push
                    }
                } }
            const _0xa7__modules = await modules
            let _0x44__modules = _0xa7__modules
            const _0xa8__await_indentifire_0x2e_values_0x28_ = await indentifire.values(_0x44__modules)

            const _0xa9__iter = _0xa8__await_indentifire_0x2e_values_0x28_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xa9__iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0xab__module = await module
                        let _0x45__module = _0xab__module
                        const _0xaa__visit = await visit(_0x45__module, [])
                        let _0x46__visit = _0xaa__visit
                        _0x46__visit
                    }
                } }
            const _0xac__dep_loops = await dep_loops
            let _0x47__dep_loops = _0xac__dep_loops
            const _0xad___0x47__dep_loops_length = await _0x47__dep_loops.length
            let _0x48__length = _0xad___0x47__dep_loops_length
            const _0xae__await_indentifire_0x2e_asc_0x28_ = await indentifire.asc(1, _0x48__length)
            if (_0xae__await_indentifire_0x2e_asc_0x28_) {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0xaf__dep_loops = await dep_loops
                        let _0x49__dep_loops = _0xaf__dep_loops
                        const _0xb1___0x49__dep_loops = await _0x49__dep_loops
                        const _0xb0__join = await Array.prototype.join.call(_0xb1___0x49__dep_loops, "\n")
                        let _0x4a__join = _0xb0__join
                        const _0xb2__await_indentifire_0x2e_concat_0x28_ = await indentifire.concat("ERROR: there are dependency loops.\n", _0x4a__join)
                        const _0xb3__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0xb2__await_indentifire_0x2e_concat_0x28_)
                        _0xb3__await_indentifire_0x2e_log_0x28_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    const _0xb4__build_order = await build_order
                    let _0x4b__build_order = _0xb4__build_order
                    const _0xb6___0x4b__build_order = await _0x4b__build_order
                    const _0xb5__join = await Array.prototype.join.call(_0xb6___0x4b__build_order, "\n")
                    let _0x4c__join = _0xb5__join
                    const _0xb7__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4c__join)
                    _0xb7__await_indentifire_0x2e_log_0x28_
                }
            } 
        }
    } 
})();
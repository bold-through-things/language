globalThis._67lang = {
    // TODO eliminating this one probably next thing
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
        if (n === null) { return ""; }
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
            const _0x8f_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x8f_stdin
            let _0x1_lines = _0x0_stdin
            _0x1_lines
            let _0x5__0x2_lines = _0x1_lines
            const _0x90_split = await String.prototype.split.call(_0x5__0x2_lines, "\n")
            let _0x6__0x3_split = _0x90_split
            _0x1_lines = _0x6__0x3_split
            let _0x4_lines = _0x1_lines
            _0x4_lines
            let _0x7_modules = {}
            _0x7_modules
            let _0x9__0x8_lines = _0x1_lines

            const _0x91_iter = _0x9__0x8_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x91_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xa_module = {}
                        _0xa_module
                        let _0xb_line = line
                        const _0x92_split = await String.prototype.split.call(_0xb_line, ":", 2)
                        let _0xc_split = _0x92_split
                        let _0xd_kv = _0xc_split
                        _0xd_kv
                        let _0x11_module = _0xa_module

                        let _0x13__0xe_kv = _0xd_kv
                        const _0x94__0x13__0xe_kv_0 = await _0x13__0xe_kv["0"]
                        let _0x14__0xf__0 = _0x94__0x13__0xe_kv_0
                        const _0x95_trim = await String.prototype.trim.call(_0x14__0xf__0)
                        let _0x15__0x10_trim = _0x95_trim
                        _0x11_module.id = _0x15__0x10_trim
                        const _0x93__0x11_module_id = await _0x11_module.id
                        let _0x12_id = _0x93__0x11_module_id
                        _0x12_id
                        let _0x1a_module = _0xa_module

                        let _0x1c__0x16_kv = _0xd_kv
                        const _0x97__0x1c__0x16_kv_1 = await _0x1c__0x16_kv["1"]
                        let _0x1d__0x17__1 = _0x97__0x1c__0x16_kv_1
                        const _0x98_trim = await String.prototype.trim.call(_0x1d__0x17__1)
                        let _0x1e__0x18_trim = _0x98_trim
                        const _0x99_split = await String.prototype.split.call(_0x1e__0x18_trim, /\s+/)
                        let _0x1f__0x19_split = _0x99_split
                        _0x1a_module.deps = _0x1f__0x19_split
                        const _0x96__0x1a_module_deps = await _0x1a_module.deps
                        let _0x1b_deps = _0x96__0x1a_module_deps
                        _0x1b_deps

                        let _0x24__0x20_kv = _0xd_kv
                        const _0x9b__0x24__0x20_kv_1 = await _0x24__0x20_kv["1"]
                        let _0x25__0x21__1 = _0x9b__0x24__0x20_kv_1
                        const _0x9c_trim = await String.prototype.trim.call(_0x25__0x21__1)
                        let _0x26__0x22_trim = _0x9c_trim
                        const _0x9a_eq = await (_0x26__0x22_trim === "")
                        let _0x23_eq = _0x9a_eq
                        if (_0x23_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x27_module = _0xa_module

                                    _0x27_module.deps = []
                                    const _0x9d__0x27_module_deps = await _0x27_module.deps
                                    let _0x28_deps = _0x9d__0x27_module_deps
                                    _0x28_deps
                                }
                            } }
                        let _0x2c_modules = _0x7_modules

                        let _0x2e__0x29_module = _0xa_module
                        const _0x9f__0x2e__0x29_module_id = await _0x2e__0x29_module.id
                        let _0x2f__0x2a_id = _0x9f__0x2e__0x29_module_id
                        let _0x30__0x2b_module = _0xa_module
                        _0x2c_modules[_0x2f__0x2a_id] = _0x30__0x2b_module
                        const _0x9e__0x2c_modules = await _0x2c_modules[_0x2f__0x2a_id]
                        let _0x2d_id = _0x9e__0x2c_modules
                        _0x2d_id
                    }
                } }




            let _0x32_build_order = []
            _0x32_build_order
            let _0x33_dep_loops = []
            _0x33_dep_loops
            const _0x34_visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        let _0x35_module = module
                        const _0xa0__0x35_module_visited = await _0x35_module.visited
                        let _0x36_visited = _0xa0__0x35_module_visited
                        if (_0x36_visited) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return
                                }
                            } }
                        let _0x37_module = module

                        _0x37_module.visited = true
                        const _0xa1__0x37_module_visited = await _0x37_module.visited
                        let _0x38_visited = _0xa1__0x37_module_visited
                        _0x38_visited

                        let _0x39_chain = chain
                        const _0xa2_slice = await Array.prototype.slice.call(_0x39_chain)
                        let _0x3a_slice = _0xa2_slice
                        let _0x3b_next_chain = _0x3a_slice
                        _0x3b_next_chain
                        let _0x3e_next_chain = _0x3b_next_chain

                        let _0x40__0x3c_module = module
                        const _0xa4__0x40__0x3c_module_id = await _0x40__0x3c_module.id
                        let _0x41__0x3d_id = _0xa4__0x40__0x3c_module_id
                        const _0xa3_push = await Array.prototype.push.call(_0x3e_next_chain, _0x41__0x3d_id)
                        let _0x3f_push = _0xa3_push
                        _0x3f_push
                        let _0x44__0x42_module = module
                        const _0xa5__0x44__0x42_module_deps = await _0x44__0x42_module.deps
                        let _0x45__0x43_deps = _0xa5__0x44__0x42_module_deps

                        const _0xa6_iter = _0x45__0x43_deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0xa6_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x47_next_chain = _0x3b_next_chain
                                    let _0x46_dep_id = dep_id
                                    const _0xa7_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x47_next_chain, _0x46_dep_id)
                                    if (_0xa7_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x48_dep_loop = []
                                                _0x48_dep_loop
                                                let _0x4a_dep_loop = _0x48_dep_loop

                                                let _0x4c__0x49_dep_id = dep_id
                                                const _0xa8_push = await Array.prototype.push.call(_0x4a_dep_loop, _0x4c__0x49_dep_id)
                                                let _0x4b_push = _0xa8_push
                                                _0x4b_push
                                                let _0x50__0x4d_next_chain = _0x3b_next_chain
                                                const _0xa9_slice = await Array.prototype.slice.call(_0x50__0x4d_next_chain)
                                                let _0x51__0x4e_slice = _0xa9_slice
                                                const _0xaa_reverse = await Array.prototype.reverse.call(_0x51__0x4e_slice)
                                                let _0x52__0x4f_reverse = _0xaa_reverse

                                                const _0xab_iter = _0x52__0x4f_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0xab_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            let _0x54_dep_loop = _0x48_dep_loop

                                                            let _0x56__0x53_chain_dep_id = chain_dep_id
                                                            const _0xac_push = await Array.prototype.push.call(_0x54_dep_loop, _0x56__0x53_chain_dep_id)
                                                            let _0x55_push = _0xac_push
                                                            _0x55_push
                                                            let _0x5a__0x57_chain_dep_id = chain_dep_id
                                                            let _0x5b__0x58_dep_id = dep_id
                                                            const _0xad_eq = await (_0x5a__0x57_chain_dep_id === _0x5b__0x58_dep_id)
                                                            let _0x59_eq = _0xad_eq
                                                            if (_0x59_eq) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                let _0x5c_dep_loop = _0x48_dep_loop

                                                const _0xae_reverse = await Array.prototype.reverse.call(_0x5c_dep_loop)
                                                let _0x5d_reverse = _0xae_reverse
                                                _0x5d_reverse
                                                let _0x60_dep_loops = _0x33_dep_loops

                                                let _0x62__0x5e_dep_loop = _0x48_dep_loop
                                                const _0xb0_join = await Array.prototype.join.call(_0x62__0x5e_dep_loop, " → ")
                                                let _0x63__0x5f_join = _0xb0_join
                                                const _0xaf_push = await Array.prototype.push.call(_0x60_dep_loops, _0x63__0x5f_join)
                                                let _0x61_push = _0xaf_push
                                                _0x61_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x6a__0x65_modules = _0x7_modules
                                            let _0x6b__0x64_dep_id = dep_id
                                            const _0xb2__0x6a__0x65_modules = await _0x6a__0x65_modules[_0x6b__0x64_dep_id]
                                            let _0x6c__0x66_id = _0xb2__0x6a__0x65_modules
                                            let _0x6d__0x68_next_chain = _0x3b_next_chain
                                            const _0xb1_visit = await _0x34_visit(_0x6c__0x66_id, _0x6d__0x68_next_chain)
                                            let _0x69_visit = _0xb1_visit
                                            _0x69_visit
                                        }
                                    } 
                                }
                            } }
                        let _0x70_build_order = _0x32_build_order

                        let _0x72__0x6e_module = module
                        const _0xb4__0x72__0x6e_module_id = await _0x72__0x6e_module.id
                        let _0x73__0x6f_id = _0xb4__0x72__0x6e_module_id
                        const _0xb3_push = await Array.prototype.push.call(_0x70_build_order, _0x73__0x6f_id)
                        let _0x71_push = _0xb3_push
                        _0x71_push
                    }
                } }
            let _0x77__0x74_modules = _0x7_modules
            const _0xb5_values = await Object.values(_0x77__0x74_modules)
            let _0x78__0x75_values = _0xb5_values

            const _0xb6_iter = _0x78__0x75_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xb6_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7b__0x79_module = module
                        const _0xb7_visit = await _0x34_visit(_0x7b__0x79_module, [])
                        let _0x7a_visit = _0xb7_visit
                        _0x7a_visit
                    }
                } }
            let _0x7f__0x7c_dep_loops = _0x33_dep_loops
            const _0xb9__0x7f__0x7c_dep_loops_length = await _0x7f__0x7c_dep_loops.length
            let _0x80__0x7d_length = _0xb9__0x7f__0x7c_dep_loops_length
            const _0xb8_nondesc = await (1 <= _0x80__0x7d_length)
            let _0x7e_nondesc = _0xb8_nondesc
            if (_0x7e_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x87__0x81_dep_loops = _0x33_dep_loops
                        const _0xbc_join = await Array.prototype.join.call(_0x87__0x81_dep_loops, "\n")
                        let _0x88__0x82_join = _0xbc_join
                        const _0xbb_concat = await ("ERROR: there are dependency loops.\n" + _0x88__0x82_join)
                        let _0x89__0x83_concat = _0xbb_concat
                        const _0xba_print = await console.log(_0x89__0x83_concat)
                        let _0x86_print = _0xba_print
                        _0x86_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x8d__0x8a_build_order = _0x32_build_order
                    const _0xbe_join = await Array.prototype.join.call(_0x8d__0x8a_build_order, "\n")
                    let _0x8e__0x8b_join = _0xbe_join
                    const _0xbd_print = await console.log(_0x8e__0x8b_join)
                    let _0x8c_print = _0xbd_print
                    _0x8c_print
                }
            } 
        }
    } 
})();
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
            const _0x5e_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x5e_stdin
            let _0x1_lines = _0x0_stdin
            _0x1_lines
            let _0x3_lines = _0x1_lines
            const _0x5f_split = await String.prototype.split.call(_0x3_lines, "\n")
            let _0x4_split = _0x5f_split
            _0x1_lines = _0x4_split
            let _0x2_lines = _0x1_lines
            _0x2_lines
            let _0x5_modules = {}
            _0x5_modules
            let _0x6_lines = _0x1_lines

            const _0x60_iter = _0x6_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x60_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_module = {}
                        _0x7_module
                        let _0x8_line = line
                        const _0x61_split = await String.prototype.split.call(_0x8_line, ":", 2)
                        let _0x9_split = _0x61_split
                        let _0xa_kv = _0x9_split
                        _0xa_kv
                        let _0xb_module = _0x7_module

                        let _0xd_kv = _0xa_kv
                        const _0x63__0xd_kv_0 = await _0xd_kv["0"]
                        let _0xe__0 = _0x63__0xd_kv_0
                        const _0x64_trim = await String.prototype.trim.call(_0xe__0)
                        let _0xf_trim = _0x64_trim
                        _0xb_module.id = _0xf_trim
                        const _0x62__0xb_module_id = await _0xb_module.id
                        let _0xc_id = _0x62__0xb_module_id
                        _0xc_id
                        let _0x10_module = _0x7_module

                        let _0x12_kv = _0xa_kv
                        const _0x66__0x12_kv_1 = await _0x12_kv["1"]
                        let _0x13__1 = _0x66__0x12_kv_1
                        const _0x67_trim = await String.prototype.trim.call(_0x13__1)
                        let _0x14_trim = _0x67_trim
                        const _0x68_split = await String.prototype.split.call(_0x14_trim, /\s+/)
                        let _0x15_split = _0x68_split
                        _0x10_module.deps = _0x15_split
                        const _0x65__0x10_module_deps = await _0x10_module.deps
                        let _0x11_deps = _0x65__0x10_module_deps
                        _0x11_deps

                        let _0x17_kv = _0xa_kv
                        const _0x6a__0x17_kv_1 = await _0x17_kv["1"]
                        let _0x18__1 = _0x6a__0x17_kv_1
                        const _0x6b_trim = await String.prototype.trim.call(_0x18__1)
                        let _0x19_trim = _0x6b_trim
                        const _0x69_eq = await (_0x19_trim === "")
                        let _0x16_eq = _0x69_eq
                        if (_0x16_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x1a_module = _0x7_module

                                    _0x1a_module.deps = []
                                    const _0x6c__0x1a_module_deps = await _0x1a_module.deps
                                    let _0x1b_deps = _0x6c__0x1a_module_deps
                                    _0x1b_deps
                                }
                            } }
                        let _0x1c_modules = _0x5_modules

                        let _0x1e_module = _0x7_module
                        const _0x6e__0x1e_module_id = await _0x1e_module.id
                        let _0x1f_id = _0x6e__0x1e_module_id
                        let _0x20_module = _0x7_module
                        _0x1c_modules[_0x1f_id] = _0x20_module
                        const _0x6d__0x1c_modules = await _0x1c_modules[_0x1f_id]
                        let _0x1d_id = _0x6d__0x1c_modules
                        _0x1d_id
                    }
                } }




            let _0x22_build_order = []
            _0x22_build_order
            let _0x23_dep_loops = []
            _0x23_dep_loops
            const _0x24_visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        let _0x25_module = module
                        const _0x6f__0x25_module_visited = await _0x25_module.visited
                        let _0x26_visited = _0x6f__0x25_module_visited
                        if (_0x26_visited) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return;
                                }
                            } }
                        let _0x27_module = module

                        _0x27_module.visited = true
                        const _0x70__0x27_module_visited = await _0x27_module.visited
                        let _0x28_visited = _0x70__0x27_module_visited
                        _0x28_visited

                        let _0x29_chain = chain
                        const _0x71_slice = await Array.prototype.slice.call(_0x29_chain)
                        let _0x2a_slice = _0x71_slice
                        let _0x2b_next_chain = _0x2a_slice
                        _0x2b_next_chain
                        let _0x2c_next_chain = _0x2b_next_chain

                        let _0x2e_module = module
                        const _0x73__0x2e_module_id = await _0x2e_module.id
                        let _0x2f_id = _0x73__0x2e_module_id
                        const _0x72_push = await Array.prototype.push.call(_0x2c_next_chain, _0x2f_id)
                        let _0x2d_push = _0x72_push
                        _0x2d_push
                        let _0x30_module = module
                        const _0x74__0x30_module_deps = await _0x30_module.deps
                        let _0x31_deps = _0x74__0x30_module_deps

                        const _0x75_iter = _0x31_deps[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x75_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x33_next_chain = _0x2b_next_chain
                                    let _0x32_dep_id = dep_id
                                    const _0x76_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x33_next_chain, _0x32_dep_id)
                                    if (_0x76_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x34_dep_loop = []
                                                _0x34_dep_loop
                                                let _0x35_dep_loop = _0x34_dep_loop

                                                let _0x37_dep_id = dep_id
                                                const _0x77_push = await Array.prototype.push.call(_0x35_dep_loop, _0x37_dep_id)
                                                let _0x36_push = _0x77_push
                                                _0x36_push
                                                let _0x38_next_chain = _0x2b_next_chain
                                                const _0x78_slice = await Array.prototype.slice.call(_0x38_next_chain)
                                                let _0x39_slice = _0x78_slice
                                                const _0x79_reverse = await Array.prototype.reverse.call(_0x39_slice)
                                                let _0x3a_reverse = _0x79_reverse

                                                const _0x7a_iter = _0x3a_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x7a_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            let _0x3b_dep_loop = _0x34_dep_loop

                                                            let _0x3d_chain_dep_id = chain_dep_id
                                                            const _0x7b_push = await Array.prototype.push.call(_0x3b_dep_loop, _0x3d_chain_dep_id)
                                                            let _0x3c_push = _0x7b_push
                                                            _0x3c_push
                                                            let _0x3f_chain_dep_id = chain_dep_id
                                                            let _0x40_dep_id = dep_id
                                                            const _0x7c_eq = await (_0x3f_chain_dep_id === _0x40_dep_id)
                                                            let _0x3e_eq = _0x7c_eq
                                                            if (_0x3e_eq) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                let _0x41_dep_loop = _0x34_dep_loop

                                                const _0x7d_reverse = await Array.prototype.reverse.call(_0x41_dep_loop)
                                                let _0x42_reverse = _0x7d_reverse
                                                _0x42_reverse
                                                let _0x43_dep_loops = _0x23_dep_loops

                                                let _0x45_dep_loop = _0x34_dep_loop
                                                const _0x7f_join = await Array.prototype.join.call(_0x45_dep_loop, " → ")
                                                let _0x46_join = _0x7f_join
                                                const _0x7e_push = await Array.prototype.push.call(_0x43_dep_loops, _0x46_join)
                                                let _0x44_push = _0x7e_push
                                                _0x44_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x48_modules = _0x5_modules
                                            let _0x4a_dep_id = dep_id
                                            const _0x81__0x48_modules = await _0x48_modules[_0x4a_dep_id]
                                            let _0x49_id = _0x81__0x48_modules
                                            let _0x4b_next_chain = _0x2b_next_chain
                                            const _0x80_visit = await _0x24_visit(_0x49_id, _0x4b_next_chain)
                                            let _0x47_visit = _0x80_visit
                                            _0x47_visit
                                        }
                                    } 
                                }
                            } }
                        let _0x4c_build_order = _0x22_build_order

                        let _0x4e_module = module
                        const _0x83__0x4e_module_id = await _0x4e_module.id
                        let _0x4f_id = _0x83__0x4e_module_id
                        const _0x82_push = await Array.prototype.push.call(_0x4c_build_order, _0x4f_id)
                        let _0x4d_push = _0x82_push
                        _0x4d_push
                    }
                } }
            let _0x51_modules = _0x5_modules
            const _0x84_values = await Object.values(_0x51_modules)
            let _0x50_values = _0x84_values

            const _0x85_iter = _0x50_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x85_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x53_module = module
                        const _0x86_visit = await _0x24_visit(_0x53_module, [])
                        let _0x52_visit = _0x86_visit
                        _0x52_visit
                    }
                } }
            let _0x55_dep_loops = _0x23_dep_loops
            const _0x88_length = await _0x55_dep_loops.length
            let _0x56_length = _0x88_length
            const _0x87_nondesc = await (1 <= _0x56_length)
            let _0x54_nondesc = _0x87_nondesc
            if (_0x54_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x59_dep_loops = _0x23_dep_loops
                        const _0x8b_join = await Array.prototype.join.call(_0x59_dep_loops, "\n")
                        let _0x5a_join = _0x8b_join
                        const _0x8a_concat = await ("ERROR: there are dependency loops.\n" + _0x5a_join)
                        let _0x58_concat = _0x8a_concat
                        const _0x89_print = await console.log(_0x58_concat)
                        let _0x57_print = _0x89_print
                        _0x57_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x5c_build_order = _0x22_build_order
                    const _0x8d_join = await Array.prototype.join.call(_0x5c_build_order, "\n")
                    let _0x5d_join = _0x8d_join
                    const _0x8c_print = await console.log(_0x5d_join)
                    let _0x5b_print = _0x8c_print
                    _0x5b_print
                }
            } 
        }
    } 
})();
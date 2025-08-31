
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
    new_set: (...args) => {
        return new Set(args);
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
    const _0x28_visit = async function (
        unroller, 
        module, 
        chain
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                unroller = unroller
                module = module
                chain = chain
                let _0x29_chain = chain
                _0x29_chain
                let _0x2a_module = module
                _0x2a_module
                let _0x2b_unroller = unroller
                _0x2b_unroller
                const _0x8e_module = await _0x2a_module
                const _0x8d_visited = await (_0x8e_module.visited)
                let _0x2d__0x2c_pipeline_result = _0x8d_visited
                if (_0x2d__0x2c_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x90_module = await _0x2a_module
                const _0x8f_visited = await (_0x90_module.visited = (true))
                let _0x2f__0x2e_pipeline_result = _0x8f_visited
                _0x2f__0x2e_pipeline_result
                if (false)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)

                        const _0x92_chain = await _0x29_chain
                        const _0x91_slice = await Array.prototype.slice.call(_0x92_chain)
                        let _0x31__0x30_pipeline_result = _0x91_slice
                        _0x31__0x30_pipeline_result
                        const _0x94__0x30_pipeline_result = await _0x31__0x30_pipeline_result
                        const _0x96_module = await _0x2a_module
                        const _0x95_id = await (_0x96_module.id)
                        let _0x34__0x33_pipeline_result = _0x95_id
                        const _0x93_push = await Array.prototype.push.call(_0x94__0x30_pipeline_result, _0x34__0x33_pipeline_result)
                        let _0x35__0x32_pipeline_result = _0x93_push
                        _0x35__0x32_pipeline_result
                    }
                } 

                const _0x98_chain = await _0x29_chain
                const _0x97_slice = await Array.prototype.slice.call(_0x98_chain)
                let _0x37__0x36_pipeline_result = _0x97_slice
                let _0x38_next_chain = _0x37__0x36_pipeline_result
                _0x38_next_chain
                const _0x9a_next_chain = await _0x38_next_chain
                const _0x9c_module = await _0x2a_module
                const _0x9b_id = await (_0x9c_module.id)
                let _0x3b__0x3a_pipeline_result = _0x9b_id
                const _0x99_push = await Array.prototype.push.call(_0x9a_next_chain, _0x3b__0x3a_pipeline_result)
                let _0x3c__0x39_pipeline_result = _0x99_push
                _0x3c__0x39_pipeline_result
                const _0x9e_module = await _0x2a_module
                const _0x9d_deps = await (_0x9e_module.deps)
                let _0x3e__0x3d_pipeline_result = _0x9d_deps
                const _0x9f_iter = _0x3e__0x3d_pipeline_result[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x9f_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0xa0_next_chain = await _0x38_next_chain
                            let _0x42__0x41_pipeline_result = _0xa0_next_chain
                            const _0xa1_dep_id = await dep_id
                            let _0x40__0x3f_pipeline_result = _0xa1_dep_id
                            const _0xa2_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x42__0x41_pipeline_result, _0x40__0x3f_pipeline_result)
                            if (_0xa2_await__67lang_dot_exists_inside_lp_)
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x43_dep_loop = []
                                    _0x43_dep_loop
                                    const _0xa4_dep_loop = await _0x43_dep_loop
                                    const _0xa5_dep_id = await dep_id
                                    let _0x46__0x45_pipeline_result = _0xa5_dep_id
                                    const _0xa3_push = await Array.prototype.push.call(_0xa4_dep_loop, _0x46__0x45_pipeline_result)
                                    let _0x47__0x44_pipeline_result = _0xa3_push
                                    _0x47__0x44_pipeline_result
                                    const _0xa7_next_chain = await _0x38_next_chain
                                    const _0xa6_slice = await Array.prototype.slice.call(_0xa7_next_chain)
                                    let _0x49__0x48_pipeline_result = _0xa6_slice
                                    _0x49__0x48_pipeline_result
                                    const _0xa9__0x48_pipeline_result = await _0x49__0x48_pipeline_result
                                    const _0xa8_reverse = await Array.prototype.reverse.call(_0xa9__0x48_pipeline_result)
                                    let _0x4b__0x4a_pipeline_result = _0xa8_reverse
                                    const _0xaa_iter = _0x4b__0x4a_pipeline_result[Symbol.iterator]();
                                    while (true) {
                                        const { value, done } = _0xaa_iter.next();
                                        if (done) { break; }
                                        let chain_dep_id = value;
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                const _0xac_dep_loop = await _0x43_dep_loop
                                                const _0xad_chain_dep_id = await chain_dep_id
                                                let _0x4e__0x4d_pipeline_result = _0xad_chain_dep_id
                                                const _0xab_push = await Array.prototype.push.call(_0xac_dep_loop, _0x4e__0x4d_pipeline_result)
                                                let _0x4f__0x4c_pipeline_result = _0xab_push
                                                _0x4f__0x4c_pipeline_result
                                                const _0xaf_chain_dep_id = await chain_dep_id
                                                let _0x52__0x51_pipeline_result = _0xaf_chain_dep_id
                                                const _0xb0_dep_id = await dep_id
                                                let _0x54__0x53_pipeline_result = _0xb0_dep_id
                                                const _0xae_eq = await (_0x52__0x51_pipeline_result === _0x54__0x53_pipeline_result)
                                                let _0x55__0x50_pipeline_result = _0xae_eq
                                                if (_0x55__0x50_pipeline_result)
                                                {
                                                    const parent_scope = scope
                                                    {
                                                        const scope = _67lang.scope(parent_scope)
                                                        break
                                                    }
                                                } 
                                            }
                                        } }
                                    const _0xb2_dep_loop = await _0x43_dep_loop
                                    const _0xb1_reverse = await Array.prototype.reverse.call(_0xb2_dep_loop)
                                    let _0x57__0x56_pipeline_result = _0xb1_reverse
                                    _0x57__0x56_pipeline_result
                                    const _0xb5_unroller = await _0x2b_unroller
                                    const _0xb4_dep_loops = await (_0xb5_unroller.dep_loops)
                                    let _0x5a__0x59_pipeline_result = _0xb4_dep_loops
                                    const _0xb7_dep_loop = await _0x43_dep_loop
                                    const _0xb6_join = await Array.prototype.join.call(_0xb7_dep_loop, " → ")
                                    let _0x5c__0x5b_pipeline_result = _0xb6_join
                                    const _0xb3_push = await Array.prototype.push.call(_0x5a__0x59_pipeline_result, _0x5c__0x5b_pipeline_result)
                                    let _0x5d__0x58_pipeline_result = _0xb3_push
                                    _0x5d__0x58_pipeline_result
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xb9_unroller = await _0x2b_unroller
                                    let _0x60__0x5f_pipeline_result = _0xb9_unroller
                                    const _0xbc_unroller = await _0x2b_unroller
                                    const _0xbb_modules = await (_0xbc_unroller.modules)
                                    let _0x63__0x62_pipeline_result = _0xbb_modules
                                    const _0xbd_dep_id = await dep_id
                                    let _0x65__0x64_pipeline_result = _0xbd_dep_id
                                    const _0xba__hash_ = await _0x63__0x62_pipeline_result[_0x65__0x64_pipeline_result]
                                    let _0x66__0x61_pipeline_result = _0xba__hash_
                                    const _0xbe_next_chain = await _0x38_next_chain
                                    let _0x68__0x67_pipeline_result = _0xbe_next_chain
                                    const _0xb8_visit = await _0x28_visit(_0x60__0x5f_pipeline_result, _0x66__0x61_pipeline_result, _0x68__0x67_pipeline_result)
                                    let _0x69__0x5e_pipeline_result = _0xb8_visit
                                    _0x69__0x5e_pipeline_result
                                }
                            } 
                        }
                    } }
                const _0xc1_unroller = await _0x2b_unroller
                const _0xc0_build_order = await (_0xc1_unroller.build_order)
                let _0x6c__0x6b_pipeline_result = _0xc0_build_order
                const _0xc3_module = await _0x2a_module
                const _0xc2_id = await (_0xc3_module.id)
                let _0x6e__0x6d_pipeline_result = _0xc2_id
                const _0xbf_push = await Array.prototype.push.call(_0x6c__0x6b_pipeline_result, _0x6e__0x6d_pipeline_result)
                let _0x6f__0x6a_pipeline_result = _0xbf_push
                _0x6f__0x6a_pipeline_result
            }
        } }
    function DAG_unroller(dep_loops, build_order, modules) {
        this.dep_loops = dep_loops;
        this.build_order = build_order;
        this.modules = modules;
    }
    function Module(id, deps, visited) {
        this.id = id;
        this.deps = deps;
        this.visited = visited;
    }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            const _0xc4_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0xc4_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0xc6_lines = await _0x2_lines
            const _0xc5_split = await String.prototype.split.call(_0xc6_lines, "\n")
            let _0x4__0x3_pipeline_result = _0xc5_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            const _0xc7_lines = await _0x5_lines
            let _0x8__0x7_pipeline_result = _0xc7_lines
            const _0xc8_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xc8_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xca_line = await line
                        const _0xc9_split = await String.prototype.split.call(_0xca_line, ":", 2)
                        let _0xa__0x9_pipeline_result = _0xc9_split
                        let _0xb_kv = _0xa__0x9_pipeline_result
                        _0xb_kv
                        const _0xcc_kv = await _0xb_kv
                        const _0xcb__hash_ = await _0xcc_kv[0]
                        let _0xd__0xc_pipeline_result = _0xcb__hash_
                        _0xd__0xc_pipeline_result
                        const _0xce__0xc_pipeline_result = await _0xd__0xc_pipeline_result
                        const _0xcd_trim = await String.prototype.trim.call(_0xce__0xc_pipeline_result)
                        let _0xe_id = _0xcd_trim
                        _0xe_id
                        const _0xd0_id = await _0xe_id
                        let _0x11__0x10_pipeline_result = _0xd0_id
                        const _0xcf_Module = await (new Module(_0x11__0x10_pipeline_result, [], false))
                        let _0x12__0xf_pipeline_result = _0xcf_Module
                        let _0x13_module = _0x12__0xf_pipeline_result
                        _0x13_module
                        const _0xd2_kv = await _0xb_kv
                        const _0xd1__hash_ = await _0xd2_kv[1]
                        let _0x15__0x14_pipeline_result = _0xd1__hash_
                        _0x15__0x14_pipeline_result
                        const _0xd4__0x14_pipeline_result = await _0x15__0x14_pipeline_result
                        const _0xd3_trim = await String.prototype.trim.call(_0xd4__0x14_pipeline_result)
                        let _0x16_deps_str = _0xd3_trim
                        _0x16_deps_str

                        const _0xd7_deps_str = await _0x16_deps_str
                        const _0xd6_eq = await (_0xd7_deps_str === "")
                        let _0x19__0x18_pipeline_result = _0xd6_eq
                        const _0xd5_none = await !(_0x19__0x18_pipeline_result)
                        let _0x1a__0x17_pipeline_result = _0xd5_none
                        if (_0x1a__0x17_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xd9_deps_str = await _0x16_deps_str
                                const _0xd8_trim = await String.prototype.trim.call(_0xd9_deps_str)
                                let _0x1c__0x1b_pipeline_result = _0xd8_trim
                                _0x1c__0x1b_pipeline_result
                                const _0xdb__0x1b_pipeline_result = await _0x1c__0x1b_pipeline_result
                                const _0xda_split = await String.prototype.split.call(_0xdb__0x1b_pipeline_result, /\s+/)
                                let _0x1d_deps = _0xda_split
                                _0x1d_deps
                                const _0xdd_module = await _0x13_module
                                const _0xde_deps = await _0x1d_deps
                                let _0x20__0x1f_pipeline_result = _0xde_deps
                                const _0xdc_deps = await (_0xdd_module.deps = (_0x20__0x1f_pipeline_result))
                                let _0x21__0x1e_pipeline_result = _0xdc_deps
                                _0x21__0x1e_pipeline_result
                            }
                        } 
                        const _0xe0_modules = await _0x6_modules
                        const _0xe2_module = await _0x13_module
                        const _0xe1_id = await (_0xe2_module.id)
                        let _0x24__0x23_pipeline_result = _0xe1_id
                        const _0xe3_module = await _0x13_module
                        let _0x26__0x25_pipeline_result = _0xe3_module
                        const _0xdf__hash_ = await (_0xe0_modules[_0x24__0x23_pipeline_result] = _0x26__0x25_pipeline_result)
                        let _0x27__0x22_pipeline_result = _0xdf__hash_
                        _0x27__0x22_pipeline_result
                    }
                } }




            const _0xe5_modules = await _0x6_modules
            let _0x72__0x71_pipeline_result = _0xe5_modules
            const _0xe4_DAG_unroller = await (new DAG_unroller([], [], _0x72__0x71_pipeline_result))
            let _0x73__0x70_pipeline_result = _0xe4_DAG_unroller
            let _0x74_unroller = _0x73__0x70_pipeline_result
            _0x74_unroller
            const _0xe7_modules = await _0x6_modules
            const _0xe6_values = await Object.values(_0xe7_modules)
            let _0x76__0x75_pipeline_result = _0xe6_values
            const _0xe8_iter = _0x76__0x75_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xe8_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xea_unroller = await _0x74_unroller
                        let _0x79__0x78_pipeline_result = _0xea_unroller
                        const _0xeb_module = await module
                        let _0x7b__0x7a_pipeline_result = _0xeb_module
                        const _0xe9_visit = await _0x28_visit(_0x79__0x78_pipeline_result, _0x7b__0x7a_pipeline_result, [])
                        let _0x7c__0x77_pipeline_result = _0xe9_visit
                        _0x7c__0x77_pipeline_result
                    }
                } }
            const _0xec_unroller = await _0x74_unroller
            let _0x7e__0x7d_pipeline_result = _0xec_unroller
            _0x7e__0x7d_pipeline_result
            const _0xf0__0x7d_pipeline_result = await _0x7e__0x7d_pipeline_result
            const _0xef_dep_loops = await (_0xf0__0x7d_pipeline_result.dep_loops)
            const _0xee_length = await (_0xef_dep_loops.length)
            let _0x81__0x80_pipeline_result = _0xee_length
            const _0xed_nondesc = await (1 <= _0x81__0x80_pipeline_result)
            let _0x82__0x7f_pipeline_result = _0xed_nondesc
            if (_0x82__0x7f_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf5__0x7d_pipeline_result = await _0x7e__0x7d_pipeline_result
                    const _0xf4_dep_loops = await (_0xf5__0x7d_pipeline_result.dep_loops)
                    const _0xf3_join = await Array.prototype.join.call(_0xf4_dep_loops, "\n")
                    let _0x86__0x85_pipeline_result = _0xf3_join
                    const _0xf2_concat = await String.prototype.concat.call("ERROR: there are dependency loops.\n", _0x86__0x85_pipeline_result)
                    let _0x87__0x84_pipeline_result = _0xf2_concat
                    const _0xf1_print = await console.log(_0x87__0x84_pipeline_result)
                    let _0x88__0x83_pipeline_result = _0xf1_print
                    _0x88__0x83_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf9__0x7d_pipeline_result = await _0x7e__0x7d_pipeline_result
                    const _0xf8_build_order = await (_0xf9__0x7d_pipeline_result.build_order)
                    const _0xf7_join = await Array.prototype.join.call(_0xf8_build_order, "\n")
                    let _0x8b__0x8a_pipeline_result = _0xf7_join
                    const _0xf6_print = await console.log(_0x8b__0x8a_pipeline_result)
                    let _0x8c__0x89_pipeline_result = _0xf6_print
                    _0x8c__0x89_pipeline_result
                }
            } 
        }
    } 
})();
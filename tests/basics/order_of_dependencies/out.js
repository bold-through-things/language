
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
    const _0x3b_visit = async function (
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
                let _0x3c_chain = chain
                _0x3c_chain
                let _0x3d_module = module
                _0x3d_module
                let _0x3e_unroller = unroller
                _0x3e_unroller
                const _0xda_module = await _0x3d_module
                const _0xd9_visited = await (_0xda_module.visited)
                let _0x40__0x3f_pipeline_result = _0xd9_visited
                if (_0x40__0x3f_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0xdc_module = await _0x3d_module
                const _0xdb_visited = await (_0xdc_module.visited = (true))
                let _0x42__0x41_pipeline_result = _0xdb_visited
                _0x42__0x41_pipeline_result
                if (false)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)

                        const _0xde_chain = await _0x3c_chain
                        const _0xdd_slice = await Array.prototype.slice.call(_0xde_chain)
                        let _0x44__0x43_pipeline_result = _0xdd_slice
                        _0x44__0x43_pipeline_result
                        const _0xe0__0x43_pipeline_result = await _0x44__0x43_pipeline_result
                        const _0xe2_module = await _0x3d_module
                        const _0xe1_id = await (_0xe2_module.id)
                        let _0x47__0x46_pipeline_result = _0xe1_id
                        const _0xdf_push = await Array.prototype.push.call(_0xe0__0x43_pipeline_result, _0x47__0x46_pipeline_result)
                        let _0x48__0x45_pipeline_result = _0xdf_push
                        _0x48__0x45_pipeline_result
                    }
                } 

                const _0xe4_chain = await _0x3c_chain
                const _0xe3_slice = await Array.prototype.slice.call(_0xe4_chain)
                let _0x4a__0x49_pipeline_result = _0xe3_slice
                let _0x4b_next_chain = _0x4a__0x49_pipeline_result
                _0x4b_next_chain
                const _0xe6_next_chain = await _0x4b_next_chain
                const _0xe8_module = await _0x3d_module
                const _0xe7_id = await (_0xe8_module.id)
                let _0x4e__0x4d_pipeline_result = _0xe7_id
                const _0xe5_push = await Array.prototype.push.call(_0xe6_next_chain, _0x4e__0x4d_pipeline_result)
                let _0x4f__0x4c_pipeline_result = _0xe5_push
                _0x4f__0x4c_pipeline_result
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x52__0x50_for_dep_id__index = 0
                        _0x52__0x50_for_dep_id__index
                        const _0xea_module = await _0x3d_module
                        const _0xe9_deps = await (_0xea_module.deps)
                        let _0x54__0x53_pipeline_result = _0xe9_deps
                        let _0x55__0x51_for_dep_id__list = _0x54__0x53_pipeline_result
                        _0x55__0x51_for_dep_id__list
                        while(true) {
                            const _0xec__0x50_for_dep_id__index = await _0x52__0x50_for_dep_id__index
                            let _0x58__0x57_pipeline_result = _0xec__0x50_for_dep_id__index
                            const _0xee__0x51_for_dep_id__list = await _0x55__0x51_for_dep_id__list
                            const _0xed_length = await (_0xee__0x51_for_dep_id__list.length)
                            let _0x5a__0x59_pipeline_result = _0xed_length
                            const _0xeb_asc = await (_0x58__0x57_pipeline_result < _0x5a__0x59_pipeline_result)
                            let _0x5b__0x56_pipeline_result = _0xeb_asc
                            if (!_0x5b__0x56_pipeline_result) { break; }
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xf0__0x51_for_dep_id__list = await _0x55__0x51_for_dep_id__list
                                    const _0xf1__0x50_for_dep_id__index = await _0x52__0x50_for_dep_id__index
                                    let _0x5e__0x5d_pipeline_result = _0xf1__0x50_for_dep_id__index
                                    const _0xef__hash_ = await _0xf0__0x51_for_dep_id__list[_0x5e__0x5d_pipeline_result]
                                    let _0x5f__0x5c_pipeline_result = _0xef__hash_
                                    let _0x60_dep_id = _0x5f__0x5c_pipeline_result
                                    _0x60_dep_id
                                    const _0xf4__0x50_for_dep_id__index = await _0x52__0x50_for_dep_id__index
                                    const _0xf3_add = await (_0xf4__0x50_for_dep_id__index + 1)
                                    let _0x63__0x62_pipeline_result = _0xf3_add
                                    const _0xf2__0x50_for_dep_id__index = await (_0x52__0x50_for_dep_id__index = _0x63__0x62_pipeline_result)
                                    let _0x64__0x61_pipeline_result = _0xf2__0x50_for_dep_id__index
                                    _0x64__0x61_pipeline_result
                                    const _0xf5_next_chain = await _0x4b_next_chain
                                    let _0x68__0x67_pipeline_result = _0xf5_next_chain
                                    const _0xf6_dep_id = await _0x60_dep_id
                                    let _0x66__0x65_pipeline_result = _0xf6_dep_id
                                    const _0xf7_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x68__0x67_pipeline_result, _0x66__0x65_pipeline_result)
                                    if (_0xf7_await__67lang_dot_exists_inside_lp_)
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x69_dep_loop = []
                                            _0x69_dep_loop
                                            const _0xf9_dep_loop = await _0x69_dep_loop
                                            const _0xfa_dep_id = await _0x60_dep_id
                                            let _0x6c__0x6b_pipeline_result = _0xfa_dep_id
                                            const _0xf8_push = await Array.prototype.push.call(_0xf9_dep_loop, _0x6c__0x6b_pipeline_result)
                                            let _0x6d__0x6a_pipeline_result = _0xf8_push
                                            _0x6d__0x6a_pipeline_result
                                            const _0xfc_next_chain = await _0x4b_next_chain
                                            const _0xfb_slice = await Array.prototype.slice.call(_0xfc_next_chain)
                                            let _0x6f__0x6e_pipeline_result = _0xfb_slice
                                            _0x6f__0x6e_pipeline_result
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    let _0x72__0x70_for_chain_dep_id__index = 0
                                                    _0x72__0x70_for_chain_dep_id__index
                                                    const _0xfe__0x6e_pipeline_result = await _0x6f__0x6e_pipeline_result
                                                    const _0xfd_reverse = await Array.prototype.reverse.call(_0xfe__0x6e_pipeline_result)
                                                    let _0x74__0x73_pipeline_result = _0xfd_reverse
                                                    let _0x75__0x71_for_chain_dep_id__list = _0x74__0x73_pipeline_result
                                                    _0x75__0x71_for_chain_dep_id__list
                                                    while(true) {
                                                        const _0x100__0x70_for_chain_dep_id__index = await _0x72__0x70_for_chain_dep_id__index
                                                        let _0x78__0x77_pipeline_result = _0x100__0x70_for_chain_dep_id__index
                                                        const _0x102__0x71_for_chain_dep_id__list = await _0x75__0x71_for_chain_dep_id__list
                                                        const _0x101_length = await (_0x102__0x71_for_chain_dep_id__list.length)
                                                        let _0x7a__0x79_pipeline_result = _0x101_length
                                                        const _0xff_asc = await (_0x78__0x77_pipeline_result < _0x7a__0x79_pipeline_result)
                                                        let _0x7b__0x76_pipeline_result = _0xff_asc
                                                        if (!_0x7b__0x76_pipeline_result) { break; }
                                                        {
                                                            const parent_scope = scope
                                                            {
                                                                const scope = _67lang.scope(parent_scope)
                                                                const _0x104__0x71_for_chain_dep_id__list = await _0x75__0x71_for_chain_dep_id__list
                                                                const _0x105__0x70_for_chain_dep_id__index = await _0x72__0x70_for_chain_dep_id__index
                                                                let _0x7e__0x7d_pipeline_result = _0x105__0x70_for_chain_dep_id__index
                                                                const _0x103__hash_ = await _0x104__0x71_for_chain_dep_id__list[_0x7e__0x7d_pipeline_result]
                                                                let _0x7f__0x7c_pipeline_result = _0x103__hash_
                                                                let _0x80_chain_dep_id = _0x7f__0x7c_pipeline_result
                                                                _0x80_chain_dep_id
                                                                const _0x108__0x70_for_chain_dep_id__index = await _0x72__0x70_for_chain_dep_id__index
                                                                const _0x107_add = await (_0x108__0x70_for_chain_dep_id__index + 1)
                                                                let _0x83__0x82_pipeline_result = _0x107_add
                                                                const _0x106__0x70_for_chain_dep_id__index = await (_0x72__0x70_for_chain_dep_id__index = _0x83__0x82_pipeline_result)
                                                                let _0x84__0x81_pipeline_result = _0x106__0x70_for_chain_dep_id__index
                                                                _0x84__0x81_pipeline_result
                                                                const _0x10a_dep_loop = await _0x69_dep_loop
                                                                const _0x10b_chain_dep_id = await _0x80_chain_dep_id
                                                                let _0x87__0x86_pipeline_result = _0x10b_chain_dep_id
                                                                const _0x109_push = await Array.prototype.push.call(_0x10a_dep_loop, _0x87__0x86_pipeline_result)
                                                                let _0x88__0x85_pipeline_result = _0x109_push
                                                                _0x88__0x85_pipeline_result
                                                                const _0x10d_chain_dep_id = await _0x80_chain_dep_id
                                                                let _0x8b__0x8a_pipeline_result = _0x10d_chain_dep_id
                                                                const _0x10e_dep_id = await _0x60_dep_id
                                                                let _0x8d__0x8c_pipeline_result = _0x10e_dep_id
                                                                const _0x10c_eq = await (_0x8b__0x8a_pipeline_result === _0x8d__0x8c_pipeline_result)
                                                                let _0x8e__0x89_pipeline_result = _0x10c_eq
                                                                if (_0x8e__0x89_pipeline_result)
                                                                {
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } 
                                                            }
                                                        } }
                                                }
                                            } 
                                            const _0x110_dep_loop = await _0x69_dep_loop
                                            const _0x10f_reverse = await Array.prototype.reverse.call(_0x110_dep_loop)
                                            let _0x90__0x8f_pipeline_result = _0x10f_reverse
                                            _0x90__0x8f_pipeline_result
                                            const _0x113_unroller = await _0x3e_unroller
                                            const _0x112_dep_loops = await (_0x113_unroller.dep_loops)
                                            let _0x93__0x92_pipeline_result = _0x112_dep_loops
                                            const _0x115_dep_loop = await _0x69_dep_loop
                                            const _0x114_join = await Array.prototype.join.call(_0x115_dep_loop, " → ")
                                            let _0x95__0x94_pipeline_result = _0x114_join
                                            const _0x111_push = await Array.prototype.push.call(_0x93__0x92_pipeline_result, _0x95__0x94_pipeline_result)
                                            let _0x96__0x91_pipeline_result = _0x111_push
                                            _0x96__0x91_pipeline_result
                                        }
                                    } 
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x117_unroller = await _0x3e_unroller
                                            let _0x99__0x98_pipeline_result = _0x117_unroller
                                            const _0x11a_unroller = await _0x3e_unroller
                                            const _0x119_modules = await (_0x11a_unroller.modules)
                                            let _0x9c__0x9b_pipeline_result = _0x119_modules
                                            const _0x11b_dep_id = await _0x60_dep_id
                                            let _0x9e__0x9d_pipeline_result = _0x11b_dep_id
                                            const _0x118__hash_ = await _0x9c__0x9b_pipeline_result[_0x9e__0x9d_pipeline_result]
                                            let _0x9f__0x9a_pipeline_result = _0x118__hash_
                                            const _0x11c_next_chain = await _0x4b_next_chain
                                            let _0xa1__0xa0_pipeline_result = _0x11c_next_chain
                                            const _0x116_visit = await _0x3b_visit(_0x99__0x98_pipeline_result, _0x9f__0x9a_pipeline_result, _0xa1__0xa0_pipeline_result)
                                            let _0xa2__0x97_pipeline_result = _0x116_visit
                                            _0xa2__0x97_pipeline_result
                                        }
                                    } 
                                }
                            } }
                    }
                } 
                const _0x11f_unroller = await _0x3e_unroller
                const _0x11e_build_order = await (_0x11f_unroller.build_order)
                let _0xa5__0xa4_pipeline_result = _0x11e_build_order
                const _0x121_module = await _0x3d_module
                const _0x120_id = await (_0x121_module.id)
                let _0xa7__0xa6_pipeline_result = _0x120_id
                const _0x11d_push = await Array.prototype.push.call(_0xa5__0xa4_pipeline_result, _0xa7__0xa6_pipeline_result)
                let _0xa8__0xa3_pipeline_result = _0x11d_push
                _0xa8__0xa3_pipeline_result
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
            const _0x122_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x122_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0x124_lines = await _0x2_lines
            const _0x123_split = await String.prototype.split.call(_0x124_lines, "\n")
            let _0x4__0x3_pipeline_result = _0x123_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x9__0x7_for_line__index = 0
                    _0x9__0x7_for_line__index
                    const _0x125_lines = await _0x5_lines
                    let _0xb__0xa_pipeline_result = _0x125_lines
                    let _0xc__0x8_for_line__list = _0xb__0xa_pipeline_result
                    _0xc__0x8_for_line__list
                    while(true) {
                        const _0x127__0x7_for_line__index = await _0x9__0x7_for_line__index
                        let _0xf__0xe_pipeline_result = _0x127__0x7_for_line__index
                        const _0x129__0x8_for_line__list = await _0xc__0x8_for_line__list
                        const _0x128_length = await (_0x129__0x8_for_line__list.length)
                        let _0x11__0x10_pipeline_result = _0x128_length
                        const _0x126_asc = await (_0xf__0xe_pipeline_result < _0x11__0x10_pipeline_result)
                        let _0x12__0xd_pipeline_result = _0x126_asc
                        if (!_0x12__0xd_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x12b__0x8_for_line__list = await _0xc__0x8_for_line__list
                                const _0x12c__0x7_for_line__index = await _0x9__0x7_for_line__index
                                let _0x15__0x14_pipeline_result = _0x12c__0x7_for_line__index
                                const _0x12a__hash_ = await _0x12b__0x8_for_line__list[_0x15__0x14_pipeline_result]
                                let _0x16__0x13_pipeline_result = _0x12a__hash_
                                let _0x17_line = _0x16__0x13_pipeline_result
                                _0x17_line
                                const _0x12f__0x7_for_line__index = await _0x9__0x7_for_line__index
                                const _0x12e_add = await (_0x12f__0x7_for_line__index + 1)
                                let _0x1a__0x19_pipeline_result = _0x12e_add
                                const _0x12d__0x7_for_line__index = await (_0x9__0x7_for_line__index = _0x1a__0x19_pipeline_result)
                                let _0x1b__0x18_pipeline_result = _0x12d__0x7_for_line__index
                                _0x1b__0x18_pipeline_result
                                const _0x131_line = await _0x17_line
                                const _0x130_split = await String.prototype.split.call(_0x131_line, ":", 2)
                                let _0x1d__0x1c_pipeline_result = _0x130_split
                                let _0x1e_kv = _0x1d__0x1c_pipeline_result
                                _0x1e_kv
                                const _0x133_kv = await _0x1e_kv
                                const _0x132__hash_ = await _0x133_kv[0]
                                let _0x20__0x1f_pipeline_result = _0x132__hash_
                                _0x20__0x1f_pipeline_result
                                const _0x135__0x1f_pipeline_result = await _0x20__0x1f_pipeline_result
                                const _0x134_trim = await String.prototype.trim.call(_0x135__0x1f_pipeline_result)
                                let _0x21_id = _0x134_trim
                                _0x21_id
                                const _0x137_id = await _0x21_id
                                let _0x24__0x23_pipeline_result = _0x137_id
                                const _0x136_Module = await (new Module(_0x24__0x23_pipeline_result, [], false))
                                let _0x25__0x22_pipeline_result = _0x136_Module
                                let _0x26_module = _0x25__0x22_pipeline_result
                                _0x26_module
                                const _0x139_kv = await _0x1e_kv
                                const _0x138__hash_ = await _0x139_kv[1]
                                let _0x28__0x27_pipeline_result = _0x138__hash_
                                _0x28__0x27_pipeline_result
                                const _0x13b__0x27_pipeline_result = await _0x28__0x27_pipeline_result
                                const _0x13a_trim = await String.prototype.trim.call(_0x13b__0x27_pipeline_result)
                                let _0x29_deps_str = _0x13a_trim
                                _0x29_deps_str

                                const _0x13e_deps_str = await _0x29_deps_str
                                const _0x13d_eq = await (_0x13e_deps_str === "")
                                let _0x2c__0x2b_pipeline_result = _0x13d_eq
                                const _0x13c_none = await !(_0x2c__0x2b_pipeline_result)
                                let _0x2d__0x2a_pipeline_result = _0x13c_none
                                if (_0x2d__0x2a_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x140_deps_str = await _0x29_deps_str
                                        const _0x13f_trim = await String.prototype.trim.call(_0x140_deps_str)
                                        let _0x2f__0x2e_pipeline_result = _0x13f_trim
                                        _0x2f__0x2e_pipeline_result
                                        const _0x142__0x2e_pipeline_result = await _0x2f__0x2e_pipeline_result
                                        const _0x141_split = await String.prototype.split.call(_0x142__0x2e_pipeline_result, /\s+/)
                                        let _0x30_deps = _0x141_split
                                        _0x30_deps
                                        const _0x144_module = await _0x26_module
                                        const _0x145_deps = await _0x30_deps
                                        let _0x33__0x32_pipeline_result = _0x145_deps
                                        const _0x143_deps = await (_0x144_module.deps = (_0x33__0x32_pipeline_result))
                                        let _0x34__0x31_pipeline_result = _0x143_deps
                                        _0x34__0x31_pipeline_result
                                    }
                                } 
                                const _0x147_modules = await _0x6_modules
                                const _0x149_module = await _0x26_module
                                const _0x148_id = await (_0x149_module.id)
                                let _0x37__0x36_pipeline_result = _0x148_id
                                const _0x14a_module = await _0x26_module
                                let _0x39__0x38_pipeline_result = _0x14a_module
                                const _0x146__hash_ = await (_0x147_modules[_0x37__0x36_pipeline_result] = _0x39__0x38_pipeline_result)
                                let _0x3a__0x35_pipeline_result = _0x146__hash_
                                _0x3a__0x35_pipeline_result
                            }
                        } }
                }
            } 




            const _0x14c_modules = await _0x6_modules
            let _0xab__0xaa_pipeline_result = _0x14c_modules
            const _0x14b_DAG_unroller = await (new DAG_unroller([], [], _0xab__0xaa_pipeline_result))
            let _0xac__0xa9_pipeline_result = _0x14b_DAG_unroller
            let _0xad_unroller = _0xac__0xa9_pipeline_result
            _0xad_unroller
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xb0__0xae_for_module__index = 0
                    _0xb0__0xae_for_module__index
                    const _0x14e_modules = await _0x6_modules
                    const _0x14d_values = await Object.values(_0x14e_modules)
                    let _0xb2__0xb1_pipeline_result = _0x14d_values
                    let _0xb3__0xaf_for_module__list = _0xb2__0xb1_pipeline_result
                    _0xb3__0xaf_for_module__list
                    while(true) {
                        const _0x150__0xae_for_module__index = await _0xb0__0xae_for_module__index
                        let _0xb6__0xb5_pipeline_result = _0x150__0xae_for_module__index
                        const _0x152__0xaf_for_module__list = await _0xb3__0xaf_for_module__list
                        const _0x151_length = await (_0x152__0xaf_for_module__list.length)
                        let _0xb8__0xb7_pipeline_result = _0x151_length
                        const _0x14f_asc = await (_0xb6__0xb5_pipeline_result < _0xb8__0xb7_pipeline_result)
                        let _0xb9__0xb4_pipeline_result = _0x14f_asc
                        if (!_0xb9__0xb4_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x154__0xaf_for_module__list = await _0xb3__0xaf_for_module__list
                                const _0x155__0xae_for_module__index = await _0xb0__0xae_for_module__index
                                let _0xbc__0xbb_pipeline_result = _0x155__0xae_for_module__index
                                const _0x153__hash_ = await _0x154__0xaf_for_module__list[_0xbc__0xbb_pipeline_result]
                                let _0xbd__0xba_pipeline_result = _0x153__hash_
                                let _0xbe_module = _0xbd__0xba_pipeline_result
                                _0xbe_module
                                const _0x158__0xae_for_module__index = await _0xb0__0xae_for_module__index
                                const _0x157_add = await (_0x158__0xae_for_module__index + 1)
                                let _0xc1__0xc0_pipeline_result = _0x157_add
                                const _0x156__0xae_for_module__index = await (_0xb0__0xae_for_module__index = _0xc1__0xc0_pipeline_result)
                                let _0xc2__0xbf_pipeline_result = _0x156__0xae_for_module__index
                                _0xc2__0xbf_pipeline_result
                                const _0x15a_unroller = await _0xad_unroller
                                let _0xc5__0xc4_pipeline_result = _0x15a_unroller
                                const _0x15b_module = await _0xbe_module
                                let _0xc7__0xc6_pipeline_result = _0x15b_module
                                const _0x159_visit = await _0x3b_visit(_0xc5__0xc4_pipeline_result, _0xc7__0xc6_pipeline_result, [])
                                let _0xc8__0xc3_pipeline_result = _0x159_visit
                                _0xc8__0xc3_pipeline_result
                            }
                        } }
                }
            } 
            const _0x15c_unroller = await _0xad_unroller
            let _0xca__0xc9_pipeline_result = _0x15c_unroller
            _0xca__0xc9_pipeline_result
            const _0x160__0xc9_pipeline_result = await _0xca__0xc9_pipeline_result
            const _0x15f_dep_loops = await (_0x160__0xc9_pipeline_result.dep_loops)
            const _0x15e_length = await (_0x15f_dep_loops.length)
            let _0xcd__0xcc_pipeline_result = _0x15e_length
            const _0x15d_nondesc = await (1 <= _0xcd__0xcc_pipeline_result)
            let _0xce__0xcb_pipeline_result = _0x15d_nondesc
            if (_0xce__0xcb_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x165__0xc9_pipeline_result = await _0xca__0xc9_pipeline_result
                    const _0x164_dep_loops = await (_0x165__0xc9_pipeline_result.dep_loops)
                    const _0x163_join = await Array.prototype.join.call(_0x164_dep_loops, "\n")
                    let _0xd2__0xd1_pipeline_result = _0x163_join
                    const _0x162_concat = await String.prototype.concat.call("ERROR: there are dependency loops.\n", _0xd2__0xd1_pipeline_result)
                    let _0xd3__0xd0_pipeline_result = _0x162_concat
                    const _0x161_print = await console.log(_0xd3__0xd0_pipeline_result)
                    let _0xd4__0xcf_pipeline_result = _0x161_print
                    _0xd4__0xcf_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x169__0xc9_pipeline_result = await _0xca__0xc9_pipeline_result
                    const _0x168_build_order = await (_0x169__0xc9_pipeline_result.build_order)
                    const _0x167_join = await Array.prototype.join.call(_0x168_build_order, "\n")
                    let _0xd7__0xd6_pipeline_result = _0x167_join
                    const _0x166_print = await console.log(_0xd7__0xd6_pipeline_result)
                    let _0xd8__0xd5_pipeline_result = _0x166_print
                    _0xd8__0xd5_pipeline_result
                }
            } 
        }
    } 
})();
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
    const _0x2b_visit = async function (
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
                const _0x88_module = await module
                const _0x87__hash_ = await _0x88_module["visited"]
                let _0x2d__0x2c_pipeline_result = _0x87__hash_
                if (_0x2d__0x2c_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x8a_module = await module
                const _0x89__hash_ = await (_0x8a_module["visited"] = true)
                let _0x2f__0x2e_pipeline_result = _0x89__hash_
                _0x2f__0x2e_pipeline_result

                const _0x8c_chain = await chain
                const _0x8b_slice = await Array.prototype.slice.call(_0x8c_chain)
                let _0x31__0x30_pipeline_result = _0x8b_slice
                let _0x32_next_chain = _0x31__0x30_pipeline_result
                _0x32_next_chain
                const _0x8e_next_chain = await _0x32_next_chain
                const _0x90_module = await module
                const _0x8f__hash_ = await _0x90_module["id"]
                let _0x35__0x34_pipeline_result = _0x8f__hash_
                const _0x8d_push = await Array.prototype.push.call(_0x8e_next_chain, _0x35__0x34_pipeline_result)
                let _0x36__0x33_pipeline_result = _0x8d_push
                _0x36__0x33_pipeline_result
                const _0x92_module = await module
                const _0x91__hash_ = await _0x92_module["deps"]
                let _0x38__0x37_pipeline_result = _0x91__hash_

                const _0x93_iter = _0x38__0x37_pipeline_result[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x93_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x94_next_chain = await _0x32_next_chain
                            let _0x3c__0x3b_pipeline_result = _0x94_next_chain
                            const _0x95_dep_id = await dep_id
                            let _0x3a__0x39_pipeline_result = _0x95_dep_id
                            const _0x96_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x3c__0x3b_pipeline_result, _0x3a__0x39_pipeline_result)
                            if (_0x96_await__67lang_dot_exists_inside_lp_)
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x3d_dep_loop = []
                                    _0x3d_dep_loop
                                    const _0x98_dep_loop = await _0x3d_dep_loop
                                    const _0x99_dep_id = await dep_id
                                    let _0x40__0x3f_pipeline_result = _0x99_dep_id
                                    const _0x97_push = await Array.prototype.push.call(_0x98_dep_loop, _0x40__0x3f_pipeline_result)
                                    let _0x41__0x3e_pipeline_result = _0x97_push
                                    _0x41__0x3e_pipeline_result
                                    const _0x9b_next_chain = await _0x32_next_chain
                                    const _0x9a_slice = await Array.prototype.slice.call(_0x9b_next_chain)
                                    let _0x43__0x42_pipeline_result = _0x9a_slice
                                    _0x43__0x42_pipeline_result
                                    const _0x9d__0x42_pipeline_result = await _0x43__0x42_pipeline_result
                                    const _0x9c_reverse = await Array.prototype.reverse.call(_0x9d__0x42_pipeline_result)
                                    let _0x45__0x44_pipeline_result = _0x9c_reverse

                                    const _0x9e_iter = _0x45__0x44_pipeline_result[Symbol.iterator]();
                                    while (true) {
                                        const { value, done } = _0x9e_iter.next();
                                        if (done) { break; }
                                        let chain_dep_id = value;
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                const _0xa0_dep_loop = await _0x3d_dep_loop
                                                const _0xa1_chain_dep_id = await chain_dep_id
                                                let _0x48__0x47_pipeline_result = _0xa1_chain_dep_id
                                                const _0x9f_push = await Array.prototype.push.call(_0xa0_dep_loop, _0x48__0x47_pipeline_result)
                                                let _0x49__0x46_pipeline_result = _0x9f_push
                                                _0x49__0x46_pipeline_result
                                                const _0xa3_chain_dep_id = await chain_dep_id
                                                let _0x4c__0x4b_pipeline_result = _0xa3_chain_dep_id
                                                const _0xa4_dep_id = await dep_id
                                                let _0x4e__0x4d_pipeline_result = _0xa4_dep_id
                                                const _0xa2_eq = await (_0x4c__0x4b_pipeline_result === _0x4e__0x4d_pipeline_result)
                                                let _0x4f__0x4a_pipeline_result = _0xa2_eq
                                                if (_0x4f__0x4a_pipeline_result)
                                                {
                                                    const parent_scope = scope
                                                    {
                                                        const scope = _67lang.scope(parent_scope)
                                                        break
                                                    }
                                                } 
                                            }
                                        } }
                                    const _0xa6_dep_loop = await _0x3d_dep_loop
                                    const _0xa5_reverse = await Array.prototype.reverse.call(_0xa6_dep_loop)
                                    let _0x51__0x50_pipeline_result = _0xa5_reverse
                                    _0x51__0x50_pipeline_result
                                    const _0xa9_unroller = await unroller
                                    const _0xa8_dep_loops = await (_0xa9_unroller.dep_loops)
                                    let _0x54__0x53_pipeline_result = _0xa8_dep_loops
                                    const _0xab_dep_loop = await _0x3d_dep_loop
                                    const _0xaa_join = await Array.prototype.join.call(_0xab_dep_loop, " → ")
                                    let _0x56__0x55_pipeline_result = _0xaa_join
                                    const _0xa7_push = await Array.prototype.push.call(_0x54__0x53_pipeline_result, _0x56__0x55_pipeline_result)
                                    let _0x57__0x52_pipeline_result = _0xa7_push
                                    _0x57__0x52_pipeline_result
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xad_unroller = await unroller
                                    let _0x5a__0x59_pipeline_result = _0xad_unroller
                                    const _0xb0_unroller = await unroller
                                    const _0xaf_modules = await (_0xb0_unroller.modules)
                                    let _0x5d__0x5c_pipeline_result = _0xaf_modules
                                    const _0xb1_dep_id = await dep_id
                                    let _0x5f__0x5e_pipeline_result = _0xb1_dep_id
                                    const _0xae__hash_ = await _0x5d__0x5c_pipeline_result[_0x5f__0x5e_pipeline_result]
                                    let _0x60__0x5b_pipeline_result = _0xae__hash_
                                    const _0xb2_next_chain = await _0x32_next_chain
                                    let _0x62__0x61_pipeline_result = _0xb2_next_chain
                                    const _0xac_visit = await _0x2b_visit(_0x5a__0x59_pipeline_result, _0x60__0x5b_pipeline_result, _0x62__0x61_pipeline_result)
                                    let _0x63__0x58_pipeline_result = _0xac_visit
                                    _0x63__0x58_pipeline_result
                                }
                            } 
                        }
                    } }
                const _0xb5_unroller = await unroller
                const _0xb4_build_order = await (_0xb5_unroller.build_order)
                let _0x66__0x65_pipeline_result = _0xb4_build_order
                const _0xb7_module = await module
                const _0xb6__hash_ = await _0xb7_module["id"]
                let _0x68__0x67_pipeline_result = _0xb6__hash_
                const _0xb3_push = await Array.prototype.push.call(_0x66__0x65_pipeline_result, _0x68__0x67_pipeline_result)
                let _0x69__0x64_pipeline_result = _0xb3_push
                _0x69__0x64_pipeline_result
            }
        } }
    function DAG_unroller(dep_loops, build_order, modules) {
        this.dep_loops = dep_loops;
        this.build_order = build_order;
        this.modules = modules;
    }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            const _0xb8_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0xb8_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0xba_lines = await _0x2_lines
            const _0xb9_split = await String.prototype.split.call(_0xba_lines, "\n")
            let _0x4__0x3_pipeline_result = _0xb9_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            const _0xbb_lines = await _0x5_lines
            let _0x8__0x7_pipeline_result = _0xbb_lines

            const _0xbc_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xbc_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_module = {}
                        _0x9_module
                        const _0xbe_line = await line
                        const _0xbd_split = await String.prototype.split.call(_0xbe_line, ":", 2)
                        let _0xb__0xa_pipeline_result = _0xbd_split
                        let _0xc_kv = _0xb__0xa_pipeline_result
                        _0xc_kv
                        const _0xc0_kv = await _0xc_kv
                        const _0xbf__hash_ = await _0xc0_kv[0]
                        let _0xe__0xd_pipeline_result = _0xbf__hash_
                        _0xe__0xd_pipeline_result
                        const _0xc2__0xd_pipeline_result = await _0xe__0xd_pipeline_result
                        const _0xc1_trim = await String.prototype.trim.call(_0xc2__0xd_pipeline_result)
                        let _0xf_id = _0xc1_trim
                        _0xf_id
                        const _0xc4_module = await _0x9_module
                        const _0xc5_id = await _0xf_id
                        let _0x12__0x11_pipeline_result = _0xc5_id
                        const _0xc3__hash_ = await (_0xc4_module["id"] = _0x12__0x11_pipeline_result)
                        let _0x13__0x10_pipeline_result = _0xc3__hash_
                        _0x13__0x10_pipeline_result
                        const _0xc7_kv = await _0xc_kv
                        const _0xc6__hash_ = await _0xc7_kv[1]
                        let _0x15__0x14_pipeline_result = _0xc6__hash_
                        _0x15__0x14_pipeline_result
                        const _0xc9__0x14_pipeline_result = await _0x15__0x14_pipeline_result
                        const _0xc8_trim = await String.prototype.trim.call(_0xc9__0x14_pipeline_result)
                        let _0x17__0x16_pipeline_result = _0xc8_trim
                        _0x17__0x16_pipeline_result
                        const _0xcb__0x16_pipeline_result = await _0x17__0x16_pipeline_result
                        const _0xca_split = await String.prototype.split.call(_0xcb__0x16_pipeline_result, /\s+/)
                        let _0x18_deps = _0xca_split
                        _0x18_deps
                        const _0xcd_module = await _0x9_module
                        const _0xce_deps = await _0x18_deps
                        let _0x1b__0x1a_pipeline_result = _0xce_deps
                        const _0xcc__hash_ = await (_0xcd_module["deps"] = _0x1b__0x1a_pipeline_result)
                        let _0x1c__0x19_pipeline_result = _0xcc__hash_
                        _0x1c__0x19_pipeline_result

                        const _0xd0_kv = await _0xc_kv
                        const _0xcf__hash_ = await _0xd0_kv[1]
                        let _0x1e__0x1d_pipeline_result = _0xcf__hash_
                        _0x1e__0x1d_pipeline_result
                        const _0xd3__0x1d_pipeline_result = await _0x1e__0x1d_pipeline_result
                        const _0xd2_trim = await String.prototype.trim.call(_0xd3__0x1d_pipeline_result)
                        let _0x21__0x20_pipeline_result = _0xd2_trim
                        const _0xd1_eq = await (_0x21__0x20_pipeline_result === "")
                        let _0x22__0x1f_pipeline_result = _0xd1_eq
                        if (_0x22__0x1f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xd5_module = await _0x9_module
                                const _0xd4__hash_ = await (_0xd5_module["deps"] = [])
                                let _0x24__0x23_pipeline_result = _0xd4__hash_
                                _0x24__0x23_pipeline_result
                            }
                        } 

                        const _0xd7_modules = await _0x6_modules
                        const _0xd9_module = await _0x9_module
                        const _0xd8__hash_ = await _0xd9_module["id"]
                        let _0x27__0x26_pipeline_result = _0xd8__hash_
                        const _0xda_module = await _0x9_module
                        let _0x29__0x28_pipeline_result = _0xda_module
                        const _0xd6__hash_ = await (_0xd7_modules[_0x27__0x26_pipeline_result] = _0x29__0x28_pipeline_result)
                        let _0x2a__0x25_pipeline_result = _0xd6__hash_
                        _0x2a__0x25_pipeline_result
                    }
                } }




            const _0xdc_modules = await _0x6_modules
            let _0x6c__0x6b_pipeline_result = _0xdc_modules
            const _0xdb_DAG_unroller = await (new DAG_unroller([], [], _0x6c__0x6b_pipeline_result))
            let _0x6d__0x6a_pipeline_result = _0xdb_DAG_unroller
            let _0x6e_unroller = _0x6d__0x6a_pipeline_result
            _0x6e_unroller
            const _0xde_modules = await _0x6_modules
            const _0xdd_values = await Object.values(_0xde_modules)
            let _0x70__0x6f_pipeline_result = _0xdd_values

            const _0xdf_iter = _0x70__0x6f_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xdf_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xe1_unroller = await _0x6e_unroller
                        let _0x73__0x72_pipeline_result = _0xe1_unroller
                        const _0xe2_module = await module
                        let _0x75__0x74_pipeline_result = _0xe2_module
                        const _0xe0_visit = await _0x2b_visit(_0x73__0x72_pipeline_result, _0x75__0x74_pipeline_result, [])
                        let _0x76__0x71_pipeline_result = _0xe0_visit
                        _0x76__0x71_pipeline_result
                    }
                } }
            const _0xe3_unroller = await _0x6e_unroller
            let _0x78__0x77_pipeline_result = _0xe3_unroller
            _0x78__0x77_pipeline_result
            const _0xe7__0x77_pipeline_result = await _0x78__0x77_pipeline_result
            const _0xe6_dep_loops = await (_0xe7__0x77_pipeline_result.dep_loops)
            const _0xe5_length = await (_0xe6_dep_loops.length)
            let _0x7b__0x7a_pipeline_result = _0xe5_length
            const _0xe4_nondesc = await (1 <= _0x7b__0x7a_pipeline_result)
            let _0x7c__0x79_pipeline_result = _0xe4_nondesc
            if (_0x7c__0x79_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xec__0x77_pipeline_result = await _0x78__0x77_pipeline_result
                    const _0xeb_dep_loops = await (_0xec__0x77_pipeline_result.dep_loops)
                    const _0xea_join = await Array.prototype.join.call(_0xeb_dep_loops, "\n")
                    let _0x80__0x7f_pipeline_result = _0xea_join
                    const _0xe9_concat = await String.prototype.concat.call("ERROR: there are dependency loops.\n", _0x80__0x7f_pipeline_result)
                    let _0x81__0x7e_pipeline_result = _0xe9_concat
                    const _0xe8_print = await console.log(_0x81__0x7e_pipeline_result)
                    let _0x82__0x7d_pipeline_result = _0xe8_print
                    _0x82__0x7d_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf0__0x77_pipeline_result = await _0x78__0x77_pipeline_result
                    const _0xef_build_order = await (_0xf0__0x77_pipeline_result.build_order)
                    const _0xee_join = await Array.prototype.join.call(_0xef_build_order, "\n")
                    let _0x85__0x84_pipeline_result = _0xee_join
                    const _0xed_print = await console.log(_0x85__0x84_pipeline_result)
                    let _0x86__0x83_pipeline_result = _0xed_print
                    _0x86__0x83_pipeline_result
                }
            } 
        }
    } 
})();
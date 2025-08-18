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
    const _0x2d_visit = async function (
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
                const _0x8a_module = await module
                const _0x89__hash_ = await _0x8a_module["visited"]
                let _0x2f__0x2e_pipeline_result = _0x89__hash_
                if (_0x2f__0x2e_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x8c_module = await module
                const _0x8b__hash_ = await (_0x8c_module["visited"] = true)
                let _0x31__0x30_pipeline_result = _0x8b__hash_
                _0x31__0x30_pipeline_result

                const _0x8e_chain = await chain
                const _0x8d_slice = await Array.prototype.slice.call(_0x8e_chain)
                let _0x33__0x32_pipeline_result = _0x8d_slice
                let _0x34_next_chain = _0x33__0x32_pipeline_result
                _0x34_next_chain
                const _0x90_next_chain = await _0x34_next_chain
                const _0x92_module = await module
                const _0x91__hash_ = await _0x92_module["id"]
                let _0x37__0x36_pipeline_result = _0x91__hash_
                const _0x8f_push = await Array.prototype.push.call(_0x90_next_chain, _0x37__0x36_pipeline_result)
                let _0x38__0x35_pipeline_result = _0x8f_push
                _0x38__0x35_pipeline_result
                const _0x94_module = await module
                const _0x93__hash_ = await _0x94_module["deps"]
                let _0x3a__0x39_pipeline_result = _0x93__hash_

                const _0x95_iter = _0x3a__0x39_pipeline_result[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x95_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x96_next_chain = await _0x34_next_chain
                            let _0x3e__0x3d_pipeline_result = _0x96_next_chain
                            const _0x97_dep_id = await dep_id
                            let _0x3c__0x3b_pipeline_result = _0x97_dep_id
                            const _0x98_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x3e__0x3d_pipeline_result, _0x3c__0x3b_pipeline_result)
                            if (_0x98_await__67lang_dot_exists_inside_lp_)
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x3f_dep_loop = []
                                    _0x3f_dep_loop
                                    const _0x9a_dep_loop = await _0x3f_dep_loop
                                    const _0x9b_dep_id = await dep_id
                                    let _0x42__0x41_pipeline_result = _0x9b_dep_id
                                    const _0x99_push = await Array.prototype.push.call(_0x9a_dep_loop, _0x42__0x41_pipeline_result)
                                    let _0x43__0x40_pipeline_result = _0x99_push
                                    _0x43__0x40_pipeline_result
                                    const _0x9d_next_chain = await _0x34_next_chain
                                    const _0x9c_slice = await Array.prototype.slice.call(_0x9d_next_chain)
                                    let _0x45__0x44_pipeline_result = _0x9c_slice
                                    _0x45__0x44_pipeline_result
                                    const _0x9f__0x44_pipeline_result = await _0x45__0x44_pipeline_result
                                    const _0x9e_reverse = await Array.prototype.reverse.call(_0x9f__0x44_pipeline_result)
                                    let _0x47__0x46_pipeline_result = _0x9e_reverse

                                    const _0xa0_iter = _0x47__0x46_pipeline_result[Symbol.iterator]();
                                    while (true) {
                                        const { value, done } = _0xa0_iter.next();
                                        if (done) { break; }
                                        let chain_dep_id = value;
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                const _0xa2_dep_loop = await _0x3f_dep_loop
                                                const _0xa3_chain_dep_id = await chain_dep_id
                                                let _0x4a__0x49_pipeline_result = _0xa3_chain_dep_id
                                                const _0xa1_push = await Array.prototype.push.call(_0xa2_dep_loop, _0x4a__0x49_pipeline_result)
                                                let _0x4b__0x48_pipeline_result = _0xa1_push
                                                _0x4b__0x48_pipeline_result
                                                const _0xa5_chain_dep_id = await chain_dep_id
                                                let _0x4e__0x4d_pipeline_result = _0xa5_chain_dep_id
                                                const _0xa6_dep_id = await dep_id
                                                let _0x50__0x4f_pipeline_result = _0xa6_dep_id
                                                const _0xa4_eq = await (_0x4e__0x4d_pipeline_result === _0x50__0x4f_pipeline_result)
                                                let _0x51__0x4c_pipeline_result = _0xa4_eq
                                                if (_0x51__0x4c_pipeline_result)
                                                {
                                                    const parent_scope = scope
                                                    {
                                                        const scope = _67lang.scope(parent_scope)
                                                        break
                                                    }
                                                } 
                                            }
                                        } }
                                    const _0xa8_dep_loop = await _0x3f_dep_loop
                                    const _0xa7_reverse = await Array.prototype.reverse.call(_0xa8_dep_loop)
                                    let _0x53__0x52_pipeline_result = _0xa7_reverse
                                    _0x53__0x52_pipeline_result
                                    const _0xab_unroller = await unroller
                                    const _0xaa_dep_loops = await (_0xab_unroller.dep_loops)
                                    let _0x56__0x55_pipeline_result = _0xaa_dep_loops
                                    const _0xad_dep_loop = await _0x3f_dep_loop
                                    const _0xac_join = await Array.prototype.join.call(_0xad_dep_loop, " → ")
                                    let _0x58__0x57_pipeline_result = _0xac_join
                                    const _0xa9_push = await Array.prototype.push.call(_0x56__0x55_pipeline_result, _0x58__0x57_pipeline_result)
                                    let _0x59__0x54_pipeline_result = _0xa9_push
                                    _0x59__0x54_pipeline_result
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xaf_unroller = await unroller
                                    let _0x5c__0x5b_pipeline_result = _0xaf_unroller
                                    const _0xb2_unroller = await unroller
                                    const _0xb1_modules = await (_0xb2_unroller.modules)
                                    let _0x5f__0x5e_pipeline_result = _0xb1_modules
                                    const _0xb3_dep_id = await dep_id
                                    let _0x61__0x60_pipeline_result = _0xb3_dep_id
                                    const _0xb0__hash_ = await _0x5f__0x5e_pipeline_result[_0x61__0x60_pipeline_result]
                                    let _0x62__0x5d_pipeline_result = _0xb0__hash_
                                    const _0xb4_next_chain = await _0x34_next_chain
                                    let _0x64__0x63_pipeline_result = _0xb4_next_chain
                                    const _0xae_visit = await _0x2d_visit(_0x5c__0x5b_pipeline_result, _0x62__0x5d_pipeline_result, _0x64__0x63_pipeline_result)
                                    let _0x65__0x5a_pipeline_result = _0xae_visit
                                    _0x65__0x5a_pipeline_result
                                }
                            } 
                        }
                    } }
                const _0xb7_unroller = await unroller
                const _0xb6_build_order = await (_0xb7_unroller.build_order)
                let _0x68__0x67_pipeline_result = _0xb6_build_order
                const _0xb9_module = await module
                const _0xb8__hash_ = await _0xb9_module["id"]
                let _0x6a__0x69_pipeline_result = _0xb8__hash_
                const _0xb5_push = await Array.prototype.push.call(_0x68__0x67_pipeline_result, _0x6a__0x69_pipeline_result)
                let _0x6b__0x66_pipeline_result = _0xb5_push
                _0x6b__0x66_pipeline_result
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
            const _0xba_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0xba_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0xbc_lines = await _0x2_lines
            const _0xbb_split = await String.prototype.split.call(_0xbc_lines, "\n")
            let _0x4__0x3_pipeline_result = _0xbb_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            const _0xbd_lines = await _0x5_lines
            let _0x8__0x7_pipeline_result = _0xbd_lines

            const _0xbe_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xbe_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_module = {}
                        _0x9_module
                        const _0xc0_line = await line
                        const _0xbf_split = await String.prototype.split.call(_0xc0_line, ":", 2)
                        let _0xb__0xa_pipeline_result = _0xbf_split
                        let _0xc_kv = _0xb__0xa_pipeline_result
                        _0xc_kv
                        const _0xc2_kv = await _0xc_kv
                        const _0xc1__hash_ = await _0xc2_kv[0]
                        let _0xe__0xd_pipeline_result = _0xc1__hash_
                        _0xe__0xd_pipeline_result
                        const _0xc4__0xd_pipeline_result = await _0xe__0xd_pipeline_result
                        const _0xc3_trim = await String.prototype.trim.call(_0xc4__0xd_pipeline_result)
                        let _0xf_id = _0xc3_trim
                        _0xf_id
                        const _0xc6_module = await _0x9_module
                        const _0xc7_id = await _0xf_id
                        let _0x12__0x11_pipeline_result = _0xc7_id
                        const _0xc5__hash_ = await (_0xc6_module["id"] = _0x12__0x11_pipeline_result)
                        let _0x13__0x10_pipeline_result = _0xc5__hash_
                        _0x13__0x10_pipeline_result
                        const _0xc9_kv = await _0xc_kv
                        const _0xc8__hash_ = await _0xc9_kv[1]
                        let _0x15__0x14_pipeline_result = _0xc8__hash_
                        _0x15__0x14_pipeline_result
                        const _0xcb__0x14_pipeline_result = await _0x15__0x14_pipeline_result
                        const _0xca_trim = await String.prototype.trim.call(_0xcb__0x14_pipeline_result)
                        let _0x17__0x16_pipeline_result = _0xca_trim
                        _0x17__0x16_pipeline_result
                        const _0xcd__0x16_pipeline_result = await _0x17__0x16_pipeline_result
                        const _0xcc_split = await String.prototype.split.call(_0xcd__0x16_pipeline_result, /\s+/)
                        let _0x18_deps = _0xcc_split
                        _0x18_deps
                        const _0xcf_module = await _0x9_module
                        const _0xd0_deps = await _0x18_deps
                        let _0x1b__0x1a_pipeline_result = _0xd0_deps
                        const _0xce__hash_ = await (_0xcf_module["deps"] = _0x1b__0x1a_pipeline_result)
                        let _0x1c__0x19_pipeline_result = _0xce__hash_
                        _0x1c__0x19_pipeline_result

                        const _0xd2_kv = await _0xc_kv
                        const _0xd1__hash_ = await _0xd2_kv[1]
                        let _0x1e__0x1d_pipeline_result = _0xd1__hash_
                        _0x1e__0x1d_pipeline_result
                        const _0xd5__0x1d_pipeline_result = await _0x1e__0x1d_pipeline_result
                        const _0xd4_trim = await String.prototype.trim.call(_0xd5__0x1d_pipeline_result)
                        let _0x21__0x20_pipeline_result = _0xd4_trim
                        const _0xd3_eq = await (_0x21__0x20_pipeline_result === "")
                        let _0x22__0x1f_pipeline_result = _0xd3_eq
                        if (_0x22__0x1f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xd7_module = await _0x9_module
                                const _0xd6__hash_ = await (_0xd7_module["deps"] = [])
                                let _0x24__0x23_pipeline_result = _0xd6__hash_
                                _0x24__0x23_pipeline_result
                            }
                        } 

                        const _0xd9_modules = await _0x6_modules
                        const _0xdb_module = await _0x9_module
                        const _0xda__hash_ = await _0xdb_module["id"]
                        let _0x27__0x26_pipeline_result = _0xda__hash_
                        const _0xdc_module = await _0x9_module
                        let _0x29__0x28_pipeline_result = _0xdc_module
                        const _0xd8__hash_ = await (_0xd9_modules[_0x27__0x26_pipeline_result] = _0x29__0x28_pipeline_result)
                        let _0x2a__0x25_pipeline_result = _0xd8__hash_
                        _0x2a__0x25_pipeline_result
                    }
                } }




            const _0xde_modules = await _0x6_modules
            let _0x6e__0x6d_pipeline_result = _0xde_modules
            const _0xdd_DAG_unroller = await (new DAG_unroller([], [], _0x6e__0x6d_pipeline_result))
            let _0x6f__0x6c_pipeline_result = _0xdd_DAG_unroller
            let _0x70_unroller = _0x6f__0x6c_pipeline_result
            _0x70_unroller
            const _0xe0_modules = await _0x6_modules
            const _0xdf_values = await Object.values(_0xe0_modules)
            let _0x72__0x71_pipeline_result = _0xdf_values

            const _0xe1_iter = _0x72__0x71_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xe1_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xe3_unroller = await _0x70_unroller
                        let _0x75__0x74_pipeline_result = _0xe3_unroller
                        const _0xe4_module = await module
                        let _0x77__0x76_pipeline_result = _0xe4_module
                        const _0xe2_visit = await _0x2d_visit(_0x75__0x74_pipeline_result, _0x77__0x76_pipeline_result, [])
                        let _0x78__0x73_pipeline_result = _0xe2_visit
                        _0x78__0x73_pipeline_result
                    }
                } }
            const _0xe5_unroller = await _0x70_unroller
            let _0x7a__0x79_pipeline_result = _0xe5_unroller
            _0x7a__0x79_pipeline_result
            const _0xe9__0x79_pipeline_result = await _0x7a__0x79_pipeline_result
            const _0xe8_dep_loops = await (_0xe9__0x79_pipeline_result.dep_loops)
            const _0xe7_length = await (_0xe8_dep_loops.length)
            let _0x7d__0x7c_pipeline_result = _0xe7_length
            const _0xe6_nondesc = await (1 <= _0x7d__0x7c_pipeline_result)
            let _0x7e__0x7b_pipeline_result = _0xe6_nondesc
            if (_0x7e__0x7b_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xee__0x79_pipeline_result = await _0x7a__0x79_pipeline_result
                    const _0xed_dep_loops = await (_0xee__0x79_pipeline_result.dep_loops)
                    const _0xec_join = await Array.prototype.join.call(_0xed_dep_loops, "\n")
                    let _0x82__0x81_pipeline_result = _0xec_join
                    const _0xeb_concat = await ("ERROR: there are dependency loops.\n" + _0x82__0x81_pipeline_result)
                    let _0x83__0x80_pipeline_result = _0xeb_concat
                    const _0xea_print = await console.log(_0x83__0x80_pipeline_result)
                    let _0x84__0x7f_pipeline_result = _0xea_print
                    _0x84__0x7f_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf2__0x79_pipeline_result = await _0x7a__0x79_pipeline_result
                    const _0xf1_build_order = await (_0xf2__0x79_pipeline_result.build_order)
                    const _0xf0_join = await Array.prototype.join.call(_0xf1_build_order, "\n")
                    let _0x87__0x86_pipeline_result = _0xf0_join
                    const _0xef_print = await console.log(_0x87__0x86_pipeline_result)
                    let _0x88__0x85_pipeline_result = _0xef_print
                    _0x88__0x85_pipeline_result
                }
            } 
        }
    } 
})();
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
    const _0x2d_visit = async function (
        unroller_in, 
        module, 
        chain
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                unroller_in = unroller_in
                module = module
                chain = chain
                const _0x8c_unroller_in = await unroller_in
                let _0x2f__0x2e_pipeline_result = _0x8c_unroller_in
                let _0x30_unroller = _0x2f__0x2e_pipeline_result
                _0x30_unroller
                const _0x8e_module = await module
                const _0x8d__hash_ = await _0x8e_module["visited"]
                let _0x32__0x31_pipeline_result = _0x8d__hash_
                if (_0x32__0x31_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x90_module = await module
                const _0x8f__hash_ = await (_0x90_module["visited"] = true)
                let _0x34__0x33_pipeline_result = _0x8f__hash_
                _0x34__0x33_pipeline_result

                const _0x92_chain = await chain
                const _0x91_slice = await Array.prototype.slice.call(_0x92_chain)
                let _0x36__0x35_pipeline_result = _0x91_slice
                let _0x37_next_chain = _0x36__0x35_pipeline_result
                _0x37_next_chain
                const _0x94_next_chain = await _0x37_next_chain
                const _0x96_module = await module
                const _0x95__hash_ = await _0x96_module["id"]
                let _0x3a__0x39_pipeline_result = _0x95__hash_
                const _0x93_push = await Array.prototype.push.call(_0x94_next_chain, _0x3a__0x39_pipeline_result)
                let _0x3b__0x38_pipeline_result = _0x93_push
                _0x3b__0x38_pipeline_result
                const _0x98_module = await module
                const _0x97__hash_ = await _0x98_module["deps"]
                let _0x3d__0x3c_pipeline_result = _0x97__hash_

                const _0x99_iter = _0x3d__0x3c_pipeline_result[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x99_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x9a_next_chain = await _0x37_next_chain
                            let _0x41__0x40_pipeline_result = _0x9a_next_chain
                            const _0x9b_dep_id = await dep_id
                            let _0x3f__0x3e_pipeline_result = _0x9b_dep_id
                            const _0x9c_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x41__0x40_pipeline_result, _0x3f__0x3e_pipeline_result)
                            if (_0x9c_await__67lang_dot_exists_inside_lp_)
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x42_dep_loop = []
                                    _0x42_dep_loop
                                    const _0x9e_dep_loop = await _0x42_dep_loop
                                    const _0x9f_dep_id = await dep_id
                                    let _0x45__0x44_pipeline_result = _0x9f_dep_id
                                    const _0x9d_push = await Array.prototype.push.call(_0x9e_dep_loop, _0x45__0x44_pipeline_result)
                                    let _0x46__0x43_pipeline_result = _0x9d_push
                                    _0x46__0x43_pipeline_result
                                    const _0xa1_next_chain = await _0x37_next_chain
                                    const _0xa0_slice = await Array.prototype.slice.call(_0xa1_next_chain)
                                    let _0x48__0x47_pipeline_result = _0xa0_slice
                                    _0x48__0x47_pipeline_result
                                    const _0xa3__0x47_pipeline_result = await _0x48__0x47_pipeline_result
                                    const _0xa2_reverse = await Array.prototype.reverse.call(_0xa3__0x47_pipeline_result)
                                    let _0x4a__0x49_pipeline_result = _0xa2_reverse

                                    const _0xa4_iter = _0x4a__0x49_pipeline_result[Symbol.iterator]();
                                    while (true) {
                                        const { value, done } = _0xa4_iter.next();
                                        if (done) { break; }
                                        let chain_dep_id = value;
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                const _0xa6_dep_loop = await _0x42_dep_loop
                                                const _0xa7_chain_dep_id = await chain_dep_id
                                                let _0x4d__0x4c_pipeline_result = _0xa7_chain_dep_id
                                                const _0xa5_push = await Array.prototype.push.call(_0xa6_dep_loop, _0x4d__0x4c_pipeline_result)
                                                let _0x4e__0x4b_pipeline_result = _0xa5_push
                                                _0x4e__0x4b_pipeline_result
                                                const _0xa9_chain_dep_id = await chain_dep_id
                                                let _0x51__0x50_pipeline_result = _0xa9_chain_dep_id
                                                const _0xaa_dep_id = await dep_id
                                                let _0x53__0x52_pipeline_result = _0xaa_dep_id
                                                const _0xa8_eq = await (_0x51__0x50_pipeline_result === _0x53__0x52_pipeline_result)
                                                let _0x54__0x4f_pipeline_result = _0xa8_eq
                                                if (_0x54__0x4f_pipeline_result)
                                                {
                                                    const parent_scope = scope
                                                    {
                                                        const scope = _67lang.scope(parent_scope)
                                                        break
                                                    }
                                                } 
                                            }
                                        } }
                                    const _0xac_dep_loop = await _0x42_dep_loop
                                    const _0xab_reverse = await Array.prototype.reverse.call(_0xac_dep_loop)
                                    let _0x56__0x55_pipeline_result = _0xab_reverse
                                    _0x56__0x55_pipeline_result
                                    const _0xaf_unroller = await _0x30_unroller
                                    const _0xae_dep_loops = await (_0xaf_unroller.dep_loops)
                                    let _0x59__0x58_pipeline_result = _0xae_dep_loops
                                    const _0xb1_dep_loop = await _0x42_dep_loop
                                    const _0xb0_join = await Array.prototype.join.call(_0xb1_dep_loop, " → ")
                                    let _0x5b__0x5a_pipeline_result = _0xb0_join
                                    const _0xad_push = await Array.prototype.push.call(_0x59__0x58_pipeline_result, _0x5b__0x5a_pipeline_result)
                                    let _0x5c__0x57_pipeline_result = _0xad_push
                                    _0x5c__0x57_pipeline_result
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xb3_unroller = await _0x30_unroller
                                    let _0x5f__0x5e_pipeline_result = _0xb3_unroller
                                    const _0xb6_unroller = await _0x30_unroller
                                    const _0xb5_modules = await (_0xb6_unroller.modules)
                                    let _0x62__0x61_pipeline_result = _0xb5_modules
                                    const _0xb7_dep_id = await dep_id
                                    let _0x64__0x63_pipeline_result = _0xb7_dep_id
                                    const _0xb4__hash_ = await _0x62__0x61_pipeline_result[_0x64__0x63_pipeline_result]
                                    let _0x65__0x60_pipeline_result = _0xb4__hash_
                                    const _0xb8_next_chain = await _0x37_next_chain
                                    let _0x67__0x66_pipeline_result = _0xb8_next_chain
                                    const _0xb2_visit = await _0x2d_visit(_0x5f__0x5e_pipeline_result, _0x65__0x60_pipeline_result, _0x67__0x66_pipeline_result)
                                    let _0x68__0x5d_pipeline_result = _0xb2_visit
                                    _0x68__0x5d_pipeline_result
                                }
                            } 
                        }
                    } }
                const _0xbb_unroller = await _0x30_unroller
                const _0xba_build_order = await (_0xbb_unroller.build_order)
                let _0x6b__0x6a_pipeline_result = _0xba_build_order
                const _0xbd_module = await module
                const _0xbc__hash_ = await _0xbd_module["id"]
                let _0x6d__0x6c_pipeline_result = _0xbc__hash_
                const _0xb9_push = await Array.prototype.push.call(_0x6b__0x6a_pipeline_result, _0x6d__0x6c_pipeline_result)
                let _0x6e__0x69_pipeline_result = _0xb9_push
                _0x6e__0x69_pipeline_result
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
            const _0xbe_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0xbe_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0xc0_lines = await _0x2_lines
            const _0xbf_split = await String.prototype.split.call(_0xc0_lines, "\n")
            let _0x4__0x3_pipeline_result = _0xbf_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            const _0xc1_lines = await _0x5_lines
            let _0x8__0x7_pipeline_result = _0xc1_lines

            const _0xc2_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xc2_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_module = {}
                        _0x9_module
                        const _0xc4_line = await line
                        const _0xc3_split = await String.prototype.split.call(_0xc4_line, ":", 2)
                        let _0xb__0xa_pipeline_result = _0xc3_split
                        let _0xc_kv = _0xb__0xa_pipeline_result
                        _0xc_kv
                        const _0xc6_kv = await _0xc_kv
                        const _0xc5__hash_ = await _0xc6_kv[0]
                        let _0xe__0xd_pipeline_result = _0xc5__hash_
                        _0xe__0xd_pipeline_result
                        const _0xc8__0xd_pipeline_result = await _0xe__0xd_pipeline_result
                        const _0xc7_trim = await String.prototype.trim.call(_0xc8__0xd_pipeline_result)
                        let _0xf_id = _0xc7_trim
                        _0xf_id
                        const _0xca_module = await _0x9_module
                        const _0xcb_id = await _0xf_id
                        let _0x12__0x11_pipeline_result = _0xcb_id
                        const _0xc9__hash_ = await (_0xca_module["id"] = _0x12__0x11_pipeline_result)
                        let _0x13__0x10_pipeline_result = _0xc9__hash_
                        _0x13__0x10_pipeline_result
                        const _0xcd_kv = await _0xc_kv
                        const _0xcc__hash_ = await _0xcd_kv[1]
                        let _0x15__0x14_pipeline_result = _0xcc__hash_
                        _0x15__0x14_pipeline_result
                        const _0xcf__0x14_pipeline_result = await _0x15__0x14_pipeline_result
                        const _0xce_trim = await String.prototype.trim.call(_0xcf__0x14_pipeline_result)
                        let _0x17__0x16_pipeline_result = _0xce_trim
                        _0x17__0x16_pipeline_result
                        const _0xd1__0x16_pipeline_result = await _0x17__0x16_pipeline_result
                        const _0xd0_split = await String.prototype.split.call(_0xd1__0x16_pipeline_result, /\s+/)
                        let _0x18_deps = _0xd0_split
                        _0x18_deps
                        const _0xd3_module = await _0x9_module
                        const _0xd4_deps = await _0x18_deps
                        let _0x1b__0x1a_pipeline_result = _0xd4_deps
                        const _0xd2__hash_ = await (_0xd3_module["deps"] = _0x1b__0x1a_pipeline_result)
                        let _0x1c__0x19_pipeline_result = _0xd2__hash_
                        _0x1c__0x19_pipeline_result

                        const _0xd6_kv = await _0xc_kv
                        const _0xd5__hash_ = await _0xd6_kv[1]
                        let _0x1e__0x1d_pipeline_result = _0xd5__hash_
                        _0x1e__0x1d_pipeline_result
                        const _0xd9__0x1d_pipeline_result = await _0x1e__0x1d_pipeline_result
                        const _0xd8_trim = await String.prototype.trim.call(_0xd9__0x1d_pipeline_result)
                        let _0x21__0x20_pipeline_result = _0xd8_trim
                        const _0xd7_eq = await (_0x21__0x20_pipeline_result === "")
                        let _0x22__0x1f_pipeline_result = _0xd7_eq
                        if (_0x22__0x1f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xdb_module = await _0x9_module
                                const _0xda__hash_ = await (_0xdb_module["deps"] = [])
                                let _0x24__0x23_pipeline_result = _0xda__hash_
                                _0x24__0x23_pipeline_result
                            }
                        } 

                        const _0xdd_modules = await _0x6_modules
                        const _0xdf_module = await _0x9_module
                        const _0xde__hash_ = await _0xdf_module["id"]
                        let _0x27__0x26_pipeline_result = _0xde__hash_
                        const _0xe0_module = await _0x9_module
                        let _0x29__0x28_pipeline_result = _0xe0_module
                        const _0xdc__hash_ = await (_0xdd_modules[_0x27__0x26_pipeline_result] = _0x29__0x28_pipeline_result)
                        let _0x2a__0x25_pipeline_result = _0xdc__hash_
                        _0x2a__0x25_pipeline_result
                    }
                } }




            const _0xe2_modules = await _0x6_modules
            let _0x71__0x70_pipeline_result = _0xe2_modules
            const _0xe1_DAG_unroller = await (new DAG_unroller([], [], _0x71__0x70_pipeline_result))
            let _0x72__0x6f_pipeline_result = _0xe1_DAG_unroller
            let _0x73_unroller = _0x72__0x6f_pipeline_result
            _0x73_unroller
            const _0xe4_modules = await _0x6_modules
            const _0xe3_values = await Object.values(_0xe4_modules)
            let _0x75__0x74_pipeline_result = _0xe3_values

            const _0xe5_iter = _0x75__0x74_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xe5_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xe7_unroller = await _0x73_unroller
                        let _0x78__0x77_pipeline_result = _0xe7_unroller
                        const _0xe8_module = await module
                        let _0x7a__0x79_pipeline_result = _0xe8_module
                        const _0xe6_visit = await _0x2d_visit(_0x78__0x77_pipeline_result, _0x7a__0x79_pipeline_result, [])
                        let _0x7b__0x76_pipeline_result = _0xe6_visit
                        _0x7b__0x76_pipeline_result
                    }
                } }
            const _0xe9_unroller = await _0x73_unroller
            let _0x7d__0x7c_pipeline_result = _0xe9_unroller
            _0x7d__0x7c_pipeline_result
            const _0xed__0x7c_pipeline_result = await _0x7d__0x7c_pipeline_result
            const _0xec_dep_loops = await (_0xed__0x7c_pipeline_result.dep_loops)
            const _0xeb_length = await (_0xec_dep_loops.length)
            let _0x80__0x7f_pipeline_result = _0xeb_length
            const _0xea_nondesc = await (1 <= _0x80__0x7f_pipeline_result)
            let _0x81__0x7e_pipeline_result = _0xea_nondesc
            if (_0x81__0x7e_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf2__0x7c_pipeline_result = await _0x7d__0x7c_pipeline_result
                    const _0xf1_dep_loops = await (_0xf2__0x7c_pipeline_result.dep_loops)
                    const _0xf0_join = await Array.prototype.join.call(_0xf1_dep_loops, "\n")
                    let _0x85__0x84_pipeline_result = _0xf0_join
                    const _0xef_concat = await ("ERROR: there are dependency loops.\n" + _0x85__0x84_pipeline_result)
                    let _0x86__0x83_pipeline_result = _0xef_concat
                    const _0xee_print = await console.log(_0x86__0x83_pipeline_result)
                    let _0x87__0x82_pipeline_result = _0xee_print
                    _0x87__0x82_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf6__0x7c_pipeline_result = await _0x7d__0x7c_pipeline_result
                    const _0xf5_build_order = await (_0xf6__0x7c_pipeline_result.build_order)
                    const _0xf4_join = await Array.prototype.join.call(_0xf5_build_order, "\n")
                    let _0x8a__0x89_pipeline_result = _0xf4_join
                    const _0xf3_print = await console.log(_0x8a__0x89_pipeline_result)
                    let _0x8b__0x88_pipeline_result = _0xf3_print
                    _0x8b__0x88_pipeline_result
                }
            } 
        }
    } 
})();
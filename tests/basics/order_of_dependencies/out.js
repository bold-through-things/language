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
                const _0x8f_unroller_in = await unroller_in
                let _0x2f__0x2e_pipeline_result = _0x8f_unroller_in
                let _0x30_unroller = _0x2f__0x2e_pipeline_result
                _0x30_unroller
                const _0x90_chain = await chain
                let _0x32__0x31_pipeline_result = _0x90_chain
                let _0x33_chain = _0x32__0x31_pipeline_result
                _0x33_chain
                const _0x92_module = await module
                const _0x91__hash_ = await _0x92_module["visited"]
                let _0x35__0x34_pipeline_result = _0x91__hash_
                if (_0x35__0x34_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x94_module = await module
                const _0x93__hash_ = await (_0x94_module["visited"] = true)
                let _0x37__0x36_pipeline_result = _0x93__hash_
                _0x37__0x36_pipeline_result

                const _0x96_chain = await _0x33_chain
                const _0x95_slice = await Array.prototype.slice.call(_0x96_chain)
                let _0x39__0x38_pipeline_result = _0x95_slice
                let _0x3a_next_chain = _0x39__0x38_pipeline_result
                _0x3a_next_chain
                const _0x98_next_chain = await _0x3a_next_chain
                const _0x9a_module = await module
                const _0x99__hash_ = await _0x9a_module["id"]
                let _0x3d__0x3c_pipeline_result = _0x99__hash_
                const _0x97_push = await Array.prototype.push.call(_0x98_next_chain, _0x3d__0x3c_pipeline_result)
                let _0x3e__0x3b_pipeline_result = _0x97_push
                _0x3e__0x3b_pipeline_result
                const _0x9c_module = await module
                const _0x9b__hash_ = await _0x9c_module["deps"]
                let _0x40__0x3f_pipeline_result = _0x9b__hash_

                const _0x9d_iter = _0x40__0x3f_pipeline_result[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x9d_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x9e_next_chain = await _0x3a_next_chain
                            let _0x44__0x43_pipeline_result = _0x9e_next_chain
                            const _0x9f_dep_id = await dep_id
                            let _0x42__0x41_pipeline_result = _0x9f_dep_id
                            const _0xa0_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x44__0x43_pipeline_result, _0x42__0x41_pipeline_result)
                            if (_0xa0_await__67lang_dot_exists_inside_lp_)
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x45_dep_loop = []
                                    _0x45_dep_loop
                                    const _0xa2_dep_loop = await _0x45_dep_loop
                                    const _0xa3_dep_id = await dep_id
                                    let _0x48__0x47_pipeline_result = _0xa3_dep_id
                                    const _0xa1_push = await Array.prototype.push.call(_0xa2_dep_loop, _0x48__0x47_pipeline_result)
                                    let _0x49__0x46_pipeline_result = _0xa1_push
                                    _0x49__0x46_pipeline_result
                                    const _0xa5_next_chain = await _0x3a_next_chain
                                    const _0xa4_slice = await Array.prototype.slice.call(_0xa5_next_chain)
                                    let _0x4b__0x4a_pipeline_result = _0xa4_slice
                                    _0x4b__0x4a_pipeline_result
                                    const _0xa7__0x4a_pipeline_result = await _0x4b__0x4a_pipeline_result
                                    const _0xa6_reverse = await Array.prototype.reverse.call(_0xa7__0x4a_pipeline_result)
                                    let _0x4d__0x4c_pipeline_result = _0xa6_reverse

                                    const _0xa8_iter = _0x4d__0x4c_pipeline_result[Symbol.iterator]();
                                    while (true) {
                                        const { value, done } = _0xa8_iter.next();
                                        if (done) { break; }
                                        let chain_dep_id = value;
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                const _0xaa_dep_loop = await _0x45_dep_loop
                                                const _0xab_chain_dep_id = await chain_dep_id
                                                let _0x50__0x4f_pipeline_result = _0xab_chain_dep_id
                                                const _0xa9_push = await Array.prototype.push.call(_0xaa_dep_loop, _0x50__0x4f_pipeline_result)
                                                let _0x51__0x4e_pipeline_result = _0xa9_push
                                                _0x51__0x4e_pipeline_result
                                                const _0xad_chain_dep_id = await chain_dep_id
                                                let _0x54__0x53_pipeline_result = _0xad_chain_dep_id
                                                const _0xae_dep_id = await dep_id
                                                let _0x56__0x55_pipeline_result = _0xae_dep_id
                                                const _0xac_eq = await (_0x54__0x53_pipeline_result === _0x56__0x55_pipeline_result)
                                                let _0x57__0x52_pipeline_result = _0xac_eq
                                                if (_0x57__0x52_pipeline_result)
                                                {
                                                    const parent_scope = scope
                                                    {
                                                        const scope = _67lang.scope(parent_scope)
                                                        break
                                                    }
                                                } 
                                            }
                                        } }
                                    const _0xb0_dep_loop = await _0x45_dep_loop
                                    const _0xaf_reverse = await Array.prototype.reverse.call(_0xb0_dep_loop)
                                    let _0x59__0x58_pipeline_result = _0xaf_reverse
                                    _0x59__0x58_pipeline_result
                                    const _0xb3_unroller = await _0x30_unroller
                                    const _0xb2_dep_loops = await (_0xb3_unroller.dep_loops)
                                    let _0x5c__0x5b_pipeline_result = _0xb2_dep_loops
                                    const _0xb5_dep_loop = await _0x45_dep_loop
                                    const _0xb4_join = await Array.prototype.join.call(_0xb5_dep_loop, " → ")
                                    let _0x5e__0x5d_pipeline_result = _0xb4_join
                                    const _0xb1_push = await Array.prototype.push.call(_0x5c__0x5b_pipeline_result, _0x5e__0x5d_pipeline_result)
                                    let _0x5f__0x5a_pipeline_result = _0xb1_push
                                    _0x5f__0x5a_pipeline_result
                                }
                            } 
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xb7_unroller = await _0x30_unroller
                                    let _0x62__0x61_pipeline_result = _0xb7_unroller
                                    const _0xba_unroller = await _0x30_unroller
                                    const _0xb9_modules = await (_0xba_unroller.modules)
                                    let _0x65__0x64_pipeline_result = _0xb9_modules
                                    const _0xbb_dep_id = await dep_id
                                    let _0x67__0x66_pipeline_result = _0xbb_dep_id
                                    const _0xb8__hash_ = await _0x65__0x64_pipeline_result[_0x67__0x66_pipeline_result]
                                    let _0x68__0x63_pipeline_result = _0xb8__hash_
                                    const _0xbc_next_chain = await _0x3a_next_chain
                                    let _0x6a__0x69_pipeline_result = _0xbc_next_chain
                                    const _0xb6_visit = await _0x2d_visit(_0x62__0x61_pipeline_result, _0x68__0x63_pipeline_result, _0x6a__0x69_pipeline_result)
                                    let _0x6b__0x60_pipeline_result = _0xb6_visit
                                    _0x6b__0x60_pipeline_result
                                }
                            } 
                        }
                    } }
                const _0xbf_unroller = await _0x30_unroller
                const _0xbe_build_order = await (_0xbf_unroller.build_order)
                let _0x6e__0x6d_pipeline_result = _0xbe_build_order
                const _0xc1_module = await module
                const _0xc0__hash_ = await _0xc1_module["id"]
                let _0x70__0x6f_pipeline_result = _0xc0__hash_
                const _0xbd_push = await Array.prototype.push.call(_0x6e__0x6d_pipeline_result, _0x70__0x6f_pipeline_result)
                let _0x71__0x6c_pipeline_result = _0xbd_push
                _0x71__0x6c_pipeline_result
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
            const _0xc2_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0xc2_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0xc4_lines = await _0x2_lines
            const _0xc3_split = await String.prototype.split.call(_0xc4_lines, "\n")
            let _0x4__0x3_pipeline_result = _0xc3_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_modules = {}
            _0x6_modules
            const _0xc5_lines = await _0x5_lines
            let _0x8__0x7_pipeline_result = _0xc5_lines

            const _0xc6_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xc6_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x9_module = {}
                        _0x9_module
                        const _0xc8_line = await line
                        const _0xc7_split = await String.prototype.split.call(_0xc8_line, ":", 2)
                        let _0xb__0xa_pipeline_result = _0xc7_split
                        let _0xc_kv = _0xb__0xa_pipeline_result
                        _0xc_kv
                        const _0xca_kv = await _0xc_kv
                        const _0xc9__hash_ = await _0xca_kv[0]
                        let _0xe__0xd_pipeline_result = _0xc9__hash_
                        _0xe__0xd_pipeline_result
                        const _0xcc__0xd_pipeline_result = await _0xe__0xd_pipeline_result
                        const _0xcb_trim = await String.prototype.trim.call(_0xcc__0xd_pipeline_result)
                        let _0xf_id = _0xcb_trim
                        _0xf_id
                        const _0xce_module = await _0x9_module
                        const _0xcf_id = await _0xf_id
                        let _0x12__0x11_pipeline_result = _0xcf_id
                        const _0xcd__hash_ = await (_0xce_module["id"] = _0x12__0x11_pipeline_result)
                        let _0x13__0x10_pipeline_result = _0xcd__hash_
                        _0x13__0x10_pipeline_result
                        const _0xd1_kv = await _0xc_kv
                        const _0xd0__hash_ = await _0xd1_kv[1]
                        let _0x15__0x14_pipeline_result = _0xd0__hash_
                        _0x15__0x14_pipeline_result
                        const _0xd3__0x14_pipeline_result = await _0x15__0x14_pipeline_result
                        const _0xd2_trim = await String.prototype.trim.call(_0xd3__0x14_pipeline_result)
                        let _0x17__0x16_pipeline_result = _0xd2_trim
                        _0x17__0x16_pipeline_result
                        const _0xd5__0x16_pipeline_result = await _0x17__0x16_pipeline_result
                        const _0xd4_split = await String.prototype.split.call(_0xd5__0x16_pipeline_result, /\s+/)
                        let _0x18_deps = _0xd4_split
                        _0x18_deps
                        const _0xd7_module = await _0x9_module
                        const _0xd8_deps = await _0x18_deps
                        let _0x1b__0x1a_pipeline_result = _0xd8_deps
                        const _0xd6__hash_ = await (_0xd7_module["deps"] = _0x1b__0x1a_pipeline_result)
                        let _0x1c__0x19_pipeline_result = _0xd6__hash_
                        _0x1c__0x19_pipeline_result

                        const _0xda_kv = await _0xc_kv
                        const _0xd9__hash_ = await _0xda_kv[1]
                        let _0x1e__0x1d_pipeline_result = _0xd9__hash_
                        _0x1e__0x1d_pipeline_result
                        const _0xdd__0x1d_pipeline_result = await _0x1e__0x1d_pipeline_result
                        const _0xdc_trim = await String.prototype.trim.call(_0xdd__0x1d_pipeline_result)
                        let _0x21__0x20_pipeline_result = _0xdc_trim
                        const _0xdb_eq = await (_0x21__0x20_pipeline_result === "")
                        let _0x22__0x1f_pipeline_result = _0xdb_eq
                        if (_0x22__0x1f_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xdf_module = await _0x9_module
                                const _0xde__hash_ = await (_0xdf_module["deps"] = [])
                                let _0x24__0x23_pipeline_result = _0xde__hash_
                                _0x24__0x23_pipeline_result
                            }
                        } 

                        const _0xe1_modules = await _0x6_modules
                        const _0xe3_module = await _0x9_module
                        const _0xe2__hash_ = await _0xe3_module["id"]
                        let _0x27__0x26_pipeline_result = _0xe2__hash_
                        const _0xe4_module = await _0x9_module
                        let _0x29__0x28_pipeline_result = _0xe4_module
                        const _0xe0__hash_ = await (_0xe1_modules[_0x27__0x26_pipeline_result] = _0x29__0x28_pipeline_result)
                        let _0x2a__0x25_pipeline_result = _0xe0__hash_
                        _0x2a__0x25_pipeline_result
                    }
                } }




            const _0xe6_modules = await _0x6_modules
            let _0x74__0x73_pipeline_result = _0xe6_modules
            const _0xe5_DAG_unroller = await (new DAG_unroller([], [], _0x74__0x73_pipeline_result))
            let _0x75__0x72_pipeline_result = _0xe5_DAG_unroller
            let _0x76_unroller = _0x75__0x72_pipeline_result
            _0x76_unroller
            const _0xe8_modules = await _0x6_modules
            const _0xe7_values = await Object.values(_0xe8_modules)
            let _0x78__0x77_pipeline_result = _0xe7_values

            const _0xe9_iter = _0x78__0x77_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xe9_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xeb_unroller = await _0x76_unroller
                        let _0x7b__0x7a_pipeline_result = _0xeb_unroller
                        const _0xec_module = await module
                        let _0x7d__0x7c_pipeline_result = _0xec_module
                        const _0xea_visit = await _0x2d_visit(_0x7b__0x7a_pipeline_result, _0x7d__0x7c_pipeline_result, [])
                        let _0x7e__0x79_pipeline_result = _0xea_visit
                        _0x7e__0x79_pipeline_result
                    }
                } }
            const _0xed_unroller = await _0x76_unroller
            let _0x80__0x7f_pipeline_result = _0xed_unroller
            _0x80__0x7f_pipeline_result
            const _0xf1__0x7f_pipeline_result = await _0x80__0x7f_pipeline_result
            const _0xf0_dep_loops = await (_0xf1__0x7f_pipeline_result.dep_loops)
            const _0xef_length = await (_0xf0_dep_loops.length)
            let _0x83__0x82_pipeline_result = _0xef_length
            const _0xee_nondesc = await (1 <= _0x83__0x82_pipeline_result)
            let _0x84__0x81_pipeline_result = _0xee_nondesc
            if (_0x84__0x81_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf6__0x7f_pipeline_result = await _0x80__0x7f_pipeline_result
                    const _0xf5_dep_loops = await (_0xf6__0x7f_pipeline_result.dep_loops)
                    const _0xf4_join = await Array.prototype.join.call(_0xf5_dep_loops, "\n")
                    let _0x88__0x87_pipeline_result = _0xf4_join
                    const _0xf3_concat = await ("ERROR: there are dependency loops.\n" + _0x88__0x87_pipeline_result)
                    let _0x89__0x86_pipeline_result = _0xf3_concat
                    const _0xf2_print = await console.log(_0x89__0x86_pipeline_result)
                    let _0x8a__0x85_pipeline_result = _0xf2_print
                    _0x8a__0x85_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xfa__0x7f_pipeline_result = await _0x80__0x7f_pipeline_result
                    const _0xf9_build_order = await (_0xfa__0x7f_pipeline_result.build_order)
                    const _0xf8_join = await Array.prototype.join.call(_0xf9_build_order, "\n")
                    let _0x8d__0x8c_pipeline_result = _0xf8_join
                    const _0xf7_print = await console.log(_0x8d__0x8c_pipeline_result)
                    let _0x8e__0x8b_pipeline_result = _0xf7_print
                    _0x8e__0x8b_pipeline_result
                }
            } 
        }
    } 
})();
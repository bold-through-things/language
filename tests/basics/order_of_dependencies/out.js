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
            const _0xdc_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0xdc_stdin
            let _0x2_lines = _0x1__0x0_stdin
            _0x2_lines
            const _0xde_lines = await _0x2_lines
            let _0x8__0x4_lines = _0xde_lines
            const _0xe0__0x4_lines = await _0x8__0x4_lines
            const _0xdf_split = await String.prototype.split.call(_0xe0__0x4_lines, "\n")
            let _0x9__0x5_split = _0xdf_split
            const _0xdd_lines = await (_0x2_lines = _0x9__0x5_split)
            let _0xa__0x3_lines = _0xdd_lines
            _0xa__0x3_lines
            let _0xb_modules = {}
            _0xb_modules
            const _0xe1_lines = await _0x2_lines
            let _0xd__0xc_lines = _0xe1_lines

            const _0xe2_iter = _0xd__0xc_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xe2_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xe_module = {}
                        _0xe_module
                        const _0xe3_line = await line
                        let _0x11__0xf_line = _0xe3_line
                        const _0xe5__0xf_line = await _0x11__0xf_line
                        const _0xe4_split = await String.prototype.split.call(_0xe5__0xf_line, ":", 2)
                        let _0x12__0x10_split = _0xe4_split
                        let _0x13_kv = _0x12__0x10_split
                        _0x13_kv
                        const _0xe6_module = await _0xe_module
                        let _0x16__0x14_module = _0xe6_module

                        const _0xe8__0x14_module = await _0x16__0x14_module
                        const _0xe9_kv = await _0x13_kv
                        let _0x1d__0x17_kv = _0xe9_kv
                        const _0xeb__0x17_kv = await _0x1d__0x17_kv
                        const _0xea__hash_ = await _0xeb__0x17_kv[0]
                        let _0x1e__0x18__hash_ = _0xea__hash_
                        const _0xed__0x18__hash_ = await _0x1e__0x18__hash_
                        const _0xec_trim = await String.prototype.trim.call(_0xed__0x18__hash_)
                        let _0x1f__0x19_trim = _0xec_trim
                        const _0xe7__hash_ = await (_0xe8__0x14_module["id"] = _0x1f__0x19_trim)
                        let _0x20__0x15__hash_ = _0xe7__hash_
                        _0x20__0x15__hash_
                        const _0xee_module = await _0xe_module
                        let _0x23__0x21_module = _0xee_module

                        const _0xf0__0x21_module = await _0x23__0x21_module
                        const _0xf1_kv = await _0x13_kv
                        let _0x2c__0x24_kv = _0xf1_kv
                        const _0xf3__0x24_kv = await _0x2c__0x24_kv
                        const _0xf2__hash_ = await _0xf3__0x24_kv[1]
                        let _0x2d__0x25__hash_ = _0xf2__hash_
                        const _0xf5__0x25__hash_ = await _0x2d__0x25__hash_
                        const _0xf4_trim = await String.prototype.trim.call(_0xf5__0x25__hash_)
                        let _0x2e__0x26_trim = _0xf4_trim
                        const _0xf7__0x26_trim = await _0x2e__0x26_trim
                        const _0xf6_split = await String.prototype.split.call(_0xf7__0x26_trim, /\s+/)
                        let _0x2f__0x27_split = _0xf6_split
                        const _0xef__hash_ = await (_0xf0__0x21_module["deps"] = _0x2f__0x27_split)
                        let _0x30__0x22__hash_ = _0xef__hash_
                        _0x30__0x22__hash_

                        const _0xf9_kv = await _0x13_kv
                        let _0x38__0x32_kv = _0xf9_kv
                        const _0xfb__0x32_kv = await _0x38__0x32_kv
                        const _0xfa__hash_ = await _0xfb__0x32_kv[1]
                        let _0x39__0x33__hash_ = _0xfa__hash_
                        const _0xfd__0x33__hash_ = await _0x39__0x33__hash_
                        const _0xfc_trim = await String.prototype.trim.call(_0xfd__0x33__hash_)
                        let _0x3a__0x34_trim = _0xfc_trim
                        const _0xf8_eq = await (_0x3a__0x34_trim === "")
                        let _0x3b__0x31_eq = _0xf8_eq
                        if (_0x3b__0x31_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xfe_module = await _0xe_module
                                    let _0x3e__0x3c_module = _0xfe_module

                                    const _0x100__0x3c_module = await _0x3e__0x3c_module
                                    const _0xff__hash_ = await (_0x100__0x3c_module["deps"] = [])
                                    let _0x3f__0x3d__hash_ = _0xff__hash_
                                    _0x3f__0x3d__hash_
                                }
                            } }
                        const _0x101_modules = await _0xb_modules
                        let _0x42__0x40_modules = _0x101_modules

                        const _0x103__0x40_modules = await _0x42__0x40_modules
                        const _0x104_module = await _0xe_module
                        let _0x49__0x43_module = _0x104_module
                        const _0x106__0x43_module = await _0x49__0x43_module
                        const _0x105_id = await (_0x106__0x43_module.id)
                        let _0x4a__0x44_id = _0x105_id
                        const _0x107_module = await _0xe_module
                        let _0x4b__0x47_module = _0x107_module
                        const _0x102__hash_ = await (_0x103__0x40_modules[_0x4a__0x44_id] = _0x4b__0x47_module)
                        let _0x4c__0x41__hash_ = _0x102__hash_
                        _0x4c__0x41__hash_
                    }
                } }




            let _0x4f_build_order = []
            _0x4f_build_order
            let _0x50_dep_loops = []
            _0x50_dep_loops
            const _0x51_visit = async function (
                module, 
                chain
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        module = module
                        chain = chain
                        const _0x108_module = await module
                        let _0x54__0x52_module = _0x108_module
                        const _0x10a__0x52_module = await _0x54__0x52_module
                        const _0x109__hash_ = await _0x10a__0x52_module["visited"]
                        let _0x55__0x53__hash_ = _0x109__hash_
                        if (_0x55__0x53__hash_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    return;
                                }
                            } }
                        const _0x10b_module = await module
                        let _0x58__0x56_module = _0x10b_module

                        const _0x10d__0x56_module = await _0x58__0x56_module
                        const _0x10c__hash_ = await (_0x10d__0x56_module["visited"] = true)
                        let _0x59__0x57__hash_ = _0x10c__hash_
                        _0x59__0x57__hash_

                        const _0x10e_chain = await chain
                        let _0x5c__0x5a_chain = _0x10e_chain
                        const _0x110__0x5a_chain = await _0x5c__0x5a_chain
                        const _0x10f_slice = await Array.prototype.slice.call(_0x110__0x5a_chain)
                        let _0x5d__0x5b_slice = _0x10f_slice
                        let _0x5e_next_chain = _0x5d__0x5b_slice
                        _0x5e_next_chain
                        const _0x111_next_chain = await _0x5e_next_chain
                        let _0x61__0x5f_next_chain = _0x111_next_chain

                        const _0x113__0x5f_next_chain = await _0x61__0x5f_next_chain
                        const _0x114_module = await module
                        let _0x66__0x62_module = _0x114_module
                        const _0x116__0x62_module = await _0x66__0x62_module
                        const _0x115_id = await (_0x116__0x62_module.id)
                        let _0x67__0x63_id = _0x115_id
                        const _0x112_push = await Array.prototype.push.call(_0x113__0x5f_next_chain, _0x67__0x63_id)
                        let _0x68__0x60_push = _0x112_push
                        _0x68__0x60_push
                        const _0x117_module = await module
                        let _0x6b__0x69_module = _0x117_module
                        const _0x119__0x69_module = await _0x6b__0x69_module
                        const _0x118__hash_ = await _0x119__0x69_module["deps"]
                        let _0x6c__0x6a__hash_ = _0x118__hash_

                        const _0x11a_iter = _0x6c__0x6a__hash_[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x11a_iter.next();
                            if (done) { break; }
                            let dep_id = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x11b_next_chain = await _0x5e_next_chain
                                    let _0x70__0x6f_next_chain = _0x11b_next_chain
                                    const _0x11c_dep_id = await dep_id
                                    let _0x6e__0x6d_dep_id = _0x11c_dep_id
                                    const _0x11d_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x70__0x6f_next_chain, _0x6e__0x6d_dep_id)
                                    if (_0x11d_await__67lang_dot_exists_inside_lp_) {{
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x71_dep_loop = []
                                                _0x71_dep_loop
                                                const _0x11e_dep_loop = await _0x71_dep_loop
                                                let _0x74__0x72_dep_loop = _0x11e_dep_loop

                                                const _0x120__0x72_dep_loop = await _0x74__0x72_dep_loop
                                                const _0x121_dep_id = await dep_id
                                                let _0x77__0x75_dep_id = _0x121_dep_id
                                                const _0x11f_push = await Array.prototype.push.call(_0x120__0x72_dep_loop, _0x77__0x75_dep_id)
                                                let _0x78__0x73_push = _0x11f_push
                                                _0x78__0x73_push
                                                const _0x122_next_chain = await _0x5e_next_chain
                                                let _0x7c__0x79_next_chain = _0x122_next_chain
                                                const _0x124__0x79_next_chain = await _0x7c__0x79_next_chain
                                                const _0x123_slice = await Array.prototype.slice.call(_0x124__0x79_next_chain)
                                                let _0x7d__0x7a_slice = _0x123_slice
                                                const _0x126__0x7a_slice = await _0x7d__0x7a_slice
                                                const _0x125_reverse = await Array.prototype.reverse.call(_0x126__0x7a_slice)
                                                let _0x7e__0x7b_reverse = _0x125_reverse

                                                const _0x127_iter = _0x7e__0x7b_reverse[Symbol.iterator]();
                                                while (true) {
                                                    const { value, done } = _0x127_iter.next();
                                                    if (done) { break; }
                                                    let chain_dep_id = value;
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            const _0x128_dep_loop = await _0x71_dep_loop
                                                            let _0x81__0x7f_dep_loop = _0x128_dep_loop

                                                            const _0x12a__0x7f_dep_loop = await _0x81__0x7f_dep_loop
                                                            const _0x12b_chain_dep_id = await chain_dep_id
                                                            let _0x84__0x82_chain_dep_id = _0x12b_chain_dep_id
                                                            const _0x129_push = await Array.prototype.push.call(_0x12a__0x7f_dep_loop, _0x84__0x82_chain_dep_id)
                                                            let _0x85__0x80_push = _0x129_push
                                                            _0x85__0x80_push
                                                            const _0x12d_chain_dep_id = await chain_dep_id
                                                            let _0x8b__0x87_chain_dep_id = _0x12d_chain_dep_id
                                                            const _0x12e_dep_id = await dep_id
                                                            let _0x8c__0x89_dep_id = _0x12e_dep_id
                                                            const _0x12c_eq = await (_0x8b__0x87_chain_dep_id === _0x8c__0x89_dep_id)
                                                            let _0x8d__0x86_eq = _0x12c_eq
                                                            if (_0x8d__0x86_eq) {{
                                                                    const parent_scope = scope
                                                                    {
                                                                        const scope = _67lang.scope(parent_scope)
                                                                        break
                                                                    }
                                                                } }
                                                        }
                                                    } }
                                                const _0x12f_dep_loop = await _0x71_dep_loop
                                                let _0x90__0x8e_dep_loop = _0x12f_dep_loop

                                                const _0x131__0x8e_dep_loop = await _0x90__0x8e_dep_loop
                                                const _0x130_reverse = await Array.prototype.reverse.call(_0x131__0x8e_dep_loop)
                                                let _0x91__0x8f_reverse = _0x130_reverse
                                                _0x91__0x8f_reverse
                                                const _0x132_dep_loops = await _0x50_dep_loops
                                                let _0x94__0x92_dep_loops = _0x132_dep_loops

                                                const _0x134__0x92_dep_loops = await _0x94__0x92_dep_loops
                                                const _0x135_dep_loop = await _0x71_dep_loop
                                                let _0x99__0x95_dep_loop = _0x135_dep_loop
                                                const _0x137__0x95_dep_loop = await _0x99__0x95_dep_loop
                                                const _0x136_join = await Array.prototype.join.call(_0x137__0x95_dep_loop, " → ")
                                                let _0x9a__0x96_join = _0x136_join
                                                const _0x133_push = await Array.prototype.push.call(_0x134__0x92_dep_loops, _0x9a__0x96_join)
                                                let _0x9b__0x93_push = _0x133_push
                                                _0x9b__0x93_push
                                            }
                                        } }
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x139_modules = await _0xb_modules
                                            let _0xa6__0x9d_modules = _0x139_modules
                                            const _0x13b__0x9d_modules = await _0xa6__0x9d_modules
                                            const _0x13c_dep_id = await dep_id
                                            let _0xa7__0xa0_dep_id = _0x13c_dep_id
                                            const _0x13a__hash_ = await _0x13b__0x9d_modules[_0xa7__0xa0_dep_id]
                                            let _0xa8__0x9e__hash_ = _0x13a__hash_
                                            const _0x13d_next_chain = await _0x5e_next_chain
                                            let _0xa9__0xa4_next_chain = _0x13d_next_chain
                                            const _0x138_visit = await _0x51_visit(_0xa8__0x9e__hash_, _0xa9__0xa4_next_chain)
                                            let _0xaa__0x9c_visit = _0x138_visit
                                            _0xaa__0x9c_visit
                                        }
                                    } 
                                }
                            } }
                        const _0x13e_build_order = await _0x4f_build_order
                        let _0xad__0xab_build_order = _0x13e_build_order

                        const _0x140__0xab_build_order = await _0xad__0xab_build_order
                        const _0x141_module = await module
                        let _0xb2__0xae_module = _0x141_module
                        const _0x143__0xae_module = await _0xb2__0xae_module
                        const _0x142_id = await (_0x143__0xae_module.id)
                        let _0xb3__0xaf_id = _0x142_id
                        const _0x13f_push = await Array.prototype.push.call(_0x140__0xab_build_order, _0xb3__0xaf_id)
                        let _0xb4__0xac_push = _0x13f_push
                        _0xb4__0xac_push
                    }
                } }
            const _0x145_modules = await _0xb_modules
            let _0xb8__0xb6_modules = _0x145_modules
            const _0x144_values = await Object.values(_0xb8__0xb6_modules)
            let _0xb9__0xb5_values = _0x144_values

            const _0x146_iter = _0xb9__0xb5_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x146_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x148_module = await module
                        let _0xbd__0xbb_module = _0x148_module
                        const _0x147_visit = await _0x51_visit(_0xbd__0xbb_module, [])
                        let _0xbe__0xba_visit = _0x147_visit
                        _0xbe__0xba_visit
                    }
                } }
            const _0x14a_dep_loops = await _0x50_dep_loops
            let _0xc4__0xc0_dep_loops = _0x14a_dep_loops
            const _0x14c__0xc0_dep_loops = await _0xc4__0xc0_dep_loops
            const _0x14b_length = await (_0x14c__0xc0_dep_loops.length)
            let _0xc5__0xc1_length = _0x14b_length
            const _0x149_nondesc = await (1 <= _0xc5__0xc1_length)
            let _0xc6__0xbf_nondesc = _0x149_nondesc
            if (_0xc6__0xbf_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x14f_dep_loops = await _0x50_dep_loops
                        let _0xd0__0xc9_dep_loops = _0x14f_dep_loops
                        const _0x151__0xc9_dep_loops = await _0xd0__0xc9_dep_loops
                        const _0x150_join = await Array.prototype.join.call(_0x151__0xc9_dep_loops, "\n")
                        let _0xd1__0xca_join = _0x150_join
                        const _0x14e_concat = await ("ERROR: there are dependency loops.\n" + _0xd1__0xca_join)
                        let _0xd2__0xc8_concat = _0x14e_concat
                        const _0x14d_print = await console.log(_0xd2__0xc8_concat)
                        let _0xd3__0xc7_print = _0x14d_print
                        _0xd3__0xc7_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x153_build_order = await _0x4f_build_order
                    let _0xd9__0xd5_build_order = _0x153_build_order
                    const _0x155__0xd5_build_order = await _0xd9__0xd5_build_order
                    const _0x154_join = await Array.prototype.join.call(_0x155__0xd5_build_order, "\n")
                    let _0xda__0xd6_join = _0x154_join
                    const _0x152_print = await console.log(_0xda__0xd6_join)
                    let _0xdb__0xd4_print = _0x152_print
                    _0xdb__0xd4_print
                }
            } 
        }
    } 
})();
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
    const _0x4f_visit = async function (
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
                const _0xfa_unroller_in = await unroller_in
                let _0x51__0x50_unroller_in = _0xfa_unroller_in
                let _0x52_unroller = _0x51__0x50_unroller_in
                _0x52_unroller
                const _0xfb_module = await module
                let _0x55__0x53_module = _0xfb_module
                const _0xfd__0x53_module = await _0x55__0x53_module
                const _0xfc__hash_ = await _0xfd__0x53_module["visited"]
                let _0x56__0x54__hash_ = _0xfc__hash_
                if (_0x56__0x54__hash_) {{
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            return;
                        }
                    } }
                const _0xfe_module = await module
                let _0x59__0x57_module = _0xfe_module

                const _0x100__0x57_module = await _0x59__0x57_module
                const _0xff__hash_ = await (_0x100__0x57_module["visited"] = true)
                let _0x5a__0x58__hash_ = _0xff__hash_
                _0x5a__0x58__hash_

                const _0x101_chain = await chain
                let _0x5d__0x5b_chain = _0x101_chain
                const _0x103__0x5b_chain = await _0x5d__0x5b_chain
                const _0x102_slice = await Array.prototype.slice.call(_0x103__0x5b_chain)
                let _0x5e__0x5c_slice = _0x102_slice
                let _0x5f_next_chain = _0x5e__0x5c_slice
                _0x5f_next_chain
                const _0x104_next_chain = await _0x5f_next_chain
                let _0x62__0x60_next_chain = _0x104_next_chain

                const _0x106__0x60_next_chain = await _0x62__0x60_next_chain
                const _0x107_module = await module
                let _0x67__0x63_module = _0x107_module
                const _0x109__0x63_module = await _0x67__0x63_module
                const _0x108_id = await (_0x109__0x63_module.id)
                let _0x68__0x64_id = _0x108_id
                const _0x105_push = await Array.prototype.push.call(_0x106__0x60_next_chain, _0x68__0x64_id)
                let _0x69__0x61_push = _0x105_push
                _0x69__0x61_push
                const _0x10a_module = await module
                let _0x6c__0x6a_module = _0x10a_module
                const _0x10c__0x6a_module = await _0x6c__0x6a_module
                const _0x10b__hash_ = await _0x10c__0x6a_module["deps"]
                let _0x6d__0x6b__hash_ = _0x10b__hash_

                const _0x10d_iter = _0x6d__0x6b__hash_[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x10d_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x10e_next_chain = await _0x5f_next_chain
                            let _0x71__0x70_next_chain = _0x10e_next_chain
                            const _0x10f_dep_id = await dep_id
                            let _0x6f__0x6e_dep_id = _0x10f_dep_id
                            const _0x110_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x71__0x70_next_chain, _0x6f__0x6e_dep_id)
                            if (_0x110_await__67lang_dot_exists_inside_lp_) {{
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        let _0x72_dep_loop = []
                                        _0x72_dep_loop
                                        const _0x111_dep_loop = await _0x72_dep_loop
                                        let _0x75__0x73_dep_loop = _0x111_dep_loop

                                        const _0x113__0x73_dep_loop = await _0x75__0x73_dep_loop
                                        const _0x114_dep_id = await dep_id
                                        let _0x78__0x76_dep_id = _0x114_dep_id
                                        const _0x112_push = await Array.prototype.push.call(_0x113__0x73_dep_loop, _0x78__0x76_dep_id)
                                        let _0x79__0x74_push = _0x112_push
                                        _0x79__0x74_push
                                        const _0x115_next_chain = await _0x5f_next_chain
                                        let _0x7d__0x7a_next_chain = _0x115_next_chain
                                        const _0x117__0x7a_next_chain = await _0x7d__0x7a_next_chain
                                        const _0x116_slice = await Array.prototype.slice.call(_0x117__0x7a_next_chain)
                                        let _0x7e__0x7b_slice = _0x116_slice
                                        const _0x119__0x7b_slice = await _0x7e__0x7b_slice
                                        const _0x118_reverse = await Array.prototype.reverse.call(_0x119__0x7b_slice)
                                        let _0x7f__0x7c_reverse = _0x118_reverse

                                        const _0x11a_iter = _0x7f__0x7c_reverse[Symbol.iterator]();
                                        while (true) {
                                            const { value, done } = _0x11a_iter.next();
                                            if (done) { break; }
                                            let chain_dep_id = value;
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    const _0x11b_dep_loop = await _0x72_dep_loop
                                                    let _0x82__0x80_dep_loop = _0x11b_dep_loop

                                                    const _0x11d__0x80_dep_loop = await _0x82__0x80_dep_loop
                                                    const _0x11e_chain_dep_id = await chain_dep_id
                                                    let _0x85__0x83_chain_dep_id = _0x11e_chain_dep_id
                                                    const _0x11c_push = await Array.prototype.push.call(_0x11d__0x80_dep_loop, _0x85__0x83_chain_dep_id)
                                                    let _0x86__0x81_push = _0x11c_push
                                                    _0x86__0x81_push
                                                    const _0x120_chain_dep_id = await chain_dep_id
                                                    let _0x8c__0x88_chain_dep_id = _0x120_chain_dep_id
                                                    const _0x121_dep_id = await dep_id
                                                    let _0x8d__0x8a_dep_id = _0x121_dep_id
                                                    const _0x11f_eq = await (_0x8c__0x88_chain_dep_id === _0x8d__0x8a_dep_id)
                                                    let _0x8e__0x87_eq = _0x11f_eq
                                                    if (_0x8e__0x87_eq) {{
                                                            const parent_scope = scope
                                                            {
                                                                const scope = _67lang.scope(parent_scope)
                                                                break
                                                            }
                                                        } }
                                                }
                                            } }
                                        const _0x122_dep_loop = await _0x72_dep_loop
                                        let _0x91__0x8f_dep_loop = _0x122_dep_loop

                                        const _0x124__0x8f_dep_loop = await _0x91__0x8f_dep_loop
                                        const _0x123_reverse = await Array.prototype.reverse.call(_0x124__0x8f_dep_loop)
                                        let _0x92__0x90_reverse = _0x123_reverse
                                        _0x92__0x90_reverse
                                        const _0x125_unroller = await _0x52_unroller
                                        let _0x96__0x93_unroller = _0x125_unroller
                                        const _0x127__0x93_unroller = await _0x96__0x93_unroller
                                        const _0x126_dep_loops = await (_0x127__0x93_unroller.dep_loops)
                                        let _0x97__0x94_dep_loops = _0x126_dep_loops

                                        const _0x129__0x94_dep_loops = await _0x97__0x94_dep_loops
                                        const _0x12a_dep_loop = await _0x72_dep_loop
                                        let _0x9c__0x98_dep_loop = _0x12a_dep_loop
                                        const _0x12c__0x98_dep_loop = await _0x9c__0x98_dep_loop
                                        const _0x12b_join = await Array.prototype.join.call(_0x12c__0x98_dep_loop, " → ")
                                        let _0x9d__0x99_join = _0x12b_join
                                        const _0x128_push = await Array.prototype.push.call(_0x129__0x94_dep_loops, _0x9d__0x99_join)
                                        let _0x9e__0x95_push = _0x128_push
                                        _0x9e__0x95_push
                                    }
                                } }
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x12e_unroller = await _0x52_unroller
                                    let _0xad__0xa0_unroller = _0x12e_unroller
                                    const _0x12f_unroller = await _0x52_unroller
                                    let _0xae__0xa2_unroller = _0x12f_unroller
                                    const _0x131__0xa2_unroller = await _0xae__0xa2_unroller
                                    const _0x130_modules = await (_0x131__0xa2_unroller.modules)
                                    let _0xaf__0xa3_modules = _0x130_modules
                                    const _0x133__0xa3_modules = await _0xaf__0xa3_modules
                                    const _0x134_dep_id = await dep_id
                                    let _0xb0__0xa7_dep_id = _0x134_dep_id
                                    const _0x132__hash_ = await _0x133__0xa3_modules[_0xb0__0xa7_dep_id]
                                    let _0xb1__0xa4__hash_ = _0x132__hash_
                                    const _0x135_next_chain = await _0x5f_next_chain
                                    let _0xb2__0xab_next_chain = _0x135_next_chain
                                    const _0x12d_visit = await _0x4f_visit(_0xad__0xa0_unroller, _0xb1__0xa4__hash_, _0xb2__0xab_next_chain)
                                    let _0xb3__0x9f_visit = _0x12d_visit
                                    _0xb3__0x9f_visit
                                }
                            } 
                        }
                    } }
                const _0x136_unroller = await _0x52_unroller
                let _0xb7__0xb4_unroller = _0x136_unroller
                const _0x138__0xb4_unroller = await _0xb7__0xb4_unroller
                const _0x137_build_order = await (_0x138__0xb4_unroller.build_order)
                let _0xb8__0xb5_build_order = _0x137_build_order

                const _0x13a__0xb5_build_order = await _0xb8__0xb5_build_order
                const _0x13b_module = await module
                let _0xbd__0xb9_module = _0x13b_module
                const _0x13d__0xb9_module = await _0xbd__0xb9_module
                const _0x13c_id = await (_0x13d__0xb9_module.id)
                let _0xbe__0xba_id = _0x13c_id
                const _0x139_push = await Array.prototype.push.call(_0x13a__0xb5_build_order, _0xbe__0xba_id)
                let _0xbf__0xb6_push = _0x139_push
                _0xbf__0xb6_push
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
            const _0x13e_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x13e_stdin
            let _0x2_lines = _0x1__0x0_stdin
            _0x2_lines
            const _0x140_lines = await _0x2_lines
            let _0x8__0x4_lines = _0x140_lines
            const _0x142__0x4_lines = await _0x8__0x4_lines
            const _0x141_split = await String.prototype.split.call(_0x142__0x4_lines, "\n")
            let _0x9__0x5_split = _0x141_split
            const _0x13f_lines = await (_0x2_lines = _0x9__0x5_split)
            let _0xa__0x3_lines = _0x13f_lines
            _0xa__0x3_lines
            let _0xb_modules = {}
            _0xb_modules
            const _0x143_lines = await _0x2_lines
            let _0xd__0xc_lines = _0x143_lines

            const _0x144_iter = _0xd__0xc_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x144_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xe_module = {}
                        _0xe_module
                        const _0x145_line = await line
                        let _0x11__0xf_line = _0x145_line
                        const _0x147__0xf_line = await _0x11__0xf_line
                        const _0x146_split = await String.prototype.split.call(_0x147__0xf_line, ":", 2)
                        let _0x12__0x10_split = _0x146_split
                        let _0x13_kv = _0x12__0x10_split
                        _0x13_kv
                        const _0x148_module = await _0xe_module
                        let _0x16__0x14_module = _0x148_module

                        const _0x14a__0x14_module = await _0x16__0x14_module
                        const _0x14b_kv = await _0x13_kv
                        let _0x1d__0x17_kv = _0x14b_kv
                        const _0x14d__0x17_kv = await _0x1d__0x17_kv
                        const _0x14c__hash_ = await _0x14d__0x17_kv[0]
                        let _0x1e__0x18__hash_ = _0x14c__hash_
                        const _0x14f__0x18__hash_ = await _0x1e__0x18__hash_
                        const _0x14e_trim = await String.prototype.trim.call(_0x14f__0x18__hash_)
                        let _0x1f__0x19_trim = _0x14e_trim
                        const _0x149__hash_ = await (_0x14a__0x14_module["id"] = _0x1f__0x19_trim)
                        let _0x20__0x15__hash_ = _0x149__hash_
                        _0x20__0x15__hash_
                        const _0x150_module = await _0xe_module
                        let _0x23__0x21_module = _0x150_module

                        const _0x152__0x21_module = await _0x23__0x21_module
                        const _0x153_kv = await _0x13_kv
                        let _0x2c__0x24_kv = _0x153_kv
                        const _0x155__0x24_kv = await _0x2c__0x24_kv
                        const _0x154__hash_ = await _0x155__0x24_kv[1]
                        let _0x2d__0x25__hash_ = _0x154__hash_
                        const _0x157__0x25__hash_ = await _0x2d__0x25__hash_
                        const _0x156_trim = await String.prototype.trim.call(_0x157__0x25__hash_)
                        let _0x2e__0x26_trim = _0x156_trim
                        const _0x159__0x26_trim = await _0x2e__0x26_trim
                        const _0x158_split = await String.prototype.split.call(_0x159__0x26_trim, /\s+/)
                        let _0x2f__0x27_split = _0x158_split
                        const _0x151__hash_ = await (_0x152__0x21_module["deps"] = _0x2f__0x27_split)
                        let _0x30__0x22__hash_ = _0x151__hash_
                        _0x30__0x22__hash_

                        const _0x15b_kv = await _0x13_kv
                        let _0x38__0x32_kv = _0x15b_kv
                        const _0x15d__0x32_kv = await _0x38__0x32_kv
                        const _0x15c__hash_ = await _0x15d__0x32_kv[1]
                        let _0x39__0x33__hash_ = _0x15c__hash_
                        const _0x15f__0x33__hash_ = await _0x39__0x33__hash_
                        const _0x15e_trim = await String.prototype.trim.call(_0x15f__0x33__hash_)
                        let _0x3a__0x34_trim = _0x15e_trim
                        const _0x15a_eq = await (_0x3a__0x34_trim === "")
                        let _0x3b__0x31_eq = _0x15a_eq
                        if (_0x3b__0x31_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x160_module = await _0xe_module
                                    let _0x3e__0x3c_module = _0x160_module

                                    const _0x162__0x3c_module = await _0x3e__0x3c_module
                                    const _0x161__hash_ = await (_0x162__0x3c_module["deps"] = [])
                                    let _0x3f__0x3d__hash_ = _0x161__hash_
                                    _0x3f__0x3d__hash_
                                }
                            } }
                        const _0x163_modules = await _0xb_modules
                        let _0x42__0x40_modules = _0x163_modules

                        const _0x165__0x40_modules = await _0x42__0x40_modules
                        const _0x166_module = await _0xe_module
                        let _0x49__0x43_module = _0x166_module
                        const _0x168__0x43_module = await _0x49__0x43_module
                        const _0x167_id = await (_0x168__0x43_module.id)
                        let _0x4a__0x44_id = _0x167_id
                        const _0x169_module = await _0xe_module
                        let _0x4b__0x47_module = _0x169_module
                        const _0x164__hash_ = await (_0x165__0x40_modules[_0x4a__0x44_id] = _0x4b__0x47_module)
                        let _0x4c__0x41__hash_ = _0x164__hash_
                        _0x4c__0x41__hash_
                    }
                } }




            const _0x16b_modules = await _0xb_modules
            let _0xc3__0xc1_modules = _0x16b_modules
            const _0x16a_DAG_unroller = await (new DAG_unroller([], [], _0xc3__0xc1_modules))
            let _0xc4__0xc0_DAG_unroller = _0x16a_DAG_unroller
            let _0xc5_unroller = _0xc4__0xc0_DAG_unroller
            _0xc5_unroller
            const _0x16d_modules = await _0xb_modules
            let _0xc9__0xc7_modules = _0x16d_modules
            const _0x16c_values = await Object.values(_0xc9__0xc7_modules)
            let _0xca__0xc6_values = _0x16c_values

            const _0x16e_iter = _0xca__0xc6_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x16e_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x170_unroller = await _0xc5_unroller
                        let _0xd0__0xcc_unroller = _0x170_unroller
                        const _0x171_module = await module
                        let _0xd1__0xce_module = _0x171_module
                        const _0x16f_visit = await _0x4f_visit(_0xd0__0xcc_unroller, _0xd1__0xce_module, [])
                        let _0xd2__0xcb_visit = _0x16f_visit
                        _0xd2__0xcb_visit
                    }
                } }
            const _0x173_unroller = await _0xc5_unroller
            let _0xda__0xd4_unroller = _0x173_unroller
            const _0x175__0xd4_unroller = await _0xda__0xd4_unroller
            const _0x174_dep_loops = await (_0x175__0xd4_unroller.dep_loops)
            let _0xdb__0xd5_dep_loops = _0x174_dep_loops
            const _0x177__0xd5_dep_loops = await _0xdb__0xd5_dep_loops
            const _0x176_length = await (_0x177__0xd5_dep_loops.length)
            let _0xdc__0xd6_length = _0x176_length
            const _0x172_nondesc = await (1 <= _0xdc__0xd6_length)
            let _0xdd__0xd3_nondesc = _0x172_nondesc
            if (_0xdd__0xd3_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x17a_unroller = await _0xc5_unroller
                        let _0xea__0xe0_unroller = _0x17a_unroller
                        const _0x17c__0xe0_unroller = await _0xea__0xe0_unroller
                        const _0x17b_dep_loops = await (_0x17c__0xe0_unroller.dep_loops)
                        let _0xeb__0xe1_dep_loops = _0x17b_dep_loops
                        const _0x17e__0xe1_dep_loops = await _0xeb__0xe1_dep_loops
                        const _0x17d_join = await Array.prototype.join.call(_0x17e__0xe1_dep_loops, "\n")
                        let _0xec__0xe2_join = _0x17d_join
                        const _0x179_concat = await ("ERROR: there are dependency loops.\n" + _0xec__0xe2_join)
                        let _0xed__0xdf_concat = _0x179_concat
                        const _0x178_print = await console.log(_0xed__0xdf_concat)
                        let _0xee__0xde_print = _0x178_print
                        _0xee__0xde_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x180_unroller = await _0xc5_unroller
                    let _0xf6__0xf0_unroller = _0x180_unroller
                    const _0x182__0xf0_unroller = await _0xf6__0xf0_unroller
                    const _0x181_build_order = await (_0x182__0xf0_unroller.build_order)
                    let _0xf7__0xf1_build_order = _0x181_build_order
                    const _0x184__0xf1_build_order = await _0xf7__0xf1_build_order
                    const _0x183_join = await Array.prototype.join.call(_0x184__0xf1_build_order, "\n")
                    let _0xf8__0xf2_join = _0x183_join
                    const _0x17f_print = await console.log(_0xf8__0xf2_join)
                    let _0xf9__0xef_print = _0x17f_print
                    _0xf9__0xef_print
                }
            } 
        }
    } 
})();
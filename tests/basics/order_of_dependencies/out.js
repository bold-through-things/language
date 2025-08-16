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
    const _0x4c_visit = async function (
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
                const _0xf7_unroller_in = await unroller_in
                let _0x4e__0x4d_unroller_in = _0xf7_unroller_in
                let _0x4f_unroller = _0x4e__0x4d_unroller_in
                _0x4f_unroller
                const _0xf8_module = await module
                let _0x52__0x50_module = _0xf8_module
                const _0xfa__0x50_module = await _0x52__0x50_module
                const _0xf9__hash_ = await _0xfa__0x50_module["visited"]
                let _0x53__0x51__hash_ = _0xf9__hash_
                if (_0x53__0x51__hash_) {{
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            return;
                        }
                    } }
                const _0xfb_module = await module
                let _0x56__0x54_module = _0xfb_module

                const _0xfd__0x54_module = await _0x56__0x54_module
                const _0xfc__hash_ = await (_0xfd__0x54_module["visited"] = true)
                let _0x57__0x55__hash_ = _0xfc__hash_
                _0x57__0x55__hash_

                const _0xfe_chain = await chain
                let _0x5a__0x58_chain = _0xfe_chain
                const _0x100__0x58_chain = await _0x5a__0x58_chain
                const _0xff_slice = await Array.prototype.slice.call(_0x100__0x58_chain)
                let _0x5b__0x59_slice = _0xff_slice
                let _0x5c_next_chain = _0x5b__0x59_slice
                _0x5c_next_chain
                const _0x101_next_chain = await _0x5c_next_chain
                let _0x5f__0x5d_next_chain = _0x101_next_chain

                const _0x103__0x5d_next_chain = await _0x5f__0x5d_next_chain
                const _0x104_module = await module
                let _0x64__0x60_module = _0x104_module
                const _0x106__0x60_module = await _0x64__0x60_module
                const _0x105_id = await (_0x106__0x60_module.id)
                let _0x65__0x61_id = _0x105_id
                const _0x102_push = await Array.prototype.push.call(_0x103__0x5d_next_chain, _0x65__0x61_id)
                let _0x66__0x5e_push = _0x102_push
                _0x66__0x5e_push
                const _0x107_module = await module
                let _0x69__0x67_module = _0x107_module
                const _0x109__0x67_module = await _0x69__0x67_module
                const _0x108__hash_ = await _0x109__0x67_module["deps"]
                let _0x6a__0x68__hash_ = _0x108__hash_

                const _0x10a_iter = _0x6a__0x68__hash_[Symbol.iterator]();
                while (true) {
                    const { value, done } = _0x10a_iter.next();
                    if (done) { break; }
                    let dep_id = value;
                    {
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            const _0x10b_next_chain = await _0x5c_next_chain
                            let _0x6e__0x6d_next_chain = _0x10b_next_chain
                            const _0x10c_dep_id = await dep_id
                            let _0x6c__0x6b_dep_id = _0x10c_dep_id
                            const _0x10d_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6e__0x6d_next_chain, _0x6c__0x6b_dep_id)
                            if (_0x10d_await__67lang_dot_exists_inside_lp_) {{
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        let _0x6f_dep_loop = []
                                        _0x6f_dep_loop
                                        const _0x10e_dep_loop = await _0x6f_dep_loop
                                        let _0x72__0x70_dep_loop = _0x10e_dep_loop

                                        const _0x110__0x70_dep_loop = await _0x72__0x70_dep_loop
                                        const _0x111_dep_id = await dep_id
                                        let _0x75__0x73_dep_id = _0x111_dep_id
                                        const _0x10f_push = await Array.prototype.push.call(_0x110__0x70_dep_loop, _0x75__0x73_dep_id)
                                        let _0x76__0x71_push = _0x10f_push
                                        _0x76__0x71_push
                                        const _0x112_next_chain = await _0x5c_next_chain
                                        let _0x7a__0x77_next_chain = _0x112_next_chain
                                        const _0x114__0x77_next_chain = await _0x7a__0x77_next_chain
                                        const _0x113_slice = await Array.prototype.slice.call(_0x114__0x77_next_chain)
                                        let _0x7b__0x78_slice = _0x113_slice
                                        const _0x116__0x78_slice = await _0x7b__0x78_slice
                                        const _0x115_reverse = await Array.prototype.reverse.call(_0x116__0x78_slice)
                                        let _0x7c__0x79_reverse = _0x115_reverse

                                        const _0x117_iter = _0x7c__0x79_reverse[Symbol.iterator]();
                                        while (true) {
                                            const { value, done } = _0x117_iter.next();
                                            if (done) { break; }
                                            let chain_dep_id = value;
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    const _0x118_dep_loop = await _0x6f_dep_loop
                                                    let _0x7f__0x7d_dep_loop = _0x118_dep_loop

                                                    const _0x11a__0x7d_dep_loop = await _0x7f__0x7d_dep_loop
                                                    const _0x11b_chain_dep_id = await chain_dep_id
                                                    let _0x82__0x80_chain_dep_id = _0x11b_chain_dep_id
                                                    const _0x119_push = await Array.prototype.push.call(_0x11a__0x7d_dep_loop, _0x82__0x80_chain_dep_id)
                                                    let _0x83__0x7e_push = _0x119_push
                                                    _0x83__0x7e_push
                                                    const _0x11d_chain_dep_id = await chain_dep_id
                                                    let _0x89__0x85_chain_dep_id = _0x11d_chain_dep_id
                                                    const _0x11e_dep_id = await dep_id
                                                    let _0x8a__0x87_dep_id = _0x11e_dep_id
                                                    const _0x11c_eq = await (_0x89__0x85_chain_dep_id === _0x8a__0x87_dep_id)
                                                    let _0x8b__0x84_eq = _0x11c_eq
                                                    if (_0x8b__0x84_eq) {{
                                                            const parent_scope = scope
                                                            {
                                                                const scope = _67lang.scope(parent_scope)
                                                                break
                                                            }
                                                        } }
                                                }
                                            } }
                                        const _0x11f_dep_loop = await _0x6f_dep_loop
                                        let _0x8e__0x8c_dep_loop = _0x11f_dep_loop

                                        const _0x121__0x8c_dep_loop = await _0x8e__0x8c_dep_loop
                                        const _0x120_reverse = await Array.prototype.reverse.call(_0x121__0x8c_dep_loop)
                                        let _0x8f__0x8d_reverse = _0x120_reverse
                                        _0x8f__0x8d_reverse
                                        const _0x122_unroller = await _0x4f_unroller
                                        let _0x93__0x90_unroller = _0x122_unroller
                                        const _0x124__0x90_unroller = await _0x93__0x90_unroller
                                        const _0x123_dep_loops = await (_0x124__0x90_unroller.dep_loops)
                                        let _0x94__0x91_dep_loops = _0x123_dep_loops

                                        const _0x126__0x91_dep_loops = await _0x94__0x91_dep_loops
                                        const _0x127_dep_loop = await _0x6f_dep_loop
                                        let _0x99__0x95_dep_loop = _0x127_dep_loop
                                        const _0x129__0x95_dep_loop = await _0x99__0x95_dep_loop
                                        const _0x128_join = await Array.prototype.join.call(_0x129__0x95_dep_loop, " → ")
                                        let _0x9a__0x96_join = _0x128_join
                                        const _0x125_push = await Array.prototype.push.call(_0x126__0x91_dep_loops, _0x9a__0x96_join)
                                        let _0x9b__0x92_push = _0x125_push
                                        _0x9b__0x92_push
                                    }
                                } }
                            else {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x12b_unroller = await _0x4f_unroller
                                    let _0xaa__0x9d_unroller = _0x12b_unroller
                                    const _0x12c_unroller = await _0x4f_unroller
                                    let _0xab__0x9f_unroller = _0x12c_unroller
                                    const _0x12e__0x9f_unroller = await _0xab__0x9f_unroller
                                    const _0x12d_modules = await (_0x12e__0x9f_unroller.modules)
                                    let _0xac__0xa0_modules = _0x12d_modules
                                    const _0x130__0xa0_modules = await _0xac__0xa0_modules
                                    const _0x131_dep_id = await dep_id
                                    let _0xad__0xa4_dep_id = _0x131_dep_id
                                    const _0x12f__hash_ = await _0x130__0xa0_modules[_0xad__0xa4_dep_id]
                                    let _0xae__0xa1__hash_ = _0x12f__hash_
                                    const _0x132_next_chain = await _0x5c_next_chain
                                    let _0xaf__0xa8_next_chain = _0x132_next_chain
                                    const _0x12a_visit = await _0x4c_visit(_0xaa__0x9d_unroller, _0xae__0xa1__hash_, _0xaf__0xa8_next_chain)
                                    let _0xb0__0x9c_visit = _0x12a_visit
                                    _0xb0__0x9c_visit
                                }
                            } 
                        }
                    } }
                const _0x133_unroller = await _0x4f_unroller
                let _0xb4__0xb1_unroller = _0x133_unroller
                const _0x135__0xb1_unroller = await _0xb4__0xb1_unroller
                const _0x134_build_order = await (_0x135__0xb1_unroller.build_order)
                let _0xb5__0xb2_build_order = _0x134_build_order

                const _0x137__0xb2_build_order = await _0xb5__0xb2_build_order
                const _0x138_module = await module
                let _0xba__0xb6_module = _0x138_module
                const _0x13a__0xb6_module = await _0xba__0xb6_module
                const _0x139_id = await (_0x13a__0xb6_module.id)
                let _0xbb__0xb7_id = _0x139_id
                const _0x136_push = await Array.prototype.push.call(_0x137__0xb2_build_order, _0xbb__0xb7_id)
                let _0xbc__0xb3_push = _0x136_push
                _0xbc__0xb3_push
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
            const _0x13b_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x13b_stdin
            let _0x2_lines = _0x1__0x0_stdin
            _0x2_lines
            const _0x13c_lines = await _0x2_lines
            let _0x5__0x3_lines = _0x13c_lines
            const _0x13e__0x3_lines = await _0x5__0x3_lines
            const _0x13d_split = await String.prototype.split.call(_0x13e__0x3_lines, "\n")
            let _0x6__0x4_split = _0x13d_split
            let _0x7_lines = _0x6__0x4_split
            _0x7_lines
            let _0x8_modules = {}
            _0x8_modules
            const _0x13f_lines = await _0x7_lines
            let _0xa__0x9_lines = _0x13f_lines

            const _0x140_iter = _0xa__0x9_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x140_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xb_module = {}
                        _0xb_module
                        const _0x141_line = await line
                        let _0xe__0xc_line = _0x141_line
                        const _0x143__0xc_line = await _0xe__0xc_line
                        const _0x142_split = await String.prototype.split.call(_0x143__0xc_line, ":", 2)
                        let _0xf__0xd_split = _0x142_split
                        let _0x10_kv = _0xf__0xd_split
                        _0x10_kv
                        const _0x144_module = await _0xb_module
                        let _0x13__0x11_module = _0x144_module

                        const _0x146__0x11_module = await _0x13__0x11_module
                        const _0x147_kv = await _0x10_kv
                        let _0x1a__0x14_kv = _0x147_kv
                        const _0x149__0x14_kv = await _0x1a__0x14_kv
                        const _0x148__hash_ = await _0x149__0x14_kv[0]
                        let _0x1b__0x15__hash_ = _0x148__hash_
                        const _0x14b__0x15__hash_ = await _0x1b__0x15__hash_
                        const _0x14a_trim = await String.prototype.trim.call(_0x14b__0x15__hash_)
                        let _0x1c__0x16_trim = _0x14a_trim
                        const _0x145__hash_ = await (_0x146__0x11_module["id"] = _0x1c__0x16_trim)
                        let _0x1d__0x12__hash_ = _0x145__hash_
                        _0x1d__0x12__hash_
                        const _0x14c_module = await _0xb_module
                        let _0x20__0x1e_module = _0x14c_module

                        const _0x14e__0x1e_module = await _0x20__0x1e_module
                        const _0x14f_kv = await _0x10_kv
                        let _0x29__0x21_kv = _0x14f_kv
                        const _0x151__0x21_kv = await _0x29__0x21_kv
                        const _0x150__hash_ = await _0x151__0x21_kv[1]
                        let _0x2a__0x22__hash_ = _0x150__hash_
                        const _0x153__0x22__hash_ = await _0x2a__0x22__hash_
                        const _0x152_trim = await String.prototype.trim.call(_0x153__0x22__hash_)
                        let _0x2b__0x23_trim = _0x152_trim
                        const _0x155__0x23_trim = await _0x2b__0x23_trim
                        const _0x154_split = await String.prototype.split.call(_0x155__0x23_trim, /\s+/)
                        let _0x2c__0x24_split = _0x154_split
                        const _0x14d__hash_ = await (_0x14e__0x1e_module["deps"] = _0x2c__0x24_split)
                        let _0x2d__0x1f__hash_ = _0x14d__hash_
                        _0x2d__0x1f__hash_

                        const _0x157_kv = await _0x10_kv
                        let _0x35__0x2f_kv = _0x157_kv
                        const _0x159__0x2f_kv = await _0x35__0x2f_kv
                        const _0x158__hash_ = await _0x159__0x2f_kv[1]
                        let _0x36__0x30__hash_ = _0x158__hash_
                        const _0x15b__0x30__hash_ = await _0x36__0x30__hash_
                        const _0x15a_trim = await String.prototype.trim.call(_0x15b__0x30__hash_)
                        let _0x37__0x31_trim = _0x15a_trim
                        const _0x156_eq = await (_0x37__0x31_trim === "")
                        let _0x38__0x2e_eq = _0x156_eq
                        if (_0x38__0x2e_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x15c_module = await _0xb_module
                                    let _0x3b__0x39_module = _0x15c_module

                                    const _0x15e__0x39_module = await _0x3b__0x39_module
                                    const _0x15d__hash_ = await (_0x15e__0x39_module["deps"] = [])
                                    let _0x3c__0x3a__hash_ = _0x15d__hash_
                                    _0x3c__0x3a__hash_
                                }
                            } }
                        const _0x15f_modules = await _0x8_modules
                        let _0x3f__0x3d_modules = _0x15f_modules

                        const _0x161__0x3d_modules = await _0x3f__0x3d_modules
                        const _0x162_module = await _0xb_module
                        let _0x46__0x40_module = _0x162_module
                        const _0x164__0x40_module = await _0x46__0x40_module
                        const _0x163_id = await (_0x164__0x40_module.id)
                        let _0x47__0x41_id = _0x163_id
                        const _0x165_module = await _0xb_module
                        let _0x48__0x44_module = _0x165_module
                        const _0x160__hash_ = await (_0x161__0x3d_modules[_0x47__0x41_id] = _0x48__0x44_module)
                        let _0x49__0x3e__hash_ = _0x160__hash_
                        _0x49__0x3e__hash_
                    }
                } }




            const _0x167_modules = await _0x8_modules
            let _0xc0__0xbe_modules = _0x167_modules
            const _0x166_DAG_unroller = await (new DAG_unroller([], [], _0xc0__0xbe_modules))
            let _0xc1__0xbd_DAG_unroller = _0x166_DAG_unroller
            let _0xc2_unroller = _0xc1__0xbd_DAG_unroller
            _0xc2_unroller
            const _0x169_modules = await _0x8_modules
            let _0xc6__0xc4_modules = _0x169_modules
            const _0x168_values = await Object.values(_0xc6__0xc4_modules)
            let _0xc7__0xc3_values = _0x168_values

            const _0x16a_iter = _0xc7__0xc3_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x16a_iter.next();
                if (done) { break; }
                let module = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x16c_unroller = await _0xc2_unroller
                        let _0xcd__0xc9_unroller = _0x16c_unroller
                        const _0x16d_module = await module
                        let _0xce__0xcb_module = _0x16d_module
                        const _0x16b_visit = await _0x4c_visit(_0xcd__0xc9_unroller, _0xce__0xcb_module, [])
                        let _0xcf__0xc8_visit = _0x16b_visit
                        _0xcf__0xc8_visit
                    }
                } }
            const _0x16f_unroller = await _0xc2_unroller
            let _0xd7__0xd1_unroller = _0x16f_unroller
            const _0x171__0xd1_unroller = await _0xd7__0xd1_unroller
            const _0x170_dep_loops = await (_0x171__0xd1_unroller.dep_loops)
            let _0xd8__0xd2_dep_loops = _0x170_dep_loops
            const _0x173__0xd2_dep_loops = await _0xd8__0xd2_dep_loops
            const _0x172_length = await (_0x173__0xd2_dep_loops.length)
            let _0xd9__0xd3_length = _0x172_length
            const _0x16e_nondesc = await (1 <= _0xd9__0xd3_length)
            let _0xda__0xd0_nondesc = _0x16e_nondesc
            if (_0xda__0xd0_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x176_unroller = await _0xc2_unroller
                        let _0xe7__0xdd_unroller = _0x176_unroller
                        const _0x178__0xdd_unroller = await _0xe7__0xdd_unroller
                        const _0x177_dep_loops = await (_0x178__0xdd_unroller.dep_loops)
                        let _0xe8__0xde_dep_loops = _0x177_dep_loops
                        const _0x17a__0xde_dep_loops = await _0xe8__0xde_dep_loops
                        const _0x179_join = await Array.prototype.join.call(_0x17a__0xde_dep_loops, "\n")
                        let _0xe9__0xdf_join = _0x179_join
                        const _0x175_concat = await ("ERROR: there are dependency loops.\n" + _0xe9__0xdf_join)
                        let _0xea__0xdc_concat = _0x175_concat
                        const _0x174_print = await console.log(_0xea__0xdc_concat)
                        let _0xeb__0xdb_print = _0x174_print
                        _0xeb__0xdb_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x17c_unroller = await _0xc2_unroller
                    let _0xf3__0xed_unroller = _0x17c_unroller
                    const _0x17e__0xed_unroller = await _0xf3__0xed_unroller
                    const _0x17d_build_order = await (_0x17e__0xed_unroller.build_order)
                    let _0xf4__0xee_build_order = _0x17d_build_order
                    const _0x180__0xee_build_order = await _0xf4__0xee_build_order
                    const _0x17f_join = await Array.prototype.join.call(_0x180__0xee_build_order, "\n")
                    let _0xf5__0xef_join = _0x17f_join
                    const _0x17b_print = await console.log(_0xf5__0xef_join)
                    let _0xf6__0xec_print = _0x17b_print
                    _0xf6__0xec_print
                }
            } 
        }
    } 
})();
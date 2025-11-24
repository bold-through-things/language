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
    },

    maybe_await: async function (value) {
        // we expect the JIT will optimize this h*ck
        // TODO benchmark as test
        if (value instanceof Promise) {
            return await value;
        } else {
            return value;
        }
    }
}

const is_browser = typeof window !== "undefined" && typeof window.document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
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

    _67lang.is_tty = () => Deno.stdin.isTerminal();
}


function _0x107_DAG_unroller(dep_loops, build_order, modules) {
    this.dep_loops = dep_loops;
    this.build_order = build_order;
    this.modules = modules;
}


function _0x108_Module(id, deps, visited) {
    this.id = id;
    this.deps = deps;
    this.visited = visited;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x69_visit = async function (
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
                let _0x6a_chain = chain
                _0x6a_chain
                let _0x6b_module = module
                _0x6b_module
                let _0x6c_unroller = unroller
                _0x6c_unroller
                const _0x11d_module = _0x6b_module
                const _0x11c_visited = await _67lang.maybe_await((_0x11d_module.visited))
                let _0x6e__0x6d_pipeline_result = _0x11c_visited
                if (_0x6e__0x6d_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x11f_module = _0x6b_module
                const _0x11e_visited = await _67lang.maybe_await((_0x11f_module.visited = (true)))
                let _0x70__0x6f_pipeline_result = _0x11e_visited
                _0x70__0x6f_pipeline_result
                if (false)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)

                        const _0x121_chain = _0x6a_chain
                        const _0x120_slice = Array.prototype.slice.call(_0x121_chain)
                        let _0x72__0x71_pipeline_result = _0x120_slice
                        _0x72__0x71_pipeline_result
                        const _0x123__0x71_pipeline_result = _0x72__0x71_pipeline_result
                        const _0x125_module = _0x6b_module
                        const _0x124_id = await _67lang.maybe_await((_0x125_module.id))
                        let _0x75__0x74_pipeline_result = _0x124_id
                        const _0x122_push = Array.prototype.push.call(_0x123__0x71_pipeline_result, _0x75__0x74_pipeline_result)
                        let _0x76__0x73_pipeline_result = _0x122_push
                        _0x76__0x73_pipeline_result
                    }
                } 

                const _0x127_chain = _0x6a_chain
                const _0x126_slice = Array.prototype.slice.call(_0x127_chain)
                let _0x78__0x77_pipeline_result = _0x126_slice
                let _0x79_next_chain = _0x78__0x77_pipeline_result
                _0x79_next_chain
                const _0x129_next_chain = _0x79_next_chain
                const _0x12b_module = _0x6b_module
                const _0x12a_id = await _67lang.maybe_await((_0x12b_module.id))
                let _0x7c__0x7b_pipeline_result = _0x12a_id
                const _0x128_push = Array.prototype.push.call(_0x129_next_chain, _0x7c__0x7b_pipeline_result)
                let _0x7d__0x7a_pipeline_result = _0x128_push
                _0x7d__0x7a_pipeline_result
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x80__0x7e_for_dep_id__index = 0
                        _0x80__0x7e_for_dep_id__index
                        const _0x12d_module = _0x6b_module
                        const _0x12c_deps = await _67lang.maybe_await((_0x12d_module.deps))
                        let _0x82__0x81_pipeline_result = _0x12c_deps
                        let _0x83__0x7f_for_dep_id__list = _0x82__0x81_pipeline_result
                        _0x83__0x7f_for_dep_id__list
                        while(true) {
                            const _0x12f__0x7e_for_dep_id__index = _0x80__0x7e_for_dep_id__index
                            let _0x86__0x85_pipeline_result = _0x12f__0x7e_for_dep_id__index
                            const _0x131__0x7f_for_dep_id__list = _0x83__0x7f_for_dep_id__list
                            const _0x130_length = (_0x131__0x7f_for_dep_id__list.length)
                            let _0x88__0x87_pipeline_result = _0x130_length
                            const _0x12e_asc = (_0x86__0x85_pipeline_result < _0x88__0x87_pipeline_result)
                            let _0x89__0x84_pipeline_result = _0x12e_asc
                            if (!_0x89__0x84_pipeline_result) { break; }
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x133__0x7f_for_dep_id__list = _0x83__0x7f_for_dep_id__list
                                    const _0x134__0x7e_for_dep_id__index = _0x80__0x7e_for_dep_id__index
                                    let _0x8c__0x8b_pipeline_result = _0x134__0x7e_for_dep_id__index
                                    const _0x132__hash_ = _0x133__0x7f_for_dep_id__list[_0x8c__0x8b_pipeline_result]
                                    let _0x8d__0x8a_pipeline_result = _0x132__hash_
                                    let _0x8e_dep_id = _0x8d__0x8a_pipeline_result
                                    _0x8e_dep_id
                                    const _0x137__0x7e_for_dep_id__index = _0x80__0x7e_for_dep_id__index
                                    const _0x136_add = (_0x137__0x7e_for_dep_id__index + 1)
                                    let _0x91__0x90_pipeline_result = _0x136_add
                                    const _0x135__0x7e_for_dep_id__index = (_0x80__0x7e_for_dep_id__index = _0x91__0x90_pipeline_result)
                                    let _0x92__0x8f_pipeline_result = _0x135__0x7e_for_dep_id__index
                                    _0x92__0x8f_pipeline_result
                                    const _0x138_next_chain = _0x79_next_chain
                                    let _0x96__0x95_pipeline_result = _0x138_next_chain
                                    const _0x139_dep_id = _0x8e_dep_id
                                    let _0x94__0x93_pipeline_result = _0x139_dep_id
                                    const _0x13a_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x96__0x95_pipeline_result, _0x94__0x93_pipeline_result)
                                    if (_0x13a_await__67lang_dot_exists_inside_lp_)
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x97_dep_loop = []
                                            _0x97_dep_loop
                                            const _0x13c_dep_loop = _0x97_dep_loop
                                            const _0x13d_dep_id = _0x8e_dep_id
                                            let _0x9a__0x99_pipeline_result = _0x13d_dep_id
                                            const _0x13b_push = Array.prototype.push.call(_0x13c_dep_loop, _0x9a__0x99_pipeline_result)
                                            let _0x9b__0x98_pipeline_result = _0x13b_push
                                            _0x9b__0x98_pipeline_result
                                            const _0x13f_next_chain = _0x79_next_chain
                                            const _0x13e_slice = Array.prototype.slice.call(_0x13f_next_chain)
                                            let _0x9d__0x9c_pipeline_result = _0x13e_slice
                                            _0x9d__0x9c_pipeline_result
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    let _0xa0__0x9e_for_chain_dep_id__index = 0
                                                    _0xa0__0x9e_for_chain_dep_id__index
                                                    const _0x141__0x9c_pipeline_result = _0x9d__0x9c_pipeline_result
                                                    const _0x140_reverse = Array.prototype.reverse.call(_0x141__0x9c_pipeline_result)
                                                    let _0xa2__0xa1_pipeline_result = _0x140_reverse
                                                    let _0xa3__0x9f_for_chain_dep_id__list = _0xa2__0xa1_pipeline_result
                                                    _0xa3__0x9f_for_chain_dep_id__list
                                                    while(true) {
                                                        const _0x143__0x9e_for_chain_dep_id__index = _0xa0__0x9e_for_chain_dep_id__index
                                                        let _0xa6__0xa5_pipeline_result = _0x143__0x9e_for_chain_dep_id__index
                                                        const _0x145__0x9f_for_chain_dep_id__list = _0xa3__0x9f_for_chain_dep_id__list
                                                        const _0x144_length = (_0x145__0x9f_for_chain_dep_id__list.length)
                                                        let _0xa8__0xa7_pipeline_result = _0x144_length
                                                        const _0x142_asc = (_0xa6__0xa5_pipeline_result < _0xa8__0xa7_pipeline_result)
                                                        let _0xa9__0xa4_pipeline_result = _0x142_asc
                                                        if (!_0xa9__0xa4_pipeline_result) { break; }
                                                        {
                                                            const parent_scope = scope
                                                            {
                                                                const scope = _67lang.scope(parent_scope)
                                                                const _0x147__0x9f_for_chain_dep_id__list = _0xa3__0x9f_for_chain_dep_id__list
                                                                const _0x148__0x9e_for_chain_dep_id__index = _0xa0__0x9e_for_chain_dep_id__index
                                                                let _0xac__0xab_pipeline_result = _0x148__0x9e_for_chain_dep_id__index
                                                                const _0x146__hash_ = _0x147__0x9f_for_chain_dep_id__list[_0xac__0xab_pipeline_result]
                                                                let _0xad__0xaa_pipeline_result = _0x146__hash_
                                                                let _0xae_chain_dep_id = _0xad__0xaa_pipeline_result
                                                                _0xae_chain_dep_id
                                                                const _0x14b__0x9e_for_chain_dep_id__index = _0xa0__0x9e_for_chain_dep_id__index
                                                                const _0x14a_add = (_0x14b__0x9e_for_chain_dep_id__index + 1)
                                                                let _0xb1__0xb0_pipeline_result = _0x14a_add
                                                                const _0x149__0x9e_for_chain_dep_id__index = (_0xa0__0x9e_for_chain_dep_id__index = _0xb1__0xb0_pipeline_result)
                                                                let _0xb2__0xaf_pipeline_result = _0x149__0x9e_for_chain_dep_id__index
                                                                _0xb2__0xaf_pipeline_result
                                                                const _0x14d_dep_loop = _0x97_dep_loop
                                                                const _0x14e_chain_dep_id = _0xae_chain_dep_id
                                                                let _0xb5__0xb4_pipeline_result = _0x14e_chain_dep_id
                                                                const _0x14c_push = Array.prototype.push.call(_0x14d_dep_loop, _0xb5__0xb4_pipeline_result)
                                                                let _0xb6__0xb3_pipeline_result = _0x14c_push
                                                                _0xb6__0xb3_pipeline_result
                                                                const _0x150_chain_dep_id = _0xae_chain_dep_id
                                                                let _0xb9__0xb8_pipeline_result = _0x150_chain_dep_id
                                                                const _0x151_dep_id = _0x8e_dep_id
                                                                let _0xbb__0xba_pipeline_result = _0x151_dep_id
                                                                const _0x14f_eq = (_0xb9__0xb8_pipeline_result === _0xbb__0xba_pipeline_result)
                                                                let _0xbc__0xb7_pipeline_result = _0x14f_eq
                                                                if (_0xbc__0xb7_pipeline_result)
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
                                            const _0x153_dep_loop = _0x97_dep_loop
                                            const _0x152_reverse = Array.prototype.reverse.call(_0x153_dep_loop)
                                            let _0xbe__0xbd_pipeline_result = _0x152_reverse
                                            _0xbe__0xbd_pipeline_result
                                            const _0x156_unroller = _0x6c_unroller
                                            const _0x155_dep_loops = await _67lang.maybe_await((_0x156_unroller.dep_loops))
                                            let _0xc1__0xc0_pipeline_result = _0x155_dep_loops
                                            const _0x158_dep_loop = _0x97_dep_loop
                                            const _0x157_join = Array.prototype.join.call(_0x158_dep_loop, " → ")
                                            let _0xc3__0xc2_pipeline_result = _0x157_join
                                            const _0x154_push = Array.prototype.push.call(_0xc1__0xc0_pipeline_result, _0xc3__0xc2_pipeline_result)
                                            let _0xc4__0xbf_pipeline_result = _0x154_push
                                            _0xc4__0xbf_pipeline_result
                                        }
                                    } 
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x15a_unroller = _0x6c_unroller
                                            let _0xc7__0xc6_pipeline_result = _0x15a_unroller
                                            const _0x15d_unroller = _0x6c_unroller
                                            const _0x15c_modules = await _67lang.maybe_await((_0x15d_unroller.modules))
                                            let _0xca__0xc9_pipeline_result = _0x15c_modules
                                            const _0x15e_dep_id = _0x8e_dep_id
                                            let _0xcc__0xcb_pipeline_result = _0x15e_dep_id
                                            const _0x15b__hash_ = _0xca__0xc9_pipeline_result[_0xcc__0xcb_pipeline_result]
                                            let _0xcd__0xc8_pipeline_result = _0x15b__hash_
                                            const _0x15f_next_chain = _0x79_next_chain
                                            let _0xcf__0xce_pipeline_result = _0x15f_next_chain
                                            const _0x159_visit = await _67lang.maybe_await(_0x69_visit(_0xc7__0xc6_pipeline_result, _0xcd__0xc8_pipeline_result, _0xcf__0xce_pipeline_result))
                                            let _0xd0__0xc5_pipeline_result = _0x159_visit
                                            _0xd0__0xc5_pipeline_result
                                        }
                                    } 
                                }
                            } }
                    }
                } 
                const _0x162_unroller = _0x6c_unroller
                const _0x161_build_order = await _67lang.maybe_await((_0x162_unroller.build_order))
                let _0xd3__0xd2_pipeline_result = _0x161_build_order
                const _0x164_module = _0x6b_module
                const _0x163_id = await _67lang.maybe_await((_0x164_module.id))
                let _0xd5__0xd4_pipeline_result = _0x163_id
                const _0x160_push = Array.prototype.push.call(_0xd3__0xd2_pipeline_result, _0xd5__0xd4_pipeline_result)
                let _0xd6__0xd1_pipeline_result = _0x160_push
                _0xd6__0xd1_pipeline_result
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)











        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            const _0x165_stdin = await (_67lang.stdin())
            let _0x2f__0x2e_pipeline_result = _0x165_stdin
            let _0x30_lines = _0x2f__0x2e_pipeline_result
            _0x30_lines
            const _0x167_lines = _0x30_lines
            const _0x166_split = String.prototype.split.call(_0x167_lines, "\n")
            let _0x32__0x31_pipeline_result = _0x166_split
            let _0x33_lines = _0x32__0x31_pipeline_result
            _0x33_lines
            let _0x34_modules = {}
            _0x34_modules
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x37__0x35_for_line__index = 0
                    _0x37__0x35_for_line__index
                    const _0x168_lines = _0x33_lines
                    let _0x39__0x38_pipeline_result = _0x168_lines
                    let _0x3a__0x36_for_line__list = _0x39__0x38_pipeline_result
                    _0x3a__0x36_for_line__list
                    while(true) {
                        const _0x16a__0x35_for_line__index = _0x37__0x35_for_line__index
                        let _0x3d__0x3c_pipeline_result = _0x16a__0x35_for_line__index
                        const _0x16c__0x36_for_line__list = _0x3a__0x36_for_line__list
                        const _0x16b_length = (_0x16c__0x36_for_line__list.length)
                        let _0x3f__0x3e_pipeline_result = _0x16b_length
                        const _0x169_asc = (_0x3d__0x3c_pipeline_result < _0x3f__0x3e_pipeline_result)
                        let _0x40__0x3b_pipeline_result = _0x169_asc
                        if (!_0x40__0x3b_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x16e__0x36_for_line__list = _0x3a__0x36_for_line__list
                                const _0x16f__0x35_for_line__index = _0x37__0x35_for_line__index
                                let _0x43__0x42_pipeline_result = _0x16f__0x35_for_line__index
                                const _0x16d__hash_ = _0x16e__0x36_for_line__list[_0x43__0x42_pipeline_result]
                                let _0x44__0x41_pipeline_result = _0x16d__hash_
                                let _0x45_line = _0x44__0x41_pipeline_result
                                _0x45_line
                                const _0x172__0x35_for_line__index = _0x37__0x35_for_line__index
                                const _0x171_add = (_0x172__0x35_for_line__index + 1)
                                let _0x48__0x47_pipeline_result = _0x171_add
                                const _0x170__0x35_for_line__index = (_0x37__0x35_for_line__index = _0x48__0x47_pipeline_result)
                                let _0x49__0x46_pipeline_result = _0x170__0x35_for_line__index
                                _0x49__0x46_pipeline_result
                                const _0x174_line = _0x45_line
                                const _0x173_split = String.prototype.split.call(_0x174_line, ":", 2)
                                let _0x4b__0x4a_pipeline_result = _0x173_split
                                let _0x4c_kv = _0x4b__0x4a_pipeline_result
                                _0x4c_kv
                                const _0x176_kv = _0x4c_kv
                                const _0x175__hash_ = _0x176_kv[0]
                                let _0x4e__0x4d_pipeline_result = _0x175__hash_
                                _0x4e__0x4d_pipeline_result
                                const _0x178__0x4d_pipeline_result = _0x4e__0x4d_pipeline_result
                                const _0x177_trim = String.prototype.trim.call(_0x178__0x4d_pipeline_result)
                                let _0x4f_id = _0x177_trim
                                _0x4f_id
                                const _0x17a_id = _0x4f_id
                                let _0x52__0x51_pipeline_result = _0x17a_id
                                const _0x179_Module = await _67lang.maybe_await((new _0x108_Module(_0x52__0x51_pipeline_result, [], false)))
                                let _0x53__0x50_pipeline_result = _0x179_Module
                                let _0x54_module = _0x53__0x50_pipeline_result
                                _0x54_module
                                const _0x17c_kv = _0x4c_kv
                                const _0x17b__hash_ = _0x17c_kv[1]
                                let _0x56__0x55_pipeline_result = _0x17b__hash_
                                _0x56__0x55_pipeline_result
                                const _0x17e__0x55_pipeline_result = _0x56__0x55_pipeline_result
                                const _0x17d_trim = String.prototype.trim.call(_0x17e__0x55_pipeline_result)
                                let _0x57_deps_str = _0x17d_trim
                                _0x57_deps_str

                                const _0x181_deps_str = _0x57_deps_str
                                const _0x180_eq = (_0x181_deps_str === "")
                                let _0x5a__0x59_pipeline_result = _0x180_eq
                                const _0x17f_none = !(_0x5a__0x59_pipeline_result)
                                let _0x5b__0x58_pipeline_result = _0x17f_none
                                if (_0x5b__0x58_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x183_deps_str = _0x57_deps_str
                                        const _0x182_trim = String.prototype.trim.call(_0x183_deps_str)
                                        let _0x5d__0x5c_pipeline_result = _0x182_trim
                                        _0x5d__0x5c_pipeline_result
                                        const _0x185__0x5c_pipeline_result = _0x5d__0x5c_pipeline_result
                                        const _0x184_split = String.prototype.split.call(_0x185__0x5c_pipeline_result, /\s+/)
                                        let _0x5e_deps = _0x184_split
                                        _0x5e_deps
                                        const _0x187_module = _0x54_module
                                        const _0x188_deps = _0x5e_deps
                                        let _0x61__0x60_pipeline_result = _0x188_deps
                                        const _0x186_deps = await _67lang.maybe_await((_0x187_module.deps = (_0x61__0x60_pipeline_result)))
                                        let _0x62__0x5f_pipeline_result = _0x186_deps
                                        _0x62__0x5f_pipeline_result
                                    }
                                } 
                                const _0x18a_modules = _0x34_modules
                                const _0x18c_module = _0x54_module
                                const _0x18b_id = await _67lang.maybe_await((_0x18c_module.id))
                                let _0x65__0x64_pipeline_result = _0x18b_id
                                const _0x18d_module = _0x54_module
                                let _0x67__0x66_pipeline_result = _0x18d_module
                                const _0x189__hash_ = (_0x18a_modules[_0x65__0x64_pipeline_result] = _0x67__0x66_pipeline_result)
                                let _0x68__0x63_pipeline_result = _0x189__hash_
                                _0x68__0x63_pipeline_result
                            }
                        } }
                }
            } 




            const _0x18f_modules = _0x34_modules
            let _0xd9__0xd8_pipeline_result = _0x18f_modules
            const _0x18e_DAG_unroller = await _67lang.maybe_await((new _0x107_DAG_unroller([], [], _0xd9__0xd8_pipeline_result)))
            let _0xda__0xd7_pipeline_result = _0x18e_DAG_unroller
            let _0xdb_unroller = _0xda__0xd7_pipeline_result
            _0xdb_unroller
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xde__0xdc_for_module__index = 0
                    _0xde__0xdc_for_module__index
                    const _0x191_modules = _0x34_modules
                    const _0x190_values = await _67lang.maybe_await(Object.values(_0x191_modules))
                    let _0xe0__0xdf_pipeline_result = _0x190_values
                    let _0xe1__0xdd_for_module__list = _0xe0__0xdf_pipeline_result
                    _0xe1__0xdd_for_module__list
                    while(true) {
                        const _0x193__0xdc_for_module__index = _0xde__0xdc_for_module__index
                        let _0xe4__0xe3_pipeline_result = _0x193__0xdc_for_module__index
                        const _0x195__0xdd_for_module__list = _0xe1__0xdd_for_module__list
                        const _0x194_length = (_0x195__0xdd_for_module__list.length)
                        let _0xe6__0xe5_pipeline_result = _0x194_length
                        const _0x192_asc = (_0xe4__0xe3_pipeline_result < _0xe6__0xe5_pipeline_result)
                        let _0xe7__0xe2_pipeline_result = _0x192_asc
                        if (!_0xe7__0xe2_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x197__0xdd_for_module__list = _0xe1__0xdd_for_module__list
                                const _0x198__0xdc_for_module__index = _0xde__0xdc_for_module__index
                                let _0xea__0xe9_pipeline_result = _0x198__0xdc_for_module__index
                                const _0x196__hash_ = _0x197__0xdd_for_module__list[_0xea__0xe9_pipeline_result]
                                let _0xeb__0xe8_pipeline_result = _0x196__hash_
                                let _0xec_module = _0xeb__0xe8_pipeline_result
                                _0xec_module
                                const _0x19b__0xdc_for_module__index = _0xde__0xdc_for_module__index
                                const _0x19a_add = (_0x19b__0xdc_for_module__index + 1)
                                let _0xef__0xee_pipeline_result = _0x19a_add
                                const _0x199__0xdc_for_module__index = (_0xde__0xdc_for_module__index = _0xef__0xee_pipeline_result)
                                let _0xf0__0xed_pipeline_result = _0x199__0xdc_for_module__index
                                _0xf0__0xed_pipeline_result
                                const _0x19d_unroller = _0xdb_unroller
                                let _0xf3__0xf2_pipeline_result = _0x19d_unroller
                                const _0x19e_module = _0xec_module
                                let _0xf5__0xf4_pipeline_result = _0x19e_module
                                const _0x19c_visit = await _67lang.maybe_await(_0x69_visit(_0xf3__0xf2_pipeline_result, _0xf5__0xf4_pipeline_result, []))
                                let _0xf6__0xf1_pipeline_result = _0x19c_visit
                                _0xf6__0xf1_pipeline_result
                            }
                        } }
                }
            } 
            const _0x19f_unroller = _0xdb_unroller
            let _0xf8__0xf7_pipeline_result = _0x19f_unroller
            _0xf8__0xf7_pipeline_result
            const _0x1a3__0xf7_pipeline_result = _0xf8__0xf7_pipeline_result
            const _0x1a2_dep_loops = await _67lang.maybe_await((_0x1a3__0xf7_pipeline_result.dep_loops))
            const _0x1a1_length = (_0x1a2_dep_loops.length)
            let _0xfb__0xfa_pipeline_result = _0x1a1_length
            const _0x1a0_nondesc = (1 <= _0xfb__0xfa_pipeline_result)
            let _0xfc__0xf9_pipeline_result = _0x1a0_nondesc
            if (_0xfc__0xf9_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x1a8__0xf7_pipeline_result = _0xf8__0xf7_pipeline_result
                    const _0x1a7_dep_loops = await _67lang.maybe_await((_0x1a8__0xf7_pipeline_result.dep_loops))
                    const _0x1a6_join = Array.prototype.join.call(_0x1a7_dep_loops, "\n")
                    let _0x100__0xff_pipeline_result = _0x1a6_join
                    const _0x1a5_concat = ("ERROR: there are dependency loops.\n" + _0x100__0xff_pipeline_result)
                    let _0x101__0xfe_pipeline_result = _0x1a5_concat
                    const _0x1a4_print = await _67lang.maybe_await(console.log(_0x101__0xfe_pipeline_result))
                    let _0x102__0xfd_pipeline_result = _0x1a4_print
                    _0x102__0xfd_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x1ac__0xf7_pipeline_result = _0xf8__0xf7_pipeline_result
                    const _0x1ab_build_order = await _67lang.maybe_await((_0x1ac__0xf7_pipeline_result.build_order))
                    const _0x1aa_join = Array.prototype.join.call(_0x1ab_build_order, "\n")
                    let _0x105__0x104_pipeline_result = _0x1aa_join
                    const _0x1a9_print = await _67lang.maybe_await(console.log(_0x105__0x104_pipeline_result))
                    let _0x106__0x103_pipeline_result = _0x1a9_print
                    _0x106__0x103_pipeline_result
                }
            } 
        }
    } 
})();
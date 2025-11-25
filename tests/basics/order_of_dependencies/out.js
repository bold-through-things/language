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
        // need this since semantics differ here
        // (we are remapping `...args` to first)
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


function _0x117_DAG_unroller(dep_loops, build_order, modules) {
    this.dep_loops = dep_loops;
    this.build_order = build_order;
    this.modules = modules;
}


function _0x118_Module(id, deps, visited) {
    this.id = id;
    this.deps = deps;
    this.visited = visited;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x79_visit = async function (
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
                let _0x7a_chain = chain
                _0x7a_chain
                let _0x7b_module = module
                _0x7b_module
                let _0x7c_unroller = unroller
                _0x7c_unroller
                const _0x130_module = _0x7b_module
                const _0x12f_visited = await _67lang.maybe_await((_0x130_module.visited))
                let _0x7e__0x7d_pipeline_result = _0x12f_visited
                if (_0x7e__0x7d_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        return;
                    }
                } 
                const _0x132_module = _0x7b_module
                const _0x131_visited = await _67lang.maybe_await((_0x132_module.visited = (true)))
                let _0x80__0x7f_pipeline_result = _0x131_visited
                _0x80__0x7f_pipeline_result
                if (false)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)

                        const _0x134_chain = _0x7a_chain
                        const _0x133_slice = Array.prototype.slice.call(_0x134_chain)
                        let _0x82__0x81_pipeline_result = _0x133_slice
                        _0x82__0x81_pipeline_result
                        const _0x136__0x81_pipeline_result = _0x82__0x81_pipeline_result
                        const _0x138_module = _0x7b_module
                        const _0x137_id = await _67lang.maybe_await((_0x138_module.id))
                        let _0x85__0x84_pipeline_result = _0x137_id
                        const _0x135_push = Array.prototype.push.call(_0x136__0x81_pipeline_result, _0x85__0x84_pipeline_result)
                        let _0x86__0x83_pipeline_result = _0x135_push
                        _0x86__0x83_pipeline_result
                    }
                } 

                const _0x13a_chain = _0x7a_chain
                const _0x139_slice = Array.prototype.slice.call(_0x13a_chain)
                let _0x88__0x87_pipeline_result = _0x139_slice
                let _0x89_next_chain = _0x88__0x87_pipeline_result
                _0x89_next_chain
                const _0x13c_next_chain = _0x89_next_chain
                const _0x13e_module = _0x7b_module
                const _0x13d_id = await _67lang.maybe_await((_0x13e_module.id))
                let _0x8c__0x8b_pipeline_result = _0x13d_id
                const _0x13b_push = Array.prototype.push.call(_0x13c_next_chain, _0x8c__0x8b_pipeline_result)
                let _0x8d__0x8a_pipeline_result = _0x13b_push
                _0x8d__0x8a_pipeline_result
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x90__0x8e_for_dep_id__index = 0
                        _0x90__0x8e_for_dep_id__index
                        const _0x140_module = _0x7b_module
                        const _0x13f_deps = await _67lang.maybe_await((_0x140_module.deps))
                        let _0x92__0x91_pipeline_result = _0x13f_deps
                        let _0x93__0x8f_for_dep_id__list = _0x92__0x91_pipeline_result
                        _0x93__0x8f_for_dep_id__list
                        while(true) {
                            const _0x142__0x8e_for_dep_id__index = _0x90__0x8e_for_dep_id__index
                            let _0x96__0x95_pipeline_result = _0x142__0x8e_for_dep_id__index
                            const _0x144__0x8f_for_dep_id__list = _0x93__0x8f_for_dep_id__list
                            const _0x143_length = (_0x144__0x8f_for_dep_id__list.length)
                            let _0x98__0x97_pipeline_result = _0x143_length
                            const _0x141_asc = (_0x96__0x95_pipeline_result < _0x98__0x97_pipeline_result)
                            let _0x99__0x94_pipeline_result = _0x141_asc
                            if (!_0x99__0x94_pipeline_result) { break; }
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x146__0x8f_for_dep_id__list = _0x93__0x8f_for_dep_id__list
                                    const _0x147__0x8e_for_dep_id__index = _0x90__0x8e_for_dep_id__index
                                    let _0x9c__0x9b_pipeline_result = _0x147__0x8e_for_dep_id__index
                                    const _0x145__hash_ = _0x146__0x8f_for_dep_id__list[_0x9c__0x9b_pipeline_result]
                                    let _0x9d__0x9a_pipeline_result = _0x145__hash_
                                    let _0x9e_dep_id = _0x9d__0x9a_pipeline_result
                                    _0x9e_dep_id
                                    const _0x14a__0x8e_for_dep_id__index = _0x90__0x8e_for_dep_id__index
                                    const _0x149_add = (_0x14a__0x8e_for_dep_id__index + 1)
                                    let _0xa1__0xa0_pipeline_result = _0x149_add
                                    const _0x148__0x8e_for_dep_id__index = (_0x90__0x8e_for_dep_id__index = _0xa1__0xa0_pipeline_result)
                                    let _0xa2__0x9f_pipeline_result = _0x148__0x8e_for_dep_id__index
                                    _0xa2__0x9f_pipeline_result
                                    const _0x14b_next_chain = _0x89_next_chain
                                    let _0xa6__0xa5_pipeline_result = _0x14b_next_chain
                                    const _0x14c_dep_id = _0x9e_dep_id
                                    let _0xa4__0xa3_pipeline_result = _0x14c_dep_id
                                    const _0x14d_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0xa6__0xa5_pipeline_result, _0xa4__0xa3_pipeline_result)
                                    if (_0x14d_await__67lang_dot_exists_inside_lp_)
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0xa7_dep_loop = []
                                            _0xa7_dep_loop
                                            const _0x14f_dep_loop = _0xa7_dep_loop
                                            const _0x150_dep_id = _0x9e_dep_id
                                            let _0xaa__0xa9_pipeline_result = _0x150_dep_id
                                            const _0x14e_push = Array.prototype.push.call(_0x14f_dep_loop, _0xaa__0xa9_pipeline_result)
                                            let _0xab__0xa8_pipeline_result = _0x14e_push
                                            _0xab__0xa8_pipeline_result
                                            const _0x152_next_chain = _0x89_next_chain
                                            const _0x151_slice = Array.prototype.slice.call(_0x152_next_chain)
                                            let _0xad__0xac_pipeline_result = _0x151_slice
                                            _0xad__0xac_pipeline_result
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    let _0xb0__0xae_for_chain_dep_id__index = 0
                                                    _0xb0__0xae_for_chain_dep_id__index
                                                    const _0x154__0xac_pipeline_result = _0xad__0xac_pipeline_result
                                                    const _0x153_reverse = Array.prototype.reverse.call(_0x154__0xac_pipeline_result)
                                                    let _0xb2__0xb1_pipeline_result = _0x153_reverse
                                                    let _0xb3__0xaf_for_chain_dep_id__list = _0xb2__0xb1_pipeline_result
                                                    _0xb3__0xaf_for_chain_dep_id__list
                                                    while(true) {
                                                        const _0x156__0xae_for_chain_dep_id__index = _0xb0__0xae_for_chain_dep_id__index
                                                        let _0xb6__0xb5_pipeline_result = _0x156__0xae_for_chain_dep_id__index
                                                        const _0x158__0xaf_for_chain_dep_id__list = _0xb3__0xaf_for_chain_dep_id__list
                                                        const _0x157_length = (_0x158__0xaf_for_chain_dep_id__list.length)
                                                        let _0xb8__0xb7_pipeline_result = _0x157_length
                                                        const _0x155_asc = (_0xb6__0xb5_pipeline_result < _0xb8__0xb7_pipeline_result)
                                                        let _0xb9__0xb4_pipeline_result = _0x155_asc
                                                        if (!_0xb9__0xb4_pipeline_result) { break; }
                                                        {
                                                            const parent_scope = scope
                                                            {
                                                                const scope = _67lang.scope(parent_scope)
                                                                const _0x15a__0xaf_for_chain_dep_id__list = _0xb3__0xaf_for_chain_dep_id__list
                                                                const _0x15b__0xae_for_chain_dep_id__index = _0xb0__0xae_for_chain_dep_id__index
                                                                let _0xbc__0xbb_pipeline_result = _0x15b__0xae_for_chain_dep_id__index
                                                                const _0x159__hash_ = _0x15a__0xaf_for_chain_dep_id__list[_0xbc__0xbb_pipeline_result]
                                                                let _0xbd__0xba_pipeline_result = _0x159__hash_
                                                                let _0xbe_chain_dep_id = _0xbd__0xba_pipeline_result
                                                                _0xbe_chain_dep_id
                                                                const _0x15e__0xae_for_chain_dep_id__index = _0xb0__0xae_for_chain_dep_id__index
                                                                const _0x15d_add = (_0x15e__0xae_for_chain_dep_id__index + 1)
                                                                let _0xc1__0xc0_pipeline_result = _0x15d_add
                                                                const _0x15c__0xae_for_chain_dep_id__index = (_0xb0__0xae_for_chain_dep_id__index = _0xc1__0xc0_pipeline_result)
                                                                let _0xc2__0xbf_pipeline_result = _0x15c__0xae_for_chain_dep_id__index
                                                                _0xc2__0xbf_pipeline_result
                                                                const _0x160_dep_loop = _0xa7_dep_loop
                                                                const _0x161_chain_dep_id = _0xbe_chain_dep_id
                                                                let _0xc5__0xc4_pipeline_result = _0x161_chain_dep_id
                                                                const _0x15f_push = Array.prototype.push.call(_0x160_dep_loop, _0xc5__0xc4_pipeline_result)
                                                                let _0xc6__0xc3_pipeline_result = _0x15f_push
                                                                _0xc6__0xc3_pipeline_result
                                                                const _0x163_chain_dep_id = _0xbe_chain_dep_id
                                                                let _0xc9__0xc8_pipeline_result = _0x163_chain_dep_id
                                                                const _0x164_dep_id = _0x9e_dep_id
                                                                let _0xcb__0xca_pipeline_result = _0x164_dep_id
                                                                const _0x162_eq = (_0xc9__0xc8_pipeline_result === _0xcb__0xca_pipeline_result)
                                                                let _0xcc__0xc7_pipeline_result = _0x162_eq
                                                                if (_0xcc__0xc7_pipeline_result)
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
                                            const _0x166_dep_loop = _0xa7_dep_loop
                                            const _0x165_reverse = Array.prototype.reverse.call(_0x166_dep_loop)
                                            let _0xce__0xcd_pipeline_result = _0x165_reverse
                                            _0xce__0xcd_pipeline_result
                                            const _0x169_unroller = _0x7c_unroller
                                            const _0x168_dep_loops = await _67lang.maybe_await((_0x169_unroller.dep_loops))
                                            let _0xd1__0xd0_pipeline_result = _0x168_dep_loops
                                            const _0x16b_dep_loop = _0xa7_dep_loop
                                            const _0x16a_join = Array.prototype.join.call(_0x16b_dep_loop, " → ")
                                            let _0xd3__0xd2_pipeline_result = _0x16a_join
                                            const _0x167_push = Array.prototype.push.call(_0xd1__0xd0_pipeline_result, _0xd3__0xd2_pipeline_result)
                                            let _0xd4__0xcf_pipeline_result = _0x167_push
                                            _0xd4__0xcf_pipeline_result
                                        }
                                    } 
                                    else {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x16d_unroller = _0x7c_unroller
                                            let _0xd7__0xd6_pipeline_result = _0x16d_unroller
                                            const _0x170_unroller = _0x7c_unroller
                                            const _0x16f_modules = await _67lang.maybe_await((_0x170_unroller.modules))
                                            let _0xda__0xd9_pipeline_result = _0x16f_modules
                                            const _0x171_dep_id = _0x9e_dep_id
                                            let _0xdc__0xdb_pipeline_result = _0x171_dep_id
                                            const _0x16e__hash_ = _0xda__0xd9_pipeline_result[_0xdc__0xdb_pipeline_result]
                                            let _0xdd__0xd8_pipeline_result = _0x16e__hash_
                                            const _0x172_next_chain = _0x89_next_chain
                                            let _0xdf__0xde_pipeline_result = _0x172_next_chain
                                            const _0x16c_visit = await _67lang.maybe_await(_0x79_visit(_0xd7__0xd6_pipeline_result, _0xdd__0xd8_pipeline_result, _0xdf__0xde_pipeline_result))
                                            let _0xe0__0xd5_pipeline_result = _0x16c_visit
                                            _0xe0__0xd5_pipeline_result
                                        }
                                    } 
                                }
                            } }
                    }
                } 
                const _0x175_unroller = _0x7c_unroller
                const _0x174_build_order = await _67lang.maybe_await((_0x175_unroller.build_order))
                let _0xe3__0xe2_pipeline_result = _0x174_build_order
                const _0x177_module = _0x7b_module
                const _0x176_id = await _67lang.maybe_await((_0x177_module.id))
                let _0xe5__0xe4_pipeline_result = _0x176_id
                const _0x173_push = Array.prototype.push.call(_0xe3__0xe2_pipeline_result, _0xe5__0xe4_pipeline_result)
                let _0xe6__0xe1_pipeline_result = _0x173_push
                _0xe6__0xe1_pipeline_result
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
            const _0x178_stdin = await (_67lang.stdin())
            let _0x3f__0x3e_pipeline_result = _0x178_stdin
            let _0x40_lines = _0x3f__0x3e_pipeline_result
            _0x40_lines
            const _0x17a_lines = _0x40_lines
            const _0x179_split = String.prototype.split.call(_0x17a_lines, "\n")
            let _0x42__0x41_pipeline_result = _0x179_split
            let _0x43_lines = _0x42__0x41_pipeline_result
            _0x43_lines
            let _0x44_modules = {}
            _0x44_modules
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x47__0x45_for_line__index = 0
                    _0x47__0x45_for_line__index
                    const _0x17b_lines = _0x43_lines
                    let _0x49__0x48_pipeline_result = _0x17b_lines
                    let _0x4a__0x46_for_line__list = _0x49__0x48_pipeline_result
                    _0x4a__0x46_for_line__list
                    while(true) {
                        const _0x17d__0x45_for_line__index = _0x47__0x45_for_line__index
                        let _0x4d__0x4c_pipeline_result = _0x17d__0x45_for_line__index
                        const _0x17f__0x46_for_line__list = _0x4a__0x46_for_line__list
                        const _0x17e_length = (_0x17f__0x46_for_line__list.length)
                        let _0x4f__0x4e_pipeline_result = _0x17e_length
                        const _0x17c_asc = (_0x4d__0x4c_pipeline_result < _0x4f__0x4e_pipeline_result)
                        let _0x50__0x4b_pipeline_result = _0x17c_asc
                        if (!_0x50__0x4b_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x181__0x46_for_line__list = _0x4a__0x46_for_line__list
                                const _0x182__0x45_for_line__index = _0x47__0x45_for_line__index
                                let _0x53__0x52_pipeline_result = _0x182__0x45_for_line__index
                                const _0x180__hash_ = _0x181__0x46_for_line__list[_0x53__0x52_pipeline_result]
                                let _0x54__0x51_pipeline_result = _0x180__hash_
                                let _0x55_line = _0x54__0x51_pipeline_result
                                _0x55_line
                                const _0x185__0x45_for_line__index = _0x47__0x45_for_line__index
                                const _0x184_add = (_0x185__0x45_for_line__index + 1)
                                let _0x58__0x57_pipeline_result = _0x184_add
                                const _0x183__0x45_for_line__index = (_0x47__0x45_for_line__index = _0x58__0x57_pipeline_result)
                                let _0x59__0x56_pipeline_result = _0x183__0x45_for_line__index
                                _0x59__0x56_pipeline_result
                                const _0x187_line = _0x55_line
                                const _0x186_split = String.prototype.split.call(_0x187_line, ":", 2)
                                let _0x5b__0x5a_pipeline_result = _0x186_split
                                let _0x5c_kv = _0x5b__0x5a_pipeline_result
                                _0x5c_kv
                                const _0x189_kv = _0x5c_kv
                                const _0x188__hash_ = _0x189_kv[0]
                                let _0x5e__0x5d_pipeline_result = _0x188__hash_
                                _0x5e__0x5d_pipeline_result
                                const _0x18b__0x5d_pipeline_result = _0x5e__0x5d_pipeline_result
                                const _0x18a_trim = String.prototype.trim.call(_0x18b__0x5d_pipeline_result)
                                let _0x5f_id = _0x18a_trim
                                _0x5f_id
                                const _0x18d_id = _0x5f_id
                                let _0x62__0x61_pipeline_result = _0x18d_id
                                const _0x18c_Module = await _67lang.maybe_await((new _0x118_Module(_0x62__0x61_pipeline_result, [], false)))
                                let _0x63__0x60_pipeline_result = _0x18c_Module
                                let _0x64_module = _0x63__0x60_pipeline_result
                                _0x64_module
                                const _0x18f_kv = _0x5c_kv
                                const _0x18e__hash_ = _0x18f_kv[1]
                                let _0x66__0x65_pipeline_result = _0x18e__hash_
                                _0x66__0x65_pipeline_result
                                const _0x191__0x65_pipeline_result = _0x66__0x65_pipeline_result
                                const _0x190_trim = String.prototype.trim.call(_0x191__0x65_pipeline_result)
                                let _0x67_deps_str = _0x190_trim
                                _0x67_deps_str

                                const _0x194_deps_str = _0x67_deps_str
                                const _0x193_eq = (_0x194_deps_str === "")
                                let _0x6a__0x69_pipeline_result = _0x193_eq
                                const _0x192_none = !(_0x6a__0x69_pipeline_result)
                                let _0x6b__0x68_pipeline_result = _0x192_none
                                if (_0x6b__0x68_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x196_deps_str = _0x67_deps_str
                                        const _0x195_trim = String.prototype.trim.call(_0x196_deps_str)
                                        let _0x6d__0x6c_pipeline_result = _0x195_trim
                                        _0x6d__0x6c_pipeline_result
                                        const _0x198__0x6c_pipeline_result = _0x6d__0x6c_pipeline_result
                                        const _0x197_split = String.prototype.split.call(_0x198__0x6c_pipeline_result, /\s+/)
                                        let _0x6e_deps = _0x197_split
                                        _0x6e_deps
                                        const _0x19a_module = _0x64_module
                                        const _0x19b_deps = _0x6e_deps
                                        let _0x71__0x70_pipeline_result = _0x19b_deps
                                        const _0x199_deps = await _67lang.maybe_await((_0x19a_module.deps = (_0x71__0x70_pipeline_result)))
                                        let _0x72__0x6f_pipeline_result = _0x199_deps
                                        _0x72__0x6f_pipeline_result
                                    }
                                } 
                                const _0x19d_modules = _0x44_modules
                                const _0x19f_module = _0x64_module
                                const _0x19e_id = await _67lang.maybe_await((_0x19f_module.id))
                                let _0x75__0x74_pipeline_result = _0x19e_id
                                const _0x1a0_module = _0x64_module
                                let _0x77__0x76_pipeline_result = _0x1a0_module
                                const _0x19c__hash_ = (_0x19d_modules[_0x75__0x74_pipeline_result] = _0x77__0x76_pipeline_result)
                                let _0x78__0x73_pipeline_result = _0x19c__hash_
                                _0x78__0x73_pipeline_result
                            }
                        } }
                }
            } 




            const _0x1a2_modules = _0x44_modules
            let _0xe9__0xe8_pipeline_result = _0x1a2_modules
            const _0x1a1_DAG_unroller = await _67lang.maybe_await((new _0x117_DAG_unroller([], [], _0xe9__0xe8_pipeline_result)))
            let _0xea__0xe7_pipeline_result = _0x1a1_DAG_unroller
            let _0xeb_unroller = _0xea__0xe7_pipeline_result
            _0xeb_unroller
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xee__0xec_for_module__index = 0
                    _0xee__0xec_for_module__index
                    const _0x1a4_modules = _0x44_modules
                    const _0x1a3_values = Object.values(_0x1a4_modules)
                    let _0xf0__0xef_pipeline_result = _0x1a3_values
                    let _0xf1__0xed_for_module__list = _0xf0__0xef_pipeline_result
                    _0xf1__0xed_for_module__list
                    while(true) {
                        const _0x1a6__0xec_for_module__index = _0xee__0xec_for_module__index
                        let _0xf4__0xf3_pipeline_result = _0x1a6__0xec_for_module__index
                        const _0x1a8__0xed_for_module__list = _0xf1__0xed_for_module__list
                        const _0x1a7_length = (_0x1a8__0xed_for_module__list.length)
                        let _0xf6__0xf5_pipeline_result = _0x1a7_length
                        const _0x1a5_asc = (_0xf4__0xf3_pipeline_result < _0xf6__0xf5_pipeline_result)
                        let _0xf7__0xf2_pipeline_result = _0x1a5_asc
                        if (!_0xf7__0xf2_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x1aa__0xed_for_module__list = _0xf1__0xed_for_module__list
                                const _0x1ab__0xec_for_module__index = _0xee__0xec_for_module__index
                                let _0xfa__0xf9_pipeline_result = _0x1ab__0xec_for_module__index
                                const _0x1a9__hash_ = _0x1aa__0xed_for_module__list[_0xfa__0xf9_pipeline_result]
                                let _0xfb__0xf8_pipeline_result = _0x1a9__hash_
                                let _0xfc_module = _0xfb__0xf8_pipeline_result
                                _0xfc_module
                                const _0x1ae__0xec_for_module__index = _0xee__0xec_for_module__index
                                const _0x1ad_add = (_0x1ae__0xec_for_module__index + 1)
                                let _0xff__0xfe_pipeline_result = _0x1ad_add
                                const _0x1ac__0xec_for_module__index = (_0xee__0xec_for_module__index = _0xff__0xfe_pipeline_result)
                                let _0x100__0xfd_pipeline_result = _0x1ac__0xec_for_module__index
                                _0x100__0xfd_pipeline_result
                                const _0x1b0_unroller = _0xeb_unroller
                                let _0x103__0x102_pipeline_result = _0x1b0_unroller
                                const _0x1b1_module = _0xfc_module
                                let _0x105__0x104_pipeline_result = _0x1b1_module
                                const _0x1af_visit = await _67lang.maybe_await(_0x79_visit(_0x103__0x102_pipeline_result, _0x105__0x104_pipeline_result, []))
                                let _0x106__0x101_pipeline_result = _0x1af_visit
                                _0x106__0x101_pipeline_result
                            }
                        } }
                }
            } 
            const _0x1b2_unroller = _0xeb_unroller
            let _0x108__0x107_pipeline_result = _0x1b2_unroller
            _0x108__0x107_pipeline_result
            const _0x1b6__0x107_pipeline_result = _0x108__0x107_pipeline_result
            const _0x1b5_dep_loops = await _67lang.maybe_await((_0x1b6__0x107_pipeline_result.dep_loops))
            const _0x1b4_length = (_0x1b5_dep_loops.length)
            let _0x10b__0x10a_pipeline_result = _0x1b4_length
            const _0x1b3_nondesc = (1 <= _0x10b__0x10a_pipeline_result)
            let _0x10c__0x109_pipeline_result = _0x1b3_nondesc
            if (_0x10c__0x109_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x1bb__0x107_pipeline_result = _0x108__0x107_pipeline_result
                    const _0x1ba_dep_loops = await _67lang.maybe_await((_0x1bb__0x107_pipeline_result.dep_loops))
                    const _0x1b9_join = Array.prototype.join.call(_0x1ba_dep_loops, "\n")
                    let _0x110__0x10f_pipeline_result = _0x1b9_join
                    const _0x1b8_concat = ("ERROR: there are dependency loops.\n" + _0x110__0x10f_pipeline_result)
                    let _0x111__0x10e_pipeline_result = _0x1b8_concat
                    const _0x1b7_print = await _67lang.maybe_await(console.log(_0x111__0x10e_pipeline_result))
                    let _0x112__0x10d_pipeline_result = _0x1b7_print
                    _0x112__0x10d_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x1bf__0x107_pipeline_result = _0x108__0x107_pipeline_result
                    const _0x1be_build_order = await _67lang.maybe_await((_0x1bf__0x107_pipeline_result.build_order))
                    const _0x1bd_join = Array.prototype.join.call(_0x1be_build_order, "\n")
                    let _0x115__0x114_pipeline_result = _0x1bd_join
                    const _0x1bc_print = await _67lang.maybe_await(console.log(_0x115__0x114_pipeline_result))
                    let _0x116__0x113_pipeline_result = _0x1bc_print
                    _0x116__0x113_pipeline_result
                }
            } 
        }
    } 
})();
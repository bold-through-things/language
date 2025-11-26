globalThis._67lang = {
    EXISTS_INSIDE_AS_KEY: Symbol("EXISTS_INSIDE_AS_KEY"),
    EXISTS_INSIDE_AS_VALUE: Symbol("EXISTS_INSIDE_AS_VALUE"),
    exists_inside: (inside, k_or_v, ...arr) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (v) => Number.isInteger(v) && v >= 0 && v < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => v in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_KEY, ...values),
    has_values: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_VALUE, ...values),

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


function _0x119_DAG_unroller(dep_loops, build_order, modules) {
    this.dep_loops = dep_loops;
    this.build_order = build_order;
    this.modules = modules;
}


function _0x11a_Module(id, deps, visited) {
    this.id = id;
    this.deps = deps;
    this.visited = visited;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x7b_visit = async function (
        unroller,
        module,
        chain
    ) {{
            let _0x7c_chain = chain
            _0x7c_chain
            let _0x7d_module = module
            _0x7d_module
            let _0x7e_unroller = unroller
            _0x7e_unroller
            const _0x135_module = _0x7d_module
            const _0x134_visited = await _67lang.maybe_await((_0x135_module.visited))
            let _0x80__0x7f_pipeline_result = _0x134_visited
            if (_0x80__0x7f_pipeline_result)
            {
                return;
            } 
            const _0x137_module = _0x7d_module
            const _0x136_visited = await _67lang.maybe_await((_0x137_module.visited = (true)))
            let _0x82__0x81_pipeline_result = _0x136_visited
            _0x82__0x81_pipeline_result
            if (false)
            {

                const _0x139_chain = _0x7c_chain
                const _0x138_slice = Array.prototype.slice.call(_0x139_chain)
                let _0x84__0x83_pipeline_result = _0x138_slice
                _0x84__0x83_pipeline_result
                const _0x13b__0x83_pipeline_result = _0x84__0x83_pipeline_result
                const _0x13d_module = _0x7d_module
                const _0x13c_id = await _67lang.maybe_await((_0x13d_module.id))
                let _0x87__0x86_pipeline_result = _0x13c_id
                const _0x13a_push = Array.prototype.push.call(_0x13b__0x83_pipeline_result, _0x87__0x86_pipeline_result)
                let _0x88__0x85_pipeline_result = _0x13a_push
                _0x88__0x85_pipeline_result
            } 

            const _0x13f_chain = _0x7c_chain
            const _0x13e_slice = Array.prototype.slice.call(_0x13f_chain)
            let _0x8a__0x89_pipeline_result = _0x13e_slice
            let _0x8b_next_chain = _0x8a__0x89_pipeline_result
            _0x8b_next_chain
            const _0x141_next_chain = _0x8b_next_chain
            const _0x143_module = _0x7d_module
            const _0x142_id = await _67lang.maybe_await((_0x143_module.id))
            let _0x8e__0x8d_pipeline_result = _0x142_id
            const _0x140_push = Array.prototype.push.call(_0x141_next_chain, _0x8e__0x8d_pipeline_result)
            let _0x8f__0x8c_pipeline_result = _0x140_push
            _0x8f__0x8c_pipeline_result
            {
                let _0x92__0x90_for_dep_id__index = 0
                _0x92__0x90_for_dep_id__index
                const _0x145_module = _0x7d_module
                const _0x144_deps = await _67lang.maybe_await((_0x145_module.deps))
                let _0x94__0x93_pipeline_result = _0x144_deps
                let _0x95__0x91_for_dep_id__list = _0x94__0x93_pipeline_result
                _0x95__0x91_for_dep_id__list
                while(true) {
                    const _0x147__0x90_for_dep_id__index = _0x92__0x90_for_dep_id__index
                    let _0x98__0x97_pipeline_result = _0x147__0x90_for_dep_id__index
                    const _0x149__0x91_for_dep_id__list = _0x95__0x91_for_dep_id__list
                    const _0x148_length = (_0x149__0x91_for_dep_id__list.length)
                    let _0x9a__0x99_pipeline_result = _0x148_length
                    const _0x146_asc = (_0x98__0x97_pipeline_result < _0x9a__0x99_pipeline_result)
                    let _0x9b__0x96_pipeline_result = _0x146_asc
                    if (!_0x9b__0x96_pipeline_result) { break; }
                    {
                        const _0x14b__0x91_for_dep_id__list = _0x95__0x91_for_dep_id__list
                        const _0x14c__0x90_for_dep_id__index = _0x92__0x90_for_dep_id__index
                        let _0x9e__0x9d_pipeline_result = _0x14c__0x90_for_dep_id__index
                        const _0x14a__hash_ = _0x14b__0x91_for_dep_id__list[_0x9e__0x9d_pipeline_result]
                        let _0x9f__0x9c_pipeline_result = _0x14a__hash_
                        let _0xa0_dep_id = _0x9f__0x9c_pipeline_result
                        _0xa0_dep_id
                        const _0x14f__0x90_for_dep_id__index = _0x92__0x90_for_dep_id__index
                        const _0x14e_add = (_0x14f__0x90_for_dep_id__index + 1)
                        let _0xa3__0xa2_pipeline_result = _0x14e_add
                        const _0x14d__0x90_for_dep_id__index = (_0x92__0x90_for_dep_id__index = _0xa3__0xa2_pipeline_result)
                        let _0xa4__0xa1_pipeline_result = _0x14d__0x90_for_dep_id__index
                        _0xa4__0xa1_pipeline_result
                        const _0x151_next_chain = _0x8b_next_chain
                        const _0x152_dep_id = _0xa0_dep_id
                        let _0xa7__0xa6_pipeline_result = _0x152_dep_id
                        const _0x150_has_values = _67lang.has_values(_0x151_next_chain, _0xa7__0xa6_pipeline_result)
                        let _0xa8__0xa5_pipeline_result = _0x150_has_values
                        if (_0xa8__0xa5_pipeline_result)
                        {
                            let _0xa9_dep_loop = []
                            _0xa9_dep_loop
                            const _0x154_dep_loop = _0xa9_dep_loop
                            const _0x155_dep_id = _0xa0_dep_id
                            let _0xac__0xab_pipeline_result = _0x155_dep_id
                            const _0x153_push = Array.prototype.push.call(_0x154_dep_loop, _0xac__0xab_pipeline_result)
                            let _0xad__0xaa_pipeline_result = _0x153_push
                            _0xad__0xaa_pipeline_result
                            const _0x157_next_chain = _0x8b_next_chain
                            const _0x156_slice = Array.prototype.slice.call(_0x157_next_chain)
                            let _0xaf__0xae_pipeline_result = _0x156_slice
                            _0xaf__0xae_pipeline_result
                            {
                                let _0xb2__0xb0_for_chain_dep_id__index = 0
                                _0xb2__0xb0_for_chain_dep_id__index
                                const _0x159__0xae_pipeline_result = _0xaf__0xae_pipeline_result
                                const _0x158_reverse = Array.prototype.reverse.call(_0x159__0xae_pipeline_result)
                                let _0xb4__0xb3_pipeline_result = _0x158_reverse
                                let _0xb5__0xb1_for_chain_dep_id__list = _0xb4__0xb3_pipeline_result
                                _0xb5__0xb1_for_chain_dep_id__list
                                while(true) {
                                    const _0x15b__0xb0_for_chain_dep_id__index = _0xb2__0xb0_for_chain_dep_id__index
                                    let _0xb8__0xb7_pipeline_result = _0x15b__0xb0_for_chain_dep_id__index
                                    const _0x15d__0xb1_for_chain_dep_id__list = _0xb5__0xb1_for_chain_dep_id__list
                                    const _0x15c_length = (_0x15d__0xb1_for_chain_dep_id__list.length)
                                    let _0xba__0xb9_pipeline_result = _0x15c_length
                                    const _0x15a_asc = (_0xb8__0xb7_pipeline_result < _0xba__0xb9_pipeline_result)
                                    let _0xbb__0xb6_pipeline_result = _0x15a_asc
                                    if (!_0xbb__0xb6_pipeline_result) { break; }
                                    {
                                        const _0x15f__0xb1_for_chain_dep_id__list = _0xb5__0xb1_for_chain_dep_id__list
                                        const _0x160__0xb0_for_chain_dep_id__index = _0xb2__0xb0_for_chain_dep_id__index
                                        let _0xbe__0xbd_pipeline_result = _0x160__0xb0_for_chain_dep_id__index
                                        const _0x15e__hash_ = _0x15f__0xb1_for_chain_dep_id__list[_0xbe__0xbd_pipeline_result]
                                        let _0xbf__0xbc_pipeline_result = _0x15e__hash_
                                        let _0xc0_chain_dep_id = _0xbf__0xbc_pipeline_result
                                        _0xc0_chain_dep_id
                                        const _0x163__0xb0_for_chain_dep_id__index = _0xb2__0xb0_for_chain_dep_id__index
                                        const _0x162_add = (_0x163__0xb0_for_chain_dep_id__index + 1)
                                        let _0xc3__0xc2_pipeline_result = _0x162_add
                                        const _0x161__0xb0_for_chain_dep_id__index = (_0xb2__0xb0_for_chain_dep_id__index = _0xc3__0xc2_pipeline_result)
                                        let _0xc4__0xc1_pipeline_result = _0x161__0xb0_for_chain_dep_id__index
                                        _0xc4__0xc1_pipeline_result
                                        const _0x165_dep_loop = _0xa9_dep_loop
                                        const _0x166_chain_dep_id = _0xc0_chain_dep_id
                                        let _0xc7__0xc6_pipeline_result = _0x166_chain_dep_id
                                        const _0x164_push = Array.prototype.push.call(_0x165_dep_loop, _0xc7__0xc6_pipeline_result)
                                        let _0xc8__0xc5_pipeline_result = _0x164_push
                                        _0xc8__0xc5_pipeline_result
                                        const _0x168_chain_dep_id = _0xc0_chain_dep_id
                                        let _0xcb__0xca_pipeline_result = _0x168_chain_dep_id
                                        const _0x169_dep_id = _0xa0_dep_id
                                        let _0xcd__0xcc_pipeline_result = _0x169_dep_id
                                        const _0x167_eq = (_0xcb__0xca_pipeline_result === _0xcd__0xcc_pipeline_result)
                                        let _0xce__0xc9_pipeline_result = _0x167_eq
                                        if (_0xce__0xc9_pipeline_result)
                                        {
                                            break
                                        } 
                                    } }
                            } 
                            const _0x16b_dep_loop = _0xa9_dep_loop
                            const _0x16a_reverse = Array.prototype.reverse.call(_0x16b_dep_loop)
                            let _0xd0__0xcf_pipeline_result = _0x16a_reverse
                            _0xd0__0xcf_pipeline_result
                            const _0x16e_unroller = _0x7e_unroller
                            const _0x16d_dep_loops = await _67lang.maybe_await((_0x16e_unroller.dep_loops))
                            let _0xd3__0xd2_pipeline_result = _0x16d_dep_loops
                            const _0x170_dep_loop = _0xa9_dep_loop
                            const _0x16f_join = Array.prototype.join.call(_0x170_dep_loop, " → ")
                            let _0xd5__0xd4_pipeline_result = _0x16f_join
                            const _0x16c_push = Array.prototype.push.call(_0xd3__0xd2_pipeline_result, _0xd5__0xd4_pipeline_result)
                            let _0xd6__0xd1_pipeline_result = _0x16c_push
                            _0xd6__0xd1_pipeline_result
                        } 
                        else {
                            const _0x172_unroller = _0x7e_unroller
                            let _0xd9__0xd8_pipeline_result = _0x172_unroller
                            const _0x175_unroller = _0x7e_unroller
                            const _0x174_modules = await _67lang.maybe_await((_0x175_unroller.modules))
                            let _0xdc__0xdb_pipeline_result = _0x174_modules
                            const _0x176_dep_id = _0xa0_dep_id
                            let _0xde__0xdd_pipeline_result = _0x176_dep_id
                            const _0x173__hash_ = _0xdc__0xdb_pipeline_result[_0xde__0xdd_pipeline_result]
                            let _0xdf__0xda_pipeline_result = _0x173__hash_
                            const _0x177_next_chain = _0x8b_next_chain
                            let _0xe1__0xe0_pipeline_result = _0x177_next_chain
                            const _0x171_visit = await _67lang.maybe_await(_0x7b_visit(_0xd9__0xd8_pipeline_result, _0xdf__0xda_pipeline_result, _0xe1__0xe0_pipeline_result))
                            let _0xe2__0xd7_pipeline_result = _0x171_visit
                            _0xe2__0xd7_pipeline_result
                        } 
                    } }
            } 
            const _0x17a_unroller = _0x7e_unroller
            const _0x179_build_order = await _67lang.maybe_await((_0x17a_unroller.build_order))
            let _0xe5__0xe4_pipeline_result = _0x179_build_order
            const _0x17c_module = _0x7d_module
            const _0x17b_id = await _67lang.maybe_await((_0x17c_module.id))
            let _0xe7__0xe6_pipeline_result = _0x17b_id
            const _0x178_push = Array.prototype.push.call(_0xe5__0xe4_pipeline_result, _0xe7__0xe6_pipeline_result)
            let _0xe8__0xe3_pipeline_result = _0x178_push
            _0xe8__0xe3_pipeline_result
        } }
    {



















    } {
        const _0x17d_stdin = await (_67lang.stdin())
        let _0x41__0x40_pipeline_result = _0x17d_stdin
        let _0x42_lines = _0x41__0x40_pipeline_result
        _0x42_lines
        const _0x17f_lines = _0x42_lines
        const _0x17e_split = String.prototype.split.call(_0x17f_lines, "\n")
        let _0x44__0x43_pipeline_result = _0x17e_split
        let _0x45_lines = _0x44__0x43_pipeline_result
        _0x45_lines
        let _0x46_modules = {}
        _0x46_modules
        {
            let _0x49__0x47_for_line__index = 0
            _0x49__0x47_for_line__index
            const _0x180_lines = _0x45_lines
            let _0x4b__0x4a_pipeline_result = _0x180_lines
            let _0x4c__0x48_for_line__list = _0x4b__0x4a_pipeline_result
            _0x4c__0x48_for_line__list
            while(true) {
                const _0x182__0x47_for_line__index = _0x49__0x47_for_line__index
                let _0x4f__0x4e_pipeline_result = _0x182__0x47_for_line__index
                const _0x184__0x48_for_line__list = _0x4c__0x48_for_line__list
                const _0x183_length = (_0x184__0x48_for_line__list.length)
                let _0x51__0x50_pipeline_result = _0x183_length
                const _0x181_asc = (_0x4f__0x4e_pipeline_result < _0x51__0x50_pipeline_result)
                let _0x52__0x4d_pipeline_result = _0x181_asc
                if (!_0x52__0x4d_pipeline_result) { break; }
                {
                    const _0x186__0x48_for_line__list = _0x4c__0x48_for_line__list
                    const _0x187__0x47_for_line__index = _0x49__0x47_for_line__index
                    let _0x55__0x54_pipeline_result = _0x187__0x47_for_line__index
                    const _0x185__hash_ = _0x186__0x48_for_line__list[_0x55__0x54_pipeline_result]
                    let _0x56__0x53_pipeline_result = _0x185__hash_
                    let _0x57_line = _0x56__0x53_pipeline_result
                    _0x57_line
                    const _0x18a__0x47_for_line__index = _0x49__0x47_for_line__index
                    const _0x189_add = (_0x18a__0x47_for_line__index + 1)
                    let _0x5a__0x59_pipeline_result = _0x189_add
                    const _0x188__0x47_for_line__index = (_0x49__0x47_for_line__index = _0x5a__0x59_pipeline_result)
                    let _0x5b__0x58_pipeline_result = _0x188__0x47_for_line__index
                    _0x5b__0x58_pipeline_result
                    const _0x18c_line = _0x57_line
                    const _0x18b_split = String.prototype.split.call(_0x18c_line, ":", 2)
                    let _0x5d__0x5c_pipeline_result = _0x18b_split
                    let _0x5e_kv = _0x5d__0x5c_pipeline_result
                    _0x5e_kv
                    const _0x18e_kv = _0x5e_kv
                    const _0x18d__hash_ = _0x18e_kv[0]
                    let _0x60__0x5f_pipeline_result = _0x18d__hash_
                    _0x60__0x5f_pipeline_result
                    const _0x190__0x5f_pipeline_result = _0x60__0x5f_pipeline_result
                    const _0x18f_trim = String.prototype.trim.call(_0x190__0x5f_pipeline_result)
                    let _0x61_id = _0x18f_trim
                    _0x61_id
                    const _0x192_id = _0x61_id
                    let _0x64__0x63_pipeline_result = _0x192_id
                    const _0x191_Module = await _67lang.maybe_await((new _0x11a_Module(_0x64__0x63_pipeline_result, [], false)))
                    let _0x65__0x62_pipeline_result = _0x191_Module
                    let _0x66_module = _0x65__0x62_pipeline_result
                    _0x66_module
                    const _0x194_kv = _0x5e_kv
                    const _0x193__hash_ = _0x194_kv[1]
                    let _0x68__0x67_pipeline_result = _0x193__hash_
                    _0x68__0x67_pipeline_result
                    const _0x196__0x67_pipeline_result = _0x68__0x67_pipeline_result
                    const _0x195_trim = String.prototype.trim.call(_0x196__0x67_pipeline_result)
                    let _0x69_deps_str = _0x195_trim
                    _0x69_deps_str

                    const _0x199_deps_str = _0x69_deps_str
                    const _0x198_eq = (_0x199_deps_str === "")
                    let _0x6c__0x6b_pipeline_result = _0x198_eq
                    const _0x197_none = !(_0x6c__0x6b_pipeline_result)
                    let _0x6d__0x6a_pipeline_result = _0x197_none
                    if (_0x6d__0x6a_pipeline_result)
                    {
                        const _0x19b_deps_str = _0x69_deps_str
                        const _0x19a_trim = String.prototype.trim.call(_0x19b_deps_str)
                        let _0x6f__0x6e_pipeline_result = _0x19a_trim
                        _0x6f__0x6e_pipeline_result
                        const _0x19d__0x6e_pipeline_result = _0x6f__0x6e_pipeline_result
                        const _0x19c_split = String.prototype.split.call(_0x19d__0x6e_pipeline_result, /\s+/)
                        let _0x70_deps = _0x19c_split
                        _0x70_deps
                        const _0x19f_module = _0x66_module
                        const _0x1a0_deps = _0x70_deps
                        let _0x73__0x72_pipeline_result = _0x1a0_deps
                        const _0x19e_deps = await _67lang.maybe_await((_0x19f_module.deps = (_0x73__0x72_pipeline_result)))
                        let _0x74__0x71_pipeline_result = _0x19e_deps
                        _0x74__0x71_pipeline_result
                    } 
                    const _0x1a2_modules = _0x46_modules
                    const _0x1a4_module = _0x66_module
                    const _0x1a3_id = await _67lang.maybe_await((_0x1a4_module.id))
                    let _0x77__0x76_pipeline_result = _0x1a3_id
                    const _0x1a5_module = _0x66_module
                    let _0x79__0x78_pipeline_result = _0x1a5_module
                    const _0x1a1__hash_ = (_0x1a2_modules[_0x77__0x76_pipeline_result] = _0x79__0x78_pipeline_result)
                    let _0x7a__0x75_pipeline_result = _0x1a1__hash_
                    _0x7a__0x75_pipeline_result
                } }
        } 




        const _0x1a7_modules = _0x46_modules
        let _0xeb__0xea_pipeline_result = _0x1a7_modules
        const _0x1a6_DAG_unroller = await _67lang.maybe_await((new _0x119_DAG_unroller([], [], _0xeb__0xea_pipeline_result)))
        let _0xec__0xe9_pipeline_result = _0x1a6_DAG_unroller
        let _0xed_unroller = _0xec__0xe9_pipeline_result
        _0xed_unroller
        {
            let _0xf0__0xee_for_module__index = 0
            _0xf0__0xee_for_module__index
            const _0x1a9_modules = _0x46_modules
            const _0x1a8_values = Object.values(_0x1a9_modules)
            let _0xf2__0xf1_pipeline_result = _0x1a8_values
            let _0xf3__0xef_for_module__list = _0xf2__0xf1_pipeline_result
            _0xf3__0xef_for_module__list
            while(true) {
                const _0x1ab__0xee_for_module__index = _0xf0__0xee_for_module__index
                let _0xf6__0xf5_pipeline_result = _0x1ab__0xee_for_module__index
                const _0x1ad__0xef_for_module__list = _0xf3__0xef_for_module__list
                const _0x1ac_length = (_0x1ad__0xef_for_module__list.length)
                let _0xf8__0xf7_pipeline_result = _0x1ac_length
                const _0x1aa_asc = (_0xf6__0xf5_pipeline_result < _0xf8__0xf7_pipeline_result)
                let _0xf9__0xf4_pipeline_result = _0x1aa_asc
                if (!_0xf9__0xf4_pipeline_result) { break; }
                {
                    const _0x1af__0xef_for_module__list = _0xf3__0xef_for_module__list
                    const _0x1b0__0xee_for_module__index = _0xf0__0xee_for_module__index
                    let _0xfc__0xfb_pipeline_result = _0x1b0__0xee_for_module__index
                    const _0x1ae__hash_ = _0x1af__0xef_for_module__list[_0xfc__0xfb_pipeline_result]
                    let _0xfd__0xfa_pipeline_result = _0x1ae__hash_
                    let _0xfe_module = _0xfd__0xfa_pipeline_result
                    _0xfe_module
                    const _0x1b3__0xee_for_module__index = _0xf0__0xee_for_module__index
                    const _0x1b2_add = (_0x1b3__0xee_for_module__index + 1)
                    let _0x101__0x100_pipeline_result = _0x1b2_add
                    const _0x1b1__0xee_for_module__index = (_0xf0__0xee_for_module__index = _0x101__0x100_pipeline_result)
                    let _0x102__0xff_pipeline_result = _0x1b1__0xee_for_module__index
                    _0x102__0xff_pipeline_result
                    const _0x1b5_unroller = _0xed_unroller
                    let _0x105__0x104_pipeline_result = _0x1b5_unroller
                    const _0x1b6_module = _0xfe_module
                    let _0x107__0x106_pipeline_result = _0x1b6_module
                    const _0x1b4_visit = await _67lang.maybe_await(_0x7b_visit(_0x105__0x104_pipeline_result, _0x107__0x106_pipeline_result, []))
                    let _0x108__0x103_pipeline_result = _0x1b4_visit
                    _0x108__0x103_pipeline_result
                } }
        } 
        const _0x1b7_unroller = _0xed_unroller
        let _0x10a__0x109_pipeline_result = _0x1b7_unroller
        _0x10a__0x109_pipeline_result
        const _0x1bb__0x109_pipeline_result = _0x10a__0x109_pipeline_result
        const _0x1ba_dep_loops = await _67lang.maybe_await((_0x1bb__0x109_pipeline_result.dep_loops))
        const _0x1b9_length = (_0x1ba_dep_loops.length)
        let _0x10d__0x10c_pipeline_result = _0x1b9_length
        const _0x1b8_nondesc = (1 <= _0x10d__0x10c_pipeline_result)
        let _0x10e__0x10b_pipeline_result = _0x1b8_nondesc
        if (_0x10e__0x10b_pipeline_result)
        {
            const _0x1c0__0x109_pipeline_result = _0x10a__0x109_pipeline_result
            const _0x1bf_dep_loops = await _67lang.maybe_await((_0x1c0__0x109_pipeline_result.dep_loops))
            const _0x1be_join = Array.prototype.join.call(_0x1bf_dep_loops, "\n")
            let _0x112__0x111_pipeline_result = _0x1be_join
            const _0x1bd_concat = ("ERROR: there are dependency loops.\n" + _0x112__0x111_pipeline_result)
            let _0x113__0x110_pipeline_result = _0x1bd_concat
            const _0x1bc_print = await _67lang.maybe_await(console.log(_0x113__0x110_pipeline_result))
            let _0x114__0x10f_pipeline_result = _0x1bc_print
            _0x114__0x10f_pipeline_result
        } 
        else {
            const _0x1c4__0x109_pipeline_result = _0x10a__0x109_pipeline_result
            const _0x1c3_build_order = await _67lang.maybe_await((_0x1c4__0x109_pipeline_result.build_order))
            const _0x1c2_join = Array.prototype.join.call(_0x1c3_build_order, "\n")
            let _0x117__0x116_pipeline_result = _0x1c2_join
            const _0x1c1_print = await _67lang.maybe_await(console.log(_0x117__0x116_pipeline_result))
            let _0x118__0x115_pipeline_result = _0x1c1_print
            _0x118__0x115_pipeline_result
        } 
    } 
})();
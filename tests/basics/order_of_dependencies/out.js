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


function _0x11d_DAG_unroller(dep_loops, build_order, modules) {
    this.dep_loops = dep_loops;
    this.build_order = build_order;
    this.modules = modules;
}


function _0x11e_Module(id, deps, visited) {
    this.id = id;
    this.deps = deps;
    this.visited = visited;
}


void (async () => {
    'use strict';
    const _0x7b_visit = async function /* -> */ (    
            unroller,
            module,
            chain,
        )/* -> */ {    
            /* -> */ {    
                let _0x7c_chain = chain;

                let _0x7d_module = module;

                let _0x7e_unroller = unroller;

                const _0x139_module = (_0x7d_module);
                const _0x138_visited = (await _67lang.maybe_await((_0x139_module.visited)));
                let _0x80__0x7f_pipeline_result = _0x138_visited;

                if /* -> */ (    
                    _0x80__0x7f_pipeline_result
                )/* -> */ {    
                    return;
                }else /* -> */ {    
                }

                const _0x13b_module = (_0x7d_module);
                const _0x13a_visited = (await _67lang.maybe_await((_0x13b_module.visited = (true))));
                let _0x82__0x81_pipeline_result = _0x13a_visited;

                if /* -> */ (    
                    false
                )/* -> */ {    
                    const _0x13d_chain = (_0x7c_chain);
                    const _0x13c_slice = (Array.prototype.slice.call(_0x13d_chain));
                    let _0x84__0x83_pipeline_result = _0x13c_slice;

                    const _0x13f__0x83_pipeline_result = (_0x84__0x83_pipeline_result);
                    const _0x141_module = (_0x7d_module);
                    const _0x140_id = (await _67lang.maybe_await((_0x141_module.id)));
                    let _0x87__0x86_pipeline_result = _0x140_id;

                    const _0x13e_push = (Array.prototype.push.call(_0x13f__0x83_pipeline_result, _0x87__0x86_pipeline_result));
                    let _0x88__0x85_pipeline_result = _0x13e_push;

                }else /* -> */ {    
                }

                const _0x143_chain = (_0x7c_chain);
                const _0x142_slice = (Array.prototype.slice.call(_0x143_chain));
                let _0x8a__0x89_pipeline_result = _0x142_slice;

                let _0x8b_next_chain = _0x8a__0x89_pipeline_result;

                const _0x145_next_chain = (_0x8b_next_chain);
                const _0x147_module = (_0x7d_module);
                const _0x146_id = (await _67lang.maybe_await((_0x147_module.id)));
                let _0x8e__0x8d_pipeline_result = _0x146_id;

                const _0x144_push = (Array.prototype.push.call(_0x145_next_chain, _0x8e__0x8d_pipeline_result));
                let _0x8f__0x8c_pipeline_result = _0x144_push;

                /* -> */ {    
                    let _0x92__0x90_for_dep_id__index = 0;

                    const _0x149_module = (_0x7d_module);
                    const _0x148_deps = (await _67lang.maybe_await((_0x149_module.deps)));
                    let _0x94__0x93_pipeline_result = _0x148_deps;

                    let _0x95__0x91_for_dep_id__list = _0x94__0x93_pipeline_result;

                    while(true) /* -> */ {    
                        const _0x14b__0x90_for_dep_id__index = (_0x92__0x90_for_dep_id__index);
                        let _0x98__0x97_pipeline_result = _0x14b__0x90_for_dep_id__index;

                        const _0x14d__0x91_for_dep_id__list = (_0x95__0x91_for_dep_id__list);
                        const _0x14c_length = ((_0x14d__0x91_for_dep_id__list.length));
                        let _0x9a__0x99_pipeline_result = _0x14c_length;

                        const _0x14a_asc = ((_0x98__0x97_pipeline_result < _0x9a__0x99_pipeline_result));
                        let _0x9b__0x96_pipeline_result = _0x14a_asc;

                        if (!_0x9b__0x96_pipeline_result) { break; }
                        /* -> */ {    
                            const _0x14f__0x91_for_dep_id__list = (_0x95__0x91_for_dep_id__list);
                            const _0x150__0x90_for_dep_id__index = (_0x92__0x90_for_dep_id__index);
                            let _0x9e__0x9d_pipeline_result = _0x150__0x90_for_dep_id__index;

                            const _0x14e__hash_ = (_0x14f__0x91_for_dep_id__list[_0x9e__0x9d_pipeline_result]);
                            let _0x9f__0x9c_pipeline_result = _0x14e__hash_;

                            let _0xa0_dep_id = _0x9f__0x9c_pipeline_result;

                            const _0x153__0x90_for_dep_id__index = (_0x92__0x90_for_dep_id__index);
                            const _0x152_add = ((_0x153__0x90_for_dep_id__index + 1));
                            let _0xa3__0xa2_pipeline_result = _0x152_add;

                            const _0x151__0x90_for_dep_id__index = ((_0x92__0x90_for_dep_id__index = _0xa3__0xa2_pipeline_result));
                            let _0xa4__0xa1_pipeline_result = _0x151__0x90_for_dep_id__index;

                            const _0x155_next_chain = (_0x8b_next_chain);
                            const _0x156_dep_id = (_0xa0_dep_id);
                            let _0xa7__0xa6_pipeline_result = _0x156_dep_id;

                            const _0x154_has_values = (_67lang.has_values(_0x155_next_chain, _0xa7__0xa6_pipeline_result));
                            let _0xa8__0xa5_pipeline_result = _0x154_has_values;

                            if /* -> */ (    
                                _0xa8__0xa5_pipeline_result
                            )/* -> */ {    
                                let _0xa9_dep_loop = [];

                                const _0x158_dep_loop = (_0xa9_dep_loop);
                                const _0x159_dep_id = (_0xa0_dep_id);
                                let _0xac__0xab_pipeline_result = _0x159_dep_id;

                                const _0x157_push = (Array.prototype.push.call(_0x158_dep_loop, _0xac__0xab_pipeline_result));
                                let _0xad__0xaa_pipeline_result = _0x157_push;

                                const _0x15b_next_chain = (_0x8b_next_chain);
                                const _0x15a_slice = (Array.prototype.slice.call(_0x15b_next_chain));
                                let _0xaf__0xae_pipeline_result = _0x15a_slice;

                                /* -> */ {    
                                    let _0xb2__0xb0_for_chain_dep_id__index = 0;

                                    const _0x15d__0xae_pipeline_result = (_0xaf__0xae_pipeline_result);
                                    const _0x15c_reverse = (Array.prototype.reverse.call(_0x15d__0xae_pipeline_result));
                                    let _0xb4__0xb3_pipeline_result = _0x15c_reverse;

                                    let _0xb5__0xb1_for_chain_dep_id__list = _0xb4__0xb3_pipeline_result;

                                    while(true) /* -> */ {    
                                        const _0x15f__0xb0_for_chain_dep_id__index = (_0xb2__0xb0_for_chain_dep_id__index);
                                        let _0xb8__0xb7_pipeline_result = _0x15f__0xb0_for_chain_dep_id__index;

                                        const _0x161__0xb1_for_chain_dep_id__list = (_0xb5__0xb1_for_chain_dep_id__list);
                                        const _0x160_length = ((_0x161__0xb1_for_chain_dep_id__list.length));
                                        let _0xba__0xb9_pipeline_result = _0x160_length;

                                        const _0x15e_asc = ((_0xb8__0xb7_pipeline_result < _0xba__0xb9_pipeline_result));
                                        let _0xbb__0xb6_pipeline_result = _0x15e_asc;

                                        if (!_0xbb__0xb6_pipeline_result) { break; }
                                        /* -> */ {    
                                            const _0x163__0xb1_for_chain_dep_id__list = (_0xb5__0xb1_for_chain_dep_id__list);
                                            const _0x164__0xb0_for_chain_dep_id__index = (_0xb2__0xb0_for_chain_dep_id__index);
                                            let _0xbe__0xbd_pipeline_result = _0x164__0xb0_for_chain_dep_id__index;

                                            const _0x162__hash_ = (_0x163__0xb1_for_chain_dep_id__list[_0xbe__0xbd_pipeline_result]);
                                            let _0xbf__0xbc_pipeline_result = _0x162__hash_;

                                            let _0xc0_chain_dep_id = _0xbf__0xbc_pipeline_result;

                                            const _0x167__0xb0_for_chain_dep_id__index = (_0xb2__0xb0_for_chain_dep_id__index);
                                            const _0x166_add = ((_0x167__0xb0_for_chain_dep_id__index + 1));
                                            let _0xc3__0xc2_pipeline_result = _0x166_add;

                                            const _0x165__0xb0_for_chain_dep_id__index = ((_0xb2__0xb0_for_chain_dep_id__index = _0xc3__0xc2_pipeline_result));
                                            let _0xc4__0xc1_pipeline_result = _0x165__0xb0_for_chain_dep_id__index;

                                            const _0x169_dep_loop = (_0xa9_dep_loop);
                                            const _0x16a_chain_dep_id = (_0xc0_chain_dep_id);
                                            let _0xc7__0xc6_pipeline_result = _0x16a_chain_dep_id;

                                            const _0x168_push = (Array.prototype.push.call(_0x169_dep_loop, _0xc7__0xc6_pipeline_result));
                                            let _0xc8__0xc5_pipeline_result = _0x168_push;

                                            const _0x16c_chain_dep_id = (_0xc0_chain_dep_id);
                                            let _0xcb__0xca_pipeline_result = _0x16c_chain_dep_id;

                                            const _0x16d_dep_id = (_0xa0_dep_id);
                                            let _0xcd__0xcc_pipeline_result = _0x16d_dep_id;

                                            const _0x16b_eq = ((_0xcb__0xca_pipeline_result === _0xcd__0xcc_pipeline_result));
                                            let _0xce__0xc9_pipeline_result = _0x16b_eq;

                                            if /* -> */ (    
                                                _0xce__0xc9_pipeline_result
                                            )/* -> */ {    
                                            }else /* -> */ {    
                                            }

                                        }

                                    }

                                }

                                const _0x16f_dep_loop = (_0xa9_dep_loop);
                                const _0x16e_reverse = (Array.prototype.reverse.call(_0x16f_dep_loop));
                                let _0xd0__0xcf_pipeline_result = _0x16e_reverse;

                                const _0x172_unroller = (_0x7e_unroller);
                                const _0x171_dep_loops = (await _67lang.maybe_await((_0x172_unroller.dep_loops)));
                                let _0xd3__0xd2_pipeline_result = _0x171_dep_loops;

                                const _0x174_dep_loop = (_0xa9_dep_loop);
                                const _0x173_join = (Array.prototype.join.call(_0x174_dep_loop, " → "));
                                let _0xd5__0xd4_pipeline_result = _0x173_join;

                                const _0x170_push = (Array.prototype.push.call(_0xd3__0xd2_pipeline_result, _0xd5__0xd4_pipeline_result));
                                let _0xd6__0xd1_pipeline_result = _0x170_push;

                            }else /* -> */ {    
                                const _0x176_unroller = (_0x7e_unroller);
                                let _0xd9__0xd8_pipeline_result = _0x176_unroller;

                                const _0x179_unroller = (_0x7e_unroller);
                                const _0x178_modules = (await _67lang.maybe_await((_0x179_unroller.modules)));
                                let _0xdc__0xdb_pipeline_result = _0x178_modules;

                                const _0x17a_dep_id = (_0xa0_dep_id);
                                let _0xde__0xdd_pipeline_result = _0x17a_dep_id;

                                const _0x177__hash_ = (_0xdc__0xdb_pipeline_result[_0xde__0xdd_pipeline_result]);
                                let _0xdf__0xda_pipeline_result = _0x177__hash_;

                                const _0x17b_next_chain = (_0x8b_next_chain);
                                let _0xe1__0xe0_pipeline_result = _0x17b_next_chain;

                                const _0x175_visit = (await _67lang.maybe_await(_0x7b_visit(_0xd9__0xd8_pipeline_result, _0xdf__0xda_pipeline_result, _0xe1__0xe0_pipeline_result)));
                                let _0xe2__0xd7_pipeline_result = _0x175_visit;

                            }

                        }

                    }

                }

                const _0x17e_unroller = (_0x7e_unroller);
                const _0x17d_build_order = (await _67lang.maybe_await((_0x17e_unroller.build_order)));
                let _0xe5__0xe4_pipeline_result = _0x17d_build_order;

                const _0x180_module = (_0x7d_module);
                const _0x17f_id = (await _67lang.maybe_await((_0x180_module.id)));
                let _0xe7__0xe6_pipeline_result = _0x17f_id;

                const _0x17c_push = (Array.prototype.push.call(_0xe5__0xe4_pipeline_result, _0xe7__0xe6_pipeline_result));
                let _0xe8__0xe3_pipeline_result = _0x17c_push;

            }

        }
    /* -> */ {    
        }
    /* -> */ {    
            const _0x181_stdin = (await (_67lang.stdin()));
            let _0x41__0x40_pipeline_result = _0x181_stdin;

            let _0x42_lines = _0x41__0x40_pipeline_result;

            const _0x183_lines = (_0x42_lines);
            const _0x182_split = (String.prototype.split.call(_0x183_lines, "\n"));
            let _0x44__0x43_pipeline_result = _0x182_split;

            let _0x45_lines = _0x44__0x43_pipeline_result;

            let _0x46_modules = {};

            /* -> */ {    
                let _0x49__0x47_for_line__index = 0;

                const _0x184_lines = (_0x45_lines);
                let _0x4b__0x4a_pipeline_result = _0x184_lines;

                let _0x4c__0x48_for_line__list = _0x4b__0x4a_pipeline_result;

                while(true) /* -> */ {    
                    const _0x186__0x47_for_line__index = (_0x49__0x47_for_line__index);
                    let _0x4f__0x4e_pipeline_result = _0x186__0x47_for_line__index;

                    const _0x188__0x48_for_line__list = (_0x4c__0x48_for_line__list);
                    const _0x187_length = ((_0x188__0x48_for_line__list.length));
                    let _0x51__0x50_pipeline_result = _0x187_length;

                    const _0x185_asc = ((_0x4f__0x4e_pipeline_result < _0x51__0x50_pipeline_result));
                    let _0x52__0x4d_pipeline_result = _0x185_asc;

                    if (!_0x52__0x4d_pipeline_result) { break; }
                    /* -> */ {    
                        const _0x18a__0x48_for_line__list = (_0x4c__0x48_for_line__list);
                        const _0x18b__0x47_for_line__index = (_0x49__0x47_for_line__index);
                        let _0x55__0x54_pipeline_result = _0x18b__0x47_for_line__index;

                        const _0x189__hash_ = (_0x18a__0x48_for_line__list[_0x55__0x54_pipeline_result]);
                        let _0x56__0x53_pipeline_result = _0x189__hash_;

                        let _0x57_line = _0x56__0x53_pipeline_result;

                        const _0x18e__0x47_for_line__index = (_0x49__0x47_for_line__index);
                        const _0x18d_add = ((_0x18e__0x47_for_line__index + 1));
                        let _0x5a__0x59_pipeline_result = _0x18d_add;

                        const _0x18c__0x47_for_line__index = ((_0x49__0x47_for_line__index = _0x5a__0x59_pipeline_result));
                        let _0x5b__0x58_pipeline_result = _0x18c__0x47_for_line__index;

                        const _0x190_line = (_0x57_line);
                        const _0x18f_split = (String.prototype.split.call(_0x190_line, ":", 2));
                        let _0x5d__0x5c_pipeline_result = _0x18f_split;

                        let _0x5e_kv = _0x5d__0x5c_pipeline_result;

                        const _0x192_kv = (_0x5e_kv);
                        const _0x191__hash_ = (_0x192_kv[0]);
                        let _0x60__0x5f_pipeline_result = _0x191__hash_;

                        const _0x194__0x5f_pipeline_result = (_0x60__0x5f_pipeline_result);
                        const _0x193_trim = (String.prototype.trim.call(_0x194__0x5f_pipeline_result));
                        let _0x61_id = _0x193_trim;

                        const _0x196_id = (_0x61_id);
                        let _0x64__0x63_pipeline_result = _0x196_id;

                        const _0x195_Module = (await _67lang.maybe_await((new _0x11e_Module(_0x64__0x63_pipeline_result, [], false))));
                        let _0x65__0x62_pipeline_result = _0x195_Module;

                        let _0x66_module = _0x65__0x62_pipeline_result;

                        const _0x198_kv = (_0x5e_kv);
                        const _0x197__hash_ = (_0x198_kv[1]);
                        let _0x68__0x67_pipeline_result = _0x197__hash_;

                        const _0x19a__0x67_pipeline_result = (_0x68__0x67_pipeline_result);
                        const _0x199_trim = (String.prototype.trim.call(_0x19a__0x67_pipeline_result));
                        let _0x69_deps_str = _0x199_trim;

                        const _0x19d_deps_str = (_0x69_deps_str);
                        const _0x19c_eq = ((_0x19d_deps_str === ""));
                        let _0x6c__0x6b_pipeline_result = _0x19c_eq;

                        const _0x19b_none = (!(_0x6c__0x6b_pipeline_result));
                        let _0x6d__0x6a_pipeline_result = _0x19b_none;

                        if /* -> */ (    
                            _0x6d__0x6a_pipeline_result
                        )/* -> */ {    
                            const _0x19f_deps_str = (_0x69_deps_str);
                            const _0x19e_trim = (String.prototype.trim.call(_0x19f_deps_str));
                            let _0x6f__0x6e_pipeline_result = _0x19e_trim;

                            const _0x1a1__0x6e_pipeline_result = (_0x6f__0x6e_pipeline_result);
                            const _0x1a0_split = (String.prototype.split.call(_0x1a1__0x6e_pipeline_result, /\s+/));
                            let _0x70_deps = _0x1a0_split;

                            const _0x1a3_module = (_0x66_module);
                            const _0x1a4_deps = (_0x70_deps);
                            let _0x73__0x72_pipeline_result = _0x1a4_deps;

                            const _0x1a2_deps = (await _67lang.maybe_await((_0x1a3_module.deps = (_0x73__0x72_pipeline_result))));
                            let _0x74__0x71_pipeline_result = _0x1a2_deps;

                        }else /* -> */ {    
                        }

                        const _0x1a6_modules = (_0x46_modules);
                        const _0x1a8_module = (_0x66_module);
                        const _0x1a7_id = (await _67lang.maybe_await((_0x1a8_module.id)));
                        let _0x77__0x76_pipeline_result = _0x1a7_id;

                        const _0x1a9_module = (_0x66_module);
                        let _0x79__0x78_pipeline_result = _0x1a9_module;

                        const _0x1a5__hash_ = ((_0x1a6_modules[_0x77__0x76_pipeline_result] = _0x79__0x78_pipeline_result));
                        let _0x7a__0x75_pipeline_result = _0x1a5__hash_;

                    }

                }

            }

            const _0x1ab_modules = (_0x46_modules);
            let _0xeb__0xea_pipeline_result = _0x1ab_modules;

            const _0x1aa_DAG_unroller = (await _67lang.maybe_await((new _0x11d_DAG_unroller([], [], _0xeb__0xea_pipeline_result))));
            let _0xec__0xe9_pipeline_result = _0x1aa_DAG_unroller;

            let _0xed_unroller = _0xec__0xe9_pipeline_result;

            /* -> */ {    
                let _0xf0__0xee_for_module__index = 0;

                const _0x1ad_modules = (_0x46_modules);
                const _0x1ac_values = (Object.values(_0x1ad_modules));
                let _0xf2__0xf1_pipeline_result = _0x1ac_values;

                let _0xf3__0xef_for_module__list = _0xf2__0xf1_pipeline_result;

                while(true) /* -> */ {    
                    const _0x1af__0xee_for_module__index = (_0xf0__0xee_for_module__index);
                    let _0xf6__0xf5_pipeline_result = _0x1af__0xee_for_module__index;

                    const _0x1b1__0xef_for_module__list = (_0xf3__0xef_for_module__list);
                    const _0x1b0_length = ((_0x1b1__0xef_for_module__list.length));
                    let _0xf8__0xf7_pipeline_result = _0x1b0_length;

                    const _0x1ae_asc = ((_0xf6__0xf5_pipeline_result < _0xf8__0xf7_pipeline_result));
                    let _0xf9__0xf4_pipeline_result = _0x1ae_asc;

                    if (!_0xf9__0xf4_pipeline_result) { break; }
                    /* -> */ {    
                        const _0x1b3__0xef_for_module__list = (_0xf3__0xef_for_module__list);
                        const _0x1b4__0xee_for_module__index = (_0xf0__0xee_for_module__index);
                        let _0xfc__0xfb_pipeline_result = _0x1b4__0xee_for_module__index;

                        const _0x1b2__hash_ = (_0x1b3__0xef_for_module__list[_0xfc__0xfb_pipeline_result]);
                        let _0xfd__0xfa_pipeline_result = _0x1b2__hash_;

                        let _0xfe_module = _0xfd__0xfa_pipeline_result;

                        const _0x1b7__0xee_for_module__index = (_0xf0__0xee_for_module__index);
                        const _0x1b6_add = ((_0x1b7__0xee_for_module__index + 1));
                        let _0x101__0x100_pipeline_result = _0x1b6_add;

                        const _0x1b5__0xee_for_module__index = ((_0xf0__0xee_for_module__index = _0x101__0x100_pipeline_result));
                        let _0x102__0xff_pipeline_result = _0x1b5__0xee_for_module__index;

                        const _0x1b9_unroller = (_0xed_unroller);
                        let _0x105__0x104_pipeline_result = _0x1b9_unroller;

                        const _0x1ba_module = (_0xfe_module);
                        let _0x107__0x106_pipeline_result = _0x1ba_module;

                        const _0x1b8_visit = (await _67lang.maybe_await(_0x7b_visit(_0x105__0x104_pipeline_result, _0x107__0x106_pipeline_result, [])));
                        let _0x108__0x103_pipeline_result = _0x1b8_visit;

                    }

                }

            }

            const _0x1bb_unroller = (_0xed_unroller);
            let _0x10a__0x109_pipeline_result = _0x1bb_unroller;

            const _0x1bf__0x109_pipeline_result = (_0x10a__0x109_pipeline_result);
            const _0x1be_dep_loops = (await _67lang.maybe_await((_0x1bf__0x109_pipeline_result.dep_loops)));
            const _0x1bd_length = ((_0x1be_dep_loops.length));
            let _0x10d__0x10c_pipeline_result = _0x1bd_length;

            const _0x1bc_nondesc = ((1 <= _0x10d__0x10c_pipeline_result));
            let _0x10e__0x10b_pipeline_result = _0x1bc_nondesc;

            if /* -> */ (    
                _0x10e__0x10b_pipeline_result
            )/* -> */ {    
                const _0x1c0_unroller = (_0xed_unroller);
                let _0x110__0x10f_pipeline_result = _0x1c0_unroller;

                const _0x1c5__0x10f_pipeline_result = (_0x110__0x10f_pipeline_result);
                const _0x1c4_dep_loops = (await _67lang.maybe_await((_0x1c5__0x10f_pipeline_result.dep_loops)));
                const _0x1c3_join = (Array.prototype.join.call(_0x1c4_dep_loops, "\n"));
                let _0x114__0x113_pipeline_result = _0x1c3_join;

                const _0x1c2_concat = (("ERROR: there are dependency loops.\n" + _0x114__0x113_pipeline_result));
                let _0x115__0x112_pipeline_result = _0x1c2_concat;

                const _0x1c1_print = (await _67lang.maybe_await(console.log(_0x115__0x112_pipeline_result)));
                let _0x116__0x111_pipeline_result = _0x1c1_print;

            }else /* -> */ {    
                const _0x1c6_unroller = (_0xed_unroller);
                let _0x118__0x117_pipeline_result = _0x1c6_unroller;

                const _0x1ca__0x117_pipeline_result = (_0x118__0x117_pipeline_result);
                const _0x1c9_build_order = (await _67lang.maybe_await((_0x1ca__0x117_pipeline_result.build_order)));
                const _0x1c8_join = (Array.prototype.join.call(_0x1c9_build_order, "\n"));
                let _0x11b__0x11a_pipeline_result = _0x1c8_join;

                const _0x1c7_print = (await _67lang.maybe_await(console.log(_0x11b__0x11a_pipeline_result)));
                let _0x11c__0x119_pipeline_result = _0x1c7_print;

            }

        }

})();
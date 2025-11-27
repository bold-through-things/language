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


void (async () => {
    'use strict';
    const _0xdd_fuck_bang_ = async function /* -> */ (    
            fucks_given,
        )/* -> */ {    
            /* -> */ {    
                let _0xde_fucks_given = fucks_given;

                const _0x105_fucks_given = (_0xde_fucks_given);
                let _0xe0__0xdf_pipeline_result = _0x105_fucks_given;

                let _0xe1_fucks_given = _0xe0__0xdf_pipeline_result;

                const _0x106_print = (await _67lang.maybe_await(console.log("fuck!")));
                let _0xe3__0xe2_pipeline_result = _0x106_print;

                const _0x108_fucks_given = (_0xe1_fucks_given);
                let _0xe6__0xe5_pipeline_result = _0x108_fucks_given;

                const _0x107_nondesc = ((0 <= _0xe6__0xe5_pipeline_result));
                let _0xe7__0xe4_pipeline_result = _0x107_nondesc;

                if /* -> */ (    
                    _0xe7__0xe4_pipeline_result
                )/* -> */ {    
                    const _0x10b_fucks_given = (_0xe1_fucks_given);
                    let _0xeb__0xea_pipeline_result = _0x10b_fucks_given;

                    const _0x10a_add = ((_0xeb__0xea_pipeline_result + -1));
                    let _0xec__0xe9_pipeline_result = _0x10a_add;

                    const _0x109_fuck_bang_ = (await _67lang.maybe_await(_0xdd_fuck_bang_(_0xec__0xe9_pipeline_result)));
                    let _0xed__0xe8_pipeline_result = _0x109_fuck_bang_;

                }else /* -> */ {    
                }

            }

        }
    /* -> */ {    
        }
    /* -> */ {    
            const _0x10c_print = (await _67lang.maybe_await(console.log("hello world")));
            let _0x41__0x40_pipeline_result = _0x10c_print;

            const _0x10d_print = (await _67lang.maybe_await(console.log("\"hello world\" is a fucking stupid non argument.")));
            let _0x43__0x42_pipeline_result = _0x10d_print;

            const _0x111_concat = (("new year's " + "eve"));
            let _0x48__0x47_pipeline_result = _0x111_concat;

            const _0x110_eq = (("new year's eve" === _0x48__0x47_pipeline_result));
            let _0x49__0x46_pipeline_result = _0x110_eq;

            const _0x113_concat = (("a very " + "scary " + "error"));
            let _0x4c__0x4b_pipeline_result = _0x113_concat;

            const _0x112_eq = (("a very scary error" === _0x4c__0x4b_pipeline_result));
            let _0x4d__0x4a_pipeline_result = _0x112_eq;

            const _0x115_concat = (("your regex" + " should be stored into the " + "regex" + " variable."));
            let _0x50__0x4f_pipeline_result = _0x115_concat;

            const _0x114_eq = (("your regex should be stored into the regex variable." === _0x50__0x4f_pipeline_result));
            let _0x51__0x4e_pipeline_result = _0x114_eq;

            const _0x10f_all = ((_0x49__0x46_pipeline_result && _0x4d__0x4a_pipeline_result && _0x51__0x4e_pipeline_result));
            let _0x52__0x45_pipeline_result = _0x10f_all;

            const _0x10e_print = (await _67lang.maybe_await(console.log("this literally cannot be true... yet it is: ", _0x52__0x45_pipeline_result)));
            let _0x53__0x44_pipeline_result = _0x10e_print;

            const _0x116_print = (await _67lang.maybe_await(console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")));
            let _0x55__0x54_pipeline_result = _0x116_print;

            const _0x118_add = ((2 + 0 + 2));
            let _0x58__0x57_pipeline_result = _0x118_add;

            const _0x117_print = (await _67lang.maybe_await(console.log(_0x58__0x57_pipeline_result)));
            let _0x59__0x56_pipeline_result = _0x117_print;

            const _0x11a_asc = ((0 < 1 && 1 < 2));
            let _0x5c__0x5b_pipeline_result = _0x11a_asc;

            const _0x119_print = (await _67lang.maybe_await(console.log(_0x5c__0x5b_pipeline_result)));
            let _0x5d__0x5a_pipeline_result = _0x119_print;

            let _0x5e_age = 23;

            const _0x11c_age = (_0x5e_age);
            let _0x61__0x60_pipeline_result = _0x11c_age;

            const _0x11b_print = (await _67lang.maybe_await(console.log("my age is", _0x61__0x60_pipeline_result)));
            let _0x62__0x5f_pipeline_result = _0x11b_print;

            const _0x11d_age = ((_0x5e_age = 25));
            let _0x64__0x63_pipeline_result = _0x11d_age;

            const _0x11f_age = (_0x5e_age);
            let _0x67__0x66_pipeline_result = _0x11f_age;

            const _0x11e_print = (await _67lang.maybe_await(console.log("actually, i lied. my age is", _0x67__0x66_pipeline_result)));
            let _0x68__0x65_pipeline_result = _0x11e_print;

            let _0x69__0 = 0;

            const _0x121__0 = (_0x69__0);
            let _0x6c__0x6b_pipeline_result = _0x121__0;

            const _0x120_print = (await _67lang.maybe_await(console.log(_0x6c__0x6b_pipeline_result)));
            let _0x6d__0x6a_pipeline_result = _0x120_print;

            const _0x122__0 = ((_0x69__0 = 2347));
            let _0x6f__0x6e_pipeline_result = _0x122__0;

            const _0x124__0 = (_0x69__0);
            let _0x72__0x71_pipeline_result = _0x124__0;

            const _0x123_print = (await _67lang.maybe_await(console.log(_0x72__0x71_pipeline_result)));
            let _0x73__0x70_pipeline_result = _0x123_print;

            let _0x74_discord_dot__at_member_hash_hash = "#2347";

            let _0x75__67lang_dot__dollar_budget = 0;

            let _0x76__lp_2347_rp_ = /(2347)/;

            let _0x77__comma_ = true;

            const _0x126__comma_ = (_0x77__comma_);
            let _0x7a__0x79_pipeline_result = _0x126__comma_;

            const _0x125_print = (await _67lang.maybe_await(console.log(_0x7a__0x79_pipeline_result)));
            let _0x7b__0x78_pipeline_result = _0x125_print;

            const _0x129__comma_ = (_0x77__comma_);
            let _0x7f__0x7e_pipeline_result = _0x129__comma_;

            const _0x128__comma_ = ((_0x77__comma_ = _0x7f__0x7e_pipeline_result));
            let _0x80__0x7d_pipeline_result = _0x128__comma_;

            const _0x127__comma_ = ((_0x77__comma_ = _0x80__0x7d_pipeline_result));
            let _0x81__0x7c_pipeline_result = _0x127__comma_;

            let _0x82__2347 = "wow, very helpful.";

            const _0x12b__2347 = (_0x82__2347);
            const _0x12a_split = (String.prototype.split.call(_0x12b__2347, " "));
            let _0x84__0x83_pipeline_result = _0x12a_split;

            const _0x12d__0x83_pipeline_result = (_0x84__0x83_pipeline_result);
            const _0x12c_sort = (Array.prototype.sort.call(_0x12d__0x83_pipeline_result));
            let _0x86__0x85_pipeline_result = _0x12c_sort;

            const _0x12f__0x85_pipeline_result = (_0x86__0x85_pipeline_result);
            const _0x12e_join = (Array.prototype.join.call(_0x12f__0x85_pipeline_result, ", "));
            let _0x88__0x87_pipeline_result = _0x12e_join;

            const _0x131__0x87_pipeline_result = (_0x88__0x87_pipeline_result);
            const _0x130_print = (await _67lang.maybe_await(console.log(_0x131__0x87_pipeline_result)));
            let _0x8a__0x89_pipeline_result = _0x130_print;

            let _0x8b__67lang_dot_features = {};

            const _0x133__67lang_dot_features = (_0x8b__67lang_dot_features);
            const _0x132__hash_ = ((_0x133__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all."));
            let _0x8d__0x8c_pipeline_result = _0x132__hash_;

            const _0x135__67lang_dot_features = (_0x8b__67lang_dot_features);
            const _0x134__hash_ = ((_0x135__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written."));
            let _0x8f__0x8e_pipeline_result = _0x134__hash_;

            const _0x137__67lang_dot_features = (_0x8b__67lang_dot_features);
            const _0x136__hash_ = (_0x137__67lang_dot_features["the flexibility of identifiers"]);
            let _0x91__0x90_pipeline_result = _0x136__hash_;

            let _0x92__we_really_needed_the_generics_yesterday_bang_ = _0x91__0x90_pipeline_result;

            const _0x139__we_really_needed_the_generics_yesterday_bang_ = (_0x92__we_really_needed_the_generics_yesterday_bang_);
            const _0x138_slice = (String.prototype.slice.call(_0x139__we_really_needed_the_generics_yesterday_bang_, 0, 67));
            let _0x94__0x93_pipeline_result = _0x138_slice;

            const _0x13b__0x93_pipeline_result = (_0x94__0x93_pipeline_result);
            const _0x13a_print = (await _67lang.maybe_await(console.log(_0x13b__0x93_pipeline_result)));
            let _0x96__0x95_pipeline_result = _0x13a_print;

            if /* -> */ (    
                true
            )/* -> */ {    
                const _0x13c_print = (await _67lang.maybe_await(console.log("big")));
                let _0x98__0x97_pipeline_result = _0x13c_print;

            }else /* -> */ {    
            }

            if /* -> */ (    
                false
            )/* -> */ {    
                const _0x13d_print = (await _67lang.maybe_await(console.log("big")));
                let _0x9a__0x99_pipeline_result = _0x13d_print;

            }else /* -> */ {    
                const _0x13e_print = (await _67lang.maybe_await(console.log("my disappointment is immeasurable and my day is ruined.")));
                let _0x9c__0x9b_pipeline_result = _0x13e_print;

            }

            let _0x9d_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."];

            /* -> */ {    
                let _0xa0__0x9e_for_angy__index = 0;

                const _0x13f_i_hate_this_trash_bang_ = (_0x9d_i_hate_this_trash_bang_);
                let _0xa2__0xa1_pipeline_result = _0x13f_i_hate_this_trash_bang_;

                let _0xa3__0x9f_for_angy__list = _0xa2__0xa1_pipeline_result;

                while(true) /* -> */ {    
                    const _0x141__0x9e_for_angy__index = (_0xa0__0x9e_for_angy__index);
                    let _0xa6__0xa5_pipeline_result = _0x141__0x9e_for_angy__index;

                    const _0x143__0x9f_for_angy__list = (_0xa3__0x9f_for_angy__list);
                    const _0x142_length = ((_0x143__0x9f_for_angy__list.length));
                    let _0xa8__0xa7_pipeline_result = _0x142_length;

                    const _0x140_asc = ((_0xa6__0xa5_pipeline_result < _0xa8__0xa7_pipeline_result));
                    let _0xa9__0xa4_pipeline_result = _0x140_asc;

                    if (!_0xa9__0xa4_pipeline_result) { break; }
                    /* -> */ {    
                        const _0x145__0x9f_for_angy__list = (_0xa3__0x9f_for_angy__list);
                        const _0x146__0x9e_for_angy__index = (_0xa0__0x9e_for_angy__index);
                        let _0xac__0xab_pipeline_result = _0x146__0x9e_for_angy__index;

                        const _0x144__hash_ = (_0x145__0x9f_for_angy__list[_0xac__0xab_pipeline_result]);
                        let _0xad__0xaa_pipeline_result = _0x144__hash_;

                        let _0xae_angy = _0xad__0xaa_pipeline_result;

                        const _0x149__0x9e_for_angy__index = (_0xa0__0x9e_for_angy__index);
                        const _0x148_add = ((_0x149__0x9e_for_angy__index + 1));
                        let _0xb1__0xb0_pipeline_result = _0x148_add;

                        const _0x147__0x9e_for_angy__index = ((_0xa0__0x9e_for_angy__index = _0xb1__0xb0_pipeline_result));
                        let _0xb2__0xaf_pipeline_result = _0x147__0x9e_for_angy__index;

                        const _0x14c_angy = (_0xae_angy);
                        let _0xb6__0xb5_pipeline_result = _0x14c_angy;

                        const _0x14b_concat = ((_0xb6__0xb5_pipeline_result + "!!!"));
                        let _0xb7__0xb4_pipeline_result = _0x14b_concat;

                        const _0x14a_print = (await _67lang.maybe_await(console.log(_0xb7__0xb4_pipeline_result)));
                        let _0xb8__0xb3_pipeline_result = _0x14a_print;

                    }

                }

            }

            let _0xb9_does_a_decent_programming_language_exist_q_ = false;

            while(true) /* -> */ {    
                const _0x14d_does_a_decent_programming_language_exist_q_ = (_0xb9_does_a_decent_programming_language_exist_q_);
                let _0xbb__0xba_pipeline_result = _0x14d_does_a_decent_programming_language_exist_q_;

                if (!_0xbb__0xba_pipeline_result) { break; }
                /* -> */ {    
                    const _0x14e_print = (await _67lang.maybe_await(console.log("code for quality software")));
                    let _0xbd__0xbc_pipeline_result = _0x14e_print;

                }

            }

            const _0x150_all = ((true && true && false));
            let _0xc0__0xbf_pipeline_result = _0x150_all;

            const _0x14f_print = (await _67lang.maybe_await(console.log("false: ", _0xc0__0xbf_pipeline_result)));
            let _0xc1__0xbe_pipeline_result = _0x14f_print;

            const _0x152_any = ((true || false || false));
            let _0xc4__0xc3_pipeline_result = _0x152_any;

            const _0x151_print = (await _67lang.maybe_await(console.log("true: ", _0xc4__0xc3_pipeline_result)));
            let _0xc5__0xc2_pipeline_result = _0x151_print;

            const _0x154_none = (!(false || false || false));
            let _0xc8__0xc7_pipeline_result = _0x154_none;

            const _0x153_print = (await _67lang.maybe_await(console.log("true: ", _0xc8__0xc7_pipeline_result)));
            let _0xc9__0xc6_pipeline_result = _0x153_print;

            const _0x156_add = ((1 + 1 + 1 + 1 + 1 + 1));
            let _0xcc__0xcb_pipeline_result = _0x156_add;

            const _0x155_print = (await _67lang.maybe_await(console.log("6: ", _0xcc__0xcb_pipeline_result)));
            let _0xcd__0xca_pipeline_result = _0x155_print;

            let _0xce__2347 = 2347;

            let _0xcf_where_q_ = "not even in Nebraska.";

            const _0x157_where_q_ = (_0xcf_where_q_);
            let _0xd5__0xd4_pipeline_result = _0x157_where_q_;

            const _0x159_where_q_ = (_0xcf_where_q_);
            const _0x158_split = (String.prototype.split.call(_0x159_where_q_, " "));
            let _0xd9__0xd8_pipeline_result = _0x158_split;

            const _0x15c_fuck_bang_ = (await _67lang.maybe_await(_0xdd_fuck_bang_(6)));
            let _0xef__0xee_pipeline_result = _0x15c_fuck_bang_;

        }

})();
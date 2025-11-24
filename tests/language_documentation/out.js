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


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0xcb_fuck_bang_ = async function (
        fucks_given
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                fucks_given = fucks_given
                let _0xcc_fucks_given = fucks_given
                _0xcc_fucks_given
                const _0xed_fucks_given = _0xcc_fucks_given
                let _0xce__0xcd_pipeline_result = _0xed_fucks_given
                let _0xcf_fucks_given = _0xce__0xcd_pipeline_result
                _0xcf_fucks_given
                const _0xee_print = await _67lang.maybe_await(console.log("fuck!"))
                let _0xd1__0xd0_pipeline_result = _0xee_print
                _0xd1__0xd0_pipeline_result
                const _0xf0_fucks_given = _0xcf_fucks_given
                let _0xd4__0xd3_pipeline_result = _0xf0_fucks_given
                const _0xef_nondesc = (0 <= _0xd4__0xd3_pipeline_result)
                let _0xd5__0xd2_pipeline_result = _0xef_nondesc
                if (_0xd5__0xd2_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xf3_fucks_given = _0xcf_fucks_given
                        let _0xd9__0xd8_pipeline_result = _0xf3_fucks_given
                        const _0xf2_add = (_0xd9__0xd8_pipeline_result + -1)
                        let _0xda__0xd7_pipeline_result = _0xf2_add
                        const _0xf1_fuck_bang_ = await _67lang.maybe_await(_0xcb_fuck_bang_(_0xda__0xd7_pipeline_result))
                        let _0xdb__0xd6_pipeline_result = _0xf1_fuck_bang_
                        _0xdb__0xd6_pipeline_result
                    }
                } 
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



            const _0xf4_print = await _67lang.maybe_await(console.log("hello world"))
            let _0x2f__0x2e_pipeline_result = _0xf4_print
            _0x2f__0x2e_pipeline_result

            const _0xf5_print = await _67lang.maybe_await(console.log("\"hello world\" is a fucking stupid non argument."))
            let _0x31__0x30_pipeline_result = _0xf5_print
            _0x31__0x30_pipeline_result


            const _0xf9_concat = ("new year's " + "eve")
            let _0x36__0x35_pipeline_result = _0xf9_concat
            const _0xf8_eq = ("new year's eve" === _0x36__0x35_pipeline_result)
            let _0x37__0x34_pipeline_result = _0xf8_eq
            const _0xfb_concat = ("a very " + "scary " + "error")
            let _0x3a__0x39_pipeline_result = _0xfb_concat
            const _0xfa_eq = ("a very scary error" === _0x3a__0x39_pipeline_result)
            let _0x3b__0x38_pipeline_result = _0xfa_eq
            const _0xfd_concat = ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x3e__0x3d_pipeline_result = _0xfd_concat
            const _0xfc_eq = ("your regex should be stored into the regex variable." === _0x3e__0x3d_pipeline_result)
            let _0x3f__0x3c_pipeline_result = _0xfc_eq
            const _0xf7_all = (_0x37__0x34_pipeline_result && _0x3b__0x38_pipeline_result && _0x3f__0x3c_pipeline_result)
            let _0x40__0x33_pipeline_result = _0xf7_all
            const _0xf6_print = await _67lang.maybe_await(console.log("this literally cannot be true... yet it is: ", _0x40__0x33_pipeline_result))
            let _0x41__0x32_pipeline_result = _0xf6_print
            _0x41__0x32_pipeline_result

            const _0xfe_print = await _67lang.maybe_await(console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get."))
            let _0x43__0x42_pipeline_result = _0xfe_print
            _0x43__0x42_pipeline_result


            const _0x100_add = (2 + 0 + 2)
            let _0x46__0x45_pipeline_result = _0x100_add
            const _0xff_print = await _67lang.maybe_await(console.log(_0x46__0x45_pipeline_result))
            let _0x47__0x44_pipeline_result = _0xff_print
            _0x47__0x44_pipeline_result
            const _0x102_asc = (0 < 1 && 1 < 2)
            let _0x4a__0x49_pipeline_result = _0x102_asc
            const _0x101_print = await _67lang.maybe_await(console.log(_0x4a__0x49_pipeline_result))
            let _0x4b__0x48_pipeline_result = _0x101_print
            _0x4b__0x48_pipeline_result


            let _0x4c_age = 23
            _0x4c_age
            const _0x104_age = _0x4c_age
            let _0x4f__0x4e_pipeline_result = _0x104_age
            const _0x103_print = await _67lang.maybe_await(console.log("my age is", _0x4f__0x4e_pipeline_result))
            let _0x50__0x4d_pipeline_result = _0x103_print
            _0x50__0x4d_pipeline_result

            const _0x105_age = (_0x4c_age = 25)
            let _0x52__0x51_pipeline_result = _0x105_age
            _0x52__0x51_pipeline_result
            const _0x107_age = _0x4c_age
            let _0x55__0x54_pipeline_result = _0x107_age
            const _0x106_print = await _67lang.maybe_await(console.log("actually, i lied. my age is", _0x55__0x54_pipeline_result))
            let _0x56__0x53_pipeline_result = _0x106_print
            _0x56__0x53_pipeline_result

            let _0x57__0 = 0
            _0x57__0

            const _0x109__0 = _0x57__0
            let _0x5a__0x59_pipeline_result = _0x109__0
            const _0x108_print = await _67lang.maybe_await(console.log(_0x5a__0x59_pipeline_result))
            let _0x5b__0x58_pipeline_result = _0x108_print
            _0x5b__0x58_pipeline_result

            const _0x10a__0 = (_0x57__0 = 2347)
            let _0x5d__0x5c_pipeline_result = _0x10a__0
            _0x5d__0x5c_pipeline_result
            const _0x10c__0 = _0x57__0
            let _0x60__0x5f_pipeline_result = _0x10c__0
            const _0x10b_print = await _67lang.maybe_await(console.log(_0x60__0x5f_pipeline_result))
            let _0x61__0x5e_pipeline_result = _0x10b_print
            _0x61__0x5e_pipeline_result

            let _0x62_discord_dot__at_member_hash_hash = "#2347"
            _0x62_discord_dot__at_member_hash_hash
            let _0x63__67lang_dot__dollar_budget = 0
            _0x63__67lang_dot__dollar_budget
            let _0x64__lp_2347_rp_ = /(2347)/
            _0x64__lp_2347_rp_
            let _0x65__comma_ = true
            _0x65__comma_
            const _0x10e__comma_ = _0x65__comma_
            let _0x68__0x67_pipeline_result = _0x10e__comma_
            const _0x10d_print = await _67lang.maybe_await(console.log(_0x68__0x67_pipeline_result))
            let _0x69__0x66_pipeline_result = _0x10d_print
            _0x69__0x66_pipeline_result


            const _0x111__comma_ = _0x65__comma_
            let _0x6d__0x6c_pipeline_result = _0x111__comma_
            const _0x110__comma_ = (_0x65__comma_ = _0x6d__0x6c_pipeline_result)
            let _0x6e__0x6b_pipeline_result = _0x110__comma_
            const _0x10f__comma_ = (_0x65__comma_ = _0x6e__0x6b_pipeline_result)
            let _0x6f__0x6a_pipeline_result = _0x10f__comma_
            _0x6f__0x6a_pipeline_result

            let _0x70__2347 = "wow, very helpful."
            _0x70__2347
            const _0x113__2347 = _0x70__2347
            const _0x112_split = String.prototype.split.call(_0x113__2347, " ")
            let _0x72__0x71_pipeline_result = _0x112_split
            _0x72__0x71_pipeline_result
            const _0x115__0x71_pipeline_result = _0x72__0x71_pipeline_result
            const _0x114_sort = Array.prototype.sort.call(_0x115__0x71_pipeline_result)
            let _0x74__0x73_pipeline_result = _0x114_sort
            _0x74__0x73_pipeline_result
            const _0x117__0x73_pipeline_result = _0x74__0x73_pipeline_result
            const _0x116_join = Array.prototype.join.call(_0x117__0x73_pipeline_result, ", ")
            let _0x76__0x75_pipeline_result = _0x116_join
            _0x76__0x75_pipeline_result
            const _0x119__0x75_pipeline_result = _0x76__0x75_pipeline_result
            const _0x118_print = await _67lang.maybe_await(console.log(_0x119__0x75_pipeline_result))
            let _0x78__0x77_pipeline_result = _0x118_print
            _0x78__0x77_pipeline_result


            let _0x79__67lang_dot_features = {}
            _0x79__67lang_dot_features
            const _0x11b__67lang_dot_features = _0x79__67lang_dot_features
            const _0x11a__hash_ = (_0x11b__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
            let _0x7b__0x7a_pipeline_result = _0x11a__hash_
            _0x7b__0x7a_pipeline_result

            const _0x11d__67lang_dot_features = _0x79__67lang_dot_features
            const _0x11c__hash_ = (_0x11d__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
            let _0x7d__0x7c_pipeline_result = _0x11c__hash_
            _0x7d__0x7c_pipeline_result

            const _0x11f__67lang_dot_features = _0x79__67lang_dot_features
            const _0x11e__hash_ = _0x11f__67lang_dot_features["the flexibility of identifiers"]
            let _0x7f__0x7e_pipeline_result = _0x11e__hash_
            let _0x80__we_really_needed_the_generics_yesterday_bang_ = _0x7f__0x7e_pipeline_result
            _0x80__we_really_needed_the_generics_yesterday_bang_
            const _0x121__we_really_needed_the_generics_yesterday_bang_ = _0x80__we_really_needed_the_generics_yesterday_bang_
            const _0x120_slice = String.prototype.slice.call(_0x121__we_really_needed_the_generics_yesterday_bang_, 0, 67)
            let _0x82__0x81_pipeline_result = _0x120_slice
            _0x82__0x81_pipeline_result
            const _0x123__0x81_pipeline_result = _0x82__0x81_pipeline_result
            const _0x122_print = await _67lang.maybe_await(console.log(_0x123__0x81_pipeline_result))
            let _0x84__0x83_pipeline_result = _0x122_print
            _0x84__0x83_pipeline_result


            if (true)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x124_print = await _67lang.maybe_await(console.log("big"))
                    let _0x86__0x85_pipeline_result = _0x124_print
                    _0x86__0x85_pipeline_result
                }
            } 

            if (false)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x125_print = await _67lang.maybe_await(console.log("big"))
                    let _0x88__0x87_pipeline_result = _0x125_print
                    _0x88__0x87_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x126_print = await _67lang.maybe_await(console.log("my disappointment is immeasurable and my day is ruined."))
                    let _0x8a__0x89_pipeline_result = _0x126_print
                    _0x8a__0x89_pipeline_result
                }
            } 

            let _0x8b_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x8b_i_hate_this_trash_bang_

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x8e__0x8c_for_angy__index = 0
                    _0x8e__0x8c_for_angy__index
                    const _0x127_i_hate_this_trash_bang_ = _0x8b_i_hate_this_trash_bang_
                    let _0x90__0x8f_pipeline_result = _0x127_i_hate_this_trash_bang_
                    let _0x91__0x8d_for_angy__list = _0x90__0x8f_pipeline_result
                    _0x91__0x8d_for_angy__list
                    while(true) {
                        const _0x129__0x8c_for_angy__index = _0x8e__0x8c_for_angy__index
                        let _0x94__0x93_pipeline_result = _0x129__0x8c_for_angy__index
                        const _0x12b__0x8d_for_angy__list = _0x91__0x8d_for_angy__list
                        const _0x12a_length = (_0x12b__0x8d_for_angy__list.length)
                        let _0x96__0x95_pipeline_result = _0x12a_length
                        const _0x128_asc = (_0x94__0x93_pipeline_result < _0x96__0x95_pipeline_result)
                        let _0x97__0x92_pipeline_result = _0x128_asc
                        if (!_0x97__0x92_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x12d__0x8d_for_angy__list = _0x91__0x8d_for_angy__list
                                const _0x12e__0x8c_for_angy__index = _0x8e__0x8c_for_angy__index
                                let _0x9a__0x99_pipeline_result = _0x12e__0x8c_for_angy__index
                                const _0x12c__hash_ = _0x12d__0x8d_for_angy__list[_0x9a__0x99_pipeline_result]
                                let _0x9b__0x98_pipeline_result = _0x12c__hash_
                                let _0x9c_angy = _0x9b__0x98_pipeline_result
                                _0x9c_angy
                                const _0x131__0x8c_for_angy__index = _0x8e__0x8c_for_angy__index
                                const _0x130_add = (_0x131__0x8c_for_angy__index + 1)
                                let _0x9f__0x9e_pipeline_result = _0x130_add
                                const _0x12f__0x8c_for_angy__index = (_0x8e__0x8c_for_angy__index = _0x9f__0x9e_pipeline_result)
                                let _0xa0__0x9d_pipeline_result = _0x12f__0x8c_for_angy__index
                                _0xa0__0x9d_pipeline_result
                                const _0x134_angy = _0x9c_angy
                                let _0xa4__0xa3_pipeline_result = _0x134_angy
                                const _0x133_concat = (_0xa4__0xa3_pipeline_result + "!!!")
                                let _0xa5__0xa2_pipeline_result = _0x133_concat
                                const _0x132_print = await _67lang.maybe_await(console.log(_0xa5__0xa2_pipeline_result))
                                let _0xa6__0xa1_pipeline_result = _0x132_print
                                _0xa6__0xa1_pipeline_result
                            }
                        } }
                }
            } 


            let _0xa7_does_a_decent_programming_language_exist_q_ = false
            _0xa7_does_a_decent_programming_language_exist_q_
            while(true) {
                const _0x135_does_a_decent_programming_language_exist_q_ = _0xa7_does_a_decent_programming_language_exist_q_
                let _0xa9__0xa8_pipeline_result = _0x135_does_a_decent_programming_language_exist_q_
                if (!_0xa9__0xa8_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x136_print = await _67lang.maybe_await(console.log("code for quality software"))
                        let _0xab__0xaa_pipeline_result = _0x136_print
                        _0xab__0xaa_pipeline_result
                    }
                } }


            const _0x138_all = (true && true && false)
            let _0xae__0xad_pipeline_result = _0x138_all
            const _0x137_print = await _67lang.maybe_await(console.log("false: ", _0xae__0xad_pipeline_result))
            let _0xaf__0xac_pipeline_result = _0x137_print
            _0xaf__0xac_pipeline_result
            const _0x13a_any = (true || false || false)
            let _0xb2__0xb1_pipeline_result = _0x13a_any
            const _0x139_print = await _67lang.maybe_await(console.log("true: ", _0xb2__0xb1_pipeline_result))
            let _0xb3__0xb0_pipeline_result = _0x139_print
            _0xb3__0xb0_pipeline_result
            const _0x13c_none = !(false || false || false)
            let _0xb6__0xb5_pipeline_result = _0x13c_none
            const _0x13b_print = await _67lang.maybe_await(console.log("true: ", _0xb6__0xb5_pipeline_result))
            let _0xb7__0xb4_pipeline_result = _0x13b_print
            _0xb7__0xb4_pipeline_result
            const _0x13e_add = (1 + 1 + 1 + 1 + 1 + 1)
            let _0xba__0xb9_pipeline_result = _0x13e_add
            const _0x13d_print = await _67lang.maybe_await(console.log("6: ", _0xba__0xb9_pipeline_result))
            let _0xbb__0xb8_pipeline_result = _0x13d_print
            _0xbb__0xb8_pipeline_result


            let _0xbc__2347 = 2347
            _0xbc__2347
            let _0xbd_where_q_ = "not even in Nebraska."
            _0xbd_where_q_


            const _0x141_where_q_ = _0xbd_where_q_
            let _0xc3__0xc2_pipeline_result = _0x141_where_q_
            _0xc3__0xc2_pipeline_result

            const _0x145_where_q_ = _0xbd_where_q_
            const _0x144_split = String.prototype.split.call(_0x145_where_q_, " ")
            let _0xc7__0xc6_pipeline_result = _0x144_split
            _0xc7__0xc6_pipeline_result



            const _0x148_fuck_bang_ = await _67lang.maybe_await(_0xcb_fuck_bang_(6))
            let _0xdd__0xdc_pipeline_result = _0x148_fuck_bang_
            _0xdd__0xdc_pipeline_result



        }
    } 
})();
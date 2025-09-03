
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
    const _0x9d_fuck_bang_ = async function (
        fucks_given
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                fucks_given = fucks_given
                let _0x9e_fucks_given = fucks_given
                _0x9e_fucks_given
                const _0xb0_fucks_given = await _0x9e_fucks_given
                let _0xa0__0x9f_pipeline_result = _0xb0_fucks_given
                let _0xa1_fucks_given = _0xa0__0x9f_pipeline_result
                _0xa1_fucks_given
                const _0xb1_print = await console.log("fuck!")
                let _0xa3__0xa2_pipeline_result = _0xb1_print
                _0xa3__0xa2_pipeline_result
                const _0xb3_fucks_given = await _0xa1_fucks_given
                let _0xa6__0xa5_pipeline_result = _0xb3_fucks_given
                const _0xb2_nondesc = await (0 <= _0xa6__0xa5_pipeline_result)
                let _0xa7__0xa4_pipeline_result = _0xb2_nondesc
                if (_0xa7__0xa4_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xb6_fucks_given = await _0xa1_fucks_given
                        let _0xab__0xaa_pipeline_result = _0xb6_fucks_given
                        const _0xb5_add = await (_0xab__0xaa_pipeline_result + -1)
                        let _0xac__0xa9_pipeline_result = _0xb5_add
                        const _0xb4_fuck_bang_ = await _0x9d_fuck_bang_(_0xac__0xa9_pipeline_result)
                        let _0xad__0xa8_pipeline_result = _0xb4_fuck_bang_
                        _0xad__0xa8_pipeline_result
                    }
                } 
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)



            const _0xb7_print = await console.log("hello world")
            let _0x1__0x0_pipeline_result = _0xb7_print
            _0x1__0x0_pipeline_result

            const _0xb8_print = await console.log("\"hello world\" is a fucking stupid non argument.")
            let _0x3__0x2_pipeline_result = _0xb8_print
            _0x3__0x2_pipeline_result


            const _0xbc_concat = await String.prototype.concat.call("new year's ", "eve")
            let _0x8__0x7_pipeline_result = _0xbc_concat
            const _0xbb_eq = await ("new year's eve" === _0x8__0x7_pipeline_result)
            let _0x9__0x6_pipeline_result = _0xbb_eq
            const _0xbe_concat = await ("a very " + "scary " + "error")
            let _0xc__0xb_pipeline_result = _0xbe_concat
            const _0xbd_eq = await ("a very scary error" === _0xc__0xb_pipeline_result)
            let _0xd__0xa_pipeline_result = _0xbd_eq
            const _0xc0_concat = await ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x10__0xf_pipeline_result = _0xc0_concat
            const _0xbf_eq = await ("your regex should be stored into the regex variable." === _0x10__0xf_pipeline_result)
            let _0x11__0xe_pipeline_result = _0xbf_eq
            const _0xba_all = await (_0x9__0x6_pipeline_result && _0xd__0xa_pipeline_result && _0x11__0xe_pipeline_result)
            let _0x12__0x5_pipeline_result = _0xba_all
            const _0xb9_print = await console.log("this literally cannot be true... yet it is: ", _0x12__0x5_pipeline_result)
            let _0x13__0x4_pipeline_result = _0xb9_print
            _0x13__0x4_pipeline_result

            const _0xc1_print = await console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            let _0x15__0x14_pipeline_result = _0xc1_print
            _0x15__0x14_pipeline_result


            const _0xc3_add = await (2 + 0 + 2)
            let _0x18__0x17_pipeline_result = _0xc3_add
            const _0xc2_print = await console.log(_0x18__0x17_pipeline_result)
            let _0x19__0x16_pipeline_result = _0xc2_print
            _0x19__0x16_pipeline_result
            const _0xc5_asc = await (0 < 1 && 1 < 2)
            let _0x1c__0x1b_pipeline_result = _0xc5_asc
            const _0xc4_print = await console.log(_0x1c__0x1b_pipeline_result)
            let _0x1d__0x1a_pipeline_result = _0xc4_print
            _0x1d__0x1a_pipeline_result


            let _0x1e_age = 23
            _0x1e_age
            const _0xc7_age = await _0x1e_age
            let _0x21__0x20_pipeline_result = _0xc7_age
            const _0xc6_print = await console.log("my age is", _0x21__0x20_pipeline_result)
            let _0x22__0x1f_pipeline_result = _0xc6_print
            _0x22__0x1f_pipeline_result

            const _0xc8_age = await (_0x1e_age = 25)
            let _0x24__0x23_pipeline_result = _0xc8_age
            _0x24__0x23_pipeline_result
            const _0xca_age = await _0x1e_age
            let _0x27__0x26_pipeline_result = _0xca_age
            const _0xc9_print = await console.log("actually, i lied. my age is", _0x27__0x26_pipeline_result)
            let _0x28__0x25_pipeline_result = _0xc9_print
            _0x28__0x25_pipeline_result

            let _0x29__0 = 0
            _0x29__0

            const _0xcc__0 = await _0x29__0
            let _0x2c__0x2b_pipeline_result = _0xcc__0
            const _0xcb_print = await console.log(_0x2c__0x2b_pipeline_result)
            let _0x2d__0x2a_pipeline_result = _0xcb_print
            _0x2d__0x2a_pipeline_result

            const _0xcd__0 = await (_0x29__0 = 2347)
            let _0x2f__0x2e_pipeline_result = _0xcd__0
            _0x2f__0x2e_pipeline_result
            const _0xcf__0 = await _0x29__0
            let _0x32__0x31_pipeline_result = _0xcf__0
            const _0xce_print = await console.log(_0x32__0x31_pipeline_result)
            let _0x33__0x30_pipeline_result = _0xce_print
            _0x33__0x30_pipeline_result

            let _0x34_discord_dot__at_member_hash_hash = "#2347"
            _0x34_discord_dot__at_member_hash_hash
            let _0x35__67lang_dot__dollar_budget = 0
            _0x35__67lang_dot__dollar_budget
            let _0x36__lp_2347_rp_ = /(2347)/
            _0x36__lp_2347_rp_
            let _0x37__comma_ = true
            _0x37__comma_
            const _0xd1__comma_ = await _0x37__comma_
            let _0x3a__0x39_pipeline_result = _0xd1__comma_
            const _0xd0_print = await console.log(_0x3a__0x39_pipeline_result)
            let _0x3b__0x38_pipeline_result = _0xd0_print
            _0x3b__0x38_pipeline_result


            const _0xd4__comma_ = await _0x37__comma_
            let _0x3f__0x3e_pipeline_result = _0xd4__comma_
            const _0xd3__comma_ = await (_0x37__comma_ = _0x3f__0x3e_pipeline_result)
            let _0x40__0x3d_pipeline_result = _0xd3__comma_
            const _0xd2__comma_ = await (_0x37__comma_ = _0x40__0x3d_pipeline_result)
            let _0x41__0x3c_pipeline_result = _0xd2__comma_
            _0x41__0x3c_pipeline_result

            let _0x42__2347 = "wow, very helpful."
            _0x42__2347
            const _0xd6__2347 = await _0x42__2347
            const _0xd5_split = await String.prototype.split.call(_0xd6__2347, " ")
            let _0x44__0x43_pipeline_result = _0xd5_split
            _0x44__0x43_pipeline_result
            const _0xd8__0x43_pipeline_result = await _0x44__0x43_pipeline_result
            const _0xd7_sort = await Array.prototype.sort.call(_0xd8__0x43_pipeline_result)
            let _0x46__0x45_pipeline_result = _0xd7_sort
            _0x46__0x45_pipeline_result
            const _0xda__0x45_pipeline_result = await _0x46__0x45_pipeline_result
            const _0xd9_join = await Array.prototype.join.call(_0xda__0x45_pipeline_result, ", ")
            let _0x48__0x47_pipeline_result = _0xd9_join
            _0x48__0x47_pipeline_result
            const _0xdc__0x47_pipeline_result = await _0x48__0x47_pipeline_result
            const _0xdb_print = await console.log(_0xdc__0x47_pipeline_result)
            let _0x4a__0x49_pipeline_result = _0xdb_print
            _0x4a__0x49_pipeline_result


            let _0x4b__67lang_dot_features = {}
            _0x4b__67lang_dot_features
            const _0xde__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xdd__hash_ = await (_0xde__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
            let _0x4d__0x4c_pipeline_result = _0xdd__hash_
            _0x4d__0x4c_pipeline_result

            const _0xe0__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xdf__hash_ = await (_0xe0__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
            let _0x4f__0x4e_pipeline_result = _0xdf__hash_
            _0x4f__0x4e_pipeline_result

            const _0xe2__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xe1__hash_ = await _0xe2__67lang_dot_features["the flexibility of identifiers"]
            let _0x51__0x50_pipeline_result = _0xe1__hash_
            let _0x52__we_really_needed_the_generics_yesterday_bang_ = _0x51__0x50_pipeline_result
            _0x52__we_really_needed_the_generics_yesterday_bang_
            const _0xe4__we_really_needed_the_generics_yesterday_bang_ = await _0x52__we_really_needed_the_generics_yesterday_bang_
            const _0xe3_slice = await String.prototype.slice.call(_0xe4__we_really_needed_the_generics_yesterday_bang_, 0, 67)
            let _0x54__0x53_pipeline_result = _0xe3_slice
            _0x54__0x53_pipeline_result
            const _0xe6__0x53_pipeline_result = await _0x54__0x53_pipeline_result
            const _0xe5_print = await console.log(_0xe6__0x53_pipeline_result)
            let _0x56__0x55_pipeline_result = _0xe5_print
            _0x56__0x55_pipeline_result


            if (true)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xe7_print = await console.log("big")
                    let _0x58__0x57_pipeline_result = _0xe7_print
                    _0x58__0x57_pipeline_result
                }
            } 

            if (false)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xe8_print = await console.log("big")
                    let _0x5a__0x59_pipeline_result = _0xe8_print
                    _0x5a__0x59_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xe9_print = await console.log("my disappointment is immeasurable and my day is ruined.")
                    let _0x5c__0x5b_pipeline_result = _0xe9_print
                    _0x5c__0x5b_pipeline_result
                }
            } 

            let _0x5d_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x5d_i_hate_this_trash_bang_

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x60__0x5e_for_angy__index = 0
                    _0x60__0x5e_for_angy__index
                    const _0xea_i_hate_this_trash_bang_ = await _0x5d_i_hate_this_trash_bang_
                    let _0x62__0x61_pipeline_result = _0xea_i_hate_this_trash_bang_
                    let _0x63__0x5f_for_angy__list = _0x62__0x61_pipeline_result
                    _0x63__0x5f_for_angy__list
                    while(true) {
                        const _0xec__0x5e_for_angy__index = await _0x60__0x5e_for_angy__index
                        let _0x66__0x65_pipeline_result = _0xec__0x5e_for_angy__index
                        const _0xee__0x5f_for_angy__list = await _0x63__0x5f_for_angy__list
                        const _0xed_length = await (_0xee__0x5f_for_angy__list.length)
                        let _0x68__0x67_pipeline_result = _0xed_length
                        const _0xeb_asc = await (_0x66__0x65_pipeline_result < _0x68__0x67_pipeline_result)
                        let _0x69__0x64_pipeline_result = _0xeb_asc
                        if (!_0x69__0x64_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xf0__0x5f_for_angy__list = await _0x63__0x5f_for_angy__list
                                const _0xf1__0x5e_for_angy__index = await _0x60__0x5e_for_angy__index
                                let _0x6c__0x6b_pipeline_result = _0xf1__0x5e_for_angy__index
                                const _0xef__hash_ = await _0xf0__0x5f_for_angy__list[_0x6c__0x6b_pipeline_result]
                                let _0x6d__0x6a_pipeline_result = _0xef__hash_
                                let _0x6e_angy = _0x6d__0x6a_pipeline_result
                                _0x6e_angy
                                const _0xf4__0x5e_for_angy__index = await _0x60__0x5e_for_angy__index
                                const _0xf3_add = await (_0xf4__0x5e_for_angy__index + 1)
                                let _0x71__0x70_pipeline_result = _0xf3_add
                                const _0xf2__0x5e_for_angy__index = await (_0x60__0x5e_for_angy__index = _0x71__0x70_pipeline_result)
                                let _0x72__0x6f_pipeline_result = _0xf2__0x5e_for_angy__index
                                _0x72__0x6f_pipeline_result
                                const _0xf7_angy = await _0x6e_angy
                                let _0x76__0x75_pipeline_result = _0xf7_angy
                                const _0xf6_concat = await String.prototype.concat.call(_0x76__0x75_pipeline_result, "!!!")
                                let _0x77__0x74_pipeline_result = _0xf6_concat
                                const _0xf5_print = await console.log(_0x77__0x74_pipeline_result)
                                let _0x78__0x73_pipeline_result = _0xf5_print
                                _0x78__0x73_pipeline_result
                            }
                        } }
                }
            } 


            let _0x79_does_a_decent_programming_language_exist_q_ = false
            _0x79_does_a_decent_programming_language_exist_q_
            while(true) {
                const _0xf8_does_a_decent_programming_language_exist_q_ = await _0x79_does_a_decent_programming_language_exist_q_
                let _0x7b__0x7a_pipeline_result = _0xf8_does_a_decent_programming_language_exist_q_
                if (!_0x7b__0x7a_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xf9_print = await console.log("code for quality software")
                        let _0x7d__0x7c_pipeline_result = _0xf9_print
                        _0x7d__0x7c_pipeline_result
                    }
                } }


            const _0xfb_all = await (true && true && false)
            let _0x80__0x7f_pipeline_result = _0xfb_all
            const _0xfa_print = await console.log("false: ", _0x80__0x7f_pipeline_result)
            let _0x81__0x7e_pipeline_result = _0xfa_print
            _0x81__0x7e_pipeline_result
            const _0xfd_any = await (true || false || false)
            let _0x84__0x83_pipeline_result = _0xfd_any
            const _0xfc_print = await console.log("true: ", _0x84__0x83_pipeline_result)
            let _0x85__0x82_pipeline_result = _0xfc_print
            _0x85__0x82_pipeline_result
            const _0xff_none = await !(false || false || false)
            let _0x88__0x87_pipeline_result = _0xff_none
            const _0xfe_print = await console.log("true: ", _0x88__0x87_pipeline_result)
            let _0x89__0x86_pipeline_result = _0xfe_print
            _0x89__0x86_pipeline_result
            const _0x101_add = await (1 + 1 + 1 + 1 + 1 + 1)
            let _0x8c__0x8b_pipeline_result = _0x101_add
            const _0x100_print = await console.log("6: ", _0x8c__0x8b_pipeline_result)
            let _0x8d__0x8a_pipeline_result = _0x100_print
            _0x8d__0x8a_pipeline_result


            let _0x8e__2347 = 2347
            _0x8e__2347
            let _0x8f_where_q_ = "not even in Nebraska."
            _0x8f_where_q_


            const _0x104_where_q_ = await _0x8f_where_q_
            let _0x95__0x94_pipeline_result = _0x104_where_q_
            _0x95__0x94_pipeline_result

            const _0x108_where_q_ = await _0x8f_where_q_
            const _0x107_split = await String.prototype.split.call(_0x108_where_q_, " ")
            let _0x99__0x98_pipeline_result = _0x107_split
            _0x99__0x98_pipeline_result



            const _0x10b_fuck_bang_ = await _0x9d_fuck_bang_(6)
            let _0xaf__0xae_pipeline_result = _0x10b_fuck_bang_
            _0xaf__0xae_pipeline_result



        }
    } 
})();
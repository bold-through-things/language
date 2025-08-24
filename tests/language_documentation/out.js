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
    const _0x8c_fuck_bang_ = async function (
        fucks_given
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                fucks_given = fucks_given
                let _0x8d_fucks_given = fucks_given
                _0x8d_fucks_given
                const _0x9f_fucks_given = await _0x8d_fucks_given
                let _0x8f__0x8e_pipeline_result = _0x9f_fucks_given
                let _0x90_fucks_given = _0x8f__0x8e_pipeline_result
                _0x90_fucks_given
                const _0xa0_print = await console.log("fuck!")
                let _0x92__0x91_pipeline_result = _0xa0_print
                _0x92__0x91_pipeline_result
                const _0xa2_fucks_given = await _0x90_fucks_given
                let _0x95__0x94_pipeline_result = _0xa2_fucks_given
                const _0xa1_nondesc = await (0 <= _0x95__0x94_pipeline_result)
                let _0x96__0x93_pipeline_result = _0xa1_nondesc
                if (_0x96__0x93_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xa5_fucks_given = await _0x90_fucks_given
                        let _0x9a__0x99_pipeline_result = _0xa5_fucks_given
                        const _0xa4_add = await (_0x9a__0x99_pipeline_result + -1)
                        let _0x9b__0x98_pipeline_result = _0xa4_add
                        const _0xa3_fuck_bang_ = await _0x8c_fuck_bang_(_0x9b__0x98_pipeline_result)
                        let _0x9c__0x97_pipeline_result = _0xa3_fuck_bang_
                        _0x9c__0x97_pipeline_result
                    }
                } 
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)



            const _0xa6_print = await console.log("hello world")
            let _0x1__0x0_pipeline_result = _0xa6_print
            _0x1__0x0_pipeline_result

            const _0xa7_print = await console.log("\"hello world\" is a fucking stupid non argument.")
            let _0x3__0x2_pipeline_result = _0xa7_print
            _0x3__0x2_pipeline_result


            const _0xab_concat = await String.prototype.concat.call("new year's ", "eve")
            let _0x8__0x7_pipeline_result = _0xab_concat
            const _0xaa_eq = await ("new year's eve" === _0x8__0x7_pipeline_result)
            let _0x9__0x6_pipeline_result = _0xaa_eq
            const _0xad_concat = await ("a very " + "scary " + "error")
            let _0xc__0xb_pipeline_result = _0xad_concat
            const _0xac_eq = await ("a very scary error" === _0xc__0xb_pipeline_result)
            let _0xd__0xa_pipeline_result = _0xac_eq
            const _0xaf_concat = await ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x10__0xf_pipeline_result = _0xaf_concat
            const _0xae_eq = await ("your regex should be stored into the regex variable." === _0x10__0xf_pipeline_result)
            let _0x11__0xe_pipeline_result = _0xae_eq
            const _0xa9_all = await (_0x9__0x6_pipeline_result && _0xd__0xa_pipeline_result && _0x11__0xe_pipeline_result)
            let _0x12__0x5_pipeline_result = _0xa9_all
            const _0xa8_print = await console.log("this literally cannot be true... yet it is: ", _0x12__0x5_pipeline_result)
            let _0x13__0x4_pipeline_result = _0xa8_print
            _0x13__0x4_pipeline_result

            const _0xb0_print = await console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            let _0x15__0x14_pipeline_result = _0xb0_print
            _0x15__0x14_pipeline_result


            const _0xb2_add = await (2 + 0 + 2)
            let _0x18__0x17_pipeline_result = _0xb2_add
            const _0xb1_print = await console.log(_0x18__0x17_pipeline_result)
            let _0x19__0x16_pipeline_result = _0xb1_print
            _0x19__0x16_pipeline_result
            const _0xb4_asc = await (0 < 1 && 1 < 2)
            let _0x1c__0x1b_pipeline_result = _0xb4_asc
            const _0xb3_print = await console.log(_0x1c__0x1b_pipeline_result)
            let _0x1d__0x1a_pipeline_result = _0xb3_print
            _0x1d__0x1a_pipeline_result


            let _0x1e_age = 23
            _0x1e_age
            const _0xb6_age = await _0x1e_age
            let _0x21__0x20_pipeline_result = _0xb6_age
            const _0xb5_print = await console.log("my age is", _0x21__0x20_pipeline_result)
            let _0x22__0x1f_pipeline_result = _0xb5_print
            _0x22__0x1f_pipeline_result

            const _0xb7_age = await (_0x1e_age = 25)
            let _0x24__0x23_pipeline_result = _0xb7_age
            _0x24__0x23_pipeline_result
            const _0xb9_age = await _0x1e_age
            let _0x27__0x26_pipeline_result = _0xb9_age
            const _0xb8_print = await console.log("actually, i lied. my age is", _0x27__0x26_pipeline_result)
            let _0x28__0x25_pipeline_result = _0xb8_print
            _0x28__0x25_pipeline_result

            let _0x29__0 = 0
            _0x29__0

            const _0xbb__0 = await _0x29__0
            let _0x2c__0x2b_pipeline_result = _0xbb__0
            const _0xba_print = await console.log(_0x2c__0x2b_pipeline_result)
            let _0x2d__0x2a_pipeline_result = _0xba_print
            _0x2d__0x2a_pipeline_result

            const _0xbc__0 = await (_0x29__0 = 2347)
            let _0x2f__0x2e_pipeline_result = _0xbc__0
            _0x2f__0x2e_pipeline_result
            const _0xbe__0 = await _0x29__0
            let _0x32__0x31_pipeline_result = _0xbe__0
            const _0xbd_print = await console.log(_0x32__0x31_pipeline_result)
            let _0x33__0x30_pipeline_result = _0xbd_print
            _0x33__0x30_pipeline_result

            let _0x34_discord_dot__at_member_hash_hash = "#2347"
            _0x34_discord_dot__at_member_hash_hash
            let _0x35__67lang_dot__dollar_budget = 0
            _0x35__67lang_dot__dollar_budget
            let _0x36__lp_2347_rp_ = /(2347)/
            _0x36__lp_2347_rp_
            let _0x37__comma_ = true
            _0x37__comma_
            const _0xc0__comma_ = await _0x37__comma_
            let _0x3a__0x39_pipeline_result = _0xc0__comma_
            const _0xbf_print = await console.log(_0x3a__0x39_pipeline_result)
            let _0x3b__0x38_pipeline_result = _0xbf_print
            _0x3b__0x38_pipeline_result


            const _0xc3__comma_ = await _0x37__comma_
            let _0x3f__0x3e_pipeline_result = _0xc3__comma_
            const _0xc2__comma_ = await (_0x37__comma_ = _0x3f__0x3e_pipeline_result)
            let _0x40__0x3d_pipeline_result = _0xc2__comma_
            const _0xc1__comma_ = await (_0x37__comma_ = _0x40__0x3d_pipeline_result)
            let _0x41__0x3c_pipeline_result = _0xc1__comma_
            _0x41__0x3c_pipeline_result

            let _0x42__2347 = "wow, very helpful."
            _0x42__2347
            const _0xc5__2347 = await _0x42__2347
            const _0xc4_split = await String.prototype.split.call(_0xc5__2347, " ")
            let _0x44__0x43_pipeline_result = _0xc4_split
            _0x44__0x43_pipeline_result
            const _0xc7__0x43_pipeline_result = await _0x44__0x43_pipeline_result
            const _0xc6_sort = await Array.prototype.sort.call(_0xc7__0x43_pipeline_result)
            let _0x46__0x45_pipeline_result = _0xc6_sort
            _0x46__0x45_pipeline_result
            const _0xc9__0x45_pipeline_result = await _0x46__0x45_pipeline_result
            const _0xc8_join = await Array.prototype.join.call(_0xc9__0x45_pipeline_result, ", ")
            let _0x48__0x47_pipeline_result = _0xc8_join
            _0x48__0x47_pipeline_result
            const _0xcb__0x47_pipeline_result = await _0x48__0x47_pipeline_result
            const _0xca_print = await console.log(_0xcb__0x47_pipeline_result)
            let _0x4a__0x49_pipeline_result = _0xca_print
            _0x4a__0x49_pipeline_result


            let _0x4b__67lang_dot_features = {}
            _0x4b__67lang_dot_features
            const _0xcd__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xcc__hash_ = await (_0xcd__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
            let _0x4d__0x4c_pipeline_result = _0xcc__hash_
            _0x4d__0x4c_pipeline_result

            const _0xcf__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xce__hash_ = await (_0xcf__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
            let _0x4f__0x4e_pipeline_result = _0xce__hash_
            _0x4f__0x4e_pipeline_result

            const _0xd1__67lang_dot_features = await _0x4b__67lang_dot_features
            const _0xd0__hash_ = await _0xd1__67lang_dot_features["the flexibility of identifiers"]
            let _0x51__0x50_pipeline_result = _0xd0__hash_
            let _0x52__we_really_needed_the_generics_yesterday_bang_ = _0x51__0x50_pipeline_result
            _0x52__we_really_needed_the_generics_yesterday_bang_
            const _0xd3__we_really_needed_the_generics_yesterday_bang_ = await _0x52__we_really_needed_the_generics_yesterday_bang_
            const _0xd2_slice = await Array.prototype.slice.call(_0xd3__we_really_needed_the_generics_yesterday_bang_, 0, 67)
            let _0x54__0x53_pipeline_result = _0xd2_slice
            _0x54__0x53_pipeline_result
            const _0xd5__0x53_pipeline_result = await _0x54__0x53_pipeline_result
            const _0xd4_join = await Array.prototype.join.call(_0xd5__0x53_pipeline_result, "")
            let _0x56__0x55_pipeline_result = _0xd4_join
            _0x56__0x55_pipeline_result
            const _0xd7__0x55_pipeline_result = await _0x56__0x55_pipeline_result
            const _0xd6_print = await console.log(_0xd7__0x55_pipeline_result)
            let _0x58__0x57_pipeline_result = _0xd6_print
            _0x58__0x57_pipeline_result


            if (true)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xd8_print = await console.log("big")
                    let _0x5a__0x59_pipeline_result = _0xd8_print
                    _0x5a__0x59_pipeline_result
                }
            } 

            if (false)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xd9_print = await console.log("big")
                    let _0x5c__0x5b_pipeline_result = _0xd9_print
                    _0x5c__0x5b_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xda_print = await console.log("my disappointment is immeasurable and my day is ruined.")
                    let _0x5e__0x5d_pipeline_result = _0xda_print
                    _0x5e__0x5d_pipeline_result
                }
            } 

            let _0x5f_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x5f_i_hate_this_trash_bang_

            const _0xdb_i_hate_this_trash_bang_ = await _0x5f_i_hate_this_trash_bang_
            let _0x61__0x60_pipeline_result = _0xdb_i_hate_this_trash_bang_

            const _0xdc_iter = _0x61__0x60_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xdc_iter.next();
                if (done) { break; }
                let angy = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xdf_angy = await angy
                        let _0x65__0x64_pipeline_result = _0xdf_angy
                        const _0xde_concat = await String.prototype.concat.call(_0x65__0x64_pipeline_result, "!!!")
                        let _0x66__0x63_pipeline_result = _0xde_concat
                        const _0xdd_print = await console.log(_0x66__0x63_pipeline_result)
                        let _0x67__0x62_pipeline_result = _0xdd_print
                        _0x67__0x62_pipeline_result
                    }
                } }


            let _0x68_does_a_decent_programming_language_exist_q_ = false
            _0x68_does_a_decent_programming_language_exist_q_
            while(true) {const _0xe0_does_a_decent_programming_language_exist_q_ = await _0x68_does_a_decent_programming_language_exist_q_
                let _0x6a__0x69_pipeline_result = _0xe0_does_a_decent_programming_language_exist_q_
                if (!_0x6a__0x69_pipeline_result) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xe1_print = await console.log("code for quality software")
                        let _0x6c__0x6b_pipeline_result = _0xe1_print
                        _0x6c__0x6b_pipeline_result
                    }
                } }


            const _0xe3_all = await (true && true && false)
            let _0x6f__0x6e_pipeline_result = _0xe3_all
            const _0xe2_print = await console.log("false: ", _0x6f__0x6e_pipeline_result)
            let _0x70__0x6d_pipeline_result = _0xe2_print
            _0x70__0x6d_pipeline_result
            const _0xe5_any = await (true || false || false)
            let _0x73__0x72_pipeline_result = _0xe5_any
            const _0xe4_print = await console.log("true: ", _0x73__0x72_pipeline_result)
            let _0x74__0x71_pipeline_result = _0xe4_print
            _0x74__0x71_pipeline_result
            const _0xe7_none = await !(false || false || false)
            let _0x77__0x76_pipeline_result = _0xe7_none
            const _0xe6_print = await console.log("true: ", _0x77__0x76_pipeline_result)
            let _0x78__0x75_pipeline_result = _0xe6_print
            _0x78__0x75_pipeline_result
            const _0xe9_add = await (1 + 1 + 1 + 1 + 1 + 1)
            let _0x7b__0x7a_pipeline_result = _0xe9_add
            const _0xe8_print = await console.log("6: ", _0x7b__0x7a_pipeline_result)
            let _0x7c__0x79_pipeline_result = _0xe8_print
            _0x7c__0x79_pipeline_result


            let _0x7d__2347 = 2347
            _0x7d__2347
            let _0x7e_where_q_ = "not even in Nebraska."
            _0x7e_where_q_


            const _0xec_where_q_ = await _0x7e_where_q_
            let _0x84__0x83_pipeline_result = _0xec_where_q_
            _0x84__0x83_pipeline_result

            const _0xf2_where_q_ = await _0x7e_where_q_
            const _0xf1_split = await String.prototype.split.call(_0xf2_where_q_, " ")
            let _0x88__0x87_pipeline_result = _0xf1_split
            _0x88__0x87_pipeline_result



            const _0xf5_fuck_bang_ = await _0x8c_fuck_bang_(6)
            let _0x9e__0x9d_pipeline_result = _0xf5_fuck_bang_
            _0x9e__0x9d_pipeline_result



        }
    } 
})();
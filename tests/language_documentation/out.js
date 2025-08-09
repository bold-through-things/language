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
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)



            const _0xa0_print = await console.log("hello world")
            let _0x0_print = _0xa0_print
            _0x0_print

            const _0xa1_print = await console.log("\"hello world\" is a fucking stupid non argument.")
            let _0x1_print = _0xa1_print
            _0x1_print


            const _0xa5_concat = await ("new year's " + "eve")
            let _0x13__0x2_concat = _0xa5_concat
            const _0xa4_eq = await ("new year's eve" === _0x13__0x2_concat)
            let _0x14__0x3_eq = _0xa4_eq
            const _0xa7_concat = await ("a very " + "scary " + "error")
            let _0x15__0x5_concat = _0xa7_concat
            const _0xa6_eq = await ("a very scary error" === _0x15__0x5_concat)
            let _0x16__0x6_eq = _0xa6_eq
            const _0xa9_concat = await ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x17__0x8_concat = _0xa9_concat
            const _0xa8_eq = await ("your regex should be stored into the regex variable." === _0x17__0x8_concat)
            let _0x18__0x9_eq = _0xa8_eq
            const _0xa3_all = await (_0x14__0x3_eq && _0x16__0x6_eq && _0x18__0x9_eq)
            let _0x19__0xb_all = _0xa3_all
            const _0xa2_print = await console.log("this literally cannot be true... yet it is: ", _0x19__0xb_all)
            let _0x12_print = _0xa2_print
            _0x12_print

            const _0xaa_print = await console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            let _0x1a_print = _0xaa_print
            _0x1a_print


            const _0xac_add = await (2 + 0 + 2)
            let _0x1d__0x1b_add = _0xac_add
            const _0xab_print = await console.log(_0x1d__0x1b_add)
            let _0x1c_print = _0xab_print
            _0x1c_print
            const _0xae_asc = await (0 < 1 && 1 < 2)
            let _0x20__0x1e_asc = _0xae_asc
            const _0xad_print = await console.log(_0x20__0x1e_asc)
            let _0x1f_print = _0xad_print
            _0x1f_print


            let _0x21_age = 23
            _0x21_age
            let _0x24__0x22_age = _0x21_age
            const _0xaf_print = await console.log("my age is", _0x24__0x22_age)
            let _0x23_print = _0xaf_print
            _0x23_print

            _0x21_age = 25
            let _0x25_age = _0x21_age
            _0x25_age
            let _0x28__0x26_age = _0x21_age
            const _0xb0_print = await console.log("actually, i lied. my age is", _0x28__0x26_age)
            let _0x27_print = _0xb0_print
            _0x27_print

            let _0x29__0 = 0
            _0x29__0

            let _0x2c__0x2a__0 = _0x29__0
            const _0xb1_print = await console.log(_0x2c__0x2a__0)
            let _0x2b_print = _0xb1_print
            _0x2b_print

            _0x29__0 = 2347
            let _0x2d__0 = _0x29__0
            _0x2d__0
            let _0x30__0x2e__0 = _0x29__0
            const _0xb2_print = await console.log(_0x30__0x2e__0)
            let _0x2f_print = _0xb2_print
            _0x2f_print

            let _0x31_discord_dot__at_member_hash_hash = "#2347"
            _0x31_discord_dot__at_member_hash_hash
            let _0x32__67lang_dot__dollar_budget = 0
            _0x32__67lang_dot__dollar_budget
            let _0x33__lp_2347_rp_ = /(2347)/
            _0x33__lp_2347_rp_
            let _0x34__comma_ = true
            _0x34__comma_
            let _0x37__0x35__comma_ = _0x34__comma_
            const _0xb3_print = await console.log(_0x37__0x35__comma_)
            let _0x36_print = _0xb3_print
            _0x36_print


            let _0x3c__0x38__comma_ = _0x34__comma_
            _0x34__comma_ = _0x3c__0x38__comma_
            let _0x3d__0x39__comma_ = _0x34__comma_
            _0x34__comma_ = _0x3d__0x39__comma_
            let _0x3b__comma_ = _0x34__comma_
            _0x3b__comma_

            let _0x3e__2347 = "wow, very helpful."
            _0x3e__2347
            let _0x44__0x3f__2347 = _0x3e__2347
            const _0xb5_split = await String.prototype.split.call(_0x44__0x3f__2347, " ")
            let _0x45__0x40_split = _0xb5_split
            const _0xb6_sort = await Array.prototype.sort.call(_0x45__0x40_split)
            let _0x46__0x41_sort = _0xb6_sort
            const _0xb7_join = await Array.prototype.join.call(_0x46__0x41_sort, ", ")
            let _0x47__0x42_join = _0xb7_join
            const _0xb4_print = await console.log(_0x47__0x42_join)
            let _0x43_print = _0xb4_print
            _0x43_print


            let _0x48__67lang_dot_features = {}
            _0x48__67lang_dot_features
            let _0x53__67lang_dot_features = _0x48__67lang_dot_features

            _0x53__67lang_dot_features["the access macro"] = "noscope\nlocal _0x52_branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all."
            const _0xb8__0x53__67lang_dot_features = await _0x53__67lang_dot_features["the access macro"]
            let _0x54_name = _0xb8__0x53__67lang_dot_features
            _0x54_name

            let _0x5f__67lang_dot_features = _0x48__67lang_dot_features

            _0x5f__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written."
            const _0xb9__0x5f__67lang_dot_features = await _0x5f__67lang_dot_features["the flexibility of identifiers"]
            let _0x60_added = _0xb9__0x5f__67lang_dot_features
            _0x60_added

            let _0x66__0x61__67lang_dot_features = _0x48__67lang_dot_features
            const _0xbb__0x66__0x61__67lang_dot_features = await _0x66__0x61__67lang_dot_features["the flexibility of identifiers"]
            let _0x67__0x62_described = _0xbb__0x66__0x61__67lang_dot_features
            const _0xbc_slice = await Array.prototype.slice.call(_0x67__0x62_described, 0, 67)
            let _0x68__0x63_slice = _0xbc_slice
            const _0xbd_join = await Array.prototype.join.call(_0x68__0x63_slice, "")
            let _0x69__0x64_join = _0xbd_join
            const _0xba_print = await console.log(_0x69__0x64_join)
            let _0x65_print = _0xba_print
            _0x65_print


            if (true) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xbe_print = await console.log("big")
                        let _0x6a_print = _0xbe_print
                        _0x6a_print
                    }
                } }

            if (false) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xbf_print = await console.log("big")
                        let _0x6b_print = _0xbf_print
                        _0x6b_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xc0_print = await console.log("my disappointment is immeasurable and my day is ruined.")
                    let _0x6c_print = _0xc0_print
                    _0x6c_print
                }
            } 

            let _0x6d_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x6d_i_hate_this_trash_bang_

            let _0x6f__0x6e_i_hate_this_trash_bang_ = _0x6d_i_hate_this_trash_bang_

            const _0xc1_iter = _0x6f__0x6e_i_hate_this_trash_bang_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xc1_iter.next();
                if (done) { break; }
                let angy = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x74__0x70_angy = angy
                        const _0xc3_concat = await (_0x74__0x70_angy + "!!!")
                        let _0x75__0x71_concat = _0xc3_concat
                        const _0xc2_print = await console.log(_0x75__0x71_concat)
                        let _0x73_print = _0xc2_print
                        _0x73_print
                    }
                } }


            let _0x76_does_a_decent_programming_language_exist_q_ = false
            _0x76_does_a_decent_programming_language_exist_q_
            while(true) {let _0x77_does_a_decent_programming_language_exist_q_ = _0x76_does_a_decent_programming_language_exist_q_
                if (!_0x77_does_a_decent_programming_language_exist_q_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xc4_print = await console.log("code for quality software")
                        let _0x78_print = _0xc4_print
                        _0x78_print
                    }
                } }


            const _0xc6_all = await (true && true && false)
            let _0x7d__0x7b_all = _0xc6_all
            const _0xc5_print = await console.log("false: ", _0x7d__0x7b_all)
            let _0x7c_print = _0xc5_print
            _0x7c_print
            const _0xc8_any = await (true || false || false)
            let _0x80__0x7e_any = _0xc8_any
            const _0xc7_print = await console.log("true: ", _0x80__0x7e_any)
            let _0x7f_print = _0xc7_print
            _0x7f_print
            const _0xca_none = await !(false || false || false)
            let _0x83__0x81_none = _0xca_none
            const _0xc9_print = await console.log("true: ", _0x83__0x81_none)
            let _0x82_print = _0xc9_print
            _0x82_print
            const _0xcc_add = await (1 + 1 + 1 + 1 + 1 + 1)
            let _0x86__0x84_add = _0xcc_add
            const _0xcb_print = await console.log("6: ", _0x86__0x84_add)
            let _0x85_print = _0xcb_print
            _0x85_print


            let _0x87__2347 = 2347
            _0x87__2347
            let _0x88_where_q_ = "not even in Nebraska."
            _0x88_where_q_






            const _0x94_fuck_bang_ = async function (
                fucks_given, 
                TODO_i_cant_even_use_periods_in_this_param_name
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        fucks_given = fucks_given
                        TODO_i_cant_even_use_periods_in_this_param_name = TODO_i_cant_even_use_periods_in_this_param_name
                        const _0xd2_print = await console.log("fuck!")
                        let _0x95_print = _0xd2_print
                        _0x95_print
                        let _0x98__0x96_fucks_given = fucks_given
                        const _0xd3_nondesc = await (0 <= _0x98__0x96_fucks_given)
                        let _0x97_nondesc = _0xd3_nondesc
                        if (_0x97_nondesc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x9d__0x99_fucks_given = fucks_given
                                    const _0xd5_add = await (_0x9d__0x99_fucks_given + -1)
                                    let _0x9e__0x9a_add = _0xd5_add
                                    const _0xd4_fuck_bang_ = await _0x94_fuck_bang_(_0x9e__0x9a_add, "TODO...")
                                    let _0x9c_fuck_bang_ = _0xd4_fuck_bang_
                                    _0x9c_fuck_bang_
                                }
                            } }
                    }
                } }
            const _0xd6_fuck_bang_ = await _0x94_fuck_bang_(6, "TODO. the compiler code is garbage actually and assumes \nit's a local if you don't pass two arguments. horrible!\nshould be easy to fix! just check if it's a local or a function!")
            let _0x9f_fuck_bang_ = _0xd6_fuck_bang_
            _0x9f_fuck_bang_



        }
    } 
})();
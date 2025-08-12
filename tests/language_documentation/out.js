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



            const _0xf8_print = await console.log("hello world")
            let _0x1__0x0_print = _0xf8_print
            _0x1__0x0_print

            const _0xf9_print = await console.log("\"hello world\" is a fucking stupid non argument.")
            let _0x3__0x2_print = _0xf9_print
            _0x3__0x2_print


            const _0xfd_concat = await ("new year's " + "eve")
            let _0x1c__0x7_concat = _0xfd_concat
            const _0xfc_eq = await ("new year's eve" === _0x1c__0x7_concat)
            let _0x1d__0x6_eq = _0xfc_eq
            const _0xff_concat = await ("a very " + "scary " + "error")
            let _0x1e__0xc_concat = _0xff_concat
            const _0xfe_eq = await ("a very scary error" === _0x1e__0xc_concat)
            let _0x1f__0xb_eq = _0xfe_eq
            const _0x101_concat = await ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x20__0x11_concat = _0x101_concat
            const _0x100_eq = await ("your regex should be stored into the regex variable." === _0x20__0x11_concat)
            let _0x21__0x10_eq = _0x100_eq
            const _0xfb_all = await (_0x1d__0x6_eq && _0x1f__0xb_eq && _0x21__0x10_eq)
            let _0x22__0x5_all = _0xfb_all
            const _0xfa_print = await console.log("this literally cannot be true... yet it is: ", _0x22__0x5_all)
            let _0x23__0x4_print = _0xfa_print
            _0x23__0x4_print

            const _0x102_print = await console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            let _0x25__0x24_print = _0x102_print
            _0x25__0x24_print


            const _0x104_add = await (2 + 0 + 2)
            let _0x29__0x27_add = _0x104_add
            const _0x103_print = await console.log(_0x29__0x27_add)
            let _0x2a__0x26_print = _0x103_print
            _0x2a__0x26_print
            const _0x106_asc = await (0 < 1 && 1 < 2)
            let _0x2e__0x2c_asc = _0x106_asc
            const _0x105_print = await console.log(_0x2e__0x2c_asc)
            let _0x2f__0x2b_print = _0x105_print
            _0x2f__0x2b_print


            let _0x30_age = 23
            _0x30_age
            const _0x108_age = await _0x30_age
            let _0x34__0x32_age = _0x108_age
            const _0x107_print = await console.log("my age is", _0x34__0x32_age)
            let _0x35__0x31_print = _0x107_print
            _0x35__0x31_print

            const _0x109_age = await (_0x30_age = 25)
            let _0x37__0x36_age = _0x109_age
            _0x37__0x36_age
            const _0x10b_age = await _0x30_age
            let _0x3b__0x39_age = _0x10b_age
            const _0x10a_print = await console.log("actually, i lied. my age is", _0x3b__0x39_age)
            let _0x3c__0x38_print = _0x10a_print
            _0x3c__0x38_print

            let _0x3d__0 = 0
            _0x3d__0

            const _0x10d__0 = await _0x3d__0
            let _0x41__0x3f__0 = _0x10d__0
            const _0x10c_print = await console.log(_0x41__0x3f__0)
            let _0x42__0x3e_print = _0x10c_print
            _0x42__0x3e_print

            const _0x10e__0 = await (_0x3d__0 = 2347)
            let _0x44__0x43__0 = _0x10e__0
            _0x44__0x43__0
            const _0x110__0 = await _0x3d__0
            let _0x48__0x46__0 = _0x110__0
            const _0x10f_print = await console.log(_0x48__0x46__0)
            let _0x49__0x45_print = _0x10f_print
            _0x49__0x45_print

            let _0x4a_discord_dot__at_member_hash_hash = "#2347"
            _0x4a_discord_dot__at_member_hash_hash
            let _0x4b__67lang_dot__dollar_budget = 0
            _0x4b__67lang_dot__dollar_budget
            let _0x4c__lp_2347_rp_ = /(2347)/
            _0x4c__lp_2347_rp_
            let _0x4d__comma_ = true
            _0x4d__comma_
            const _0x112__comma_ = await _0x4d__comma_
            let _0x51__0x4f__comma_ = _0x112__comma_
            const _0x111_print = await console.log(_0x51__0x4f__comma_)
            let _0x52__0x4e_print = _0x111_print
            _0x52__0x4e_print


            const _0x115__comma_ = await _0x4d__comma_
            let _0x59__0x55__comma_ = _0x115__comma_
            const _0x114__comma_ = await (_0x4d__comma_ = _0x59__0x55__comma_)
            let _0x5a__0x54__comma_ = _0x114__comma_
            const _0x113__comma_ = await (_0x4d__comma_ = _0x5a__0x54__comma_)
            let _0x5b__0x53__comma_ = _0x113__comma_
            _0x5b__0x53__comma_

            let _0x5c__2347 = "wow, very helpful."
            _0x5c__2347
            const _0x117__2347 = await _0x5c__2347
            let _0x66__0x5e__2347 = _0x117__2347
            const _0x119__0x5e__2347 = await _0x66__0x5e__2347
            const _0x118_split = await String.prototype.split.call(_0x119__0x5e__2347, " ")
            let _0x67__0x5f_split = _0x118_split
            const _0x11b__0x5f_split = await _0x67__0x5f_split
            const _0x11a_sort = await Array.prototype.sort.call(_0x11b__0x5f_split)
            let _0x68__0x60_sort = _0x11a_sort
            const _0x11d__0x60_sort = await _0x68__0x60_sort
            const _0x11c_join = await Array.prototype.join.call(_0x11d__0x60_sort, ", ")
            let _0x69__0x61_join = _0x11c_join
            const _0x116_print = await console.log(_0x69__0x61_join)
            let _0x6a__0x5d_print = _0x116_print
            _0x6a__0x5d_print


            let _0x6b__67lang_dot_features = {}
            _0x6b__67lang_dot_features
            const _0x11e__67lang_dot_features = await _0x6b__67lang_dot_features
            let _0x6e__0x6c__67lang_dot_features = _0x11e__67lang_dot_features

            const _0x120__0x6c__67lang_dot_features = await _0x6e__0x6c__67lang_dot_features
            const _0x11f__hash_ = await (_0x120__0x6c__67lang_dot_features["the access macro"] = "noscope\nlocal _0x78_branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
            let _0x8d__0x6d__hash_ = _0x11f__hash_
            _0x8d__0x6d__hash_

            const _0x121__67lang_dot_features = await _0x6b__67lang_dot_features
            let _0x90__0x8e__67lang_dot_features = _0x121__67lang_dot_features

            const _0x123__0x8e__67lang_dot_features = await _0x90__0x8e__67lang_dot_features
            const _0x122__hash_ = await (_0x123__0x8e__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
            let _0x91__0x8f__hash_ = _0x122__hash_
            _0x91__0x8f__hash_

            const _0x125__67lang_dot_features = await _0x6b__67lang_dot_features
            let _0x9b__0x93__67lang_dot_features = _0x125__67lang_dot_features
            const _0x127__0x93__67lang_dot_features = await _0x9b__0x93__67lang_dot_features
            const _0x126__hash_ = await _0x127__0x93__67lang_dot_features["the flexibility of identifiers"]
            let _0x9c__0x94__hash_ = _0x126__hash_
            const _0x129__0x94__hash_ = await _0x9c__0x94__hash_
            const _0x128_slice = await Array.prototype.slice.call(_0x129__0x94__hash_, 0, 67)
            let _0x9d__0x95_slice = _0x128_slice
            const _0x12b__0x95_slice = await _0x9d__0x95_slice
            const _0x12a_join = await Array.prototype.join.call(_0x12b__0x95_slice, "")
            let _0x9e__0x96_join = _0x12a_join
            const _0x124_print = await console.log(_0x9e__0x96_join)
            let _0x9f__0x92_print = _0x124_print
            _0x9f__0x92_print


            if (true) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x12c_print = await console.log("big")
                        let _0xa1__0xa0_print = _0x12c_print
                        _0xa1__0xa0_print
                    }
                } }

            if (false) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x12d_print = await console.log("big")
                        let _0xa3__0xa2_print = _0x12d_print
                        _0xa3__0xa2_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x12e_print = await console.log("my disappointment is immeasurable and my day is ruined.")
                    let _0xa5__0xa4_print = _0x12e_print
                    _0xa5__0xa4_print
                }
            } 

            let _0xa6_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0xa6_i_hate_this_trash_bang_

            const _0x12f_i_hate_this_trash_bang_ = await _0xa6_i_hate_this_trash_bang_
            let _0xa8__0xa7_i_hate_this_trash_bang_ = _0x12f_i_hate_this_trash_bang_

            const _0x130_iter = _0xa8__0xa7_i_hate_this_trash_bang_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x130_iter.next();
                if (done) { break; }
                let angy = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x133_angy = await angy
                        let _0xaf__0xab_angy = _0x133_angy
                        const _0x132_concat = await (_0xaf__0xab_angy + "!!!")
                        let _0xb0__0xaa_concat = _0x132_concat
                        const _0x131_print = await console.log(_0xb0__0xaa_concat)
                        let _0xb1__0xa9_print = _0x131_print
                        _0xb1__0xa9_print
                    }
                } }


            let _0xb2_does_a_decent_programming_language_exist_q_ = false
            _0xb2_does_a_decent_programming_language_exist_q_
            while(true) {const _0x134_does_a_decent_programming_language_exist_q_ = await _0xb2_does_a_decent_programming_language_exist_q_
                let _0xb4__0xb3_does_a_decent_programming_language_exist_q_ = _0x134_does_a_decent_programming_language_exist_q_
                if (!_0xb4__0xb3_does_a_decent_programming_language_exist_q_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x135_print = await console.log("code for quality software")
                        let _0xb6__0xb5_print = _0x135_print
                        _0xb6__0xb5_print
                    }
                } }


            const _0x137_all = await (true && true && false)
            let _0xbe__0xbc_all = _0x137_all
            const _0x136_print = await console.log("false: ", _0xbe__0xbc_all)
            let _0xbf__0xbb_print = _0x136_print
            _0xbf__0xbb_print
            const _0x139_any = await (true || false || false)
            let _0xc3__0xc1_any = _0x139_any
            const _0x138_print = await console.log("true: ", _0xc3__0xc1_any)
            let _0xc4__0xc0_print = _0x138_print
            _0xc4__0xc0_print
            const _0x13b_none = await !(false || false || false)
            let _0xc8__0xc6_none = _0x13b_none
            const _0x13a_print = await console.log("true: ", _0xc8__0xc6_none)
            let _0xc9__0xc5_print = _0x13a_print
            _0xc9__0xc5_print
            const _0x13d_add = await (1 + 1 + 1 + 1 + 1 + 1)
            let _0xcd__0xcb_add = _0x13d_add
            const _0x13c_print = await console.log("6: ", _0xcd__0xcb_add)
            let _0xce__0xca_print = _0x13c_print
            _0xce__0xca_print


            let _0xcf__2347 = 2347
            _0xcf__2347
            let _0xd0_where_q_ = "not even in Nebraska."
            _0xd0_where_q_






            const _0xe5_fuck_bang_ = async function (
                fucks_given, 
                TODO_i_cant_even_use_periods_in_this_param_name
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        fucks_given = fucks_given
                        TODO_i_cant_even_use_periods_in_this_param_name = TODO_i_cant_even_use_periods_in_this_param_name
                        const _0x14c_print = await console.log("fuck!")
                        let _0xe7__0xe6_print = _0x14c_print
                        _0xe7__0xe6_print
                        const _0x14e_fucks_given = await fucks_given
                        let _0xeb__0xe9_fucks_given = _0x14e_fucks_given
                        const _0x14d_nondesc = await (0 <= _0xeb__0xe9_fucks_given)
                        let _0xec__0xe8_nondesc = _0x14d_nondesc
                        if (_0xec__0xe8_nondesc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x151_fucks_given = await fucks_given
                                    let _0xf3__0xef_fucks_given = _0x151_fucks_given
                                    const _0x150_add = await (_0xf3__0xef_fucks_given + -1)
                                    let _0xf4__0xee_add = _0x150_add
                                    const _0x14f_fuck_bang_ = await _0xe5_fuck_bang_(_0xf4__0xee_add, "TODO...")
                                    let _0xf5__0xed_fuck_bang_ = _0x14f_fuck_bang_
                                    _0xf5__0xed_fuck_bang_
                                }
                            } }
                    }
                } }
            const _0x152_fuck_bang_ = await _0xe5_fuck_bang_(6, "TODO. the compiler code is garbage actually and assumes \nit's a local if you don't pass two arguments. horrible!\nshould be easy to fix! just check if it's a local or a function!")
            let _0xf7__0xf6_fuck_bang_ = _0x152_fuck_bang_
            _0xf7__0xf6_fuck_bang_



        }
    } 
})();
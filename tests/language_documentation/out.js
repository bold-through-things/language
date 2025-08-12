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



            const _0x67_print = await console.log("hello world")
            let _0x0_print = _0x67_print
            _0x0_print

            const _0x68_print = await console.log("\"hello world\" is a fucking stupid non argument.")
            let _0x1_print = _0x68_print
            _0x1_print


            const _0x6c_concat = await ("new year's " + "eve")
            let _0x5_concat = _0x6c_concat
            const _0x6b_eq = await ("new year's eve" === _0x5_concat)
            let _0x4_eq = _0x6b_eq
            const _0x6e_concat = await ("a very " + "scary " + "error")
            let _0x7_concat = _0x6e_concat
            const _0x6d_eq = await ("a very scary error" === _0x7_concat)
            let _0x6_eq = _0x6d_eq
            const _0x70_concat = await ("your regex" + " should be stored into the " + "regex" + " variable.")
            let _0x9_concat = _0x70_concat
            const _0x6f_eq = await ("your regex should be stored into the regex variable." === _0x9_concat)
            let _0x8_eq = _0x6f_eq
            const _0x6a_all = await (_0x4_eq && _0x6_eq && _0x8_eq)
            let _0x3_all = _0x6a_all
            const _0x69_print = await console.log("this literally cannot be true... yet it is: ", _0x3_all)
            let _0x2_print = _0x69_print
            _0x2_print

            const _0x71_print = await console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            let _0xa_print = _0x71_print
            _0xa_print


            const _0x73_add = await (2 + 0 + 2)
            let _0xc_add = _0x73_add
            const _0x72_print = await console.log(_0xc_add)
            let _0xb_print = _0x72_print
            _0xb_print
            const _0x75_asc = await (0 < 1 && 1 < 2)
            let _0xe_asc = _0x75_asc
            const _0x74_print = await console.log(_0xe_asc)
            let _0xd_print = _0x74_print
            _0xd_print


            let _0xf_age = 23
            _0xf_age
            let _0x11_age = _0xf_age
            const _0x76_print = await console.log("my age is", _0x11_age)
            let _0x10_print = _0x76_print
            _0x10_print

            _0xf_age = 25
            let _0x12_age = _0xf_age
            _0x12_age
            let _0x14_age = _0xf_age
            const _0x77_print = await console.log("actually, i lied. my age is", _0x14_age)
            let _0x13_print = _0x77_print
            _0x13_print

            let _0x15__0 = 0
            _0x15__0

            let _0x17__0 = _0x15__0
            const _0x78_print = await console.log(_0x17__0)
            let _0x16_print = _0x78_print
            _0x16_print

            _0x15__0 = 2347
            let _0x18__0 = _0x15__0
            _0x18__0
            let _0x1a__0 = _0x15__0
            const _0x79_print = await console.log(_0x1a__0)
            let _0x19_print = _0x79_print
            _0x19_print

            let _0x1b_discord_dot__at_member_hash_hash = "#2347"
            _0x1b_discord_dot__at_member_hash_hash
            let _0x1c__67lang_dot__dollar_budget = 0
            _0x1c__67lang_dot__dollar_budget
            let _0x1d__lp_2347_rp_ = /(2347)/
            _0x1d__lp_2347_rp_
            let _0x1e__comma_ = true
            _0x1e__comma_
            let _0x20__comma_ = _0x1e__comma_
            const _0x7a_print = await console.log(_0x20__comma_)
            let _0x1f_print = _0x7a_print
            _0x1f_print


            let _0x23__comma_ = _0x1e__comma_
            _0x1e__comma_ = _0x23__comma_
            let _0x22__comma_ = _0x1e__comma_
            _0x1e__comma_ = _0x22__comma_
            let _0x21__comma_ = _0x1e__comma_
            _0x21__comma_

            let _0x24__2347 = "wow, very helpful."
            _0x24__2347
            let _0x26__2347 = _0x24__2347
            const _0x7c_split = await String.prototype.split.call(_0x26__2347, " ")
            let _0x27_split = _0x7c_split
            const _0x7d_sort = await Array.prototype.sort.call(_0x27_split)
            let _0x28_sort = _0x7d_sort
            const _0x7e_join = await Array.prototype.join.call(_0x28_sort, ", ")
            let _0x29_join = _0x7e_join
            const _0x7b_print = await console.log(_0x29_join)
            let _0x25_print = _0x7b_print
            _0x25_print


            let _0x2a__67lang_dot_features = {}
            _0x2a__67lang_dot_features
            let _0x2b__67lang_dot_features = _0x2a__67lang_dot_features

            const _0x7f__hash_ = await (_0x2b__67lang_dot_features["the access macro"] = "noscope\nlocal _0x36_branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
            let _0x2c__hash_ = _0x7f__hash_
            _0x2c__hash_

            let _0x37__67lang_dot_features = _0x2a__67lang_dot_features

            const _0x80__hash_ = await (_0x37__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
            let _0x38__hash_ = _0x80__hash_
            _0x38__hash_

            let _0x3a__67lang_dot_features = _0x2a__67lang_dot_features
            const _0x82__hash_ = await _0x3a__67lang_dot_features["the flexibility of identifiers"]
            let _0x3b__hash_ = _0x82__hash_
            const _0x83_slice = await Array.prototype.slice.call(_0x3b__hash_, 0, 67)
            let _0x3c_slice = _0x83_slice
            const _0x84_join = await Array.prototype.join.call(_0x3c_slice, "")
            let _0x3d_join = _0x84_join
            const _0x81_print = await console.log(_0x3d_join)
            let _0x39_print = _0x81_print
            _0x39_print


            if (true) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x85_print = await console.log("big")
                        let _0x3e_print = _0x85_print
                        _0x3e_print
                    }
                } }

            if (false) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x86_print = await console.log("big")
                        let _0x3f_print = _0x86_print
                        _0x3f_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x87_print = await console.log("my disappointment is immeasurable and my day is ruined.")
                    let _0x40_print = _0x87_print
                    _0x40_print
                }
            } 

            let _0x41_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x41_i_hate_this_trash_bang_

            let _0x42_i_hate_this_trash_bang_ = _0x41_i_hate_this_trash_bang_

            const _0x88_iter = _0x42_i_hate_this_trash_bang_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x88_iter.next();
                if (done) { break; }
                let angy = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x45_angy = angy
                        const _0x8a_concat = await (_0x45_angy + "!!!")
                        let _0x44_concat = _0x8a_concat
                        const _0x89_print = await console.log(_0x44_concat)
                        let _0x43_print = _0x89_print
                        _0x43_print
                    }
                } }


            let _0x46_does_a_decent_programming_language_exist_q_ = false
            _0x46_does_a_decent_programming_language_exist_q_
            while(true) {let _0x47_does_a_decent_programming_language_exist_q_ = _0x46_does_a_decent_programming_language_exist_q_
                if (!_0x47_does_a_decent_programming_language_exist_q_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x8b_print = await console.log("code for quality software")
                        let _0x48_print = _0x8b_print
                        _0x48_print
                    }
                } }


            const _0x8d_all = await (true && true && false)
            let _0x4c_all = _0x8d_all
            const _0x8c_print = await console.log("false: ", _0x4c_all)
            let _0x4b_print = _0x8c_print
            _0x4b_print
            const _0x8f_any = await (true || false || false)
            let _0x4e_any = _0x8f_any
            const _0x8e_print = await console.log("true: ", _0x4e_any)
            let _0x4d_print = _0x8e_print
            _0x4d_print
            const _0x91_none = await !(false || false || false)
            let _0x50_none = _0x91_none
            const _0x90_print = await console.log("true: ", _0x50_none)
            let _0x4f_print = _0x90_print
            _0x4f_print
            const _0x93_add = await (1 + 1 + 1 + 1 + 1 + 1)
            let _0x52_add = _0x93_add
            const _0x92_print = await console.log("6: ", _0x52_add)
            let _0x51_print = _0x92_print
            _0x51_print


            let _0x53__2347 = 2347
            _0x53__2347
            let _0x54_where_q_ = "not even in Nebraska."
            _0x54_where_q_






            const _0x5f_fuck_bang_ = async function (
                fucks_given, 
                TODO_i_cant_even_use_periods_in_this_param_name
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        fucks_given = fucks_given
                        TODO_i_cant_even_use_periods_in_this_param_name = TODO_i_cant_even_use_periods_in_this_param_name
                        const _0x99_print = await console.log("fuck!")
                        let _0x60_print = _0x99_print
                        _0x60_print
                        let _0x62_fucks_given = fucks_given
                        const _0x9a_nondesc = await (0 <= _0x62_fucks_given)
                        let _0x61_nondesc = _0x9a_nondesc
                        if (_0x61_nondesc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x65_fucks_given = fucks_given
                                    const _0x9c_add = await (_0x65_fucks_given + -1)
                                    let _0x64_add = _0x9c_add
                                    const _0x9b_fuck_bang_ = await _0x5f_fuck_bang_(_0x64_add, "TODO...")
                                    let _0x63_fuck_bang_ = _0x9b_fuck_bang_
                                    _0x63_fuck_bang_
                                }
                            } }
                    }
                } }
            const _0x9d_fuck_bang_ = await _0x5f_fuck_bang_(6, "TODO. the compiler code is garbage actually and assumes \nit's a local if you don't pass two arguments. horrible!\nshould be easy to fix! just check if it's a local or a function!")
            let _0x66_fuck_bang_ = _0x9d_fuck_bang_
            _0x66_fuck_bang_



        }
    } 
})();
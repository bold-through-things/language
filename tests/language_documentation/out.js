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
    const _0xdb_fuck_bang_ = async function (
        fucks_given
    ) {{
            let _0xdc_fucks_given = fucks_given
            _0xdc_fucks_given
            const _0x100_fucks_given = _0xdc_fucks_given
            let _0xde__0xdd_pipeline_result = _0x100_fucks_given
            let _0xdf_fucks_given = _0xde__0xdd_pipeline_result
            _0xdf_fucks_given
            const _0x101_print = await _67lang.maybe_await(console.log("fuck!"))
            let _0xe1__0xe0_pipeline_result = _0x101_print
            _0xe1__0xe0_pipeline_result
            const _0x103_fucks_given = _0xdf_fucks_given
            let _0xe4__0xe3_pipeline_result = _0x103_fucks_given
            const _0x102_nondesc = (0 <= _0xe4__0xe3_pipeline_result)
            let _0xe5__0xe2_pipeline_result = _0x102_nondesc
            if (_0xe5__0xe2_pipeline_result)
            {
                const _0x106_fucks_given = _0xdf_fucks_given
                let _0xe9__0xe8_pipeline_result = _0x106_fucks_given
                const _0x105_add = (_0xe9__0xe8_pipeline_result + -1)
                let _0xea__0xe7_pipeline_result = _0x105_add
                const _0x104_fuck_bang_ = await _67lang.maybe_await(_0xdb_fuck_bang_(_0xea__0xe7_pipeline_result))
                let _0xeb__0xe6_pipeline_result = _0x104_fuck_bang_
                _0xeb__0xe6_pipeline_result
            } 
        } }
    {


















    } {



        const _0x107_print = await _67lang.maybe_await(console.log("hello world"))
        let _0x3f__0x3e_pipeline_result = _0x107_print
        _0x3f__0x3e_pipeline_result

        const _0x108_print = await _67lang.maybe_await(console.log("\"hello world\" is a fucking stupid non argument."))
        let _0x41__0x40_pipeline_result = _0x108_print
        _0x41__0x40_pipeline_result


        const _0x10c_concat = ("new year's " + "eve")
        let _0x46__0x45_pipeline_result = _0x10c_concat
        const _0x10b_eq = ("new year's eve" === _0x46__0x45_pipeline_result)
        let _0x47__0x44_pipeline_result = _0x10b_eq
        const _0x10e_concat = ("a very " + "scary " + "error")
        let _0x4a__0x49_pipeline_result = _0x10e_concat
        const _0x10d_eq = ("a very scary error" === _0x4a__0x49_pipeline_result)
        let _0x4b__0x48_pipeline_result = _0x10d_eq
        const _0x110_concat = ("your regex" + " should be stored into the " + "regex" + " variable.")
        let _0x4e__0x4d_pipeline_result = _0x110_concat
        const _0x10f_eq = ("your regex should be stored into the regex variable." === _0x4e__0x4d_pipeline_result)
        let _0x4f__0x4c_pipeline_result = _0x10f_eq
        const _0x10a_all = (_0x47__0x44_pipeline_result && _0x4b__0x48_pipeline_result && _0x4f__0x4c_pipeline_result)
        let _0x50__0x43_pipeline_result = _0x10a_all
        const _0x109_print = await _67lang.maybe_await(console.log("this literally cannot be true... yet it is: ", _0x50__0x43_pipeline_result))
        let _0x51__0x42_pipeline_result = _0x109_print
        _0x51__0x42_pipeline_result

        const _0x111_print = await _67lang.maybe_await(console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get."))
        let _0x53__0x52_pipeline_result = _0x111_print
        _0x53__0x52_pipeline_result


        const _0x113_add = (2 + 0 + 2)
        let _0x56__0x55_pipeline_result = _0x113_add
        const _0x112_print = await _67lang.maybe_await(console.log(_0x56__0x55_pipeline_result))
        let _0x57__0x54_pipeline_result = _0x112_print
        _0x57__0x54_pipeline_result
        const _0x115_asc = (0 < 1 && 1 < 2)
        let _0x5a__0x59_pipeline_result = _0x115_asc
        const _0x114_print = await _67lang.maybe_await(console.log(_0x5a__0x59_pipeline_result))
        let _0x5b__0x58_pipeline_result = _0x114_print
        _0x5b__0x58_pipeline_result


        let _0x5c_age = 23
        _0x5c_age
        const _0x117_age = _0x5c_age
        let _0x5f__0x5e_pipeline_result = _0x117_age
        const _0x116_print = await _67lang.maybe_await(console.log("my age is", _0x5f__0x5e_pipeline_result))
        let _0x60__0x5d_pipeline_result = _0x116_print
        _0x60__0x5d_pipeline_result

        const _0x118_age = (_0x5c_age = 25)
        let _0x62__0x61_pipeline_result = _0x118_age
        _0x62__0x61_pipeline_result
        const _0x11a_age = _0x5c_age
        let _0x65__0x64_pipeline_result = _0x11a_age
        const _0x119_print = await _67lang.maybe_await(console.log("actually, i lied. my age is", _0x65__0x64_pipeline_result))
        let _0x66__0x63_pipeline_result = _0x119_print
        _0x66__0x63_pipeline_result

        let _0x67__0 = 0
        _0x67__0

        const _0x11c__0 = _0x67__0
        let _0x6a__0x69_pipeline_result = _0x11c__0
        const _0x11b_print = await _67lang.maybe_await(console.log(_0x6a__0x69_pipeline_result))
        let _0x6b__0x68_pipeline_result = _0x11b_print
        _0x6b__0x68_pipeline_result

        const _0x11d__0 = (_0x67__0 = 2347)
        let _0x6d__0x6c_pipeline_result = _0x11d__0
        _0x6d__0x6c_pipeline_result
        const _0x11f__0 = _0x67__0
        let _0x70__0x6f_pipeline_result = _0x11f__0
        const _0x11e_print = await _67lang.maybe_await(console.log(_0x70__0x6f_pipeline_result))
        let _0x71__0x6e_pipeline_result = _0x11e_print
        _0x71__0x6e_pipeline_result

        let _0x72_discord_dot__at_member_hash_hash = "#2347"
        _0x72_discord_dot__at_member_hash_hash
        let _0x73__67lang_dot__dollar_budget = 0
        _0x73__67lang_dot__dollar_budget
        let _0x74__lp_2347_rp_ = /(2347)/
        _0x74__lp_2347_rp_
        let _0x75__comma_ = true
        _0x75__comma_
        const _0x121__comma_ = _0x75__comma_
        let _0x78__0x77_pipeline_result = _0x121__comma_
        const _0x120_print = await _67lang.maybe_await(console.log(_0x78__0x77_pipeline_result))
        let _0x79__0x76_pipeline_result = _0x120_print
        _0x79__0x76_pipeline_result


        const _0x124__comma_ = _0x75__comma_
        let _0x7d__0x7c_pipeline_result = _0x124__comma_
        const _0x123__comma_ = (_0x75__comma_ = _0x7d__0x7c_pipeline_result)
        let _0x7e__0x7b_pipeline_result = _0x123__comma_
        const _0x122__comma_ = (_0x75__comma_ = _0x7e__0x7b_pipeline_result)
        let _0x7f__0x7a_pipeline_result = _0x122__comma_
        _0x7f__0x7a_pipeline_result

        let _0x80__2347 = "wow, very helpful."
        _0x80__2347
        const _0x126__2347 = _0x80__2347
        const _0x125_split = String.prototype.split.call(_0x126__2347, " ")
        let _0x82__0x81_pipeline_result = _0x125_split
        _0x82__0x81_pipeline_result
        const _0x128__0x81_pipeline_result = _0x82__0x81_pipeline_result
        const _0x127_sort = Array.prototype.sort.call(_0x128__0x81_pipeline_result)
        let _0x84__0x83_pipeline_result = _0x127_sort
        _0x84__0x83_pipeline_result
        const _0x12a__0x83_pipeline_result = _0x84__0x83_pipeline_result
        const _0x129_join = Array.prototype.join.call(_0x12a__0x83_pipeline_result, ", ")
        let _0x86__0x85_pipeline_result = _0x129_join
        _0x86__0x85_pipeline_result
        const _0x12c__0x85_pipeline_result = _0x86__0x85_pipeline_result
        const _0x12b_print = await _67lang.maybe_await(console.log(_0x12c__0x85_pipeline_result))
        let _0x88__0x87_pipeline_result = _0x12b_print
        _0x88__0x87_pipeline_result


        let _0x89__67lang_dot_features = {}
        _0x89__67lang_dot_features
        const _0x12e__67lang_dot_features = _0x89__67lang_dot_features
        const _0x12d__hash_ = (_0x12e__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.")
        let _0x8b__0x8a_pipeline_result = _0x12d__hash_
        _0x8b__0x8a_pipeline_result

        const _0x130__67lang_dot_features = _0x89__67lang_dot_features
        const _0x12f__hash_ = (_0x130__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.")
        let _0x8d__0x8c_pipeline_result = _0x12f__hash_
        _0x8d__0x8c_pipeline_result

        const _0x132__67lang_dot_features = _0x89__67lang_dot_features
        const _0x131__hash_ = _0x132__67lang_dot_features["the flexibility of identifiers"]
        let _0x8f__0x8e_pipeline_result = _0x131__hash_
        let _0x90__we_really_needed_the_generics_yesterday_bang_ = _0x8f__0x8e_pipeline_result
        _0x90__we_really_needed_the_generics_yesterday_bang_
        const _0x134__we_really_needed_the_generics_yesterday_bang_ = _0x90__we_really_needed_the_generics_yesterday_bang_
        const _0x133_slice = String.prototype.slice.call(_0x134__we_really_needed_the_generics_yesterday_bang_, 0, 67)
        let _0x92__0x91_pipeline_result = _0x133_slice
        _0x92__0x91_pipeline_result
        const _0x136__0x91_pipeline_result = _0x92__0x91_pipeline_result
        const _0x135_print = await _67lang.maybe_await(console.log(_0x136__0x91_pipeline_result))
        let _0x94__0x93_pipeline_result = _0x135_print
        _0x94__0x93_pipeline_result


        if (true)
        {
            const _0x137_print = await _67lang.maybe_await(console.log("big"))
            let _0x96__0x95_pipeline_result = _0x137_print
            _0x96__0x95_pipeline_result
        } 

        if (false)
        {
            const _0x138_print = await _67lang.maybe_await(console.log("big"))
            let _0x98__0x97_pipeline_result = _0x138_print
            _0x98__0x97_pipeline_result
        } 
        else {
            const _0x139_print = await _67lang.maybe_await(console.log("my disappointment is immeasurable and my day is ruined."))
            let _0x9a__0x99_pipeline_result = _0x139_print
            _0x9a__0x99_pipeline_result
        } 

        let _0x9b_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
        _0x9b_i_hate_this_trash_bang_

        {
            let _0x9e__0x9c_for_angy__index = 0
            _0x9e__0x9c_for_angy__index
            const _0x13a_i_hate_this_trash_bang_ = _0x9b_i_hate_this_trash_bang_
            let _0xa0__0x9f_pipeline_result = _0x13a_i_hate_this_trash_bang_
            let _0xa1__0x9d_for_angy__list = _0xa0__0x9f_pipeline_result
            _0xa1__0x9d_for_angy__list
            while(true) {
                const _0x13c__0x9c_for_angy__index = _0x9e__0x9c_for_angy__index
                let _0xa4__0xa3_pipeline_result = _0x13c__0x9c_for_angy__index
                const _0x13e__0x9d_for_angy__list = _0xa1__0x9d_for_angy__list
                const _0x13d_length = (_0x13e__0x9d_for_angy__list.length)
                let _0xa6__0xa5_pipeline_result = _0x13d_length
                const _0x13b_asc = (_0xa4__0xa3_pipeline_result < _0xa6__0xa5_pipeline_result)
                let _0xa7__0xa2_pipeline_result = _0x13b_asc
                if (!_0xa7__0xa2_pipeline_result) { break; }
                {
                    const _0x140__0x9d_for_angy__list = _0xa1__0x9d_for_angy__list
                    const _0x141__0x9c_for_angy__index = _0x9e__0x9c_for_angy__index
                    let _0xaa__0xa9_pipeline_result = _0x141__0x9c_for_angy__index
                    const _0x13f__hash_ = _0x140__0x9d_for_angy__list[_0xaa__0xa9_pipeline_result]
                    let _0xab__0xa8_pipeline_result = _0x13f__hash_
                    let _0xac_angy = _0xab__0xa8_pipeline_result
                    _0xac_angy
                    const _0x144__0x9c_for_angy__index = _0x9e__0x9c_for_angy__index
                    const _0x143_add = (_0x144__0x9c_for_angy__index + 1)
                    let _0xaf__0xae_pipeline_result = _0x143_add
                    const _0x142__0x9c_for_angy__index = (_0x9e__0x9c_for_angy__index = _0xaf__0xae_pipeline_result)
                    let _0xb0__0xad_pipeline_result = _0x142__0x9c_for_angy__index
                    _0xb0__0xad_pipeline_result
                    const _0x147_angy = _0xac_angy
                    let _0xb4__0xb3_pipeline_result = _0x147_angy
                    const _0x146_concat = (_0xb4__0xb3_pipeline_result + "!!!")
                    let _0xb5__0xb2_pipeline_result = _0x146_concat
                    const _0x145_print = await _67lang.maybe_await(console.log(_0xb5__0xb2_pipeline_result))
                    let _0xb6__0xb1_pipeline_result = _0x145_print
                    _0xb6__0xb1_pipeline_result
                } }
        } 


        let _0xb7_does_a_decent_programming_language_exist_q_ = false
        _0xb7_does_a_decent_programming_language_exist_q_
        while(true) {
            const _0x148_does_a_decent_programming_language_exist_q_ = _0xb7_does_a_decent_programming_language_exist_q_
            let _0xb9__0xb8_pipeline_result = _0x148_does_a_decent_programming_language_exist_q_
            if (!_0xb9__0xb8_pipeline_result) { break; }
            {
                const _0x149_print = await _67lang.maybe_await(console.log("code for quality software"))
                let _0xbb__0xba_pipeline_result = _0x149_print
                _0xbb__0xba_pipeline_result
            } }


        const _0x14b_all = (true && true && false)
        let _0xbe__0xbd_pipeline_result = _0x14b_all
        const _0x14a_print = await _67lang.maybe_await(console.log("false: ", _0xbe__0xbd_pipeline_result))
        let _0xbf__0xbc_pipeline_result = _0x14a_print
        _0xbf__0xbc_pipeline_result
        const _0x14d_any = (true || false || false)
        let _0xc2__0xc1_pipeline_result = _0x14d_any
        const _0x14c_print = await _67lang.maybe_await(console.log("true: ", _0xc2__0xc1_pipeline_result))
        let _0xc3__0xc0_pipeline_result = _0x14c_print
        _0xc3__0xc0_pipeline_result
        const _0x14f_none = !(false || false || false)
        let _0xc6__0xc5_pipeline_result = _0x14f_none
        const _0x14e_print = await _67lang.maybe_await(console.log("true: ", _0xc6__0xc5_pipeline_result))
        let _0xc7__0xc4_pipeline_result = _0x14e_print
        _0xc7__0xc4_pipeline_result
        const _0x151_add = (1 + 1 + 1 + 1 + 1 + 1)
        let _0xca__0xc9_pipeline_result = _0x151_add
        const _0x150_print = await _67lang.maybe_await(console.log("6: ", _0xca__0xc9_pipeline_result))
        let _0xcb__0xc8_pipeline_result = _0x150_print
        _0xcb__0xc8_pipeline_result


        let _0xcc__2347 = 2347
        _0xcc__2347
        let _0xcd_where_q_ = "not even in Nebraska."
        _0xcd_where_q_


        const _0x152_where_q_ = _0xcd_where_q_
        let _0xd3__0xd2_pipeline_result = _0x152_where_q_
        _0xd3__0xd2_pipeline_result

        const _0x154_where_q_ = _0xcd_where_q_
        const _0x153_split = String.prototype.split.call(_0x154_where_q_, " ")
        let _0xd7__0xd6_pipeline_result = _0x153_split
        _0xd7__0xd6_pipeline_result



        const _0x157_fuck_bang_ = await _67lang.maybe_await(_0xdb_fuck_bang_(6))
        let _0xed__0xec_pipeline_result = _0x157_fuck_bang_
        _0xed__0xec_pipeline_result



    } 
})();
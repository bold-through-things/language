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
    const _0x53_fuck_bang_ = async function (    
        fucks_given,
    ) {    
        {    
            let _0x54_fucks_given = fucks_given;
            let _0x55_fucks_given = _0x54_fucks_given;
            console.log("fuck!");
            if (    
                (0 <= _0x55_fucks_given)
            ) {    
                (await (_0x53_fuck_bang_((_0x55_fucks_given + -1))));
            } else {
            }
        }
    }
    {
    }
    {    
        console.log("hello world");
        console.log("\"hello world\" is a fucking stupid non argument.");
        console.log("this literally cannot be true... yet it is: ", (("new year's eve" === ("new year's " + "eve")) && ("a very scary error" === ("a very " + "scary " + "error")) && ("your regex should be stored into the regex variable." === ("your regex" + " should be stored into the " + "regex" + " variable."))));
        console.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.");
        console.log((2 + 0 + 2));
        console.log((0 < 1 && 1 < 2));
        let _0x40_age = 23;
        console.log("my age is", _0x40_age);
        (_0x40_age = 25);
        console.log("actually, i lied. my age is", _0x40_age);
        let _0x41__0 = 0;
        console.log(_0x41__0);
        (_0x41__0 = 2347);
        console.log(_0x41__0);
        let _0x42_discord_dot__at_member_hash_hash = "#2347";
        let _0x43__67lang_dot__dollar_budget = 0;
        let _0x44__lp_2347_rp_ = /(2347)/;
        let _0x45__comma_ = true;
        console.log(_0x45__comma_);
        (_0x45__comma_ = (_0x45__comma_ = _0x45__comma_));
        let _0x46__2347 = "wow, very helpful.";
        console.log(Array.prototype.join.call(Array.prototype.sort.call(String.prototype.split.call(_0x46__2347, " ")), ", "));
        let _0x47__67lang_dot_features = {};
        (_0x47__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.");
        (_0x47__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.");
        let _0x48__we_really_needed_the_generics_yesterday_bang_ = _0x47__67lang_dot_features["the flexibility of identifiers"];
        console.log(String.prototype.slice.call(_0x48__we_really_needed_the_generics_yesterday_bang_, 0, 67));
        if (    
            true
        ) {    
            console.log("big");
        } else {
        }
    
        if (    
            false
        ) {    
            console.log("big");
        } else {    
            console.log("my disappointment is immeasurable and my day is ruined.");
        }
    
        let _0x49_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."];
        {    
            let _0x4c__0x4a_for_angy__index = 0;
            let _0x4d__0x4b_for_angy__list = _0x49_i_hate_this_trash_bang_;
            while(true) {    
                if (!(_0x4c__0x4a_for_angy__index < _0x4d__0x4b_for_angy__list.length)) { break; }
                {    
                    let _0x4e_angy = _0x4d__0x4b_for_angy__list[_0x4c__0x4a_for_angy__index];
                    (_0x4c__0x4a_for_angy__index = (_0x4c__0x4a_for_angy__index + 1));
                    console.log((_0x4e_angy + "!!!"));
                }
            }
        }
    
        let _0x4f_does_a_decent_programming_language_exist_q_ = false;
        while(true) {    
            if (!_0x4f_does_a_decent_programming_language_exist_q_) { break; }
            {    
                console.log("code for quality software");
            }
        }
    
        console.log("false: ", (true && true && false));
        console.log("true: ", (true || false || false));
        console.log("true: ", !(false || false || false));
        console.log("6: ", (1 + 1 + 1 + 1 + 1 + 1));
        let _0x50__2347 = 2347;
        let _0x51_where_q_ = "not even in Nebraska.";
        _0x51_where_q_;
        String.prototype.split.call(_0x51_where_q_, " ");
        (await (_0x53_fuck_bang_(6)));
    }

})();
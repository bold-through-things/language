const EXISTS_INSIDE_AS_KEY = Symbol("EXISTS_INSIDE_AS_KEY")
const EXISTS_INSIDE_AS_VALUE = Symbol("EXISTS_INSIDE_AS_VALUE")
type JS_key_type = number | string | symbol;
const _67lang = {
    EXISTS_INSIDE_AS_KEY,
    EXISTS_INSIDE_AS_VALUE,
    exists_inside: <K extends JS_key_type, V>(
        inside: V[] | Record<K, V>, 
        k_or_v: typeof EXISTS_INSIDE_AS_KEY | typeof EXISTS_INSIDE_AS_VALUE, 
        ...arr: K[] | V[]
    ) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (k: number) => Number.isInteger(k) && k >= 0 && k < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v as number));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v as V));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => (v as K) in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v as V));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: <K extends JS_key_type>(list_or_dict: Record<K, unknown> | unknown[], ...values: K[]) => _67lang.exists_inside(list_or_dict, EXISTS_INSIDE_AS_KEY, ...values),
    has_values: <V>(list_or_dict: Record<JS_key_type, V> | unknown[], ...values: V[]) => _67lang.exists_inside(list_or_dict, EXISTS_INSIDE_AS_VALUE, ...values),

    zip: <T>(...arrays: T[][]) => {
        const maxLength = Math.max(...arrays.map(x => x.length));
        return Array.from({ length: maxLength }).map((_, i) => {
            return arrays.map(array => array[i]);
        });
    },

    // wow Deno thank you very much for such a lovely bug yes
    // `String.prototype.split.call` type checking picks the
    // wrong implementation (`splitter`) and will not accept a `string` as `separator`.
    string_split: (s: string, sep: string | RegExp, limit?: number): string[] => {
        return String.prototype.split.call(s, 
            // can't even fucking specify the error
            // @ts-expect-error deno-ts(2345)
            sep,
            limit
        );
    },

    new_set: <T>(...args: T[]) => {
        // need this since semantics differ here
        // (we are remapping `...args` to first)
        return new Set(args);
    },

    // for browser only
    prompt: async (msg: string): Promise<string> => {
        return prompt(msg) ?? "";
    },
    stdin: async (): Promise<string> => {
        return ""; // i guess?
    },
    is_tty: (): boolean => {
        return false;
    }
}

;(globalThis as unknown as { _67lang: typeof _67lang })._67lang = _67lang;

type May_have_document = { document?: unknown };
const is_browser = typeof window !== "undefined" && typeof (window as May_have_document).document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
    _67lang.prompt = async function (msg: string): Promise<string> {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) { return ""; }
        return new TextDecoder().decode(buf.subarray(0, n)).trim();
    };

    let stdin_cached: string | null = null;

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


class _0x42_inside_dot_SPEC {
    constructor(
    ) {
    }
}


class _0x43_Interval_ID {
    constructor(
    ) {
    }
}


class _0x44_Response {
    constructor(
    ) {
    }
}


class _0x45_TextDecoder {
    constructor(
    ) {
    }
}


class _0x46_Uint8Array {
    constructor(
    ) {
    }
}


class _0x47_TextEncoder {
    constructor(
    ) {
    }
}


class _0x48_URL {
    constructor(
    ) {
    }
}


void (async () => {
    'use strict';
    const _0x41_fuck_bang_ = async function (    
        fucks_given: number,
    ) {    
        {    
            let _0x49_fucks_given = fucks_given;
            console.log("fuck!");
            if (    
                (0 <= _0x49_fucks_given)
            ) {    
                (await (_0x41_fuck_bang_((_0x49_fucks_given + -1))));
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
        console.log((0 < 1) && (1 < 2));
        let _0x4a_age = 23;
        console.log("my age is", _0x4a_age);
        (_0x4a_age = 25);
        console.log("actually, i lied. my age is", _0x4a_age);
        let _0x4b__0 = 0;
        console.log(_0x4b__0);
        (_0x4b__0 = 2347);
        console.log(_0x4b__0);
        let _0x4c_discord_dot__at_member_hash_hash = "#2347";
        let _0x4d__67lang_dot__dollar_budget = 0;
        let _0x4e__lp_2347_rp_ = /(2347)/;
        let _0x4f__comma_ = true;
        console.log(_0x4f__comma_);
        (_0x4f__comma_ = (_0x4f__comma_ = _0x4f__comma_));
        let _0x50__2347 = "wow, very helpful.";
        console.log(Array.prototype.join.call(Array.prototype.sort.call(_67lang.string_split(_0x50__2347, " ")), ", "));
        let _0x51__67lang_dot_features = {} as Record<string, string>;
        (_0x51__67lang_dot_features["the get macro"] = "a powerful and flexible method chaining \"syntax sugar\" with clear branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all.");
        (_0x51__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written.");
        const _0xb5__67lang_dot_features = _0x51__67lang_dot_features;
        if (_0xb5__67lang_dot_features["the flexibility of identifiers"] === undefined) { throw new Error("sparse array") }
        let _0x52__we_really_needed_the_generics_yesterday_bang_ = _0xb5__67lang_dot_features["the flexibility of identifiers"];
        console.log(String.prototype.slice.call(_0x52__we_really_needed_the_generics_yesterday_bang_, 0, 67));
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
    
        let _0x53_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."] as Array<string>;
        {    
            let _0x54__0x3f_for_angy__index = 0;
            let _0x55__0x40_for_angy__list = _0x53_i_hate_this_trash_bang_;
            while(true) {    
                if (!(_0x54__0x3f_for_angy__index < _0x55__0x40_for_angy__list.length)) { break; }
                {    
                    const _0xcc__0x40_for_angy__list = _0x55__0x40_for_angy__list;
                    const _0xcd__0x3f_for_angy__index = _0x54__0x3f_for_angy__index;
                    const _0xce__pipeline_result = _0xcd__0x3f_for_angy__index;
                    if (_0xcc__0x40_for_angy__list[_0xce__pipeline_result] === undefined) { throw new Error("sparse array") }
                    let _0x56_angy = _0xcc__0x40_for_angy__list[_0xce__pipeline_result];
                    (_0x54__0x3f_for_angy__index = (_0x54__0x3f_for_angy__index + 1));
                    console.log((_0x56_angy + "!!!"));
                }
            }
        }
    
        let _0x57_does_a_decent_programming_language_exist_q_ = false;
        while(true) {    
            if (!_0x57_does_a_decent_programming_language_exist_q_) { break; }
            {    
                console.log("code for quality software");
            }
        }
    
        console.log("false: ", (true && true && false));
        console.log("true: ", (true || false || false));
        console.log("true: ", !(false || false || false));
        console.log("6: ", (1 + 1 + 1 + 1 + 1 + 1));
        let _0x58__2347 = 2347;
        let _0x59_where_q_ = "not even in Nebraska.";
        _0x59_where_q_;
        _67lang.string_split(_0x59_where_q_, " ");
        (await (_0x41_fuck_bang_(6)));
    }

})();
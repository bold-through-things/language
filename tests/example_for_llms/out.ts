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


class _0x69_create_counter_store {
    count: number;
    constructor(
        count: number,
    ) {
        this.count = count;
    }
}


class _0x6a_Person {
    name: string;
    age: number;
    constructor(
        name: string,
        age: number,
    ) {
        this.name = name;
        this.age = age;
    }
}


void (async () => {
    'use strict';
    const _0x64_bool_printer = async function (    
        value: boolean,
        if_true: string,
        if_false: string,
    ) {    
        {    
            let _0x65_if_false = if_false;
            let _0x66_if_true = if_true;
            let _0x67_value = value;
            if (    
                _0x67_value
            ) {    
                console.log(_0x66_if_true);
            } else {    
                console.log(_0x65_if_false);
            }
        }
    }
    const _0x60_create_counter_colon__colon_count = async function (    
        _: _0x69_create_counter_store,
    ) {    
        {    
            let _0x61__ = _;
            let _0x62_new = (_0x61__.count + 1);
            return (_0x61__.count = (_0x62_new));
        }
    }
    const _0x5e_create_counter = async function (
    ) {    
        {    
            let _0x5f__ = (new _0x69_create_counter_store(0));
            return (() => _0x60_create_counter_colon__colon_count(_0x5f__));
        }
    }
    const _0x43_greet = async function (    
        person: string,
    ) {    
        {    
            let _0x44_person = person;
            return ("Hello, " + _0x44_person);
        }
    }
    {
    }
    {    
        let _0x40_name = "Alice";
        let _0x41_age = 25;
        let _0x42_is_active = true;
        console.log(_0x40_name, _0x41_age, _0x42_is_active);
        (_0x40_name = "Aris");
        console.log(_0x40_name);
        console.log(_0x40_name);
        console.log((await (_0x43_greet("Alice"))));
        let _0x45_numbers = [1, 2, 3, 4, 5] as Array<number>;
        Array.prototype.push.call(_0x45_numbers, 6);
        console.log(_0x45_numbers[0]);
        console.log(_0x45_numbers[(_0x45_numbers.length - 1)]);
        if (    
            (18 <= _0x41_age)
        ) {    
            console.log("Adult");
        } else {    
            console.log("Minor");
        }
    
        {    
            let _0x48__0x46_for_number__index = 0;
            let _0x49__0x47_for_number__list = _0x45_numbers;
            while(true) {    
                if (!(_0x48__0x46_for_number__index < _0x49__0x47_for_number__list.length)) { break; }
                {    
                    let _0x4a_number = _0x49__0x47_for_number__list[_0x48__0x46_for_number__index];
                    (_0x48__0x46_for_number__index = (_0x48__0x46_for_number__index + 1));
                    console.log(_0x4a_number);
                }
            }
        }
    
        let _0x4b_alice = (new _0x6a_Person("Alice", 30));
        console.log(_0x4b_alice.name);
        console.log(_0x4b_alice.age);
        (_0x4b_alice.name = ("Alicia"));
        console.log(_0x4b_alice.name);
        console.log(_0x40_name);
        let _0x4c__1 = 1;
        const _0xeb__1 = _0x4c__1;
        const _0xec__pipeline_result = _0xeb__1;
        let _0x4d__q_ = _0xec__pipeline_result;
        console.log((_0xec__pipeline_result + _0x4d__q_ + 1));
        let _0x4e__q_ = _0x4c__1;
        console.log((_0x4e__q_ + 1));
        const _0xfb__1 = _0x4c__1;
        const _0xfc__pipeline_result = _0xfb__1;
        let _0x4f__q_ = _0xfc__pipeline_result;
        console.log((_0xfc__pipeline_result + 1));
        let _0x50_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."] as Array<string>;
        let _0x51_max_characters = 0;
        let _0x52_found_word = "";
        {    
            let _0x55__0x53_for_thing__index = 0;
            let _0x56__0x54_for_thing__list = _0x50_things_to_say;
            while(true) {    
                if (!(_0x55__0x53_for_thing__index < _0x56__0x54_for_thing__list.length)) { break; }
                {    
                    let _0x57_thing = _0x56__0x54_for_thing__list[_0x55__0x53_for_thing__index];
                    (_0x55__0x53_for_thing__index = (_0x55__0x53_for_thing__index + 1));
                    {    
                        let _0x5a__0x58_for_word__index = 0;
                        let _0x5b__0x59_for_word__list = _67lang.string_split(_0x57_thing, " ");
                        while(true) {    
                            if (!(_0x5a__0x58_for_word__index < _0x5b__0x59_for_word__list.length)) { break; }
                            {    
                                let _0x5c_word = _0x5b__0x59_for_word__list[_0x5a__0x58_for_word__index];
                                (_0x5a__0x58_for_word__index = (_0x5a__0x58_for_word__index + 1));
                                let _0x5d_word = _0x5c_word;
                                if (    
                                    (_0x5d_word.length > _0x51_max_characters)
                                ) {    
                                    (_0x51_max_characters = _0x5d_word.length);
                                    (_0x52_found_word = _0x5d_word);
                                    (_0x52_found_word = _0x5d_word);
                                } else {
                                }
                            }
                        }
                    }
                }
            }
        }
    
        console.log(_0x52_found_word);
        console.log(Array.prototype.join.call(Array.prototype.sort.call(_67lang.string_split(_0x50_things_to_say[0], " "))), " - what words!");
        let _0x63_counter = (await (_0x5e_create_counter()));
        console.log("wow, counting!");
        console.log(Number.prototype.toString.call((await (_0x63_counter()))), Number.prototype.toString.call((await (_0x63_counter()))), Number.prototype.toString.call((await (_0x63_counter()))), Number.prototype.toString.call((await (_0x63_counter()))), Number.prototype.toString.call((await (_0x63_counter()))), Number.prototype.toString.call((await (_0x63_counter()))));
        let _0x68_politely_agree = ((arg0: boolean, arg1: string) => _0x64_bool_printer(arg0, "i would indeed like to agree.", arg1));
        (await (_0x68_politely_agree(true, "what?! utter BULLSHIT!")));
        (await (_0x68_politely_agree(false, "what?! utter BULLSHIT!")));
    }

})();
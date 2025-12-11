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


class _0x49_create_counter_store {
    count: number;
    constructor(
        count: number,
    ) {
        this.count = count;
    }
}


class _0x4a_Person {
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


class _0x4b_inside_dot_SPEC {
    constructor(
    ) {
    }
}


class _0x4c_Interval_ID {
    constructor(
    ) {
    }
}


class _0x4d_Response {
    constructor(
    ) {
    }
}


class _0x4e_TextDecoder {
    constructor(
    ) {
    }
}


class _0x4f_Uint8Array {
    constructor(
    ) {
    }
}


class _0x50_TextEncoder {
    constructor(
    ) {
    }
}


class _0x51_URL {
    constructor(
    ) {
    }
}


void (async () => {
    'use strict';
    const _0x48_bool_printer = async function (    
        value: boolean,
        if_true: string,
        if_false: string,
    ) {    
        {    
            if (    
                value
            ) {    
                console.log(if_true);
            } else {    
                console.log(if_false);
            }
        }
    }
    const _0x47_create_counter_colon__colon_count = async function (    
        _: _0x49_create_counter_store,
    ) {    
        {    
            let _0x52_new = (_.count + 1);
            return (_.count = (_0x52_new));
        }
    }
    const _0x46_create_counter = async function (
    ) {    
        {    
            let _0x53__ = (new _0x49_create_counter_store(0));
            return (() => _0x47_create_counter_colon__colon_count(_0x53__));
        }
    }
    const _0x3f_greet = async function (    
        person: string,
    ) {    
        {    
            return ("Hello, " + person);
        }
    }
    {
    }
    {    
        let _0x54_name = "Alice";
        let _0x55_age = 25;
        let _0x56_is_active = true;
        console.log(_0x54_name, _0x55_age, _0x56_is_active);
        (_0x54_name = "Aris");
        console.log(_0x54_name);
        console.log(_0x54_name);
        console.log((await (_0x3f_greet("Alice"))));
        let _0x57_numbers = [1, 2, 3, 4, 5] as Array<number>;
        Array.prototype.push.call(_0x57_numbers, 6);
        const _0xa1_numbers = _0x57_numbers;
        if (_0xa1_numbers[0] === undefined) { throw new Error("sparse array") }
        console.log(_0xa1_numbers[0]);
        const _0xa6_numbers = _0x57_numbers;
        const _0xa9_numbers = _0x57_numbers;
        const _0xa8_length = _0xa9_numbers.length;
        const _0xaa__pipeline_result = _0xa8_length;
        const _0xa7_sub = (_0xaa__pipeline_result - 1);
        const _0xab__pipeline_result = _0xa7_sub;
        if (_0xa6_numbers[_0xab__pipeline_result] === undefined) { throw new Error("sparse array") }
        console.log(_0xa6_numbers[_0xab__pipeline_result]);
        if (    
            (18 <= _0x55_age)
        ) {    
            console.log("Adult");
        } else {    
            console.log("Minor");
        }
    
        {    
            let _0x58__0x40_for_number__index = 0;
            let _0x59__0x41_for_number__list = _0x57_numbers;
            while(true) {    
                if (!(_0x58__0x40_for_number__index < _0x59__0x41_for_number__list.length)) { break; }
                {    
                    const _0xc0__0x41_for_number__list = _0x59__0x41_for_number__list;
                    const _0xc1__0x40_for_number__index = _0x58__0x40_for_number__index;
                    const _0xc2__pipeline_result = _0xc1__0x40_for_number__index;
                    if (_0xc0__0x41_for_number__list[_0xc2__pipeline_result] === undefined) { throw new Error("sparse array") }
                    let _0x5a_number = _0xc0__0x41_for_number__list[_0xc2__pipeline_result];
                    (_0x58__0x40_for_number__index = (_0x58__0x40_for_number__index + 1));
                    console.log(_0x5a_number);
                }
            }
        }
    
        let _0x5b_alice = (new _0x4a_Person("Alice", 30));
        console.log(_0x5b_alice.name);
        console.log(_0x5b_alice.age);
        (_0x5b_alice.name = ("Alicia"));
        console.log(_0x5b_alice.name);
        console.log(_0x54_name);
        let _0x5c__1 = 1;
        const _0xe5__1 = _0x5c__1;
        const _0xe6__pipeline_result = _0xe5__1;
        let _0x5d__q_ = _0xe6__pipeline_result;
        console.log((_0xe6__pipeline_result + _0x5d__q_ + 1));
        let _0x5e__q_ = _0x5c__1;
        console.log((_0x5e__q_ + 1));
        const _0xf5__1 = _0x5c__1;
        const _0xf6__pipeline_result = _0xf5__1;
        let _0x5f__q_ = _0xf6__pipeline_result;
        console.log((_0xf6__pipeline_result + 1));
        let _0x60_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."] as Array<string>;
        let _0x61_max_characters = 0;
        let _0x62_found_word = "";
        {    
            let _0x63__0x42_for_thing__index = 0;
            let _0x64__0x43_for_thing__list = _0x60_things_to_say;
            while(true) {    
                if (!(_0x63__0x42_for_thing__index < _0x64__0x43_for_thing__list.length)) { break; }
                {    
                    const _0x105__0x43_for_thing__list = _0x64__0x43_for_thing__list;
                    const _0x106__0x42_for_thing__index = _0x63__0x42_for_thing__index;
                    const _0x107__pipeline_result = _0x106__0x42_for_thing__index;
                    if (_0x105__0x43_for_thing__list[_0x107__pipeline_result] === undefined) { throw new Error("sparse array") }
                    let _0x65_thing = _0x105__0x43_for_thing__list[_0x107__pipeline_result];
                    (_0x63__0x42_for_thing__index = (_0x63__0x42_for_thing__index + 1));
                    {    
                        let _0x66__0x44_for_word__index = 0;
                        let _0x67__0x45_for_word__list = _67lang.string_split(_0x65_thing, " ");
                        while(true) {    
                            if (!(_0x66__0x44_for_word__index < _0x67__0x45_for_word__list.length)) { break; }
                            {    
                                const _0x119__0x45_for_word__list = _0x67__0x45_for_word__list;
                                const _0x11a__0x44_for_word__index = _0x66__0x44_for_word__index;
                                const _0x11b__pipeline_result = _0x11a__0x44_for_word__index;
                                if (_0x119__0x45_for_word__list[_0x11b__pipeline_result] === undefined) { throw new Error("sparse array") }
                                let _0x68_word = _0x119__0x45_for_word__list[_0x11b__pipeline_result];
                                (_0x66__0x44_for_word__index = (_0x66__0x44_for_word__index + 1));
                                let _0x69_word = _0x68_word;
                                if (    
                                    (_0x69_word.length > _0x61_max_characters)
                                ) {    
                                    (_0x61_max_characters = _0x69_word.length);
                                    (_0x62_found_word = _0x69_word);
                                    (_0x62_found_word = _0x69_word);
                                } else {
                                }
                            }
                        }
                    }
                }
            }
        }
    
        console.log(_0x62_found_word);
        const _0x13b_things_to_say = _0x60_things_to_say;
        if (_0x13b_things_to_say[0] === undefined) { throw new Error("sparse array") }
        console.log(Array.prototype.join.call(Array.prototype.sort.call(_67lang.string_split(_0x13b_things_to_say[0], " "))), " - what words!");
        let _0x6a_counter = (await (_0x46_create_counter()));
        console.log("wow, counting!");
        console.log(Number.prototype.toString.call((await (_0x6a_counter()))), Number.prototype.toString.call((await (_0x6a_counter()))), Number.prototype.toString.call((await (_0x6a_counter()))), Number.prototype.toString.call((await (_0x6a_counter()))), Number.prototype.toString.call((await (_0x6a_counter()))), Number.prototype.toString.call((await (_0x6a_counter()))));
        let _0x6b_politely_agree = ((arg0: boolean, arg1: string) => _0x48_bool_printer(arg0, "i would indeed like to agree.", arg1));
        (await (_0x6b_politely_agree(true, "what?! utter BULLSHIT!")));
        (await (_0x6b_politely_agree(false, "what?! utter BULLSHIT!")));
    }

})();
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


function _0x69_create_counter_store(count) {
    this.count = count;
}


function _0x6a_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const _0x64_bool_printer = async function (    
        value,
        if_true,
        if_false,
    ) {    
        {    
            let _0x65_if_false = if_false;
            let _0x66_if_true = if_true;
            let _0x67_value = value;
            if (    
                _0x67_value
            ) {    
                (await _67lang.maybe_await(console.log(_0x66_if_true)));
            } else {    
                (await _67lang.maybe_await(console.log(_0x65_if_false)));
            }
        }
    }
    const _0x60_create_counter_colon__colon_count = async function (    
        _,
    ) {    
        {    
            let _0x61__ = _;
            let _0x62_new = ((await _67lang.maybe_await(_0x61__.count)) + 1);
            return (await _67lang.maybe_await((_0x61__.count = (_0x62_new))));
        }
    }
    const _0x5e_create_counter = async function (
    ) {    
        {    
            let _0x5f__ = (await _67lang.maybe_await((new _0x69_create_counter_store(0))));
            return (() => _0x60_create_counter_colon__colon_count(_0x5f__));
        }
    }
    const _0x43_greet = async function (    
        person,
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
        (await _67lang.maybe_await(console.log(_0x40_name, _0x41_age, _0x42_is_active)));
        (_0x40_name = "Aris");
        (await _67lang.maybe_await(console.log(_0x40_name)));
        (await _67lang.maybe_await(console.log(_0x40_name)));
        (await _67lang.maybe_await(console.log((await _67lang.maybe_await(_0x43_greet("Alice"))))));
        let _0x45_numbers = [1, 2, 3, 4, 5];
        Array.prototype.push.call(_0x45_numbers, 6);
        (await _67lang.maybe_await(console.log(_0x45_numbers[0])));
        (await _67lang.maybe_await(console.log(_0x45_numbers[(_0x45_numbers.length - 1)])));
        if (    
            (18 <= _0x41_age)
        ) {    
            (await _67lang.maybe_await(console.log("Adult")));
        } else {    
            (await _67lang.maybe_await(console.log("Minor")));
        }
    
        {    
            let _0x48__0x46_for_number__index = 0;
            let _0x49__0x47_for_number__list = _0x45_numbers;
            while(true) {    
                if (!(_0x48__0x46_for_number__index < _0x49__0x47_for_number__list.length)) { break; }
                {    
                    let _0x4a_number = _0x49__0x47_for_number__list[_0x48__0x46_for_number__index];
                    (_0x48__0x46_for_number__index = (_0x48__0x46_for_number__index + 1));
                    (await _67lang.maybe_await(console.log(_0x4a_number)));
                }
            }
        }
    
        let _0x4b_alice = (await _67lang.maybe_await((new _0x6a_Person("Alice", 30))));
        (await _67lang.maybe_await(console.log((await _67lang.maybe_await(_0x4b_alice.name)))));
        (await _67lang.maybe_await(console.log((await _67lang.maybe_await(_0x4b_alice.age)))));
        (await _67lang.maybe_await((_0x4b_alice.name = ("Alicia"))));
        (await _67lang.maybe_await(console.log((await _67lang.maybe_await(_0x4b_alice.name)))));
        (await _67lang.maybe_await(console.log(_0x40_name)));
        let _0x4c__1 = 1;
        const _0xfd__1 = _0x4c__1;
        const _0xfe__pipeline_result = _0xfd__1;
        let _0x4d__q_ = _0xfe__pipeline_result;
        (await _67lang.maybe_await(console.log((_0xfe__pipeline_result + _0x4d__q_ + 1))));
        let _0x4e__q_ = _0x4c__1;
        (await _67lang.maybe_await(console.log((_0x4e__q_ + 1))));
        const _0x10d__1 = _0x4c__1;
        const _0x10e__pipeline_result = _0x10d__1;
        let _0x4f__q_ = _0x10e__pipeline_result;
        (await _67lang.maybe_await(console.log((_0x10e__pipeline_result + 1))));
        let _0x50_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."];
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
                        let _0x5b__0x59_for_word__list = String.prototype.split.call(_0x57_thing, " ");
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
    
        (await _67lang.maybe_await(console.log(_0x52_found_word)));
        (await _67lang.maybe_await(console.log(Array.prototype.join.call(Array.prototype.sort.call(String.prototype.split.call(_0x50_things_to_say[0], " "))), " - what words!")));
        let _0x63_counter = (await _67lang.maybe_await(_0x5e_create_counter()));
        (await _67lang.maybe_await(console.log("wow, counting!")));
        (await _67lang.maybe_await(console.log(Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))), Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))), Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))), Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))), Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))), Number.prototype.toString.call((await _67lang.maybe_await(_0x63_counter()))))));
        let _0x68_politely_agree = ((arg0, arg1) => _0x64_bool_printer(arg0, "i would indeed like to agree.", arg1));
        (await _67lang.maybe_await(_0x68_politely_agree(true, "what?! utter BULLSHIT!")));
        (await _67lang.maybe_await(_0x68_politely_agree(false, "what?! utter BULLSHIT!")));
    }

})();
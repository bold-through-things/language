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


function _0x13b_create_counter_store(count) {
    this.count = count;
}


function _0x13c_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const _0x12c_bool_printer = async function /* -> */ (    
            value,
            if_true,
            if_false,
        )/* -> */ {    
            /* -> */ {    
                let _0x12d_if_false = if_false;

                let _0x12e_if_true = if_true;

                let _0x12f_value = value;

                const _0x156_value = (_0x12f_value);
                let _0x131__0x130_pipeline_result = _0x156_value;

                if /* -> */ (    
                    _0x131__0x130_pipeline_result
                )/* -> */ {    
                    const _0x158_if_true = (_0x12e_if_true);
                    const _0x157_print = (await _67lang.maybe_await(console.log(_0x158_if_true)));
                    let _0x133__0x132_pipeline_result = _0x157_print;

                }else /* -> */ {    
                    const _0x15a_if_false = (_0x12d_if_false);
                    const _0x159_print = (await _67lang.maybe_await(console.log(_0x15a_if_false)));
                    let _0x135__0x134_pipeline_result = _0x159_print;

                }

            }

        }
    const _0x102_create_counter_colon__colon_count = async function /* -> */ (    
            _,
        )/* -> */ {    
            /* -> */ {    
                let _0x103__ = _;

                const _0x15d__ = (_0x103__);
                const _0x15c_count = (await _67lang.maybe_await((_0x15d__.count)));
                let _0x105__0x104_pipeline_result = _0x15c_count;

                const _0x15b_add = ((_0x105__0x104_pipeline_result + 1));
                let _0x106_new = _0x15b_add;

                const _0x15f__ = (_0x103__);
                const _0x160_new = (_0x106_new);
                let _0x109__0x108_pipeline_result = _0x160_new;

                const _0x15e_count = (await _67lang.maybe_await((_0x15f__.count = (_0x109__0x108_pipeline_result))));
                let _0x10a__0x107_pipeline_result = _0x15e_count;

                return _0x10a__0x107_pipeline_result;
            }

        }
    const _0xfe_create_counter = async function /* -> */ (    
        )/* -> */ {    
            /* -> */ {    
                const _0x161_create_counter_store = (await _67lang.maybe_await((new _0x13b_create_counter_store(0))));
                let _0x100__0xff_pipeline_result = _0x161_create_counter_store;

                let _0x101__ = _0x100__0xff_pipeline_result;

                const _0x162__ = (_0x101__);
                let _0x10c__0x10b_pipeline_result = _0x162__;

                return (() => _0x102_create_counter_colon__colon_count(_0x10c__0x10b_pipeline_result));
            }

        }
    const _0x55_greet = async function /* -> */ (    
            person,
        )/* -> */ {    
            /* -> */ {    
                let _0x56_person = person;

                const _0x164_person = (_0x56_person);
                let _0x59__0x58_pipeline_result = _0x164_person;

                const _0x163_concat = (("Hello, " + _0x59__0x58_pipeline_result));
                let _0x5a__0x57_pipeline_result = _0x163_concat;

                return _0x5a__0x57_pipeline_result;
            }

        }
    /* -> */ {    
        }
    /* -> */ {    
            let _0x40_name = "Alice";

            let _0x41_age = 25;

            let _0x42_is_active = true;

            const _0x166_name = (_0x40_name);
            let _0x45__0x44_pipeline_result = _0x166_name;

            const _0x167_age = (_0x41_age);
            let _0x47__0x46_pipeline_result = _0x167_age;

            const _0x168_is_active = (_0x42_is_active);
            let _0x49__0x48_pipeline_result = _0x168_is_active;

            const _0x165_print = (await _67lang.maybe_await(console.log(_0x45__0x44_pipeline_result, _0x47__0x46_pipeline_result, _0x49__0x48_pipeline_result)));
            let _0x4a__0x43_pipeline_result = _0x165_print;

            const _0x169_name = ((_0x40_name = "Aris"));
            let _0x4c__0x4b_pipeline_result = _0x169_name;

            const _0x16b_name = (_0x40_name);
            let _0x4f__0x4e_pipeline_result = _0x16b_name;

            const _0x16a_print = (await _67lang.maybe_await(console.log(_0x4f__0x4e_pipeline_result)));
            let _0x50__0x4d_pipeline_result = _0x16a_print;

            const _0x16d_name = (_0x40_name);
            let _0x53__0x52_pipeline_result = _0x16d_name;

            const _0x16c_print = (await _67lang.maybe_await(console.log(_0x53__0x52_pipeline_result)));
            let _0x54__0x51_pipeline_result = _0x16c_print;

            const _0x16f_greet = (await _67lang.maybe_await(_0x55_greet("Alice")));
            let _0x5d__0x5c_pipeline_result = _0x16f_greet;

            const _0x16e_print = (await _67lang.maybe_await(console.log(_0x5d__0x5c_pipeline_result)));
            let _0x5e__0x5b_pipeline_result = _0x16e_print;

            let _0x5f_numbers = [1, 2, 3, 4, 5];

            const _0x171_numbers = (_0x5f_numbers);
            const _0x170_push = (Array.prototype.push.call(_0x171_numbers, 6));
            let _0x61__0x60_pipeline_result = _0x170_push;

            const _0x174_numbers = (_0x5f_numbers);
            const _0x173__hash_ = (_0x174_numbers[0]);
            let _0x64__0x63_pipeline_result = _0x173__hash_;

            const _0x172_print = (await _67lang.maybe_await(console.log(_0x64__0x63_pipeline_result)));
            let _0x65__0x62_pipeline_result = _0x172_print;

            const _0x177_numbers = (_0x5f_numbers);
            const _0x17a_numbers = (_0x5f_numbers);
            const _0x179_length = ((_0x17a_numbers.length));
            let _0x6a__0x69_pipeline_result = _0x179_length;

            const _0x178_sub = ((_0x6a__0x69_pipeline_result - 1));
            let _0x6b__0x68_pipeline_result = _0x178_sub;

            const _0x176__hash_ = (_0x177_numbers[_0x6b__0x68_pipeline_result]);
            let _0x6c__0x67_pipeline_result = _0x176__hash_;

            const _0x175_print = (await _67lang.maybe_await(console.log(_0x6c__0x67_pipeline_result)));
            let _0x6d__0x66_pipeline_result = _0x175_print;

            const _0x17c_age = (_0x41_age);
            let _0x70__0x6f_pipeline_result = _0x17c_age;

            const _0x17b_nondesc = ((18 <= _0x70__0x6f_pipeline_result));
            let _0x71__0x6e_pipeline_result = _0x17b_nondesc;

            if /* -> */ (    
                _0x71__0x6e_pipeline_result
            )/* -> */ {    
                const _0x17d_print = (await _67lang.maybe_await(console.log("Adult")));
                let _0x73__0x72_pipeline_result = _0x17d_print;

            }else /* -> */ {    
                const _0x17e_print = (await _67lang.maybe_await(console.log("Minor")));
                let _0x75__0x74_pipeline_result = _0x17e_print;

            }

            /* -> */ {    
                let _0x78__0x76_for_number__index = 0;

                const _0x17f_numbers = (_0x5f_numbers);
                let _0x7a__0x79_pipeline_result = _0x17f_numbers;

                let _0x7b__0x77_for_number__list = _0x7a__0x79_pipeline_result;

                while(true) /* -> */ {    
                    const _0x181__0x76_for_number__index = (_0x78__0x76_for_number__index);
                    let _0x7e__0x7d_pipeline_result = _0x181__0x76_for_number__index;

                    const _0x183__0x77_for_number__list = (_0x7b__0x77_for_number__list);
                    const _0x182_length = ((_0x183__0x77_for_number__list.length));
                    let _0x80__0x7f_pipeline_result = _0x182_length;

                    const _0x180_asc = ((_0x7e__0x7d_pipeline_result < _0x80__0x7f_pipeline_result));
                    let _0x81__0x7c_pipeline_result = _0x180_asc;

                    if (!_0x81__0x7c_pipeline_result) { break; }
                    /* -> */ {    
                        const _0x185__0x77_for_number__list = (_0x7b__0x77_for_number__list);
                        const _0x186__0x76_for_number__index = (_0x78__0x76_for_number__index);
                        let _0x84__0x83_pipeline_result = _0x186__0x76_for_number__index;

                        const _0x184__hash_ = (_0x185__0x77_for_number__list[_0x84__0x83_pipeline_result]);
                        let _0x85__0x82_pipeline_result = _0x184__hash_;

                        let _0x86_number = _0x85__0x82_pipeline_result;

                        const _0x189__0x76_for_number__index = (_0x78__0x76_for_number__index);
                        const _0x188_add = ((_0x189__0x76_for_number__index + 1));
                        let _0x89__0x88_pipeline_result = _0x188_add;

                        const _0x187__0x76_for_number__index = ((_0x78__0x76_for_number__index = _0x89__0x88_pipeline_result));
                        let _0x8a__0x87_pipeline_result = _0x187__0x76_for_number__index;

                        const _0x18b_number = (_0x86_number);
                        let _0x8d__0x8c_pipeline_result = _0x18b_number;

                        const _0x18a_print = (await _67lang.maybe_await(console.log(_0x8d__0x8c_pipeline_result)));
                        let _0x8e__0x8b_pipeline_result = _0x18a_print;

                    }

                }

            }

            const _0x18c_Person = (await _67lang.maybe_await((new _0x13c_Person("Alice", 30))));
            let _0x90__0x8f_pipeline_result = _0x18c_Person;

            let _0x91_alice = _0x90__0x8f_pipeline_result;

            const _0x18f_alice = (_0x91_alice);
            const _0x18e_name = (await _67lang.maybe_await((_0x18f_alice.name)));
            let _0x94__0x93_pipeline_result = _0x18e_name;

            const _0x18d_print = (await _67lang.maybe_await(console.log(_0x94__0x93_pipeline_result)));
            let _0x95__0x92_pipeline_result = _0x18d_print;

            const _0x192_alice = (_0x91_alice);
            const _0x191_age = (await _67lang.maybe_await((_0x192_alice.age)));
            let _0x98__0x97_pipeline_result = _0x191_age;

            const _0x190_print = (await _67lang.maybe_await(console.log(_0x98__0x97_pipeline_result)));
            let _0x99__0x96_pipeline_result = _0x190_print;

            const _0x194_alice = (_0x91_alice);
            const _0x193_name = (await _67lang.maybe_await((_0x194_alice.name = ("Alicia"))));
            let _0x9b__0x9a_pipeline_result = _0x193_name;

            const _0x197_alice = (_0x91_alice);
            const _0x196_name = (await _67lang.maybe_await((_0x197_alice.name)));
            let _0x9e__0x9d_pipeline_result = _0x196_name;

            const _0x195_print = (await _67lang.maybe_await(console.log(_0x9e__0x9d_pipeline_result)));
            let _0x9f__0x9c_pipeline_result = _0x195_print;

            const _0x199_name = (_0x40_name);
            let _0xa2__0xa1_pipeline_result = _0x199_name;

            const _0x198_print = (await _67lang.maybe_await(console.log(_0xa2__0xa1_pipeline_result)));
            let _0xa3__0xa0_pipeline_result = _0x198_print;

            let _0xa4__1 = 1;

            const _0x19a__1 = (_0xa4__1);
            let _0xa5__q_ = _0x19a__1;

            const _0x19c__q_ = (_0xa5__q_);
            const _0x19d__q_ = (_0xa5__q_);
            let _0xa8__0xa7_pipeline_result = _0x19d__q_;

            const _0x19b_add = ((_0x19c__q_ + _0xa8__0xa7_pipeline_result + 1));
            let _0xa9__0xa6_pipeline_result = _0x19b_add;

            const _0x19f__0xa6_pipeline_result = (_0xa9__0xa6_pipeline_result);
            const _0x19e_print = (await _67lang.maybe_await(console.log(_0x19f__0xa6_pipeline_result)));
            let _0xab__0xaa_pipeline_result = _0x19e_print;

            const _0x1a0__1 = (_0xa4__1);
            let _0xac__q_ = _0x1a0__1;

            const _0x1a2__q_ = (_0xac__q_);
            let _0xaf__0xae_pipeline_result = _0x1a2__q_;

            const _0x1a1_add = ((_0xaf__0xae_pipeline_result + 1));
            let _0xb0__0xad_pipeline_result = _0x1a1_add;

            const _0x1a4__0xad_pipeline_result = (_0xb0__0xad_pipeline_result);
            const _0x1a3_print = (await _67lang.maybe_await(console.log(_0x1a4__0xad_pipeline_result)));
            let _0xb2__0xb1_pipeline_result = _0x1a3_print;

            const _0x1a5__1 = (_0xa4__1);
            let _0xb3__q_ = _0x1a5__1;

            const _0x1a7__q_ = (_0xb3__q_);
            const _0x1a6_add = ((_0x1a7__q_ + 1));
            let _0xb5__0xb4_pipeline_result = _0x1a6_add;

            const _0x1a9__0xb4_pipeline_result = (_0xb5__0xb4_pipeline_result);
            const _0x1a8_print = (await _67lang.maybe_await(console.log(_0x1a9__0xb4_pipeline_result)));
            let _0xb7__0xb6_pipeline_result = _0x1a8_print;

            let _0xb8_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."];

            let _0xb9_max_characters = 0;

            let _0xba_found_word = "";

            /* -> */ {    
                let _0xbd__0xbb_for_thing__index = 0;

                const _0x1aa_things_to_say = (_0xb8_things_to_say);
                let _0xbf__0xbe_pipeline_result = _0x1aa_things_to_say;

                let _0xc0__0xbc_for_thing__list = _0xbf__0xbe_pipeline_result;

                while(true) /* -> */ {    
                    const _0x1ac__0xbb_for_thing__index = (_0xbd__0xbb_for_thing__index);
                    let _0xc3__0xc2_pipeline_result = _0x1ac__0xbb_for_thing__index;

                    const _0x1ae__0xbc_for_thing__list = (_0xc0__0xbc_for_thing__list);
                    const _0x1ad_length = ((_0x1ae__0xbc_for_thing__list.length));
                    let _0xc5__0xc4_pipeline_result = _0x1ad_length;

                    const _0x1ab_asc = ((_0xc3__0xc2_pipeline_result < _0xc5__0xc4_pipeline_result));
                    let _0xc6__0xc1_pipeline_result = _0x1ab_asc;

                    if (!_0xc6__0xc1_pipeline_result) { break; }
                    /* -> */ {    
                        const _0x1b0__0xbc_for_thing__list = (_0xc0__0xbc_for_thing__list);
                        const _0x1b1__0xbb_for_thing__index = (_0xbd__0xbb_for_thing__index);
                        let _0xc9__0xc8_pipeline_result = _0x1b1__0xbb_for_thing__index;

                        const _0x1af__hash_ = (_0x1b0__0xbc_for_thing__list[_0xc9__0xc8_pipeline_result]);
                        let _0xca__0xc7_pipeline_result = _0x1af__hash_;

                        let _0xcb_thing = _0xca__0xc7_pipeline_result;

                        const _0x1b4__0xbb_for_thing__index = (_0xbd__0xbb_for_thing__index);
                        const _0x1b3_add = ((_0x1b4__0xbb_for_thing__index + 1));
                        let _0xce__0xcd_pipeline_result = _0x1b3_add;

                        const _0x1b2__0xbb_for_thing__index = ((_0xbd__0xbb_for_thing__index = _0xce__0xcd_pipeline_result));
                        let _0xcf__0xcc_pipeline_result = _0x1b2__0xbb_for_thing__index;

                        /* -> */ {    
                            let _0xd2__0xd0_for_word__index = 0;

                            const _0x1b6_thing = (_0xcb_thing);
                            const _0x1b5_split = (String.prototype.split.call(_0x1b6_thing, " "));
                            let _0xd4__0xd3_pipeline_result = _0x1b5_split;

                            let _0xd5__0xd1_for_word__list = _0xd4__0xd3_pipeline_result;

                            while(true) /* -> */ {    
                                const _0x1b8__0xd0_for_word__index = (_0xd2__0xd0_for_word__index);
                                let _0xd8__0xd7_pipeline_result = _0x1b8__0xd0_for_word__index;

                                const _0x1ba__0xd1_for_word__list = (_0xd5__0xd1_for_word__list);
                                const _0x1b9_length = ((_0x1ba__0xd1_for_word__list.length));
                                let _0xda__0xd9_pipeline_result = _0x1b9_length;

                                const _0x1b7_asc = ((_0xd8__0xd7_pipeline_result < _0xda__0xd9_pipeline_result));
                                let _0xdb__0xd6_pipeline_result = _0x1b7_asc;

                                if (!_0xdb__0xd6_pipeline_result) { break; }
                                /* -> */ {    
                                    const _0x1bc__0xd1_for_word__list = (_0xd5__0xd1_for_word__list);
                                    const _0x1bd__0xd0_for_word__index = (_0xd2__0xd0_for_word__index);
                                    let _0xde__0xdd_pipeline_result = _0x1bd__0xd0_for_word__index;

                                    const _0x1bb__hash_ = (_0x1bc__0xd1_for_word__list[_0xde__0xdd_pipeline_result]);
                                    let _0xdf__0xdc_pipeline_result = _0x1bb__hash_;

                                    let _0xe0_word = _0xdf__0xdc_pipeline_result;

                                    const _0x1c0__0xd0_for_word__index = (_0xd2__0xd0_for_word__index);
                                    const _0x1bf_add = ((_0x1c0__0xd0_for_word__index + 1));
                                    let _0xe3__0xe2_pipeline_result = _0x1bf_add;

                                    const _0x1be__0xd0_for_word__index = ((_0xd2__0xd0_for_word__index = _0xe3__0xe2_pipeline_result));
                                    let _0xe4__0xe1_pipeline_result = _0x1be__0xd0_for_word__index;

                                    const _0x1c1_word = (_0xe0_word);
                                    let _0xe6__0xe5_pipeline_result = _0x1c1_word;

                                    let _0xe7_word = _0xe6__0xe5_pipeline_result;

                                    const _0x1c3_word = (_0xe7_word);
                                    const _0x1c2_length = ((_0x1c3_word.length));
                                    let _0xe9__0xe8_pipeline_result = _0x1c2_length;

                                    const _0x1c5__0xe8_pipeline_result = (_0xe9__0xe8_pipeline_result);
                                    const _0x1c6_max_characters = (_0xb9_max_characters);
                                    let _0xec__0xeb_pipeline_result = _0x1c6_max_characters;

                                    const _0x1c4_desc = ((_0x1c5__0xe8_pipeline_result > _0xec__0xeb_pipeline_result));
                                    let _0xed__0xea_pipeline_result = _0x1c4_desc;

                                    if /* -> */ (    
                                        _0xed__0xea_pipeline_result
                                    )/* -> */ {    
                                        const _0x1c8_word = (_0xe7_word);
                                        const _0x1c7_length = ((_0x1c8_word.length));
                                        let _0xef__0xee_pipeline_result = _0x1c7_length;

                                        const _0x1ca__0xee_pipeline_result = (_0xef__0xee_pipeline_result);
                                        const _0x1c9_max_characters = ((_0xb9_max_characters = _0x1ca__0xee_pipeline_result));
                                        let _0xf1__0xf0_pipeline_result = _0x1c9_max_characters;

                                        const _0x1cc_word = (_0xe7_word);
                                        const _0x1cb_found_word = ((_0xba_found_word = _0x1cc_word));
                                        const _0x1ce_word = (_0xe7_word);
                                        const _0x1cd_found_word = ((_0xba_found_word = _0x1ce_word));
                                        let _0xf3__0xf2_pipeline_result = _0x1cd_found_word;

                                    }else /* -> */ {    
                                    }

                                }

                            }

                        }

                    }

                }

            }

            const _0x1d0_found_word = (_0xba_found_word);
            let _0xf6__0xf5_pipeline_result = _0x1d0_found_word;

            const _0x1cf_print = (await _67lang.maybe_await(console.log(_0xf6__0xf5_pipeline_result)));
            let _0xf7__0xf4_pipeline_result = _0x1cf_print;

            const _0x1d2_things_to_say = (_0xb8_things_to_say);
            const _0x1d1__hash_ = (_0x1d2_things_to_say[0]);
            let _0xf9__0xf8_pipeline_result = _0x1d1__hash_;

            const _0x1d4__0xf8_pipeline_result = (_0xf9__0xf8_pipeline_result);
            const _0x1d3_split = (String.prototype.split.call(_0x1d4__0xf8_pipeline_result, " "));
            let _0xfb__0xfa_pipeline_result = _0x1d3_split;

            const _0x1d8__0xfa_pipeline_result = (_0xfb__0xfa_pipeline_result);
            const _0x1d7_sort = (Array.prototype.sort.call(_0x1d8__0xfa_pipeline_result));
            const _0x1d6_join = (Array.prototype.join.call(_0x1d7_sort));
            const _0x1d5_print = (await _67lang.maybe_await(console.log(_0x1d6_join, " - what words!")));
            let _0xfd__0xfc_pipeline_result = _0x1d5_print;

            const _0x1d9_create_counter = (await _67lang.maybe_await(_0xfe_create_counter()));
            let _0x10e__0x10d_pipeline_result = _0x1d9_create_counter;

            let _0x10f_counter = _0x10e__0x10d_pipeline_result;

            const _0x1da_print = (await _67lang.maybe_await(console.log("wow, counting!")));
            let _0x111__0x110_pipeline_result = _0x1da_print;

            const _0x1de_counter = (_0x10f_counter);
            const _0x1dd__tilde_ = (await _67lang.maybe_await(_0x1de_counter()));
            let _0x115__0x114_pipeline_result = _0x1dd__tilde_;

            const _0x1dc_str = (Number.prototype.toString.call(_0x115__0x114_pipeline_result));
            let _0x116__0x113_pipeline_result = _0x1dc_str;

            const _0x1e1_counter = (_0x10f_counter);
            const _0x1e0__tilde_ = (await _67lang.maybe_await(_0x1e1_counter()));
            let _0x119__0x118_pipeline_result = _0x1e0__tilde_;

            const _0x1df_str = (Number.prototype.toString.call(_0x119__0x118_pipeline_result));
            let _0x11a__0x117_pipeline_result = _0x1df_str;

            const _0x1e4_counter = (_0x10f_counter);
            const _0x1e3__tilde_ = (await _67lang.maybe_await(_0x1e4_counter()));
            let _0x11d__0x11c_pipeline_result = _0x1e3__tilde_;

            const _0x1e2_str = (Number.prototype.toString.call(_0x11d__0x11c_pipeline_result));
            let _0x11e__0x11b_pipeline_result = _0x1e2_str;

            const _0x1e7_counter = (_0x10f_counter);
            const _0x1e6__tilde_ = (await _67lang.maybe_await(_0x1e7_counter()));
            let _0x121__0x120_pipeline_result = _0x1e6__tilde_;

            const _0x1e5_str = (Number.prototype.toString.call(_0x121__0x120_pipeline_result));
            let _0x122__0x11f_pipeline_result = _0x1e5_str;

            const _0x1ea_counter = (_0x10f_counter);
            const _0x1e9__tilde_ = (await _67lang.maybe_await(_0x1ea_counter()));
            let _0x125__0x124_pipeline_result = _0x1e9__tilde_;

            const _0x1e8_str = (Number.prototype.toString.call(_0x125__0x124_pipeline_result));
            let _0x126__0x123_pipeline_result = _0x1e8_str;

            const _0x1ed_counter = (_0x10f_counter);
            const _0x1ec__tilde_ = (await _67lang.maybe_await(_0x1ed_counter()));
            let _0x129__0x128_pipeline_result = _0x1ec__tilde_;

            const _0x1eb_str = (Number.prototype.toString.call(_0x129__0x128_pipeline_result));
            let _0x12a__0x127_pipeline_result = _0x1eb_str;

            const _0x1db_print = (await _67lang.maybe_await(console.log(_0x116__0x113_pipeline_result, _0x11a__0x117_pipeline_result, _0x11e__0x11b_pipeline_result, _0x122__0x11f_pipeline_result, _0x126__0x123_pipeline_result, _0x12a__0x127_pipeline_result)));
            let _0x12b__0x112_pipeline_result = _0x1db_print;

            let _0x136_politely_agree = ((arg0, arg1) => _0x12c_bool_printer(arg0, "i would indeed like to agree.", arg1));

            const _0x1ef_politely_agree = (_0x136_politely_agree);
            const _0x1ee__tilde_ = (await _67lang.maybe_await(_0x1ef_politely_agree(true, "what?! utter BULLSHIT!")));
            let _0x138__0x137_pipeline_result = _0x1ee__tilde_;

            const _0x1f1_politely_agree = (_0x136_politely_agree);
            const _0x1f0__tilde_ = (await _67lang.maybe_await(_0x1f1_politely_agree(false, "what?! utter BULLSHIT!")));
            let _0x13a__0x139_pipeline_result = _0x1f0__tilde_;

        }

})();
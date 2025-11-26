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


function _0x139_create_counter_store(count) {
    this.count = count;
}


function _0x13a_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x12a_bool_printer = async function (
        value,
        if_true,
        if_false
    ) {{
            let _0x12b_if_false = if_false
            _0x12b_if_false
            let _0x12c_if_true = if_true
            _0x12c_if_true
            let _0x12d_value = value
            _0x12d_value
            const _0x154_value = _0x12d_value
            let _0x12f__0x12e_pipeline_result = _0x154_value
            if (_0x12f__0x12e_pipeline_result)
            {
                const _0x156_if_true = _0x12c_if_true
                const _0x155_print = await _67lang.maybe_await(console.log(_0x156_if_true))
                let _0x131__0x130_pipeline_result = _0x155_print
                _0x131__0x130_pipeline_result
            } 
            else {
                const _0x158_if_false = _0x12b_if_false
                const _0x157_print = await _67lang.maybe_await(console.log(_0x158_if_false))
                let _0x133__0x132_pipeline_result = _0x157_print
                _0x133__0x132_pipeline_result
            } 
        } }
    const _0x100_create_counter_colon__colon_count = async function (
        _
    ) {{
            let _0x101__ = _
            _0x101__
            const _0x15b__ = _0x101__
            const _0x15a_count = await _67lang.maybe_await((_0x15b__.count))
            let _0x103__0x102_pipeline_result = _0x15a_count
            const _0x159_add = (_0x103__0x102_pipeline_result + 1)
            let _0x104_new = _0x159_add
            _0x104_new
            const _0x15d__ = _0x101__
            const _0x15e_new = _0x104_new
            let _0x107__0x106_pipeline_result = _0x15e_new
            const _0x15c_count = await _67lang.maybe_await((_0x15d__.count = (_0x107__0x106_pipeline_result)))
            let _0x108__0x105_pipeline_result = _0x15c_count
            return _0x108__0x105_pipeline_result;
        } }
    const _0xfc_create_counter = async function () {{


            const _0x15f_create_counter_store = await _67lang.maybe_await((new _0x139_create_counter_store(0)))
            let _0xfe__0xfd_pipeline_result = _0x15f_create_counter_store
            let _0xff__ = _0xfe__0xfd_pipeline_result
            _0xff__
            const _0x160__ = _0xff__
            let _0x10a__0x109_pipeline_result = _0x160__
            return (() => _0x100_create_counter_colon__colon_count(_0x10a__0x109_pipeline_result));
        } }
    const _0x55_greet = async function (
        person
    ) {{
            let _0x56_person = person
            _0x56_person
            const _0x162_person = _0x56_person
            let _0x59__0x58_pipeline_result = _0x162_person
            const _0x161_concat = ("Hello, " + _0x59__0x58_pipeline_result)
            let _0x5a__0x57_pipeline_result = _0x161_concat
            return _0x5a__0x57_pipeline_result;
        } }
    {



















    } {


        let _0x40_name = "Alice"
        _0x40_name
        let _0x41_age = 25
        _0x41_age

        let _0x42_is_active = true
        _0x42_is_active
        const _0x164_name = _0x40_name
        let _0x45__0x44_pipeline_result = _0x164_name
        const _0x165_age = _0x41_age
        let _0x47__0x46_pipeline_result = _0x165_age
        const _0x166_is_active = _0x42_is_active
        let _0x49__0x48_pipeline_result = _0x166_is_active
        const _0x163_print = await _67lang.maybe_await(console.log(_0x45__0x44_pipeline_result, _0x47__0x46_pipeline_result, _0x49__0x48_pipeline_result))
        let _0x4a__0x43_pipeline_result = _0x163_print
        _0x4a__0x43_pipeline_result


        const _0x167_name = (_0x40_name = "Aris")
        let _0x4c__0x4b_pipeline_result = _0x167_name
        _0x4c__0x4b_pipeline_result
        const _0x169_name = _0x40_name
        let _0x4f__0x4e_pipeline_result = _0x169_name
        const _0x168_print = await _67lang.maybe_await(console.log(_0x4f__0x4e_pipeline_result))
        let _0x50__0x4d_pipeline_result = _0x168_print
        _0x50__0x4d_pipeline_result


        const _0x16b_name = _0x40_name
        let _0x53__0x52_pipeline_result = _0x16b_name
        const _0x16a_print = await _67lang.maybe_await(console.log(_0x53__0x52_pipeline_result))
        let _0x54__0x51_pipeline_result = _0x16a_print
        _0x54__0x51_pipeline_result

        const _0x16d_greet = await _67lang.maybe_await(_0x55_greet("Alice"))
        let _0x5d__0x5c_pipeline_result = _0x16d_greet
        const _0x16c_print = await _67lang.maybe_await(console.log(_0x5d__0x5c_pipeline_result))
        let _0x5e__0x5b_pipeline_result = _0x16c_print
        _0x5e__0x5b_pipeline_result

        let _0x5f_numbers = [1, 2, 3, 4, 5]
        _0x5f_numbers
        const _0x16f_numbers = _0x5f_numbers
        const _0x16e_push = Array.prototype.push.call(_0x16f_numbers, 6)
        let _0x61__0x60_pipeline_result = _0x16e_push
        _0x61__0x60_pipeline_result
        const _0x172_numbers = _0x5f_numbers
        const _0x171__hash_ = _0x172_numbers[0]
        let _0x64__0x63_pipeline_result = _0x171__hash_
        const _0x170_print = await _67lang.maybe_await(console.log(_0x64__0x63_pipeline_result))
        let _0x65__0x62_pipeline_result = _0x170_print
        _0x65__0x62_pipeline_result
        const _0x175_numbers = _0x5f_numbers
        const _0x178_numbers = _0x5f_numbers
        const _0x177_length = (_0x178_numbers.length)
        let _0x6a__0x69_pipeline_result = _0x177_length
        const _0x176_sub = (_0x6a__0x69_pipeline_result - 1)
        let _0x6b__0x68_pipeline_result = _0x176_sub
        const _0x174__hash_ = _0x175_numbers[_0x6b__0x68_pipeline_result]
        let _0x6c__0x67_pipeline_result = _0x174__hash_
        const _0x173_print = await _67lang.maybe_await(console.log(_0x6c__0x67_pipeline_result))
        let _0x6d__0x66_pipeline_result = _0x173_print
        _0x6d__0x66_pipeline_result



        const _0x17a_age = _0x41_age
        let _0x70__0x6f_pipeline_result = _0x17a_age
        const _0x179_nondesc = (18 <= _0x70__0x6f_pipeline_result)
        let _0x71__0x6e_pipeline_result = _0x179_nondesc
        if (_0x71__0x6e_pipeline_result)
        {
            const _0x17b_print = await _67lang.maybe_await(console.log("Adult"))
            let _0x73__0x72_pipeline_result = _0x17b_print
            _0x73__0x72_pipeline_result
        } 
        else {
            const _0x17c_print = await _67lang.maybe_await(console.log("Minor"))
            let _0x75__0x74_pipeline_result = _0x17c_print
            _0x75__0x74_pipeline_result
        } 

        {
            let _0x78__0x76_for_number__index = 0
            _0x78__0x76_for_number__index
            const _0x17d_numbers = _0x5f_numbers
            let _0x7a__0x79_pipeline_result = _0x17d_numbers
            let _0x7b__0x77_for_number__list = _0x7a__0x79_pipeline_result
            _0x7b__0x77_for_number__list
            while(true) {
                const _0x17f__0x76_for_number__index = _0x78__0x76_for_number__index
                let _0x7e__0x7d_pipeline_result = _0x17f__0x76_for_number__index
                const _0x181__0x77_for_number__list = _0x7b__0x77_for_number__list
                const _0x180_length = (_0x181__0x77_for_number__list.length)
                let _0x80__0x7f_pipeline_result = _0x180_length
                const _0x17e_asc = (_0x7e__0x7d_pipeline_result < _0x80__0x7f_pipeline_result)
                let _0x81__0x7c_pipeline_result = _0x17e_asc
                if (!_0x81__0x7c_pipeline_result) { break; }
                {
                    const _0x183__0x77_for_number__list = _0x7b__0x77_for_number__list
                    const _0x184__0x76_for_number__index = _0x78__0x76_for_number__index
                    let _0x84__0x83_pipeline_result = _0x184__0x76_for_number__index
                    const _0x182__hash_ = _0x183__0x77_for_number__list[_0x84__0x83_pipeline_result]
                    let _0x85__0x82_pipeline_result = _0x182__hash_
                    let _0x86_number = _0x85__0x82_pipeline_result
                    _0x86_number
                    const _0x187__0x76_for_number__index = _0x78__0x76_for_number__index
                    const _0x186_add = (_0x187__0x76_for_number__index + 1)
                    let _0x89__0x88_pipeline_result = _0x186_add
                    const _0x185__0x76_for_number__index = (_0x78__0x76_for_number__index = _0x89__0x88_pipeline_result)
                    let _0x8a__0x87_pipeline_result = _0x185__0x76_for_number__index
                    _0x8a__0x87_pipeline_result
                    const _0x189_number = _0x86_number
                    let _0x8d__0x8c_pipeline_result = _0x189_number
                    const _0x188_print = await _67lang.maybe_await(console.log(_0x8d__0x8c_pipeline_result))
                    let _0x8e__0x8b_pipeline_result = _0x188_print
                    _0x8e__0x8b_pipeline_result
                } }
        } 

        const _0x18a_Person = await _67lang.maybe_await((new _0x13a_Person("Alice", 30)))
        let _0x90__0x8f_pipeline_result = _0x18a_Person
        let _0x91_alice = _0x90__0x8f_pipeline_result
        _0x91_alice
        const _0x18d_alice = _0x91_alice
        const _0x18c_name = await _67lang.maybe_await((_0x18d_alice.name))
        let _0x94__0x93_pipeline_result = _0x18c_name
        const _0x18b_print = await _67lang.maybe_await(console.log(_0x94__0x93_pipeline_result))
        let _0x95__0x92_pipeline_result = _0x18b_print
        _0x95__0x92_pipeline_result
        const _0x190_alice = _0x91_alice
        const _0x18f_age = await _67lang.maybe_await((_0x190_alice.age))
        let _0x98__0x97_pipeline_result = _0x18f_age
        const _0x18e_print = await _67lang.maybe_await(console.log(_0x98__0x97_pipeline_result))
        let _0x99__0x96_pipeline_result = _0x18e_print
        _0x99__0x96_pipeline_result
        const _0x192_alice = _0x91_alice
        const _0x191_name = await _67lang.maybe_await((_0x192_alice.name = ("Alicia")))
        let _0x9b__0x9a_pipeline_result = _0x191_name
        _0x9b__0x9a_pipeline_result
        const _0x195_alice = _0x91_alice
        const _0x194_name = await _67lang.maybe_await((_0x195_alice.name))
        let _0x9e__0x9d_pipeline_result = _0x194_name
        const _0x193_print = await _67lang.maybe_await(console.log(_0x9e__0x9d_pipeline_result))
        let _0x9f__0x9c_pipeline_result = _0x193_print
        _0x9f__0x9c_pipeline_result

        const _0x197_name = _0x40_name
        let _0xa2__0xa1_pipeline_result = _0x197_name
        const _0x196_print = await _67lang.maybe_await(console.log(_0xa2__0xa1_pipeline_result))
        let _0xa3__0xa0_pipeline_result = _0x196_print
        _0xa3__0xa0_pipeline_result


        let _0xa4__1 = 1
        _0xa4__1
        const _0x198__1 = _0xa4__1
        let _0xa5__q_ = _0x198__1
        _0xa5__q_
        const _0x19a__q_ = _0xa5__q_
        const _0x19b__q_ = _0xa5__q_
        let _0xa8__0xa7_pipeline_result = _0x19b__q_
        const _0x199_add = (_0x19a__q_ + _0xa8__0xa7_pipeline_result + 1)
        let _0xa9__0xa6_pipeline_result = _0x199_add
        _0xa9__0xa6_pipeline_result
        const _0x19d__0xa6_pipeline_result = _0xa9__0xa6_pipeline_result
        const _0x19c_print = await _67lang.maybe_await(console.log(_0x19d__0xa6_pipeline_result))
        let _0xab__0xaa_pipeline_result = _0x19c_print
        _0xab__0xaa_pipeline_result

        const _0x19e__1 = _0xa4__1
        let _0xac__q_ = _0x19e__1
        _0xac__q_
        const _0x1a0__q_ = _0xac__q_
        let _0xaf__0xae_pipeline_result = _0x1a0__q_
        const _0x19f_add = (_0xaf__0xae_pipeline_result + 1)
        let _0xb0__0xad_pipeline_result = _0x19f_add
        _0xb0__0xad_pipeline_result
        const _0x1a2__0xad_pipeline_result = _0xb0__0xad_pipeline_result
        const _0x1a1_print = await _67lang.maybe_await(console.log(_0x1a2__0xad_pipeline_result))
        let _0xb2__0xb1_pipeline_result = _0x1a1_print
        _0xb2__0xb1_pipeline_result

        const _0x1a3__1 = _0xa4__1
        let _0xb3__q_ = _0x1a3__1
        _0xb3__q_
        const _0x1a5__q_ = _0xb3__q_
        const _0x1a4_add = (_0x1a5__q_ + 1)
        let _0xb5__0xb4_pipeline_result = _0x1a4_add
        _0xb5__0xb4_pipeline_result
        const _0x1a7__0xb4_pipeline_result = _0xb5__0xb4_pipeline_result
        const _0x1a6_print = await _67lang.maybe_await(console.log(_0x1a7__0xb4_pipeline_result))
        let _0xb7__0xb6_pipeline_result = _0x1a6_print
        _0xb7__0xb6_pipeline_result

        let _0xb8_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
        _0xb8_things_to_say
        let _0xb9_max_characters = 0
        _0xb9_max_characters
        let _0xba_found_word = ""
        _0xba_found_word
        {
            let _0xbd__0xbb_for_thing__index = 0
            _0xbd__0xbb_for_thing__index
            const _0x1a8_things_to_say = _0xb8_things_to_say
            let _0xbf__0xbe_pipeline_result = _0x1a8_things_to_say
            let _0xc0__0xbc_for_thing__list = _0xbf__0xbe_pipeline_result
            _0xc0__0xbc_for_thing__list
            while(true) {
                const _0x1aa__0xbb_for_thing__index = _0xbd__0xbb_for_thing__index
                let _0xc3__0xc2_pipeline_result = _0x1aa__0xbb_for_thing__index
                const _0x1ac__0xbc_for_thing__list = _0xc0__0xbc_for_thing__list
                const _0x1ab_length = (_0x1ac__0xbc_for_thing__list.length)
                let _0xc5__0xc4_pipeline_result = _0x1ab_length
                const _0x1a9_asc = (_0xc3__0xc2_pipeline_result < _0xc5__0xc4_pipeline_result)
                let _0xc6__0xc1_pipeline_result = _0x1a9_asc
                if (!_0xc6__0xc1_pipeline_result) { break; }
                {
                    const _0x1ae__0xbc_for_thing__list = _0xc0__0xbc_for_thing__list
                    const _0x1af__0xbb_for_thing__index = _0xbd__0xbb_for_thing__index
                    let _0xc9__0xc8_pipeline_result = _0x1af__0xbb_for_thing__index
                    const _0x1ad__hash_ = _0x1ae__0xbc_for_thing__list[_0xc9__0xc8_pipeline_result]
                    let _0xca__0xc7_pipeline_result = _0x1ad__hash_
                    let _0xcb_thing = _0xca__0xc7_pipeline_result
                    _0xcb_thing
                    const _0x1b2__0xbb_for_thing__index = _0xbd__0xbb_for_thing__index
                    const _0x1b1_add = (_0x1b2__0xbb_for_thing__index + 1)
                    let _0xce__0xcd_pipeline_result = _0x1b1_add
                    const _0x1b0__0xbb_for_thing__index = (_0xbd__0xbb_for_thing__index = _0xce__0xcd_pipeline_result)
                    let _0xcf__0xcc_pipeline_result = _0x1b0__0xbb_for_thing__index
                    _0xcf__0xcc_pipeline_result
                    {
                        let _0xd2__0xd0_for_word__index = 0
                        _0xd2__0xd0_for_word__index
                        const _0x1b4_thing = _0xcb_thing
                        const _0x1b3_split = String.prototype.split.call(_0x1b4_thing, " ")
                        let _0xd4__0xd3_pipeline_result = _0x1b3_split
                        let _0xd5__0xd1_for_word__list = _0xd4__0xd3_pipeline_result
                        _0xd5__0xd1_for_word__list
                        while(true) {
                            const _0x1b6__0xd0_for_word__index = _0xd2__0xd0_for_word__index
                            let _0xd8__0xd7_pipeline_result = _0x1b6__0xd0_for_word__index
                            const _0x1b8__0xd1_for_word__list = _0xd5__0xd1_for_word__list
                            const _0x1b7_length = (_0x1b8__0xd1_for_word__list.length)
                            let _0xda__0xd9_pipeline_result = _0x1b7_length
                            const _0x1b5_asc = (_0xd8__0xd7_pipeline_result < _0xda__0xd9_pipeline_result)
                            let _0xdb__0xd6_pipeline_result = _0x1b5_asc
                            if (!_0xdb__0xd6_pipeline_result) { break; }
                            {
                                const _0x1ba__0xd1_for_word__list = _0xd5__0xd1_for_word__list
                                const _0x1bb__0xd0_for_word__index = _0xd2__0xd0_for_word__index
                                let _0xde__0xdd_pipeline_result = _0x1bb__0xd0_for_word__index
                                const _0x1b9__hash_ = _0x1ba__0xd1_for_word__list[_0xde__0xdd_pipeline_result]
                                let _0xdf__0xdc_pipeline_result = _0x1b9__hash_
                                let _0xe0_word = _0xdf__0xdc_pipeline_result
                                _0xe0_word
                                const _0x1be__0xd0_for_word__index = _0xd2__0xd0_for_word__index
                                const _0x1bd_add = (_0x1be__0xd0_for_word__index + 1)
                                let _0xe3__0xe2_pipeline_result = _0x1bd_add
                                const _0x1bc__0xd0_for_word__index = (_0xd2__0xd0_for_word__index = _0xe3__0xe2_pipeline_result)
                                let _0xe4__0xe1_pipeline_result = _0x1bc__0xd0_for_word__index
                                _0xe4__0xe1_pipeline_result

                                const _0x1bf_word = _0xe0_word
                                let _0xe6__0xe5_pipeline_result = _0x1bf_word
                                let _0xe7_word = _0xe6__0xe5_pipeline_result
                                _0xe7_word

                                const _0x1c1_word = _0xe7_word
                                const _0x1c0_length = (_0x1c1_word.length)
                                let _0xe9__0xe8_pipeline_result = _0x1c0_length
                                _0xe9__0xe8_pipeline_result
                                const _0x1c3__0xe8_pipeline_result = _0xe9__0xe8_pipeline_result
                                const _0x1c4_max_characters = _0xb9_max_characters
                                let _0xec__0xeb_pipeline_result = _0x1c4_max_characters
                                const _0x1c2_desc = (_0x1c3__0xe8_pipeline_result > _0xec__0xeb_pipeline_result)
                                let _0xed__0xea_pipeline_result = _0x1c2_desc
                                if (_0xed__0xea_pipeline_result)
                                {

                                    const _0x1c6__0xe8_pipeline_result = _0xe9__0xe8_pipeline_result
                                    const _0x1c5_max_characters = (_0xb9_max_characters = _0x1c6__0xe8_pipeline_result)
                                    let _0xef__0xee_pipeline_result = _0x1c5_max_characters
                                    _0xef__0xee_pipeline_result

                                    const _0x1c8_word = _0xe7_word
                                    const _0x1c7_found_word = (_0xba_found_word = _0x1c8_word)
                                    _0x1c7_found_word

                                    const _0x1ca_word = _0xe7_word
                                    const _0x1c9_found_word = (_0xba_found_word = _0x1ca_word)
                                    let _0xf1__0xf0_pipeline_result = _0x1c9_found_word
                                    _0xf1__0xf0_pipeline_result
                                } 
                            } }
                    } 
                } }
        } 
        const _0x1cc_found_word = _0xba_found_word
        let _0xf4__0xf3_pipeline_result = _0x1cc_found_word
        const _0x1cb_print = await _67lang.maybe_await(console.log(_0xf4__0xf3_pipeline_result))
        let _0xf5__0xf2_pipeline_result = _0x1cb_print
        _0xf5__0xf2_pipeline_result




        const _0x1ce_things_to_say = _0xb8_things_to_say
        const _0x1cd__hash_ = _0x1ce_things_to_say[0]
        let _0xf7__0xf6_pipeline_result = _0x1cd__hash_
        _0xf7__0xf6_pipeline_result
        const _0x1d0__0xf6_pipeline_result = _0xf7__0xf6_pipeline_result
        const _0x1cf_split = String.prototype.split.call(_0x1d0__0xf6_pipeline_result, " ")
        let _0xf9__0xf8_pipeline_result = _0x1cf_split
        _0xf9__0xf8_pipeline_result
        const _0x1d4__0xf8_pipeline_result = _0xf9__0xf8_pipeline_result
        const _0x1d3_sort = Array.prototype.sort.call(_0x1d4__0xf8_pipeline_result)
        const _0x1d2_join = Array.prototype.join.call(_0x1d3_sort)
        const _0x1d1_print = await _67lang.maybe_await(console.log(_0x1d2_join, " - what words!"))
        let _0xfb__0xfa_pipeline_result = _0x1d1_print
        _0xfb__0xfa_pipeline_result


        const _0x1d5_create_counter = await _67lang.maybe_await(_0xfc_create_counter())
        let _0x10c__0x10b_pipeline_result = _0x1d5_create_counter
        let _0x10d_counter = _0x10c__0x10b_pipeline_result
        _0x10d_counter
        const _0x1d6_print = await _67lang.maybe_await(console.log("wow, counting!"))
        let _0x10f__0x10e_pipeline_result = _0x1d6_print
        _0x10f__0x10e_pipeline_result
        const _0x1da_counter = _0x10d_counter
        const _0x1d9__tilde_ = await _67lang.maybe_await(_0x1da_counter())
        let _0x113__0x112_pipeline_result = _0x1d9__tilde_
        const _0x1d8_str = Number.prototype.toString.call(_0x113__0x112_pipeline_result)
        let _0x114__0x111_pipeline_result = _0x1d8_str
        const _0x1dd_counter = _0x10d_counter
        const _0x1dc__tilde_ = await _67lang.maybe_await(_0x1dd_counter())
        let _0x117__0x116_pipeline_result = _0x1dc__tilde_
        const _0x1db_str = Number.prototype.toString.call(_0x117__0x116_pipeline_result)
        let _0x118__0x115_pipeline_result = _0x1db_str
        const _0x1e0_counter = _0x10d_counter
        const _0x1df__tilde_ = await _67lang.maybe_await(_0x1e0_counter())
        let _0x11b__0x11a_pipeline_result = _0x1df__tilde_
        const _0x1de_str = Number.prototype.toString.call(_0x11b__0x11a_pipeline_result)
        let _0x11c__0x119_pipeline_result = _0x1de_str
        const _0x1e3_counter = _0x10d_counter
        const _0x1e2__tilde_ = await _67lang.maybe_await(_0x1e3_counter())
        let _0x11f__0x11e_pipeline_result = _0x1e2__tilde_
        const _0x1e1_str = Number.prototype.toString.call(_0x11f__0x11e_pipeline_result)
        let _0x120__0x11d_pipeline_result = _0x1e1_str
        const _0x1e6_counter = _0x10d_counter
        const _0x1e5__tilde_ = await _67lang.maybe_await(_0x1e6_counter())
        let _0x123__0x122_pipeline_result = _0x1e5__tilde_
        const _0x1e4_str = Number.prototype.toString.call(_0x123__0x122_pipeline_result)
        let _0x124__0x121_pipeline_result = _0x1e4_str
        const _0x1e9_counter = _0x10d_counter
        const _0x1e8__tilde_ = await _67lang.maybe_await(_0x1e9_counter())
        let _0x127__0x126_pipeline_result = _0x1e8__tilde_
        const _0x1e7_str = Number.prototype.toString.call(_0x127__0x126_pipeline_result)
        let _0x128__0x125_pipeline_result = _0x1e7_str
        const _0x1d7_print = await _67lang.maybe_await(console.log(_0x114__0x111_pipeline_result, _0x118__0x115_pipeline_result, _0x11c__0x119_pipeline_result, _0x120__0x11d_pipeline_result, _0x124__0x121_pipeline_result, _0x128__0x125_pipeline_result))
        let _0x129__0x110_pipeline_result = _0x1d7_print
        _0x129__0x110_pipeline_result


        let _0x134_politely_agree = ((arg0, arg1) => _0x12a_bool_printer(arg0, "i would indeed like to agree.", arg1))
        _0x134_politely_agree
        const _0x1eb_politely_agree = _0x134_politely_agree
        const _0x1ea__tilde_ = await _67lang.maybe_await(_0x1eb_politely_agree(true, "what?! utter BULLSHIT!"))
        let _0x136__0x135_pipeline_result = _0x1ea__tilde_
        _0x136__0x135_pipeline_result
        const _0x1ed_politely_agree = _0x134_politely_agree
        const _0x1ec__tilde_ = await _67lang.maybe_await(_0x1ed_politely_agree(false, "what?! utter BULLSHIT!"))
        let _0x138__0x137_pipeline_result = _0x1ec__tilde_
        _0x138__0x137_pipeline_result


    } 
})();
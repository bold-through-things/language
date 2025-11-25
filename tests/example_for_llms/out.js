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

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
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


function _0x137_create_counter_store(count) {
    this.count = count;
}


function _0x138_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x128_bool_printer = async function (
        value,
        if_true,
        if_false
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                value = value
                if_true = if_true
                if_false = if_false
                let _0x129_if_false = if_false
                _0x129_if_false
                let _0x12a_if_true = if_true
                _0x12a_if_true
                let _0x12b_value = value
                _0x12b_value
                const _0x14f_value = _0x12b_value
                let _0x12d__0x12c_pipeline_result = _0x14f_value
                if (_0x12d__0x12c_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x151_if_true = _0x12a_if_true
                        const _0x150_print = await _67lang.maybe_await(console.log(_0x151_if_true))
                        let _0x12f__0x12e_pipeline_result = _0x150_print
                        _0x12f__0x12e_pipeline_result
                    }
                } 
                else {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x153_if_false = _0x129_if_false
                        const _0x152_print = await _67lang.maybe_await(console.log(_0x153_if_false))
                        let _0x131__0x130_pipeline_result = _0x152_print
                        _0x131__0x130_pipeline_result
                    }
                } 
            }
        } }
    const _0xfe_create_counter_colon__colon_count = async function (
        _
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                _ = _
                let _0xff__ = _
                _0xff__
                const _0x156__ = _0xff__
                const _0x155_count = await _67lang.maybe_await((_0x156__.count))
                let _0x101__0x100_pipeline_result = _0x155_count
                const _0x154_add = (_0x101__0x100_pipeline_result + 1)
                let _0x102_new = _0x154_add
                _0x102_new
                const _0x158__ = _0xff__
                const _0x159_new = _0x102_new
                let _0x105__0x104_pipeline_result = _0x159_new
                const _0x157_count = await _67lang.maybe_await((_0x158__.count = (_0x105__0x104_pipeline_result)))
                let _0x106__0x103_pipeline_result = _0x157_count
                return _0x106__0x103_pipeline_result;
            }
        } }
    const _0xfa_create_counter = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)


                const _0x15a_create_counter_store = await _67lang.maybe_await((new _0x137_create_counter_store(0)))
                let _0xfc__0xfb_pipeline_result = _0x15a_create_counter_store
                let _0xfd__ = _0xfc__0xfb_pipeline_result
                _0xfd__
                const _0x15b__ = _0xfd__
                let _0x108__0x107_pipeline_result = _0x15b__
                return (() => _0xfe_create_counter_colon__colon_count(_0x108__0x107_pipeline_result));
            }
        } }
    const _0x53_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                let _0x54_person = person
                _0x54_person
                const _0x15d_person = _0x54_person
                let _0x57__0x56_pipeline_result = _0x15d_person
                const _0x15c_concat = ("Hello, " + _0x57__0x56_pipeline_result)
                let _0x58__0x55_pipeline_result = _0x15c_concat
                return _0x58__0x55_pipeline_result;
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


















        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


            let _0x3e_name = "Alice"
            _0x3e_name
            let _0x3f_age = 25
            _0x3f_age

            let _0x40_is_active = true
            _0x40_is_active
            const _0x15f_name = _0x3e_name
            let _0x43__0x42_pipeline_result = _0x15f_name
            const _0x160_age = _0x3f_age
            let _0x45__0x44_pipeline_result = _0x160_age
            const _0x161_is_active = _0x40_is_active
            let _0x47__0x46_pipeline_result = _0x161_is_active
            const _0x15e_print = await _67lang.maybe_await(console.log(_0x43__0x42_pipeline_result, _0x45__0x44_pipeline_result, _0x47__0x46_pipeline_result))
            let _0x48__0x41_pipeline_result = _0x15e_print
            _0x48__0x41_pipeline_result


            const _0x162_name = (_0x3e_name = "Aris")
            let _0x4a__0x49_pipeline_result = _0x162_name
            _0x4a__0x49_pipeline_result
            const _0x164_name = _0x3e_name
            let _0x4d__0x4c_pipeline_result = _0x164_name
            const _0x163_print = await _67lang.maybe_await(console.log(_0x4d__0x4c_pipeline_result))
            let _0x4e__0x4b_pipeline_result = _0x163_print
            _0x4e__0x4b_pipeline_result


            const _0x166_name = _0x3e_name
            let _0x51__0x50_pipeline_result = _0x166_name
            const _0x165_print = await _67lang.maybe_await(console.log(_0x51__0x50_pipeline_result))
            let _0x52__0x4f_pipeline_result = _0x165_print
            _0x52__0x4f_pipeline_result

            const _0x168_greet = await _67lang.maybe_await(_0x53_greet("Alice"))
            let _0x5b__0x5a_pipeline_result = _0x168_greet
            const _0x167_print = await _67lang.maybe_await(console.log(_0x5b__0x5a_pipeline_result))
            let _0x5c__0x59_pipeline_result = _0x167_print
            _0x5c__0x59_pipeline_result

            let _0x5d_numbers = [1, 2, 3, 4, 5]
            _0x5d_numbers
            const _0x16a_numbers = _0x5d_numbers
            const _0x169_push = Array.prototype.push.call(_0x16a_numbers, 6)
            let _0x5f__0x5e_pipeline_result = _0x169_push
            _0x5f__0x5e_pipeline_result
            const _0x16d_numbers = _0x5d_numbers
            const _0x16c__hash_ = _0x16d_numbers[0]
            let _0x62__0x61_pipeline_result = _0x16c__hash_
            const _0x16b_print = await _67lang.maybe_await(console.log(_0x62__0x61_pipeline_result))
            let _0x63__0x60_pipeline_result = _0x16b_print
            _0x63__0x60_pipeline_result
            const _0x170_numbers = _0x5d_numbers
            const _0x173_numbers = _0x5d_numbers
            const _0x172_length = (_0x173_numbers.length)
            let _0x68__0x67_pipeline_result = _0x172_length
            const _0x171_sub = (_0x68__0x67_pipeline_result - 1)
            let _0x69__0x66_pipeline_result = _0x171_sub
            const _0x16f__hash_ = _0x170_numbers[_0x69__0x66_pipeline_result]
            let _0x6a__0x65_pipeline_result = _0x16f__hash_
            const _0x16e_print = await _67lang.maybe_await(console.log(_0x6a__0x65_pipeline_result))
            let _0x6b__0x64_pipeline_result = _0x16e_print
            _0x6b__0x64_pipeline_result



            const _0x175_age = _0x3f_age
            let _0x6e__0x6d_pipeline_result = _0x175_age
            const _0x174_nondesc = (18 <= _0x6e__0x6d_pipeline_result)
            let _0x6f__0x6c_pipeline_result = _0x174_nondesc
            if (_0x6f__0x6c_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x176_print = await _67lang.maybe_await(console.log("Adult"))
                    let _0x71__0x70_pipeline_result = _0x176_print
                    _0x71__0x70_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x177_print = await _67lang.maybe_await(console.log("Minor"))
                    let _0x73__0x72_pipeline_result = _0x177_print
                    _0x73__0x72_pipeline_result
                }
            } 

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x76__0x74_for_number__index = 0
                    _0x76__0x74_for_number__index
                    const _0x178_numbers = _0x5d_numbers
                    let _0x78__0x77_pipeline_result = _0x178_numbers
                    let _0x79__0x75_for_number__list = _0x78__0x77_pipeline_result
                    _0x79__0x75_for_number__list
                    while(true) {
                        const _0x17a__0x74_for_number__index = _0x76__0x74_for_number__index
                        let _0x7c__0x7b_pipeline_result = _0x17a__0x74_for_number__index
                        const _0x17c__0x75_for_number__list = _0x79__0x75_for_number__list
                        const _0x17b_length = (_0x17c__0x75_for_number__list.length)
                        let _0x7e__0x7d_pipeline_result = _0x17b_length
                        const _0x179_asc = (_0x7c__0x7b_pipeline_result < _0x7e__0x7d_pipeline_result)
                        let _0x7f__0x7a_pipeline_result = _0x179_asc
                        if (!_0x7f__0x7a_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x17e__0x75_for_number__list = _0x79__0x75_for_number__list
                                const _0x17f__0x74_for_number__index = _0x76__0x74_for_number__index
                                let _0x82__0x81_pipeline_result = _0x17f__0x74_for_number__index
                                const _0x17d__hash_ = _0x17e__0x75_for_number__list[_0x82__0x81_pipeline_result]
                                let _0x83__0x80_pipeline_result = _0x17d__hash_
                                let _0x84_number = _0x83__0x80_pipeline_result
                                _0x84_number
                                const _0x182__0x74_for_number__index = _0x76__0x74_for_number__index
                                const _0x181_add = (_0x182__0x74_for_number__index + 1)
                                let _0x87__0x86_pipeline_result = _0x181_add
                                const _0x180__0x74_for_number__index = (_0x76__0x74_for_number__index = _0x87__0x86_pipeline_result)
                                let _0x88__0x85_pipeline_result = _0x180__0x74_for_number__index
                                _0x88__0x85_pipeline_result
                                const _0x184_number = _0x84_number
                                let _0x8b__0x8a_pipeline_result = _0x184_number
                                const _0x183_print = await _67lang.maybe_await(console.log(_0x8b__0x8a_pipeline_result))
                                let _0x8c__0x89_pipeline_result = _0x183_print
                                _0x8c__0x89_pipeline_result
                            }
                        } }
                }
            } 

            const _0x185_Person = await _67lang.maybe_await((new _0x138_Person("Alice", 30)))
            let _0x8e__0x8d_pipeline_result = _0x185_Person
            let _0x8f_alice = _0x8e__0x8d_pipeline_result
            _0x8f_alice
            const _0x188_alice = _0x8f_alice
            const _0x187_name = await _67lang.maybe_await((_0x188_alice.name))
            let _0x92__0x91_pipeline_result = _0x187_name
            const _0x186_print = await _67lang.maybe_await(console.log(_0x92__0x91_pipeline_result))
            let _0x93__0x90_pipeline_result = _0x186_print
            _0x93__0x90_pipeline_result
            const _0x18b_alice = _0x8f_alice
            const _0x18a_age = await _67lang.maybe_await((_0x18b_alice.age))
            let _0x96__0x95_pipeline_result = _0x18a_age
            const _0x189_print = await _67lang.maybe_await(console.log(_0x96__0x95_pipeline_result))
            let _0x97__0x94_pipeline_result = _0x189_print
            _0x97__0x94_pipeline_result
            const _0x18d_alice = _0x8f_alice
            const _0x18c_name = await _67lang.maybe_await((_0x18d_alice.name = ("Alicia")))
            let _0x99__0x98_pipeline_result = _0x18c_name
            _0x99__0x98_pipeline_result
            const _0x190_alice = _0x8f_alice
            const _0x18f_name = await _67lang.maybe_await((_0x190_alice.name))
            let _0x9c__0x9b_pipeline_result = _0x18f_name
            const _0x18e_print = await _67lang.maybe_await(console.log(_0x9c__0x9b_pipeline_result))
            let _0x9d__0x9a_pipeline_result = _0x18e_print
            _0x9d__0x9a_pipeline_result

            const _0x192_name = _0x3e_name
            let _0xa0__0x9f_pipeline_result = _0x192_name
            const _0x191_print = await _67lang.maybe_await(console.log(_0xa0__0x9f_pipeline_result))
            let _0xa1__0x9e_pipeline_result = _0x191_print
            _0xa1__0x9e_pipeline_result


            let _0xa2__1 = 1
            _0xa2__1
            const _0x193__1 = _0xa2__1
            let _0xa3__q_ = _0x193__1
            _0xa3__q_
            const _0x195__q_ = _0xa3__q_
            const _0x196__q_ = _0xa3__q_
            let _0xa6__0xa5_pipeline_result = _0x196__q_
            const _0x194_add = (_0x195__q_ + _0xa6__0xa5_pipeline_result + 1)
            let _0xa7__0xa4_pipeline_result = _0x194_add
            _0xa7__0xa4_pipeline_result
            const _0x198__0xa4_pipeline_result = _0xa7__0xa4_pipeline_result
            const _0x197_print = await _67lang.maybe_await(console.log(_0x198__0xa4_pipeline_result))
            let _0xa9__0xa8_pipeline_result = _0x197_print
            _0xa9__0xa8_pipeline_result

            const _0x199__1 = _0xa2__1
            let _0xaa__q_ = _0x199__1
            _0xaa__q_
            const _0x19b__q_ = _0xaa__q_
            let _0xad__0xac_pipeline_result = _0x19b__q_
            const _0x19a_add = (_0xad__0xac_pipeline_result + 1)
            let _0xae__0xab_pipeline_result = _0x19a_add
            _0xae__0xab_pipeline_result
            const _0x19d__0xab_pipeline_result = _0xae__0xab_pipeline_result
            const _0x19c_print = await _67lang.maybe_await(console.log(_0x19d__0xab_pipeline_result))
            let _0xb0__0xaf_pipeline_result = _0x19c_print
            _0xb0__0xaf_pipeline_result

            const _0x19e__1 = _0xa2__1
            let _0xb1__q_ = _0x19e__1
            _0xb1__q_
            const _0x1a0__q_ = _0xb1__q_
            const _0x19f_add = (_0x1a0__q_ + 1)
            let _0xb3__0xb2_pipeline_result = _0x19f_add
            _0xb3__0xb2_pipeline_result
            const _0x1a2__0xb2_pipeline_result = _0xb3__0xb2_pipeline_result
            const _0x1a1_print = await _67lang.maybe_await(console.log(_0x1a2__0xb2_pipeline_result))
            let _0xb5__0xb4_pipeline_result = _0x1a1_print
            _0xb5__0xb4_pipeline_result

            let _0xb6_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
            _0xb6_things_to_say
            let _0xb7_max_characters = 0
            _0xb7_max_characters
            let _0xb8_found_word = ""
            _0xb8_found_word
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xbb__0xb9_for_thing__index = 0
                    _0xbb__0xb9_for_thing__index
                    const _0x1a3_things_to_say = _0xb6_things_to_say
                    let _0xbd__0xbc_pipeline_result = _0x1a3_things_to_say
                    let _0xbe__0xba_for_thing__list = _0xbd__0xbc_pipeline_result
                    _0xbe__0xba_for_thing__list
                    while(true) {
                        const _0x1a5__0xb9_for_thing__index = _0xbb__0xb9_for_thing__index
                        let _0xc1__0xc0_pipeline_result = _0x1a5__0xb9_for_thing__index
                        const _0x1a7__0xba_for_thing__list = _0xbe__0xba_for_thing__list
                        const _0x1a6_length = (_0x1a7__0xba_for_thing__list.length)
                        let _0xc3__0xc2_pipeline_result = _0x1a6_length
                        const _0x1a4_asc = (_0xc1__0xc0_pipeline_result < _0xc3__0xc2_pipeline_result)
                        let _0xc4__0xbf_pipeline_result = _0x1a4_asc
                        if (!_0xc4__0xbf_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x1a9__0xba_for_thing__list = _0xbe__0xba_for_thing__list
                                const _0x1aa__0xb9_for_thing__index = _0xbb__0xb9_for_thing__index
                                let _0xc7__0xc6_pipeline_result = _0x1aa__0xb9_for_thing__index
                                const _0x1a8__hash_ = _0x1a9__0xba_for_thing__list[_0xc7__0xc6_pipeline_result]
                                let _0xc8__0xc5_pipeline_result = _0x1a8__hash_
                                let _0xc9_thing = _0xc8__0xc5_pipeline_result
                                _0xc9_thing
                                const _0x1ad__0xb9_for_thing__index = _0xbb__0xb9_for_thing__index
                                const _0x1ac_add = (_0x1ad__0xb9_for_thing__index + 1)
                                let _0xcc__0xcb_pipeline_result = _0x1ac_add
                                const _0x1ab__0xb9_for_thing__index = (_0xbb__0xb9_for_thing__index = _0xcc__0xcb_pipeline_result)
                                let _0xcd__0xca_pipeline_result = _0x1ab__0xb9_for_thing__index
                                _0xcd__0xca_pipeline_result
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        let _0xd0__0xce_for_word__index = 0
                                        _0xd0__0xce_for_word__index
                                        const _0x1af_thing = _0xc9_thing
                                        const _0x1ae_split = String.prototype.split.call(_0x1af_thing, " ")
                                        let _0xd2__0xd1_pipeline_result = _0x1ae_split
                                        let _0xd3__0xcf_for_word__list = _0xd2__0xd1_pipeline_result
                                        _0xd3__0xcf_for_word__list
                                        while(true) {
                                            const _0x1b1__0xce_for_word__index = _0xd0__0xce_for_word__index
                                            let _0xd6__0xd5_pipeline_result = _0x1b1__0xce_for_word__index
                                            const _0x1b3__0xcf_for_word__list = _0xd3__0xcf_for_word__list
                                            const _0x1b2_length = (_0x1b3__0xcf_for_word__list.length)
                                            let _0xd8__0xd7_pipeline_result = _0x1b2_length
                                            const _0x1b0_asc = (_0xd6__0xd5_pipeline_result < _0xd8__0xd7_pipeline_result)
                                            let _0xd9__0xd4_pipeline_result = _0x1b0_asc
                                            if (!_0xd9__0xd4_pipeline_result) { break; }
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    const _0x1b5__0xcf_for_word__list = _0xd3__0xcf_for_word__list
                                                    const _0x1b6__0xce_for_word__index = _0xd0__0xce_for_word__index
                                                    let _0xdc__0xdb_pipeline_result = _0x1b6__0xce_for_word__index
                                                    const _0x1b4__hash_ = _0x1b5__0xcf_for_word__list[_0xdc__0xdb_pipeline_result]
                                                    let _0xdd__0xda_pipeline_result = _0x1b4__hash_
                                                    let _0xde_word = _0xdd__0xda_pipeline_result
                                                    _0xde_word
                                                    const _0x1b9__0xce_for_word__index = _0xd0__0xce_for_word__index
                                                    const _0x1b8_add = (_0x1b9__0xce_for_word__index + 1)
                                                    let _0xe1__0xe0_pipeline_result = _0x1b8_add
                                                    const _0x1b7__0xce_for_word__index = (_0xd0__0xce_for_word__index = _0xe1__0xe0_pipeline_result)
                                                    let _0xe2__0xdf_pipeline_result = _0x1b7__0xce_for_word__index
                                                    _0xe2__0xdf_pipeline_result

                                                    const _0x1ba_word = _0xde_word
                                                    let _0xe4__0xe3_pipeline_result = _0x1ba_word
                                                    let _0xe5_word = _0xe4__0xe3_pipeline_result
                                                    _0xe5_word

                                                    const _0x1bc_word = _0xe5_word
                                                    const _0x1bb_length = (_0x1bc_word.length)
                                                    let _0xe7__0xe6_pipeline_result = _0x1bb_length
                                                    _0xe7__0xe6_pipeline_result
                                                    const _0x1be__0xe6_pipeline_result = _0xe7__0xe6_pipeline_result
                                                    const _0x1bf_max_characters = _0xb7_max_characters
                                                    let _0xea__0xe9_pipeline_result = _0x1bf_max_characters
                                                    const _0x1bd_desc = (_0x1be__0xe6_pipeline_result > _0xea__0xe9_pipeline_result)
                                                    let _0xeb__0xe8_pipeline_result = _0x1bd_desc
                                                    if (_0xeb__0xe8_pipeline_result)
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)

                                                            const _0x1c1__0xe6_pipeline_result = _0xe7__0xe6_pipeline_result
                                                            const _0x1c0_max_characters = (_0xb7_max_characters = _0x1c1__0xe6_pipeline_result)
                                                            let _0xed__0xec_pipeline_result = _0x1c0_max_characters
                                                            _0xed__0xec_pipeline_result

                                                            const _0x1c3_word = _0xe5_word
                                                            const _0x1c2_found_word = (_0xb8_found_word = _0x1c3_word)
                                                            _0x1c2_found_word

                                                            const _0x1c5_word = _0xe5_word
                                                            const _0x1c4_found_word = (_0xb8_found_word = _0x1c5_word)
                                                            let _0xef__0xee_pipeline_result = _0x1c4_found_word
                                                            _0xef__0xee_pipeline_result
                                                        }
                                                    } 
                                                }
                                            } }
                                    }
                                } 
                            }
                        } }
                }
            } 
            const _0x1c7_found_word = _0xb8_found_word
            let _0xf2__0xf1_pipeline_result = _0x1c7_found_word
            const _0x1c6_print = await _67lang.maybe_await(console.log(_0xf2__0xf1_pipeline_result))
            let _0xf3__0xf0_pipeline_result = _0x1c6_print
            _0xf3__0xf0_pipeline_result




            const _0x1c9_things_to_say = _0xb6_things_to_say
            const _0x1c8__hash_ = _0x1c9_things_to_say[0]
            let _0xf5__0xf4_pipeline_result = _0x1c8__hash_
            _0xf5__0xf4_pipeline_result
            const _0x1cb__0xf4_pipeline_result = _0xf5__0xf4_pipeline_result
            const _0x1ca_split = String.prototype.split.call(_0x1cb__0xf4_pipeline_result, " ")
            let _0xf7__0xf6_pipeline_result = _0x1ca_split
            _0xf7__0xf6_pipeline_result
            const _0x1cf__0xf6_pipeline_result = _0xf7__0xf6_pipeline_result
            const _0x1ce_sort = Array.prototype.sort.call(_0x1cf__0xf6_pipeline_result)
            const _0x1cd_join = Array.prototype.join.call(_0x1ce_sort)
            const _0x1cc_print = await _67lang.maybe_await(console.log(_0x1cd_join, " - what words!"))
            let _0xf9__0xf8_pipeline_result = _0x1cc_print
            _0xf9__0xf8_pipeline_result


            const _0x1d0_create_counter = await _67lang.maybe_await(_0xfa_create_counter())
            let _0x10a__0x109_pipeline_result = _0x1d0_create_counter
            let _0x10b_counter = _0x10a__0x109_pipeline_result
            _0x10b_counter
            const _0x1d1_print = await _67lang.maybe_await(console.log("wow, counting!"))
            let _0x10d__0x10c_pipeline_result = _0x1d1_print
            _0x10d__0x10c_pipeline_result
            const _0x1d5_counter = _0x10b_counter
            const _0x1d4__tilde_ = await _67lang.maybe_await(_0x1d5_counter())
            let _0x111__0x110_pipeline_result = _0x1d4__tilde_
            const _0x1d3_str = Number.prototype.toString.call(_0x111__0x110_pipeline_result)
            let _0x112__0x10f_pipeline_result = _0x1d3_str
            const _0x1d8_counter = _0x10b_counter
            const _0x1d7__tilde_ = await _67lang.maybe_await(_0x1d8_counter())
            let _0x115__0x114_pipeline_result = _0x1d7__tilde_
            const _0x1d6_str = Number.prototype.toString.call(_0x115__0x114_pipeline_result)
            let _0x116__0x113_pipeline_result = _0x1d6_str
            const _0x1db_counter = _0x10b_counter
            const _0x1da__tilde_ = await _67lang.maybe_await(_0x1db_counter())
            let _0x119__0x118_pipeline_result = _0x1da__tilde_
            const _0x1d9_str = Number.prototype.toString.call(_0x119__0x118_pipeline_result)
            let _0x11a__0x117_pipeline_result = _0x1d9_str
            const _0x1de_counter = _0x10b_counter
            const _0x1dd__tilde_ = await _67lang.maybe_await(_0x1de_counter())
            let _0x11d__0x11c_pipeline_result = _0x1dd__tilde_
            const _0x1dc_str = Number.prototype.toString.call(_0x11d__0x11c_pipeline_result)
            let _0x11e__0x11b_pipeline_result = _0x1dc_str
            const _0x1e1_counter = _0x10b_counter
            const _0x1e0__tilde_ = await _67lang.maybe_await(_0x1e1_counter())
            let _0x121__0x120_pipeline_result = _0x1e0__tilde_
            const _0x1df_str = Number.prototype.toString.call(_0x121__0x120_pipeline_result)
            let _0x122__0x11f_pipeline_result = _0x1df_str
            const _0x1e4_counter = _0x10b_counter
            const _0x1e3__tilde_ = await _67lang.maybe_await(_0x1e4_counter())
            let _0x125__0x124_pipeline_result = _0x1e3__tilde_
            const _0x1e2_str = Number.prototype.toString.call(_0x125__0x124_pipeline_result)
            let _0x126__0x123_pipeline_result = _0x1e2_str
            const _0x1d2_print = await _67lang.maybe_await(console.log(_0x112__0x10f_pipeline_result, _0x116__0x113_pipeline_result, _0x11a__0x117_pipeline_result, _0x11e__0x11b_pipeline_result, _0x122__0x11f_pipeline_result, _0x126__0x123_pipeline_result))
            let _0x127__0x10e_pipeline_result = _0x1d2_print
            _0x127__0x10e_pipeline_result


            let _0x132_politely_agree = ((arg0, arg1) => _0x128_bool_printer(arg0, "i would indeed like to agree.", arg1))
            _0x132_politely_agree
            const _0x1e6_politely_agree = _0x132_politely_agree
            const _0x1e5__tilde_ = await _67lang.maybe_await(_0x1e6_politely_agree(true, "what?! utter BULLSHIT!"))
            let _0x134__0x133_pipeline_result = _0x1e5__tilde_
            _0x134__0x133_pipeline_result
            const _0x1e8_politely_agree = _0x132_politely_agree
            const _0x1e7__tilde_ = await _67lang.maybe_await(_0x1e8_politely_agree(false, "what?! utter BULLSHIT!"))
            let _0x136__0x135_pipeline_result = _0x1e7__tilde_
            _0x136__0x135_pipeline_result


        }
    } 
})();
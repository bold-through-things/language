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


function _0x127_create_counter_store(count) {
    this.count = count;
}


function _0x128_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0x118_bool_printer = async function (
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
                let _0x119_if_false = if_false
                _0x119_if_false
                let _0x11a_if_true = if_true
                _0x11a_if_true
                let _0x11b_value = value
                _0x11b_value
                const _0x13c_value = _0x11b_value
                let _0x11d__0x11c_pipeline_result = _0x13c_value
                if (_0x11d__0x11c_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x13e_if_true = _0x11a_if_true
                        const _0x13d_print = await _67lang.maybe_await(console.log(_0x13e_if_true))
                        let _0x11f__0x11e_pipeline_result = _0x13d_print
                        _0x11f__0x11e_pipeline_result
                    }
                } 
                else {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x140_if_false = _0x119_if_false
                        const _0x13f_print = await _67lang.maybe_await(console.log(_0x140_if_false))
                        let _0x121__0x120_pipeline_result = _0x13f_print
                        _0x121__0x120_pipeline_result
                    }
                } 
            }
        } }
    const _0xee_create_counter_colon__colon_count = async function (
        _
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                _ = _
                let _0xef__ = _
                _0xef__
                const _0x143__ = _0xef__
                const _0x142_count = await _67lang.maybe_await((_0x143__.count))
                let _0xf1__0xf0_pipeline_result = _0x142_count
                const _0x141_add = (_0xf1__0xf0_pipeline_result + 1)
                let _0xf2_new = _0x141_add
                _0xf2_new
                const _0x145__ = _0xef__
                const _0x146_new = _0xf2_new
                let _0xf5__0xf4_pipeline_result = _0x146_new
                const _0x144_count = await _67lang.maybe_await((_0x145__.count = (_0xf5__0xf4_pipeline_result)))
                let _0xf6__0xf3_pipeline_result = _0x144_count
                return _0xf6__0xf3_pipeline_result;
            }
        } }
    const _0xea_create_counter = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)


                const _0x147_create_counter_store = await _67lang.maybe_await((new _0x127_create_counter_store(0)))
                let _0xec__0xeb_pipeline_result = _0x147_create_counter_store
                let _0xed__ = _0xec__0xeb_pipeline_result
                _0xed__
                const _0x148__ = _0xed__
                let _0xf8__0xf7_pipeline_result = _0x148__
                return (() => _0xee_create_counter_colon__colon_count(_0xf8__0xf7_pipeline_result));
            }
        } }
    const _0x43_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                let _0x44_person = person
                _0x44_person
                const _0x14a_person = _0x44_person
                let _0x47__0x46_pipeline_result = _0x14a_person
                const _0x149_concat = ("Hello, " + _0x47__0x46_pipeline_result)
                let _0x48__0x45_pipeline_result = _0x149_concat
                return _0x48__0x45_pipeline_result;
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


            let _0x2e_name = "Alice"
            _0x2e_name
            let _0x2f_age = 25
            _0x2f_age

            let _0x30_is_active = true
            _0x30_is_active
            const _0x14c_name = _0x2e_name
            let _0x33__0x32_pipeline_result = _0x14c_name
            const _0x14d_age = _0x2f_age
            let _0x35__0x34_pipeline_result = _0x14d_age
            const _0x14e_is_active = _0x30_is_active
            let _0x37__0x36_pipeline_result = _0x14e_is_active
            const _0x14b_print = await _67lang.maybe_await(console.log(_0x33__0x32_pipeline_result, _0x35__0x34_pipeline_result, _0x37__0x36_pipeline_result))
            let _0x38__0x31_pipeline_result = _0x14b_print
            _0x38__0x31_pipeline_result


            const _0x14f_name = (_0x2e_name = "Aris")
            let _0x3a__0x39_pipeline_result = _0x14f_name
            _0x3a__0x39_pipeline_result
            const _0x151_name = _0x2e_name
            let _0x3d__0x3c_pipeline_result = _0x151_name
            const _0x150_print = await _67lang.maybe_await(console.log(_0x3d__0x3c_pipeline_result))
            let _0x3e__0x3b_pipeline_result = _0x150_print
            _0x3e__0x3b_pipeline_result


            const _0x153_name = _0x2e_name
            let _0x41__0x40_pipeline_result = _0x153_name
            const _0x152_print = await _67lang.maybe_await(console.log(_0x41__0x40_pipeline_result))
            let _0x42__0x3f_pipeline_result = _0x152_print
            _0x42__0x3f_pipeline_result

            const _0x155_greet = await _67lang.maybe_await(_0x43_greet("Alice"))
            let _0x4b__0x4a_pipeline_result = _0x155_greet
            const _0x154_print = await _67lang.maybe_await(console.log(_0x4b__0x4a_pipeline_result))
            let _0x4c__0x49_pipeline_result = _0x154_print
            _0x4c__0x49_pipeline_result

            let _0x4d_numbers = [1, 2, 3, 4, 5]
            _0x4d_numbers
            const _0x157_numbers = _0x4d_numbers
            const _0x156_push = Array.prototype.push.call(_0x157_numbers, 6)
            let _0x4f__0x4e_pipeline_result = _0x156_push
            _0x4f__0x4e_pipeline_result
            const _0x15a_numbers = _0x4d_numbers
            const _0x159__hash_ = _0x15a_numbers[0]
            let _0x52__0x51_pipeline_result = _0x159__hash_
            const _0x158_print = await _67lang.maybe_await(console.log(_0x52__0x51_pipeline_result))
            let _0x53__0x50_pipeline_result = _0x158_print
            _0x53__0x50_pipeline_result
            const _0x15d_numbers = _0x4d_numbers
            const _0x160_numbers = _0x4d_numbers
            const _0x15f_length = (_0x160_numbers.length)
            let _0x58__0x57_pipeline_result = _0x15f_length
            const _0x15e_sub = (_0x58__0x57_pipeline_result - 1)
            let _0x59__0x56_pipeline_result = _0x15e_sub
            const _0x15c__hash_ = _0x15d_numbers[_0x59__0x56_pipeline_result]
            let _0x5a__0x55_pipeline_result = _0x15c__hash_
            const _0x15b_print = await _67lang.maybe_await(console.log(_0x5a__0x55_pipeline_result))
            let _0x5b__0x54_pipeline_result = _0x15b_print
            _0x5b__0x54_pipeline_result



            const _0x162_age = _0x2f_age
            let _0x5e__0x5d_pipeline_result = _0x162_age
            const _0x161_nondesc = (18 <= _0x5e__0x5d_pipeline_result)
            let _0x5f__0x5c_pipeline_result = _0x161_nondesc
            if (_0x5f__0x5c_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x163_print = await _67lang.maybe_await(console.log("Adult"))
                    let _0x61__0x60_pipeline_result = _0x163_print
                    _0x61__0x60_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x164_print = await _67lang.maybe_await(console.log("Minor"))
                    let _0x63__0x62_pipeline_result = _0x164_print
                    _0x63__0x62_pipeline_result
                }
            } 

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x66__0x64_for_number__index = 0
                    _0x66__0x64_for_number__index
                    const _0x165_numbers = _0x4d_numbers
                    let _0x68__0x67_pipeline_result = _0x165_numbers
                    let _0x69__0x65_for_number__list = _0x68__0x67_pipeline_result
                    _0x69__0x65_for_number__list
                    while(true) {
                        const _0x167__0x64_for_number__index = _0x66__0x64_for_number__index
                        let _0x6c__0x6b_pipeline_result = _0x167__0x64_for_number__index
                        const _0x169__0x65_for_number__list = _0x69__0x65_for_number__list
                        const _0x168_length = (_0x169__0x65_for_number__list.length)
                        let _0x6e__0x6d_pipeline_result = _0x168_length
                        const _0x166_asc = (_0x6c__0x6b_pipeline_result < _0x6e__0x6d_pipeline_result)
                        let _0x6f__0x6a_pipeline_result = _0x166_asc
                        if (!_0x6f__0x6a_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x16b__0x65_for_number__list = _0x69__0x65_for_number__list
                                const _0x16c__0x64_for_number__index = _0x66__0x64_for_number__index
                                let _0x72__0x71_pipeline_result = _0x16c__0x64_for_number__index
                                const _0x16a__hash_ = _0x16b__0x65_for_number__list[_0x72__0x71_pipeline_result]
                                let _0x73__0x70_pipeline_result = _0x16a__hash_
                                let _0x74_number = _0x73__0x70_pipeline_result
                                _0x74_number
                                const _0x16f__0x64_for_number__index = _0x66__0x64_for_number__index
                                const _0x16e_add = (_0x16f__0x64_for_number__index + 1)
                                let _0x77__0x76_pipeline_result = _0x16e_add
                                const _0x16d__0x64_for_number__index = (_0x66__0x64_for_number__index = _0x77__0x76_pipeline_result)
                                let _0x78__0x75_pipeline_result = _0x16d__0x64_for_number__index
                                _0x78__0x75_pipeline_result
                                const _0x171_number = _0x74_number
                                let _0x7b__0x7a_pipeline_result = _0x171_number
                                const _0x170_print = await _67lang.maybe_await(console.log(_0x7b__0x7a_pipeline_result))
                                let _0x7c__0x79_pipeline_result = _0x170_print
                                _0x7c__0x79_pipeline_result
                            }
                        } }
                }
            } 

            const _0x172_Person = await _67lang.maybe_await((new _0x128_Person("Alice", 30)))
            let _0x7e__0x7d_pipeline_result = _0x172_Person
            let _0x7f_alice = _0x7e__0x7d_pipeline_result
            _0x7f_alice
            const _0x175_alice = _0x7f_alice
            const _0x174_name = await _67lang.maybe_await((_0x175_alice.name))
            let _0x82__0x81_pipeline_result = _0x174_name
            const _0x173_print = await _67lang.maybe_await(console.log(_0x82__0x81_pipeline_result))
            let _0x83__0x80_pipeline_result = _0x173_print
            _0x83__0x80_pipeline_result
            const _0x178_alice = _0x7f_alice
            const _0x177_age = await _67lang.maybe_await((_0x178_alice.age))
            let _0x86__0x85_pipeline_result = _0x177_age
            const _0x176_print = await _67lang.maybe_await(console.log(_0x86__0x85_pipeline_result))
            let _0x87__0x84_pipeline_result = _0x176_print
            _0x87__0x84_pipeline_result
            const _0x17a_alice = _0x7f_alice
            const _0x179_name = await _67lang.maybe_await((_0x17a_alice.name = ("Alicia")))
            let _0x89__0x88_pipeline_result = _0x179_name
            _0x89__0x88_pipeline_result
            const _0x17d_alice = _0x7f_alice
            const _0x17c_name = await _67lang.maybe_await((_0x17d_alice.name))
            let _0x8c__0x8b_pipeline_result = _0x17c_name
            const _0x17b_print = await _67lang.maybe_await(console.log(_0x8c__0x8b_pipeline_result))
            let _0x8d__0x8a_pipeline_result = _0x17b_print
            _0x8d__0x8a_pipeline_result

            const _0x17f_name = _0x2e_name
            let _0x90__0x8f_pipeline_result = _0x17f_name
            const _0x17e_print = await _67lang.maybe_await(console.log(_0x90__0x8f_pipeline_result))
            let _0x91__0x8e_pipeline_result = _0x17e_print
            _0x91__0x8e_pipeline_result


            let _0x92__1 = 1
            _0x92__1
            const _0x180__1 = _0x92__1
            let _0x93__q_ = _0x180__1
            _0x93__q_
            const _0x182__q_ = _0x93__q_
            const _0x183__q_ = _0x93__q_
            let _0x96__0x95_pipeline_result = _0x183__q_
            const _0x181_add = (_0x182__q_ + _0x96__0x95_pipeline_result + 1)
            let _0x97__0x94_pipeline_result = _0x181_add
            _0x97__0x94_pipeline_result
            const _0x185__0x94_pipeline_result = _0x97__0x94_pipeline_result
            const _0x184_print = await _67lang.maybe_await(console.log(_0x185__0x94_pipeline_result))
            let _0x99__0x98_pipeline_result = _0x184_print
            _0x99__0x98_pipeline_result

            const _0x186__1 = _0x92__1
            let _0x9a__q_ = _0x186__1
            _0x9a__q_
            const _0x188__q_ = _0x9a__q_
            let _0x9d__0x9c_pipeline_result = _0x188__q_
            const _0x187_add = (_0x9d__0x9c_pipeline_result + 1)
            let _0x9e__0x9b_pipeline_result = _0x187_add
            _0x9e__0x9b_pipeline_result
            const _0x18a__0x9b_pipeline_result = _0x9e__0x9b_pipeline_result
            const _0x189_print = await _67lang.maybe_await(console.log(_0x18a__0x9b_pipeline_result))
            let _0xa0__0x9f_pipeline_result = _0x189_print
            _0xa0__0x9f_pipeline_result

            const _0x18b__1 = _0x92__1
            let _0xa1__q_ = _0x18b__1
            _0xa1__q_
            const _0x18d__q_ = _0xa1__q_
            const _0x18c_add = (_0x18d__q_ + 1)
            let _0xa3__0xa2_pipeline_result = _0x18c_add
            _0xa3__0xa2_pipeline_result
            const _0x18f__0xa2_pipeline_result = _0xa3__0xa2_pipeline_result
            const _0x18e_print = await _67lang.maybe_await(console.log(_0x18f__0xa2_pipeline_result))
            let _0xa5__0xa4_pipeline_result = _0x18e_print
            _0xa5__0xa4_pipeline_result

            let _0xa6_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
            _0xa6_things_to_say
            let _0xa7_max_characters = 0
            _0xa7_max_characters
            let _0xa8_found_word = ""
            _0xa8_found_word
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xab__0xa9_for_thing__index = 0
                    _0xab__0xa9_for_thing__index
                    const _0x190_things_to_say = _0xa6_things_to_say
                    let _0xad__0xac_pipeline_result = _0x190_things_to_say
                    let _0xae__0xaa_for_thing__list = _0xad__0xac_pipeline_result
                    _0xae__0xaa_for_thing__list
                    while(true) {
                        const _0x192__0xa9_for_thing__index = _0xab__0xa9_for_thing__index
                        let _0xb1__0xb0_pipeline_result = _0x192__0xa9_for_thing__index
                        const _0x194__0xaa_for_thing__list = _0xae__0xaa_for_thing__list
                        const _0x193_length = (_0x194__0xaa_for_thing__list.length)
                        let _0xb3__0xb2_pipeline_result = _0x193_length
                        const _0x191_asc = (_0xb1__0xb0_pipeline_result < _0xb3__0xb2_pipeline_result)
                        let _0xb4__0xaf_pipeline_result = _0x191_asc
                        if (!_0xb4__0xaf_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x196__0xaa_for_thing__list = _0xae__0xaa_for_thing__list
                                const _0x197__0xa9_for_thing__index = _0xab__0xa9_for_thing__index
                                let _0xb7__0xb6_pipeline_result = _0x197__0xa9_for_thing__index
                                const _0x195__hash_ = _0x196__0xaa_for_thing__list[_0xb7__0xb6_pipeline_result]
                                let _0xb8__0xb5_pipeline_result = _0x195__hash_
                                let _0xb9_thing = _0xb8__0xb5_pipeline_result
                                _0xb9_thing
                                const _0x19a__0xa9_for_thing__index = _0xab__0xa9_for_thing__index
                                const _0x199_add = (_0x19a__0xa9_for_thing__index + 1)
                                let _0xbc__0xbb_pipeline_result = _0x199_add
                                const _0x198__0xa9_for_thing__index = (_0xab__0xa9_for_thing__index = _0xbc__0xbb_pipeline_result)
                                let _0xbd__0xba_pipeline_result = _0x198__0xa9_for_thing__index
                                _0xbd__0xba_pipeline_result
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        let _0xc0__0xbe_for_word__index = 0
                                        _0xc0__0xbe_for_word__index
                                        const _0x19c_thing = _0xb9_thing
                                        const _0x19b_split = String.prototype.split.call(_0x19c_thing, " ")
                                        let _0xc2__0xc1_pipeline_result = _0x19b_split
                                        let _0xc3__0xbf_for_word__list = _0xc2__0xc1_pipeline_result
                                        _0xc3__0xbf_for_word__list
                                        while(true) {
                                            const _0x19e__0xbe_for_word__index = _0xc0__0xbe_for_word__index
                                            let _0xc6__0xc5_pipeline_result = _0x19e__0xbe_for_word__index
                                            const _0x1a0__0xbf_for_word__list = _0xc3__0xbf_for_word__list
                                            const _0x19f_length = (_0x1a0__0xbf_for_word__list.length)
                                            let _0xc8__0xc7_pipeline_result = _0x19f_length
                                            const _0x19d_asc = (_0xc6__0xc5_pipeline_result < _0xc8__0xc7_pipeline_result)
                                            let _0xc9__0xc4_pipeline_result = _0x19d_asc
                                            if (!_0xc9__0xc4_pipeline_result) { break; }
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    const _0x1a2__0xbf_for_word__list = _0xc3__0xbf_for_word__list
                                                    const _0x1a3__0xbe_for_word__index = _0xc0__0xbe_for_word__index
                                                    let _0xcc__0xcb_pipeline_result = _0x1a3__0xbe_for_word__index
                                                    const _0x1a1__hash_ = _0x1a2__0xbf_for_word__list[_0xcc__0xcb_pipeline_result]
                                                    let _0xcd__0xca_pipeline_result = _0x1a1__hash_
                                                    let _0xce_word = _0xcd__0xca_pipeline_result
                                                    _0xce_word
                                                    const _0x1a6__0xbe_for_word__index = _0xc0__0xbe_for_word__index
                                                    const _0x1a5_add = (_0x1a6__0xbe_for_word__index + 1)
                                                    let _0xd1__0xd0_pipeline_result = _0x1a5_add
                                                    const _0x1a4__0xbe_for_word__index = (_0xc0__0xbe_for_word__index = _0xd1__0xd0_pipeline_result)
                                                    let _0xd2__0xcf_pipeline_result = _0x1a4__0xbe_for_word__index
                                                    _0xd2__0xcf_pipeline_result

                                                    const _0x1a7_word = _0xce_word
                                                    let _0xd4__0xd3_pipeline_result = _0x1a7_word
                                                    let _0xd5_word = _0xd4__0xd3_pipeline_result
                                                    _0xd5_word

                                                    const _0x1a9_word = _0xd5_word
                                                    const _0x1a8_length = (_0x1a9_word.length)
                                                    let _0xd7__0xd6_pipeline_result = _0x1a8_length
                                                    _0xd7__0xd6_pipeline_result
                                                    const _0x1ab__0xd6_pipeline_result = _0xd7__0xd6_pipeline_result
                                                    const _0x1ac_max_characters = _0xa7_max_characters
                                                    let _0xda__0xd9_pipeline_result = _0x1ac_max_characters
                                                    const _0x1aa_desc = (_0x1ab__0xd6_pipeline_result > _0xda__0xd9_pipeline_result)
                                                    let _0xdb__0xd8_pipeline_result = _0x1aa_desc
                                                    if (_0xdb__0xd8_pipeline_result)
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)

                                                            const _0x1ae__0xd6_pipeline_result = _0xd7__0xd6_pipeline_result
                                                            const _0x1ad_max_characters = (_0xa7_max_characters = _0x1ae__0xd6_pipeline_result)
                                                            let _0xdd__0xdc_pipeline_result = _0x1ad_max_characters
                                                            _0xdd__0xdc_pipeline_result

                                                            const _0x1b0_word = _0xd5_word
                                                            const _0x1af_found_word = (_0xa8_found_word = _0x1b0_word)
                                                            _0x1af_found_word

                                                            const _0x1b2_word = _0xd5_word
                                                            const _0x1b1_found_word = (_0xa8_found_word = _0x1b2_word)
                                                            let _0xdf__0xde_pipeline_result = _0x1b1_found_word
                                                            _0xdf__0xde_pipeline_result
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
            const _0x1b4_found_word = _0xa8_found_word
            let _0xe2__0xe1_pipeline_result = _0x1b4_found_word
            const _0x1b3_print = await _67lang.maybe_await(console.log(_0xe2__0xe1_pipeline_result))
            let _0xe3__0xe0_pipeline_result = _0x1b3_print
            _0xe3__0xe0_pipeline_result




            const _0x1b6_things_to_say = _0xa6_things_to_say
            const _0x1b5__hash_ = _0x1b6_things_to_say[0]
            let _0xe5__0xe4_pipeline_result = _0x1b5__hash_
            _0xe5__0xe4_pipeline_result
            const _0x1b8__0xe4_pipeline_result = _0xe5__0xe4_pipeline_result
            const _0x1b7_split = String.prototype.split.call(_0x1b8__0xe4_pipeline_result, " ")
            let _0xe7__0xe6_pipeline_result = _0x1b7_split
            _0xe7__0xe6_pipeline_result
            const _0x1bc__0xe6_pipeline_result = _0xe7__0xe6_pipeline_result
            const _0x1bb_sort = Array.prototype.sort.call(_0x1bc__0xe6_pipeline_result)
            const _0x1ba_join = Array.prototype.join.call(_0x1bb_sort)
            const _0x1b9_print = await _67lang.maybe_await(console.log(_0x1ba_join, " - what words!"))
            let _0xe9__0xe8_pipeline_result = _0x1b9_print
            _0xe9__0xe8_pipeline_result


            const _0x1bd_create_counter = await _67lang.maybe_await(_0xea_create_counter())
            let _0xfa__0xf9_pipeline_result = _0x1bd_create_counter
            let _0xfb_counter = _0xfa__0xf9_pipeline_result
            _0xfb_counter
            const _0x1be_print = await _67lang.maybe_await(console.log("wow, counting!"))
            let _0xfd__0xfc_pipeline_result = _0x1be_print
            _0xfd__0xfc_pipeline_result
            const _0x1c2_counter = _0xfb_counter
            const _0x1c1__tilde_ = await _67lang.maybe_await(_0x1c2_counter())
            let _0x101__0x100_pipeline_result = _0x1c1__tilde_
            const _0x1c0_toString = Number.prototype.toString.call(_0x101__0x100_pipeline_result)
            let _0x102__0xff_pipeline_result = _0x1c0_toString
            const _0x1c5_counter = _0xfb_counter
            const _0x1c4__tilde_ = await _67lang.maybe_await(_0x1c5_counter())
            let _0x105__0x104_pipeline_result = _0x1c4__tilde_
            const _0x1c3_toString = Number.prototype.toString.call(_0x105__0x104_pipeline_result)
            let _0x106__0x103_pipeline_result = _0x1c3_toString
            const _0x1c8_counter = _0xfb_counter
            const _0x1c7__tilde_ = await _67lang.maybe_await(_0x1c8_counter())
            let _0x109__0x108_pipeline_result = _0x1c7__tilde_
            const _0x1c6_toString = Number.prototype.toString.call(_0x109__0x108_pipeline_result)
            let _0x10a__0x107_pipeline_result = _0x1c6_toString
            const _0x1cb_counter = _0xfb_counter
            const _0x1ca__tilde_ = await _67lang.maybe_await(_0x1cb_counter())
            let _0x10d__0x10c_pipeline_result = _0x1ca__tilde_
            const _0x1c9_toString = Number.prototype.toString.call(_0x10d__0x10c_pipeline_result)
            let _0x10e__0x10b_pipeline_result = _0x1c9_toString
            const _0x1ce_counter = _0xfb_counter
            const _0x1cd__tilde_ = await _67lang.maybe_await(_0x1ce_counter())
            let _0x111__0x110_pipeline_result = _0x1cd__tilde_
            const _0x1cc_toString = Number.prototype.toString.call(_0x111__0x110_pipeline_result)
            let _0x112__0x10f_pipeline_result = _0x1cc_toString
            const _0x1d1_counter = _0xfb_counter
            const _0x1d0__tilde_ = await _67lang.maybe_await(_0x1d1_counter())
            let _0x115__0x114_pipeline_result = _0x1d0__tilde_
            const _0x1cf_toString = Number.prototype.toString.call(_0x115__0x114_pipeline_result)
            let _0x116__0x113_pipeline_result = _0x1cf_toString
            const _0x1bf_print = await _67lang.maybe_await(console.log(_0x102__0xff_pipeline_result, _0x106__0x103_pipeline_result, _0x10a__0x107_pipeline_result, _0x10e__0x10b_pipeline_result, _0x112__0x10f_pipeline_result, _0x116__0x113_pipeline_result))
            let _0x117__0xfe_pipeline_result = _0x1bf_print
            _0x117__0xfe_pipeline_result


            let _0x122_politely_agree = ((arg0, arg1) => _0x118_bool_printer(arg0, "i would indeed like to agree.", arg1))
            _0x122_politely_agree
            const _0x1d3_politely_agree = _0x122_politely_agree
            const _0x1d2__tilde_ = await _67lang.maybe_await(_0x1d3_politely_agree(true, "what?! utter BULLSHIT!"))
            let _0x124__0x123_pipeline_result = _0x1d2__tilde_
            _0x124__0x123_pipeline_result
            const _0x1d5_politely_agree = _0x122_politely_agree
            const _0x1d4__tilde_ = await _67lang.maybe_await(_0x1d5_politely_agree(false, "what?! utter BULLSHIT!"))
            let _0x126__0x125_pipeline_result = _0x1d4__tilde_
            _0x126__0x125_pipeline_result


        }
    } 
})();
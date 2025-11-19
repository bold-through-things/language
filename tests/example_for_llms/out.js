
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
    }
}

if (typeof window === "undefined") {
    // Deno environment

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

    _67lang.is_tty = () => Deno.isatty(Deno.stdin.rid);
}



function _0xf9_create_counter_store(count) {
    this.count = count;
}


function _0xfa_Person(name, age) {
    this.name = name;
    this.age = age;
}


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0xea_bool_printer = async function (
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
                let _0xeb_if_false = if_false
                _0xeb_if_false
                let _0xec_if_true = if_true
                _0xec_if_true
                let _0xed_value = value
                _0xed_value
                const _0xff_value = await _0xed_value
                let _0xef__0xee_pipeline_result = _0xff_value
                if (_0xef__0xee_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x101_if_true = await _0xec_if_true
                        const _0x100_print = await console.log(_0x101_if_true)
                        let _0xf1__0xf0_pipeline_result = _0x100_print
                        _0xf1__0xf0_pipeline_result
                    }
                } 
                else {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x103_if_false = await _0xeb_if_false
                        const _0x102_print = await console.log(_0x103_if_false)
                        let _0xf3__0xf2_pipeline_result = _0x102_print
                        _0xf3__0xf2_pipeline_result
                    }
                } 
            }
        } }
    const _0xc0_create_counter_colon__colon_count = async function (
        _
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                _ = _
                let _0xc1__ = _
                _0xc1__
                const _0x106__ = await _0xc1__
                const _0x105_count = await (_0x106__.count)
                let _0xc3__0xc2_pipeline_result = _0x105_count
                const _0x104_add = await (_0xc3__0xc2_pipeline_result + 1)
                let _0xc4_new = _0x104_add
                _0xc4_new
                const _0x108__ = await _0xc1__
                const _0x109_new = await _0xc4_new
                let _0xc7__0xc6_pipeline_result = _0x109_new
                const _0x107_count = await (_0x108__.count = (_0xc7__0xc6_pipeline_result))
                let _0xc8__0xc5_pipeline_result = _0x107_count
                return _0xc8__0xc5_pipeline_result;
            }
        } }
    const _0xbc_create_counter = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)


                const _0x10a_create_counter_store = await (new _0xf9_create_counter_store(0))
                let _0xbe__0xbd_pipeline_result = _0x10a_create_counter_store
                let _0xbf__ = _0xbe__0xbd_pipeline_result
                _0xbf__
                const _0x10b__ = await _0xbf__
                let _0xca__0xc9_pipeline_result = _0x10b__
                return (() => _0xc0_create_counter_colon__colon_count(_0xca__0xc9_pipeline_result));
            }
        } }
    const _0x15_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                let _0x16_person = person
                _0x16_person
                const _0x10d_person = await _0x16_person
                let _0x19__0x18_pipeline_result = _0x10d_person
                const _0x10c_concat = await String.prototype.concat.call("Hello, ", _0x19__0x18_pipeline_result)
                let _0x1a__0x17_pipeline_result = _0x10c_concat
                return _0x1a__0x17_pipeline_result;
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


            let _0x0_name = "Alice"
            _0x0_name
            let _0x1_age = 25
            _0x1_age

            let _0x2_is_active = true
            _0x2_is_active
            const _0x10f_name = await _0x0_name
            let _0x5__0x4_pipeline_result = _0x10f_name
            const _0x110_age = await _0x1_age
            let _0x7__0x6_pipeline_result = _0x110_age
            const _0x111_is_active = await _0x2_is_active
            let _0x9__0x8_pipeline_result = _0x111_is_active
            const _0x10e_print = await console.log(_0x5__0x4_pipeline_result, _0x7__0x6_pipeline_result, _0x9__0x8_pipeline_result)
            let _0xa__0x3_pipeline_result = _0x10e_print
            _0xa__0x3_pipeline_result


            const _0x112_name = await (_0x0_name = "Aris")
            let _0xc__0xb_pipeline_result = _0x112_name
            _0xc__0xb_pipeline_result
            const _0x114_name = await _0x0_name
            let _0xf__0xe_pipeline_result = _0x114_name
            const _0x113_print = await console.log(_0xf__0xe_pipeline_result)
            let _0x10__0xd_pipeline_result = _0x113_print
            _0x10__0xd_pipeline_result


            const _0x116_name = await _0x0_name
            let _0x13__0x12_pipeline_result = _0x116_name
            const _0x115_print = await console.log(_0x13__0x12_pipeline_result)
            let _0x14__0x11_pipeline_result = _0x115_print
            _0x14__0x11_pipeline_result

            const _0x118_greet = await _0x15_greet("Alice")
            let _0x1d__0x1c_pipeline_result = _0x118_greet
            const _0x117_print = await console.log(_0x1d__0x1c_pipeline_result)
            let _0x1e__0x1b_pipeline_result = _0x117_print
            _0x1e__0x1b_pipeline_result

            let _0x1f_numbers = [1, 2, 3, 4, 5]
            _0x1f_numbers
            const _0x11a_numbers = await _0x1f_numbers
            const _0x119_push = await Array.prototype.push.call(_0x11a_numbers, 6)
            let _0x21__0x20_pipeline_result = _0x119_push
            _0x21__0x20_pipeline_result
            const _0x11d_numbers = await _0x1f_numbers
            const _0x11c__hash_ = await _0x11d_numbers[0]
            let _0x24__0x23_pipeline_result = _0x11c__hash_
            const _0x11b_print = await console.log(_0x24__0x23_pipeline_result)
            let _0x25__0x22_pipeline_result = _0x11b_print
            _0x25__0x22_pipeline_result
            const _0x120_numbers = await _0x1f_numbers
            const _0x123_numbers = await _0x1f_numbers
            const _0x122_length = await (_0x123_numbers.length)
            let _0x2a__0x29_pipeline_result = _0x122_length
            const _0x121_sub = await (_0x2a__0x29_pipeline_result - 1)
            let _0x2b__0x28_pipeline_result = _0x121_sub
            const _0x11f__hash_ = await _0x120_numbers[_0x2b__0x28_pipeline_result]
            let _0x2c__0x27_pipeline_result = _0x11f__hash_
            const _0x11e_print = await console.log(_0x2c__0x27_pipeline_result)
            let _0x2d__0x26_pipeline_result = _0x11e_print
            _0x2d__0x26_pipeline_result



            const _0x125_age = await _0x1_age
            let _0x30__0x2f_pipeline_result = _0x125_age
            const _0x124_nondesc = await (18 <= _0x30__0x2f_pipeline_result)
            let _0x31__0x2e_pipeline_result = _0x124_nondesc
            if (_0x31__0x2e_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x126_print = await console.log("Adult")
                    let _0x33__0x32_pipeline_result = _0x126_print
                    _0x33__0x32_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x127_print = await console.log("Minor")
                    let _0x35__0x34_pipeline_result = _0x127_print
                    _0x35__0x34_pipeline_result
                }
            } 

            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x38__0x36_for_number__index = 0
                    _0x38__0x36_for_number__index
                    const _0x128_numbers = await _0x1f_numbers
                    let _0x3a__0x39_pipeline_result = _0x128_numbers
                    let _0x3b__0x37_for_number__list = _0x3a__0x39_pipeline_result
                    _0x3b__0x37_for_number__list
                    while(true) {
                        const _0x12a__0x36_for_number__index = await _0x38__0x36_for_number__index
                        let _0x3e__0x3d_pipeline_result = _0x12a__0x36_for_number__index
                        const _0x12c__0x37_for_number__list = await _0x3b__0x37_for_number__list
                        const _0x12b_length = await (_0x12c__0x37_for_number__list.length)
                        let _0x40__0x3f_pipeline_result = _0x12b_length
                        const _0x129_asc = await (_0x3e__0x3d_pipeline_result < _0x40__0x3f_pipeline_result)
                        let _0x41__0x3c_pipeline_result = _0x129_asc
                        if (!_0x41__0x3c_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x12e__0x37_for_number__list = await _0x3b__0x37_for_number__list
                                const _0x12f__0x36_for_number__index = await _0x38__0x36_for_number__index
                                let _0x44__0x43_pipeline_result = _0x12f__0x36_for_number__index
                                const _0x12d__hash_ = await _0x12e__0x37_for_number__list[_0x44__0x43_pipeline_result]
                                let _0x45__0x42_pipeline_result = _0x12d__hash_
                                let _0x46_number = _0x45__0x42_pipeline_result
                                _0x46_number
                                const _0x132__0x36_for_number__index = await _0x38__0x36_for_number__index
                                const _0x131_add = await (_0x132__0x36_for_number__index + 1)
                                let _0x49__0x48_pipeline_result = _0x131_add
                                const _0x130__0x36_for_number__index = await (_0x38__0x36_for_number__index = _0x49__0x48_pipeline_result)
                                let _0x4a__0x47_pipeline_result = _0x130__0x36_for_number__index
                                _0x4a__0x47_pipeline_result
                                const _0x134_number = await _0x46_number
                                let _0x4d__0x4c_pipeline_result = _0x134_number
                                const _0x133_print = await console.log(_0x4d__0x4c_pipeline_result)
                                let _0x4e__0x4b_pipeline_result = _0x133_print
                                _0x4e__0x4b_pipeline_result
                            }
                        } }
                }
            } 

            const _0x135_Person = await (new _0xfa_Person("Alice", 30))
            let _0x50__0x4f_pipeline_result = _0x135_Person
            let _0x51_alice = _0x50__0x4f_pipeline_result
            _0x51_alice
            const _0x138_alice = await _0x51_alice
            const _0x137_name = await (_0x138_alice.name)
            let _0x54__0x53_pipeline_result = _0x137_name
            const _0x136_print = await console.log(_0x54__0x53_pipeline_result)
            let _0x55__0x52_pipeline_result = _0x136_print
            _0x55__0x52_pipeline_result
            const _0x13b_alice = await _0x51_alice
            const _0x13a_age = await (_0x13b_alice.age)
            let _0x58__0x57_pipeline_result = _0x13a_age
            const _0x139_print = await console.log(_0x58__0x57_pipeline_result)
            let _0x59__0x56_pipeline_result = _0x139_print
            _0x59__0x56_pipeline_result
            const _0x13d_alice = await _0x51_alice
            const _0x13c_name = await (_0x13d_alice.name = ("Alicia"))
            let _0x5b__0x5a_pipeline_result = _0x13c_name
            _0x5b__0x5a_pipeline_result
            const _0x140_alice = await _0x51_alice
            const _0x13f_name = await (_0x140_alice.name)
            let _0x5e__0x5d_pipeline_result = _0x13f_name
            const _0x13e_print = await console.log(_0x5e__0x5d_pipeline_result)
            let _0x5f__0x5c_pipeline_result = _0x13e_print
            _0x5f__0x5c_pipeline_result

            const _0x142_name = await _0x0_name
            let _0x62__0x61_pipeline_result = _0x142_name
            const _0x141_print = await console.log(_0x62__0x61_pipeline_result)
            let _0x63__0x60_pipeline_result = _0x141_print
            _0x63__0x60_pipeline_result


            let _0x64__1 = 1
            _0x64__1
            const _0x143__1 = await _0x64__1
            let _0x65__q_ = _0x143__1
            _0x65__q_
            const _0x145__q_ = await _0x65__q_
            const _0x146__q_ = await _0x65__q_
            let _0x68__0x67_pipeline_result = _0x146__q_
            const _0x144_add = await (_0x145__q_ + _0x68__0x67_pipeline_result + 1)
            let _0x69__0x66_pipeline_result = _0x144_add
            _0x69__0x66_pipeline_result
            const _0x148__0x66_pipeline_result = await _0x69__0x66_pipeline_result
            const _0x147_print = await console.log(_0x148__0x66_pipeline_result)
            let _0x6b__0x6a_pipeline_result = _0x147_print
            _0x6b__0x6a_pipeline_result

            const _0x149__1 = await _0x64__1
            let _0x6c__q_ = _0x149__1
            _0x6c__q_
            const _0x14b__q_ = await _0x6c__q_
            let _0x6f__0x6e_pipeline_result = _0x14b__q_
            const _0x14a_add = await (_0x6f__0x6e_pipeline_result + 1)
            let _0x70__0x6d_pipeline_result = _0x14a_add
            _0x70__0x6d_pipeline_result
            const _0x14d__0x6d_pipeline_result = await _0x70__0x6d_pipeline_result
            const _0x14c_print = await console.log(_0x14d__0x6d_pipeline_result)
            let _0x72__0x71_pipeline_result = _0x14c_print
            _0x72__0x71_pipeline_result

            const _0x14e__1 = await _0x64__1
            let _0x73__q_ = _0x14e__1
            _0x73__q_
            const _0x150__q_ = await _0x73__q_
            const _0x14f_add = await (_0x150__q_ + 1)
            let _0x75__0x74_pipeline_result = _0x14f_add
            _0x75__0x74_pipeline_result
            const _0x152__0x74_pipeline_result = await _0x75__0x74_pipeline_result
            const _0x151_print = await console.log(_0x152__0x74_pipeline_result)
            let _0x77__0x76_pipeline_result = _0x151_print
            _0x77__0x76_pipeline_result

            let _0x78_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
            _0x78_things_to_say
            let _0x79_max_characters = 0
            _0x79_max_characters
            let _0x7a_found_word = ""
            _0x7a_found_word
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x7d__0x7b_for_thing__index = 0
                    _0x7d__0x7b_for_thing__index
                    const _0x153_things_to_say = await _0x78_things_to_say
                    let _0x7f__0x7e_pipeline_result = _0x153_things_to_say
                    let _0x80__0x7c_for_thing__list = _0x7f__0x7e_pipeline_result
                    _0x80__0x7c_for_thing__list
                    while(true) {
                        const _0x155__0x7b_for_thing__index = await _0x7d__0x7b_for_thing__index
                        let _0x83__0x82_pipeline_result = _0x155__0x7b_for_thing__index
                        const _0x157__0x7c_for_thing__list = await _0x80__0x7c_for_thing__list
                        const _0x156_length = await (_0x157__0x7c_for_thing__list.length)
                        let _0x85__0x84_pipeline_result = _0x156_length
                        const _0x154_asc = await (_0x83__0x82_pipeline_result < _0x85__0x84_pipeline_result)
                        let _0x86__0x81_pipeline_result = _0x154_asc
                        if (!_0x86__0x81_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x159__0x7c_for_thing__list = await _0x80__0x7c_for_thing__list
                                const _0x15a__0x7b_for_thing__index = await _0x7d__0x7b_for_thing__index
                                let _0x89__0x88_pipeline_result = _0x15a__0x7b_for_thing__index
                                const _0x158__hash_ = await _0x159__0x7c_for_thing__list[_0x89__0x88_pipeline_result]
                                let _0x8a__0x87_pipeline_result = _0x158__hash_
                                let _0x8b_thing = _0x8a__0x87_pipeline_result
                                _0x8b_thing
                                const _0x15d__0x7b_for_thing__index = await _0x7d__0x7b_for_thing__index
                                const _0x15c_add = await (_0x15d__0x7b_for_thing__index + 1)
                                let _0x8e__0x8d_pipeline_result = _0x15c_add
                                const _0x15b__0x7b_for_thing__index = await (_0x7d__0x7b_for_thing__index = _0x8e__0x8d_pipeline_result)
                                let _0x8f__0x8c_pipeline_result = _0x15b__0x7b_for_thing__index
                                _0x8f__0x8c_pipeline_result
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        let _0x92__0x90_for_word__index = 0
                                        _0x92__0x90_for_word__index
                                        const _0x15f_thing = await _0x8b_thing
                                        const _0x15e_split = await String.prototype.split.call(_0x15f_thing, " ")
                                        let _0x94__0x93_pipeline_result = _0x15e_split
                                        let _0x95__0x91_for_word__list = _0x94__0x93_pipeline_result
                                        _0x95__0x91_for_word__list
                                        while(true) {
                                            const _0x161__0x90_for_word__index = await _0x92__0x90_for_word__index
                                            let _0x98__0x97_pipeline_result = _0x161__0x90_for_word__index
                                            const _0x163__0x91_for_word__list = await _0x95__0x91_for_word__list
                                            const _0x162_length = await (_0x163__0x91_for_word__list.length)
                                            let _0x9a__0x99_pipeline_result = _0x162_length
                                            const _0x160_asc = await (_0x98__0x97_pipeline_result < _0x9a__0x99_pipeline_result)
                                            let _0x9b__0x96_pipeline_result = _0x160_asc
                                            if (!_0x9b__0x96_pipeline_result) { break; }
                                            {
                                                const parent_scope = scope
                                                {
                                                    const scope = _67lang.scope(parent_scope)
                                                    const _0x165__0x91_for_word__list = await _0x95__0x91_for_word__list
                                                    const _0x166__0x90_for_word__index = await _0x92__0x90_for_word__index
                                                    let _0x9e__0x9d_pipeline_result = _0x166__0x90_for_word__index
                                                    const _0x164__hash_ = await _0x165__0x91_for_word__list[_0x9e__0x9d_pipeline_result]
                                                    let _0x9f__0x9c_pipeline_result = _0x164__hash_
                                                    let _0xa0_word = _0x9f__0x9c_pipeline_result
                                                    _0xa0_word
                                                    const _0x169__0x90_for_word__index = await _0x92__0x90_for_word__index
                                                    const _0x168_add = await (_0x169__0x90_for_word__index + 1)
                                                    let _0xa3__0xa2_pipeline_result = _0x168_add
                                                    const _0x167__0x90_for_word__index = await (_0x92__0x90_for_word__index = _0xa3__0xa2_pipeline_result)
                                                    let _0xa4__0xa1_pipeline_result = _0x167__0x90_for_word__index
                                                    _0xa4__0xa1_pipeline_result

                                                    const _0x16a_word = await _0xa0_word
                                                    let _0xa6__0xa5_pipeline_result = _0x16a_word
                                                    let _0xa7_word = _0xa6__0xa5_pipeline_result
                                                    _0xa7_word

                                                    const _0x16c_word = await _0xa7_word
                                                    const _0x16b_length = await (_0x16c_word.length)
                                                    let _0xa9__0xa8_pipeline_result = _0x16b_length
                                                    _0xa9__0xa8_pipeline_result
                                                    const _0x16e__0xa8_pipeline_result = await _0xa9__0xa8_pipeline_result
                                                    const _0x16f_max_characters = await _0x79_max_characters
                                                    let _0xac__0xab_pipeline_result = _0x16f_max_characters
                                                    const _0x16d_desc = await (_0x16e__0xa8_pipeline_result > _0xac__0xab_pipeline_result)
                                                    let _0xad__0xaa_pipeline_result = _0x16d_desc
                                                    if (_0xad__0xaa_pipeline_result)
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)

                                                            const _0x171__0xa8_pipeline_result = await _0xa9__0xa8_pipeline_result
                                                            const _0x170_max_characters = await (_0x79_max_characters = _0x171__0xa8_pipeline_result)
                                                            let _0xaf__0xae_pipeline_result = _0x170_max_characters
                                                            _0xaf__0xae_pipeline_result

                                                            const _0x173_word = await _0xa7_word
                                                            const _0x172_found_word = await (_0x7a_found_word = _0x173_word)
                                                            _0x172_found_word

                                                            const _0x175_word = await _0xa7_word
                                                            const _0x174_found_word = await (_0x7a_found_word = _0x175_word)
                                                            let _0xb1__0xb0_pipeline_result = _0x174_found_word
                                                            _0xb1__0xb0_pipeline_result
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
            const _0x177_found_word = await _0x7a_found_word
            let _0xb4__0xb3_pipeline_result = _0x177_found_word
            const _0x176_print = await console.log(_0xb4__0xb3_pipeline_result)
            let _0xb5__0xb2_pipeline_result = _0x176_print
            _0xb5__0xb2_pipeline_result




            const _0x179_things_to_say = await _0x78_things_to_say
            const _0x178__hash_ = await _0x179_things_to_say[0]
            let _0xb7__0xb6_pipeline_result = _0x178__hash_
            _0xb7__0xb6_pipeline_result
            const _0x17b__0xb6_pipeline_result = await _0xb7__0xb6_pipeline_result
            const _0x17a_split = await String.prototype.split.call(_0x17b__0xb6_pipeline_result, " ")
            let _0xb9__0xb8_pipeline_result = _0x17a_split
            _0xb9__0xb8_pipeline_result
            const _0x17f__0xb8_pipeline_result = await _0xb9__0xb8_pipeline_result
            const _0x17e_sort = await Array.prototype.sort.call(_0x17f__0xb8_pipeline_result)
            const _0x17d_join = await Array.prototype.join.call(_0x17e_sort)
            const _0x17c_print = await console.log(_0x17d_join, " - what words!")
            let _0xbb__0xba_pipeline_result = _0x17c_print
            _0xbb__0xba_pipeline_result


            const _0x180_create_counter = await _0xbc_create_counter()
            let _0xcc__0xcb_pipeline_result = _0x180_create_counter
            let _0xcd_counter = _0xcc__0xcb_pipeline_result
            _0xcd_counter
            const _0x181_print = await console.log("wow, counting!")
            let _0xcf__0xce_pipeline_result = _0x181_print
            _0xcf__0xce_pipeline_result
            const _0x185_counter = await _0xcd_counter
            const _0x184__tilde_ = await _0x185_counter()
            let _0xd3__0xd2_pipeline_result = _0x184__tilde_
            const _0x183_toString = await Number.prototype.toString.call(_0xd3__0xd2_pipeline_result)
            let _0xd4__0xd1_pipeline_result = _0x183_toString
            const _0x188_counter = await _0xcd_counter
            const _0x187__tilde_ = await _0x188_counter()
            let _0xd7__0xd6_pipeline_result = _0x187__tilde_
            const _0x186_toString = await Number.prototype.toString.call(_0xd7__0xd6_pipeline_result)
            let _0xd8__0xd5_pipeline_result = _0x186_toString
            const _0x18b_counter = await _0xcd_counter
            const _0x18a__tilde_ = await _0x18b_counter()
            let _0xdb__0xda_pipeline_result = _0x18a__tilde_
            const _0x189_toString = await Number.prototype.toString.call(_0xdb__0xda_pipeline_result)
            let _0xdc__0xd9_pipeline_result = _0x189_toString
            const _0x18e_counter = await _0xcd_counter
            const _0x18d__tilde_ = await _0x18e_counter()
            let _0xdf__0xde_pipeline_result = _0x18d__tilde_
            const _0x18c_toString = await Number.prototype.toString.call(_0xdf__0xde_pipeline_result)
            let _0xe0__0xdd_pipeline_result = _0x18c_toString
            const _0x191_counter = await _0xcd_counter
            const _0x190__tilde_ = await _0x191_counter()
            let _0xe3__0xe2_pipeline_result = _0x190__tilde_
            const _0x18f_toString = await Number.prototype.toString.call(_0xe3__0xe2_pipeline_result)
            let _0xe4__0xe1_pipeline_result = _0x18f_toString
            const _0x194_counter = await _0xcd_counter
            const _0x193__tilde_ = await _0x194_counter()
            let _0xe7__0xe6_pipeline_result = _0x193__tilde_
            const _0x192_toString = await Number.prototype.toString.call(_0xe7__0xe6_pipeline_result)
            let _0xe8__0xe5_pipeline_result = _0x192_toString
            const _0x182_print = await console.log(_0xd4__0xd1_pipeline_result, _0xd8__0xd5_pipeline_result, _0xdc__0xd9_pipeline_result, _0xe0__0xdd_pipeline_result, _0xe4__0xe1_pipeline_result, _0xe8__0xe5_pipeline_result)
            let _0xe9__0xd0_pipeline_result = _0x182_print
            _0xe9__0xd0_pipeline_result


            let _0xf4_politely_agree = ((arg0, arg1) => _0xea_bool_printer(arg0, "i would indeed like to agree.", arg1))
            _0xf4_politely_agree
            const _0x196_politely_agree = await _0xf4_politely_agree
            const _0x195__tilde_ = await _0x196_politely_agree(true, "what?! utter BULLSHIT!")
            let _0xf6__0xf5_pipeline_result = _0x195__tilde_
            _0xf6__0xf5_pipeline_result
            const _0x198_politely_agree = await _0xf4_politely_agree
            const _0x197__tilde_ = await _0x198_politely_agree(false, "what?! utter BULLSHIT!")
            let _0xf8__0xf7_pipeline_result = _0x197__tilde_
            _0xf8__0xf7_pipeline_result


        }
    } 
})();
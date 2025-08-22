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


void (async () => {
    'use strict';
    const scope = globalThis;
    const _0xba_bool_printer = async function (
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
                const _0xc6_value = await value
                let _0xbc__0xbb_pipeline_result = _0xc6_value
                if (_0xbc__0xbb_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xc8_if_true = await if_true
                        const _0xc7_print = await console.log(_0xc8_if_true)
                        let _0xbe__0xbd_pipeline_result = _0xc7_print
                        _0xbe__0xbd_pipeline_result
                    }
                } 
                else {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xca_if_false = await if_false
                        const _0xc9_print = await console.log(_0xca_if_false)
                        let _0xc0__0xbf_pipeline_result = _0xc9_print
                        _0xc0__0xbf_pipeline_result
                    }
                } 
            }
        } }
    const _0x9f_create_counter_colon__colon_count = async function (
        _
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                _ = _
                const _0xcd__ = await _
                const _0xcc_count = await (_0xcd__.count)
                let _0xa1__0xa0_pipeline_result = _0xcc_count
                const _0xcb_add = await (_0xa1__0xa0_pipeline_result + 1)
                let _0xa2_new = _0xcb_add
                _0xa2_new
                const _0xcf__ = await _
                const _0xd0_new = await _0xa2_new
                let _0xa5__0xa4_pipeline_result = _0xd0_new
                const _0xce_count = await (_0xcf__.count = (_0xa5__0xa4_pipeline_result))
                let _0xa6__0xa3_pipeline_result = _0xce_count
                return _0xa6__0xa3_pipeline_result;
            }
        } }
    function create_counter_store(count) {
        this.count = count;
    }
    const _0x9b_create_counter = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)


                const _0xd1_create_counter_store = await (new create_counter_store(0))
                let _0x9d__0x9c_pipeline_result = _0xd1_create_counter_store
                let _0x9e__ = _0x9d__0x9c_pipeline_result
                _0x9e__
                const _0xd2__ = await _0x9e__
                let _0xa8__0xa7_pipeline_result = _0xd2__
                return (() => _0x9f_create_counter_colon__colon_count(_0xa8__0xa7_pipeline_result));
            }
        } }
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    const _0x15_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                const _0xd4_person = await person
                let _0x18__0x17_pipeline_result = _0xd4_person
                const _0xd3_concat = await String.prototype.concat.call("Hello, ", _0x18__0x17_pipeline_result)
                let _0x19__0x16_pipeline_result = _0xd3_concat
                return _0x19__0x16_pipeline_result;
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
            const _0xd6_name = await _0x0_name
            let _0x5__0x4_pipeline_result = _0xd6_name
            const _0xd7_age = await _0x1_age
            let _0x7__0x6_pipeline_result = _0xd7_age
            const _0xd8_is_active = await _0x2_is_active
            let _0x9__0x8_pipeline_result = _0xd8_is_active
            const _0xd5_print = await console.log(_0x5__0x4_pipeline_result, _0x7__0x6_pipeline_result, _0x9__0x8_pipeline_result)
            let _0xa__0x3_pipeline_result = _0xd5_print
            _0xa__0x3_pipeline_result


            const _0xd9_name = await (_0x0_name = "Aris")
            let _0xc__0xb_pipeline_result = _0xd9_name
            _0xc__0xb_pipeline_result
            const _0xdb_name = await _0x0_name
            let _0xf__0xe_pipeline_result = _0xdb_name
            const _0xda_print = await console.log(_0xf__0xe_pipeline_result)
            let _0x10__0xd_pipeline_result = _0xda_print
            _0x10__0xd_pipeline_result


            const _0xdd_name = await _0x0_name
            let _0x13__0x12_pipeline_result = _0xdd_name
            const _0xdc_print = await console.log(_0x13__0x12_pipeline_result)
            let _0x14__0x11_pipeline_result = _0xdc_print
            _0x14__0x11_pipeline_result

            const _0xdf_greet = await _0x15_greet("Alice")
            let _0x1c__0x1b_pipeline_result = _0xdf_greet
            const _0xde_print = await console.log(_0x1c__0x1b_pipeline_result)
            let _0x1d__0x1a_pipeline_result = _0xde_print
            _0x1d__0x1a_pipeline_result

            let _0x1e_numbers = [1, 2, 3, 4, 5]
            _0x1e_numbers
            const _0xe1_numbers = await _0x1e_numbers
            const _0xe0_push = await Array.prototype.push.call(_0xe1_numbers, 6)
            let _0x20__0x1f_pipeline_result = _0xe0_push
            _0x20__0x1f_pipeline_result
            const _0xe4_numbers = await _0x1e_numbers
            const _0xe3__hash_ = await _0xe4_numbers[0]
            let _0x23__0x22_pipeline_result = _0xe3__hash_
            const _0xe2_print = await console.log(_0x23__0x22_pipeline_result)
            let _0x24__0x21_pipeline_result = _0xe2_print
            _0x24__0x21_pipeline_result
            const _0xe7_numbers = await _0x1e_numbers
            const _0xea_numbers = await _0x1e_numbers
            const _0xe9_length = await (_0xea_numbers.length)
            let _0x29__0x28_pipeline_result = _0xe9_length
            const _0xe8_sub = await (_0x29__0x28_pipeline_result - 1)
            let _0x2a__0x27_pipeline_result = _0xe8_sub
            const _0xe6__hash_ = await _0xe7_numbers[_0x2a__0x27_pipeline_result]
            let _0x2b__0x26_pipeline_result = _0xe6__hash_
            const _0xe5_print = await console.log(_0x2b__0x26_pipeline_result)
            let _0x2c__0x25_pipeline_result = _0xe5_print
            _0x2c__0x25_pipeline_result

            let _0x2d_user = {["employed"]: true, ["company"]: "67.8%", ["address"]: {["city"]: "New York"}}
            _0x2d_user
            const _0xec_user = await _0x2d_user
            const _0xeb__hash_ = await (_0xec_user["name"] = "Bob")
            let _0x2f__0x2e_pipeline_result = _0xeb__hash_
            _0x2f__0x2e_pipeline_result
            const _0xee_user = await _0x2d_user
            const _0xed__hash_ = await (_0xee_user["age"] = 30)
            let _0x31__0x30_pipeline_result = _0xed__hash_
            _0x31__0x30_pipeline_result
            const _0xf0_user = await _0x2d_user
            const _0xef__hash_ = await _0xf0_user["address"]
            let _0x33__0x32_pipeline_result = _0xef__hash_
            _0x33__0x32_pipeline_result
            const _0xf2__0x32_pipeline_result = await _0x33__0x32_pipeline_result
            const _0xf1__hash_ = await (_0xf2__0x32_pipeline_result["oblast"] = "Donetsk Oblast")
            let _0x35__0x34_pipeline_result = _0xf1__hash_
            _0x35__0x34_pipeline_result
            const _0xf4_user = await _0x2d_user
            let _0x38__0x37_pipeline_result = _0xf4_user
            const _0xf3_print = await console.log(_0x38__0x37_pipeline_result)
            let _0x39__0x36_pipeline_result = _0xf3_print
            _0x39__0x36_pipeline_result

            const _0xf6_age = await _0x1_age
            let _0x3c__0x3b_pipeline_result = _0xf6_age
            const _0xf5_nondesc = await (18 <= _0x3c__0x3b_pipeline_result)
            let _0x3d__0x3a_pipeline_result = _0xf5_nondesc
            if (_0x3d__0x3a_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf7_print = await console.log("Adult")
                    let _0x3f__0x3e_pipeline_result = _0xf7_print
                    _0x3f__0x3e_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xf8_print = await console.log("Minor")
                    let _0x41__0x40_pipeline_result = _0xf8_print
                    _0x41__0x40_pipeline_result
                }
            } 

            const _0xf9_numbers = await _0x1e_numbers
            let _0x43__0x42_pipeline_result = _0xf9_numbers

            const _0xfa_iter = _0x43__0x42_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xfa_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xfc_number = await number
                        let _0x46__0x45_pipeline_result = _0xfc_number
                        const _0xfb_print = await console.log(_0x46__0x45_pipeline_result)
                        let _0x47__0x44_pipeline_result = _0xfb_print
                        _0x47__0x44_pipeline_result
                    }
                } }

            const _0xfd_Person = await (new Person("Alice", 30))
            let _0x49__0x48_pipeline_result = _0xfd_Person
            let _0x4a_alice = _0x49__0x48_pipeline_result
            _0x4a_alice
            const _0x100_alice = await _0x4a_alice
            const _0xff_name = await (_0x100_alice.name)
            let _0x4d__0x4c_pipeline_result = _0xff_name
            const _0xfe_print = await console.log(_0x4d__0x4c_pipeline_result)
            let _0x4e__0x4b_pipeline_result = _0xfe_print
            _0x4e__0x4b_pipeline_result
            const _0x103_alice = await _0x4a_alice
            const _0x102_age = await (_0x103_alice.age)
            let _0x51__0x50_pipeline_result = _0x102_age
            const _0x101_print = await console.log(_0x51__0x50_pipeline_result)
            let _0x52__0x4f_pipeline_result = _0x101_print
            _0x52__0x4f_pipeline_result
            const _0x105_alice = await _0x4a_alice
            const _0x104_name = await (_0x105_alice.name = ("Alicia"))
            let _0x54__0x53_pipeline_result = _0x104_name
            _0x54__0x53_pipeline_result
            const _0x108_alice = await _0x4a_alice
            const _0x107_name = await (_0x108_alice.name)
            let _0x57__0x56_pipeline_result = _0x107_name
            const _0x106_print = await console.log(_0x57__0x56_pipeline_result)
            let _0x58__0x55_pipeline_result = _0x106_print
            _0x58__0x55_pipeline_result

            const _0x10a_name = await _0x0_name
            let _0x5b__0x5a_pipeline_result = _0x10a_name
            const _0x109_print = await console.log(_0x5b__0x5a_pipeline_result)
            let _0x5c__0x59_pipeline_result = _0x109_print
            _0x5c__0x59_pipeline_result


            let _0x5d__1 = 1
            _0x5d__1
            const _0x10b__1 = await _0x5d__1
            let _0x5e__q_ = _0x10b__1
            _0x5e__q_
            const _0x10d__q_ = await _0x5e__q_
            const _0x10e__q_ = await _0x5e__q_
            let _0x61__0x60_pipeline_result = _0x10e__q_
            const _0x10c_add = await (_0x10d__q_ + _0x61__0x60_pipeline_result + 1)
            let _0x62__0x5f_pipeline_result = _0x10c_add
            _0x62__0x5f_pipeline_result
            const _0x110__0x5f_pipeline_result = await _0x62__0x5f_pipeline_result
            const _0x10f_print = await console.log(_0x110__0x5f_pipeline_result)
            let _0x64__0x63_pipeline_result = _0x10f_print
            _0x64__0x63_pipeline_result

            const _0x111__1 = await _0x5d__1
            let _0x65__q_ = _0x111__1
            _0x65__q_
            const _0x113__q_ = await _0x65__q_
            let _0x68__0x67_pipeline_result = _0x113__q_
            const _0x112_add = await (_0x68__0x67_pipeline_result + 1)
            let _0x69__0x66_pipeline_result = _0x112_add
            _0x69__0x66_pipeline_result
            const _0x115__0x66_pipeline_result = await _0x69__0x66_pipeline_result
            const _0x114_print = await console.log(_0x115__0x66_pipeline_result)
            let _0x6b__0x6a_pipeline_result = _0x114_print
            _0x6b__0x6a_pipeline_result

            const _0x116__1 = await _0x5d__1
            let _0x6c__q_ = _0x116__1
            _0x6c__q_
            const _0x118__q_ = await _0x6c__q_
            const _0x117_add = await (_0x118__q_ + 1)
            let _0x6e__0x6d_pipeline_result = _0x117_add
            _0x6e__0x6d_pipeline_result
            const _0x11a__0x6d_pipeline_result = await _0x6e__0x6d_pipeline_result
            const _0x119_print = await console.log(_0x11a__0x6d_pipeline_result)
            let _0x70__0x6f_pipeline_result = _0x119_print
            _0x70__0x6f_pipeline_result

            let _0x71_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
            _0x71_things_to_say
            let _0x72_max_characters = 0
            _0x72_max_characters
            let _0x73_found_word = ""
            _0x73_found_word
            const _0x11b_things_to_say = await _0x71_things_to_say
            let _0x75__0x74_pipeline_result = _0x11b_things_to_say

            const _0x11c_iter = _0x75__0x74_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x11c_iter.next();
                if (done) { break; }
                let thing = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x11e_thing = await thing
                        const _0x11d_split = await String.prototype.split.call(_0x11e_thing, " ")
                        let _0x77__0x76_pipeline_result = _0x11d_split

                        const _0x11f_iter = _0x77__0x76_pipeline_result[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x11f_iter.next();
                            if (done) { break; }
                            let word = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)

                                    const _0x120_word = await word
                                    let _0x79__0x78_pipeline_result = _0x120_word
                                    let _0x7a_word = _0x79__0x78_pipeline_result
                                    _0x7a_word

                                    const _0x122_word = await _0x7a_word
                                    const _0x121_length = await (_0x122_word.length)
                                    let _0x7c__0x7b_pipeline_result = _0x121_length
                                    _0x7c__0x7b_pipeline_result
                                    const _0x124__0x7b_pipeline_result = await _0x7c__0x7b_pipeline_result
                                    const _0x125_max_characters = await _0x72_max_characters
                                    let _0x7f__0x7e_pipeline_result = _0x125_max_characters
                                    const _0x123_desc = await (_0x124__0x7b_pipeline_result > _0x7f__0x7e_pipeline_result)
                                    let _0x80__0x7d_pipeline_result = _0x123_desc
                                    if (_0x80__0x7d_pipeline_result)
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)

                                            const _0x127__0x7b_pipeline_result = await _0x7c__0x7b_pipeline_result
                                            const _0x126_max_characters = await (_0x72_max_characters = _0x127__0x7b_pipeline_result)
                                            let _0x82__0x81_pipeline_result = _0x126_max_characters
                                            _0x82__0x81_pipeline_result

                                            const _0x129_word = await _0x7a_word
                                            const _0x128_found_word = await (_0x73_found_word = _0x129_word)
                                            _0x128_found_word

                                            const _0x12b_word = await _0x7a_word
                                            const _0x12a_found_word = await (_0x73_found_word = _0x12b_word)
                                            let _0x84__0x83_pipeline_result = _0x12a_found_word
                                            _0x84__0x83_pipeline_result
                                        }
                                    } 
                                }
                            } }
                    }
                } }
            const _0x12d_found_word = await _0x73_found_word
            let _0x87__0x86_pipeline_result = _0x12d_found_word
            const _0x12c_print = await console.log(_0x87__0x86_pipeline_result)
            let _0x88__0x85_pipeline_result = _0x12c_print
            _0x88__0x85_pipeline_result

            const _0x130_user = await _0x2d_user
            const _0x12f__hash_ = await _0x130_user["address"]
            let _0x8b__0x8a_pipeline_result = _0x12f__hash_
            const _0x132__0x8a_pipeline_result = await _0x8b__0x8a_pipeline_result
            const _0x131__hash_ = await _0x132__0x8a_pipeline_result["city"]
            let _0x8d__0x8c_pipeline_result = _0x131__hash_
            const _0x12e_print = await console.log("Bob's city", _0x8b__0x8a_pipeline_result, _0x8d__0x8c_pipeline_result)
            let _0x8e__0x89_pipeline_result = _0x12e_print
            _0x8e__0x89_pipeline_result

            const _0x134_user = await _0x2d_user
            const _0x133__hash_ = await _0x134_user["address"]
            let _0x90__0x8f_pipeline_result = _0x133__hash_
            _0x90__0x8f_pipeline_result
            const _0x137__0x8f_pipeline_result = await _0x90__0x8f_pipeline_result
            const _0x136__hash_ = await _0x137__0x8f_pipeline_result["city"]
            let _0x93__0x92_pipeline_result = _0x136__hash_
            const _0x135_print = await console.log("Bob's city", _0x93__0x92_pipeline_result)
            let _0x94__0x91_pipeline_result = _0x135_print
            _0x94__0x91_pipeline_result

            const _0x139_things_to_say = await _0x71_things_to_say
            const _0x138__hash_ = await _0x139_things_to_say[0]
            let _0x96__0x95_pipeline_result = _0x138__hash_
            _0x96__0x95_pipeline_result
            const _0x13b__0x95_pipeline_result = await _0x96__0x95_pipeline_result
            const _0x13a_split = await String.prototype.split.call(_0x13b__0x95_pipeline_result, " ")
            let _0x98__0x97_pipeline_result = _0x13a_split
            _0x98__0x97_pipeline_result
            const _0x13f__0x97_pipeline_result = await _0x98__0x97_pipeline_result
            const _0x13e_sort = await Array.prototype.sort.call(_0x13f__0x97_pipeline_result)
            const _0x13d_join = await Array.prototype.join.call(_0x13e_sort)
            const _0x13c_print = await console.log(_0x13d_join, " - what words!")
            let _0x9a__0x99_pipeline_result = _0x13c_print
            _0x9a__0x99_pipeline_result


            const _0x140_create_counter = await _0x9b_create_counter()
            let _0xaa__0xa9_pipeline_result = _0x140_create_counter
            let _0xab_counter = _0xaa__0xa9_pipeline_result
            _0xab_counter
            const _0x143_counter = await _0xab_counter
            const _0x142__tilde_ = await _0x143_counter()
            let _0xae__0xad_pipeline_result = _0x142__tilde_
            const _0x145_counter = await _0xab_counter
            const _0x144__tilde_ = await _0x145_counter()
            let _0xb0__0xaf_pipeline_result = _0x144__tilde_
            const _0x147_counter = await _0xab_counter
            const _0x146__tilde_ = await _0x147_counter()
            let _0xb2__0xb1_pipeline_result = _0x146__tilde_
            const _0x149_counter = await _0xab_counter
            const _0x148__tilde_ = await _0x149_counter()
            let _0xb4__0xb3_pipeline_result = _0x148__tilde_
            const _0x14b_counter = await _0xab_counter
            const _0x14a__tilde_ = await _0x14b_counter()
            let _0xb6__0xb5_pipeline_result = _0x14a__tilde_
            const _0x14d_counter = await _0xab_counter
            const _0x14c__tilde_ = await _0x14d_counter()
            let _0xb8__0xb7_pipeline_result = _0x14c__tilde_
            const _0x141_print = await console.log("wow, counting!", _0xae__0xad_pipeline_result, _0xb0__0xaf_pipeline_result, _0xb2__0xb1_pipeline_result, _0xb4__0xb3_pipeline_result, _0xb6__0xb5_pipeline_result, _0xb8__0xb7_pipeline_result)
            let _0xb9__0xac_pipeline_result = _0x141_print
            _0xb9__0xac_pipeline_result


            let _0xc1_politely_agree = ((arg0, arg1) => _0xba_bool_printer(arg0, "i would indeed like to agree.", arg1))
            _0xc1_politely_agree
            const _0x14f_politely_agree = await _0xc1_politely_agree
            const _0x14e__tilde_ = await _0x14f_politely_agree(true, "what?! utter BULLSHIT!")
            let _0xc3__0xc2_pipeline_result = _0x14e__tilde_
            _0xc3__0xc2_pipeline_result
            const _0x151_politely_agree = await _0xc1_politely_agree
            const _0x150__tilde_ = await _0x151_politely_agree(false, "what?! utter BULLSHIT!")
            let _0xc5__0xc4_pipeline_result = _0x150__tilde_
            _0xc5__0xc4_pipeline_result


        }
    } 
})();
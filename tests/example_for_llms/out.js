
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
    const _0xa3_bool_printer = async function (
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
                let _0xa4_if_false = if_false
                _0xa4_if_false
                let _0xa5_if_true = if_true
                _0xa5_if_true
                let _0xa6_value = value
                _0xa6_value
                const _0xb2_value = await _0xa6_value
                let _0xa8__0xa7_pipeline_result = _0xb2_value
                if (_0xa8__0xa7_pipeline_result)
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xb4_if_true = await _0xa5_if_true
                        const _0xb3_print = await console.log(_0xb4_if_true)
                        let _0xaa__0xa9_pipeline_result = _0xb3_print
                        _0xaa__0xa9_pipeline_result
                    }
                } 
                else {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xb6_if_false = await _0xa4_if_false
                        const _0xb5_print = await console.log(_0xb6_if_false)
                        let _0xac__0xab_pipeline_result = _0xb5_print
                        _0xac__0xab_pipeline_result
                    }
                } 
            }
        } }
    const _0x87_create_counter_colon__colon_count = async function (
        _
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                _ = _
                let _0x88__ = _
                _0x88__
                const _0xb9__ = await _0x88__
                const _0xb8_count = await (_0xb9__.count)
                let _0x8a__0x89_pipeline_result = _0xb8_count
                const _0xb7_add = await (_0x8a__0x89_pipeline_result + 1)
                let _0x8b_new = _0xb7_add
                _0x8b_new
                const _0xbb__ = await _0x88__
                const _0xbc_new = await _0x8b_new
                let _0x8e__0x8d_pipeline_result = _0xbc_new
                const _0xba_count = await (_0xbb__.count = (_0x8e__0x8d_pipeline_result))
                let _0x8f__0x8c_pipeline_result = _0xba_count
                return _0x8f__0x8c_pipeline_result;
            }
        } }
    function create_counter_store(count) {
        this.count = count;
    }
    const _0x83_create_counter = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)


                const _0xbd_create_counter_store = await (new create_counter_store(0))
                let _0x85__0x84_pipeline_result = _0xbd_create_counter_store
                let _0x86__ = _0x85__0x84_pipeline_result
                _0x86__
                const _0xbe__ = await _0x86__
                let _0x91__0x90_pipeline_result = _0xbe__
                return (() => _0x87_create_counter_colon__colon_count(_0x91__0x90_pipeline_result));
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
                let _0x16_person = person
                _0x16_person
                const _0xc0_person = await _0x16_person
                let _0x19__0x18_pipeline_result = _0xc0_person
                const _0xbf_concat = await String.prototype.concat.call("Hello, ", _0x19__0x18_pipeline_result)
                let _0x1a__0x17_pipeline_result = _0xbf_concat
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
            const _0xc2_name = await _0x0_name
            let _0x5__0x4_pipeline_result = _0xc2_name
            const _0xc3_age = await _0x1_age
            let _0x7__0x6_pipeline_result = _0xc3_age
            const _0xc4_is_active = await _0x2_is_active
            let _0x9__0x8_pipeline_result = _0xc4_is_active
            const _0xc1_print = await console.log(_0x5__0x4_pipeline_result, _0x7__0x6_pipeline_result, _0x9__0x8_pipeline_result)
            let _0xa__0x3_pipeline_result = _0xc1_print
            _0xa__0x3_pipeline_result


            const _0xc5_name = await (_0x0_name = "Aris")
            let _0xc__0xb_pipeline_result = _0xc5_name
            _0xc__0xb_pipeline_result
            const _0xc7_name = await _0x0_name
            let _0xf__0xe_pipeline_result = _0xc7_name
            const _0xc6_print = await console.log(_0xf__0xe_pipeline_result)
            let _0x10__0xd_pipeline_result = _0xc6_print
            _0x10__0xd_pipeline_result


            const _0xc9_name = await _0x0_name
            let _0x13__0x12_pipeline_result = _0xc9_name
            const _0xc8_print = await console.log(_0x13__0x12_pipeline_result)
            let _0x14__0x11_pipeline_result = _0xc8_print
            _0x14__0x11_pipeline_result

            const _0xcb_greet = await _0x15_greet("Alice")
            let _0x1d__0x1c_pipeline_result = _0xcb_greet
            const _0xca_print = await console.log(_0x1d__0x1c_pipeline_result)
            let _0x1e__0x1b_pipeline_result = _0xca_print
            _0x1e__0x1b_pipeline_result

            let _0x1f_numbers = [1, 2, 3, 4, 5]
            _0x1f_numbers
            const _0xcd_numbers = await _0x1f_numbers
            const _0xcc_push = await Array.prototype.push.call(_0xcd_numbers, 6)
            let _0x21__0x20_pipeline_result = _0xcc_push
            _0x21__0x20_pipeline_result
            const _0xd0_numbers = await _0x1f_numbers
            const _0xcf__hash_ = await _0xd0_numbers[0]
            let _0x24__0x23_pipeline_result = _0xcf__hash_
            const _0xce_print = await console.log(_0x24__0x23_pipeline_result)
            let _0x25__0x22_pipeline_result = _0xce_print
            _0x25__0x22_pipeline_result
            const _0xd3_numbers = await _0x1f_numbers
            const _0xd6_numbers = await _0x1f_numbers
            const _0xd5_length = await (_0xd6_numbers.length)
            let _0x2a__0x29_pipeline_result = _0xd5_length
            const _0xd4_sub = await (_0x2a__0x29_pipeline_result - 1)
            let _0x2b__0x28_pipeline_result = _0xd4_sub
            const _0xd2__hash_ = await _0xd3_numbers[_0x2b__0x28_pipeline_result]
            let _0x2c__0x27_pipeline_result = _0xd2__hash_
            const _0xd1_print = await console.log(_0x2c__0x27_pipeline_result)
            let _0x2d__0x26_pipeline_result = _0xd1_print
            _0x2d__0x26_pipeline_result



            const _0xd8_age = await _0x1_age
            let _0x30__0x2f_pipeline_result = _0xd8_age
            const _0xd7_nondesc = await (18 <= _0x30__0x2f_pipeline_result)
            let _0x31__0x2e_pipeline_result = _0xd7_nondesc
            if (_0x31__0x2e_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xd9_print = await console.log("Adult")
                    let _0x33__0x32_pipeline_result = _0xd9_print
                    _0x33__0x32_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xda_print = await console.log("Minor")
                    let _0x35__0x34_pipeline_result = _0xda_print
                    _0x35__0x34_pipeline_result
                }
            } 

            const _0xdb_numbers = await _0x1f_numbers
            let _0x37__0x36_pipeline_result = _0xdb_numbers
            const _0xdc_iter = _0x37__0x36_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xdc_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xde_number = await number
                        let _0x3a__0x39_pipeline_result = _0xde_number
                        const _0xdd_print = await console.log(_0x3a__0x39_pipeline_result)
                        let _0x3b__0x38_pipeline_result = _0xdd_print
                        _0x3b__0x38_pipeline_result
                    }
                } }

            const _0xdf_Person = await (new Person("Alice", 30))
            let _0x3d__0x3c_pipeline_result = _0xdf_Person
            let _0x3e_alice = _0x3d__0x3c_pipeline_result
            _0x3e_alice
            const _0xe2_alice = await _0x3e_alice
            const _0xe1_name = await (_0xe2_alice.name)
            let _0x41__0x40_pipeline_result = _0xe1_name
            const _0xe0_print = await console.log(_0x41__0x40_pipeline_result)
            let _0x42__0x3f_pipeline_result = _0xe0_print
            _0x42__0x3f_pipeline_result
            const _0xe5_alice = await _0x3e_alice
            const _0xe4_age = await (_0xe5_alice.age)
            let _0x45__0x44_pipeline_result = _0xe4_age
            const _0xe3_print = await console.log(_0x45__0x44_pipeline_result)
            let _0x46__0x43_pipeline_result = _0xe3_print
            _0x46__0x43_pipeline_result
            const _0xe7_alice = await _0x3e_alice
            const _0xe6_name = await (_0xe7_alice.name = ("Alicia"))
            let _0x48__0x47_pipeline_result = _0xe6_name
            _0x48__0x47_pipeline_result
            const _0xea_alice = await _0x3e_alice
            const _0xe9_name = await (_0xea_alice.name)
            let _0x4b__0x4a_pipeline_result = _0xe9_name
            const _0xe8_print = await console.log(_0x4b__0x4a_pipeline_result)
            let _0x4c__0x49_pipeline_result = _0xe8_print
            _0x4c__0x49_pipeline_result

            const _0xec_name = await _0x0_name
            let _0x4f__0x4e_pipeline_result = _0xec_name
            const _0xeb_print = await console.log(_0x4f__0x4e_pipeline_result)
            let _0x50__0x4d_pipeline_result = _0xeb_print
            _0x50__0x4d_pipeline_result


            let _0x51__1 = 1
            _0x51__1
            const _0xed__1 = await _0x51__1
            let _0x52__q_ = _0xed__1
            _0x52__q_
            const _0xef__q_ = await _0x52__q_
            const _0xf0__q_ = await _0x52__q_
            let _0x55__0x54_pipeline_result = _0xf0__q_
            const _0xee_add = await (_0xef__q_ + _0x55__0x54_pipeline_result + 1)
            let _0x56__0x53_pipeline_result = _0xee_add
            _0x56__0x53_pipeline_result
            const _0xf2__0x53_pipeline_result = await _0x56__0x53_pipeline_result
            const _0xf1_print = await console.log(_0xf2__0x53_pipeline_result)
            let _0x58__0x57_pipeline_result = _0xf1_print
            _0x58__0x57_pipeline_result

            const _0xf3__1 = await _0x51__1
            let _0x59__q_ = _0xf3__1
            _0x59__q_
            const _0xf5__q_ = await _0x59__q_
            let _0x5c__0x5b_pipeline_result = _0xf5__q_
            const _0xf4_add = await (_0x5c__0x5b_pipeline_result + 1)
            let _0x5d__0x5a_pipeline_result = _0xf4_add
            _0x5d__0x5a_pipeline_result
            const _0xf7__0x5a_pipeline_result = await _0x5d__0x5a_pipeline_result
            const _0xf6_print = await console.log(_0xf7__0x5a_pipeline_result)
            let _0x5f__0x5e_pipeline_result = _0xf6_print
            _0x5f__0x5e_pipeline_result

            const _0xf8__1 = await _0x51__1
            let _0x60__q_ = _0xf8__1
            _0x60__q_
            const _0xfa__q_ = await _0x60__q_
            const _0xf9_add = await (_0xfa__q_ + 1)
            let _0x62__0x61_pipeline_result = _0xf9_add
            _0x62__0x61_pipeline_result
            const _0xfc__0x61_pipeline_result = await _0x62__0x61_pipeline_result
            const _0xfb_print = await console.log(_0xfc__0x61_pipeline_result)
            let _0x64__0x63_pipeline_result = _0xfb_print
            _0x64__0x63_pipeline_result

            let _0x65_things_to_say = ["67lang is awesome", "67lang is flexible as fuck", "67lang is all you ever need", "67lang is on the brink", "67lang is good enough to write a Discord bot", "67lang is almost good enough for everything."]
            _0x65_things_to_say
            let _0x66_max_characters = 0
            _0x66_max_characters
            let _0x67_found_word = ""
            _0x67_found_word
            const _0xfd_things_to_say = await _0x65_things_to_say
            let _0x69__0x68_pipeline_result = _0xfd_things_to_say
            const _0xfe_iter = _0x69__0x68_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xfe_iter.next();
                if (done) { break; }
                let thing = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x100_thing = await thing
                        const _0xff_split = await String.prototype.split.call(_0x100_thing, " ")
                        let _0x6b__0x6a_pipeline_result = _0xff_split
                        const _0x101_iter = _0x6b__0x6a_pipeline_result[Symbol.iterator]();
                        while (true) {
                            const { value, done } = _0x101_iter.next();
                            if (done) { break; }
                            let word = value;
                            {
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)

                                    const _0x102_word = await word
                                    let _0x6d__0x6c_pipeline_result = _0x102_word
                                    let _0x6e_word = _0x6d__0x6c_pipeline_result
                                    _0x6e_word

                                    const _0x104_word = await _0x6e_word
                                    const _0x103_length = await (_0x104_word.length)
                                    let _0x70__0x6f_pipeline_result = _0x103_length
                                    _0x70__0x6f_pipeline_result
                                    const _0x106__0x6f_pipeline_result = await _0x70__0x6f_pipeline_result
                                    const _0x107_max_characters = await _0x66_max_characters
                                    let _0x73__0x72_pipeline_result = _0x107_max_characters
                                    const _0x105_desc = await (_0x106__0x6f_pipeline_result > _0x73__0x72_pipeline_result)
                                    let _0x74__0x71_pipeline_result = _0x105_desc
                                    if (_0x74__0x71_pipeline_result)
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)

                                            const _0x109__0x6f_pipeline_result = await _0x70__0x6f_pipeline_result
                                            const _0x108_max_characters = await (_0x66_max_characters = _0x109__0x6f_pipeline_result)
                                            let _0x76__0x75_pipeline_result = _0x108_max_characters
                                            _0x76__0x75_pipeline_result

                                            const _0x10b_word = await _0x6e_word
                                            const _0x10a_found_word = await (_0x67_found_word = _0x10b_word)
                                            _0x10a_found_word

                                            const _0x10d_word = await _0x6e_word
                                            const _0x10c_found_word = await (_0x67_found_word = _0x10d_word)
                                            let _0x78__0x77_pipeline_result = _0x10c_found_word
                                            _0x78__0x77_pipeline_result
                                        }
                                    } 
                                }
                            } }
                    }
                } }
            const _0x10f_found_word = await _0x67_found_word
            let _0x7b__0x7a_pipeline_result = _0x10f_found_word
            const _0x10e_print = await console.log(_0x7b__0x7a_pipeline_result)
            let _0x7c__0x79_pipeline_result = _0x10e_print
            _0x7c__0x79_pipeline_result




            const _0x111_things_to_say = await _0x65_things_to_say
            const _0x110__hash_ = await _0x111_things_to_say[0]
            let _0x7e__0x7d_pipeline_result = _0x110__hash_
            _0x7e__0x7d_pipeline_result
            const _0x113__0x7d_pipeline_result = await _0x7e__0x7d_pipeline_result
            const _0x112_split = await String.prototype.split.call(_0x113__0x7d_pipeline_result, " ")
            let _0x80__0x7f_pipeline_result = _0x112_split
            _0x80__0x7f_pipeline_result
            const _0x117__0x7f_pipeline_result = await _0x80__0x7f_pipeline_result
            const _0x116_sort = await Array.prototype.sort.call(_0x117__0x7f_pipeline_result)
            const _0x115_join = await Array.prototype.join.call(_0x116_sort)
            const _0x114_print = await console.log(_0x115_join, " - what words!")
            let _0x82__0x81_pipeline_result = _0x114_print
            _0x82__0x81_pipeline_result


            const _0x118_create_counter = await _0x83_create_counter()
            let _0x93__0x92_pipeline_result = _0x118_create_counter
            let _0x94_counter = _0x93__0x92_pipeline_result
            _0x94_counter
            const _0x11b_counter = await _0x94_counter
            const _0x11a__tilde_ = await _0x11b_counter()
            let _0x97__0x96_pipeline_result = _0x11a__tilde_
            const _0x11d_counter = await _0x94_counter
            const _0x11c__tilde_ = await _0x11d_counter()
            let _0x99__0x98_pipeline_result = _0x11c__tilde_
            const _0x11f_counter = await _0x94_counter
            const _0x11e__tilde_ = await _0x11f_counter()
            let _0x9b__0x9a_pipeline_result = _0x11e__tilde_
            const _0x121_counter = await _0x94_counter
            const _0x120__tilde_ = await _0x121_counter()
            let _0x9d__0x9c_pipeline_result = _0x120__tilde_
            const _0x123_counter = await _0x94_counter
            const _0x122__tilde_ = await _0x123_counter()
            let _0x9f__0x9e_pipeline_result = _0x122__tilde_
            const _0x125_counter = await _0x94_counter
            const _0x124__tilde_ = await _0x125_counter()
            let _0xa1__0xa0_pipeline_result = _0x124__tilde_
            const _0x119_print = await console.log("wow, counting!", _0x97__0x96_pipeline_result, _0x99__0x98_pipeline_result, _0x9b__0x9a_pipeline_result, _0x9d__0x9c_pipeline_result, _0x9f__0x9e_pipeline_result, _0xa1__0xa0_pipeline_result)
            let _0xa2__0x95_pipeline_result = _0x119_print
            _0xa2__0x95_pipeline_result


            let _0xad_politely_agree = ((arg0, arg1) => _0xa3_bool_printer(arg0, "i would indeed like to agree.", arg1))
            _0xad_politely_agree
            const _0x127_politely_agree = await _0xad_politely_agree
            const _0x126__tilde_ = await _0x127_politely_agree(true, "what?! utter BULLSHIT!")
            let _0xaf__0xae_pipeline_result = _0x126__tilde_
            _0xaf__0xae_pipeline_result
            const _0x129_politely_agree = await _0xad_politely_agree
            const _0x128__tilde_ = await _0x129_politely_agree(false, "what?! utter BULLSHIT!")
            let _0xb1__0xb0_pipeline_result = _0x128__tilde_
            _0xb1__0xb0_pipeline_result


        }
    } 
})();
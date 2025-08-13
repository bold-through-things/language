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
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    const _0xe_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                const _0x83_person = await person
                let _0x12__0x10_person = _0x83_person
                const _0x82_concat = await ("Hello, " + _0x12__0x10_person)
                let _0x13__0xf_concat = _0x82_concat
                return _0x13__0xf_concat;
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
            const _0x85_name = await _0x0_name
            let _0xa__0x4_name = _0x85_name
            const _0x86_age = await _0x1_age
            let _0xb__0x6_age = _0x86_age
            const _0x87_is_active = await _0x2_is_active
            let _0xc__0x8_is_active = _0x87_is_active
            const _0x84_print = await console.log(_0xa__0x4_name, _0xb__0x6_age, _0xc__0x8_is_active)
            let _0xd__0x3_print = _0x84_print
            _0xd__0x3_print

            const _0x89_greet = await _0xe_greet("Alice")
            let _0x17__0x15_greet = _0x89_greet
            const _0x88_print = await console.log(_0x17__0x15_greet)
            let _0x18__0x14_print = _0x88_print
            _0x18__0x14_print

            let _0x19_numbers = [1, 2, 3, 4, 5]
            _0x19_numbers
            const _0x8a_numbers = await _0x19_numbers
            let _0x1c__0x1a_numbers = _0x8a_numbers

            const _0x8c__0x1a_numbers = await _0x1c__0x1a_numbers
            const _0x8b_push = await Array.prototype.push.call(_0x8c__0x1a_numbers, 6)
            let _0x1d__0x1b_push = _0x8b_push
            _0x1d__0x1b_push
            const _0x8e_numbers = await _0x19_numbers
            let _0x23__0x1f_numbers = _0x8e_numbers
            const _0x90__0x1f_numbers = await _0x23__0x1f_numbers
            const _0x8f__hash_ = await _0x90__0x1f_numbers[0]
            let _0x24__0x20__hash_ = _0x8f__hash_
            const _0x8d_print = await console.log(_0x24__0x20__hash_)
            let _0x25__0x1e_print = _0x8d_print
            _0x25__0x1e_print
            const _0x92_numbers = await _0x19_numbers
            let _0x36__0x27_numbers = _0x92_numbers
            const _0x94__0x27_numbers = await _0x36__0x27_numbers
            const _0x96_numbers = await _0x19_numbers
            let _0x37__0x2b_numbers = _0x96_numbers
            const _0x98__0x2b_numbers = await _0x37__0x2b_numbers
            const _0x97_length = await (_0x98__0x2b_numbers.length)
            let _0x38__0x2c_length = _0x97_length
            const _0x95_sub = await (_0x38__0x2c_length - 1)
            let _0x39__0x2a_sub = _0x95_sub
            const _0x93__hash_ = await _0x94__0x27_numbers[_0x39__0x2a_sub]
            let _0x3a__0x28__hash_ = _0x93__hash_
            const _0x91_print = await console.log(_0x3a__0x28__hash_)
            let _0x3b__0x26_print = _0x91_print
            _0x3b__0x26_print

            let _0x3c_user = {}
            _0x3c_user

            const _0x99_user = await _0x3c_user
            let _0x3f__0x3d_user = _0x99_user

            const _0x9b__0x3d_user = await _0x3f__0x3d_user
            const _0x9a__hash_ = await (_0x9b__0x3d_user["name"] = "Bob")
            let _0x40__0x3e__hash_ = _0x9a__hash_
            _0x40__0x3e__hash_
            const _0x9c_user = await _0x3c_user
            let _0x43__0x41_user = _0x9c_user

            const _0x9e__0x41_user = await _0x43__0x41_user
            const _0x9d__hash_ = await (_0x9e__0x41_user["age"] = 30)
            let _0x44__0x42__hash_ = _0x9d__hash_
            _0x44__0x42__hash_
            const _0x9f_user = await _0x3c_user
            let _0x47__0x45_user = _0x9f_user

            const _0xa1__0x45_user = await _0x47__0x45_user
            const _0xa0__hash_ = await (_0xa1__0x45_user["city"] = "New York")
            let _0x48__0x46__hash_ = _0xa0__hash_
            _0x48__0x46__hash_
            const _0xa3_user = await _0x3c_user
            let _0x4c__0x4a_user = _0xa3_user
            const _0xa2_print = await console.log(_0x4c__0x4a_user)
            let _0x4d__0x49_print = _0xa2_print
            _0x4d__0x49_print

            const _0xa5_age = await _0x1_age
            let _0x51__0x4f_age = _0xa5_age
            const _0xa4_nondesc = await (18 <= _0x51__0x4f_age)
            let _0x52__0x4e_nondesc = _0xa4_nondesc
            if (_0x52__0x4e_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xa6_print = await console.log("Adult")
                        let _0x54__0x53_print = _0xa6_print
                        _0x54__0x53_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0xa7_print = await console.log("Minor")
                    let _0x56__0x55_print = _0xa7_print
                    _0x56__0x55_print
                }
            } 

            const _0xa8_numbers = await _0x19_numbers
            let _0x58__0x57_numbers = _0xa8_numbers

            const _0xa9_iter = _0x58__0x57_numbers[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xa9_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0xab_number = await number
                        let _0x5c__0x5a_number = _0xab_number
                        const _0xaa_print = await console.log(_0x5c__0x5a_number)
                        let _0x5d__0x59_print = _0xaa_print
                        _0x5d__0x59_print
                    }
                } }

            const _0xac_Person = await (new Person("Alice", 30))
            let _0x5f__0x5e_Person = _0xac_Person
            let _0x60_alice = _0x5f__0x5e_Person
            _0x60_alice
            const _0xae_alice = await _0x60_alice
            let _0x66__0x62_alice = _0xae_alice
            const _0xb0__0x62_alice = await _0x66__0x62_alice
            const _0xaf_name = await (_0xb0__0x62_alice.name)
            let _0x67__0x63_name = _0xaf_name
            const _0xad_print = await console.log(_0x67__0x63_name)
            let _0x68__0x61_print = _0xad_print
            _0x68__0x61_print
            const _0xb2_alice = await _0x60_alice
            let _0x6e__0x6a_alice = _0xb2_alice
            const _0xb4__0x6a_alice = await _0x6e__0x6a_alice
            const _0xb3_age = await (_0xb4__0x6a_alice.age)
            let _0x6f__0x6b_age = _0xb3_age
            const _0xb1_print = await console.log(_0x6f__0x6b_age)
            let _0x70__0x69_print = _0xb1_print
            _0x70__0x69_print
            const _0xb5_alice = await _0x60_alice
            let _0x73__0x71_alice = _0xb5_alice

            const _0xb7__0x71_alice = await _0x73__0x71_alice
            const _0xb6_name = await (_0xb7__0x71_alice.name = ("Alicia"))
            let _0x74__0x72_name = _0xb6_name
            _0x74__0x72_name
            const _0xb9_alice = await _0x60_alice
            let _0x7a__0x76_alice = _0xb9_alice
            const _0xbb__0x76_alice = await _0x7a__0x76_alice
            const _0xba_name = await (_0xbb__0x76_alice.name)
            let _0x7b__0x77_name = _0xba_name
            const _0xb8_print = await console.log(_0x7b__0x77_name)
            let _0x7c__0x75_print = _0xb8_print
            _0x7c__0x75_print

            const _0xbd_name = await _0x0_name
            let _0x80__0x7e_name = _0xbd_name
            const _0xbc_print = await console.log(_0x80__0x7e_name)
            let _0x81__0x7d_print = _0xbc_print
            _0x81__0x7d_print


        }
    } 
})();
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
    const _0xb_greet = async function (
        person
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                person = person
                const _0x52_person = await person
                let _0xe__0xd_pipeline_result = _0x52_person
                const _0x51_concat = await ("Hello, " + _0xe__0xd_pipeline_result)
                let _0xf__0xc_pipeline_result = _0x51_concat
                return _0xf__0xc_pipeline_result;
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
            const _0x54_name = await _0x0_name
            let _0x5__0x4_pipeline_result = _0x54_name
            const _0x55_age = await _0x1_age
            let _0x7__0x6_pipeline_result = _0x55_age
            const _0x56_is_active = await _0x2_is_active
            let _0x9__0x8_pipeline_result = _0x56_is_active
            const _0x53_print = await console.log(_0x5__0x4_pipeline_result, _0x7__0x6_pipeline_result, _0x9__0x8_pipeline_result)
            let _0xa__0x3_pipeline_result = _0x53_print
            _0xa__0x3_pipeline_result

            const _0x58_greet = await _0xb_greet("Alice")
            let _0x12__0x11_pipeline_result = _0x58_greet
            const _0x57_print = await console.log(_0x12__0x11_pipeline_result)
            let _0x13__0x10_pipeline_result = _0x57_print
            _0x13__0x10_pipeline_result

            let _0x14_numbers = [1, 2, 3, 4, 5]
            _0x14_numbers
            const _0x5a_numbers = await _0x14_numbers
            const _0x59_push = await Array.prototype.push.call(_0x5a_numbers, 6)
            let _0x16__0x15_pipeline_result = _0x59_push
            _0x16__0x15_pipeline_result
            const _0x5d_numbers = await _0x14_numbers
            const _0x5c__hash_ = await _0x5d_numbers[0]
            let _0x19__0x18_pipeline_result = _0x5c__hash_
            const _0x5b_print = await console.log(_0x19__0x18_pipeline_result)
            let _0x1a__0x17_pipeline_result = _0x5b_print
            _0x1a__0x17_pipeline_result
            const _0x60_numbers = await _0x14_numbers
            const _0x63_numbers = await _0x14_numbers
            const _0x62_length = await (_0x63_numbers.length)
            let _0x1f__0x1e_pipeline_result = _0x62_length
            const _0x61_sub = await (_0x1f__0x1e_pipeline_result - 1)
            let _0x20__0x1d_pipeline_result = _0x61_sub
            const _0x5f__hash_ = await _0x60_numbers[_0x20__0x1d_pipeline_result]
            let _0x21__0x1c_pipeline_result = _0x5f__hash_
            const _0x5e_print = await console.log(_0x21__0x1c_pipeline_result)
            let _0x22__0x1b_pipeline_result = _0x5e_print
            _0x22__0x1b_pipeline_result

            let _0x23_user = {}
            _0x23_user

            const _0x65_user = await _0x23_user
            const _0x64__hash_ = await (_0x65_user["name"] = "Bob")
            let _0x25__0x24_pipeline_result = _0x64__hash_
            _0x25__0x24_pipeline_result
            const _0x67_user = await _0x23_user
            const _0x66__hash_ = await (_0x67_user["age"] = 30)
            let _0x27__0x26_pipeline_result = _0x66__hash_
            _0x27__0x26_pipeline_result
            const _0x69_user = await _0x23_user
            const _0x68__hash_ = await (_0x69_user["city"] = "New York")
            let _0x29__0x28_pipeline_result = _0x68__hash_
            _0x29__0x28_pipeline_result
            const _0x6b_user = await _0x23_user
            let _0x2c__0x2b_pipeline_result = _0x6b_user
            const _0x6a_print = await console.log(_0x2c__0x2b_pipeline_result)
            let _0x2d__0x2a_pipeline_result = _0x6a_print
            _0x2d__0x2a_pipeline_result

            const _0x6d_age = await _0x1_age
            let _0x30__0x2f_pipeline_result = _0x6d_age
            const _0x6c_nondesc = await (18 <= _0x30__0x2f_pipeline_result)
            let _0x31__0x2e_pipeline_result = _0x6c_nondesc
            if (_0x31__0x2e_pipeline_result)
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x6e_print = await console.log("Adult")
                    let _0x33__0x32_pipeline_result = _0x6e_print
                    _0x33__0x32_pipeline_result
                }
            } 
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x6f_print = await console.log("Minor")
                    let _0x35__0x34_pipeline_result = _0x6f_print
                    _0x35__0x34_pipeline_result
                }
            } 

            const _0x70_numbers = await _0x14_numbers
            let _0x37__0x36_pipeline_result = _0x70_numbers

            const _0x71_iter = _0x37__0x36_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x71_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x73_number = await number
                        let _0x3a__0x39_pipeline_result = _0x73_number
                        const _0x72_print = await console.log(_0x3a__0x39_pipeline_result)
                        let _0x3b__0x38_pipeline_result = _0x72_print
                        _0x3b__0x38_pipeline_result
                    }
                } }

            const _0x74_Person = await (new Person("Alice", 30))
            let _0x3d__0x3c_pipeline_result = _0x74_Person
            let _0x3e_alice = _0x3d__0x3c_pipeline_result
            _0x3e_alice
            const _0x77_alice = await _0x3e_alice
            const _0x76_name = await (_0x77_alice.name)
            let _0x41__0x40_pipeline_result = _0x76_name
            const _0x75_print = await console.log(_0x41__0x40_pipeline_result)
            let _0x42__0x3f_pipeline_result = _0x75_print
            _0x42__0x3f_pipeline_result
            const _0x7a_alice = await _0x3e_alice
            const _0x79_age = await (_0x7a_alice.age)
            let _0x45__0x44_pipeline_result = _0x79_age
            const _0x78_print = await console.log(_0x45__0x44_pipeline_result)
            let _0x46__0x43_pipeline_result = _0x78_print
            _0x46__0x43_pipeline_result
            const _0x7c_alice = await _0x3e_alice
            const _0x7b_name = await (_0x7c_alice.name = ("Alicia"))
            let _0x48__0x47_pipeline_result = _0x7b_name
            _0x48__0x47_pipeline_result
            const _0x7f_alice = await _0x3e_alice
            const _0x7e_name = await (_0x7f_alice.name)
            let _0x4b__0x4a_pipeline_result = _0x7e_name
            const _0x7d_print = await console.log(_0x4b__0x4a_pipeline_result)
            let _0x4c__0x49_pipeline_result = _0x7d_print
            _0x4c__0x49_pipeline_result

            const _0x81_name = await _0x0_name
            let _0x4f__0x4e_pipeline_result = _0x81_name
            const _0x80_print = await console.log(_0x4f__0x4e_pipeline_result)
            let _0x50__0x4d_pipeline_result = _0x80_print
            _0x50__0x4d_pipeline_result


        }
    } 
})();
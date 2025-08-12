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
            let _0x4_name = _0x0_name
            let _0x5_age = _0x1_age
            let _0x6_is_active = _0x2_is_active
            const _0x28_print = await console.log(_0x4_name, _0x5_age, _0x6_is_active)
            let _0x3_print = _0x28_print
            _0x3_print

            const _0x7_greet = async function (
                person, 
                dummy_param
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        person = person
                        dummy_param = dummy_param
                        let _0x9_person = person
                        const _0x29_concat = await ("Hello, " + _0x9_person)
                        let _0x8_concat = _0x29_concat
                        return _0x8_concat;
                    }
                } }
            const _0x2b_greet = await _0x7_greet("Alice", false)
            let _0xb_greet = _0x2b_greet
            const _0x2a_print = await console.log(_0xb_greet)
            let _0xa_print = _0x2a_print
            _0xa_print

            let _0xc_numbers = [1, 2, 3, 4, 5]
            _0xc_numbers
            let _0xd_numbers = _0xc_numbers

            const _0x2c_push = await Array.prototype.push.call(_0xd_numbers, 6)
            let _0xe_push = _0x2c_push
            _0xe_push
            let _0x10_numbers = _0xc_numbers
            const _0x2e__0x10_numbers_0 = await _0x10_numbers["0"]
            let _0x11__0 = _0x2e__0x10_numbers_0
            const _0x2d_print = await console.log(_0x11__0)
            let _0xf_print = _0x2d_print
            _0xf_print
            let _0x13_numbers = _0xc_numbers
            let _0x16_numbers = _0xc_numbers
            const _0x32_length = await _0x16_numbers.length
            let _0x17_length = _0x32_length
            const _0x31_sub = await (_0x17_length - 1)
            let _0x15_sub = _0x31_sub
            const _0x30__0x13_numbers = await _0x13_numbers[_0x15_sub]
            let _0x14__hash_ = _0x30__0x13_numbers
            const _0x2f_print = await console.log(_0x14__hash_)
            let _0x12_print = _0x2f_print
            _0x12_print

            let _0x18_user = {}
            _0x18_user

            let _0x19_user = _0x18_user

            _0x19_user.name = "Bob"
            const _0x33__0x19_user_name = await _0x19_user.name
            let _0x1a_name = _0x33__0x19_user_name
            _0x1a_name
            let _0x1b_user = _0x18_user

            _0x1b_user.age = 30
            const _0x34__0x1b_user_age = await _0x1b_user.age
            let _0x1c_age = _0x34__0x1b_user_age
            _0x1c_age
            let _0x1d_user = _0x18_user

            _0x1d_user.city = "New York"
            const _0x35__0x1d_user_city = await _0x1d_user.city
            let _0x1e_city = _0x35__0x1d_user_city
            _0x1e_city
            let _0x20_user = _0x18_user
            const _0x36_print = await console.log(_0x20_user)
            let _0x1f_print = _0x36_print
            _0x1f_print

            let _0x22_age = _0x1_age
            const _0x37_nondesc = await (18 <= _0x22_age)
            let _0x21_nondesc = _0x37_nondesc
            if (_0x21_nondesc) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x38_print = await console.log("Adult")
                        let _0x23_print = _0x38_print
                        _0x23_print
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x39_print = await console.log("Minor")
                    let _0x24_print = _0x39_print
                    _0x24_print
                }
            } 

            let _0x25_numbers = _0xc_numbers

            const _0x3a_iter = _0x25_numbers[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x3a_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x27_number = number
                        const _0x3b_print = await console.log(_0x27_number)
                        let _0x26_print = _0x3b_print
                        _0x26_print
                    }
                } }


        }
    } 
})();
globalThis.indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum || a, false),
    asc: (...arr) => arr.every((v, i, a) => !i || a[i - 1] <= v), // who let bro cook? https://stackoverflow.com/a/53833620
    add: (...arr) => arr.reduce((sum, a) => sum + (a ?? 0), 0),
    mod: (...arr) => arr[0] % arr[1], // TODO - shouldn't be a binary operation (how?) TODO - ensure we're not ignoring inputs silently
    none: (...arr) => arr.every(v => !v),
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

    keys: Object.keys.bind(Object),
    values: Object.values.bind(Object),
    log: console.log.bind(console),

    store() {
        const obj = { value: null }
        const fn = (function (set) { if (set !== undefined) { this.value = set; return set; } else { return this.value; } }).bind(obj)
        return fn
    },



    /**
     * Calls a method or sets a property on an object, simulating `obj[field](...)` or `obj[field] = value`.
     * If a setter exists on the prototype, it's invoked. Otherwise, the field is either called (if function) or assigned to.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to call or assign.
     * @param {...unknown} values - Arguments to pass to the method or the value to assign.
     * @returns {Promise<unknown>} The result of the method call, or `undefined` if assigning.
     * @throws {TypeError} If the number of arguments is invalid for the setter or assignment.
     */
    async access(obj, field, ...values) {
        if (values.length == 0) { 
            const value = obj[field];

            if (typeof value === 'function') {
                return await value.call(obj);
            } else {
                return value;
            }
        }
        
        const proto = Object.getPrototypeOf(obj);
        const desc = proto ? Object.getOwnPropertyDescriptor(proto, field) : undefined;

        if (desc?.set) {
            if (values.length !== 1) {
                throw new TypeError(`Setter for '${String(field)}' expects exactly 1 argument, got ${values.length}`);
            }
            obj[field] = values[0];
            return values[0];
        }

        const member = obj[field];

        if (typeof member === 'function') {
            return await member.call(obj, ...values);
        } else {
            if (values.length !== 1) {
                throw new TypeError(`Assignment to '${String(field)}' expects exactly 1 value, got ${values.length}`);
            }
            obj[field] = values[0];
            return values[0];
        }
    },

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
    }
}

if (typeof window === "undefined") {
    // Deno environment

    indentifire.prompt = async function (msg) {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) return "";
        return new TextDecoder().decode(buf.subarray(0, n)).trim();
    };

    let stdin_cached = null;

    indentifire.stdin = async function () {
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

    indentifire.is_tty = () => Deno.isatty(Deno.stdin.rid);
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = indentifire.scope(parent_scope)
            scope.fizz_divisor = indentifire.store()
            scope.buzz_divisor = indentifire.store()
            scope.n = indentifire.store()
            const _0x0 = await indentifire.is_tty()
            if (_0x0)
            {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x1 = await indentifire.prompt("fizz? ")
                        /*fizz_divisor call=True index=False args=["'fizz_divisor'", '_0x1']*/
                        const _0x2_fizz_divisor = await indentifire.access(scope, 'fizz_divisor', _0x1)
                        _0x2_fizz_divisor
                        const _0x3 = await indentifire.prompt("buzz? ")
                        /*buzz_divisor call=True index=False args=["'buzz_divisor'", '_0x3']*/
                        const _0x4_buzz_divisor = await indentifire.access(scope, 'buzz_divisor', _0x3)
                        _0x4_buzz_divisor
                        const _0x5 = await indentifire.prompt("n? ")
                        /*n call=True index=False args=["'n'", '_0x5']*/
                        const _0x6_n = await indentifire.access(scope, 'n', _0x5)
                        _0x6_n
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    scope.input = indentifire.store()
                    const _0x7 = await indentifire.stdin()
                    const _0x8 = await indentifire.access(scope, 'input', _0x7)
                    _0x8
                    /*input call=False index=False args=["'input'"]*/
                    const _0x9_input = await indentifire.access(scope, 'input')
                    /*split call=True index=False args=["'split'", '"\\n"']*/
                    const _0xa_split = await indentifire.access(_0x9_input, 'split', "\n")
                    /*input call=True index=False args=["'input'", '_0xa_split']*/
                    const _0xb_input = await indentifire.access(scope, 'input', _0xa_split)
                    _0xb_input

                    /*input call=False index=False args=["'input'"]*/
                    const _0xc_input = await indentifire.access(scope, 'input')
                    /*key call=False index=True args=['0']*/
                    const _0xd_key = await indentifire.access(_0xc_input, 0)
                    /*fizz_divisor call=True index=False args=["'fizz_divisor'", '_0xd_key']*/
                    const _0xe_fizz_divisor = await indentifire.access(scope, 'fizz_divisor', _0xd_key)
                    _0xe_fizz_divisor
                    /*input call=False index=False args=["'input'"]*/
                    const _0xf_input = await indentifire.access(scope, 'input')
                    /*key call=False index=True args=['1']*/
                    const _0x10_key = await indentifire.access(_0xf_input, 1)
                    /*buzz_divisor call=True index=False args=["'buzz_divisor'", '_0x10_key']*/
                    const _0x11_buzz_divisor = await indentifire.access(scope, 'buzz_divisor', _0x10_key)
                    _0x11_buzz_divisor
                    /*input call=False index=False args=["'input'"]*/
                    const _0x12_input = await indentifire.access(scope, 'input')
                    /*key call=False index=True args=['2']*/
                    const _0x13_key = await indentifire.access(_0x12_input, 2)
                    /*n call=True index=False args=["'n'", '_0x13_key']*/
                    const _0x14_n = await indentifire.access(scope, 'n', _0x13_key)
                    _0x14_n
                }
            } 
            scope.i = indentifire.store()
            while(true) {/*i call=False index=False args=["'i'"]*/
                const _0x15_i = await indentifire.access(scope, 'i')
                /*n call=False index=False args=["'n'"]*/
                const _0x16_n = await indentifire.access(scope, 'n')
                const _0x17 = await indentifire.asc(_0x15_i, _0x16_n)
                if (!_0x17) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        scope.out = indentifire.store()
                        const _0x18 = await indentifire.access(scope, 'out', "")
                        _0x18
                        /*i call=False index=False args=["'i'"]*/
                        const _0x19_i = await indentifire.access(scope, 'i')
                        /*fizz_divisor call=False index=False args=["'fizz_divisor'"]*/
                        const _0x1a_fizz_divisor = await indentifire.access(scope, 'fizz_divisor')
                        const _0x1b = await indentifire.mod(_0x19_i, _0x1a_fizz_divisor)
                        const _0x1c = await indentifire.eq(_0x1b, 0)
                        if (_0x1c)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*out call=False index=False args=["'out'"]*/
                                    const _0x1d_out = await indentifire.access(scope, 'out')
                                    const _0x1e = await indentifire.concat(_0x1d_out, "fizz")
                                    /*out call=True index=False args=["'out'", '_0x1e']*/
                                    const _0x1f_out = await indentifire.access(scope, 'out', _0x1e)
                                    _0x1f_out
                                }
                            } }
                        /*i call=False index=False args=["'i'"]*/
                        const _0x20_i = await indentifire.access(scope, 'i')
                        /*buzz_divisor call=False index=False args=["'buzz_divisor'"]*/
                        const _0x21_buzz_divisor = await indentifire.access(scope, 'buzz_divisor')
                        const _0x22 = await indentifire.mod(_0x20_i, _0x21_buzz_divisor)
                        const _0x23 = await indentifire.eq(_0x22, 0)
                        if (_0x23)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*out call=False index=False args=["'out'"]*/
                                    const _0x24_out = await indentifire.access(scope, 'out')
                                    const _0x25 = await indentifire.concat(_0x24_out, "buzz")
                                    /*out call=True index=False args=["'out'", '_0x25']*/
                                    const _0x26_out = await indentifire.access(scope, 'out', _0x25)
                                    _0x26_out
                                }
                            } }
                        /*out call=False index=False args=["'out'"]*/
                        const _0x27_out = await indentifire.access(scope, 'out')
                        const _0x28 = await indentifire.eq(_0x27_out, "")
                        if (_0x28)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*i call=False index=False args=["'i'"]*/
                                    const _0x29_i = await indentifire.access(scope, 'i')
                                    /*out call=True index=False args=["'out'", '_0x29_i']*/
                                    const _0x2a_out = await indentifire.access(scope, 'out', _0x29_i)
                                    _0x2a_out
                                }
                            } }
                        /*out call=False index=False args=["'out'"]*/
                        const _0x2b_out = await indentifire.access(scope, 'out')
                        const _0x2c = await indentifire.log(_0x2b_out)
                        _0x2c
                        /*i call=False index=False args=["'i'"]*/
                        const _0x2d_i = await indentifire.access(scope, 'i')
                        const _0x2e = await indentifire.add(_0x2d_i, 1)
                        /*i call=True index=False args=["'i'", '_0x2e']*/
                        const _0x2f_i = await indentifire.access(scope, 'i', _0x2e)
                        _0x2f_i
                    }
                } }
        }
    } 
})();
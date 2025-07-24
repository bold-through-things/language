indentifire = {
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
    async call_or_set(obj, field, ...values) {
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

    /**
     * Gets a value from an object by field. If it's a function, calls it with `obj` as `this` and returns the result.
     * Supports `async` methods.
     *
     * @param {object} obj - The target object.
     * @param {string|symbol} field - The field name or symbol to access.
     * @returns {Promise<unknown>} The result of the method call or the field value.
     */
    async get_or_call(obj, field) {
        const value = obj[field];

        if (typeof value === 'function') {
            return await value.call(obj);
        } else {
            return value;
        }
    },

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
    }
}

if (typeof window === "undefined") {
    require("readline")
    const readline = require('readline');

    indentifire.prompt = async function (msg) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let rv = await new Promise(resolve => rl.question(msg, resolve))
        rl.close();
        return rv;
    }

    const fs = require("fs")
    let stdin_cached = null
    // TODO. this builtin really just for "hello world" debugging. in future we should have a full scale pipes API.
    indentifire.stdin = async function () {
        if (stdin_cached == null) {
            stdin_cached = await new Promise((resolve, reject) => fs.readFile(0, 'utf-8', (err, data) => err ? reject(err) : resolve(data)))
        }
        return stdin_cached;
    }

    indentifire.is_tty = () => process.stdin.isTTY
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = indentifire.scope(parent_scope)

            scope.lines = indentifire.store()
            const _0x0 = await indentifire.stdin()
            const _0x1 = await indentifire.call_or_set(scope, 'lines', _0x0)
            _0x1
            /*lines call=False index=False args=["'lines'"]*/
            const _0x2_lines = await indentifire.get_or_call(scope, 'lines')
            /*split call=True index=False args=["'split'", '"\\n"']*/
            const _0x3_split = await indentifire.call_or_set(_0x2_lines, 'split', "\n")
            /*lines call=True index=False args=["'lines'", '_0x3_split']*/
            const _0x4_lines = await indentifire.call_or_set(scope, 'lines', _0x3_split)
            _0x4_lines
            scope.i = indentifire.store()
            const _0x5 = await indentifire.call_or_set(scope, 'i', 0)
            _0x5
            scope.header = indentifire.store()
            const _0x6 = await indentifire.call_or_set(scope, 'header', [])
            _0x6
            scope.rows = indentifire.store()
            const _0x7 = await indentifire.call_or_set(scope, 'rows', [])
            _0x7
            /*lines call=False index=False args=["'lines'"]*/
            const _0x8_lines = await indentifire.get_or_call(scope, 'lines')

            const _0x9 = _0x8_lines[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x9.next();
                    if (done) break;
                    scope.line = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*i call=False index=False args=["'i'"]*/
                        const _0xa_i = await indentifire.get_or_call(scope, 'i')
                        const _0xb = await indentifire.eq(_0xa_i, 0)
                        if (_0xb)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*line call=False index=False args=["'line'"]*/
                                    const _0xc_line = await indentifire.get_or_call(scope, 'line')
                                    /*split call=True index=False args=["'split'", '","']*/
                                    const _0xd_split = await indentifire.call_or_set(_0xc_line, 'split', ",")
                                    /*header call=True index=False args=["'header'", '_0xd_split']*/
                                    const _0xe_header = await indentifire.call_or_set(scope, 'header', _0xd_split)
                                    _0xe_header
                                }
                            } }

                        else {
                            const parent_scope = scope
                            {
                                const scope = indentifire.scope(parent_scope)
                                scope.zip = indentifire.store()
                                /*header call=False index=False args=["'header'"]*/
                                const _0xf_header = await indentifire.get_or_call(scope, 'header')
                                /*line call=False index=False args=["'line'"]*/
                                const _0x10_line = await indentifire.get_or_call(scope, 'line')
                                /*split call=True index=False args=["'split'", '","']*/
                                const _0x11_split = await indentifire.call_or_set(_0x10_line, 'split', ",")
                                const _0x12 = await indentifire.zip(_0xf_header, _0x11_split)
                                const _0x13 = await indentifire.call_or_set(scope, 'zip', _0x12)
                                _0x13
                                scope.row = indentifire.store()
                                const _0x14 = await indentifire.call_or_set(scope, 'row', {})
                                _0x14
                                /*zip call=False index=False args=["'zip'"]*/
                                const _0x15_zip = await indentifire.get_or_call(scope, 'zip')

                                const _0x16 = _0x15_zip[Symbol.iterator]();
                                while (true) {
                                    {
                                        const { value, done } = _0x16.next();
                                        if (done) break;
                                        scope.kv = value;
                                    }
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = indentifire.scope(parent_scope)
                                            /*kv call=False index=False args=["'kv'"]*/
                                            const _0x17_kv = await indentifire.get_or_call(scope, 'kv')
                                            /*0 call=False index=False args=["'0'"]*/
                                            const _0x18_0 = await indentifire.get_or_call(_0x17_kv, '0')
                                            /*row call=False index=False args=["'row'"]*/
                                            const _0x19_row = await indentifire.get_or_call(scope, 'row')
                                            /*kv call=False index=False args=["'kv'"]*/
                                            const _0x1a_kv = await indentifire.get_or_call(scope, 'kv')
                                            /*1 call=False index=False args=["'1'"]*/
                                            const _0x1b_1 = await indentifire.get_or_call(_0x1a_kv, '1')
                                            /*key call=True index=True args=['_0x18_0', '_0x1b_1']*/
                                            const _0x1c_key = await indentifire.call_or_set(_0x19_row, _0x18_0, _0x1b_1)
                                            _0x1c_key
                                        }
                                    } }

                                /*rows call=False index=False args=["'rows'"]*/
                                const _0x1d_rows = await indentifire.get_or_call(scope, 'rows')
                                /*row call=False index=False args=["'row'"]*/
                                const _0x1e_row = await indentifire.get_or_call(scope, 'row')
                                /*push call=True index=False args=["'push'", '_0x1e_row']*/
                                const _0x1f_push = await indentifire.call_or_set(_0x1d_rows, 'push', _0x1e_row)
                                _0x1f_push
                            }
                        } 
                        /*i call=False index=False args=["'i'"]*/
                        const _0x20_i = await indentifire.get_or_call(scope, 'i')
                        const _0x21 = await indentifire.add(_0x20_i, 1)
                        /*i call=True index=False args=["'i'", '_0x21']*/
                        const _0x22_i = await indentifire.call_or_set(scope, 'i', _0x21)
                        _0x22_i
                    }
                } }

            /*rows call=False index=False args=["'rows'"]*/
            const _0x23_rows = await indentifire.get_or_call(scope, 'rows')

            const _0x24 = _0x23_rows[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x24.next();
                    if (done) break;
                    scope.row = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*row call=False index=False args=["'row'"]*/
                        const _0x25_row = await indentifire.get_or_call(scope, 'row')
                        /*name call=False index=False args=["'name'"]*/
                        const _0x26_name = await indentifire.get_or_call(_0x25_row, 'name')
                        const _0x27 = await indentifire.log(_0x26_name)
                        _0x27
                    }
                } }

            scope.age_over_30 = indentifire.store()
            const _0x28 = await indentifire.call_or_set(scope, 'age_over_30', 0)
            _0x28
            /*rows call=False index=False args=["'rows'"]*/
            const _0x29_rows = await indentifire.get_or_call(scope, 'rows')

            const _0x2a = _0x29_rows[Symbol.iterator]();
            while (true) {
                {
                    const { value, done } = _0x2a.next();
                    if (done) break;
                    scope.row = value;
                }
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        /*row call=False index=False args=["'row'"]*/
                        const _0x2b_row = await indentifire.get_or_call(scope, 'row')
                        /*age call=False index=False args=["'age'"]*/
                        const _0x2c_age = await indentifire.get_or_call(_0x2b_row, 'age')
                        const _0x2d = await indentifire.asc(_0x2c_age, 30)
                        if (_0x2d)
                        {{
                                const parent_scope = scope
                                {
                                    const scope = indentifire.scope(parent_scope)
                                    /*age_over_30 call=False index=False args=["'age_over_30'"]*/
                                    const _0x2e_age_over_30 = await indentifire.get_or_call(scope, 'age_over_30')
                                    const _0x2f = await indentifire.add(_0x2e_age_over_30, 1)
                                    /*age_over_30 call=True index=False args=["'age_over_30'", '_0x2f']*/
                                    const _0x30_age_over_30 = await indentifire.call_or_set(scope, 'age_over_30', _0x2f)
                                    _0x30_age_over_30
                                }
                            } }

                    }
                } }

            /*age_over_30 call=False index=False args=["'age_over_30'"]*/
            const _0x31_age_over_30 = await indentifire.get_or_call(scope, 'age_over_30')
            const _0x32 = await indentifire.log(_0x31_age_over_30)
            _0x32
        }
    } 
})();
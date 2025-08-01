globalThis.indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum + a, ""),
    eq: (...arr) => arr.every(v => v === arr[0]),
    any: (...arr) => arr.reduce((sum, a) => sum || a, false),
    all: (...arr) => arr.reduce((sum, a) => sum && a, true),
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



            let my_number = 42
            my_number

            let my_string = "hello world"
            my_string

            let my_scary_string = "error!"
            my_scary_string
            let my_string_with_quotes = "hello there world"
            my_string_with_quotes
            let new_years = "level up"
            new_years

            let multiline_text = "this is a multiline string\neach indented line becomes part of the string\njoined with newlines"
            multiline_text

            let my_true = true
            my_true
            let my_false = false
            my_false
            let my_dict = {}
            my_dict
            let my_list = []
            my_list


            let name = "alice"
            name

            const _0x18__name = await name
            let _0x0__name = _0x18__name
            const _0x19__await_indentifire_0x2e_concat_0x28_ = await indentifire.concat("hello ", _0x0__name)
            let greeting = _0x19__await_indentifire_0x2e_concat_0x28_
            greeting

            const _0x1a__await_indentifire_0x2e_log_0x28_ = await indentifire.log("hello world")
            _0x1a__await_indentifire_0x2e_log_0x28_
            const _0x1b__my_scary_string = await my_scary_string
            let _0x1__my_scary_string = _0x1b__my_scary_string
            const _0x1c__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x1__my_scary_string)
            _0x1c__await_indentifire_0x2e_log_0x28_
            const _0x1d__my_string_with_quotes = await my_string_with_quotes
            let _0x2__my_string_with_quotes = _0x1d__my_string_with_quotes
            const _0x1e__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x2__my_string_with_quotes)
            _0x1e__await_indentifire_0x2e_log_0x28_
            const _0x1f__new_years = await new_years
            let _0x3__new_years = _0x1f__new_years
            const _0x20__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x3__new_years)
            _0x20__await_indentifire_0x2e_log_0x28_
            const _0x21__greeting = await greeting
            let _0x4__greeting = _0x21__greeting
            const _0x22__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4__greeting)
            _0x22__await_indentifire_0x2e_log_0x28_

            const _0x23__my_number = await my_number
            let _0x5__my_number = _0x23__my_number
            const _0x24__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x5__my_number, 42)
            if (_0x24__await_indentifire_0x2e_eq_0x28_) {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x25__await_indentifire_0x2e_log_0x28_ = await indentifire.log("number is 42")
                        _0x25__await_indentifire_0x2e_log_0x28_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    const _0x26__await_indentifire_0x2e_log_0x28_ = await indentifire.log("number is not 42")
                    _0x26__await_indentifire_0x2e_log_0x28_
                }
            } 


            let numbers = []
            numbers
            const _0x27__numbers = await numbers
            let _0x6__numbers = _0x27__numbers

            const _0x28__iter = _0x6__numbers[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x28__iter.next();
                if (done) { break; }
                let num = value;
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x29__num = await num
                        let _0x7__num = _0x29__num
                        const _0x2a__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x7__num)
                        _0x2a__await_indentifire_0x2e_log_0x28_
                    }
                } }

            let person = {}
            person

            const _0x2b__person = await person
            let _0x8__person = _0x2b__person

            _0x8__person["name"] = "bob"
            const _0x2c___0x8__person = await _0x8__person["name"]
            let _0x9__key = _0x2c___0x8__person
            _0x9__key

            const _0x2d__person = await person
            let _0xa__person = _0x2d__person

            _0xa__person["age"] = 30
            const _0x2e___0xa__person = await _0xa__person["age"]
            let _0xb__data_we_would_like_to_store = _0x2e___0xa__person
            _0xb__data_we_would_like_to_store

            const _0x2f__person = await person
            let _0xc__person = _0x2f__person
            const _0x30___0xc__person = await _0xc__person["name"]
            let _0xd__key = _0x30___0xc__person
            const _0x31__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0xd__key)
            _0x31__await_indentifire_0x2e_log_0x28_

            let text = "hello world"
            text

            const _0x32__text = await text
            let _0xe__text = _0x32__text
            const _0x34___0xe__text = await _0xe__text
            const _0x33__split = await String.prototype.split.call(_0x34___0xe__text, " ")
            let _0xf__split = _0x33__split
            let words = _0xf__split
            words
            const _0x35__words = await words
            let _0x10__words = _0x35__words
            const _0x36__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x10__words)
            _0x36__await_indentifire_0x2e_log_0x28_

            const _0x37__words = await words
            let _0x11__words = _0x37__words
            const _0x39___0x11__words = await _0x11__words
            const _0x38__join = await Array.prototype.join.call(_0x39___0x11__words, "-")
            let _0x12__join = _0x38__join
            let rejoined = _0x12__join
            rejoined
            const _0x3a__rejoined = await rejoined
            let _0x13__rejoined = _0x3a__rejoined
            const _0x3b__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x13__rejoined)
            _0x3b__await_indentifire_0x2e_log_0x28_

            let word = "hello"
            word
            const _0x3c__word = await word
            let _0x14__word = _0x3c__word
            const _0x3e___0x14__word = await _0x14__word
            const _0x3d__split = await String.prototype.split.call(_0x3e___0x14__word, "")
            let _0x15__split = _0x3d__split
            const _0x40___0x15__split = await _0x15__split
            const _0x3f__sort = await Array.prototype.sort.call(_0x40___0x15__split)
            let _0x16__sort = _0x3f__sort
            const _0x42___0x16__sort = await _0x16__sort
            const _0x41__join = await Array.prototype.join.call(_0x42___0x16__sort, "")
            let _0x17__join = _0x41__join
            let key = _0x17__join
            key


            const _0x43__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(5, 5)
            const _0x44__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x43__await_indentifire_0x2e_eq_0x28_)
            _0x44__await_indentifire_0x2e_log_0x28_
            const _0x45__await_indentifire_0x2e_asc_0x28_ = await indentifire.asc(3, 5)
            const _0x46__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x45__await_indentifire_0x2e_asc_0x28_)
            _0x46__await_indentifire_0x2e_log_0x28_

            const _0x47__await_indentifire_0x2e_add_0x28_ = await indentifire.add(10, 5)
            const _0x48__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x47__await_indentifire_0x2e_add_0x28_)
            _0x48__await_indentifire_0x2e_log_0x28_
            const _0x49__await_indentifire_0x2e_mod_0x28_ = await indentifire.mod(10, 3)
            const _0x4a__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x49__await_indentifire_0x2e_mod_0x28_)
            _0x4a__await_indentifire_0x2e_log_0x28_

            const _0x4b__await_indentifire_0x2e_all_0x28_ = await indentifire.all(true, false)
            const _0x4c__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4b__await_indentifire_0x2e_all_0x28_)
            _0x4c__await_indentifire_0x2e_log_0x28_
            const _0x4d__await_indentifire_0x2e_any_0x28_ = await indentifire.any(true, false)
            const _0x4e__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4d__await_indentifire_0x2e_any_0x28_)
            _0x4e__await_indentifire_0x2e_log_0x28_
            const _0x4f__await_indentifire_0x2e_none_0x28_ = await indentifire.none(false)
            const _0x50__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4f__await_indentifire_0x2e_none_0x28_)
            _0x50__await_indentifire_0x2e_log_0x28_

            const _0x51__await_indentifire_0x2e_log_0x28_ = await indentifire.log("documentation complete - all language features demonstrated")
            _0x51__await_indentifire_0x2e_log_0x28_
        }
    } 
})();
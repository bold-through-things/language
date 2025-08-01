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


            let my_scary_string = "error"
            my_scary_string
            let my_string_with_quotes = "hello \"world\""
            my_string_with_quotes


            let multiline_text = "this is a multiline string\neach indented line becomes part of the string\njoined with newlines"
            multiline_text

            const _0x23__multiline_text = await multiline_text
            let _0x0__multiline_text = _0x23__multiline_text
            const _0x24__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x0__multiline_text)
            _0x24__await_indentifire_0x2e_log_0x28_

            let my_true = true
            my_true
            let my_false = false
            my_false
            let my_dict = {}
            my_dict
            let my_list = []
            my_list

            const _0x25__my_true = await my_true
            let _0x1__my_true = _0x25__my_true
            const _0x26__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x1__my_true)
            _0x26__await_indentifire_0x2e_log_0x28_
            const _0x27__my_false = await my_false
            let _0x2__my_false = _0x27__my_false
            const _0x28__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x2__my_false)
            _0x28__await_indentifire_0x2e_log_0x28_


            let name = "alice"
            name


            const _0x29__name = await name
            let _0x3__name = _0x29__name
            const _0x2a__await_indentifire_0x2e_concat_0x28_ = await indentifire.concat("hello ", _0x3__name)
            let greeting = _0x2a__await_indentifire_0x2e_concat_0x28_
            greeting


            const _0x2b__await_indentifire_0x2e_log_0x28_ = await indentifire.log("this will be", "concatenated with spaces i think", "as it is just an alias for Deno console.log")
            _0x2b__await_indentifire_0x2e_log_0x28_

            const _0x2c__my_scary_string = await my_scary_string
            let _0x4__my_scary_string = _0x2c__my_scary_string
            const _0x2d__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x4__my_scary_string)
            _0x2d__await_indentifire_0x2e_log_0x28_
            const _0x2e__my_string_with_quotes = await my_string_with_quotes
            let _0x5__my_string_with_quotes = _0x2e__my_string_with_quotes
            const _0x2f__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x5__my_string_with_quotes)
            _0x2f__await_indentifire_0x2e_log_0x28_
            const _0x30__await_indentifire_0x2e_log_0x28_ = await indentifire.log("new year's ", "eve")
            _0x30__await_indentifire_0x2e_log_0x28_

            const _0x31__greeting = await greeting
            let _0x6__greeting = _0x31__greeting
            const _0x32__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x6__greeting)
            _0x32__await_indentifire_0x2e_log_0x28_

            const _0x33__my_number = await my_number
            let _0x7__my_number = _0x33__my_number
            const _0x34__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(_0x7__my_number, 42)
            if (_0x34__await_indentifire_0x2e_eq_0x28_) {{
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x35__await_indentifire_0x2e_log_0x28_ = await indentifire.log("number is 42")
                        _0x35__await_indentifire_0x2e_log_0x28_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = indentifire.scope(parent_scope)
                    const _0x36__await_indentifire_0x2e_log_0x28_ = await indentifire.log("number is not 42")
                    _0x36__await_indentifire_0x2e_log_0x28_
                }
            } 


            let numbers = [1, 2, 3]
            numbers

            const _0x37__numbers = await numbers
            let _0x8__numbers = _0x37__numbers

            const _0x38__iter = _0x8__numbers[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x38__iter.next();
                if (done) { break; }
                let num = value;
                {
                    const parent_scope = scope
                    {
                        const scope = indentifire.scope(parent_scope)
                        const _0x39__num = await num
                        let _0x9__num = _0x39__num
                        const _0x3a__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x9__num)
                        _0x3a__await_indentifire_0x2e_log_0x28_
                    }
                } }


            let person = {}
            person


            const _0x3b__person = await person
            let _0xa__person = _0x3b__person

            _0xa__person["name"] = "bob"
            const _0x3c___0xa__person = await _0xa__person["name"]
            let _0xb__key = _0x3c___0xa__person
            _0xb__key


            const _0x3d__person = await person
            let _0xc__person = _0x3d__person

            _0xc__person["age"] = 30
            const _0x3e___0xc__person = await _0xc__person["age"]
            let _0xd__data_we_would_like_to_store = _0x3e___0xc__person
            _0xd__data_we_would_like_to_store


            const _0x3f__person = await person
            let _0xe__person = _0x3f__person
            const _0x40___0xe__person = await _0xe__person["name"]
            let _0xf__key = _0x40___0xe__person
            const _0x41__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0xf__key)
            _0x41__await_indentifire_0x2e_log_0x28_
            const _0x42__person = await person
            let _0x10__person = _0x42__person
            const _0x43___0x10__person = await _0x10__person["age"]
            let _0x11__data_we_would_like_to_store = _0x43___0x10__person
            const _0x44__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x11__data_we_would_like_to_store)
            _0x44__await_indentifire_0x2e_log_0x28_


            let text = "hello world"
            text

            const _0x45__text = await text
            let _0x12__text = _0x45__text
            const _0x47___0x12__text = await _0x12__text
            const _0x46__split = await String.prototype.split.call(_0x47___0x12__text, " ")
            let _0x13__split = _0x46__split
            let words = _0x13__split
            words
            const _0x48__words = await words
            let _0x14__words = _0x48__words
            const _0x49__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x14__words)
            _0x49__await_indentifire_0x2e_log_0x28_


            const _0x4a__words = await words
            let _0x15__words = _0x4a__words
            const _0x4c___0x15__words = await _0x15__words
            const _0x4b__join = await Array.prototype.join.call(_0x4c___0x15__words, "-")
            let _0x16__join = _0x4b__join
            let rejoined = _0x16__join
            rejoined
            const _0x4d__rejoined = await rejoined
            let _0x17__rejoined = _0x4d__rejoined
            const _0x4e__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x17__rejoined)
            _0x4e__await_indentifire_0x2e_log_0x28_


            let input_with_spaces = "a  b   c"
            input_with_spaces
            const _0x4f__input_with_spaces = await input_with_spaces
            let _0x18__input_with_spaces = _0x4f__input_with_spaces
            const _0x51___0x18__input_with_spaces = await _0x18__input_with_spaces
            const _0x50__split = await String.prototype.split.call(_0x51___0x18__input_with_spaces, /\s+/)
            let _0x19__split = _0x50__split
            let regex_words = _0x19__split
            regex_words
            const _0x52__regex_words = await regex_words
            let _0x1a__regex_words = _0x52__regex_words
            const _0x53__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x1a__regex_words)
            _0x53__await_indentifire_0x2e_log_0x28_


            let word = "hello"
            word
            const _0x54__word = await word
            let _0x1b__word = _0x54__word
            const _0x56___0x1b__word = await _0x1b__word
            const _0x55__split = await String.prototype.split.call(_0x56___0x1b__word, "")
            let _0x1c__split = _0x55__split
            const _0x58___0x1c__split = await _0x1c__split
            const _0x57__sort = await Array.prototype.sort.call(_0x58___0x1c__split)
            let _0x1d__sort = _0x57__sort
            const _0x5a___0x1d__sort = await _0x1d__sort
            const _0x59__join = await Array.prototype.join.call(_0x5a___0x1d__sort, "")
            let _0x1e__join = _0x59__join
            let key = _0x1e__join
            key
            const _0x5b__key = await key
            let _0x1f__key = _0x5b__key
            const _0x5c__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x1f__key)
            _0x5c__await_indentifire_0x2e_log_0x28_



            const _0x5d__await_indentifire_0x2e_eq_0x28_ = await indentifire.eq(5, 5)
            const _0x5e__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x5d__await_indentifire_0x2e_eq_0x28_)
            _0x5e__await_indentifire_0x2e_log_0x28_
            const _0x5f__await_indentifire_0x2e_asc_0x28_ = await indentifire.asc(3, 5)
            const _0x60__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x5f__await_indentifire_0x2e_asc_0x28_)
            _0x60__await_indentifire_0x2e_log_0x28_


            const _0x61__await_indentifire_0x2e_add_0x28_ = await indentifire.add(10, 5)
            const _0x62__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x61__await_indentifire_0x2e_add_0x28_)
            _0x62__await_indentifire_0x2e_log_0x28_
            const _0x63__await_indentifire_0x2e_mod_0x28_ = await indentifire.mod(10, 3)
            const _0x64__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x63__await_indentifire_0x2e_mod_0x28_)
            _0x64__await_indentifire_0x2e_log_0x28_


            const _0x65__await_indentifire_0x2e_all_0x28_ = await indentifire.all(true, false)
            const _0x66__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x65__await_indentifire_0x2e_all_0x28_)
            _0x66__await_indentifire_0x2e_log_0x28_
            const _0x67__await_indentifire_0x2e_any_0x28_ = await indentifire.any(true, false)
            const _0x68__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x67__await_indentifire_0x2e_any_0x28_)
            _0x68__await_indentifire_0x2e_log_0x28_
            const _0x69__await_indentifire_0x2e_none_0x28_ = await indentifire.none(false)
            const _0x6a__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x69__await_indentifire_0x2e_none_0x28_)
            _0x6a__await_indentifire_0x2e_log_0x28_



            let typed_number = 42
            typed_number
            let typed_string = "hello"
            typed_string

            const _0x6b__typed_number = await typed_number
            let _0x20__typed_number = _0x6b__typed_number
            let another_number = _0x20__typed_number
            another_number

            const _0x6c__typed_number = await typed_number
            let _0x21__typed_number = _0x6c__typed_number
            const _0x6d__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x21__typed_number)
            _0x6d__await_indentifire_0x2e_log_0x28_
            const _0x6e__typed_string = await typed_string
            let _0x22__typed_string = _0x6e__typed_string
            const _0x6f__await_indentifire_0x2e_log_0x28_ = await indentifire.log(_0x22__typed_string)
            _0x6f__await_indentifire_0x2e_log_0x28_

        }
    } 
})();
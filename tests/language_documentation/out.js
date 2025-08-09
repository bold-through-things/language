globalThis._67lang = {
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

    _67lang.prompt = async function (msg) {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) return "";
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



            const _0x52_await__67lang_dot_log_lp_ = await _67lang.log("hello world")
            _0x52_await__67lang_dot_log_lp_

            const _0x53_await__67lang_dot_log_lp_ = await _67lang.log("\"hello world\" is a fucking stupid non argument.")
            _0x53_await__67lang_dot_log_lp_


            const _0x54_concat = await ("new year's " + "eve")
            let _0x0_concat = _0x54_concat
            const _0x55_await__67lang_dot_eq_lp_ = await _67lang.eq("new year's eve", _0x0_concat)
            const _0x56_concat = await ("a very " + "scary " + "error")
            let _0x1_concat = _0x56_concat
            const _0x57_await__67lang_dot_eq_lp_ = await _67lang.eq("a very scary error", _0x1_concat)
            const _0x58_await__67lang_dot_concat_lp_ = await _67lang.concat("your regex", " should be stored into the ", "regex", " variable.")
            const _0x59_await__67lang_dot_eq_lp_ = await _67lang.eq("your regex should be stored into the regex variable.", _0x58_await__67lang_dot_concat_lp_)
            const _0x5a_await__67lang_dot_all_lp_ = await _67lang.all(_0x55_await__67lang_dot_eq_lp_, _0x57_await__67lang_dot_eq_lp_, _0x59_await__67lang_dot_eq_lp_)
            const _0x5b_await__67lang_dot_log_lp_ = await _67lang.log("this literally cannot be true... yet it is: ", _0x5a_await__67lang_dot_all_lp_)
            _0x5b_await__67lang_dot_log_lp_

            const _0x5c_await__67lang_dot_log_lp_ = await _67lang.log("just write the newlines naturally and \nthey will appear in the output, meaning\nwhat you see is what you get.")
            _0x5c_await__67lang_dot_log_lp_


            const _0x5d_await__67lang_dot_add_lp_ = await _67lang.add(2, 0, 2)
            const _0x5e_await__67lang_dot_log_lp_ = await _67lang.log(_0x5d_await__67lang_dot_add_lp_)
            _0x5e_await__67lang_dot_log_lp_
            const _0x5f_await__67lang_dot_asc_lp_ = await _67lang.asc(0, 1, 2)
            const _0x60_await__67lang_dot_log_lp_ = await _67lang.log(_0x5f_await__67lang_dot_asc_lp_)
            _0x60_await__67lang_dot_log_lp_


            let _0x2_age = 23
            _0x2_age
            let _0x3_age = _0x2_age
            const _0x61_await__67lang_dot_log_lp_ = await _67lang.log("my age is", _0x3_age)
            _0x61_await__67lang_dot_log_lp_

            _0x2_age = 25
            let _0x4_age = _0x2_age
            _0x4_age
            let _0x5_age = _0x2_age
            const _0x62_await__67lang_dot_log_lp_ = await _67lang.log("actually, i lied. my age is", _0x5_age)
            _0x62_await__67lang_dot_log_lp_

            let _0x6__0 = 0
            _0x6__0

            let _0x7__0 = _0x6__0
            const _0x63_await__67lang_dot_log_lp_ = await _67lang.log(_0x7__0)
            _0x63_await__67lang_dot_log_lp_

            _0x6__0 = 2347
            let _0x8__0 = _0x6__0
            _0x8__0
            let _0x9__0 = _0x6__0
            const _0x64_await__67lang_dot_log_lp_ = await _67lang.log(_0x9__0)
            _0x64_await__67lang_dot_log_lp_

            let _0xa_discord_dot__at_member_hash_hash = "#2347"
            _0xa_discord_dot__at_member_hash_hash
            let _0xb__67lang_dot__dollar_budget = 0
            _0xb__67lang_dot__dollar_budget
            let _0xc__lp_2347_rp_ = /(2347)/
            _0xc__lp_2347_rp_
            let _0xd__comma_ = true
            _0xd__comma_
            let _0xe__comma_ = _0xd__comma_
            const _0x65_await__67lang_dot_log_lp_ = await _67lang.log(_0xe__comma_)
            _0x65_await__67lang_dot_log_lp_


            let _0x13__0xf__comma_ = _0xd__comma_
            _0xd__comma_ = _0x13__0xf__comma_
            let _0x14__0x10__comma_ = _0xd__comma_
            _0xd__comma_ = _0x14__0x10__comma_
            let _0x12__comma_ = _0xd__comma_
            _0x12__comma_

            let _0x15__2347 = "wow, very helpful."
            _0x15__2347
            let _0x16__2347 = _0x15__2347
            const _0x66_split = await String.prototype.split.call(_0x16__2347, " ")
            let _0x17_split = _0x66_split
            const _0x67_sort = await Array.prototype.sort.call(_0x17_split)
            let _0x18_sort = _0x67_sort
            const _0x68_join = await Array.prototype.join.call(_0x18_sort, ", ")
            let _0x19_join = _0x68_join
            const _0x69_await__67lang_dot_log_lp_ = await _67lang.log(_0x19_join)
            _0x69_await__67lang_dot_log_lp_


            let _0x1a__67lang_dot_features = {}
            _0x1a__67lang_dot_features
            let _0x25__67lang_dot_features = _0x1a__67lang_dot_features

            _0x25__67lang_dot_features["the access macro"] = "noscope\nlocal _0x24_branching\neliminating the pain of using brackets and having to erase or insert the bracket\nat the beginning and then at the end inherently by being part of 67lang\nwhere indentation rules all."
            const _0x6a__0x25__67lang_dot_features = await _0x25__67lang_dot_features["the access macro"]
            let _0x26_name = _0x6a__0x25__67lang_dot_features
            _0x26_name

            let _0x31__67lang_dot_features = _0x1a__67lang_dot_features

            _0x31__67lang_dot_features["the flexibility of identifiers"] = "anything can be an identifier. there is only whitespace and non whitespace. this \nfrees programmers to express their ideas in a truly direct and unleashed way.\nif you desire to have a variable named `$`, `,`, `?`, or even `true`, we are\nnot here to stop you. if you are stupid, you will certainly misuse this and obliterate\nyour foot. if you are smart, you will write the most readable code ever written."
            const _0x6b__0x31__67lang_dot_features = await _0x31__67lang_dot_features["the flexibility of identifiers"]
            let _0x32_added = _0x6b__0x31__67lang_dot_features
            _0x32_added

            let _0x33__67lang_dot_features = _0x1a__67lang_dot_features
            const _0x6c__0x33__67lang_dot_features = await _0x33__67lang_dot_features["the flexibility of identifiers"]
            let _0x34_described = _0x6c__0x33__67lang_dot_features
            const _0x6d_slice = await Array.prototype.slice.call(_0x34_described, 0, 67)
            let _0x35_slice = _0x6d_slice
            const _0x6e_join = await Array.prototype.join.call(_0x35_slice, "")
            let _0x36_join = _0x6e_join
            const _0x6f_await__67lang_dot_log_lp_ = await _67lang.log(_0x36_join)
            _0x6f_await__67lang_dot_log_lp_


            if (true) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x70_await__67lang_dot_log_lp_ = await _67lang.log("big")
                        _0x70_await__67lang_dot_log_lp_
                    }
                } }

            if (false) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x71_await__67lang_dot_log_lp_ = await _67lang.log("big")
                        _0x71_await__67lang_dot_log_lp_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x72_await__67lang_dot_log_lp_ = await _67lang.log("my disappointment is immeasurable and my day is ruined.")
                    _0x72_await__67lang_dot_log_lp_
                }
            } 

            let _0x37_i_hate_this_trash_bang_ = ["Python? insufferable import semantics, no macros, optional correctness.", "Lisp? does not run on JS proper, insufferable syntax, indentation is demanded yet optional.", "Java? [statement removed due to violating Terms of Service]", "Nim? possibly the only one that has any chance, but at this point i'm tired of trying."]
            _0x37_i_hate_this_trash_bang_

            let _0x39__0x38_i_hate_this_trash_bang_ = _0x37_i_hate_this_trash_bang_

            const _0x73_iter = _0x39__0x38_i_hate_this_trash_bang_[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x73_iter.next();
                if (done) { break; }
                let angy = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x3a_angy = angy
                        const _0x74_await__67lang_dot_concat_lp_ = await _67lang.concat(_0x3a_angy, "!!!")
                        const _0x75_await__67lang_dot_log_lp_ = await _67lang.log(_0x74_await__67lang_dot_concat_lp_)
                        _0x75_await__67lang_dot_log_lp_
                    }
                } }


            let _0x3b_does_a_decent_programming_language_exist_q_ = false
            _0x3b_does_a_decent_programming_language_exist_q_
            while(true) {let _0x3c_does_a_decent_programming_language_exist_q_ = _0x3b_does_a_decent_programming_language_exist_q_
                if (!_0x3c_does_a_decent_programming_language_exist_q_) { break; }
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x76_await__67lang_dot_log_lp_ = await _67lang.log("code for quality software")
                        _0x76_await__67lang_dot_log_lp_
                    }
                } }


            const _0x77_await__67lang_dot_all_lp_ = await _67lang.all(true, true, false)
            const _0x78_await__67lang_dot_log_lp_ = await _67lang.log("false: ", _0x77_await__67lang_dot_all_lp_)
            _0x78_await__67lang_dot_log_lp_
            const _0x79_await__67lang_dot_any_lp_ = await _67lang.any(true, false, false)
            const _0x7a_await__67lang_dot_log_lp_ = await _67lang.log("true: ", _0x79_await__67lang_dot_any_lp_)
            _0x7a_await__67lang_dot_log_lp_
            const _0x7b_await__67lang_dot_none_lp_ = await _67lang.none(false, false, false)
            const _0x7c_await__67lang_dot_log_lp_ = await _67lang.log("true: ", _0x7b_await__67lang_dot_none_lp_)
            _0x7c_await__67lang_dot_log_lp_
            const _0x7d_await__67lang_dot_add_lp_ = await _67lang.add(1, 1, 1, 1, 1, 1)
            const _0x7e_await__67lang_dot_log_lp_ = await _67lang.log("6: ", _0x7d_await__67lang_dot_add_lp_)
            _0x7e_await__67lang_dot_log_lp_


            let _0x3f__2347 = 2347
            _0x3f__2347
            let _0x40_where_q_ = "not even in Nebraska."
            _0x40_where_q_






            const _0x4c_fuck_bang_ = async function (
                fucks_given, 
                TODO_i_cant_even_use_periods_in_this_param_name
            ) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        fucks_given = fucks_given
                        TODO_i_cant_even_use_periods_in_this_param_name = TODO_i_cant_even_use_periods_in_this_param_name
                        const _0x84_await__67lang_dot_log_lp_ = await _67lang.log("fuck!")
                        _0x84_await__67lang_dot_log_lp_
                        let _0x4d_fucks_given = fucks_given
                        const _0x85_await__67lang_dot_asc_lp_ = await _67lang.asc(0, _0x4d_fucks_given)
                        if (_0x85_await__67lang_dot_asc_lp_) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x50__0x4e_fucks_given = fucks_given
                                    const _0x87_await__67lang_dot_add_lp_ = await _67lang.add(_0x50__0x4e_fucks_given, -1)
                                    const _0x86_fuck_bang_ = await _0x4c_fuck_bang_(_0x87_await__67lang_dot_add_lp_, "TODO...")
                                    let _0x4f_fuck_bang_ = _0x86_fuck_bang_
                                    _0x4f_fuck_bang_
                                }
                            } }
                    }
                } }
            const _0x88_fuck_bang_ = await _0x4c_fuck_bang_(6, "TODO. the compiler code is garbage actually and assumes \nit's a local if you don't pass two arguments. horrible!\nshould be easy to fix! just check if it's a local or a function!")
            let _0x51_fuck_bang_ = _0x88_fuck_bang_
            _0x51_fuck_bang_



        }
    } 
})();
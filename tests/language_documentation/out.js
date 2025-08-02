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




            let age = 23
            age
            let pi_ish
            pi_ish

            let basic_text = "hello world"
            basic_text
            let text_with_quotes = "she said \"hello there\""
            text_with_quotes
            let different_delimiter = "even pipes work as delimiters"
            different_delimiter
            let fancy_delimiter = "anything can be a delimiter"
            fancy_delimiter

            const _0x37_basic_text = await basic_text
            let _0x0_basic_text = _0x37_basic_text
            const _0x38_await__67lang_dot_log_lp_ = await _67lang.log(_0x0_basic_text)
            _0x38_await__67lang_dot_log_lp_
            const _0x39_text_with_quotes = await text_with_quotes
            let _0x1_text_with_quotes = _0x39_text_with_quotes
            const _0x3a_await__67lang_dot_log_lp_ = await _67lang.log(_0x1_text_with_quotes)
            _0x3a_await__67lang_dot_log_lp_

            let poem = "roses are red\nviolets are blue  \n67lang is simple\nand powerful too"
            poem
            const _0x3b_poem = await poem
            let _0x2_poem = _0x3b_poem
            const _0x3c_await__67lang_dot_log_lp_ = await _67lang.log(_0x2_poem)
            _0x3c_await__67lang_dot_log_lp_

            let is_awesome = true
            is_awesome
            let is_complicated = false
            is_complicated
            const _0x3d_is_awesome = await is_awesome
            let _0x3_is_awesome = _0x3d_is_awesome
            const _0x3e_await__67lang_dot_log_lp_ = await _67lang.log("67lang is awesome:", _0x3_is_awesome)
            _0x3e_await__67lang_dot_log_lp_
            const _0x3f_is_complicated = await is_complicated
            let _0x4_is_complicated = _0x3f_is_complicated
            const _0x40_await__67lang_dot_log_lp_ = await _67lang.log("67lang is complicated:", _0x4_is_complicated)
            _0x40_await__67lang_dot_log_lp_

            let username = "alice"
            username
            let user_age = 25
            user_age

            const _0x41_username = await username
            let _0x5_username = _0x41_username
            const _0x42_user_age = await user_age
            let _0x6_user_age = _0x42_user_age
            const _0x43_await__67lang_dot_concat_lp_ = await _67lang.concat("hello there, ", _0x5_username, "! you are ", _0x6_user_age, " years old.")
            let greeting = _0x43_await__67lang_dot_concat_lp_
            greeting
            const _0x44_greeting = await greeting
            let _0x7_greeting = _0x44_greeting
            const _0x45_await__67lang_dot_log_lp_ = await _67lang.log(_0x7_greeting)
            _0x45_await__67lang_dot_log_lp_


            const _0x46_user_age = await user_age
            let _0x14_user_age = _0x46_user_age
            const _0x47_await__67lang_dot_eq_lp_ = await _67lang.eq(_0x14_user_age, 25)
            if (_0x47_await__67lang_dot_eq_lp_) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x48_await__67lang_dot_log_lp_ = await _67lang.log("you're exactly 25!")
                        _0x48_await__67lang_dot_log_lp_
                    }
                } }
            else {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    const _0x49_await__67lang_dot_log_lp_ = await _67lang.log("you're not 25")
                    _0x49_await__67lang_dot_log_lp_
                }
            } 


            let favorite_numbers = [7, 42  , 100]
            favorite_numbers
            const _0x4a_favorite_numbers = await favorite_numbers
            let _0x15_favorite_numbers = _0x4a_favorite_numbers

            const _0x4b_iter = _0x15_favorite_numbers[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x4b_iter.next();
                if (done) { break; }
                let number = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x4c_number = await number
                        let _0x16_number = _0x4c_number
                        const _0x4d_await__67lang_dot_log_lp_ = await _67lang.log("i like the number:", _0x16_number)
                        _0x4d_await__67lang_dot_log_lp_
                    }
                } }


            let person = {}
            person

            const _0x4e_person = await person
            let _0x17_person = _0x4e_person

            _0x17_person["name"] = "bob"
            const _0x4f__0x17_person = await _0x17_person["name"]
            let _0x18_key = _0x4f__0x17_person
            _0x18_key
            const _0x50_person = await person
            let _0x19_person = _0x50_person

            _0x19_person["profession"] = "software developer"
            const _0x51__0x19_person = await _0x19_person["profession"]
            let _0x1a_key = _0x51__0x19_person
            _0x1a_key
            const _0x52_person = await person
            let _0x1b_person = _0x52_person

            _0x1b_person["favorite_number"] = 42
            const _0x53__0x1b_person = await _0x1b_person["favorite_number"]
            let _0x1c_key = _0x53__0x1b_person
            _0x1c_key

            const _0x54_person = await person
            let _0x1d_person = _0x54_person
            const _0x55__0x1d_person = await _0x1d_person["name"]
            let _0x1e_key = _0x55__0x1d_person
            const _0x56_await__67lang_dot_log_lp_ = await _67lang.log("name:", _0x1e_key)
            _0x56_await__67lang_dot_log_lp_
            const _0x57_person = await person
            let _0x1f_person = _0x57_person
            const _0x58__0x1f_person = await _0x1f_person["profession"]
            let _0x20_key = _0x58__0x1f_person
            const _0x59_await__67lang_dot_log_lp_ = await _67lang.log("profession:", _0x20_key)
            _0x59_await__67lang_dot_log_lp_
            const _0x5a_person = await person
            let _0x21_person = _0x5a_person
            const _0x5b__0x21_person = await _0x21_person["favorite_number"]
            let _0x22_key = _0x5b__0x21_person
            const _0x5c_await__67lang_dot_log_lp_ = await _67lang.log("favorite number:", _0x22_key)
            _0x5c_await__67lang_dot_log_lp_

            let sentence = "the quick brown fox jumps"
            sentence

            const _0x5d_sentence = await sentence
            let _0x23_sentence = _0x5d_sentence
            const _0x5f__0x23_sentence = await _0x23_sentence
            const _0x5e_split = await String.prototype.split.call(_0x5f__0x23_sentence, " ")
            let _0x24_split = _0x5e_split
            let words = _0x24_split
            words
            const _0x60_words = await words
            let _0x25_words = _0x60_words
            const _0x61_await__67lang_dot_log_lp_ = await _67lang.log("words:", _0x25_words)
            _0x61_await__67lang_dot_log_lp_

            const _0x62_words = await words
            let _0x26_words = _0x62_words
            const _0x64__0x26_words = await _0x26_words
            const _0x63_join = await Array.prototype.join.call(_0x64__0x26_words, "-")
            let _0x27_join = _0x63_join
            let rejoined = _0x27_join
            rejoined
            const _0x65_rejoined = await rejoined
            let _0x28_rejoined = _0x65_rejoined
            const _0x66_await__67lang_dot_log_lp_ = await _67lang.log("rejoined:", _0x28_rejoined)
            _0x66_await__67lang_dot_log_lp_

            let messy_input = "word1    word2       word3"
            messy_input
            const _0x67_messy_input = await messy_input
            let _0x29_messy_input = _0x67_messy_input
            const _0x69__0x29_messy_input = await _0x29_messy_input
            const _0x68_split = await String.prototype.split.call(_0x69__0x29_messy_input, /\s+/)
            let _0x2a_split = _0x68_split
            let clean_words = _0x2a_split
            clean_words
            const _0x6a_clean_words = await clean_words
            let _0x2b_clean_words = _0x6a_clean_words
            const _0x6b_await__67lang_dot_log_lp_ = await _67lang.log("clean words:", _0x2b_clean_words)
            _0x6b_await__67lang_dot_log_lp_

            let word = "programming"
            word
            const _0x6c_word = await word
            let _0x2c_word = _0x6c_word
            const _0x6e__0x2c_word = await _0x2c_word
            const _0x6d_split = await String.prototype.split.call(_0x6e__0x2c_word, "")
            let _0x2d_split = _0x6d_split
            const _0x70__0x2d_split = await _0x2d_split
            const _0x6f_sort = await Array.prototype.sort.call(_0x70__0x2d_split)
            let _0x2e_sort = _0x6f_sort
            const _0x72__0x2e_sort = await _0x2e_sort
            const _0x71_join = await Array.prototype.join.call(_0x72__0x2e_sort, "")
            let _0x2f_join = _0x71_join
            let sorted_letters = _0x2f_join
            sorted_letters
            const _0x73_sorted_letters = await sorted_letters
            let _0x30_sorted_letters = _0x73_sorted_letters
            const _0x74_await__67lang_dot_log_lp_ = await _67lang.log("sorted letters:", _0x30_sorted_letters)
            _0x74_await__67lang_dot_log_lp_



            const _0x75_await__67lang_dot_eq_lp_ = await _67lang.eq(5, 5)
            const _0x76_await__67lang_dot_log_lp_ = await _67lang.log("are 5 and 5 equal?", _0x75_await__67lang_dot_eq_lp_)
            _0x76_await__67lang_dot_log_lp_
            const _0x77_await__67lang_dot_asc_lp_ = await _67lang.asc(3, 5)
            const _0x78_await__67lang_dot_log_lp_ = await _67lang.log("is 3 less than 5?", _0x77_await__67lang_dot_asc_lp_)
            _0x78_await__67lang_dot_log_lp_

            const _0x79_await__67lang_dot_add_lp_ = await _67lang.add(10, 5)
            const _0x7a_await__67lang_dot_log_lp_ = await _67lang.log("10 plus 5:", _0x79_await__67lang_dot_add_lp_)
            _0x7a_await__67lang_dot_log_lp_
            const _0x7b_await__67lang_dot_mod_lp_ = await _67lang.mod(10, 3)
            const _0x7c_await__67lang_dot_log_lp_ = await _67lang.log("10 mod 3:", _0x7b_await__67lang_dot_mod_lp_)
            _0x7c_await__67lang_dot_log_lp_

            const _0x7d_await__67lang_dot_all_lp_ = await _67lang.all(true, false)
            const _0x7e_await__67lang_dot_log_lp_ = await _67lang.log("all conditions true (true AND false):", _0x7d_await__67lang_dot_all_lp_)
            _0x7e_await__67lang_dot_log_lp_
            const _0x7f_await__67lang_dot_any_lp_ = await _67lang.any(true, false)
            const _0x80_await__67lang_dot_log_lp_ = await _67lang.log("any condition true (true OR false):", _0x7f_await__67lang_dot_any_lp_)
            _0x80_await__67lang_dot_log_lp_
            const _0x81_await__67lang_dot_none_lp_ = await _67lang.none(false)
            const _0x82_await__67lang_dot_log_lp_ = await _67lang.log("none of these are true (NOT false):", _0x81_await__67lang_dot_none_lp_)
            _0x82_await__67lang_dot_log_lp_


            let safe_number = 999
            safe_number
            let safe_text = "type-checked string"
            safe_text

            const _0x83_safe_number = await safe_number
            let _0x31_safe_number = _0x83_safe_number
            let another_safe_number = _0x31_safe_number
            another_safe_number
            const _0x84_safe_number = await safe_number
            let _0x32_safe_number = _0x84_safe_number
            const _0x85_await__67lang_dot_log_lp_ = await _67lang.log("safe number:", _0x32_safe_number)
            _0x85_await__67lang_dot_log_lp_
            const _0x86_safe_text = await safe_text
            let _0x33_safe_text = _0x86_safe_text
            const _0x87_await__67lang_dot_log_lp_ = await _67lang.log("safe text:", _0x33_safe_text)
            _0x87_await__67lang_dot_log_lp_
            const _0x88_another_safe_number = await another_safe_number
            let _0x34_another_safe_number = _0x88_another_safe_number
            const _0x89_await__67lang_dot_log_lp_ = await _67lang.log("copied number:", _0x34_another_safe_number)
            _0x89_await__67lang_dot_log_lp_







        }
    } 
})();
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
            const _0xb_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_input = _0xb_await__67lang_dot_stdin_lp_
            _0x0_inputconst _0xc_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            _0xc_await__67lang_dot_stdin_lp_
            let _0x1_words = "\n"
            _0x1_words"\n"
            let _0x2_count = {}
            _0x2_count{}
            let _0x3_words = _0x1_words

            const _0xd_iter = _0x3_words_0x1_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0xd_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x4_count = _0x2_count
                        let _0x4_count = _0x2_count
                        _0x4_count_0x2_count
                        let _0x6_word = word
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0xf__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0xf__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x10__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        const _0x11_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x10__0x7_count_0x9_wordword)
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x12__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x12__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x13__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        _0x4_count[_0x6_wordword] = _0x11_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x13__0x7_count_0x9_wordword
                        const _0xe__0x4_count = await _0x4_count[_0x6_wordword]
                        let _0x6_word = word
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x14__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x14__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x15__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        const _0x16_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x15__0x7_count_0x9_wordword)
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x17__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x17__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x18__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x5_key = _0xe__0x4_count_0x6_wordword_0x16_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x18__0x7_count_0x9_wordword
                        _0x5_keylet _0x6_word = word
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x1a__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x1a__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x1b__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        const _0x1c_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x1b__0x7_count_0x9_wordword)
                        let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x1d__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x1d__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x1e__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        _0x4_count[_0x6_wordword] = _0x1c_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x1e__0x7_count_0x9_wordword
                        const _0x19__0x4_count = await _0x4_count[_0x6_wordword]
                        _0x19__0x4_countlet _0x6_word = word
                        _0x6_wordwordlet _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        let _0x9_word = word
                        const _0x1f__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x1f__0x7_count_0x9_wordword
                        let _0x9_word = word
                        const _0x20__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        const _0x21_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x20__0x7_count_0x9_wordword)
                        _0x21_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
                        let _0x7_count = _0x2_count
                        _0x7_count_0x2_countlet _0x9_word = word
                        const _0x22__0x7_count = await _0x7_count[_0x9_wordword]
                        let _0x9_word = word
                        let _0x8_key = _0x22__0x7_count_0x9_wordword
                        _0x8_keylet _0x9_word = word
                        const _0x23__0x7_count = await _0x7_count[_0x9_wordword]
                        _0x23__0x7_countlet _0x9_word = word
                        _0x9_wordword
                    }
                } let _0x4_count = _0x2_count
                let _0x4_count = _0x2_count
                _0x4_count_0x2_countlet _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x25__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x25__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x26__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x27_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x26__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x28__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x28__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x29__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                _0x4_count[_0x6_wordword] = _0x27_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x29__0x7_count_0x9_wordword
                const _0x24__0x4_count = await _0x4_count[_0x6_wordword]
                let _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x2a__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x2a__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x2b__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x2c_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x2b__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x2d__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x2d__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x2e__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x5_key = _0x24__0x4_count_0x6_wordword_0x2c_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x2e__0x7_count_0x9_wordword
                _0x5_keylet _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x30__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x30__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x31__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x32_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x31__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x33__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x33__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x34__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                _0x4_count[_0x6_wordword] = _0x32_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x34__0x7_count_0x9_wordword
                const _0x2f__0x4_count = await _0x4_count[_0x6_wordword]
                _0x2f__0x4_countlet _0x6_word = word
                _0x6_wordwordlet _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x35__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x35__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x36__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x37_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x36__0x7_count_0x9_wordword)
                _0x37_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                _0x7_count_0x2_countlet _0x9_word = word
                const _0x38__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x38__0x7_count_0x9_wordword
                _0x8_keylet _0x9_word = word
                const _0x39__0x7_count = await _0x7_count[_0x9_wordword]
                _0x39__0x7_countlet _0x9_word = word
                _0x9_wordword}let _0x3_words = _0x1_words
            _0x3_words_0x1_words{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x4_count = _0x2_count
                    let _0x4_count = _0x2_count
                    _0x4_count_0x2_count
                    let _0x6_word = word
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x3b__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x3b__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x3c__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    const _0x3d_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x3c__0x7_count_0x9_wordword)
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x3e__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x3e__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x3f__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    _0x4_count[_0x6_wordword] = _0x3d_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x3f__0x7_count_0x9_wordword
                    const _0x3a__0x4_count = await _0x4_count[_0x6_wordword]
                    let _0x6_word = word
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x40__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x40__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x41__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    const _0x42_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x41__0x7_count_0x9_wordword)
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x43__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x43__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x44__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x5_key = _0x3a__0x4_count_0x6_wordword_0x42_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x44__0x7_count_0x9_wordword
                    _0x5_keylet _0x6_word = word
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x46__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x46__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x47__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    const _0x48_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x47__0x7_count_0x9_wordword)
                    let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x49__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x49__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x4a__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    _0x4_count[_0x6_wordword] = _0x48_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x4a__0x7_count_0x9_wordword
                    const _0x45__0x4_count = await _0x4_count[_0x6_wordword]
                    _0x45__0x4_countlet _0x6_word = word
                    _0x6_wordwordlet _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    let _0x9_word = word
                    const _0x4b__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x4b__0x7_count_0x9_wordword
                    let _0x9_word = word
                    const _0x4c__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    const _0x4d_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x4c__0x7_count_0x9_wordword)
                    _0x4d_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
                    let _0x7_count = _0x2_count
                    _0x7_count_0x2_countlet _0x9_word = word
                    const _0x4e__0x7_count = await _0x7_count[_0x9_wordword]
                    let _0x9_word = word
                    let _0x8_key = _0x4e__0x7_count_0x9_wordword
                    _0x8_keylet _0x9_word = word
                    const _0x4f__0x7_count = await _0x7_count[_0x9_wordword]
                    _0x4f__0x7_countlet _0x9_word = word
                    _0x9_wordword
                }
            } let _0x4_count = _0x2_count
            let _0x4_count = _0x2_count
            _0x4_count_0x2_countlet _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x51__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x51__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x52__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x53_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x52__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x54__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x54__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x55__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            _0x4_count[_0x6_wordword] = _0x53_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x55__0x7_count_0x9_wordword
            const _0x50__0x4_count = await _0x4_count[_0x6_wordword]
            let _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x56__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x56__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x57__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x58_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x57__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x59__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x59__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x5a__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x5_key = _0x50__0x4_count_0x6_wordword_0x58_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x5a__0x7_count_0x9_wordword
            _0x5_keylet _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x5c__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x5c__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x5d__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x5e_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x5d__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x5f__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x5f__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x60__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            _0x4_count[_0x6_wordword] = _0x5e_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x60__0x7_count_0x9_wordword
            const _0x5b__0x4_count = await _0x4_count[_0x6_wordword]
            _0x5b__0x4_countlet _0x6_word = word
            _0x6_wordwordlet _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x61__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x61__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x62__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x63_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x62__0x7_count_0x9_wordword)
            _0x63_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            _0x7_count_0x2_countlet _0x9_word = word
            const _0x64__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x64__0x7_count_0x9_wordword
            _0x8_keylet _0x9_word = word
            const _0x65__0x7_count = await _0x7_count[_0x9_wordword]
            _0x65__0x7_countlet _0x9_word = word
            _0x9_wordword
            let _0xa_count = _0x2_count
            const _0x66_await__67lang_dot_log_lp_ = await _67lang.log(_0xa_count_0x2_count)
            _0x66_await__67lang_dot_log_lp_let _0xa_count = _0x2_count
            _0xa_count_0x2_count
        }
    } const _0x67_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
    let _0x0_input = _0x67_await__67lang_dot_stdin_lp_
    _0x0_inputconst _0x68_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
    _0x68_await__67lang_dot_stdin_lp_let _0x1_words = "\n"
    _0x1_words"\n"let _0x2_count = {}
    _0x2_count{}let _0x3_words = _0x1_words

    const _0x69_iter = _0x3_words_0x1_words[Symbol.iterator]();
    while (true) {
        const { value, done } = _0x69_iter.next();
        if (done) { break; }
        let word = value;
        {
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                let _0x4_count = _0x2_count
                let _0x4_count = _0x2_count
                _0x4_count_0x2_count
                let _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x6b__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x6b__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x6c__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x6d_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x6c__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x6e__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x6e__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x6f__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                _0x4_count[_0x6_wordword] = _0x6d_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x6f__0x7_count_0x9_wordword
                const _0x6a__0x4_count = await _0x4_count[_0x6_wordword]
                let _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x70__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x70__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x71__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x72_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x71__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x73__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x73__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x74__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x5_key = _0x6a__0x4_count_0x6_wordword_0x72_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x74__0x7_count_0x9_wordword
                _0x5_keylet _0x6_word = word
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x76__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x76__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x77__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x78_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x77__0x7_count_0x9_wordword)
                let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x79__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x79__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x7a__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                _0x4_count[_0x6_wordword] = _0x78_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x7a__0x7_count_0x9_wordword
                const _0x75__0x4_count = await _0x4_count[_0x6_wordword]
                _0x75__0x4_countlet _0x6_word = word
                _0x6_wordwordlet _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                let _0x9_word = word
                const _0x7b__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x7b__0x7_count_0x9_wordword
                let _0x9_word = word
                const _0x7c__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                const _0x7d_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x7c__0x7_count_0x9_wordword)
                _0x7d_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
                let _0x7_count = _0x2_count
                _0x7_count_0x2_countlet _0x9_word = word
                const _0x7e__0x7_count = await _0x7_count[_0x9_wordword]
                let _0x9_word = word
                let _0x8_key = _0x7e__0x7_count_0x9_wordword
                _0x8_keylet _0x9_word = word
                const _0x7f__0x7_count = await _0x7_count[_0x9_wordword]
                _0x7f__0x7_countlet _0x9_word = word
                _0x9_wordword
            }
        } let _0x4_count = _0x2_count
        let _0x4_count = _0x2_count
        _0x4_count_0x2_countlet _0x6_word = word
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x81__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x81__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x82__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        const _0x83_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x82__0x7_count_0x9_wordword)
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x84__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x84__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x85__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        _0x4_count[_0x6_wordword] = _0x83_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x85__0x7_count_0x9_wordword
        const _0x80__0x4_count = await _0x4_count[_0x6_wordword]
        let _0x6_word = word
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x86__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x86__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x87__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        const _0x88_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x87__0x7_count_0x9_wordword)
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x89__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x89__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x8a__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x5_key = _0x80__0x4_count_0x6_wordword_0x88_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x8a__0x7_count_0x9_wordword
        _0x5_keylet _0x6_word = word
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x8c__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x8c__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x8d__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        const _0x8e_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x8d__0x7_count_0x9_wordword)
        let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x8f__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x8f__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x90__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        _0x4_count[_0x6_wordword] = _0x8e_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x90__0x7_count_0x9_wordword
        const _0x8b__0x4_count = await _0x4_count[_0x6_wordword]
        _0x8b__0x4_countlet _0x6_word = word
        _0x6_wordwordlet _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        let _0x9_word = word
        const _0x91__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x91__0x7_count_0x9_wordword
        let _0x9_word = word
        const _0x92__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        const _0x93_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x92__0x7_count_0x9_wordword)
        _0x93_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
        let _0x7_count = _0x2_count
        _0x7_count_0x2_countlet _0x9_word = word
        const _0x94__0x7_count = await _0x7_count[_0x9_wordword]
        let _0x9_word = word
        let _0x8_key = _0x94__0x7_count_0x9_wordword
        _0x8_keylet _0x9_word = word
        const _0x95__0x7_count = await _0x7_count[_0x9_wordword]
        _0x95__0x7_countlet _0x9_word = word
        _0x9_wordword}let _0x3_words = _0x1_words
    _0x3_words_0x1_words{
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x4_count = _0x2_count
            let _0x4_count = _0x2_count
            _0x4_count_0x2_count
            let _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x97__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x97__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x98__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x99_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x98__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x9a__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x9a__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x9b__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            _0x4_count[_0x6_wordword] = _0x99_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0x9b__0x7_count_0x9_wordword
            const _0x96__0x4_count = await _0x4_count[_0x6_wordword]
            let _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x9c__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x9c__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0x9d__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0x9e_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0x9d__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0x9f__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0x9f__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0xa0__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x5_key = _0x96__0x4_count_0x6_wordword_0x9e_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0xa0__0x7_count_0x9_wordword
            _0x5_keylet _0x6_word = word
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0xa2__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0xa2__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0xa3__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0xa4_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xa3__0x7_count_0x9_wordword)
            let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0xa5__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0xa5__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0xa6__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            _0x4_count[_0x6_wordword] = _0xa4_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0xa6__0x7_count_0x9_wordword
            const _0xa1__0x4_count = await _0x4_count[_0x6_wordword]
            _0xa1__0x4_countlet _0x6_word = word
            _0x6_wordwordlet _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            let _0x9_word = word
            const _0xa7__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0xa7__0x7_count_0x9_wordword
            let _0x9_word = word
            const _0xa8__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            const _0xa9_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xa8__0x7_count_0x9_wordword)
            _0xa9_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
            let _0x7_count = _0x2_count
            _0x7_count_0x2_countlet _0x9_word = word
            const _0xaa__0x7_count = await _0x7_count[_0x9_wordword]
            let _0x9_word = word
            let _0x8_key = _0xaa__0x7_count_0x9_wordword
            _0x8_keylet _0x9_word = word
            const _0xab__0x7_count = await _0x7_count[_0x9_wordword]
            _0xab__0x7_countlet _0x9_word = word
            _0x9_wordword
        }
    } let _0x4_count = _0x2_count
    let _0x4_count = _0x2_count
    _0x4_count_0x2_countlet _0x6_word = word
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xad__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xad__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xae__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    const _0xaf_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xae__0x7_count_0x9_wordword)
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xb0__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xb0__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xb1__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    _0x4_count[_0x6_wordword] = _0xaf_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0xb1__0x7_count_0x9_wordword
    const _0xac__0x4_count = await _0x4_count[_0x6_wordword]
    let _0x6_word = word
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xb2__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xb2__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xb3__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    const _0xb4_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xb3__0x7_count_0x9_wordword)
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xb5__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xb5__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xb6__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x5_key = _0xac__0x4_count_0x6_wordword_0xb4_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0xb6__0x7_count_0x9_wordword
    _0x5_keylet _0x6_word = word
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xb8__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xb8__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xb9__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    const _0xba_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xb9__0x7_count_0x9_wordword)
    let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xbb__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xbb__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xbc__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    _0x4_count[_0x6_wordword] = _0xba_await__67lang_dot_add_lp_1_0x7_count_0x2_count_0x8_key_0xbc__0x7_count_0x9_wordword
    const _0xb7__0x4_count = await _0x4_count[_0x6_wordword]
    _0xb7__0x4_countlet _0x6_word = word
    _0x6_wordwordlet _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    let _0x9_word = word
    const _0xbd__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xbd__0x7_count_0x9_wordword
    let _0x9_word = word
    const _0xbe__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    const _0xbf_await__67lang_dot_add_lp_ = await _67lang.add(1, _0x7_count_0x2_count, _0x8_key_0xbe__0x7_count_0x9_wordword)
    _0xbf_await__67lang_dot_add_lp_1let _0x7_count = _0x2_count
    let _0x7_count = _0x2_count
    _0x7_count_0x2_countlet _0x9_word = word
    const _0xc0__0x7_count = await _0x7_count[_0x9_wordword]
    let _0x9_word = word
    let _0x8_key = _0xc0__0x7_count_0x9_wordword
    _0x8_keylet _0x9_word = word
    const _0xc1__0x7_count = await _0x7_count[_0x9_wordword]
    _0xc1__0x7_countlet _0x9_word = word
    _0x9_wordwordlet _0xa_count = _0x2_count
    const _0xc2_await__67lang_dot_log_lp_ = await _67lang.log(_0xa_count_0x2_count)
    _0xc2_await__67lang_dot_log_lp_let _0xa_count = _0x2_count
    _0xa_count_0x2_count
})();
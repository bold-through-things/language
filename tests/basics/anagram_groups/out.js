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
            const _0x12_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            let _0x0_input = _0x12_await__67lang_dot_stdin_lp_
            _0x0_inputconst _0x13_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
            _0x13_await__67lang_dot_stdin_lp_
            let _0x1_words = "\n"
            _0x1_words"\n"
            let _0x2_groups = {}
            _0x2_groups{}
            let _0x3_words = _0x1_words

            const _0x14_iter = _0x3_words_0x1_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x14_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x4_key = """"
                        _0x4_key""""



                        let _0x6_groups = _0x2_groups
                        let _0x5_key = _0x4_key
                        const _0x15_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                        let _0x5_key = _0x4_key
                        let _0x6_groups = _0x2_groups
                        const _0x16_await__67lang_dot_none_lp_ = await _67lang.none(_0x15_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                        let _0x6_groups = _0x2_groups
                        let _0x5_key = _0x4_key
                        const _0x17_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                        let _0x5_key = _0x4_key
                        let _0x6_groups = _0x2_groups
                        if (_0x16_await__67lang_dot_none_lp__0x17_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x7_groups = _0x2_groups
                                    let _0x7_groups = _0x2_groups
                                    _0x7_groups_0x2_groups
                                    let _0x9_key = _0x4_key
                                    _0x7_groups[_0x9_key_0x4_key] = []
                                    const _0x18__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                    let _0x9_key = _0x4_key
                                    let _0x8_key = _0x18__0x7_groups_0x9_key_0x4_key[]
                                    _0x8_keylet _0x9_key = _0x4_key
                                    _0x7_groups[_0x9_key_0x4_key] = []
                                    const _0x19__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                    _0x19__0x7_groupslet _0x9_key = _0x4_key
                                    _0x9_key_0x4_key[]
                                }
                            } let _0x7_groups = _0x2_groups
                            let _0x7_groups = _0x2_groups
                            _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x1a__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            let _0x9_key = _0x4_key
                            let _0x8_key = _0x1a__0x7_groups_0x9_key_0x4_key[]
                            _0x8_keylet _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x1b__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            _0x1b__0x7_groupslet _0x9_key = _0x4_key
                            _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
                        let _0x5_key = _0x4_key
                        const _0x1c_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                        let _0x5_key = _0x4_key
                        let _0x6_groups = _0x2_groups
                        const _0x1d_await__67lang_dot_none_lp_ = await _67lang.none(_0x1c_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                        _0x1d_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
                        let _0x5_key = _0x4_key
                        const _0x1e_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                        _0x1e_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
                        _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
                        _0x6_groups_0x2_groups{
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                let _0x7_groups = _0x2_groups
                                let _0x7_groups = _0x2_groups
                                _0x7_groups_0x2_groups
                                let _0x9_key = _0x4_key
                                _0x7_groups[_0x9_key_0x4_key] = []
                                const _0x1f__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                let _0x9_key = _0x4_key
                                let _0x8_key = _0x1f__0x7_groups_0x9_key_0x4_key[]
                                _0x8_keylet _0x9_key = _0x4_key
                                _0x7_groups[_0x9_key_0x4_key] = []
                                const _0x20__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                _0x20__0x7_groupslet _0x9_key = _0x4_key
                                _0x9_key_0x4_key[]
                            }
                        } let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x21__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0x21__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x22__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0x22__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]
                        let _0xa_groups = _0x2_groups
                        let _0xc_key = _0x4_key
                        const _0x23__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                        let _0xc_key = _0x4_key
                        let _0xb_key = _0x23__0xa_groups_0xc_key_0x4_key
                        let _0xc_key = _0x4_key
                        const _0x24__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                        let _0xc_key = _0x4_key
                        let _0xa_groups = _0x2_groups
                        _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
                        const _0x25__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                        let _0xc_key = _0x4_key
                        let _0xb_key = _0x25__0xa_groups_0xc_key_0x4_key
                        _0xb_keylet _0xc_key = _0x4_key
                        const _0x26__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                        _0x26__0xa_groupslet _0xc_key = _0x4_key
                        _0xc_key_0x4_key
                        let _0xe_word = word
                        const _0x27_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                        let _0xe_word = word
                        let _0xd_push = _0x27_push_0xb_key_0xe_wordword
                        _0xd_pushlet _0xe_word = word
                        const _0x28_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                        _0x28_push_0xb_keylet _0xe_word = word
                        _0xe_wordword
                    }
                } let _0x4_key = """"
                _0x4_key""""let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x29_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                const _0x2a_await__67lang_dot_none_lp_ = await _67lang.none(_0x29_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x2b_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                if (_0x2a_await__67lang_dot_none_lp__0x2b_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            let _0x7_groups = _0x2_groups
                            let _0x7_groups = _0x2_groups
                            _0x7_groups_0x2_groups
                            let _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x2c__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            let _0x9_key = _0x4_key
                            let _0x8_key = _0x2c__0x7_groups_0x9_key_0x4_key[]
                            _0x8_keylet _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x2d__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            _0x2d__0x7_groupslet _0x9_key = _0x4_key
                            _0x9_key_0x4_key[]
                        }
                    } let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x2e__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0x2e__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x2f__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0x2f__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x30_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                const _0x31_await__67lang_dot_none_lp_ = await _67lang.none(_0x30_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                _0x31_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x32_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                _0x32_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
                _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
                _0x6_groups_0x2_groups{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groups
                        let _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x33__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0x33__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x34__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0x34__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]
                    }
                } let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x35__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0x35__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x36__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0x36__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]let _0xa_groups = _0x2_groups
                let _0xc_key = _0x4_key
                const _0x37__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xb_key = _0x37__0xa_groups_0xc_key_0x4_key
                let _0xc_key = _0x4_key
                const _0x38__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xa_groups = _0x2_groups
                _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
                const _0x39__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xb_key = _0x39__0xa_groups_0xc_key_0x4_key
                _0xb_keylet _0xc_key = _0x4_key
                const _0x3a__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                _0x3a__0xa_groupslet _0xc_key = _0x4_key
                _0xc_key_0x4_keylet _0xe_word = word
                const _0x3b_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                let _0xe_word = word
                let _0xd_push = _0x3b_push_0xb_key_0xe_wordword
                _0xd_pushlet _0xe_word = word
                const _0x3c_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                _0x3c_push_0xb_keylet _0xe_word = word
                _0xe_wordword}let _0x3_words = _0x1_words
            _0x3_words_0x1_words{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x4_key = """"
                    _0x4_key""""



                    let _0x6_groups = _0x2_groups
                    let _0x5_key = _0x4_key
                    const _0x3d_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                    let _0x5_key = _0x4_key
                    let _0x6_groups = _0x2_groups
                    const _0x3e_await__67lang_dot_none_lp_ = await _67lang.none(_0x3d_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                    let _0x6_groups = _0x2_groups
                    let _0x5_key = _0x4_key
                    const _0x3f_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                    let _0x5_key = _0x4_key
                    let _0x6_groups = _0x2_groups
                    if (_0x3e_await__67lang_dot_none_lp__0x3f_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                let _0x7_groups = _0x2_groups
                                let _0x7_groups = _0x2_groups
                                _0x7_groups_0x2_groups
                                let _0x9_key = _0x4_key
                                _0x7_groups[_0x9_key_0x4_key] = []
                                const _0x40__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                let _0x9_key = _0x4_key
                                let _0x8_key = _0x40__0x7_groups_0x9_key_0x4_key[]
                                _0x8_keylet _0x9_key = _0x4_key
                                _0x7_groups[_0x9_key_0x4_key] = []
                                const _0x41__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                                _0x41__0x7_groupslet _0x9_key = _0x4_key
                                _0x9_key_0x4_key[]
                            }
                        } let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x42__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0x42__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x43__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0x43__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
                    let _0x5_key = _0x4_key
                    const _0x44_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                    let _0x5_key = _0x4_key
                    let _0x6_groups = _0x2_groups
                    const _0x45_await__67lang_dot_none_lp_ = await _67lang.none(_0x44_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                    _0x45_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
                    let _0x5_key = _0x4_key
                    const _0x46_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                    _0x46_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
                    _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
                    _0x6_groups_0x2_groups{
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            let _0x7_groups = _0x2_groups
                            let _0x7_groups = _0x2_groups
                            _0x7_groups_0x2_groups
                            let _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x47__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            let _0x9_key = _0x4_key
                            let _0x8_key = _0x47__0x7_groups_0x9_key_0x4_key[]
                            _0x8_keylet _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x48__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            _0x48__0x7_groupslet _0x9_key = _0x4_key
                            _0x9_key_0x4_key[]
                        }
                    } let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x49__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0x49__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x4a__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0x4a__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]
                    let _0xa_groups = _0x2_groups
                    let _0xc_key = _0x4_key
                    const _0x4b__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                    let _0xc_key = _0x4_key
                    let _0xb_key = _0x4b__0xa_groups_0xc_key_0x4_key
                    let _0xc_key = _0x4_key
                    const _0x4c__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                    let _0xc_key = _0x4_key
                    let _0xa_groups = _0x2_groups
                    _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
                    const _0x4d__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                    let _0xc_key = _0x4_key
                    let _0xb_key = _0x4d__0xa_groups_0xc_key_0x4_key
                    _0xb_keylet _0xc_key = _0x4_key
                    const _0x4e__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                    _0x4e__0xa_groupslet _0xc_key = _0x4_key
                    _0xc_key_0x4_key
                    let _0xe_word = word
                    const _0x4f_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                    let _0xe_word = word
                    let _0xd_push = _0x4f_push_0xb_key_0xe_wordword
                    _0xd_pushlet _0xe_word = word
                    const _0x50_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                    _0x50_push_0xb_keylet _0xe_word = word
                    _0xe_wordword
                }
            } let _0x4_key = """"
            _0x4_key""""let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0x51_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            const _0x52_await__67lang_dot_none_lp_ = await _67lang.none(_0x51_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
            let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0x53_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            if (_0x52_await__67lang_dot_none_lp__0x53_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groups
                        let _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x54__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0x54__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x55__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0x55__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]
                    }
                } let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x56__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0x56__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x57__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0x57__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0x58_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            const _0x59_await__67lang_dot_none_lp_ = await _67lang.none(_0x58_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
            _0x59_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0x5a_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            _0x5a_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
            _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
            _0x6_groups_0x2_groups{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groups
                    let _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x5b__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0x5b__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x5c__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0x5c__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]
                }
            } let _0x7_groups = _0x2_groups
            let _0x7_groups = _0x2_groups
            _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0x5d__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            let _0x9_key = _0x4_key
            let _0x8_key = _0x5d__0x7_groups_0x9_key_0x4_key[]
            _0x8_keylet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0x5e__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            _0x5e__0x7_groupslet _0x9_key = _0x4_key
            _0x9_key_0x4_key[]let _0xa_groups = _0x2_groups
            let _0xc_key = _0x4_key
            const _0x5f__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xb_key = _0x5f__0xa_groups_0xc_key_0x4_key
            let _0xc_key = _0x4_key
            const _0x60__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xa_groups = _0x2_groups
            _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
            const _0x61__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xb_key = _0x61__0xa_groups_0xc_key_0x4_key
            _0xb_keylet _0xc_key = _0x4_key
            const _0x62__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            _0x62__0xa_groupslet _0xc_key = _0x4_key
            _0xc_key_0x4_keylet _0xe_word = word
            const _0x63_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
            let _0xe_word = word
            let _0xd_push = _0x63_push_0xb_key_0xe_wordword
            _0xd_pushlet _0xe_word = word
            const _0x64_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
            _0x64_push_0xb_keylet _0xe_word = word
            _0xe_wordword
            let _0xf_groups = _0x2_groups
            const _0x65_await__67lang_dot_values_lp_ = await _67lang.values(_0xf_groups_0x2_groups)
            let _0xf_groups = _0x2_groups

            const _0x66_iter = _0x65_await__67lang_dot_values_lp__0xf_groups_0x2_groups[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x66_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x10_group = group
                        let _0x10_group = group
                        const _0x67_join = await Array.prototype.join.call(_0x10_group, " ")
                        let _0x11_join = _0x67_join_0x10_group" "
                        const _0x68_join = await Array.prototype.join.call(_0x10_group, " ")
                        const _0x69_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0x68_join_0x10_group" ")
                        _0x69_await__67lang_dot_log_lp_let _0x10_group = group
                        let _0x10_group = group
                        _0x10_groupgroupconst _0x6a_join = await Array.prototype.join.call(_0x10_group, " ")
                        let _0x11_join = _0x6a_join_0x10_group" "
                        _0x11_joinconst _0x6b_join = await Array.prototype.join.call(_0x10_group, " ")
                        _0x6b_join_0x10_group" "
                    }
                } let _0x10_group = group
                let _0x10_group = group
                const _0x6c_join = await Array.prototype.join.call(_0x10_group, " ")
                let _0x11_join = _0x6c_join_0x10_group" "
                const _0x6d_join = await Array.prototype.join.call(_0x10_group, " ")
                const _0x6e_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0x6d_join_0x10_group" ")
                _0x6e_await__67lang_dot_log_lp_let _0x10_group = group
                let _0x10_group = group
                _0x10_groupgroupconst _0x6f_join = await Array.prototype.join.call(_0x10_group, " ")
                let _0x11_join = _0x6f_join_0x10_group" "
                _0x11_joinconst _0x70_join = await Array.prototype.join.call(_0x10_group, " ")
                _0x70_join_0x10_group" "}let _0xf_groups = _0x2_groups
            const _0x71_await__67lang_dot_values_lp_ = await _67lang.values(_0xf_groups_0x2_groups)
            _0x71_await__67lang_dot_values_lp_let _0xf_groups = _0x2_groups
            _0xf_groups_0x2_groups{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x10_group = group
                    let _0x10_group = group
                    const _0x72_join = await Array.prototype.join.call(_0x10_group, " ")
                    let _0x11_join = _0x72_join_0x10_group" "
                    const _0x73_join = await Array.prototype.join.call(_0x10_group, " ")
                    const _0x74_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0x73_join_0x10_group" ")
                    _0x74_await__67lang_dot_log_lp_let _0x10_group = group
                    let _0x10_group = group
                    _0x10_groupgroupconst _0x75_join = await Array.prototype.join.call(_0x10_group, " ")
                    let _0x11_join = _0x75_join_0x10_group" "
                    _0x11_joinconst _0x76_join = await Array.prototype.join.call(_0x10_group, " ")
                    _0x76_join_0x10_group" "
                }
            } let _0x10_group = group
            let _0x10_group = group
            const _0x77_join = await Array.prototype.join.call(_0x10_group, " ")
            let _0x11_join = _0x77_join_0x10_group" "
            const _0x78_join = await Array.prototype.join.call(_0x10_group, " ")
            const _0x79_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0x78_join_0x10_group" ")
            _0x79_await__67lang_dot_log_lp_let _0x10_group = group
            let _0x10_group = group
            _0x10_groupgroupconst _0x7a_join = await Array.prototype.join.call(_0x10_group, " ")
            let _0x11_join = _0x7a_join_0x10_group" "
            _0x11_joinconst _0x7b_join = await Array.prototype.join.call(_0x10_group, " ")
            _0x7b_join_0x10_group" "
        }
    } const _0x7c_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
    let _0x0_input = _0x7c_await__67lang_dot_stdin_lp_
    _0x0_inputconst _0x7d_await__67lang_dot_stdin_lp_ = await _67lang.stdin()
    _0x7d_await__67lang_dot_stdin_lp_let _0x1_words = "\n"
    _0x1_words"\n"let _0x2_groups = {}
    _0x2_groups{}let _0x3_words = _0x1_words

    const _0x7e_iter = _0x3_words_0x1_words[Symbol.iterator]();
    while (true) {
        const { value, done } = _0x7e_iter.next();
        if (done) { break; }
        let word = value;
        {
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                let _0x4_key = """"
                _0x4_key""""



                let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x7f_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                const _0x80_await__67lang_dot_none_lp_ = await _67lang.none(_0x7f_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x81_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                if (_0x80_await__67lang_dot_none_lp__0x81_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                        const parent_scope = scope
                        {
                            const scope = _67lang.scope(parent_scope)
                            let _0x7_groups = _0x2_groups
                            let _0x7_groups = _0x2_groups
                            _0x7_groups_0x2_groups
                            let _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x82__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            let _0x9_key = _0x4_key
                            let _0x8_key = _0x82__0x7_groups_0x9_key_0x4_key[]
                            _0x8_keylet _0x9_key = _0x4_key
                            _0x7_groups[_0x9_key_0x4_key] = []
                            const _0x83__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                            _0x83__0x7_groupslet _0x9_key = _0x4_key
                            _0x9_key_0x4_key[]
                        }
                    } let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x84__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0x84__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x85__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0x85__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x86_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                let _0x5_key = _0x4_key
                let _0x6_groups = _0x2_groups
                const _0x87_await__67lang_dot_none_lp_ = await _67lang.none(_0x86_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
                _0x87_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
                let _0x5_key = _0x4_key
                const _0x88_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
                _0x88_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
                _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
                _0x6_groups_0x2_groups{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groups
                        let _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x89__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0x89__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0x8a__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0x8a__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]
                    }
                } let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x8b__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0x8b__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x8c__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0x8c__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]
                let _0xa_groups = _0x2_groups
                let _0xc_key = _0x4_key
                const _0x8d__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xb_key = _0x8d__0xa_groups_0xc_key_0x4_key
                let _0xc_key = _0x4_key
                const _0x8e__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xa_groups = _0x2_groups
                _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
                const _0x8f__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                let _0xc_key = _0x4_key
                let _0xb_key = _0x8f__0xa_groups_0xc_key_0x4_key
                _0xb_keylet _0xc_key = _0x4_key
                const _0x90__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
                _0x90__0xa_groupslet _0xc_key = _0x4_key
                _0xc_key_0x4_key
                let _0xe_word = word
                const _0x91_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                let _0xe_word = word
                let _0xd_push = _0x91_push_0xb_key_0xe_wordword
                _0xd_pushlet _0xe_word = word
                const _0x92_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
                _0x92_push_0xb_keylet _0xe_word = word
                _0xe_wordword
            }
        } let _0x4_key = """"
        _0x4_key""""let _0x6_groups = _0x2_groups
        let _0x5_key = _0x4_key
        const _0x93_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
        let _0x5_key = _0x4_key
        let _0x6_groups = _0x2_groups
        const _0x94_await__67lang_dot_none_lp_ = await _67lang.none(_0x93_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
        let _0x6_groups = _0x2_groups
        let _0x5_key = _0x4_key
        const _0x95_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
        let _0x5_key = _0x4_key
        let _0x6_groups = _0x2_groups
        if (_0x94_await__67lang_dot_none_lp__0x95_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groups
                    let _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x96__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0x96__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0x97__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0x97__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]
                }
            } let _0x7_groups = _0x2_groups
            let _0x7_groups = _0x2_groups
            _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0x98__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            let _0x9_key = _0x4_key
            let _0x8_key = _0x98__0x7_groups_0x9_key_0x4_key[]
            _0x8_keylet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0x99__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            _0x99__0x7_groupslet _0x9_key = _0x4_key
            _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
        let _0x5_key = _0x4_key
        const _0x9a_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
        let _0x5_key = _0x4_key
        let _0x6_groups = _0x2_groups
        const _0x9b_await__67lang_dot_none_lp_ = await _67lang.none(_0x9a_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
        _0x9b_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
        let _0x5_key = _0x4_key
        const _0x9c_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
        _0x9c_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
        _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
        _0x6_groups_0x2_groups{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groups
                let _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x9d__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0x9d__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0x9e__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0x9e__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]
            }
        } let _0x7_groups = _0x2_groups
        let _0x7_groups = _0x2_groups
        _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
        _0x7_groups[_0x9_key_0x4_key] = []
        const _0x9f__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
        let _0x9_key = _0x4_key
        let _0x8_key = _0x9f__0x7_groups_0x9_key_0x4_key[]
        _0x8_keylet _0x9_key = _0x4_key
        _0x7_groups[_0x9_key_0x4_key] = []
        const _0xa0__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
        _0xa0__0x7_groupslet _0x9_key = _0x4_key
        _0x9_key_0x4_key[]let _0xa_groups = _0x2_groups
        let _0xc_key = _0x4_key
        const _0xa1__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
        let _0xc_key = _0x4_key
        let _0xb_key = _0xa1__0xa_groups_0xc_key_0x4_key
        let _0xc_key = _0x4_key
        const _0xa2__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
        let _0xc_key = _0x4_key
        let _0xa_groups = _0x2_groups
        _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
        const _0xa3__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
        let _0xc_key = _0x4_key
        let _0xb_key = _0xa3__0xa_groups_0xc_key_0x4_key
        _0xb_keylet _0xc_key = _0x4_key
        const _0xa4__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
        _0xa4__0xa_groupslet _0xc_key = _0x4_key
        _0xc_key_0x4_keylet _0xe_word = word
        const _0xa5_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
        let _0xe_word = word
        let _0xd_push = _0xa5_push_0xb_key_0xe_wordword
        _0xd_pushlet _0xe_word = word
        const _0xa6_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
        _0xa6_push_0xb_keylet _0xe_word = word
        _0xe_wordword}let _0x3_words = _0x1_words
    _0x3_words_0x1_words{
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x4_key = """"
            _0x4_key""""



            let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0xa7_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            const _0xa8_await__67lang_dot_none_lp_ = await _67lang.none(_0xa7_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
            let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0xa9_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            if (_0xa8_await__67lang_dot_none_lp__0xa9_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_groups = _0x2_groups
                        let _0x7_groups = _0x2_groups
                        _0x7_groups_0x2_groups
                        let _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0xaa__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        let _0x9_key = _0x4_key
                        let _0x8_key = _0xaa__0x7_groups_0x9_key_0x4_key[]
                        _0x8_keylet _0x9_key = _0x4_key
                        _0x7_groups[_0x9_key_0x4_key] = []
                        const _0xab__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                        _0xab__0x7_groupslet _0x9_key = _0x4_key
                        _0x9_key_0x4_key[]
                    }
                } let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0xac__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0xac__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0xad__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0xad__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0xae_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            let _0x5_key = _0x4_key
            let _0x6_groups = _0x2_groups
            const _0xaf_await__67lang_dot_none_lp_ = await _67lang.none(_0xae_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
            _0xaf_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
            let _0x5_key = _0x4_key
            const _0xb0_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
            _0xb0_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
            _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
            _0x6_groups_0x2_groups{
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x7_groups = _0x2_groups
                    let _0x7_groups = _0x2_groups
                    _0x7_groups_0x2_groups
                    let _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0xb1__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    let _0x9_key = _0x4_key
                    let _0x8_key = _0xb1__0x7_groups_0x9_key_0x4_key[]
                    _0x8_keylet _0x9_key = _0x4_key
                    _0x7_groups[_0x9_key_0x4_key] = []
                    const _0xb2__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                    _0xb2__0x7_groupslet _0x9_key = _0x4_key
                    _0x9_key_0x4_key[]
                }
            } let _0x7_groups = _0x2_groups
            let _0x7_groups = _0x2_groups
            _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0xb3__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            let _0x9_key = _0x4_key
            let _0x8_key = _0xb3__0x7_groups_0x9_key_0x4_key[]
            _0x8_keylet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0xb4__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            _0xb4__0x7_groupslet _0x9_key = _0x4_key
            _0x9_key_0x4_key[]
            let _0xa_groups = _0x2_groups
            let _0xc_key = _0x4_key
            const _0xb5__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xb_key = _0xb5__0xa_groups_0xc_key_0x4_key
            let _0xc_key = _0x4_key
            const _0xb6__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xa_groups = _0x2_groups
            _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
            const _0xb7__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            let _0xc_key = _0x4_key
            let _0xb_key = _0xb7__0xa_groups_0xc_key_0x4_key
            _0xb_keylet _0xc_key = _0x4_key
            const _0xb8__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
            _0xb8__0xa_groupslet _0xc_key = _0x4_key
            _0xc_key_0x4_key
            let _0xe_word = word
            const _0xb9_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
            let _0xe_word = word
            let _0xd_push = _0xb9_push_0xb_key_0xe_wordword
            _0xd_pushlet _0xe_word = word
            const _0xba_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
            _0xba_push_0xb_keylet _0xe_word = word
            _0xe_wordword
        }
    } let _0x4_key = """"
    _0x4_key""""let _0x6_groups = _0x2_groups
    let _0x5_key = _0x4_key
    const _0xbb_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
    let _0x5_key = _0x4_key
    let _0x6_groups = _0x2_groups
    const _0xbc_await__67lang_dot_none_lp_ = await _67lang.none(_0xbb_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
    let _0x6_groups = _0x2_groups
    let _0x5_key = _0x4_key
    const _0xbd_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
    let _0x5_key = _0x4_key
    let _0x6_groups = _0x2_groups
    if (_0xbc_await__67lang_dot_none_lp__0xbd_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                let _0x7_groups = _0x2_groups
                let _0x7_groups = _0x2_groups
                _0x7_groups_0x2_groups
                let _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0xbe__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                let _0x9_key = _0x4_key
                let _0x8_key = _0xbe__0x7_groups_0x9_key_0x4_key[]
                _0x8_keylet _0x9_key = _0x4_key
                _0x7_groups[_0x9_key_0x4_key] = []
                const _0xbf__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
                _0xbf__0x7_groupslet _0x9_key = _0x4_key
                _0x9_key_0x4_key[]
            }
        } let _0x7_groups = _0x2_groups
        let _0x7_groups = _0x2_groups
        _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
        _0x7_groups[_0x9_key_0x4_key] = []
        const _0xc0__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
        let _0x9_key = _0x4_key
        let _0x8_key = _0xc0__0x7_groups_0x9_key_0x4_key[]
        _0x8_keylet _0x9_key = _0x4_key
        _0x7_groups[_0x9_key_0x4_key] = []
        const _0xc1__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
        _0xc1__0x7_groupslet _0x9_key = _0x4_key
        _0x9_key_0x4_key[]}let _0x6_groups = _0x2_groups
    let _0x5_key = _0x4_key
    const _0xc2_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
    let _0x5_key = _0x4_key
    let _0x6_groups = _0x2_groups
    const _0xc3_await__67lang_dot_none_lp_ = await _67lang.none(_0xc2_await__67lang_dot_exists_inside_lp__0x5_key_0x4_key_0x6_groups_0x2_groups)
    _0xc3_await__67lang_dot_none_lp_let _0x6_groups = _0x2_groups
    let _0x5_key = _0x4_key
    const _0xc4_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x6_groups_0x2_groups, _0x5_key_0x4_key)
    _0xc4_await__67lang_dot_exists_inside_lp_let _0x5_key = _0x4_key
    _0x5_key_0x4_keylet _0x6_groups = _0x2_groups
    _0x6_groups_0x2_groups{
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x7_groups = _0x2_groups
            let _0x7_groups = _0x2_groups
            _0x7_groups_0x2_groups
            let _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0xc5__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            let _0x9_key = _0x4_key
            let _0x8_key = _0xc5__0x7_groups_0x9_key_0x4_key[]
            _0x8_keylet _0x9_key = _0x4_key
            _0x7_groups[_0x9_key_0x4_key] = []
            const _0xc6__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
            _0xc6__0x7_groupslet _0x9_key = _0x4_key
            _0x9_key_0x4_key[]
        }
    } let _0x7_groups = _0x2_groups
    let _0x7_groups = _0x2_groups
    _0x7_groups_0x2_groupslet _0x9_key = _0x4_key
    _0x7_groups[_0x9_key_0x4_key] = []
    const _0xc7__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
    let _0x9_key = _0x4_key
    let _0x8_key = _0xc7__0x7_groups_0x9_key_0x4_key[]
    _0x8_keylet _0x9_key = _0x4_key
    _0x7_groups[_0x9_key_0x4_key] = []
    const _0xc8__0x7_groups = await _0x7_groups[_0x9_key_0x4_key]
    _0xc8__0x7_groupslet _0x9_key = _0x4_key
    _0x9_key_0x4_key[]let _0xa_groups = _0x2_groups
    let _0xc_key = _0x4_key
    const _0xc9__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
    let _0xc_key = _0x4_key
    let _0xb_key = _0xc9__0xa_groups_0xc_key_0x4_key
    let _0xc_key = _0x4_key
    const _0xca__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
    let _0xc_key = _0x4_key
    let _0xa_groups = _0x2_groups
    _0xa_groups_0x2_groupslet _0xc_key = _0x4_key
    const _0xcb__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
    let _0xc_key = _0x4_key
    let _0xb_key = _0xcb__0xa_groups_0xc_key_0x4_key
    _0xb_keylet _0xc_key = _0x4_key
    const _0xcc__0xa_groups = await _0xa_groups[_0xc_key_0x4_key]
    _0xcc__0xa_groupslet _0xc_key = _0x4_key
    _0xc_key_0x4_keylet _0xe_word = word
    const _0xcd_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
    let _0xe_word = word
    let _0xd_push = _0xcd_push_0xb_key_0xe_wordword
    _0xd_pushlet _0xe_word = word
    const _0xce_push = await Array.prototype.push.call(_0xb_key, _0xe_wordword)
    _0xce_push_0xb_keylet _0xe_word = word
    _0xe_wordwordlet _0xf_groups = _0x2_groups
    const _0xcf_await__67lang_dot_values_lp_ = await _67lang.values(_0xf_groups_0x2_groups)
    let _0xf_groups = _0x2_groups

    const _0xd0_iter = _0xcf_await__67lang_dot_values_lp__0xf_groups_0x2_groups[Symbol.iterator]();
    while (true) {
        const { value, done } = _0xd0_iter.next();
        if (done) { break; }
        let group = value;
        {
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                let _0x10_group = group
                let _0x10_group = group
                const _0xd1_join = await Array.prototype.join.call(_0x10_group, " ")
                let _0x11_join = _0xd1_join_0x10_group" "
                const _0xd2_join = await Array.prototype.join.call(_0x10_group, " ")
                const _0xd3_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0xd2_join_0x10_group" ")
                _0xd3_await__67lang_dot_log_lp_let _0x10_group = group
                let _0x10_group = group
                _0x10_groupgroupconst _0xd4_join = await Array.prototype.join.call(_0x10_group, " ")
                let _0x11_join = _0xd4_join_0x10_group" "
                _0x11_joinconst _0xd5_join = await Array.prototype.join.call(_0x10_group, " ")
                _0xd5_join_0x10_group" "
            }
        } let _0x10_group = group
        let _0x10_group = group
        const _0xd6_join = await Array.prototype.join.call(_0x10_group, " ")
        let _0x11_join = _0xd6_join_0x10_group" "
        const _0xd7_join = await Array.prototype.join.call(_0x10_group, " ")
        const _0xd8_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0xd7_join_0x10_group" ")
        _0xd8_await__67lang_dot_log_lp_let _0x10_group = group
        let _0x10_group = group
        _0x10_groupgroupconst _0xd9_join = await Array.prototype.join.call(_0x10_group, " ")
        let _0x11_join = _0xd9_join_0x10_group" "
        _0x11_joinconst _0xda_join = await Array.prototype.join.call(_0x10_group, " ")
        _0xda_join_0x10_group" "}let _0xf_groups = _0x2_groups
    const _0xdb_await__67lang_dot_values_lp_ = await _67lang.values(_0xf_groups_0x2_groups)
    _0xdb_await__67lang_dot_values_lp_let _0xf_groups = _0x2_groups
    _0xf_groups_0x2_groups{
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x10_group = group
            let _0x10_group = group
            const _0xdc_join = await Array.prototype.join.call(_0x10_group, " ")
            let _0x11_join = _0xdc_join_0x10_group" "
            const _0xdd_join = await Array.prototype.join.call(_0x10_group, " ")
            const _0xde_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0xdd_join_0x10_group" ")
            _0xde_await__67lang_dot_log_lp_let _0x10_group = group
            let _0x10_group = group
            _0x10_groupgroupconst _0xdf_join = await Array.prototype.join.call(_0x10_group, " ")
            let _0x11_join = _0xdf_join_0x10_group" "
            _0x11_joinconst _0xe0_join = await Array.prototype.join.call(_0x10_group, " ")
            _0xe0_join_0x10_group" "
        }
    } let _0x10_group = group
    let _0x10_group = group
    const _0xe1_join = await Array.prototype.join.call(_0x10_group, " ")
    let _0x11_join = _0xe1_join_0x10_group" "
    const _0xe2_join = await Array.prototype.join.call(_0x10_group, " ")
    const _0xe3_await__67lang_dot_log_lp_ = await _67lang.log(_0x10_groupgroup, _0x11_join_0xe2_join_0x10_group" ")
    _0xe3_await__67lang_dot_log_lp_let _0x10_group = group
    let _0x10_group = group
    _0x10_groupgroupconst _0xe4_join = await Array.prototype.join.call(_0x10_group, " ")
    let _0x11_join = _0xe4_join_0x10_group" "
    _0x11_joinconst _0xe5_join = await Array.prototype.join.call(_0x10_group, " ")
    _0xe5_join_0x10_group" "
})();
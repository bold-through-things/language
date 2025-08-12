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
            const _0x36_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x36_stdin
            let _0x2_input = _0x1__0x0_stdin
            _0x2_input
            const _0x37_input = await _0x2_input
            let _0x5__0x3_input = _0x37_input
            const _0x39__0x3_input = await _0x5__0x3_input
            const _0x38_split = await String.prototype.split.call(_0x39__0x3_input, "\n")
            let _0x6__0x4_split = _0x38_split
            let _0x7_words = _0x6__0x4_split
            _0x7_words
            let _0x8_count = {}
            _0x8_count
            const _0x3a_words = await _0x7_words
            let _0xa__0x9_words = _0x3a_words

            const _0x3b_iter = _0xa__0x9_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x3b_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x3d_count = await _0x8_count
                        let _0x11__0xe_count = _0x3d_count
                        const _0x3e_word = await word
                        let _0x10__0xc_word = _0x3e_word
                        const _0x3f_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x11__0xe_count, _0x10__0xc_word)
                        const _0x3c_none = await !(_0x3f_await__67lang_dot_exists_inside_lp_)
                        let _0x12__0xb_none = _0x3c_none
                        if (_0x12__0xb_none) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x40_count = await _0x8_count
                                    let _0x15__0x13_count = _0x40_count

                                    const _0x42__0x13_count = await _0x15__0x13_count
                                    const _0x43_word = await word
                                    let _0x18__0x16_word = _0x43_word
                                    const _0x41__hash_ = await (_0x42__0x13_count[_0x18__0x16_word] = 0)
                                    let _0x19__0x14__hash_ = _0x41__hash_
                                    _0x19__0x14__hash_
                                }
                            } }

                        const _0x44_count = await _0x8_count
                        let _0x1c__0x1a_count = _0x44_count

                        const _0x46__0x1a_count = await _0x1c__0x1a_count
                        const _0x47_word = await word
                        let _0x2b__0x1d_word = _0x47_word
                        const _0x49_count = await _0x8_count
                        let _0x2c__0x20_count = _0x49_count
                        const _0x4b__0x20_count = await _0x2c__0x20_count
                        const _0x4c_word = await word
                        let _0x2d__0x23_word = _0x4c_word
                        const _0x4a__hash_ = await _0x4b__0x20_count[_0x2d__0x23_word]
                        let _0x2e__0x21__hash_ = _0x4a__hash_
                        const _0x48_add = await (1 + _0x2e__0x21__hash_)
                        let _0x2f__0x1f_add = _0x48_add
                        const _0x45__hash_ = await (_0x46__0x1a_count[_0x2b__0x1d_word] = _0x2f__0x1f_add)
                        let _0x30__0x1b__hash_ = _0x45__hash_
                        _0x30__0x1b__hash_
                    }
                } }
            const _0x4e_count = await _0x8_count
            let _0x34__0x32_count = _0x4e_count
            const _0x4d_print = await console.log(_0x34__0x32_count)
            let _0x35__0x31_print = _0x4d_print
            _0x35__0x31_print
        }
    } 
})();
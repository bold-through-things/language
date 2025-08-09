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
            const _0x24_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x24_stdin
            let _0x1_input = _0x0_stdin
            _0x1_input
            let _0x2_input = _0x1_input
            const _0x25_split = await String.prototype.split.call(_0x2_input, "\n")
            let _0x3_split = _0x25_split
            let _0x4_words = _0x3_split
            _0x4_words
            let _0x5_count = {}
            _0x5_count
            let _0x7__0x6_words = _0x4_words

            const _0x26_iter = _0x7__0x6_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x26_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xc__0x9_count = _0x5_count
                        let _0xb__0x8_word = word
                        const _0x28_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0xc__0x9_count, _0xb__0x8_word)
                        const _0x27_none = await !(_0x28_await__67lang_dot_exists_inside_lp_)
                        let _0xa_none = _0x27_none
                        if (_0xa_none) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0xe_count = _0x5_count

                                    let _0x10__0xd_word = word
                                    _0xe_count[_0x10__0xd_word] = 0
                                    const _0x29__0xe_count = await _0xe_count[_0x10__0xd_word]
                                    let _0xf_key = _0x29__0xe_count
                                    _0xf_key
                                }
                            } }
                        let _0x1a_count = _0x5_count

                        let _0x1c__0x11_word = word
                        let _0x1d__0x13_count = _0x5_count
                        let _0x1e__0x12_word = word
                        const _0x2c__0x1d__0x13_count = await _0x1d__0x13_count[_0x1e__0x12_word]
                        let _0x1f__0x14_key = _0x2c__0x1d__0x13_count
                        const _0x2b_add = await (1 + _0x1f__0x14_key)
                        let _0x20__0x16_add = _0x2b_add
                        _0x1a_count[_0x1c__0x11_word] = _0x20__0x16_add
                        const _0x2a__0x1a_count = await _0x1a_count[_0x1c__0x11_word]
                        let _0x1b_key = _0x2a__0x1a_count
                        _0x1b_key
                    }
                } }
            let _0x23__0x21_count = _0x5_count
            const _0x2d_print = await console.log(_0x23__0x21_count)
            let _0x22_print = _0x2d_print
            _0x22_print
        }
    } 
})();
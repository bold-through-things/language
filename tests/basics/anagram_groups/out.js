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
            const _0x1c_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x1c_stdin
            let _0x1_input = _0x0_stdin
            _0x1_input
            let _0x2_input = _0x1_input
            const _0x1d_split = await String.prototype.split.call(_0x2_input, "\n")
            let _0x3_split = _0x1d_split
            let _0x4_words = _0x3_split
            _0x4_words
            let _0x5_groups = {}
            _0x5_groups
            let _0x6_words = _0x4_words

            const _0x1e_iter = _0x6_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x1e_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x7_word = word
                        const _0x1f_split = await String.prototype.split.call(_0x7_word, "")
                        let _0x8_split = _0x1f_split
                        const _0x20_sort = await Array.prototype.sort.call(_0x8_split)
                        let _0x9_sort = _0x20_sort
                        const _0x21_join = await Array.prototype.join.call(_0x9_sort, "")
                        let _0xa_join = _0x21_join
                        let _0xb_key = _0xa_join
                        _0xb_key



                        let _0xe_groups = _0x5_groups
                        let _0xd_key = _0xb_key
                        const _0x23_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0xe_groups, _0xd_key)
                        const _0x22_none = await !(_0x23_await__67lang_dot_exists_inside_lp_)
                        let _0xc_none = _0x22_none
                        if (_0xc_none) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0xf_groups = _0x5_groups

                                    let _0x11_key = _0xb_key
                                    const _0x24__hash_ = await (_0xf_groups[_0x11_key] = [])
                                    let _0x10__hash_ = _0x24__hash_
                                    _0x10__hash_
                                }
                            } }
                        let _0x12_groups = _0x5_groups
                        let _0x15_key = _0xb_key
                        const _0x25__hash_ = await _0x12_groups[_0x15_key]
                        let _0x13__hash_ = _0x25__hash_

                        let _0x16_word = word
                        const _0x26_push = await Array.prototype.push.call(_0x13__hash_, _0x16_word)
                        let _0x14_push = _0x26_push
                        _0x14_push
                    }
                } }
            let _0x18_groups = _0x5_groups
            const _0x27_values = await Object.values(_0x18_groups)
            let _0x17_values = _0x27_values

            const _0x28_iter = _0x17_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x28_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x1a_group = group
                        const _0x2a_join = await Array.prototype.join.call(_0x1a_group, " ")
                        let _0x1b_join = _0x2a_join
                        const _0x29_print = await console.log(_0x1b_join)
                        let _0x19_print = _0x29_print
                        _0x19_print
                    }
                } }
        }
    } 
})();
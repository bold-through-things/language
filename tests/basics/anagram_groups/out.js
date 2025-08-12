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
            const _0x3c_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x3c_stdin
            let _0x2_input = _0x1__0x0_stdin
            _0x2_input
            const _0x3d_input = await _0x2_input
            let _0x5__0x3_input = _0x3d_input
            const _0x3f__0x3_input = await _0x5__0x3_input
            const _0x3e_split = await String.prototype.split.call(_0x3f__0x3_input, "\n")
            let _0x6__0x4_split = _0x3e_split
            let _0x7_words = _0x6__0x4_split
            _0x7_words
            let _0x8_groups = {}
            _0x8_groups
            const _0x40_words = await _0x7_words
            let _0xa__0x9_words = _0x40_words

            const _0x41_iter = _0xa__0x9_words[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x41_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x42_word = await word
                        let _0xf__0xb_word = _0x42_word
                        const _0x44__0xb_word = await _0xf__0xb_word
                        const _0x43_split = await String.prototype.split.call(_0x44__0xb_word, "")
                        let _0x10__0xc_split = _0x43_split
                        const _0x46__0xc_split = await _0x10__0xc_split
                        const _0x45_sort = await Array.prototype.sort.call(_0x46__0xc_split)
                        let _0x11__0xd_sort = _0x45_sort
                        const _0x48__0xd_sort = await _0x11__0xd_sort
                        const _0x47_join = await Array.prototype.join.call(_0x48__0xd_sort, "")
                        let _0x12__0xe_join = _0x47_join
                        let _0x13_key = _0x12__0xe_join
                        _0x13_key



                        const _0x4a_groups = await _0x8_groups
                        let _0x1a__0x17_groups = _0x4a_groups
                        const _0x4b_key = await _0x13_key
                        let _0x19__0x15_key = _0x4b_key
                        const _0x4c_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x1a__0x17_groups, _0x19__0x15_key)
                        const _0x49_none = await !(_0x4c_await__67lang_dot_exists_inside_lp_)
                        let _0x1b__0x14_none = _0x49_none
                        if (_0x1b__0x14_none) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x4d_groups = await _0x8_groups
                                    let _0x1e__0x1c_groups = _0x4d_groups

                                    const _0x4f__0x1c_groups = await _0x1e__0x1c_groups
                                    const _0x50_key = await _0x13_key
                                    let _0x21__0x1f_key = _0x50_key
                                    const _0x4e__hash_ = await (_0x4f__0x1c_groups[_0x21__0x1f_key] = [])
                                    let _0x22__0x1d__hash_ = _0x4e__hash_
                                    _0x22__0x1d__hash_
                                }
                            } }
                        const _0x51_groups = await _0x8_groups
                        let _0x26__0x23_groups = _0x51_groups
                        const _0x53__0x23_groups = await _0x26__0x23_groups
                        const _0x54_key = await _0x13_key
                        let _0x29__0x27_key = _0x54_key
                        const _0x52__hash_ = await _0x53__0x23_groups[_0x29__0x27_key]
                        let _0x2a__0x24__hash_ = _0x52__hash_

                        const _0x56__0x24__hash_ = await _0x2a__0x24__hash_
                        const _0x57_word = await word
                        let _0x2d__0x2b_word = _0x57_word
                        const _0x55_push = await Array.prototype.push.call(_0x56__0x24__hash_, _0x2d__0x2b_word)
                        let _0x2e__0x25_push = _0x55_push
                        _0x2e__0x25_push
                    }
                } }
            const _0x59_groups = await _0x8_groups
            let _0x32__0x30_groups = _0x59_groups
            const _0x58_values = await Object.values(_0x32__0x30_groups)
            let _0x33__0x2f_values = _0x58_values

            const _0x5a_iter = _0x33__0x2f_values[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x5a_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x5c_group = await group
                        let _0x39__0x35_group = _0x5c_group
                        const _0x5e__0x35_group = await _0x39__0x35_group
                        const _0x5d_join = await Array.prototype.join.call(_0x5e__0x35_group, " ")
                        let _0x3a__0x36_join = _0x5d_join
                        const _0x5b_print = await console.log(_0x3a__0x36_join)
                        let _0x3b__0x34_print = _0x5b_print
                        _0x3b__0x34_print
                    }
                } }
        }
    } 
})();
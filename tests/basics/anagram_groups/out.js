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
    new_set: (...args) => {
        return new Set(args);
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
            const _0x2d_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x2d_stdin
            let _0x2_input = _0x1__0x0_pipeline_result
            _0x2_input
            const _0x2f_input = await _0x2_input
            const _0x2e_split = await String.prototype.split.call(_0x2f_input, "\n")
            let _0x4__0x3_pipeline_result = _0x2e_split
            let _0x5_words = _0x4__0x3_pipeline_result
            _0x5_words
            let _0x6_groups = {}
            _0x6_groups
            const _0x30_words = await _0x5_words
            let _0x8__0x7_pipeline_result = _0x30_words

            const _0x31_iter = _0x8__0x7_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x31_iter.next();
                if (done) { break; }
                let word = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x33_word = await word
                        const _0x32_split = await String.prototype.split.call(_0x33_word, "")
                        let _0xa__0x9_pipeline_result = _0x32_split
                        _0xa__0x9_pipeline_result
                        const _0x35__0x9_pipeline_result = await _0xa__0x9_pipeline_result
                        const _0x34_sort = await Array.prototype.sort.call(_0x35__0x9_pipeline_result)
                        let _0xc__0xb_pipeline_result = _0x34_sort
                        _0xc__0xb_pipeline_result
                        const _0x37__0xb_pipeline_result = await _0xc__0xb_pipeline_result
                        const _0x36_join = await Array.prototype.join.call(_0x37__0xb_pipeline_result, "")
                        let _0xd_key = _0x36_join
                        _0xd_key



                        const _0x39_groups = await _0x6_groups
                        let _0x12__0x11_pipeline_result = _0x39_groups
                        const _0x3a_key = await _0xd_key
                        let _0x10__0xf_pipeline_result = _0x3a_key
                        const _0x3b_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x12__0x11_pipeline_result, _0x10__0xf_pipeline_result)
                        const _0x38_none = await !(_0x3b_await__67lang_dot_exists_inside_lp_)
                        let _0x13__0xe_pipeline_result = _0x38_none
                        if (_0x13__0xe_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x3d_groups = await _0x6_groups
                                let _0x16__0x15_pipeline_result = _0x3d_groups
                                const _0x3e_key = await _0xd_key
                                let _0x18__0x17_pipeline_result = _0x3e_key
                                const _0x3c__hash_ = await (_0x16__0x15_pipeline_result[_0x18__0x17_pipeline_result] = [])
                                let _0x19__0x14_pipeline_result = _0x3c__hash_
                                _0x19__0x14_pipeline_result
                            }
                        } 
                        const _0x40_groups = await _0x6_groups
                        let _0x1c__0x1b_pipeline_result = _0x40_groups
                        const _0x41_key = await _0xd_key
                        let _0x1e__0x1d_pipeline_result = _0x41_key
                        const _0x3f__hash_ = await _0x1c__0x1b_pipeline_result[_0x1e__0x1d_pipeline_result]
                        let _0x1f__0x1a_pipeline_result = _0x3f__hash_
                        _0x1f__0x1a_pipeline_result
                        const _0x43__0x1a_pipeline_result = await _0x1f__0x1a_pipeline_result
                        const _0x44_word = await word
                        let _0x22__0x21_pipeline_result = _0x44_word
                        const _0x42_push = await Array.prototype.push.call(_0x43__0x1a_pipeline_result, _0x22__0x21_pipeline_result)
                        let _0x23__0x20_pipeline_result = _0x42_push
                        _0x23__0x20_pipeline_result
                    }
                } }
            const _0x46_groups = await _0x6_groups
            const _0x45_values = await Object.values(_0x46_groups)
            let _0x25__0x24_pipeline_result = _0x45_values

            const _0x47_iter = _0x25__0x24_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x47_iter.next();
                if (done) { break; }
                let group = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x4a_group = await group
                        let _0x29__0x28_pipeline_result = _0x4a_group
                        let _0x2a_group_typed = _0x29__0x28_pipeline_result
                        const _0x49_join = await Array.prototype.join.call(_0x2a_group_typed, " ")
                        let _0x2b__0x27_pipeline_result = _0x49_join
                        const _0x48_print = await console.log(_0x2b__0x27_pipeline_result)
                        let _0x2c__0x26_pipeline_result = _0x48_print
                        _0x2c__0x26_pipeline_result
                    }
                } }
        }
    } 
})();
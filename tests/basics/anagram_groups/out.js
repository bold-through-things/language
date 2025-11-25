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
        // need this since semantics differ here
        // (we are remapping `...args` to first)
        return new Set(args);
    },

    maybe_await: async function (value) {
        // we expect the JIT will optimize this h*ck
        // TODO benchmark as test
        if (value instanceof Promise) {
            return await value;
        } else {
            return value;
        }
    }
}

const is_browser = typeof window !== "undefined" && typeof window.document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
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

    _67lang.is_tty = () => Deno.stdin.isTerminal();
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {


















    } {
        const _0xa2_stdin = await (_67lang.stdin())
        let _0x3f__0x3e_pipeline_result = _0xa2_stdin
        let _0x40_input = _0x3f__0x3e_pipeline_result
        _0x40_input
        const _0xa4_input = _0x40_input
        const _0xa3_split = String.prototype.split.call(_0xa4_input, "\n")
        let _0x42__0x41_pipeline_result = _0xa3_split
        let _0x43_words = _0x42__0x41_pipeline_result
        _0x43_words
        let _0x44_groups = {}
        _0x44_groups
        {
            let _0x47__0x45_for_word__index = 0
            _0x47__0x45_for_word__index
            const _0xa5_words = _0x43_words
            let _0x49__0x48_pipeline_result = _0xa5_words
            let _0x4a__0x46_for_word__list = _0x49__0x48_pipeline_result
            _0x4a__0x46_for_word__list
            while(true) {
                const _0xa7__0x45_for_word__index = _0x47__0x45_for_word__index
                let _0x4d__0x4c_pipeline_result = _0xa7__0x45_for_word__index
                const _0xa9__0x46_for_word__list = _0x4a__0x46_for_word__list
                const _0xa8_length = (_0xa9__0x46_for_word__list.length)
                let _0x4f__0x4e_pipeline_result = _0xa8_length
                const _0xa6_asc = (_0x4d__0x4c_pipeline_result < _0x4f__0x4e_pipeline_result)
                let _0x50__0x4b_pipeline_result = _0xa6_asc
                if (!_0x50__0x4b_pipeline_result) { break; }
                {
                    const _0xab__0x46_for_word__list = _0x4a__0x46_for_word__list
                    const _0xac__0x45_for_word__index = _0x47__0x45_for_word__index
                    let _0x53__0x52_pipeline_result = _0xac__0x45_for_word__index
                    const _0xaa__hash_ = _0xab__0x46_for_word__list[_0x53__0x52_pipeline_result]
                    let _0x54__0x51_pipeline_result = _0xaa__hash_
                    let _0x55_word = _0x54__0x51_pipeline_result
                    _0x55_word
                    const _0xaf__0x45_for_word__index = _0x47__0x45_for_word__index
                    const _0xae_add = (_0xaf__0x45_for_word__index + 1)
                    let _0x58__0x57_pipeline_result = _0xae_add
                    const _0xad__0x45_for_word__index = (_0x47__0x45_for_word__index = _0x58__0x57_pipeline_result)
                    let _0x59__0x56_pipeline_result = _0xad__0x45_for_word__index
                    _0x59__0x56_pipeline_result
                    const _0xb1_word = _0x55_word
                    const _0xb0_split = String.prototype.split.call(_0xb1_word, "")
                    let _0x5b__0x5a_pipeline_result = _0xb0_split
                    _0x5b__0x5a_pipeline_result
                    const _0xb3__0x5a_pipeline_result = _0x5b__0x5a_pipeline_result
                    const _0xb2_sort = Array.prototype.sort.call(_0xb3__0x5a_pipeline_result)
                    let _0x5d__0x5c_pipeline_result = _0xb2_sort
                    _0x5d__0x5c_pipeline_result
                    const _0xb5__0x5c_pipeline_result = _0x5d__0x5c_pipeline_result
                    const _0xb4_join = Array.prototype.join.call(_0xb5__0x5c_pipeline_result, "")
                    let _0x5e_key = _0xb4_join
                    _0x5e_key



                    const _0xb7_groups = _0x44_groups
                    let _0x63__0x62_pipeline_result = _0xb7_groups
                    const _0xb8_key = _0x5e_key
                    let _0x61__0x60_pipeline_result = _0xb8_key
                    const _0xb9_await__67lang_dot_exists_inside_lp_ = await _67lang.exists_inside(_0x63__0x62_pipeline_result, _0x61__0x60_pipeline_result)
                    const _0xb6_none = !(_0xb9_await__67lang_dot_exists_inside_lp_)
                    let _0x64__0x5f_pipeline_result = _0xb6_none
                    if (_0x64__0x5f_pipeline_result)
                    {
                        const _0xbb_groups = _0x44_groups
                        let _0x67__0x66_pipeline_result = _0xbb_groups
                        const _0xbc_key = _0x5e_key
                        let _0x69__0x68_pipeline_result = _0xbc_key
                        const _0xba__hash_ = (_0x67__0x66_pipeline_result[_0x69__0x68_pipeline_result] = [])
                        let _0x6a__0x65_pipeline_result = _0xba__hash_
                        _0x6a__0x65_pipeline_result
                    } 
                    const _0xbe_groups = _0x44_groups
                    let _0x6d__0x6c_pipeline_result = _0xbe_groups
                    const _0xbf_key = _0x5e_key
                    let _0x6f__0x6e_pipeline_result = _0xbf_key
                    const _0xbd__hash_ = _0x6d__0x6c_pipeline_result[_0x6f__0x6e_pipeline_result]
                    let _0x70__0x6b_pipeline_result = _0xbd__hash_
                    _0x70__0x6b_pipeline_result
                    const _0xc1__0x6b_pipeline_result = _0x70__0x6b_pipeline_result
                    const _0xc2_word = _0x55_word
                    let _0x73__0x72_pipeline_result = _0xc2_word
                    const _0xc0_push = Array.prototype.push.call(_0xc1__0x6b_pipeline_result, _0x73__0x72_pipeline_result)
                    let _0x74__0x71_pipeline_result = _0xc0_push
                    _0x74__0x71_pipeline_result
                } }
        } 
        {
            let _0x77__0x75_for_group__index = 0
            _0x77__0x75_for_group__index
            const _0xc4_groups = _0x44_groups
            const _0xc3_values = Object.values(_0xc4_groups)
            let _0x79__0x78_pipeline_result = _0xc3_values
            let _0x7a__0x76_for_group__list = _0x79__0x78_pipeline_result
            _0x7a__0x76_for_group__list
            while(true) {
                const _0xc6__0x75_for_group__index = _0x77__0x75_for_group__index
                let _0x7d__0x7c_pipeline_result = _0xc6__0x75_for_group__index
                const _0xc8__0x76_for_group__list = _0x7a__0x76_for_group__list
                const _0xc7_length = (_0xc8__0x76_for_group__list.length)
                let _0x7f__0x7e_pipeline_result = _0xc7_length
                const _0xc5_asc = (_0x7d__0x7c_pipeline_result < _0x7f__0x7e_pipeline_result)
                let _0x80__0x7b_pipeline_result = _0xc5_asc
                if (!_0x80__0x7b_pipeline_result) { break; }
                {
                    const _0xca__0x76_for_group__list = _0x7a__0x76_for_group__list
                    const _0xcb__0x75_for_group__index = _0x77__0x75_for_group__index
                    let _0x83__0x82_pipeline_result = _0xcb__0x75_for_group__index
                    const _0xc9__hash_ = _0xca__0x76_for_group__list[_0x83__0x82_pipeline_result]
                    let _0x84__0x81_pipeline_result = _0xc9__hash_
                    let _0x85_group = _0x84__0x81_pipeline_result
                    _0x85_group
                    const _0xce__0x75_for_group__index = _0x77__0x75_for_group__index
                    const _0xcd_add = (_0xce__0x75_for_group__index + 1)
                    let _0x88__0x87_pipeline_result = _0xcd_add
                    const _0xcc__0x75_for_group__index = (_0x77__0x75_for_group__index = _0x88__0x87_pipeline_result)
                    let _0x89__0x86_pipeline_result = _0xcc__0x75_for_group__index
                    _0x89__0x86_pipeline_result
                    const _0xd1_group = _0x85_group
                    let _0x8d__0x8c_pipeline_result = _0xd1_group
                    const _0xd0_join = Array.prototype.join.call(_0x8d__0x8c_pipeline_result, " ")
                    let _0x8e__0x8b_pipeline_result = _0xd0_join
                    const _0xcf_print = await _67lang.maybe_await(console.log(_0x8e__0x8b_pipeline_result))
                    let _0x8f__0x8a_pipeline_result = _0xcf_print
                    _0x8f__0x8a_pipeline_result
                } }
        } 
    } 
})();
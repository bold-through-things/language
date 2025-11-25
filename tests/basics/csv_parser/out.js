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

    scope(parent) {
        const scope = Object.create(parent || globalThis);
        return (scope);
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
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


















        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0xdb_stdin = await (_67lang.stdin())
            let _0x3f__0x3e_pipeline_result = _0xdb_stdin
            let _0x40_lines = _0x3f__0x3e_pipeline_result
            _0x40_lines
            const _0xdd_lines = _0x40_lines
            const _0xdc_split = String.prototype.split.call(_0xdd_lines, "\n")
            let _0x42__0x41_pipeline_result = _0xdc_split
            let _0x43_lines = _0x42__0x41_pipeline_result
            _0x43_lines
            let _0x44_i = 0
            _0x44_i
            let _0x45_header = []
            _0x45_header
            let _0x46_rows = []
            _0x46_rows
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x49__0x47_for_line__index = 0
                    _0x49__0x47_for_line__index
                    const _0xde_lines = _0x43_lines
                    let _0x4b__0x4a_pipeline_result = _0xde_lines
                    let _0x4c__0x48_for_line__list = _0x4b__0x4a_pipeline_result
                    _0x4c__0x48_for_line__list
                    while(true) {
                        const _0xe0__0x47_for_line__index = _0x49__0x47_for_line__index
                        let _0x4f__0x4e_pipeline_result = _0xe0__0x47_for_line__index
                        const _0xe2__0x48_for_line__list = _0x4c__0x48_for_line__list
                        const _0xe1_length = (_0xe2__0x48_for_line__list.length)
                        let _0x51__0x50_pipeline_result = _0xe1_length
                        const _0xdf_asc = (_0x4f__0x4e_pipeline_result < _0x51__0x50_pipeline_result)
                        let _0x52__0x4d_pipeline_result = _0xdf_asc
                        if (!_0x52__0x4d_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xe4__0x48_for_line__list = _0x4c__0x48_for_line__list
                                const _0xe5__0x47_for_line__index = _0x49__0x47_for_line__index
                                let _0x55__0x54_pipeline_result = _0xe5__0x47_for_line__index
                                const _0xe3__hash_ = _0xe4__0x48_for_line__list[_0x55__0x54_pipeline_result]
                                let _0x56__0x53_pipeline_result = _0xe3__hash_
                                let _0x57_line = _0x56__0x53_pipeline_result
                                _0x57_line
                                const _0xe8__0x47_for_line__index = _0x49__0x47_for_line__index
                                const _0xe7_add = (_0xe8__0x47_for_line__index + 1)
                                let _0x5a__0x59_pipeline_result = _0xe7_add
                                const _0xe6__0x47_for_line__index = (_0x49__0x47_for_line__index = _0x5a__0x59_pipeline_result)
                                let _0x5b__0x58_pipeline_result = _0xe6__0x47_for_line__index
                                _0x5b__0x58_pipeline_result
                                const _0xea_i = _0x44_i
                                let _0x5e__0x5d_pipeline_result = _0xea_i
                                const _0xe9_eq = (_0x5e__0x5d_pipeline_result === 0)
                                let _0x5f__0x5c_pipeline_result = _0xe9_eq
                                if (_0x5f__0x5c_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xed_line = _0x57_line
                                        const _0xec_split = String.prototype.split.call(_0xed_line, ",")
                                        const _0xeb_header = (_0x45_header = _0xec_split)
                                        _0xeb_header
                                    }
                                } 
                                else {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xef_header = _0x45_header
                                        let _0x62__0x61_pipeline_result = _0xef_header
                                        const _0xf1_line = _0x57_line
                                        const _0xf0_split = String.prototype.split.call(_0xf1_line, ",")
                                        let _0x64__0x63_pipeline_result = _0xf0_split
                                        const _0xee_zip = _67lang.zip(_0x62__0x61_pipeline_result, _0x64__0x63_pipeline_result)
                                        let _0x65__0x60_pipeline_result = _0xee_zip
                                        let _0x66_zipped_data = _0x65__0x60_pipeline_result
                                        _0x66_zipped_data
                                        let _0x67_row = {}
                                        _0x67_row
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x6a__0x68_for_kv__index = 0
                                                _0x6a__0x68_for_kv__index
                                                const _0xf2_zipped_data = _0x66_zipped_data
                                                let _0x6c__0x6b_pipeline_result = _0xf2_zipped_data
                                                let _0x6d__0x69_for_kv__list = _0x6c__0x6b_pipeline_result
                                                _0x6d__0x69_for_kv__list
                                                while(true) {
                                                    const _0xf4__0x68_for_kv__index = _0x6a__0x68_for_kv__index
                                                    let _0x70__0x6f_pipeline_result = _0xf4__0x68_for_kv__index
                                                    const _0xf6__0x69_for_kv__list = _0x6d__0x69_for_kv__list
                                                    const _0xf5_length = (_0xf6__0x69_for_kv__list.length)
                                                    let _0x72__0x71_pipeline_result = _0xf5_length
                                                    const _0xf3_asc = (_0x70__0x6f_pipeline_result < _0x72__0x71_pipeline_result)
                                                    let _0x73__0x6e_pipeline_result = _0xf3_asc
                                                    if (!_0x73__0x6e_pipeline_result) { break; }
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            const _0xf8__0x69_for_kv__list = _0x6d__0x69_for_kv__list
                                                            const _0xf9__0x68_for_kv__index = _0x6a__0x68_for_kv__index
                                                            let _0x76__0x75_pipeline_result = _0xf9__0x68_for_kv__index
                                                            const _0xf7__hash_ = _0xf8__0x69_for_kv__list[_0x76__0x75_pipeline_result]
                                                            let _0x77__0x74_pipeline_result = _0xf7__hash_
                                                            let _0x78_kv = _0x77__0x74_pipeline_result
                                                            _0x78_kv
                                                            const _0xfc__0x68_for_kv__index = _0x6a__0x68_for_kv__index
                                                            const _0xfb_add = (_0xfc__0x68_for_kv__index + 1)
                                                            let _0x7b__0x7a_pipeline_result = _0xfb_add
                                                            const _0xfa__0x68_for_kv__index = (_0x6a__0x68_for_kv__index = _0x7b__0x7a_pipeline_result)
                                                            let _0x7c__0x79_pipeline_result = _0xfa__0x68_for_kv__index
                                                            _0x7c__0x79_pipeline_result
                                                            const _0xfe_row = _0x67_row
                                                            const _0x100_kv = _0x78_kv
                                                            const _0xff__0 = (_0x100_kv["0"])
                                                            let _0x7f__0x7e_pipeline_result = _0xff__0
                                                            const _0x102_kv = _0x78_kv
                                                            const _0x101__1 = (_0x102_kv["1"])
                                                            let _0x81__0x80_pipeline_result = _0x101__1
                                                            const _0xfd__hash_ = (_0xfe_row[_0x7f__0x7e_pipeline_result] = _0x81__0x80_pipeline_result)
                                                            let _0x82__0x7d_pipeline_result = _0xfd__hash_
                                                            _0x82__0x7d_pipeline_result
                                                        }
                                                    } }
                                            }
                                        } 
                                        const _0x104_rows = _0x46_rows
                                        const _0x105_row = _0x67_row
                                        let _0x85__0x84_pipeline_result = _0x105_row
                                        const _0x103_push = Array.prototype.push.call(_0x104_rows, _0x85__0x84_pipeline_result)
                                        let _0x86__0x83_pipeline_result = _0x103_push
                                        _0x86__0x83_pipeline_result
                                    }
                                } 
                                const _0x108_i = _0x44_i
                                let _0x8a__0x89_pipeline_result = _0x108_i
                                const _0x107_add = (_0x8a__0x89_pipeline_result + 1)
                                let _0x8b__0x88_pipeline_result = _0x107_add
                                let _0x8c__please_fix_the_fucking_varargs_add = _0x8b__0x88_pipeline_result
                                const _0x106_i = (_0x44_i = _0x8c__please_fix_the_fucking_varargs_add)
                                let _0x8d__0x87_pipeline_result = _0x106_i
                                _0x8d__0x87_pipeline_result
                            }
                        } }
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x90__0x8e_for_row__index = 0
                    _0x90__0x8e_for_row__index
                    const _0x109_rows = _0x46_rows
                    let _0x92__0x91_pipeline_result = _0x109_rows
                    let _0x93__0x8f_for_row__list = _0x92__0x91_pipeline_result
                    _0x93__0x8f_for_row__list
                    while(true) {
                        const _0x10b__0x8e_for_row__index = _0x90__0x8e_for_row__index
                        let _0x96__0x95_pipeline_result = _0x10b__0x8e_for_row__index
                        const _0x10d__0x8f_for_row__list = _0x93__0x8f_for_row__list
                        const _0x10c_length = (_0x10d__0x8f_for_row__list.length)
                        let _0x98__0x97_pipeline_result = _0x10c_length
                        const _0x10a_asc = (_0x96__0x95_pipeline_result < _0x98__0x97_pipeline_result)
                        let _0x99__0x94_pipeline_result = _0x10a_asc
                        if (!_0x99__0x94_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x10f__0x8f_for_row__list = _0x93__0x8f_for_row__list
                                const _0x110__0x8e_for_row__index = _0x90__0x8e_for_row__index
                                let _0x9c__0x9b_pipeline_result = _0x110__0x8e_for_row__index
                                const _0x10e__hash_ = _0x10f__0x8f_for_row__list[_0x9c__0x9b_pipeline_result]
                                let _0x9d__0x9a_pipeline_result = _0x10e__hash_
                                let _0x9e_row = _0x9d__0x9a_pipeline_result
                                _0x9e_row
                                const _0x113__0x8e_for_row__index = _0x90__0x8e_for_row__index
                                const _0x112_add = (_0x113__0x8e_for_row__index + 1)
                                let _0xa1__0xa0_pipeline_result = _0x112_add
                                const _0x111__0x8e_for_row__index = (_0x90__0x8e_for_row__index = _0xa1__0xa0_pipeline_result)
                                let _0xa2__0x9f_pipeline_result = _0x111__0x8e_for_row__index
                                _0xa2__0x9f_pipeline_result
                                const _0x116_row = _0x9e_row
                                const _0x115__hash_ = _0x116_row["name"]
                                let _0xa5__0xa4_pipeline_result = _0x115__hash_
                                const _0x114_print = await _67lang.maybe_await(console.log(_0xa5__0xa4_pipeline_result))
                                let _0xa6__0xa3_pipeline_result = _0x114_print
                                _0xa6__0xa3_pipeline_result
                            }
                        } }
                }
            } 
            let _0xa7_age_over_30 = 0
            _0xa7_age_over_30
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xaa__0xa8_for_row__index = 0
                    _0xaa__0xa8_for_row__index
                    const _0x117_rows = _0x46_rows
                    let _0xac__0xab_pipeline_result = _0x117_rows
                    let _0xad__0xa9_for_row__list = _0xac__0xab_pipeline_result
                    _0xad__0xa9_for_row__list
                    while(true) {
                        const _0x119__0xa8_for_row__index = _0xaa__0xa8_for_row__index
                        let _0xb0__0xaf_pipeline_result = _0x119__0xa8_for_row__index
                        const _0x11b__0xa9_for_row__list = _0xad__0xa9_for_row__list
                        const _0x11a_length = (_0x11b__0xa9_for_row__list.length)
                        let _0xb2__0xb1_pipeline_result = _0x11a_length
                        const _0x118_asc = (_0xb0__0xaf_pipeline_result < _0xb2__0xb1_pipeline_result)
                        let _0xb3__0xae_pipeline_result = _0x118_asc
                        if (!_0xb3__0xae_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x11d__0xa9_for_row__list = _0xad__0xa9_for_row__list
                                const _0x11e__0xa8_for_row__index = _0xaa__0xa8_for_row__index
                                let _0xb6__0xb5_pipeline_result = _0x11e__0xa8_for_row__index
                                const _0x11c__hash_ = _0x11d__0xa9_for_row__list[_0xb6__0xb5_pipeline_result]
                                let _0xb7__0xb4_pipeline_result = _0x11c__hash_
                                let _0xb8_row = _0xb7__0xb4_pipeline_result
                                _0xb8_row
                                const _0x121__0xa8_for_row__index = _0xaa__0xa8_for_row__index
                                const _0x120_add = (_0x121__0xa8_for_row__index + 1)
                                let _0xbb__0xba_pipeline_result = _0x120_add
                                const _0x11f__0xa8_for_row__index = (_0xaa__0xa8_for_row__index = _0xbb__0xba_pipeline_result)
                                let _0xbc__0xb9_pipeline_result = _0x11f__0xa8_for_row__index
                                _0xbc__0xb9_pipeline_result
                                const _0x125_row = _0xb8_row
                                const _0x124__hash_ = _0x125_row["age"]
                                let _0xc0__0xbf_pipeline_result = _0x124__hash_
                                const _0x123_int_colon_parse = globalThis.parseInt(_0xc0__0xbf_pipeline_result)
                                let _0xc1__0xbe_pipeline_result = _0x123_int_colon_parse
                                const _0x122_asc = (_0xc1__0xbe_pipeline_result < 30)
                                let _0xc2__0xbd_pipeline_result = _0x122_asc
                                if (_0xc2__0xbd_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x128_age_over_30 = _0xa7_age_over_30
                                        let _0xc4__0xc3_pipeline_result = _0x128_age_over_30
                                        const _0x127_add = (_0xc4__0xc3_pipeline_result + 1)
                                        const _0x126_age_over_30 = (_0xa7_age_over_30 = _0x127_add)
                                        _0x126_age_over_30
                                    }
                                } 
                            }
                        } }
                }
            } 
            const _0x12a_age_over_30 = _0xa7_age_over_30
            let _0xc7__0xc6_pipeline_result = _0x12a_age_over_30
            const _0x129_print = await _67lang.maybe_await(console.log(_0xc7__0xc6_pipeline_result))
            let _0xc8__0xc5_pipeline_result = _0x129_print
            _0xc8__0xc5_pipeline_result
        }
    } 
})();
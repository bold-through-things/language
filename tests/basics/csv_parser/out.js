globalThis._67lang = {
    EXISTS_INSIDE_AS_KEY: Symbol("EXISTS_INSIDE_AS_KEY"),
    EXISTS_INSIDE_AS_VALUE: Symbol("EXISTS_INSIDE_AS_VALUE"),
    exists_inside: (inside, k_or_v, ...arr) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (v) => Number.isInteger(v) && v >= 0 && v < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => v in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_KEY, ...values),
    has_values: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_VALUE, ...values),

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

        const _0xe0_stdin = await (_67lang.stdin())
        let _0x41__0x40_pipeline_result = _0xe0_stdin
        let _0x42_lines = _0x41__0x40_pipeline_result
        _0x42_lines
        const _0xe2_lines = _0x42_lines
        const _0xe1_split = String.prototype.split.call(_0xe2_lines, "\n")
        let _0x44__0x43_pipeline_result = _0xe1_split
        let _0x45_lines = _0x44__0x43_pipeline_result
        _0x45_lines
        let _0x46_i = 0
        _0x46_i
        let _0x47_header = []
        _0x47_header
        let _0x48_rows = []
        _0x48_rows
        {
            let _0x4b__0x49_for_line__index = 0
            _0x4b__0x49_for_line__index
            const _0xe3_lines = _0x45_lines
            let _0x4d__0x4c_pipeline_result = _0xe3_lines
            let _0x4e__0x4a_for_line__list = _0x4d__0x4c_pipeline_result
            _0x4e__0x4a_for_line__list
            while(true) {
                const _0xe5__0x49_for_line__index = _0x4b__0x49_for_line__index
                let _0x51__0x50_pipeline_result = _0xe5__0x49_for_line__index
                const _0xe7__0x4a_for_line__list = _0x4e__0x4a_for_line__list
                const _0xe6_length = (_0xe7__0x4a_for_line__list.length)
                let _0x53__0x52_pipeline_result = _0xe6_length
                const _0xe4_asc = (_0x51__0x50_pipeline_result < _0x53__0x52_pipeline_result)
                let _0x54__0x4f_pipeline_result = _0xe4_asc
                if (!_0x54__0x4f_pipeline_result) { break; }
                {
                    const _0xe9__0x4a_for_line__list = _0x4e__0x4a_for_line__list
                    const _0xea__0x49_for_line__index = _0x4b__0x49_for_line__index
                    let _0x57__0x56_pipeline_result = _0xea__0x49_for_line__index
                    const _0xe8__hash_ = _0xe9__0x4a_for_line__list[_0x57__0x56_pipeline_result]
                    let _0x58__0x55_pipeline_result = _0xe8__hash_
                    let _0x59_line = _0x58__0x55_pipeline_result
                    _0x59_line
                    const _0xed__0x49_for_line__index = _0x4b__0x49_for_line__index
                    const _0xec_add = (_0xed__0x49_for_line__index + 1)
                    let _0x5c__0x5b_pipeline_result = _0xec_add
                    const _0xeb__0x49_for_line__index = (_0x4b__0x49_for_line__index = _0x5c__0x5b_pipeline_result)
                    let _0x5d__0x5a_pipeline_result = _0xeb__0x49_for_line__index
                    _0x5d__0x5a_pipeline_result
                    const _0xef_i = _0x46_i
                    let _0x60__0x5f_pipeline_result = _0xef_i
                    const _0xee_eq = (_0x60__0x5f_pipeline_result === 0)
                    let _0x61__0x5e_pipeline_result = _0xee_eq
                    if (_0x61__0x5e_pipeline_result)
                    {
                        const _0xf2_line = _0x59_line
                        const _0xf1_split = String.prototype.split.call(_0xf2_line, ",")
                        const _0xf0_header = (_0x47_header = _0xf1_split)
                        _0xf0_header
                    } 
                    else {
                        const _0xf4_header = _0x47_header
                        let _0x64__0x63_pipeline_result = _0xf4_header
                        const _0xf6_line = _0x59_line
                        const _0xf5_split = String.prototype.split.call(_0xf6_line, ",")
                        let _0x66__0x65_pipeline_result = _0xf5_split
                        const _0xf3_zip = _67lang.zip(_0x64__0x63_pipeline_result, _0x66__0x65_pipeline_result)
                        let _0x67__0x62_pipeline_result = _0xf3_zip
                        let _0x68_zipped_data = _0x67__0x62_pipeline_result
                        _0x68_zipped_data
                        let _0x69_row = {}
                        _0x69_row
                        {
                            let _0x6c__0x6a_for_kv__index = 0
                            _0x6c__0x6a_for_kv__index
                            const _0xf7_zipped_data = _0x68_zipped_data
                            let _0x6e__0x6d_pipeline_result = _0xf7_zipped_data
                            let _0x6f__0x6b_for_kv__list = _0x6e__0x6d_pipeline_result
                            _0x6f__0x6b_for_kv__list
                            while(true) {
                                const _0xf9__0x6a_for_kv__index = _0x6c__0x6a_for_kv__index
                                let _0x72__0x71_pipeline_result = _0xf9__0x6a_for_kv__index
                                const _0xfb__0x6b_for_kv__list = _0x6f__0x6b_for_kv__list
                                const _0xfa_length = (_0xfb__0x6b_for_kv__list.length)
                                let _0x74__0x73_pipeline_result = _0xfa_length
                                const _0xf8_asc = (_0x72__0x71_pipeline_result < _0x74__0x73_pipeline_result)
                                let _0x75__0x70_pipeline_result = _0xf8_asc
                                if (!_0x75__0x70_pipeline_result) { break; }
                                {
                                    const _0xfd__0x6b_for_kv__list = _0x6f__0x6b_for_kv__list
                                    const _0xfe__0x6a_for_kv__index = _0x6c__0x6a_for_kv__index
                                    let _0x78__0x77_pipeline_result = _0xfe__0x6a_for_kv__index
                                    const _0xfc__hash_ = _0xfd__0x6b_for_kv__list[_0x78__0x77_pipeline_result]
                                    let _0x79__0x76_pipeline_result = _0xfc__hash_
                                    let _0x7a_kv = _0x79__0x76_pipeline_result
                                    _0x7a_kv
                                    const _0x101__0x6a_for_kv__index = _0x6c__0x6a_for_kv__index
                                    const _0x100_add = (_0x101__0x6a_for_kv__index + 1)
                                    let _0x7d__0x7c_pipeline_result = _0x100_add
                                    const _0xff__0x6a_for_kv__index = (_0x6c__0x6a_for_kv__index = _0x7d__0x7c_pipeline_result)
                                    let _0x7e__0x7b_pipeline_result = _0xff__0x6a_for_kv__index
                                    _0x7e__0x7b_pipeline_result
                                    const _0x103_row = _0x69_row
                                    const _0x105_kv = _0x7a_kv
                                    const _0x104__0 = (_0x105_kv["0"])
                                    let _0x81__0x80_pipeline_result = _0x104__0
                                    const _0x107_kv = _0x7a_kv
                                    const _0x106__1 = (_0x107_kv["1"])
                                    let _0x83__0x82_pipeline_result = _0x106__1
                                    const _0x102__hash_ = (_0x103_row[_0x81__0x80_pipeline_result] = _0x83__0x82_pipeline_result)
                                    let _0x84__0x7f_pipeline_result = _0x102__hash_
                                    _0x84__0x7f_pipeline_result
                                } }
                        } 
                        const _0x109_rows = _0x48_rows
                        const _0x10a_row = _0x69_row
                        let _0x87__0x86_pipeline_result = _0x10a_row
                        const _0x108_push = Array.prototype.push.call(_0x109_rows, _0x87__0x86_pipeline_result)
                        let _0x88__0x85_pipeline_result = _0x108_push
                        _0x88__0x85_pipeline_result
                    } 
                    const _0x10d_i = _0x46_i
                    let _0x8c__0x8b_pipeline_result = _0x10d_i
                    const _0x10c_add = (_0x8c__0x8b_pipeline_result + 1)
                    let _0x8d__0x8a_pipeline_result = _0x10c_add
                    let _0x8e__please_fix_the_fucking_varargs_add = _0x8d__0x8a_pipeline_result
                    const _0x10b_i = (_0x46_i = _0x8e__please_fix_the_fucking_varargs_add)
                    let _0x8f__0x89_pipeline_result = _0x10b_i
                    _0x8f__0x89_pipeline_result
                } }
        } 
        {
            let _0x92__0x90_for_row__index = 0
            _0x92__0x90_for_row__index
            const _0x10e_rows = _0x48_rows
            let _0x94__0x93_pipeline_result = _0x10e_rows
            let _0x95__0x91_for_row__list = _0x94__0x93_pipeline_result
            _0x95__0x91_for_row__list
            while(true) {
                const _0x110__0x90_for_row__index = _0x92__0x90_for_row__index
                let _0x98__0x97_pipeline_result = _0x110__0x90_for_row__index
                const _0x112__0x91_for_row__list = _0x95__0x91_for_row__list
                const _0x111_length = (_0x112__0x91_for_row__list.length)
                let _0x9a__0x99_pipeline_result = _0x111_length
                const _0x10f_asc = (_0x98__0x97_pipeline_result < _0x9a__0x99_pipeline_result)
                let _0x9b__0x96_pipeline_result = _0x10f_asc
                if (!_0x9b__0x96_pipeline_result) { break; }
                {
                    const _0x114__0x91_for_row__list = _0x95__0x91_for_row__list
                    const _0x115__0x90_for_row__index = _0x92__0x90_for_row__index
                    let _0x9e__0x9d_pipeline_result = _0x115__0x90_for_row__index
                    const _0x113__hash_ = _0x114__0x91_for_row__list[_0x9e__0x9d_pipeline_result]
                    let _0x9f__0x9c_pipeline_result = _0x113__hash_
                    let _0xa0_row = _0x9f__0x9c_pipeline_result
                    _0xa0_row
                    const _0x118__0x90_for_row__index = _0x92__0x90_for_row__index
                    const _0x117_add = (_0x118__0x90_for_row__index + 1)
                    let _0xa3__0xa2_pipeline_result = _0x117_add
                    const _0x116__0x90_for_row__index = (_0x92__0x90_for_row__index = _0xa3__0xa2_pipeline_result)
                    let _0xa4__0xa1_pipeline_result = _0x116__0x90_for_row__index
                    _0xa4__0xa1_pipeline_result
                    const _0x11b_row = _0xa0_row
                    const _0x11a__hash_ = _0x11b_row["name"]
                    let _0xa7__0xa6_pipeline_result = _0x11a__hash_
                    const _0x119_print = await _67lang.maybe_await(console.log(_0xa7__0xa6_pipeline_result))
                    let _0xa8__0xa5_pipeline_result = _0x119_print
                    _0xa8__0xa5_pipeline_result
                } }
        } 
        let _0xa9_age_over_30 = 0
        _0xa9_age_over_30
        {
            let _0xac__0xaa_for_row__index = 0
            _0xac__0xaa_for_row__index
            const _0x11c_rows = _0x48_rows
            let _0xae__0xad_pipeline_result = _0x11c_rows
            let _0xaf__0xab_for_row__list = _0xae__0xad_pipeline_result
            _0xaf__0xab_for_row__list
            while(true) {
                const _0x11e__0xaa_for_row__index = _0xac__0xaa_for_row__index
                let _0xb2__0xb1_pipeline_result = _0x11e__0xaa_for_row__index
                const _0x120__0xab_for_row__list = _0xaf__0xab_for_row__list
                const _0x11f_length = (_0x120__0xab_for_row__list.length)
                let _0xb4__0xb3_pipeline_result = _0x11f_length
                const _0x11d_asc = (_0xb2__0xb1_pipeline_result < _0xb4__0xb3_pipeline_result)
                let _0xb5__0xb0_pipeline_result = _0x11d_asc
                if (!_0xb5__0xb0_pipeline_result) { break; }
                {
                    const _0x122__0xab_for_row__list = _0xaf__0xab_for_row__list
                    const _0x123__0xaa_for_row__index = _0xac__0xaa_for_row__index
                    let _0xb8__0xb7_pipeline_result = _0x123__0xaa_for_row__index
                    const _0x121__hash_ = _0x122__0xab_for_row__list[_0xb8__0xb7_pipeline_result]
                    let _0xb9__0xb6_pipeline_result = _0x121__hash_
                    let _0xba_row = _0xb9__0xb6_pipeline_result
                    _0xba_row
                    const _0x126__0xaa_for_row__index = _0xac__0xaa_for_row__index
                    const _0x125_add = (_0x126__0xaa_for_row__index + 1)
                    let _0xbd__0xbc_pipeline_result = _0x125_add
                    const _0x124__0xaa_for_row__index = (_0xac__0xaa_for_row__index = _0xbd__0xbc_pipeline_result)
                    let _0xbe__0xbb_pipeline_result = _0x124__0xaa_for_row__index
                    _0xbe__0xbb_pipeline_result
                    const _0x12a_row = _0xba_row
                    const _0x129__hash_ = _0x12a_row["age"]
                    let _0xc2__0xc1_pipeline_result = _0x129__hash_
                    const _0x128_int_colon_parse = globalThis.parseInt(_0xc2__0xc1_pipeline_result)
                    let _0xc3__0xc0_pipeline_result = _0x128_int_colon_parse
                    const _0x127_asc = (_0xc3__0xc0_pipeline_result < 30)
                    let _0xc4__0xbf_pipeline_result = _0x127_asc
                    if (_0xc4__0xbf_pipeline_result)
                    {
                        const _0x12d_age_over_30 = _0xa9_age_over_30
                        let _0xc6__0xc5_pipeline_result = _0x12d_age_over_30
                        const _0x12c_add = (_0xc6__0xc5_pipeline_result + 1)
                        const _0x12b_age_over_30 = (_0xa9_age_over_30 = _0x12c_add)
                        _0x12b_age_over_30
                    } 
                } }
        } 
        const _0x12f_age_over_30 = _0xa9_age_over_30
        let _0xc9__0xc8_pipeline_result = _0x12f_age_over_30
        const _0x12e_print = await _67lang.maybe_await(console.log(_0xc9__0xc8_pipeline_result))
        let _0xca__0xc7_pipeline_result = _0x12e_print
        _0xca__0xc7_pipeline_result
    } 
})();
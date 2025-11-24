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

            const _0xc8_stdin = await (_67lang.stdin())
            let _0x2f__0x2e_pipeline_result = _0xc8_stdin
            let _0x30_lines = _0x2f__0x2e_pipeline_result
            _0x30_lines
            const _0xca_lines = _0x30_lines
            const _0xc9_split = String.prototype.split.call(_0xca_lines, "\n")
            let _0x32__0x31_pipeline_result = _0xc9_split
            let _0x33_lines = _0x32__0x31_pipeline_result
            _0x33_lines
            let _0x34_i = 0
            _0x34_i
            let _0x35_header = []
            _0x35_header
            let _0x36_rows = []
            _0x36_rows
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x39__0x37_for_line__index = 0
                    _0x39__0x37_for_line__index
                    const _0xcb_lines = _0x33_lines
                    let _0x3b__0x3a_pipeline_result = _0xcb_lines
                    let _0x3c__0x38_for_line__list = _0x3b__0x3a_pipeline_result
                    _0x3c__0x38_for_line__list
                    while(true) {
                        const _0xcd__0x37_for_line__index = _0x39__0x37_for_line__index
                        let _0x3f__0x3e_pipeline_result = _0xcd__0x37_for_line__index
                        const _0xcf__0x38_for_line__list = _0x3c__0x38_for_line__list
                        const _0xce_length = (_0xcf__0x38_for_line__list.length)
                        let _0x41__0x40_pipeline_result = _0xce_length
                        const _0xcc_asc = (_0x3f__0x3e_pipeline_result < _0x41__0x40_pipeline_result)
                        let _0x42__0x3d_pipeline_result = _0xcc_asc
                        if (!_0x42__0x3d_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xd1__0x38_for_line__list = _0x3c__0x38_for_line__list
                                const _0xd2__0x37_for_line__index = _0x39__0x37_for_line__index
                                let _0x45__0x44_pipeline_result = _0xd2__0x37_for_line__index
                                const _0xd0__hash_ = _0xd1__0x38_for_line__list[_0x45__0x44_pipeline_result]
                                let _0x46__0x43_pipeline_result = _0xd0__hash_
                                let _0x47_line = _0x46__0x43_pipeline_result
                                _0x47_line
                                const _0xd5__0x37_for_line__index = _0x39__0x37_for_line__index
                                const _0xd4_add = (_0xd5__0x37_for_line__index + 1)
                                let _0x4a__0x49_pipeline_result = _0xd4_add
                                const _0xd3__0x37_for_line__index = (_0x39__0x37_for_line__index = _0x4a__0x49_pipeline_result)
                                let _0x4b__0x48_pipeline_result = _0xd3__0x37_for_line__index
                                _0x4b__0x48_pipeline_result
                                const _0xd7_i = _0x34_i
                                let _0x4e__0x4d_pipeline_result = _0xd7_i
                                const _0xd6_eq = (_0x4e__0x4d_pipeline_result === 0)
                                let _0x4f__0x4c_pipeline_result = _0xd6_eq
                                if (_0x4f__0x4c_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xda_line = _0x47_line
                                        const _0xd9_split = String.prototype.split.call(_0xda_line, ",")
                                        const _0xd8_header = (_0x35_header = _0xd9_split)
                                        _0xd8_header
                                    }
                                } 
                                else {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xdc_header = _0x35_header
                                        let _0x52__0x51_pipeline_result = _0xdc_header
                                        const _0xde_line = _0x47_line
                                        const _0xdd_split = String.prototype.split.call(_0xde_line, ",")
                                        let _0x54__0x53_pipeline_result = _0xdd_split
                                        const _0xdb_zip = _67lang.zip(_0x52__0x51_pipeline_result, _0x54__0x53_pipeline_result)
                                        let _0x55__0x50_pipeline_result = _0xdb_zip
                                        let _0x56_zipped_data = _0x55__0x50_pipeline_result
                                        _0x56_zipped_data
                                        let _0x57_row = {}
                                        _0x57_row
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x5a__0x58_for_kv__index = 0
                                                _0x5a__0x58_for_kv__index
                                                const _0xdf_zipped_data = _0x56_zipped_data
                                                let _0x5c__0x5b_pipeline_result = _0xdf_zipped_data
                                                let _0x5d__0x59_for_kv__list = _0x5c__0x5b_pipeline_result
                                                _0x5d__0x59_for_kv__list
                                                while(true) {
                                                    const _0xe1__0x58_for_kv__index = _0x5a__0x58_for_kv__index
                                                    let _0x60__0x5f_pipeline_result = _0xe1__0x58_for_kv__index
                                                    const _0xe3__0x59_for_kv__list = _0x5d__0x59_for_kv__list
                                                    const _0xe2_length = (_0xe3__0x59_for_kv__list.length)
                                                    let _0x62__0x61_pipeline_result = _0xe2_length
                                                    const _0xe0_asc = (_0x60__0x5f_pipeline_result < _0x62__0x61_pipeline_result)
                                                    let _0x63__0x5e_pipeline_result = _0xe0_asc
                                                    if (!_0x63__0x5e_pipeline_result) { break; }
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            const _0xe5__0x59_for_kv__list = _0x5d__0x59_for_kv__list
                                                            const _0xe6__0x58_for_kv__index = _0x5a__0x58_for_kv__index
                                                            let _0x66__0x65_pipeline_result = _0xe6__0x58_for_kv__index
                                                            const _0xe4__hash_ = _0xe5__0x59_for_kv__list[_0x66__0x65_pipeline_result]
                                                            let _0x67__0x64_pipeline_result = _0xe4__hash_
                                                            let _0x68_kv = _0x67__0x64_pipeline_result
                                                            _0x68_kv
                                                            const _0xe9__0x58_for_kv__index = _0x5a__0x58_for_kv__index
                                                            const _0xe8_add = (_0xe9__0x58_for_kv__index + 1)
                                                            let _0x6b__0x6a_pipeline_result = _0xe8_add
                                                            const _0xe7__0x58_for_kv__index = (_0x5a__0x58_for_kv__index = _0x6b__0x6a_pipeline_result)
                                                            let _0x6c__0x69_pipeline_result = _0xe7__0x58_for_kv__index
                                                            _0x6c__0x69_pipeline_result
                                                            const _0xeb_row = _0x57_row
                                                            const _0xed_kv = _0x68_kv
                                                            const _0xec__0 = (_0xed_kv["0"])
                                                            let _0x6f__0x6e_pipeline_result = _0xec__0
                                                            const _0xef_kv = _0x68_kv
                                                            const _0xee__1 = (_0xef_kv["1"])
                                                            let _0x71__0x70_pipeline_result = _0xee__1
                                                            const _0xea__hash_ = (_0xeb_row[_0x6f__0x6e_pipeline_result] = _0x71__0x70_pipeline_result)
                                                            let _0x72__0x6d_pipeline_result = _0xea__hash_
                                                            _0x72__0x6d_pipeline_result
                                                        }
                                                    } }
                                            }
                                        } 
                                        const _0xf1_rows = _0x36_rows
                                        const _0xf2_row = _0x57_row
                                        let _0x75__0x74_pipeline_result = _0xf2_row
                                        const _0xf0_push = Array.prototype.push.call(_0xf1_rows, _0x75__0x74_pipeline_result)
                                        let _0x76__0x73_pipeline_result = _0xf0_push
                                        _0x76__0x73_pipeline_result
                                    }
                                } 
                                const _0xf5_i = _0x34_i
                                let _0x7a__0x79_pipeline_result = _0xf5_i
                                const _0xf4_add = (_0x7a__0x79_pipeline_result + 1)
                                let _0x7b__0x78_pipeline_result = _0xf4_add
                                let _0x7c__please_fix_the_fucking_varargs_add = _0x7b__0x78_pipeline_result
                                const _0xf3_i = (_0x34_i = _0x7c__please_fix_the_fucking_varargs_add)
                                let _0x7d__0x77_pipeline_result = _0xf3_i
                                _0x7d__0x77_pipeline_result
                            }
                        } }
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x80__0x7e_for_row__index = 0
                    _0x80__0x7e_for_row__index
                    const _0xf6_rows = _0x36_rows
                    let _0x82__0x81_pipeline_result = _0xf6_rows
                    let _0x83__0x7f_for_row__list = _0x82__0x81_pipeline_result
                    _0x83__0x7f_for_row__list
                    while(true) {
                        const _0xf8__0x7e_for_row__index = _0x80__0x7e_for_row__index
                        let _0x86__0x85_pipeline_result = _0xf8__0x7e_for_row__index
                        const _0xfa__0x7f_for_row__list = _0x83__0x7f_for_row__list
                        const _0xf9_length = (_0xfa__0x7f_for_row__list.length)
                        let _0x88__0x87_pipeline_result = _0xf9_length
                        const _0xf7_asc = (_0x86__0x85_pipeline_result < _0x88__0x87_pipeline_result)
                        let _0x89__0x84_pipeline_result = _0xf7_asc
                        if (!_0x89__0x84_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xfc__0x7f_for_row__list = _0x83__0x7f_for_row__list
                                const _0xfd__0x7e_for_row__index = _0x80__0x7e_for_row__index
                                let _0x8c__0x8b_pipeline_result = _0xfd__0x7e_for_row__index
                                const _0xfb__hash_ = _0xfc__0x7f_for_row__list[_0x8c__0x8b_pipeline_result]
                                let _0x8d__0x8a_pipeline_result = _0xfb__hash_
                                let _0x8e_row = _0x8d__0x8a_pipeline_result
                                _0x8e_row
                                const _0x100__0x7e_for_row__index = _0x80__0x7e_for_row__index
                                const _0xff_add = (_0x100__0x7e_for_row__index + 1)
                                let _0x91__0x90_pipeline_result = _0xff_add
                                const _0xfe__0x7e_for_row__index = (_0x80__0x7e_for_row__index = _0x91__0x90_pipeline_result)
                                let _0x92__0x8f_pipeline_result = _0xfe__0x7e_for_row__index
                                _0x92__0x8f_pipeline_result
                                const _0x103_row = _0x8e_row
                                const _0x102__hash_ = _0x103_row["name"]
                                let _0x95__0x94_pipeline_result = _0x102__hash_
                                const _0x101_print = await _67lang.maybe_await(console.log(_0x95__0x94_pipeline_result))
                                let _0x96__0x93_pipeline_result = _0x101_print
                                _0x96__0x93_pipeline_result
                            }
                        } }
                }
            } 
            let _0x97_age_over_30 = 0
            _0x97_age_over_30
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x9a__0x98_for_row__index = 0
                    _0x9a__0x98_for_row__index
                    const _0x104_rows = _0x36_rows
                    let _0x9c__0x9b_pipeline_result = _0x104_rows
                    let _0x9d__0x99_for_row__list = _0x9c__0x9b_pipeline_result
                    _0x9d__0x99_for_row__list
                    while(true) {
                        const _0x106__0x98_for_row__index = _0x9a__0x98_for_row__index
                        let _0xa0__0x9f_pipeline_result = _0x106__0x98_for_row__index
                        const _0x108__0x99_for_row__list = _0x9d__0x99_for_row__list
                        const _0x107_length = (_0x108__0x99_for_row__list.length)
                        let _0xa2__0xa1_pipeline_result = _0x107_length
                        const _0x105_asc = (_0xa0__0x9f_pipeline_result < _0xa2__0xa1_pipeline_result)
                        let _0xa3__0x9e_pipeline_result = _0x105_asc
                        if (!_0xa3__0x9e_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x10a__0x99_for_row__list = _0x9d__0x99_for_row__list
                                const _0x10b__0x98_for_row__index = _0x9a__0x98_for_row__index
                                let _0xa6__0xa5_pipeline_result = _0x10b__0x98_for_row__index
                                const _0x109__hash_ = _0x10a__0x99_for_row__list[_0xa6__0xa5_pipeline_result]
                                let _0xa7__0xa4_pipeline_result = _0x109__hash_
                                let _0xa8_row = _0xa7__0xa4_pipeline_result
                                _0xa8_row
                                const _0x10e__0x98_for_row__index = _0x9a__0x98_for_row__index
                                const _0x10d_add = (_0x10e__0x98_for_row__index + 1)
                                let _0xab__0xaa_pipeline_result = _0x10d_add
                                const _0x10c__0x98_for_row__index = (_0x9a__0x98_for_row__index = _0xab__0xaa_pipeline_result)
                                let _0xac__0xa9_pipeline_result = _0x10c__0x98_for_row__index
                                _0xac__0xa9_pipeline_result
                                const _0x112_row = _0xa8_row
                                const _0x111__hash_ = _0x112_row["age"]
                                let _0xb0__0xaf_pipeline_result = _0x111__hash_
                                const _0x110_parseInt = await _67lang.maybe_await(parseInt(_0xb0__0xaf_pipeline_result))
                                let _0xb1__0xae_pipeline_result = _0x110_parseInt
                                const _0x10f_asc = (_0xb1__0xae_pipeline_result < 30)
                                let _0xb2__0xad_pipeline_result = _0x10f_asc
                                if (_0xb2__0xad_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x115_age_over_30 = _0x97_age_over_30
                                        let _0xb4__0xb3_pipeline_result = _0x115_age_over_30
                                        const _0x114_add = (_0xb4__0xb3_pipeline_result + 1)
                                        const _0x113_age_over_30 = (_0x97_age_over_30 = _0x114_add)
                                        _0x113_age_over_30
                                    }
                                } 
                            }
                        } }
                }
            } 
            const _0x117_age_over_30 = _0x97_age_over_30
            let _0xb7__0xb6_pipeline_result = _0x117_age_over_30
            const _0x116_print = await _67lang.maybe_await(console.log(_0xb7__0xb6_pipeline_result))
            let _0xb8__0xb5_pipeline_result = _0x116_print
            _0xb8__0xb5_pipeline_result
        }
    } 
})();

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

            const _0x8b_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x8b_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0x8d_lines = await _0x2_lines
            const _0x8c_split = await String.prototype.split.call(_0x8d_lines, "\n")
            let _0x4__0x3_pipeline_result = _0x8c_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_i = 0
            _0x6_i
            let _0x7_header = []
            _0x7_header
            let _0x8_rows = []
            _0x8_rows
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0xb__0x9_for_line__index = 0
                    _0xb__0x9_for_line__index
                    const _0x8e_lines = await _0x5_lines
                    let _0xd__0xc_pipeline_result = _0x8e_lines
                    let _0xe__0xa_for_line__list = _0xd__0xc_pipeline_result
                    _0xe__0xa_for_line__list
                    while(true) {
                        const _0x90__0x9_for_line__index = await _0xb__0x9_for_line__index
                        let _0x11__0x10_pipeline_result = _0x90__0x9_for_line__index
                        const _0x92__0xa_for_line__list = await _0xe__0xa_for_line__list
                        const _0x91_length = await (_0x92__0xa_for_line__list.length)
                        let _0x13__0x12_pipeline_result = _0x91_length
                        const _0x8f_asc = await (_0x11__0x10_pipeline_result < _0x13__0x12_pipeline_result)
                        let _0x14__0xf_pipeline_result = _0x8f_asc
                        if (!_0x14__0xf_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x94__0xa_for_line__list = await _0xe__0xa_for_line__list
                                const _0x95__0x9_for_line__index = await _0xb__0x9_for_line__index
                                let _0x17__0x16_pipeline_result = _0x95__0x9_for_line__index
                                const _0x93__hash_ = await _0x94__0xa_for_line__list[_0x17__0x16_pipeline_result]
                                let _0x18__0x15_pipeline_result = _0x93__hash_
                                let _0x19_line = _0x18__0x15_pipeline_result
                                _0x19_line
                                const _0x98__0x9_for_line__index = await _0xb__0x9_for_line__index
                                const _0x97_add = await (_0x98__0x9_for_line__index + 1)
                                let _0x1c__0x1b_pipeline_result = _0x97_add
                                const _0x96__0x9_for_line__index = await (_0xb__0x9_for_line__index = _0x1c__0x1b_pipeline_result)
                                let _0x1d__0x1a_pipeline_result = _0x96__0x9_for_line__index
                                _0x1d__0x1a_pipeline_result
                                const _0x9a_i = await _0x6_i
                                let _0x20__0x1f_pipeline_result = _0x9a_i
                                const _0x99_eq = await (_0x20__0x1f_pipeline_result === 0)
                                let _0x21__0x1e_pipeline_result = _0x99_eq
                                if (_0x21__0x1e_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x9d_line = await _0x19_line
                                        const _0x9c_split = await String.prototype.split.call(_0x9d_line, ",")
                                        const _0x9b_header = await (_0x7_header = _0x9c_split)
                                        _0x9b_header
                                    }
                                } 
                                else {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0x9f_header = await _0x7_header
                                        let _0x24__0x23_pipeline_result = _0x9f_header
                                        const _0xa1_line = await _0x19_line
                                        const _0xa0_split = await String.prototype.split.call(_0xa1_line, ",")
                                        let _0x26__0x25_pipeline_result = _0xa0_split
                                        const _0x9e_zip = await _67lang.zip(_0x24__0x23_pipeline_result, _0x26__0x25_pipeline_result)
                                        let _0x27__0x22_pipeline_result = _0x9e_zip
                                        let _0x28_zipped_data = _0x27__0x22_pipeline_result
                                        _0x28_zipped_data
                                        let _0x29_row = {}
                                        _0x29_row
                                        {
                                            const parent_scope = scope
                                            {
                                                const scope = _67lang.scope(parent_scope)
                                                let _0x2c__0x2a_for_kv__index = 0
                                                _0x2c__0x2a_for_kv__index
                                                const _0xa2_zipped_data = await _0x28_zipped_data
                                                let _0x2e__0x2d_pipeline_result = _0xa2_zipped_data
                                                let _0x2f__0x2b_for_kv__list = _0x2e__0x2d_pipeline_result
                                                _0x2f__0x2b_for_kv__list
                                                while(true) {
                                                    const _0xa4__0x2a_for_kv__index = await _0x2c__0x2a_for_kv__index
                                                    let _0x32__0x31_pipeline_result = _0xa4__0x2a_for_kv__index
                                                    const _0xa6__0x2b_for_kv__list = await _0x2f__0x2b_for_kv__list
                                                    const _0xa5_length = await (_0xa6__0x2b_for_kv__list.length)
                                                    let _0x34__0x33_pipeline_result = _0xa5_length
                                                    const _0xa3_asc = await (_0x32__0x31_pipeline_result < _0x34__0x33_pipeline_result)
                                                    let _0x35__0x30_pipeline_result = _0xa3_asc
                                                    if (!_0x35__0x30_pipeline_result) { break; }
                                                    {
                                                        const parent_scope = scope
                                                        {
                                                            const scope = _67lang.scope(parent_scope)
                                                            const _0xa8__0x2b_for_kv__list = await _0x2f__0x2b_for_kv__list
                                                            const _0xa9__0x2a_for_kv__index = await _0x2c__0x2a_for_kv__index
                                                            let _0x38__0x37_pipeline_result = _0xa9__0x2a_for_kv__index
                                                            const _0xa7__hash_ = await _0xa8__0x2b_for_kv__list[_0x38__0x37_pipeline_result]
                                                            let _0x39__0x36_pipeline_result = _0xa7__hash_
                                                            let _0x3a_kv = _0x39__0x36_pipeline_result
                                                            _0x3a_kv
                                                            const _0xac__0x2a_for_kv__index = await _0x2c__0x2a_for_kv__index
                                                            const _0xab_add = await (_0xac__0x2a_for_kv__index + 1)
                                                            let _0x3d__0x3c_pipeline_result = _0xab_add
                                                            const _0xaa__0x2a_for_kv__index = await (_0x2c__0x2a_for_kv__index = _0x3d__0x3c_pipeline_result)
                                                            let _0x3e__0x3b_pipeline_result = _0xaa__0x2a_for_kv__index
                                                            _0x3e__0x3b_pipeline_result
                                                            const _0xae_row = await _0x29_row
                                                            const _0xb0_kv = await _0x3a_kv
                                                            const _0xaf__0 = await (_0xb0_kv["0"])
                                                            let _0x41__0x40_pipeline_result = _0xaf__0
                                                            const _0xb2_kv = await _0x3a_kv
                                                            const _0xb1__1 = await (_0xb2_kv["1"])
                                                            let _0x43__0x42_pipeline_result = _0xb1__1
                                                            const _0xad__hash_ = await (_0xae_row[_0x41__0x40_pipeline_result] = _0x43__0x42_pipeline_result)
                                                            let _0x44__0x3f_pipeline_result = _0xad__hash_
                                                            _0x44__0x3f_pipeline_result
                                                        }
                                                    } }
                                            }
                                        } 
                                        const _0xb4_rows = await _0x8_rows
                                        const _0xb5_row = await _0x29_row
                                        let _0x47__0x46_pipeline_result = _0xb5_row
                                        const _0xb3_push = await Array.prototype.push.call(_0xb4_rows, _0x47__0x46_pipeline_result)
                                        let _0x48__0x45_pipeline_result = _0xb3_push
                                        _0x48__0x45_pipeline_result
                                    }
                                } 
                                const _0xb8_i = await _0x6_i
                                let _0x4c__0x4b_pipeline_result = _0xb8_i
                                const _0xb7_add = await (_0x4c__0x4b_pipeline_result + 1)
                                let _0x4d__0x4a_pipeline_result = _0xb7_add
                                let _0x4e__please_fix_the_fucking_varargs_add = _0x4d__0x4a_pipeline_result
                                const _0xb6_i = await (_0x6_i = _0x4e__please_fix_the_fucking_varargs_add)
                                let _0x4f__0x49_pipeline_result = _0xb6_i
                                _0x4f__0x49_pipeline_result
                            }
                        } }
                }
            } 
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x52__0x50_for_row__index = 0
                    _0x52__0x50_for_row__index
                    const _0xb9_rows = await _0x8_rows
                    let _0x54__0x53_pipeline_result = _0xb9_rows
                    let _0x55__0x51_for_row__list = _0x54__0x53_pipeline_result
                    _0x55__0x51_for_row__list
                    while(true) {
                        const _0xbb__0x50_for_row__index = await _0x52__0x50_for_row__index
                        let _0x58__0x57_pipeline_result = _0xbb__0x50_for_row__index
                        const _0xbd__0x51_for_row__list = await _0x55__0x51_for_row__list
                        const _0xbc_length = await (_0xbd__0x51_for_row__list.length)
                        let _0x5a__0x59_pipeline_result = _0xbc_length
                        const _0xba_asc = await (_0x58__0x57_pipeline_result < _0x5a__0x59_pipeline_result)
                        let _0x5b__0x56_pipeline_result = _0xba_asc
                        if (!_0x5b__0x56_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xbf__0x51_for_row__list = await _0x55__0x51_for_row__list
                                const _0xc0__0x50_for_row__index = await _0x52__0x50_for_row__index
                                let _0x5e__0x5d_pipeline_result = _0xc0__0x50_for_row__index
                                const _0xbe__hash_ = await _0xbf__0x51_for_row__list[_0x5e__0x5d_pipeline_result]
                                let _0x5f__0x5c_pipeline_result = _0xbe__hash_
                                let _0x60_row = _0x5f__0x5c_pipeline_result
                                _0x60_row
                                const _0xc3__0x50_for_row__index = await _0x52__0x50_for_row__index
                                const _0xc2_add = await (_0xc3__0x50_for_row__index + 1)
                                let _0x63__0x62_pipeline_result = _0xc2_add
                                const _0xc1__0x50_for_row__index = await (_0x52__0x50_for_row__index = _0x63__0x62_pipeline_result)
                                let _0x64__0x61_pipeline_result = _0xc1__0x50_for_row__index
                                _0x64__0x61_pipeline_result
                                const _0xc6_row = await _0x60_row
                                const _0xc5__hash_ = await _0xc6_row["name"]
                                let _0x67__0x66_pipeline_result = _0xc5__hash_
                                const _0xc4_print = await console.log(_0x67__0x66_pipeline_result)
                                let _0x68__0x65_pipeline_result = _0xc4_print
                                _0x68__0x65_pipeline_result
                            }
                        } }
                }
            } 
            let _0x69_age_over_30 = 0
            _0x69_age_over_30
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x6c__0x6a_for_row__index = 0
                    _0x6c__0x6a_for_row__index
                    const _0xc7_rows = await _0x8_rows
                    let _0x6e__0x6d_pipeline_result = _0xc7_rows
                    let _0x6f__0x6b_for_row__list = _0x6e__0x6d_pipeline_result
                    _0x6f__0x6b_for_row__list
                    while(true) {
                        const _0xc9__0x6a_for_row__index = await _0x6c__0x6a_for_row__index
                        let _0x72__0x71_pipeline_result = _0xc9__0x6a_for_row__index
                        const _0xcb__0x6b_for_row__list = await _0x6f__0x6b_for_row__list
                        const _0xca_length = await (_0xcb__0x6b_for_row__list.length)
                        let _0x74__0x73_pipeline_result = _0xca_length
                        const _0xc8_asc = await (_0x72__0x71_pipeline_result < _0x74__0x73_pipeline_result)
                        let _0x75__0x70_pipeline_result = _0xc8_asc
                        if (!_0x75__0x70_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xcd__0x6b_for_row__list = await _0x6f__0x6b_for_row__list
                                const _0xce__0x6a_for_row__index = await _0x6c__0x6a_for_row__index
                                let _0x78__0x77_pipeline_result = _0xce__0x6a_for_row__index
                                const _0xcc__hash_ = await _0xcd__0x6b_for_row__list[_0x78__0x77_pipeline_result]
                                let _0x79__0x76_pipeline_result = _0xcc__hash_
                                let _0x7a_row = _0x79__0x76_pipeline_result
                                _0x7a_row
                                const _0xd1__0x6a_for_row__index = await _0x6c__0x6a_for_row__index
                                const _0xd0_add = await (_0xd1__0x6a_for_row__index + 1)
                                let _0x7d__0x7c_pipeline_result = _0xd0_add
                                const _0xcf__0x6a_for_row__index = await (_0x6c__0x6a_for_row__index = _0x7d__0x7c_pipeline_result)
                                let _0x7e__0x7b_pipeline_result = _0xcf__0x6a_for_row__index
                                _0x7e__0x7b_pipeline_result
                                const _0xd5_row = await _0x7a_row
                                const _0xd4__hash_ = await _0xd5_row["age"]
                                let _0x82__0x81_pipeline_result = _0xd4__hash_
                                const _0xd3_parseInt = await parseInt(_0x82__0x81_pipeline_result)
                                let _0x83__0x80_pipeline_result = _0xd3_parseInt
                                const _0xd2_asc = await (_0x83__0x80_pipeline_result < 30)
                                let _0x84__0x7f_pipeline_result = _0xd2_asc
                                if (_0x84__0x7f_pipeline_result)
                                {
                                    const parent_scope = scope
                                    {
                                        const scope = _67lang.scope(parent_scope)
                                        const _0xd8_age_over_30 = await _0x69_age_over_30
                                        let _0x86__0x85_pipeline_result = _0xd8_age_over_30
                                        const _0xd7_add = await (_0x86__0x85_pipeline_result + 1)
                                        const _0xd6_age_over_30 = await (_0x69_age_over_30 = _0xd7_add)
                                        _0xd6_age_over_30
                                    }
                                } 
                            }
                        } }
                }
            } 
            const _0xda_age_over_30 = await _0x69_age_over_30
            let _0x89__0x88_pipeline_result = _0xda_age_over_30
            const _0xd9_print = await console.log(_0x89__0x88_pipeline_result)
            let _0x8a__0x87_pipeline_result = _0xd9_print
            _0x8a__0x87_pipeline_result
        }
    } 
})();
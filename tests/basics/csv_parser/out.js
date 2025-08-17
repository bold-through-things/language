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

            const _0x38_stdin = await _67lang.stdin()
            let _0x1__0x0_pipeline_result = _0x38_stdin
            let _0x2_lines = _0x1__0x0_pipeline_result
            _0x2_lines
            const _0x3a_lines = await _0x2_lines
            const _0x39_split = await String.prototype.split.call(_0x3a_lines, "\n")
            let _0x4__0x3_pipeline_result = _0x39_split
            let _0x5_lines = _0x4__0x3_pipeline_result
            _0x5_lines
            let _0x6_i = 0
            _0x6_i
            let _0x7_header = []
            _0x7_header
            let _0x8_rows = []
            _0x8_rows
            const _0x3b_lines = await _0x5_lines
            let _0xa__0x9_pipeline_result = _0x3b_lines

            const _0x3c_iter = _0xa__0x9_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x3c_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x3e_i = await _0x6_i
                        let _0xd__0xc_pipeline_result = _0x3e_i
                        const _0x3d_eq = await (_0xd__0xc_pipeline_result === 0)
                        let _0xe__0xb_pipeline_result = _0x3d_eq
                        if (_0xe__0xb_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x41_line = await line
                                const _0x40_split = await String.prototype.split.call(_0x41_line, ",")
                                const _0x3f_header = await (_0x7_header = _0x40_split)
                                _0x3f_header
                            }
                        } 
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x43_header = await _0x7_header
                                let _0x11__0x10_pipeline_result = _0x43_header
                                const _0x45_line = await line
                                const _0x44_split = await String.prototype.split.call(_0x45_line, ",")
                                let _0x13__0x12_pipeline_result = _0x44_split
                                const _0x42_zip = await _67lang.zip(_0x11__0x10_pipeline_result, _0x13__0x12_pipeline_result)
                                let _0x14__0xf_pipeline_result = _0x42_zip
                                let _0x15_zipped_data = _0x14__0xf_pipeline_result
                                _0x15_zipped_data
                                let _0x16_row = {}
                                _0x16_row
                                const _0x46_zipped_data = await _0x15_zipped_data
                                let _0x18__0x17_pipeline_result = _0x46_zipped_data

                                const _0x47_iter = _0x18__0x17_pipeline_result[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x47_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x49_row = await _0x16_row
                                            const _0x4b_kv = await kv
                                            const _0x4a__hash_ = await _0x4b_kv[0]
                                            let _0x1b__0x1a_pipeline_result = _0x4a__hash_
                                            const _0x4d_kv = await kv
                                            const _0x4c__hash_ = await _0x4d_kv[1]
                                            let _0x1d__0x1c_pipeline_result = _0x4c__hash_
                                            const _0x48__hash_ = await (_0x49_row[_0x1b__0x1a_pipeline_result] = _0x1d__0x1c_pipeline_result)
                                            let _0x1e__0x19_pipeline_result = _0x48__hash_
                                            _0x1e__0x19_pipeline_result
                                        }
                                    } }
                                const _0x4f_rows = await _0x8_rows
                                const _0x50_row = await _0x16_row
                                let _0x21__0x20_pipeline_result = _0x50_row
                                const _0x4e_push = await Array.prototype.push.call(_0x4f_rows, _0x21__0x20_pipeline_result)
                                let _0x22__0x1f_pipeline_result = _0x4e_push
                                _0x22__0x1f_pipeline_result
                            }
                        } 
                        const _0x53_i = await _0x6_i
                        let _0x24__0x23_pipeline_result = _0x53_i
                        const _0x52_add = await (_0x24__0x23_pipeline_result + 1)
                        const _0x51_i = await (_0x6_i = _0x52_add)
                        _0x51_i
                    }
                } }
            const _0x54_rows = await _0x8_rows
            let _0x26__0x25_pipeline_result = _0x54_rows

            const _0x55_iter = _0x26__0x25_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x55_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x58_row = await row
                        const _0x57_name = await (_0x58_row.name)
                        let _0x29__0x28_pipeline_result = _0x57_name
                        const _0x56_print = await console.log(_0x29__0x28_pipeline_result)
                        let _0x2a__0x27_pipeline_result = _0x56_print
                        _0x2a__0x27_pipeline_result
                    }
                } }
            let _0x2b_age_over_30 = 0
            _0x2b_age_over_30
            const _0x59_rows = await _0x8_rows
            let _0x2d__0x2c_pipeline_result = _0x59_rows

            const _0x5a_iter = _0x2d__0x2c_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x5a_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x5d_row = await row
                        const _0x5c__hash_ = await _0x5d_row["age"]
                        let _0x30__0x2f_pipeline_result = _0x5c__hash_
                        const _0x5b_asc = await (_0x30__0x2f_pipeline_result < 30)
                        let _0x31__0x2e_pipeline_result = _0x5b_asc
                        if (_0x31__0x2e_pipeline_result)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x60_age_over_30 = await _0x2b_age_over_30
                                let _0x33__0x32_pipeline_result = _0x60_age_over_30
                                const _0x5f_add = await (_0x33__0x32_pipeline_result + 1)
                                const _0x5e_age_over_30 = await (_0x2b_age_over_30 = _0x5f_add)
                                _0x5e_age_over_30
                            }
                        } 
                    }
                } }
            const _0x62_age_over_30 = await _0x2b_age_over_30
            let _0x36__0x35_pipeline_result = _0x62_age_over_30
            const _0x61_print = await console.log(_0x36__0x35_pipeline_result)
            let _0x37__0x34_pipeline_result = _0x61_print
            _0x37__0x34_pipeline_result
        }
    } 
})();
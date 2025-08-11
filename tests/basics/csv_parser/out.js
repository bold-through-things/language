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

            const _0x2f_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x2f_stdin
            let _0x1_lines = _0x0_stdin
            _0x1_lines
            let _0x3_lines = _0x1_lines
            const _0x30_split = await String.prototype.split.call(_0x3_lines, "\n")
            let _0x4_split = _0x30_split
            _0x1_lines = _0x4_split
            let _0x2_lines = _0x1_lines
            _0x2_lines
            let _0x5_i = 0
            _0x5_i
            let _0x6_header = []
            _0x6_header
            let _0x7_rows = []
            _0x7_rows
            let _0x8_lines = _0x1_lines

            const _0x31_iter = _0x8_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x31_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xa_i = _0x5_i
                        const _0x32_eq = await (_0xa_i === 0)
                        let _0x9_eq = _0x32_eq
                        if (_0x9_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0xc_line = line
                                    const _0x33_split = await String.prototype.split.call(_0xc_line, ",")
                                    let _0xd_split = _0x33_split
                                    _0x6_header = _0xd_split
                                    let _0xb_header = _0x6_header
                                    _0xb_header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                let _0xf_header = _0x6_header
                                let _0x10_line = line
                                const _0x35_split = await String.prototype.split.call(_0x10_line, ",")
                                let _0x11_split = _0x35_split
                                const _0x34_zip = await _67lang.zip(_0xf_header, _0x11_split)
                                let _0xe_zip = _0x34_zip
                                let _0x12_zipped_data = _0xe_zip
                                _0x12_zipped_data
                                let _0x13_row = {}
                                _0x13_row
                                let _0x14_zipped_data = _0x12_zipped_data

                                const _0x36_iter = _0x14_zipped_data[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x36_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x15_row = _0x13_row

                                            let _0x17_kv = kv
                                            const _0x38__0x17_kv_0 = await _0x17_kv["0"]
                                            let _0x18__0 = _0x38__0x17_kv_0
                                            let _0x19_kv = kv
                                            const _0x39__0x19_kv_1 = await _0x19_kv["1"]
                                            let _0x1a__1 = _0x39__0x19_kv_1
                                            _0x15_row[_0x18__0] = _0x1a__1
                                            const _0x37__0x15_row = await _0x15_row[_0x18__0]
                                            let _0x16_key = _0x37__0x15_row
                                            _0x16_key
                                        }
                                    } }
                                let _0x1b_rows = _0x7_rows

                                let _0x1d_row = _0x13_row
                                const _0x3a_push = await Array.prototype.push.call(_0x1b_rows, _0x1d_row)
                                let _0x1c_push = _0x3a_push
                                _0x1c_push
                            }
                        } 
                        let _0x20_i = _0x5_i
                        const _0x3b_add = await (_0x20_i + 1)
                        let _0x1f_add = _0x3b_add
                        _0x5_i = _0x1f_add
                        let _0x1e_i = _0x5_i
                        _0x1e_i
                    }
                } }
            let _0x21_rows = _0x7_rows

            const _0x3c_iter = _0x21_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x3c_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x23_row = row
                        const _0x3e__0x23_row_name = await _0x23_row.name
                        let _0x24_name = _0x3e__0x23_row_name
                        const _0x3d_print = await console.log(_0x24_name)
                        let _0x22_print = _0x3d_print
                        _0x22_print
                    }
                } }
            let _0x25_age_over_30 = 0
            _0x25_age_over_30
            let _0x26_rows = _0x7_rows

            const _0x3f_iter = _0x26_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x3f_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x28_row = row
                        const _0x41__0x28_row_age = await _0x28_row.age
                        let _0x29_age = _0x41__0x28_row_age
                        const _0x40_asc = await (_0x29_age < 30)
                        let _0x27_asc = _0x40_asc
                        if (_0x27_asc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x2c_age_over_30 = _0x25_age_over_30
                                    const _0x42_add = await (_0x2c_age_over_30 + 1)
                                    let _0x2b_add = _0x42_add
                                    _0x25_age_over_30 = _0x2b_add
                                    let _0x2a_age_over_30 = _0x25_age_over_30
                                    _0x2a_age_over_30
                                }
                            } }
                    }
                } }
            let _0x2e_age_over_30 = _0x25_age_over_30
            const _0x43_print = await console.log(_0x2e_age_over_30)
            let _0x2d_print = _0x43_print
            _0x2d_print
        }
    } 
})();
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

            const _0x4b_stdin = await _67lang.stdin()
            let _0x0_stdin = _0x4b_stdin
            let _0x1_lines = _0x0_stdin
            _0x1_lines
            let _0x5__0x2_lines = _0x1_lines
            const _0x4c_split = await String.prototype.split.call(_0x5__0x2_lines, "\n")
            let _0x6__0x3_split = _0x4c_split
            _0x1_lines = _0x6__0x3_split
            let _0x4_lines = _0x1_lines
            _0x4_lines
            let _0x7_i = 0
            _0x7_i
            let _0x8_header = []
            _0x8_header
            let _0x9_rows = []
            _0x9_rows
            let _0xb__0xa_lines = _0x1_lines

            const _0x4d_iter = _0xb__0xa_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x4d_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xe__0xc_i = _0x7_i
                        const _0x4e_eq = await (_0xe__0xc_i === 0)
                        let _0xd_eq = _0x4e_eq
                        if (_0xd_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x12__0xf_line = line
                                    const _0x4f_split = await String.prototype.split.call(_0x12__0xf_line, ",")
                                    let _0x13__0x10_split = _0x4f_split
                                    _0x8_header = _0x13__0x10_split
                                    let _0x11_header = _0x8_header
                                    _0x11_header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                let _0x18__0x14_header = _0x8_header
                                let _0x19__0x15_line = line
                                const _0x51_split = await String.prototype.split.call(_0x19__0x15_line, ",")
                                let _0x1a__0x16_split = _0x51_split
                                const _0x50_zip = await _67lang.zip(_0x18__0x14_header, _0x1a__0x16_split)
                                let _0x17_zip = _0x50_zip
                                let _0x1b_zipped_data = _0x17_zip
                                _0x1b_zipped_data
                                let _0x1c_row = {}
                                _0x1c_row
                                let _0x1e__0x1d_zipped_data = _0x1b_zipped_data

                                const _0x52_iter = _0x1e__0x1d_zipped_data[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x52_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            let _0x23_row = _0x1c_row

                                            let _0x25__0x1f_kv = kv
                                            const _0x54__0x25__0x1f_kv_0 = await _0x25__0x1f_kv["0"]
                                            let _0x26__0x20__0 = _0x54__0x25__0x1f_kv_0
                                            let _0x27__0x21_kv = kv
                                            const _0x55__0x27__0x21_kv_1 = await _0x27__0x21_kv["1"]
                                            let _0x28__0x22__1 = _0x55__0x27__0x21_kv_1
                                            _0x23_row[_0x26__0x20__0] = _0x28__0x22__1
                                            const _0x53__0x23_row = await _0x23_row[_0x26__0x20__0]
                                            let _0x24_key = _0x53__0x23_row
                                            _0x24_key
                                        }
                                    } }
                                let _0x2a_rows = _0x9_rows

                                let _0x2c__0x29_row = _0x1c_row
                                const _0x56_push = await Array.prototype.push.call(_0x2a_rows, _0x2c__0x29_row)
                                let _0x2b_push = _0x56_push
                                _0x2b_push
                            }
                        } 
                        let _0x31__0x2d_i = _0x7_i
                        const _0x57_add = await (_0x31__0x2d_i + 1)
                        let _0x32__0x2e_add = _0x57_add
                        _0x7_i = _0x32__0x2e_add
                        let _0x30_i = _0x7_i
                        _0x30_i
                    }
                } }
            let _0x34__0x33_rows = _0x9_rows

            const _0x58_iter = _0x34__0x33_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x58_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x38__0x35_row = row
                        const _0x5a__0x38__0x35_row_name = await _0x38__0x35_row.name
                        let _0x39__0x36_name = _0x5a__0x38__0x35_row_name
                        const _0x59_print = await console.log(_0x39__0x36_name)
                        let _0x37_print = _0x59_print
                        _0x37_print
                    }
                } }
            let _0x3a_age_over_30 = 0
            _0x3a_age_over_30
            let _0x3c__0x3b_rows = _0x9_rows

            const _0x5b_iter = _0x3c__0x3b_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x5b_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0x40__0x3d_row = row
                        const _0x5d__0x40__0x3d_row_age = await _0x40__0x3d_row.age
                        let _0x41__0x3e_age = _0x5d__0x40__0x3d_row_age
                        const _0x5c_asc = await (_0x41__0x3e_age < 30)
                        let _0x3f_asc = _0x5c_asc
                        if (_0x3f_asc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    let _0x46__0x42_age_over_30 = _0x3a_age_over_30
                                    const _0x5e_add = await (_0x46__0x42_age_over_30 + 1)
                                    let _0x47__0x43_add = _0x5e_add
                                    _0x3a_age_over_30 = _0x47__0x43_add
                                    let _0x45_age_over_30 = _0x3a_age_over_30
                                    _0x45_age_over_30
                                }
                            } }
                    }
                } }
            let _0x4a__0x48_age_over_30 = _0x3a_age_over_30
            const _0x5f_print = await console.log(_0x4a__0x48_age_over_30)
            let _0x49_print = _0x5f_print
            _0x49_print
        }
    } 
})();
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

            const _0x6f_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x6f_stdin
            let _0x2_lines = _0x1__0x0_stdin
            _0x2_lines
            const _0x71_lines = await _0x2_lines
            let _0x8__0x4_lines = _0x71_lines
            const _0x73__0x4_lines = await _0x8__0x4_lines
            const _0x72_split = await String.prototype.split.call(_0x73__0x4_lines, "\n")
            let _0x9__0x5_split = _0x72_split
            const _0x70_lines = await (_0x2_lines = _0x9__0x5_split)
            let _0xa__0x3_lines = _0x70_lines
            _0xa__0x3_lines
            let _0xb_i = 0
            _0xb_i
            let _0xc_header = []
            _0xc_header
            let _0xd_rows = []
            _0xd_rows
            const _0x74_lines = await _0x2_lines
            let _0xf__0xe_lines = _0x74_lines

            const _0x75_iter = _0xf__0xe_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x75_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x77_i = await _0xb_i
                        let _0x13__0x11_i = _0x77_i
                        const _0x76_eq = await (_0x13__0x11_i === 0)
                        let _0x14__0x10_eq = _0x76_eq
                        if (_0x14__0x10_eq) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0x79_line = await line
                                    let _0x1a__0x16_line = _0x79_line
                                    const _0x7b__0x16_line = await _0x1a__0x16_line
                                    const _0x7a_split = await String.prototype.split.call(_0x7b__0x16_line, ",")
                                    let _0x1b__0x17_split = _0x7a_split
                                    const _0x78_header = await (_0xc_header = _0x1b__0x17_split)
                                    let _0x1c__0x15_header = _0x78_header
                                    _0x1c__0x15_header
                                }
                            } }
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x7d_header = await _0xc_header
                                let _0x24__0x1e_header = _0x7d_header
                                const _0x7e_line = await line
                                let _0x25__0x20_line = _0x7e_line
                                const _0x80__0x20_line = await _0x25__0x20_line
                                const _0x7f_split = await String.prototype.split.call(_0x80__0x20_line, ",")
                                let _0x26__0x21_split = _0x7f_split
                                const _0x7c_zip = await _67lang.zip(_0x24__0x1e_header, _0x26__0x21_split)
                                let _0x27__0x1d_zip = _0x7c_zip
                                let _0x28_zipped_data = _0x27__0x1d_zip
                                _0x28_zipped_data
                                let _0x29_row = {}
                                _0x29_row
                                const _0x81_zipped_data = await _0x28_zipped_data
                                let _0x2b__0x2a_zipped_data = _0x81_zipped_data

                                const _0x82_iter = _0x2b__0x2a_zipped_data[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x82_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x83_row = await _0x29_row
                                            let _0x2e__0x2c_row = _0x83_row

                                            const _0x85__0x2c_row = await _0x2e__0x2c_row
                                            const _0x86_kv = await kv
                                            let _0x37__0x2f_kv = _0x86_kv
                                            const _0x88__0x2f_kv = await _0x37__0x2f_kv
                                            const _0x87__hash_ = await _0x88__0x2f_kv[0]
                                            let _0x38__0x30__hash_ = _0x87__hash_
                                            const _0x89_kv = await kv
                                            let _0x39__0x33_kv = _0x89_kv
                                            const _0x8b__0x33_kv = await _0x39__0x33_kv
                                            const _0x8a__hash_ = await _0x8b__0x33_kv[1]
                                            let _0x3a__0x34__hash_ = _0x8a__hash_
                                            const _0x84__hash_ = await (_0x85__0x2c_row[_0x38__0x30__hash_] = _0x3a__0x34__hash_)
                                            let _0x3b__0x2d__hash_ = _0x84__hash_
                                            _0x3b__0x2d__hash_
                                        }
                                    } }
                                const _0x8c_rows = await _0xd_rows
                                let _0x3e__0x3c_rows = _0x8c_rows

                                const _0x8e__0x3c_rows = await _0x3e__0x3c_rows
                                const _0x8f_row = await _0x29_row
                                let _0x41__0x3f_row = _0x8f_row
                                const _0x8d_push = await Array.prototype.push.call(_0x8e__0x3c_rows, _0x41__0x3f_row)
                                let _0x42__0x3d_push = _0x8d_push
                                _0x42__0x3d_push
                            }
                        } 
                        const _0x92_i = await _0xb_i
                        let _0x49__0x45_i = _0x92_i
                        const _0x91_add = await (_0x49__0x45_i + 1)
                        let _0x4a__0x44_add = _0x91_add
                        const _0x90_i = await (_0xb_i = _0x4a__0x44_add)
                        let _0x4b__0x43_i = _0x90_i
                        _0x4b__0x43_i
                    }
                } }
            const _0x93_rows = await _0xd_rows
            let _0x4d__0x4c_rows = _0x93_rows

            const _0x94_iter = _0x4d__0x4c_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x94_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x96_row = await row
                        let _0x53__0x4f_row = _0x96_row
                        const _0x98__0x4f_row = await _0x53__0x4f_row
                        const _0x97_name = await (_0x98__0x4f_row.name)
                        let _0x54__0x50_name = _0x97_name
                        const _0x95_print = await console.log(_0x54__0x50_name)
                        let _0x55__0x4e_print = _0x95_print
                        _0x55__0x4e_print
                    }
                } }
            let _0x56_age_over_30 = 0
            _0x56_age_over_30
            const _0x99_rows = await _0xd_rows
            let _0x58__0x57_rows = _0x99_rows

            const _0x9a_iter = _0x58__0x57_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x9a_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x9c_row = await row
                        let _0x5e__0x5a_row = _0x9c_row
                        const _0x9e__0x5a_row = await _0x5e__0x5a_row
                        const _0x9d__hash_ = await _0x9e__0x5a_row["age"]
                        let _0x5f__0x5b__hash_ = _0x9d__hash_
                        const _0x9b_asc = await (_0x5f__0x5b__hash_ < 30)
                        let _0x60__0x59_asc = _0x9b_asc
                        if (_0x60__0x59_asc) {{
                                const parent_scope = scope
                                {
                                    const scope = _67lang.scope(parent_scope)
                                    const _0xa1_age_over_30 = await _0x56_age_over_30
                                    let _0x67__0x63_age_over_30 = _0xa1_age_over_30
                                    const _0xa0_add = await (_0x67__0x63_age_over_30 + 1)
                                    let _0x68__0x62_add = _0xa0_add
                                    const _0x9f_age_over_30 = await (_0x56_age_over_30 = _0x68__0x62_add)
                                    let _0x69__0x61_age_over_30 = _0x9f_age_over_30
                                    _0x69__0x61_age_over_30
                                }
                            } }
                    }
                } }
            const _0xa3_age_over_30 = await _0x56_age_over_30
            let _0x6d__0x6b_age_over_30 = _0xa3_age_over_30
            const _0xa2_print = await console.log(_0x6d__0x6b_age_over_30)
            let _0x6e__0x6a_print = _0xa2_print
            _0x6e__0x6a_print
        }
    } 
})();
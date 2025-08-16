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

            const _0x6c_stdin = await _67lang.stdin()
            let _0x1__0x0_stdin = _0x6c_stdin
            let _0x2_lines = _0x1__0x0_stdin
            _0x2_lines
            const _0x6d_lines = await _0x2_lines
            let _0x5__0x3_lines = _0x6d_lines
            const _0x6f__0x3_lines = await _0x5__0x3_lines
            const _0x6e_split = await String.prototype.split.call(_0x6f__0x3_lines, "\n")
            let _0x6__0x4_split = _0x6e_split
            let _0x7_lines = _0x6__0x4_split
            _0x7_lines
            let _0x8_i = 0
            _0x8_i
            let _0x9_header = []
            _0x9_header
            let _0xa_rows = []
            _0xa_rows
            const _0x70_lines = await _0x7_lines
            let _0xc__0xb_lines = _0x70_lines

            const _0x71_iter = _0xc__0xb_lines[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x71_iter.next();
                if (done) { break; }
                let line = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x73_i = await _0x8_i
                        let _0x10__0xe_i = _0x73_i
                        const _0x72_eq = await (_0x10__0xe_i === 0)
                        let _0x11__0xd_eq = _0x72_eq
                        if (_0x11__0xd_eq)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x75_line = await line
                                let _0x17__0x13_line = _0x75_line
                                const _0x77__0x13_line = await _0x17__0x13_line
                                const _0x76_split = await String.prototype.split.call(_0x77__0x13_line, ",")
                                let _0x18__0x14_split = _0x76_split
                                const _0x74_header = await (_0x9_header = _0x18__0x14_split)
                                let _0x19__0x12_header = _0x74_header
                                _0x19__0x12_header
                            }
                        } 
                        else {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x79_header = await _0x9_header
                                let _0x21__0x1b_header = _0x79_header
                                const _0x7a_line = await line
                                let _0x22__0x1d_line = _0x7a_line
                                const _0x7c__0x1d_line = await _0x22__0x1d_line
                                const _0x7b_split = await String.prototype.split.call(_0x7c__0x1d_line, ",")
                                let _0x23__0x1e_split = _0x7b_split
                                const _0x78_zip = await _67lang.zip(_0x21__0x1b_header, _0x23__0x1e_split)
                                let _0x24__0x1a_zip = _0x78_zip
                                let _0x25_zipped_data = _0x24__0x1a_zip
                                _0x25_zipped_data
                                let _0x26_row = {}
                                _0x26_row
                                const _0x7d_zipped_data = await _0x25_zipped_data
                                let _0x28__0x27_zipped_data = _0x7d_zipped_data

                                const _0x7e_iter = _0x28__0x27_zipped_data[Symbol.iterator]();
                                while (true) {
                                    const { value, done } = _0x7e_iter.next();
                                    if (done) { break; }
                                    let kv = value;
                                    {
                                        const parent_scope = scope
                                        {
                                            const scope = _67lang.scope(parent_scope)
                                            const _0x7f_row = await _0x26_row
                                            let _0x2b__0x29_row = _0x7f_row

                                            const _0x81__0x29_row = await _0x2b__0x29_row
                                            const _0x82_kv = await kv
                                            let _0x34__0x2c_kv = _0x82_kv
                                            const _0x84__0x2c_kv = await _0x34__0x2c_kv
                                            const _0x83__hash_ = await _0x84__0x2c_kv[0]
                                            let _0x35__0x2d__hash_ = _0x83__hash_
                                            const _0x85_kv = await kv
                                            let _0x36__0x30_kv = _0x85_kv
                                            const _0x87__0x30_kv = await _0x36__0x30_kv
                                            const _0x86__hash_ = await _0x87__0x30_kv[1]
                                            let _0x37__0x31__hash_ = _0x86__hash_
                                            const _0x80__hash_ = await (_0x81__0x29_row[_0x35__0x2d__hash_] = _0x37__0x31__hash_)
                                            let _0x38__0x2a__hash_ = _0x80__hash_
                                            _0x38__0x2a__hash_
                                        }
                                    } }
                                const _0x88_rows = await _0xa_rows
                                let _0x3b__0x39_rows = _0x88_rows

                                const _0x8a__0x39_rows = await _0x3b__0x39_rows
                                const _0x8b_row = await _0x26_row
                                let _0x3e__0x3c_row = _0x8b_row
                                const _0x89_push = await Array.prototype.push.call(_0x8a__0x39_rows, _0x3e__0x3c_row)
                                let _0x3f__0x3a_push = _0x89_push
                                _0x3f__0x3a_push
                            }
                        } 
                        const _0x8e_i = await _0x8_i
                        let _0x46__0x42_i = _0x8e_i
                        const _0x8d_add = await (_0x46__0x42_i + 1)
                        let _0x47__0x41_add = _0x8d_add
                        const _0x8c_i = await (_0x8_i = _0x47__0x41_add)
                        let _0x48__0x40_i = _0x8c_i
                        _0x48__0x40_i
                    }
                } }
            const _0x8f_rows = await _0xa_rows
            let _0x4a__0x49_rows = _0x8f_rows

            const _0x90_iter = _0x4a__0x49_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x90_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x92_row = await row
                        let _0x50__0x4c_row = _0x92_row
                        const _0x94__0x4c_row = await _0x50__0x4c_row
                        const _0x93_name = await (_0x94__0x4c_row.name)
                        let _0x51__0x4d_name = _0x93_name
                        const _0x91_print = await console.log(_0x51__0x4d_name)
                        let _0x52__0x4b_print = _0x91_print
                        _0x52__0x4b_print
                    }
                } }
            let _0x53_age_over_30 = 0
            _0x53_age_over_30
            const _0x95_rows = await _0xa_rows
            let _0x55__0x54_rows = _0x95_rows

            const _0x96_iter = _0x55__0x54_rows[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x96_iter.next();
                if (done) { break; }
                let row = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x98_row = await row
                        let _0x5b__0x57_row = _0x98_row
                        const _0x9a__0x57_row = await _0x5b__0x57_row
                        const _0x99__hash_ = await _0x9a__0x57_row["age"]
                        let _0x5c__0x58__hash_ = _0x99__hash_
                        const _0x97_asc = await (_0x5c__0x58__hash_ < 30)
                        let _0x5d__0x56_asc = _0x97_asc
                        if (_0x5d__0x56_asc)
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x9d_age_over_30 = await _0x53_age_over_30
                                let _0x64__0x60_age_over_30 = _0x9d_age_over_30
                                const _0x9c_add = await (_0x64__0x60_age_over_30 + 1)
                                let _0x65__0x5f_add = _0x9c_add
                                const _0x9b_age_over_30 = await (_0x53_age_over_30 = _0x65__0x5f_add)
                                let _0x66__0x5e_age_over_30 = _0x9b_age_over_30
                                _0x66__0x5e_age_over_30
                            }
                        } 
                    }
                } }
            const _0x9f_age_over_30 = await _0x53_age_over_30
            let _0x6a__0x68_age_over_30 = _0x9f_age_over_30
            const _0x9e_print = await console.log(_0x6a__0x68_age_over_30)
            let _0x6b__0x67_print = _0x9e_print
            _0x6b__0x67_print
        }
    } 
})();
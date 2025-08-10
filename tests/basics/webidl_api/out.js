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
            const _0x19_URL = await new URL("https://example.com/path?query=123")
            let _0x0_URL = _0x19_URL
            let _0x1_myURL = _0x0_URL
            _0x1_myURL
            let _0x5__0x2_myURL = _0x1_myURL
            const _0x1b__0x5__0x2_myURL_pathname = await _0x5__0x2_myURL.pathname
            let _0x6__0x3_pathname = _0x1b__0x5__0x2_myURL_pathname
            const _0x1a_print = await console.log(_0x6__0x3_pathname)
            let _0x4_print = _0x1a_print
            _0x4_print
            const _0x1c_TextEncoder = await new TextEncoder()
            let _0x7_TextEncoder = _0x1c_TextEncoder
            let _0x8_encoder = _0x7_TextEncoder
            _0x8_encoder
            let _0x9_encoder = _0x8_encoder
            const _0x1d_encode = await TextEncoder.prototype.encode.call(_0x9_encoder, "hello world")
            let _0xa_encode = _0x1d_encode
            let _0xb_encoded = _0xa_encode
            _0xb_encoded
            let _0xe__0xc_encoded = _0xb_encoded
            const _0x1e_print = await console.log(_0xe__0xc_encoded)
            let _0xd_print = _0x1e_print
            _0xd_print
            const _0x1f_TextDecoder = await new TextDecoder()
            let _0xf_TextDecoder = _0x1f_TextDecoder
            let _0x10_decoder = _0xf_TextDecoder
            _0x10_decoder
            let _0x12_decoder = _0x10_decoder
            let _0x14__0x11_encoded = _0xb_encoded
            const _0x20_decode = await AudioDecoder.prototype.decode.call(_0x12_decoder, _0x14__0x11_encoded)
            let _0x13_decode = _0x20_decode
            let _0x15_decoded = _0x13_decode
            _0x15_decoded
            let _0x18__0x16_decoded = _0x15_decoded
            const _0x21_print = await console.log(_0x18__0x16_decoded)
            let _0x17_print = _0x21_print
            _0x17_print
        }
    } 
})();
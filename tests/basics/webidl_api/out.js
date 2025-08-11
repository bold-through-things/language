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
            const _0x24_URL = await new URL("https://example.com/path?query=123")
            let _0x0_URL = _0x24_URL
            let _0x1_myURL = _0x0_URL
            _0x1_myURL
            let _0x3_myURL = _0x1_myURL
            const _0x26__0x3_myURL_pathname = await _0x3_myURL.pathname
            let _0x4_pathname = _0x26__0x3_myURL_pathname
            const _0x25_print = await console.log(_0x4_pathname)
            let _0x2_print = _0x25_print
            _0x2_print
            const _0x27_print = await console.log("\n--- Testing TextEncoder/TextDecoder ---")
            let _0x5_print = _0x27_print
            _0x5_print
            const _0x28_TextEncoder = await new TextEncoder()
            let _0x6_TextEncoder = _0x28_TextEncoder
            let _0x7_encoder = _0x6_TextEncoder
            _0x7_encoder
            const _0x29_TextDecoder = await new TextDecoder()
            let _0x8_TextDecoder = _0x29_TextDecoder
            let _0x9_decoder = _0x8_TextDecoder
            _0x9_decoder
            let _0xa_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0xa_text_tests
            let _0xb_text_tests = _0xa_text_tests

            const _0x2a_iter = _0xb_text_tests[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x2a_iter.next();
                if (done) { break; }
                let text = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        let _0xc_encoder = _0x7_encoder
                        let _0xe_text = text
                        const _0x2b_encode = await TextEncoder.prototype.encode.call(_0xc_encoder, _0xe_text)
                        let _0xd_encode = _0x2b_encode
                        let _0xf_bytes = _0xd_encode
                        _0xf_bytes
                        let _0x10_decoder = _0x9_decoder
                        let _0x12_bytes = _0xf_bytes
                        const _0x2c_decode = await TextDecoder.prototype.decode.call(_0x10_decoder, _0x12_bytes)
                        let _0x11_decode = _0x2c_decode
                        let _0x13_restored = _0x11_decode
                        _0x13_restored
                        let _0x15_text = text
                        let _0x16_bytes = _0xf_bytes
                        let _0x17_restored = _0x13_restored
                        const _0x2d_print = await console.log("Text: \"", _0x15_text, "\" -> Bytes: [", _0x16_bytes, "] -> Restored: \"", _0x17_restored)
                        let _0x14_print = _0x2d_print
                        _0x14_print
                    }
                } }
            const _0x2e_print = await console.log("\n--- Testing atob/btoa ---")
            let _0x18_print = _0x2e_print
            _0x18_print
            let _0x19_testString = "Hello World"
            _0x19_testString
            let _0x1b_testString = _0x19_testString
            const _0x2f_btoa = await btoa(_0x1b_testString)
            let _0x1a_btoa = _0x2f_btoa
            let _0x1c_encodedString = _0x1a_btoa
            _0x1c_encodedString
            let _0x1e_encodedString = _0x1c_encodedString
            const _0x30_atob = await atob(_0x1e_encodedString)
            let _0x1d_atob = _0x30_atob
            let _0x1f_decodedString = _0x1d_atob
            _0x1f_decodedString
            let _0x21_testString = _0x19_testString
            let _0x22_encodedString = _0x1c_encodedString
            let _0x23_decodedString = _0x1f_decodedString
            const _0x31_print = await console.log("Original: ", _0x21_testString, " -> Encoded: ", _0x22_encodedString, " -> Decoded: ", _0x23_decodedString)
            let _0x20_print = _0x31_print
            _0x20_print
        }
    } 
})();
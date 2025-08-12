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
            const _0x4b_URL = await (new URL("https://example.com/path?query=123"))
            let _0x1__0x0_URL = _0x4b_URL
            let _0x2_myURL = _0x1__0x0_URL
            _0x2_myURL
            const _0x4d_myURL = await _0x2_myURL
            let _0x8__0x4_myURL = _0x4d_myURL
            const _0x4f__0x4_myURL = await _0x8__0x4_myURL
            const _0x4e_pathname = await (_0x4f__0x4_myURL.pathname)
            let _0x9__0x5_pathname = _0x4e_pathname
            const _0x4c_print = await console.log(_0x9__0x5_pathname)
            let _0xa__0x3_print = _0x4c_print
            _0xa__0x3_print
            const _0x50_print = await console.log("\n--- Testing TextEncoder/TextDecoder ---")
            let _0xc__0xb_print = _0x50_print
            _0xc__0xb_print
            const _0x51_TextEncoder = await (new TextEncoder())
            let _0xe__0xd_TextEncoder = _0x51_TextEncoder
            let _0xf_encoder = _0xe__0xd_TextEncoder
            _0xf_encoder
            const _0x52_TextDecoder = await (new TextDecoder())
            let _0x11__0x10_TextDecoder = _0x52_TextDecoder
            let _0x12_decoder = _0x11__0x10_TextDecoder
            _0x12_decoder
            let _0x13_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0x13_text_tests
            const _0x53_text_tests = await _0x13_text_tests
            let _0x15__0x14_text_tests = _0x53_text_tests

            const _0x54_iter = _0x15__0x14_text_tests[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x54_iter.next();
                if (done) { break; }
                let text = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x55_encoder = await _0xf_encoder
                        let _0x18__0x16_encoder = _0x55_encoder
                        const _0x57__0x16_encoder = await _0x18__0x16_encoder
                        const _0x58_text = await text
                        let _0x1b__0x19_text = _0x58_text
                        const _0x56_encode = await TextEncoder.prototype.encode.call(_0x57__0x16_encoder, _0x1b__0x19_text)
                        let _0x1c__0x17_encode = _0x56_encode
                        let _0x1d_bytes = _0x1c__0x17_encode
                        _0x1d_bytes
                        const _0x59_decoder = await _0x12_decoder
                        let _0x20__0x1e_decoder = _0x59_decoder
                        const _0x5b__0x1e_decoder = await _0x20__0x1e_decoder
                        const _0x5c_bytes = await _0x1d_bytes
                        let _0x23__0x21_bytes = _0x5c_bytes
                        const _0x5a_decode = await TextDecoder.prototype.decode.call(_0x5b__0x1e_decoder, _0x23__0x21_bytes)
                        let _0x24__0x1f_decode = _0x5a_decode
                        let _0x25_restored = _0x24__0x1f_decode
                        _0x25_restored
                        const _0x5e_text = await text
                        let _0x2d__0x27_text = _0x5e_text
                        const _0x5f_bytes = await _0x1d_bytes
                        let _0x2e__0x29_bytes = _0x5f_bytes
                        const _0x60_restored = await _0x25_restored
                        let _0x2f__0x2b_restored = _0x60_restored
                        const _0x5d_print = await console.log("Text: \"", _0x2d__0x27_text, "\" -> Bytes: [", _0x2e__0x29_bytes, "] -> Restored: \"", _0x2f__0x2b_restored)
                        let _0x30__0x26_print = _0x5d_print
                        _0x30__0x26_print
                    }
                } }
            const _0x61_print = await console.log("\n--- Testing atob/btoa ---")
            let _0x32__0x31_print = _0x61_print
            _0x32__0x31_print
            let _0x33_testString = "Hello World"
            _0x33_testString
            const _0x63_testString = await _0x33_testString
            let _0x37__0x35_testString = _0x63_testString
            const _0x62_btoa = await btoa(_0x37__0x35_testString)
            let _0x38__0x34_btoa = _0x62_btoa
            let _0x39_encodedString = _0x38__0x34_btoa
            _0x39_encodedString
            const _0x65_encodedString = await _0x39_encodedString
            let _0x3d__0x3b_encodedString = _0x65_encodedString
            const _0x64_atob = await atob(_0x3d__0x3b_encodedString)
            let _0x3e__0x3a_atob = _0x64_atob
            let _0x3f_decodedString = _0x3e__0x3a_atob
            _0x3f_decodedString
            const _0x67_testString = await _0x33_testString
            let _0x47__0x41_testString = _0x67_testString
            const _0x68_encodedString = await _0x39_encodedString
            let _0x48__0x43_encodedString = _0x68_encodedString
            const _0x69_decodedString = await _0x3f_decodedString
            let _0x49__0x45_decodedString = _0x69_decodedString
            const _0x66_print = await console.log("Original: ", _0x47__0x41_testString, " -> Encoded: ", _0x48__0x43_encodedString, " -> Decoded: ", _0x49__0x45_decodedString)
            let _0x4a__0x40_print = _0x66_print
            _0x4a__0x40_print
        }
    } 
})();
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
            const _0x39_URL = await (new URL("https://example.com/path?query=123"))
            let _0x1__0x0_pipeline_result = _0x39_URL
            let _0x2_myURL = _0x1__0x0_pipeline_result
            _0x2_myURL
            const _0x3c_myURL = await _0x2_myURL
            const _0x3b_pathname = await (_0x3c_myURL.pathname)
            let _0x5__0x4_pipeline_result = _0x3b_pathname
            const _0x3a_print = await console.log(_0x5__0x4_pipeline_result)
            let _0x6__0x3_pipeline_result = _0x3a_print
            _0x6__0x3_pipeline_result
            const _0x3d_print = await console.log("\n--- Testing TextEncoder/TextDecoder ---")
            let _0x8__0x7_pipeline_result = _0x3d_print
            _0x8__0x7_pipeline_result
            const _0x3e_TextEncoder = await (new TextEncoder())
            let _0xa__0x9_pipeline_result = _0x3e_TextEncoder
            let _0xb_encoder = _0xa__0x9_pipeline_result
            _0xb_encoder
            const _0x3f_TextDecoder = await (new TextDecoder())
            let _0xd__0xc_pipeline_result = _0x3f_TextDecoder
            let _0xe_decoder = _0xd__0xc_pipeline_result
            _0xe_decoder
            let _0xf_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0xf_text_tests
            const _0x40_text_tests = await _0xf_text_tests
            let _0x11__0x10_pipeline_result = _0x40_text_tests

            const _0x41_iter = _0x11__0x10_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x41_iter.next();
                if (done) { break; }
                let text = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x43_encoder = await _0xb_encoder
                        const _0x44_text = await text
                        let _0x14__0x13_pipeline_result = _0x44_text
                        const _0x42_encode = await TextEncoder.prototype.encode.call(_0x43_encoder, _0x14__0x13_pipeline_result)
                        let _0x15__0x12_pipeline_result = _0x42_encode
                        let _0x16_bytes = _0x15__0x12_pipeline_result
                        _0x16_bytes
                        const _0x46_decoder = await _0xe_decoder
                        const _0x47_bytes = await _0x16_bytes
                        let _0x19__0x18_pipeline_result = _0x47_bytes
                        const _0x45_decode = await TextDecoder.prototype.decode.call(_0x46_decoder, _0x19__0x18_pipeline_result)
                        let _0x1a__0x17_pipeline_result = _0x45_decode
                        let _0x1b_restored = _0x1a__0x17_pipeline_result
                        _0x1b_restored
                        const _0x49_text = await text
                        let _0x1e__0x1d_pipeline_result = _0x49_text
                        const _0x4a_bytes = await _0x16_bytes
                        let _0x20__0x1f_pipeline_result = _0x4a_bytes
                        const _0x4b_restored = await _0x1b_restored
                        let _0x22__0x21_pipeline_result = _0x4b_restored
                        const _0x48_print = await console.log("Text: \"", _0x1e__0x1d_pipeline_result, "\" -> Bytes: [", _0x20__0x1f_pipeline_result, "] -> Restored: \"", _0x22__0x21_pipeline_result)
                        let _0x23__0x1c_pipeline_result = _0x48_print
                        _0x23__0x1c_pipeline_result
                    }
                } }
            const _0x4c_print = await console.log("\n--- Testing atob/btoa ---")
            let _0x25__0x24_pipeline_result = _0x4c_print
            _0x25__0x24_pipeline_result
            let _0x26_testString = "Hello World"
            _0x26_testString
            const _0x4e_testString = await _0x26_testString
            let _0x29__0x28_pipeline_result = _0x4e_testString
            const _0x4d_btoa = await btoa(_0x29__0x28_pipeline_result)
            let _0x2a__0x27_pipeline_result = _0x4d_btoa
            let _0x2b_encodedString = _0x2a__0x27_pipeline_result
            _0x2b_encodedString
            const _0x50_encodedString = await _0x2b_encodedString
            let _0x2e__0x2d_pipeline_result = _0x50_encodedString
            const _0x4f_atob = await atob(_0x2e__0x2d_pipeline_result)
            let _0x2f__0x2c_pipeline_result = _0x4f_atob
            let _0x30_decodedString = _0x2f__0x2c_pipeline_result
            _0x30_decodedString
            const _0x52_testString = await _0x26_testString
            let _0x33__0x32_pipeline_result = _0x52_testString
            const _0x53_encodedString = await _0x2b_encodedString
            let _0x35__0x34_pipeline_result = _0x53_encodedString
            const _0x54_decodedString = await _0x30_decodedString
            let _0x37__0x36_pipeline_result = _0x54_decodedString
            const _0x51_print = await console.log("Original: ", _0x33__0x32_pipeline_result, " -> Encoded: ", _0x35__0x34_pipeline_result, " -> Decoded: ", _0x37__0x36_pipeline_result)
            let _0x38__0x31_pipeline_result = _0x51_print
            _0x38__0x31_pipeline_result
        }
    } 
})();
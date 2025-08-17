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
            const _0x57_URL = await (new URL("https://example.com/path?query=123"))
            let _0x1__0x0_pipeline_result = _0x57_URL
            let _0x2_myURL = _0x1__0x0_pipeline_result
            _0x2_myURL
            const _0x5a_myURL = await _0x2_myURL
            const _0x59_pathname = await (_0x5a_myURL.pathname)
            let _0x5__0x4_pipeline_result = _0x59_pathname
            const _0x58_print = await console.log(_0x5__0x4_pipeline_result)
            let _0x6__0x3_pipeline_result = _0x58_print
            _0x6__0x3_pipeline_result
            const _0x5b_print = await console.log("\n--- Testing TextEncoder/TextDecoder ---")
            let _0x8__0x7_pipeline_result = _0x5b_print
            _0x8__0x7_pipeline_result
            const _0x5c_TextEncoder = await (new TextEncoder())
            let _0xa__0x9_pipeline_result = _0x5c_TextEncoder
            let _0xb_encoder = _0xa__0x9_pipeline_result
            _0xb_encoder
            const _0x5d_TextDecoder = await (new TextDecoder())
            let _0xd__0xc_pipeline_result = _0x5d_TextDecoder
            let _0xe_decoder = _0xd__0xc_pipeline_result
            _0xe_decoder
            let _0xf_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0xf_text_tests
            const _0x5e_text_tests = await _0xf_text_tests
            let _0x11__0x10_pipeline_result = _0x5e_text_tests

            const _0x5f_iter = _0x11__0x10_pipeline_result[Symbol.iterator]();
            while (true) {
                const { value, done } = _0x5f_iter.next();
                if (done) { break; }
                let text = value;
                {
                    const parent_scope = scope
                    {
                        const scope = _67lang.scope(parent_scope)
                        const _0x61_encoder = await _0xb_encoder
                        const _0x62_text = await text
                        let _0x14__0x13_pipeline_result = _0x62_text
                        const _0x60_encode = await TextEncoder.prototype.encode.call(_0x61_encoder, _0x14__0x13_pipeline_result)
                        let _0x15__0x12_pipeline_result = _0x60_encode
                        let _0x16_bytes = _0x15__0x12_pipeline_result
                        _0x16_bytes
                        const _0x64_decoder = await _0xe_decoder
                        const _0x65_bytes = await _0x16_bytes
                        let _0x19__0x18_pipeline_result = _0x65_bytes
                        const _0x63_decode = await TextDecoder.prototype.decode.call(_0x64_decoder, _0x19__0x18_pipeline_result)
                        let _0x1a__0x17_pipeline_result = _0x63_decode
                        let _0x1b_restored = _0x1a__0x17_pipeline_result
                        _0x1b_restored
                        const _0x67_text = await text
                        let _0x1e__0x1d_pipeline_result = _0x67_text
                        const _0x68_bytes = await _0x16_bytes
                        let _0x20__0x1f_pipeline_result = _0x68_bytes
                        const _0x69_restored = await _0x1b_restored
                        let _0x22__0x21_pipeline_result = _0x69_restored
                        const _0x66_print = await console.log("Text: \"", _0x1e__0x1d_pipeline_result, "\" -> Bytes: [", _0x20__0x1f_pipeline_result, "] -> Restored: \"", _0x22__0x21_pipeline_result)
                        let _0x23__0x1c_pipeline_result = _0x66_print
                        _0x23__0x1c_pipeline_result
                    }
                } }
            const _0x6a_print = await console.log("\n--- Testing atob/btoa ---")
            let _0x25__0x24_pipeline_result = _0x6a_print
            _0x25__0x24_pipeline_result
            let _0x26_testString = "Hello World"
            _0x26_testString
            const _0x6c_testString = await _0x26_testString
            let _0x29__0x28_pipeline_result = _0x6c_testString
            const _0x6b_btoa = await btoa(_0x29__0x28_pipeline_result)
            let _0x2a__0x27_pipeline_result = _0x6b_btoa
            let _0x2b_encodedString = _0x2a__0x27_pipeline_result
            _0x2b_encodedString
            const _0x6e_encodedString = await _0x2b_encodedString
            let _0x2e__0x2d_pipeline_result = _0x6e_encodedString
            const _0x6d_atob = await atob(_0x2e__0x2d_pipeline_result)
            let _0x2f__0x2c_pipeline_result = _0x6d_atob
            let _0x30_decodedString = _0x2f__0x2c_pipeline_result
            _0x30_decodedString
            const _0x70_testString = await _0x26_testString
            let _0x33__0x32_pipeline_result = _0x70_testString
            const _0x71_encodedString = await _0x2b_encodedString
            let _0x35__0x34_pipeline_result = _0x71_encodedString
            const _0x72_decodedString = await _0x30_decodedString
            let _0x37__0x36_pipeline_result = _0x72_decodedString
            const _0x6f_print = await console.log("Original: ", _0x33__0x32_pipeline_result, " -> Encoded: ", _0x35__0x34_pipeline_result, " -> Decoded: ", _0x37__0x36_pipeline_result)
            let _0x38__0x31_pipeline_result = _0x6f_print
            _0x38__0x31_pipeline_result
            const _0x73_print = await console.log("\n--- Testing JSON.stringify/parse ---")
            let _0x3a__0x39_pipeline_result = _0x73_print
            _0x3a__0x39_pipeline_result
            let _0x3b_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: 42}
            _0x3b_testObj
            const _0x75_testObj = await _0x3b_testObj
            let _0x3e__0x3d_pipeline_result = _0x75_testObj
            const _0x74_JSON_dot_stringify = await JSON.stringify(_0x3e__0x3d_pipeline_result)
            let _0x3f__0x3c_pipeline_result = _0x74_JSON_dot_stringify
            let _0x40_jsonString = _0x3f__0x3c_pipeline_result
            _0x40_jsonString
            const _0x77_jsonString = await _0x40_jsonString
            let _0x43__0x42_pipeline_result = _0x77_jsonString
            const _0x76_JSON_dot_parse = await JSON.parse(_0x43__0x42_pipeline_result)
            let _0x44__0x41_pipeline_result = _0x76_JSON_dot_parse
            let _0x45_parsedObj = _0x44__0x41_pipeline_result
            _0x45_parsedObj
            const _0x79_jsonString = await _0x40_jsonString
            let _0x48__0x47_pipeline_result = _0x79_jsonString
            const _0x78_print = await console.log("Original object -> JSON: ", _0x48__0x47_pipeline_result)
            let _0x49__0x46_pipeline_result = _0x78_print
            _0x49__0x46_pipeline_result
            const _0x7c_parsedObj = await _0x45_parsedObj
            const _0x7b__hash_ = await _0x7c_parsedObj["name"]
            let _0x4c__0x4b_pipeline_result = _0x7b__hash_
            const _0x7a_print = await console.log("Parsed back -> name: ", _0x4c__0x4b_pipeline_result)
            let _0x4d__0x4a_pipeline_result = _0x7a_print
            _0x4d__0x4a_pipeline_result
            const _0x7d_print = await console.log("\n--- Testing fetch (data URL) ---")
            let _0x4f__0x4e_pipeline_result = _0x7d_print
            _0x4f__0x4e_pipeline_result
            const _0x7e_fetch = await fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {})
            let _0x50_response = _0x7e_fetch
            _0x50_response
            const _0x80_response = await _0x50_response
            let _0x53__0x52_pipeline_result = _0x80_response
            const _0x82_response = await _0x50_response
            const _0x81_json = await Response.prototype.json.call(_0x82_response)
            let _0x55__0x54_pipeline_result = _0x81_json
            const _0x7f_print = await console.log(_0x53__0x52_pipeline_result, _0x55__0x54_pipeline_result)
            let _0x56__0x51_pipeline_result = _0x7f_print
            _0x56__0x51_pipeline_result
        }
    } 
})();
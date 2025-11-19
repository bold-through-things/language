
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
            const _0x7a_URL = await (new URL("https://example.com/path?query=123"))
            let _0x1__0x0_pipeline_result = _0x7a_URL
            let _0x2_myURL = _0x1__0x0_pipeline_result
            _0x2_myURL
            const _0x7d_myURL = await _0x2_myURL
            const _0x7c_pathname = await (_0x7d_myURL.pathname)
            let _0x5__0x4_pipeline_result = _0x7c_pathname
            const _0x7b_print = await console.log(_0x5__0x4_pipeline_result)
            let _0x6__0x3_pipeline_result = _0x7b_print
            _0x6__0x3_pipeline_result
            const _0x7e_print = await console.log("\n--- Testing TextEncoder/TextDecoder ---")
            let _0x8__0x7_pipeline_result = _0x7e_print
            _0x8__0x7_pipeline_result
            const _0x7f_TextEncoder = await (new TextEncoder())
            let _0xa__0x9_pipeline_result = _0x7f_TextEncoder
            let _0xb_encoder = _0xa__0x9_pipeline_result
            _0xb_encoder
            const _0x80_TextDecoder = await (new TextDecoder())
            let _0xd__0xc_pipeline_result = _0x80_TextDecoder
            let _0xe_decoder = _0xd__0xc_pipeline_result
            _0xe_decoder
            let _0xf_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0xf_text_tests
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x12__0x10_for_text__index = 0
                    _0x12__0x10_for_text__index
                    const _0x81_text_tests = await _0xf_text_tests
                    let _0x14__0x13_pipeline_result = _0x81_text_tests
                    let _0x15__0x11_for_text__list = _0x14__0x13_pipeline_result
                    _0x15__0x11_for_text__list
                    while(true) {
                        const _0x83__0x10_for_text__index = await _0x12__0x10_for_text__index
                        let _0x18__0x17_pipeline_result = _0x83__0x10_for_text__index
                        const _0x85__0x11_for_text__list = await _0x15__0x11_for_text__list
                        const _0x84_length = await (_0x85__0x11_for_text__list.length)
                        let _0x1a__0x19_pipeline_result = _0x84_length
                        const _0x82_asc = await (_0x18__0x17_pipeline_result < _0x1a__0x19_pipeline_result)
                        let _0x1b__0x16_pipeline_result = _0x82_asc
                        if (!_0x1b__0x16_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0x87__0x11_for_text__list = await _0x15__0x11_for_text__list
                                const _0x88__0x10_for_text__index = await _0x12__0x10_for_text__index
                                let _0x1e__0x1d_pipeline_result = _0x88__0x10_for_text__index
                                const _0x86__hash_ = await _0x87__0x11_for_text__list[_0x1e__0x1d_pipeline_result]
                                let _0x1f__0x1c_pipeline_result = _0x86__hash_
                                let _0x20_text = _0x1f__0x1c_pipeline_result
                                _0x20_text
                                const _0x8b__0x10_for_text__index = await _0x12__0x10_for_text__index
                                const _0x8a_add = await (_0x8b__0x10_for_text__index + 1)
                                let _0x23__0x22_pipeline_result = _0x8a_add
                                const _0x89__0x10_for_text__index = await (_0x12__0x10_for_text__index = _0x23__0x22_pipeline_result)
                                let _0x24__0x21_pipeline_result = _0x89__0x10_for_text__index
                                _0x24__0x21_pipeline_result
                                const _0x8d_encoder = await _0xb_encoder
                                const _0x8e_text = await _0x20_text
                                let _0x27__0x26_pipeline_result = _0x8e_text
                                const _0x8c_encode = await TextEncoder.prototype.encode.call(_0x8d_encoder, _0x27__0x26_pipeline_result)
                                let _0x28__0x25_pipeline_result = _0x8c_encode
                                let _0x29_bytes = _0x28__0x25_pipeline_result
                                _0x29_bytes
                                const _0x90_decoder = await _0xe_decoder
                                const _0x91_bytes = await _0x29_bytes
                                let _0x2c__0x2b_pipeline_result = _0x91_bytes
                                const _0x8f_decode = await TextDecoder.prototype.decode.call(_0x90_decoder, _0x2c__0x2b_pipeline_result)
                                let _0x2d__0x2a_pipeline_result = _0x8f_decode
                                let _0x2e_restored = _0x2d__0x2a_pipeline_result
                                _0x2e_restored
                                const _0x93_text = await _0x20_text
                                let _0x31__0x30_pipeline_result = _0x93_text
                                const _0x94_bytes = await _0x29_bytes
                                let _0x33__0x32_pipeline_result = _0x94_bytes
                                const _0x95_restored = await _0x2e_restored
                                let _0x35__0x34_pipeline_result = _0x95_restored
                                const _0x92_print = await console.log("Text: \"", _0x31__0x30_pipeline_result, "\" -> Bytes: [", _0x33__0x32_pipeline_result, "] -> Restored: \"", _0x35__0x34_pipeline_result)
                                let _0x36__0x2f_pipeline_result = _0x92_print
                                _0x36__0x2f_pipeline_result
                            }
                        } }
                }
            } 
            const _0x96_print = await console.log("\n--- Testing atob/btoa ---")
            let _0x38__0x37_pipeline_result = _0x96_print
            _0x38__0x37_pipeline_result
            let _0x39_testString = "Hello World"
            _0x39_testString
            const _0x98_testString = await _0x39_testString
            let _0x3c__0x3b_pipeline_result = _0x98_testString
            const _0x97_btoa = await btoa(_0x3c__0x3b_pipeline_result)
            let _0x3d__0x3a_pipeline_result = _0x97_btoa
            let _0x3e_encodedString = _0x3d__0x3a_pipeline_result
            _0x3e_encodedString
            const _0x9a_encodedString = await _0x3e_encodedString
            let _0x41__0x40_pipeline_result = _0x9a_encodedString
            const _0x99_atob = await atob(_0x41__0x40_pipeline_result)
            let _0x42__0x3f_pipeline_result = _0x99_atob
            let _0x43_decodedString = _0x42__0x3f_pipeline_result
            _0x43_decodedString
            const _0x9c_testString = await _0x39_testString
            let _0x46__0x45_pipeline_result = _0x9c_testString
            const _0x9d_encodedString = await _0x3e_encodedString
            let _0x48__0x47_pipeline_result = _0x9d_encodedString
            const _0x9e_decodedString = await _0x43_decodedString
            let _0x4a__0x49_pipeline_result = _0x9e_decodedString
            const _0x9b_print = await console.log("Original: ", _0x46__0x45_pipeline_result, " -> Encoded: ", _0x48__0x47_pipeline_result, " -> Decoded: ", _0x4a__0x49_pipeline_result)
            let _0x4b__0x44_pipeline_result = _0x9b_print
            _0x4b__0x44_pipeline_result
            const _0x9f_print = await console.log("\n--- Testing JSON.stringify/parse ---")
            let _0x4d__0x4c_pipeline_result = _0x9f_print
            _0x4d__0x4c_pipeline_result
            let _0x4e_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: "42"}
            _0x4e_testObj
            const _0xa1_testObj = await _0x4e_testObj
            let _0x51__0x50_pipeline_result = _0xa1_testObj
            const _0xa0_JSON_dot_stringify = await JSON.stringify(_0x51__0x50_pipeline_result)
            let _0x52__0x4f_pipeline_result = _0xa0_JSON_dot_stringify
            let _0x53_jsonString = _0x52__0x4f_pipeline_result
            _0x53_jsonString
            const _0xa3_jsonString = await _0x53_jsonString
            let _0x56__0x55_pipeline_result = _0xa3_jsonString
            const _0xa2_JSON_dot_parse = await JSON.parse(_0x56__0x55_pipeline_result)
            let _0x57__0x54_pipeline_result = _0xa2_JSON_dot_parse
            let _0x58_parsedObj = _0x57__0x54_pipeline_result
            _0x58_parsedObj
            const _0xa5_jsonString = await _0x53_jsonString
            let _0x5b__0x5a_pipeline_result = _0xa5_jsonString
            const _0xa4_print = await console.log("Original object -> JSON: ", _0x5b__0x5a_pipeline_result)
            let _0x5c__0x59_pipeline_result = _0xa4_print
            _0x5c__0x59_pipeline_result
            const _0xa8_parsedObj = await _0x58_parsedObj
            const _0xa7__hash_ = await _0xa8_parsedObj["name"]
            let _0x5f__0x5e_pipeline_result = _0xa7__hash_
            const _0xa6_print = await console.log("Parsed back -> name: ", _0x5f__0x5e_pipeline_result)
            let _0x60__0x5d_pipeline_result = _0xa6_print
            _0x60__0x5d_pipeline_result
            const _0xa9_print = await console.log("\n--- Testing fetch (data URL) ---")
            let _0x62__0x61_pipeline_result = _0xa9_print
            _0x62__0x61_pipeline_result
            const _0xaa_fetch = await fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {})
            let _0x63_response = _0xaa_fetch
            _0x63_response
            const _0xac_response = await _0x63_response
            let _0x66__0x65_pipeline_result = _0xac_response
            const _0xae_response = await _0x63_response
            const _0xad_json = await Response.prototype.json.call(_0xae_response)
            let _0x68__0x67_pipeline_result = _0xad_json
            const _0xab_print = await console.log(_0x66__0x65_pipeline_result, _0x68__0x67_pipeline_result)
            let _0x69__0x64_pipeline_result = _0xab_print
            _0x69__0x64_pipeline_result
            const _0xaf_MyEncoder = await (new TextEncoder())
            let _0x6c__0x6b_pipeline_result = _0xaf_MyEncoder
            let _0x6d_encoder2 = _0x6c__0x6b_pipeline_result
            _0x6d_encoder2
            const _0xb2_encoder2 = await _0x6d_encoder2
            let _0x71__0x70_pipeline_result = _0xb2_encoder2
            const _0xb1_encode = await TextEncoder.prototype.encode.call(_0x71__0x70_pipeline_result, "Custom encoding works!")
            let _0x72__0x6f_pipeline_result = _0xb1_encode
            const _0xb0_print = await console.log("\n--- Testing custom MyEncoder ---", _0x72__0x6f_pipeline_result)
            let _0x73__0x6e_pipeline_result = _0xb0_print
            _0x73__0x6e_pipeline_result
        }
    } 
})();
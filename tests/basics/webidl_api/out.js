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
    },

    maybe_await: async function (value) {
        // we expect the JIT will optimize this h*ck
        // TODO benchmark as test
        if (value instanceof Promise) {
            return await value;
        } else {
            return value;
        }
    }
}

const is_browser = typeof window !== "undefined" && typeof window.document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
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

    _67lang.is_tty = () => Deno.stdin.isTerminal();
}


void (async () => {
    'use strict';
    const scope = globalThis;
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)











        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            const _0xb7_URL = (new URL("https://example.com/path?query=123"))
            let _0x2f__0x2e_pipeline_result = _0xb7_URL
            let _0x30_myURL = _0x2f__0x2e_pipeline_result
            _0x30_myURL
            const _0xba_myURL = _0x30_myURL
            const _0xb9_pathname = (_0xba_myURL.pathname)
            let _0x33__0x32_pipeline_result = _0xb9_pathname
            const _0xb8_print = await _67lang.maybe_await(console.log(_0x33__0x32_pipeline_result))
            let _0x34__0x31_pipeline_result = _0xb8_print
            _0x34__0x31_pipeline_result
            const _0xbb_print = await _67lang.maybe_await(console.log("\n--- Testing TextEncoder/TextDecoder ---"))
            let _0x36__0x35_pipeline_result = _0xbb_print
            _0x36__0x35_pipeline_result
            const _0xbc_TextEncoder = await _67lang.maybe_await((new TextEncoder()))
            let _0x38__0x37_pipeline_result = _0xbc_TextEncoder
            let _0x39_encoder = _0x38__0x37_pipeline_result
            _0x39_encoder
            const _0xbd_TextDecoder = await _67lang.maybe_await((new TextDecoder()))
            let _0x3b__0x3a_pipeline_result = _0xbd_TextDecoder
            let _0x3c_decoder = _0x3b__0x3a_pipeline_result
            _0x3c_decoder
            let _0x3d_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
            _0x3d_text_tests
            {
                const parent_scope = scope
                {
                    const scope = _67lang.scope(parent_scope)
                    let _0x40__0x3e_for_text__index = 0
                    _0x40__0x3e_for_text__index
                    const _0xbe_text_tests = _0x3d_text_tests
                    let _0x42__0x41_pipeline_result = _0xbe_text_tests
                    let _0x43__0x3f_for_text__list = _0x42__0x41_pipeline_result
                    _0x43__0x3f_for_text__list
                    while(true) {
                        const _0xc0__0x3e_for_text__index = _0x40__0x3e_for_text__index
                        let _0x46__0x45_pipeline_result = _0xc0__0x3e_for_text__index
                        const _0xc2__0x3f_for_text__list = _0x43__0x3f_for_text__list
                        const _0xc1_length = (_0xc2__0x3f_for_text__list.length)
                        let _0x48__0x47_pipeline_result = _0xc1_length
                        const _0xbf_asc = (_0x46__0x45_pipeline_result < _0x48__0x47_pipeline_result)
                        let _0x49__0x44_pipeline_result = _0xbf_asc
                        if (!_0x49__0x44_pipeline_result) { break; }
                        {
                            const parent_scope = scope
                            {
                                const scope = _67lang.scope(parent_scope)
                                const _0xc4__0x3f_for_text__list = _0x43__0x3f_for_text__list
                                const _0xc5__0x3e_for_text__index = _0x40__0x3e_for_text__index
                                let _0x4c__0x4b_pipeline_result = _0xc5__0x3e_for_text__index
                                const _0xc3__hash_ = _0xc4__0x3f_for_text__list[_0x4c__0x4b_pipeline_result]
                                let _0x4d__0x4a_pipeline_result = _0xc3__hash_
                                let _0x4e_text = _0x4d__0x4a_pipeline_result
                                _0x4e_text
                                const _0xc8__0x3e_for_text__index = _0x40__0x3e_for_text__index
                                const _0xc7_add = (_0xc8__0x3e_for_text__index + 1)
                                let _0x51__0x50_pipeline_result = _0xc7_add
                                const _0xc6__0x3e_for_text__index = (_0x40__0x3e_for_text__index = _0x51__0x50_pipeline_result)
                                let _0x52__0x4f_pipeline_result = _0xc6__0x3e_for_text__index
                                _0x52__0x4f_pipeline_result
                                const _0xca_encoder = _0x39_encoder
                                const _0xcb_text = _0x4e_text
                                let _0x55__0x54_pipeline_result = _0xcb_text
                                const _0xc9_encode = TextEncoder.prototype.encode.call(_0xca_encoder, _0x55__0x54_pipeline_result)
                                let _0x56__0x53_pipeline_result = _0xc9_encode
                                let _0x57_bytes = _0x56__0x53_pipeline_result
                                _0x57_bytes
                                const _0xcd_decoder = _0x3c_decoder
                                const _0xce_bytes = _0x57_bytes
                                let _0x5a__0x59_pipeline_result = _0xce_bytes
                                const _0xcc_decode = TextDecoder.prototype.decode.call(_0xcd_decoder, _0x5a__0x59_pipeline_result)
                                let _0x5b__0x58_pipeline_result = _0xcc_decode
                                let _0x5c_restored = _0x5b__0x58_pipeline_result
                                _0x5c_restored
                                const _0xd0_text = _0x4e_text
                                let _0x5f__0x5e_pipeline_result = _0xd0_text
                                const _0xd1_bytes = _0x57_bytes
                                let _0x61__0x60_pipeline_result = _0xd1_bytes
                                const _0xd2_restored = _0x5c_restored
                                let _0x63__0x62_pipeline_result = _0xd2_restored
                                const _0xcf_print = await _67lang.maybe_await(console.log("Text: \"", _0x5f__0x5e_pipeline_result, "\" -> Bytes: [", _0x61__0x60_pipeline_result, "] -> Restored: \"", _0x63__0x62_pipeline_result))
                                let _0x64__0x5d_pipeline_result = _0xcf_print
                                _0x64__0x5d_pipeline_result
                            }
                        } }
                }
            } 
            const _0xd3_print = await _67lang.maybe_await(console.log("\n--- Testing atob/btoa ---"))
            let _0x66__0x65_pipeline_result = _0xd3_print
            _0x66__0x65_pipeline_result
            let _0x67_testString = "Hello World"
            _0x67_testString
            const _0xd5_testString = _0x67_testString
            let _0x6a__0x69_pipeline_result = _0xd5_testString
            const _0xd4_btoa = globalThis.btoa(_0x6a__0x69_pipeline_result)
            let _0x6b__0x68_pipeline_result = _0xd4_btoa
            let _0x6c_encodedString = _0x6b__0x68_pipeline_result
            _0x6c_encodedString
            const _0xd7_encodedString = _0x6c_encodedString
            let _0x6f__0x6e_pipeline_result = _0xd7_encodedString
            const _0xd6_atob = globalThis.atob(_0x6f__0x6e_pipeline_result)
            let _0x70__0x6d_pipeline_result = _0xd6_atob
            let _0x71_decodedString = _0x70__0x6d_pipeline_result
            _0x71_decodedString
            const _0xd9_testString = _0x67_testString
            let _0x74__0x73_pipeline_result = _0xd9_testString
            const _0xda_encodedString = _0x6c_encodedString
            let _0x76__0x75_pipeline_result = _0xda_encodedString
            const _0xdb_decodedString = _0x71_decodedString
            let _0x78__0x77_pipeline_result = _0xdb_decodedString
            const _0xd8_print = await _67lang.maybe_await(console.log("Original: ", _0x74__0x73_pipeline_result, " -> Encoded: ", _0x76__0x75_pipeline_result, " -> Decoded: ", _0x78__0x77_pipeline_result))
            let _0x79__0x72_pipeline_result = _0xd8_print
            _0x79__0x72_pipeline_result
            const _0xdc_print = await _67lang.maybe_await(console.log("\n--- Testing JSON.stringify/parse ---"))
            let _0x7b__0x7a_pipeline_result = _0xdc_print
            _0x7b__0x7a_pipeline_result
            let _0x7c_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: "42"}
            _0x7c_testObj
            const _0xde_testObj = _0x7c_testObj
            let _0x7f__0x7e_pipeline_result = _0xde_testObj
            const _0xdd_JSON_dot_stringify = await _67lang.maybe_await(JSON.stringify(_0x7f__0x7e_pipeline_result))
            let _0x80__0x7d_pipeline_result = _0xdd_JSON_dot_stringify
            let _0x81_jsonString = _0x80__0x7d_pipeline_result
            _0x81_jsonString
            const _0xe0_jsonString = _0x81_jsonString
            let _0x84__0x83_pipeline_result = _0xe0_jsonString
            const _0xdf_JSON_dot_parse = await _67lang.maybe_await(JSON.parse(_0x84__0x83_pipeline_result))
            let _0x85__0x82_pipeline_result = _0xdf_JSON_dot_parse
            let _0x86_parsedObj = _0x85__0x82_pipeline_result
            _0x86_parsedObj
            const _0xe2_jsonString = _0x81_jsonString
            let _0x89__0x88_pipeline_result = _0xe2_jsonString
            const _0xe1_print = await _67lang.maybe_await(console.log("Original object -> JSON: ", _0x89__0x88_pipeline_result))
            let _0x8a__0x87_pipeline_result = _0xe1_print
            _0x8a__0x87_pipeline_result
            const _0xe5_parsedObj = _0x86_parsedObj
            const _0xe4__hash_ = _0xe5_parsedObj["name"]
            let _0x8d__0x8c_pipeline_result = _0xe4__hash_
            const _0xe3_print = await _67lang.maybe_await(console.log("Parsed back -> name: ", _0x8d__0x8c_pipeline_result))
            let _0x8e__0x8b_pipeline_result = _0xe3_print
            _0x8e__0x8b_pipeline_result
            const _0xe6_print = await _67lang.maybe_await(console.log("\n--- Testing fetch (data URL) ---"))
            let _0x90__0x8f_pipeline_result = _0xe6_print
            _0x90__0x8f_pipeline_result
            const _0xe7_fetch = await (globalThis.fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {}))
            let _0x91_response = _0xe7_fetch
            _0x91_response
            const _0xe9_response = _0x91_response
            let _0x94__0x93_pipeline_result = _0xe9_response
            const _0xeb_response = _0x91_response
            const _0xea_json = await (Response.prototype.json.call(_0xeb_response))
            let _0x96__0x95_pipeline_result = _0xea_json
            const _0xe8_print = await _67lang.maybe_await(console.log(_0x94__0x93_pipeline_result, _0x96__0x95_pipeline_result))
            let _0x97__0x92_pipeline_result = _0xe8_print
            _0x97__0x92_pipeline_result
            const _0xec_MyEncoder = await _67lang.maybe_await((new TextEncoder()))
            let _0x9a__0x99_pipeline_result = _0xec_MyEncoder
            let _0x9b_encoder2 = _0x9a__0x99_pipeline_result
            _0x9b_encoder2
            const _0xef_encoder2 = _0x9b_encoder2
            let _0x9f__0x9e_pipeline_result = _0xef_encoder2
            const _0xee_encode = await _67lang.maybe_await(TextEncoder.prototype.encode.call(_0x9f__0x9e_pipeline_result, "Custom encoding works!"))
            let _0xa0__0x9d_pipeline_result = _0xee_encode
            const _0xed_print = await _67lang.maybe_await(console.log("\n--- Testing custom MyEncoder ---", _0xa0__0x9d_pipeline_result))
            let _0xa1__0x9c_pipeline_result = _0xed_print
            _0xa1__0x9c_pipeline_result
        }
    } 
})();
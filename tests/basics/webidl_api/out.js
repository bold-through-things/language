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
        // need this since semantics differ here
        // (we are remapping `...args` to first)
        return new Set(args);
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


















    } {
        const _0xc6_URL = (new URL("https://example.com/path?query=123"))
        let _0x3f__0x3e_pipeline_result = _0xc6_URL
        let _0x40_myURL = _0x3f__0x3e_pipeline_result
        _0x40_myURL
        const _0xc9_myURL = _0x40_myURL
        const _0xc8_pathname = (_0xc9_myURL.pathname)
        let _0x43__0x42_pipeline_result = _0xc8_pathname
        const _0xc7_print = await _67lang.maybe_await(console.log(_0x43__0x42_pipeline_result))
        let _0x44__0x41_pipeline_result = _0xc7_print
        _0x44__0x41_pipeline_result
        const _0xca_print = await _67lang.maybe_await(console.log("\n--- Testing TextEncoder/TextDecoder ---"))
        let _0x46__0x45_pipeline_result = _0xca_print
        _0x46__0x45_pipeline_result
        const _0xcb_TextEncoder = await _67lang.maybe_await((new TextEncoder()))
        let _0x48__0x47_pipeline_result = _0xcb_TextEncoder
        let _0x49_encoder = _0x48__0x47_pipeline_result
        _0x49_encoder
        const _0xcc_TextDecoder = await _67lang.maybe_await((new TextDecoder()))
        let _0x4b__0x4a_pipeline_result = _0xcc_TextDecoder
        let _0x4c_decoder = _0x4b__0x4a_pipeline_result
        _0x4c_decoder
        let _0x4d_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"]
        _0x4d_text_tests
        {
            let _0x50__0x4e_for_text__index = 0
            _0x50__0x4e_for_text__index
            const _0xcd_text_tests = _0x4d_text_tests
            let _0x52__0x51_pipeline_result = _0xcd_text_tests
            let _0x53__0x4f_for_text__list = _0x52__0x51_pipeline_result
            _0x53__0x4f_for_text__list
            while(true) {
                const _0xcf__0x4e_for_text__index = _0x50__0x4e_for_text__index
                let _0x56__0x55_pipeline_result = _0xcf__0x4e_for_text__index
                const _0xd1__0x4f_for_text__list = _0x53__0x4f_for_text__list
                const _0xd0_length = (_0xd1__0x4f_for_text__list.length)
                let _0x58__0x57_pipeline_result = _0xd0_length
                const _0xce_asc = (_0x56__0x55_pipeline_result < _0x58__0x57_pipeline_result)
                let _0x59__0x54_pipeline_result = _0xce_asc
                if (!_0x59__0x54_pipeline_result) { break; }
                {
                    const _0xd3__0x4f_for_text__list = _0x53__0x4f_for_text__list
                    const _0xd4__0x4e_for_text__index = _0x50__0x4e_for_text__index
                    let _0x5c__0x5b_pipeline_result = _0xd4__0x4e_for_text__index
                    const _0xd2__hash_ = _0xd3__0x4f_for_text__list[_0x5c__0x5b_pipeline_result]
                    let _0x5d__0x5a_pipeline_result = _0xd2__hash_
                    let _0x5e_text = _0x5d__0x5a_pipeline_result
                    _0x5e_text
                    const _0xd7__0x4e_for_text__index = _0x50__0x4e_for_text__index
                    const _0xd6_add = (_0xd7__0x4e_for_text__index + 1)
                    let _0x61__0x60_pipeline_result = _0xd6_add
                    const _0xd5__0x4e_for_text__index = (_0x50__0x4e_for_text__index = _0x61__0x60_pipeline_result)
                    let _0x62__0x5f_pipeline_result = _0xd5__0x4e_for_text__index
                    _0x62__0x5f_pipeline_result
                    const _0xd9_encoder = _0x49_encoder
                    const _0xda_text = _0x5e_text
                    let _0x65__0x64_pipeline_result = _0xda_text
                    const _0xd8_encode = TextEncoder.prototype.encode.call(_0xd9_encoder, _0x65__0x64_pipeline_result)
                    let _0x66__0x63_pipeline_result = _0xd8_encode
                    let _0x67_bytes = _0x66__0x63_pipeline_result
                    _0x67_bytes
                    const _0xdc_decoder = _0x4c_decoder
                    const _0xdd_bytes = _0x67_bytes
                    let _0x6a__0x69_pipeline_result = _0xdd_bytes
                    const _0xdb_decode = TextDecoder.prototype.decode.call(_0xdc_decoder, _0x6a__0x69_pipeline_result)
                    let _0x6b__0x68_pipeline_result = _0xdb_decode
                    let _0x6c_restored = _0x6b__0x68_pipeline_result
                    _0x6c_restored
                    const _0xdf_text = _0x5e_text
                    let _0x6f__0x6e_pipeline_result = _0xdf_text
                    const _0xe0_bytes = _0x67_bytes
                    let _0x71__0x70_pipeline_result = _0xe0_bytes
                    const _0xe1_restored = _0x6c_restored
                    let _0x73__0x72_pipeline_result = _0xe1_restored
                    const _0xde_print = await _67lang.maybe_await(console.log("Text: \"", _0x6f__0x6e_pipeline_result, "\" -> Bytes: [", _0x71__0x70_pipeline_result, "] -> Restored: \"", _0x73__0x72_pipeline_result))
                    let _0x74__0x6d_pipeline_result = _0xde_print
                    _0x74__0x6d_pipeline_result
                } }
        } 
        const _0xe2_print = await _67lang.maybe_await(console.log("\n--- Testing atob/btoa ---"))
        let _0x76__0x75_pipeline_result = _0xe2_print
        _0x76__0x75_pipeline_result
        let _0x77_testString = "Hello World"
        _0x77_testString
        const _0xe4_testString = _0x77_testString
        let _0x7a__0x79_pipeline_result = _0xe4_testString
        const _0xe3_btoa = globalThis.btoa(_0x7a__0x79_pipeline_result)
        let _0x7b__0x78_pipeline_result = _0xe3_btoa
        let _0x7c_encodedString = _0x7b__0x78_pipeline_result
        _0x7c_encodedString
        const _0xe6_encodedString = _0x7c_encodedString
        let _0x7f__0x7e_pipeline_result = _0xe6_encodedString
        const _0xe5_atob = globalThis.atob(_0x7f__0x7e_pipeline_result)
        let _0x80__0x7d_pipeline_result = _0xe5_atob
        let _0x81_decodedString = _0x80__0x7d_pipeline_result
        _0x81_decodedString
        const _0xe8_testString = _0x77_testString
        let _0x84__0x83_pipeline_result = _0xe8_testString
        const _0xe9_encodedString = _0x7c_encodedString
        let _0x86__0x85_pipeline_result = _0xe9_encodedString
        const _0xea_decodedString = _0x81_decodedString
        let _0x88__0x87_pipeline_result = _0xea_decodedString
        const _0xe7_print = await _67lang.maybe_await(console.log("Original: ", _0x84__0x83_pipeline_result, " -> Encoded: ", _0x86__0x85_pipeline_result, " -> Decoded: ", _0x88__0x87_pipeline_result))
        let _0x89__0x82_pipeline_result = _0xe7_print
        _0x89__0x82_pipeline_result
        const _0xeb_print = await _67lang.maybe_await(console.log("\n--- Testing JSON.stringify/parse ---"))
        let _0x8b__0x8a_pipeline_result = _0xeb_print
        _0x8b__0x8a_pipeline_result
        let _0x8c_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: "42"}
        _0x8c_testObj
        const _0xed_testObj = _0x8c_testObj
        const _0xec_str_colon_JSON = JSON.stringify(_0xed_testObj)
        let _0x8e__0x8d_pipeline_result = _0xec_str_colon_JSON
        let _0x8f_jsonString = _0x8e__0x8d_pipeline_result
        _0x8f_jsonString
        const _0xef_jsonString = _0x8f_jsonString
        const _0xee_parse_colon_JSON = JSON.parse(_0xef_jsonString)
        let _0x91__0x90_pipeline_result = _0xee_parse_colon_JSON
        let _0x92_parsedObj = _0x91__0x90_pipeline_result
        _0x92_parsedObj
        const _0xf1_jsonString = _0x8f_jsonString
        let _0x95__0x94_pipeline_result = _0xf1_jsonString
        const _0xf0_print = await _67lang.maybe_await(console.log("Original object -> JSON: ", _0x95__0x94_pipeline_result))
        let _0x96__0x93_pipeline_result = _0xf0_print
        _0x96__0x93_pipeline_result
        const _0xf4_parsedObj = _0x92_parsedObj
        const _0xf3__hash_ = _0xf4_parsedObj["name"]
        let _0x99__0x98_pipeline_result = _0xf3__hash_
        const _0xf2_print = await _67lang.maybe_await(console.log("Parsed back -> name: ", _0x99__0x98_pipeline_result))
        let _0x9a__0x97_pipeline_result = _0xf2_print
        _0x9a__0x97_pipeline_result
        const _0xf5_print = await _67lang.maybe_await(console.log("\n--- Testing fetch (data URL) ---"))
        let _0x9c__0x9b_pipeline_result = _0xf5_print
        _0x9c__0x9b_pipeline_result
        const _0xf6_fetch = await (globalThis.fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {}))
        let _0x9d_response = _0xf6_fetch
        _0x9d_response
        const _0xf8_response = _0x9d_response
        let _0xa0__0x9f_pipeline_result = _0xf8_response
        const _0xfa_response = _0x9d_response
        const _0xf9_json = await (Response.prototype.json.call(_0xfa_response))
        let _0xa2__0xa1_pipeline_result = _0xf9_json
        const _0xf7_print = await _67lang.maybe_await(console.log(_0xa0__0x9f_pipeline_result, _0xa2__0xa1_pipeline_result))
        let _0xa3__0x9e_pipeline_result = _0xf7_print
        _0xa3__0x9e_pipeline_result
        const _0xfb_MyEncoder = await _67lang.maybe_await((new TextEncoder()))
        let _0xa6__0xa5_pipeline_result = _0xfb_MyEncoder
        let _0xa7_encoder2 = _0xa6__0xa5_pipeline_result
        _0xa7_encoder2
        const _0xfe_encoder2 = _0xa7_encoder2
        let _0xab__0xaa_pipeline_result = _0xfe_encoder2
        const _0xfd_encode = await _67lang.maybe_await(TextEncoder.prototype.encode.call(_0xab__0xaa_pipeline_result, "Custom encoding works!"))
        let _0xac__0xa9_pipeline_result = _0xfd_encode
        const _0xfc_print = await _67lang.maybe_await(console.log("\n--- Testing custom MyEncoder ---", _0xac__0xa9_pipeline_result))
        let _0xad__0xa8_pipeline_result = _0xfc_print
        _0xad__0xa8_pipeline_result
    } 
})();
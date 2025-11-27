globalThis._67lang = {
    EXISTS_INSIDE_AS_KEY: Symbol("EXISTS_INSIDE_AS_KEY"),
    EXISTS_INSIDE_AS_VALUE: Symbol("EXISTS_INSIDE_AS_VALUE"),
    exists_inside: (inside, k_or_v, ...arr) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (v) => Number.isInteger(v) && v >= 0 && v < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => v in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_KEY, ...values),
    has_values: (list_or_dict, ...values) => _67lang.exists_inside(list_or_dict, _67lang.EXISTS_INSIDE_AS_VALUE, ...values),

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
    /* -> */ {    
        }
    /* -> */ {    
            const _0xcb_URL = ((new URL("https://example.com/path?query=123")));
            let _0x41__0x40_pipeline_result = _0xcb_URL;

            let _0x42_myURL = _0x41__0x40_pipeline_result;

            const _0xce_myURL = (_0x42_myURL);
            const _0xcd_pathname = ((_0xce_myURL.pathname));
            let _0x45__0x44_pipeline_result = _0xcd_pathname;

            const _0xcc_print = (await _67lang.maybe_await(console.log(_0x45__0x44_pipeline_result)));
            let _0x46__0x43_pipeline_result = _0xcc_print;

            const _0xcf_print = (await _67lang.maybe_await(console.log("\n--- Testing TextEncoder/TextDecoder ---")));
            let _0x48__0x47_pipeline_result = _0xcf_print;

            const _0xd0_TextEncoder = (await _67lang.maybe_await((new TextEncoder())));
            let _0x4a__0x49_pipeline_result = _0xd0_TextEncoder;

            let _0x4b_encoder = _0x4a__0x49_pipeline_result;

            const _0xd1_TextDecoder = (await _67lang.maybe_await((new TextDecoder())));
            let _0x4d__0x4c_pipeline_result = _0xd1_TextDecoder;

            let _0x4e_decoder = _0x4d__0x4c_pipeline_result;

            let _0x4f_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"];

            /* -> */ {    
                let _0x52__0x50_for_text__index = 0;

                const _0xd2_text_tests = (_0x4f_text_tests);
                let _0x54__0x53_pipeline_result = _0xd2_text_tests;

                let _0x55__0x51_for_text__list = _0x54__0x53_pipeline_result;

                while(true) /* -> */ {    
                    const _0xd4__0x50_for_text__index = (_0x52__0x50_for_text__index);
                    let _0x58__0x57_pipeline_result = _0xd4__0x50_for_text__index;

                    const _0xd6__0x51_for_text__list = (_0x55__0x51_for_text__list);
                    const _0xd5_length = ((_0xd6__0x51_for_text__list.length));
                    let _0x5a__0x59_pipeline_result = _0xd5_length;

                    const _0xd3_asc = ((_0x58__0x57_pipeline_result < _0x5a__0x59_pipeline_result));
                    let _0x5b__0x56_pipeline_result = _0xd3_asc;

                    if (!_0x5b__0x56_pipeline_result) { break; }
                    /* -> */ {    
                        const _0xd8__0x51_for_text__list = (_0x55__0x51_for_text__list);
                        const _0xd9__0x50_for_text__index = (_0x52__0x50_for_text__index);
                        let _0x5e__0x5d_pipeline_result = _0xd9__0x50_for_text__index;

                        const _0xd7__hash_ = (_0xd8__0x51_for_text__list[_0x5e__0x5d_pipeline_result]);
                        let _0x5f__0x5c_pipeline_result = _0xd7__hash_;

                        let _0x60_text = _0x5f__0x5c_pipeline_result;

                        const _0xdc__0x50_for_text__index = (_0x52__0x50_for_text__index);
                        const _0xdb_add = ((_0xdc__0x50_for_text__index + 1));
                        let _0x63__0x62_pipeline_result = _0xdb_add;

                        const _0xda__0x50_for_text__index = ((_0x52__0x50_for_text__index = _0x63__0x62_pipeline_result));
                        let _0x64__0x61_pipeline_result = _0xda__0x50_for_text__index;

                        const _0xde_encoder = (_0x4b_encoder);
                        const _0xdf_text = (_0x60_text);
                        let _0x67__0x66_pipeline_result = _0xdf_text;

                        const _0xdd_encode = (TextEncoder.prototype.encode.call(_0xde_encoder, _0x67__0x66_pipeline_result));
                        let _0x68__0x65_pipeline_result = _0xdd_encode;

                        let _0x69_bytes = _0x68__0x65_pipeline_result;

                        const _0xe1_decoder = (_0x4e_decoder);
                        const _0xe2_bytes = (_0x69_bytes);
                        let _0x6c__0x6b_pipeline_result = _0xe2_bytes;

                        const _0xe0_decode = (TextDecoder.prototype.decode.call(_0xe1_decoder, _0x6c__0x6b_pipeline_result));
                        let _0x6d__0x6a_pipeline_result = _0xe0_decode;

                        let _0x6e_restored = _0x6d__0x6a_pipeline_result;

                        const _0xe4_text = (_0x60_text);
                        let _0x71__0x70_pipeline_result = _0xe4_text;

                        const _0xe5_bytes = (_0x69_bytes);
                        let _0x73__0x72_pipeline_result = _0xe5_bytes;

                        const _0xe6_restored = (_0x6e_restored);
                        let _0x75__0x74_pipeline_result = _0xe6_restored;

                        const _0xe3_print = (await _67lang.maybe_await(console.log("Text: \"", _0x71__0x70_pipeline_result, "\" -> Bytes: [", _0x73__0x72_pipeline_result, "] -> Restored: \"", _0x75__0x74_pipeline_result)));
                        let _0x76__0x6f_pipeline_result = _0xe3_print;

                    }

                }

            }

            const _0xe7_print = (await _67lang.maybe_await(console.log("\n--- Testing atob/btoa ---")));
            let _0x78__0x77_pipeline_result = _0xe7_print;

            let _0x79_testString = "Hello World";

            const _0xe9_testString = (_0x79_testString);
            let _0x7c__0x7b_pipeline_result = _0xe9_testString;

            const _0xe8_btoa = (globalThis.btoa(_0x7c__0x7b_pipeline_result));
            let _0x7d__0x7a_pipeline_result = _0xe8_btoa;

            let _0x7e_encodedString = _0x7d__0x7a_pipeline_result;

            const _0xeb_encodedString = (_0x7e_encodedString);
            let _0x81__0x80_pipeline_result = _0xeb_encodedString;

            const _0xea_atob = (globalThis.atob(_0x81__0x80_pipeline_result));
            let _0x82__0x7f_pipeline_result = _0xea_atob;

            let _0x83_decodedString = _0x82__0x7f_pipeline_result;

            const _0xed_testString = (_0x79_testString);
            let _0x86__0x85_pipeline_result = _0xed_testString;

            const _0xee_encodedString = (_0x7e_encodedString);
            let _0x88__0x87_pipeline_result = _0xee_encodedString;

            const _0xef_decodedString = (_0x83_decodedString);
            let _0x8a__0x89_pipeline_result = _0xef_decodedString;

            const _0xec_print = (await _67lang.maybe_await(console.log("Original: ", _0x86__0x85_pipeline_result, " -> Encoded: ", _0x88__0x87_pipeline_result, " -> Decoded: ", _0x8a__0x89_pipeline_result)));
            let _0x8b__0x84_pipeline_result = _0xec_print;

            const _0xf0_print = (await _67lang.maybe_await(console.log("\n--- Testing JSON.stringify/parse ---")));
            let _0x8d__0x8c_pipeline_result = _0xf0_print;

            let _0x8e_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: "42"};

            const _0xf2_testObj = (_0x8e_testObj);
            const _0xf1_str_colon_JSON = (JSON.stringify(_0xf2_testObj));
            let _0x90__0x8f_pipeline_result = _0xf1_str_colon_JSON;

            let _0x91_jsonString = _0x90__0x8f_pipeline_result;

            const _0xf4_jsonString = (_0x91_jsonString);
            const _0xf3_parse_colon_JSON = (JSON.parse(_0xf4_jsonString));
            let _0x93__0x92_pipeline_result = _0xf3_parse_colon_JSON;

            let _0x94_parsedObj = _0x93__0x92_pipeline_result;

            const _0xf6_jsonString = (_0x91_jsonString);
            let _0x97__0x96_pipeline_result = _0xf6_jsonString;

            const _0xf5_print = (await _67lang.maybe_await(console.log("Original object -> JSON: ", _0x97__0x96_pipeline_result)));
            let _0x98__0x95_pipeline_result = _0xf5_print;

            const _0xf9_parsedObj = (_0x94_parsedObj);
            const _0xf8__hash_ = (_0xf9_parsedObj["name"]);
            let _0x9b__0x9a_pipeline_result = _0xf8__hash_;

            const _0xf7_print = (await _67lang.maybe_await(console.log("Parsed back -> name: ", _0x9b__0x9a_pipeline_result)));
            let _0x9c__0x99_pipeline_result = _0xf7_print;

            const _0xfa_print = (await _67lang.maybe_await(console.log("\n--- Testing fetch (data URL) ---")));
            let _0x9e__0x9d_pipeline_result = _0xfa_print;

            const _0xfb_fetch = (await (globalThis.fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {})));
            let _0x9f_response = _0xfb_fetch;

            const _0xfd_response = (_0x9f_response);
            let _0xa2__0xa1_pipeline_result = _0xfd_response;

            const _0xff_response = (_0x9f_response);
            const _0xfe_json = (await (Response.prototype.json.call(_0xff_response)));
            let _0xa4__0xa3_pipeline_result = _0xfe_json;

            const _0xfc_print = (await _67lang.maybe_await(console.log(_0xa2__0xa1_pipeline_result, _0xa4__0xa3_pipeline_result)));
            let _0xa5__0xa0_pipeline_result = _0xfc_print;

            const _0x100_MyEncoder = (await _67lang.maybe_await((new TextEncoder())));
            let _0xa8__0xa7_pipeline_result = _0x100_MyEncoder;

            let _0xa9_encoder2 = _0xa8__0xa7_pipeline_result;

            const _0x103_encoder2 = (_0xa9_encoder2);
            let _0xad__0xac_pipeline_result = _0x103_encoder2;

            const _0x102_encode = (await _67lang.maybe_await(TextEncoder.prototype.encode.call(_0xad__0xac_pipeline_result, "Custom encoding works!")));
            let _0xae__0xab_pipeline_result = _0x102_encode;

            const _0x101_print = (await _67lang.maybe_await(console.log("\n--- Testing custom MyEncoder ---", _0xae__0xab_pipeline_result)));
            let _0xaf__0xaa_pipeline_result = _0x101_print;

        }

})();
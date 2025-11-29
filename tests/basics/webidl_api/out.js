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
    {
    }
    {    
        let _0x40_myURL = (new URL("https://example.com/path?query=123"));
        (await _67lang.maybe_await(console.log(_0x40_myURL.pathname)));
        (await _67lang.maybe_await(console.log("\n--- Testing TextEncoder/TextDecoder ---")));
        let _0x41_encoder = (await _67lang.maybe_await((new TextEncoder())));
        let _0x42_decoder = (await _67lang.maybe_await((new TextDecoder())));
        let _0x43_text_tests = ["ASCII text", "Unicode: 🦕 Deno", "Numbers: 42"];
        {    
            let _0x46__0x44_for_text__index = 0;
            let _0x47__0x45_for_text__list = _0x43_text_tests;
            while(true) {    
                if (!(_0x46__0x44_for_text__index < _0x47__0x45_for_text__list.length)) { break; }
                {    
                    let _0x48_text = _0x47__0x45_for_text__list[_0x46__0x44_for_text__index];
                    (_0x46__0x44_for_text__index = (_0x46__0x44_for_text__index + 1));
                    let _0x49_bytes = TextEncoder.prototype.encode.call(_0x41_encoder, _0x48_text);
                    let _0x4a_restored = TextDecoder.prototype.decode.call(_0x42_decoder, _0x49_bytes);
                    (await _67lang.maybe_await(console.log("Text: \"", _0x48_text, "\" -> Bytes: [", _0x49_bytes, "] -> Restored: \"", _0x4a_restored)));
                }
            }
        }
    
        (await _67lang.maybe_await(console.log("\n--- Testing atob/btoa ---")));
        let _0x4b_testString = "Hello World";
        let _0x4c_encodedString = globalThis.btoa(_0x4b_testString);
        let _0x4d_decodedString = globalThis.atob(_0x4c_encodedString);
        (await _67lang.maybe_await(console.log("Original: ", _0x4b_testString, " -> Encoded: ", _0x4c_encodedString, " -> Decoded: ", _0x4d_decodedString)));
        (await _67lang.maybe_await(console.log("\n--- Testing JSON.stringify/parse ---")));
        let _0x4e_testObj = {["name"]: "Claude", ["type"]: "AI", ["version"]: "42"};
        let _0x4f_jsonString = JSON.stringify(_0x4e_testObj);
        let _0x50_parsedObj = JSON.parse(_0x4f_jsonString);
        (await _67lang.maybe_await(console.log("Original object -> JSON: ", _0x4f_jsonString)));
        (await _67lang.maybe_await(console.log("Parsed back -> name: ", _0x50_parsedObj["name"])));
        (await _67lang.maybe_await(console.log("\n--- Testing fetch (data URL) ---")));
        let _0x51_response = await (globalThis.fetch("data:application/json,{\"67lang\": \"is fucking awesome\"}", {}));
        (await _67lang.maybe_await(console.log(_0x51_response, await (Response.prototype.json.call(_0x51_response)))));
        let _0x53_encoder2 = (await _67lang.maybe_await((new TextEncoder())));
        (await _67lang.maybe_await(console.log("\n--- Testing custom MyEncoder ---", (await _67lang.maybe_await(TextEncoder.prototype.encode.call(_0x53_encoder2, "Custom encoding works!"))))));
    }

})();
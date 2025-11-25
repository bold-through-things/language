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


        let _0x3e_phrase = "hello world"
        _0x3e_phrase

        let _0x3f_final_count = "0"
        _0x3f_final_count
        {

            const _0x5e_phrase = _0x3e_phrase
            let _0x41__0x40_pipeline_result = _0x5e_phrase
            _0x41__0x40_pipeline_result
            const _0x60__0x40_pipeline_result = _0x41__0x40_pipeline_result
            const _0x5f_split = String.prototype.split.call(_0x60__0x40_pipeline_result, " ")
            let _0x43__0x42_pipeline_result = _0x5f_split
            _0x43__0x42_pipeline_result
            const _0x62__0x42_pipeline_result = _0x43__0x42_pipeline_result
            const _0x61_length = (_0x62__0x42_pipeline_result.length)
            let _0x44_words = _0x61_length
            _0x44_words
            const _0x65_words = _0x44_words
            const _0x64_str = Number.prototype.toString.call(_0x65_words)
            const _0x63_final_count = (_0x3f_final_count = _0x64_str)
            _0x63_final_count
            const _0x66_words = _0x44_words
            let _0x46__0x45_pipeline_result = _0x66_words
            let _0x47_test = _0x46__0x45_pipeline_result
            _0x47_test
        } 

        const _0x68_final_count = _0x3f_final_count
        let _0x4a__0x49_pipeline_result = _0x68_final_count
        const _0x67_print = await _67lang.maybe_await(console.log(_0x4a__0x49_pipeline_result))
        let _0x4b__0x48_pipeline_result = _0x67_print
        _0x4b__0x48_pipeline_result
    } 
})();
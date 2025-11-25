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
    const _0x3e_handle_message = async function (
        bot,
        message,
        is_trusted
    ) {{
            let _0x3f_is_trusted = is_trusted
            _0x3f_is_trusted
            let _0x40_message = message
            _0x40_message
            let _0x41_bot = bot
            _0x41_bot
            const _0x6c_bot = _0x41_bot
            let _0x44__0x43_pipeline_result = _0x6c_bot
            const _0x6d_message = _0x40_message
            let _0x46__0x45_pipeline_result = _0x6d_message
            const _0x6e_is_trusted = _0x3f_is_trusted
            let _0x48__0x47_pipeline_result = _0x6e_is_trusted
            const _0x6b_print = await _67lang.maybe_await(console.log("Bot: ", _0x44__0x43_pipeline_result, ", Message: ", _0x46__0x45_pipeline_result, ", Trusted: ", _0x48__0x47_pipeline_result))
            let _0x49__0x42_pipeline_result = _0x6b_print
            _0x49__0x42_pipeline_result
        } }
    {


















    } {

        const _0x6f_print = await _67lang.maybe_await(console.log("=== Testing bind callable ==="))
        let _0x4b__0x4a_pipeline_result = _0x6f_print
        _0x4b__0x4a_pipeline_result

        let _0x4c_bound_handler = ((arg0) => _0x3e_handle_message("MyBot", arg0, true))
        _0x4c_bound_handler
        const _0x71_bound_handler = _0x4c_bound_handler
        const _0x70__tilde_ = await _67lang.maybe_await(_0x71_bound_handler("Hello from bind test!"))
        let _0x4e__0x4d_pipeline_result = _0x70__tilde_
        _0x4e__0x4d_pipeline_result

        let _0x4f_multi_bound = ((arg0, arg1) => _0x3e_handle_message(arg0, arg1, false))
        _0x4f_multi_bound
        const _0x73_multi_bound = _0x4f_multi_bound
        const _0x72__tilde_ = await _67lang.maybe_await(_0x73_multi_bound("AnotherBot", "Multiple unbound test"))
        let _0x51__0x50_pipeline_result = _0x72__tilde_
        _0x51__0x50_pipeline_result

        let _0x52_fully_bound = (() => _0x3e_handle_message("FullyBoundBot", "This message is pre-bound", true))
        _0x52_fully_bound
        const _0x75_fully_bound = _0x52_fully_bound
        const _0x74__tilde_ = await _67lang.maybe_await(_0x75_fully_bound())
        let _0x54__0x53_pipeline_result = _0x74__tilde_
        _0x54__0x53_pipeline_result
        const _0x76_print = await _67lang.maybe_await(console.log("print manually"))
        let _0x56__0x55_pipeline_result = _0x76_print
        _0x56__0x55_pipeline_result
        const _0x77__tilde_ = await _67lang.maybe_await((() => console.log("or a bound print"))())
        let _0x58__0x57_pipeline_result = _0x77__tilde_
        _0x58__0x57_pipeline_result
    } 
})();
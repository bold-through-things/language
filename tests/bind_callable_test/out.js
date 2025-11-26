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
    const scope = globalThis;
    const _0x40_handle_message = async function (
        bot,
        message,
        is_trusted
    ) {{
            let _0x41_is_trusted = is_trusted
            _0x41_is_trusted
            let _0x42_message = message
            _0x42_message
            let _0x43_bot = bot
            _0x43_bot
            const _0x71_bot = _0x43_bot
            let _0x46__0x45_pipeline_result = _0x71_bot
            const _0x72_message = _0x42_message
            let _0x48__0x47_pipeline_result = _0x72_message
            const _0x73_is_trusted = _0x41_is_trusted
            let _0x4a__0x49_pipeline_result = _0x73_is_trusted
            const _0x70_print = await _67lang.maybe_await(console.log("Bot: ", _0x46__0x45_pipeline_result, ", Message: ", _0x48__0x47_pipeline_result, ", Trusted: ", _0x4a__0x49_pipeline_result))
            let _0x4b__0x44_pipeline_result = _0x70_print
            _0x4b__0x44_pipeline_result
        } }
    {



















    } {

        const _0x74_print = await _67lang.maybe_await(console.log("=== Testing bind callable ==="))
        let _0x4d__0x4c_pipeline_result = _0x74_print
        _0x4d__0x4c_pipeline_result

        let _0x4e_bound_handler = ((arg0) => _0x40_handle_message("MyBot", arg0, true))
        _0x4e_bound_handler
        const _0x76_bound_handler = _0x4e_bound_handler
        const _0x75__tilde_ = await _67lang.maybe_await(_0x76_bound_handler("Hello from bind test!"))
        let _0x50__0x4f_pipeline_result = _0x75__tilde_
        _0x50__0x4f_pipeline_result

        let _0x51_multi_bound = ((arg0, arg1) => _0x40_handle_message(arg0, arg1, false))
        _0x51_multi_bound
        const _0x78_multi_bound = _0x51_multi_bound
        const _0x77__tilde_ = await _67lang.maybe_await(_0x78_multi_bound("AnotherBot", "Multiple unbound test"))
        let _0x53__0x52_pipeline_result = _0x77__tilde_
        _0x53__0x52_pipeline_result

        let _0x54_fully_bound = (() => _0x40_handle_message("FullyBoundBot", "This message is pre-bound", true))
        _0x54_fully_bound
        const _0x7a_fully_bound = _0x54_fully_bound
        const _0x79__tilde_ = await _67lang.maybe_await(_0x7a_fully_bound())
        let _0x56__0x55_pipeline_result = _0x79__tilde_
        _0x56__0x55_pipeline_result
        const _0x7b_print = await _67lang.maybe_await(console.log("print manually"))
        let _0x58__0x57_pipeline_result = _0x7b_print
        _0x58__0x57_pipeline_result
        const _0x7c__tilde_ = await _67lang.maybe_await((() => console.log("or a bound print"))())
        let _0x5a__0x59_pipeline_result = _0x7c__tilde_
        _0x5a__0x59_pipeline_result
    } 
})();
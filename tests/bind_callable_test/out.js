
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
    const _0x2e_handle_message = async function (
        bot,
        message,
        is_trusted
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                bot = bot
                message = message
                is_trusted = is_trusted
                let _0x2f_is_trusted = is_trusted
                _0x2f_is_trusted
                let _0x30_message = message
                _0x30_message
                let _0x31_bot = bot
                _0x31_bot
                const _0x59_bot = await _0x31_bot
                let _0x34__0x33_pipeline_result = _0x59_bot
                const _0x5a_message = await _0x30_message
                let _0x36__0x35_pipeline_result = _0x5a_message
                const _0x5b_is_trusted = await _0x2f_is_trusted
                let _0x38__0x37_pipeline_result = _0x5b_is_trusted
                const _0x58_print = await console.log("Bot: ", _0x34__0x33_pipeline_result, ", Message: ", _0x36__0x35_pipeline_result, ", Trusted: ", _0x38__0x37_pipeline_result)
                let _0x39__0x32_pipeline_result = _0x58_print
                _0x39__0x32_pipeline_result
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)















        }
    } {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0x5c_print = await console.log("=== Testing bind callable ===")
            let _0x3b__0x3a_pipeline_result = _0x5c_print
            _0x3b__0x3a_pipeline_result

            let _0x3c_bound_handler = ((arg0) => _0x2e_handle_message("MyBot", arg0, true))
            _0x3c_bound_handler
            const _0x5e_bound_handler = await _0x3c_bound_handler
            const _0x5d__tilde_ = await _0x5e_bound_handler("Hello from bind test!")
            let _0x3e__0x3d_pipeline_result = _0x5d__tilde_
            _0x3e__0x3d_pipeline_result

            let _0x3f_multi_bound = ((arg0, arg1) => _0x2e_handle_message(arg0, arg1, false))
            _0x3f_multi_bound
            const _0x60_multi_bound = await _0x3f_multi_bound
            const _0x5f__tilde_ = await _0x60_multi_bound("AnotherBot", "Multiple unbound test")
            let _0x41__0x40_pipeline_result = _0x5f__tilde_
            _0x41__0x40_pipeline_result

            let _0x42_fully_bound = (() => _0x2e_handle_message("FullyBoundBot", "This message is pre-bound", true))
            _0x42_fully_bound
            const _0x62_fully_bound = await _0x42_fully_bound
            const _0x61__tilde_ = await _0x62_fully_bound()
            let _0x44__0x43_pipeline_result = _0x61__tilde_
            _0x44__0x43_pipeline_result
            const _0x63_print = await console.log("print manually")
            let _0x46__0x45_pipeline_result = _0x63_print
            _0x46__0x45_pipeline_result
            const _0x64__tilde_ = await (() => console.log("or a bound print"))()
            let _0x48__0x47_pipeline_result = _0x64__tilde_
            _0x48__0x47_pipeline_result
        }
    } 
})();
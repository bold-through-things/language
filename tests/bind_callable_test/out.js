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
    const _0x0_handle_message = async function (
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
                const _0x15_bot = await bot
                let _0x3__0x2_pipeline_result = _0x15_bot
                const _0x16_message = await message
                let _0x5__0x4_pipeline_result = _0x16_message
                const _0x17_is_trusted = await is_trusted
                let _0x7__0x6_pipeline_result = _0x17_is_trusted
                const _0x14_print = await console.log("Bot: ", _0x3__0x2_pipeline_result, ", Message: ", _0x5__0x4_pipeline_result, ", Trusted: ", _0x7__0x6_pipeline_result)
                let _0x8__0x1_pipeline_result = _0x14_print
                _0x8__0x1_pipeline_result
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)

            const _0x18_print = await console.log("=== Testing bind callable ===")
            let _0xa__0x9_pipeline_result = _0x18_print
            _0xa__0x9_pipeline_result

            let _0xb_bound_handler = (arg0) => _0x0_handle_message("MyBot", arg0, true)
            _0xb_bound_handler
            const _0x1a_bound_handler = await _0xb_bound_handler
            const _0x19__tilde_ = await _0x1a_bound_handler("Hello from bind test!")
            let _0xd__0xc_pipeline_result = _0x19__tilde_
            _0xd__0xc_pipeline_result

            let _0xe_multi_bound = (arg0, arg1) => _0x0_handle_message(arg0, arg1, false)
            _0xe_multi_bound
            const _0x1c_multi_bound = await _0xe_multi_bound
            const _0x1b__tilde_ = await _0x1c_multi_bound("AnotherBot", "Multiple unbound test")
            let _0x10__0xf_pipeline_result = _0x1b__tilde_
            _0x10__0xf_pipeline_result

            let _0x11_fully_bound = () => _0x0_handle_message("FullyBoundBot", "This message is pre-bound", true)
            _0x11_fully_bound
            const _0x1e_fully_bound = await _0x11_fully_bound
            const _0x1d__tilde_ = await _0x1e_fully_bound()
            let _0x13__0x12_pipeline_result = _0x1d__tilde_
            _0x13__0x12_pipeline_result
        }
    } 
})();

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
    const _0x4_main_test = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)

                const _0x17_WebSocket = await (new WebSocket("wss://example.com"))
                let _0x5_ws = _0x17_WebSocket
                _0x5_ws

                const _0x19_ws = await _0x5_ws
                let _0x8__0x7_pipeline_result = _0x19_ws
                const _0x18_send = await WebSocket.prototype.send.call(_0x8__0x7_pipeline_result, "Hello WebSocket")
                let _0x9__0x6_pipeline_result = _0x18_send
                _0x9__0x6_pipeline_result

                let _0xa_message = "Another message"
                _0xa_message
                const _0x1b_ws = await _0x5_ws
                let _0xd__0xc_pipeline_result = _0x1b_ws
                const _0x1c_message = await _0xa_message
                let _0xf__0xe_pipeline_result = _0x1c_message
                const _0x1a_send = await WebSocket.prototype.send.call(_0xd__0xc_pipeline_result, _0xf__0xe_pipeline_result)
                let _0x10__0xb_pipeline_result = _0x1a_send
                _0x10__0xb_pipeline_result

                const _0x1e_ws = await _0x5_ws
                const _0x1d_onmessage = await (_0x1e_ws.onmessage = (((arg0) => _0x0_message_handler(arg0))))
                let _0x12__0x11_pipeline_result = _0x1d_onmessage
                _0x12__0x11_pipeline_result

                const _0x20_ws = await _0x5_ws
                const _0x1f_onopen = await (_0x20_ws.onopen = (((arg0) => _0x0_message_handler(arg0))))
                let _0x14__0x13_pipeline_result = _0x1f_onopen
                _0x14__0x13_pipeline_result
                const _0x22_ws = await _0x5_ws
                const _0x21_onclose = await (_0x22_ws.onclose = (((arg0) => _0x0_message_handler(arg0))))
                let _0x16__0x15_pipeline_result = _0x21_onclose
                _0x16__0x15_pipeline_result


            }
        } }
    const _0x0_message_handler = async function (
        event
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                event = event
                let _0x1_event = event
                _0x1_event

                const _0x23_print = await console.log("Message received")
                let _0x3__0x2_pipeline_result = _0x23_print
                _0x3__0x2_pipeline_result
            }
        } }
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)


        }
    } 
})();
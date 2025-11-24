
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
    const _0x32_main_test = async function () {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)

                const _0x54_WebSocket = await (new WebSocket("wss://example.com"))
                let _0x33_ws = _0x54_WebSocket
                _0x33_ws

                const _0x56_ws = await _0x33_ws
                let _0x36__0x35_pipeline_result = _0x56_ws
                const _0x55_send = await WebSocket.prototype.send.call(_0x36__0x35_pipeline_result, "Hello WebSocket")
                let _0x37__0x34_pipeline_result = _0x55_send
                _0x37__0x34_pipeline_result

                let _0x38_message = "Another message"
                _0x38_message
                const _0x58_ws = await _0x33_ws
                let _0x3b__0x3a_pipeline_result = _0x58_ws
                const _0x59_message = await _0x38_message
                let _0x3d__0x3c_pipeline_result = _0x59_message
                const _0x57_send = await WebSocket.prototype.send.call(_0x3b__0x3a_pipeline_result, _0x3d__0x3c_pipeline_result)
                let _0x3e__0x39_pipeline_result = _0x57_send
                _0x3e__0x39_pipeline_result

                const _0x5b_ws = await _0x33_ws
                const _0x5a_onmessage = await (_0x5b_ws.onmessage = (((arg0) => _0x2e_message_handler(arg0))))
                let _0x40__0x3f_pipeline_result = _0x5a_onmessage
                _0x40__0x3f_pipeline_result

                const _0x5d_ws = await _0x33_ws
                const _0x5c_onopen = await (_0x5d_ws.onopen = (((arg0) => _0x2e_message_handler(arg0))))
                let _0x42__0x41_pipeline_result = _0x5c_onopen
                _0x42__0x41_pipeline_result
                const _0x5f_ws = await _0x33_ws
                const _0x5e_onclose = await (_0x5f_ws.onclose = (((arg0) => _0x2e_message_handler(arg0))))
                let _0x44__0x43_pipeline_result = _0x5e_onclose
                _0x44__0x43_pipeline_result


            }
        } }
    const _0x2e_message_handler = async function (
        event
    ) {{
            const parent_scope = scope
            {
                const scope = _67lang.scope(parent_scope)
                event = event
                let _0x2f_event = event
                _0x2f_event

                const _0x60_print = await console.log("Message received")
                let _0x31__0x30_pipeline_result = _0x60_print
                _0x31__0x30_pipeline_result
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


        }
    } 
})();
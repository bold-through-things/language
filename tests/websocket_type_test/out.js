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
    const _0x42_main_test = async function () {{

            const _0x67_WebSocket = (new WebSocket("wss://example.com"))
            let _0x43_ws = _0x67_WebSocket
            _0x43_ws

            const _0x69_ws = _0x43_ws
            let _0x46__0x45_pipeline_result = _0x69_ws
            const _0x68_send = WebSocket.prototype.send.call(_0x46__0x45_pipeline_result, "Hello WebSocket")
            let _0x47__0x44_pipeline_result = _0x68_send
            _0x47__0x44_pipeline_result

            let _0x48_message = "Another message"
            _0x48_message
            const _0x6b_ws = _0x43_ws
            let _0x4b__0x4a_pipeline_result = _0x6b_ws
            const _0x6c_message = _0x48_message
            let _0x4d__0x4c_pipeline_result = _0x6c_message
            const _0x6a_send = WebSocket.prototype.send.call(_0x4b__0x4a_pipeline_result, _0x4d__0x4c_pipeline_result)
            let _0x4e__0x49_pipeline_result = _0x6a_send
            _0x4e__0x49_pipeline_result

            const _0x6e_ws = _0x43_ws
            const _0x6d_message_handler = WebSocket.prototype.onmessage.call(_0x6e_ws, ((arg0) => _0x3e_message_handler(arg0)))
            let _0x50__0x4f_pipeline_result = _0x6d_message_handler
            _0x50__0x4f_pipeline_result

            const _0x70_ws = _0x43_ws
            const _0x6f_open_handler = WebSocket.prototype.onopen.call(_0x70_ws, ((arg0) => _0x3e_message_handler(arg0)))
            let _0x52__0x51_pipeline_result = _0x6f_open_handler
            _0x52__0x51_pipeline_result
            const _0x72_ws = _0x43_ws
            const _0x71_close_handler = WebSocket.prototype.onclose.call(_0x72_ws, ((arg0) => _0x3e_message_handler(arg0)))
            let _0x54__0x53_pipeline_result = _0x71_close_handler
            _0x54__0x53_pipeline_result


        } }
    const _0x3e_message_handler = async function (
        event
    ) {{
            let _0x3f_event = event
            _0x3f_event

            const _0x73_print = await _67lang.maybe_await(console.log("Message received"))
            let _0x41__0x40_pipeline_result = _0x73_print
            _0x41__0x40_pipeline_result
        } }
    {


















    } {


    } 
})();
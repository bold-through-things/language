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
    {
        const parent_scope = scope
        {
            const scope = _67lang.scope(parent_scope)
            let _0x0_str = "testing"
            _0x0_str

            const _0x12_str = await _0x0_str
            let _0x6__0x2_str = _0x12_str
            const _0x14__0x2_str = await _0x6__0x2_str
            const _0x13_split = await String.prototype.split.call(_0x14__0x2_str, "t")
            let _0x7__0x3_split = _0x13_split
            const _0x11_print = await console.log(_0x7__0x3_split)
            let _0x8__0x1_print = _0x11_print
            _0x8__0x1_print

            const _0x16_str = await _0x0_str
            let _0xe__0xa_str = _0x16_str
            const _0x18__0xa_str = await _0xe__0xa_str
            const _0x17_split = await String.prototype.split.call(_0x18__0xa_str, /t/)
            let _0xf__0xb_split = _0x17_split
            const _0x15_print = await console.log(_0xf__0xb_split)
            let _0x10__0x9_print = _0x15_print
            _0x10__0x9_print
        }
    } 
})();
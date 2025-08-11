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
            let _0x0_my_obj = {}
            _0x0_my_obj
            let _0x1_my_obj = _0x0_my_obj

            _0x1_my_obj.name = "gemini"
            const _0xa__0x1_my_obj_name = await _0x1_my_obj.name
            let _0x2_name = _0xa__0x1_my_obj_name
            _0x2_name
            let _0x3_my_list = []
            _0x3_my_list
            let _0x6_my_list = _0x3_my_list

            let _0x8__0x4_my_obj = _0x0_my_obj
            const _0xc__0x8__0x4_my_obj_name = await _0x8__0x4_my_obj.name
            let _0x9__0x5_name = _0xc__0x8__0x4_my_obj_name
            const _0xb_push = await Array.prototype.push.call(_0x6_my_list, _0x9__0x5_name)
            let _0x7_push = _0xb_push
            _0x7_push
        }
    } 
})();
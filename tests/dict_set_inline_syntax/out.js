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
    /* -> */ {    
        }
    /* -> */ {    
            let _0x40_user = {["name"]: "Bob", ["age"]: "30", ["city"]: "New York"};

            const _0x6c_user = (_0x40_user);
            let _0x43__0x42_pipeline_result = _0x6c_user;

            const _0x6b_print = (await _67lang.maybe_await(console.log(_0x43__0x42_pipeline_result)));
            let _0x44__0x41_pipeline_result = _0x6b_print;

            const _0x6d_set = (_67lang.new_set("apple", "banana", "cherry"));
            let _0x46__0x45_pipeline_result = _0x6d_set;

            let _0x47_my_set = _0x46__0x45_pipeline_result;

            const _0x6f_my_set = (_0x47_my_set);
            let _0x4a__0x49_pipeline_result = _0x6f_my_set;

            const _0x6e_print = (await _67lang.maybe_await(console.log(_0x4a__0x49_pipeline_result)));
            let _0x4b__0x48_pipeline_result = _0x6e_print;

            let _0x4c_my_list = [-2, -1, 0, 1, 2, 3];

            const _0x71_my_list = (_0x4c_my_list);
            let _0x4f__0x4e_pipeline_result = _0x71_my_list;

            const _0x70_print = (await _67lang.maybe_await(console.log(_0x4f__0x4e_pipeline_result)));
            let _0x50__0x4d_pipeline_result = _0x70_print;

            let _0x51_simple_list = [1, 2, 3];

            const _0x73_simple_list = (_0x51_simple_list);
            let _0x54__0x53_pipeline_result = _0x73_simple_list;

            const _0x72_print = (await _67lang.maybe_await(console.log(_0x54__0x53_pipeline_result)));
            let _0x55__0x52_pipeline_result = _0x72_print;

        }

})();
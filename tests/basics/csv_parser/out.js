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
    {
    }
    {    
        let _0x40_lines = await (_67lang.stdin());
        let _0x41_lines = String.prototype.split.call(_0x40_lines, "\n");
        let _0x42_i = 0;
        let _0x43_header = [];
        let _0x44_rows = [];
        {    
            let _0x47__0x45_for_line__index = 0;
            let _0x48__0x46_for_line__list = _0x41_lines;
            while(true) {    
                if (!(_0x47__0x45_for_line__index < _0x48__0x46_for_line__list.length)) { break; }
                {    
                    let _0x49_line = _0x48__0x46_for_line__list[_0x47__0x45_for_line__index];
                    (_0x47__0x45_for_line__index = (_0x47__0x45_for_line__index + 1));
                    if (    
                        (_0x42_i === 0)
                    ) {    
                        (_0x43_header = String.prototype.split.call(_0x49_line, ","));
                    } else {    
                        let _0x4a_zipped_data = _67lang.zip(_0x43_header, String.prototype.split.call(_0x49_line, ","));
                        let _0x4b_row = {};
                        {    
                            let _0x4e__0x4c_for_kv__index = 0;
                            let _0x4f__0x4d_for_kv__list = _0x4a_zipped_data;
                            while(true) {    
                                if (!(_0x4e__0x4c_for_kv__index < _0x4f__0x4d_for_kv__list.length)) { break; }
                                {    
                                    let _0x50_kv = _0x4f__0x4d_for_kv__list[_0x4e__0x4c_for_kv__index];
                                    (_0x4e__0x4c_for_kv__index = (_0x4e__0x4c_for_kv__index + 1));
                                    (_0x4b_row[_0x50_kv["0"]] = _0x50_kv["1"]);
                                }
                            }
                        }
    
                        Array.prototype.push.call(_0x44_rows, _0x4b_row);
                    }
    
                    let _0x51__please_fix_the_fucking_varargs_add = (_0x42_i + 1);
                    (_0x42_i = _0x51__please_fix_the_fucking_varargs_add);
                }
            }
        }
    
        {    
            let _0x54__0x52_for_row__index = 0;
            let _0x55__0x53_for_row__list = _0x44_rows;
            while(true) {    
                if (!(_0x54__0x52_for_row__index < _0x55__0x53_for_row__list.length)) { break; }
                {    
                    let _0x56_row = _0x55__0x53_for_row__list[_0x54__0x52_for_row__index];
                    (_0x54__0x52_for_row__index = (_0x54__0x52_for_row__index + 1));
                    (await _67lang.maybe_await(console.log(_0x56_row["name"])));
                }
            }
        }
    
        let _0x57_age_over_30 = 0;
        {    
            let _0x5a__0x58_for_row__index = 0;
            let _0x5b__0x59_for_row__list = _0x44_rows;
            while(true) {    
                if (!(_0x5a__0x58_for_row__index < _0x5b__0x59_for_row__list.length)) { break; }
                {    
                    let _0x5c_row = _0x5b__0x59_for_row__list[_0x5a__0x58_for_row__index];
                    (_0x5a__0x58_for_row__index = (_0x5a__0x58_for_row__index + 1));
                    if (    
                        (globalThis.parseInt(_0x5c_row["age"]) < 30)
                    ) {    
                        (_0x57_age_over_30 = (_0x57_age_over_30 + 1));
                    } else {
                    }
                }
            }
        }
    
        (await _67lang.maybe_await(console.log(_0x57_age_over_30)));
    }

})();
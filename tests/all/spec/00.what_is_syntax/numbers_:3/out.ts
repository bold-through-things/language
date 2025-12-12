const EXISTS_INSIDE_AS_KEY = Symbol("EXISTS_INSIDE_AS_KEY")
const EXISTS_INSIDE_AS_VALUE = Symbol("EXISTS_INSIDE_AS_VALUE")
type JS_key_type = number | string | symbol;
const _67lang = {
    EXISTS_INSIDE_AS_KEY,
    EXISTS_INSIDE_AS_VALUE,
    exists_inside: <K extends JS_key_type, V>(
        inside: V[] | Record<K, V>, 
        k_or_v: typeof EXISTS_INSIDE_AS_KEY | typeof EXISTS_INSIDE_AS_VALUE, 
        ...arr: K[] | V[]
    ) => {
        // TODO support for sets
        if (Array.isArray(inside)) {
            // array
            const is_valid_index = (k: number) => Number.isInteger(k) && k >= 0 && k < inside.length;
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => is_valid_index(v as number));
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => inside.includes(v as V));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        } else {
            // assume dict
            if (k_or_v === _67lang.EXISTS_INSIDE_AS_KEY) {
                return arr.every(v => (v as K) in inside);
            } else if (k_or_v === _67lang.EXISTS_INSIDE_AS_VALUE) {
                return arr.every(v => Object.values(inside).includes(v as V));
            } else {
                throw new Error("compiler bug, `exists_inside`, must be a symbol `k_or_v`")
            }
        }
    },

    // TODO should bind these in the language proper
    has_keys: <K extends JS_key_type>(list_or_dict: Record<K, unknown> | unknown[], ...values: K[]) => _67lang.exists_inside(list_or_dict, EXISTS_INSIDE_AS_KEY, ...values),
    has_values: <V>(list_or_dict: Record<JS_key_type, V> | unknown[], ...values: V[]) => _67lang.exists_inside(list_or_dict, EXISTS_INSIDE_AS_VALUE, ...values),

    zip: <T>(...arrays: T[][]) => {
        const maxLength = Math.max(...arrays.map(x => x.length));
        return Array.from({ length: maxLength }).map((_, i) => {
            return arrays.map(array => array[i]);
        });
    },

    // wow Deno thank you very much for such a lovely bug yes
    // `String.prototype.split.call` type checking picks the
    // wrong implementation (`splitter`) and will not accept a `string` as `separator`.
    string_split: (s: string, sep: string | RegExp, limit?: number): string[] => {
        return String.prototype.split.call(s, 
            // can't even fucking specify the error
            // @ts-expect-error deno-ts(2345)
            sep,
            limit
        );
    },

    new_set: <T>(...args: T[]) => {
        // need this since semantics differ here
        // (we are remapping `...args` to first)
        return new Set(args);
    },

    // for browser only
    prompt: async (msg: string): Promise<string> => {
        return prompt(msg) ?? "";
    },
    stdin: async (): Promise<string> => {
        return ""; // i guess?
    },
    is_tty: (): boolean => {
        return false;
    }
}

;(globalThis as unknown as { _67lang: typeof _67lang })._67lang = _67lang;

type May_have_document = { document?: unknown };
const is_browser = typeof window !== "undefined" && typeof (window as May_have_document).document !== "undefined";
const is_Deno = typeof Deno !== "undefined";

if (is_browser == is_Deno) {
    throw new Error("nonsense for environment " + JSON.stringify({is_browser, is_Deno}));
}

if (is_Deno) {
    _67lang.prompt = async function (msg: string): Promise<string> {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) { return ""; }
        return new TextDecoder().decode(buf.subarray(0, n)).trim();
    };

    let stdin_cached: string | null = null;

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


class _0x3f_inside_dot_SPEC {
    constructor(
    ) {
    }
}


class _0x40_Interval_ID {
    constructor(
    ) {
    }
}


class _0x41_Response {
    constructor(
    ) {
    }
}


class _0x42_TextDecoder {
    constructor(
    ) {
    }
}


class _0x43_Uint8Array {
    constructor(
    ) {
    }
}


class _0x44_TextEncoder {
    constructor(
    ) {
    }
}


class _0x45_URL {
    constructor(
    ) {
    }
}


void (async () => {
    'use strict';
    {
    }
    {    
        console.log(((((((((((0 + (-0) + 0 + (-0) + 0 + (-0)) + 0 + (-0) + 0 + (-0) + 0) + 67 + (-67)) + 67 + (-67) + 67 + (-67))) + 0 + (-0) + 0) + (-0) + 0 + (-0) + 0 + (-0)) + 0 + (-0) + 0 + (-0) + (-0.000000)) + 67 + (-67) + 67.8 + (-67.8)) + 67.8 + (-67.8) + 67.8 + (-67.8)));
        console.log((67.8 + 67.80));
    }

})();
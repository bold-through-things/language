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


class _0x63_DAG_unroller {
    dep_loops: Array<string>;
    build_order: Array<string>;
    modules: Record<string, _0x64_Module>;
    constructor(
        dep_loops: Array<string>,
        build_order: Array<string>,
        modules: Record<string, _0x64_Module>,
    ) {
        this.dep_loops = dep_loops;
        this.build_order = build_order;
        this.modules = modules;
    }
}


class _0x64_Module {
    id: string;
    deps: Array<string>;
    visited: boolean;
    constructor(
        id: string,
        deps: Array<string>,
        visited: boolean,
    ) {
        this.id = id;
        this.deps = deps;
        this.visited = visited;
    }
}


void (async () => {
    'use strict';
    const _0x4d_visit = async function (    
        unroller: _0x63_DAG_unroller,
        module: _0x64_Module,
        chain: Array<string>,
    ) {    
        {    
            let _0x4e_chain = chain;
            let _0x4f_module = module;
            let _0x50_unroller = unroller;
            if (    
                _0x4f_module.visited
            ) {    
                return;
            } else {
            }
    
            (_0x4f_module.visited = (true));
            if (    
                false
            ) {    
                Array.prototype.push.call(Array.prototype.slice.call(_0x4e_chain), _0x4f_module.id);
            } else {
            }
    
            let _0x51_next_chain = Array.prototype.slice.call(_0x4e_chain);
            Array.prototype.push.call(_0x51_next_chain, _0x4f_module.id);
            {    
                let _0x54__0x52_for_dep_id__index = 0;
                let _0x55__0x53_for_dep_id__list = _0x4f_module.deps;
                while(true) {    
                    if (!(_0x54__0x52_for_dep_id__index < _0x55__0x53_for_dep_id__list.length)) { break; }
                    {    
                        let _0x56_dep_id = _0x55__0x53_for_dep_id__list[_0x54__0x52_for_dep_id__index];
                        (_0x54__0x52_for_dep_id__index = (_0x54__0x52_for_dep_id__index + 1));
                        if (    
                            _67lang.has_values(_0x51_next_chain, _0x56_dep_id)
                        ) {    
                            let _0x57_dep_loop = [] as Array<string>;
                            Array.prototype.push.call(_0x57_dep_loop, _0x56_dep_id);
                            {    
                                let _0x5a__0x58_for_chain_dep_id__index = 0;
                                let _0x5b__0x59_for_chain_dep_id__list = Array.prototype.reverse.call(Array.prototype.slice.call(_0x51_next_chain));
                                while(true) {    
                                    if (!(_0x5a__0x58_for_chain_dep_id__index < _0x5b__0x59_for_chain_dep_id__list.length)) { break; }
                                    {    
                                        let _0x5c_chain_dep_id = _0x5b__0x59_for_chain_dep_id__list[_0x5a__0x58_for_chain_dep_id__index];
                                        (_0x5a__0x58_for_chain_dep_id__index = (_0x5a__0x58_for_chain_dep_id__index + 1));
                                        Array.prototype.push.call(_0x57_dep_loop, _0x5c_chain_dep_id);
                                        if (    
                                            (_0x5c_chain_dep_id === _0x56_dep_id)
                                        ) {    
                                            break;
                                        } else {
                                        }
                                    }
                                }
                            }
    
                            Array.prototype.reverse.call(_0x57_dep_loop);
                            Array.prototype.push.call(_0x50_unroller.dep_loops, Array.prototype.join.call(_0x57_dep_loop, " → "));
                        } else {    
                            (await (_0x4d_visit(_0x50_unroller, _0x50_unroller.modules[_0x56_dep_id], _0x51_next_chain)));
                        }
                    }
                }
            }
    
            Array.prototype.push.call(_0x50_unroller.build_order, _0x4f_module.id);
        }
    }
    {
    }
    {    
        let _0x40_lines = (await (_67lang.stdin()));
        let _0x41_lines = _67lang.string_split(_0x40_lines, "\n");
        let _0x42_modules = {} as Record<string, _0x64_Module>;
        {    
            let _0x45__0x43_for_line__index = 0;
            let _0x46__0x44_for_line__list = _0x41_lines;
            while(true) {    
                if (!(_0x45__0x43_for_line__index < _0x46__0x44_for_line__list.length)) { break; }
                {    
                    let _0x47_line = _0x46__0x44_for_line__list[_0x45__0x43_for_line__index];
                    (_0x45__0x43_for_line__index = (_0x45__0x43_for_line__index + 1));
                    let _0x48_kv = _67lang.string_split(_0x47_line, ":", 2);
                    let _0x49_id = String.prototype.trim.call(_0x48_kv[0]);
                    let _0x4a_module = (new _0x64_Module(_0x49_id, [] as Array<string>, false));
                    let _0x4b_deps_str = String.prototype.trim.call(_0x48_kv[1]);
                    if (    
                        !((_0x4b_deps_str === ""))
                    ) {    
                        let _0x4c_deps = _67lang.string_split(String.prototype.trim.call(_0x4b_deps_str), /\s+/);
                        (_0x4a_module.deps = (_0x4c_deps));
                    } else {
                    }
    
                    (_0x42_modules[_0x4a_module.id] = _0x4a_module);
                }
            }
        }
    
        let _0x5d_unroller = (new _0x63_DAG_unroller([] as Array<string>, [] as Array<string>, _0x42_modules));
        {    
            let _0x60__0x5e_for_module__index = 0;
            let _0x61__0x5f_for_module__list = Object.values(_0x42_modules);
            while(true) {    
                if (!(_0x60__0x5e_for_module__index < _0x61__0x5f_for_module__list.length)) { break; }
                {    
                    let _0x62_module = _0x61__0x5f_for_module__list[_0x60__0x5e_for_module__index];
                    (_0x60__0x5e_for_module__index = (_0x60__0x5e_for_module__index + 1));
                    (await (_0x4d_visit(_0x5d_unroller, _0x62_module, [] as Array<string>)));
                }
            }
        }
    
        if (    
            (1 <= _0x5d_unroller.dep_loops.length)
        ) {    
            console.log(("ERROR: there are dependency loops.\n" + Array.prototype.join.call(_0x5d_unroller.dep_loops, "\n")));
        } else {    
            console.log(Array.prototype.join.call(_0x5d_unroller.build_order, "\n"));
        }
    }

})();
// pipeline/js_conversion.ts

// replace_chars(s, ok, map)
export function replaceChars(
  s: string,
  ok: string,
  map: Record<string, string>,
): string {
  const allowed = new Set(ok.split(""));
  let out = "";

  for (const c of s) {
    if (allowed.has(c)) {
      out += c;
    } else if (Object.prototype.hasOwnProperty.call(map, c)) {
      out += map[c];
    } else {
      const code = c.codePointAt(0);
      let hex = (code ?? 0).toString(16);
      if (hex.length < 2) {
        hex = hex.padStart(2, "0");
      }
      out += `_${hex}_`;
    }
  }

  return out;
}

export function to_valid_js_ident(s: string): string {
  const charMap: Record<string, string> = {
    " ": "_",
    ".": "_dot_",
    "$": "_dollar_",
    "%": "_percent_",
    "+": "_plus_",
    "-": "_minus_",
    "*": "_star_",
    "/": "_slash_",
    "=": "_eq_",
    "<": "_lt_",
    ">": "_gt_",
    "!": "_bang_",
    "?": "_q_",
    "@": "_at_",
    "#": "_hash_",
    "&": "_and_",
    "|": "_pipe_",
    "^": "_caret_",
    "~": "_tilde_",
    "`": "_tick_",
    "'": "_apos_",
    '"': "_quot_",
    "(": "_lp_",
    ")": "_rp_",
    "[": "_lb_",
    "]": "_rb_",
    "{": "_lc_",
    "}": "_rc_",
    ":": "_colon_",
    ";": "_semi_",
    ",": "_comma_",
  };

  let result = replaceChars(
    s,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
    charMap,
  );

  if (result.length > 0 && /[0-9]/.test(result[0])) {
    result = "_" + result;
  }

  if (result.length === 0 || !/[A-Za-z_]/.test(result[0])) {
    result = "_" + result;
  }

  return result;
}

// Same stub as the Crystal snippet you showed
export const JS_LIB = `
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

if (typeof window === \"undefined\") {
    // Deno environment

    _67lang.prompt = async function (msg) {
        await Deno.stdout.write(new TextEncoder().encode(msg));
        const buf = new Uint8Array(1024);
        const n = await Deno.stdin.read(buf);
        if (n === null) { return \"\"; }
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

`;

// Constants
export const NEWLINE = "\n";

# pipeline/js_conversion.cr

require "json"

def replace_chars(s : String, ok : String, map : Hash(Char, String)) : String
  allowed = ok.chars.to_set
  String.build do |io|
    s.each_char do |c|
      if allowed.includes?(c)
        io << c
      elsif v = map[c]?
        io << v
      else
        hex = c.ord.to_s(16)
        hex = hex.rjust(2, '0')
        io << '_' << hex << '_'
      end
    end
  end
end

def to_valid_js_ident(s : String) : String
  char_map = {
    ' ' => "_",
    '.' => "_dot_",
    '$' => "_dollar_",
    '%' => "_percent_",
    '+' => "_plus_",
    '-' => "_minus_",
    '*' => "_star_",
    '/' => "_slash_",
    '=' => "_eq_",
    '<' => "_lt_",
    '>' => "_gt_",
    '!' => "_bang_",
    '?' => "_q_",
    '@' => "_at_",
    '#' => "_hash_",
    '&' => "_and_",
    '|' => "_pipe_",
    '^' => "_caret_",
    '~' => "_tilde_",
    '`' => "_tick_",
    '\'' => "_apos_",
    '"' => "_quot_",
    '(' => "_lp_",
    ')' => "_rp_",
    '[' => "_lb_",
    ']' => "_rb_",
    '{' => "_lc_",
    '}' => "_rc_",
    ':' => "_colon_",
    ';' => "_semi_",
    ',' => "_comma_",
  } of Char => String

  result = replace_chars(
    s,
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_",
    char_map
  )

  if !result.empty? && result[0].number?
    result = "_" + result
  end

  if result.empty? || !(result[0].letter? || result[0] == '_')
    result = "_" + result
  end

  result
end

JS_LIB = "
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

"

# Constants
NEWLINE = "\n"

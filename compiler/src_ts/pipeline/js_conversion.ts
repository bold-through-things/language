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
import JS_LIB from "./lib.js" with { type: "text" };

export { JS_LIB };

// Constants
export const NEWLINE = "\n";

export const FORCE_SYNTAX_ERROR = "67lang";

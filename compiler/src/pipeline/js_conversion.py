"""JavaScript conversion utilities and standard library.

This module contains utilities for converting 67lang constructs to JavaScript,
including identifier conversion and the standard library.
"""

from pathlib import Path


def replace_chars(s: str, ok: str, map: dict[str, str]) -> str:
    """Replace characters in string according to mapping"""
    return ''.join(
        c if c in ok else map[c] if c in map else f'_{ord(c):02x}_'
        for c in s
    )


def to_valid_js_ident(s: str) -> str:
    """Convert arbitrary string to valid JavaScript identifier"""
    # Enhanced character mapping for better readability
    char_map = {
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
    }
    
    # Ensure we start with a valid identifier character (letter or underscore)
    result = replace_chars(s, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_", char_map)
    
    # If the result starts with a digit, prepend an underscore
    if result and result[0].isdigit():
        result = "_" + result
    
    # If the result is empty or starts with invalid character, ensure it's valid
    if not result or not (result[0].isalpha() or result[0] == "_"):
        result = "_" + result
        
    return result


# Load the JavaScript standard library
js_lib = open(Path(__file__).parent.parent.joinpath("stdlib/lib.js")).read()

# Constants (replaces the ridiculous google_ai_research_sucks.py)
NEWLINE = '\n'
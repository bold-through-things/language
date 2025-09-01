# ---- JSON Spec Matcher v2 -----------------------------------------
from typing import Any, Tuple, List, Dict
import json, re

class MatchError:
    __slots__ = ("path", "msg")
    def __init__(self, path: str, msg: str): self.path, self.msg = path, msg
    def __str__(self): return f"{self.path}: {self.msg}"

def _jsonpath(path: str, key: Any) -> str:
    if path == "$": 
        return f"$.{key}" if isinstance(key, str) else f"$[{key}]"
    return f"{path}.{key}" if isinstance(key, str) else f"{path}[{key}]"

def _typename(x: Any) -> str:
    if x is None: return "null"
    if isinstance(x, bool): return "boolean"
    if isinstance(x, (int, float)) and not isinstance(x, bool): return "number"
    if isinstance(x, str): return "string"
    if isinstance(x, list): return "array"
    if isinstance(x, dict): return "object"
    return type(x).__name__

def _is_op_dict(d: Any) -> bool:
    return isinstance(d, dict) and any(k.startswith("$") for k in d.keys())

def _match_scalar_op(spec: Dict[str, Any], actual: Any, path: str, errs: List[MatchError]) -> None:
    for op, val in spec.items():
        if op in ("$len","$any","$all","$subset","$items","$count","$strict","$forbid","$where"): 
            # handled elsewhere
            continue
        if op == "$eq":
            if actual != val:
                errs.append(MatchError(path, f"expected == {val!r}, got {actual!r}"))
        elif op == "$contains":
            if not isinstance(actual, str):
                errs.append(MatchError(path, f"$contains needs string, got {_typename(actual)}"))
            elif val not in actual:
                errs.append(MatchError(path, f"expected to contain {val!r}, got {actual!r}"))
        elif op == "$regex":
            if not isinstance(actual, str):
                errs.append(MatchError(path, f"$regex needs string, got {_typename(actual)}"))
            elif not re.search(val, actual):
                errs.append(MatchError(path, f"expected to match /{val}/, got {actual!r}"))
        elif op in ("$gt", "$ge", "$lt", "$le"):
            if not (isinstance(actual, (int, float)) and not isinstance(actual, bool)):
                errs.append(MatchError(path, f"{op} needs number, got {_typename(actual)}"))
            else:
                if op == "$gt" and not (actual > val): errs.append(MatchError(path, f"expected > {val}, got {actual}"))
                if op == "$ge" and not (actual >= val): errs.append(MatchError(path, f"expected >= {val}, got {actual}"))
                if op == "$lt" and not (actual < val): errs.append(MatchError(path, f"expected < {val}, got {actual}"))
                if op == "$le" and not (actual <= val): errs.append(MatchError(path, f"expected <= {val}, got {actual}"))
        elif op == "$in":
            if actual not in val:
                errs.append(MatchError(path, f"expected one of {val!r}, got {actual!r}"))
        elif op == "$type":
            if _typename(actual) != val:
                errs.append(MatchError(path, f"expected type {val}, got {_typename(actual)}"))
        elif op == "$present":
            # handled at object level; presence implies success
            pass
        elif op == "$not":
            sub_errs: List[MatchError] = []
            _match_any(val, actual, path, sub_errs)
            if not sub_errs:
                errs.append(MatchError(path, f"$not failed: value matches forbidden spec"))
        elif op == "$oneOf":
            all_errs = []
            for i, s in enumerate(val):
                sub_errs: List[MatchError] = []
                _match_any(s, actual, path, sub_errs)
                if not sub_errs:
                    break
                all_errs.append((i, sub_errs))
            else:
                flat = "; ".join(f"alt[{i}] first error: {e}" for i, es in all_errs for e in es[:1])
                errs.append(MatchError(path, f"none of $oneOf matched; {flat}"))
        else:
            errs.append(MatchError(path, f"unknown operator {op}"))

def _match_object(spec: Dict[str, Any], actual: Any, path: str, errs: List[MatchError]) -> None:
    if not isinstance(actual, dict):
        errs.append(MatchError(path, f"expected object, got {_typename(actual)}"))
        return

    # strictness and forbid lists
    strict = bool(spec.get("$strict", False))
    forbid = set(spec.get("$forbid", [])) if isinstance(spec.get("$forbid", []), list) else set()

    # normal keys to check
    spec_keys = [k for k in spec.keys() if not k.startswith("$")]

    if strict:
        extras = set(actual.keys()) - set(spec_keys)
        if extras:
            errs.append(MatchError(path, f"$strict: unexpected keys present: {sorted(extras)}"))

    if forbid:
        present = sorted([k for k in forbid if k in actual])
        if present:
            errs.append(MatchError(path, f"$forbid: keys must be absent: {present}"))

    for k in spec_keys:
        if k not in actual:
            v = spec[k]
            if isinstance(v, dict) and v.get("$present") is True:
                continue
            errs.append(MatchError(_jsonpath(path, k), "missing key"))
            continue
        _match_any(spec[k], actual[k], _jsonpath(path, k), errs)

def _matches(want: Any, got: Any) -> Tuple[bool, List[MatchError]]:
    e: List[MatchError] = []
    _match_any(want, got, "$", e)
    return (len(e) == 0), e

def _array_count(where_spec: Any, actual: List[Any], path: str, cmp_ops: Dict[str, Any], errs: List[MatchError]) -> None:
    n = 0
    for i, el in enumerate(actual):
        ok, _ = _matches(where_spec, el)
        if ok: n += 1
    _match_scalar_op(cmp_ops, n, path + "/$count", errs)

def _unordered_multiset_match(spec_items: List[Any], actual_items: List[Any], path: str, errs: List[MatchError]) -> None:
    # backtracking matcher for better pairing than greedy
    used = [False] * len(actual_items)
    best_hint = None  # store a first-failure hint

    def backtrack(j: int) -> bool:
        nonlocal best_hint
        if j == len(spec_items):
            return True
        want = spec_items[j]
        for i, got in enumerate(actual_items):
            if used[i]: 
                continue
            sub_errs: List[MatchError] = []
            _match_any(want, got, _jsonpath(path, i), sub_errs)
            if not sub_errs:
                used[i] = True
                if backtrack(j + 1): 
                    return True
                used[i] = False
            elif best_hint is None:
                best_hint = sub_errs[0]
        return False

    if not backtrack(0):
        errs.append(MatchError(path, f"unordered multiset match failed"))
        if best_hint:
            errs.append(best_hint)

def _match_array_controller(spec: Dict[str, Any], actual: Any, path: str, errs: List[MatchError]) -> None:
    if not isinstance(actual, list):
        errs.append(MatchError(path, f"expected array, got {_typename(actual)}"))
        return

    if "$len" in spec:
        want = spec["$len"]
        if isinstance(want, dict):
            _match_scalar_op(want, len(actual), path + "/$len", errs)
        else:
            if len(actual) != want:
                errs.append(MatchError(path, f"expected length {want}, got {len(actual)}"))

    if "$count" in spec:
        payload = spec["$count"]
        where = payload.get("$where", {})
        cmp_ops = {k: v for k, v in payload.items() if k.startswith("$") and k not in ("$where",)}
        _array_count(where, actual, path, cmp_ops, errs)

    if "$any" in spec:
        each = spec["$any"]
        for i, el in enumerate(actual):
            sub_errs: List[MatchError] = []
            _match_any(each, el, _jsonpath(path, i), sub_errs)
            if not sub_errs:
                break
        else:
            errs.append(MatchError(path, f"$any failed: no element matched"))

    if "$all" in spec:
        each = spec["$all"]
        for i, el in enumerate(actual):
            _match_any(each, el, _jsonpath(path, i), errs)

    if "$subset" in spec:
        subset_specs = list(spec["$subset"])
        _unordered_multiset_match(subset_specs, actual, path, errs)

    if "$items" in spec:
        want_items = list(spec["$items"])
        order = spec.get("$order", "any")
        if order == "exact":
            if len(want_items) != len(actual):
                errs.append(MatchError(path, f"$items exact: length mismatch {len(want_items)} != {len(actual)}"))
            else:
                for i, (w, a) in enumerate(zip(want_items, actual)):
                    _match_any(w, a, _jsonpath(path, i), errs)
        else:
            if len(want_items) != len(actual):
                errs.append(MatchError(path, f"$items any: actual has {len(actual)} items, spec has {len(want_items)}"))
            _unordered_multiset_match(want_items, actual, path, errs)

def _match_list(spec: Any, actual: Any, path: str, errs: List[MatchError]) -> None:
    if not isinstance(actual, list):
        errs.append(MatchError(path, f"expected array, got {_typename(actual)}"))
        return
    _unordered_multiset_match(list(spec), actual, path, errs)

def _match_any(spec: Any, actual: Any, path: str, errs: List[MatchError]) -> None:
    if isinstance(spec, dict) and any(k in spec for k in ("$len","$any","$all","$subset","$items","$count")):
        _match_array_controller(spec, actual, path, errs)
        return
    if _is_op_dict(spec) and not any(k in spec for k in ("$len","$any","$all","$subset","$items","$count")):
        _match_scalar_op(spec, actual, path, errs)
        return
    if isinstance(spec, dict):
        _match_object(spec, actual, path, errs)
        return
    if isinstance(spec, list):
        _match_list(spec, actual, path, errs)
        return
    if spec != actual:
        errs.append(MatchError(path, f"expected {spec!r}, got {actual!r}"))

def _pretty_json(s: str) -> str:
    try:
        return json.dumps(json.loads(s), indent=2, ensure_ascii=False, sort_keys=True)
    except Exception:
        return s

def validate_json_spec(actual_json_text: str, spec_json_text: str) -> Tuple[bool, str, str]:
    try:
        actual = json.loads(actual_json_text)
    except Exception as e:
        return False, f"Actual errors-file is not valid JSON: {e}", _pretty_json(actual_json_text)
    try:
        spec = json.loads(spec_json_text)
    except Exception as e:
        return False, f"Spec file is not valid JSON: {e}", _pretty_json(actual_json_text)

    errs: List[MatchError] = []
    _match_any(spec, actual, "$", errs)
    if not errs:
        return True, "OK", json.dumps(actual, indent=2, ensure_ascii=False, sort_keys=True)

    lines = ["JSON spec mismatches:"]
    for e in errs:
        lines.append(f"  - {e}")
    lines.append("\nActual JSON:")
    lines.append(json.dumps(actual, indent=2, ensure_ascii=False, sort_keys=True))
    return False, "\n".join(lines), json.dumps(actual, indent=2, ensure_ascii=False, sort_keys=True)
# ---- end JSON Spec Matcher v2 -------------------------------------

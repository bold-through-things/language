# String Formatting: Format Macro

## Priority
**LOW** - Quality of life improvement

## Problem
String interpolation is awkward with tree syntax. Current approach requires verbose concat chains.

## Solution
Implement `format` macro similar to Lisp's format function:
```
format
    string "Hello {}, you are {} years old"
    a name
    an age
```

Instead of:
```
a concat
    string "Hello, "
    a name
    string ", you are "
    an age
    string " years old"
```

## Technical Details
- 5-minute implementation
- Add entry to `_67lang` shim
- Expose via builtin call conventions
- Use `{}` as placeholder syntax

## Impact
- Cleaner string composition
- Better readability
- Maintains tree structure naturally
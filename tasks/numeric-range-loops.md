# Numeric Range Loops

## Priority
**MEDIUM** - Common pattern, especially for WebGL

## Problem
Only have `for...in` for lists and `while` loops. Missing efficient numeric iteration.

## Solution
Implement range syntax for numeric loops:
```
for i in
    range up
        from 0
        below
            an array length
        step 1
do
    a print
        an i
```

## Design Considerations
- `up`, `down`, or `between` range types
- `from`/`above` for inclusive/exclusive lower bounds
- `below`/`to` for exclusive/inclusive upper bounds
- Dynamic arguments supported
- Optional `step` parameter

## Implementation Options
1. **Macro approach**: Compile to efficient C-style for loops
2. **Class approach**: `range` as builtin class/iterator
3. **Both**: Macro for `for...in range`, class for other uses

## Performance Impact
Macro approach preferred for WebGL performance - avoids iterator object creation.

## Impact
- Enables efficient numeric iteration
- Important for performance-critical applications
- Covers common programming pattern
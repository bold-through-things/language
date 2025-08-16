# Smart Await Emission

## Priority
**HIGH** - Critical for WebGL performance

## Problem
Currently everything gets awaited, even when unnecessary:
- Async by default is elegant (inspired by Easel games)
- But creates performance overhead for sync operations
- Horrible for WebGL rendering loops

## Solution
Type-driven await emission:
- Inspect function signatures during compilation
- Only emit `await` for functions that return Promises
- Preserve async-by-default semantics while eliminating overhead

## Technical Details
- Leverage existing type system knowledge
- Static analysis of return types
- Should be straightforward implementation

## Future Enhancement
`background` clause for explicit Promise returns without await (long-term).

## Impact
- Maintains elegant async-by-default semantics
- Eliminates performance overhead
- Critical for WebGL and performance-critical applications
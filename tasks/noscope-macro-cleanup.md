# NoScope Macro Cleanup

## Priority
**LOW-MEDIUM** - Clean up existing hack

## Problem
Current `noscope` macro creates atrocious tree structure:
- Used for argument isolation in access macro unrolling
- Shadows intermediate variables to prevent scope pollution
- Works but creates messy AST

## Root Cause
Access macro unrolls into multiple siblings, but only final result should be visible to parent.

## Long-term Solution
Pipeline syntax (`then` macro) should eliminate this problem entirely.

## Short-term Fix
Add `noscope` handler to preprocessing step:
- Hoist contents to nearest parent statement block
- Process children first
- Relatively trivial implementation

## Future Consideration
`then chain` subsyntax might still suffer from similar issues - needs evaluation after pipeline implementation.

## Impact
- Cleaner tree structure
- Better intermediate code representation
- Easier debugging of compilation process
# Fix Expansion Mode (`./test --expand`)

## Priority
**MEDIUM** - Important for debugging, but not MVP critical

## Problem
Two-step compilation fails: `.67lang` → `.67lang.expanded` → `.js`
- `.67lang.expanded` should be Ready To Emit (RTE) form - no macros, pure tree
- Currently fails because crucial metadata gets lost during tree dump/reload
- RTE should always compile without macro processing

## Root Cause
Ephemeral metadata dependencies that aren't persisted with tree dump.

## Solution
Eliminate metadata dependencies in RTE form:
- Make RTE completely self-contained
- Ensure all necessary information is encoded in the tree structure
- Remove reliance on runtime metadata for RTE compilation

## Future Vision
- RTE as bytecode for library interop
- Tree dumping after any compilation step
- Better macro expansion debugging
- Foundation for external tooling

## Technical Details
- Identify which metadata is critical but not persisted
- Refactor to embed necessary info in tree nodes
- Ensure RTE→JS compilation path is metadata-free

## Impact
- Better debugging of macro expansion
- Foundation for library interop
- Enables external tooling development
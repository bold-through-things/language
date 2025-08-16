# External Binding Declarations

## Priority
**MEDIUM** - Needed for real-world JS ecosystem integration

## Problem
Need way to interface with external JS libraries and runtime APIs that aren't part of WebIDL.

## Solution
Add syntax for binding declarations to inform the type system about external APIs:
- Users declare what they know will be available at runtime
- Call convention declarations for external functions
- Type information for compiler without importing actual code

## Design Philosophy
- 67lang emits clean `out.js`
- What surrounds it (npm, modules, etc.) is user's problem
- Just provide interface declarations

## Technical Details
- Extend call convention system
- Allow user-defined function signatures
- Runtime availability is user's responsibility

## Future Vision
- Own package hub for macro distribution (very long-term)
- Userspace macro definitions in packages
- Not feasible with npm due to compile-time nature

## Impact
- Enables integration with JS ecosystem
- Maintains clean separation of concerns
- Foundation for external library usage
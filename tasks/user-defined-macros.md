# User-Defined Macros

## Priority
**LOW** - Powerful feature but language already innovates significantly without it

## Problem
Users cannot define their own compile-time macros to extend language syntax and capabilities.

## Vision
Allow users to create custom macros that participate in the compilation pipeline:
- Custom syntax transformations
- Domain-specific language extensions
- Code generation at compile time

## Design Considerations
- Macro definition syntax (TBD)
- Integration with existing macro registry system
- Phase specification (preprocess, typecheck, emission)
- Hygiene and scope handling
- Package distribution of macros

## Long-term Impact
- Infinitely extensible language
- Domain-specific syntax support
- Foundation for package ecosystem with compile-time features
- User innovation in language features

## Current Status
Language already provides significant innovation (pipelines, etc.) without user macros. This feature, while powerful, is not critical for initial usability.

## Future Package System
Critical for eventual package hub - macros distributed as packages, not feasible with npm due to compile-time nature.
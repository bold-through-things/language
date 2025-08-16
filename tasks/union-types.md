# Union Types

## Priority
**HIGH** - Essential for strict type checking

## Problem
Cannot express types that can be one of several alternatives (e.g., `string | number`, `Result<T, Error>`).

## Solution
Implement union type syntax:
```
type Union is either
    type Type1
    type Type2
```

## Technical Details
- Extend type system to handle union types
- Type checking needs to verify operations are valid for all union members
- Runtime type discrimination may be needed
- Integration with existing ad-hoc polymorphism

## Impact
- Critical for strict type system
- Enables proper error handling patterns
- Foundation for advanced type safety
- Required for Result/Option types
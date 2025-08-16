# TypeScript Emission Target

## Priority
**MEDIUM** - Preserve type information, leverage Deno's TS support

## Problem
Currently emit JavaScript, losing all rich type information from 67lang's strict type system.

## Solution
Emit TypeScript instead of JavaScript:
- Preserve type annotations in output
- Better IDE support and tooling
- Catch more errors at TypeScript compilation layer
- Leverage Deno's native TypeScript support

## Example
Instead of:
```javascript
let user = {name: "Bob", age: 30};
```

Emit:
```typescript
let user: {name: string, age: number} = {name: "Bob", age: 30};
```

## Complexity Unknown
- Could be simple switch in emission phase
- Might require significant changes to type tracking
- Won't know until implementation attempt

## Benefits
- Better tooling integration
- Preserved type safety
- Natural fit for Deno target
- Enhanced developer experience

## Impact
- Maintains type information through entire pipeline
- Better error messages and tooling
- Leverages existing TypeScript ecosystem
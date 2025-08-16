# Generics System

## Priority  
**HIGH** - Critical for type safety with collections and data structures

## Problem
Cannot express typed collections or generic functions:
- Can't specify `List<String>` vs `List<Int>`
- Type system sees all collection items as `*` (any type)
- Can't read fields of objects in collections due to type erasure
- `order_of_dependencies` code suffers from this - forced to use dicts instead of classes

## Current Workaround
Using untyped dicts stored in lists, losing type safety and field access.

## Proposed Solution
**Needs brainstorming session** - likely `List<T>` syntax similar to TypeScript.

## Technical Details
- Type inference system needs generic support
- Template/parametric types for functions and data structures
- Proper constraint handling
- Integration with existing ad-hoc polymorphism

## Blockers
- No concrete syntax design yet
- Need to analyze pain points in existing languages
- Requires separate design session

## Impact
- Essential for type-safe collections
- Enables proper OOP with typed containers
- Foundation for advanced type system features
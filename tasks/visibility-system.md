# Visibility System

## Priority
**LOW-MEDIUM** - Nice to have for larger codebases

## Problem
No way to indicate API boundaries or communicate intent about which functions/classes are internal vs. public.

## Solution
Advisory visibility labels instead of hard enforcement:
```
fn my_function
    visibility private
    # implementation

fn experimental_api  
    visibility please_dont_use_this
    # implementation

fn stable_api
    visibility public
    # implementation
```

## Design Philosophy
- Visibility names ARE the warning
- No hard enforcement - client code can still access anything
- Gives library authors way to communicate intent
- More pragmatic than binary public/private

## Technical Details
- Support both scoping and inline modifier syntax
- No compiler warnings - visibility name is self-documenting
- If someone imports `please_do_not_use_this!!!` they know what they're doing

## Impact
- Better API communication
- Helps organize larger codebases
- Avoids paternalistic access control
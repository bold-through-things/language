# Pipeline Syntax: `then` Macro

## Priority
**HIGH** - Will dramatically improve language ergonomics and eliminate access macro verbosity

## Problem
Current access macro syntax is verbose and inflexible:
```
access dict #
    where # takes
        a key
```

Repetitive for longer function names, and you can't perform operations mid-pipeline without breaking into manual `local` assignments.

## Solution
Implement `then` pipeline syntax:
```
get phrase from stdin
then as phrase chain split_by_space sort join
then get # as first_letter
    int 0
if
    then eq
        string 'a'
then
    return            
do print the phrase
```

## Technical Details
- `then` takes result of previous expression and passes as first argument to next operation
- `then as <name>` creates a new local binding for intermediate results  
- `then into <name>` for assignment
- Should be syntactic sugar, relatively simple to implement
- Will allow elimination of the access macro entirely

## Impact
- Much cleaner pipeline syntax
- Eliminates access macro complexity
- Natural mid-pipeline operations
- Significant ergonomic improvement
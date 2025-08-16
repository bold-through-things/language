# Dict and Set Inline Syntax

## Priority
**LOW-MEDIUM** - Quality of life improvement, not a blocker

## Problem
Dict creation is tedious:
```
local user
    dict

a user #
    where # takes
        string "name"
    string "Bob"

a user #
    where # takes  
        string "age"
    int 30
```

No set initializers (though WebIDL exposure may have added sets).

## Solution
### Dict Inline Syntax
```
local user
    dict
        string "name" string "Bob"
        string "age" int 30
```

### Set Initialization
Probably just a varargs function since sets are unordered and flat:
```
local my_set
    set
        string "apple"
        string "banana"
        string "cherry"
```

## Additional Feature
Out-of-order list initializers (sufficiently adjacent to dict syntax).

## Impact
- Cleaner syntax for data structure initialization
- Less verbose than current approach
- Nice to have but not critical for MVP
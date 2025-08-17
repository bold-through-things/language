# Dict and Set Inline Syntax

## Priority
**LOW-MEDIUM** - Quality of life improvement, not a blocker

actually a blocker!

## Problem
Dict creation is tedious:
```
local user
	dict

do # the user
	string "name"
	string "Bob"

do # the user
	string "age"
	int 30
```

No set initializers (though WebIDL exposure may have added sets).

## Solution
### Dict Inline Syntax
```
local user
	dict
		entry
			string "name"
			string "Bob"
		entry
			string "age"
			int 30
```

### Set Initialization
Probably just a varargs function since sets are unordered and flat:
```
local my_set
	do new_set
		string "apple"
		string "banana"
		string "cherry"
```

## Additional Feature
Out-of-order list initializers (sufficiently adjacent to dict syntax).

```
local my_list
	list
		note this one is implicity append
		int 0
		append
			int 1
		prepend
			int -2
		insert_after_index 0
			int -1
		note again append implicitly
		int 2
		int 3
note the operations must happen all in order top to bottom.
	but actually there are no operations, we emit a literal.
```

## Impact
- Cleaner syntax for data structure initialization
- Less verbose than current approach
- Nice to have but not critical for MVP - no it is CRITICAL!

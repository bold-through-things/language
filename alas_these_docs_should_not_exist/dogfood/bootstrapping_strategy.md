# bootstrapping strategy

## hybrid migration approach

rather than rewriting from scratch, replace Python components incrementally:

1. **coexistence** - both compilers operational
2. **component replacement** - migrate modules one by one  
3. **continuous validation** - test compatibility throughout
4. **cutover** - complete transition to self-hosted

### pipeline evolution
```
current:  .ind → python parser → python macros → python types → python js → .js
target:   .ind → lang parser → lang macros → lang types → lang js → .js

phase 1:  .ind → python parser → python macros → python types → lang js → .js  
phase 2:  .ind → python parser → python macros → lang types → lang js → .js
phase 3:  .ind → python parser → lang macros → lang types → lang js → .js
phase 4:  .ind → lang parser → lang macros → lang types → lang js → .js
```

## data structures

### ast representation (using design decision)
```
class Node
	field content
		type str
	field position
		type Position
	field children
		type list
			self.class
```

starts with dictionary approach, evolves to struct-based classes

### error handling (using design decision)
try/catch macros mapping directly to JS try/catch:
```
try
	parse_tree
		a invalid_source
catch error
	print
		concat
			string "parsing failed: "
			a error message
```

## development approach

### validation strategy
- weekly testing with both compilers
- byte-for-byte output comparison where possible
- performance and memory monitoring
- rollback on >5% test failures or >50% performance regression

### compatibility guarantees
- identical JavaScript output for deterministic cases
- same error messages and locations
- same command line interface
- compatible with existing tooling

**success metric:** compiler fully rewritten in .ind with all existing tests passing
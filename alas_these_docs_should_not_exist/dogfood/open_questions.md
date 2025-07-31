# open questions

these are design decisions and technical details that need clarification from the maintainer before proceeding with the bootstrapping effort.

## language design questions

### 1. class/struct syntax
**question:** what should user-defined types look like?

**current status:** 
- only primitive types (int, string, bool, list, dict)
- no custom data structures
- using dictionaries for everything

**options:**
```
# option a: class-based syntax
class Node
	field content
		type string
	field position
		type Position
	field children
		type list
			type Node

# option b: struct-based syntax  
struct Node
	content string
	position Position
	children list[Node]

# option c: type alias syntax
type Node
	dict
		key string "content"
		value string
		key string "position" 
		value Position
		key string "children"
		value list
			type Node
```

**impact:** affects how we represent AST nodes and compiler data structures

### 2. error handling philosophy
**question:** how should errors be handled at runtime?

**current status:**
- compilation errors handled by Python
- no runtime exception handling
- programs crash on errors

**options:**
```
# option a: exception-based
try
	parse_tree
		a invalid_source
catch error
	print
		concat
			string "parsing failed: "
			a error message

# option b: result type based
local result
	safe_parse_tree
		a invalid_source

if
	is_error
		a result
then
	print
		get_error_message
			a result
else
	process_tree
		get_ok_value
			a result

# option c: explicit error parameters
local error_out
	error_new
local tree
	parse_tree_with_error
		a invalid_source
		a error_out

if
	error_occurred
		a error_out
then
	print
		error_get_message
			a error_out
```

**impact:** affects how compiler handles invalid input and error recovery

### 3. memory management approach
**question:** should we have manual memory management for performance?

**current status:**
- relies on Deno's garbage collector
- no explicit memory control
- potential performance concerns for large programs

**considerations:**
- compiler processes many temporary objects
- AST nodes could be large and numerous
- string manipulation creates many temporaries
- GC pauses could affect compilation speed

**trade-offs:**
- manual management = more complexity, potential bugs
- automatic GC = simpler code, potential performance issues
- hybrid approach = complexity in critical paths only

### 4. module system details
**question:** how should imports and namespaces work?

**current status:**
- no module system at all
- all code in single file

**decisions needed:**
```
# relative vs absolute imports?
import
	string "./local_module.ind"    # relative
import  
	string "std/collections.ind"   # absolute

# namespace syntax?
import
	string "utils/strings.ind"
	as str_utils

a str_utils format_string
	string "hello {0}"
	list
		string "world"

# or direct imports?
import
	string "utils/strings.ind"
	exposing format_string

format_string
	string "hello {0}"
	list
		string "world"

# module initialization?
# how to handle module-level code?
# circular dependency detection?
```

**impact:** affects how we organize compiler code and standard library

### 5. macro system extensibility
**question:** how should users define new macros?

**current status:**
- macros hardcoded in Python
- no user-defined macros

**vision from philosophy doc:**
- "infinitely extensible macroprocessor"
- "language will eventually allow users to define their own syntax"

**open design questions:**
```
# how to define macros in the language?
define_macro
	name string "my_custom_loop"
	params
		list
			string "variable"
			string "collection"
	expansion
		fn
			param ctx
				type macro_context
			# ... macro implementation

# compile-time vs runtime macro expansion?
# macro hygiene and scoping?
# macro composition and dependencies?
# performance of user-defined macros?
```

**impact:** core to the language's extensibility goals

## technical implementation questions

### 6. ast representation efficiency
**question:** what's the most efficient way to represent syntax trees?

**current python approach:**
```python
@dataclass
class Node:
    content: str
    position: Position
    children: list['Node'] = field(default_factory=list)
```

**language alternatives:**
```
# option a: dictionary-based (simple)
dict
	key string "content"
	value string "if"
	key string "children"
	value list
		dict
			key string "content"
			value string "eq"
			# ...

# option b: tagged unions (type-safe)
type ASTNode
	variant If
		condition ASTNode
		then_block ASTNode
		else_block ASTNode
	variant While
		condition ASTNode
		body ASTNode
	variant Local
		name string
		value ASTNode

# option c: object-oriented (familiar)
class IfNode
	extends ASTNode
	field condition
		type ASTNode
	field then_block
		type ASTNode
```

**performance considerations:**
- memory usage for large ASTs
- traversal speed for compilation
- ease of pattern matching

### 7. type system implementation
**question:** how sophisticated should the type checker be?

**current status:**
- basic type checking with inference
- scope-aware type tracking
- limited but growing

**complexity spectrum:**
```
# simple: basic type checking
local x
	type int
	int 42

local y
	type string  
	a x  # error: type mismatch

# advanced: generics and polymorphism
fn map
	param list
		type list
			type T
	param fn
		type function
			param T
			return U
	return
		type list
			type U

# sophisticated: dependent types, contracts
fn safe_divide
	param numerator
		type int
	param denominator
		type int
		constraint
			not_eq
				a denominator
				int 0
	return
		type int
```

**questions:**
- how far should we go initially?
- what features are most important for compiler implementation?
- performance vs expressiveness trade-offs?

### 8. standard library scope
**question:** how much standard library should we implement?

**minimal approach:**
- file I/O, string manipulation, basic collections
- focus on compiler needs only
- ~20-30 built-in functions

**comprehensive approach:**
- full featured standard library
- networking, crypto, graphics utilities
- ~200+ built-in functions

**decisions needed:**
- what's needed for bootstrapping vs long-term goals?
- how to organize large standard library?
- performance implications of large stdlib?

### 9. compilation performance targets
**question:** what performance characteristics should we aim for?

**current python compiler:**
- 13 tests in ~1.5 seconds
- mostly I/O bound
- single-threaded

**target characteristics:**
```
# option a: equivalent performance
# - same compilation speed as python
# - focus on correctness over speed

# option b: faster compilation  
# - 2-5x faster than python
# - parallel compilation where possible
# - aggressive caching and optimization

# option c: incremental compilation
# - only recompile changed files
# - dependency tracking
# - watch mode for development
```

**constraints:**
- Deno startup overhead
- JavaScript execution speed
- file I/O performance

### 10. debugging and introspection
**question:** what debugging facilities should be built in?

**current python approach:**
- verbose logging with tags
- expandable mode for macro debugging
- error reporting with source locations

**language debugging needs:**
```
# compilation debugging
debug_log
	string "processing node: {0}"
	list
		a node content

# runtime debugging  
debug_assert
	eq
		a variable_type
		string "int"
	string "expected int type"

# macro debugging
debug_expand
	a macro_call
	# shows expansion steps

# performance debugging
debug_timing
	string "type_check_phase"
	fn
		type_check_all_nodes
			a nodes
```

**questions:**
- how much debugging overhead is acceptable?
- compile-time vs runtime debugging?
- integration with external debuggers?

## ecosystem and tooling questions

### 11. editor integration strategy
**question:** how should editor support work?

**current status:**
- basic syntax highlighting exists
- language server partially implemented
- no IDE integration

**integration levels:**
```
# basic: syntax highlighting
# - .ind file recognition
# - keyword highlighting
# - indentation support

# intermediate: language server
# - error checking as you type
# - auto-completion
# - go-to definition

# advanced: ide integration
# - debugging support  
# - refactoring tools
# - project management
```

**impact on compiler design:**
- need for incremental parsing?
- error recovery for partial files?
- performance for real-time checking?

### 12. package management approach
**question:** how should external dependencies work?

**current status:**
- no package system
- everything built-in or local

**future considerations:**
```
# option a: no package manager
# - keep everything local
# - copy/paste code reuse
# - minimal complexity

# option b: simple package manager
# - git-based dependencies
# - version pinning
# - basic conflict resolution

# option c: sophisticated package system
# - central repository
# - semantic versioning
# - dependency solving
```

**bootstrapping impact:**
- affects how we organize standard library
- determines external dependency strategy
- influences module system design

### 13. deployment and distribution
**question:** how should the bootstrapped compiler be distributed?

**options:**
```
# option a: source distribution
# - distribute .ind source files
# - user compiles locally
# - requires existing compiler

# option b: javascript distribution  
# - pre-compiled to .js
# - run with deno directly
# - no compilation needed

# option c: binary distribution
# - compiled to native binary
# - standalone executable
# - requires additional tooling
```

**considerations:**
- bootstrap dependency problem
- distribution size and complexity
- platform compatibility

## priority and timeline questions

### 14. development resource allocation
**question:** what's the priority order for missing features?

**critical path items:**
- file I/O (blocks all file operations)
- module system (enables code organization)
- error handling (required for robustness)

**nice-to-have items:**
- advanced type features
- performance optimization
- debugging facilities

**resource allocation:**
- how much time per feature?
- parallel vs sequential development?
- testing vs feature development balance?

### 15. success criteria definition
**question:** what defines "successful bootstrapping"?

**minimal success:**
- compiles all existing tests
- generates equivalent JavaScript
- comparable performance to Python version

**comprehensive success:**
- easier to extend than Python version
- better error messages and debugging
- foundation for future language development

**long-term success:**
- community adoption of language
- real-world applications built
- demonstrable advantages over alternatives

these questions need answers to guide the technical decisions throughout the bootstrapping process. some can be answered through experimentation and iteration, while others require upfront architectural choices.
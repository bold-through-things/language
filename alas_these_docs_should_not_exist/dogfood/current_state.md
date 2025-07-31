# current language state

## what works right now

based on analysis of the test suite and compiler source, here's what the language can do:

### basic language features
- **semantic indentation** - tab-based nesting like Python/YAML
- **variables and assignment** - local variables with scoping
- **data types** - int, string, bool, list, dict
- **control flow** - if/then/else, while loops, for loops  
- **functions** - user-defined functions with parameters
- **access chains** - method chaining like `.split().sort().join()`
- **string literals** - multiple delimiters (`"text"`, `$text$`, `!text!`, etc.)

### built-in functions
- `print` - output to console
- `prompt` - read user input  
- `stdin` - read all stdin
- `is_tty` - check if running interactively
- `concat` - string concatenation
- `eq`, `asc` - comparison operators
- `add`, `mod` - arithmetic operators  
- `either` - logical OR
- `none`, `values`, `keys`, `zip` - collection utilities

### macro system
- **extensible macro registry** - add new language constructs
- **preprocessing macros** - code transformation before compilation
- **type checking macros** - static type validation
- **code generation macros** - emit JavaScript output
- **built-in macros** - string, int, list, dict, access, local, etc.

### type system (work in progress)
- **type annotations** - `type int`, `type str`, etc.
- **type checking** - compile-time type validation
- **type inference** - infer types from usage context
- **scope-aware typing** - types tracked through variable scopes

### compilation pipeline
1. **tree parsing** - minimal indentation-based parser
2. **preprocessing** - macro expansion and code transformation  
3. **code block linking** - connect related code blocks
4. **type checking** - validate type consistency
5. **javascript emission** - generate runnable JS code

### development tools
- **comprehensive test suite** - 13 working examples
- **verbose logging** - detailed compilation process visibility
- **error reporting** - clear compilation error messages
- **expand mode** - emit intermediate expanded form for debugging

## example programs that work

### fizzbuzz
```
local fizz_divisor
local buzz_divisor  
local n

# ... input handling ...

local i
	int 0
while
	asc
		access i
		access n
do
	local out
		string ""
	
	if
		eq
			mod
				access i
				access fizz_divisor
			int 0
	then
		access out
			concat
				access out
				string "fizz"
	# ... rest of fizzbuzz logic
```

### csv parser
```
local lines
	stdin

access lines
	a lines split
		string "\n"

local header
	list
local rows
	list

for line in
	access lines
do
	if
		eq
			access i
			int 0
	then
		a header
			a line split
				string ","
	else
		# ... parse CSV rows into dictionaries
```

### anagram grouping
complex string manipulation and collection operations work

## compiler architecture

the current Python compiler has these major components:

### tree_parser.py (~100 lines)
- parses indented text into node trees
- minimal and elegant - just handles nesting
- uses Position tracking for error reporting

### macro_registry.py 
- manages all macro definitions
- provides macro lookup and registration
- handles macro context and processing

### processing pipeline
- **PreprocessingStep** - early macro expansion
- **CodeBlockLinkingStep** - connect related blocks  
- **TypeCheckingStep** - validate types
- **JavaScriptEmissionStep** - generate output

### key abstractions
- **Node** - represents parsed syntax elements
- **MacroContext** - provides compilation state to macros
- **Compiler** - orchestrates the entire compilation process

## what this tells us

the language is already quite capable. it can:
- express complex algorithms (anagram grouping)
- handle I/O and user interaction  
- manipulate data structures (lists, dicts, strings)
- define and call functions
- implement proper scoping and type checking

this is enough to build a compiler, but there are some key gaps that need addressing.
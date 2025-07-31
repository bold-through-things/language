# bootstrapping roadmap

## 18-week development plan

### phase 1: foundation (weeks 1-2)
- **file I/O operations** - read_file, write_file, list_files, path utilities
- **basic error handling** - try/catch macros mapping to JS try/catch  
- **testing:** simple file manipulation, error conditions

### phase 2: module system (weeks 3-4)  
- **import mechanism** - relative/absolute imports, namespace management
- **approach:** enforced alphabetical file ordering for compiler rewrite
- **testing:** multi-file programs, circular dependency detection

### phase 3: enhanced stdlib (weeks 5-6)
- **string processing** - regex, formatting, parsing utilities
- **json handling** - parse/stringify operations
- **approach:** leverage Deno APIs via WebIDL auto-generation

### phase 4: core data structures (weeks 7-8)
- **struct/class syntax** - user-defined types with fields
- **collections** - sets, ordered maps, tree structures  
- **approach:** struct-based syntax with multimethod dispatch

### phase 5: parser rewrite (weeks 9-10)
- **tree_parser.ind** - reimplement parsing logic in language
- **ast representation** - struct-based Node with content/position/children
- **testing:** parse identical trees to Python version

### phase 6: macro system (weeks 11-12)
- **macro_registry.ind** - macro registration and processing
- **approach:** purely declarative macros, all compiled
- **testing:** macro expansion produces identical output

### phase 7: type checker (weeks 13-14)
- **type_checker.ind** - static type validation system
- **features:** generics and unions for compiler robustness
- **focus:** correctness over performance, expressiveness priority

### phase 8: code generation (weeks 15-16)
- **js_emitter.ind** - JavaScript output generation
- **goal:** identical output to Python compiler
- **testing:** byte-for-byte comparison of generated JS

### phase 9: integration (weeks 17-18)
- **full compiler assembly** - complete self-hosted pipeline
- **validation:** all 13 existing tests pass with new compiler
- **distribution:** Deno binary compilation + JS fallback for Node

## success criteria
compiler fully rewritten in .ind with all existing tests passing - same performance as Python to JS migration should provide speed boost
- test circular dependency detection
- verify namespace isolation

### code organization
**goal:** restructure existing functionality into modules

**proposed structure:**
```
compiler/
  core/
    node.ind          # Node data structure
    position.ind      # Position tracking
    errors.ind        # Error handling
  parsing/
    tree_parser.ind   # Main parser logic
    tokenizer.ind     # String parsing utilities
  macros/
    registry.ind      # Macro registration
    builtins.ind      # Built-in macros
    typechecking.ind  # Type checking macros
  codegen/
    javascript.ind    # JS emission
    optimizer.ind     # Output optimization
  utils/
    strings.ind       # String utilities
    collections.ind   # Data structure helpers
    files.ind         # File system utilities
```

**validation criteria:**
- each module compiles independently
- full compiler still works when assembled
- clean separation of concerns

## phase 3: enhanced standard library (weeks 5-6)

### string manipulation improvements
**goal:** robust string processing for compiler needs

**features to add:**
```
# formatting
format_string
	string "error at line {0}: {1}"
	list
		int 42
		string "unexpected token"

# regex operations  
regex_match
	string `\d+`
	string "line 123 has errors"

regex_replace
	string `\s+`
	string "lots   of    spaces"
	string " "

# utilities
string_trim
	string "  whitespace  "

string_escape
	string "quotes\"and\nlines"
```

**implementation notes:**
- wrap JavaScript string methods
- provide regex syntax validation
- handle unicode properly
- efficient string building

### json and data serialization
**goal:** parse test definitions and metadata

**features to add:**
```
json_parse
	string `{"code": "*.ind", "case": "."}`

json_stringify
	dict
		key string "name"
		value string "test_basics"
		key string "result" 
		value string "pass"

# parsing utilities
parse_int
	string "42"

to_string
	int 123
```

**use cases:**
- read tests.json files
- generate compilation metadata
- serialize error information

### collections and data structures
**goal:** efficient data manipulation

**features to add:**
```
# sets for unique collections
set_new
set_add
	a my_set
	string "item"
set_contains
	a my_set
	string "item"

# ordered maps
ordered_map_new
ordered_map_set
	a my_map
	string "key"
	string "value"

# tree utilities
tree_walk
	a root_node
	fn visitor_function
```

**validation:**
- implement symbol table using new collections
- create AST manipulation using tree utilities
- performance test vs current Python implementation

## phase 4: process execution and testing (weeks 7-8)

### subprocess capabilities
**goal:** run external commands and tests

**features to add:**
```
exec_command
	string "deno"
	list
		string "run"
		string "out.js"

exec_with_input
	string "deno"
	list
		string "run"
		string "interactive.js"
	string "test input\n"

get_exit_code
	a process_result

get_stdout
	a process_result

get_stderr
	a process_result
```

**implementation notes:**
- wrap Deno's subprocess APIs
- handle stdout/stderr streaming
- support input pipes
- timeout handling

### test runner implementation
**goal:** reimplement test.py functionality

**components needed:**
- test discovery from tests.json
- compilation step execution  
- output comparison and validation
- error reporting and diff generation

**validation:**
- run existing test suite with new runner
- identical results to Python version
- same error messages and formatting

## phase 5: parser implementation (weeks 9-10)

### tree parser rewrite
**goal:** implement tree_parser.py in the language

**core algorithm:**
```
fn parse_tree
	param source_code
		type string
	
	local lines
		a source_code split
			string "\n"
	
	local root
		node_new
			string ""
			position_new
				int 0
				int 0
	
	local stack
		list
			a root
	
	for line in
		a lines
	do
		local indent_level
			count_leading_tabs
				a line
		
		local content
			string_trim
				a line
		
		# ... rest of parsing logic
```

**key challenges:**
- handle indentation correctly
- build proper node tree structure
- maintain position information for errors
- match exact behavior of Python version

**testing approach:**
- parse all existing test files
- compare resulting trees with Python parser
- verify error conditions work identically

### node data structure
**goal:** represent syntax trees efficiently

**implementation:**
```
local node_new
	fn
		param content
			type string
		param position
			type position
		
		dict
			key string "content"
			value a content
			key string "position"
			value a position
			key string "children"
			value list

fn node_add_child
	param parent
		type node
	param child
		type node
	
	a parent children push
		a child
```

**requirements:**
- immutable or controlled mutation
- efficient child access
- position tracking for errors
- support for metadata attachment

## phase 6: macro system rewrite (weeks 11-12)

### macro registry reimplementation
**goal:** move macro processing to the language

**registry structure:**
```
local macro_registry
	dict

fn register_macro
	param name
		type string
	param handler
		type function
	
	a macro_registry key
		substituting key
			a name
		a handler

fn lookup_macro
	param name
		type string
	
	a macro_registry key
		substituting key
			a name
```

**processing pipeline:**
```
fn process_pipeline
	param nodes
		type list
	
	local result
		a nodes
	
	# preprocessing step
	a result
		apply_preprocessing
			a result
	
	# type checking step  
	a result
		apply_typechecking
			a result
	
	# code generation step
	a result
		apply_codegen
			a result
	
	a result
```

**implementation challenges:**
- function-as-data representation
- context passing between macros
- error handling and propagation
- recursive macro expansion

### builtin macro migration
**goal:** reimplement core language constructs

**priority order:**
1. literal macros (string, int, list, dict)
2. control flow (if, while, for)
3. variable access (local, access, a/an)
4. function definition (fn)
5. type checking macros

**validation approach:**
- migrate one macro family at a time
- test each migration thoroughly
- maintain compatibility with existing tests

## phase 7: type checking system (weeks 13-14)

### type representation
**goal:** track and validate types during compilation

**type system design:**
```
# basic types
type_int
type_string  
type_bool
type_list
	a element_type

type_dict
	a key_type
	a value_type

type_function
	a param_types
	a return_type

# user-defined types
type_node
	field content
		type string
	field position
		type position
	field children
		type list
			type node
```

**type checking implementation:**
```
fn check_types
	param node
		type node
	param scope
		type scope
	
	local node_type
		infer_type
			a node
			a scope
	
	for child in
		a node children
	do
		check_types
			a child
			a scope
	
	validate_constraints
		a node
		a node_type
		a scope
```

### scope management
**goal:** track variable types and lifetimes

**scope implementation:**
```
local scope_new
	fn
		param parent
			type scope
			optional true
		
		dict
			key string "parent"
			value a parent
			key string "variables"
			value dict
			key string "types"
			value dict

fn scope_define
	param scope
		type scope
	param name
		type string
	param type
		type type
	
	a scope variables key
		substituting key
			a name
		a type
```

## phase 8: javascript generation (weeks 15-16)

### code emission rewrite
**goal:** generate JavaScript from processed AST

**emission framework:**
```
fn emit_javascript
	param nodes
		type list
	
	local output
		string_buffer_new
	
	for node in
		a nodes
	do
		local js_code
			emit_node
				a node
		
		string_buffer_append
			a output
			a js_code
	
	string_buffer_to_string
		a output
```

**node-specific emitters:**
```
fn emit_node
	param node
		type node
	
	local macro_name
		a node content
	
	if
		eq
			a macro_name
			string "local"
	then
		emit_local_declaration
			a node
	else if
		eq
			a macro_name
			string "if"
	then
		emit_if_statement
			a node
	# ... etc for all macro types
```

**validation requirements:**
- generate identical JavaScript to Python compiler
- handle all macro types correctly
- proper indentation and formatting
- optimization passes (optional)

## phase 9: integration and validation (weeks 17-18)

### full compiler assembly
**goal:** combine all components into working compiler

**main compiler structure:**
```
fn compile
	param input_dir
		type string
	param output_file
		type string
	
	local source_files
		discover_source_files
			a input_dir
	
	local parsed_trees
		list
	
	for file in
		a source_files
	do
		local source_code
			read_file
				a file
		
		local tree
			parse_tree
				a source_code
		
		a parsed_trees push
			a tree
	
	local processed
		process_pipeline
			a parsed_trees
	
	local javascript
		emit_javascript
			a processed
	
	write_file
		a output_file
		a javascript
```

### comprehensive testing
**goal:** ensure complete compatibility

**test categories:**
1. **unit tests** - each component individually
2. **integration tests** - full compilation pipeline  
3. **regression tests** - all existing examples
4. **performance tests** - compilation speed comparison
5. **error tests** - error handling and messages

**acceptance criteria:**
- all 13 existing tests pass
- identical or equivalent JavaScript output
- comparable compilation performance
- same error messages and locations
- handles all edge cases correctly

### deployment and migration
**goal:** replace Python compiler with bootstrapped version

**migration strategy:**
1. parallel testing - both compilers on all tests
2. performance validation - ensure no regressions
3. gradual rollout - use new compiler for subset of tests
4. full cutover - retire Python implementation
5. cleanup - remove Python dependencies

## timeline and milestones

### weekly milestones
- **week 2:** basic file I/O working
- **week 4:** module system functional
- **week 6:** enhanced standard library complete
- **week 8:** test runner reimplemented
- **week 10:** parser fully migrated
- **week 12:** macro system operational
- **week 14:** type checking functional
- **week 16:** javascript generation complete
- **week 18:** full integration and validation

### risk mitigation
- maintain Python compiler throughout process
- continuous testing against existing suite
- incremental validation at each phase
- rollback plan if major issues discovered

### success metrics
- **functionality:** all tests pass with new compiler
- **performance:** within 2x of Python compiler speed  
- **maintainability:** easier to extend and modify
- **robustness:** better error handling and debugging

this roadmap provides a clear path from the current capable-but-limited language to a fully self-hosted development environment suitable for serious compiler work.
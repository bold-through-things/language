# gaps analysis

## what's missing for self-hosting

to rewrite the Python compiler in the language itself, we need to bridge several gaps between current capabilities and compiler requirements.

## critical missing features

### 1. file system operations
**what we need:**
- read/write files
- list directory contents  
- check file existence
- get file metadata (size, modified time)
- path manipulation (join, dirname, basename, extension)

**current status:**
- can only read from stdin
- no file I/O at all
- no path utilities

**impact:**
- can't read .ind source files
- can't write compiled .js output
- can't traverse test directories
- can't load test definitions

### 2. module system and imports
**what we need:**
- import code from other files
- module resolution (relative/absolute paths)
- circular dependency detection
- namespace management

**current status:**
- no import/include mechanism
- all code must be in single file
- no code reuse between programs

**impact:**
- can't split compiler into logical modules
- can't share utilities between components
- makes large programs unmaintainable

### 3. better string manipulation
**what we need:**
- regex support (currently exists but limited)
- string formatting/templating
- advanced parsing utilities
- escape sequence handling

**current status:**
- basic split/concat only
- regex macro exists but not fully featured
- no printf-style formatting
- limited string literal escaping

**impact:**
- can't parse complex file formats
- difficult to generate clean JavaScript
- hard to implement robust error messages

### 4. process execution
**what we need:**
- run external commands (like invoking deno)
- capture stdout/stderr
- set environment variables
- handle exit codes

**current status:**
- no subprocess capability
- can't shell out to other tools

**impact:**
- can't run compiled JavaScript
- can't invoke external test runners
- limited to pure computation

### 5. error handling
**what we need:**
- try/catch mechanisms
- proper exception propagation
- error type definitions
- graceful failure handling

**current status:**
- compilation errors are handled by Python
- no runtime exception handling
- errors crash the program

**impact:**
- compiler would crash on invalid input
- can't provide good error recovery
- hard to debug compilation issues

### 6. advanced data structures
**what we need:**
- sets for unique collections
- ordered maps/dictionaries
- priority queues
- tree structures for AST manipulation

**current status:**
- basic list and dict only
- no specialized collections
- no efficient lookups

**impact:**
- inefficient symbol table management
- can't properly represent ASTs
- limited algorithm implementations

### 7. metaprogramming capabilities
**what we need:**
- reflection on syntax trees
- code generation utilities
- macro definition at runtime
- ast transformation tools

**current status:**
- macros are defined in Python
- no runtime introspection
- limited code generation

**impact:**
- can't implement macro system in the language
- hard to build compiler introspection
- limits language extensibility

## standard library gaps

### file operations
```
# needed operations:
read_file(path)
write_file(path, content)
file_exists(path)
list_dir(path)
mkdir(path)
path_join(parts...)
path_dirname(path)
path_basename(path)
path_extension(path)
```

### string utilities
```
# needed operations:
format_string(template, args...)
regex_match(pattern, text)
regex_replace(pattern, text, replacement)
string_escape(text)
string_unescape(text)
trim(text)
pad_left(text, length, char)
pad_right(text, length, char)
```

### json/data handling
```
# needed operations:
json_parse(text)
json_stringify(object)
parse_int(text)
parse_float(text)
to_string(value)
```

### process/system utilities
```
# needed operations:
exec_command(cmd, args...)
get_env(name)
set_env(name, value)
get_working_dir()
set_working_dir(path)
exit_program(code)
```

## compiler-specific needs

### 1. syntax tree representation
**python currently uses:**
```python
@dataclass
class Node:
    content: str
    position: Position
    children: list['Node'] = field(default_factory=list)
```

**need in the language:**
- class/struct definitions with fields
- recursive data types
- pattern matching on structures
- tree traversal utilities

### 2. symbol table management
**python currently uses:**
- nested dictionaries for scopes
- type metadata tracking
- variable lifetime analysis

**need in the language:**
- efficient map implementations
- scope stack management
- reference counting or gc integration

### 3. macro processing pipeline
**python currently has:**
- registry pattern with function pointers
- multi-pass compilation
- context passing between steps

**need in the language:**
- first-class functions
- higher-order functions
- function composition
- state management

## performance considerations

### compilation speed
**current python compiler:**
- processes 13 tests in ~1.5 seconds
- largely I/O bound (file reading)
- macro processing is computational

**bootstrapped compiler needs:**
- comparable or better performance
- efficient string operations
- fast file I/O
- optimized data structures

### memory usage
**current python compiler:**
- benefits from python's gc
- allocates many temporary objects
- AST nodes can be large

**bootstrapped compiler needs:**
- efficient memory management
- minimal allocation overhead
- possible manual memory control

## testing and validation

### compatibility requirements
- must pass all existing tests
- identical or equivalent js output
- same error messages and locations
- same compilation performance

### new testing needs
- compiler tests for each component
- integration tests for full pipeline
- performance regression tests
- memory usage validation

## priority ranking

### critical (blocks bootstrap):
1. file system operations
2. module/import system
3. process execution
4. basic error handling

### important (needed for robustness):
1. better string manipulation
2. advanced data structures
3. json parsing
4. performance optimization

### nice to have (can come later):
1. metaprogramming facilities
2. advanced error recovery
3. sophisticated debugging tools
4. extensive standard library

## development strategy

given these gaps, the most practical approach is incremental development:

1. **foundation phase** - add file I/O, modules, basic utilities
2. **compiler skeleton** - implement minimal parser and pipeline
3. **feature parity** - add all missing language features
4. **optimization** - performance and robustness improvements
5. **validation** - comprehensive testing and verification

this allows continuous validation against existing tests while building toward full self-hosting capability.
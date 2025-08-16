# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Testing
- `./test` - Run all tests (compile and run). This is the main development command.
- `./test --help` - Show all available test options
- `./test --glob <pattern>` - Run tests matching pattern (e.g., `--glob anagra` or `--glob order*main`)
- `./test --compile` - Only check compilation, skip runtime
- `./test --run` - Skip compilation, only run existing output
- `./test --debug` - Run with debugger attached
- `./test --expand` - Test two-step compilation (WIP, expected to fail)

### Compiler Usage
- `python3 compiler/src/main.py <input_dir> <output_file>` - Basic compilation
- Add `--log <tags>` for verbose output (e.g., `--log registry,typecheck,macro`)
- Add `--errors-file <file>` to output compilation errors as JSON

## Language Architecture

### Core Components
- **Tree Parser** (`compiler/src/tree_parser.py`) - Under 100 lines, parses .67lang files into CST
- **Macrocosm** (`compiler/src/macrocosm.py`) - Main compilation engine and macro registry
- **Node System** (`compiler/src/node.py`) - AST node representation with metadata support
- **Macro Registry** (`compiler/src/macro_registry.py`) - Three-phase processing (preprocess, typecheck, emission)

### Compilation Pipeline
1. **Parsing** - .67lang files → Concrete Syntax Tree (CST)
2. **Registration** - Nodes registered with macrocosm for processing
3. **Three-Phase Processing**:
   - Preprocessing macros (syntax transformation)
   - Typecheck macros (static analysis)
   - Emission macros (JavaScript code generation)

### Macro System
- **Built-in Macros** in `compiler/src/macros/` directory
- **Emission Target** - Clean JavaScript for Deno and browsers (not Node.js)
- **Type System** - Static typing with compile-time verification
- **Call Conventions** - Structured approach to JS emission (`FieldCall`, `DirectCall`, etc.)

### Language Features
- Semantic indentation (whitespace-sensitive)
- Flexible identifiers (anything non-whitespace can be an identifier)
- Macro-based syntax (everything is a macro call)
- Static typing with runtime JavaScript output
- Monadic field access chains (`access` macro)
- N-ary operations (not limited to binary)

### Test Structure
- Tests auto-discovered via `tests.json` files
- Cartesian product of code files and test cases
- Tests are the language specification - no separate docs
- Expected outputs in `.expected` files, actual outputs compared via diffs

## Development Guidelines

### Code Quality Standards
- **No warnings allowed** - only errors (recoverable vs non-recoverable)
- **Defensive programming** - crash loud and fast on internal errors
- **No code duplication** - extract to reusable functions
- **Executable assertions** over comments/documentation
- **Production-quality code** - "would this pass FAANG review?"

### Testing Protocol
- Always run `./test` after changes to verify nothing breaks
- Use `./test --glob <pattern>` for specific tests (e.g., `--glob partial_test_na`)
- Use `./test -- --log debug` for detailed logging output
- Fix broken tests immediately or revert changes
- Add new tests for new functionality
- Tests must pass before any commits

### Development Workflow
- **Prioritize small incremental changes** - make one change, run `./test`, commit if successful
- **Step back if looping** - if stuck repeatedly failing on the same fix, ask for guidance
- **Methodical debugging over guessing** - analyze step-by-step rather than assuming solutions
- **Clarify fixes before applying** - discuss approach to avoid overcomplicated solutions
- **Be explicit about ideas** - verbalize your thinking process and proposed solutions

### File Conventions
- No backwards compatibility yet - break things and update tests
- Avoid bash scripts, prefer Python for complex scripting
- Minimize dependencies (supply chain security)
- Keep documentation in executable tests, not separate files
- **Avoid meaningless comments** - no comments that just restate the code

### Type Checking
- Run type checker in strict mode
- No red highlights in Pylance allowed
- All code must be properly typed

### Debugging
- Use `--log` flags for verbose compilation output
- Test diffs stored in `test_diffs/` directories (git-ignored)
- Compiler errors output as JSON when `--errors-file` specified
- **Use `implementation_details.md`** to document system insights and hidden assumptions
- **Check `example_for_llms` test** for 67lang syntax examples with JS correlations

## Important Notes
- This is a macro-focused language where syntax is defined by macros
- The parser is intentionally minimal to enable external tool integration
- JavaScript emission targets modern Deno runtime and browsers
- Static typing system catches errors at compile time
- Language tutorial/examples in `tests/language_documentation/main.67lang`
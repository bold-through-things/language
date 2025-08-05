# Compiler Rewrite Plan

This document outlines the experimental plan to rewrite the 67lang compiler from scratch to test reasoning capabilities and potentially achieve a cleaner implementation.

## The Plan

**Do not proceed to the next step unless specifically asked to. Report progress in detail.**

### Step 1: Expand the autotests for future reference

Infer all the currently valid semantics. The autotests we have are great, but very powerful. There are no basics to rebuild things step by step from. As such, infer the basics. Go through all tests we have right now, and add new tests, which are far simpler. Ideally create a `steps_to_heaven` folder in the `tests` and call each test like `1_basic_types` and `2_locals` and all such.

Think the best way one would prefer to build such a compiler all from scratch. Try to keep all these steps sufficiently short and simple, so that we can actually ascend the ladder afterwards.

**And obviously ensure these tests currently pass with the existing implementation! No point in them otherwise...**

### Step 2: Preserve the parser and the CLI

Preserving the CLI means simply not obliterating `main.py`. Do not erase this file.

Preserving the existing parser is valuable because it is the only bit of very clean and trivial code that is quite happy with. Create an autotest, probably just a unit one, which could be used to ensure the entire parser works. Probably just a file read via the parser and then assert the nodes it outputs, maybe via JSON. It really is quite simple and quite trivial, but still, preserve it.

### Step 3: Drop the nuke

Start nuking the compiler. The tests will fail and that is fine. The only test we wish to run each time to thus ensure the parser does survive is, yes, the autotest for parsing which we made in step 2. And obviously, do not nuke `main.py`.

### Step 4: Ascend the ladder

Begin rewriting the compiler all from scratch. You have the tests as spec, you have the perfectly parsed tree, show me how far you get.

## Current Implementation Analysis

The existing compiler has these major components:
- `tree_parser.py` - Clean, simple parser (to be preserved)
- `main.py` - CLI interface (to be preserved)  
- `macrocosm.py` - Main compiler orchestration
- Various macro modules in `compiler/src/macros/`
- Complex interdependencies and macro expansion

## Test Hierarchy Design

The new tests will follow this hierarchy:
1. `1_basic_types` - Numbers, strings, booleans, print statements
2. `2_locals` - Variable assignment and access
3. `3_arithmetic` - Basic math operations (+, -, *, /)
4. `4_conditionals` - If/then statements
5. `5_loops` - For loops with do blocks  
6. `6_data_structures` - Lists and dictionaries
7. `7_string_operations` - Split, join, string methods
8. `8_advanced_features` - Complex combinations and edge cases

Each test will be minimal and focused on a single concept, making it easy to implement incrementally.
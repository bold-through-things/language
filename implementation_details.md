# 67lang Compiler: Implementation Details and Insights

This document summarizes key insights and implementation details of the 67lang compiler, gathered through an interactive code review.

## 1. Overall Architecture and Design Philosophy

*   **"Every Node a Macro":** The fundamental design principle of 67lang is that every construct, from variable declarations to control flow, is treated as a macro. The compiler acts as a "glorified macro expansion engine" that transforms these macros into JavaScript.
*   **Concrete Syntax Tree (CST):** 67lang source code is interpreted directly as a Concrete Syntax Tree. Indentation is not merely stylistic but is crucial for defining the tree structure, where child nodes are assigned to their proper parents based on their indentation level. This explains the strict enforcement of tabs for indentation.
*   **Strictness and Opinionated Choices:** The language is designed to be "very strict and quite particular," with strong opinions on formatting (e.g., tabs only for indentation).
*   **Target Environments:** The primary compilation targets for 67lang are Deno and web browsers. Node.js is explicitly not a target.
*   **Test Suite as "True Spec":** The test suite is considered the definitive specification for the language's behavior and features.

## 2. Core Components

*   **`Node` (compiler/src/node.py):**
    *   The fundamental building block of the Abstract Syntax Tree (AST).
    *   Each `Node` contains `content` (the macro name and arguments), `pos` (line/character position), and references to its `parent` and `children`.
    *   Provides methods for tree manipulation (`replace_child`, `append_child`, `prepend_child`).
    *   Includes a `_notify_tree_change` hook for metadata invalidation (currently a `TODO`).
*   **`Macrocosm` (compiler/src/macrocosm.py):**
    *   The central orchestrator of the compilation process.
    *   Manages the list of root `Node`s (parsed ASTs).
    *   Houses the `processing_steps` pipeline.
    *   Manages the `_node_metadata` system.
    *   Collects `compile_errors`.
    *   Generates unique identifiers using `incremental_id`.
*   **`MacroRegistry` (compiler/src/macro_registry.py):**
    *   A mechanism for registering macro handlers for different compilation phases (e.g., `preprocess`, `typecheck`, `emission`, `code_linking`).
    *   Allows for modular definition and dispatch of macro-specific behavior.

## 3. Key Mechanisms and Features

*   **Macros:**
    *   Defined in dedicated classes (e.g., `While_macro_provider`, `Number_macro_provider`).
    *   Their behavior for different compilation phases (preprocess, typecheck, emission, code_linking) is registered with the respective `MacroRegistry` instances.
    *   If a macro doesn't have a specific handler for a step, processing is typically deferred to its children.
*   **Metadata System (`_node_metadata`):**
    *   A dictionary-based system within `Macrocosm` that maps `id(node)` to another dictionary of `metadata_type` to `value`.
    *   Replaced the older `TypeMap` system.
    *   Used to attach and retrieve various pieces of information (e.g., `Macro`, `Args`, `SaneIdentifier`, `FieldDemandType`, `ResolvedConvention`) to AST nodes.
    *   `get_metadata` currently recomputes `Macro` and `Args` metadata on each access due to an undebugged bug, prioritizing functionality over efficiency.
*   **Call Conventions:**
    *   A structured approach to generating JavaScript for different types of calls (e.g., `FieldCall`, `PrototypeCall`, `DirectCall`, `LocalAccessCall`, `NaryOperatorCall`, `ChainedComparisonCall`, `NewCall`, `IndexAccessCall`).
    *   Each call convention dataclass has a `compile` method to emit the corresponding JavaScript.
    *   `builtin_calls` dictionary in `processor_base.py` maps macro names to lists of these call convention objects.
*   **`a` (access) macro:**
    *   A polymorphic macro used for function calls, method calls, and variable/property access.
    *   Leverages the "call convention" framework to intelligently generate the appropriate JavaScript based on context.
    *   Arguments can be provided as direct child nodes or via the `where $step takes` syntax (the latter is slated for removal).
*   **`#` macro:**
    *   Used for both index access (reading values from arrays/objects) and dictionary key assignment (writing values).
    *   Emits proper JavaScript indexing (`obj[index]`).
*   **`must_compile_error`:**
    *   A unique language feature that allows users to explicitly assert that certain code *should not* compile.
    *   Used for testing and documenting expected compilation failures.
    *   Processed by `MustCompileErrorVerificationStep`, which must be the last step in the pipeline to catch all errors.
*   **`incremental_id`:**
    *   Used solely for generating unique identifiers in the compiled JavaScript output (e.g., `_0x1_phrases`).
    *   Does *not* imply any existing incremental compilation support. The concern is about non-deterministic IDs leading to large diffs.
*   **Runtime Library (`stdlib/lib.js`):**
    *   A minimal set of custom JavaScript functions exposed under a global `_67lang` object.
    *   Includes utilities like `exists_inside`, `zip`, and a custom `scope` function (though `_67lang.scope` is now considered dead code).
    *   Contains Deno-specific I/O implementations (`prompt`, `stdin`, `is_tty`).

## 4. Compilation Pipeline (`MacroProcessingStep`s)

The `Macrocosm` executes a series of `MacroProcessingStep`s in a defined order:

1.  **`CodeBlockLinkingStep` (compiler/src/code_block_linking.py):**
    *   Restructures the AST to correctly associate control flow statements (`if`, `while`, `for`, `fn`) with their corresponding code blocks (`then`, `do`).
    *   Processes children first, then the current node (though this order might be a remnant).
2.  **`PreprocessingStep` (compiler/src/preprocessing_macros.py):**
    *   Handles initial transformations, including "access macro unrolling" (though the `access` macro itself is slated for removal).
    *   Enforces strict indentation rules (tabs only).
3.  **`TypeCheckingStep` (compiler/src/typecheck_macros.py):**
    *   Performs type checking based on registered typecheck handlers for macros.
    *   Recursively processes children if no specific handler is found.
    *   Reports type errors via `compile_error`.
4.  **`JavaScriptEmissionStep` (compiler/src/literal_macros.py):**
    *   Generates the final JavaScript output.
    *   Uses a "cursed Python" context manager pattern to wrap the entire output in an `async` IIFE for browser compatibility.
    *   Dispatches to JavaScript emission handlers registered for each macro.
5.  **`MustCompileErrorVerificationStep` (compiler/src/steps/must_compile_error_step.py):**
    *   A test-specific step that verifies if expected compilation errors (defined by `must_compile_error` macros) actually occurred.
    *   Must be the last step in the pipeline to catch all errors.

## 5. Development Practices and Peculiarities

*   **Aggressive Code Cleanup:** The review process itself led to the identification and removal of several pieces of dead or obsolete code, including:
    *   `compiler/src/processor.py`
    *   `Runtime_scope` and `Scope` classes from `node.py`
    *   `Target` class from `node.py`
    *   `recover_string` function from `node.py`
    *   `_67lang.scope` function from `stdlib/lib.js`
    *   Various unused `TODO` comments.
*   **Pragmatism over Perfection:** Developers prioritize "making it work" and delivering a functional language, even if it means temporarily accepting less efficient or "messy" code (e.g., `get_metadata` bug, `walk_upwards_for_local_definition`).
*   **Humorous/Philosophical Comments:** The codebase contains informal, humorous, or philosophical comments (e.g., "its_just_macros", "cursed Python", "refactor confidently when the flame flickers.").
*   **Ongoing Refactoring:** The language is actively evolving, with plans for:
    *   Removal of the `access` macro in favor of a "better way" for pipelines.
    *   Relocation of `Literal_macro_provider` for better organization.
    *   Redesign of `exists_inside` into `contains` and `is_inside` functions.
    *   Support for more modern JavaScript features (e.g., classes are next).
*   **Explicitly Unsupported JS Features:** The `example_for_llms/main.67lang` file explicitly lists many modern JavaScript features that are not yet supported, providing a clear roadmap for future development.

This summary provides a comprehensive overview of the 67lang compiler's current state, design, and ongoing evolution.
# Implementation Details

## `Access_macro_provider`

The `Access_macro_provider` is responsible for handling the `a`, `an`, and `access` macros. These macros are used for accessing local variables, object fields, and calling methods.

### Chained Calls

The `Access_macro_provider` is supposed to handle chained calls, such as `a my_list get 0 trim`. This should be translated into `trim(get(my_list, 0))`.

### Fixed Problem

The previous implementation of the `Access_macro_provider` in `compiler/src/macros/access_macros.py` did not correctly handle chained calls with arguments. It was incorrectly identifying some method calls as field accesses, which led to incorrect overload resolution.

After a lengthy debugging session, the root cause was identified as a missing `typecheck` provider for the `67lang:access_field` macro. This caused a chain reaction of type errors that ultimately led to the `NO_MATCHING_OVERLOAD` error.

The user has fixed this issue.

## Type System

The compiler has a type system that is used to check the types of variables and function calls. The type system is implemented in `compiler/src/macros/call_macro.py` and `compiler/src/type_hierarchy.py`.

### Type Hierarchy

The type system understands inheritance. The inheritance relationships are extracted from the WebIDL JSON files by `compiler/src/webidl_importer.py` and stored in the `type_hierarchy` dictionary in `compiler/src/type_hierarchy.py`.

### Union Types

The type system also understands union types. The union type definitions are extracted from the WebIDL JSON files by `compiler/src/webidl_importer.py` and stored in the `union_types` dictionary in `compiler/src/type_hierarchy.py`.

### Type Checking

The `Call_macro_provider` in `compiler/src/macros/call_macro.py` uses the type hierarchy and union type information to correctly resolve overloaded methods. The `_matches_signature` method checks if the actual types of the arguments match the demanded types of the method signature, taking into account the type hierarchy and union types.

### `local` and `67lang:auto_type`

The `local` macro does not infer types by default. To enable type inference for a local variable, you need to add the `67lang:auto_type` macro.

# Implementation Details

## `Access_macro_provider`

The `Access_macro_provider` is responsible for handling the `a`, `an`, and `access` macros. These macros are used for accessing local variables, object fields, and calling methods.

### Chained Calls

The `Access_macro_provider` is supposed to handle chained calls, such as `a my_list get 0 trim`. This should be translated into `trim(get(my_list, 0))`.

### Current Problem

The current implementation of the `Access_macro_provider` in `compiler/src/macros/access_macros.py` does not correctly handle chained calls with arguments. It splits the access chain by spaces and processes it as a flat list of steps. This leads to incorrect argument handling for method calls in a chain.

For example, `a my_string split " " 2` is incorrectly parsed.

This is a complex problem that requires a significant refactoring of the `Access_macro_provider`.

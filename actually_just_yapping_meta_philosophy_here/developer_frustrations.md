# annoyed!

use this doc freely. append to it, outline the unpleasant things, we'll fix them afterwards. the first step to fixing the issues is identifying them.

## issue #28 - documentation rewrite experience (2024-12)

### frustration: `must_compile_error` line number fragility (FIXED)
the `must_compile_error` testing mechanism requires exact line numbers, which becomes incredibly fragile during documentation rewrites. spent significant time debugging why error tests were failing, only to discover that line numbers had shifted due to narrative changes.

**FIXED**: implemented relative line number syntax `must_compile_error ERROR_TYPE=+offset` that calculates line numbers relative to the `must_compile_error` line itself. also improved error messages to show nearby errors when expected errors aren't found, making debugging much easier.

### frustration: unusual identifier feature discovery (FIXED)
while rewriting documentation, discovered that 67lang supports unusual identifiers (like `...` or `0.00$_for_67.8%`) that get converted to valid JavaScript. however, the JavaScript output has runtime issues. this feature seems undocumented and partially broken.

**FIXED**: enhanced the `to_valid_js_ident` function with a comprehensive character mapping system that converts special characters to readable names (e.g., `$` becomes `_dollar_`, `.` becomes `_dot_`). unusual identifiers now generate clean, readable JavaScript code.

### positive: test framework is excellent
the autotest approach where documentation IS the specification is brilliant. it catches regressions immediately and ensures documentation stays accurate. this made the rewrite much more confident - any mistake would immediately fail the test.

### positive: minimal syntax aids comprehension
67lang's minimal syntax made it easy to understand all features by examining test files. the simplicity actually accelerated the documentation process once the technical hurdles were overcome.

### positive: documentation freedom approach works
treating the language_documentation test as "documentation that is asserted" rather than "an autotest that explains things" was liberating. removing the constraint of matching exact expected output allowed for much more creative and engaging tutorial writing. the final result is both educational and comprehensive.

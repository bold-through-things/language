# annoyed!

use this doc freely. append to it, outline the unpleasant things, we'll fix them afterwards. the first step to fixing the issues is identifying them.

## issue #28 - documentation rewrite experience (2024-12)

### frustration: `must_compile_error` line number fragility
the `must_compile_error` testing mechanism requires exact line numbers, which becomes incredibly fragile during documentation rewrites. spent significant time debugging why error tests were failing, only to discover that line numbers had shifted due to narrative changes.

**suggestion**: could the error testing mechanism use content-based matching instead of line numbers? or at least provide better error messages that show expected vs actual line numbers?

### frustration: unusual identifier feature discovery
while rewriting documentation, discovered that 67lang supports unusual identifiers (like `...` or `0.00$_for_67.8%`) that get converted to valid JavaScript. however, the JavaScript output has runtime issues. this feature seems undocumented and partially broken.

**suggestion**: either fully implement and document this feature, or remove it entirely. having partially-working hidden features creates confusion during documentation efforts.

### positive: test framework is excellent
the autotest approach where documentation IS the specification is brilliant. it catches regressions immediately and ensures documentation stays accurate. this made the rewrite much more confident - any mistake would immediately fail the test.

### positive: minimal syntax aids comprehension
67lang's minimal syntax made it easy to understand all features by examining test files. the simplicity actually accelerated the documentation process once the technical hurdles were overcome.

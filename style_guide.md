# coding style guide

this style guide is inferred from feedback on code quality issues. following these patterns will help maintain consistent, readable code across the compiler.

## comments and documentation

- **avoid redundant comments** that duplicate what the code already says clearly. if the function name and code make the intent obvious, don't add a comment that restates it.
  - bad: `# Use utility function to collect child expressions` followed by `args = collect_child_expressions(ctx)`
  - good: just `args = collect_child_expressions(ctx)`

- **keep comments lowercase and casual** in tone when they are necessary

## logging and debugging

- **prefer simplicity over premature optimization** in logging code. don't add conditional checks to avoid evaluating expressions for performance reasons.
  - bad: `if default_logger.is_tag_enabled("debug"): default_logger.debug(f"message {expensive_call()}")`
  - good: `default_logger.debug(f"message {expensive_call()}")` (let the logger handle it)

- **log meaningful information for debugging**, not metadata like counts
  - bad: `f"checking {len(children)} children for code block associations"`
  - good: `f"checking node '{node.content}' for code block associations"`

## error handling

- **no warnings, only errors**. there are only errors we can recover from and crashes we cannot recover from.
  - bad: `default_logger.typecheck("warning: collect_child_types called outside TypeCheckingStep")`
  - good: `assert isinstance(ctx.current_step, TypeCheckingStep), "collect_child_types called outside TypeCheckingStep"`

## code duplication

- **eliminate repetitive patterns aggressively**. if you're copy-pasting code, extract it into a utility function.
  - bad: multiple conditional branches that do nearly identical work
  - good: extract the common logic, keep differences minimal

- **don't join single-item lists**. if you know a list has exactly one item, just access it directly.
  - bad: `"_".join([obj])`
  - good: `obj`

## function parameters

- **remove unused parameters** if all call sites use the same value. don't keep a parameter "just in case" if it's never varied.
  - if `filter_empty=True` is always used, remove the parameter entirely

## general principles

- **make minimal changes** to achieve the goal. surgical precision over broad refactoring.
- **crash hard, crash loud** when assumptions are violated. use assertions for internal consistency checks.
- **prefer explicit over implicit** - if something is always true, make it a requirement rather than a default.

## testing

- **always add tests for error conditions**. if you make something an error instead of a warning, add a test that verifies the error is properly caught and reported.
a rough roadmap the way things stand.

- clean up the mess of definitions for the types
- remove the `if` instead use `match` and `when`
  - keep something like `ternary` though
- remove the overload for `do` instead begin pipelines with `pipe` or some
- should drop the `for` instead approach the iteration through pipelines
- rewrite the guide in interactive edit mode (a single large example which we focus into every step)
- reorganize the tests
- use tags for tests
- type checking must be done within a single step
- emit TypeScript to help debugging speed
- remove the `scope(...)` since it's redundant for a while
- eliminate `exists` `inside`
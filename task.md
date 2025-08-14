# current hoisting approach is total garbage!

hoisting of functions and classes that would be.

oh yeah, our so called "classes" are actually handled via `type`.

1. indeed the functions are stupid themselves.

they are being handled by `walk_upwards...` now, but why..? what does that actually accomplish? that's correct, exactly nothing. **we should remove `fn` from our upwalker.** they should instead be tracked via "dynamic call conventions" recently introduced for classes.

2. two step type checking now unavoidable.

we need to split that step into now two. first would then register them, and second would type check internals. see `order_of_dependencies` for a dumb case where this does matter. because that `visit` actually "depends" on `DAG_unroller`, and due to the way hoisting works, it actually does matter that they appear through *reverse order*, which is the most insane thing ever. no, order shouldn't matter. a fix is trivial. scan everything to register, then scan again to do type checking.

3. just clean up code around here.

there is a lot of garbage that we left behind. the useless comments (i hate those!), some debug logging, and generally badly written code. improvements very welcome. build quality software.

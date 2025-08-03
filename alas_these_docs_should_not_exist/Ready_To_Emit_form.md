# the `.ind.expanded` files.

the Ready To Emit mode, RTE, is the final tree representation before the emission step is triggered in the processor. it is our goal eventually to ensure this RTE is fully self contained. what that would mean is you could do:

```bash
./main.py --expand src solution.ind.expanded # generate RTE
./main.py --rte solution.ind.expanded out.js # actually compile RTE to JS
```

there are obvious values this offers:
- **it simplifies the debugging efforts**, as the RTE becomes the absolute truth of what the compiler knows moments before it actually emits JS. a lot of past debugging efforts were undermined by ephemeral metadata that was impossible to access from outside, and this approach here asserts we won't run into that issue again ever.
- **it becomes the de facto IR of interop**, if somehow in the future the infinitely powerful declarative macros are still not powerful enough for you. the RTE is inherently quite simple, intentionally, to make the type checker simple as well. it reads almost like an Assembler, but still with just a tiny pinch of structure and sanity. external tools could then read and inspect this form.

**how to finally burn this book:** we already have `./test --expand` half-ready for testing the RTE recompilation, but this does not yet pass. making it pass would thus assert this here idea.

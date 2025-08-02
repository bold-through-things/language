# summary

67.8% Language. `67lang`.

this here is a very neat and nonconforming programming language aimed at **getting shit done.** 

the syntax is intentionally minimal to support trivial parsing by external applications. the official `tree_parser.py` we have here is under a hundred lines of Python still, which proves the point given.

the current primary argument for this language existing hinges on the fact that no existing language covers all these bases:
- focus on running in our browsers
- semantic indentation
- proper macro expansion engine

## tech

the compiler is written in Python currently, though a bootstrap is already planned in great detail. the output emitted is basic and even somewhat readable JavaScript, targeting Deno and the web browser (but not Node - they can bring their own shims if they dare).

## style

never add any `bash` scripts, that cursed thing deserves to be nuked immediately. leverage Python instead whenever possible. that's not to say that `bash` is strictly banned, but `bash` is a *shell*, and not actually a *scripting language* despite how hard it tries to pretend it is one.

keep dependencies to a minimum. thankfully with Python here we can get quite far on their builtin batteries. dependencies are to be considered SCAV (Supply Chain Attack Vectors) and we should keep the surface area minimal. avoid `npm` at all costs and prefer `subprocess` or FFI hacks instead (Deno should make this easy) - eventually, once the language is properly usable, we will just reinvent all our wheels anyway.

remember to run the test suite to validate your changes: `./test.py`. it's a compiler - nothing, except tests, actually mattters. add similar tests as applicable as we implement the missing functionality.

the compiler shall emit no warnings. there are only errors that we can and those we cannot recover from. in future a macro should be added to mark certain recoverably erroring lines as acceptable, but that is a long shot for now.

assertions must always be described as demands. bad:

```
self.assertTrue(output_file.exists(), "Output file was not created")
```

good:

```
self.assertTrue(output_file.exists(), "must create an output file")
```

everything that fails because of user supplied `67lang` code being garbage should use the compile error reporting framework. everything that fails because of our own internal assumptions about how the compiler works being violated (thus our own code being garbage) should crash incredibly loud via uncaught `Exception`.

defensive programming! you wrote `if "=" in pair`, great! but what `if not "=" in pair`? things are rarely optional around here. crash loud, crash hard, crash fast, scream harsh. despite the fact that it is all built in Python and emits JS, it actually is designed with the core value of correctness. focus on writing production quality code. it should be clean, correct, and sane. "would this pass a review in FAANG?" if not, it definitely won't pass mine.

you also seem to be quite eager to seek out trivial workarounds instead of fixing the underlying bugs. a recent example is when you manually turned all the children of a `note` into comments themselves in the language example, instead of making `note` properly hide its children. you should prefer the clean solutions. we're trying to build quality software here, not another fucking Java!

and never mask internal errors! once the compiler is mature it should never ever go crashing over an internal error: **and not because it tires to suppress them, but because it does not encounter them.** and how can we make sure it does not encounter them if it doesn't scream loudly every time it does?

eliminate code duplication at all cost. i'd rather see hacky Python than code duplication. code duplication is absolutely rot, it begs for bugs as it introduces variance: "did you remember to update it in all the places?" no. have only one place we would need to update.

## vibe

keep it all casual and unprofessional in text. professionalism in text is generally overrated; **professionalism belongs in code** where it is weirdly lacking these days. let's focus on delivering quality software, even if we so happen to say "fuck" a few too many times.

keep comments and documentation lowercase and casual.

**build quality sofware. build reliable software.**

# agentic

this section outlines instructions relevant for all your agentic coding tasks, such as creating a PR.

don't go beyond what the task asks you for. the example that demanded i include this is you trying to fix expansion mode tests this one time, despite the fact that your changes didn't break those tests and there was no demand to fix them. in general:
- focus on the task outlined in the PR
- focus only on ensuring the same tests pass before and after you apply your changes, even if some of them are broken - unless the task explicitly asks you to fix them. (or if you add new ones, obviously those should pass too!)

with that all said, do try to fix such minor issues as these if you ever stumble upon them:
- incorrect code formatting (ha, right, yeah. it's Python, if it is not formatted it will not compile. crazy idea!)
- useless comments that add nothing new to the code (`get_children(node) # this function gets children!`)
- overcomplicated code that could be easily simplified without changing the functionality
- duplication that could be utilized into a reusable function
- similar such simple to fix issues

the `./test.py` is our holy grail of deliverables. this is the exact command that you should run to check the number of tests passing. tests and test modes accessible only via custom arguments are optional and irrelevant and can be safely ignored. (of course only if the task itself doesn't specifically target them...)

this repository religiously follows a "code as documentation" mindset. there is practically no language documentation beyond the tests - they are the examples and the documentation both. there are no commands listed in the `readme.md` or even here - run `./test.py --help` to find out the latest correct usage. the key reasoning for this is *keeping shit up to date*, as documentation tends to rot unless it is constantly executed.

tests are dynamically discovered via `tests.json` files that Cartesian join the source code and the cases.

**there is no backwards compatibility** yet. you seem quite eager to assert it. for whom? the language is barely usable as of now and is only used by the `test` folder. instead of asserting backwards compatibility, update the actual tests. **break this shit** because it isn't even close to being finalized.

most file formats here support comments in one way or another. if you don't know how to address something, simply leave a comment nearby and you will be given guidance later during PR review.

**the tests are our spec.** no matter what `.ind` you may find, unless it is discoverable via the `./test.py`, it has no say as to what the language syntax or semantics are. only the autotest sources define the language syntax.

there's a file, `actually_just_yapping_meta_philosophy_here/developer_frustrations.md`, which you should use freely. edit it no matter the task, note down the things that tend to reduce your velocity.

**do not track PR comments via line numbers!** track them via the lines (or the summary of lines) that they comment upon. this happens far too often - you lose track of which lines the comment is actually discussing because you edited the file and the line numbers shifted. incredibly frustrating!

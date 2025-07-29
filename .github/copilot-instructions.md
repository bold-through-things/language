# summary

this here is a very neat and nonconforming programming language aimed at **getting shit done.** 

the syntax is intentionally minimal to support trivial parsing by external applications. the official `parser.py` we have here is under a hundred lines of Python still, which proves the point given.

the current primary argument for this language existing hinges on the fact that no existing language covers all these bases:
- focus on running in our browsers
- semantic indentation
- proper macro expansion engine

## tech

the compiler is written in Python currently, though a likely bootstrap is on the horizon. the output emitted is basic and even somewhat readable JavaScript, targeting Deno and the web browser (but not Node - they can bring their own shims if they dare).

## style

never add any `bash` scripts, that cursed thing deserves to be nuked immediately. leverage Python instead whenever possible. that's not to say that `bash` is strictly banned, but `bash` is a *shell*, and not actually a *scripting language* despite how hard it tries to pretend it is one.

keep dependencies to a minimum. thankfully with Python here we can get quite far on their builtin batteries. dependencies always introduce supply chain vulnerabilities and we should keep the surface area minimal. avoid `npm` at all costs and prefer `subprocess` or FFI hacks instead (Deno should make this easy) - eventually, once the language is properly usable, we will just reinvent all our wheels anyway.

remember to run the test suite to validate your changes: `./test.py`. it's a compiler - nothing, except tests, actually mattters. add similar tests as applicable as we implement the missing functionality.

the compiler shall emit no warnings. there are only errors that we can and those we cannot recover from. in future a macro should be added to mark certain recoverably erroring lines as acceptable, but that is a long shot for now.

## vibe

keep it all casual and unprofessional in text. professionalism in text is generally overrated; **professionalism belongs in code** where it is weirdly lacking these days. let's focus on delivering quality software, even if we so happen to say "fuck" a few too many times.

keep comments and documentation lowercase and casual.

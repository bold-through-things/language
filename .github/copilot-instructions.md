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

important request here specifically for my beloved Copilot! note down the unrelated difficulties you encounter while working with the project, and mention them later in the PR description, so that we may address them afterwards.

## vibe

keep it all casual and unprofessional in text. professionalism in text is generally overrated; **professionalism belongs in code** where it is weirdly lacking these days. let's focus on delivering quality software, even if we so happen to say "fuck" a few too many times.

keep comments and documentation lowercase and casual.

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

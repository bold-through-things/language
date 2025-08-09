# discovering 67lang: a rebellious take on programming language design

*an outsider's perspective on what might be the most unapologetically opinionated language project i've encountered*

---

## first impressions: what the hell is this?

stumbling across the 67lang repository feels like walking into someone's garage workshop and finding them building a custom motorcycle engine from scratch – except instead of chrome and steel, it's made of indentation and barely-contained contempt for the programming language establishment.

the readme immediately sets the tone: "a better programming language. the ones *you* made? all suck. this one? **doesn't.**" 

okay then. tell me how you really feel.

but here's the thing – after spending time with this project, i'm starting to think they might be onto something. this isn't just another toy language or academic exercise. this is someone who got fed up with the state of programming languages and decided to build exactly what they needed, consequences be damned.

## the language itself: indentation as first-class citizen

67lang's most immediately striking feature is its complete commitment to semantic indentation. forget curly braces, forget semicolons, forget most punctuation entirely. everything is indentation:

```67lang
if
    true
then
    a print
        string "this works"
else  
    a print
        string "this doesn't run"
```

but it goes deeper than python's indentation. this is indentation as the fundamental structural element. the entire language is built around the idea that hierarchy should be visually obvious, and that complex nested structures should be... well, visually nested.

the variable assignment syntax initially looks alien:

```67lang
local age
    int 25

local 67lang.features
    dict

a 67lang.features name
    where name is
        string "the access macro"
    string "a powerful method chaining system"
```

but after a while, the logic becomes clear. everything is a tree node, everything can have children, and the indentation makes the tree structure explicit. it's not just syntax sugar – it's syntax philosophy.

## the access macro: method chaining without the mess

one of the most intriguing features is the `access` macro, which handles what most languages do with dot notation:

```67lang
a print
    a 2347 split sort join
        where split takes
            string " "
        string ", "
```

this compiles to readable javascript: `_2347.split(" ").sort().join(", ")` 

but the 67lang version makes the data flow explicit through indentation. you can see exactly what's happening: take `2347`, split it by spaces, sort the results, then join with commas. the visual structure matches the logical structure.

the `where` clauses handle parameters in a way that keeps everything aligned and readable. it's verbose, sure, but it's also unambiguous.

## flexibility taken to extremes

67lang takes identifier flexibility to places i've never seen before. variables can be named literally anything:

```67lang
local 0
    int 42

local discord.@member#hash
    string "#2347"  

local ,
    true

local (2347)
    regex /(2347)/
```

this is either genius or madness, depending on your perspective. the language doesn't try to parse identifiers in any traditional sense – there's just "whitespace" and "non-whitespace." everything else is fair game.

on one hand, this could lead to completely unreadable code. on the other hand, it means you can express ideas in ways that map directly to your problem domain without fighting the language's identifier restrictions.

## the compiler: python with attitude

the compiler is written in python and makes some interesting architectural choices. the tree parser is famously under 100 lines of code, which seems to be a point of pride. the generated javascript is readable and includes a comprehensive runtime library.

what's fascinating is the compilation strategy. instead of trying to be clever about optimization, they focus on correctness and readability of the output. the generated javascript preserves the structure of the original code while adding necessary async/await handling and scope management.

the runtime includes utilities like:

```javascript
_67lang.exists_inside: (inside, ...arr) => {
    if (Array.isArray(inside)) {
        return arr.every(v => inside.includes(v))
    } else {
        return arr.every(v => v in inside)
    }
}
```

it's not trying to reinvent javascript – it's trying to make javascript more expressive through better source language design.

## testing philosophy: executable documentation  

the project follows a "tests are the spec" philosophy that's both refreshing and slightly terrifying. the main language documentation is literally a test file (`tests/language_documentation/main.67lang`) that gets compiled and executed.

this means the documentation can't lie – if it doesn't compile and run, it's not documentation. it's a bold approach that ensures the examples always work, but it also means understanding the language requires reading executable code rather than traditional docs.

the test discovery system uses json files to cartesian-join test cases with source files, allowing comprehensive coverage without massive code duplication. it's elegant in its simplicity.

## the philosophical foundation

what sets 67lang apart isn't just the technical choices – it's the philosophical commitment. the repeated mantra "our greatest enemy is our indifference" feels less like a slogan and more like a mission statement.

this isn't a language designed by committee or built to please everyone. it's designed to solve specific problems for a specific person who got tired of working around language limitations. the documentation includes lines like:

> "this was made for me, because i need to rewrite my Discord bot, because i need to make my own messenger, because i need a new game engine, because i need to create videogames."

there's something refreshing about that honesty. most language projects claim to be general-purpose solutions for everyone. 67lang openly admits it's built for one person's specific needs, and if you happen to share those needs, great.

## the type system: static checking with attitude  

the type system is still in development but already shows promise:

```67lang
local 2347
    type int
    int 2347

must_compile_error FIELD_TYPE_MISMATCH=+1
    a where?
        a 2347
```

the `must_compile_error` construct is particularly clever – it lets you write tests that assert certain code should NOT compile. this enables testing compiler error conditions, which most languages struggle with.

## macro system: the future promise

while not yet fully implemented, the planned macro system seems to be the ultimate goal. the entire language is designed around the idea that users should be able to extend and modify the language itself through macros.

the syntax is designed to be trivially parseable specifically to enable powerful external code generation. the claim that you could write a 67lang parser in bash (while probably hyperbolic) points to the fundamental design principle: make the parse tree as obvious as possible so tools can manipulate it easily.

## javascript target: pragmatic choice

targeting javascript/deno is a pragmatic decision that pays dividends. instead of building their own runtime, they leverage the most optimized and widely-deployed virtual machine on the planet. the generated code runs in browsers and server environments without additional dependencies.

the async/await integration is particularly well done. the compiler automatically handles asynchronous operations, making concurrent code natural to write without callback hell or complex promise chains.

## development philosophy: quality over compatibility

the project has a refreshing "no backwards compatibility" policy during development. since the language isn't production-ready yet, they prioritize getting the design right over maintaining compatibility with earlier versions.

the development guidelines are equally uncompromising:
- "never add any bash scripts" (python only)
- "keep dependencies to a minimum" (supply chain security)
- "defensive programming" (crash loud and fast on errors)
- "eliminate code duplication at all cost"

there's a strong emphasis on code quality and correctness over convenience or popularity.

## who is this for?

67lang isn't trying to be the next mainstream programming language. it's not trying to replace javascript or python for general use. it's solving a specific set of problems:
- need semantic indentation that actually works
- want powerful macro capabilities  
- need to target javascript runtime
- prefer expressiveness over brevity
- willing to trade popularity for correctness

if you need all of these things, 67lang might be exactly what you're looking for. if you don't, it probably isn't.

## the elephant in the room: adoption

the project is essentially a one-person effort with no community, no production deployments, and no backwards compatibility guarantees. for most practical purposes, this makes it unusable for serious projects.

but that misses the point. this isn't about building a community or achieving adoption. this is about building exactly the tool the creator needs, without compromise. if others find it useful, great. if not, that's fine too.

## technical observations

a few implementation details worth noting:

**parsing simplicity**: the tree parser really is remarkably simple. by making indentation the only structural element, parsing becomes almost trivial. this enables powerful external tooling.

**scope management**: the generated javascript includes sophisticated scope management that preserves lexical scoping while enabling the flexible identifier system.

**error handling**: the compiler distinguishes between recoverable user errors (bad 67lang code) and internal errors (compiler bugs), with different handling strategies for each.

**code generation**: the output javascript preserves the structure and readability of the source, making debugging feasible.

## what we can learn

regardless of whether 67lang succeeds as a language, there are lessons here for language design:

1. **consistency matters more than familiarity** – by committing fully to indentation-based syntax, everything becomes predictable
2. **simple parsing enables powerful tooling** – when external tools can easily manipulate your syntax tree, possibilities multiply  
3. **honest constraints are better than false generality** – admitting the language is designed for specific use cases leads to better decisions
4. **tests as documentation works** – if your examples always compile and run, they can't lie to users

## final thoughts

67lang is fascinating not because it's the next big thing, but because it's so uncompromisingly itself. in a world of languages designed by committee to offend no one, here's a language that proudly admits it might not be for you.

the technical implementation is solid, the philosophical foundation is clear, and the execution is uncompromising. whether the specific design choices are right for your needs is a separate question – but there's no doubt the creators know exactly what they're building and why.

for anyone interested in programming language design, 67lang is worth studying not as a model to copy, but as an example of what happens when you start with specific problems and build solutions without worrying about popular opinion.

will it change the world? probably not. will it solve specific problems for specific people? quite possibly. and sometimes, that's exactly what we need.

---

*note: this analysis is based on exploring the project as it exists today. 67lang is actively developed and evolving, so details may change. the core philosophy and approach, however, seem well-established.*

*"our greatest enemy is our indifference" – indeed.*
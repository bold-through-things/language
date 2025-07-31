# open questions

these design decisions need clarification before proceeding with the bootstrapping effort.

## debugging and introspection needs
**question:** what debugging facilities should be built in?

**current python approach:**
- verbose logging with tags
- expandable mode for macro debugging
- error reporting with source locations

this section reads too vague and imprecise to answer meaningfully. use cases and realistic examples would help greatly to clear it up.

**questions:**
- how much debugging overhead is acceptable?
- compile-time vs runtime debugging?
- integration with external debuggers?
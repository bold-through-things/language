# now feel we need classes badly.

the need for classes is a potent pain far sooner than expected. the recent `access` macro syntax rework made our dictionary access rather tedious, and here we are! i am the one who defers always. can't now defer it any longer.

so here is the task then.

1. hoist function definitions to the top.

this is perhaps a rather strange thing to begin with, but it is needed for consistency. i do not want the functions to remain as closures. we will a new syntax for that at some point, but functions must remain distinct and... "pure"? there is a reason for this goal and it is literate programming, actually. you should be able to define a function anywhere and then just have it hoisted to the top, thus usable also anywhere.

now, "to the top" does mean the top of the top node. that would be `67lang:solution`, though you should probably encode it more generically just checking for no parent. the function then is moved to be the first child of this node. this would probably need to happen during the preprocessing, i guess..? let's try that. it might turn out to not be valid and we would need to add a new step instead.

the macro which we hoist is the `fn`, obviously, as it is the one which lets us define functions.

2. the actual new object type definitions.

here is the syntax that we want:

```
type Person is heap_entry
	has name
		type string
	has age
		type int
```

this should then generate several call conventions (and obviously store them somewhere). probably makes the most sense to do that during the type checking? the type definition node should also be hoisted to top of the entire solution. particularly, here the call conventions we would need:
- a function (named simply `Person` in this case) including all the fields for object creation as parameters
- a `FieldCall` for every field within the class

3. then update just a single test

one should be fine for now. `example_for_llms` probably makes the most sense. it uses a few dictionaries. we shouldn't outright remove those current examples but we should certainly add new alterternatives with classes.

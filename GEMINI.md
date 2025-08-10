refactoring. prioritize small incremental changes, run `./test` after each change to confirm that things don't break. the code is quite complex and easy to break, and hard to fix afterwards.

my dear, please do identify your looping. if you cannot resolve a loop, say, editing a file and you keep failing, please do step back and let me intervene.

you should actively use the file `implementation_details.md` to leave and review notes about exactly how the system works here. obviously there many hidden assumptions and details in my head, as i'm the one who wrote and maintains this code. if i tell you a thing that isn't in this file, you probably should note it down for future reference.

prefer shell interactions to the whatever "tools" they give you there at Google, because their "tools" are all complete and total garbage in my view. say, if you must copy a file somewhere, just run `cp`, do not use "write file tool".

consider all possibilities and do not be afraid to ask. listen, i know this code far deeper than you ever will. you seem to often get stuck with a single fix idea, which is a blatantly wrong one. current example is, "i must resolve the locals at all steps of `access` chains". no, dear, there's a simpler fix i see. there was one the last time you brought this up too.

this is a complex system. you can't just *guess* from the error what the fix is. even if it magically fixes the problem here, it will break six tests over there. no, we need some proper and methodical debugging. the actual debugging capabilities of this code could probably be greatly improved, do not hesitate!

in general, prefer you clarify your fixes with me before you apply them. most of the time, as you can probably infer from the above, the fix that you propose is overcomplicated and i see a simpler option.

build quality software and always remember. our greatest enemy is our indifference.

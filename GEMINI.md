refactoring. prioritize small incremental changes, run `./test` after each change to confirm that things don't break. the code is quite complex and easy to break, and hard to fix afterwards.

my dear, please do identify your looping. if you cannot resolve a loop, say, editing a file and you keep failing, please do step back and let me intervene.

**we finally did fill this file with valuables. it may be a good idea generally to begin your work by reading it.** you should actively use the `implementation_details.md` to leave and review notes about exactly how the system works here. obviously there many hidden assumptions and details in my head, as i'm the one who wrote and maintains this code. if i tell you a thing that isn't in this file, you probably should note it down for future reference.

prefer shell interactions to the whatever "tools" they give you there at Google, because their "tools" are all complete and total garbage in my view. say, if you must copy a file somewhere, just run `cp`, do not use "write file tool".

consider all possibilities and do not be afraid to ask. listen, i know this code far deeper than you ever will. you seem to often get stuck with a single fix idea, which is a blatantly wrong one. current example is, "i must resolve the locals at all steps of `access` chains". no, dear, there's a simpler fix i see. there was one the last time you brought this up too.

this is a complex system. you can't just *guess* from the error what the fix is. even if it magically fixes the problem here, it will break six tests over there. no, we need some proper and methodical debugging. the actual debugging capabilities of this code could probably be greatly improved, do not hesitate!

in general, prefer you clarify your fixes with me before you apply them. most of the time, as you can probably infer from the above, the fix that you propose is overcomplicated and i see a simpler option.

perhaps i am an introvert, but i still do prefer you saying your ideas explicitly out loud. sometimes you do, sometimes you don't. i would prefer you always did. it helps me catch your mistakes sooner. do not be silent, talk to me.

do not assume you have it figured out. you tend to often "guess" at the solution. this works quite rarely. i would prefer if you prioritized careful and step by step analysis. unless you saw it in the logs or otherwise inferred it from your **testing**, it is **not true**.

**avoid comments that clearly accomplish nothing, they really piss me off.** a real example from you recently. `self.root_node = solution_node # Set the root_node attribute`. why?! how does this even help?!

`./test` to ensure things don't break.

`./test --glob partial_test_na` to run specific tests and save our time. it is a pleasant filter, very flexible.

`./test -- --log debug` lets you filter the logging. you'd need to leverage the logging tag to actually print anything.

if you must write in 67lang, check the `example_for_llms` test. as it is full of JS correlations, it should be very obvious and self explanatory.

build quality software and always remember. our greatest enemy is our indifference.

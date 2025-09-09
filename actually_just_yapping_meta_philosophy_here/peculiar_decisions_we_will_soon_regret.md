# dropping TypeScript bindings at this point

they did not justify the effort and i now regret attempting to parse their brackets shit. it is still not correct as many syntaxes are parsed completely wrong but most important is the fact that it will *never* be correct as `number` is not `int` and `array.length` is `float`, apparently.

we can do better if we simply do it on our own.

# i temporarily gave up two syntaxes

they add too much complexity to parsing and would undermine our effort to retain simplicitly for the external tooling.

syntax one.

```
ind.config i=( n=, d=)
	ind if(do eq(int 0, int 0))then(do print(string "0 == 0"))
ind.config i=: n=, d=;
	ind if: do eq: int 0, int 0;; then: do print: string "0 == 0";;
```

and syntax two then.

```
begin my_wrap
	fn name
		returns void
	do
note this would be inside the `do` inside `fn`
end my_wrap
```

cool and flexible as it may be, the trouble is that it would complicate the parsing and external processing, which i have come to see as more important than the ergonomics for developers. (truth is that ergonomics are already better than most languages...)

the reason that i did not drop these yet completely is because we will support some macros to allow for literate programming. which is kind of the same thing and it is non negotiable. as such there is an argument that the external parsing is already fucked in one way or another. 

but for now let's keep things simple.

# AGPL and yet not open source

this project is AGPL as you may note, but also it's not open source as per the Harmony that i am gonna summon very soon. you are quite welcome to talk shit, i do not really care. i stand against all copyright in general, but long as it exists, i will abuse it for my benefit. the situation in which i now place you is quite decent overall. you can go fork it and deploy it on your system, modify it, and improve it, and pay me but not a single dollar. that, of course, is under some conditions. your improvements must be visible in ways that i can pull them into my own system **and they may be licensed as proprietary in the future.**

yes i know it sucks. the other option is to make it all proprietary. which would you prefer?

i am the owner. i'm the only one who can be trusted with this bullshit, and that is a fact with proof. if you don't like that, go create your own from scratch. it is not hard. indeed the whole entire point is that it's simple to the point of hurt.

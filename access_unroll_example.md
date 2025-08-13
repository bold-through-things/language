sure, here's an example.

in comes an access...

```
note phrases[67].split().sort().join()
a phrases # split sort join
	where # takes
		int 67
```

preprocessing unrolls it into something roughly just like this...

```
local _0x1_phrases
	67lang:call phrases

local _0x2_hash
	67lang:call #
		67lang:call _0x1_phrases
		int 67

local _0x3 split
	67lang:call split
		67lang:call _0x2_hash
```

and so on, you get the idea.

now you might note, "you could just write this all by hand". indeed. which is why `access` will be soon removed. as elegant as it may be, i have discovered a way better way already. a more straightforward way to write `access` pipelines. and lots more flexible as well.
	
# we should now simplify the `access`.

it's overcomplicated both in usage and importantly, implementation. here is the plan.

1. drop the `where key is` syntax.

it's just unnecessary and awkward. what we would rather have, and a far simpler way, is a specific index access function. think something like:

```js
function index_access(obj, index, set_value?) {
    if (set_value) {
        obj[index] = set_value;
    }
    return obj[index];
}
```

and implementing this would be quite trivial via the call conventions. i think that's `processor_base.py`?

i would prefer this function to be called a `#`. yes, you did read that right, a `#`. our language does support that trivially.

this change would then require updating every test, of course. what used to be...

```
a dict arbitrary_key_sub
	where arbitrary_key_sub is
		string "key..."
    string "new value!"
```

would then become

```
a dict #
	where # takes
		string "key..."	
		string "new value!"
```

note carefully the indentation as above, it is important for the new semantics.

and then `67lang:access_index` does become irrelevant. we should remove it.

2. but why even have all these?

all `67lang:access_` macros are now clearly unnecessary. the `67lang:call` should perfectly be able to handle all the accesses, via the simple logic:
- if there is a local with that name, then it would shadow the relevant field or method, so then we use it.
- if there is no local, then just call the method or the field.

by this point there would be no real distinction in our language between a "method" and a "field", which is exactly what we want. the actual distinction can be handled by the call conventions. in our world, there are no fields, there are only the getters and the setters.

a lot of this would then inherently clean up the `access` macro. it should no longer be aware of the distinction. it's new job is to just unroll into a sequence of declared calls. what the calls *do* is now the task of `67lang:call`. some of the `access` code would probably have to be moved there.

# we need callables in our dogfood!

two real and immediate use cases:

- `setTimeout`
- `WebSocket.onmessage` (probably it isn't feasible for tests, so we should seek some other API like that...)

## the syntax we desire for this.

for now just partial apply would do.

```
note the existing syntax
fn handle_message
	param bot
	param message
	param is_trusted
do
	note the body...

note this is what we need. it should return a
	(message) => {...}
bind fn handle_message as callable
	note these are bound as the parameters
	get bot
	_
	true
```

this should be rather trivial. but that is definitely famous last words!

is `bind` the best word here?

	

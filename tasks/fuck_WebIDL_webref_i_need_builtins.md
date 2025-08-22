# why does WebIDL include no builtins?!

like, yeah, i guess they have excuses? "it isn't Web API", this `JSON.stringify`. but `btoa` is?!

no, fuck that shit!

we'll parse some TypeScript now.

## seems only these files needed here...

for JavaScript itself. Apache 2.0.

```
https://github.com/microsoft/TypeScript/blob/main/src/lib/es*.full.d.ts
```

for ditching the `webref`. Apache 2.0.

```
https://github.com/microsoft/TypeScript/blob/main/src/lib/dom.*.d.ts
```

and then for Deno my beloved. MIT!

```
https://github.com/denoland/deno/blob/main/cli/tsc/dts/lib*.d.ts
```

## we will be gutting the importer.

`webidl_importer.py`. perhaps it's best that you create a new script now, since this is now no longer just WebIDL. you can of course use the old one for reference, though it's unclear just how effective it will be.

the new script should automatically fetch files (if missing) before it processes them.

then afterwards, and finally, clean up the `builtins.py`.

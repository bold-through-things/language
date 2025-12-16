#!/usr/bin/env -S deno run --allow-run --allow-read --allow-write --unstable-raw-imports

let out = await new Deno.Command("./test", {
  args: Deno.args,
  stdin: "inherit",
  stdout: "inherit",
  stderr: "inherit",
}).output()

if (out.code !== 0) {
    console.log("test failure.");
    Deno.exit(out.code);
}

out = await new Deno.Command("grep", {
  args: ["-r", "console\\.log", "./compiler"],
  stdin: "inherit",
  stdout: "piped",
  stderr: "inherit",
}).output()

const glob_output = new TextDecoder().decode(out.stdout);

if (glob_output.includes("console.log")) {
    console.log('still have debugging prints within our code')
  console.error(glob_output);
  Deno.exit(1);
}
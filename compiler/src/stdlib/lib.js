indentifire = {
    concat: (...arr) => arr.reduce((sum, a) => sum+a, ""),
    eq: (...arr) => arr.every(v => v===arr[0]),
    either: (...arr) => arr.reduce((sum, a) => sum||a, false),
    asc: (...arr) => arr.every((v, i, a) => !i || a[i-1] <= v), // who let bro cook? https://stackoverflow.com/a/53833620
    add: (...arr) => arr.reduce((sum, a) => sum + a, 0),
    mod: (...arr) => arr[0] % arr[1], // TODO - shouldn't be a binary operation (how?) TODO - ensure we're not ignoring inputs silently
}

if (typeof window === "undefined") { 
    require("readline")
    const readline = require('readline');

    globalThis.prompt = async function (msg) {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        let rv = await new Promise(resolve => rl.question(msg, resolve))
        rl.close();
        return rv;
    }
}

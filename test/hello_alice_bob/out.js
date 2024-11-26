indentinfire = {
    concat: (a, b) => a + b,
    eq: (a, b) => a == b,
    either: (a, b) => a || b,
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


;(async () => {
let name = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
name(await prompt("hi what is ur name? "))
if(indentinfire.either(indentinfire.eq(name(), "Alice"), indentinfire.eq(name(), "Bob")))
{
console.log(indentinfire.concat("hello ", name()))
}
else{
console.log("who the fuck are you? ")
}
})();
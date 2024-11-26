indentinfire = {
    concat: (...arr) => arr.reduce((sum, a) => sum+a, ""),
    eq: (...arr) => arr.every(v => v===a),
    either: (...arr) => arr.reduce((sum, a) => sum||a, false),
    asc: (...arr) => arr.every((v, i, a) => !i || a[i-1] <= v), // who let bro cook? https://stackoverflow.com/a/53833620
    add: (...arr) => arr.reduce((sum, a) => sum+a, 0),
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
let n = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
n(await prompt("sum all numbers from 1 to "))
let sum = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
sum(0)
let i = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
i(1)
while(indentinfire.asc(i(), n()))
{
console.log(indentinfire.concat("i= ", i(), ", sum= ", sum()))
sum(indentinfire.add(sum(), i()))
i(indentinfire.add(i(), 1))
}
console.log(indentinfire.concat("sum= ", sum()))
})();
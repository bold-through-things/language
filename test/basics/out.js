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


void (async () => {
    {
        "this is a multiline comment.\nsame as in python, you can use a string in a statement context\nto write your comments.\nin this language though, this is THE correct way to do it (at least at level azero)\n"
        "or use an inline string if you prefer"
        "many of microprograms here are implementations of tasks at https://adriann.github.io/programming_problems.html\n"
        {
            console.log("hello world!\n	<- include tabs    <- or spaces\nmust be indented just like in YAML!\n", "string!\nTODO needs escape sequences lmao\nthis one ends without a newline!\n")
            console.log("this is an inline string, it's got a slighly different syntax.", "you can use any non whitespace character to delimit the string!", "this is mostly so that trailing whitespace is obvious      ", "but i can envision people using these characters as markers for what the string represents, perhaps...", "uwu")
        } 

        while(true)
        {
            let name = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            name(await prompt("hi what is ur name? "))

            if(indentifire.eq(name(), ""))
            {
                break
            } 

            if(indentifire.either(indentifire.eq(name(), "Alice"), indentifire.eq(name(), "Bob")))
            {
                console.log("hello ", name())
            } 
            else {
                console.log("who the fuck are you?")
            } 
        } 

        while(true)
        {
            let n = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            n(await prompt("sum all numbers from 1 to "))

            if(indentifire.eq(n(), ""))
            {
                break
            } 
            let sum = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            sum(0)
            let i = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            i(1)

            while(indentifire.asc(i(), n()))
            {
                console.log(indentifire.concat("i= ", i(), ", sum= ", sum()))
                sum(indentifire.add(sum(), i()))
                i(indentifire.add(i(), 1))
            } 
            console.log(indentifire.concat("sum= ", sum()))
        } 

        while(true)
        {
            let fizz_divisor = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            fizz_divisor(await prompt("fizz? "))
            let buzz_divisor = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            buzz_divisor(await prompt("buzz? "))
            let n = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
            n(await prompt("n? "))

            if(indentifire.eq(n(), ""))
            {
                break
            } 
            let i = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})

            while(indentifire.asc(i(), n()))
            {
                let out = (function(set) {if (set !== undefined) {this.value=set;} else {return this.value;} }).bind({value: null})
                out("")

                if(indentifire.eq(indentifire.mod(i(), fizz_divisor()), 0))
                {
                    out(indentifire.concat(out(), "fizz"))
                } 

                if(indentifire.eq(indentifire.mod(i(), buzz_divisor()), 0))
                {
                    out(indentifire.concat(out(), "buzz"))
                } 

                if(indentifire.eq(out(), ""))
                {
                    out(i())
                } 
                console.log(out())
                i(indentifire.add(i(), 1))
            } 
        } 
    } })();
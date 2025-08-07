let input = stdin;
let words = input.split("\n");
let count = {};
for (const word of access words) {
    count[(1 + count[word])] = [];
  }
console.log(count);
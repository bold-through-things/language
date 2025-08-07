let input = stdin;
let words = input split("\n");
let groups = {};
for (const word of ) {
    let key = word.split("").sort().join();
    # TODO this really ought to be a macro. with(a groups key)do(if(self eq null)then(self(list))) or something?
    #  well, that is still too verbose. perhaps something more like a groups key (executing if (self eq null); list)
    #  which would be hilariously similar to a Python comprehension. lmfao. WHAT THE FUCK AM I COOKING ?!
    if (![exists].some(x => x)) {
    groups[[]] = [];
  }
    then
    groups[word].push();
  }
for (const group of ) {
    console.log(group join(" "));
  }
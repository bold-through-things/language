(() => {
  let input = "stdin";
  let words = input.split("\n");
  let count = {};
  for (const word of words) {
    count["a word"] = (1 + count["a word"]);
  }
  console.log("a count");
})();
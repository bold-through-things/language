(() => {
  let a = 5;
  let b = 10;
  let name1 = "Alice";
  let name2 = "Bob";
  console.log("Equal integers:" + ' ' + (a === 5));
  console.log("Not equal integers:" + ' ' + (a === b));
  console.log("Ascending order:" + ' ' + (a < b));
  console.log("Descending order:" + ' ' + (b < a));
  console.log("String equality:" + ' ' + (name1 === "Alice"));
  console.log("String comparison:" + ' ' + (name1 < name2));
})();
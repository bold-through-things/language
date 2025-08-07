let str = "testing";
# calls the (str, str) overload
console.log(str.split("t"));
# calls the (str, regex) overload
console.log(str.split(regex /t/));
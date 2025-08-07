let fizz_divisor;
let buzz_divisor;
let n;
if (is_tty) {
    fizz_divisor = prompt("fizz? ");
    buzz_divisor = prompt("buzz? ");
    n = prompt("n? ");
  } else {
    let input = stdin;
    input = access("\n");
    # TODO: instead we should be able to just specify a mapping and unroll this automatically i.e. {0: fizz_divisor, ...}
    fizz_divisor = input[0];
    buzz_divisor = input[1];
    n(input[2])
  }
let i = 0;
while ((access i < access n)) {
    let out = "";
    if (((access i % access fizz_divisor) === 0)) {
    out = concat(access out, "fizz");
  }
    if (((access i % access buzz_divisor) === 0)) {
    out = concat(access out, "buzz");
  }
    if ((access out === "")) {
    out = access i;
  }
    console.log(access out);
    i = (access i + 1);
  }
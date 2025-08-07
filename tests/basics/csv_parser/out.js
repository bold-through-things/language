let lines = stdin;
lines = lines.split("\n");
let i = 0;
let header = [];
let rows = [];
for (const line of access lines) {
    if ((access i === 0)) {
    header = line.split(",");
  } else {
    let zip = zip(header, line.split(","));
    let row = {};
    for (const kv of zip) {
    row[kv[1]] = [];
  }
    rows.push
  }
    i = (access i + 1);
  }
for (const row of rows) {
    console.log(row.name);
  }
let age_over_30 = 0;
for (const row of rows) {
    if ((row.age < 30)) {
    age_over_30 = (access age_over_30 + 1);
  }
  }
console.log(access age_over_30);
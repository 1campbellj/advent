import { readFile } from "fs";

class Display {
  constructor(input, output) {
    this.input = input.split(" ");
    this.output = output.split(" ");
  }

  print() {
    console.log(`${this.input} | ${this.output}`);
  }

  numUniqueOutputs() {
    let num = 0;
    this.output.forEach((o) => {
      if ([2, 3, 4, 7].includes(o.length)) {
        num++;
      }
    });
    return num;
  }
}

readFile("2021/day-08/part-01.input", "utf8", (err, data) => {
  let inputs = data.split(/\n/);
  inputs = inputs.map((e) => e.split(" | "));
  let displays = inputs.map((e) => new Display(e[0], e[1]));
  displays.map((e) => e.print());
  let numUnique = displays
    .map((d) => d.numUniqueOutputs())
    .reduce((p, v) => p + v);
  console.log(numUnique);
});

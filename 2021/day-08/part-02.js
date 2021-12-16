import { readFile } from "fs";

class Display {
  // 1, 7, 4, 8 are axioms
  // 1: only digit with 2 signals
  // 7: only digit with 3 signals
  // 4: only digit 4 signals
  // 8: only digit with 7 signals

  // 9: only 6 segment that shares 4 segments with "4"
  // 3: only 5 segment that shares 5 segments with "9"
  // 2: only 5 segment that shares 2 segments with "4"
  // 5: only 5 segment that isn't "2" or "3"
  // 6: only 6 segment that shares 2 segments with "8"
  // 0: only 6 segment remaining

  constructor(input, output) {
    this.input = input.split(" ").map((i) => i.sort());
    this.output = output.split(" ").map((i) => i.sort());

    input.forEach((i) => {
      if (i.length == 2) {
        this.two = i;
      } else if (i.length == 3) {
        this.seven = i;
      } else if (i.length == 4) {
        this.four = i;
      } else if (i.length == 7) {
        this.eight = i;
      }
    });
  }

  print() {
    console.log(`${this.input} | ${this.output}`);
  }

  numUniqueOutputs() {
    let num = 0;
    this.output.forEach((o) => {
      // segment counts for 1, 7, 4, 8
      if ([2, 3, 4, 7].includes(o.length)) {
        num++;
      }
    });
    return num;
  }
}

readFile("day-08/test.input", "utf8", (err, data) => {
  let inputs = data.split(/\n/);
  inputs = inputs.map((e) => e.split(" | "));
  let displays = inputs.map((e) => new Display(e[0], e[1]));
  displays.map((e) => e.print());
  let numUnique = displays
    .map((d) => d.numUniqueOutputs())
    .reduce((p, v) => p + v);
  console.log(numUnique);
});

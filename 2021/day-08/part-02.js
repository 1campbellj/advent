import { readFile } from "fs";
import { decode } from "punycode";

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
    this.input = input.split(" ").map((i) => i.split("").sort().join(""));
    this.output = output.split(" ").map((i) => i.split("").sort().join(""));
    this.decodeMap = {};
    this.fiveDigits = [];
    this.sixDigits = [];

    this.input.forEach((i) => {
      if (i.length == 2) {
        this.one = i;
        this.decodeMap[i] = 1;
      } else if (i.length == 3) {
        this.seven = i;
        this.decodeMap[i] = 7;
      } else if (i.length == 4) {
        this.four = i;
        this.decodeMap[i] = 4;
      } else if (i.length == 7) {
        this.eight = i;
        this.decodeMap[i] = 8;
      } else if (i.length == 5) {
        this.fiveDigits.push(i);
      } else if (i.length == 6) {
        this.sixDigits.push(i);
      }
    });

    this.findNine();
    this.findThree();
    this.findTwo();
    this.findFive();
    this.findSix();
    this.findZero();

    //
  }

  findZero() {
    this.zero = this.sixDigits.filter(
      (f) => f != this.nine && f != this.six
    )[0];
    this.decodeMap[this.zero] = 0;
  }

  // 6: only 6 segment that shares 2 segments with "7"
  findSix() {
    this.six = this.sixDigits.filter(
      (f) => this.sharedChars(f, this.seven) == 2
    )[0];
    this.decodeMap[this.six] = 6;
  }

  // 5: only 5 segment that isn't "2" or "3"
  findFive() {
    this.five = this.fiveDigits.filter(
      (f) => f != this.two && f != this.three
    )[0];
    this.decodeMap[this.five] = 5;
  }

  // 2: only 5 segment that shares 2 segments with "4"
  findTwo() {
    this.fiveDigits.forEach((f) => {
      if (this.sharedChars(f, this.four) == 2) {
        this.two = f;
        this.decodeMap[f] = 2;
      }
    });
  }

  // 3: only 5 segment that shares 3 segments with "7"
  findThree() {
    this.fiveDigits.forEach((f) => {
      if (this.sharedChars(f, this.seven) == 3) {
        this.three = f;
        this.decodeMap[f] = 3;
      }
    });
  }

  // 9: only 6 segment that shares 4 segments with "4"
  findNine() {
    this.sixDigits.forEach((f) => {
      if (this.sharedChars(f, this.four) == 4) {
        this.nine = f;
        this.decodeMap[f] = 9;
      }
    });
  }

  outputTranslation() {
    return this.output.map((o) => this.decodeMap[o]).join("");
  }

  sharedChars(a, b) {
    let res = 0;
    if (b == undefined) {
      return;
    }
    for (let i in a) {
      b.includes(a[i]) ? res++ : false;
    }
    return res;
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

readFile("2021/day-08/part-01.input", "utf8", (err, data) => {
  let inputs = data.split(/\n/);
  inputs = inputs.map((e) => e.split(" | "));
  let displays = inputs.map((e) => new Display(e[0], e[1]));
  console.log(displays.map((e) => parseInt(e.outputTranslation())));
  console.log(
    displays.map((e) => parseInt(e.outputTranslation())).reduce((a, b) => a + b)
  );
});

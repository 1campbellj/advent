import { readFile } from "fs";

let signals = [];

readFile("day-01/part-01.input", "utf8", (err, data) => {
  signals = data.split(/\n/).map((d) => parseInt(d));
  console.log("Number of Increases: ", countIncreases(signals));
});

function countIncreases(data) {
  let increases = 0;
  let window1 = 0;
  let window2 = 0;
  for (let i = 0; i + 3 < data.length; i++) {
    window1 = data[i] + data[i + 1] + data[i + 2];
    window2 = data[i + 1] + data[i + 2] + data[i + 3];
    // console.log("1: ", window1, " 2: ", window2);
    if (window2 > window1) {
      increases++;
    }
  }

  return increases;
}

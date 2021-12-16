import { readFile } from "fs";

let signals = [];

readFile("day-01/part-01.input", "utf8", (err, data) => {
  signals = data.split(/\n/).map((d) => parseInt(d));
  console.log("Number of Increases: ", countIncreases(signals));
});

function countIncreases(data) {
  let increases = 0;
  for (let i = 1; i < data.length; i++) {
    if (data[i] > data[i - 1]) {
      // console.log("Increase at ", i, " ", data[i]);
      increases++;
    }
  }

  return increases;
}

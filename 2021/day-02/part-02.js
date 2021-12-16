import { readFile } from "fs";

let signals = [];

readFile("day-02/part-01.input", "utf8", (err, data) => {
  signals = data.split(/\n/).map((d) => {
    let t = d.split(" ");
    return [t[0], parseInt(t[1])];
  });
  // console.log(signals.toString());

  console.log("Final Answer: ", chartPosition(signals));
});

function chartPosition(tuples) {
  let depth = 0;
  let horizontal = 0;
  let aim = 0;

  tuples.forEach((t) => {
    if (t[0] == "forward") {
      horizontal += t[1];
      depth += aim * t[1];
    } else if (t[0] == "down") {
      aim += t[1];
    } else if (t[0] == "up") {
      aim -= t[1];
    }
  });

  return depth * horizontal;
}

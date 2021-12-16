import { readFile } from "fs";

let signals = [];

readFile("day-03/part-01.input", "utf8", (err, data) => {
  signals = data.split(/\n/);
  // console.log(signals.toString());
  let oxygen = oxygenRating(signals);
  let scrubber = scrubberRating(signals);
  console.log("oxygen: ", oxygen);
  console.log("scrubber: ", scrubber);
  console.log("Life Support: ", oxygen * scrubber);
});

function mostCommonDigits(signals, tie) {
  let oneCounts = new Array(signals[0].length).fill(0);

  signals.forEach((s) => {
    for (let i = 0; i < s.length; i++) {
      if (s[i] == 1) {
        oneCounts[i]++;
      }
    }
  });

  let digits = [];
  oneCounts.forEach((c) => {
    if (c > signals.length / 2) {
      digits.push(1);
    } else if (c < signals.length / 2) {
      digits.push(0);
    } else {
      digits.push(tie);
    }
  });

  return digits;
}

function oxygenRating(signals) {
  console.log("most common digits ", mostCommonDigits(signals, 1));
  let signalCopy = [...signals];
  let i = 0;

  while (signalCopy.length > 1 && i <= signals[0].length) {
    let commonDigits = mostCommonDigits(signalCopy, 1);
    // console.log("loop signalCopy ", signalCopy);
    signalCopy = signalCopy.filter((s) => s[i] == commonDigits[i]);
    i++;
  }

  console.log("signalCopy ", signalCopy);
  return parseInt(signalCopy.join(), 2);
}

function scrubberRating(signals) {
  console.log("most common digits ", mostCommonDigits(signals, 1));
  let signalCopy = [...signals];
  let i = 0;

  while (signalCopy.length > 1 && i <= signals[0].length) {
    let commonDigits = mostCommonDigits(signalCopy, 1);
    console.log("loop signalCopy ", signalCopy);
    signalCopy = signalCopy.filter((s) => s[i] != commonDigits[i]);
    i++;
  }

  console.log("signalCopy ", signalCopy);
  return parseInt(signalCopy.join(), 2);
}

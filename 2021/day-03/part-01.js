import { readFile } from "fs";

let signals = [];

readFile("day-03/part-01.input", "utf8", (err, data) => {
  signals = data.split(/\n/);
  // console.log(signals.toString());
  const gamma = detectGamma(signals);
  const epsilon = epsilonFromGamma(gamma);

  console.log("gamma ", gamma, " = ", parseInt(gamma, 2));
  console.log("epsilon", epsilon, " = ", parseInt(epsilon, 2));
  console.log("Final Answer: ", parseInt(gamma, 2) * parseInt(epsilon, 2));
});

function detectGamma(signals) {
  let oneCounts = new Array(signals[0].length).fill(0);

  signals.forEach((s) => {
    for (let i = 0; i < s.length; i++) {
      if (s[i] == 1) {
        oneCounts[i]++;
      }
    }
  });

  let gamma = "";
  oneCounts.forEach((c) => {
    console.log("c: ", c);
    if (c >= signals.length / 2) {
      gamma = gamma.concat("1");
    } else {
      gamma = gamma.concat("0");
    }
  });

  return gamma;
}

function epsilonFromGamma(gamma) {
  return gamma
    .split("")
    .map((c) => (c === "1" ? "0" : "1"))
    .join("");
}

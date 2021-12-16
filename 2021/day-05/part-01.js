import { readFile } from "fs";

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
  }

  print() {
    console.log(this.p1.x, ",", this.p1.y, ":", this.p2.x, ",", this.p2.y);
  }

  slope() {
    return (this.p2.y - this.p1.y) / (this.p2.x - this.p1.x);
  }

  // y =  mx + b
  // b = y - mx
  yIntercept() {
    return this.p1.y - this.slope() * this.p1.x;
  }

  isHorizontal() {
    return this.p1.x == this.p2.x;
  }

  isVertical() {
    return this.p1.y == this.p2.y;
  }

  includesPoint(p) {
    if (p.x < Math.min(this.p1.x, this.p2.x)) {
      return false;
    }
    if (p.x > Math.max(this.p1.x, this.p2.x)) {
      return false;
    }
    if (p.y < Math.min(this.p1.y, this.p2.y)) {
      return false;
    }
    if (p.y > Math.max(this.p1.y, this.p2.y)) {
      return false;
    }

    if (this.slope() == Infinity || this.slope() == -Infinity) {
      // line is vertical
      let minY = Math.min(this.p1.y, this.p2.y);
      let maxY = Math.max(this.p1.y, this.p2.y);

      return p.x == this.p1.x && p.y >= minY && p.y <= maxY;
    }

    return p.y == this.slope() * p.x + this.yIntercept();
  }
}

function numDangerousPoints(intercepts) {
  let count = 0;
  const DANGEROUS = 2;
  intercepts.forEach((row) => {
    row.forEach((val) => {
      if (val >= DANGEROUS) {
        count++;
      }
    });
  });
  return count;
}

readFile("day-05/part-01.input", "utf8", (err, data) => {
  let inputs = data.split(/\n/);
  let lines = [];

  let max_x = 0;
  let max_y = 0;
  inputs.forEach((l) => {
    let points = l.split("->");
    let p1xy = points[0].split(",").map((p) => parseInt(p.trim()));
    let p2xy = points[1].split(",").map((p) => parseInt(p.trim()));
    if (p1xy[0] > max_x) {
      max_x = p1xy[0];
    }
    if (p2xy[0] > max_x) {
      max_x = p2xy[0];
    }
    if (p1xy[1] > max_y) {
      max_y = p1xy[1];
    }
    if (p2xy[1] > max_y) {
      max_y = p2xy[1];
    }
    let p1 = new Point(p1xy[0], p1xy[1]);
    let p2 = new Point(p2xy[0], p2xy[1]);
    lines.push(new Line(p1, p2));
  });

  let intercepts = Array.from(Array(max_y + 1), () => {
    return Array(max_x + 1).fill(0);
  });

  let straightLines = lines.filter((l) => l.isHorizontal() || l.isVertical());

  // straightLines.forEach((l) => l.print());
  for (let y = 0; y < intercepts.length; y++) {
    for (let x = 0; x < intercepts[0].length; x++) {
      let p = new Point(x, y);
      lines.forEach((l) => {
        if (l.includesPoint(p)) {
          intercepts[y][x] += 1;
        }
      });
    }
  }

  // intercepts.forEach((p) => console.log(p));

  console.log("Dangerous Points: ", numDangerousPoints(intercepts));
});

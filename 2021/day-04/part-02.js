import { readFile } from "fs";

class BoardItem {
  constructor(value) {
    this.value = parseInt(value);
    this.selected = false;
  }
}

class BingoBoard {
  constructor(b) {
    this.winning = false;
    this.lastNumber;
    this.board = Array.from(Array(b.length), () => new Array());
    for (let i = 0; i < b.length; i++) {
      let row = b[i];
      for (let j = 0; j < row.length; j++) {
        this.board[i].push(new BoardItem(b[i][j]));
      }
    }
  }

  fillNumber(n) {
    this.board.forEach((row) => {
      row.forEach((bi) => {
        if (bi.value == n) {
          bi.selected = true;
          this.lastNumber = n;
          this.checkWinning();
        }
      });
    });
  }

  checkWinning() {
    if (this.winning) {
      return;
    }
    console.log("check winning!");
    // check all the rows
    for (let ri = 0; ri < this.board.length; ri++) {
      let row = this.board[ri];
      if (row.every((bi) => bi.selected)) {
        this.winning = true;
      }
    }
    // check all columns
    for (let i = 0; i < this.board[0].length; i++) {
      let column = this.board.map((r) => r[i]);
      console.log("checking column", column.toString());
      if (column.every((bi) => bi.selected)) {
        this.winning = true;
      }
    }
  }

  printValues() {
    console.log("board:");
    this.board.forEach((row) => {
      console.log(row.map((bi) => `${bi.value} ${bi.selected ? "(*)" : ""}`));
    });
  }

  printSelections() {
    console.log("selections:");
    this.board.forEach((row) => {
      console.log(row.map((bi) => bi.selected));
    });
  }

  score() {
    let sum = 0;
    this.board.forEach((row) => {
      row.forEach((bi) => {
        if (!bi.selected) {
          sum += bi.value;
        }
      });
    });
    this.printValues();
    this.printSelections();
    console.log("sum", sum);
    console.log("lastNumber", this.lastNumber);

    return sum * this.lastNumber;
  }
}

readFile("day-04/part-01.input", "utf8", (err, data) => {
  let inputs = data.split(/\n\n/);
  // console.log(signals.toString());
  let calledNumbers = inputs
    .shift()
    .split(",")
    .map((n) => parseInt(n));

  // input now has only boards in it
  let boards = [];

  inputs.forEach((b) => {
    let rows = b.split("\n");
    boards.push(new BingoBoard(rows.map((r) => r.trim().split(/\s+/))));
  });

  boards.forEach((bb) => {
    bb.printValues();
  });

  let loserIndex = processBoards(boards, calledNumbers);

  console.log("answer: ", boards[loserIndex].score());
  console.log("last number: ", boards[loserIndex].lastNumber);
  console.log("numbers", calledNumbers);
});

function processBoards(boards, numbers) {
  let numberIndex = 0;
  while (boards.filter((b) => b.winning).length < boards.length - 1) {
    boards.forEach((b) => {
      b.fillNumber(numbers[numberIndex]);
    });

    numberIndex++;
  }

  // one board not winning
  console.log("remaining board: ");
  console.log(boards.map((b) => b.winning));
  let loserIndex = boards.findIndex((b) => !b.winning);

  console.log(loserIndex);

  while (boards.filter((b) => b.winning).length < boards.length) {
    boards[loserIndex].fillNumber(numbers[numberIndex]);

    numberIndex++;
  }

  return loserIndex;
}

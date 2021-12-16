import { readFile } from "fs";

let signals = [];

readFile("day-04/part-01.input", "utf8", (err, data) => {
  let inputs = data.split(/\n\n/);
  // console.log(signals.toString());
  let calledNumbers = inputs.shift().split(",");

  // input now has only boards in it
  let boards = [];

  inputs.forEach((b) => {
    let rows = b.split("\n");
    boards.push(rows.map((r) => r.trim().split(/\s+/)));
  });
  let winners = findWinningBoard(calledNumbers, boards);
  console.log("winningBoard");
  let winningBoard = winners[0];
  let winningSelection = winners[1];
  let winningNumber = winners[2];
  printBoard(winners[0]);
  printBoard(winners[1]);
  console.log(winners[2]);
  let sum = 0;

  for (let i = 0; i < winningBoard.length; i++) {
    let row = winningBoard[i];
    for (let ri = 0; ri < row.length; ri++) {
      if (winningSelection[i][ri] == 0) {
        sum += parseInt(row[ri]);
      }
    }
  }

  console.log("answer: ", sum * parseInt(winningNumber));
});

function printBoard(b) {
  b.forEach((r) => console.log(r));
}

function fillNumber(number, board, selection) {
  board.forEach((row, y) => {
    let x = row.indexOf(number);

    if (x > -1) {
      selection[y][x] = 1;
    }
  });
}

function selectionHasWin(selection) {
  // check all the rows
  for (let ri = 0; ri < selection.length; ri++) {
    let row = selection[ri];
    if (row.indexOf(0) < 0) {
      return true;
    }
  }
  // check all columns
  for (let i; i < selection.length; i++) {
    let column = selection.map((r) => r[i]);
    if (column.indexOf(0) <= 0) {
      return true;
    }
  }

  return false;
}

function getWinningIndex(selections) {
  for (let si = 0; si < selections.length; si++) {
    let selection = selections[si];
    if (selectionHasWin(selection)) {
      return si;
    }
  }

  return -1;
}

function findWinningBoard(numbers, boards) {
  let selections = Array.from(Array(boards.length), () =>
    Array.from(Array(boards[0].length), () =>
      Array(boards[0][0].length).fill(0)
    )
  );

  for (let i = 0; i < 4; i++) {
    boards.forEach((b, bi) => fillNumber(numbers[i], b, selections[bi]));
  }

  let i = 0;
  let winningIndex = -1;
  while (true) {
    boards.forEach((b, bi) => fillNumber(numbers[i], b, selections[bi]));
    if (i > 4) {
      winningIndex = getWinningIndex(selections);
      if (winningIndex >= 0) {
        return [boards[winningIndex], selections[winningIndex], numbers[i]];
      }
    }
    i++;
  }
}

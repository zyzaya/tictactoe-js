const Player = (name, icon) => {
  const getIcon = () => { return icon };
  return {name, getIcon};
};

const Cell = (col, row, div, onclick) => {
  let cell = { col, row }
  cell.display = "";
  cell.button = div.appendChild(document.createElement("button"));
  cell.button.onclick = onclick
  cell.getDisplay = () => { return display };
  cell.setDisplay = (text) => {
    cell.button.textContent = text;
  };
  return cell;
};

const Board = (() => {
  let div = document.getElementById("board");
  let board = new Array(3).fill(new Array(3).fill(0));

  const onBoard = (col, row) => {
    return col >= 0 && col <= 2 && row >= 0 && row <= 2;
  }

  const play = (col, row) => {
    console.log(`Col: ${col}, Row: ${row}`)
    if (onBoard(col, row)) {
      board[col][row].setDisplay(current.getIcon());
      return true;
    } else {
      return false;
    }
  };

  const reset = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[col][row].setDisplay("");
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      board[col][row] = Cell(col, row, div, play.bind(this, col, row))
    }
  }
  return { play, reset };
})();

const Game = (() => {
  let info = document.getElementById("info");

})()
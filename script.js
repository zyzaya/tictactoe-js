const Player = (name, icon) => {
  const getIcon = () => { return icon };
  return {name, getIcon};
};

const Cell = (col, row, div, onclick) => {
  let cell = { col, row };
  cell.button = div.appendChild(document.createElement("button"));
  cell.button.onclick = onclick.bind(null, col, row);
  cell.getDisplay = () => { return cell.button.textContent };
  cell.setDisplay = (text) => {
    cell.button.textContent = text;
  };
  return cell;
};

const Board = (container, play) => {
  let board = new Array(3).fill(0).map(() => new Array(3).fill(0))

  const onBoard = (col, row) => {
    return col >= 0 && col <= 2 && row >= 0 && row <= 2;
  }

  const setCell = (col, row, value) => {
    if (onBoard(col, row)) {
      board[col][row].setDisplay(value);
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

  for (let col = 0; col < board.length; col++) {
    for (let row = 0; row < board[col].length; row++) {
      board[col][row] = Cell(col, row, container, play);
    }
  }
  
  return { setCell, reset };
};

const Game = (() => {
  const play = (col, row) => {
    board.setCell(col, row, current.getIcon());
    current = current == p1 ? p2 : p1;
  }
  
  let p1 = Player('player 1', 'X');
  let p2 = Player('player 2', 'O');
  let current = p1;
  let container = document.getElementById("board");
  let info = document.getElementById("info");
  let board = Board(container, play);
  return { play }
})()
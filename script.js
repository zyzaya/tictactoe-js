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

  let WIN = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const onBoard = (col, row) => {
    return col >= 0 && col <= 2 && row >= 0 && row <= 2;
  }

  const setCell = (col, row, value) => {
    if (onBoard(col, row) && board[col][row].getDisplay() == "") {
      board[col][row].setDisplay(value);
      return true;
    } else {
      return false;
    }
  };

  const checkColumnForWinner = (col, value) => {
    return board[col].every((e) => {
      return e.getDisplay() === value;
    })
  }

  const checkRowForWinner = (row, value) => {
    return board.every((col) => {
      return col[row].getDisplay() == value;
    })
  }

  const checkDiagonalForWinner = (value) => {
    for (let i = 0; i <= 2; i++) {
      if (board[i][i].getDisplay() !== value) {
        return false;
      }
    }
    return true;
  }

  const checkReverseDiagonalForWinner = (value) => {
    for (let i = 0; i <= 2; i++) {
      if (board[i][2 - i].getDisplay() !== value) {
        return false;
      }
    }
    return true;
  }

  const isWinner = (col, row) => {
    let value = board[col][row].getDisplay()
    return checkColumnForWinner(col, value) 
      || checkRowForWinner(row, value)
      || checkDiagonalForWinner(value)
      || checkReverseDiagonalForWinner(value);
  }

  const reset = () => {
    for (let row = 0; row < board.length; row++) {
      for (let col = 0; col < board[row].length; col++) {
        board[col][row].setDisplay("");
      }
    }
  }

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      board[col][row] = Cell(col, row, container, play);
    }
  }
  
  return { setCell, reset, isWinner };
};

const Game = (() => {
  const nextTurn = () => {
    current = current == p1 ? p2 : p1;
  }

  const play = (col, row) => {
    if (board.setCell(col, row, current.getIcon())) {
      if (board.isWinner(col, row)) {
        info.textContent = `${current.name} wins!`
      } else {
        nextTurn();
      }
    }
  }
  
  let p1 = Player('player 1', 'X');
  let p2 = Player('player 2', 'O');
  let current = p1;
  let container = document.getElementById("board");
  let info = document.getElementById("info");
  let board = Board(container, play);
  return { play }
})()
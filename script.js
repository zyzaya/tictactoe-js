const Player = (name, icon) => {
  const getIcon = () => { return icon };
  return {name, getIcon};
};

const Cell = (div) => {
  display = "";
  let button = div.appendChild(document.createElement("button"));

  const getDisplay = () => { return display };
  const setDisplay = (text) => {
    button.textContent = text;
  };
  return { getDisplay, setDisplay };
};

const Board = ((div) => {
  let board = new Array(3).fill(new Array(3).fill(Cell(div)));
  const onBoard = (col, row) => {
    return col >= 0 && col <= 2 && row >= 0 && row <= 2;
  };
  const play = (col, row, player) => {
    if (!onBoard(col, row)) {

    } else if (board[col][row] != null) {

    } else {
      board[row][col].setDisplay(player.getIcon());
      updateDisplay();
      nextTurn();
    }
  };
  return {
    play
  };
})();


const gameBoard = (() => {
  const board = new Array(9);
  const testBoard = ["O", "X", "X", "O", "X", "O", "X", "X", "O"];
  const populateTable = () => {
    for (let i = 0; i < board.length; i++) {
      document.getElementById(i).innerText = board[i];
    }
  };
  return { board, populateTable };
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMarker = () => mark;
  const placeMarker = () => {
    document.querySelectorAll(".box").forEach((box) => {
      box.addEventListener("click", (e) => {
        box.innerText = mark;
        const index = e.target.id;
        gameBoard.board[index] = mark;
      });
    });
  };
  return { getName, getMarker, placeMarker };
};

const playerOne = player(1, "O");
console.log(playerOne.getMarker());

const runGame = () => {
  gameBoard.populateTable();
  playerOne.placeMarker();
};

runGame();

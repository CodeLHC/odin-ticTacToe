const gameBoard = (() => {
  const dialog = document.getElementById("dialog");
  const showWinner = document.getElementById("winner");
  const restartGame = document.getElementById("restartGame");

  const board = new Array(9);
  const populateTable = () => {
    for (let i = 0; i < board.length; i++) {
      document.getElementById(i).innerText = "";
    }
  };

  restartGame.addEventListener("click", () => {
    dialog.close();
    board.forEach((element) => {
      element = "";
    });
    populateTable();
  });

  const gameOutcome = () => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    winningCombinations.forEach((element) => {
      if (
        element.every((number) => {
          return board[number] === "X";
        })
      ) {
        dialog.showModal();
        showWinner.innerText = "Player Two won!";
      } else if (
        element.every((number) => {
          return board[number] === "O";
        })
      ) {
        dialog.showModal();
        showWinner.innerText = "Player One won!";
      } else return;
    });
  };
  return { board, populateTable, gameOutcome };
})();

const player = (name, mark) => {
  const getName = () => name;
  const getMarker = () => mark;
  const placeMarker = () => {
    document.querySelectorAll(".box").forEach((box) => {
      box.addEventListener("click", (e) => {
        if (box.innerText) return;
        if (mark === "X") {
          mark = "O";
        } else if (mark === "O") {
          mark = "X";
        }
        box.innerText = mark;
        const index = e.target.id;
        gameBoard.board[index] = mark;

        gameBoard.gameOutcome();
      });
    });
  };

  return { getName, getMarker, placeMarker };
};

const runGame = (() => {
  gameBoard.populateTable();

  const playerOne = player(1, "O");
  const playerTwo = player(2, "X");
  playerOne.placeMarker();
  playerTwo.placeMarker();
})();

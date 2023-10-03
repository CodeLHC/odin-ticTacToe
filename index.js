const gameBoard = (() => {
  const board = new Array(9);
  const m = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  //   const testBoard = ["O", "X", "X", "O", "X", "O", "X", "X", "O"];
  const populateTable = () => {
    for (let i = 0; i < board.length; i++) {
      //   console.log(board[i]);
      //   if (board[i] === undefined) {
      //     document.getElementById(i).innerText = " ";
      //   }
      //   document.getElementById(i).innerText = board[i];
      document.getElementById(i).innerText = "";
    }
  };

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
        console.log("player 2 wins");
      } else if (
        element.every((number) => {
          return board[number] === "O";
        })
      ) {
        console.log("player 1 wins");
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

const playerOne = player(1, "O");
const playerTwo = player(2, "X");

const runGame = () => {
  gameBoard.populateTable();

  playerOne.placeMarker();
  playerTwo.placeMarker();
};

runGame();

const gameBoard = (players) => {
  const dialog = document.getElementById("dialog");
  const showWinner = document.getElementById("winner");
  const restartGame = document.getElementById("restartGame");

  let activePlayer = players[0];

  const board = Array.from({ length: 9 }, () => "");

  const populateTable = () => {
    for (let i = 0; i < board.length; i++) {
      document.getElementById(i).innerText = "";
    }
    document.querySelectorAll(".box").forEach((box) => {
      box.addEventListener("click", (e) => {
        if (box.innerText) return;
        box.innerText = activePlayer.getMarker();
        const index = e.target.id;
        board[index] = activePlayer.getMarker();

        gameOutcome(activePlayer.getName(), activePlayer.getMarker());
        if (activePlayer === players[0]) {
          activePlayer = players[1];
        } else if (activePlayer === players[1]) {
          activePlayer = players[0];
        }
      });
    });
  };

  restartGame.addEventListener("click", () => {
    dialog.close();
    board.forEach((_element, index, array) => {
      array[index] = "";
    });

    populateTable();
  });

  function checkCombo(combo, playerMark) {
    return combo.every((number) => {
      return board[number] === playerMark;
    });
  }

  function showResult(message) {
    dialog.showModal();
    showWinner.innerText = message;
  }

  const gameOutcome = (name, marker) => {
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
    winningCombinations.forEach((combo) => {
      if (checkCombo(combo, marker)) {
        showResult(`${name} won!`);
      } else if (checkCombo(combo, "O")) {
        showResult("Player One won!ZZZZZ");
      } else return;
    });

    function isDraw() {
      return board.every((element) => {
        return element != "";
      });
    }

    if (isDraw()) {
      showResult("It's a draw!");
    } else return;
  };
  return { board, populateTable, gameOutcome };
};

const player = (name, mark) => {
  const getName = () => name;
  const getMarker = () => mark;
  return { getName, getMarker };
};

// function askPlayerName(promptMessage) {
//   //   const p1 = document.getElementById("p1");
//   //   const p2 = document.getElementById("p2");
//   return prompt("Who uses Naughts (O)?");
//   //   p1.innerText = placeholderName;
//   //   placeholderName = prompt("Who uses Crosses (X)?");
//   //   p2.innerText = placeholderName;
// }

const runGame = () => {
  const playerOne = player(prompt("Who uses Naughts (O)?"), "O");
  const playerTwo = player(prompt("Who uses Crosses (X)?"), "X");
  gameBoard([playerOne, playerTwo]).populateTable();
};

runGame();

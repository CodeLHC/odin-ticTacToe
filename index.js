const gameBoard = (players) => {
  const dialog = document.getElementById("dialog");
  const showWinner = document.getElementById("winner");
  const restartGame = document.getElementById("restartGame");
  const p1 = document.getElementById("p1");
  const p2 = document.getElementById("p2");
  p2.style.color = "gray";

  let activePlayer = players[0];

  const board = Array.from({ length: 9 }, () => "");

  function displayPlayerInfo(nameOne, markerOne, nameTwo, markerTwo) {
    p1.innerText = `${nameOne}
      ${markerOne}`;
    p2.innerText = `${nameTwo}
      ${markerTwo}`;
  }

  const populateTable = () => {
    for (let i = 0; i < board.length; i++) {
      document.getElementById(i).innerText = "";
    }
    displayPlayerInfo(
      players[0].getName(),
      players[0].getMarker(),
      players[1].getName(),
      players[1].getMarker()
    );

    document.querySelectorAll(".box").forEach((box) => {
      box.addEventListener("click", (e) => {
        if (box.innerText) return;
        box.innerText = activePlayer.getMarker();
        const index = e.target.id;
        board[index] = activePlayer.getMarker();

        gameOutcome(activePlayer.getName(), activePlayer.getMarker());
        if (activePlayer === players[0]) {
          activePlayer = players[1];
          p2.style.color = "black";
          p1.style.color = "gray";
        } else if (activePlayer === players[1]) {
          activePlayer = players[0];
          p1.style.color = "black";
          p2.style.color = "gray";
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

const runGame = () => {
  //   const playerTwoOrCPU = () => {
  //     const twoOrCPU = document.getElementById("twoOrCPU");
  // const twoPlayers = document.getElementById("two");
  //     const CPU = document.getElementById("CPU");
  //     const boardDisplay = document.getElementById("display");
  //     const showPlayers = document.getElementById("players");

  //     boardDisplay.style.display = "none";
  //     showPlayers.style.display = "none";
  // const test = {};
  // twoPlayers.addEventListener("click", () => {
  //       twoOrCPU.style.display = "none";
  playerOne = player(prompt("Who uses Naughts (O)?", "Player One"), "O");
  playerTwo = player(prompt("Who uses Crosses (X)?", "Player Two"), "X");
  //       boardDisplay.style.display = "flex";
  //       showPlayers.style.display = "flex";
  //       console.log(playerOne, playerTwo);
  //       return { playerOne, playerTwo };
  // });
  // console.log(test);
  //   return test;

  //     CPU.addEventListener("click", () => {
  //       const playerOne = player(
  //         prompt("Who uses Naughts (O)?", "Player One"),
  //         "O"
  //       );
  //       const playerTwo = player("Computer", "X");
  //       twoOrCPU.style.display = "none";
  //       boardDisplay.style.display = "flex";
  //       showPlayers.style.display = "flex";

  //       return { playerOne, playerTwo };
  //     });
  //     return { playerOne, playerTwo };
  //   };
  //   playerTwoOrCPU();
  //   console.log(playerTwoOrCPU.playerOne, playerTwoOrCPU.playerTwo);
  // if (test.playerOne !== undefined || test.playerTwo !== undefined) {
  gameBoard([playerOne, playerTwo]).populateTable();
  // }
};

runGame();

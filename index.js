const gameBoard = (() => {
  const board = new Array(9);
  const testBoard = ["O", "X", "X", "O", "X", "O", "X", "X", "O"];
  const populateTable = () => {
    for (let i = 0; i < testBoard.length; i++) {
      document.getElementById(i).innerText = testBoard[i];
      console.log(i, testBoard[i]);
    }
  };
  return { populateTable };
})();

const player = () => {};

const game = () => {};

gameBoard.populateTable();

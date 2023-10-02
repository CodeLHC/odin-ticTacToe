const gameBoard = (() => {
  const board = new Array(9);
  const testBoard = ["O", "X", "X", "O", "X", "O", "X", "X", "O"];
  const populateDisplay = () => {
    const display = document.getElementById("display");
    testBoard.forEach((element) => {
      display.innerText = display.innerText + element + "|";
    });
  };
  return { populateDisplay };
})();

const player = () => {};

const game = () => {};

gameBoard.populateDisplay();

import AppConstant from "../constants/AppConstants";
import { WINNING_CASES } from "../constants/WinningCases";

export function deriveActivePlayer(gameTurns) {
  const player1Symbol = AppConstant.player1DefaultSymbol;
  const player2Symbol = AppConstant.player2DefaultSymbol;
  let currentPlayer = player1Symbol;

  if (gameTurns.length > 0 && gameTurns[0].player === player1Symbol) {
    currentPlayer = player2Symbol;
  }
  return currentPlayer;
}

export function deriveWinner(gameBoard) {
  const winningCases = WINNING_CASES;

  let winner = null;

  for (const cases of winningCases) {
    const firstSquareSymbol = gameBoard[cases[0].row][cases[0].column];
    const secondSquareSymbol = gameBoard[cases[1].row][cases[1].column];
    const thirdSquareSymbol = gameBoard[cases[2].row][cases[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
      return winner;
    }
  }

  return winner;
}

import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { deriveActivePlayer, deriveWinner } from "./helpers/PlayerHelper";
import AppConstant from "./constants/AppConstants";

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = AppConstant.initialGameBoard;

  const player1Symbol = AppConstant.player1DefaultSymbol;

  const player2Symbol = AppConstant.player2DefaultSymbol;

  // update gameBoard after select square
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // derive winner after gameTurns were changed (after player selects squares)
  const winner = deriveWinner(gameBoard);

  function onSelectSquare(rowIndex, colIndex) {
    setGameTurns((currentTurns) => {
      const currentPlayer = deriveActivePlayer(currentTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          player: currentPlayer,
        },
        ...currentTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol={player1Symbol}
            isActivePlayer={activePlayer === player1Symbol}
          />
          <Player
            initialName="Player 2"
            symbol={player2Symbol}
            isActivePlayer={activePlayer === player2Symbol}
          />
        </ol>
        {winner && <p>You won, {winner}!</p>}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;

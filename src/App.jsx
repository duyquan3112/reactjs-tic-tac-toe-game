import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import {
  deriveActivePlayerSymbol,
  deriveGameBoard,
  deriveWinner,
} from "./helpers/GameplayHelper";
import AppConstant from "./constants/AppConstants";
import GameOver from "./components/GameOver";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(AppConstant.defaultPlayers);

  function onSelectSquare(rowIndex, colIndex) {
    setGameTurns((currentTurns) => {
      const currentPlayerSymbol = deriveActivePlayerSymbol(currentTurns);

      const updatedTurns = [
        {
          square: { row: rowIndex, col: colIndex },
          playerSymbol: currentPlayerSymbol,
          player: players[currentPlayerSymbol],
        },
        ...currentTurns,
      ];
      return updatedTurns;
    });
  }

  function onRestart() {
    setGameTurns([]);
  }

  function onChangePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  const player1Symbol = AppConstant.player1DefaultSymbol;

  const player2Symbol = AppConstant.player2DefaultSymbol;

  const activePlayerSymbol = deriveActivePlayerSymbol(gameTurns);

  // update gameBoard after select square
  const gameBoard = deriveGameBoard(gameTurns);

  // derive winner after gameTurns were changed (after player selects squares)
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === AppConstant.totalSquares && !winner;

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={AppConstant.defaultPlayers[player1Symbol]}
            symbol={player1Symbol}
            isActivePlayer={activePlayerSymbol === player1Symbol}
            onChangePlayerName={onChangePlayerName}
          />
          <Player
            initialName={AppConstant.defaultPlayers[player2Symbol]}
            symbol={player2Symbol}
            isActivePlayer={activePlayerSymbol === player2Symbol}
            onChangePlayerName={onChangePlayerName}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={onRestart} />
        )}
        <GameBoard onSelectSquare={onSelectSquare} gameBoard={gameBoard} />
      </div>
      <Log gameTurns={gameTurns} />
    </main>
  );
}

export default App;

import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS={
  X: "Player 1",
  O: "Player 2",
};


function deriveActivePlayer(gameTurns) {
  let currPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player == "X") currPlayer = "O";
  return currPlayer;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = turn.player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard, players){
  let winner = null;
  for (const winning of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[winning[0].row][winning[0].column];
    let secondSymbol = gameBoard[winning[1].row][winning[1].column];
    let thirdSymbol = gameBoard[winning[2].row][winning[2].column];
    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      secondSymbol === thirdSymbol
    ) {
      winner = players[firstSymbol];
      console.log(players[firstSymbol], " wins");
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard=deriveGameBoard(gameTurns);

  const winner=deriveWinner(gameBoard, players);
  let isDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowInd, colInd) {
    setGameTurns((prevTurns) => {
      const currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { square: { row: rowInd, col: colInd }, player: currPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRestart={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
